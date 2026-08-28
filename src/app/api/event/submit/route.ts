import { NextResponse } from "next/server";
import { submitProject } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, vercelUrl, githubUrl, instagramId, description } = body;

    // 1. Basic Field Validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Please enter your Full Name as registered in attendance." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.includes("@") || !email.includes(".")) {
      return NextResponse.json(
        { error: "Please enter a valid registered Email address." },
        { status: 400 }
      );
    }

    if (!vercelUrl || typeof vercelUrl !== "string" || !vercelUrl.trim()) {
      return NextResponse.json(
        { error: "Please provide a valid Project Live Demo / Vercel URL." },
        { status: 400 }
      );
    }

    const cleanVercel = vercelUrl.trim();
    if (!cleanVercel.startsWith("http://") && !cleanVercel.startsWith("https://")) {
      return NextResponse.json(
        { error: "Live Demo URL must start with http:// or https://" },
        { status: 400 }
      );
    }

    if (!githubUrl || typeof githubUrl !== "string" || !githubUrl.trim()) {
      return NextResponse.json(
        { error: "Please provide a valid GitHub Repository URL." },
        { status: 400 }
      );
    }

    const cleanGithub = githubUrl.trim();
    if (!cleanGithub.startsWith("http://") && !cleanGithub.startsWith("https://")) {
      return NextResponse.json(
        { error: "GitHub Repository URL must start with http:// or https://" },
        { status: 400 }
      );
    }

    if (!description || typeof description !== "string" || description.trim().length < 10) {
      return NextResponse.json(
        { error: "Please enter a detailed project description (at least 10 characters)." },
        { status: 400 }
      );
    }

    // 2. Execute Submit Business Logic & Database Verification
    const result = await submitProject({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      vercelUrl: cleanVercel,
      githubUrl: cleanGithub,
      instagramId: (instagramId || "").trim(),
      description: description.trim(),
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Submission failed database verification." },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      submission: result.submission,
    });
  } catch (error: any) {
    console.error("Project Submission API Error:", error);
    return NextResponse.json(
      { error: "Failed to process project submission. Please try again." },
      { status: 500 }
    );
  }
}
