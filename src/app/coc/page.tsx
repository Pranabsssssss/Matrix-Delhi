"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/components/ThemeProvider";
import AnimatedLogo from "@/components/AnimatedLogo";


export default function CodeOfConduct() {
  const { theme } = useTheme();

  const rules = [
    {
      num: "1",
      title: "Core Principle: Respect",
      content:
        "The MATRIX DELHI Hackathon is dedicated to providing a safe, inclusive, and welcoming experience for everyone, regardless of gender, sexual orientation, disability, physical appearance, race, or religion. We do not tolerate harassment in any form.",
    },
    {
      num: "2",
      title: "Harassment & Anti-Discrimination Policy",
      content:
        "Harassment includes, but is not limited to: offensive verbal or written comments, deliberate intimidation, stalking, following, harassing photography or recording, sustained disruption of talks or events, inappropriate physical contact, and unwelcome sexual attention. Participants asked to stop any harassing behavior are expected to comply immediately.",
    },
    {
      num: "3",
      title: "Academic Integrity & Open Source Policy",
      content:
        "All projects must be built during the hackathon timeframe. Using pre-existing code is allowed ONLY if:",
      bullets: [
        "The code is open source and freely available to all participants.",
        "The pre-existing code is explicitly declared during submission.",
        "The core logic and significant value of the project are built during the hackathon.",
      ],
    },
    {
      num: "4",
      title: "AI Usage Policy",
      content:
        "The use of Artificial Intelligence tools (like GitHub Copilot, ChatGPT, Claude, Gemini) is permitted and encouraged as development aids. However, entirely AI-generated projects with no human-authored architecture or meaningful modification will be heavily penalized in the judging criteria.",
    },
    {
      num: "5",
      title: "Submission Rules",
      content: "All participating teams must abide by the following submission guidelines:",
      bullets: [
        "Projects must be submitted before the deadline on the designated platform.",
        "A public GitHub repository containing the source code must be provided.",
        "All submissions must include a clear README.md explaining the project, tech stack, and local setup instructions.",
      ],
    },
    {
      num: "6",
      title: "Photography & Privacy Consent",
      content:
        "By attending the event, participants consent to being photographed and recorded for promotional and documentation purposes by MATRIX DELHI and Aerochrome.",
    },
    {
      num: "7",
      title: "Consequences of Violation",
      content:
        "Participants violating these rules may be sanctioned or expelled from the hackathon without warning or recourse at the sole discretion of the hackathon organizers.",
    },
    {
      num: "8",
      title: "Reporting Violations",
      content:
        "If you are being harassed, notice that someone else is being harassed, or have any other concerns, please contact a hackathon organizer immediately. Organizers can be identified by their distinct badges/shirts.",
    },
    {
      num: "9",
      title: "Acceptance",
      content:
        "By registering for and participating in the MATRIX DELHI Hackathon, you agree to abide by this Code of Conduct in its entirety.",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50/50 dark:bg-gray-950 text-gray-900 dark:text-white py-12 sm:py-16 transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between mb-10 pb-6 border-b border-gray-200 dark:border-white/10">
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

        {/* Hero Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-bold text-[#ED1C24] tracking-widest uppercase mb-2 block">
            COMMUNITY GUIDELINES
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-gray-950 dark:text-white uppercase tracking-tight">
            Code of Conduct
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider mt-2">
            Ensuring a safe, inclusive &amp; fair environment for all hackers
          </p>
        </motion.div>

        {/* Rules Accordion / Cards List */}
        <div className="space-y-6">
          {rules.map((rule, index) => (
            <motion.div
              key={rule.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-white dark:bg-white/5 border border-gray-200/90 dark:border-white/10 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all backdrop-blur-xl"
            >
              <div className="flex items-start gap-4">
                <span className="w-9 h-9 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-100 dark:border-red-900/40 text-[#ED1C24] font-display font-black text-sm flex items-center justify-center flex-shrink-0">
                  0{rule.num}
                </span>

                <div className="flex-grow">
                  <h3 className="font-display font-bold text-base sm:text-lg text-gray-950 dark:text-white uppercase tracking-wide mb-2">
                    {rule.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium leading-relaxed">
                    {rule.content}
                  </p>

                  {rule.bullets && (
                    <ul className="mt-3 space-y-1.5 list-disc list-inside text-xs text-gray-600 dark:text-gray-300 font-medium pl-1">
                      {rule.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Contact Box */}
        <div className="mt-12 text-center bg-white dark:bg-white/5 border border-gray-200/90 dark:border-white/10 rounded-2xl p-6 backdrop-blur-xl">
          <p className="text-xs text-gray-600 dark:text-gray-300 font-medium mb-3">
            Questions regarding our Code of Conduct or need to report an incident?
          </p>
          <a
            href="mailto:ask@delhihacks.me"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#ED1C24] hover:underline uppercase tracking-wider"
          >
            Email Organizers: ask@delhihacks.me ↗
          </a>
        </div>
      </div>
    </main>
  );
}
