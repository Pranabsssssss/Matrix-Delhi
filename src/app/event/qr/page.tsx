"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import QRCode from "qrcode";
import AnimatedLogo from "@/components/AnimatedLogo";
import ThemeToggle from "@/components/ThemeToggle";

interface StudentData {
  id: number;
  name: string;
  email: string;
  team_name: string;
  qr_token: string;
  has_attended: number;
  scanned_at: string | null;
}

function formatDate(dateString: string | null | undefined) {
  if (!dateString) return "—";
  const str = String(dateString).trim();
  const match = str.match(/^(\d{4})-(\d{2})-(\d{2})[T\s](\d{2}):(\d{2}):(\d{2})/);
  if (match) {
    const [, y, m, d, hh, mm, ss] = match;
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let hour = parseInt(hh, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    const formattedHour = String(hour).padStart(2, "0");
    return `${d} ${months[parseInt(m, 10) - 1]} ${y}, ${formattedHour}:${mm}:${ss} ${ampm} (GMT+5:30)`;
  }
  return str;
}

function QRPassContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tokenParam = searchParams.get("token");
  const emailParam = searchParams.get("email");

  const [student, setStudent] = useState<StudentData | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    async function fetchStudent() {
      if (!tokenParam && !emailParam) {
        setError("No QR token or email provided. Please register or look up your pass.");
        setLoading(false);
        return;
      }

      try {
        const query = tokenParam
          ? `token=${encodeURIComponent(tokenParam)}`
          : `email=${encodeURIComponent(emailParam || "")}`;

        const res = await fetch(`/api/event/student?${query}`);
        const data = await res.json();

        if (!res.ok || !data.success || !data.student) {
          throw new Error(data.error || "Attendance record not found.");
        }

        setStudent(data.student);

        // Generate QR code
        const qrUrl = await QRCode.toDataURL(data.student.qr_token, {
          width: 350,
          margin: 2,
          color: {
            dark: "#000000",
            light: "#ffffff",
          },
        });
        setQrDataUrl(qrUrl);
      } catch (err: any) {
        setError(err.message || "Failed to load QR pass.");
      } finally {
        setLoading(false);
      }
    }

    fetchStudent();
  }, [tokenParam, emailParam]);

  // Requirement 11: Download High-Quality Composite PNG QR Pass
  const handleDownloadQr = async () => {
    if (!student || !qrDataUrl) return;

    setDownloading(true);

    try {
      const canvas = document.createElement("canvas");
      canvas.width = 800;
      canvas.height = 1000;
      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      // 1. Background Fill
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, 800, 1000);

      // 2. Header Banner
      ctx.fillStyle = "#ED1C24";
      ctx.fillRect(0, 0, 800, 140);

      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 32px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("MATRIX DELHI 2026", 400, 60);

      ctx.font = "18px sans-serif";
      ctx.fillText("OFFICIAL STUDENT ATTENDANCE PASS", 400, 100);

      // 3. Render QR Code Image
      const qrImg = new window.Image();
      qrImg.crossOrigin = "anonymous";
      qrImg.src = qrDataUrl;

      await new Promise<void>((resolve) => {
        qrImg.onload = () => {
          // Draw QR in center
          ctx.drawImage(qrImg, 225, 180, 350, 350);
          resolve();
        };
      });

      // 4. Student Metadata Box
      ctx.fillStyle = "#FFFFFF";
      ctx.strokeStyle = "#E5E7EB";
      ctx.lineWidth = 2;
      ctx.roundRect(80, 560, 640, 310, 20);
      ctx.stroke();
      ctx.fill();

      ctx.textAlign = "left";
      // Name
      ctx.fillStyle = "#6B7280";
      ctx.font = "bold 14px sans-serif";
      ctx.fillText("REAL NAME (AS PER AADHAAR)", 110, 610);

      ctx.fillStyle = "#111827";
      ctx.font = "bold 26px sans-serif";
      ctx.fillText(student.name, 110, 650);

      // Email Address
      ctx.fillStyle = "#6B7280";
      ctx.font = "bold 14px sans-serif";
      ctx.fillText("EMAIL ADDRESS", 110, 710);

      ctx.fillStyle = "#111827";
      ctx.font = "bold 20px sans-serif";
      ctx.fillText(student.email, 110, 745);

      // Attendance Status
      ctx.fillStyle = "#6B7280";
      ctx.font = "bold 14px sans-serif";
      ctx.fillText("STATUS", 110, 805);

      ctx.fillStyle = student.has_attended === 1 ? "#059669" : "#D97706";
      ctx.font = "bold 18px sans-serif";
      ctx.fillText(
        student.has_attended === 1 ? "✓ PRESENT / CHECKED IN" : "MEET YOU ON 16TH AUG!",
        110,
        835
      );


      // 6. Footer Venue Notice
      ctx.fillStyle = "#9CA3AF";
      ctx.font = "14px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("CM Shri School, Sector 10, Dwarka, New Delhi • 16 August 2026", 400, 950);

      // 7. Sanitize filename
      const sanitizedName = student.name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");

      const fileName = `${sanitizedName || "student"}-attendance-qr.png`;

      // 8. Trigger Download
      const link = document.createElement("a");
      link.download = fileName;
      link.href = canvas.toDataURL("image/png", 1.0);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.error("QR Download Error:", e);
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="w-12 h-12 border-4 border-[#ED1C24] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">
          Loading Official Attendance Pass...
        </p>
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="max-w-lg mx-auto py-16 text-center px-4">
        <div className="w-16 h-16 rounded-2xl bg-red-100 dark:bg-red-950/60 text-[#ED1C24] flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="font-display font-black text-2xl uppercase mb-2 text-gray-950 dark:text-white">
          PASS NOT FOUND
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 font-medium mb-6">
          {error || "Could not retrieve attendance pass."}
        </p>
        <Link
          href="/event"
          className="inline-flex items-center gap-2 bg-[#ED1C24] text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-md"
        >
          ← Return to Event Registration
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto py-12 px-4 sm:px-6">
      {/* Attendance Pass Glass Container */}
      <div className="bg-white/90 dark:bg-gray-900/90 border border-gray-200/90 dark:border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-2xl text-center space-y-6">
        {/* Pass Header Badge */}
        <div className="flex flex-col items-center">
          <span className="px-3.5 py-1 rounded-full bg-[#ED1C24]/10 dark:bg-[#ED1C24]/20 border border-[#ED1C24]/30 text-[#ED1C24] text-[10px] font-bold tracking-widest uppercase mb-3">
            OFFICIAL CHECK-IN PASS
          </span>

          <h1 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-gray-950 dark:text-white">
            {student.name}
          </h1>

          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium mt-1">
            Real Name as per Aadhaar
          </p>
        </div>

        {/* Attendance Status Pill */}
        <div>
          {student.has_attended === 1 ? (
            <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 text-xs font-extrabold uppercase px-4 py-2 rounded-full shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              STATUS: PRESENT / CHECKED IN {student.scanned_at ? `(${formatDate(student.scanned_at)})` : ""}
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400 text-xs font-extrabold uppercase px-4 py-2 rounded-full shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              STATUS: MEET YOU ON 16TH AUG!
            </div>
          )}
        </div>

        {/* QR Code Frame */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-inner inline-block mx-auto">
          {qrDataUrl && (
            <Image
              src={qrDataUrl}
              alt="Student Attendance QR Code"
              width={280}
              height={280}
              className="w-64 h-64 sm:w-72 sm:h-72 object-contain mx-auto"
              unoptimized
            />
          )}
        </div>

        {/* Requirement 11: Prominent Download QR Button */}

        <div className="pt-2">
          <button
            onClick={handleDownloadQr}
            disabled={downloading}
            className="w-full inline-flex items-center justify-center gap-2.5 bg-[#ED1C24] hover:bg-[#d61920] text-white font-display font-bold text-xs sm:text-sm uppercase tracking-wider py-4 rounded-xl shadow-xl transition-all transform hover:-translate-y-0.5 active:scale-95 disabled:opacity-50"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            <span>{downloading ? "GENERATING PNG PASS..." : "DOWNLOAD QR PASS (PNG)"}</span>
          </button>
        </div>

        {/* Details Block */}
        <div className="text-left pt-4 border-t border-gray-200 dark:border-white/10 text-xs">
          <div>
            <span className="font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block text-[10px]">
              EMAIL ADDRESS
            </span>
            <span className="font-bold text-gray-900 dark:text-white break-all">
              {student.email}
            </span>
          </div>
        </div>


        {/* Notice */}
        <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium leading-relaxed pt-2">
          Please present this QR code or downloaded pass on your phone to event volunteers at CM Shri School check-in desk on 16 August 2026.
        </p>
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/event"
          className="text-xs font-bold text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white uppercase tracking-wider transition-colors"
        >
          ← Return to Event Page
        </Link>
      </div>
    </div>
  );
}

export default function QRPassPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-500">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-white/10 py-6 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <AnimatedLogo size="md" />
            <div className="flex flex-col">
              <span className="font-display font-black text-lg tracking-wider text-black dark:text-white leading-none">
                MATRIX
              </span>
              <span className="text-[9px] font-bold text-[#ED1C24] tracking-[0.25em] leading-tight">
                —DELHI—
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/event"
              className="text-xs font-bold text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white uppercase tracking-wider transition-colors"
            >
              ← Back to Event
            </Link>
          </div>
        </div>
      </header>

      <Suspense
        fallback={
          <div className="py-20 text-center text-xs font-bold uppercase tracking-wider text-gray-500">
            Loading QR Pass...
          </div>
        }
      >
        <QRPassContent />
      </Suspense>
    </main>
  );
}
