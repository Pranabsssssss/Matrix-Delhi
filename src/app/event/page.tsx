"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useRegistrationStatus } from "@/hooks/useRegistrationStatus";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/components/ThemeProvider";
import AnimatedLogo from "@/components/AnimatedLogo";
import EventRegistrationCard from "@/components/EventRegistrationCard";


export default function EventPage() {
  const { isClosed, isLoaded, timeLeft } = useRegistrationStatus();
  const { theme } = useTheme();
  const [calendarOpen, setCalendarOpen] = useState(false);


  const mapsUrl = "https://maps.app.goo.gl/D4z224kra2NdKtZg8";
  const whatsappUrl = "https://chat.whatsapp.com/ECazuD1CCjy2XdKhODcpyU";
  const instagramUrl = "https://www.instagram.com/delhihacks.me/";

  const googleCalendarUrl =
    "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    "&text=MATRIX+DELHI+2026+%E2%80%94+12-Hour+Under-18+Web+Development+Hackathon" +
    "&dates=20260816T023000Z/20260816T143000Z" +
    "&details=A+12-hour+Under-18+Web+Development+Hackathon+organized+under+Delhi+Hacks+Me.+Code,+build,+and+innovate." +
    "&location=CM+Shri+School,+Sector+10,+Dwarka,+New+Delhi,+Delhi+110075";

  const downloadIcsFile = () => {
    const icsData = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//MATRIX DELHI//Hackathon Event//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      "SUMMARY:MATRIX DELHI 2026 — 12-Hour Under-18 Web Development Hackathon",
      "DESCRIPTION:A 12-hour Under-18 Web Development Hackathon organized under Delhi Hacks Me.",
      "LOCATION:CM Shri School, Sector 10, Dwarka, New Delhi, Delhi 110075",
      "DTSTART:20260816T023000Z",
      "DTEND:20260816T143000Z",
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", "matrix-delhi-2026.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white selection:bg-[#ED1C24] selection:text-white py-8 sm:py-12 relative overflow-hidden transition-colors duration-300">
      {/* Luma-style Ambient Glow Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-red-500/10 dark:bg-red-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Navigation */}
        <div className="flex items-center justify-between mb-8 sm:mb-12 pb-6 border-b border-gray-200 dark:border-white/10">
          <Link href="/" className="flex items-center gap-3 group">
            <AnimatedLogo size="md" />
            <div className="flex flex-col">


              <span className="font-display font-black text-lg tracking-wider text-gray-950 dark:text-white leading-none">
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
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 hover:text-gray-950 dark:hover:text-white transition-colors bg-white dark:bg-white/5 border border-gray-300/80 dark:border-white/10 px-4 py-2 rounded-xl backdrop-blur-md shadow-xs"
            >
              ← Return to Home
            </Link>
          </div>
        </div>

        {/* Luma Main Event Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Event Info & Location Map (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Event Title Card */}
            <div className="bg-white/80 dark:bg-white/5 border border-gray-200/90 dark:border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-xl">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-[#ED1C24]/10 dark:bg-[#ED1C24]/20 border border-[#ED1C24]/30 dark:border-[#ED1C24]/40 text-[#ED1C24] text-[10px] font-bold tracking-widest uppercase">
                  12-HOUR HACKATHON
                </span>
                <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 text-[10px] font-bold tracking-widest uppercase">
                  IN-PERSON EVENT
                </span>
                <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 text-[10px] font-bold tracking-widest uppercase">
                  UNDER-18 ONLY
                </span>
              </div>

              <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-gray-950 dark:text-white uppercase tracking-tight leading-tight mb-4">
                MATRIX DELHI 2026
              </h1>

              <p className="text-sm text-gray-600 dark:text-gray-300 font-medium leading-relaxed">
                A 12-hour Under-18 Web Development Hackathon organized under Delhi Hacks Me where young builders collaborate, code, and launch real solutions.
              </p>
            </div>

            {/* Date & Time Block with Liquid Glass Add to Calendar */}
            <div className="bg-white/80 dark:bg-white/5 border border-gray-200/90 dark:border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-30">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 text-[#ED1C24] flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>

                <div>
                  <span className="text-xs font-bold text-gray-500 dark:text-gray-400 tracking-widest uppercase block mb-1">
                    DATE &amp; TIME
                  </span>
                  <h3 className="font-display font-bold text-lg text-gray-950 dark:text-white uppercase">
                    Sunday, 16 August 2026
                  </h3>
                  <p className="text-sm text-[#ED1C24] font-bold tracking-wider uppercase mt-1">
                    8:00 AM – 8:00 PM IST (12 Hours)
                  </p>
                </div>
              </div>

              {/* Add to Calendar Liquid Glass Dropdown */}
              <div className="relative w-full sm:w-auto flex-shrink-0 z-50">
                <button
                  onClick={() => setCalendarOpen(!calendarOpen)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white dark:bg-white/10 hover:bg-gray-100 dark:hover:bg-white/20 text-gray-900 dark:text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl border border-gray-300 dark:border-white/15 backdrop-blur-md transition-all active:scale-95 shadow-sm"
                >
                  <svg className="w-4 h-4 text-[#ED1C24]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  <span>ADD TO CALENDAR</span>
                </button>

                <AnimatePresence>
                  {calendarOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-3 w-64 rounded-2xl bg-white/95 dark:bg-gray-900/95 border border-gray-200/90 dark:border-white/20 shadow-2xl backdrop-blur-2xl p-2.5 z-[100] text-gray-900 dark:text-white"
                    >
                      <a
                        href={googleCalendarUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setCalendarOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 text-xs font-bold transition-colors"
                      >
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                        Google Calendar
                      </a>

                      <button
                        onClick={() => {
                          downloadIcsFile();
                          setCalendarOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 text-xs font-bold transition-colors text-left"
                      >
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                        Apple Calendar / Outlook (.ics)
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Visual Location & Google Maps Card */}
            <div className="bg-white/80 dark:bg-white/5 border border-gray-200/90 dark:border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-6 relative z-10">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 text-[#ED1C24] flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-gray-500 dark:text-gray-400 tracking-widest uppercase block mb-1">
                      EVENT LOCATION
                    </span>
                    <Link
                      href="/why-cm-shri"
                      className="font-display font-bold text-lg text-gray-950 dark:text-white hover:text-[#ED1C24] dark:hover:text-[#ED1C24] uppercase tracking-wide transition-colors"
                    >
                      CM SHRI SCHOOL, SECTOR 10, DWARKA
                    </Link>
                    <p className="text-xs text-gray-600 dark:text-gray-300 font-medium mt-1">
                      Sector 10, Dwarka, New Delhi, Delhi 110075
                    </p>
                  </div>
                </div>

                {/* Single Open in Maps Button */}
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-white dark:bg-white/10 hover:bg-[#ED1C24] hover:text-white dark:hover:bg-[#ED1C24] text-gray-900 dark:text-white font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl border border-gray-300 dark:border-white/15 transition-all flex-shrink-0 active:scale-95 shadow-xs"
                >
                  OPEN IN MAPS ↗
                </a>
              </div>

              {/* Dark / Light Theme Google Maps Embed Frame Centered on RPVV Pin */}
              <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-inner">
                <iframe
                  title="CM Shri School Sector 10 Dwarka Google Map Centered"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.5510619183493!2d77.0535!3d28.58345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1b19905d414f%3A0x8bb8c8c5c76088f1!2sDr.%20B.R.%20Ambedkar%20School%20of%20Specialised%20Excellence%2C%20Sector%2010%20Dwarka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                  }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full pointer-events-auto filter dark:invert-[90%] dark:hue-rotate-180 dark:brightness-95 dark:contrast-90"
                />
              </div>
            </div>
          </motion.div>

          {/* Right Column: Campus Cover Image, Registration & Community (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Luma Campus Cover Image Card (Using school-bg.webp) */}
            <div className="relative rounded-3xl overflow-hidden border border-gray-200/90 dark:border-white/10 shadow-xl group h-64 sm:h-72">
              <Image
                src="/images/school-bg.webp"
                alt="CM Shri School Campus Cover"
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] font-bold text-[#ED1C24] tracking-widest uppercase block mb-1">
                  VENUE CAMPUS — CM SHRI DWARKA
                </span>
                <h3 className="font-display font-black text-xl text-white uppercase">
                  STATE OF THE ART VENUE
                </h3>
              </div>
            </div>

            {/* Student Registration & QR Attendance Gateway Card */}
            <EventRegistrationCard />


            {/* Community Links Box */}
            <div className="bg-white/80 dark:bg-white/5 border border-gray-200/90 dark:border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-4">
              <span className="text-xs font-bold text-gray-500 dark:text-gray-400 tracking-widest uppercase block">
                COMMUNITY &amp; UPDATES
              </span>

              <div className="space-y-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-white/5 hover:bg-[#25D366]/10 border border-gray-200 dark:border-white/10 hover:border-[#25D366]/40 transition-all text-xs font-bold uppercase tracking-wider group"
                >
                  <span className="flex items-center gap-2 text-gray-900 dark:text-white">
                    <svg className="w-4 h-4 fill-[#25D366]" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                    WhatsApp Groupchat
                  </span>
                  <span className="text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">→</span>
                </a>

                <a
                  href={`mailto:${"ask@delhihacks.me"}`}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-white/5 hover:bg-red-500/10 border border-gray-200 dark:border-white/10 hover:border-red-500/40 transition-all text-xs font-bold uppercase tracking-wider group"
                >
                  <span className="flex items-center gap-2 text-gray-900 dark:text-white">
                    <svg className="w-4 h-4 fill-[#ED1C24]" viewBox="0 0 24 24">
                      <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                      <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                    </svg>
                    Email: ask@delhihacks.me
                  </span>
                  <span className="text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">→</span>
                </a>

                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-white/5 hover:bg-pink-500/10 border border-gray-200 dark:border-white/10 hover:border-pink-500/40 transition-all text-xs font-bold uppercase tracking-wider group"
                >
                  <span className="flex items-center gap-2 text-gray-900 dark:text-white">
                    <svg className="w-4 h-4 fill-pink-500" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    Instagram @delhihacks.me
                  </span>
                  <span className="text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">→</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer Bar */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs text-gray-500 dark:text-gray-400 font-medium">
          <span>© 2026 MATRIX DELHI. All rights reserved.</span>
          <span>Organized under Delhi Hacks Me • Powered by Aerochrome</span>
        </div>
      </div>
    </main>
  );
}
