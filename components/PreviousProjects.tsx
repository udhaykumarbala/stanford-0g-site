"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const projects = [
  {
    name: "CARV",
    tagline:
      "Modular data layer for gaming and AI, sharing data value with the industry and individuals.",
    category: "Data / AI",
    logo: "/carv.jpg",
    metrics: "$1B FDV · $35M Node Sale · Listed on All Top Exchanges",
  },
  {
    name: "Cygnus",
    tagline:
      "The first modular real yield layer, combining non-EVM systems with the EVM ecosystem.",
    category: "Infrastructure",
    logo: "/cygnus.svg",
  },
];

export default function PreviousProjects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 relative overflow-hidden" ref={ref}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-purple-100/30 to-transparent" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Previous Accelerator{" "}
            <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Projects from earlier cohorts of the Blockchain Builders accelerator
          </p>
        </motion.div>

        {/* Projects */}
        <div className="flex flex-col md:flex-row gap-8 justify-center">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -10 }}
              className="glass glass-hover rounded-3xl p-8 flex-1 group"
            >
              {/* Logo */}
              <div className="relative w-16 h-16 mb-5 rounded-2xl overflow-hidden bg-gradient-to-r from-brand-purple-500/10 to-brand-purple-400/5">
                <Image
                  src={project.logo}
                  alt={project.name}
                  fill
                  className="object-contain p-2"
                />
              </div>

              {/* Name */}
              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-brand-purple-500 transition-colors">
                {project.name}
              </h3>

              {/* Tagline */}
              <p className="text-gray-600 mb-6">{project.tagline}</p>

              {/* Footer */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-brand-purple-500/10 text-brand-purple-600">
                  {project.category}
                </span>
                {project.metrics && (
                  <span className="text-xs text-gray-500 font-medium">
                    {project.metrics}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
