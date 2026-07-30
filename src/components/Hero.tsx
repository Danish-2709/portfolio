import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';

const headline = ['Crafting', 'interfaces', 'that', 'feel', 'alive.'];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [entered, setEntered] = useState(false);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yUp = useTransform(scrollYProgress, [0, 1], ['0%', '-40%']);
  const scaleDown = useTransform(scrollYProgress, [0, 1], [1, 0.7]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const blurUp = useTransform(scrollYProgress, [0, 0.8], [0, 8]);
  const blurFilter = useTransform(blurUp, (v) => `blur(${v}px)`);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth);
      my.set(e.clientY / window.innerHeight);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [mx, my]);

  const parX = useTransform(sx, [0, 1], [-12, 12]);
  const parY = useTransform(sy, [0, 1], [-8, 8]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5"
    >
      <motion.div
        style={{ y: yUp, scale: scaleDown, opacity: fadeOut, filter: blurFilter }}
        className="relative z-10 max-w-5xl text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={entered ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-6 flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-aurora-cyan"
        >
          <span className="h-px w-8 bg-aurora-cyan/50" />
          Full Stack Developer · Project Lead
          <span className="h-px w-8 bg-aurora-cyan/50" />
        </motion.div>

        <motion.h1 style={{ x: parX, y: parY }} className="font-serif text-[clamp(2.8rem,9vw,7.5rem)] leading-[0.95] tracking-tightest text-white">
          {headline.map((word, i) => (
            <span key={i} className="mr-[0.25em] inline-block overflow-hidden align-bottom">
              <motion.span initial={{ y: '110%', opacity: 0 }} animate={entered ? { y: '0%', opacity: 1 } : {}} transition={{ delay: 0.5 + i * 0.09, duration: 0.95, ease: [0.22, 1, 0.36, 1] }} className={`inline-block ${i === 4 ? 'text-aurora italic' : ''}`}>
                {word}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.p initial={{ opacity: 0 }} animate={entered ? { opacity: 1 } : {}} transition={{ delay: 1.3, duration: 1 }} className="mx-auto mt-8 max-w-xl text-balance text-base leading-relaxed text-white/60 sm:text-lg">
          Full Stack Developer specializing in React, Node.js, MSSQL, and AI.
Building scalable software and modern digital experiences.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={entered ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton>
            <button
              data-cursor="hover"
              data-cursor-label="explore"
              onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative overflow-hidden rounded-full bg-white px-7 py-3 text-sm font-medium text-ink-950"
            >
              <span className="relative z-10">View selected work</span>
              <span className="absolute inset-0 -translate-y-full bg-aurora-cyan transition-transform duration-500 group-hover:translate-y-0" />
            </button>
          </MagneticButton>
          <button
            data-cursor="hover"
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="rounded-full border border-white/15 px-7 py-3 text-sm font-medium text-white/80 transition-colors hover:border-white/40 hover:text-white"
          >
            The story
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={entered ? { opacity: 1 } : {}}
        transition={{ delay: 2.2 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2"
        style={{ opacity: fadeOut }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">scroll</span>
          <div className="relative h-10 w-px overflow-hidden bg-white/15">
            <motion.div
              animate={{ y: ['-100%', '100%'] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 w-px bg-aurora-cyan"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 18 });
  const sy = useSpring(y, { stiffness: 300, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    x.set(dx * 0.3);
    y.set(dy * 0.3);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div ref={ref} style={{ x: sx, y: sy }} onMouseMove={onMove} onMouseLeave={reset}>
      {children}
    </motion.div>
  );
}