import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { cn } from '../lib/utils';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export default function AIAssistant() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hi! I'm Hanif's AI assistant. Ask me anything about his projects, skills, or experience!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [portfolioContext, setPortfolioContext] = useState('');
  const [currentProject, setCurrentProject] = useState<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Helper to get page context
  const getPageContext = () => {
    const path = location.pathname;
    if (path === '/') return 'Home page (Hero, Featured Projects, Skills overview)';
    if (path === '/about') return 'About page (Experience, Education, Hobbies)';
    if (path === '/projects') return 'Projects gallery (All Hanif\'s work)';
    if (path.startsWith('/projects/')) return `Project detail page for: ${path.split('/').pop()}`;
    if (path === '/blog') return 'Blog page (Articles and insights)';
    if (path.startsWith('/blog/')) return `Blog post detail page for: ${path.split('/').pop()}`;
    if (path === '/contact') return 'Contact page (Get in touch form)';
    return 'Unknown page';
  };

  // Fetch portfolio data for AI context
  useEffect(() => {
    const fetchContext = async () => {
      try {
        const [projectsSnap, skillsSnap] = await Promise.all([
          getDocs(collection(db, 'projects')),
          getDocs(collection(db, 'skills'))
        ]);

        const projects = projectsSnap.docs.map(doc => doc.data());
        const skills = skillsSnap.docs.map(doc => doc.data());

        const context = `
          You are an AI assistant for MD Abu Hanif Mia's portfolio. 
          Hanif is a MERN Stack Developer mastering Next.js.
          
          His projects include:
          ${projects.map((p: any) => `- ${p.title}: ${p.description} (Tags: ${p.tags?.join(', ')})`).join('\n')}
          
          His skills include:
          ${skills.map((s: any) => `- ${s.name} (Level: ${s.level}%)`).join('\n')}
          
          His contact email is mohammadbitullah@gmail.com.
          He is based in Dhaka, Bangladesh.
          He has 3+ years of experience.
          
          CURRENT CONTEXT:
          The user is currently viewing the: ${getPageContext()}
          If they are on a project page, emphasize details about that specific project.
          
          Be professional, helpful, and concise. If you don't know something, say you'll forward the query to Hanif.
        `;
        setPortfolioContext(context);
      } catch (error) {
        console.error("Error fetching AI context:", error);
      }
    };

    fetchContext();
  }, [location.pathname]); // Update context when page changes

  // Contextual Greeting Logic
  useEffect(() => {
    if (isOpen && messages.length === 1) {
      const path = location.pathname;
      if (path.startsWith('/projects/')) {
        const projectId = path.split('/').pop();
        setMessages([
          { role: 'model', text: `I see you're looking at the ${projectId?.replace(/-/g, ' ')} project! Would you like to know more about the tech stack or the challenges Hanif faced while building it?` }
        ]);
      } else if (path === '/contact') {
        setMessages([
          { role: 'model', text: "Ready to start a project? I can help you prepare the details Hanif needs to give you an accurate quote!" }
        ]);
      }
    }
  }, [isOpen, location.pathname]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const model = "gemini-3-flash-preview";
      
      const chat = ai.chats.create({
        model,
        config: {
          systemInstruction: portfolioContext,
        },
      });

      // Format history for Gemini
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const response = await chat.sendMessage({
        message: userMessage,
      });

      const aiText = response.text || "I'm sorry, I couldn't process that request.";
      setMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-[60] w-16 h-16 bg-brand-600 text-white rounded-full shadow-2xl shadow-brand-600/40 flex items-center justify-center hover:scale-110 transition-all group"
      >
        <Sparkles className="w-8 h-8 group-hover:rotate-12 transition-transform" />
        <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full border-2 border-white animate-pulse" />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-28 right-8 z-[60] w-[400px] max-w-[calc(100vw-4rem)] h-[600px] max-h-[calc(100vh-10rem)] bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-2xl border border-zinc-100 dark:border-zinc-800 flex flex-col overflow-hidden transition-colors"
          >
            {/* Header */}
            <div className="p-6 bg-zinc-900 dark:bg-zinc-950 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Hanif's Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-grow overflow-y-auto p-6 space-y-6 custom-scrollbar bg-zinc-50/50 dark:bg-zinc-950/50"
            >
              {messages.map((msg, idx) => (
                <div 
                  key={idx}
                  className={cn(
                    "flex gap-3 max-w-[85%]",
                    msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                    msg.role === 'user' ? "bg-brand-100 dark:bg-brand-500/20 text-brand-600 dark:text-brand-400" : "bg-zinc-900 dark:bg-zinc-800 text-white"
                  )}>
                    {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={cn(
                    "p-4 rounded-2xl text-sm leading-relaxed shadow-sm",
                    msg.role === 'user' 
                      ? "bg-brand-600 text-white rounded-tr-none" 
                      : "bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-tl-none border border-zinc-100 dark:border-zinc-700"
                  )}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 max-w-[85%]">
                  <div className="w-8 h-8 bg-zinc-900 dark:bg-zinc-800 text-white rounded-lg flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="p-4 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-2xl rounded-tl-none border border-zinc-100 dark:border-zinc-700 shadow-sm">
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800">
              <div className="relative">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me about Hanif..."
                  className="w-full pl-4 pr-12 py-4 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all text-sm dark:text-white"
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-zinc-900 dark:bg-brand-500 text-white rounded-xl flex items-center justify-center hover:bg-brand-600 transition-all disabled:opacity-50 disabled:hover:bg-zinc-900 dark:disabled:hover:bg-brand-500"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-zinc-400 dark:text-zinc-500 text-center mt-4 font-medium">
                Powered by Gemini AI • Hanif's Portfolio Assistant
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
