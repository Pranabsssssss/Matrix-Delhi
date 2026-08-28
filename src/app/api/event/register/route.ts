import { NextResponse } from "next/server";
import { createOrGetStudent } from "@/lib/db";

// Simple in-memory rate limiting (100 requests per IP)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();

export async function POST(req: Request) {
  try {
    // Basic IP tracking for rate limit
    const ip = req.headers.get("x-forwarded-for") || "unknown-ip";
    const now = Date.now();
    const rateData = rateLimitMap.get(ip) || { count: 0, timestamp: now };
    
    // Reset window every 1 hour
    if (now - rateData.timestamp > 60 * 60 * 1000) {
      rateData.count = 0;
      rateData.timestamp = now;
    }

    if (rateData.count >= 100) {
      return NextResponse.json(
        { error: "Too many registration attempts. Please try again later." },
        { status: 429 }
      );
    }
    rateData.count++;
    rateLimitMap.set(ip, rateData);

    const body = await req.json();
    const { name, email } = body;

    // 1. Validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Please enter your Real Name as per Aadhaar." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.includes("@") || !email.includes(".")) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // 2. Check email against registrations_csv table and create/get attendance record
    const student = await createOrGetStudent({
      name: name.trim(),
      email: email.trim().toLowerCase(),
    });

    if (!student) {
      return NextResponse.json(
        {
          error:
            "Access Denied: Your email was not found in our registered attendees database. Only pre-registered students can claim an attendance QR pass.",
        },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      student,
    });
  } catch (error: any) {
    if (error && error.message === "CAPACITY_REACHED") {
      return NextResponse.json(
        {
          error:
            "Registration Closed: The maximum event capacity has been reached. No more passes can be issued.",
        },
        { status: 403 }
      );
    }

    console.error("Registration API Error:", error);
    return NextResponse.json(
      { error: "Failed to process registration. Please try again." },
      { status: 500 }
    );
  }
}
