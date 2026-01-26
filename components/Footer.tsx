"use client";

import { Github, MessageCircle } from "lucide-react";
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

export default function Footer() {
  const socialLinks = [
    { icon: XIcon, href: "https://x.com/0G_labs", label: "X" },
    { icon: Github, href: "https://github.com/0gfoundation", label: "GitHub" },
    { icon: MessageCircle, href: "https://discord.gg/0glabs", label: "Discord" },
  ];

  return (
    <footer className="py-16 border-t border-brand-purple-500/10 bg-white/50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Stanford Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full">
            <span className="text-2xl">🎓</span>
            <span className="text-sm text-gray-600 font-medium">
              Part of Stanford's Blockchain Builder Ecosystem
            </span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logos */}
          <div className="flex items-center gap-4">
            <Image
              src="/0G-Logo-Purple_Hero.svg"
              alt="0G"
              width={60}
              height={30}
              className="h-6 w-auto"
            />
            <span className="text-gray-400">×</span>
            <Image
              src="/blockchain-builder-logo.webp"
              alt="Blockchain Builders"
              width={120}
              height={30}
              className="h-6 w-auto"
            />
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 md:ml-24">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass glass-hover flex items-center justify-center text-gray-500 hover:text-brand-purple-500 transition-colors"
                aria-label={social.label}
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} 0G Labs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
