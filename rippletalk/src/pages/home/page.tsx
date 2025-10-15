import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserInfo } from './components/UserInfo';
import { RecentPosts } from './components/RecentPosts';
import { fetchRecentPosts } from '../../utils/mockApi';
import { usePoints } from '../../context/usePoints';
import type { Post } from '../../types';

export const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { state } = usePoints();

  useEffect(() => {
    fetchRecentPosts().then(data => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  // Calculate streak (consecutive days with entries)
  const calculateStreak = () => {
    if (posts.length === 0) return 0;
    
    const sortedDates = posts
      .map(p => new Date(p.date).toDateString())
      .filter((date, index, self) => self.indexOf(date) === index)
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
    
    let streak = 0;
    const today = new Date();
    
    for (let i = 0; i < sortedDates.length; i++) {
      const expectedDate = new Date(today);
      expectedDate.setDate(today.getDate() - i);
      
      if (sortedDates[i] === expectedDate.toDateString()) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const streak = calculateStreak();
  const todayPosts = posts.filter(p => 
    new Date(p.date).toDateString() === new Date().toDateString()
  );

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
                <p className="text-3xl font-bold text-white">{streak}</p>
                <span className="text-xs bg-orange-700 text-orange-100 px-2 py-1 rounded mt-2 inline-block font-semibold">
                  +{streak * 5} pts
                </span>
              </div>
              <div className="text-4xl">🔥</div>
            </div>
          </div>

          {/* Total Entries */}
          <div className="bg-gray-900 rounded-lg shadow-md p-5 border-l-4 border-blue-400 flex flex-col">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-300 font-semibold mb-1">Total Entries</p>
                <p className="text-3xl font-bold text-white">{posts.length}</p>
                <span className="text-xs bg-blue-700 text-blue-100 px-2 py-1 rounded mt-2 inline-block font-semibold">
                  +{posts.length * 10} pts
                </span>
              </div>
              <div className="text-4xl">📝</div>
            </div>
          </div>

          {/* Today’s Entries */}
          <div className="bg-gray-900 rounded-lg shadow-md p-5 border-l-4 border-green-400 flex flex-col">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-300 font-semibold mb-1">Today</p>
                <p className="text-3xl font-bold text-white">{todayPosts.length}</p>
                <span className="text-xs bg-green-700 text-green-100 px-2 py-1 rounded mt-2 inline-block font-semibold">
                  +{todayPosts.length * 10} pts
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


        {/* Recent Posts Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <RecentPosts posts={posts} loading={loading} />
        </div>
      </div>
    </div>
  );
};