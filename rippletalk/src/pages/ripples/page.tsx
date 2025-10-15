import { useState, useEffect } from 'react';
import { RipplesTabs } from './components/RipplesTabs';
import { RippleList } from './components/RippleList';
import type { Post } from '../../types';

// --- API fetchers ---
async function fetchAllPosts(): Promise<Post[]> {
  const res = await fetch('/api/posts');
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

async function fetchMyPosts(): Promise<Post[]> {
  const res = await fetch('/api/my-posts');
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

const tabFetchers = {
  all: fetchAllPosts,
  mine: fetchMyPosts,
};

export const RipplesPage = () => {
  const [activeTabKey, setActiveTabKey] = useState<'all' | 'mine'>('all');
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    const fetcher = tabFetchers[activeTabKey];

    fetcher()
      .then((data) => {
        if (!cancelled) {
          setPosts(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          console.warn(`⚠️ API fetch failed for tab: ${activeTabKey}. Using fallback data.`);
          setError(null); // remove red text — fallback is expected
          setPosts([]); // fallback handled inside RippleList
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [activeTabKey]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50 p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Ripples</h1>

      <RipplesTabs
        activeTabKey={activeTabKey}
        onTabChange={(key) => setActiveTabKey(key as 'all' | 'mine')}
      />

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500 mb-4">{error}</p>}

      {!loading && <RippleList posts={posts} activeTab={activeTabKey} />}
    </div>
  );
};
