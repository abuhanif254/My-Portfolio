import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { LogIn, Loader2, ShieldCheck, Mail, ArrowRight } from 'lucide-react';
import { auth, signInWithGoogle } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Helmet } from 'react-helmet-async';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email === 'mohammadbitullah@gmail.com') {
        navigate('/admin');
      }
      setCheckingAuth(false);
    });
    return unsubscribe;
  }, [navigate]);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithGoogle();
      if (result.user.email === 'mohammadbitullah@gmail.com') {
        navigate('/admin');
      } else {
        alert('Access denied. Only the administrator can log in.');
        await auth.signOut();
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <Loader2 className="w-10 h-10 text-brand-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center p-6 transition-colors">
      <Helmet>
        <title>Admin Login | MD Abu Hanif Mia</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="bg-white dark:bg-zinc-900 rounded-[3rem] p-12 shadow-2xl border border-zinc-100 dark:border-zinc-800 text-center relative overflow-hidden">
          {/* Decorative background */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
          
          <div className="w-20 h-20 bg-brand-600 rounded-3xl flex items-center justify-center text-white mx-auto mb-8 shadow-xl shadow-brand-600/20">
            <ShieldCheck className="w-10 h-10" />
          </div>

          <h1 className="text-3xl font-black text-zinc-900 dark:text-white mb-4 tracking-tight">Admin Portal</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mb-10 text-sm leading-relaxed">
            Secure access for MD Abu Hanif Mia to manage the portfolio, blog, and messages.
          </p>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-zinc-800 dark:hover:bg-white transition-all shadow-xl disabled:opacity-50 group"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                Sign in with Google
              </>
            )}
          </button>

          <div className="mt-10 pt-10 border-t border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center justify-center gap-2 text-zinc-400 text-[10px] font-black uppercase tracking-widest">
              <Mail className="w-3 h-3" />
              Authorized Personnel Only
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button 
            onClick={() => navigate('/')}
            className="text-zinc-400 hover:text-brand-600 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 mx-auto transition-colors"
          >
            Return to Website <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
