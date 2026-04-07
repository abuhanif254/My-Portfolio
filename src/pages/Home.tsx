import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  Github, 
  Linkedin, 
  Code2, 
  Loader2, 
  Server, 
  Smartphone, 
  Globe, 
  Briefcase, 
  GraduationCap, 
  Star, 
  Plus, 
  Minus,
  Quote,
  ArrowRight,
  FileText
} from 'lucide-react';
import GithubProjects from '../components/GithubProjects';
import { Link } from 'react-router-dom';
import Magnetic from '../components/Magnetic';
import { collection, query, orderBy, onSnapshot, limit } from 'firebase/firestore';
import { db } from '../firebase';
import { Helmet } from 'react-helmet-async';
import OptimizedImage from '../components/OptimizedImage';
import Newsletter from '../components/Newsletter';
import Skeleton from '../components/Skeleton';
import { cn } from '../lib/utils';

interface Skill {
  id: string;
  name: string;
  level: number;
  icon?: React.ReactNode;
}

interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  year: string;
  description: string;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const getIcon = (name: string) => {
  switch (name) {
    case 'Server': return <Server className="w-6 h-6" />;
    case 'Globe': return <Globe className="w-6 h-6" />;
    case 'Smartphone': return <Smartphone className="w-6 h-6" />;
    case 'Code2': return <Code2 className="w-6 h-6" />;
    default: return <Globe className="w-6 h-6" />;
  }
};

