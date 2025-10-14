import type { Post, ChartDataPoint } from '../types';

export const fetchRecentPosts = async (): Promise<Post[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return [
    { id: '1', type: 'high', content: 'Got promoted!', timestamp: new Date(), points: 10 },
    { id: '2', type: 'low', content: 'Stressful day', timestamp: new Date(), points: 5 },
  ];
};

export const submitPost = async (type: 'high' | 'low', content: string): Promise<Post> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return { id: Date.now().toString(), type, content, timestamp: new Date(), points: type === 'high' ? 10 : 5 };
};

export const fetchChartData = async (): Promise<ChartDataPoint[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return [
    { date: '2024-10-01', mood: 7 },
    { date: '2024-10-02', mood: 5 },
    { date: '2024-10-03', mood: 8 },
    { date: '2024-10-04', mood: 6 },
    { date: '2024-10-05', mood: 9 },
  ];
};