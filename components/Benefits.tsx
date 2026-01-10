"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Code, Network, Presentation } from "lucide-react";
import { BENEFITS } from "@/lib/constants";

const iconMap = {
  Users,
  Code,
  Network,
  Presentation,
};

export default function Benefits() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="benefits" className="py-32 relative" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-purple-100/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            What You <span className="text-gradient">Get</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Everything you need to succeed in Web3
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BENEFITS.map((benefit, index) => {
            const Icon = iconMap[benefit.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="glass glass-hover rounded-3xl p-8 text-center group"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-brand-purple-500/20 to-brand-purple-400/10 flex items-center justify-center mx-auto mb-6 group-hover:from-brand-purple-500/30 group-hover:to-brand-purple-400/20 transition-all">
                  <Icon
                    className="text-brand-purple-500 group-hover:text-brand-purple-400 transition-colors"
                    size={32}
                  />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
