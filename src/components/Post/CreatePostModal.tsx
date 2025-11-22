import React, { useState } from 'react';
import { ImagePlus, Loader } from 'lucide-react';
import { createPost } from '@/src/services/api';

interface CreatePostProps {
  onPostCreated?: () => void;
}

export function CreatePostModal({ onPostCreated }: CreatePostProps) {
  const [content, setContent] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [privacy, setPrivacy] = useState('public');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    try {
      setLoading(true);
      await createPost(content, mediaUrl || undefined, privacy);
      setContent('');
      setMediaUrl('');
      setPrivacy('public');
      setIsOpen(false);
      onPostCreated?.();
    } catch (err) {
      console.error('Post creation error:', err);
      alert('Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
      >
        + New Post
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Create Post</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full p-3 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
          <input
            type="text"
            value={mediaUrl}
            onChange={(e) => setMediaUrl(e.target.value)}
            placeholder="Image URL (optional)"
            className="w-full p-2 border rounded mb-3 text-sm"
          />
          <div className="mb-3">
            <label className="text-sm font-semibold block mb-1">Privacy</label>
            <select
              value={privacy}
              onChange={(e) => setPrivacy(e.target.value)}
              className="w-full p-2 border rounded text-sm"
            >
              <option value="public">Public</option>
              <option value="friends">Friends Only</option>
              <option value="private">Private</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex-1 py-2 border rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !content.trim()}
              className="flex-1 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 flex items-center justify-center gap-1"
            >
              {loading ? <Loader size={18} className="animate-spin" /> : <ImagePlus size={18} />}
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
