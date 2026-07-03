import { motion } from "framer-motion";
import { skills } from "@/lib/data";
import { SectionHeader } from "./SectionHeader";

export function SkillsSection() {
  const groups = Object.entries(skills);
  return (
    <section id="skills" className="section-anchor section-glow-right py-20">
      <SectionHeader eyebrow="Toolbox" title="Skills" intro="A constantly-evolving stack across the full software lifecycle — from low-level languages to production cloud." />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {groups.map(([group, items], gi) => (
          <motion.div
            key={group}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: gi * 0.05 }}
            className="glass-strong rounded-2xl p-5"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand">{group}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {items.map((s, i) => (
                <motion.span
                  key={s}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: gi * 0.05 + i * 0.03 }}
                  whileHover={{ y: -2, scale: 1.05 }}
                  className="cursor-default rounded-xl border border-border bg-background/40 px-3 py-1.5 text-sm font-medium transition-colors hover:border-brand/50 hover:text-foreground hover:shadow-[var(--shadow-brand)]"
                >
                  {s}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
