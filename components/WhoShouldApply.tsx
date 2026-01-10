"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Check } from "lucide-react";
import { APPLY_CRITERIA } from "@/lib/constants";

export default function WhoShouldApply() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 relative overflow-hidden" ref={ref}>
      {/* Purple Wash Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-purple-100/30 to-transparent" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Header */}
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Who Should <span className="text-gradient">Apply</span>
            </h2>
            <p className="text-gray-600 text-lg">
              We&apos;re looking for ambitious founders ready to build
            </p>
          </div>

          {/* Criteria */}
          <div className="space-y-6 max-w-xl mx-auto">
            {APPLY_CRITERIA.map((criterion, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="flex items-center gap-4 text-left"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-brand-purple-500 to-brand-purple-400 flex items-center justify-center flex-shrink-0">
                  <Check className="text-white" size={18} />
                </div>
                <span className="text-lg text-gray-700">{criterion}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
