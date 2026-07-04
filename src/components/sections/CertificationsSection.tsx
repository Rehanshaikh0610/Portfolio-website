"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { Award, ExternalLink, X } from "lucide-react";
import { certificates, type Certificate } from "@/lib/data";

const categories = ["All", "Cloud & Data Engineering", "Programming & Development", "Networking & Cybersecurity", "Process Mining", "Courses"] as const;

export function CertificationsSection() {
  const [active, setActive] = useState<(typeof categories)[number]>("All");
  const [open, setOpen] = useState<Certificate | null>(null);
  const filtered = useMemo(() => active === "All" ? certificates : certificates.filter((c) => c.category === active), [active]);

  const isGoogleDriveLink = (link: string) =>
    link.includes("drive.google.com") || link.includes("docs.google.com");

  const getPreviewSrc = (item: Certificate) => {
    if (item.link && isGoogleDriveLink(item.link)) {
      return encodeURI(item.link.replace("/view", "/preview"));
    }

    if (!item.image) return "";

    if (item.isPDF) {
      return encodeURI(item.image.startsWith("/") ? item.image : `/${item.image}`);
    }

    return encodeURI(item.image.startsWith("/") ? item.image : `/${item.image}`);
  };

  return (
    <section id="certifications" className="section-anchor section-glow-right py-20">
      {/* Header row: Title area left, Certificate image right */}
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_400px] mb-10">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-mono text-xs uppercase tracking-[0.3em] text-brand"
          >
            Trophy room
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-3 text-3xl font-bold sm:text-4xl lg:text-5xl"
          >
            <span className="text-gradient">Certifications</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-4 max-w-2xl text-base text-muted-foreground"
          >
            A growing collection of credentials across cloud, security, programming and process intelligence.
          </motion.p>
        </div>

        {/* Large Static Image (No Box Frame) */}
        <div className="hidden lg:block">
          <img
            src={`${import.meta.env.BASE_URL}certificates/certificate.png`}
            alt="Main Certification"
            className="w-full h-auto rounded-xl"
            style={{
              display: "block",
              filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.3))",
              objectFit: "contain"
            }}
          />
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all ${active === c ? "border-brand bg-brand/15 text-foreground shadow-[var(--shadow-brand)]" : "border-border bg-background/40 text-muted-foreground hover:text-foreground"}`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Certification Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c, i) => (
          <motion.button
            key={c.title}
            layout
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.04 }}
            whileHover={{ y: -4 }}
            onClick={() => setOpen(c)}
            className="card-premium group relative overflow-hidden rounded-2xl border border-border bg-card p-5 text-left hover:border-brand/50"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand/0 to-brand-2/0 opacity-0 transition-opacity group-hover:from-brand/10 group-hover:to-brand-2/10 group-hover:opacity-100" />
            <div className="relative">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand/30 to-brand-2/30 ring-1 ring-brand/40">
                <Award className="h-5 w-5" />
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand-2">{c.category}</p>
              <h3 className="mt-1 text-base font-semibold leading-snug">{c.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.issuer}</p>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Modal / Lightbox */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)} className="fixed inset-0 z-[60] flex items-center justify-center bg-background/80 p-4 backdrop-blur-md">
            <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="glass-strong relative w-full max-w-2xl rounded-3xl p-6 shadow-[var(--shadow-card)]">
              <button onClick={() => setOpen(null)} className="absolute right-4 top-4 rounded-full p-1.5 text-muted-foreground hover:bg-white/10 hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand-2">{open.category}</p>
              <h3 className="mt-1 text-2xl font-bold">{open.title}</h3>
              <p className="text-sm text-muted-foreground">{open.issuer}</p>
              <div className="mt-5 aspect-[4/3] w-full overflow-hidden rounded-xl border border-border bg-background/40">
                {open.image ? (
                  open.isPDF ? (
                    <iframe src={getPreviewSrc(open)} title={open.title} className="h-full w-full" />
                  ) : (
                    <img src={getPreviewSrc(open)} alt={open.title} className="h-full w-full object-contain bg-black/20" />
                  )
                ) : (
                  <div className="grid-bg flex h-full w-full items-center justify-center text-sm text-muted-foreground">
                    <div><Award className="mx-auto mb-2 h-10 w-10 text-brand" />Add certificate image</div>
                  </div>
                )}
              </div>
              {open.link && open.link !== "#" && (
                <a href={open.link} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand to-brand-2 px-4 py-2 text-sm font-semibold text-background">
                  Verify credential <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}