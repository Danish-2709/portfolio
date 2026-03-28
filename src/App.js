import { FaEnvelope, FaPhoneAlt, FaLinkedin, FaGithub } from "react-icons/fa";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Particles from "@tsparticles/react";
import { loadFull } from "tsparticles";

const projects = [
  { name: "⚡ Custom Feedback Form Builder", desc: "Next-gen dynamic form builder with real-time analytics, drag-and-drop fields, AI suggestions and fully responsive design.", tech: ["React", "Node.js", "Express", "MSSQL", "MUI"] },
  { name: "🎓 Online Examination Platform", desc: "Secure test platform with timed exams, AI proctoring, question banks, and real-time performance insights.", tech: ["React", "Node.js", "Express", "MSSQL", "Socket.io"] },
  { name: "📍 Field Tracking System (Sales & Support)", desc: "Real-time tracking system for field executives with QR-based visit verification, route optimization and live admin monitoring.", tech: ["React Native", "React", "Node.js", "Express", "MSSQL"] },
];

const experience = [
  { role: "🚀 Full Stack Developer & Project Lead", company: "Rayan Info Solutions", period: "Jun 2023 – Present", points: ["Led enterprise-grade system development with React, Node.js, Express & MSSQL.", "Architected ERP, LIMS & Warehouse management systems with cyberpunk dashboards.", "Integrated dynamic PDF reports, WhatsApp API & real-time notifications."] },
];

const skills = ["React 18", "Node.js", "Express", "MSSQL", "Framer Motion", "TailwindCSS", "Three.js", "Figma", "REST/GraphQL", "TypeScript", "JavaScript ES6", "Python"];

const cyberFont = "font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-emerald-300 to-purple-400";

const ParticleCursorTrail = () => {
  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  const options = {
    fullScreen: { enable: true, zIndex: -1 },
    fpsLimit: 120,
    particles: { number: { value: 0 } },
    interactivity: {
      events: { onHover: { enable: true, mode: "trail" } },
      modes: {
        trail: {
          delay: 0.005,
          quantity: 12,
          particles: {
            color: { value: ["#00ffcc", "#ff00ff", "#ffcc44", "#2effb0", "#00aaff"] },
            size: { value: { min: 2, max: 8 }, animation: { enable: true, speed: 20, startValue: "min", destroy: "max" } },
            move: { speed: 2.8, outModes: { default: "destroy" }, direction: "none", random: true },
            opacity: { value: { min: 0.5, max: 1 }, animation: { enable: true, speed: 8, startValue: "max", destroy: "min" } },
            shape: { type: "circle" },
            glow: { enable: true, color: "#0ff", opacity: 0.8 }
          },
        },
      },
    },
    background: { color: "transparent" }
  };

  return <Particles id="tsparticles-trail" init={particlesInit} options={options} />;
};

const MatrixRain = ({ zIndex = -2 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    const fontSize = 18;
    const columns = Math.floor(width / fontSize);
    const drops = new Array(columns).fill(1);
    const chars = "01¥λ<>/{}[]()=+-_*#@%$&ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");
    let animationId;

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.07)";
      ctx.fillRect(0, 0, width, height);
      ctx.font = `500 ${fontSize}px 'Courier New', monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        const hue = (Date.now() * 0.002 + i * 8) % 360;
        ctx.fillStyle = `hsl(${hue}, 100%, 65%)`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = `hsl(${hue}, 100%, 60%)`;
        ctx.fillText(char, x, y);
        
        if (y > height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      animationId = requestAnimationFrame(draw);
    };

    const resizeHandler = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeHandler);
    draw();
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex, pointerEvents: "none", opacity: 0.5, mixBlendMode: "screen" }} />;
};

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const trailRef = useRef(null);
  
  useEffect(() => {
    const onMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`;
      }
      if (trailRef.current) {
        trailRef.current.style.transform = `translate(${e.clientX - 14}px, ${e.clientY - 14}px)`;
      }
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);
  
  return (
    <>
      <div ref={cursorRef} className="fixed w-3 h-3 bg-cyan-400 rounded-full pointer-events-none z-[9999] mix-blend-difference transition-transform duration-75 shadow-[0_0_15px_#0ff]" />
      <div ref={trailRef} className="fixed w-7 h-7 border-2 border-cyan-400/70 rounded-full pointer-events-none z-[9998] transition-all duration-100" />
    </>
  );
};

const FloatingParticles = () => {
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();
      setParticles(prev => [...prev, { 
        id, 
        x: Math.random() * window.innerWidth, 
        delay: Math.random() * 1.5, 
        size: 8 + Math.random() * 20,
        color: `hsl(${Math.random() * 360}, 100%, 60%)`
      }]);
      setTimeout(() => setParticles(prev => prev.filter(p => p.id !== id)), 4500);
    }, 500);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <>
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute pointer-events-none rounded-full animate-float"
          style={{
            left: p.x,
            top: '100%',
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, ${p.color}, transparent)`,
            animation: `floatUp 4s linear forwards`,
            animationDelay: `${p.delay}s`
          }}
        />
      ))}
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0px) rotate(0deg); opacity: 0.8; }
          100% { transform: translateY(-120px) rotate(20deg); opacity: 0; }
        }
      `}</style>
    </>
  );
};

