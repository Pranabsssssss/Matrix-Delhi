"use client";

import Link from "next/link";
import AnimatedLogo from "@/components/AnimatedLogo";

export default function Footer() {
  const instagramUrl = "https://www.instagram.com/delhihacks.me/";
  const email = "ask@delhihacks.me";

  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-white/10 py-8 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          {/* Left Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <AnimatedLogo size="sm" />
            <div className="flex flex-col">
              <span className="font-display font-black text-lg tracking-wider text-black dark:text-white leading-none transition-colors">
                MATRIX
              </span>
              <span className="text-[9px] font-bold text-[#ED1C24] tracking-[0.25em] leading-tight">
                —DELHI—
              </span>
            </div>
          </Link>

          {/* Center Copyright & Questions Email */}
          <div className="flex flex-col items-center gap-1">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wide transition-colors">
              © 2026 MATRIX Delhi. All rights reserved.
            </span>
            <span className="text-xs text-gray-600 dark:text-gray-300 font-medium transition-colors">
              Have questions? Email us at{" "}
              <a
                href={`mailto:${email}`}
                className="text-[#ED1C24] font-bold hover:underline"
              >
                {email}
              </a>
            </span>
          </div>

          {/* Right Credit & Instagram Link */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 sm:gap-4">
            <span className="text-xs text-gray-600 dark:text-gray-400 font-medium flex items-center gap-1.5 tracking-wide transition-colors">
              Built with
              <svg className="w-3.5 h-3.5 fill-[#ED1C24]" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              by Delhi Hacks Me
            </span>

            <Link
              href="/instructions"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 dark:text-gray-200 hover:text-[#ED1C24] dark:hover:text-[#ED1C24] transition-colors px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-white/5 hover:bg-red-50 dark:hover:bg-white/10 border border-gray-200/80 dark:border-white/15 hover:border-red-100 uppercase tracking-wider"
            >
              INSTRUCTIONS
            </Link>

            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 dark:text-gray-200 hover:text-[#ED1C24] dark:hover:text-[#ED1C24] transition-colors group px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-white/5 hover:bg-red-50 dark:hover:bg-white/10 border border-gray-200/80 dark:border-white/15 hover:border-red-100"
              title="Follow @delhihacks.me on Instagram"
            >

              <svg className="w-4 h-4 fill-current text-gray-700 dark:text-gray-200 group-hover:text-[#ED1C24] transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span>@delhihacks.me</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
