"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Coins, Bot, Database, Gamepad2 } from "lucide-react";
import { BUILD_CATEGORIES } from "@/lib/constants";

const iconMap = {
  Coins,
  Bot,
  Database,
  Gamepad2,
};

export default function WhatYouBuild() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="program" className="py-32 relative" ref={ref}>
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-purple-100/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            What You&apos;ll <span className="text-gradient">Build</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We support founders across the entire 0G ecosystem
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {BUILD_CATEGORIES.map((category, index) => {
            const Icon = iconMap[category.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="glass glass-hover rounded-3xl p-8 group cursor-pointer"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-brand-purple-500/20 to-brand-purple-400/10 flex items-center justify-center mb-6 group-hover:from-brand-purple-500/30 group-hover:to-brand-purple-400/20 transition-all">
                  <Icon
                    className="text-brand-purple-500 group-hover:text-brand-purple-400 transition-colors"
                    size={28}
                  />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">{category.title}</h3>
                <p className="text-gray-600 text-lg">{category.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
