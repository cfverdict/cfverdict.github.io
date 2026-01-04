import { getUserInfo, getUserSubmissions, getUserRatingHistory } from '@/lib/api';
import { calculateYearStats } from '@/lib/stats';
import ReportWrapper from '@/components/ReportWrapper';

type Props = {
  params: Promise<{ handle: string }>;
};

export default async function ReportPage({ params }: Props) {
  const { handle } = await params;
  
  try {
    // Parallel data fetching
    const [userInfo, submissions, ratingHistory] = await Promise.all([
      getUserInfo(handle),
      getUserSubmissions(handle),
      getUserRatingHistory(handle)
    ]);

    const stats = calculateYearStats(submissions, ratingHistory, 2025);

    return <ReportWrapper user={userInfo} stats={stats} />;
  } catch (error) {
    // Pass error to wrapper instead of rendering error UI directly
    return <ReportWrapper error={(error as Error).message} />;
  }
}
