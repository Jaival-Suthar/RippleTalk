import { createContext } from 'react';

export interface PointsState {
  total: number;
  history: { action: string; points: number; date: Date }[];
}

export const PointsContext = createContext<{
  state: PointsState;
  addPoints: (action: string, points: number) => void;
} | undefined>(undefined);
