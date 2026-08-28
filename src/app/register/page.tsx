"use client";

import Link from "next/link";
import Image from "next/image";
import { useRegistrationStatus } from "@/hooks/useRegistrationStatus";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/components/ThemeProvider";
import AnimatedLogo from "@/components/AnimatedLogo";


export default function RegisterPage() {
  const { isClosed, isLoaded, timeLeft } = useRegistrationStatus();
  const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white flex flex-col justify-between transition-colors duration-500">
      {/* Header */}
      <header className="border-b border-gray-100 dark:border-white/10 py-6 px-4 sm:px-8">
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
              href="/"
              className="text-xs font-bold text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white uppercase tracking-wider flex items-center gap-1.5 transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Registration Box Area */}
      <main className="max-w-3xl mx-auto px-4 py-16 text-center flex-grow flex flex-col justify-center items-center">
        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm ${
            isClosed
              ? "bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-gray-200"
              : "bg-red-50 dark:bg-red-950/50 text-[#ED1C24]"
          }`}
        >
          {isClosed ? (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          ) : (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          )}
        </div>

        <span
          className={`font-display font-black text-xs sm:text-sm px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 shadow-xs ${
            isClosed
              ? "bg-red-950/80 border border-red-800/60 text-[#ED1C24]"
              : "bg-[#ED1C24]/10 dark:bg-[#ED1C24]/20 border border-[#ED1C24]/30 text-[#ED1C24]"
          }`}
        >
          {isClosed ? "REGISTRATION SPOTS FULL" : "REGISTRATION OPEN"}
        </span>

        <h1 className="font-display font-black text-3xl sm:text-4xl text-gray-950 dark:text-white uppercase tracking-tight mb-4">
          {isClosed ? "All Registrations Are Filled!" : "Register For MATRIX DELHI"}
        </h1>

        {isClosed ? (
          <div className="bg-gray-50 dark:bg-white/5 border border-red-200/80 dark:border-red-900/40 rounded-3xl p-6 sm:p-8 max-w-lg mb-8 shadow-xl">
            <p className="text-base text-gray-900 dark:text-gray-100 font-bold mb-3">
              Thank you for the incredible response!
            </p>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-medium mb-6">
              All registration spots for MATRIX DELHI have been completely filled. If you have registered, please check your email for your official check-in pass and event day schedule.
            </p>
            <div className="inline-block bg-[#ED1C24] text-white font-display font-black text-xs sm:text-sm px-6 py-3 rounded-xl uppercase tracking-widest shadow-md">
              MEET YOU AT THE EVENT! 🚀
            </div>
          </div>
        ) : (

          <div className="bg-white dark:bg-white/5 border border-gray-200/90 dark:border-white/10 rounded-3xl p-6 sm:p-8 max-w-lg mb-8 shadow-xl">
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-medium mb-6">
              Fill out the official registration form to secure your spot for the 12-hour Under-18 hackathon on 16 August 2026.
            </p>

            {isLoaded && (
              <div className="bg-red-50 dark:bg-red-950/40 border border-red-100 dark:border-red-900/40 rounded-xl p-3 mb-6 text-xs font-bold text-[#ED1C24] uppercase tracking-wider">
                CLOSES IN: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
              </div>
            )}

            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdDRF9SHjr9V_6pmrqBYtvVzcBb57tLwZAynuLy9kZQEFp8YA/viewform?usp=header"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#ED1C24] hover:bg-[#d61920] text-white font-bold text-xs uppercase tracking-wider py-4 rounded-xl shadow-md transition-all active:scale-95 group"
            >

              COMPLETE REGISTRATION FORM
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>
        )}

        <Link
          href="/"
          className="text-xs font-bold text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white uppercase tracking-wider transition-colors"
        >
          ← Return to Main Page
        </Link>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 dark:border-white/10 py-6 px-4 text-center text-xs text-gray-500 dark:text-gray-400 font-medium">
        © 2026 MATRIX DELHI. Organized under Delhi Hacks Me
      </footer>
    </div>
  );
}
