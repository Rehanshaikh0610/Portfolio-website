import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const Github = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 .5C5.73.5.99 5.24.99 11.5c0 4.85 3.15 8.96 7.52 10.42.55.1.75-.24.75-.53v-1.86c-3.06.66-3.7-1.47-3.7-1.47-.5-1.27-1.22-1.6-1.22-1.6-1-.69.08-.67.08-.67 1.1.08 1.69 1.13 1.69 1.13.98 1.69 2.58 1.2 3.21.92.1-.72.39-1.2.7-1.48-2.45-.28-5.02-1.22-5.02-5.45 0-1.2.43-2.18 1.13-2.95-.11-.28-.49-1.4.11-2.91 0 0 .92-.3 3.02 1.13a10.5 10.5 0 0 1 5.5 0c2.1-1.43 3.02-1.13 3.02-1.13.6 1.51.22 2.63.11 2.91.7.77 1.13 1.75 1.13 2.95 0 4.24-2.58 5.17-5.04 5.44.4.34.76 1.02.76 2.06v3.05c0 .29.2.64.76.53A11.01 11.01 0 0 0 23 11.5C23 5.24 18.27.5 12 .5Z"/>
  </svg>
);
import { PageShell } from "@/components/PageShell";
import { projects } from "@/lib/data";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Rehan Shaikh" },
      { name: "description", content: "Selected projects by Rehan Shaikh — full-stack, 3D, ML and DevOps builds." },
      { property: "og:title", content: "Projects — Rehan Shaikh" },
      { property: "og:description", content: "Six worlds, six builds — explore Rehan's project portfolio." },
    ],
  }),
  component: ProjectsPage,
});

const accentMap = {
  violet: "from-[color:var(--neon)]/40 to-transparent",
  cyan: "from-[color:var(--neon-2)]/40 to-transparent",
  magenta: "from-pink-500/40 to-transparent",
};

function ProjectsPage() {
  return (
    <PageShell
      eyebrow="Portfolio · 06 builds"
      title="Projects"
      intro="A selection of products, experiments and platforms — spanning full-stack web, 3D, ML and DevOps."
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {projects.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:border-[color:var(--neon)]/40 hover:shadow-[var(--shadow-card)]"
          >
            <div
              className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-radial ${accentMap[p.accent]} opacity-60 blur-3xl transition-opacity group-hover:opacity-100`}
              style={{ background: `radial-gradient(circle, var(--neon) 0%, transparent 70%)`, opacity: 0.15 }}
            />
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[color:var(--neon-2)]">
              0{i + 1} / 06
            </p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight">
              {p.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {p.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.stack.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border bg-background/40 px-2.5 py-1 text-[11px] font-mono text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-3">
              {p.github && (
                <a
                  href={p.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-foreground/90 hover:text-[color:var(--neon-2)]"
                >
                  <Github className="h-4 w-4" />
                  Code
                </a>
              )}
              <a
                href={p.demo ?? "#"}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-1.5 text-sm ${p.demo ? "text-foreground/90 hover:text-[color:var(--neon)]" : "pointer-events-none text-muted-foreground/60"}`}
              >
                <ExternalLink className="h-4 w-4" />
                {p.demo ? "Live demo" : "Demo soon"}
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </PageShell>
  );
}
