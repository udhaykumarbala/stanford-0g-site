"use client";

import { motion, useInView } from "framer-motion";
import { Fragment, useRef } from "react";
import Image from "next/image";
import { Lock, Check } from "lucide-react";

interface Perk {
  partner: string;
  index: string;
  logo: string;
  value: string;
  qualifier: string;
  headline: string;
  points: string[];
  steps?: string[];
}

const PERKS: Perk[] = [
  {
    partner: "QuickNode",
    index: "01",
    logo: "/quicknode.jpg",
    value: "$5,000",
    qualifier: "in QuickNode credits · over 6 months",
    headline: "Infrastructure credits to scale your nodes",
    points: [
      "Globally distributed RPC nodes with low-latency reads",
      "Full dev toolkit: Webhooks, Streams & SQL Explorer",
    ],
  },
  {
    partner: "CertiK",
    index: "02",
    logo: "/certik.png",
    value: "20% off",
    qualifier: "on audits, pen tests & KYC",
    headline: "Audits, pen tests & KYC at cohort pricing",
    points: [
      "Fast-tracked priority audit & pen-test slots",
      "Mention you're in the Apollo cohort for a direct line to CertiK BD",
    ],
  },
  {
    partner: "Octane",
    index: "03",
    logo: "/octane.avif",
    value: "Free",
    qualifier: "AI-native security analysis",
    headline: '"Clear to Launch" pre-launch security analysis',
    points: [
      "One-time analysis across contracts, app logic, APIs, offchain services & dependencies",
      "AI discovery + expert researcher validation → confirmed issues + remediation",
    ],
    steps: [
      "Scope",
      "Analysis",
      "Validation",
      "Readout",
      "Fix priorities",
    ],
  },
];

export default function Perks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="perks" className="py-32 relative overflow-hidden" ref={ref}>
      {/* Animated orbs (same vocabulary as CTA/Mentors) */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-brand-purple-300 blur-[150px]"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-brand-purple-200 blur-[120px]"
      />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Exclusive Partner <span className="text-gradient">Perks</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Reserved for the 10 selected Apollo teams. Infrastructure credits,
            security audits, and a pre-launch security analysis from our partner
            network.
          </p>
          <div className="mt-6 flex justify-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full gradient-border text-sm font-medium text-brand-purple-500">
              <Lock size={14} />
              Apollo cohort only
              <span className="h-1.5 w-1.5 rounded-full bg-brand-purple-500" />
            </span>
          </div>
        </motion.div>

        {/* Ledger */}
        <div className="flex flex-col gap-6">
          {PERKS.map((perk, index) => {
            return (
              <motion.div
                key={perk.partner}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                whileHover={{ y: -10 }}
                className="group glass glass-hover rounded-3xl overflow-hidden relative"
              >
                {/* Radial spotlight behind the value */}
                <span className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_50%,rgba(146,0,225,0.10),transparent_60%)]" />
                {/* Faint index */}
                <span className="hidden md:block absolute top-6 left-6 text-xs text-brand-purple-300 font-mono">
                  {perk.index}
                </span>

                <div className="relative z-10 grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 md:gap-8 items-center p-8">
                  {/* Zone A — partner identity */}
                  <div className="flex flex-col items-center md:items-start gap-3">
                    <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center overflow-hidden ring-1 ring-brand-purple-500/10 group-hover:ring-brand-purple-500/30 shadow-sm transition-all">
                      <Image
                        src={perk.logo}
                        alt={`${perk.partner} logo`}
                        width={64}
                        height={64}
                        className="w-full h-full object-contain p-2.5"
                      />
                    </div>
                    <span className="text-sm font-semibold tracking-widest uppercase text-gray-500">
                      {perk.partner}
                    </span>
                  </div>

                  {/* Zone B — value + headline + points (+ stepper) */}
                  <div className="text-center md:text-left">
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-x-3 gap-y-1 justify-center md:justify-start">
                      <span className="text-4xl md:text-5xl font-bold text-gradient leading-none">
                        {perk.value}
                      </span>
                      <span className="text-base text-gray-500">
                        {perk.qualifier}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mt-2">
                      {perk.headline}
                    </h3>
                    <ul className="space-y-1.5 mt-3 inline-block text-left">
                      {perk.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-2 text-gray-600 text-sm"
                        >
                          <Check
                            size={16}
                            className="text-brand-purple-400 mt-0.5 flex-shrink-0"
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Octane-only program flow stepper */}
                    {perk.steps && (
                      <div className="flex items-start mt-6">
                        {perk.steps.map((step, i) => (
                          <Fragment key={step}>
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={
                                isInView ? { opacity: 1, scale: 1 } : {}
                              }
                              transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                              className="flex flex-col items-center w-10 md:w-[72px] flex-shrink-0"
                            >
                              <span
                                title={step}
                                className="w-7 h-7 rounded-full bg-brand-purple-500/15 flex items-center justify-center text-xs font-semibold text-brand-purple-500"
                              >
                                {i + 1}
                              </span>
                              <span className="hidden md:block text-[10px] text-gray-400 mt-1.5 text-center leading-tight">
                                {step}
                              </span>
                            </motion.div>
                            {i < perk.steps!.length - 1 && (
                              <span className="flex-1 h-px mt-3.5 bg-gradient-to-r from-brand-purple-300/60 to-brand-purple-200/40" />
                            )}
                          </Fragment>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
