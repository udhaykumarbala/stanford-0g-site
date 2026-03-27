import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProgramStats from "@/components/ProgramStats";
import ProgramOverview from "@/components/ProgramOverview";
import Benefits from "@/components/Benefits";
import Timeline from "@/components/Timeline";
import Mentors from "@/components/Mentors";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <ProgramStats />
      <ProgramOverview />
      <Benefits />
      <Timeline />
      <Mentors />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
