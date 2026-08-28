"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FaqItem {
  question: string;
  answer: string;
}

const defaultFaqs: FaqItem[] = [
  {
    question: "Who is eligible to participate in MATRIX DELHI?",
    answer: "MATRIX DELHI is exclusively open to Under-18 students and current Class 12 students. Student ID card or proof of age will be verified at check-in.",
  },
  {
    question: "Is there any registration fee to attend?",
    answer: "No, participation in MATRIX DELHI is 100% free of charge for all registered attendees!",
  },
  {
    question: "What is the team size requirement?",
    answer: "You may participate either individually (solo) or in a team of up to 2 members (duo).",
  },
  {
    question: "What items should I bring to the venue?",
    answer: "Please bring your laptop, charger, mouse, headphones, and student ID. While high-speed venue Wi-Fi is available, internet speeds may fluctuate if 120 participants use it simultaneously — carrying a mobile SIM with an active data pack for personal hotspot is recommended.",
  },
  {
    question: "What is the nearest Metro Station to the venue?",
    answer: "The nearest station is Dwarka Sector 11 Metro Station on the Blue Line, located at a short 400 to 500 meters walking distance from the campus.",
  },
  {
    question: "Will food and meals be provided?",
    answer: "Complimentary Headshot Energy Drinks will be provided during the lunch interval (sponsored by Official Drinks Partner Headshot Energy). From our side, Headshot Energy Drink will be provided. Participants who desire a full meal are welcome to bring home-packed lunch or purchase food from nearby shops right around the campus.",


  },
  {
    question: "Is pre-built code allowed in the hackathon?",
    answer: "No, pre-built code is strictly not allowed in any way. All project code and core development must be written inside the venue during the official hackathon hours.",
  },
  {
    question: "Where can I find event updates and connect with attendees?",
    answer: "You can join our official WhatsApp group to receive real-time announcements, guidelines, and connect with fellow builders before and during the event.",
  },
  {
    question: "Will Wi-Fi and power extension cords be provided?",
    answer: "High-speed Wi-Fi is available on campus (bringing a personal hotspot SIM as backup is recommended). As venue power sockets are limited, participants are strongly encouraged to bring their own power extension cord if possible.",
  },
  {
    question: "What certificates and awards will participants receive?",
    answer: "All checked-in teams who build and submit a project at the venue will receive an official physical participation certificate (1 certificate per team/submission), and top winning teams will receive official winner certificates, awards, and partner perks!",
  },
];

interface FaqSectionProps {
  customFaqs?: FaqItem[];
}

export default function FaqSection({ customFaqs }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = customFaqs && customFaqs.length > 0 ? customFaqs : defaultFaqs;

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-white/10 transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-black text-3xl sm:text-4xl text-gray-950 dark:text-white uppercase tracking-tight relative inline-block pb-3 transition-colors">
            FREQUENTLY ASKED QUESTIONS
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#ED1C24] rounded-full" />
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mt-2">
            EVERYTHING YOU NEED TO KNOW ABOUT MATRIX DELHI
          </p>
        </motion.div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                className="bg-white/80 dark:bg-gray-900/80 border border-gray-200/90 dark:border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl transition-all duration-300 shadow-xs hover:shadow-md"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none group"
                >
                  <span className="font-display font-bold text-sm sm:text-base text-gray-950 dark:text-white uppercase tracking-wide transition-colors group-hover:text-[#ED1C24] dark:group-hover:text-[#ED1C24]">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? "bg-[#ED1C24] text-white rotate-180"
                        : "bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-0 border-t border-gray-100 dark:border-white/5">
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium leading-relaxed mt-4 transition-colors">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
