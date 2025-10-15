import type { Post } from '../../../types';

type RippleListProps = { posts: Post[]; activeTab: 'all' | 'mine' };

// --- Static fallback data ---
const staticAllPosts: Post[] = [
  {
    id: 'post1',
    type: 'high',
    content: "Today I finally nailed my coding interview! Felt amazing to solve that complex problem under time pressure.",
    date: new Date('2025-10-10'),
    points: 10,
  },
  {
    id: 'post2',
    type: 'low',
    content: "Had a tough day feeling overwhelmed with deadlines and challenges. But I'm trying to stay positive.",
    date: new Date('2025-10-11'),
    points: 7,
  },
  {
    id: 'post3',
    type: 'high',
    content: "Small wins count! I managed to improve my workout endurance this week and I feel healthier already.",
    date: new Date('2025-10-12'),
    points: 8,
  },
];

const staticMyPosts: Post[] = [
  {
    id: 'mypost1',
    type: 'high',
    content: "Grateful for the small joys today — had coffee with a friend and it lifted my mood instantly.",
    date: new Date('2025-10-09'),
    points: 6,
  },
  {
    id: 'mypost2',
    type: 'low',
    content: "Feeling burnt out after continuous assignments. Need a mental break soon.",
    date: new Date('2025-10-11'),
    points: 5,
  },
];

export const RippleList = ({ posts, activeTab }: RippleListProps) => {
  const fallbackPosts = activeTab === 'mine' ? staticMyPosts : staticAllPosts;
  const displayPosts = posts.length ? posts : fallbackPosts;

  if (displayPosts.length === 0)
    return <p className="text-center text-gray-400 py-8">No posts found</p>;

  return (
    <div className="space-y-4">
      {displayPosts.map((post) => (
        <div
          key={post.id}
          className="bg-white rounded-lg p-4 shadow hover:shadow-green-200 transition-shadow"
        >
          <p className="font-semibold text-green-600">
            {post.type === 'high' ? '😊 High Moment' : '💭 Low Moment'}
          </p>
          <p>{post.content}</p>
          <p className="text-xs text-gray-500 mt-1">
            {new Date(post.date).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
};
