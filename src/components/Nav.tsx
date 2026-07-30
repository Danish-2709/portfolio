import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollProgress } from '../hooks/useUi';

const links = [
  { id: 'hero', label: 'Index' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'work', label: 'Work' },
  { id: 'journey', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
];

export default function Nav() {
  const progress = useScrollProgress();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('hero');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setOpen(false);
  };

  return (
    <>
      <motion.header initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="fixed top-0 left-0 right-0 z-[200] flex justify-center px-5 pt-4 sm:pt-6">
        <div className={`flex w-full max-w-6xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-6 ${scrolled ? 'glass-strong shadow-2xl shadow-black/40' : 'bg-transparent'}`}>
          <button onClick={() => go('hero')} data-cursor="hover" className="group flex items-center gap-2.5" aria-label="Home">
            <span className="relative flex h-7 w-7 items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-aurora-cyan/30 blur-md transition-opacity group-hover:opacity-100" />
              <span className="relative h-3 w-3 rounded-full bg-gradient-to-br from-aurora-cyan to-aurora-violet" />
              <span className="absolute inset-0 rounded-full border border-aurora-cyan/40 spin-slow" />
            </span>
            <span className="font-serif text-lg leading-none tracking-tight text-white">
              DANISH<span className="text-aurora-cyan">.AI</span>
            </span>
          </button>

          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <button key={l.id} onClick={() => go(l.id)} data-cursor="hover" className={`relative rounded-full px-3.5 py-1.5 text-xs font-medium tracking-wide transition-colors ${active === l.id ? 'text-white' : 'text-white/50 hover:text-white/80' }`}>
                {active === l.id && (
                  <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-white/8" transition={{ type: 'spring', stiffness: 400, damping: 32 }}/>
                )}
                <span className="relative">{l.label}</span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="#contact" onClick={(e) => {e.preventDefault(); go('contact');}} data-cursor="hover" className="hidden rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/90 transition-colors hover:border-aurora-cyan/50 hover:text-white sm:block">
              Let's talk
            </a>
            <button onClick={() => setOpen((v) => !v)} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 md:hidden" aria-label="Menu">
              <div className="flex flex-col gap-1">
                <span className={`h-px w-4 bg-white transition-transform ${open ? 'translate-y-[3px] rotate-45' : ''}`} />
                <span className={`h-px w-4 bg-white transition-transform ${open ? '-translate-y-[2px] -rotate-45' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      <div className="fixed left-0 top-0 z-[201] h-px w-full bg-transparent">
        <div className="h-full bg-gradient-to-r from-aurora-cyan via-aurora-blue to-aurora-violet" style={{ width: `${progress * 100}%` }}/>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[150] flex flex-col items-center justify-center gap-2 bg-ink-950/90 backdrop-blur-xl md:hidden">
            {links.map((l, i) => (
              <motion.button key={l.id} onClick={() => go(l.id)} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className={`font-serif text-4xl ${active === l.id ? 'text-aurora-cyan' : 'text-white/70'}`}>{l.label}</motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}