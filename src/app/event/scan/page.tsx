"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Html5Qrcode } from "html5-qrcode";
import AnimatedLogo from "@/components/AnimatedLogo";
import ThemeToggle from "@/components/ThemeToggle";

interface ScanResultData {
  success: boolean;
  alreadyScanned: boolean;
  message: string;
  student?: {
    id: number;
    name: string;
    email: string;
    team_name: string;
    qr_token: string;
    has_attended: number;
    scanned_at?: string;
  };
}

export default function VolunteerScanPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResultData | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);

  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
  const isProcessingRef = useRef(false);

  // 1. Check existing volunteer session
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/event/auth?role=volunteer");
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated) {
            setAuthenticated(true);
          }
        }
      } catch (e) {}
    }
    checkAuth();
  }, []);

  // 2. Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthLoading(true);

    try {
      const res = await fetch("/api/event/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, role: "volunteer" }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Invalid volunteer password.");
      }

      setAuthenticated(true);
    } catch (err: any) {
      setAuthError(err.message || "Authentication failed.");
    } finally {
      setAuthLoading(false);
    }
  };

  // 3. Start Camera Scanner
  useEffect(() => {
    if (!authenticated) return;

    let html5QrCode: Html5Qrcode;

    async function startScanner() {
      try {
        html5QrCode = new Html5Qrcode("qr-reader-container");
        html5QrCodeRef.current = html5QrCode;

        await html5QrCode.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 260, height: 260 },
          },
          onQrScanSuccess,
          onQrScanFailure
        );

        setScanning(true);
      } catch (err: any) {
        console.error("Camera Scanner Error:", err);
        setScanError("Failed to access camera. Please allow camera permissions or try another browser.");
      }
    }

    startScanner();

    return () => {
      if (html5QrCodeRef.current && html5QrCodeRef.current.isScanning) {
        html5QrCodeRef.current.stop().catch(() => {});
      }
    };
  }, [authenticated]);

  // 4. Handle QR Scan Success
  const onQrScanSuccess = async (decodedText: string) => {
    if (isProcessingRef.current) return;
    isProcessingRef.current = true;

    setScanError(null);

    try {
      const res = await fetch("/api/event/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: decodedText }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setScanResult(null);
        setScanError(data.error || "Invalid QR code");
      } else {
        setScanResult(data);
        setScanError(null);
      }
    } catch (err) {
      setScanError("Scan verification failed. Check connection.");
    } finally {
      // Pause 2.5s before allowing next scan
      setTimeout(() => {
        isProcessingRef.current = false;
      }, 2500);
    }
  };

  const onQrScanFailure = (err: any) => {
    // Silent fail on frame decode failure
  };

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white flex flex-col justify-between transition-colors duration-500">
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
            <ThemeToggle />
          </div>
        </header>

        <div className="max-w-md mx-auto px-4 py-16 text-center flex-grow flex flex-col justify-center">
          <div className="bg-white/80 dark:bg-gray-900/80 border border-gray-200/90 dark:border-white/15 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
            <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-950/60 text-[#ED1C24] flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>

            <span className="text-[10px] font-bold text-[#ED1C24] tracking-widest uppercase block mb-1">
              VOLUNTEER PORTAL
            </span>
            <h2 className="font-display font-black text-2xl uppercase tracking-wide text-gray-950 dark:text-white mb-6">
              ATTENDANCE SCANNER LOGIN
            </h2>

            {authError && (
              <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-xs font-semibold text-[#ED1C24] mb-4">
                ⚠️ {authError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1">
                  Volunteer Access Password *
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter volunteer password"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-[#ED1C24] focus:ring-1 focus:ring-[#ED1C24] transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#ED1C24] hover:bg-[#d61920] text-white font-bold text-xs uppercase tracking-wider py-4 rounded-xl shadow-lg transition-all active:scale-95 disabled:opacity-50"
              >
                {authLoading ? "AUTHENTICATING..." : "ACCESS ATTENDANCE SCANNER →"}
              </button>
            </form>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-500">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-white/10 py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AnimatedLogo size="sm" />
            <span className="font-display font-black text-base text-gray-950 dark:text-white">
              VOLUNTEER SCANNER
            </span>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setAuthenticated(false)}
              className="text-xs font-bold text-gray-500 hover:text-red-500 uppercase tracking-wider"
            >
              Lock Scanner
            </button>
          </div>
        </div>
      </header>

      {/* Main Scanner Section */}
      <div className="max-w-2xl mx-auto px-4 py-8 text-center space-y-6">
        <div className="bg-white/90 dark:bg-gray-900/90 border border-gray-200/90 dark:border-white/15 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl">
          <span className="text-[10px] font-bold text-[#ED1C24] tracking-widest uppercase block mb-1">
            LIVE CAMERA SCANNER
          </span>
          <h1 className="font-display font-black text-2xl uppercase tracking-wide text-gray-950 dark:text-white mb-4">
            SCAN ATTENDEE QR PASS
          </h1>

          {/* Camera Viewport Container */}
          <div className="relative w-full max-w-sm mx-auto h-72 sm:h-80 rounded-2xl overflow-hidden bg-black border-2 border-gray-300 dark:border-white/20 shadow-inner mb-6 flex items-center justify-center">
            <div id="qr-reader-container" className="w-full h-full object-cover" />
          </div>

          {/* Scan Result Feedback Banner */}
          {scanResult && (
            <div
              className={`p-5 rounded-2xl border text-left shadow-lg transition-all animate-bounce-once ${
                scanResult.alreadyScanned
                  ? "bg-amber-50 dark:bg-amber-950/70 border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-100"
                  : "bg-emerald-50 dark:bg-emerald-950/70 border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-100"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ${
                    scanResult.alreadyScanned ? "bg-amber-500" : "bg-emerald-500"
                  }`}
                >
                  {scanResult.alreadyScanned ? "⚠️" : "✓"}
                </span>
                <h3 className="font-display font-black text-base sm:text-lg tracking-wide uppercase">
                  {scanResult.message}
                </h3>
              </div>

              {scanResult.student && (
                <div className="grid grid-cols-2 gap-2 text-xs font-semibold pt-2 border-t border-current/20">
                  <div>
                    <span className="opacity-70 uppercase tracking-wider block text-[10px]">Student Name</span>
                    <span>{scanResult.student.name}</span>
                  </div>
                  <div>
                    <span className="opacity-70 uppercase tracking-wider block text-[10px]">Team</span>
                    <span>{scanResult.student.team_name}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="opacity-70 uppercase tracking-wider block text-[10px]">Email</span>
                    <span>{scanResult.student.email}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Error Banner */}
          {scanError && (
            <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/70 border border-red-300 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-extrabold uppercase tracking-wider">
              ❌ {scanError}
            </div>
          )}

          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-4">
            Point camera directly at the QR code on the student&apos;s phone screen or downloaded image pass.
          </p>
        </div>
      </div>
    </main>
  );
}
