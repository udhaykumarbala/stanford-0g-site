"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Linkedin, Github } from "lucide-react";
import Image from "next/image";

// Custom X (Twitter) icon component
const XIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

interface MentorSocials {
  linkedin?: string;
  twitter?: string;
  github?: string;
}

interface Mentor {
  name: string;
  position: string;
  image: string;
  socials: MentorSocials;
}

const mentors: Mentor[] = [
  {
    name: "Dr. Sarah Chen",
    position: "Former Stanford Blockchain Lead",
    image: "/mentors/placeholder-1.jpg",
    socials: {
      linkedin: "https://www.linkedin.com/in/mheinrich/",
      twitter: "https://twitter.com/example",
      github: "https://github.com/example",
    },
  },
  {
    name: "Michael Rodriguez",
    position: "0G Protocol Core Developer",
    image: "/mentors/placeholder-2.jpg",
    socials: {
      linkedin: "https://www.linkedin.com/in/arnehartmann/",
      twitter: "https://twitter.com/example",
    },
  },
  {
    name: "Dr. Emily Watson",
    position: "AI Infrastructure Architect",
    image: "/mentors/placeholder-3.jpg",
    socials: {
      linkedin: "https://linkedin.com/in/example",
      github: "https://github.com/example",
    },
  },
  {
    name: "James Liu",
    position: "Web3 Venture Partner",
    image: "/mentors/placeholder-4.jpg",
    socials: {
      linkedin: "https://linkedin.com/in/example",
      twitter: "https://twitter.com/example",
    },
  },
  {
    name: "Dr. Aisha Patel",
    position: "Stanford CS Professor",
    image: "/mentors/placeholder-5.jpg",
    socials: {
      linkedin: "https://linkedin.com/in/example",
      twitter: "https://twitter.com/example",
      github: "https://github.com/example",
    },
  },
  {
    name: "David Kim",
    position: "Blockchain Builders Founder",
    image: "/mentors/placeholder-6.jpg",
    socials: {
      linkedin: "https://linkedin.com/in/example",
      twitter: "https://twitter.com/example",
    },
  },
];

export default function Mentors() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="mentors" className="py-32 relative overflow-hidden" ref={ref}>
      {/* Subtle Animated Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.06, 0.12, 0.06],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-brand-purple-300 blur-[150px]"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.08, 0.14, 0.08],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-brand-purple-200 blur-[120px]"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Meet Your <span className="text-gradient">Mentors</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Learn from industry leaders and Stanford veterans who will guide you
            through your Web3 journey
          </p>
        </motion.div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mentors.map((mentor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass glass-hover rounded-3xl p-8 text-center group"
            >
              {/* Profile Image */}
              <div className="mb-6 flex justify-center">
                <div className="relative w-32 h-32 rounded-full overflow-hidden ring-4 ring-brand-purple-500/20 group-hover:ring-brand-purple-500/40 transition-all">
                  <div className="w-full h-full bg-gradient-to-br from-brand-purple-200 to-brand-purple-100 flex items-center justify-center">
                    <span className="text-4xl font-bold text-brand-purple-500">
                      {mentor.name.charAt(0)}
                    </span>
                  </div>
                  {/* Uncomment when you have actual images */}
                  {/* <Image
                    src={mentor.image}
                    alt={mentor.name}
                    fill
                    className="object-cover"
                  /> */}
                </div>
              </div>

              {/* Name */}
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {mentor.name}
              </h3>

              {/* Position */}
              <p className="text-gray-600 mb-6 min-h-[48px]">{mentor.position}</p>

              {/* Social Links */}
              <div className="flex justify-center gap-3">
                {mentor.socials.linkedin && (
                  <a
                    href={mentor.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full glass glass-hover flex items-center justify-center text-gray-500 hover:text-brand-purple-500 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={18} />
                  </a>
                )}
                {mentor.socials.twitter && (
                  <a
                    href={mentor.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full glass glass-hover flex items-center justify-center text-gray-500 hover:text-brand-purple-500 transition-colors"
                    aria-label="Twitter"
                  >
                    <XIcon size={18} />
                  </a>
                )}
                {mentor.socials.github && (
                  <a
                    href={mentor.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full glass glass-hover flex items-center justify-center text-gray-500 hover:text-brand-purple-500 transition-colors"
                    aria-label="GitHub"
                  >
                    <Github size={18} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
