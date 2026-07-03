"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Code, Briefcase, ArrowRight } from "lucide-react";
import { personal } from "@/lib/data";
import { useState } from "react";

function Field({ label, name, type = "text", placeholder }: { label: string; name: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.25em] text-brand-2">{label}</label>
      <input name={name} type={type} required placeholder={placeholder} className="w-full rounded-xl border border-border bg-background/40 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-brand focus:shadow-[var(--shadow-brand)]" />
    </div>
  );
}

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const items = [
    { icon: Mail, label: "Email", value: personal.email, href: `mailto:${personal.email}` },
    { icon: Phone, label: "Phone", value: personal.phone, href: `tel:${personal.phone}` },
    { icon: MapPin, label: "Based in", value: "Mumbai, India" },
    { icon: Code, label: "GitHub", value: "Rehanshaikh0610", href: personal.github },
    { icon: Briefcase, label: "LinkedIn", value: "rehan-shaikh", href: personal.linkedin },
  ];

  return (
    <section id="contact" className="section-anchor section-glow-left py-20">
      {/* Header row: title left, connect image right (increased size to 400px) */}
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_400px] mb-10">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-mono text-xs uppercase tracking-[0.3em] text-brand"
          >
            Let's connect
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-3 text-3xl font-bold sm:text-4xl lg:text-5xl"
          >
            <span className="text-gradient">Get in touch</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-4 max-w-2xl text-base text-muted-foreground"
          >
            Open to internships, full-time roles, freelance gigs and ambitious side projects.
          </motion.p>
        </div>

        {/* Static Connect Image - No box, No motion, increased size */}
        <div className="hidden lg:block">
          <img
            src="/certificates/connect.png"
            alt="Let's connect"
            className="w-full h-auto rounded-xl"
            style={{ 
              display: "block",
              filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.3))" 
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2 space-y-3">
          {items.map((it, i) => (
            <motion.a 
              key={it.label} 
              href={it.href ?? "#"} 
              target={it.href?.startsWith('http') ? "_blank" : undefined} 
              rel={it.href?.startsWith('http') ? "noreferrer" : undefined} 
              initial={{ opacity: 0, x: -12 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.4, delay: i * 0.05 }} 
              className="glass-strong group flex items-center gap-4 rounded-2xl p-4 transition-all hover:border-brand/40 hover:shadow-[var(--shadow-brand)]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand/30 to-brand-2/30 ring-1 ring-brand/40"><it.icon className="h-5 w-5" /></div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand-2">{it.label}</p>
                <p className="text-sm font-medium">{it.value}</p>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.form 
          initial={{ opacity: 0, y: 18 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.5 }} 
          onSubmit={async (e) => {
            e.preventDefault();
            setIsSubmitting(true);
            setSubmitStatus('idle');
            const formData = new FormData(e.currentTarget);
            try {
              const response = await fetch("/api/send-email", { 
                method: "POST", 
                headers: { "Content-Type": "application/json" }, 
                body: JSON.stringify({ 
                  name: formData.get("name"), 
                  email: formData.get("email"), 
                  message: formData.get("message") 
                }) 
              });
              if (response.ok) { 
                setSubmitStatus('success'); 
                (e.target as HTMLFormElement).reset(); 
                setTimeout(() => setSubmitStatus('idle'), 3000); 
              } else { 
                setSubmitStatus('error'); 
                setTimeout(() => setSubmitStatus('idle'), 3000); 
              }
            } catch { 
              setSubmitStatus('error'); 
              setTimeout(() => setSubmitStatus('idle'), 3000); 
            } finally { 
              setIsSubmitting(false); 
            }
          }} 
          className="glass-strong space-y-4 rounded-3xl p-6 lg:col-span-3"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Your name" name="name" placeholder="name" />
            <Field label="Email" name="email" type="email" placeholder="you@domain.com" />
          </div>
          <div>
            <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.25em] text-brand-2">Message</label>
            <textarea name="message" required rows={5} placeholder="Tell me about your idea, role, or project…" className="w-full resize-none rounded-xl border border-border bg-background/40 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-brand focus:shadow-[var(--shadow-brand)]" />
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" disabled={isSubmitting} className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand to-brand-2 px-5 py-3 text-sm font-semibold text-background shadow-[var(--shadow-brand)] transition-transform hover:scale-[1.02] disabled:opacity-50">
              {isSubmitting ? "Sending..." : "Send message"} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            {submitStatus === 'success' && <p className="text-sm text-green-400">Message sent! ✓</p>}
            {submitStatus === 'error' && <p className="text-sm text-red-400">Failed to send. Try again.</p>}
          </div>
        </motion.form>
      </div>
    </section>
  );
}