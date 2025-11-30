import React, { useState, useEffect } from 'react';
import { postsApi } from '../services/api';
import PostCard from '../components/PostCard';
import CreatePost from '../components/CreatePost';
import AdsSidebar from '../components/AdsSidebar';

interface Post {
  id: number;
  user_id: number;
  username: string;
  name: string;
  profile_photo?: string;
  content: string;
  media_url?: string;
  privacy_setting: string;
  post_date: string;
  like_count: number;
  comment_count: number;
  liked_by_me: boolean;
  isAd?: boolean;
}

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPosts = async () => {
    try {
      const { feed } = await postsApi.getFeed();
      // Filter out ads for now, show only posts
      setPosts(feed.filter((item: any) => !item.isAd));
    } catch (error) {
      console.error('Failed to load posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handlePostCreated = () => {
    loadPosts();
  };

  const handlePostDelete = (postId: number) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
  };

  const handlePostUpdate = (updatedPost: Post) => {
    setPosts(prev => prev.map(p => (p.id === updatedPost.id ? updatedPost : p)));
  };

  // Transform post data to match PostCard expected format
  const transformPost = (post: Post) => ({
    ...post,
    author_name: post.name,
    author_username: post.username,
    user_liked: post.liked_by_me,
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex gap-6">
        {/* Main Feed */}
        <div className="flex-1 max-w-xl mx-auto lg:mx-0">
          <CreatePost onPostCreated={handlePostCreated} />

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
              <p className="mt-2 text-gray-500">Loading posts...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-500 text-lg">No posts yet</p>
              <p className="text-gray-400 mt-2">Be the first to post something!</p>
            </div>
          ) : (
            posts.map(post => (
              <PostCard
                key={post.id}
                post={transformPost(post) as any}
                onDelete={() => handlePostDelete(post.id)}
                onUpdate={(updated) => handlePostUpdate(updated as any)}
              />
            ))
          )}
        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:block w-80 flex-shrink-0">
          <div className="sticky top-20">
            <AdsSidebar />
            
            {/* Footer Links */}
            <div className="mt-4 text-xs text-gray-500 space-y-2">
              <p>Privacy · Terms · Advertising · Cookies</p>
              <p>© 2024 GraceNook</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
