import { useEffect, useRef } from 'react';

/**
 * A living aurora background rendered to a canvas with drifting light blobs,
 * grain, and a subtle parallax driven by the cursor. GPU-light: a handful of
 * radial gradients composited per frame.
 */
export default function AuroraBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = (canvas.width = window.innerWidth * Math.min(devicePixelRatio, 2));
    let h = (canvas.height = window.innerHeight * Math.min(devicePixelRatio, 2));

    const blobs = [
      { x: 0.2, y: 0.3, r: 0.5, c: 'rgba(94,234,212,0.20)', vx: 0.0002, vy: 0.0001 },
      { x: 0.8, y: 0.7, r: 0.55, c: 'rgba(125,211,252,0.16)', vx: -0.00015, vy: 0.0002 },
      { x: 0.5, y: 0.5, r: 0.45, c: 'rgba(167,139,250,0.18)', vx: 0.0001, vy: -0.00018 },
      { x: 0.7, y: 0.2, r: 0.4, c: 'rgba(251,113,133,0.10)', vx: -0.0002, vy: 0.00012 },
    ];
    const mouse = { x: 0.5, y: 0.5 };
    let scrollY = 0;

    const onResize = () => {
      w = canvas.width = window.innerWidth * Math.min(devicePixelRatio, 2);
      h = canvas.height = window.innerHeight * Math.min(devicePixelRatio, 2);
    };
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX / window.innerWidth;
      mouse.y = e.clientY / window.innerHeight;
    };
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    let raf = 0;
    let t = 0;
    const render = () => {
      t += reduce ? 0 : 0.005;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#05060a';
      ctx.fillRect(0, 0, w, h);

      const scrollOffset = (scrollY / window.innerHeight) * 0.15;

      for (const b of blobs) {
        b.x += b.vx;
        b.y += b.vy;
        if (b.x < 0.05 || b.x > 0.95) b.vx *= -1;
        if (b.y < 0.05 || b.y > 0.95) b.vy *= -1;

        const px = (b.x + Math.sin(t + b.x * 6) * 0.04 + (mouse.x - 0.5) * 0.04) * w;
        const py = (b.y + Math.cos(t + b.y * 6) * 0.04 + (mouse.y - 0.5) * 0.04 - scrollOffset * h * 0) * h;
        const radius = b.r * Math.min(w, h);
        const grad = ctx.createRadialGradient(px, py, 0, px, py, radius);
        grad.addColorStop(0, b.c);
        grad.addColorStop(1, 'rgba(5,6,10,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }

      raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      aria-hidden
    />
  );
}