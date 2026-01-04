'use client';

import { CFUser } from '@/types/cf';
import { YearStats } from '@/lib/stats';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

export default function ReportView({ user, stats }: { user: CFUser; stats: YearStats }) {
  // Prepare chart data
  const difficultyData = Object.entries(stats.difficultyStats)
    .map(([rating, count]) => ({ rating: parseInt(rating), count }))
    .sort((a, b) => a.rating - b.rating);

  const tagData = Object.entries(stats.tagStats)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6); // Top 6 tags

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <img 
            src={user.titlePhoto || user.avatar} 
            alt={user.handle} 
            className="w-32 h-32 rounded-full mx-auto border-4 border-blue-500"
          />
          <h1 className="text-4xl font-bold">{user.handle}</h1>
          <p className="text-xl text-slate-400">{user.rank} · Rating {user.rating}</p>
        </motion.div>

        {/* Key Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Problems Solved" value={stats.totalSolved} />
          <StatCard label="Max Rating" value={stats.maxRating} />
          <StatCard label="Longest Streak" value={`${stats.longestStreak} days`} />
          <StatCard label="Active Days" value={stats.activeDays} />
        </div>

        {/* Charts Section */}
        <div className="grid md:grid-cols-2 gap-8">
          <ChartCard title="Problem Rating Distribution">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={difficultyData}>
                <XAxis dataKey="rating" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Top Skills">
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={tagData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="tag" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 'auto']} tick={false} axisLine={false} />
                <Radar name="Skills" dataKey="count" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <ChartCard title="Daily Activity (2025)">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={stats.heatmapData}>
              <XAxis dataKey="date" hide />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: 'none' }}
                labelStyle={{ color: '#94a3b8' }}
              />
              <Bar dataKey="count" fill="#10b981" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        
        {/* Best Contest */}
        {stats.bestContest && (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="bg-gradient-to-r from-purple-900 to-blue-900 p-8 rounded-2xl text-center"
          >
            <h3 className="text-2xl font-bold mb-2">Best Performance</h3>
            <p className="text-lg text-purple-200">{stats.bestContest.contestName}</p>
            <div className="mt-4 text-4xl font-bold text-white">
              +{stats.bestContest.newRating - stats.bestContest.oldRating}
            </div>
            <p className="text-sm text-purple-300 mt-1">Rating Increase</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      className="bg-slate-900 p-6 rounded-xl border border-slate-800 text-center"
    >
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-slate-400">{label}</div>
    </motion.div>
  );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
      <h3 className="text-lg font-semibold mb-6 text-slate-200">{title}</h3>
      {children}
    </div>
  );
}
