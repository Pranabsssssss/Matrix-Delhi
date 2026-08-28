import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Code of Conduct",
  description:
    "Official Code of Conduct for MATRIX DELHI Hackathon. Guidelines for a safe, inclusive, and collaborative environment.",
  alternates: {
    canonical: "/coc",
  },
  openGraph: {
    title: "Code of Conduct | MATRIX DELHI",
    description: "Official Code of Conduct for MATRIX DELHI Hackathon.",
    url: "https://delhihacks.me/coc",
  },
};

export default function CocLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
