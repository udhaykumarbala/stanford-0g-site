"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Mail, X } from "lucide-react";

type WaitlistContextValue = {
  open: () => void;
  close: () => void;
  isOpen: boolean;
};

const WaitlistContext = createContext<WaitlistContextValue | null>(null);

export function useWaitlist() {
  const ctx = useContext(WaitlistContext);
  if (!ctx) {
    throw new Error("useWaitlist must be used within <WaitlistProvider>");
  }
  return ctx;
}

export function WaitlistProvider({ children }: { children: React.ReactNode }) {
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
    <WaitlistContext.Provider value={{ open, close, isOpen }}>
      {children}
      <WaitlistDialog />
    </WaitlistContext.Provider>
  );
}

type SubmitState = "idle" | "loading" | "success" | "error";

function WaitlistDialog() {
  const { isOpen, close } = useWaitlist();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === "loading") return;
    setState("loading");
    setErrorMessage("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }
      setState("success");
    } catch (err) {
      setState("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  };

  const handleClose = () => {
    close();
    // Reset after the exit animation so a reopened dialog starts fresh
    setTimeout(() => {
      setState("idle");
      setEmail("");
      setErrorMessage("");
    }, 300);
  };

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
          aria-labelledby="waitlist-title"
        >
          <button
            type="button"
            aria-label="Close dialog"
            onClick={handleClose}
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
              onClick={handleClose}
              aria-label="Close"
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 transition-colors p-1.5 rounded-full hover:bg-gray-900/5"
            >
              <X size={18} />
            </button>

            {state === "success" ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-brand-purple-500/10 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 className="text-brand-purple-500" size={32} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  You&apos;re on the list!
                </h2>
                <p className="text-gray-600 leading-relaxed mb-7">
                  We&apos;ll email you the moment Cohort 2 applications open.
                </p>
                <button
                  type="button"
                  onClick={handleClose}
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-brand-purple-500 to-brand-purple-400 text-white px-8 py-3 rounded-full font-medium hover:shadow-xl hover:shadow-brand-purple-500/30 transition-all"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple-500/10 mb-5">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-purple-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand-purple-500" />
                  </span>
                  <span className="text-xs font-medium text-brand-purple-500 uppercase tracking-wider">
                    Cohort 2 · Coming soon
                  </span>
                </div>

                <h2
                  id="waitlist-title"
                  className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight"
                >
                  Applications opening soon
                </h2>

                <p className="text-gray-600 leading-relaxed mb-7">
                  Cohort 2 applications haven&apos;t opened yet. Fill in your email
                  here to get notified the moment applications open.
                </p>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      autoFocus
                      className="w-full bg-white/70 border border-gray-200 rounded-full pl-11 pr-4 py-3.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-brand-purple-400 focus:ring-2 focus:ring-brand-purple-500/20 transition-all"
                    />
                  </div>

                  {state === "error" && (
                    <p className="text-sm text-red-500 px-2">{errorMessage}</p>
                  )}

                  <button
                    type="submit"
                    disabled={state === "loading"}
                    className="group inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-brand-purple-500 to-brand-purple-400 text-white px-6 py-3.5 rounded-full font-medium hover:shadow-xl hover:shadow-brand-purple-500/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {state === "loading" ? "Joining…" : "Notify Me"}
                    {state !== "loading" && (
                      <ArrowUpRight
                        size={18}
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    )}
                  </button>
                </form>

                <button
                  type="button"
                  onClick={handleClose}
                  className="block w-full text-center text-sm text-gray-500 hover:text-gray-900 mt-4 transition-colors"
                >
                  Maybe later
                </button>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
