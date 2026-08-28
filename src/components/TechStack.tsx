"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface TechItem {
  name: string;
  logo: string;
  invertInDark?: boolean;
}

export default function TechStack() {
const defaultTechItems: TechItem[] = [
    { name: "Next.js", logo: "/images/tech/NextJs.svg" },
    { name: "React", logo: "/images/tech/React.svg" },
    { name: "MongoDB", logo: "/images/tech/MongoDB.svg" },
    { name: "Supabase", logo: "/images/tech/SupaBase.svg" },
    { name: "Vercel", logo: "/images/tech/Vercel.svg" },
    { name: "GitHub", logo: "/images/tech/GitHub.svg" },
  ];

  return (
    <section id="tech-stack" className="py-16 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-white/10 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display font-black text-2xl sm:text-3xl text-gray-950 dark:text-white uppercase tracking-tight relative inline-block pb-3 transition-colors">
            WE ARE WORKING WITH
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#ED1C24] rounded-full" />
          </h2>
        </motion.div>

        {/* Tech Stack Pure SVG Logo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
          {defaultTechItems.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -4, scale: 1.05 }}
              className="bg-white/80 dark:bg-gray-900/80 border border-gray-200/80 dark:border-white/15 rounded-2xl p-3 h-24 flex items-center justify-center shadow-md hover:shadow-xl hover:border-gray-300 dark:hover:border-red-500/40 backdrop-blur-xl transition-all duration-300 group"
            >
              <div className="w-full h-full rounded-xl bg-white p-2.5 flex items-center justify-center border border-gray-100 dark:border-white/20 shadow-xs group-hover:border-red-500/30 transition-colors overflow-hidden">
                <Image
                  src={tech.logo}
                  alt={tech.name}
                  width={120}
                  height={48}
                  className="w-auto h-10 max-w-[85%] object-contain transition-transform group-hover:scale-110"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

