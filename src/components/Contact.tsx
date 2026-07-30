import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionLabel } from './About';

const channels = [
  {
    label: 'Email',
    value: 'ahmadshareef200@gmail.com',
    href: 'mailto:ahmadshareef200@gmail.com',
  },
  {
    label: 'Phone',
    value: '+91 9140483492',
    href: 'tel:+919140483492',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/danish-ahmad-bb4973245',
    href: 'https://www.linkedin.com/in/danish-ahmad-bb4973245',
  },
  {
    label: 'GitHub',
    value: 'github.com/Danish-2709',
    href: 'https://github.com/Danish-2709',
  },
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: '', email: '', message: '' });
    }, 3200);
  };

  return (
    <section id="contact" className="relative px-5 py-28 sm:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="05" title="Contact" />
        <div className="mt-8 grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <h2 className="font-serif text-[clamp(2.2rem,6vw,4.5rem)] leading-[1] tracking-tight text-white">
              Let's build something{' '}
              <span className="text-aurora italic">extraordinary</span>.
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/60">
              I'm always interested in collaborating on innovative web applications,
              enterprise software, AI-powered solutions, and modern digital experiences.
              Whether you have a project, an opportunity, or just want to connect, feel
              free to reach out.
            </p>

            <div className="mt-10 space-y-px">
              {channels.map((c, i) => (
                <motion.a
                  key={c.label}
                  href={c.href}
                  data-cursor="hover"
                  data-cursor-label="open"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="group flex items-center justify-between border-t border-white/8 py-4 transition-colors hover:border-aurora-cyan/30"
                >
                  <span className="font-mono text-xs uppercase tracking-widest text-white/40">
                    {c.label}
                  </span>
                  <span className="flex items-center gap-2 font-serif text-lg text-white/80 transition-transform group-hover:translate-x-1">
                    {c.value}
                    <span className="text-aurora-cyan opacity-0 transition-opacity group-hover:opacity-100">→</span>
                  </span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Holographic transmission panel */}
          <div className="relative">
            <div className="glass-strong relative overflow-hidden rounded-3xl p-7 sm:p-9">
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-aurora-cyan/15 blur-3xl" />
              <div className="absolute -bottom-16 -left-10 h-52 w-52 rounded-full bg-aurora-violet/15 blur-3xl" />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-aurora-cyan" />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-white/50">
                      communication channel · online
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-white/30">Available for Freelance & Full-Time</span>
                </div>

                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.div
                      key="sent"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex min-h-[300px] flex-col items-center justify-center text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 14 }}
                        className="relative mb-6 flex h-20 w-20 items-center justify-center"
                      >
                        <span className="absolute inset-0 rounded-full bg-aurora-cyan/20 blur-xl" />
                        <span className="relative flex h-16 w-16 items-center justify-center rounded-full border border-aurora-cyan/40">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M5 13l4 4L19 7" stroke="#5eead4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        <span className="absolute inset-0 rounded-full border border-aurora-cyan/40 pulse-ring" />
                      </motion.div>
                      <h3 className="font-serif text-2xl text-white">Transmission sent</h3>
                      <p className="mt-2 text-sm text-white/50">
                        I'll respond within 48 hours.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={submit}
                      className="mt-7 space-y-5"
                    >
                      <Field
                        label="Identifier"
                        value={form.name}
                        onChange={(v) => setForm({ ...form, name: v })}
                        placeholder="Your name"
                        required
                      />
                      <Field
                        label="Return channel"
                        type="email"
                        value={form.email}
                        onChange={(v) => setForm({ ...form, email: v })}
                        placeholder="you@domain.com"
                        required
                      />
                      <div>
                        <label className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                          Message
                        </label>
                        <textarea
                          required
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          placeholder="Tell me about the world you're building."
                          rows={4}
                          className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-aurora-cyan/50 focus:outline-none"
                        />
                      </div>
                      <button
                        type="submit"
                        data-cursor="hover"
                        data-cursor-label="send"
                        className="group relative w-full overflow-hidden rounded-full bg-white px-6 py-3.5 text-sm font-medium text-ink-950"
                      >
                        <span className="relative z-10">Send transmission</span>
                        <span className="absolute inset-0 -translate-y-full bg-gradient-to-r from-aurora-cyan to-aurora-blue transition-transform duration-500 group-hover:translate-y-0" />
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="font-mono text-[10px] uppercase tracking-widest text-white/40">
        {label}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-aurora-cyan/50 focus:outline-none"
      />
    </div>
  );
}