'use client';

import { useState } from 'react';
import { CFUser } from '@/types/cf';
import { YearStats } from '@/lib/stats';
import ReportView from './ReportView';
import CFLoading from './CFLoading';
import { motion } from 'framer-motion';

interface ReportWrapperProps {
  user?: CFUser;
  stats?: YearStats;
  error?: string;
}

export default function ReportWrapper({ user, stats, error }: ReportWrapperProps) {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return (
      <CFLoading 
        status={error ? 'error' : 'success'} 
        onComplete={() => setLoading(false)} 
      />
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md w-full bg-slate-900 p-8 rounded-2xl border border-red-900/50"
        >
          <div className="text-6xl mb-6">🚫</div>
          <h1 className="text-2xl font-bold text-red-500 mb-4 font-mono">Wrong Answer</h1>
          <p className="text-slate-400 mb-8 font-mono text-sm bg-slate-950 p-4 rounded-lg text-left overflow-auto">
            {error}
          </p>
          <a 
            href="/" 
            className="inline-block px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-full text-white transition-colors font-medium"
          >
            Try Another Handle
          </a>
        </motion.div>
      </div>
    );
  }

  if (!user || !stats) return null;

  return <ReportView user={user} stats={stats} />;
}
