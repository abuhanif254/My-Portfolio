import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 flex items-center justify-center p-6 transition-colors">
      <Helmet>
        <title>404 - Page Not Found | MD Abu Hanif Mia</title>
      </Helmet>
      
      <div className="max-w-2xl w-full text-center relative">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-500/10 blur-[100px] rounded-full -z-10" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative inline-block mb-8">
            <motion.h1 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 12, stiffness: 200 }}
              className="text-[10rem] lg:text-[15rem] font-black text-zinc-100 dark:text-zinc-900 leading-none select-none"
            >
              404
            </motion.h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-brand-500 rounded-3xl rotate-12 flex items-center justify-center text-white shadow-2xl shadow-brand-500/20">
                <Search className="w-12 h-12 -rotate-12" />
              </div>
            </div>
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
            Oops! This page has vanished.
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg mb-12 max-w-md mx-auto leading-relaxed">
            The page you're looking for doesn't exist or has been moved to a new location. Don't worry, even the best developers get lost sometimes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/" 
              className="w-full sm:w-auto bg-brand-500 text-white px-8 py-4 rounded-2xl font-bold hover:bg-brand-600 transition-all shadow-lg shadow-brand-500/20 flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" /> Back to Home
            </Link>
            <button 
              onClick={() => window.history.back()}
              className="w-full sm:w-auto bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white px-8 py-4 rounded-2xl font-bold hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 border border-zinc-200 dark:border-zinc-800"
            >
              <ArrowLeft className="w-5 h-5" /> Go Back
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
