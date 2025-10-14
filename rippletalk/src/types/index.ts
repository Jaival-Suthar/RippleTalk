export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Post {
  id: string;
  type: 'high' | 'low';
  content: string;
  date: Date;  // Changed from timestamp to date for consistency
  points: number;
  createdAt?: Date;  // Optional: for tracking creation time separately
}

export interface ChartDataPoint {
  date: string;
  mood: number;
}

export interface PointsHistory {
  action: string;
  points: number;
  date: Date;
  postId?: string;  // Optional: link back to the post
}

export interface PointsState {
  total: number;
  history: PointsHistory[];
}