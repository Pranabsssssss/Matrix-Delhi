"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRegistrationStatus } from "@/hooks/useRegistrationStatus";
import { useTheme } from "@/components/ThemeProvider";

export default function Hero() {
  const { isClosed, isLoaded, timeLeft } = useRegistrationStatus();
  const { theme } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    // Controlled parallax offset shift (-10px to +10px) with oversized bleed margin
    const x = (clientX / innerWidth - 0.5) * 20;
    const y = (clientY / innerHeight - 0.5) * 20;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-white dark:bg-gray-950 transition-colors duration-500"
    >
      {/* Background Graphic Layer with Oversized Bleed & Parallax Cross-Fade */}
      <motion.div
        className="absolute -inset-10 z-0 pointer-events-none select-none overflow-hidden"
        style={{
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
        }}
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        transition={{ type: "spring", stiffness: 60, damping: 20, mass: 0.5 }}
      >
        {/* Light Theme Background Image */}
        <picture
          className={`w-full h-full block absolute inset-0 scale-110 transition-opacity duration-700 ease-in-out ${
            theme === "dark" ? "opacity-0" : "opacity-100"
          }`}
        >
          <source srcSet="/images/hero-bg.webp" type="image/webp" />
          <img
            src="/images/hero-bg.webp"
            alt="MATRIX DELHI Light Background"
            className="w-full h-full object-cover object-right"
          />
        </picture>

        {/* Dark Theme Background Image */}
        <picture
          className={`w-full h-full block absolute inset-0 scale-110 transition-opacity duration-700 ease-in-out ${
            theme === "dark" ? "opacity-100" : "opacity-0"
          }`}
        >
          <source srcSet="/images/hero-black-bg.webp" type="image/webp" />
          <img
            src="/images/hero-black-bg.webp"
            alt="MATRIX DELHI Dark Background"
            className="w-full h-full object-cover object-right"
          />
        </picture>

        {/* Soft Left Gradient Overlay for crisp text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-transparent dark:from-gray-950 dark:via-gray-950/70 w-full md:w-1/2 pointer-events-none transition-colors duration-500" />
      </motion.div>

      {/* Bottom Soft Edge Fade-Out Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-gray-950 dark:via-gray-950/80 pointer-events-none z-[5] transition-colors duration-500" />

      {/* Hero Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-32 pb-6 w-full flex-grow flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-xl lg:max-w-2xl"
        >
          {/* Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-3 sm:mb-4"
          >
            <span className="font-bold text-xs sm:text-sm text-[#ED1C24] tracking-widest uppercase">
              DELHI HACKS ME
            </span>
            <span className="font-semibold text-xs sm:text-sm text-gray-800 dark:text-gray-200 tracking-wider uppercase transition-colors">
              PRESENTS
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col font-display font-black tracking-tight uppercase select-none"
          >
            <span className="text-6xl sm:text-7xl md:text-8xl lg:text-[90px] text-gray-950 dark:text-white leading-[0.9] transition-colors">
              MATRIX
            </span>
            <span className="text-6xl sm:text-7xl md:text-8xl lg:text-[90px] text-[#ED1C24] leading-[0.9] mt-1 sm:mt-2">
              DELHI
            </span>
          </motion.h1>

          {/* Subheading Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-bold text-sm sm:text-base text-gray-900 dark:text-gray-100 tracking-[0.25em] uppercase mt-6 sm:mt-8 mb-3 sm:mb-4 transition-colors"
          >
            CODE. BUILD. INNOVATE.
          </motion.p>

          {/* Hackathon Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 max-w-md leading-relaxed font-medium mb-6 sm:mb-8 transition-colors"
          >
            A 12-hour Under-18 Web Development Hackathon where young minds build real solutions and shape the future.
          </motion.p>

          {/* Information Items with SVG Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-3 sm:space-y-3.5 mb-8 sm:mb-10"
          >
            {/* Date */}
            <div className="flex items-center gap-3 group">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded flex items-center justify-center text-[#ED1C24] bg-red-50 dark:bg-red-950/50 flex-shrink-0 transition-transform group-hover:scale-110">
                <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="font-bold text-xs sm:text-sm text-gray-900 dark:text-gray-100 tracking-wider uppercase transition-colors">
                16 AUGUST 2026
              </span>
            </div>

            {/* Duration */}
            <div className="flex items-center gap-3 group">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded flex items-center justify-center text-[#ED1C24] bg-red-50 dark:bg-red-950/50 flex-shrink-0 transition-transform group-hover:scale-110">
                <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="font-bold text-xs sm:text-sm text-gray-900 dark:text-gray-100 tracking-wider uppercase transition-colors">
                12 HOURS
              </span>
            </div>

            {/* Location */}
            <a
              href="https://maps.app.goo.gl/D4z224kra2NdKtZg8"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group cursor-pointer hover:text-[#ED1C24] transition-colors"
              title="Open CM Shri School Sector 10 Dwarka on Google Maps"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded flex items-center justify-center text-[#ED1C24] bg-red-50 dark:bg-red-950/50 flex-shrink-0 transition-transform group-hover:scale-110">
                <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span className="font-bold text-xs sm:text-sm text-gray-900 dark:text-gray-100 group-hover:text-[#ED1C24] dark:group-hover:text-[#ED1C24] tracking-wider uppercase leading-snug transition-colors">
                CM SHRI SCHOOL, SECTOR 10, DWARKA, DELHI ↗
              </span>
            </a>
          </motion.div>

          {/* CTA Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4"
          >
            {isClosed ? (
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/event"
                  className="inline-flex items-center justify-center bg-[#ED1C24] hover:bg-[#d61920] text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-7 py-3.5 rounded-md shadow-md hover:shadow-xl transition-all duration-200 group"
                >
                  EVENT DETAILS &amp; MAP
                  <svg
                    className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </motion.div>
            ) : (
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSdDRF9SHjr9V_6pmrqBYtvVzcBb57tLwZAynuLy9kZQEFp8YA/viewform?usp=header"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-[#ED1C24] hover:bg-[#d61920] text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-7 py-3.5 rounded-md shadow-md hover:shadow-xl transition-all duration-200 group"
                >
                  REGISTER NOW
                  <svg
                    className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              </motion.div>
            )}

            {!isClosed && (
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/event"
                  className="inline-flex items-center justify-center bg-white dark:bg-white/10 border border-gray-300/90 dark:border-white/20 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/20 font-bold text-xs sm:text-sm uppercase tracking-wider px-6 py-3.5 rounded-md shadow-xs hover:shadow-md transition-all duration-200"
                >
                  EVENT &amp; MAP
                </Link>
              </motion.div>
            )}

            <div className="flex flex-col">
              <span className="font-bold text-[11px] sm:text-xs text-[#ED1C24] tracking-widest uppercase transition-colors">
                {isClosed ? "REGISTRATION CLOSED EARLY DUE TO SPOTS FILLED" : "OPEN TO UNDER-18 STUDENTS"}
              </span>

              {isLoaded && !isClosed && (
                <span className="text-[10px] font-semibold text-[#ED1C24] tracking-wider uppercase mt-0.5">
                  CLOSES 15TH AUGUST AT 9:00 PM ({timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m LEFT)
                </span>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* 4-Column Hero Partner & Patron Card Bar */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 pt-4">
        <div className="bg-white/80 dark:bg-gray-900/80 border border-gray-200/80 dark:border-white/10 rounded-2xl shadow-lg backdrop-blur-xl p-4 sm:p-6 transition-colors duration-500">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-200/80 dark:divide-white/10">
            {/* Col 1: Organized Under */}
            <div className="flex flex-col justify-center sm:px-4 pt-3 sm:pt-0 first:pt-0">
              <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 tracking-widest uppercase mb-1">
                ORGANIZED UNDER
              </span>
              <a
                href="https://www.instagram.com/delhihacks.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 group hover:opacity-80 transition-opacity"
              >
                <span className="font-display font-black text-sm sm:text-base text-gray-950 dark:text-white uppercase tracking-wider group-hover:text-[#ED1C24] transition-colors">
                  DELHI HACKS ME
                </span>
                <svg className="w-4 h-4 fill-current text-gray-700 dark:text-gray-300 group-hover:text-[#ED1C24] transition-colors" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>

            {/* Col 2: Powered By */}
            <div className="flex flex-col justify-center sm:px-4 pt-3 sm:pt-0">
              <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 tracking-widest uppercase mb-1">
                POWERED BY
              </span>
              <a
                href="https://www.aerochrome.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 group hover:opacity-80 transition-opacity"
              >
                <Image
                  src="/images/aerochrome.svg"
                  alt="AEROCHROME Logo"
                  width={24}
                  height={24}
                  className="w-6 h-6 object-contain dark:invert flex-shrink-0"
                />
                <div className="flex flex-col text-left">
                  <span className="font-display font-extrabold text-xs sm:text-sm text-gray-950 dark:text-white tracking-widest leading-tight">
                    AEROCHROME
                  </span>
                  <span className="text-[8px] font-semibold text-gray-500 dark:text-gray-400 tracking-wider uppercase">
                    SYSTEM DESIGN AGENCY
                  </span>
                </div>
              </a>
            </div>

            {/* Col 3: Patron */}
            <div className="flex flex-col justify-center sm:px-4 pt-3 sm:pt-0">
              <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 tracking-widest uppercase mb-1">
                PATRON
              </span>
              <span className="font-display font-black text-sm sm:text-base text-gray-950 dark:text-white uppercase tracking-wider">
                DR. ATUL KUMAR
              </span>
            </div>

            {/* Col 4: Venue Partner */}
            <div className="flex flex-col justify-center sm:px-4 pt-3 sm:pt-0">
              <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 tracking-widest uppercase mb-1">
                VENUE PARTNER
              </span>
              <Link
                href="/why-cm-shri"
                className="flex items-center gap-2.5 group hover:opacity-80 transition-opacity"
              >
                <div className="w-7 h-7 rounded-full bg-white p-0.5 border border-gray-200 dark:border-white/20 shadow-xs flex-shrink-0 overflow-hidden flex items-center justify-center">
                  <Image
                    src="/images/cms.webp"
                    alt="CM SHRI School Logo"
                    width={28}
                    height={28}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="flex flex-col text-left">

                  <span className="font-display font-bold text-xs sm:text-sm text-gray-950 dark:text-white group-hover:text-[#ED1C24] dark:group-hover:text-[#ED1C24] tracking-wide leading-tight transition-colors">
                    CM SHRI SCHOOL
                  </span>
                  <span className="text-[8px] font-medium text-gray-500 dark:text-gray-400 tracking-wider uppercase">
                    SECTOR 10, DWARKA, DELHI
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
