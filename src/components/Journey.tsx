import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { milestones } from '../data/content';
import { SectionLabel } from './About';

export default function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.4'] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="journey" className="relative px-5 py-28 sm:py-40">
      <div className="mx-auto max-w-5xl">
        <SectionLabel index="04" title="Journey" />
        <h2 className="mt-8 max-w-2xl font-serif text-[clamp(2rem,5vw,3.6rem)] leading-[1.05] tracking-tight text-white">
          A mission log, not a <span className="text-aurora italic">résumé</span>.
        </h2>

        <div ref={ref} className="relative mt-20">
          {/* Vertical line */}
          <div className="absolute left-[7px] top-0 h-full w-px bg-white/8 sm:left-1/2 sm:-translate-x-1/2">
            <motion.div
              style={{ scaleY: lineScale, transformOrigin: 'top' }}
              className="h-full w-full bg-gradient-to-b from-aurora-cyan via-aurora-blue to-aurora-violet"
            />
          </div>

          <div className="space-y-14 sm:space-y-20">
            {milestones.map((m, i) => {
              const right = i % 2 === 1;
              return (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative pl-10 sm:grid sm:grid-cols-2 sm:gap-12 sm:pl-0 ${
                    right ? 'sm:[&>*:first-child]:order-2' : ''
                  }`}
                >
                  {/* Node */}
                  <div className="absolute left-0 top-1.5 sm:left-1/2 sm:-translate-x-1/2">
                    <span className="relative flex h-4 w-4 items-center justify-center">
                      <span className="absolute inset-0 rounded-full bg-aurora-cyan/30 blur-sm" />
                      <span className="relative h-2 w-2 rounded-full bg-aurora-cyan ring-4 ring-ink-950" />
                    </span>
                  </div>

                  {/* Content */}
                  <div className={right ? 'sm:pr-12 sm:text-right' : 'sm:col-start-2 sm:pl-12'}>
                    <span className="font-mono text-xs text-aurora-cyan/70">{m.year}</span>
                    <h3 className="mt-2 font-serif text-2xl text-white">{m.title}</h3>
                    <p className="mt-1 text-sm font-medium text-white/70">{m.org}</p>
                    <p className="mt-3 text-sm leading-relaxed text-white/50">{m.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}