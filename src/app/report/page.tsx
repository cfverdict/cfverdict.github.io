'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { getUserInfo, getUserSubmissions, getUserRatingHistory } from '@/lib/api';
import { calculateYearStats, YearStats } from '@/lib/stats';
import ReportWrapper from '@/components/ReportWrapper';
import { CFUser } from '@/types/cf';

function ReportContent() {
  const searchParams = useSearchParams();
  const handle = searchParams.get('handle');
  
  const [data, setData] = useState<{ user: CFUser; stats: YearStats } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!handle) {
      setLoading(false);
      return;
    }

    async function fetchData() {
      try {
        // Parallel data fetching
        const [userInfo, submissions, ratingHistory] = await Promise.all([
          getUserInfo(handle!),
          getUserSubmissions(handle!),
          getUserRatingHistory(handle!)
        ]);

        const stats = calculateYearStats(submissions, ratingHistory, 2025);
        setData({ user: userInfo, stats });
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [handle]);

  if (loading) {
    return <ReportWrapper />; 
  }

  if (!handle) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <p>No handle provided.</p>
      </div>
    );
  }

  return <ReportWrapper user={data?.user} stats={data?.stats} error={error || undefined} />;
}

export default function ReportPage() {
  return (
    <Suspense fallback={<ReportWrapper />}>
      <ReportContent />
    </Suspense>
  );
}
