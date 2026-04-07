import React from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Code2, 
  Layout as LayoutIcon,
  Terminal,
  Database,
  Cpu,
  Globe
} from 'lucide-react';

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link: string;
  github: string;
  image: string;
}

export interface Skill {
  name: string;
  icon: React.ReactNode;
  level: number;
}

export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "E-Commerce MERN App",
    description: "A full-featured online store with Redux state management, JWT auth, and Stripe integration.",
    tags: ["MongoDB", "Express", "React", "Node.js"],
    link: "#",
    github: "#",
    image: "https://picsum.photos/seed/shop/800/600"
  },
  {
    id: "2",
    title: "Task Management System",
    description: "Real-time collaborative task board with drag-and-drop functionality and team workspaces.",
    tags: ["React", "Firebase", "Tailwind", "Motion"],
    link: "#",
    github: "#",
    image: "https://picsum.photos/seed/task/800/600"
  },
  {
    id: "3",
    title: "Next.js Portfolio Starter",
    description: "A high-performance portfolio template built while learning Next.js 15 App Router.",
    tags: ["Next.js", "TypeScript", "Server Actions"],
    link: "#",
    github: "#",
    image: "https://picsum.photos/seed/next/800/600"
  }
];

export const SKILLS: Skill[] = [
  { name: "React / Next.js", icon: <LayoutIcon className="w-5 h-5" />, level: 90 },
  { name: "Node.js / Express", icon: <Terminal className="w-5 h-5" />, level: 85 },
  { name: "MongoDB", icon: <Database className="w-5 h-5" />, level: 80 },
  { name: "Tailwind CSS", icon: <Code2 className="w-5 h-5" />, level: 95 },
  { name: "TypeScript", icon: <Cpu className="w-5 h-5" />, level: 75 },
  { name: "REST APIs", icon: <Globe className="w-5 h-5" />, level: 88 },
];
