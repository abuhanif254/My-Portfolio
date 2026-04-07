import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc, Timestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { motion } from 'motion/react';
import OptimizedImage from '../components/OptimizedImage';
import { 
  ArrowLeft, 
  Github, 
  ExternalLink, 
  Calendar, 
  Tag, 
  CheckCircle2, 
  AlertCircle, 
  Lightbulb,
  Loader2,
  Rocket,
  BookOpen
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';

interface Project {
  id: string;
  title: string;
  description: string;
  challenge?: string;
  solution?: string;
  hurdles?: string;
  keyFeatures?: string[];
  lessonsLearned?: string;
  gallery?: string[];
  tags: string[];
  link?: string;
  github?: string;
  image: string;
  createdAt: Timestamp;
}

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      if (!id) return;
      try {
        const docRef = doc(db, 'projects', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProject({ id: docSnap.id, ...docSnap.data() } as Project);
        }
      } catch (error) {
        handleFirestoreError(error, OperationType.GET, `projects/${id}`);
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <Loader2 className="w-10 h-10 text-brand-600 animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-6">
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white mb-6 tracking-tight">Project not found</h1>
        <Link to="/projects" className="bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 text-white px-8 py-3 rounded-2xl font-bold text-sm flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Portfolio
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors">
      <Helmet>
        <title>{project.title} | MD Abu Hanif Mia</title>
        <meta name="description" content={project.description} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:title" content={project.title} />
        <meta property="og:description" content={project.description} />
        <meta property="og:image" content={`/api/og?title=${encodeURIComponent(project.title)}&subtitle=${encodeURIComponent(project.tags[0] || 'Project')}`} />

        {/* Twitter */}
        <meta property="twitter:title" content={project.title} />
        <meta property="twitter:description" content={project.description} />
        <meta property="twitter:image" content={`/api/og?title=${encodeURIComponent(project.title)}&subtitle=${encodeURIComponent(project.tags[0] || 'Project')}`} />
        <link rel="canonical" href={window.location.href} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": project.title,
            "description": project.description,
            "applicationCategory": "WebApplication",
            "operatingSystem": "Web",
            "author": {
              "@type": "Person",
              "name": "MD Abu Hanif Mia"
            },
            "datePublished": project.createdAt?.toDate().toISOString()
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-48 pb-24 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 z-0 opacity-30 dark:opacity-20 blur-[100px]">
          <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-brand-600/20 rounded-full" />
          <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-indigo-600/20 rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Link 
            to="/projects" 
            className="inline-flex items-center gap-2 text-zinc-500 dark:text-zinc-400 hover:text-brand-600 font-bold text-xs uppercase tracking-widest mb-16 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Portfolio
          </Link>

          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map(tag => (
                  <span key={tag} className="px-4 py-1.5 bg-white dark:bg-zinc-900 text-brand-600 dark:text-brand-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-zinc-200 dark:border-zinc-800 shadow-sm">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-zinc-900 dark:text-white mb-10 tracking-tight leading-[0.95]">
                {project.title}
              </h1>
              <p className="text-lg lg:text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed mb-12 max-w-xl">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-5">
                {project.link && (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-zinc-800 dark:hover:bg-white transition-all flex items-center gap-2 shadow-xl shadow-zinc-900/10 dark:shadow-none"
                  >
                    <ExternalLink className="w-5 h-5" /> Live Project
                  </a>
                )}
                {project.github && (
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 px-8 py-4 rounded-2xl font-bold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all flex items-center gap-2 shadow-sm"
                  >
                    <Github className="w-5 h-5" /> Source Code
                  </a>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border border-white dark:border-zinc-800">
                <OptimizedImage 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full aspect-video"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-32 bg-white dark:bg-zinc-900/20 transition-colors">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-24">
            <div className="lg:col-span-8 space-y-32">
              {/* The Challenge */}
              {project.challenge && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-14 h-14 bg-zinc-900 dark:bg-zinc-100 rounded-2xl flex items-center justify-center text-white dark:text-zinc-900 shadow-lg">
                      <AlertCircle className="w-6 h-6" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">The Challenge</h2>
                  </div>
                  <div className="prose prose-lg dark:prose-invert max-w-none text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
                    {project.challenge}
                  </div>
                </motion.div>
              )}

              {/* The Solution */}
              {project.solution && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-14 h-14 bg-brand-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brand-600/20">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">The Solution</h2>
                  </div>
                  <div className="prose prose-lg dark:prose-invert max-w-none text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
                    {project.solution}
                  </div>
                </motion.div>
              )}

              {/* Technical Hurdles */}
              {project.hurdles && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-600/20">
                      <Lightbulb className="w-6 h-6" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">Technical Hurdles</h2>
                  </div>
                  <div className="prose prose-lg dark:prose-invert max-w-none text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
                    {project.hurdles}
                  </div>
                </motion.div>
              )}

              {/* Key Features */}
              {project.keyFeatures && project.keyFeatures.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-14 h-14 bg-orange-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-600/20">
                      <Rocket className="w-6 h-6" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">Key Features</h2>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {project.keyFeatures.map((feature, idx) => (
                      <div key={idx} className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 flex gap-4">
                        <div className="w-6 h-6 bg-brand-600 rounded-lg flex items-center justify-center flex-shrink-0 text-white">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                          {feature}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Lessons Learned */}
              {project.lessonsLearned && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-600/20">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">Lessons Learned</h2>
                  </div>
                  <div className="prose prose-lg dark:prose-invert max-w-none text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
                    {project.lessonsLearned}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar Info */}
            <aside className="lg:col-span-4 space-y-16">
              <div className="bg-zinc-50 dark:bg-zinc-900/50 p-10 rounded-[3rem] border border-zinc-100 dark:border-zinc-800 shadow-sm">
                <h3 className="text-sm font-black text-zinc-900 dark:text-white uppercase tracking-[0.2em] mb-10">Project Metadata</h3>
                <div className="space-y-10">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-white dark:bg-zinc-800 rounded-2xl flex items-center justify-center text-zinc-400 border border-zinc-100 dark:border-zinc-700/50 shadow-sm">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Timeline</div>
                      <div className="text-zinc-900 dark:text-white font-bold text-sm">
                        {project.createdAt?.toDate().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 bg-white dark:bg-zinc-800 rounded-2xl flex items-center justify-center text-zinc-400 border border-zinc-100 dark:border-zinc-700/50 shadow-sm">
                        <Tag className="w-5 h-5" />
                      </div>
                      <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Technologies</div>
                    </div>
                    <div className="flex flex-wrap gap-2 pl-1">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-black text-zinc-600 dark:text-zinc-400 bg-white dark:bg-zinc-800 px-4 py-2 rounded-xl border border-zinc-100 dark:border-zinc-700/50 shadow-sm uppercase tracking-widest">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Gallery */}
              {project.gallery && project.gallery.length > 0 && (
                <div className="space-y-8">
                  <h3 className="text-sm font-black text-zinc-900 dark:text-white uppercase tracking-[0.2em]">Project Gallery</h3>
                  <div className="grid gap-6">
                    {project.gallery.map((img, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.02, y: -5 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="rounded-[2.5rem] overflow-hidden border border-zinc-100 dark:border-zinc-800 shadow-lg"
                      >
                        <OptimizedImage 
                          src={img} 
                          alt={`Gallery ${idx + 1}`} 
                          className="w-full h-auto"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
