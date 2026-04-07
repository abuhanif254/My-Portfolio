import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Github, Linkedin, Mail, Menu, X } from 'lucide-react';
import AIAssistant from './AIAssistant';
import ThemeToggle from './ThemeToggle';
import ScrollProgress from './ScrollProgress';
import CustomCursor from './CustomCursor';
import Magnetic from './Magnetic';

export default function Layout() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <div className="min-h-screen font-sans selection:bg-brand-500 selection:text-white flex flex-col bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      <CustomCursor />
      <ScrollProgress />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4">
        <div className="max-w-5xl mx-auto glass rounded-2xl px-6 h-14 flex items-center justify-between shadow-lg shadow-zinc-200/20 dark:shadow-none">
          <Link to="/" className="text-lg font-extrabold tracking-tighter text-zinc-900 dark:text-white flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white text-sm">H</div>
            <span>HANIF<span className="text-brand-600">.MIA</span></span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6 text-[13px] font-semibold text-zinc-500 dark:text-zinc-400">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                to={item.path} 
                className={`transition-all hover:text-zinc-900 dark:hover:text-white relative py-1 ${location.pathname === item.path ? 'text-zinc-900 dark:text-white' : ''}`}
              >
                {item.name}
                {location.pathname === item.path && (
                  <motion.div 
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-600 rounded-full"
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Magnetic>
              <Link 
                to="/contact"
                className="hidden sm:block bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 text-white px-4 py-1.5 rounded-xl text-xs font-bold hover:bg-zinc-800 dark:hover:bg-white transition-all shadow-md shadow-zinc-900/10 dark:shadow-none"
              >
                Hire Me
              </Link>
            </Magnetic>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white shadow-sm"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden absolute top-20 left-6 right-6 glass rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-zinc-800/50 z-50 overflow-hidden"
            >
              <div className="flex flex-col gap-6">
                {navItems.map((item, idx) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link 
                      to={item.path}
                      className={`text-2xl font-extrabold tracking-tight transition-colors ${location.pathname === item.path ? 'text-brand-600' : 'text-zinc-900 dark:text-white hover:text-brand-600'}`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="pt-6 border-t border-zinc-200 dark:border-zinc-800/50"
                >
                  <Link 
                    to="/contact"
                    className="w-full bg-brand-600 text-white px-6 py-4 rounded-2xl font-bold text-center block shadow-lg shadow-brand-600/20"
                  >
                    Hire Me
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="flex-grow">
        <Outlet />
      </main>

      <AIAssistant />

      {/* Footer */}
      <footer className="bg-zinc-100 dark:bg-zinc-900/30 text-zinc-600 dark:text-zinc-400 pt-24 pb-12 transition-colors border-t border-zinc-200 dark:border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            {/* Brand Section */}
            <div className="space-y-8">
              <Link to="/" className="text-xl font-extrabold tracking-tighter text-zinc-900 dark:text-white">
                HANIF<span className="text-brand-600">.MIA</span>
              </Link>
              <p className="text-sm leading-relaxed max-w-xs text-zinc-500 dark:text-zinc-400">
                Independent Full-stack Developer specializing in building high-performance web applications with refined user experiences.
              </p>
              <div className="flex items-center gap-3">
                {[
                  { icon: <Github className="w-4 h-4" />, href: "https://github.com/abuhanif254" },
                  { icon: <Linkedin className="w-4 h-4" />, href: "https://www.linkedin.com/in/md-abu-hanif-mia" },
                  { icon: <Mail className="w-4 h-4" />, href: "mailto:mohammadbitullah@gmail.com" }
                ].map((social, i) => (
                  <a 
                    key={i}
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-9 h-9 rounded-xl bg-white dark:bg-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-brand-600 hover:text-white transition-all shadow-sm border border-zinc-200 dark:border-zinc-700/50"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-zinc-900 dark:text-white font-bold text-sm mb-8 uppercase tracking-widest">Navigation</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><Link to="/" className="hover:text-brand-600 transition-colors">Home</Link></li>
                <li><Link to="/about" className="hover:text-brand-600 transition-colors">About</Link></li>
                <li><Link to="/projects" className="hover:text-brand-600 transition-colors">Projects</Link></li>
                <li><Link to="/blog" className="hover:text-brand-600 transition-colors">Blog</Link></li>
                <li><Link to="/contact" className="hover:text-brand-600 transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Specialties */}
            <div>
              <h4 className="text-zinc-900 dark:text-white font-bold text-sm mb-8 uppercase tracking-widest">Specialties</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-brand-600 rounded-full" /> Full-stack Architecture</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-brand-600 rounded-full" /> Performance Optimization</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-brand-600 rounded-full" /> UI/UX Engineering</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-brand-600 rounded-full" /> Cloud Infrastructure</li>
              </ul>
            </div>

            {/* Newsletter/Contact */}
            <div>
              <h4 className="text-zinc-900 dark:text-white font-bold text-sm mb-8 uppercase tracking-widest">Get in Touch</h4>
              <p className="text-sm mb-6 text-zinc-500 dark:text-zinc-400">Have a project in mind? Let's discuss how we can work together.</p>
              <Magnetic>
                <Link 
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-brand-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-brand-700 transition-all shadow-lg shadow-brand-600/20"
                >
                  Start a Conversation
                </Link>
              </Magnetic>
            </div>
          </div>

          <div className="pt-10 border-t border-zinc-200 dark:border-zinc-800/50 flex flex-col md:flex-row items-center justify-between gap-6 text-[12px] font-medium text-zinc-400 dark:text-zinc-500">
            <div>
              © {new Date().getFullYear()} MD Abu Hanif Mia. Crafted with precision.
            </div>
            <div className="flex items-center gap-8">
              <Link to="/privacy" className="hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors">Terms</Link>
              <Link to="/admin" className="hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors">Admin</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
