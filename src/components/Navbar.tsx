"use client";

import Link from "next/link";
import { useRegistrationStatus } from "@/hooks/useRegistrationStatus";
import ThemeToggle from "@/components/ThemeToggle";
import AnimatedLogo from "@/components/AnimatedLogo";

export default function Navbar() {
  const { isClosed } = useRegistrationStatus();

  return (
    <header className="w-full absolute top-0 left-0 right-0 z-50 bg-transparent transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 group">
            <AnimatedLogo size="md" />
            <div className="flex flex-col">
              <span className="font-display font-black text-xl tracking-wider text-gray-900 dark:text-white leading-none transition-colors">
                MATRIX
              </span>
              <span className="text-[9px] font-bold text-[#ED1C24] tracking-[0.25em] leading-tight mt-0.5">
                —DELHI—
              </span>
            </div>
          </Link>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            <Link
              href="/event"
              className="hidden md:inline-flex items-center justify-center font-bold text-xs uppercase tracking-wider px-4 py-3 rounded-md border border-gray-300/80 dark:border-white/15 bg-white/80 dark:bg-white/10 backdrop-blur-md text-gray-900 dark:text-white hover:bg-white dark:hover:bg-white/20 transition-all duration-200 shadow-xs"
            >
              EVENT &amp; MAP
            </Link>

            <Link
              href="/submit"
              className="hidden sm:inline-flex items-center justify-center font-bold text-xs uppercase tracking-wider px-4 py-3 rounded-md border border-[#ED1C24]/50 bg-[#ED1C24]/10 backdrop-blur-md text-[#ED1C24] dark:text-red-400 hover:bg-[#ED1C24] hover:text-white transition-all duration-200 shadow-xs"
            >
              🚀 SUBMIT PROJECT
            </Link>

            <a
              href="https://aerochrome.in/forms"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center justify-center font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-md border border-gray-300/80 dark:border-white/15 bg-white/80 dark:bg-white/10 backdrop-blur-md text-gray-900 dark:text-white hover:bg-white dark:hover:bg-white/20 transition-all duration-200 shadow-xs"
            >
              BECOME A SPONSOR
            </a>

            {isClosed ? (
              <Link
                href="/event"
                className="inline-flex items-center justify-center font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-md shadow-md transition-all duration-200 group bg-[#ED1C24] hover:bg-[#d61920] text-white hover:shadow-lg"
              >
                EVENT DETAILS
                <svg
                  className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
            ) : (


              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdDRF9SHjr9V_6pmrqBYtvVzcBb57tLwZAynuLy9kZQEFp8YA/viewform?usp=header"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-md shadow-sm transition-all duration-200 group bg-[#ED1C24] hover:bg-[#d61920] active:scale-95 text-white hover:shadow-md"
              >
                REGISTER NOW
                <svg
                  className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </a>
            )}

          </div>
        </div>
      </div>
    </header>
  );
}
