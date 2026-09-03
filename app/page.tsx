import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProgramStats from "@/components/ProgramStats";
import CohortHighlights from "@/components/CohortHighlights";
import ProgramOverview from "@/components/ProgramOverview";
import Benefits from "@/components/Benefits";
import Perks from "@/components/Perks";
import Timeline from "@/components/Timeline";
import Mentors from "@/components/Mentors";
import Projects from "@/components/Projects";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { WaitlistProvider } from "@/components/WaitlistDialog";

export default function Home() {
  return (
    <WaitlistProvider>
      <main className="min-h-screen">
        <Navbar />
        <Hero />
        <ProgramStats />
        <CohortHighlights />
        <ProgramOverview />
        <Projects />
        <Benefits />
        <Perks />
        <Mentors />
        <FAQ />
        <Timeline />
        <CTA />
        <Footer />
      </main>
    </WaitlistProvider>
  );
}
