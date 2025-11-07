import { useState, useEffect } from 'react';
import { useAuth } from '../../context/useAuth';
import { RipplesTabs } from './components/RipplesTabs';
import { RippleList } from './components/RippleList';
import type { Post } from '../../types';

// --- API response type ---
type ApiPost = {
  _id: string;
  user: string;
  mood: string;
  content: string;
  createdAt: string;
};

// Transform API post to app Post type
const transformApiPost = (apiPost: ApiPost): Post => ({
  id: apiPost._id,
  type: apiPost.mood.toLowerCase().trim() === 'high' ? 'high' : 'low',
  content: apiPost.content,
  date: new Date(apiPost.createdAt),
  points: 0,
});

export const RipplesPage = () => {
  const { token } = useAuth();
  const [activeTabKey, setActiveTabKey] = useState<'all' | 'mine'>('all');
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchPosts = async () => {
      // If no token, let RippleList handle fallback
      if (!token) {
        setPosts([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const baseUrl = import.meta.env.VITE_BASE_URL || 'https://rippletalk-8.onrender.com';
        const endpoint = activeTabKey === 'mine' ? '/my-posts' : '/ripple';

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
        
        if (!cancelled) {
          const transformedPosts = data.map(transformApiPost);
          setPosts(transformedPosts);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          console.warn(`⚠️ API fetch failed for tab: ${activeTabKey}. Using fallback data.`);
          setError(null); // fallback is expected
          setPosts([]); // fallback handled inside RippleList
          setLoading(false);
        }
      }
    };

    fetchPosts();

    return () => {
      cancelled = true;
    };
  }, [activeTabKey, token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50 p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Ripples</h1>

      <RipplesTabs
        activeTabKey={activeTabKey}
        onTabChange={(key) => setActiveTabKey(key as 'all' | 'mine')}
      />

      {loading && (
        <div className="text-center text-gray-500 py-8">
          <div className="animate-pulse">Loading posts...</div>
        </div>
      )}
      
      {error && <p className="text-center text-red-500 mb-4">{error}</p>}

      {!loading && <RippleList posts={posts} activeTab={activeTabKey} />}
    </div>
  );
};