"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function InstructionBanner() {
  return (
    <section className="py-16 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-white/10 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-r from-red-950 via-gray-900 to-gray-950 rounded-3xl border border-red-500/30 shadow-2xl p-8 sm:p-12 overflow-hidden text-white"
        >
          {/* Subtle Ambient Red Background Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left Content */}
            <div className="max-w-2xl text-center lg:text-left">
              <span className="inline-block text-[10px] font-black text-[#ED1C24] bg-red-950/80 border border-red-800/40 px-3.5 py-1 rounded-full uppercase tracking-widest mb-4">
                IMPORTANT PARTICIPANT NOTICE
              </span>
              <h2 className="font-display font-black text-2xl sm:text-4xl uppercase tracking-tight leading-tight text-white mb-3">
                MUST-READ EVENT INSTRUCTIONS &amp; GUIDELINES
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 font-medium leading-relaxed mb-6">
                Review essential attendee guidelines, required equipment checklist, venue transport instructions, pre-built code rules, and participant perk eligibility before arriving on Sunday, 16 August 2026.
              </p>

              {/* Quick Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                <div className="flex items-center gap-2.5 text-xs text-gray-200 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#ED1C24] flex-shrink-0" />
                  <span>Laptop, Charger &amp; Student ID Required</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-gray-200 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#ED1C24] flex-shrink-0" />
                  <span>Dwarka Sector 11 Metro Station (5-min walk)</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-gray-200 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#ED1C24] flex-shrink-0" />
                  <span>Pre-Built Code Strictly Prohibited</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-gray-200 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#ED1C24] flex-shrink-0" />
                  <span>Free .xyz Domain &amp; Complimentary Refreshments</span>



                </div>
              </div>
            </div>

            {/* Right Action Button */}
            <div className="flex-shrink-0">
              <Link
                href="/instructions"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-[#ED1C24] hover:bg-red-700 text-white font-display font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:shadow-red-600/30 transition-all transform hover:-translate-y-0.5 group"
              >
                VIEW FULL INSTRUCTIONS
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
