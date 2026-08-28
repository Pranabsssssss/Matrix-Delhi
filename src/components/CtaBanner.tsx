"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useRegistrationStatus } from "@/hooks/useRegistrationStatus";

export default function CtaBanner() {
  const { isClosed } = useRegistrationStatus();

  return (
    <section className="relative bg-gradient-to-r from-[#ED1C24] via-[#d61920] to-[#b8141a] dark:bg-gray-950 border-y border-red-500/20 dark:border-red-500/30 py-14 sm:py-20 overflow-hidden transition-colors duration-500 shadow-2xl">
      {/* Background Laser Grid Lines Pattern */}
      <div className="absolute inset-0 opacity-15 dark:opacity-25 pointer-events-none select-none">
        <svg className="w-full h-full" fill="none" viewBox="0 0 1200 400" preserveAspectRatio="none">
          <line x1="0" y1="0" x2="1200" y2="400" stroke="#FFFFFF" strokeWidth="2" />
          <line x1="0" y1="100" x2="1200" y2="500" stroke="#FFFFFF" strokeWidth="2" />
          <line x1="200" y1="0" x2="1400" y2="400" stroke="#FFFFFF" strokeWidth="2" />
        </svg>
      </div>

      {/* Intense Ambient Crimson Neon Glow Orb for Dark Mode */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-red-600/10 dark:bg-[#ED1C24]/20 blur-[130px] rounded-full pointer-events-none" />

      {/* Top Accent Gradient Border */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#ED1C24] to-transparent dark:via-red-500 opacity-80" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white uppercase tracking-tight leading-tight dark:drop-shadow-[0_0_30px_rgba(237,28,36,0.6)]">
              READY TO BUILD THE FUTURE?
            </h2>
            <p className="text-white/90 dark:text-red-200/90 font-bold text-xs sm:text-sm tracking-widest uppercase mt-3 transition-colors">
              {isClosed
                ? "REGISTRATIONS CLOSED ON 15TH AUGUST AT 9:00 PM IST!"
                : "REGISTRATIONS ARE OPEN. DON'T MISS YOUR CHANCE!"}
            </p>
          </motion.div>

          {/* Right Action Buttons */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0"
          >
            <Link
              href="/instructions"
              className="inline-flex items-center justify-center font-bold text-xs sm:text-sm uppercase tracking-wider px-6 py-4 rounded-xl border border-white/40 dark:border-white/20 text-white bg-black/20 hover:bg-black/30 backdrop-blur-md transition-all duration-300"
            >
              EVENT INSTRUCTIONS
            </Link>

            {isClosed ? (
              <span className="inline-flex items-center justify-center font-bold text-xs sm:text-sm uppercase tracking-wider px-9 py-4 rounded-xl shadow-xl bg-gray-900 text-gray-200 border border-gray-700 cursor-not-allowed">
                SPOTS FILLED — MEET YOU AT THE EVENT! 🚀
              </span>
            ) : (

              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdDRF9SHjr9V_6pmrqBYtvVzcBb57tLwZAynuLy9kZQEFp8YA/viewform?usp=header"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center font-bold text-xs sm:text-sm uppercase tracking-wider px-9 py-4 rounded-xl shadow-xl transition-all duration-300 group bg-white text-[#ED1C24] hover:bg-gray-100 dark:bg-[#ED1C24] dark:hover:bg-[#d61920] dark:text-white dark:shadow-[0_0_35px_rgba(237,28,36,0.6)] dark:border dark:border-red-400/40"
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
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
