import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Event Instructions & Guidelines",
  description:
    "Official event rules, participant guidelines, venue info, and requirements for MATRIX DELHI Under-18 Hackathon.",
};

export default function InstructionsPage() {
  const instructions = [
    {
      step: "01",
      category: "ELIGIBILITY & AGE VERIFICATION",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      items: [
        "MATRIX DELHI is strictly open to Under-18 students and current Class 12 students only.",
        "A valid physical or digital Student ID card or proof of age must be with you.",

        "Unregistered visitors or non-participants will not be allowed inside the hackathon hall.",
      ],
    },
    {
      step: "02",
      category: "TEAM SIZE & COMPOSITION",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      items: [
        "Participants may compete either Solo (1 member) or as a Duo (2 members).",
        "Team members must be registered under the official registration Google Form prior to event day.",
        "Solo builders can find teammates beforehand in the official WhatsApp community group before registering. Once registered, team registration is final.",

      ],
    },
    {
      step: "03",
      category: "EQUIPMENT & INTERNET RECOMMENDATIONS",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      items: [
        "Bring your laptop, laptop charger, mouse, headphones, and student ID card.",
        "High-speed campus Wi-Fi will be available, but speeds may fluctuate if 120+ builders connect simultaneously.",
        "RECOMMENDATION: Please carry a mobile SIM card with an active data pack for personal hotspot to ensure uninterrupted high-speed internet.",
        "POWER OUTLETS: Campus wall sockets are limited. While a few extension cords will be provided at the venue, it is highly recommended that you bring your own multi-socket power extension cord.",

      ],
    },
    {
      step: "04",
      category: "CODE & PROJECT INTEGRITY",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      items: [
        "PRE-BUILT CODE IS STRICTLY PROHIBITED in any form. All code, design, and logic must be written inside the venue during the official 12-hour hackathon.",
        "SPONSOR TECH STACK REQUIREMENTS: As per sponsor and partner guidelines, participants are expected to build using Next.js or React for the frontend, and MongoDB or Supabase for the database.",
        "SUBMISSION & LIVE HOSTING: All projects must be pushed to a public GitHub repository with a clear README and deployed live on Vercel (on any domain) before the 5:00 PM submission deadline.",
      ],

    },
    {
      step: "05",
      category: "VENUE LOCATION & NEAREST METRO",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      items: [
        "Venue: CM Shri School (RPVV), Sector 10, Dwarka, New Delhi 110075.",
        "Nearest Metro: DWARKA SECTOR 11 METRO STATION on the Blue Line.",
        "The venue campus is just 400 to 500 meters (a 5-minute walk) from Dwarka Sector 11 Metro Station.",
      ],
    },
    {
      step: "06",
      category: "FOOD, SNACKS & MEALS",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      items: [
        "Complimentary energy drinks and refreshments will be provided during the lunch interval.",
        "Participants desiring a full lunch/meal are welcome to bring home-packed lunch or purchase food from eateries and shops right outside the campus.",
      ],
    },
    {
      step: "07",
      category: "PARTICIPANT PERKS & WINNER REWARDS",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.504-1.125-1.125-1.125h-6.75c-.621 0-1.125.504-1.125 1.125v3.375m9 0h-9m9-15a3 3 0 013 3v2.25c0 1.954-1.42 3.58-3.3 3.882a6.75 6.75 0 01-11.4 0c-1.88-.302-3.3-1.928-3.3-3.882V6.75a3 3 0 013-3h15z" />
        </svg>
      ),
      items: [
        "CRITICAL ELIGIBILITY NOTE: Participant perks and certificates are strictly for checked-in attendees who submit a project at the hackathon venue (not for mere registrants).",
        "WHAT PARTICIPANTS GET:",
        (
          <span key="xyz">
            • Free 1-year .xyz domain + WHOIS privacy protection + Weebly Website Builder worth ₹1,500 sponsored by{" "}
            <a
              href="https://gen.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-gray-900 dark:text-white hover:underline hover:text-[#ED1C24]"
            >
              gen.xyz
            </a>.
          </span>
        ),
        "• An exclusive live interactive session on 'How to Build Crazy Websites with AI'.",
        (
          <span key="headshot">
            • Complimentary{" "}
            <a
              href="https://headshot.energy"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-gray-900 dark:text-white hover:underline hover:text-[#ED1C24]"
            >
              Headshot Energy Drink
            </a>{" "}
            provided during lunch interval (sponsored by Official Drinks Partner Headshot Energy).
          </span>
        ),



        "• Official Participation Certificate featuring official sponsor co-branding (strictly 1 certificate provided per submitted project/team).",
        "WHAT WINNERS & TOP BUILDERS GET:",
        (
          <span key="blunt">
            • Deadshot.io Esports Winner Special Perk: Exclusive{" "}
            <a
              href="https://goblunt.com/products/buy-blunt-air-max-balanced-sound-with-30-hr-playtime?srsltid=AfmBOoo4Tb7DP7O5CDPixuzUgIh8ODSdcoXJUm9PRMxth1RxCo8oOKUI"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-gray-900 dark:text-white hover:underline hover:text-[#ED1C24]"
            >
              BLUNT Air Max Earpods
            </a>{" "}
            Coupon Code for an 86% Discount (awarded to Deadshot.io Esports Tournament Winner)!
          </span>
        ),
        "• Junior Category Award (Classes 6th – 8th): Dedicated winner distinction, certificates, and prizes recognizing the best web development project built by junior innovators in Grades 6–8.",
        "• Work-From-Home (WFH), Offline, or Hybrid Internship Opportunities for top winners (also eligible for participants who build an appreciable website).",
        "• Official Winner Certificates featuring sponsor branding.",
        "• Champion Trophies, gift vouchers, domain credits, and partner perks (subject to final sponsor partner fulfillment).",
      ],
    },

  ];

  return (
    <main className="min-h-screen flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-500">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-32 pb-16 bg-gray-50/70 dark:bg-gray-900/60 border-b border-gray-100 dark:border-white/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-xs font-bold text-[#ED1C24] tracking-widest uppercase mb-3 block">
            OFFICIAL HACKATHON GUIDE
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-gray-950 dark:text-white uppercase tracking-tight mb-4">
            EVENT INSTRUCTIONS &amp; RULES
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-medium leading-relaxed">
            Please read these guidelines carefully before attending MATRIX DELHI on Sunday, 16 August 2026 at CM Shri School, Dwarka Sector 10, New Delhi.
          </p>

          {/* Quick Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://chat.whatsapp.com/L4Z8V1Rvh9U6O8s2J3k7m9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md hover:bg-[#20bd5a] transition-all transform hover:-translate-y-0.5"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
              </svg>
              JOIN WHATSAPP GROUP
            </a>
            <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-900 text-gray-200 dark:bg-gray-800 font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md cursor-not-allowed border border-gray-700">
              SPOTS FILLED — MEET YOU AT THE EVENT! 🚀
            </span>


          </div>
        </div>
      </section>

      {/* Main Instructions Grid */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex-grow">
        <div className="space-y-8">
          {instructions.map((item) => (
            <div
              key={item.step}
              className="bg-white/80 dark:bg-gray-900/80 border border-gray-200/90 dark:border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-md hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="text-xs font-black text-white bg-[#ED1C24] px-3 py-1 rounded-full uppercase tracking-wider">
                  STEP {item.step}
                </span>
                <div className="w-9 h-9 rounded-xl bg-red-50 dark:bg-red-950/60 text-[#ED1C24] flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <h2 className="font-display font-black text-base sm:text-xl text-gray-950 dark:text-white uppercase tracking-wide">
                  {item.category}
                </h2>
              </div>

              <ul className="space-y-3 pl-2">
                {item.items.map((line, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-medium leading-relaxed">
                    <span className="text-[#ED1C24] font-bold mt-0.5">•</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Back Link */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-display font-bold text-xs sm:text-sm text-[#ED1C24] uppercase tracking-wider hover:underline"
          >
            ← BACK TO HOME PAGE
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
