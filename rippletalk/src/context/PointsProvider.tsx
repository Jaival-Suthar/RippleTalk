import { useReducer, type ReactNode } from 'react';
import { PointsContext, type PointsState } from './pointsContext';

type PointsAction =
  | { type: 'ADD_POINTS'; payload: { action: string; points: number } }
  | { type: 'RESET' };

const pointsReducer = (state: PointsState, action: PointsAction): PointsState => {
  switch (action.type) {
    case 'ADD_POINTS':
      return {
        total: state.total + action.payload.points,
        history: [...state.history, { ...action.payload, date: new Date() }],
      };
    case 'RESET':
      return { total: 0, history: [] };
    default:
      return state;
  }
};

export const PointsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(pointsReducer, { total: 0, history: [] });

  const addPoints = (action: string, points: number) => {
    dispatch({ type: 'ADD_POINTS', payload: { action, points } });
  };

  return (
    <PointsContext.Provider value={{ state, addPoints }}>
      {children}
    </PointsContext.Provider>
  );
};
