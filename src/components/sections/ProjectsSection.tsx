"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { projects } from "@/lib/data";

const Github = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 .5C5.73.5.99 5.24.99 11.5c0 4.85 3.15 8.96 7.52 10.42.55.1.75-.24.75-.53v-1.86c-3.06.66-3.7-1.47-3.7-1.47-.5-1.27-1.22-1.6-1.22-1.6-1-.69.08-.67.08-.67 1.1.08 1.69 1.13 1.69 1.13.98 1.69 2.58 1.2 3.21.92.1-.72.39-1.2.7-1.48-2.45-.28-5.02-1.22-5.02-5.45 0-1.2.43-2.18 1.13-2.95-.11-.28-.49-1.4.11-2.91 0 0 .92-.3 3.02 1.13a10.5 10.5 0 0 1 5.5 0c2.1-1.43 3.02-1.13 3.02-1.13.6 1.51.22 2.63.11 2.91.7.77 1.13 1.75 1.13 2.95 0 4.24-2.58 5.17-5.04 5.44.4.34.76 1.02.76 2.06v3.05c0 .29.2.64.76.53A11.01 11.01 0 0 0 23 11.5C23 5.24 18.27.5 12 .5Z" />
  </svg>
);

export function ProjectsSection() {
  return (
    <section id="projects" className="section-anchor section-glow-left py-20">
      {/* Increased the right column width from 260px to 400px for a larger image */}
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_400px] mb-10">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-mono text-xs uppercase tracking-[0.3em] text-brand"
          >
            Portfolio · 06 builds
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-3 text-3xl font-bold sm:text-4xl lg:text-5xl"
          >
            <span className="text-gradient">Projects</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-4 max-w-2xl text-base text-muted-foreground"
          >
            I build practical, solution-oriented projects combining software development and AI. My work includes intelligent systems, web applications, and data-driven models. Each project focuses on real-world usability and clean design. I aim to create impactful and scalable solutions through innovation.
          </motion.p>
        </div>

        {/* Image without the frame/box styling */}
        <div className="hidden lg:block">
          <img
            className="w-full h-auto rounded-xl" // Uses auto height to prevent squishing
            src="/certificates/project.png"
            alt="Project Overview"
            style={{ 
              display: "block",
              filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.3))" // Adds depth without a box frame
            }}
          />
        </div>
      </div>

      {/* Project cards */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {projects.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="card-premium group relative overflow-hidden rounded-2xl border border-border bg-card p-6 hover:border-brand/40"
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-0 transition-opacity group-hover:opacity-100" style={{ background: "radial-gradient(circle, var(--neon) 0%, transparent 70%)", opacity: 0.15 }} />
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand-2">0{i + 1} / 06</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight">{p.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.stack.map((t) => (
                <span key={t} className="rounded-full border border-border bg-background/40 px-2.5 py-1 text-[11px] font-mono text-muted-foreground">{t}</span>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-3">
              {p.github && (
                <a href={p.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm text-foreground/90 hover:text-brand">
                  <Github className="h-4 w-4" /> Code
                </a>
              )}
              <a href={p.demo ?? "#"} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-1.5 text-sm ${p.demo ? "text-foreground/90 hover:text-brand" : "pointer-events-none text-muted-foreground/60"}`}>
                <ExternalLink className="h-4 w-4" /> {p.demo ? "Live demo" : "Demo soon"}
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}