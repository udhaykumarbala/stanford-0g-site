"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Linkedin, Globe } from "lucide-react";
import Image from "next/image";

interface Project {
  name: string;
  oneLiner: string;
  logo: string;
  linkedin: string;
  website: string;
}

const projects: Project[] = [
  {
    name: "Floe Labs",
    oneLiner: "Credit for AI Agents",
    logo: "/projects/floe.jpg",
    linkedin: "https://www.linkedin.com/company/floe-labs/",
    website: "https://www.floelabs.xyz/",
  },
  {
    name: "UV Labs",
    oneLiner: "Data and infra to train safer, more performant financial LLMs",
    logo: "/projects/uv-labs.png",
    linkedin: "https://www.linkedin.com/company/uvai",
    website: "https://uvlabs.ai",
  },
  {
    name: "ICME Labs",
    oneLiner: "AI guardrails that can't be bypassed or ignored",
    logo: "/projects/icme.png",
    linkedin: "https://www.linkedin.com/in/wyattbenno/",
    website: "https://blog.icme.io/",
  },
  {
    name: "BitMind",
    oneLiner: "Deepfake detection and AI content verification",
    logo: "/projects/bitmind.png",
    linkedin: "https://www.linkedin.com/company/bitmindai/",
    website: "https://bitmind.ai",
  },
  {
    name: "Pulsar Money",
    oneLiner: "Europe's first crypto-native neobank",
    logo: "/projects/pulsar.png",
    linkedin: "https://www.linkedin.com/company/pulsar-money/",
    website: "https://pulsar.money",
  },
  {
    name: "Walnut AI",
    oneLiner: "The first agentic professional network",
    logo: "/projects/walnut.png",
    linkedin: "https://www.linkedin.com/company/iwalnut-ai",
    website: "https://walnut.ai",
  },
  {
    name: "Impulse AI",
    oneLiner: "Autonomous MLE agent: data to production model in under an hour",
    logo: "/projects/impulse.png",
    linkedin: "https://www.linkedin.com/company/theimpulseai/",
    website: "https://www.impulselabs.ai/",
  },
  {
    name: "DSALTA",
    oneLiner: "AI agents for SOC 2, ISO, HIPAA — 50+ frameworks",
    logo: "/projects/dsalta.png",
    linkedin: "https://www.linkedin.com/company/getdsalta/",
    website: "https://www.dsalta.com",
  },
  {
    name: "Mighty",
    oneLiner: "Multimodal AI fraud detection in one line of code",
    logo: "/projects/mighty.png",
    linkedin: "https://linkedin.com/company/mighty-ai",
    website: "https://trymighty.ai/",
  },
  {
    name: "Om Labs",
    oneLiner: "Browser agents for testing and automation",
    logo: "/projects/om-labs.jpeg",
    linkedin: "https://www.linkedin.com/company/0xomlabs",
    website: "https://omlabs.xyz",
  },
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-32 relative overflow-hidden" ref={ref}>
      {/* Subtle Animated Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/3 left-1/4 w-[450px] h-[450px] rounded-full bg-brand-purple-200 blur-[140px]"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.06, 0.12, 0.06],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-brand-purple-300 blur-[130px]"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Cohort <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Meet the teams building the future of Web3 and AI in our 2026 cohort
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="flex flex-wrap justify-center gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              whileHover={{ y: -10 }}
              className="glass glass-hover rounded-3xl p-8 text-center group w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.34rem)]"
            >
              {/* Logo */}
              <div className="mb-6 flex justify-center">
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-white ring-2 ring-brand-purple-500/10 group-hover:ring-brand-purple-500/30 transition-all flex items-center justify-center p-3">
                  <Image
                    src={project.logo}
                    alt={`${project.name} logo`}
                    fill
                    loading="lazy"
                    sizes="96px"
                    className="object-contain p-3"
                  />
                </div>
              </div>

              {/* Name */}
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {project.name}
              </h3>

              {/* One-liner */}
              <p className="text-gray-600 mb-6 min-h-[48px]">
                {project.oneLiner}
              </p>

              {/* Links */}
              <div className="flex justify-center gap-3">
                <a
                  href={project.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full glass glass-hover flex items-center justify-center text-gray-500 hover:text-brand-purple-500 transition-colors"
                  aria-label={`${project.name} website`}
                >
                  <Globe size={18} />
                </a>
                <a
                  href={project.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full glass glass-hover flex items-center justify-center text-gray-500 hover:text-brand-purple-500 transition-colors"
                  aria-label={`${project.name} LinkedIn`}
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
