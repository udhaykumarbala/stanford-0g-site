"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useMemo, useEffect } from "react";
import { Linkedin, ArrowUpRight, ArrowRight } from "lucide-react";
import Image from "next/image";

const XIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

type Category = "AI Agents" | "Trust & Safety" | "Finance";

interface Project {
  id: string;
  name: string;
  oneLiner: string;
  description: string;
  logo: string;
  gradient: string;
  cardGradient: string;
  category: Category;
  tags: string[];
  websiteLabel: string;
  website: string;
  linkedin: string;
  twitter?: string;
}

const projects: Project[] = [
  {
    id: "floe",
    name: "Floe Labs",
    oneLiner: "Credit for AI agents.",
    description:
      "Every economy runs on credit; the agent economy doesn't have any yet. Agent operators pre-fund wallets with a 60–70% capital drag. Floe turns agents' on-chain cashflows and chain-of-thought into credit, enforces spend limits via smart contracts, and streams repayments atomically from each x402 receipt.",
    logo: "/projects/floe.jpg",
    gradient: "from-cyan-400 to-emerald-400",
    cardGradient: "from-cyan-100 via-emerald-50 to-white",
    category: "Finance",
    tags: ["Finance × Agents", "Credit"],
    websiteLabel: "floelabs.xyz",
    website: "https://www.floelabs.xyz/",
    linkedin: "https://www.linkedin.com/company/floe-labs/",
    twitter: "https://x.com/FloeLabs",
  },
  {
    id: "uv-labs",
    name: "UV Labs",
    oneLiner: "Data + infra to train safer financial LLMs.",
    description:
      "Frontier LLMs underperform on financial tasks because there isn't enough high-quality reasoning data to train them. UV produces research-grade RL environments and trajectories from production financial agents, sourced with real traders in the loop. The result is models that can reason and act in high-risk financial environments.",
    logo: "/projects/uv-labs.png",
    gradient: "from-slate-400 to-slate-600",
    cardGradient: "from-slate-200 via-slate-100 to-white",
    category: "Finance",
    tags: ["Finance × LLM", "Data"],
    websiteLabel: "uvlabs.ai",
    website: "https://uvlabs.ai",
    linkedin: "https://www.linkedin.com/company/uvai",
    twitter: "https://x.com/uv",
  },
  {
    id: "icme",
    name: "ICME Labs",
    oneLiner: "AI guardrails that can't be bypassed.",
    description:
      "Agent guardrails today rely on heuristics, human review, and LLM judges. All are breakable, offering at best 88% protection. ICME PreFlight transforms natural-language policies into formal logic using automated reasoning, then wraps them in cryptographic primitives. The result: 100% checkable guardrails in under a second.",
    logo: "/projects/icme.png",
    gradient: "from-blue-400 to-blue-600",
    cardGradient: "from-blue-100 via-sky-50 to-white",
    category: "Trust & Safety",
    tags: ["Trust × Agents", "Cryptography"],
    websiteLabel: "icme.io",
    website: "https://blog.icme.io/",
    linkedin: "https://www.linkedin.com/in/wyattbenno/",
    twitter: "https://x.com/icme_labs",
  },
  {
    id: "bitmind",
    name: "BitMind",
    oneLiner: "Deepfake detection and AI content verification.",
    description:
      "Generative AI has flooded the internet with deepfakes that erode trust in digital content, and traditional detection tools struggle to keep pace. BitMind's adversarial AI platform runs on Bittensor Subnet 34, delivering 95%+ accuracy on real-world content with sub-second latency. It's available via app, browser extension, API, and enterprise integrations.",
    logo: "/projects/bitmind.png",
    gradient: "from-slate-700 to-slate-900",
    cardGradient: "from-slate-200 via-slate-100 to-white",
    category: "Trust & Safety",
    tags: ["Trust × Detection", "Bittensor"],
    websiteLabel: "bitmind.ai",
    website: "https://bitmind.ai",
    linkedin: "https://www.linkedin.com/company/bitmindai/",
    twitter: "https://x.com/bitmind",
  },
  {
    id: "pulsar",
    name: "Pulsar Money",
    oneLiner: "Europe's first crypto-native neobank.",
    description:
      "European users juggle separate banks for euros and exchanges for crypto, with no clean way to spend or earn yield in daily life. Pulsar is Europe's first crypto-native neobank: one account holds EUR, BTC, and stables, one card spends any balance, idle assets earn 5–15%, and AI agents transact with merchants on the user's behalf.",
    logo: "/projects/pulsar.png",
    gradient: "from-slate-200 to-blue-300",
    cardGradient: "from-sky-100 via-blue-50 to-white",
    category: "Finance",
    tags: ["Fintech × Crypto", "Consumer"],
    websiteLabel: "pulsar.money",
    website: "https://pulsar.money",
    linkedin: "https://www.linkedin.com/company/pulsar-money/",
    twitter: "https://x.com/PulsarMoneyApp",
  },
  {
    id: "walnut",
    name: "Walnut AI",
    oneLiner: "The first agentic professional network.",
    description:
      "Professionals burn 1,350+ hours a year brute-forcing connections through LinkedIn and CRMs, yet match rates stay below 20%. Walnut gives every user a Digital Twin that finds, vets, engages, and nurtures the right connections 24/7. Twins network agent-to-agent through a trust protocol that makes spam financially impossible.",
    logo: "/projects/walnut.png",
    gradient: "from-sky-300 to-blue-400",
    cardGradient: "from-sky-100 via-blue-50 to-white",
    category: "AI Agents",
    tags: ["Agents × Consumer", "Network"],
    websiteLabel: "walnut.ai",
    website: "https://walnut.ai",
    linkedin: "https://www.linkedin.com/company/iwalnut-ai",
    twitter: "https://x.com/walnutai_",
  },
  {
    id: "impulse",
    name: "Impulse AI",
    oneLiner: "Autonomous ML engineer: data to production in under an hour.",
    description:
      "Shipping production ML is a coordination problem: weeks of handoffs across data scientists, ML engineers, and DevOps, plus $200K+ hires most companies can't afford. Impulse is an autonomous ML engineer. Describe an objective in plain English, connect your data, and ship a production-ready model with API endpoint in under an hour.",
    logo: "/projects/impulse.png",
    gradient: "from-teal-400 to-pink-300",
    cardGradient: "from-teal-100 via-pink-50 to-white",
    category: "AI Agents",
    tags: ["Agents × Dev Tools", "ML Platform"],
    websiteLabel: "impulselabs.ai",
    website: "https://www.impulselabs.ai/",
    linkedin: "https://www.linkedin.com/company/theimpulseai/",
    twitter: "https://x.com/impulseai_",
  },
  {
    id: "dsalta",
    name: "DSALTA",
    oneLiner: "AI compliance agents for 50+ frameworks.",
    description:
      "Compliance frameworks like SOC 2, ISO 27001, and HIPAA take months and tens of thousands of dollars to obtain. DSALTA's AI agents map your stack, run continuous tests, write policies, and generate auditor-ready evidence across 50+ frameworks from a single normalized control graph. Teams ship SOC 2 in days, not months.",
    logo: "/projects/dsalta.png",
    gradient: "from-emerald-600 to-teal-700",
    cardGradient: "from-emerald-100 via-teal-50 to-white",
    category: "AI Agents",
    tags: ["Agents × B2B", "Compliance"],
    websiteLabel: "dsalta.com",
    website: "https://www.dsalta.com",
    linkedin: "https://www.linkedin.com/company/getdsalta/",
    twitter: "https://x.com/getdsalta",
  },
  {
    id: "mighty",
    name: "Mighty",
    oneLiner: "Multimodal AI fraud detection in one line of code.",
    description:
      "Insurance adjusters, lenders, and clinicians approve documents, images, and audio that look real but were tampered with before review. Their AI copilots amplify the same blind spot. Mighty Citadel sits one line of code upstream of every model, scanning for prompt injection, perceptual tampering, and spliced audio at 98.6% accuracy with sub-100ms latency.",
    logo: "/projects/mighty.png",
    gradient: "from-yellow-300 to-amber-400",
    cardGradient: "from-yellow-100 via-amber-50 to-white",
    category: "Trust & Safety",
    tags: ["Trust × API", "Fraud Detection"],
    websiteLabel: "trymighty.ai",
    website: "https://trymighty.ai/",
    linkedin: "https://linkedin.com/company/mighty-ai",
    twitter: "https://x.com/trymightyai",
  },
  {
    id: "om-labs",
    name: "Om Labs",
    oneLiner: "Browser agents for testing and automation.",
    description:
      "Browser automation has lived on Playwright scripts that break the moment a site changes. Om Labs builds vision-first browser agents that act on intent, clicking the screen like a human would. They only break when the actual user flow breaks, not when the markup does.",
    logo: "/projects/om-labs.jpeg",
    gradient: "from-slate-700 to-black",
    cardGradient: "from-slate-200 via-slate-100 to-white",
    category: "AI Agents",
    tags: ["Agents × Dev Tools", "Browser"],
    websiteLabel: "omlabs.xyz",
    website: "https://omlabs.xyz",
    linkedin: "https://www.linkedin.com/company/0xomlabs",
    twitter: "https://x.com/sachelik",
  },
];

