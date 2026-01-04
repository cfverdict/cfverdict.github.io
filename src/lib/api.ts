import { CFSubmission, CFUser, CFRatingChange } from '@/types/cf';

const CF_API_BASE = 'https://codeforces.com/api';

async function fetchCF<T>(endpoint: string, params: Record<string, string | number>): Promise<T> {
  const url = new URL(`${CF_API_BASE}${endpoint}`);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, String(value));
  });

  // 使用 Next.js 的 fetch，默认会有缓存行为
  // 可以根据需要添加 { next: { revalidate: 3600 } } 来缓存 1 小时
  const res = await fetch(url.toString(), {
    next: { revalidate: 3600 } 
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const data = await res.json();

  if (data.status !== 'OK') {
    throw new Error(`CF API Error: ${data.comment}`);
  }

  return data.result as T;
}

export async function getUserInfo(handle: string): Promise<CFUser> {
  const result = await fetchCF<CFUser[]>('/user.info', { handles: handle });
  return result[0];
}

export async function getUserSubmissions(handle: string): Promise<CFSubmission[]> {
  return fetchCF<CFSubmission[]>('/user.status', { handle });
}

export async function getUserRatingHistory(handle: string): Promise<CFRatingChange[]> {
  return fetchCF<CFRatingChange[]>('/user.rating', { handle });
}
