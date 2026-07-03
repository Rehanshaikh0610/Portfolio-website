import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Code2, Trophy, Briefcase, Cpu, Mail } from "lucide-react";
import { navSections } from "@/lib/data";

const iconMap: Record<string, typeof Code2> = {
  "/projects": Code2,
  "/skills": Cpu,
  "/experience": Briefcase,
  "/certifications": Trophy,
  "/contact": Mail,
};

export function HubGrid() {
  const items = navSections.filter((s) => s.to !== "/");
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((s, i) => {
        const Icon = iconMap[s.to] ?? Code2;
        return (
          <motion.div
            key={s.to}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
          >
            <Link
              to={s.to}
              className="group relative block overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:border-[color:var(--neon)]/50 hover:shadow-[var(--shadow-neon)]"
            >
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[color:var(--neon)]/10 blur-3xl transition-opacity group-hover:bg-[color:var(--neon)]/25" />
              <div className="relative">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[color:var(--neon)]/30 to-[color:var(--neon-2)]/30 ring-1 ring-[color:var(--neon)]/40">
                  <Icon className="h-5 w-5 text-foreground" />
                </div>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[color:var(--neon-2)]">
                  0{i + 1} · portal
                </p>
                <h3 className="mt-1 text-xl font-semibold">{s.label}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.hint}</p>
                <div className="mt-5 flex items-center gap-1 text-sm font-medium text-foreground">
                  Enter
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
