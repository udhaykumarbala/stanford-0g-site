"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Brain,
  Database,
  TrendingUp,
  Shield,
  Film,
  Layers,
  Lightbulb,
} from "lucide-react";
import { RECOMMENDED_IDEAS } from "@/lib/constants";

const iconMap = {
  Brain,
  Database,
  TrendingUp,
  Shield,
  Film,
  Layers,
};

export default function RecommendedIdeas() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 relative overflow-hidden" ref={ref}>
      {/* Subtle Animated Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.06, 0.12, 0.06],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-brand-purple-300 blur-[150px]"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.08, 0.14, 0.08],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-brand-purple-200 blur-[120px]"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6"
          >
            <Lightbulb className="text-brand-purple-500" size={16} />
            <span className="text-sm text-gray-600 font-medium">
              Inspiration for Applicants
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Recommended <span className="text-gradient">Project Ideas</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We encourage proposals across these high-impact verticals, though
            strong ideas beyond this list are equally welcome
          </p>
        </motion.div>

        {/* Ideas Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {RECOMMENDED_IDEAS.map((idea, index) => {
            const Icon = iconMap[idea.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="glass glass-hover rounded-3xl p-8 group"
              >
                {/* Icon & Tag Row */}
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-brand-purple-500/20 to-brand-purple-400/10 flex items-center justify-center group-hover:from-brand-purple-500/30 group-hover:to-brand-purple-400/20 transition-all">
                    <Icon
                      className="text-brand-purple-500 group-hover:text-brand-purple-400 transition-colors"
                      size={28}
                    />
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-brand-purple-500/10 text-brand-purple-600">
                    {idea.tag}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-brand-purple-500 transition-colors">
                  {idea.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {idea.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
