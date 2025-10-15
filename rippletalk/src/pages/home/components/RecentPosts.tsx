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
        bg: 'bg-green-300 border-green-500',          // dark green background
        badge: 'bg-green-900 text-green-100',         // saturated green badge
        icon: '🎉',
      };
    case 'low':
      return {
        bg: 'bg-red-300 border-red-500',              // dark red background
        badge: 'bg-red-900 text-red-100',              // saturated red badge
        icon: '💭',
      };
    default:
      return {
        bg: 'bg-gray-800 border-gray-600',            // dark gray background
        badge: 'bg-gray-700 text-gray-200',           // muted gray badge
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
              className={`p-4 border-l-4 ${styles.bg} rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{styles.icon}</span>
                    <span className={`px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${styles.badge} shadow-sm`}>
                      {post.type}
                    </span>
                    {post.date && (
                      <span className="text-xs text-black-400 ml-auto font-mono tracking-wide">
                        {formatDate(post.date)}
                      </span>
                    )}
                  </div>
                  <p className="text-black-100 leading-relaxed font-sans">{post.content}</p>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <div className="bg-yellow-600 text-yellow-100 px-4 py-1 rounded-full font-bold text-sm whitespace-nowrap shadow-md">
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