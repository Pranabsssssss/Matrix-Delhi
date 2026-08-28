"use client";

import { motion } from "framer-motion";

interface ExpectationItem {
  time: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

export default function WhatToExpect() {
  const steps: ExpectationItem[] = [
    {
      time: "08:00 AM – 09:30 AM",
      title: "OPENING & ORIENTATION",
      subtitle: "Introduction, guidelines and announcements",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.684A1.76 1.76 0 013 12V6.75C3 5.784 3.784 5 4.75 5h.936m0 8.684l.654 1.876" />
        </svg>
      ),
    },
    {
      time: "09:30 AM – 01:00 PM",
      title: "BUILD SPRINT 1",
      subtitle: "Start building your ideas with your team",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
    {
      time: "01:00 PM – 02:00 PM",
      title: "LUNCH & PARTNER SESSIONS",
      subtitle: "Learn, connect and explore opportunities",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      time: "02:00 PM – 05:00 PM",
      title: "BUILD SPRINT 2",
      subtitle: "Continue building and refining",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      time: "05:00 PM – 05:30 PM",
      title: "EVENING REFRESHMENTS",
      subtitle: "Recharge and network",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 0A9.956 9.956 0 0112 11c-2.485 0-4.775-.9-6.536-2.428m12.9 0a9.957 9.957 0 00-2.428-6.536M12 21a9 9 0 100-18 9 9 0 000 18z" />
        </svg>
      ),
    },
    {
      time: "05:30 PM – 07:00 PM",
      title: "FINAL SUBMISSION & JUDGING",
      subtitle: "Present your solution to the judges",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
      ),
    },
    {
      time: "07:00 PM – 07:30 PM",
      title: "RESULTS & CLOSING",
      subtitle: "Winners, closing & next steps",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.504-1.125-1.125-1.125h-6.75c-.621 0-1.125.504-1.125 1.125v3.375m9 0h-9m9-15a3 3 0 013 3v2.25c0 1.954-1.42 3.58-3.3 3.882a6.75 6.75 0 01-11.4 0c-1.88-.302-3.3-1.928-3.3-3.882V6.75a3 3 0 013-3h15z" />
        </svg>
      ),
    },
    {
      time: "07:30 PM – 08:00 PM",
      title: "GAMING SESSION",
      subtitle: "Compete, connect and have fun!",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v4m0 8v4m8-8h-4M8 12H4" />
        </svg>
      ),
    },
  ];

  return (
    <section id="schedule" className="py-20 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-white/10 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-black text-3xl sm:text-4xl text-gray-950 dark:text-white uppercase tracking-tight relative inline-block pb-3 transition-colors">
            WHAT TO EXPECT & SCHEDULE
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#ED1C24] rounded-full" />
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mt-2">
            SUNDAY, 16 AUGUST 2026 — 8:00 AM TO 8:00 PM IST
          </p>
        </motion.div>

        {/* Schedule Timeline Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="bg-white/80 dark:bg-gray-900/80 border border-gray-200/80 dark:border-white/15 rounded-2xl p-6 flex flex-col justify-between shadow-md hover:shadow-xl hover:border-gray-300 dark:hover:border-red-500/40 backdrop-blur-xl transition-all duration-300 group"
            >
              <div>
                {/* Top Badge & Icon Row */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800/40 text-[#ED1C24] tracking-wider uppercase">
                    {step.time}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200/80 dark:border-white/10 text-[#ED1C24] flex items-center justify-center group-hover:scale-110 transition-transform">
                    {step.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-display font-black text-base text-gray-950 dark:text-white uppercase tracking-wide leading-snug mb-2 transition-colors">
                  {step.title}
                </h3>
              </div>

              {/* Subtitle */}
              <p className="text-xs text-gray-600 dark:text-gray-400 font-medium leading-relaxed transition-colors mt-2">
                {step.subtitle}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
