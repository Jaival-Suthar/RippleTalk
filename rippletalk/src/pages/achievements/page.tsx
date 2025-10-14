import { PointsDisplay } from './components/PointsDisplay';
import { RewardsList } from './components/RewardsList';
import { usePoints } from '../../context/usePoints';

export const AchievementsPage = () => {
  const { state } = usePoints();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Your Achievements
        </h1>
        
        <div className="space-y-6">
          <PointsDisplay total={state.total} />
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <RewardsList history={state.history} />
          </div>
          
          {state.history.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">No achievements yet!</p>
              <p className="mt-2">Start tracking your progress to earn points.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};