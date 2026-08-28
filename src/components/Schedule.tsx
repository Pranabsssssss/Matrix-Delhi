"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScheduleItem {
  time: string;
  title: string;
  description: string;
  duration: string;
  svgIcon: ReactNode;
  highlight?: boolean;
}

export default function Schedule() {
  const scheduleData: ScheduleItem[] = [
    {
      time: "8:00 – 9:00 AM",
      title: "Entry, Registration & Setup",
      description: "Check-in, team verification, workstation setup and system checks",
      duration: "1 hr",
      svgIcon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
    },
    {
      time: "9:00 – 10:00 AM",
      title: "Hackathon Opening & Introduction",
      description: "Theme, problem statements, rules, judging criteria, guidelines and schedule",
      duration: "1 hr",
      svgIcon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      ),
    },
    {
      time: "10:00 – 11:00 AM",
      title: "Basics & Tutorial Session",
      description: "Git/GitHub, APIs, deployment, tools and hackathon workflow",
      duration: "1 hr",
      svgIcon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      time: "11:00 AM – 1:00 PM",
      title: "SPRINT 1 — Main Hacking Session",
      description: "Kickoff core application development sprint. Mentors available for guidance.",
      duration: "2 hrs",
      highlight: true,
      svgIcon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.24a6 6 0 00-2.12 4.13H4.8" />
        </svg>
      ),
    },
    {
      time: "1:00 – 2:00 PM",
      title: "Lunch Break",
      description: "Complimentary lunch served for all participants, mentors and attendees.",
      duration: "1 hr",
      svgIcon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 0A9.956 9.956 0 0112 11c-2.485 0-4.775-.9-6.536-2.428m12.9 0a9.957 9.957 0 00-2.428-6.536M12 21a9 9 0 100-18 9 9 0 000 18z" />
        </svg>
      ),
    },
    {
      time: "2:00 – 3:00 PM",
      title: "Sponsors & Partners Segment",
      description: "Sponsor introductions, presentations, demos, opportunities and interaction",
      duration: "1 hr",
      svgIcon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
    },
    {
      time: "3:00 – 5:00 PM",
      title: "SPRINT 2 — Final Development Sprint",
      description: "Development, mentoring, testing and polishing. Evening snacks served around 4:00 PM.",
      duration: "2 hrs",
      highlight: true,
      svgIcon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.24a6 6 0 00-2.12 4.13H4.8" />
        </svg>
      ),
    },
    {
      time: "5:00 – 6:00 PM",
      title: "Final Submission Session",
      description: "GitHub repository, README, code push, demo link, submission form and final checks",
      duration: "1 hr",
      svgIcon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
      ),
    },
    {
      time: "6:00 – 7:00 PM",
      title: "Gaming Session",
      description: "Action-packed gaming break for all participants!",
      duration: "1 hr",
      highlight: true,
      svgIcon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c.507-.265 1.096-.412 1.71-.412 2.21 0 4 1.79 4 4 0 .976-.35 1.87-.935 2.565L14.25 6.087zm-4.5 0L4.975 12.24A3.978 3.978 0 014 9.675c0-2.21 1.79-4 4-4 .614 0 1.203.147 1.71.412z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      time: "7:00 – 7:30 PM",
      title: "Results Declaration",
      description: "Winners, runner-ups, special awards and sponsor acknowledgements",
      duration: "30 min",
      highlight: true,
      svgIcon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.504-1.125-1.125-1.125h-6.75c-.621 0-1.125.504-1.125 1.125v3.375m9 0h-9m9-15a3 3 0 013 3v2.25c0 1.954-1.42 3.58-3.3 3.882a6.75 6.75 0 01-11.4 0c-1.88-.302-3.3-1.928-3.3-3.882V6.75a3 3 0 013-3h15z" />
        </svg>
      ),
    },
    {
      time: "7:30 – 8:00 PM",
      title: "Closing & Leaving Ceremony",
      description: "Certificates, photographs, final remarks and departure",
      duration: "30 min",
      svgIcon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="schedule" className="relative py-16 sm:py-20 bg-gray-50/60 dark:bg-gray-950 overflow-hidden border-t border-gray-100 dark:border-white/10 transition-colors duration-500">
      {/* Floating Ambient Tech Background SVGs */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
        {/* Floating Code Icon */}
        <div className="absolute top-10 left-[4%] text-red-500/10 dark:text-red-500/20 animate-float">
          <svg className="w-20 h-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
          </svg>
        </div>

        {/* Floating Clock Icon */}
        <div className="absolute top-16 right-[5%] text-gray-400/15 dark:text-white/10 animate-float-delayed">
          <svg className="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="font-bold text-xs text-[#ED1C24] tracking-widest uppercase mb-2 block">
            HACKATHON SCHEDULE
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-gray-950 dark:text-white uppercase tracking-tight transition-colors">
            12-Hour Event Timeline
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300 tracking-wider uppercase mt-2 transition-colors">
            16 August 2026 • 8:00 AM – 8:00 PM
          </p>
        </motion.div>

        {/* Agenda List Container */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200/90 dark:border-white/10 shadow-xl overflow-hidden divide-y divide-gray-100 dark:divide-white/10 backdrop-blur-xl"
        >
          {scheduleData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              className={`p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6 transition-colors duration-200 group hover:bg-red-50/30 dark:hover:bg-red-950/30 ${
                item.highlight ? "bg-red-50/20 dark:bg-red-950/20" : ""
              }`}
            >
              {/* Left Column: Time & Duration */}
              <div className="flex items-center gap-3 sm:w-52 flex-shrink-0">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 ${
                    item.highlight
                      ? "bg-[#ED1C24] text-white shadow-sm"
                      : "bg-red-50 dark:bg-red-950/50 text-[#ED1C24]"
                  }`}
                >
                  {item.svgIcon}
                </div>

                <div className="flex flex-col">
                  <span
                    className={`font-display font-bold text-xs sm:text-sm tracking-wider uppercase transition-colors ${
                      item.highlight ? "text-[#ED1C24]" : "text-gray-900 dark:text-gray-100"
                    }`}
                  >
                    {item.time}
                  </span>
                  <span className="text-[10px] font-semibold text-gray-400 dark:text-gray-400 uppercase tracking-wider mt-0.5">
                    {item.duration}
                  </span>
                </div>
              </div>

              {/* Right Column: Title & Description */}
              <div className="flex-grow">
                <div className="flex items-center gap-2">
                  <h3
                    className={`font-display font-bold text-sm sm:text-base tracking-wide uppercase transition-colors ${
                      item.highlight ? "text-gray-950 dark:text-white font-black" : "text-gray-900 dark:text-gray-100"
                    }`}
                  >
                    {item.title}
                  </h3>
                  {item.highlight && (
                    <span className="text-[9px] font-bold text-white bg-[#ED1C24] px-2 py-0.5 rounded uppercase tracking-widest hidden sm:inline-block">
                      KEY EVENT
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 font-medium leading-relaxed mt-1 transition-colors">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
