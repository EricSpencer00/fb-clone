import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { friendsApi } from '../services/api';

interface Friend {
  friend_id: number;
  name: string;
  username: string;
  created_at: string;
}

interface FriendRequest {
  id: number;
  requester_id?: number;
  addressee_id?: number;
  name: string;
  username: string;
  created_at: string;
}

export default function Friends() {
  const [activeTab, setActiveTab] = useState<'friends' | 'requests'>('friends');
  const [friends, setFriends] = useState<Friend[]>([]);
  const [incomingRequests, setIncomingRequests] = useState<FriendRequest[]>([]);
  const [outgoingRequests, setOutgoingRequests] = useState<FriendRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [friendsRes, requestsRes] = await Promise.all([
        friendsApi.getList(),
        friendsApi.getRequests(),
      ]);
      setFriends(friendsRes.friends);
      setIncomingRequests(requestsRes.incoming);
      setOutgoingRequests(requestsRes.outgoing);
    } catch (error) {
      console.error('Failed to load friends data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (requestId: number) => {
    try {
      await friendsApi.acceptRequest(requestId);
      loadData();
    } catch (error) {
      console.error('Failed to accept request:', error);
    }
  };

  const handleReject = async (requestId: number) => {
    try {
      await friendsApi.rejectRequest(requestId);
      setIncomingRequests(prev => prev.filter(r => r.id !== requestId));
    } catch (error) {
      console.error('Failed to reject request:', error);
    }
  };

  const handleRemoveFriend = async (userId: number) => {
    if (!confirm('Are you sure you want to remove this friend?')) return;
    try {
      await friendsApi.removeFriend(userId);
      setFriends(prev => prev.filter(f => f.friend_id !== userId));
    } catch (error) {
      console.error('Failed to remove friend:', error);
    }
  };

  const pendingCount = incomingRequests.length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Friends</h1>

      {/* Tabs */}
      <div className="flex space-x-2 mb-6">
        <button
          onClick={() => setActiveTab('friends')}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            activeTab === 'friends'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          My Friends ({friends.length})
        </button>
        <button
          onClick={() => setActiveTab('requests')}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors relative ${
            activeTab === 'requests'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          Requests
          {pendingCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {pendingCount}
            </span>
          )}
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
        </div>
      ) : activeTab === 'friends' ? (
        /* Friends List */
        <div className="grid gap-4 sm:grid-cols-2">
          {friends.length === 0 ? (
            <div className="col-span-2 bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-500 text-lg">No friends yet</p>
              <p className="text-gray-400 mt-2">Start connecting with people!</p>
              <Link
                to="/explore"
                className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
              >
                Find People
              </Link>
            </div>
          ) : (
            friends.map(friend => (
              <div key={friend.friend_id} className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
                <Link to={`/profile/${friend.friend_id}`}>
                  <div className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-semibold">
                    {friend.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                </Link>
                <div className="flex-1">
                  <Link to={`/profile/${friend.friend_id}`} className="font-semibold text-gray-900 hover:underline">
                    {friend.name}
                  </Link>
                  <p className="text-sm text-gray-500">@{friend.username}</p>
                </div>
                <div className="flex space-x-2">
                  <Link
                    to={`/messages/${friend.friend_id}`}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    title="Message"
                  >
                    💬
                  </Link>
                  <button
                    onClick={() => handleRemoveFriend(friend.friend_id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    title="Remove friend"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        /* Friend Requests */
        <div className="space-y-6">
          {/* Incoming */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Incoming Requests ({incomingRequests.length})
            </h2>
            {incomingRequests.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
                No pending friend requests
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {incomingRequests.map(request => (
                  <div key={request.id} className="bg-white rounded-lg shadow p-4">
                    <div className="flex items-center space-x-4">
                      <Link to={`/profile/${request.requester_id}`}>
                        <div className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-semibold">
                          {request.name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                      </Link>
                      <div className="flex-1">
                        <Link to={`/profile/${request.requester_id}`} className="font-semibold text-gray-900 hover:underline">
                          {request.name}
                        </Link>
                        <p className="text-sm text-gray-500">@{request.username}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <button
                        onClick={() => handleAccept(request.id)}
                        className="flex-1 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleReject(request.id)}
                        className="flex-1 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Outgoing */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Sent Requests ({outgoingRequests.length})
            </h2>
            {outgoingRequests.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
                No pending sent requests
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {outgoingRequests.map(request => (
                  <div key={request.id} className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
                    <Link to={`/profile/${request.addressee_id}`}>
                      <div className="w-14 h-14 rounded-full bg-gray-400 flex items-center justify-center text-white text-xl font-semibold">
                        {request.name?.charAt(0).toUpperCase() || 'U'}
                      </div>
                    </Link>
                    <div className="flex-1">
                      <Link to={`/profile/${request.addressee_id}`} className="font-semibold text-gray-900 hover:underline">
                        {request.name}
                      </Link>
                      <p className="text-sm text-gray-500">@{request.username}</p>
                    </div>
                    <span className="text-sm text-gray-400">Pending</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
