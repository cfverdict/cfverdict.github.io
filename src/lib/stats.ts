import { CFSubmission, CFRatingChange } from '@/types/cf';
import { startOfYear, endOfYear, eachDayOfInterval, format } from 'date-fns';

export interface YearStats {
  year: number;
  totalSolved: number;
  totalSubmissions: number;
  maxRating: number;
  longestStreak: number;
  activeDays: number;
  tagStats: Record<string, number>;
  difficultyStats: Record<number, number>;
  heatmapData: { date: string; count: number }[];
  bestContest: CFRatingChange | null;
}

export function calculateYearStats(
  submissions: CFSubmission[],
  ratingHistory: CFRatingChange[],
  year: number
): YearStats {
  // Handle future years or invalid years gracefully
  const now = new Date();
  const targetDate = new Date(year, 0, 1);
  const startDate = startOfYear(targetDate);
  const endDate = endOfYear(targetDate);
  
  const startTs = startDate.getTime() / 1000;
  const endTs = endDate.getTime() / 1000;

  // Filter submissions for the year
  const yearSubmissions = submissions.filter(
    (s) => s.creationTimeSeconds >= startTs && s.creationTimeSeconds <= endTs
  );

  const acSubmissions = yearSubmissions.filter((s) => s.verdict === 'OK');
  
  // Unique solved problems
  const solvedProblems = new Set<string>();
  const tagStats: Record<string, number> = {};
  const difficultyStats: Record<number, number> = {};
  const dailyActivity: Record<string, number> = {};

  // Re-iterate all year submissions for heatmap
  yearSubmissions.forEach(sub => {
    const dateStr = format(new Date(sub.creationTimeSeconds * 1000), 'yyyy-MM-dd');
    dailyActivity[dateStr] = (dailyActivity[dateStr] || 0) + 1;
  });

  acSubmissions.forEach(sub => {
    const problemId = `${sub.problem.contestId}-${sub.problem.index}`;
    if (!solvedProblems.has(problemId)) {
      solvedProblems.add(problemId);
      
      // Tags
      sub.problem.tags.forEach(tag => {
        tagStats[tag] = (tagStats[tag] || 0) + 1;
      });

      // Difficulty
      if (sub.problem.rating) {
        difficultyStats[sub.problem.rating] = (difficultyStats[sub.problem.rating] || 0) + 1;
      }
    }
  });

  // Longest Streak
  let currentStreak = 0;
  let longestStreak = 0;
  
  // Only calculate up to today if year is current year
  const calcEndDate = (year === now.getFullYear()) ? now : endDate;
  
  // If year is in future, don't calculate streak
  if (year <= now.getFullYear()) {
      const days = eachDayOfInterval({ start: startDate, end: calcEndDate });
      
      days.forEach(day => {
        const dateStr = format(day, 'yyyy-MM-dd');
        if (dailyActivity[dateStr] && dailyActivity[dateStr] > 0) {
          currentStreak++;
        } else {
          longestStreak = Math.max(longestStreak, currentStreak);
          currentStreak = 0;
        }
      });
      longestStreak = Math.max(longestStreak, currentStreak);
  }

  // Rating Stats
  const yearRatings = ratingHistory.filter(
    r => r.ratingUpdateTimeSeconds >= startTs && r.ratingUpdateTimeSeconds <= endTs
  );
  
  let maxRating = 0;
  let bestContest: CFRatingChange | null = null;
  let maxRatingIncrease = -Infinity;

  yearRatings.forEach(r => {
    if (r.newRating > maxRating) maxRating = r.newRating;
    const increase = r.newRating - r.oldRating;
    if (increase > maxRatingIncrease) {
      maxRatingIncrease = increase;
      bestContest = r;
    }
  });

  return {
    year,
    totalSolved: solvedProblems.size,
    totalSubmissions: yearSubmissions.length,
    maxRating,
    longestStreak,
    activeDays: Object.keys(dailyActivity).length,
    tagStats,
    difficultyStats,
    heatmapData: Object.entries(dailyActivity).map(([date, count]) => ({ date, count })),
    bestContest
  };
}
