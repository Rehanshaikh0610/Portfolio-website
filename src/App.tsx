import { motion } from "framer-motion";
import { ArrowRight, Quote, Mail } from "lucide-react";
import { HeroVideo } from "@/components/HeroVideo";
import { personal } from "@/lib/data";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { SpaFloatingNav } from "@/components/SpaFloatingNav";
import { SiteFooter } from "@/components/SiteFooter";
import { SpaAvatarGuide } from "@/components/SpaAvatarGuide";

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div aria-hidden className="grid-bg pointer-events-none fixed inset-0 z-0 opacity-30" />
      <SpaFloatingNav />

      <main className="relative z-10 mx-auto max-w-[1180px] px-5 pb-24 pt-28 sm:pt-32">
        {/* ══════ HERO ══════ */}
        <section id="hero" className="section-anchor relative">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[1fr_1.1fr] lg:gap-10">
            <div className="relative z-20">
              <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-base text-muted-foreground sm:text-lg">
                Hey, I am <span className="font-semibold text-brand">{personal.name.split(" ")[0]}</span>
              </motion.p>
              <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.08 }} className="mt-3 text-[44px] font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
                Full-Stack<br /><span className="text-gradient-brand">Developer</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="mt-5 max-w-lg text-[15px] leading-relaxed text-muted-foreground sm:text-base">
                I build production-grade web products end-to-end — crafting clean interfaces, reliable APIs and modern cloud/DevOps pipelines.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-8 flex flex-wrap items-center gap-3">
                <a href={`mailto:${personal.email}`} className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[color:var(--brand)] to-[color:var(--brand-2)] px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-brand)] transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0">
                  Hire me <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} aria-label="Go to contact" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white/5 text-foreground transition-colors hover:bg-white/10">
                  <Mail className="h-4 w-4" />
                </button>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }} className="glass-strong mt-12 max-w-md rounded-2xl p-5 shadow-[var(--shadow-card)]">
                <Quote className="h-5 w-5 text-brand" />
                <p className="mt-2 text-sm leading-relaxed text-foreground/85">"Rehan ships fast and thinks like a designer. His work blends engineering rigor with a real eye for craft."</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[color:var(--brand)] to-[color:var(--brand-2)] text-xs font-bold text-primary-foreground">RC</div>
                  <div><p className="text-sm font-semibold leading-tight">DevOps Club</p><p className="text-xs text-muted-foreground">APSIT</p></div>
                </div>
              </motion.div>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.15 }} className="relative z-10">
              <HeroVideo />
            </motion.div>
          </div>
        </section>

        {/* ══════ INLINE SECTIONS ══════ */}
        <div className="mt-24 space-y-0">
          <div className="section-divider" />
          <ProjectsSection />
          <div className="section-divider" />
          <SkillsSection />
          <div className="section-divider" />
          <ExperienceSection />
          <div className="section-divider" />
          <CertificationsSection />
          <div className="section-divider" />
          <ContactSection />
        </div>
      </main>

      <SiteFooter />
      <SpaAvatarGuide />
    </div>
  );
}
