import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description:
    "Register for MATRIX DELHI, the premier 12-hour Under-18 Web Development Hackathon on 16 August 2026.",
  alternates: {
    canonical: "/register",
  },
  openGraph: {
    title: "Register | MATRIX DELHI",
    description: "Register for MATRIX DELHI, the premier 12-hour Under-18 Web Development Hackathon.",
    url: "https://delhihacks.me/register",
  },
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
