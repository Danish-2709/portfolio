import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import SmoothScroll from '../src/components/SmoothScroll';
import Cursor from '../src/components/Cursor';
import Nav from '../src/components/Nav';
import Hero from '../src/components/Hero';
import About from '../src/components/About';
import Skills from '../src/components/Skills';
import Projects from '../src/components/Projects';
import Journey from '../src/components/Journey';
import Contact from '../src/components/Contact';
import Footer from '../src/components/Footer';
import Loader from '../src/components/Loader';
import { useScrollProgress } from '../src/hooks/useUi';

const ParticleScene = lazy(() => import('../src/components/ParticleScene'));
const AuroraBackground = lazy(() => import('../src/components/AuroraBackground'));

const ACCENTS = ['#5eead4', '#7dd3fc', '#a78bfa', '#fb7185', '#fcd34d'];

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const scrollProgress = useScrollProgress();
  const mouse = useRef({ x: 0.5, y: 0.5, vx: 0, vy: 0 });
  const [accent, setAccent] = useState(ACCENTS[0]);

  // track mouse + velocity for the 3D scene
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const vel = (window as any).__mouseVel as { vx: number; vy: number } | undefined;
      mouse.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
        vx: vel?.vx ?? 0,
        vy: vel?.vy ?? 0,
      };
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // shift accent color by section for a living background
  useEffect(() => {
    if (!loaded) return;
    const sections = ['hero', 'about', 'skills', 'work', 'journey', 'contact'];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = sections.indexOf(e.target.id);
            if (idx >= 0) setAccent(ACCENTS[idx % ACCENTS.length]);
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [loaded]);

  // console easter egg
  useEffect(() => {
    const style1 = 'color:#5eead4;font-size:28px;font-family:serif';
    const style2 = 'color:#a78bfa;font-size:13px';
    const style3 = 'color:#8b93a7;font-size:12px';
    console.log('%cnova.', style1);
    console.log('%cCuriosity is always rewarded here.', style2);
    console.log('%cTry the Konami code. Or type nova.hint().', style3);
    (window as any).nova = {
      hint: () => console.log('%c↑ ↑ ↓ ↓ ← → ← → B A', 'color:#5eead4;font-size:16px'),
    };
  }, []);

  return (
    <>
      {!loaded && <Loader onDone={() => setLoaded(true)} />}

      <SmoothScroll>
        <div className="relative min-h-screen">
          {/* 3D particle background, falls back to canvas aurora if WebGL unavailable */}
          <div className="fixed inset-0 z-0">
            <Suspense fallback={<AuroraBackground />}>
              <ParticleScene scrollProgress={scrollProgress} mouse={mouse.current} accent={accent} />
            </Suspense>
          </div>
          <div className="noise-overlay grain" aria-hidden />
          <Cursor />
          <Nav />
          <main className="relative z-10">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Journey />
            <Contact />
          </main>
          <Footer />
        </div>
      </SmoothScroll>
    </>
  );
}