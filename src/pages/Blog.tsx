import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Calendar, User, ArrowRight, Tag, ChevronRight, X, BookOpen, Loader2 } from 'lucide-react';
import { collection, query, orderBy, onSnapshot, where } from 'firebase/firestore';
import { db } from '../firebase';
import Markdown from 'react-markdown';
import { cn, calculateReadingTime } from '../lib/utils';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import OptimizedImage from '../components/OptimizedImage';
import Newsletter from '../components/Newsletter';
import Skeleton from '../components/Skeleton';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  author: string;
  createdAt: any;
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as BlogPost[];
      setPosts(postsData);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const categories = ['All', ...Array.from(new Set(posts.map(p => p.category)))];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-40 pb-24 transition-colors">
      <Helmet>
        <title>Blog | MD Abu Hanif Mia</title>
        <meta name="description" content="Read the latest insights and articles on software engineering, design patterns, and technology by MD Abu Hanif Mia." />
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-brand-600 dark:text-brand-400 font-bold text-xs uppercase tracking-[0.3em] mb-4 block"
          >
            Journal
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl lg:text-7xl font-extrabold text-zinc-900 dark:text-white mb-8 tracking-tight leading-[0.95]"
          >
            Insights & <span className="text-gradient">Articles.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-zinc-500 dark:text-zinc-400 text-lg lg:text-xl max-w-2xl leading-relaxed"
          >
            Thoughts on software engineering, design patterns, and the future of technology.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-12">
            {loading ? (
              <div className="space-y-12">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-white dark:bg-zinc-900 rounded-[3rem] overflow-hidden border border-zinc-100 dark:border-zinc-800 p-10 lg:p-12">
                    <div className="grid md:grid-cols-2 gap-10">
                      <Skeleton className="h-64 md:h-full rounded-[2rem]" />
                      <div className="space-y-6">
                        <Skeleton className="h-4 w-1/3" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-3/4" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-1/2" />
                        </div>
                        <Skeleton className="h-8 w-1/4" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredPosts.length > 0 ? (
              filteredPosts.map((post, index) => (
                <motion.article 
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
                  className="group bg-white dark:bg-zinc-900 rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 border border-zinc-100 dark:border-zinc-800"
                >
                  <div className="grid md:grid-cols-2">
                    <div className="relative h-64 md:h-full overflow-hidden">
                      <OptimizedImage 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full"
                      />
                      <div className="absolute top-8 left-8">
                        <span className="px-4 py-2 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md text-brand-600 dark:text-brand-400 text-[10px] font-black uppercase tracking-widest rounded-xl shadow-sm border border-white/20">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-10 lg:p-12 flex flex-col justify-center">
                      <div className="flex items-center gap-5 text-zinc-400 dark:text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-6">
                        <span className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-brand-600" />
                          {post.createdAt?.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-2">
                          <User className="w-4 h-4 text-brand-600" />
                          {post.author}
                        </span>
                        <span className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-brand-600" />
                          {calculateReadingTime(post.content)} min read
                        </span>
                      </div>
                      <h2 className="text-2xl lg:text-3xl font-extrabold text-zinc-900 dark:text-white mb-6 group-hover:text-brand-600 transition-colors leading-tight tracking-tight">
                        {post.title}
                      </h2>
                      <p className="text-zinc-500 dark:text-zinc-400 mb-10 line-clamp-3 leading-relaxed text-sm font-medium">
                        {post.excerpt}
                      </p>
                      <Link 
                        to={`/blog/${post.id}`}
                        className="inline-flex items-center gap-2 text-zinc-900 dark:text-white font-black text-xs uppercase tracking-widest group-hover:text-brand-600 transition-all"
                      >
                        Read Full Article <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))
            ) : (
              <div className="text-center py-32 bg-white dark:bg-zinc-900/50 rounded-[4rem] border border-dashed border-zinc-200 dark:border-zinc-800">
                <div className="w-24 h-24 bg-zinc-50 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-8 text-zinc-300">
                  <BookOpen className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-white mb-4 tracking-tight">No articles found</h3>
                <p className="text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto leading-relaxed">
                  We couldn't find any articles matching your current search or category.
                </p>
                <button 
                  onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                  className="mt-10 bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 text-white px-8 py-3 rounded-2xl font-bold text-sm hover:bg-zinc-800 dark:hover:bg-white transition-all shadow-xl shadow-zinc-900/10 dark:shadow-none"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-12">
            {/* Search */}
            <div className="bg-white dark:bg-zinc-900 p-10 rounded-[3rem] shadow-sm border border-zinc-100 dark:border-zinc-800">
              <h3 className="text-sm font-black text-zinc-900 dark:text-white uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                <Search className="w-4 h-4 text-brand-600" /> Search
              </h3>
              <div className="relative group">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full pl-12 pr-4 py-4 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl focus:ring-4 focus:ring-brand-600/5 focus:border-brand-600 outline-none transition-all text-sm font-medium dark:text-white"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-brand-600 transition-colors" />
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white dark:bg-zinc-900 p-10 rounded-[3rem] shadow-sm border border-zinc-100 dark:border-zinc-800">
              <h3 className="text-sm font-black text-zinc-900 dark:text-white uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                <Tag className="w-4 h-4 text-brand-600" /> Categories
              </h3>
              <div className="flex flex-wrap gap-3">
                {categories.map(category => (
                  <button 
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={cn(
                      "px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all border",
                      selectedCategory === category 
                        ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border-zinc-900 dark:border-zinc-100 shadow-xl shadow-zinc-900/10 dark:shadow-none" 
                        : "bg-zinc-50 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border-zinc-100 dark:border-zinc-700 hover:border-brand-600/50 hover:text-brand-600"
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Posts Mini */}
            <div className="bg-white dark:bg-zinc-900 p-10 rounded-[3rem] shadow-sm border border-zinc-100 dark:border-zinc-800">
              <h3 className="text-sm font-black text-zinc-900 dark:text-white uppercase tracking-[0.2em] mb-10">Recent Posts</h3>
              <div className="space-y-8">
                {posts.slice(0, 3).map(post => (
                  <Link 
                    key={post.id}
                    to={`/blog/${post.id}`}
                    className="flex gap-5 group text-left"
                  >
                    <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 shadow-md">
                      <OptimizedImage 
                        src={post.image} 
                        alt="" 
                        className="w-full h-full"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h4 className="text-sm font-extrabold text-zinc-900 dark:text-white line-clamp-2 group-hover:text-brand-600 transition-colors mb-2 leading-snug tracking-tight">
                        {post.title}
                      </h4>
                      <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-black uppercase tracking-widest">
                        {post.createdAt?.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Newsletter Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-32"
        >
          <Newsletter />
        </motion.div>
      </div>
    </div>
  );
}
