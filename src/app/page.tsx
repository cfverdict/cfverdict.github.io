'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, BarChart2, Trophy, Share2, Github, Code } from 'lucide-react';
import { motion } from 'framer-motion';

const LEGENDS = ['tourist', 'Benq', 'Petr', 'Um_nik', 'jiangly'];

export default function Home() {
  const [handle, setHandle] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (handle.trim()) {
      router.push(`/report?handle=${handle.trim()}`);
    }
  };

  const handleLegendClick = (legend: string) => {
    router.push(`/report?handle=${legend}`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500/30">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      <main className="relative z-10 container mx-auto px-4 py-20 flex flex-col items-center">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-sm text-slate-400 font-medium">
            🚀 The 2025 Season Recap is here
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              CF Verdict 2025
            </span>
          </h1>
          <p className="text-xl text-slate-400 mb-10 leading-relaxed">
            Visualize your competitive programming journey. <br className="hidden md:block" />
            Uncover your strengths, relive your best contests, and share your story.
          </p>

          {/* Search Box */}
          <form onSubmit={handleSubmit} className="relative max-w-lg mx-auto group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-25 group-hover:opacity-50 transition duration-200 blur"></div>
            <div className="relative flex items-center bg-slate-900 rounded-full border border-slate-800 p-2 shadow-2xl">
              <Search className="ml-4 text-slate-500 w-5 h-5" />
              <input
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                placeholder="Enter Codeforces handle..."
                className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder-slate-500 px-4 py-2 outline-none"
              />
              <button 
                type="submit"
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-medium transition-all transform active:scale-95"
              >
                Generate
              </button>
            </div>
          </form>

          {/* Hall of Fame / Quick Links */}
          <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm text-slate-500">
            <span>Try legends:</span>
            {LEGENDS.map((legend) => (
              <button
                key={legend}
                onClick={() => handleLegendClick(legend)}
                className="text-slate-400 hover:text-blue-400 transition-colors underline decoration-slate-800 hover:decoration-blue-400 underline-offset-4"
              >
                {legend}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-8 max-w-5xl w-full mb-20"
        >
          <FeatureCard 
            icon={<BarChart2 className="w-6 h-6 text-blue-400" />}
            title="Deep Analytics"
            description="Analyze your rating progression, problem difficulty distribution, and tag mastery."
          />
          <FeatureCard 
            icon={<Trophy className="w-6 h-6 text-yellow-400" />}
            title="Highlight Moments"
            description="Relive your best contest performances, longest streaks, and hardest solved problems."
          />
          <FeatureCard 
            icon={<Share2 className="w-6 h-6 text-pink-400" />}
            title="Shareable Report"
            description="Generate a beautiful summary card perfect for sharing on Twitter or WeChat."
          />
        </motion.div>

        {/* Footer */}
        <footer className="mt-auto py-8 text-center text-slate-600 text-sm flex flex-col items-center gap-4">
          <div className="flex gap-6">
            <a 
              href="https://github.com/cfverdict/cfverdict.github.io" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-slate-400 transition-colors flex items-center gap-2"
            >
              <Github className="w-4 h-4" /> GitHub
            </a>
            <a 
              href="https://codeforces.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-slate-400 transition-colors flex items-center gap-2"
            >
              <Code className="w-4 h-4" /> Codeforces
            </a>
          </div>
          <div className="space-y-1">
            <p>© 2025 CF Verdict. Not affiliated with Codeforces.</p>
            <p>
              Released under the <a href="https://github.com/cfverdict/cfverdict.github.io/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-400">MIT License</a>.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors backdrop-blur-sm">
      <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-slate-200">{title}</h3>
      <p className="text-slate-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
