export type Project = {
  id: string;
  index: string;
  title: string;
  category: string;
  year: string;
  description: string;
  tags: string[];
  accent: string;
};

export const projects: Project[] = [
  {
    id: "about",
    index: "01",
    title: "Who I Am",
    category: "Full Stack Developer",
    year: "2026",
    description:
      "I'm Danish Ahmad, a Full Stack Developer specializing in React, Node.js, Express, MSSQL, and modern web technologies. I enjoy building scalable enterprise applications with intuitive user experiences, high-performance architectures, and visually engaging interfaces.",
    tags: ["React", "Node.js", "MSSQL", "TypeScript"],
    accent: "#5eead4",
  },
  {
    id: "expertise",
    index: "02",
    title: "Core Expertise",
    category: "Software Engineering",
    year: "2026",
    description:
      "Experienced in designing and developing enterprise-grade ERP, LIMS, warehouse management systems, custom dashboards, and real-time tracking platforms. Passionate about creating secure, scalable, and maintainable software solutions.",
    tags: ["Enterprise Apps", "System Design", "REST APIs", "Architecture"],
    accent: "#7dd3fc",
  },
  {
    id: "experience",
    index: "03",
    title: "Professional Experience",
    category: "Rayan Info Solutions",
    year: "2023 - Present",
    description:
      "Working as a Full Stack Developer and Project Lead, leading the development of complex business applications using React, Node.js, Express, and MSSQL. Responsible for system architecture, backend development, frontend implementation, reporting, and third-party integrations.",
    tags: ["Leadership", "Full Stack", "Project Management", "Enterprise"],
    accent: "#a78bfa",
  },
  {
    id: "vision",
    index: "04",
    title: "Vision",
    category: "Continuous Learning",
    year: "Future",
    description:
      "Continuously exploring AI, modern frontend technologies, Three.js, React Native, and high-performance application architecture while striving to build innovative software that solves real-world business problems.",
    tags: ["AI", "Three.js", "React Native", "Innovation"],
    accent: "#fb7185",
  },
];

export type Skill = {
  name: string;
  level: number;
  orbit: number;
  speed: number;
  phase: number;
  color: string;
  blurb: string;
};

export const skills: Skill[] = [
  {
    name: "React",
    level: 95,
    orbit: 1,
    speed: 1,
    phase: 0,
    color: "#5eead4",
    blurb: "Building responsive, scalable, and modern web applications using React ecosystem.",
  },
  {
    name: "Node.js",
    level: 93,
    orbit: 1,
    speed: 0.9,
    phase: 1.2,
    color: "#7dd3fc",
    blurb: "Developing REST APIs and enterprise backend services with Express.js.",
  },
  {
    name: "MSSQL",
    level: 95,
    orbit: 2,
    speed: 0.8,
    phase: 2.2,
    color: "#a78bfa",
    blurb: "Database design, optimization, stored procedures, and enterprise data management.",
  },
  {
    name: "TypeScript",
    level: 90,
    orbit: 2,
    speed: 0.7,
    phase: 3.2,
    color: "#fb7185",
    blurb: "Writing scalable, maintainable, and type-safe applications.",
  },
  {
    name: "React Native",
    level: 88,
    orbit: 3,
    speed: 0.6,
    phase: 4.2,
    color: "#fcd34d",
    blurb: "Building cross-platform mobile applications with native capabilities.",
  },
  {
    name: "Three.js",
    level: 82,
    orbit: 3,
    speed: 0.5,
    phase: 5.2,
    color: "#5eead4",
    blurb: "Creating immersive 3D experiences and interactive web visuals.",
  },
  {
    name: "Tailwind CSS",
    level: 92,
    orbit: 4,
    speed: 0.45,
    phase: 1.6,
    color: "#7dd3fc",
    blurb: "Designing modern, responsive interfaces with utility-first CSS.",
  },
  {
    name: "Python & AI",
    level: 80,
    orbit: 4,
    speed: 0.4,
    phase: 3.4,
    color: "#a78bfa",
    blurb: "Exploring AI integrations, automation, and machine learning solutions.",
  },
];

export type Milestone = {
  year: string;
  title: string;
  org: string;
  description: string;
};

export const milestones: Milestone[] = [
  {
    year: "2021",
    title: "Started Full Stack Development",
    org: "Self Learning",
    description:
      "Built strong foundations in JavaScript, React, Node.js, and database technologies.",
  },
  {
    year: "2023",
    title: "Joined Rayan Info Solutions",
    org: "Professional Career",
    description:
      "Started developing enterprise applications and managing end-to-end software development projects.",
  },
  {
    year: "2024",
    title: "Project Lead",
    org: "Rayan Info Solutions",
    description:
      "Led multiple ERP, LIMS, Warehouse Management, and business automation projects while mentoring development workflows.",
  },
  {
    year: "2025",
    title: "Advanced Full Stack Development",
    org: "Professional Growth",
    description:
      "Expanded expertise into React Native, Three.js, animations, AI integrations, and scalable enterprise architecture.",
  },
  {
    year: "2026",
    title: "Continuous Innovation",
    org: "Developer Journey",
    description:
      "Focused on building high-performance applications, immersive user experiences, and AI-powered software solutions.",
  },
];