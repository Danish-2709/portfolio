import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WORDS = ['Initializing', 'Composing shaders', 'Spawning particles', 'Entering NOVA'];

export default function Loader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [word, setWord] = useState(0);
  const [exit, setExit] = useState(false);
  const raf = useRef<number>(0);

  useEffect(() => {
    let p = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      // ease toward 100 over ~2.6s
      p = Math.min(100, (elapsed / 2600) * 100);
      setProgress(p);
      setWord(Math.min(WORDS.length - 1, Math.floor((p / 100) * WORDS.length)));
      if (p < 100) {
        raf.current = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setExit(true), 350);
        setTimeout(onDone, 1150);
      }
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!exit && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[8000] flex flex-col items-center justify-center bg-ink-950"
        >
          {/* concentric rings */}
          <div className="relative flex h-40 w-40 items-center justify-center">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border border-aurora-cyan/30"
                style={{ width: `${(i + 1) * 33}%`, height: `${(i + 1) * 33}%` }}
                animate={{ rotate: i % 2 ? -360 : 360, opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 4 + i, repeat: Infinity, ease: 'linear' }}
              />
            ))}
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="h-10 w-10 rounded-full bg-gradient-to-br from-aurora-cyan to-aurora-violet blur-md"
            />
          </div>

          {/* wordmark */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-10 font-serif text-5xl tracking-tight text-white"
          >
            nova<span className="text-aurora-cyan">.</span>
          </motion.h1>

          {/* progress */}
          <div className="mt-8 w-56 max-w-[60vw]">
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-white/40">
              <AnimatePresence mode="wait">
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                >
                  {WORDS[word]}
                </motion.span>
              </AnimatePresence>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="mt-2 h-px w-full overflow-hidden bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-aurora-cyan to-aurora-violet"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}