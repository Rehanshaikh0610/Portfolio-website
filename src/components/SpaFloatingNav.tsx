import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { navSections } from "@/lib/data";
import { useEffect, useState } from "react";

export function SpaFloatingNav() {
  const [activeAnchor, setActiveAnchor] = useState("hero");

  useEffect(() => {
    const ids = navSections.map((s) => s.anchor);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveAnchor(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent, anchor: string) => {
    e.preventDefault();
    const el = document.getElementById(anchor);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-4 left-1/2 z-50 w-[min(96vw,1100px)] -translate-x-1/2"
    >
      <div className="glass-strong flex items-center justify-between rounded-full px-2 py-2 shadow-[var(--shadow-soft)]">
        {/* Brand */}
        <a
          href="#hero"
          onClick={(e) => handleClick(e, "hero")}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold tracking-tight"
        >
          <span className="text-base font-bold lowercase">
            <span className="uppercase">R</span>ehan<span className="text-brand">.</span>
          </span>
        </a>

        {/* Center pill nav */}
        <div className="hidden items-center gap-0.5 sm:flex">
          {navSections.map((s) => {
            const active = activeAnchor === s.anchor;
            return (
              <a
                key={s.anchor}
                href={`#${s.anchor}`}
                onClick={(e) => handleClick(e, s.anchor)}
                className="relative px-3.5 py-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-gradient-to-b from-[color:var(--brand)] to-[color:var(--brand-2)] shadow-[var(--shadow-brand)]"
                  />
                )}
                <span className={`relative ${active ? "text-primary-foreground" : ""}`}>
                  {s.label}
                </span>
              </a>
            );
          })}
        </div>

        {/* CTA */}
        <a
          href={`${import.meta.env.BASE_URL}certificates/Resume.pdf`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-white/5 px-3.5 py-1.5 text-[13px] font-medium text-foreground transition-colors hover:bg-white/10"
        >
          <Download className="h-3.5 w-3.5" />
          <span className="hidden md:inline">Resume</span>
        </a>
      </div>

      {/* Mobile pill scroller */}
      <div className="mt-2 flex items-center gap-0.5 overflow-x-auto rounded-full glass-strong px-1 py-1 scrollbar-none sm:hidden">
        {navSections.map((s) => {
          const active = activeAnchor === s.anchor;
          return (
            <a
              key={s.anchor}
              href={`#${s.anchor}`}
              onClick={(e) => handleClick(e, s.anchor)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${active
                ? "bg-gradient-to-b from-[color:var(--brand)] to-[color:var(--brand-2)] text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
                }`}
            >
              {s.label}
            </a>
          );
        })}
      </div>
    </motion.nav>
  );
}
