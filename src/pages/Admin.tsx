import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  MessageSquare, 
  FileText, 
  Briefcase, 
  LogOut, 
  Loader2, 
  Plus, 
  Trash2, 
  Edit, 
  ExternalLink, 
  ChevronRight, 
  User, 
  Calendar, 
  Mail, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Clock,
  TrendingUp,
  Settings,
  Bell,
  Search,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { auth, db, logout, handleFirestoreError, OperationType } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc, getDocs, limit } from 'firebase/firestore';
import { Helmet } from 'react-helmet-async';
import { cn } from '../lib/utils';

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: any;
}

interface Post {
  id: string;
  title: string;
  category: string;
  createdAt: any;
}

interface Project {
  id: string;
  title: string;
  tags: string[];
  createdAt: any;
}

export default function Admin() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'messages' | 'posts' | 'projects'>('dashboard');
  const [messages, setMessages] = useState<Message[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user || user.email !== 'mohammadbitullah@gmail.com') {
        navigate('/login');
      } else {
        setUser(user);
      }
      setAuthLoading(false);
    });
    return unsubscribe;
  }, [navigate]);

  useEffect(() => {
    if (!user) return;

    setLoading(true);
    
    // Messages listener
    const qMessages = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    const unsubMessages = onSnapshot(qMessages, (snapshot) => {
      setMessages(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Message)));
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'messages'));

    // Posts listener
    const qPosts = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const unsubPosts = onSnapshot(qPosts, (snapshot) => {
      setPosts(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Post)));
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'posts'));

    // Projects listener
    const qProjects = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
    const unsubProjects = onSnapshot(qProjects, (snapshot) => {
      setProjects(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Project)));
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'projects'));

    setLoading(false);

    return () => {
      unsubMessages();
      unsubPosts();
      unsubProjects();
    };
  }, [user]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleDelete = async (col: string, id: string) => {
    if (window.confirm(`Are you sure you want to delete this ${col.slice(0, -1)}?`)) {
      try {
        await deleteDoc(doc(db, col, id));
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, `${col}/${id}`);
      }
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 transition-colors">
        <Loader2 className="w-10 h-10 text-brand-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex transition-colors">
      <Helmet>
        <title>Admin Dashboard | MD Abu Hanif Mia</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Sidebar */}
      <aside className="w-80 bg-white dark:bg-zinc-900 border-r border-zinc-100 dark:border-zinc-800 p-10 flex flex-col transition-colors hidden lg:flex">
        <div className="flex items-center gap-4 mb-16">
          <div className="w-12 h-12 bg-brand-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brand-600/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl font-black text-zinc-900 dark:text-white tracking-tight">Admin</div>
            <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">MD Abu Hanif Mia</div>
          </div>
        </div>

        <nav className="space-y-4 flex-1">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
            { id: 'messages', label: 'Messages', icon: <MessageSquare className="w-5 h-5" />, count: messages.length },
            { id: 'posts', label: 'Blog Posts', icon: <FileText className="w-5 h-5" />, count: posts.length },
            { id: 'projects', label: 'Projects', icon: <Briefcase className="w-5 h-5" />, count: projects.length },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={cn(
                "w-full flex items-center justify-between px-6 py-4 rounded-2xl font-bold text-sm transition-all group",
                activeTab === item.id 
                  ? "bg-brand-600 text-white shadow-xl shadow-brand-600/20" 
                  : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
              )}
            >
              <div className="flex items-center gap-4">
                {item.icon}
                {item.label}
              </div>
              {item.count !== undefined && (
                <span className={cn(
                  "px-2.5 py-1 rounded-lg text-[10px] font-black",
                  activeTab === item.id ? "bg-white/20 text-white" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500"
                )}>
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="pt-10 border-t border-zinc-100 dark:border-zinc-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-zinc-50/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-100 dark:border-zinc-800 px-10 py-6 flex items-center justify-between transition-colors">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight capitalize">
              {activeTab}
            </h2>
            <div className="w-1.5 h-1.5 rounded-full bg-brand-600" />
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl pl-11 pr-6 py-2.5 text-sm font-medium focus:ring-2 focus:ring-brand-600 outline-none transition-all w-64"
              />
            </div>
            <button className="w-11 h-11 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-brand-600 transition-all relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-3 right-3 w-2 h-2 bg-brand-600 rounded-full border-2 border-white dark:border-zinc-900" />
            </button>
            <div className="flex items-center gap-4 pl-6 border-l border-zinc-100 dark:border-zinc-800">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-black text-zinc-900 dark:text-white">Hanif Mia</div>
                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Administrator</div>
              </div>
              <div className="w-11 h-11 rounded-xl overflow-hidden border-2 border-brand-600 shadow-lg shadow-brand-600/20">
                <img src={user?.photoURL || "https://picsum.photos/seed/admin/100/100"} alt="Admin" className="w-full h-full" />
              </div>
            </div>
          </div>
        </header>

        <div className="p-10">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-10"
              >
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                    { label: 'Total Messages', value: messages.length, icon: <MessageSquare className="w-6 h-6" />, color: 'bg-brand-600' },
                    { label: 'Blog Posts', value: posts.length, icon: <FileText className="w-6 h-6" />, color: 'bg-indigo-600' },
                    { label: 'Projects', value: projects.length, icon: <Briefcase className="w-6 h-6" />, color: 'bg-emerald-600' },
                    { label: 'Active Status', value: 'Live', icon: <TrendingUp className="w-6 h-6" />, color: 'bg-orange-600' },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-sm transition-colors group">
                      <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg", stat.color)}>
                        {stat.icon}
                      </div>
                      <div className="text-4xl font-black text-zinc-900 dark:text-white tracking-tighter mb-2">{stat.value}</div>
                      <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="grid lg:grid-cols-12 gap-10">
                  {/* Recent Messages */}
                  <div className="lg:col-span-8 bg-white dark:bg-zinc-900 rounded-[3rem] border border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden transition-colors">
                    <div className="p-10 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                      <h3 className="text-xl font-black text-zinc-900 dark:text-white tracking-tight">Recent Messages</h3>
                      <button onClick={() => setActiveTab('messages')} className="text-brand-600 font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
                        View All <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                      {messages.slice(0, 5).map((msg) => (
                        <div key={msg.id} className="p-8 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all flex items-start justify-between group">
                          <div className="flex gap-6">
                            <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 font-bold">
                              {msg.name.charAt(0)}
                            </div>
                            <div>
                              <div className="text-zinc-900 dark:text-white font-bold mb-1">{msg.name}</div>
                              <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">{msg.email}</div>
                              <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-1 italic">"{msg.message}"</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-4">
                              {msg.createdAt?.toDate().toLocaleDateString()}
                            </div>
                            <button onClick={() => handleDelete('messages', msg.id)} className="text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                      {messages.length === 0 && (
                        <div className="p-20 text-center text-zinc-400">
                          <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-20" />
                          <p className="font-bold text-sm">No messages yet.</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* System Info */}
                  <div className="lg:col-span-4 space-y-10">
                    <div className="bg-zinc-900 dark:bg-brand-600 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
                      <h3 className="text-xl font-black mb-6 tracking-tight">Quick Actions</h3>
                      <div className="space-y-4">
                        <Link to="/blog" className="flex items-center justify-between p-5 bg-white/10 rounded-2xl hover:bg-white/20 transition-all group">
                          <div className="flex items-center gap-4">
                            <Plus className="w-5 h-5" />
                            <span className="font-bold text-sm">New Blog Post</span>
                          </div>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link to="/projects" className="flex items-center justify-between p-5 bg-white/10 rounded-2xl hover:bg-white/20 transition-all group">
                          <div className="flex items-center gap-4">
                            <Plus className="w-5 h-5" />
                            <span className="font-bold text-sm">New Project</span>
                          </div>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 p-10 rounded-[3rem] border border-zinc-100 dark:border-zinc-800 shadow-sm transition-colors">
                      <h3 className="text-sm font-black text-zinc-900 dark:text-white uppercase tracking-[0.2em] mb-8">System Health</h3>
                      <div className="space-y-6">
                        {[
                          { label: 'Firebase Auth', status: 'Active', icon: <ShieldCheck className="w-4 h-4 text-emerald-500" /> },
                          { label: 'Firestore DB', status: 'Active', icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" /> },
                          { label: 'Cloud Hosting', status: 'Active', icon: <Zap className="w-4 h-4 text-emerald-500" /> },
                        ].map((item, i) => (
                          <div key={i} className="flex items-center justify-between">
                            <div className="text-xs font-bold text-zinc-500 dark:text-zinc-400">{item.label}</div>
                            <div className="flex items-center gap-2 text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                              {item.icon}
                              {item.status}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'messages' && (
              <motion.div
                key="messages"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white dark:bg-zinc-900 rounded-[3rem] border border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden transition-colors"
              >
                <div className="p-10 border-b border-zinc-100 dark:border-zinc-800">
                  <h3 className="text-xl font-black text-zinc-900 dark:text-white tracking-tight">All Messages</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-zinc-50 dark:bg-zinc-800/50 text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                        <th className="px-10 py-6">Sender</th>
                        <th className="px-10 py-6">Message</th>
                        <th className="px-10 py-6">Date</th>
                        <th className="px-10 py-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                      {messages.map((msg) => (
                        <tr key={msg.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/20 transition-all group">
                          <td className="px-10 py-8">
                            <div className="text-sm font-bold text-zinc-900 dark:text-white">{msg.name}</div>
                            <div className="text-xs text-zinc-500 dark:text-zinc-400">{msg.email}</div>
                          </td>
                          <td className="px-10 py-8">
                            <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-md line-clamp-2">{msg.message}</p>
                          </td>
                          <td className="px-10 py-8">
                            <div className="text-xs font-bold text-zinc-500 dark:text-zinc-400">
                              {msg.createdAt?.toDate().toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-10 py-8 text-right">
                            <button 
                              onClick={() => handleDelete('messages', msg.id)}
                              className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all ml-auto"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {(activeTab === 'posts' || activeTab === 'projects') && (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white dark:bg-zinc-900 rounded-[3rem] border border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden transition-colors"
              >
                <div className="p-10 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                  <h3 className="text-xl font-black text-zinc-900 dark:text-white tracking-tight uppercase">Manage {activeTab}</h3>
                  <Link 
                    to={activeTab === 'posts' ? '/blog' : '/projects'} 
                    className="bg-brand-600 text-white px-8 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-brand-600/20"
                  >
                    <Plus className="w-4 h-4" /> Add New
                  </Link>
                </div>
                <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {(activeTab === 'posts' ? posts : projects).map((item: any) => (
                    <div key={item.id} className="p-10 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/20 transition-all group">
                      <div className="flex items-center gap-8">
                        <div className="w-20 h-20 rounded-2xl bg-zinc-100 dark:bg-zinc-800 overflow-hidden shadow-md">
                          <img src={item.image || "https://picsum.photos/seed/item/200/200"} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h4 className="text-lg font-extrabold text-zinc-900 dark:text-white mb-2 tracking-tight group-hover:text-brand-600 transition-colors">
                            {item.title}
                          </h4>
                          <div className="flex items-center gap-4">
                            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                              {activeTab === 'posts' ? item.category : item.tags?.join(', ')}
                            </span>
                            <div className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                              {item.createdAt?.toDate().toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Link 
                          to={activeTab === 'posts' ? `/blog/${item.id}` : `/projects/${item.id}`}
                          className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:bg-brand-600 hover:text-white transition-all shadow-sm"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </Link>
                        <button 
                          onClick={() => handleDelete(activeTab, item.id)}
                          className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