export default function Home() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'skills'), orderBy('name', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setSkills(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Skill)));
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const q = query(collection(db, 'services'), orderBy('order', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Service));
      if (data.length > 0) setServices(data);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const q = query(collection(db, 'experience'), orderBy('order', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Experience));
      if (data.length > 0) setExperience(data);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const q = query(collection(db, 'education'), orderBy('order', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Education));
      if (data.length > 0) setEducation(data);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const q = query(collection(db, 'testimonials'), orderBy('order', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Testimonial));
      if (data.length > 0) setTestimonials(data);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const q = query(collection(db, 'faqs'), orderBy('order', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as FAQ));
      if (data.length > 0) setFaqs(data);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'), limit(3));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <Helmet>
        <title>MD Abu Hanif Mia | MERN Stack Developer</title>
        <meta name="description" content="Welcome to the portfolio of MD Abu Hanif Mia, a full-stack MERN developer specializing in high-performance web applications." />
        
        {/* Open Graph / Facebook */}
        <meta property="og:title" content="MD Abu Hanif Mia | MERN Stack Developer" />
        <meta property="og:description" content="Welcome to the portfolio of MD Abu Hanif Mia, a full-stack MERN developer specializing in high-performance web applications." />
        <meta property="og:image" content="/api/og" />

        <meta property="twitter:title" content="MD Abu Hanif Mia | MERN Stack Developer" />
        <meta property="twitter:description" content="Welcome to the portfolio of MD Abu Hanif Mia, a full-stack MERN developer specializing in high-performance web applications." />
        <meta property="twitter:image" content="/api/og" />
        <link rel="canonical" href={window.location.origin} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "MD Abu Hanif Mia",
            "url": window.location.origin,
            "jobTitle": "MERN Stack Developer",
            "alumniOf": "Dhaka University",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Dhaka",
              "addressCountry": "Bangladesh"
            },
            "sameAs": [
              "https://github.com/abuhanif254",
              "https://www.linkedin.com/in/md-abu-hanif-mia"
            ]
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 lg:pt-56 lg:pb-40 overflow-hidden bg-zinc-50 dark:bg-zinc-950 transition-colors">
        {/* Background Decorative Elements */}
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
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 text-[11px] font-bold tracking-[0.2em] uppercase bg-white dark:bg-zinc-900 text-brand-600 dark:text-brand-400 rounded-full border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
                </span>
                Available for new opportunities
              </div>
              
              <h1 className="text-6xl lg:text-8xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-8 leading-[0.95]">
                Building <span className="text-gradient">digital</span> experiences that matter.
              </h1>
              
              <p className="text-lg lg:text-xl text-zinc-500 dark:text-zinc-400 mb-12 max-w-2xl leading-relaxed">
                I'm <span className="text-zinc-900 dark:text-white font-bold">MD Abu Hanif Mia</span>, a Full-stack Developer dedicated to crafting high-performance, accessible, and visually stunning web applications.
              </p>
              
              <div className="flex flex-wrap gap-5">
                <Magnetic>
                  <Link to="/projects" className="bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-zinc-800 dark:hover:bg-white transition-all shadow-xl shadow-zinc-900/10 dark:shadow-none flex items-center gap-2">
                    Explore Projects <ArrowRight className="w-4 h-4" />
                  </Link>
                </Magnetic>
                <Magnetic>
                  <a 
                    href="/resume.pdf" 
                    download
                    className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 px-8 py-4 rounded-2xl font-bold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all flex items-center gap-2 shadow-sm"
                  >
                    <FileText className="w-4 h-4" /> Download CV
                  </a>
                </Magnetic>
              </div>

              <div className="mt-16 flex items-center gap-8">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-zinc-950 bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                      <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  <span className="text-zinc-900 dark:text-white font-bold">50+</span> Projects completed worldwide
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 relative"
              style={{
                perspective: 1000
              }}
            >
              <motion.div 
                whileHover={{ rotateY: 5, rotateX: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl shadow-zinc-900/20 dark:shadow-none border border-white/20 dark:border-zinc-800"
              >
                <OptimizedImage 
                  src="https://scontent.fdac152-1.fna.fbcdn.net/v/t39.30808-1/650403916_3064913927030132_7107040383800220641_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=103&ccb=1-7&_nc_sid=1d2534&_nc_ohc=y08md-hVDVsQ7kNvwGw125Y&_nc_oc=AdpDYyQsSHHqu8qxjdAhBIdF5IJKz57w_fJlTtVhnnFcj6KNHyt8-fdt3MtjzLJPy6g&_nc_zt=24&_nc_ht=scontent.fdac152-1.fna&_nc_gid=g_PwChbE8NOueyl8FXBlCg&_nc_ss=7a3a8&oh=00_Af3XowpNUUnXYXUaW2pdwTxNNo56qNjfqlZt0aVaIZaR_A&oe=69D931E8" 
                  alt="Hanif Mia" 
                  className="w-full h-full"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/40 to-transparent" />
              </motion.div>
              
              {/* Floating Stats */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-10 -right-10 glass p-6 rounded-3xl shadow-2xl border border-white/20 dark:border-zinc-800/50 hidden lg:block"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brand-600/20">
                    <Code2 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xl font-black text-zinc-900 dark:text-white">3+ Years</div>
                    <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Experience</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 bg-white dark:bg-zinc-900/20 transition-colors">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
            <div className="max-w-2xl">
              <span className="text-brand-600 dark:text-brand-400 font-bold text-xs uppercase tracking-[0.3em] mb-4 block">Our Expertise</span>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-tight">
                Solutions tailored to your <br /> <span className="text-zinc-400">business needs.</span>
              </h2>
            </div>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-sm text-sm leading-relaxed">
              I provide end-to-end development services to help businesses grow and succeed in the digital world.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.8, 
                  delay: idx * 0.1,
                  ease: [0.16, 1, 0.3, 1]
                }}
                whileHover={{ y: -10 }}
                className="group p-10 rounded-[2.5rem] bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 hover:bg-white dark:hover:bg-zinc-900 hover:shadow-2xl hover:shadow-zinc-200/50 dark:hover:shadow-none transition-all duration-500"
              >
                <div className="w-14 h-14 bg-white dark:bg-zinc-800 rounded-2xl flex items-center justify-center text-brand-600 mb-8 shadow-sm group-hover:bg-brand-600 group-hover:text-white transition-all duration-500">
                  {getIcon(service.iconName)}
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">{service.title}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-32 bg-zinc-50 dark:bg-zinc-950 transition-colors">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-20 items-center">
            <div className="lg:col-span-5">
              <span className="text-brand-600 dark:text-brand-400 font-bold text-xs uppercase tracking-[0.3em] mb-4 block">Tech Stack</span>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-white mb-8 tracking-tight leading-tight">
                Modern tools for <br /> modern <span className="text-zinc-400">problems.</span>
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 mb-12 leading-relaxed">
                I specialize in the modern JavaScript ecosystem, focusing on performance, scalability, and maintainable code architectures.
              </p>
              <Link to="/contact" className="inline-flex items-center gap-2 text-zinc-900 dark:text-white font-bold hover:gap-3 transition-all">
                Let's talk about your stack <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="lg:col-span-7">
              {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <Skeleton key={i} className="h-40 rounded-3xl" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {skills.map((skill, idx) => (
                    <motion.div
                      key={skill.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05, duration: 0.5 }}
                      whileHover={{ y: -5 }}
                      className={cn(
                        "p-8 rounded-[2rem] bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm flex flex-col justify-between group transition-all duration-500",
                        idx === 0 ? "col-span-2 md:col-span-2 bg-brand-600 dark:bg-brand-600 text-white border-none" : "",
                        idx === 3 ? "md:row-span-2" : ""
                      )}
                    >
                      <div>
                        <div className={cn(
                          "w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500",
                          idx === 0 ? "bg-white/20 text-white" : "bg-zinc-50 dark:bg-zinc-800 text-brand-600 group-hover:bg-brand-600 group-hover:text-white"
                        )}>
                          <Code2 className="w-6 h-6" />
                        </div>
                        <h3 className={cn(
                          "text-xl font-bold mb-2",
                          idx === 0 ? "text-white" : "text-zinc-900 dark:text-white"
                        )}>{skill.name}</h3>
                        <p className={cn(
                          "text-xs font-medium uppercase tracking-widest",
                          idx === 0 ? "text-white/60" : "text-zinc-400"
                        )}>Expertise</p>
                      </div>
                      
                      <div className="mt-8">
                        <div className="flex items-center justify-between mb-2">
                          <span className={cn(
                            "text-[10px] font-black uppercase tracking-widest",
                            idx === 0 ? "text-white/80" : "text-zinc-400"
                          )}>Proficiency</span>
                          <span className={cn(
                            "text-xs font-black",
                            idx === 0 ? "text-white" : "text-brand-600"
                          )}>{skill.level}%</span>
                        </div>
                        <div className={cn(
                          "h-1.5 w-full rounded-full overflow-hidden",
                          idx === 0 ? "bg-white/20" : "bg-zinc-100 dark:bg-zinc-800"
                        )}>
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                            className={cn(
                              "h-full rounded-full",
                              idx === 0 ? "bg-white" : "bg-brand-600"
                            )}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* GitHub Activity Section */}
      <GithubProjects />

      {/* Experience & Education Section */}
      <section className="py-32 bg-white dark:bg-zinc-900/20 transition-colors">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24">
            {/* Experience */}
            <div>
              <div className="flex items-center gap-4 mb-16">
                <div className="w-14 h-14 bg-zinc-900 dark:bg-zinc-100 rounded-2xl flex items-center justify-center text-white dark:text-zinc-900 shadow-lg">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">Experience</h2>
              </div>
              <div className="space-y-12">
                {experience.map((exp, idx) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="relative pl-10 group"
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800 group-last:bg-transparent" />
                    <div className="absolute left-[-4px] top-0 w-2 h-2 bg-brand-600 rounded-full ring-4 ring-white dark:ring-zinc-950" />
                    
                    <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-2">{exp.period}</div>
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-1">{exp.role}</h3>
                    <div className="text-brand-600 font-bold text-sm mb-4">{exp.company}</div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{exp.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <div className="flex items-center gap-4 mb-16">
                <div className="w-14 h-14 bg-brand-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brand-600/20">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">Education</h2>
              </div>
              <div className="space-y-12">
                {education.map((edu, idx) => (
                  <motion.div
                    key={edu.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="relative pl-10 group"
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800 group-last:bg-transparent" />
                    <div className="absolute left-[-4px] top-0 w-2 h-2 bg-brand-600 rounded-full ring-4 ring-white dark:ring-zinc-950" />
                    
                    <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-2">{edu.year}</div>
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-1">{edu.degree}</h3>
                    <div className="text-brand-600 font-bold text-sm mb-4">{edu.institution}</div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{edu.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 bg-zinc-50 dark:bg-zinc-950 transition-colors overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-brand-600 dark:text-brand-400 font-bold text-xs uppercase tracking-[0.3em] mb-4 block">Testimonials</span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight">What people <span className="text-zinc-400">say.</span></h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-zinc-900 p-12 rounded-[3rem] relative border border-zinc-100 dark:border-zinc-800 shadow-sm"
              >
                <Quote className="absolute top-12 right-12 w-16 h-16 text-zinc-100 dark:text-zinc-800 -z-0" />
                <div className="relative z-10">
                  <div className="flex gap-1 mb-8">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-brand-600 text-brand-600" />
                    ))}
                  </div>
                  <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed mb-10 font-medium italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-md">
                      <OptimizedImage 
                        src={testimonial.avatar} 
                        alt={testimonial.name} 
                        className="w-full h-full"
                      />
                    </div>
                    <div>
                      <div className="font-bold text-zinc-900 dark:text-white">{testimonial.name}</div>
                      <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blog Section */}
      {posts.length > 0 && (
        <section className="py-32 bg-white dark:bg-zinc-900/20 transition-colors">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
              <div>
                <span className="text-brand-600 dark:text-brand-400 font-bold text-xs uppercase tracking-[0.3em] mb-4 block">Journal</span>
                <h2 className="text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight">Latest <span className="text-zinc-400">Insights.</span></h2>
              </div>
              <Link to="/blog" className="inline-flex items-center gap-2 text-zinc-900 dark:text-white font-bold hover:gap-3 transition-all">
                View All Articles <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              {posts.map((post, idx) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link to={`/blog/${post.id}`} className="group block">
                    <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden mb-8 shadow-lg group-hover:shadow-2xl transition-all duration-500">
                      <OptimizedImage 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full"
                      />
                      <div className="absolute top-6 left-6">
                        <span className="px-4 py-2 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md text-zinc-900 dark:text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-white mb-4 group-hover:text-brand-600 transition-colors leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-xs font-black text-zinc-900 dark:text-white uppercase tracking-widest group-hover:text-brand-600 transition-colors">
                      Read Article <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      <section className="py-24 bg-zinc-50 dark:bg-zinc-950 transition-colors">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Newsletter />
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-zinc-50 dark:bg-zinc-950 transition-colors">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-brand-600 dark:text-brand-400 font-bold text-xs uppercase tracking-[0.3em] mb-4 block">FAQ</span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight">Common <span className="text-zinc-400">Questions.</span></h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={faq.id} className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-10 py-8 flex items-center justify-between text-left group"
                >
                  <span className="font-bold text-zinc-900 dark:text-white group-hover:text-brand-600 transition-colors">{faq.question}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${openFaq === idx ? 'bg-brand-600 text-white rotate-180' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400'}`}>
                    {openFaq === idx ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-10 pb-10 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
