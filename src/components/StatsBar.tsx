"use client";

import { motion } from "framer-motion";

export default function StatsBar() {
  const stats = [
    { value: "12", label: "HOURS" },
    { value: "100+", label: "PARTICIPANTS" },
    { value: "20+", label: "TEAMS" },
    { value: "1", label: "EPIC EXPERIENCE" },
    { value: "∞", label: "POSSIBILITIES" },
  ];

  return (
    <section className="py-12 bg-white dark:bg-gray-950 border-y border-gray-100 dark:border-white/10 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-100 dark:divide-white/10">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center justify-center text-center pt-4 md:pt-0 first:pt-0"
            >
              <span className="font-display font-black text-4xl sm:text-5xl text-[#ED1C24] tracking-tight leading-none">
                {stat.value}
              </span>
              <span className="text-xs font-bold text-gray-800 dark:text-gray-200 tracking-[0.2em] uppercase mt-2 transition-colors">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
