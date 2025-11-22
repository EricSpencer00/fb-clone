import React, { useState, useEffect } from 'react';
import { getUser, sendFriendRequest, updateProfile } from '@/src/services/api';
import { UserPlus, Edit, Loader } from 'lucide-react';
import { useParams } from 'react-router-dom';

export function ProfilePage() {
  const { userId } = useParams<{ userId?: string }>();
  const [profile, setProfile] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState('');
  const [privacy, setPrivacy] = useState('public');
  const [loading, setLoading] = useState(false);

  const currentUserId = parseInt(localStorage.getItem('userId') || '0', 10);
  const isOwnProfile = !userId || parseInt(userId) === currentUserId;

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        const id = userId || currentUserId;
        const res = await getUser(id);
        setProfile(res.user);
        setBio(res.user?.bio || '');
        setPrivacy(res.user?.privacy_setting || 'public');
      } catch (e) {
        console.error('Profile load error:', e);
      } finally {
        setLoading(false);
      }
    };

    if (userId || currentUserId) loadProfile();
  }, [userId, currentUserId]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await updateProfile(bio, privacy);
      setProfile((prev: any) => ({
        ...prev,
        bio,
        privacy_setting: privacy,
      }));
      setIsEditing(false);
    } catch (e) {
      console.error('Save profile error:', e);
      alert('Failed to save profile');
    } finally {
      setLoading(false);
    }
  };

  const handleAddFriend = async () => {
    if (!userId) return;
    try {
      setLoading(true);
      await sendFriendRequest(parseInt(userId));
      alert('Friend request sent!');
    } catch (e) {
      console.error('Friend request error:', e);
      alert('Failed to send friend request');
    } finally {
      setLoading(false);
    }
  };

  if (!profile && loading) {
    return <div className="p-4 text-center"><Loader className="animate-spin" /></div>;
  }

  if (!profile) {
    return <div className="p-4 text-center text-gray-500">Profile not found</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold">{profile.name}</h1>
            <p className="text-gray-600">@{profile.username}</p>
          </div>
          {isOwnProfile ? (
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              <Edit size={18} /> Edit
            </button>
          ) : (
            <button
              onClick={handleAddFriend}
              disabled={loading}
              className="flex items-center gap-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-300"
            >
              <UserPlus size={18} /> Add Friend
            </button>
          )}
        </div>

        {isEditing && isOwnProfile ? (
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full p-2 border rounded"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Privacy</label>
              <select
                value={privacy}
                onChange={(e) => setPrivacy(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="public">Public</option>
                <option value="friends">Friends Only</option>
                <option value="private">Private</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 py-2 border rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
              >
                {loading ? <Loader className="animate-spin" /> : 'Save'}
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-3">
            <div>
              <p className="text-sm font-semibold text-gray-600">Bio</p>
              <p className="text-gray-800">{profile.bio || 'No bio yet'}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600">Privacy Setting</p>
              <p className="capitalize text-gray-800">{profile.privacy_setting || 'Public'}</p>
            </div>
            {profile.email && (
              <div>
                <p className="text-sm font-semibold text-gray-600">Email</p>
                <p className="text-gray-800">{profile.email}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
