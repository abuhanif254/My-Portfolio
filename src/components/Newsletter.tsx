import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import Magnetic from './Magnetic';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      await addDoc(collection(db, 'subscribers'), {
        email,
        createdAt: serverTimestamp()
      });
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Newsletter error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <div className="bg-zinc-900 dark:bg-zinc-900 rounded-[3rem] p-10 lg:p-16 overflow-hidden relative border border-zinc-800 shadow-2xl">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-600/10 blur-[100px] rounded-full -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/10 blur-[100px] rounded-full -ml-32 -mb-32" />

      <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h3 className="text-3xl lg:text-4xl font-black text-white mb-6 tracking-tight">
            Stay in the <span className="text-brand-400">loop.</span>
          </h3>
          <p className="text-zinc-400 text-lg leading-relaxed max-w-md">
            Subscribe to my newsletter for the latest insights on software engineering, design patterns, and technology.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="relative">
          <div className="flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-grow px-6 py-4 bg-zinc-800/50 border border-zinc-700 rounded-2xl focus:ring-4 focus:ring-brand-600/20 focus:border-brand-600 outline-none transition-all text-white font-medium placeholder:text-zinc-500"
            />
            <Magnetic>
              <button 
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="w-full sm:w-auto bg-brand-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-brand-700 transition-all shadow-lg shadow-brand-600/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : status === 'success' ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <>
                    Subscribe <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </Magnetic>
          </div>
          
          {status === 'success' && (
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -bottom-8 left-0 text-brand-400 text-xs font-bold uppercase tracking-widest"
            >
              Thanks for subscribing!
            </motion.p>
          )}
          {status === 'error' && (
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -bottom-8 left-0 text-red-400 text-xs font-bold uppercase tracking-widest"
            >
              Something went wrong. Please try again.
            </motion.p>
          )}
        </form>
      </div>
    </div>
  );
}
