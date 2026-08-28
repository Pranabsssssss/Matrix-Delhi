"use client";

import { motion } from "framer-motion";

export default function Prizes() {
  return (
    <section id="prizes" className="py-20 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-white/10 relative overflow-hidden transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-black text-3xl sm:text-4xl text-gray-950 dark:text-white uppercase tracking-tight relative inline-block pb-3 transition-colors">
            PARTICIPANT PERKS &amp; WINNER REWARDS
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#ED1C24] rounded-full" />
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mt-2">
            EVERY SUBMITTED HACKER GETS EXCLUSIVE SPONSOR PERKS &amp; CERTIFICATES
          </p>
        </motion.div>

        {/* Note Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 rounded-2xl p-4 sm:p-5 mb-12 text-center max-w-4xl mx-auto"
        >
          <p className="text-xs sm:text-sm font-bold text-amber-900 dark:text-amber-200 uppercase tracking-wide">
            ⚠️ IMPORTANT NOTE: ALL PARTICIPANT PERKS &amp; CERTIFICATES ARE STRICTLY RESERVED FOR CHECKED-IN HACKERS WHO SUBMIT A PROJECT AT THE HACKATHON VENUE (NOT FOR MERE REGISTRANTS).
          </p>
        </motion.div>

        {/* 2 Grid Cards: Participants Perks vs Winners Rewards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Card 1: What Participants Get */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white/90 dark:bg-gray-900/90 border border-gray-200 dark:border-white/15 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl backdrop-blur-xl hover:border-red-500/30 transition-all"
          >
            <div>
              {/* Badge */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800/40 text-[#ED1C24] flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                </div>
                <div>
                  <span className="text-[10px] font-black text-[#ED1C24] tracking-widest uppercase block">
                    FOR ALL SUBMITTED HACKERS
                  </span>
                  <h3 className="font-display font-black text-xl text-gray-950 dark:text-white uppercase tracking-wide">
                    WHAT PARTICIPANTS GET
                  </h3>
                </div>
              </div>

              {/* List */}
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-red-100 dark:bg-red-950 text-[#ED1C24] font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900 dark:text-gray-100 uppercase tracking-wide">
                      Free .xyz Domain &amp; WHOIS Privacy (₹1,500 Value)
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 font-medium leading-relaxed mt-0.5">
                      Sponsored by <span className="font-bold text-gray-900 dark:text-white">gen.xyz</span> — Includes 1-year domain registration, WHOIS privacy protection, and Weebly Website Builder.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-red-100 dark:bg-red-950 text-[#ED1C24] font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900 dark:text-gray-100 uppercase tracking-wide">
                      AI Web Development Session
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 font-medium leading-relaxed mt-0.5">
                      An exclusive live interactive workshop on <span className="italic font-semibold">&quot;How to Build Crazy Websites with AI&quot;</span>.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-red-100 dark:bg-red-950 text-[#ED1C24] font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900 dark:text-gray-100 uppercase tracking-wide">
                      Complimentary Refreshments &amp; Drinks
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 font-medium leading-relaxed mt-0.5">
                      Complimentary energy drinks and refreshments served during the lunch break! (Participants can also bring their own lunch).
                    </p>



                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-red-100 dark:bg-red-950 text-[#ED1C24] font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900 dark:text-gray-100 uppercase tracking-wide">
                      Sponsor Co-Branded Certificate (1 Per Team)
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 font-medium leading-relaxed mt-0.5">
                      Official physical Participation Certificate featuring co-branding of all official sponsors (strictly 1 certificate per submitted project/team).
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Card 2: What Winners Get */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gradient-to-br from-red-50/60 via-white to-gray-50/80 dark:from-red-950/30 dark:via-gray-900/90 dark:to-gray-900/70 border border-red-200/90 dark:border-red-900/40 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl backdrop-blur-xl hover:border-[#ED1C24] transition-all"
          >
            <div>
              {/* Badge */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#ED1C24] text-white flex items-center justify-center flex-shrink-0 shadow-md">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.504-1.125-1.125-1.125h-6.75c-.621 0-1.125.504-1.125 1.125v3.375m9 0h-9m9-15a3 3 0 013 3v2.25c0 1.954-1.42 3.58-3.3 3.882a6.75 6.75 0 01-11.4 0c-1.88-.302-3.3-1.928-3.3-3.882V6.75a3 3 0 013-3h15z" />
                  </svg>
                </div>
                <div>
                  <span className="text-[10px] font-black text-[#ED1C24] tracking-widest uppercase block">
                    CHAMPIONS &amp; PODIUM FINISHERS
                  </span>
                  <h3 className="font-display font-black text-xl text-gray-950 dark:text-white uppercase tracking-wide">
                    WHAT WINNERS GET
                  </h3>
                </div>
              </div>

              {/* List */}
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#ED1C24] text-white font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">★</span>
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#ED1C24]/10 dark:bg-[#ED1C24]/20 text-[#ED1C24] font-black text-[10px] uppercase tracking-wider mb-1">
                      🏆 SPECIAL CATEGORY
                    </div>
                    <h4 className="font-bold text-sm text-gray-900 dark:text-gray-100 uppercase tracking-wide">
                      Junior Category Award (Classes 6th – 8th)
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 font-medium leading-relaxed mt-0.5">
                      Dedicated Junior Category Award &amp; Winner Distinction celebrating the best innovative web project created by junior builders in Grades 6 to 8 — with official certificates, awards, and partner perks!
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#ED1C24] text-white font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">★</span>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900 dark:text-gray-100 uppercase tracking-wide">
                      Deadshot.io Esports Winner Special Perk
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 font-medium leading-relaxed mt-0.5">
                      Exclusive <a href="https://goblunt.com/products/buy-blunt-air-max-balanced-sound-with-30-hr-playtime?srsltid=AfmBOoo4Tb7DP7O5CDPixuzUgIh8ODSdcoXJUm9PRMxth1RxCo8oOKUI" target="_blank" rel="noopener noreferrer" className="font-bold text-gray-900 dark:text-white hover:underline hover:text-[#ED1C24]">BLUNT Air Max Earpods</a> Coupon Code for an <span className="font-bold text-[#ED1C24]">86% Discount</span> — awarded strictly to the Deadshot.io Esports Gaming Winner!
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#ED1C24] text-white font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">★</span>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900 dark:text-gray-100 uppercase tracking-wide">
                      Internship Opportunities (WFH / Offline / Hybrid)
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 font-medium leading-relaxed mt-0.5">
                      Exclusive Work-From-Home, Offline, or Hybrid Internship opportunities for top winners — also eligible for participants who build an appreciable website!
                    </p>
                  </div>
                </li>


                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#ED1C24] text-white font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">★</span>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900 dark:text-gray-100 uppercase tracking-wide">
                      Official Winner Certificates
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 font-medium leading-relaxed mt-0.5">
                      Distinction Winner Certificates featuring official co-branding of all sponsors.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#ED1C24] text-white font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">★</span>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900 dark:text-gray-100 uppercase tracking-wide">
                      Champion Trophies &amp; Medals
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 font-medium leading-relaxed mt-0.5">
                      Physical Winner Trophies and awards presented during closing ceremony at 7:00 PM <span className="italic font-semibold text-gray-500 dark:text-gray-400">(subject to final sponsor partner fulfillment)</span>.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#ED1C24] text-white font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">★</span>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900 dark:text-gray-100 uppercase tracking-wide">
                      Gift Vouchers &amp; Partner Perks
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 font-medium leading-relaxed mt-0.5">
                      Gift vouchers, domain credits, sponsor subscriptions, and mentorship opportunities <span className="italic font-semibold text-gray-500 dark:text-gray-400">(subject to final sponsor partnership fulfillment)</span>.
                    </p>

                  </div>
                </li>
              </ul>
            </div>



            {/* Sponsor CTA */}
            <div className="mt-8 pt-6 border-t border-gray-200/80 dark:border-white/10 text-center">
              <a
                href="https://aerochrome.in/forms"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gray-900 dark:bg-white dark:text-gray-900 hover:bg-[#ED1C24] dark:hover:bg-[#ED1C24] dark:hover:text-white text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl shadow-md transition-colors duration-200 group"
              >
                BECOME A SPONSOR
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
