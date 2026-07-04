import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { MessageCircle, X, ArrowRight } from "lucide-react";

const tips = [
  {
    msg: "Welcome traveler. I'm Nova — your guide. Scroll down to explore my projects.",
    nextAnchor: "projects",
    nextLabel: "Explore Projects",
  },
  {
    msg: "Six worlds, six builds. Keep scrolling to see the toolkit.",
    nextAnchor: "skills",
    nextLabel: "See Skills",
  },
  {
    msg: "Drop a message and I'll respond fast. Thanks for exploring!",
    nextAnchor: "contact",
    nextLabel: "Get in Touch",
  },
];

export function SpaAvatarGuide() {
  const [open, setOpen] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);
  const tip = tips[tipIndex];

  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 1400);
    return () => clearTimeout(t);
  }, []);

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(tip.nextAnchor);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setTipIndex((prev) => (prev + 1) % tips.length);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            key={tipIndex}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="glass-strong relative max-w-[260px] rounded-2xl p-4 shadow-[var(--shadow-card)]"
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-2 top-2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
            <p className="text-xs font-mono uppercase tracking-widest text-[color:var(--neon)]">
              Nova · guide
            </p>
            <p className="mt-1 text-sm leading-relaxed">{tip.msg}</p>
            <a
              href={`#${tip.nextAnchor}`}
              onClick={handleNext}
              className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[color:var(--neon-2)] hover:underline"
            >
              {tip.nextLabel} <ArrowRight className="h-3 w-3" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[color:var(--neon)] to-[color:var(--neon-2)] animate-pulse-glow"
        aria-label="Toggle guide"
      >
        <span className="absolute inset-1 rounded-full bg-background/40 backdrop-blur-md" />
        <MessageCircle className="relative h-5 w-5" />
      </motion.button>
    </div>
  );
}
