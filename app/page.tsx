import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProgramStats from "@/components/ProgramStats";
import ProgramOverview from "@/components/ProgramOverview";
import WhatYouBuild from "@/components/WhatYouBuild";
import Timeline from "@/components/Timeline";
import PreviousProjects from "@/components/PreviousProjects";
import Benefits from "@/components/Benefits";
import WhoShouldApply from "@/components/WhoShouldApply";
import Mentors from "@/components/Mentors";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <ProgramStats />
      <ProgramOverview />
      <WhatYouBuild />
      <Timeline />
      <PreviousProjects />
      <Benefits />
      <WhoShouldApply />
      <Mentors />
      <CTA />
      <Footer />
    </main>
  );
}
