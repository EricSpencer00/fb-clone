import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFeed } from '@/src/services/api';
import { useAuth } from '@/src/hooks/useAuth';
import { PostCard } from '@/src/components/Post/PostCard';
import { CreatePostModal } from '@/src/components/Post/CreatePostModal';
import { Loader } from 'lucide-react';

export function FeedPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const currentUserId = parseInt(localStorage.getItem('userId') || '0', 10);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated && !localStorage.getItem('authToken')) {
      navigate('/auth/signin');
    }
  }, [isAuthenticated, navigate]);

  const loadFeed = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getFeed();
      setPosts(res.feed || []);
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : String(e);
      console.error('Feed error:', errorMsg);
      setError(errorMsg);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeed();
  }, []);

  const handlePostDeleted = () => {
    loadFeed();
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="mb-4">
        <CreatePostModal onPostCreated={loadFeed} />
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded text-red-700">
          <strong>Error:</strong> {error}
        </div>
      )}

      {loading && posts.length === 0 ? (
        <div className="flex justify-center p-8">
          <Loader className="animate-spin" />
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center p-8 text-gray-500">No posts yet. Start following friends!</div>
      ) : (
        <div>
          {posts.map((post) => (
            <PostCard
              key={post.id || Math.random()}
              post={post}
              currentUserId={currentUserId}
              onDeleted={handlePostDeleted}
              onCommented={loadFeed}
            />
          ))}
        </div>
      )}
    </div>
  );
}
