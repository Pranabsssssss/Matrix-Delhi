import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://delhihacks.me"),
  title: {
    default: "MATRIX DELHI | 12-Hour Under-18 Web Development Hackathon",
    template: "%s | MATRIX DELHI",
  },
  description:
    "Join MATRIX DELHI, the premier 12-hour Under-18 Web Development Hackathon organized under Delhi Hacks Me. Code, build, innovate, and connect with top mentors on 16 August 2026 at CM Shri School Sector 10 Dwarka, Delhi.",
  keywords: [
    "MATRIX DELHI",
    "Hackathon Delhi",
    "Under-18 Hackathon",
    "Web Development Hackathon",
    "Delhi Hacks Me",
    "Aerochrome",
    "Dwarka Hackathon",
    "Coding Competition Delhi",
    "School Hackathon India",
  ],
  authors: [{ name: "Delhi Hacks Me", url: "https://www.instagram.com/delhihacks.me/" }],
  creator: "Delhi Hacks Me",
  publisher: "Delhi Hacks Me",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "MATRIX DELHI | 12-Hour Under-18 Web Development Hackathon",
    description:
      "Join MATRIX DELHI, the premier 12-hour Under-18 Web Development Hackathon. Build real solutions, compete in sprints, and connect with mentors on 16 August 2026.",
    url: "https://delhihacks.me",
    siteName: "MATRIX DELHI",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/hero-bg.webp",
        width: 1200,
        height: 630,
        alt: "MATRIX DELHI Hackathon Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MATRIX DELHI | Under-18 Web Development Hackathon",
    description:
      "A 12-hour coding challenge for Under-18 developers. Code. Build. Innovate on 16 August 2026 in Dwarka, Delhi.",
    images: ["/images/hero-bg.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "MATRIX DELHI — 12-Hour Under-18 Web Development Hackathon",
    "startDate": "2026-08-16T08:00:00+05:30",
    "endDate": "2026-08-16T20:00:00+05:30",
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": "CM Shri School, Sector 10, Dwarka",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Sector 10, Dwarka",
        "addressLocality": "New Delhi",
        "addressRegion": "Delhi",
        "postalCode": "110075",
        "addressCountry": "IN",
      },
    },
    "image": ["https://delhihacks.me/images/hero-bg.webp"],
    "description":
      "A 12-hour Under-18 Web Development Hackathon where young minds build real solutions and shape the future.",
    "organizer": {
      "@type": "Organization",
      "name": "Delhi Hacks Me",
      "url": "https://www.instagram.com/delhihacks.me/",
    },
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${orbitron.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var match = document.cookie.match(/(?:^|; )theme=([^;]*)/);
                  var cookieTheme = match ? decodeURIComponent(match[1]) : null;
                  var localTheme = localStorage.getItem('theme');
                  var theme = cookieTheme || localTheme;
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col font-sans bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 selection:bg-red-500 selection:text-white transition-colors duration-300"
      >
        <ThemeProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

