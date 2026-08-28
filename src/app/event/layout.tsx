import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Event Details & Venue Map",
  description:
    "Official event details and Google Maps location for MATRIX DELHI — 12-Hour Under-18 Web Development Hackathon on 16 August 2026 (8:00 AM – 8:00 PM) at CM Shri School Sector 10 Dwarka.",
  alternates: {
    canonical: "/event",
  },
  openGraph: {
    title: "MATRIX DELHI Event Details & Venue Map",
    description:
      "Join us on 16 August 2026 (8:00 AM – 8:00 PM) at CM Shri School Sector 10 Dwarka. View event schedule and Google Maps location.",
    url: "https://delhihacks.me/event",
  },
};

export default function EventLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