const CATEGORIES = ["All", "AI Agents", "Trust & Safety", "Finance"] as const;
type CategoryFilter = (typeof CATEGORIES)[number];

const STATS = [
  { value: "10", label: "Teams" },
  { value: "18", label: "Founders" },
  { value: "3", label: "Verticals" },
];

const ROTATION_MS = 8000;

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [filter, setFilter] = useState<CategoryFilter>("All");
  const [selectedId, setSelectedId] = useState<string>(projects[0].id);
  const [isPaused, setIsPaused] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const filtered = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((p) => p.category === filter),
    [filter]
  );

  useEffect(() => {
    if (!filtered.find((p) => p.id === selectedId)) {
      setSelectedId(filtered[0].id);
    }
  }, [filtered, selectedId]);

  // Auto-rotate featured project
  useEffect(() => {
    if (isPaused || filtered.length < 2) return;
    const timer = setTimeout(() => {
      const currentIndex = filtered.findIndex((p) => p.id === selectedId);
      const next = filtered[(currentIndex + 1) % filtered.length];
      if (next) setSelectedId(next.id);
    }, ROTATION_MS);
    return () => clearTimeout(timer);
  }, [selectedId, filtered, isPaused]);

  // Keep the active sidebar item in view (scroll only the list, never the page)
  useEffect(() => {
    const container = listRef.current;
    const item = itemRefs.current.get(selectedId);
    if (!container || !item) return;
    const itemTop = item.offsetTop;
    const itemBottom = itemTop + item.offsetHeight;
    const viewTop = container.scrollTop;
    const viewBottom = viewTop + container.clientHeight;
    const padding = 12;
    if (itemTop < viewTop) {
      container.scrollTo({ top: itemTop - padding, behavior: "smooth" });
    } else if (itemBottom > viewBottom) {
      container.scrollTo({
        top: itemBottom - container.clientHeight + padding,
        behavior: "smooth",
      });
    }
  }, [selectedId]);

  const selected = projects.find((p) => p.id === selectedId) ?? projects[0];
  const featuredIndex = filtered.findIndex((p) => p.id === selectedId);
  const categoryCounts = useMemo(
    () => ({
      "AI Agents": projects.filter((p) => p.category === "AI Agents").length,
      "Trust & Safety": projects.filter((p) => p.category === "Trust & Safety")
        .length,
      Finance: projects.filter((p) => p.category === "Finance").length,
    }),
    []
  );

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
        {/* Header row: title + category pills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12"
        >
          <div>
            <span className="text-brand-purple-500 text-xs font-mono tracking-[0.2em] uppercase">
              Apollo Program
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-3 text-gray-900 leading-tight">
              Meet the <span className="text-gradient">2026 cohort</span>.
            </h2>
          </div>

          {/* Category pills */}
          <div className="-mx-6 px-6 overflow-x-auto scrollbar-hide lg:mx-0 lg:px-0 lg:overflow-visible">
            <div className="inline-flex flex-nowrap gap-1 glass rounded-full p-1.5">
            {CATEGORIES.map((cat) => {
              const isActive = filter === cat;
              const count =
                cat === "All"
                  ? projects.length
                  : categoryCounts[cat as Category];
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className="relative px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors"
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-category-pill"
                      className="absolute inset-0 bg-brand-purple-500 rounded-full shadow-lg shadow-brand-purple-500/25"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  <span
                    className={`relative z-10 ${
                      isActive
                        ? "text-white"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {cat}
                    {cat !== "All" && (
                      <span
                        className={`ml-1.5 text-xs ${
                          isActive ? "text-white/80" : "text-gray-400"
                        }`}
                      >
                        · {count}
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
            </div>
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="glass rounded-2xl px-6 py-5 flex flex-col"
            >
              <div className="text-3xl md:text-4xl font-mono font-bold text-brand-purple-500">
                {stat.value}
              </div>
              <div className="text-xs uppercase tracking-widest text-gray-500 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Mobile: simple project list */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="lg:hidden space-y-3"
        >
          {filtered.map((p) => (
            <a
              key={p.id}
              href={p.website}
              target="_blank"
              rel="noopener noreferrer"
              className="block glass glass-hover rounded-2xl p-4"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.gradient} overflow-hidden flex items-center justify-center flex-shrink-0`}
                >
                  <Image
                    src={p.logo}
                    alt={`${p.name} logo`}
                    width={48}
                    height={48}
                    className="object-contain w-full h-full p-1.5"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-gray-900 truncate">
                    {p.name}
                  </div>
                  <div className="text-sm text-gray-500 truncate">
                    {p.oneLiner}
                  </div>
                  <div className="text-xs text-brand-purple-500 font-mono mt-1 inline-flex items-center gap-1">
                    <ArrowUpRight size={11} />
                    {p.websiteLabel}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </motion.div>

        {/* Desktop: Master / Detail */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="hidden lg:grid lg:grid-cols-[1fr_400px] gap-8"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Featured card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className={`rounded-3xl overflow-hidden flex flex-col min-h-[480px] bg-gradient-to-br ${selected.cardGradient} ring-1 ring-white/60 shadow-xl shadow-brand-purple-500/5`}
            >
              <div className="p-8 md:p-10 flex-1 flex flex-col justify-between">
                <div>
                  {/* Logo + name + category */}
                  <div className="flex items-start gap-4 mb-8">
                    <div
                      className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${selected.gradient} overflow-hidden flex items-center justify-center flex-shrink-0 shadow-lg`}
                    >
                      <Image
                        src={selected.logo}
                        alt={`${selected.name} logo`}
                        width={80}
                        height={80}
                        className="object-contain w-full h-full p-2"
                      />
                    </div>
                    <div className="pt-1">
                      <h3 className="text-3xl font-bold text-gray-900">
                        {selected.name}
                      </h3>
                      <div className="text-xs uppercase tracking-widest text-gray-500 mt-1.5">
                        {selected.category}
                      </div>
                    </div>
                  </div>

                  {/* One-liner */}
                  <blockquote className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-6">
                    &ldquo;{selected.oneLiner}&rdquo;
                  </blockquote>

                  {/* Description */}
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {selected.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {selected.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 rounded-full text-xs font-medium bg-brand-purple-500/10 text-brand-purple-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer: links + featured index */}
                <div className="flex items-center justify-between flex-wrap gap-4 pt-6 border-t border-gray-900/10">
                  <div className="flex items-center gap-2">
                    <a
                      href={selected.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 hover:bg-white text-sm text-gray-700 hover:text-brand-purple-500 transition-colors backdrop-blur-sm"
                    >
                      <ArrowUpRight
                        size={14}
                        className="group-hover:rotate-45 transition-transform"
                      />
                      <span className="font-mono">{selected.websiteLabel}</span>
                    </a>
                    <a
                      href={selected.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-white/60 hover:bg-white flex items-center justify-center text-gray-500 hover:text-brand-purple-500 transition-colors backdrop-blur-sm"
                      aria-label={`${selected.name} LinkedIn`}
                    >
                      <Linkedin size={16} />
                    </a>
                    {selected.twitter && (
                      <a
                        href={selected.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-full bg-white/60 hover:bg-white flex items-center justify-center text-gray-500 hover:text-brand-purple-500 transition-colors backdrop-blur-sm"
                        aria-label={`${selected.name} X`}
                      >
                        <XIcon size={14} />
                      </a>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-xs uppercase tracking-widest text-gray-400">
                      Featured
                    </div>
                    <div className="font-mono text-lg text-brand-purple-500">
                      {String(featuredIndex + 1).padStart(2, "0")}/
                      {String(filtered.length).padStart(2, "0")}
                    </div>
                  </div>
                </div>
              </div>

              {/* Auto-rotation progress bar */}
              <div className="h-1 bg-gray-900/5 relative">
                <motion.div
                  key={`progress-${selected.id}-${isPaused ? "paused" : "running"}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isPaused ? 0 : 1 }}
                  transition={{
                    duration: isPaused ? 0 : ROTATION_MS / 1000,
                    ease: "linear",
                  }}
                  className="h-full bg-brand-purple-500 origin-left"
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Sidebar list */}
          <div
            ref={listRef}
            className="relative lg:max-h-[600px] overflow-y-auto py-1 pl-1 pr-3 space-y-3"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {filtered.map((p) => {
                const isActive = p.id === selectedId;
                return (
                  <motion.button
                    key={p.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{
                      layout: { type: "spring", stiffness: 350, damping: 32 },
                      opacity: { duration: 0.2 },
                      y: { duration: 0.25 },
                    }}
                    ref={(el) => {
                      if (el) itemRefs.current.set(p.id, el);
                      else itemRefs.current.delete(p.id);
                    }}
                    onClick={() => setSelectedId(p.id)}
                    onMouseEnter={() => setSelectedId(p.id)}
                    className={`w-full text-left rounded-2xl p-4 flex items-center gap-4 ${
                      isActive
                        ? "bg-white shadow-lg shadow-brand-purple-500/10 ring-1 ring-brand-purple-500/20"
                        : "bg-transparent"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.gradient} overflow-hidden flex items-center justify-center flex-shrink-0`}
                    >
                      <Image
                        src={p.logo}
                        alt={`${p.name} logo`}
                        width={48}
                        height={48}
                        className="object-contain w-full h-full p-1.5"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-gray-900 truncate">
                        {p.name}
                      </div>
                      <div className="text-sm text-gray-500 truncate">
                        {p.oneLiner}
                      </div>
                    </div>
                    {isActive && (
                      <div className="text-xs font-medium text-brand-purple-500 flex items-center gap-1 flex-shrink-0">
                        VIEW
                        <ArrowRight size={12} />
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
