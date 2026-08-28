"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/components/ThemeProvider";
import AnimatedLogo from "@/components/AnimatedLogo";


export default function WhyCmShriPage() {
  const { theme } = useTheme();

  const rankings = [
    {
      rank: "#1 IN DELHI",
      title: "Delhi State Ranking",
      subtitle: "Education World Rankings",
      description: "Ranked #1 State Government School in Delhi by Education World India School Rankings.",
    },
    {
      rank: "#3 IN INDIA",
      title: "All-India Ranking",
      subtitle: "Consistently #1 Previous Years",
      description: "Ranked #3 All-India State Govt School this year, and consistently #1 in previous consecutive years.",
    },
    {
      rank: "IIT STEM",
      title: "IITian & Tech Talent",
      subtitle: "National Achievers",
      description: "Proven track record of producing IITian toppers, JEE rankers, and future technology leaders.",
    },
  ];

  const highlights = [
    {
      title: "IITian Toppers & Tech Experts",
      description:
        "CM Shri School Sector-10 Dwarka is a premier incubator for top technical talent. Students from this school consistently crack IIT JEE Advanced, National Science Olympiads, and lead tech initiatives.",
      icon: (
        <svg className="w-6 h-6 text-[#ED1C24]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      ),
    },
    {
      title: "World-Class Infrastructure",
      description:
        "Equipped with high-performance computer laboratories, high-speed fiber internet, modern tech auditoriums, smart digital classrooms, and top-grade event security.",
      icon: (
        <svg className="w-6 h-6 text-[#ED1C24]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0h-18" />
        </svg>
      ),
    },
    {
      title: "Consistently Top-Ranked Institution",
      description:
        "Recognized by Education World as the #1 State Government School in Delhi and #3 across all of India this year, maintaining an unbroken legacy of academic excellence.",
      icon: (
        <svg className="w-6 h-6 text-[#ED1C24]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.504-1.125-1.125-1.125h-6.75c-.621 0-1.125.504-1.125 1.125v3.375m9 0h-9m9-15a3 3 0 013 3v2.25c0 1.954-1.42 3.58-3.3 3.882a6.75 6.75 0 01-11.4 0c-1.88-.302-3.3-1.928-3.3-3.882V6.75a3 3 0 013-3h15z" />
        </svg>
      ),
    },
    {
      title: "Built for MATRIX DELHI Hackathon",
      description:
        "The venue offers a high-energy, collaborative environment specifically chosen to empower 100+ student developers for 12 hours of rapid web development and innovation.",
      icon: (
        <svg className="w-6 h-6 text-[#ED1C24]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
  ];

  return (
    <main className="relative min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white overflow-hidden py-12 sm:py-16 transition-colors duration-500">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        <img
          src="/images/school-bg.webp"
          alt="CM Shri School Campus Background"
          className="w-full h-full object-cover object-top opacity-40 dark:opacity-20 filter contrast-105"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-white/60 dark:bg-gray-950/80 pointer-events-none transition-colors duration-500" />
        {/* Soft Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-gray-950 dark:via-gray-950/80 pointer-events-none transition-colors duration-500" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between mb-10 pb-6 border-b border-gray-200/80 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md rounded-2xl px-6 py-4 shadow-xs">
          <Link href="/" className="flex items-center gap-3 group">
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
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 hover:text-[#ED1C24] dark:hover:text-[#ED1C24] transition-colors"
            >
              ← Return to Home
            </Link>
          </div>
        </div>

        {/* Hero Showcase Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 dark:bg-white/5 border border-gray-200/90 dark:border-white/10 rounded-3xl p-8 sm:p-12 backdrop-blur-xl shadow-xl mb-12 text-center"
        >
          <span className="px-4 py-1.5 rounded-full bg-[#ED1C24]/10 dark:bg-[#ED1C24]/20 border border-[#ED1C24]/30 text-[#ED1C24] text-xs font-bold tracking-widest uppercase inline-block mb-4">
            OFFICIAL VENUE PARTNER
          </span>

          <h1 className="font-display font-black text-3xl sm:text-5xl text-gray-950 dark:text-white uppercase tracking-tight leading-tight mb-4">
            CM SHRI SCHOOL, SECTOR-10 DWARKA
          </h1>

          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-medium leading-relaxed max-w-3xl mx-auto">
            Home to Delhi&apos;s finest academic achievers, IIT JEE rankers, and technology innovators. Consistently ranked the #1 State Government School in Delhi and #3 across all of India.
          </p>
        </motion.div>

        {/* Rankings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {rankings.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/80 dark:bg-white/5 border border-gray-200/90 dark:border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-md text-center group hover:border-[#ED1C24]/50 transition-all"
            >
              <span className="font-display font-black text-3xl sm:text-4xl text-[#ED1C24] tracking-tight block mb-2">
                {item.rank}
              </span>
              <h3 className="font-display font-bold text-sm text-gray-950 dark:text-white uppercase tracking-wider mb-1">
                {item.title}
              </h3>
              <span className="text-[10px] font-bold text-gray-400 dark:text-gray-400 tracking-widest uppercase block mb-3">
                {item.subtitle}
              </span>
              <p className="text-xs text-gray-600 dark:text-gray-300 font-medium leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/80 dark:bg-white/5 border border-gray-200/90 dark:border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-md flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-100 dark:border-red-900/40 flex items-center justify-center flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-gray-950 dark:text-white uppercase tracking-wide mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 font-medium leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Bar */}
        <div className="text-center">
          <Link
            href="/event"
            className="inline-flex items-center gap-2 bg-[#ED1C24] hover:bg-[#d61920] text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-xl shadow-md transition-all active:scale-95"
          >
            VIEW EVENT DETAILS &amp; MAP ↗
          </Link>
        </div>
      </div>
    </main>
  );
}
