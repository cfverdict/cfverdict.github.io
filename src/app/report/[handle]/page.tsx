'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getUserInfo, getUserSubmissions, getUserRatingHistory } from '@/lib/api';
import { calculateYearStats, YearStats } from '@/lib/stats';
import ReportWrapper from '@/components/ReportWrapper';
import { CFUser } from '@/types/cf';

export default function ReportPage() {
  const params = useParams();
  const handle = params.handle as string;
  
  const [data, setData] = useState<{ user: CFUser; stats: YearStats } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!handle) return;

    async function fetchData() {
      try {
        // Parallel data fetching
        const [userInfo, submissions, ratingHistory] = await Promise.all([
          getUserInfo(handle),
          getUserSubmissions(handle),
          getUserRatingHistory(handle)
        ]);

        const stats = calculateYearStats(submissions, ratingHistory, 2025);
        setData({ user: userInfo, stats });
      } catch (err) {
        setError((err as Error).message);
      } finally {
        // We keep loading true here because ReportWrapper handles the "fake" loading animation
        // But we need to signal that data fetching is done
        setLoading(false);
      }
    }

    fetchData();
  }, [handle]);

  // If still fetching data (network request), show nothing or a simple spinner
  // But ReportWrapper expects data or error to be ready
  if (loading) {
    // Pass a loading state to wrapper if needed, or just render wrapper with no data yet
    // Actually, ReportWrapper handles the animation. 
    // We can pass a "ready" flag or just let it render.
    // Let's pass what we have. If loading is true, we might not have data yet.
    // But ReportWrapper shows CFLoading initially anyway.
    return <ReportWrapper />; 
  }

  return <ReportWrapper user={data?.user} stats={data?.stats} error={error || undefined} />;
}
