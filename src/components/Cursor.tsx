import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

type Variant = 'default' | 'hover' | 'text' | 'drag';

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState<Variant>('default');
  const [label, setLabel] = useState('');
  const [shocks, setShocks] = useState<{ id: number; x: number; y: number }[]>([]);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 700, damping: 38, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 700, damping: 38, mass: 0.35 });
  const ringX = useSpring(x, { stiffness: 160, damping: 20, mass: 0.7 });
  const ringY = useSpring(y, { stiffness: 160, damping: 20, mass: 0.7 });

  const velRef = useRef({ x: 0, y: 0, vx: 0, vy: 0, last: 0 });
  const trailRef = useRef<HTMLCanvasElement>(null);

  // expose velocity for the 3D scene via a global
  useEffect(() => {
    (window as any).__mouseVel = velRef.current;
  }, []);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    setEnabled(fine);
    if (!fine) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const now = performance.now();
      const dt = Math.max(1, now - velRef.current.last);
      velRef.current.vx = (e.clientX - velRef.current.x) / dt;
      velRef.current.vy = (e.clientY - velRef.current.y) / dt;
      velRef.current.x = e.clientX;
      velRef.current.y = e.clientY;
      velRef.current.last = now;
    };
    const over = (e: MouseEvent) => {
      const t = (e.target as HTMLElement)?.closest('[data-cursor]') as HTMLElement | null;
      if (t) {
        setVariant((t.dataset.cursor as Variant) || 'hover');
        setLabel(t.dataset.cursorLabel || '');
      } else {
        setVariant('default');
        setLabel('');
      }
    };
    const down = (e: MouseEvent) => {
      const id = performance.now();
      setShocks((s) => [...s, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setShocks((s) => s.filter((sh) => sh.id !== id)), 700);
    };

    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mouseover', over, { passive: true });
    window.addEventListener('mousedown', down, { passive: true });
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      window.removeEventListener('mousedown', down);
    };
  }, [x, y]);

  // particle trail
  useEffect(() => {
    if (!enabled) return;
    const canvas = trailRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = Math.min(devicePixelRatio, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.scale(dpr, dpr);

    const particles: { x: number; y: number; life: number }[] = [];
    let raf = 0;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // spawn
      const speed = Math.hypot(velRef.current.vx, velRef.current.vy);
      if (speed > 0.05) {
        particles.push({ x: velRef.current.x, y: velRef.current.y, life: 1 });
      }
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= 0.04;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.life * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(94,234,212,${p.life * 0.35})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(raf);
  }, [enabled]);

  if (!enabled) return null;

  const speed = Math.hypot(velRef.current.vx, velRef.current.vy);
  const stretch = Math.min(speed * 0.4, 0.6);
  const angle = Math.atan2(velRef.current.vy, velRef.current.vx) * (180 / Math.PI);
  const size = variant === 'hover' ? 60 : variant === 'text' ? 4 : 10;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      <canvas ref={trailRef} className="absolute inset-0 h-full w-full" />

      {/* shockwaves */}
      {shocks.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full border border-aurora-cyan/50"
          style={{ left: s.x, top: s.y, translateX: '-50%', translateY: '-50%' }}
          initial={{ width: 0, height: 0, opacity: 0.6 }}
          animate={{ width: 90, height: 90, opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}

      <motion.div
        className="absolute rounded-full"
        style={{
          x: sx,
          y: sy,
          width: size,
          height: size,
          translateX: '-50%',
          translateY: '-50%',
          background: variant === 'hover' ? 'rgba(94,234,212,0.12)' : 'rgba(94,234,212,0.95)',
          border: variant === 'hover' ? '1px solid rgba(94,234,212,0.5)' : 'none',
          boxShadow: '0 0 24px rgba(94,234,212,0.7)',
          scaleX: 1 + stretch,
          scaleY: 1 - stretch * 0.5,
          rotate: angle,
        }}
        animate={{ scale: variant === 'drag' ? 1.4 : 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />

      {variant !== 'hover' && (
        <motion.div
          className="absolute rounded-full border"
          style={{
            x: ringX,
            y: ringY,
            width: 34,
            height: 34,
            translateX: '-50%',
            translateY: '-50%',
            borderColor: 'rgba(167,139,250,0.4)',
          }}
          animate={{ scale: 1 }}
        />
      )}

      {label && (
        <motion.div
          className="absolute font-mono text-[10px] uppercase tracking-widest text-aurora"
          style={{ x: sx, y: sy, translateX: 18, translateY: 14 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {label}
        </motion.div>
      )}
    </div>
  );
}