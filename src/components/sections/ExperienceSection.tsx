import { motion, AnimatePresence } from "framer-motion";
import { Award, GraduationCap, X } from "lucide-react";
import { useState } from "react";
import { experience, achievements, education, type Achievement } from "@/lib/data";
import { SectionHeader } from "./SectionHeader";

export function ExperienceSection() {
  const [open, setOpen] = useState<Achievement | null>(null);

  const isGoogleDriveLink = (link: string) =>
    link.includes("drive.google.com") || link.includes("docs.google.com");

  const getPreviewSrc = (item: Achievement) => {
    const isLocalPDF = item.image?.toLowerCase().endsWith(".pdf");

    if (isLocalPDF) {
      return encodeURI(item.image!.startsWith("/") ? item.image! : `/${item.image!}`);
    }

    if (item.link && isGoogleDriveLink(item.link)) {
      return encodeURI(item.link.replace("/view", "/preview"));
    }

    return item.image ? encodeURI(item.image.startsWith("/") ? item.image : `/${item.image}`) : "";
  };

  return (
    <section id="experience" className="section-anchor section-glow-left py-20">
      <SectionHeader eyebrow="Journey" title="Experience" intro="Leadership, speaking and a track record of shipping at hackathons and in the community." />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <h3 className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-brand-2">Roles & leadership</h3>
          <div className="relative space-y-4 border-l border-border pl-6">
            {experience.map((e, i) => (
              <motion.div key={e.role} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06 }} className="glass-strong relative rounded-2xl p-5">
                <span className="absolute -left-[34px] top-6 h-3 w-3 rounded-full bg-brand shadow-[var(--shadow-brand)]" />
                <h4 className="text-lg font-semibold">{e.role}</h4>
                <p className="text-sm text-brand-2">{e.org}</p>
                <p className="mt-2 text-sm text-muted-foreground">{e.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-brand-2">Achievements</h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {achievements.map((a, i) => (
              <motion.button key={a.title} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }} onClick={() => setOpen(a)} className="glass card-premium rounded-2xl p-4 text-left hover:border-brand/50">
                <Award className="h-5 w-5 text-brand" />
                <p className="mt-3 text-sm font-semibold leading-snug">{a.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{a.org}</p>
              </motion.button>
            ))}
          </div>
          <h3 className="mb-5 mt-10 font-mono text-xs uppercase tracking-[0.3em] text-brand-2">Education</h3>
          <div className="space-y-3">
            {education.map((ed) => (
              <div key={ed.school} className="glass rounded-2xl p-4">
                <div className="flex items-start gap-3">
                  <GraduationCap className="mt-0.5 h-5 w-5 text-brand" />
                  <div>
                    <p className="font-semibold">{ed.school}</p>
                    <p className="text-sm text-muted-foreground">{ed.degree}</p>
                    <p className="mt-1 text-xs text-brand-2">{ed.detail} · {ed.period}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)} className="fixed inset-0 z-[60] flex items-center justify-center bg-background/80 p-4 backdrop-blur-md">
            <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="glass-strong relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl p-4 sm:p-6 shadow-[var(--shadow-card)]">
              <button onClick={() => setOpen(null)} className="absolute right-4 top-4 rounded-full p-1.5 text-muted-foreground hover:bg-white/10 hover:text-foreground"><X className="h-4 w-4" /></button>
              <h3 className="mt-1 text-2xl font-bold">{open.title}</h3>
              <p className="text-sm text-muted-foreground">{open.org}</p>
              <div className="mt-5 aspect-[4/3] w-full overflow-hidden rounded-xl border border-border bg-background/40">
                {open.image ? (
                  open.isPDF ? (
                    <iframe src={getPreviewSrc(open)} title={open.title} className="h-full w-full" />
                  ) : (
                    <img src={getPreviewSrc(open)} alt={open.title} className="h-full w-full object-cover" />
                  )
                ) : (
                  <div className="grid-bg flex h-full w-full items-center justify-center text-sm text-muted-foreground"><Award className="mx-auto mb-2 h-10 w-10 text-brand" /></div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
