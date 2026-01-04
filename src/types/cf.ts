export interface CFSubmission {
  id: number;
  contestId?: number;
  creationTimeSeconds: number;
  relativeTimeSeconds: number;
  problem: {
    contestId?: number;
    index: string;
    name: string;
    type: "PROGRAMMING" | "QUESTION";
    points?: number;
    rating?: number;
    tags: string[];
  };
  author: {
    contestId?: number;
    members: { handle: string }[];
    participantType: "CONTESTANT" | "PRACTICE" | "VIRTUAL" | "MANAGER" | "OUT_OF_COMPETITION";
    ghost: boolean;
    startTimeSeconds?: number;
  };
  programmingLanguage: string;
  verdict: "OK" | "FAILED" | "PARTIAL" | "COMPILATION_ERROR" | "RUNTIME_ERROR" | "WRONG_ANSWER" | "PRESENTATION_ERROR" | "TIME_LIMIT_EXCEEDED" | "MEMORY_LIMIT_EXCEEDED" | "IDLENESS_LIMIT_EXCEEDED" | "SECURITY_VIOLATED" | "CRASHED" | "INPUT_PREPARATION_CRASHED" | "CHALLENGED" | "SKIPPED" | "TESTING" | "REJECTED";
  testset: string;
  passedTestCount: number;
  timeConsumedMillis: number;
  memoryConsumedBytes: number;
}

export interface CFUser {
  handle: string;
  email?: string;
  vkId?: string;
  openId?: string;
  firstName?: string;
  lastName?: string;
  country?: string;
  city?: string;
  organization?: string;
  contribution: number;
  rank: string;
  rating: number;
  maxRank: string;
  maxRating: number;
  lastOnlineTimeSeconds: number;
  registrationTimeSeconds: number;
  friendOfCount: number;
  avatar: string;
  titlePhoto: string;
}

export interface CFRatingChange {
  contestId: number;
  contestName: string;
  handle: string;
  rank: number;
  ratingUpdateTimeSeconds: number;
  oldRating: number;
  newRating: number;
}
