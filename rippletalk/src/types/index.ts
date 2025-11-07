export interface User {
  id: string;
  username: string;
  email: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: User;
}

export interface Post {
  id: string;
  type: 'high' | 'low';
  content: string;
  date: Date;
  points: number;
  createdAt?: Date;
  user?: {
    id: string;
    username: string;
    email: string;
  };
}

export interface ChartDataPoint {
  date: string;
  mood: number;
}

export interface PointsHistory {
  action: string;
  points: number;
  date: Date;
  postId?: string;
}

export interface PointsState {
  total: number;
  history: PointsHistory[];
}