const MotionSection = ({ children, id, className = "" }) => (
  <motion.section
    id={id}
    className={`py-24 px-6 max-w-6xl mx-auto relative ${className}`}
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
  >
    {children}
  </motion.section>
);

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
  <motion.nav
    className="fixed w-full z-50 backdrop-blur-2xl bg-black/60 border-b border-cyan-500/40 px-6 md:px-6 py-4 flex justify-between items-center"  initial={{ y: -120 }} animate={{ y: 0 }} transition={{ duration: 0.8, type: "spring" }}>
    <motion.h1 className={`${cyberFont} text-2xl md:text-2xl tracking-widest drop-shadow-lg cursor-pointer`}
      whileHover={{ scale: 1.05, textShadow: "0 0 20px cyan" }}>
      DANISH.AI
    </motion.h1>
    <ul className="hidden md:flex gap-6 text-sm uppercase tracking-wider font-mono">
      {["About", "Experience", "Projects", "Contact"].map((item) => (
        <li key={item}>
          <a href={`#${item.toLowerCase()}`} className="relative group text-gray-300 hover:text-cyan-300 transition-all duration-300 text-[15px] font-semibold">
            {item}
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-cyan-400 group-hover:w-full transition-all duration-300" />
          </a>
        </li>
      ))}
    </ul>
    <button className="md:hidden text-cyan-400 text-xl" onClick={() => setOpen(!open)}>☰</button>
    {open && (
        <div className="absolute top-16 left-0 w-full bg-black/90 backdrop-blur-md flex flex-col items-center gap-6 py-6 md:hidden">
          {["About", "Experience", "Projects", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)}>
              {item}
            </a>
          ))}
        </div>
      )}
  </motion.nav>
)};

const Hero = () => {
  const [textIndex, setTextIndex] = useState(0);
  const roles = ["Full Stack Architect", "Cyberpunk Engineer", "AI Enthusiast", "System Designer"];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % roles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [roles.length]);
  
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden bg-black">
      <MatrixRain zIndex={-3} />
      <ParticleCursorTrail />
      <FloatingParticles />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" style={{ zIndex: -1 }} />
      
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.2, type: "spring" }}
        className="z-10">        
        <motion.h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold mt-4 text-white tracking-wider" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          Danish Ahmad
        </motion.h1>
        
        <motion.div className="h-1 w-32 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto mt-4 rounded-full" animate={{ width: ["32px", "128px", "32px"] }} transition={{ duration: 3, repeat: Infinity }} />
        <motion.p className="mt-8 text-cyan-100 text-lg md:text-xl leading-relaxed backdrop-blur-sm bg-black/20 p-4 rounded-2xl inline-block">
          I'm a{" "}
          <motion.span key={textIndex} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }} className="text-cyan-300 font-bold inline-block">
            {roles[textIndex]}
          </motion.span>
        </motion.p>
        
        <motion.p className="mt-4 px-4 max-w-xl text-sm sm:text-base md:text-lg text-gray-300">
          building <span className="text-purple-300 font-semibold">high-tech web systems</span> and{" "}
          <span className="text-green-300 font-semibold">immersive digital experiences</span>
        </motion.p>
        
        <motion.a href="#projects" className="mt-6 px-6 py-3 inline-block border-2 border-cyan-400 text-cyan-400 rounded-full font-mono font-bold text-sm md:text-lg backdrop-blur-md bg-black/30 hover:bg-cyan-400 hover:text-black transition-all duration-300" whileHover={{ scale: 1.08, boxShadow: "0 0 25px cyan" }} whileTap={{ scale: 0.98 }}>
          ⚡ EXPLORE THE GRID ⚡
        </motion.a>
      </motion.div>
    </section>
  );
};

const About = () => (
  <MotionSection id="about">
    <div className="backdrop-blur-md bg-black/40 rounded-2xl p-8 md:p-12 border border-cyan-500/40 shadow-[0_0_30px_rgba(0,255,200,0.1)]">
      <h3 className={`${cyberFont} text-4xl md:text-5xl mb-6 flex items-center gap-3`}>
        🛸 <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Digital Alchemist</span>
      </h3>
      <p className="text-gray-200 text-lg leading-relaxed">
        Full Stack Developer & creative coder, blending{" "}
        <span className="text-cyan-400 font-bold">enterprise-grade backends</span> with{" "}
        <span className="text-purple-400 font-bold">hypnotic frontend animations</span>. 
        I architect cyber-physical systems that redefine digital experiences. 
        Currently leading development at Rayan Info Solutions, building scalable solutions 
        that push the boundaries of what's possible.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        {skills.map((skill) => (
          <motion.span
            key={skill}
            className="px-4 py-2 bg-black/60 border border-cyan-500/50 text-cyan-300 rounded-full font-mono text-sm font-bold cursor-default"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(0,255,200,0.1)", boxShadow: "0 0 8px cyan" }}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </div>
  </MotionSection>
);

