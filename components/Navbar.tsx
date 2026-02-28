"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "px-6 py-3" : "px-0 py-0"
      }`}
    >
      <div
        className={`mx-auto px-6 flex items-center justify-between transition-all duration-500 ${
          isScrolled
            ? "max-w-5xl py-3 rounded-full glass shadow-lg shadow-brand-purple-500/10"
            : "max-w-full py-4"
        }`}
      >
        {/* Logo */}
        <a href="#" className="flex items-center">
          <Image
            src="/apollo.png"
            alt="0G Apollo Program"
            width={200}
            height={50}
            priority
            className="h-10 w-auto"
          />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-gray-600 hover:text-brand-purple-500 transition-colors text-sm font-medium"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://forms.gle/TYM4tZaD1gYrDVdS9"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-brand-purple-500 to-brand-purple-400 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:shadow-lg hover:shadow-brand-purple-500/25 transition-all cursor-pointer"
          >
            Apply Now
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-800"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass mt-4 mx-6 rounded-2xl p-6"
        >
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-brand-purple-500 transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://forms.gle/TYM4tZaD1gYrDVdS9"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-brand-purple-500 to-brand-purple-400 text-white px-6 py-3 rounded-full text-center font-medium mt-2 cursor-pointer block"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Apply Now
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
