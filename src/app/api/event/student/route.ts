import { NextResponse } from "next/server";
import { getStudentByToken, getStudentByEmail } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    if (!token && !email) {
      return NextResponse.json(
        { error: "Token or email parameter is required." },
        { status: 400 }
      );
    }

    let student = null;

    if (token) {
      student = await getStudentByToken(token);
    } else if (email) {
      student = await getStudentByEmail(email);
    }

    if (!student) {
      return NextResponse.json(
        { error: "Student record not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      student,
    });
  } catch (error: any) {
    console.error("Student Lookup API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch student record." },
      { status: 500 }
    );
  }
}
