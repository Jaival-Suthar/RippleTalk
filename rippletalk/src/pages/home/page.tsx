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
          <div className="bg-white rounded-lg shadow-md p-5 border-l-4 border-yellow-400">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Points</p>
                <p className="text-3xl font-bold text-gray-800">{state.total}</p>
              </div>
              <div className="text-4xl">🏆</div>
            </div>
          </div>

          {/* Streak */}
          <div className="bg-white rounded-lg shadow-md p-5 border-l-4 border-orange-400">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Day Streak</p>
                <p className="text-3xl font-bold text-gray-800">{streak}</p>
              </div>
              <div className="text-4xl">🔥</div>
            </div>
          </div>

          {/* Total Entries */}
          <div className="bg-white rounded-lg shadow-md p-5 border-l-4 border-blue-400">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Entries</p>
                <p className="text-3xl font-bold text-gray-800">{posts.length}</p>
              </div>
              <div className="text-4xl">📝</div>
            </div>
          </div>

          {/* Today's Entries */}
          <div className="bg-white rounded-lg shadow-md p-5 border-l-4 border-green-400">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Today</p>
                <p className="text-3xl font-bold text-gray-800">{todayPosts.length}</p>
              </div>
              <div className="text-4xl">✨</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              to="/new"
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg"
            >
              <span className="text-2xl">➕</span>
              <div>
                <p className="font-semibold">New Entry</p>
                <p className="text-xs opacity-90">Log your mood</p>
              </div>
            </Link>

            <Link
              to="/progress"
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
            >
              <span className="text-2xl">📊</span>
              <div>
                <p className="font-semibold">View Progress</p>
                <p className="text-xs opacity-90">See your stats</p>
              </div>
            </Link>

            <Link
              to="/achievements"
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
            >
              <span className="text-2xl">🎖️</span>
              <div>
                <p className="font-semibold">Achievements</p>
                <p className="text-xs opacity-90">View rewards</p>
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