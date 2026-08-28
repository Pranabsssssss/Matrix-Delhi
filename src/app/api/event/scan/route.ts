import { NextResponse } from "next/server";
import { markAttendance } from "@/lib/db";

export async function POST(req: Request) {
  try {
    // 1. Session Protection Check
    const cookieHeader = req.headers.get("cookie") || "";
    const isVolunteer = cookieHeader.includes("matrix_volunteer_session=authenticated");
    const isAdmin = cookieHeader.includes("matrix_admin_session=authenticated");

    if (!isVolunteer && !isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized volunteer access. Please log in first." },
        { status: 401 }
      );
    }

    const { token } = await req.json();

    if (!token || typeof token !== "string") {
      return NextResponse.json({ error: "Invalid QR code" }, { status: 400 });
    }

    // 2. Perform Attendance Lookup & Update
    const result = await markAttendance(token.trim());

    if (result.status === "invalid_token" || !result.student) {
      return NextResponse.json({ error: "Invalid QR code" }, { status: 404 });
    }

    if (result.status === "already_scanned") {
      return NextResponse.json({
        success: true,
        alreadyScanned: true,
        message: `${result.student.name} is already marked present`,
        student: result.student,
      });
    }

    return NextResponse.json({
      success: true,
      alreadyScanned: false,
      message: `${result.student.name} marked present`,
      student: result.student,
    });
  } catch (error: any) {
    console.error("Scan API Error:", error);
    return NextResponse.json(
      { error: "Failed to process QR scan. Please try again." },
      { status: 500 }
    );
  }
}
