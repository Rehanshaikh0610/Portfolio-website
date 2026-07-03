import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { Award, ExternalLink, X } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { certificates, type Certificate } from "@/lib/data";
import { achievements, type Achievement } from "@/lib/data";

export const Route = createFileRoute("/certifications")({
  head: () => ({
    meta: [
      { title: "Certifications — Rehan Shaikh" },
      { name: "description", content: "Verified certifications across cloud, programming, networking, security and process mining." },
      { property: "og:title", content: "Certifications — Rehan Shaikh" },
      { property: "og:description", content: "A digital trophy room of badges and credentials." },
    ],
  }),
  component: CertificationsPage,
});

const categories = [
  "All",
  "Cloud & Data Engineering",
  "Programming & Development",
  "Networking & Cybersecurity",
  "Process Mining",
  "Courses",
] as const;

function CertificationsPage() {
  const [active, setActive] = useState<(typeof categories)[number]>("All");
  const [open, setOpen] = useState<Certificate | Achievement | null>(null);

  const filtered = useMemo(
    () =>
      active === "All"
        ? certificates
        : certificates.filter((c) => c.category === active),
    [active],
  );

  const isGoogleDriveLink = (link: string) =>
    link.includes("drive.google.com") || link.includes("docs.google.com");

  const getPreviewSrc = (item: Certificate | Achievement) => {
    const isLocalPDF = item.image?.toLowerCase().endsWith(".pdf");

    if (isLocalPDF) {
      return encodeURI(item.image!.startsWith("/") ? item.image! : `/${item.image!}`);
    }

    if (item.link && isGoogleDriveLink(item.link)) {
      return encodeURI(item.link.replace("/view", "/preview"));
    }

    if (item.image) {
      return encodeURI(item.image.startsWith("/") ? item.image : `/${item.image}`);
    }

    return "";
  };

  return (
    <PageShell
      eyebrow="Trophy room"
      title="Certifications"
      intro="A growing collection of credentials across cloud, security, programming and process intelligence. Drop your certificate images into /public/certificates/ to display them."
    >
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all ${active === c
              ? "border-[color:var(--neon)] bg-[color:var(--neon)]/15 text-foreground shadow-[var(--shadow-neon)]"
              : "border-border bg-background/40 text-muted-foreground hover:text-foreground"
              }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c, i) => (
          <motion.button
            key={`${c.title}-${c.issuer}-${i}`}
            layoutId={`cert-${c.title}-${c.issuer}`}
            layout
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.04 }}
            whileHover={{ y: -4 }}
            onClick={() => setOpen(c)}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 text-left transition-all hover:border-[color:var(--neon)]/50 hover:shadow-[var(--shadow-neon)]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--neon)]/0 to-[color:var(--neon-2)]/0 opacity-0 transition-opacity group-hover:from-[color:var(--neon)]/10 group-hover:to-[color:var(--neon-2)]/10 group-hover:opacity-100" />
            <div className="relative">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[color:var(--neon)]/30 to-[color:var(--neon-2)]/30 ring-1 ring-[color:var(--neon)]/40">
                <Award className="h-5 w-5" />
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[color:var(--neon-2)]">
                {c.category}
              </p>
              <h3 className="mt-1 text-base font-semibold leading-snug">
                {c.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.issuer}</p>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {open && !("org" in open) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-background/80 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong relative w-full max-w-2xl rounded-3xl p-6 shadow-[var(--shadow-card)]"
            >
              <button
                onClick={() => setOpen(null)}
                className="absolute right-4 top-4 rounded-full p-1.5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[color:var(--neon-2)]">
                {(open as Certificate).category}
              </p>
              <h3 className="mt-1 text-2xl font-bold">{open.title}</h3>
              <p className="text-sm text-muted-foreground">{(open as Certificate).issuer}</p>

              <div className="mt-5 aspect-[4/3] w-full overflow-hidden rounded-xl border border-border bg-background/40">
                {open.image ? (
                  "isPDF" in open && open.isPDF && open.link ? (
                    <iframe
                      src={getPreviewSrc(open)}
                      title={open.title}
                      className="h-full w-full"
                      allow="fullscreen"
                    />
                  ) : (
                    <img
                      src={getPreviewSrc(open)}
                      alt={open.title}
                      className="h-full w-full object-cover"
                    />
                  )
                ) : (
                  <div className="grid-bg flex h-full w-full items-center justify-center text-center text-sm text-muted-foreground">
                    <div>
                      <Award className="mx-auto mb-2 h-10 w-10 text-[color:var(--neon)]" />
                      Add your certificate image to
                      <code className="ml-1 rounded bg-background/60 px-1.5 py-0.5 text-xs">
                        /public/certificates/
                      </code>
                    </div>
                  </div>
                )}
              </div>

              {open.link && open.link !== "#" && (
                <a
                  href={open.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[color:var(--neon)] to-[color:var(--neon-2)] px-4 py-2 text-sm font-semibold text-background"
                >
                  Verify credential
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </motion.div>
          </motion.div>
        )}
        {/* Achievements Section */}
        {achievements && achievements.length > 0 && (
          <div className="mt-16 border-t border-border pt-12">
            <h2 className="mb-8 text-2xl font-bold">Achievements</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {achievements.map((a, i) => (
                <motion.button
                  key={`${a.title}-${a.org}-${i}`}
                  layoutId={`achievement-${a.title}-${a.org}`}
                  layout
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.04 }}
                  whileHover={{ y: -4 }}
                  onClick={() => setOpen(a)}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 text-left transition-all hover:border-[color:var(--neon)]/50 hover:shadow-[var(--shadow-neon)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--neon)]/0 to-[color:var(--neon-2)]/0 opacity-0 transition-opacity group-hover:from-[color:var(--neon)]/10 group-hover:to-[color:var(--neon-2)]/10 group-hover:opacity-100" />
                  <div className="relative">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[color:var(--neon)]/30 to-[color:var(--neon-2)]/30 ring-1 ring-[color:var(--neon)]/40">
                      <Award className="h-5 w-5" />
                    </div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[color:var(--neon-2)]">
                      {a.org}
                    </p>
                    <h3 className="mt-1 text-base font-semibold leading-snug">
                      {a.title}
                    </h3>
                  </div>
                </motion.button>
              ))}
            </div>

            <AnimatePresence>
              {open && typeof open === "object" && "org" in open && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setOpen(null)}
                  className="fixed inset-0 z-[60] flex items-center justify-center bg-background/80 p-4 backdrop-blur-md"
                >
                  <motion.div
                    initial={{ scale: 0.92, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="glass-strong relative w-full max-w-md rounded-3xl p-6 shadow-[var(--shadow-card)]"
                  >
                    <button
                      onClick={() => setOpen(null)}
                      className="absolute right-4 top-4 rounded-full p-1.5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <h3 className="mt-1 text-2xl font-bold">{open.title}</h3>
                    <p className="text-sm text-muted-foreground">{open.org}</p>

                    <div className="mt-5 aspect-[4/3] w-full overflow-hidden rounded-xl border border-border bg-background/40">
                      {open.link && isGoogleDriveLink(open.link) ? (
                        <iframe
                          src={getPreviewSrc(open)}
                          title={open.title}
                          className="h-full w-full"
                          allow="fullscreen"
                        />
                      ) : open.image ? (
                        "isPDF" in open && open.isPDF && open.link ? (
                          <iframe
                            src={getPreviewSrc(open)}
                            title={open.title}
                            className="h-full w-full"
                            allow="fullscreen"
                          />
                        ) : (
                          <img
                            src={getPreviewSrc(open)}
                            alt={open.title}
                            className="h-full w-full object-cover"
                          />
                        )
                      ) : (
                        <div className="grid-bg flex h-full w-full items-center justify-center text-center text-sm text-muted-foreground">
                          <div>
                            <Award className="mx-auto mb-2 h-10 w-10 text-[color:var(--neon)]" />
                            Add your achievement image to
                            <code className="ml-1 rounded bg-background/60 px-1.5 py-0.5 text-xs">
                              /public/certificates/
                            </code>
                          </div>
                        </div>
                      )}
                    </div>

                    {open.link && open.link !== "#" && (
                      <a
                        href={open.link}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[color:var(--neon)] to-[color:var(--neon-2)] px-4 py-2 text-sm font-semibold text-background"
                      >
                        Verify achievement
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </AnimatePresence>
    </PageShell>
  );
}
