import { NextResponse } from "next/server";
import { getAllStudents, markAttendance, getAllProjectSubmissions } from "@/lib/db";

export async function GET(req: Request) {
  try {
    // 1. Protection Check
    const cookieHeader = req.headers.get("cookie") || "";
    const isAdmin = cookieHeader.includes("matrix_admin_session=authenticated");

    if (!isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized admin access." },
        { status: 401 }
      );
    }

    const students = await getAllStudents();
    const submissions = await getAllProjectSubmissions();

    const totalRegistered = students.length;
    const totalPresent = students.filter((s) => s.has_attended === 1).length;
    const totalAbsent = totalRegistered - totalPresent;
    const attendancePercentage = totalRegistered > 0 ? ((totalPresent / totalRegistered) * 100).toFixed(1) : "0";

    return NextResponse.json({
      success: true,
      stats: {
        totalRegistered,
        totalPresent,
        totalAbsent,
        attendancePercentage,
        totalSubmissions: submissions.length,
      },
      students,
      submissions,
    });
  } catch (error: any) {
    console.error("Admin API Error:", error);
    return NextResponse.json(
      { error: "Failed to load admin attendance dataset." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const cookieHeader = req.headers.get("cookie") || "";
    const isAdmin = cookieHeader.includes("matrix_admin_session=authenticated");

    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized admin access." }, { status: 401 });
    }

    const { action, token } = await req.json();

    if (action === "toggle_attendance" && token) {
      const res = await markAttendance(token);
      return NextResponse.json({ success: true, result: res });
    }

    return NextResponse.json({ error: "Invalid action." }, { status: 400 });
  } catch (e) {
    return NextResponse.json({ error: "Operation failed." }, { status: 500 });
  }
}
