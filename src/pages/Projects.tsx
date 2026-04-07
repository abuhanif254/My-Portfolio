import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, ExternalLink, Loader2, Eye, Search, Filter, X, ArrowRight } from 'lucide-react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { Helmet } from 'react-helmet-async';
import OptimizedImage from '../components/OptimizedImage';
import Skeleton from '../components/Skeleton';

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link: string;
  github: string;
  image: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setProjects(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Project)));
      setLoading(false);
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'projects'));
    return unsubscribe;
  }, []);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach(p => p.tags.forEach(t => tags.add(t)));
    return Array.from(tags).sort();
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesTag = !selectedTag || project.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    });
  }, [projects, searchQuery, selectedTag]);

  return (
    <section className="py-40 bg-zinc-50 dark:bg-zinc-950 min-h-screen transition-colors">
      <Helmet>
        <title>Projects | MD Abu Hanif Mia</title>
        <meta name="description" content="Explore the projects built by MD Abu Hanif Mia, ranging from full-stack MERN apps to modern Next.js experiments." />
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20">
          <div className="max-w-3xl">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-brand-600 dark:text-brand-400 font-bold text-xs uppercase tracking-[0.3em] mb-4 block"
            >
              Portfolio
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl lg:text-7xl font-extrabold text-zinc-900 dark:text-white mb-8 tracking-tight leading-[0.95]"
            >
              Selected <span className="text-gradient">Works.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-zinc-500 dark:text-zinc-400 text-lg lg:text-xl leading-relaxed max-w-2xl"
            >
              A comprehensive showcase of my work, from full-stack MERN applications to modern Next.js experiments.
            </motion.p>
          </div>

          <div className="w-full lg:w-auto">
            <div className="relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-brand-600 transition-colors" />
              <input 
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full lg:w-80 pl-12 pr-12 py-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:ring-4 focus:ring-brand-600/5 focus:border-brand-600 outline-none transition-all text-sm font-medium dark:text-white shadow-sm"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-16">
          <button
            onClick={() => setSelectedTag(null)}
            className={cn(
              "px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all border",
              !selectedTag 
                ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border-zinc-900 dark:border-zinc-100 shadow-xl shadow-zinc-900/10 dark:shadow-none" 
                : "bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-brand-600/50 hover:text-brand-600"
            )}
          >
            All Projects
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
              className={cn(
                "px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all border",
                selectedTag === tag
                  ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border-zinc-900 dark:border-zinc-100 shadow-xl shadow-zinc-900/10 dark:shadow-none"
                  : "bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-brand-600/50 hover:text-brand-600"
              )}
            >
              {tag}
            </button>
          ))}
        </div>
        
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-6">
                <Skeleton className="aspect-[4/3] rounded-[3rem]" />
                <div className="px-2 space-y-4">
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-16 rounded-lg" />
                    <Skeleton className="h-6 w-16 rounded-lg" />
                  </div>
                  <Skeleton className="h-8 w-3/4" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                  <Skeleton className="h-6 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: idx * 0.05 }}
                  className="group"
                >
                  <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden mb-8 shadow-lg group-hover:shadow-2xl transition-all duration-700">
                    <OptimizedImage 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full"
                    />
                    <div className="absolute inset-0 bg-zinc-950/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-4 backdrop-blur-[4px]">
                      <Link to={`/projects/${project.id}`} className="p-4 bg-white rounded-2xl text-zinc-900 hover:bg-brand-600 hover:text-white transition-all transform translate-y-8 group-hover:translate-y-0 duration-500 ease-out shadow-xl"><Eye className="w-6 h-6" /></Link>
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-4 bg-white rounded-2xl text-zinc-900 hover:bg-brand-600 hover:text-white transition-all transform translate-y-8 group-hover:translate-y-0 duration-500 delay-75 ease-out shadow-xl"><Github className="w-6 h-6" /></a>
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-4 bg-white rounded-2xl text-zinc-900 hover:bg-brand-600 hover:text-white transition-all transform translate-y-8 group-hover:translate-y-0 duration-500 delay-150 ease-out shadow-xl"><ExternalLink className="w-6 h-6" /></a>
                    </div>
                  </div>
                  
                  <div className="px-2">
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-3 py-1 bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 text-[10px] font-black uppercase tracking-widest rounded-lg">
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-900 text-zinc-400 text-[10px] font-black uppercase tracking-widest rounded-lg">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-white mb-4 group-hover:text-brand-600 transition-colors leading-tight tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2 mb-6">
                      {project.description}
                    </p>
                    <Link to={`/projects/${project.id}`} className="inline-flex items-center gap-2 text-xs font-black text-zinc-900 dark:text-white uppercase tracking-widest group-hover:text-brand-600 transition-colors">
                      View Project Details <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {!loading && filteredProjects.length === 0 && (
          <div className="text-center py-40 bg-white dark:bg-zinc-900/50 rounded-[4rem] border border-dashed border-zinc-200 dark:border-zinc-800">
            <div className="w-24 h-24 bg-zinc-50 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-8 text-zinc-300">
              <Search className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-white mb-4 tracking-tight">No projects found</h3>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto leading-relaxed">
              We couldn't find any projects matching your current search or filters.
            </p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedTag(null); }}
              className="mt-10 bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 text-white px-8 py-3 rounded-2xl font-bold text-sm hover:bg-zinc-800 dark:hover:bg-white transition-all shadow-xl shadow-zinc-900/10 dark:shadow-none"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
