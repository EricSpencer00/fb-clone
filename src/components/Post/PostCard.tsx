import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, Trash2, Loader } from 'lucide-react';
import { toggleLike, addComment, getComments, recordAdClick, recordAdImpression, deletePost } from '@/src/services/api';

interface Post {
  id: number;
  user_id: number;
  content: string;
  media_url?: string;
  post_date: string;
  privacy_setting: string;
  like_count: number;
  ad?: { id: number; image_url: string; target_url: string; title: string };
}

interface PostCardProps {
  post: Post;
  currentUserId: number;
  onDeleted?: () => void;
  onCommented?: () => void;
}

export function PostCard({ post, currentUserId, onDeleted, onCommented }: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<any[]>([]);
  const [showComments, setShowComments] = useState(false);
  const [loading, setLoading] = useState(false);

  const isAd = !!post.ad;

  if (isAd) {
    return (
      <div className="bg-white rounded-lg shadow p-4 mb-4 border border-yellow-200">
        <p className="text-xs text-gray-500 mb-2">Sponsored</p>
        <a 
          href={post.ad.target_url} 
          target="_blank" 
          rel="noopener noreferrer"
          onClick={() => recordAdClick(post.ad.id).catch(console.error)}
        >
          <img src={post.ad.image_url} alt={post.ad.title} className="w-full h-32 object-cover rounded mb-2" />
          <p className="font-semibold text-sm">{post.ad.title}</p>
        </a>
      </div>
    );
  }

  const handleLike = async () => {
    try {
      await toggleLike(post.id);
      setLiked(!liked);
    } catch (e) {
      console.error('Like error:', e);
    }
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    try {
      setLoading(true);
      await addComment(post.id, commentText);
      setCommentText('');
      onCommented?.();
      // Reload comments
      const res = await getComments(post.id);
      setComments(res.comments || []);
    } catch (e) {
      console.error('Comment error:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadComments = async () => {
    if (showComments) {
      setShowComments(false);
      return;
    }
    try {
      setLoading(true);
      const res = await getComments(post.id);
      setComments(res.comments || []);
      setShowComments(true);
    } catch (e) {
      console.error('Load comments error:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Delete this post?')) return;
    try {
      await deletePost(post.id);
      onDeleted?.();
    } catch (e) {
      console.error('Delete error:', e);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow mb-4 overflow-hidden">
      <div className="p-4 border-b">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-semibold">User #{post.user_id}</p>
            <p className="text-xs text-gray-500">{new Date(post.post_date).toLocaleString()}</p>
          </div>
          {post.user_id === currentUserId && (
            <button onClick={handleDelete} className="text-red-500 hover:bg-red-50 p-2 rounded">
              <Trash2 size={18} />
            </button>
          )}
        </div>
      </div>
      {post.content && <div className="p-4 text-gray-800">{post.content}</div>}
      {post.media_url && (
        <img src={post.media_url} alt="post" className="w-full h-64 object-cover" />
      )}
      <div className="p-4 border-t flex gap-4">
        <button onClick={handleLike} className={`flex items-center gap-1 ${liked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500`}>
          <Heart size={20} fill={liked ? 'currentColor' : 'none'} />
          <span className="text-sm">{post.like_count}</span>
        </button>
        <button onClick={handleLoadComments} className="flex items-center gap-1 text-gray-500 hover:text-blue-500">
          <MessageCircle size={20} />
          <span className="text-sm">{comments.length}</span>
        </button>
        <button className="flex items-center gap-1 text-gray-500 hover:text-green-500">
          <Share2 size={20} />
        </button>
      </div>

      {showComments && (
        <div className="p-4 bg-gray-50 border-t">
          <div className="mb-3 max-h-40 overflow-y-auto">
            {comments.map((c) => (
              <div key={c.id} className="mb-2 text-sm">
                <p className="font-semibold text-xs">{c.username}</p>
                <p className="text-gray-700">{c.text}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
              className="flex-1 text-sm border rounded px-2 py-1"
            />
            <button
              onClick={handleAddComment}
              disabled={loading || !commentText.trim()}
              className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 disabled:bg-gray-300"
            >
              {loading ? <Loader size={16} className="animate-spin" /> : 'Post'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
