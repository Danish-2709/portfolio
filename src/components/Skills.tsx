import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { skills, type Skill } from '../data/content';
import { SectionLabel } from './About';

export default function Skills() {
  const [active, setActive] = useState<Skill | null>(null);
  const [tick, setTick] = useState(0);
  const raf = useRef<number>(0);
  const last = useRef<number>(0);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const loop = (t: number) => {
      if (t - last.current > 16) {
        last.current = t;
        setTick((v) => (v + 1) % 1000000);
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  const t = tick * 0.01;

  return (
    <section id="skills" className="relative px-5 py-28 sm:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="02" title="Skills" />
        <h2 className="mt-8 max-w-2xl font-serif text-[clamp(2rem,5vw,3.6rem)] leading-[1.05] tracking-tight text-white">
          A constellation of <span className="text-aurora italic">disciplines</span>,
          orbiting one craft.
        </h2>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-8">
          {/* Constellation */}
          <div className="relative mx-auto aspect-square w-full max-w-[460px]">
            {/* Rings */}
            {[1, 2, 3, 4].map((r) => (
              <div
                key={r}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/6"
                style={{
                  width: `${r * 22}%`,
                  height: `${r * 22}%`,
                  borderStyle: r % 2 ? 'dashed' : 'solid',
                }}
              />
            ))}

            {/* Core */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative h-16 w-16">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-aurora-cyan/40 to-aurora-violet/40 blur-xl" />
                <div className="absolute inset-0 rounded-full border border-white/15 bg-ink-900/50 backdrop-blur-md" />
                <div className="absolute inset-0 flex items-center justify-center font-mono text-[9px] uppercase tracking-widest text-white/70">
                  core
                </div>
              </div>
            </div>

            {/* Skill nodes */}
            {skills.map((s) => {
              const radius = s.orbit * 11; // % of half
              const angle = t * s.speed + s.phase;
              const x = 50 + Math.cos(angle) * radius;
              const y = 50 + Math.sin(angle) * radius;
              const isActive = active?.name === s.name;
              return (
                <button
                  key={s.name}
                  data-cursor="hover"
                  data-cursor-label={s.name}
                  onMouseEnter={() => setActive(s)}
                  onMouseLeave={() => setActive(null)}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  <motion.div
                    animate={{ scale: isActive ? 1.4 : 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="relative flex h-3 w-3 items-center justify-center"
                  >
                    <span
                      className="absolute inset-0 rounded-full blur-md"
                      style={{ background: s.color, opacity: isActive ? 0.8 : 0.4 }}
                    />
                    <span
                      className="relative h-2.5 w-2.5 rounded-full"
                      style={{ background: s.color, boxShadow: `0 0 10px ${s.color}` }}
                    />
                    {isActive && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border"
                        style={{ borderColor: `${s.color}66` }}
                      />
                    )}
                  </motion.div>
                </button>
              );
            })}
          </div>

          {/* Detail panel */}
          <div className="relative flex flex-col justify-center">
            <motion.div
              key={active?.name || 'empty'}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="glass min-h-[180px] rounded-2xl p-7"
            >
              {active ? (
                <div>
                  <div className="flex items-center gap-3">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: active.color, boxShadow: `0 0 12px ${active.color}` }}
                    />
                    <h3 className="font-serif text-2xl text-white">{active.name}</h3>
                    <span className="ml-auto font-mono text-xs text-white/40">
                      {active.level}%
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-white/60">
                    {active.blurb}
                  </p>
                </div>
              ) : (
                <div className="flex h-full min-h-[140px] flex-col items-start justify-center">
                  <p className="font-mono text-xs uppercase tracking-widest text-white/40">
                    Hover a node
                  </p>
                  <p className="mt-3 font-serif text-2xl text-white/70">
                    Each point is a discipline I've practiced for years.
                  </p>
                </div>
              )}
            </motion.div>

            {/* Skill legend */}
            <div className="mt-6 flex flex-wrap gap-2">
              {skills.map((s) => (
                <button
                  key={s.name}
                  data-cursor="hover"
                  onMouseEnter={() => setActive(s)}
                  onMouseLeave={() => setActive(null)}
                  className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                    active?.name === s.name
                      ? 'border-white/30 text-white'
                      : 'border-white/8 text-white/50 hover:text-white/80'
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}