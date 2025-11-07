import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/useAuth';
import type { Post } from '../../../types';

type RippleListProps = { 
  posts: Post[]; 
  activeTab: 'all' | 'mine';
  onPostsChange?: (posts: Post[]) => void;
};

// Updated API response type to match your backend
type ApiPost = {
  _id: string;
  user: {
    _id: string;
    username: string;
    email: string;
  };
  mood: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

// Static fallback data
const staticAllPosts: Post[] = [
  {
    id: 'post1',
    type: 'high',
    content: "Today I finally nailed my coding interview! Felt amazing to solve that complex problem under time pressure.",
    date: new Date('2025-10-10'),
    points: 10,
    user: { id: '1', username: 'JohnDoe', email: 'john@example.com' }
  },
  {
    id: 'post2',
    type: 'low',
    content: "Had a tough day feeling overwhelmed with deadlines and challenges. But I'm trying to stay positive.",
    date: new Date('2025-10-11'),
    points: 7,
    user: { id: '2', username: 'JaneSmith', email: 'jane@example.com' }
  },
  {
    id: 'post3',
    type: 'high',
    content: "Small wins count! I managed to improve my workout endurance this week and I feel healthier already.",
    date: new Date('2025-10-12'),
    points: 8,
    user: { id: '3', username: 'AlexBrown', email: 'alex@example.com' }
  },
];

const staticMyPosts: Post[] = [
  {
    id: 'mypost1',
    type: 'high',
    content: "Grateful for the small joys today — had coffee with a friend and it lifted my mood instantly.",
    date: new Date('2025-10-09'),
    points: 6,
    user: { id: 'me', username: 'CurrentUser', email: 'me@example.com' }
  },
  {
    id: 'mypost2',
    type: 'low',
    content: "Feeling burnt out after continuous assignments. Need a mental break soon.",
    date: new Date('2025-10-11'),
    points: 5,
    user: { id: 'me', username: 'CurrentUser', email: 'me@example.com' }
  },
];

// Get initials from username
// const getInitials = (username: string): string => {
//   if (!username) return '??';
  
//   const parts = username.trim().split(/\s+/);
//   if (parts.length >= 2) {
//     return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
//   }
//   return username.substring(0, 2).toUpperCase();
// };

// Transform API post to app Post type
const transformApiPost = (apiPost: ApiPost): Post => {
  console.log('Transforming post:', apiPost._id, 'mood:', apiPost.mood);
  const moodType = apiPost.mood.toLowerCase().trim() === 'high' ? 'high' : 'low';
  console.log('Mapped to type:', moodType);
  
  return {
    id: apiPost._id,
    type: moodType,
    content: apiPost.content,
    date: new Date(apiPost.createdAt),
    points: 0,
    createdAt: new Date(apiPost.createdAt),
    user: {
      id: apiPost.user._id,
      username: apiPost.user.username,
      email: apiPost.user.email,
    },
  };
};

export const RippleList = ({ posts, activeTab, onPostsChange }: RippleListProps) => {
  const { token } = useAuth();
  const [apiPosts, setApiPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!token) {
        const fallbackPosts = activeTab === 'mine' ? staticMyPosts : staticAllPosts;
        setApiPosts(fallbackPosts);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const baseUrl = import.meta.env.VITE_BASE_URL || 'https://rippletalk-8.onrender.com';
        const endpoint = activeTab === 'mine' ? '/my-posts' : '/ripple';
        
        const response = await fetch(`${baseUrl}${endpoint}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch posts: ${response.statusText}`);
        }

        const data: ApiPost[] = await response.json();
        
        const sortedData = data.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        
        const transformedPosts = sortedData.map(transformApiPost);
        setApiPosts(transformedPosts);
        
        if (onPostsChange) {
          onPostsChange(transformedPosts);
        }
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch posts');
        
        const fallbackPosts = activeTab === 'mine' ? staticMyPosts : staticAllPosts;
        setApiPosts(fallbackPosts);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [activeTab, token, onPostsChange]);

  const displayPosts = posts.length > 0 ? posts : apiPosts;

  if (isLoading) {
    return (
      <div className="text-center text-gray-400 py-8">
        <div className="animate-pulse">Loading posts...</div>
      </div>
    );
  }

  if (error && displayPosts.length === 0) {
    return (
      <div className="text-center text-red-400 py-8">
        <p>{error}</p>
        <p className="text-sm mt-2">Showing fallback data</p>
      </div>
    );
  }

  if (displayPosts.length === 0) {
    return (
      <p className="text-center text-gray-400 py-8">
        {activeTab === 'mine' 
          ? "You haven't created any posts yet" 
          : "No posts found"}
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {displayPosts.map((post) => {
        const isHigh = post.type === 'high';
        
        return (
          <div
            key={post.id}
            className="bg-white rounded-lg p-4 shadow hover:shadow-green-200 transition-shadow"
          >
            <p className="font-semibold text-green-600">
              {isHigh ? 'High Moment ✨' : 'Low Moment 🌊'}
            </p>
            <p className="mt-2 text-gray-800">{post.content}</p>
            <p className="text-xs text-gray-500 mt-3">
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        );
      })}
    </div>
  );
};