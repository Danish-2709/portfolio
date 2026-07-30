import { useRef, useState } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { projects, type Project } from '../data/content';
import { SectionLabel } from './About';

function ProjectCard({ p, i }: { p: Project; i: number }) {
  const ref = useRef<HTMLButtonElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 150, damping: 18 });
  const sy = useSpring(my, { stiffness: 150, damping: 18 });
  const rotateX = useTransform(sy, [0, 1], [8, -8]);
  const rotateY = useTransform(sx, [0, 1], [-10, 10]);
  const [hover, setHover] = useState(false);

  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start end', 'end start'] });
  const yPar = useTransform(scrollYProgress, [0, 1], ['6%', '-6%']);
  const deviceZ = useTransform(sx, [0, 1], [30, 70]);
  const chipZ = useTransform(sy, [0, 1], [50, 90]);

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
    setHover(false);
  };

  return (
    <motion.div
      ref={wrapRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ y: yPar }}
      className={i % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12 lg:mt-32'}
    >
      <button
        ref={ref}
        data-cursor="hover"
        data-cursor-label="view"
        onMouseMove={onMove}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={onLeave}
        className="group relative block w-full text-left"
        style={{ perspective: 1000 }}
      >
        <motion.div
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          className="relative overflow-hidden rounded-3xl border border-white/8 bg-ink-900/40"
        >
          {/* Visual */}
          <div className="relative aspect-[16/10] overflow-hidden">
            <div
              className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
              style={{
                background: `radial-gradient(120% 80% at 30% 20%, ${p.accent}33, transparent 50%), radial-gradient(100% 80% at 80% 90%, ${p.accent}1a, transparent 55%), linear-gradient(135deg, #0a0c14, #10131f)`,
              }}
            />
            {/* Mock device */}
            <div className="absolute inset-0 flex items-center justify-center" style={{ transform: 'translateZ(40px)' }}>
              <motion.div style={{ z: deviceZ }} className="relative w-[58%]">
                <div className="rounded-xl border border-white/10 bg-ink-800/80 p-2 shadow-2xl backdrop-blur-md">
                  <div className="flex gap-1 px-1 pb-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                  </div>
                  <div className="space-y-1.5 rounded-lg bg-ink-950/60 p-3">
                    <div className="h-1.5 w-2/3 rounded-full" style={{ background: `${p.accent}80` }} />
                    <div className="h-1.5 w-full rounded-full bg-white/10" />
                    <div className="h-1.5 w-4/5 rounded-full bg-white/10" />
                    <div className="mt-2 flex gap-1.5">
                      <div className="h-4 w-12 rounded" style={{ background: `${p.accent}40` }} />
                      <div className="h-4 w-8 rounded bg-white/10" />
                    </div>
                    {/* live preview pulse */}
                    <motion.div
                      className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/5"
                      animate={{ opacity: hover ? 1 : 0.4 }}
                    >
                      <motion.div
                        className="h-full w-1/3 rounded-full"
                        style={{ background: p.accent }}
                        animate={{ x: hover ? ['0%', '300%'] : '0%' }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    </motion.div>
                  </div>
                </div>
                {/* glow under device */}
                <div
                  className="absolute -bottom-6 left-1/2 h-10 w-3/4 -translate-x-1/2 rounded-full blur-2xl"
                  style={{ background: `${p.accent}40` }}
                />
              </motion.div>
            </div>

            {/* Floating accent chip */}
            <motion.div
              style={{ z: chipZ, transform: 'translateZ(60px)' }}
              animate={{ y: hover ? -6 : 0 }}
              className="absolute right-5 top-5 glass rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white/70"
            >
              {p.year}
            </motion.div>
          </div>

          {/* Meta */}
          <div className="flex items-start justify-between gap-4 p-6 sm:p-8">
            <div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs" style={{ color: p.accent }}>
                  {p.index}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                  {p.category}
                </span>
              </div>
              <h3 className="mt-3 font-serif text-2xl text-white sm:text-3xl">
                {p.title}
              </h3>
              <p
                className={`mt-3 text-sm leading-relaxed text-white/55 transition-all duration-500 ${
                  hover ? 'max-h-40 opacity-100' : 'max-h-0 overflow-hidden opacity-0'
                }`}
              >
                {p.description}
              </p>
              <div
                className={`mt-4 flex flex-wrap gap-1.5 transition-opacity duration-500 ${
                  hover ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] text-white/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <motion.div
              animate={{ rotate: hover ? 45 : 0, scale: hover ? 1.1 : 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15"
              style={{ background: hover ? p.accent : 'transparent', color: hover ? '#05060a' : '#fff' }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 11L11 3M11 3H4M11 3V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </button>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="work" className="relative px-5 py-28 sm:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="03" title="Selected Work" />
        <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-2xl font-serif text-[clamp(2rem,5vw,3.6rem)] leading-[1.05] tracking-tight text-white">
            Four builds, each a <span className="text-aurora italic">world</span> of its own.
          </h2>
          <p className="max-w-xs text-sm text-white/50">
            A small selection. Each project is an end-to-end experience —
            concept, motion, and engineering.
          </p>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-0">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} p={p} i={i} />
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <button
            data-cursor="hover"
            className="group flex items-center gap-3 rounded-full border border-white/12 px-6 py-3 text-sm text-white/70 transition-colors hover:border-white/30 hover:text-white"
          >
            Full archive
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}