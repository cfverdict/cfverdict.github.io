'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, BarChart2, Trophy, Share2, Github, Code, ChevronRight, Medal } from 'lucide-react';
import { motion } from 'framer-motion';
import legendsData from '@/data/legends.json';

const LEGENDS = legendsData;

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

  const getRankStyle = (index: number) => {
    if (index === 0) return "text-yellow-400 font-bold";
    if (index === 1) return "text-slate-300 font-bold";
    if (index === 2) return "text-amber-600 font-bold";
    return "text-slate-500 font-mono";
  };

  const getRankIcon = (index: number) => {
    if (index === 0) return <Medal className="w-5 h-5 text-yellow-400 fill-yellow-400/20" />;
    if (index === 1) return <Medal className="w-5 h-5 text-slate-300 fill-slate-300/20" />;
    if (index === 2) return <Medal className="w-5 h-5 text-amber-600 fill-amber-600/20" />;
    return <span className="w-5 text-center">{index + 1}</span>;
  };

  const renderLegendItem = (legend: string, index: number) => (
    <button
      key={legend}
      onClick={() => handleLegendClick(legend)}
      className={`
        w-full flex items-center justify-between px-4 py-2.5 
        border-b border-slate-800/50 last:border-0
        hover:bg-slate-800/50 transition-colors group text-left
      `}
    >
      <div className="flex items-center gap-3">
        <div className={`w-6 flex justify-center ${getRankStyle(index)}`}>
          {getRankIcon(index)}
        </div>
        <span className={`font-medium truncate max-w-[120px] ${index === 0 ? 'text-red-500' : 'text-slate-200'}`}>
          {legend}
        </span>
      </div>
      <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-blue-400 transition-colors opacity-0 group-hover:opacity-100" />
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500/30 flex flex-col">
      {/* Background Gradients - Hidden on mobile to improve performance and readability */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none hidden md:block">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      <main className="relative z-10 container mx-auto px-4 pt-8 pb-6 md:pt-12 md:pb-8 flex-1 flex flex-col items-center justify-center min-h-[calc(100vh-60px)]">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto w-full mb-8 md:mb-10"
        >
          <div className="inline-block mb-3 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[10px] md:text-xs text-slate-400 font-medium">
            🚀 2025 赛季年度总结已就绪
          </div>
          <h1 className="text-3xl md:text-6xl font-bold mb-3 md:mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              CF Verdict 2025
            </span>
          </h1>
          <p className="text-base md:text-lg text-slate-400 mb-6 md:mb-8 leading-relaxed max-w-2xl mx-auto px-2">
            可视化你的算法竞赛之旅。<br className="hidden md:block" />
            发掘你的强项，重温高光时刻。
          </p>

          {/* Search Box */}
          <form onSubmit={handleSubmit} className="relative max-w-md mx-auto group mb-8 md:mb-12 w-full">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-25 group-hover:opacity-50 transition duration-200 blur hidden md:block"></div>
            <div className="relative flex items-center bg-slate-900 rounded-full border border-slate-800 p-1.5 shadow-2xl">
              <Search className="ml-3 md:ml-4 text-slate-500 w-4 h-4 md:w-5 md:h-5" />
              <input
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                placeholder="输入 Codeforces Handle..."
                className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder-slate-500 px-3 md:px-4 py-2 outline-none text-sm md:text-base w-full min-w-0"
              />
              <button 
                type="submit"
                className="px-4 md:px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-medium transition-all transform active:scale-95 text-sm md:text-base whitespace-nowrap"
              >
                生成报告
              </button>
            </div>
          </form>
        </motion.div>

        {/* Content Grid: Features + Leaderboard */}
        <div className="grid lg:grid-cols-12 gap-6 md:gap-8 w-full max-w-6xl items-start">
          
          {/* Features (Left on Desktop, Top on Mobile) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 grid gap-3 md:gap-4"
          >
            <FeatureCard 
              icon={<BarChart2 className="w-5 h-5 text-blue-400" />}
              title="深度数据分析"
              description="全方位解析你的 Rating 变化趋势、题目难度分布以及算法标签掌握情况。"
            />
            <FeatureCard 
              icon={<Trophy className="w-5 h-5 text-yellow-400" />}
              title="年度高光时刻"
              description="重温你表现最好的一场比赛，回顾最长连续刷题天数和解决的最难题目。"
            />
            <FeatureCard 
              icon={<Share2 className="w-5 h-5 text-pink-400" />}
              title="一键生成分享"
              description="生成精美的年度总结卡片，完美适配朋友圈、推特等社交媒体分享。"
            />
          </motion.div>

          {/* Leaderboard (Right on Desktop, Bottom on Mobile) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-5 w-full"
          >
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800 overflow-hidden">
              <div className="px-5 py-3 border-b border-slate-800/50 flex items-center justify-between bg-slate-900/50">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-yellow-500" />
                  <h3 className="text-sm font-semibold text-slate-200 tracking-wide">
                    名人堂
                  </h3>
                </div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500/50 animate-pulse"></span>
                  每日更新
                </span>
              </div>
              
              {/* Compact List: 5 items visible, scrollable or just 5 */}
              <div className="max-h-[320px] overflow-y-auto custom-scrollbar">
                 {LEGENDS.map((legend, index) => renderLegendItem(legend, index))}
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-slate-600 text-xs flex flex-col items-center gap-3 border-t border-slate-900/50 bg-slate-950/50 backdrop-blur-sm mt-auto">
        <div className="flex gap-6">
          <a 
            href="https://github.com/cfverdict/cfverdict.github.io" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-slate-400 transition-colors flex items-center gap-2"
          >
            <Github className="w-3 h-3" /> GitHub
          </a>
          <a 
            href="https://codeforces.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-slate-400 transition-colors flex items-center gap-2"
          >
            <Code className="w-3 h-3" /> Codeforces
          </a>
        </div>
        <div className="space-y-1">
          <p>© 2025 CF Verdict. Not affiliated with Codeforces.</p>
          <p>
            Released under the <a href="https://github.com/cfverdict/cfverdict.github.io/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-400">MIT License</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-4 rounded-xl bg-slate-900/30 border border-slate-800/50 hover:border-slate-700 transition-colors backdrop-blur-sm flex items-start gap-4 lg:items-center">
      <div className="w-10 h-10 rounded-lg bg-slate-800/50 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="text-sm md:text-base font-semibold mb-1 text-slate-200">{title}</h3>
        <p className="text-xs md:text-sm text-slate-400 leading-snug">
          {description}
        </p>
      </div>
    </div>
  );
}
