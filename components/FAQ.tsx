"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";

const FAQ_DATA = [
  {
    question: "Who is the 0G Apollo Program for?",
    answer:
      "The program is designed for ambitious Web3 founders and builders creating revenue-generating decentralized AI applications and infrastructure. It targets teams working on areas like AI agents, DeFi + AI solutions, on-chain data markets, cross-chain infrastructure, gaming/NFTs with AI, decentralized content applications, or any innovative projects that can launch and scale on the 0G protocol. It\u2019s ideal for early-stage to growth-stage teams ready to build, integrate with 0G\u2019s ultra-fast decentralized AI chain, and achieve product-market fit (PMF) and go-to-market (GTM) traction. Only 10 teams will be selected globally for this intensive cohort.",
  },
  {
    question: "Who is Blockchain Builders Fund?",
    answer:
      "Blockchain Builders Fund (BBF) is the organization behind Stanford University\u2019s blockchain ecosystem. BBF consists of Stanford blockchain veterans and pioneers who have built Stanford\u2019s blockchain education, acceleration, and community programs. They partner with 0G to deliver expert mentorship, structured programming, and Silicon Valley-style startup support in the Apollo Accelerator.",
  },
  {
    question: "What are the requirements to apply?",
    answer:
      "Teams actively building decentralized AI projects with potential for revenue generation, and teams available for the 10-week program.",
  },
  {
    question: "Do we have to be exclusive to the 0G network?",
    answer:
      "No strict exclusivity is required upfront, but the program is built around helping teams launch and scale on the 0G protocol. Accepted teams receive deep integration support, technical mentorship from 0G engineers, and incentives tied to building/deploying on 0G (e.g., funding calibrated to roadmap and traction on the network). It\u2019s not a lock-in, but the value\u2014funding, credits, tools, and mentorship\u2014is heavily geared toward projects that commit to and succeed on 0G. Multi-chain or hybrid approaches may be considered if they meaningfully leverage 0G\u2019s strengths (speed, decentralization for AI).",
  },
  {
    question: "Is the program remote?",
    answer:
      "The 10-week program is primarily remote, except for an in-person Demo Day towards the end of the program.",
  },
];

function FAQItem({
  item,
  index,
  isInView,
}: {
  item: (typeof FAQ_DATA)[0];
  index: number;
  isInView: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass rounded-2xl overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-brand-purple-500/5 transition-colors"
      >
        <span className="text-lg font-semibold text-gray-900 pr-4">
          {item.question}
        </span>
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-brand-purple-500/20 to-brand-purple-400/10 flex items-center justify-center flex-shrink-0">
          {isOpen ? (
            <Minus className="text-brand-purple-500" size={18} />
          ) : (
            <Plus className="text-brand-purple-500" size={18} />
          )}
        </div>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6 text-gray-600 leading-relaxed">
          {item.answer}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="faq" className="py-32 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-purple-100/30 to-transparent" />

      <div className="max-w-3xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Everything you need to know about the program
          </p>
        </motion.div>

        <div className="space-y-4">
          {FAQ_DATA.map((item, index) => (
            <FAQItem
              key={index}
              item={item}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
