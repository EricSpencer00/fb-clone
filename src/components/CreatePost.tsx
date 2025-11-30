import React, { useState } from 'react';
import { postsApi } from '../services/api';

interface Props {
  onPostCreated: () => void;
}

export default function CreatePost({ onPostCreated }: Props) {
  const [content, setContent] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [privacy, setPrivacy] = useState('public');
  const [showMediaInput, setShowMediaInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    setError('');

    try {
      await postsApi.create({
        content: content.trim(),
        media_url: mediaUrl.trim() || undefined,
        privacy_setting: privacy,
      });
      setContent('');
      setMediaUrl('');
      setShowMediaInput(false);
      onPostCreated();
    } catch (err: any) {
      setError(err.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow mb-4">
      <form onSubmit={handleSubmit} className="p-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full px-4 py-3 bg-gray-100 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
        />

        {showMediaInput && (
          <input
            type="url"
            value={mediaUrl}
            onChange={(e) => setMediaUrl(e.target.value)}
            placeholder="Enter image/video URL"
            className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}

        {error && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}

        <div className="mt-3 flex items-center justify-between border-t pt-3">
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setShowMediaInput(!showMediaInput)}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-lg hover:bg-gray-100 text-gray-600"
            >
              <span>🖼️</span>
              <span className="text-sm">Photo/Video</span>
            </button>

            <select
              value={privacy}
              onChange={(e) => setPrivacy(e.target.value)}
              className="px-3 py-1.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="public">🌍 Public</option>
              <option value="friends">👥 Friends</option>
              <option value="private">🔒 Only me</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={!content.trim() || loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Posting...' : 'Post'}
          </button>
        </div>
      </form>
    </div>
  );
}