const ExperienceSection = () => (
  <MotionSection id="experience">
    <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-cyan-400 mb-12 text-center">
      ⚙️ CHRONOLOGY OF CODE
    </h3>
    {experience.map((job, i) => (
      <motion.div
        key={i}
        className="relative mb-12 pl-8 border-l-4 border-cyan-500 group"
        initial={{ x: -30, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ delay: i * 0.2, duration: 0.6 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="absolute -left-3 top-0 w-6 h-6 bg-cyan-500 rounded-full shadow-[0_0_12px_cyan] group-hover:scale-125 transition-transform"
          animate={{ boxShadow: ["0 0 12px cyan", "0 0 20px magenta", "0 0 12px cyan"] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <h4 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition">{job.role}</h4>
        <p className="text-sm font-mono text-cyan-400 mb-3">{job.company} — {job.period}</p>
        <ul className="space-y-2 text-gray-300">
          {job.points.map((p, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-cyan-400 text-xl">✦</span> {p}
            </li>
          ))}
        </ul>
      </motion.div>
    ))}
  </MotionSection>
);

const ProjectCard = ({ project }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-40, 40], [8, -8]);
  const rotateY = useTransform(x, [-40, 40], [-8, 8]); 
  
  return (
    <motion.div className="relative group" style={{ perspective: 1000 }} whileHover={{ scale: 1.02 }}>
      <motion.div className="p-7 rounded-2xl bg-black/80 border border-cyan-500/50 backdrop-blur-sm shadow-2xl h-full"
        style={{ rotateX, rotateY }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          x.set(e.clientX - rect.left - rect.width / 2);
          y.set(e.clientY - rect.top - rect.height / 2);
        }}
        onMouseLeave={() => {
          x.set(0);
          y.set(0);
        }}
      >
        <h4 className="text-2xl font-bold text-cyan-300 mb-3 flex items-center gap-2">
          {project.name}
        </h4>
        <p className="text-gray-300 mb-4 leading-relaxed">{project.desc}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs rounded-full bg-cyan-950/70 text-cyan-300 font-mono border border-cyan-400/40 hover:bg-cyan-800/60 transition"
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectsSection = () => (
  <MotionSection id="projects">
    <h3 className={`${cyberFont} text-5xl text-center mb-14`}>🌀 DIGITAL PROJECTS</h3>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((p, i) => (
        <ProjectCard key={i} project={p} />
      ))}
    </div>
  </MotionSection>
);

const ContactSection = () => {
  const contacts = [
    { name: "Email", icon: <FaEnvelope />, link: "mailto:ahmadshareef200@gmail.com", color: "from-red-500 to-pink-500" },
    { name: "Phone", icon: <FaPhoneAlt />, link: "tel:+919140483492", color: "from-green-500 to-emerald-500" },
    { name: "LinkedIn", icon: <FaLinkedin />, link: "https://www.linkedin.com/in/danish-ahmad-bb4973245", color: "from-blue-500 to-cyan-400" },
    { name: "GitHub", icon: <FaGithub />, link: "https://github.com/Danish-2709", color: "from-gray-600 to-purple-500" }
  ];
  
  return (
    <MotionSection id="contact" className="text-center">
      <motion.div
        className="backdrop-blur-md bg-black/40 rounded-3xl p-12 border border-cyan-400/40"
        initial={{ scale: 0.95 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent mb-4">
          ⚡ CONNECT WITH THE MATRIX ⚡
        </h3>
        <p className="text-gray-300 mb-12 max-w-md mx-auto">
          Ready to build something legendary? Let's collide realities.
        </p>
        <div className="flex justify-center flex-wrap gap-8 md:gap-12">
          {contacts.map((c, idx) => (
            <motion.a
              key={idx}
              href={c.link}
              target={c.link.startsWith("http") ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className="relative flex flex-col items-center gap-2 group"
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className={`text-5xl md:text-6xl p-4 rounded-full bg-gradient-to-br ${c.color} bg-opacity-20 shadow-lg transition-all group-hover:shadow-[0_0_20px_#0ff]`}>
                {c.icon}
              </div>
              <span className="text-sm font-mono text-cyan-300 opacity-80 group-hover:opacity-100">
                {c.name}
              </span>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </MotionSection>
  );
};

const Footer = () => (
  <footer className="py-8 text-center text-sm text-gray-500 border-t border-cyan-500/30 font-mono">
    <p>© {new Date().getFullYear()} Danish Ahmad • <span className="text-cyan-400">CyberForge</span> • All systems nominal</p>
    <p className="text-xs mt-2 text-gray-600">Built with React, Framer Motion & Cyberpunk Aesthetics</p>
  </footer>
);

export default function App() {
  const [showCursor] = useState(true);
  
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);
  
  return (
    <div className="bg-black text-gray-200 overflow-x-hidden relative">
      {showCursor && <CustomCursor />}
      <Navbar />
      <Hero />
      <About />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
      
      <style>{`
        * {
          cursor: ${showCursor ? 'none' : 'auto'};
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .animate-pulse-glow {
          animation: pulseGlow 2s ease-in-out infinite;
        }
        ::-webkit-scrollbar {
          width: 6px;
          background: #0a0a0a;
        }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #0ff, #f0f);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}