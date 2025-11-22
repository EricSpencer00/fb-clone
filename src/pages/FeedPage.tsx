import React, { useState, useEffect } from 'react';
import { getFeed } from '@/src/services/api';
import { PostCard } from '@/src/components/Post/PostCard';
import { CreatePostModal } from '@/src/components/Post/CreatePostModal';
import { Loader } from 'lucide-react';

export function FeedPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const currentUserId = parseInt(localStorage.getItem('userId') || '0', 10);

  const loadFeed = async () => {
    try {
      setLoading(true);
      const res = await getFeed();
      setPosts(res.feed || []);
    } catch (e) {
      console.error('Feed error:', e);
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
