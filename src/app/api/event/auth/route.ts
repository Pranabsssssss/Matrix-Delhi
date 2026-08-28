import { NextResponse } from "next/server";

const VOLUNTEER_PASS = process.env.VOLUNTEER_PASSWORD;
const ADMIN_PASS = process.env.ADMIN_PASSWORD;

export async function POST(req: Request) {
  try {
    const { password, role } = await req.json();

    if (!password || typeof password !== "string") {
      return NextResponse.json({ error: "Password is required." }, { status: 400 });
    }

    if (role === "volunteer") {
      if (password === VOLUNTEER_PASS) {
        const response = NextResponse.json({ success: true, role: "volunteer" });
        response.cookies.set("matrix_volunteer_session", "authenticated", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 60 * 60 * 24, // 24 hours
          path: "/",
        });
        return response;
      }
    } else if (role === "admin") {
      if (password === ADMIN_PASS) {
        const response = NextResponse.json({ success: true, role: "admin" });
        response.cookies.set("matrix_admin_session", "authenticated", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 60 * 60 * 24, // 24 hours
          path: "/",
        });
        return response;
      }
    }

    return NextResponse.json({ error: "Invalid password." }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: "Authentication failed." }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const role = searchParams.get("role");

  const cookieHeader = req.headers.get("cookie") || "";
  const isVolunteer = cookieHeader.includes("matrix_volunteer_session=authenticated");
  const isAdmin = cookieHeader.includes("matrix_admin_session=authenticated");

  if (role === "volunteer" && (isVolunteer || isAdmin)) {
    return NextResponse.json({ authenticated: true, role: "volunteer" });
  }

  if (role === "admin" && isAdmin) {
    return NextResponse.json({ authenticated: true, role: "admin" });
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}
