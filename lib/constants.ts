export const COLORS = {
  purple: {
    primary: "#9200E1",
    100: "#E3C1FF",
    200: "#D5A3FF",
    300: "#CB8AFF",
    400: "#B75FFF",
    500: "#9200E1",
  },
  black: "#000000",
  white: "#FEFEFE",
  gray: "#E5E5E5",
};

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Program", href: "#program" },
  { label: "Timeline", href: "#timeline" },
  { label: "Benefits", href: "#benefits" },
];

export const PROGRAM_STATS = [
  { value: "10", label: "Weeks" },
  { value: "12", label: "Startups" },
  { value: "6", label: "Modules" },
  { value: "1", label: "Demo Day" },
];

export const BUILD_CATEGORIES = [
  {
    title: "DeFi",
    description: "Build next-gen decentralized finance protocols",
    icon: "Coins",
  },
  {
    title: "AI Agents",
    description: "Create autonomous AI-powered applications",
    icon: "Bot",
  },
  {
    title: "Data Infrastructure",
    description: "Develop scalable data availability solutions",
    icon: "Database",
  },
  {
    title: "Gaming & NFTs",
    description: "Build immersive on-chain gaming experiences",
    icon: "Gamepad2",
  },
];

export const TIMELINE_DATA = [
  {
    weeks: "1-2",
    title: "Foundation",
    topics: [
      "Program Kickoff & Team Introductions",
      "0G Protocol Deep Dive & Resources",
      "OKRs Workshop & Goal Setting",
      "Product-Market Fit & Hypothesis Validation",
    ],
  },
  {
    weeks: "3-4",
    title: "Tech Deep Dives",
    topics: [
      "1:1 Office Hours & Team Support",
      "Blockchain Architecture & Tech Stack",
      "0G Protocol Technical Integration",
      "Engineering Management & SDLC",
    ],
  },
  {
    weeks: "5-6",
    title: "Go-to-Market",
    topics: [
      "Fundraising Strategy & Pitch Decks",
      "GTM Strategy: DTC, B2B, Partnerships",
      "Token Design & Tokenomics",
      "Marketing & Community Building",
    ],
  },
  {
    weeks: "7-8",
    title: "Operations",
    topics: [
      "Demo Day Prep & Pitch Feedback",
      "Legal & Compliance for Web3",
      "Hiring & Team Building",
      "Leadership Lab: Effective Founder Traits",
    ],
  },
  {
    weeks: "9-10",
    title: "Demo Day",
    topics: [
      "OKRs Final Push & Check-ins",
      "Demo Day Rehearsals",
      "Virtual Demo Day Presentation",
      "Graduation & Alumni Network Access",
    ],
  },
];

export const BENEFITS = [
  {
    title: "Expert Mentorship",
    description: "1:1 guidance from industry veterans and successful founders",
    icon: "Users",
  },
  {
    title: "Technical Support",
    description: "Direct access to 0G protocol engineers and resources",
    icon: "Code",
  },
  {
    title: "Network Access",
    description: "Connect with top VCs, partners, and fellow builders",
    icon: "Network",
  },
  {
    title: "Demo Day Exposure",
    description: "Showcase your project to investors and the Web3 community",
    icon: "Presentation",
  },
];

export const APPLY_CRITERIA = [
  "Building on or planning to build on 0G protocol",
  "Have a working MVP or strong prototype",
  "Committed founding team (2+ members)",
  "Available for the full 10-week program",
];

export const RECOMMENDED_IDEAS = [
  {
    title: "Decentralized AI Inference",
    description:
      "Platforms that leverage 0G's data availability layer to enable trustless, verifiable AI model inference at scale.",
    icon: "Brain",
    tag: "AI",
  },
  {
    title: "On-Chain Data Marketplaces",
    description:
      "Build open marketplaces for buying, selling, and licensing structured data with provenance guarantees powered by 0G storage.",
    icon: "Database",
    tag: "Data",
  },
  {
    title: "AI-Powered DeFi Protocols",
    description:
      "Lending, trading, or risk management protocols that integrate AI agents for autonomous strategy execution on-chain.",
    icon: "TrendingUp",
    tag: "DeFi",
  },
  {
    title: "Verifiable Compute Networks",
    description:
      "Infrastructure for offloading heavy computation off-chain while providing cryptographic proof of correctness back on-chain.",
    icon: "Shield",
    tag: "Infrastructure",
  },
  {
    title: "Decentralized Content & Media",
    description:
      "Platforms for AI-generated or user-generated content with decentralized storage, attribution, and monetization models.",
    icon: "Film",
    tag: "Consumer",
  },
  {
    title: "Cross-Chain Data Availability",
    description:
      "Bridges and middleware that bring 0G's high-throughput data availability to other L1 and L2 ecosystems.",
    icon: "Layers",
    tag: "Infrastructure",
  },
];
