import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why CM Shri Sector-10 Dwarka | Official Venue",
  description:
    "Discover why CM Shri School Sector-10 Dwarka was chosen as the official venue for MATRIX DELHI. Ranked #1 in Delhi and #3 in India by Education World, with world-class facilities and IITian toppers.",
  alternates: {
    canonical: "/why-cm-shri",
  },
  openGraph: {
    title: "Why CM Shri Sector-10 Dwarka | MATRIX DELHI Venue",
    description:
      "Explore the achievements, infrastructure, and #1 state ranking of CM Shri School Sector-10 Dwarka.",
    url: "https://delhihacks.me/why-cm-shri",
  },
};

export default function WhyCmShriLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
