"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import DotGrid from "./DotGrid";
import { useApplyClosed } from "./ApplyClosedDialog";

export default function Hero() {
  const { scrollY } = useScroll();
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 100], [1, 0]);
  const { open: openApplyClosed } = useApplyClosed();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
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
          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight text-gray-900">
            Apollo, the AI Accelerator
          </h1>

          {/* Subtitle */}
          <p className="text-5xl md:text-7xl mb-6 mx-auto text-gradient font-bold">
            Powered by 0G and Stanford Builders
          </p>

          {/* Description */}
          <p className="text-base md:text-lg text-gray-500 mb-10 max-w-3xl mx-auto leading-relaxed italic">
            0G Apollo is an exclusive builder program supported by Blockchain Builders Fund
            (led by Stanford veterans) for developers and protocols building on the
            world&apos;s first decentralized AI data network.
          </p>

          {/* Video */}
          <div className="max-w-2xl mx-auto mb-10 rounded-2xl overflow-hidden shadow-2xl shadow-brand-purple-500/20 border border-brand-purple-200/30 bg-white">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-[calc(100%+6px)] h-auto block -ml-[3px]"
            >
              <source src="/0G_Apollo_Video.mp4" type="video/mp4" />
            </video>
          </div>

          {/* CTAs */}
          <div className="flex flex-col items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={openApplyClosed}
              className="bg-gradient-to-r from-brand-purple-500 to-brand-purple-400 text-white px-8 py-4 rounded-full font-medium text-lg hover:shadow-xl hover:shadow-brand-purple-500/30 transition-all cursor-pointer inline-block"
            >
              Apply Now
            </motion.button>
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gray-400"></span>
              </span>
              <span className="text-sm text-gray-600 font-medium">Apollo applications closed — apply via Akindo</span>
            </div>
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
