import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from '../hooks/useUi';

const stats = [
  { value: '3+', label: 'Years Experience' },
  { value: '20+', label: 'Enterprise Projects' },
  { value: '10+', label: 'Technologies Mastered' },
  { value: '100%', label: 'Commitment to Quality' },
];

const principles = [
  { k: '01', t: 'Build for Scale', d: 'Every application I develop is designed to be scalable, maintainable, and ready for real-world business growth.',
  },
  { k: '02', t: 'Performance Matters', d: 'Fast, optimized applications create better user experiences. Performance is never an afterthought.',
  },
  { k: '03', t: 'Continuous Innovation', d: 'I constantly explore AI, modern web technologies, and immersive experiences to stay ahead of the curve.',
  },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { ref: inViewRef, inView } = useInView<HTMLDivElement>();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);

  return (
    <section id="about" className="relative px-5 py-28 sm:py-40">
      <div ref={inViewRef} className="mx-auto max-w-6xl">
        <SectionLabel index="01" title="About" />

        <div className="mt-12 grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          {/* Story */}
          <motion.div style={{ y }}>
            <h2 className="font-serif text-[clamp(2rem,5vw,3.6rem)] leading-[1.05] tracking-tight text-white">
              I treat the browser like a{' '}
              <span className="text-aurora italic">stage</span>, not a
              document.
            </h2>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-white/60 sm:text-lg">
              <p>
                For a decade I've worked at the seam between design and
                engineering — the place where a timeline meets a type system,
                and a shader meets a state machine.
              </p>
              <p>
                Beyond enterprise development, I'm passionate about creating
                visually immersive web experiences using Three.js, Framer Motion,
                and modern frontend technologies while continuously exploring AI
                and intelligent automation.
              </p>
              <p className="text-white/80">
                Currently working as a Full Stack Developer and Project Lead,
                helping businesses transform ideas into high-performance software
                solutions.

              </p>
            </div>

            {/* Principles */}
            <div className="mt-12 space-y-px">
              {principles.map((p, i) => (
                <motion.div
                  key={p.k}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  data-cursor="hover"
                  className="group grid grid-cols-[auto_1fr] gap-5 border-t border-white/8 py-5 transition-colors hover:border-aurora-cyan/30"
                >
                  <span className="font-mono text-xs text-aurora-cyan/60">{p.k}</span>
                  <div>
                    <h3 className="font-serif text-xl text-white transition-transform duration-500 group-hover:translate-x-1.5">
                      {p.t}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/50">{p.d}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Floating stats card */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="glass-strong relative overflow-hidden rounded-3xl p-8"
            >
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-aurora-violet/20 blur-3xl" />
              <div className="absolute -bottom-12 -left-8 h-44 w-44 rounded-full bg-aurora-cyan/15 blur-3xl" />

              <div className="relative">
                <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                  Professional Highlights
                </p>
                <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8">
                  {stats.map((s, i) => (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
                    >
                      <div className="font-serif text-4xl text-white sm:text-5xl">
                        {s.value}
                      </div>
                      <div className="mt-1 text-xs uppercase tracking-wider text-white/40">
                        {s.label}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 flex items-center gap-3 border-t border-white/8 pt-6">
                  <div className="relative h-2.5 w-2.5">
                    <span className="absolute inset-0 rounded-full bg-aurora-cyan" />
                    <span className="absolute inset-0 rounded-full bg-aurora-cyan animate-ping" />
                  </div>
                  <span className="text-xs text-white/60">Available for Freelance • Full-Time • Collaborations</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionLabel({ index, title }: { index: string; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className="flex items-center gap-4"
    >
      <span className="font-mono text-xs text-aurora-cyan/70">{index}</span>
      <span className="h-px w-12 bg-gradient-to-r from-aurora-cyan/60 to-transparent" />
      <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/50">
        {title}
      </span>
    </motion.div>
  );
}