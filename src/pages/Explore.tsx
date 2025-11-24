import React, { useEffect, useState } from 'react';
import { Loader } from 'lucide-react';
import { getExplorePosts } from '@/src/services/api';
import { PostCard } from '@/src/components/Post/PostCard';
import { useAuth } from '@/src/hooks/useAuth';

export default function ExplorePage() {
  const { isAuthenticated } = useAuth();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const currentUserId = parseInt(localStorage.getItem('userId') || '0', 10);

  useEffect(() => {
    if (!isAuthenticated && !localStorage.getItem('authToken')) return;
    loadExplore();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadExplore() {
    try {
      setLoading(true);
      setError(null);
      const res = await getExplorePosts();
      setPosts(res.feed || []);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.error('Explore load error:', msg);
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Explore</h1>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded text-red-700">{error}</div>
      )}

      {loading && posts.length === 0 ? (
        <div className="flex justify-center p-8"><Loader className="animate-spin" /></div>
      ) : posts.length === 0 ? (
        <div className="text-center p-8 text-gray-500">No posts found</div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post.id || Math.random()} post={post} currentUserId={currentUserId} />
          ))}
        </div>
      )}
    </div>
  );
}
