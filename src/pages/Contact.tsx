import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Send, Check } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { cn } from '../lib/utils';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { Helmet } from 'react-helmet-async';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      // 1. Save to Firestore
      await addDoc(collection(db, 'messages'), {
        ...data,
        createdAt: serverTimestamp(),
      });

      // 2. Send Email Notification via EmailJS (if configured)
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (serviceId && templateId && publicKey) {
        try {
          await emailjs.send(
            serviceId,
            templateId,
            {
              from_name: data.name,
              from_email: data.email,
              message: data.message,
              to_name: 'Hanif Mia',
            },
            publicKey
          );
        } catch (emailError) {
          console.error("Email notification failed:", emailError);
        }
      }

      // 3. Success State & Animation
      setShowSuccessOverlay(true);
      setSubmitStatus({ success: true, message: "Message sent successfully! I'll get back to you soon." });
      reset();
      
      // Hide overlay after animation
      setTimeout(() => {
        setShowSuccessOverlay(false);
      }, 3000);

    } catch (error: any) {
      handleFirestoreError(error, OperationType.CREATE, 'messages');
      setSubmitStatus({ success: false, message: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <section className="py-40 bg-zinc-50 dark:bg-zinc-950 min-h-screen transition-colors overflow-hidden">
      <Helmet>
        <title>Contact | MD Abu Hanif Mia</title>
        <meta name="description" content="Get in touch with MD Abu Hanif Mia for project inquiries, collaborations, or just to say hello." />
      </Helmet>
      
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Decorative Background Elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-600/10 blur-[120px] rounded-full" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full" />

        <div className="bg-zinc-900 dark:bg-zinc-900/50 rounded-[4rem] p-12 lg:p-24 overflow-hidden relative border border-zinc-800 shadow-2xl">
          <div className="grid lg:grid-cols-2 gap-20 relative z-10">
            <div className="flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="inline-block px-4 py-1.5 bg-brand-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest mb-8 shadow-lg shadow-brand-600/20">
                  Get in Touch
                </span>
                <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-8 leading-[1.1] tracking-tight">
                  Let's build something <span className="text-brand-500">amazing</span> together.
                </h1>
                <p className="text-zinc-400 text-lg mb-12 leading-relaxed font-medium">
                  I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
                </p>
                
                <div className="space-y-8">
                  <div className="flex items-center gap-6 group">
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-brand-500 group-hover:bg-brand-600 group-hover:text-white transition-all duration-500 shadow-xl">
                      <Mail className="w-7 h-7" />
                    </div>
                    <div>
                      <div className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mb-1">Email Me</div>
                      <div className="text-white font-bold text-lg tracking-tight">mohammadbitullah@gmail.com</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white dark:bg-zinc-900 rounded-[3rem] p-10 lg:p-12 shadow-2xl border border-zinc-100 dark:border-zinc-800 relative overflow-hidden"
            >
              <AnimatePresence>
                {showSuccessOverlay && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-20 bg-white/95 dark:bg-zinc-900/98 backdrop-blur-md flex flex-col items-center justify-center text-center p-10"
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", damping: 12, stiffness: 200 }}
                      className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white mb-8 shadow-2xl shadow-green-500/30"
                    >
                      <Check className="w-12 h-12 stroke-[3]" />
                    </motion.div>
                    <motion.h3 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-3xl font-extrabold text-zinc-900 dark:text-white mb-3 tracking-tight"
                    >
                      Message Sent!
                    </motion.h3>
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-zinc-500 dark:text-zinc-400 font-medium"
                    >
                      Thank you for reaching out. I'll get back to you as soon as possible.
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest ml-1">Full Name</label>
                    <input 
                      {...register('name', { required: true })}
                      className="w-full px-6 py-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-600/10 focus:border-brand-600 transition-all dark:text-white font-medium"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest ml-1">Email Address</label>
                    <input 
                      {...register('email', { required: true })}
                      type="email"
                      className="w-full px-6 py-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-600/10 focus:border-brand-600 transition-all dark:text-white font-medium"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest ml-1">Message</label>
                  <textarea 
                    {...register('message', { required: true })}
                    rows={5}
                    className="w-full px-6 py-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-600/10 focus:border-brand-600 transition-all resize-none dark:text-white font-medium"
                    placeholder="Tell me about your project..."
                  />
                </div>
                <button 
                  disabled={isSubmitting}
                  className="w-full bg-zinc-900 dark:bg-brand-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-zinc-800 dark:hover:bg-brand-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl shadow-zinc-900/10 dark:shadow-brand-600/20"
                >
                  {isSubmitting ? "Sending..." : "Send Message"} <Send className="w-5 h-5" />
                </button>
                
                <AnimatePresence>
                  {submitStatus && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={cn(
                        "p-5 rounded-2xl text-xs font-black uppercase tracking-widest text-center",
                        submitStatus.success ? "bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400" : "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400"
                      )}
                    >
                      {submitStatus.message}
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
