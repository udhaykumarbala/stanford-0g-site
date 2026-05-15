import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProgramStats from "@/components/ProgramStats";
import ProgramOverview from "@/components/ProgramOverview";
import Benefits from "@/components/Benefits";
import Timeline from "@/components/Timeline";
import Mentors from "@/components/Mentors";
import Projects from "@/components/Projects";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { ApplyClosedProvider } from "@/components/ApplyClosedDialog";

export default function Home() {
  return (
    <ApplyClosedProvider>
      <main className="min-h-screen">
        <Navbar />
        <Hero />
        <ProgramStats />
        <ProgramOverview />
        <Benefits />
        <Mentors />
        <Projects />
        <FAQ />
        <Timeline />
        <CTA />
        <Footer />
      </main>
    </ApplyClosedProvider>
  );
}
