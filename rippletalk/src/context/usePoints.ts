import { useContext } from 'react';
// After:
import { PointsContext } from './pointsContext';

export const usePoints = () => {
  const ctx = useContext(PointsContext);
  if (!ctx) throw new Error('usePoints must be used within PointsProvider');
  return ctx;
};
