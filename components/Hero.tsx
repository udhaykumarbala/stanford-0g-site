"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import DotGrid from "./DotGrid";

export default function Hero() {
  const { scrollY } = useScroll();
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 100], [1, 0]);
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-brand-purple-100/60 to-brand-purple-200/40 blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-brand-purple-200/40 to-brand-purple-100/30 blur-[100px]"
        />
      </div>

      {/* Interactive Dot Grid Background */}
      <DotGrid
        dotSize={2}
        gap={35}
        baseColor="rgba(146, 0, 225, 0.22)"
        activeColor="rgba(146, 0, 225, 0.55)"
        proximity={150}
        shockRadius={180}
        shockStrength={4}
        returnDuration={1.5}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-purple-500"></span>
            </span>
            <span className="text-sm text-gray-600 font-medium">Applications Open</span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-gray-900">
            0G Apollo Program<br /><span className="text-gradient">AI Accelerator</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-600 mb-3 max-w-2xl mx-auto">
            By Blockchain Builders
          </p>

          {/* Stanford Subtitle */}
          <p className="text-base md:text-lg text-gray-500 mb-12 max-w-2xl mx-auto font-medium italic">
            Startups the Silicon Valley way, led by Stanford veterans
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://forms.gle/TYM4tZaD1gYrDVdS9"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-brand-purple-500 to-brand-purple-400 text-white px-8 py-4 rounded-full font-medium text-lg hover:shadow-xl hover:shadow-brand-purple-500/30 transition-all cursor-pointer inline-block"
            >
              Apply Now
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#program"
              className="glass glass-hover text-gray-700 px-8 py-4 rounded-full font-medium text-lg"
            >
              Learn More
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator - Fixed at bottom center, hides on scroll */}
      <motion.div
        style={{ opacity: scrollIndicatorOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="cursor-pointer"
        >
          <ArrowDown className="text-brand-purple-400" size={28} />
        </motion.div>
      </motion.div>
    </section>
  );
}
