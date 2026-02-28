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
              The Premier <span className="text-gradient">AI & Web3 Accelerator</span>
            </h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Blockchain Builders, led by pioneers from Stanford's blockchain
              ecosystem, partners with 0G to bring you an intensive 10-week program
              designed to help founders build, launch, and scale projects on the 0G
              protocol. Get hands-on support from industry experts and access to a
              world-class network including Stanford's blockchain community.
            </p>

            {/* Partner Logos */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="glass px-5 py-3 rounded-xl flex items-center justify-center">
                  <Image
                    src="/0G-Logo-Purple_Hero.svg"
                    alt="0G"
                    width={80}
                    height={36}
                    className="h-7 w-auto"
                  />
                </div>
                <span className="text-gray-400 text-xl">×</span>
                <div className="glass px-5 py-3 rounded-xl flex items-center justify-center">
                  <Image
                    src="/blockchain-builder-logo.webp"
                    alt="Blockchain Builders"
                    width={120}
                    height={36}
                    className="h-7 w-auto"
                  />
                </div>
              </div>
              <p className="text-sm text-gray-500 font-medium mt-2">Partners</p>
              <div className="flex items-center gap-4">
                <div className="glass px-4 py-2 rounded-xl flex items-center justify-center">
                  <Image
                    src="/gc.png"
                    alt="Google"
                    width={70}
                    height={28}
                    className="h-5 w-auto"
                  />
                </div>
                <span className="text-gray-400 text-lg">×</span>
                <div className="glass px-4 py-2 rounded-xl flex items-center justify-center">
                  <Image
                    src="/privy.png"
                    alt="Privy"
                    width={70}
                    height={28}
                    className="h-5 w-auto"
                  />
                </div>
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
