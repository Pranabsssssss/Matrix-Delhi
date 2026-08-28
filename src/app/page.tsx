import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Schedule from "@/components/Schedule";
import WhatToExpect from "@/components/WhatToExpect";
import InstructionBanner from "@/components/InstructionBanner";
import StatsBar from "@/components/StatsBar";
import Prizes from "@/components/Prizes";
import Partners from "@/components/Partners";
import TechStack from "@/components/TechStack";
import CommunitySection from "@/components/CommunitySection";
import FaqSection from "@/components/FaqSection";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <Hero />
      <Schedule />
      <WhatToExpect />
      <InstructionBanner />
      <StatsBar />
      <Prizes />
      <Partners />
      <TechStack />
      <CommunitySection />
      <FaqSection />
      <CtaBanner />
      <Footer />
    </main>
  );
}
