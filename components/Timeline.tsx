"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { Presentation, GraduationCap, Calendar, MapPin } from "lucide-react";
import { TIMELINE_DATA, MILESTONES } from "@/lib/constants";

const milestoneIcons = {
  Presentation,
  GraduationCap,
  MapPin,
};

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress within the timeline section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Smooth the progress for better animation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section id="timeline" className="py-32 relative" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            10-Week <span className="text-gradient">Journey</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-4">
            A structured program to take you from concept to launch
          </p>
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full">
            <Calendar className="text-brand-purple-500" size={16} />
            <span className="text-sm text-gray-600 font-medium">
              April 12 – June 27, 2025
            </span>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center Line Container */}
          <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-1">
            {/* Base Line (gray background) */}
            <div className="absolute inset-0 bg-gray-200 rounded-full" />

            {/* Progress Line (fills based on scroll) */}
            <motion.div
              style={{ scaleY: smoothProgress, transformOrigin: "top" }}
              className="absolute inset-0 bg-gradient-to-b from-brand-purple-500 via-brand-purple-400 to-brand-purple-500 rounded-full"
            />

            {/* Pulse Indicator */}
            <motion.div
              style={{
                top: useTransform(smoothProgress, [0, 1], ["0%", "100%"]),
              }}
              className="absolute left-1/2 z-20 flex items-center justify-center"
            >
              {/* Moving dot */}
              <div className="w-4 h-4 rounded-full bg-brand-purple-500 border-2 border-white -translate-x-1/2 -translate-y-1/2" />
            </motion.div>
          </div>

          {/* Timeline Items */}
          <div className="space-y-16">
            {TIMELINE_DATA.map((item, index) => {
              // Calculate when this item should be active
              const itemProgress = (index + 0.5) / TIMELINE_DATA.length;

              return (
                <TimelineItem
                  key={index}
                  item={item}
                  index={index}
                  totalItems={TIMELINE_DATA.length}
                  scrollProgress={smoothProgress}
                  itemProgress={itemProgress}
                />
              );
            })}
          </div>
        </div>

        {/* Demo Day & Graduation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mt-24"
        >
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            {MILESTONES.map((milestone, index) => {
              const Icon =
                milestoneIcons[
                  milestone.icon as keyof typeof milestoneIcons
                ];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  whileHover={{ y: -5 }}
                  className="glass glass-hover rounded-3xl p-8 text-center flex-1 max-w-md group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-brand-purple-500/20 to-brand-purple-400/10 flex items-center justify-center mx-auto mb-5 group-hover:from-brand-purple-500/30 group-hover:to-brand-purple-400/20 transition-all">
                    <Icon
                      className="text-brand-purple-500 group-hover:text-brand-purple-400 transition-colors"
                      size={28}
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

interface TimelineItemProps {
  item: {
    week: string;
    title: string;
    topics: string[];
  };
  index: number;
  totalItems: number;
  scrollProgress: ReturnType<typeof useSpring>;
  itemProgress: number;
}

function TimelineItem({
  item,
  index,
  scrollProgress,
  itemProgress,
}: TimelineItemProps) {
  const isEven = index % 2 === 0;

  // Calculate opacity and scale based on scroll position
  const opacity = useTransform(
    scrollProgress,
    [itemProgress - 0.2, itemProgress - 0.05, itemProgress + 0.1],
    [0.3, 1, 1]
  );

  const scale = useTransform(
    scrollProgress,
    [itemProgress - 0.15, itemProgress],
    [0.95, 1]
  );

  const x = useTransform(
    scrollProgress,
    [itemProgress - 0.2, itemProgress],
    [isEven ? -30 : 30, 0]
  );

  // Node activation based on scroll
  const nodeScale = useTransform(
    scrollProgress,
    [itemProgress - 0.1, itemProgress],
    [0.8, 1]
  );

  const nodeOpacity = useTransform(
    scrollProgress,
    [itemProgress - 0.15, itemProgress],
    [0.4, 1]
  );

  return (
    <div
      className={`relative flex items-start gap-8 ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Content Card */}
      <motion.div
        style={{ opacity, scale, x }}
        className="md:w-1/2 pl-20 md:pl-0 grow md:grow-0"
      >
        <div
          className={`glass rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-brand-purple-500/10 ${
            isEven ? "md:mr-12" : "md:ml-12"
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-brand-purple-500 font-mono text-sm font-semibold">
              WEEKS {item.week}
            </span>
          </div>
          <h3 className="text-2xl font-bold mb-4 text-gray-900">
            {item.title}
          </h3>
          <ul className="space-y-2">
            {item.topics.map((topic, topicIndex) => (
              <motion.li
                key={topicIndex}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: topicIndex * 0.1 }}
                className="text-gray-600 flex items-start gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-purple-500 flex-shrink-0 mt-2" />
                {topic}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Node Marker - positioned to match center line exactly */}
      <motion.div
        style={{ scale: nodeScale, opacity: nodeOpacity }}
        className="absolute left-[calc(2rem-12px)] md:left-[calc(50%-14px)] top-6 z-10 -translate-x-1/2"
      >
        <div className="relative flex items-center justify-center">
          {/* Glow effect when active */}
          <motion.div
            style={{
              opacity: useTransform(
                scrollProgress,
                [itemProgress - 0.1, itemProgress, itemProgress + 0.2],
                [0, 0.7, 0]
              ),
            }}
            className="absolute w-12 h-12 rounded-full bg-brand-purple-400 blur-md"
          />
          {/* Main node */}
          <div className="w-7 h-7 rounded-full bg-brand-purple-500 border-4 border-white shadow-lg" />
        </div>
      </motion.div>

      {/* Empty space for alternating layout */}
      <div className="hidden md:block md:w-1/2" />
    </div>
  );
}
