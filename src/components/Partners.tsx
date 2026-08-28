"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface PartnerItem {
  name: string;
  subtext?: string;
  logo: React.ReactNode;
  url?: string;
}

export default function Partners() {
  const partners: PartnerItem[] = [
    {
      name: "CM SHRI SCHOOL",
      subtext: "SECTOR 10, DWARKA, DELHI",
      url: "/why-cm-shri",
      logo: (
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-white p-1 border border-gray-200 dark:border-white/20 shadow-md flex-shrink-0 overflow-hidden flex items-center justify-center">
            <Image
              src="/images/cms.webp"
              alt="CM SHRI School Logo"
              width={56}
              height={56}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-display font-extrabold text-base sm:text-lg text-gray-950 dark:text-white tracking-wide leading-tight transition-colors">
              CM SHRI SCHOOL
            </span>
            <span className="text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 tracking-wider uppercase transition-colors mt-0.5">
              SECTOR 10, DWARKA, DELHI
            </span>
          </div>
        </div>
      ),
    },
    {
      name: "AEROCHROME",
      subtext: "SYSTEM DESIGN AGENCY",
      url: "https://www.aerochrome.in/",
      logo: (
        <div className="flex items-center gap-4">
          <Image
            src="/images/aerochrome.svg"
            alt="AEROCHROME Logo"
            width={56}
            height={56}
            className="w-14 h-14 object-contain dark:invert flex-shrink-0"
          />
          <div className="flex flex-col text-left">
            <span className="font-display font-black text-lg sm:text-xl text-gray-950 dark:text-white tracking-widest leading-tight transition-colors">
              AEROCHROME
            </span>
            <span className="text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 tracking-[0.15em] uppercase transition-colors mt-0.5">
              SYSTEM DESIGN AGENCY
            </span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="partners" className="py-20 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-white/10 transition-colors duration-500">
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
            OUR PARTNERS
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#ED1C24] rounded-full" />
          </h2>
        </motion.div>

        {/* Partners Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {partners.map((partner, index) => {
            const CardContent = (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-white/80 dark:bg-gray-900/80 border border-gray-200/80 dark:border-white/15 rounded-2xl p-6 h-36 flex items-center justify-center shadow-md hover:shadow-xl hover:border-gray-300 dark:hover:border-red-500/40 backdrop-blur-xl transition-all duration-300 group"
              >
                {partner.logo}
              </motion.div>
            );

            if (!partner.url) return <div key={partner.name}>{CardContent}</div>;

            return partner.url.startsWith("http") ? (
              <a
                key={partner.name}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                {CardContent}
              </a>
            ) : (
              <a key={partner.name} href={partner.url} className="block">
                {CardContent}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
