"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Rocket, Target, Zap } from "lucide-react";
import Image from "next/image";

export default function ProgramOverview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: Rocket,
      title: "Launch Ready",
      description: "Go from idea to mainnet deployment",
    },
    {
      icon: Target,
      title: "Focused Curriculum",
      description: "6 modules covering everything you need",
    },
    {
      icon: Zap,
      title: "Rapid Growth",
      description: "Accelerate your path to product-market fit",
    },
  ];

  return (
    <section id="about" className="py-32 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              The Premier <span className="text-gradient">Web3 Accelerator</span>
            </h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Blockchain Builders, led by pioneers from Stanford's blockchain
              ecosystem, partners with 0G to bring you an intensive 8-week program
              designed to help founders build, launch, and scale projects on the 0G
              protocol. Get hands-on support from industry experts and access to a
              world-class network including Stanford's blockchain community.
            </p>

            {/* Partner Logos */}
            <div className="flex items-center gap-6 flex-wrap">
              <div className="glass px-6 py-4 rounded-xl">
                <Image
                  src="/google.webp"
                  alt="Google"
                  width={120}
                  height={50}
                  className="h-10 w-auto"
                />
              </div>
              <span className="text-gray-400 text-2xl">×</span>
              <div className="glass px-6 py-4 rounded-xl">
                <Image
                  src="/0G-Logo-Purple_Hero.svg"
                  alt="0G"
                  width={100}
                  height={50}
                  className="h-10 w-auto"
                />
              </div>
              <span className="text-gray-400 text-2xl">×</span>
              <div className="glass px-6 py-4 rounded-xl">
                <Image
                  src="/blockchain-builder-logo.webp"
                  alt="Blockchain Builders"
                  width={180}
                  height={50}
                  className="h-10 w-auto"
                />
              </div>
            </div>
          </motion.div>

          {/* Right Content - Feature Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="glass glass-hover rounded-2xl p-6 flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-brand-purple-500/20 to-brand-purple-400/10 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="text-brand-purple-500" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
