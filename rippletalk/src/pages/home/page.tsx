import { Link } from 'react-router-dom';
import { UserInfo } from './components/UserInfo';
import { usePoints } from '../../context/usePoints';

export const HomePage = () => {
  const { state } = usePoints();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50">
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* User Info Section */}
        <UserInfo />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Points */}
          <div className="bg-gray-900 rounded-lg shadow-md p-5 border-l-4 border-yellow-400 flex flex-col">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-300 font-semibold mb-1">Total Points</p>
                <p className="text-3xl font-bold text-white">{state.total}</p>
                <span className="text-xs bg-yellow-700 text-yellow-100 px-2 py-1 rounded mt-2 inline-block font-semibold">All earned</span>
              </div>
              <div className="text-4xl">🏆</div>
            </div>
          </div>

          {/* Day Streak */}
          <div className="bg-gray-900 rounded-lg shadow-md p-5 border-l-4 border-orange-400 flex flex-col">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-300 font-semibold mb-1">Day Streak</p>
                <p className="text-3xl font-bold text-white">0</p>
                <span className="text-xs bg-orange-700 text-orange-100 px-2 py-1 rounded mt-2 inline-block font-semibold">
                  Coming soon
                </span>
              </div>
              <div className="text-4xl">🔥</div>
            </div>
          </div>

          {/* Activity Level */}
          <div className="bg-gray-900 rounded-lg shadow-md p-5 border-l-4 border-blue-400 flex flex-col">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-300 font-semibold mb-1">Activity Level</p>
                <p className="text-3xl font-bold text-white">Active</p>
                <span className="text-xs bg-blue-700 text-blue-100 px-2 py-1 rounded mt-2 inline-block font-semibold">
                  Keep it up!
                </span>
              </div>
              <div className="text-4xl">📝</div>
            </div>
          </div>

          {/* Mood Status */}
          <div className="bg-gray-900 rounded-lg shadow-md p-5 border-l-4 border-green-400 flex flex-col">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-300 font-semibold mb-1">Mood Status</p>
                <p className="text-3xl font-bold text-white">Good</p>
                <span className="text-xs bg-green-700 text-green-100 px-2 py-1 rounded mt-2 inline-block font-semibold">
                  Feeling great
                </span>
              </div>
              <div className="text-4xl">✨</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-50 rounded-xl shadow-lg p-5">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              to="/new"
              className="flex items-center gap-3 p-4 bg-white border-l-4 border-green-400 rounded-lg hover:shadow-lg transition-all"
            >
              <span className="text-3xl text-green-400">➕</span>
              <div>
                <p className="font-semibold text-gray-900">New Entry</p>
                <p className="text-xs text-gray-500">Log your mood</p>
              </div>
            </Link>

            <Link
              to="/progress"
              className="flex items-center gap-3 p-4 bg-white border-l-4 border-blue-400 rounded-lg hover:shadow-lg transition-all"
            >
              <span className="text-3xl text-blue-400">📊</span>
              <div>
                <p className="font-semibold text-gray-900">View Progress</p>
                <p className="text-xs text-gray-500">See your stats</p>
              </div>
            </Link>

            <Link
              to="/achievements"
              className="flex items-center gap-3 p-4 bg-white border-l-4 border-purple-400 rounded-lg hover:shadow-lg transition-all"
            >
              <span className="text-3xl text-purple-400">🎖️</span>
              <div>
                <p className="font-semibold text-gray-900">Achievements</p>
                <p className="text-xs text-gray-500">View rewards</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};