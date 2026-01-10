"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, X, Clock } from "lucide-react";

export default function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Listen for custom event to open modal from navbar
  useEffect(() => {
    const handleOpenModal = () => setIsModalOpen(true);
    window.addEventListener("openApplyModal", handleOpenModal);
    return () => window.removeEventListener("openApplyModal", handleOpenModal);
  }, []);

  return (
    <>
      <section id="apply" className="py-32 relative overflow-hidden" ref={ref}>
        {/* Subtle Animated Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.08, 0.15, 0.08],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-brand-purple-300 blur-[150px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-brand-purple-200 blur-[120px]"
        />

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
              Ready to <span className="text-gradient">Accelerate</span>?
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Join the next cohort of founders building the future of
              decentralized AI infrastructure on 0G.
            </p>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-brand-purple-500 to-brand-purple-400 text-white px-10 py-5 rounded-full font-medium text-xl hover:shadow-2xl hover:shadow-brand-purple-500/40 transition-all cursor-pointer"
            >
              Apply Now
              <ArrowRight size={24} />
            </motion.button>

            {/* Contact */}
            <p className="text-gray-500 mt-8">
              Questions?{" "}
              <a
                href="mailto:accelerator@0g.ai"
                className="text-brand-purple-500 hover:text-brand-purple-400 transition-colors font-medium"
              >
                accelerator@0g.ai
              </a>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Application Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-3xl p-8 shadow-2xl relative w-full max-w-md">
                {/* Close Button */}
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={24} />
                </button>

                {/* Content */}
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-brand-purple-500/20 to-brand-purple-400/10 flex items-center justify-center mx-auto mb-6">
                    <Clock className="text-brand-purple-500" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Application Form Coming Soon
                  </h3>
                  <p className="text-gray-600 mb-6">
                    We&apos;re finalizing the application process. Check back soon or
                    reach out to us directly.
                  </p>
                  <a
                    href="mailto:accelerator@0g.ai"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-purple-500 to-brand-purple-400 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg hover:shadow-brand-purple-500/30 transition-all"
                  >
                    Contact Us
                    <ArrowRight size={18} />
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
