import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calendar, User, ArrowLeft, Loader2, Search, Tag, ChevronRight, Share2, Twitter, Linkedin, Facebook, BookOpen, Check } from 'lucide-react';
import { doc, getDoc, collection, query, limit, getDocs, orderBy } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { cn, calculateReadingTime } from '../lib/utils';
import { Helmet } from 'react-helmet-async';
import OptimizedImage from '../components/OptimizedImage';

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

export default function BlogPostDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const docRef = doc(db, 'posts', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const postData = { id: docSnap.id, ...docSnap.data() } as BlogPost;
          setPost(postData);
          
          // Fetch recent posts
          const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'), limit(4));
          const recentSnap = await getDocs(q);
          const recent = recentSnap.docs
            .map(d => ({ id: d.id, ...d.data() } as BlogPost))
            .filter(p => p.id !== id)
            .slice(0, 3);
          setRecentPosts(recent);
        } else {
          navigate('/blog');
        }
      } catch (error) {
        handleFirestoreError(error, OperationType.GET, `posts/${id}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
    window.scrollTo(0, 0);
  }, [id, navigate]);

  const handleShare = (platform: 'twitter' | 'linkedin' | 'facebook') => {
    const url = window.location.href;
    const title = post?.title || '';
    let shareUrl = '';

    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
    }

    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(window.location.href);
      } else {
        // Fallback for non-secure context or unsupported clipboard API
        const textArea = document.createElement("textarea");
        textArea.value = window.location.href;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 transition-colors">
        <Loader2 className="w-10 h-10 text-brand-600 animate-spin" />
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-40 pb-24 transition-colors">
      <Helmet>
        <title>{post.title} | MD Abu Hanif Mia</title>
        <meta name="description" content={post.excerpt} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={`/api/og?title=${encodeURIComponent(post.title)}&subtitle=${encodeURIComponent(post.category)}`} />

        {/* Twitter */}
        <meta property="twitter:title" content={post.title} />
        <meta property="twitter:description" content={post.excerpt} />
        <meta property="twitter:image" content={`/api/og?title=${encodeURIComponent(post.title)}&subtitle=${encodeURIComponent(post.category)}`} />
        <link rel="canonical" href={window.location.href} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "image": post.image,
            "author": {
              "@type": "Person",
              "name": post.author || 'Hanif Mia'
            },
            "datePublished": post.createdAt?.toDate().toISOString(),
            "publisher": {
              "@type": "Person",
              "name": "MD Abu Hanif Mia"
            }
          })}
        </script>
      </Helmet>
      
      <div className="max-w-7xl mx-auto px-6">
        {/* Back Button */}
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-2 text-zinc-500 dark:text-zinc-400 hover:text-brand-600 font-bold text-xs uppercase tracking-widest mb-12 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Journal
        </Link>

        <div className="grid lg:grid-cols-12 gap-20">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <motion.article 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white dark:bg-zinc-900 rounded-[4rem] overflow-hidden shadow-sm border border-zinc-100 dark:border-zinc-800 transition-colors"
            >
              <div className="h-[500px] relative overflow-hidden">
                <OptimizedImage 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-zinc-900 via-transparent to-transparent" />
              </div>
              
              <div className="px-8 lg:px-20 pb-20 -mt-32 relative z-10">
                <div className="bg-white dark:bg-zinc-900 rounded-[3rem] p-10 lg:p-16 shadow-2xl border border-zinc-100 dark:border-zinc-800 transition-colors">
                  <div className="flex flex-wrap items-center gap-6 text-zinc-400 dark:text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-10">
                    <span className="px-5 py-2 bg-brand-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-brand-600/20">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-brand-600" />
                      {post.createdAt?.toDate().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-2">
                      <User className="w-4 h-4 text-brand-600" />
                      {post.author || 'Hanif Mia'}
                    </span>
                    <span className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-brand-600" />
                      {calculateReadingTime(post.content)} min read
                    </span>
                  </div>
                  
                  <h1 className="text-4xl lg:text-6xl font-extrabold text-zinc-900 dark:text-white mb-12 leading-[1.1] tracking-tight">
                    {post.title}
                  </h1>
                  
                  <div className="prose prose-zinc dark:prose-invert max-w-none mb-16 blog-content text-lg leading-relaxed font-medium">
                    <Markdown
                      components={{
                        code({ node, inline, className, children, ...props }: any) {
                          const match = /language-(\w+)/.exec(className || '');
                          return !inline && match ? (
                            <SyntaxHighlighter
                              style={atomDark}
                              language={match[1]}
                              PreTag="div"
                              className="rounded-2xl my-8"
                              {...props}
                            >
                              {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                          ) : (
                            <code className={className} {...props}>
                              {children}
                            </code>
                          );
                        },
                      }}
                    >
                      {post.content || 'No content available for this post.'}
                    </Markdown>
                  </div>

                  {/* Share Section */}
                  <div className="pt-12 border-t border-zinc-100 dark:border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">Share Article</span>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => handleShare('twitter')}
                          className="w-12 h-12 rounded-2xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 dark:text-zinc-500 hover:bg-brand-600 hover:text-white transition-all shadow-sm"
                          title="Share on Twitter"
                        >
                          <Twitter className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => handleShare('linkedin')}
                          className="w-12 h-12 rounded-2xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 dark:text-zinc-500 hover:bg-brand-600 hover:text-white transition-all shadow-sm"
                          title="Share on LinkedIn"
                        >
                          <Linkedin className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => handleShare('facebook')}
                          className="w-12 h-12 rounded-2xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 dark:text-zinc-500 hover:bg-brand-600 hover:text-white transition-all shadow-sm"
                          title="Share on Facebook"
                        >
                          <Facebook className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <button 
                      onClick={handleCopyLink}
                      className="flex items-center gap-2 text-[10px] font-black text-zinc-900 dark:text-white uppercase tracking-widest hover:text-brand-600 transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-green-500" /> Copied!
                        </>
                      ) : (
                        <>
                          <Share2 className="w-4 h-4" /> Copy Link
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-12">
            {/* Author Card */}
            <div className="bg-white dark:bg-zinc-900 p-10 rounded-[3rem] shadow-sm border border-zinc-100 dark:border-zinc-800 text-center transition-colors">
              <div className="w-28 h-28 rounded-full overflow-hidden mx-auto mb-8 border-4 border-zinc-50 dark:border-zinc-800 shadow-xl">
                <OptimizedImage 
                  src="https://picsum.photos/seed/developer/200/200" 
                  alt={post.author} 
                  className="w-full h-full"
                />
              </div>
              <h3 className="text-xl font-extrabold text-zinc-900 dark:text-white mb-3 tracking-tight">{post.author || 'Hanif Mia'}</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-8 leading-relaxed font-medium">
                Full-stack developer and tech enthusiast sharing insights on modern web development.
              </p>
              <Link 
                to="/contact" 
                className="inline-block bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 text-white px-8 py-3 rounded-2xl font-bold text-sm hover:bg-zinc-800 dark:hover:bg-white transition-all shadow-xl shadow-zinc-900/10 dark:shadow-none"
              >
                Get in Touch
              </Link>
            </div>

            {/* Recent Posts */}
            <div className="bg-white dark:bg-zinc-900 p-10 rounded-[3rem] shadow-sm border border-zinc-100 dark:border-zinc-800 transition-colors">
              <h3 className="text-sm font-black text-zinc-900 dark:text-white uppercase tracking-[0.2em] mb-10">Recent Articles</h3>
              <div className="space-y-8">
                {recentPosts.map(p => (
                  <Link 
                    key={p.id} 
                    to={`/blog/${p.id}`}
                    className="flex gap-5 group"
                  >
                    <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 shadow-md">
                      <OptimizedImage 
                        src={p.image} 
                        alt="" 
                        className="w-full h-full"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h4 className="font-extrabold text-zinc-900 dark:text-white group-hover:text-brand-600 transition-colors line-clamp-2 mb-2 text-sm leading-snug tracking-tight">
                        {p.title}
                      </h4>
                      <div className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                        {p.createdAt?.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
