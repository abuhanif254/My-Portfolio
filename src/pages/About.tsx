import React from 'react';
import { motion } from 'motion/react';
import { 
  History, 
  Target, 
  Heart, 
  Coffee, 
  Code2, 
  Globe, 
  Cpu, 
  Zap,
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Award,
  Users,
  Rocket
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import OptimizedImage from '../components/OptimizedImage';

export default function About() {
  const stats = [
    { label: 'Years Experience', value: '3+', icon: <History className="w-5 h-5" /> },
    { label: 'Projects Completed', value: '50+', icon: <Target className="w-5 h-5" /> },
    { label: 'Happy Clients', value: '30+', icon: <Heart className="w-5 h-5" /> },
    { label: 'Cups of Coffee', value: '1.2k', icon: <Coffee className="w-5 h-5" /> },
  ];

  const values = [
    {
      title: "Quality First",
      description: "I believe in writing clean, maintainable, and efficient code. Every pixel and every line of code matters.",
      icon: <Award className="w-6 h-6" />
    },
    {
      title: "User-Centric",
      description: "Technology should serve people. I focus on creating intuitive experiences that solve real-world problems.",
      icon: <Users className="w-6 h-6" />
    },
    {
      title: "Continuous Learning",
      description: "The tech landscape evolves rapidly. I stay ahead by constantly learning and experimenting with new tools.",
      icon: <Rocket className="w-6 h-6" />
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Me | MD Abu Hanif Mia - MERN Stack Developer</title>
        <meta name="description" content="Learn more about MD Abu Hanif Mia, his journey as a MERN Stack Developer, his philosophy, and his passion for building digital products." />
        <meta name="keywords" content="MD Abu Hanif Mia, Abu Hanif, Hanif mia, baitullah, Mohammad Bitullah, About Me, MERN Stack Developer, Web Developer Journey, Software Engineer Biography" />
        <link rel="canonical" href={window.location.href} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 lg:pt-56 lg:pb-32 overflow-hidden bg-zinc-50 dark:bg-zinc-950 transition-colors">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-500/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/5 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7"
            >
              <span className="text-brand-600 dark:text-brand-400 font-bold text-xs uppercase tracking-[0.3em] mb-6 block">The Person Behind The Code</span>
              <h1 className="text-6xl lg:text-8xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-8 leading-[0.95]">
                A journey of <span className="text-gradient">curiosity</span> and craft.
              </h1>
              <p className="text-lg lg:text-xl text-zinc-500 dark:text-zinc-400 mb-12 max-w-2xl leading-relaxed">
                I'm a software engineer who finds joy in the intersection of logic and creativity. My mission is to build tools that empower users and simplify complexity.
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                {stats.map((stat, i) => (
                  <div key={i} className="space-y-2">
                    <div className="text-3xl font-black text-zinc-900 dark:text-white tracking-tighter">{stat.value}</div>
                    <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                      <span className="text-brand-600">{stat.icon}</span>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 relative"
            >
              <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl shadow-zinc-900/20 dark:shadow-none border border-white/20 dark:border-zinc-800">
                <OptimizedImage 
                  src="https://ik.imagekit.io/ubwpdqyav/458475699_2542066009314929_8423072987881722825_n__1_-removebg-preview.png" 
                  alt="Hanif Mia Working" 
                  className="w-full h-full"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/40 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* My Story Section */}
      <section className="py-32 bg-white dark:bg-zinc-900/20 transition-colors">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-20">
            <div className="lg:col-span-5">
              <div className="sticky top-32">
                <h2 className="text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-white mb-8 tracking-tight leading-tight">
                  My <span className="text-zinc-400">Story.</span>
                </h2>
                <div className="w-20 h-1.5 bg-brand-600 rounded-full mb-12" />
                <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed mb-8">
                  From my first line of code to building complex full-stack applications, my journey has been driven by a relentless desire to understand how things work.
                </p>
                <div className="flex items-center gap-4">
                  <a href="https://github.com/abuhanif254" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-brand-600 hover:text-white transition-all">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="https://www.linkedin.com/in/md-abu-hanif-mia" className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-brand-600 hover:text-white transition-all">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="mailto:mohammadbitullah@gmail.com" className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-brand-600 hover:text-white transition-all">
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-7 space-y-12 text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg">
              <p>
                My fascination with technology began in my early years, sparked by the endless possibilities of the internet. What started as simple curiosity soon evolved into a deep-seated passion for software development. I spent countless nights teaching myself the fundamentals of web technologies, driven by the thrill of seeing my ideas come to life on a screen.
              </p>
              <p>
                As I delved deeper into the world of programming, I discovered the power of the MERN stack. The seamless integration of MongoDB, Express.js, React, and Node.js allowed me to build robust, scalable, and high-performance applications that could solve real-world problems. I became obsessed with optimizing every aspect of the development process, from database architecture to front-end performance.
              </p>
              <p>
                Over the past 3+ years, I've had the privilege of working on a diverse range of projects, from small business websites to complex enterprise-level applications. Each project has been an opportunity to learn, grow, and refine my craft. I've collaborated with talented individuals and teams, gaining valuable insights into the importance of communication, teamwork, and user-centric design.
              </p>
              <p>
                Today, I am an independent full-stack developer based in Dhaka, Bangladesh. I specialize in building high-performance web applications with refined user experiences. My approach is rooted in a deep understanding of the modern JavaScript ecosystem and a commitment to delivering quality results that exceed expectations.
              </p>
              <div className="pt-8 grid sm:grid-cols-2 gap-8">
                <div className="p-8 rounded-[2rem] bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800">
                  <div className="text-brand-600 mb-4"><Code2 className="w-8 h-8" /></div>
                  <h4 className="text-zinc-900 dark:text-white font-bold mb-2">Technical Depth</h4>
                  <p className="text-sm">Deep expertise in React, Node.js, and modern cloud architectures.</p>
                </div>
                <div className="p-8 rounded-[2rem] bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800">
                  <div className="text-brand-600 mb-4"><Globe className="w-8 h-8" /></div>
                  <h4 className="text-zinc-900 dark:text-white font-bold mb-2">Global Reach</h4>
                  <p className="text-sm">Experience working with clients and teams from around the world.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 bg-zinc-50 dark:bg-zinc-950 transition-colors">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-brand-600 dark:text-brand-400 font-bold text-xs uppercase tracking-[0.3em] mb-4 block">My Philosophy</span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-8">
              Principles that guide <span className="text-zinc-400">my work.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
              I don't just write code; I build solutions. My work is guided by these core values that ensure every project is a success.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-12 rounded-[3rem] bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-500 group"
              >
                <div className="w-16 h-16 bg-zinc-50 dark:bg-zinc-800 rounded-2xl flex items-center justify-center text-brand-600 mb-8 group-hover:bg-brand-600 group-hover:text-white transition-all duration-500">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">{value.title}</h3>
                <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Beyond the Code */}
      <section className="py-32 bg-white dark:bg-zinc-900/20 transition-colors">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl">
                <OptimizedImage 
                  src="https://ik.imagekit.io/ubwpdqyav/581748999_2947082842146575_2858509103678255413_n.jpg?updatedAt=1776775289778" 
                  alt="Hobbies" 
                  className="w-full h-full"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 glass p-8 rounded-3xl shadow-2xl border border-white/20 dark:border-zinc-800/50 hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-600 rounded-2xl flex items-center justify-center text-white">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xl font-black text-zinc-900 dark:text-white">Always Active</div>
                    <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Life Outside Work</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="space-y-8">
              <span className="text-brand-600 dark:text-brand-400 font-bold text-xs uppercase tracking-[0.3em] block">Beyond The Code</span>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-tight">
                Life is more than just <br /> <span className="text-zinc-400">syntax and logic.</span>
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed text-lg">
                When I'm not in front of a screen, you can find me exploring the vibrant streets of Dhaka, capturing moments through my camera lens, or getting lost in a good book. I believe that a well-rounded life fuels creativity and provides fresh perspectives on technical challenges.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: 'Photography', icon: <Globe className="w-4 h-4" /> },
                  { label: 'Traveling', icon: <Target className="w-4 h-4" /> },
                  { label: 'Reading', icon: <History className="w-4 h-4" /> },
                  { label: 'Tech Gadgets', icon: <Cpu className="w-4 h-4" /> },
                ].map((hobby, i) => (
                  <div key={i} className="flex items-center gap-3 text-zinc-900 dark:text-white font-bold">
                    <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-brand-600">
                      {hobby.icon}
                    </div>
                    {hobby.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-zinc-50 dark:bg-zinc-950 transition-colors">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-zinc-900 dark:bg-brand-600 rounded-[4rem] p-12 lg:p-24 text-center relative overflow-hidden shadow-2xl">
            {/* Decorative background */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/20 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl lg:text-6xl font-extrabold text-white mb-8 tracking-tight leading-tight">
                Let's build something <br /> extraordinary together.
              </h2>
              <p className="text-zinc-400 dark:text-brand-100 mb-12 text-lg lg:text-xl leading-relaxed">
                Whether you have a specific project in mind or just want to explore the possibilities, I'm always open to new conversations.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link to="/contact" className="bg-white text-zinc-900 px-10 py-5 rounded-2xl font-bold hover:bg-zinc-100 transition-all shadow-xl flex items-center gap-2">
                  Start a Conversation <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/projects" className="bg-transparent border border-white/20 text-white px-10 py-5 rounded-2xl font-bold hover:bg-white/10 transition-all flex items-center gap-2">
                  View My Work
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
