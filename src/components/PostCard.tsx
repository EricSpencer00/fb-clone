import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { postsApi } from '../services/api';
import { useAuth } from '../context/AuthContext';

interface Post {
  id: number;
  user_id: number;
  author_name: string;
  author_username: string;
  content: string;
  media_url?: string;
  privacy_setting: string;
  post_date: string;
  like_count: number;
  comment_count: number;
  user_liked: boolean;
}

interface Comment {
  id: number;
  user_id: number;
  author_name: string;
  author_username: string;
  content: string;
  created_at: string;
}

interface Props {
  post: Post;
  onDelete?: () => void;
  onUpdate?: (updatedPost: Post) => void;
}

export default function PostCard({ post, onDelete, onUpdate }: Props) {
  const { user } = useAuth();
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loadingComments, setLoadingComments] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [isLiking, setIsLiking] = useState(false);
  const [localPost, setLocalPost] = useState(post);

  const isOwner = user?.id === post.user_id;
  const isAdmin = user?.role === 'admin';

  const loadComments = async () => {
    setLoadingComments(true);
    try {
      const { comments } = await postsApi.getComments(post.id);
      setComments(comments);
    } catch (error) {
      console.error('Failed to load comments:', error);
    } finally {
      setLoadingComments(false);
    }
  };

  const handleToggleComments = () => {
    if (!showComments && comments.length === 0) {
      loadComments();
    }
    setShowComments(!showComments);
  };

  const handleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);
    try {
      const { liked } = await postsApi.like(post.id);
      const updatedPost = {
        ...localPost,
        user_liked: liked,
        like_count: liked ? localPost.like_count + 1 : localPost.like_count - 1,
      };
      setLocalPost(updatedPost);
      onUpdate?.(updatedPost);
    } catch (error) {
      console.error('Failed to like post:', error);
    } finally {
      setIsLiking(false);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      await postsApi.addComment(post.id, newComment);
      setNewComment('');
      loadComments();
      setLocalPost(prev => ({ ...prev, comment_count: prev.comment_count + 1 }));
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    try {
      await postsApi.delete(post.id);
      onDelete?.();
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  const handleReport = async () => {
    if (!reportReason.trim()) return;
    try {
      await postsApi.report(post.id, reportReason);
      setShowReportModal(false);
      setReportReason('');
      alert('Post reported successfully');
    } catch (error) {
      console.error('Failed to report post:', error);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-lg shadow mb-4">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <Link to={`/profile/${post.user_id}`} className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
            {post.author_name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div>
            <p className="font-semibold text-gray-900 hover:underline">
              {post.author_name}
            </p>
            <p className="text-sm text-gray-500">
              @{post.author_username} · {formatDate(post.post_date)}
              {post.privacy_setting !== 'public' && (
                <span className="ml-1">
                  {post.privacy_setting === 'friends' ? '👥' : '🔒'}
                </span>
              )}
            </p>
          </div>
        </Link>

        {/* Post menu */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            ⋯
          </button>
          {showMenu && (
            <div className="absolute right-0 mt-1 w-40 bg-white rounded-lg shadow-lg border py-1 z-10">
              {(isOwner || isAdmin) && (
                <button
                  onClick={() => {
                    handleDelete();
                    setShowMenu(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                >
                  🗑️ Delete
                </button>
              )}
              {!isOwner && (
                <button
                  onClick={() => {
                    setShowReportModal(true);
                    setShowMenu(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  🚩 Report
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-2">
        <p className="text-gray-900 whitespace-pre-wrap">{localPost.content}</p>
      </div>

      {/* Media */}
      {localPost.media_url && (
        <div className="px-4 pb-2">
          <img
            src={localPost.media_url}
            alt="Post media"
            className="rounded-lg max-h-96 w-full object-cover"
          />
        </div>
      )}

      {/* Stats */}
      <div className="px-4 py-2 flex items-center justify-between text-sm text-gray-500 border-t border-b">
        <span>{localPost.like_count} likes</span>
        <span>{localPost.comment_count} comments</span>
      </div>

      {/* Actions */}
      <div className="px-4 py-2 flex items-center justify-around">
        <button
          onClick={handleLike}
          disabled={isLiking}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors ${
            localPost.user_liked ? 'text-red-500' : 'text-gray-600'
          }`}
        >
          <span>{localPost.user_liked ? '❤️' : '🤍'}</span>
          <span>Like</span>
        </button>
        <button
          onClick={handleToggleComments}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-600"
        >
          <span>💬</span>
          <span>Comment</span>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="border-t">
          {/* Comment Form */}
          <form onSubmit={handleAddComment} className="p-4 flex space-x-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50"
            >
              Post
            </button>
          </form>

          {/* Comments List */}
          <div className="px-4 pb-4">
            {loadingComments ? (
              <div className="text-center py-4">
                <div className="animate-spin inline-block w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full"></div>
              </div>
            ) : comments.length === 0 ? (
              <p className="text-gray-500 text-center py-2">No comments yet</p>
            ) : (
              comments.map(comment => (
                <div key={comment.id} className="flex space-x-3 mb-3">
                  <Link to={`/profile/${comment.user_id}`}>
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-semibold">
                      {comment.author_name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                  </Link>
                  <div className="flex-1 bg-gray-100 rounded-lg p-2">
                    <Link to={`/profile/${comment.user_id}`} className="font-semibold text-sm hover:underline">
                      {comment.author_name}
                    </Link>
                    <p className="text-sm text-gray-800">{comment.content}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Report Post</h3>
            <textarea
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              placeholder="Why are you reporting this post?"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={4}
            />
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => setShowReportModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleReport}
                disabled={!reportReason.trim()}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
