import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Github, Star, GitFork, ExternalLink, Loader2, Code2 } from 'lucide-react';

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
}

export default function GithubProjects() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const GITHUB_USERNAME: string = 'abuhanif254'; // Update this to your correct GitHub username

  useEffect(() => {
    const fetchRepos = async () => {
      if (!GITHUB_USERNAME || GITHUB_USERNAME === 'your-username') {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`);
        
        if (response.status === 404) {
          throw new Error(`GitHub user "${GITHUB_USERNAME}" not found. Please check the GITHUB_USERNAME constant in GithubProjects.tsx.`);
        }
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || `GitHub API error: ${response.status}`);
        }

        const data = await response.json();
        setRepos(data);
      } catch (err) {
        console.error("Error fetching GitHub repos:", err instanceof Error ? err.message : err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
      </div>
    );
  }

  if (error || repos.length === 0) return null;

  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-950 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 text-brand-500 font-bold tracking-widest uppercase text-xs mb-3">
              <Github className="w-4 h-4" /> Open Source
            </div>
            <h2 className="text-4xl font-bold text-zinc-900 dark:text-white tracking-tight">
              GitHub Activity
            </h2>
          </div>
          <a 
            href="https://github.com/abuhanif254" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm font-bold text-zinc-500 dark:text-zinc-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors flex items-center gap-2 group"
          >
            View All Repositories <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo, idx) => (
            <motion.a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white dark:bg-zinc-900 p-8 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 hover:border-brand-500/50 transition-all hover:shadow-xl hover:shadow-brand-500/5 flex flex-col h-full"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 bg-zinc-50 dark:bg-zinc-800 rounded-2xl flex items-center justify-center text-zinc-600 dark:text-zinc-400 group-hover:bg-brand-500 group-hover:text-white transition-all">
                  <Code2 className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-3 text-xs font-bold text-zinc-400 dark:text-zinc-500">
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5" /> {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="w-3.5 h-3.5" /> {repo.forks_count}
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3 group-hover:text-brand-500 transition-colors">
                {repo.name}
              </h3>
              
              <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 mb-6 flex-grow">
                {repo.description || "No description provided for this repository."}
              </p>

              <div className="flex items-center justify-between pt-6 border-t border-zinc-50 dark:border-zinc-800">
                <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                  {repo.language || "Markdown"}
                </span>
                <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                  Updated {new Date(repo.updated_at).toLocaleDateString()}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
