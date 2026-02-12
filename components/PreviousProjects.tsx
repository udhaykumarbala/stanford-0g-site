"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink } from "lucide-react";

interface Project {
  name: string;
  tagline: string;
  category: string;
  logo: string;
  metrics?: string;
  url?: string;
}

const projects: Project[] = [
  {
    name: "DeFi Protocol Alpha",
    tagline: "Decentralized lending platform with AI risk assessment",
    category: "DeFi",
    logo: "🏦",
    metrics: "$2M Raised",
  },
  {
    name: "NFT Marketplace Pro",
    tagline: "Next-gen NFT platform with zero gas fees",
    category: "NFT",
    logo: "🎨",
    metrics: "50K Users",
  },
  {
    name: "AI Chain",
    tagline: "Blockchain infrastructure for AI model training",
    category: "AI",
    logo: "🤖",
    metrics: "$5M Raised",
  },
  {
    name: "DataVault",
    tagline: "Decentralized data storage with built-in encryption",
    category: "Infrastructure",
    logo: "🔒",
    metrics: "100K+ Downloads",
  },
  {
    name: "GameFi Universe",
    tagline: "Play-to-earn gaming ecosystem on Web3",
    category: "Gaming",
    logo: "🎮",
    metrics: "$3M Raised",
  },
  {
    name: "MetaPay",
    tagline: "Cross-chain payment protocol for instant settlements",
    category: "DeFi",
    logo: "💳",
    metrics: "$10M Volume",
  },
  {
    name: "SocialChain",
    tagline: "Decentralized social network with token rewards",
    category: "Social",
    logo: "📱",
    metrics: "25K Users",
  },
  {
    name: "CloudSync",
    tagline: "Web3 cloud storage with AI file organization",
    category: "Infrastructure",
    logo: "☁️",
    metrics: "$1.5M Raised",
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="glass glass-hover rounded-3xl p-6 min-w-[320px] max-w-[320px] flex-shrink-0 group cursor-pointer">
      {/* Logo */}
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-brand-purple-500/20 to-brand-purple-400/10 flex items-center justify-center mb-4 text-4xl group-hover:from-brand-purple-500/30 group-hover:to-brand-purple-400/20 transition-all">
        {project.logo}
      </div>

      {/* Content */}
      <div className="mb-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-brand-purple-500 transition-colors">
            {project.name}
          </h3>
          {project.url && (
            <ExternalLink
              size={16}
              className="text-gray-400 group-hover:text-brand-purple-500 transition-colors flex-shrink-0 ml-2"
            />
          )}
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {project.tagline}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-brand-purple-500/10 text-brand-purple-600">
          {project.category}
        </span>
        {project.metrics && (
          <span className="text-xs text-gray-500 font-medium">
            {project.metrics}
          </span>
        )}
      </div>
    </div>
  );
}

export default function PreviousProjects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="py-32 relative overflow-hidden" ref={ref}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-purple-100/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Alumni <span className="text-gradient">Success Stories</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Meet the innovative projects that have graduated from our accelerator
            program
          </p>
        </motion.div>

        {/* Carousel Container with Fade Effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          {/* Left Fade */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />

          {/* Right Fade */}
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

          {/* Scrollable Container */}
          <div
            className="overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              className="flex gap-6 py-4"
              style={{
                animation: `scroll 40s linear infinite`,
                animationPlayState: isPaused ? "paused" : "running",
                width: "max-content",
              }}
            >
              {/* Render projects twice for seamless loop */}
              {[...projects, ...projects].map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Instruction Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center text-gray-400 text-sm mt-8"
        >
          Hover to pause
        </motion.p>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
