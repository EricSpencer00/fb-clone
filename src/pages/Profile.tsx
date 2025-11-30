import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usersApi, postsApi, friendsApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import PostCard from '../components/PostCard';

interface UserProfile {
  id: number;
  username: string;
  name: string;
  email?: string;
  created_at: string;
  profile?: {
    bio?: string;
    privacy_setting: string;
    profile_photo?: string;
    language: string;
  };
}

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

export default function Profile() {
  const { userId } = useParams();
  const { user: currentUser, refreshUser } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [friendStatus, setFriendStatus] = useState<'none' | 'pending' | 'friends'>('none');

  // Edit form state
  const [editBio, setEditBio] = useState('');
  const [editPrivacy, setEditPrivacy] = useState('public');

  const profileUserId = userId ? parseInt(userId) : currentUser?.id;
  const isOwnProfile = profileUserId === currentUser?.id;

  useEffect(() => {
    if (profileUserId) {
      loadProfile();
      loadPosts();
      if (!isOwnProfile) {
        checkFriendStatus();
      }
    }
  }, [profileUserId]);

  const loadProfile = async () => {
    try {
      const { user } = await usersApi.getProfile(profileUserId!);
      setProfile(user);
      setEditBio(user.bio || '');
      setEditPrivacy(user.privacy_setting || 'public');
    } catch (error) {
      console.error('Failed to load profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadPosts = async () => {
    try {
      const { posts } = await postsApi.getUserPosts(profileUserId!);
      setPosts(posts);
    } catch (error) {
      console.error('Failed to load posts:', error);
    }
  };

  const checkFriendStatus = async () => {
    try {
      const { friends } = await friendsApi.getList();
      const isFriend = friends.some((f: any) => f.friend_id === profileUserId);
      if (isFriend) {
        setFriendStatus('friends');
        return;
      }

      const { outgoing } = await friendsApi.getRequests();
      const isPending = outgoing.some((r: any) => r.addressee_id === profileUserId);
      if (isPending) {
        setFriendStatus('pending');
      }
    } catch (error) {
      console.error('Failed to check friend status:', error);
    }
  };

  const handleSendFriendRequest = async () => {
    try {
      await friendsApi.sendRequest(profileUserId!);
      setFriendStatus('pending');
    } catch (error) {
      console.error('Failed to send friend request:', error);
    }
  };

  const handleRemoveFriend = async () => {
    if (!confirm('Are you sure you want to remove this friend?')) return;
    try {
      await friendsApi.removeFriend(profileUserId!);
      setFriendStatus('none');
    } catch (error) {
      console.error('Failed to remove friend:', error);
    }
  };

  const handleSaveProfile = async () => {
    try {
      await usersApi.updateProfile(profileUserId!, {
        bio: editBio,
        privacy_setting: editPrivacy,
      });
      setIsEditing(false);
      loadProfile();
      refreshUser();
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-48 bg-gray-300 rounded-t-lg"></div>
          <div className="bg-white rounded-b-lg shadow p-6 -mt-12 ml-6">
            <div className="flex items-end space-x-4">
              <div className="w-32 h-32 bg-gray-300 rounded-full border-4 border-white"></div>
              <div className="flex-1">
                <div className="h-8 bg-gray-300 rounded w-48 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-32"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800">User not found</h2>
          <p className="text-gray-500 mt-2">This profile doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Cover & Profile Header */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Cover Image */}
        <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600"></div>

        {/* Profile Info */}
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-4 -mt-16">
            <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center text-4xl font-bold text-blue-600 bg-blue-100">
              {profile.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="flex-1 mt-4 sm:mt-0 sm:pb-2">
              <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
              <p className="text-gray-500">@{profile.username}</p>
            </div>
            <div className="mt-4 sm:mt-0 sm:pb-2">
              {isOwnProfile ? (
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300"
                >
                  {isEditing ? 'Cancel' : '✏️ Edit Profile'}
                </button>
              ) : (
                <div className="flex space-x-2">
                  {friendStatus === 'none' && (
                    <button
                      onClick={handleSendFriendRequest}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
                    >
                      ➕ Add Friend
                    </button>
                  )}
                  {friendStatus === 'pending' && (
                    <button
                      disabled
                      className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg font-semibold cursor-not-allowed"
                    >
                      ⏳ Request Sent
                    </button>
                  )}
                  {friendStatus === 'friends' && (
                    <button
                      onClick={handleRemoveFriend}
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300"
                    >
                      ✓ Friends
                    </button>
                  )}
                  <a
                    href={`/messages/${profile.id}`}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300"
                  >
                    💬 Message
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Bio */}
          {isEditing ? (
            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Tell us about yourself..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Profile Privacy</label>
                <select
                  value={editPrivacy}
                  onChange={(e) => setEditPrivacy(e.target.value)}
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="public">🌍 Public</option>
                  <option value="friends">👥 Friends Only</option>
                  <option value="private">🔒 Private</option>
                </select>
              </div>
              <button
                onClick={handleSaveProfile}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          ) : (
            <div className="mt-4">
              {profile.profile?.bio && (
                <p className="text-gray-700">{profile.profile.bio}</p>
              )}
              <p className="text-sm text-gray-500 mt-2">
                Joined {new Date(profile.created_at).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Posts */}
      <div className="mt-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Posts</h2>
        {posts.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500">No posts yet</p>
          </div>
        ) : (
          posts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              onDelete={() => setPosts(prev => prev.filter(p => p.id !== post.id))}
              onUpdate={(updated) => setPosts(prev => prev.map(p => p.id === updated.id ? updated : p))}
            />
          ))
        )}
      </div>
    </div>
  );
}
