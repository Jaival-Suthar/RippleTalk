import type { Post } from '../../../types';

export const RecentPosts = ({ posts, loading }: { posts: Post[]; loading: boolean }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-pulse space-y-4 w-full">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No entries yet</h3>
        <p className="text-gray-500">Start your journey by creating your first entry!</p>
      </div>
    );
  }

  const formatDate = (date: Date) => {
    const d = new Date(date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (d.toDateString() === today.toDateString()) return 'Today';
    if (d.toDateString() === yesterday.toDateString()) return 'Yesterday';
    
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'high':
        return {
          bg: 'bg-green-50 border-green-200',
          badge: 'bg-green-100 text-green-700',
          icon: '🎉',
        };
      case 'low':
        return {
          bg: 'bg-red-50 border-red-200',
          badge: 'bg-red-100 text-red-700',
          icon: '💭',
        };
      default:
        return {
          bg: 'bg-gray-50 border-gray-200',
          badge: 'bg-gray-100 text-gray-700',
          icon: '📝',
        };
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Recent Entries</h3>
        <span className="text-sm text-gray-500">{posts.length} total</span>
      </div>
      
      <div className="space-y-3">
        {posts.map((post) => {
          const styles = getTypeStyles(post.type);
          return (
            <div
              key={post.id}
              className={`p-4 border-l-4 ${styles.bg} rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{styles.icon}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${styles.badge}`}>
                      {post.type}
                    </span>
                    {post.date && (
                      <span className="text-xs text-gray-500">
                        {formatDate(post.date)}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700 leading-relaxed">{post.content}</p>
                </div>
                
                <div className="flex flex-col items-end gap-1">
                  <div className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-bold text-sm whitespace-nowrap">
                    +{post.points} pts
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};