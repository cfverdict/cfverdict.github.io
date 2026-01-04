'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export default function Home() {
  const [handle, setHandle] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (handle.trim()) {
      router.push(`/report?handle=${handle.trim()}`);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-slate-950 text-white">
      <div className="max-w-md w-full space-y-8 text-center">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 text-transparent bg-clip-text">
          CF Verdict 2025
        </h1>
        <p className="text-slate-400 text-lg">
          Discover your Codeforces journey in 2025
        </p>
        
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            placeholder="Enter your Codeforces handle"
            className="w-full px-6 py-4 bg-slate-900 border border-slate-800 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all pl-14 text-white"
          />
          <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-slate-500" />
          <button 
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-blue-600 rounded-full font-medium hover:bg-blue-500 transition-colors text-white"
          >
            Go
          </button>
        </form>
      </div>
    </main>
  );
}
