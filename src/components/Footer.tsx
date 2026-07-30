import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const KONAMI = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
];

export default function Footer() {
  const [sound, setSound] = useState(false);
  const [egg, setEgg] = useState(false);
  const seq = useRef<string[]>([]);
  const ctxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      seq.current = [...seq.current, e.key].slice(-KONAMI.length);
      if (seq.current.join(',') === KONAMI.join(',')) {
        setEgg(true);
        setTimeout(() => setEgg(false), 6000);
        seq.current = [];
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const blip = (freq: number) => {
    if (!sound) return;
    if (!ctxRef.current) ctxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    const ctx = ctxRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = freq;
    osc.type = 'sine';
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.18);
  };

  return (
    <>
      <footer className="relative px-5 pb-10 pt-20">
        <div className="mx-auto max-w-6xl">
          {/* Giant wordmark */}
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: 80 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-[clamp(4rem,22vw,18rem)] leading-[0.8] tracking-tightest text-white/[0.06]"
            >
              DANISH.AI<span className="text-aurora-cyan/20">.</span>
            </motion.h2>
          </div>

          <div className="mt-10 flex flex-col items-start justify-between gap-6 border-t border-white/8 pt-8 sm:flex-row sm:items-center">
            <p className="text-sm text-white/40">
              Crafted with intent. Built in the browser, for the browser.
            </p>
            <div className="flex items-center gap-4">
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/30">
                v3.0 · 2025
              </span>
              <button
                onClick={() => setSound((s) => !s)}
                onMouseEnter={() => blip(660)}
                data-cursor="hover"
                className="flex items-center gap-2 rounded-full border border-white/12 px-3.5 py-1.5 text-xs text-white/60 transition-colors hover:border-aurora-cyan/40 hover:text-white"
                aria-label="Toggle sound"
              >
                {sound ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M4 9v6h4l5 5V4L8 9H4z" fill="currentColor" />
                    <path d="M16 8a4 4 0 010 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M4 9v6h4l5 5V4L8 9H4z" fill="currentColor" />
                    <path d="M22 9l-6 6M16 9l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                )}
                {sound ? 'Sound on' : 'Sound off'}
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Konami egg */}
      <AnimatePresence>
        {egg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[5000] flex items-center justify-center bg-ink-950/80 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.7, rotate: -8 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 14 }}
              className="text-center"
            >
              <div className="text-6xl">✦</div>
              <h3 className="mt-4 font-serif text-4xl text-aurora">
                You found the secret
              </h3>
              <p className="mt-3 text-white/60">
                Curiosity is always rewarded here.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}