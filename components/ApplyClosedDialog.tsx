"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";

const AKINDO_URL = "https://forms.gle/g4jwRM76tVUno3w56";

type ApplyClosedContextValue = {
  open: () => void;
  close: () => void;
  isOpen: boolean;
};

const ApplyClosedContext = createContext<ApplyClosedContextValue | null>(null);

export function useApplyClosed() {
  const ctx = useContext(ApplyClosedContext);
  if (!ctx) {
    throw new Error("useApplyClosed must be used within <ApplyClosedProvider>");
  }
  return ctx;
}

export function ApplyClosedProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, close]);

  return (
    <ApplyClosedContext.Provider value={{ open, close, isOpen }}>
      {children}
      <ApplyClosedDialog />
    </ApplyClosedContext.Provider>
  );
}

function ApplyClosedDialog() {
  const { isOpen, close } = useApplyClosed();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="apply-closed-title"
        >
          <button
            type="button"
            aria-label="Close dialog"
            onClick={close}
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm cursor-default"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-w-md w-full glass rounded-3xl p-8 shadow-2xl shadow-brand-purple-500/20"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 transition-colors p-1.5 rounded-full hover:bg-gray-900/5"
            >
              <X size={18} />
            </button>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple-500/10 mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-purple-500" />
              <span className="text-xs font-medium text-brand-purple-500 uppercase tracking-wider">
                Apollo cohort closed
              </span>
            </div>

            <h2
              id="apply-closed-title"
              className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight text-center"
            >
              Applications have officially closed
            </h2>

            <p className="text-gray-600 leading-relaxed mb-7">
              The journey continues with{" "}
              <span className="font-semibold text-gray-900">Akindo</span>. We invite
              you to apply through the form below.
            </p>

            <a
              href={AKINDO_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              className="group inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-brand-purple-500 to-brand-purple-400 text-white px-6 py-3.5 rounded-full font-medium hover:shadow-xl hover:shadow-brand-purple-500/30 transition-all"
            >
              Apply via Akindo
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>

            <button
              type="button"
              onClick={close}
              className="block w-full text-center text-sm text-gray-500 hover:text-gray-900 mt-4 transition-colors"
            >
              Maybe later
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
