import React, { useState, useEffect } from 'react';
import { getPendingRequests, acceptFriendRequest, searchUsers, sendFriendRequest } from '@/src/services/api';
import { CheckCircle, XCircle, UserPlus, Loader } from 'lucide-react';

export function FriendsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'requests' | 'search'>('requests');

  const loadRequests = async () => {
    try {
      setLoading(true);
      const res = await getPendingRequests();
      setRequests(res.requests || []);
    } catch (e) {
      console.error('Load requests error:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    try {
      setLoading(true);
      const res = await searchUsers(searchQuery);
      setSearchResults(res.users || []);
    } catch (e) {
      console.error('Search error:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (requestId: number) => {
    try {
      await acceptFriendRequest(requestId);
      setRequests((prev) => prev.filter((r) => r.id !== requestId));
      alert('Friend request accepted!');
    } catch (e) {
      console.error('Accept error:', e);
      alert('Failed to accept request');
    }
  };

  const handleAddFriend = async (userId: number) => {
    try {
      await sendFriendRequest(userId);
      alert('Friend request sent!');
    } catch (e) {
      console.error('Send request error:', e);
      alert('Failed to send friend request');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('requests')}
            className={`flex-1 py-3 font-semibold ${
              activeTab === 'requests'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Friend Requests ({requests.length})
          </button>
          <button
            onClick={() => setActiveTab('search')}
            className={`flex-1 py-3 font-semibold ${
              activeTab === 'search'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Find Friends
          </button>
        </div>

        <div className="p-4">
          {activeTab === 'requests' ? (
            <div>
              {loading && requests.length === 0 ? (
                <div className="flex justify-center p-8">
                  <Loader className="animate-spin" />
                </div>
              ) : requests.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No pending requests</p>
              ) : (
                <div className="space-y-3">
                  {requests.map((req) => (
                    <div key={req.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <div>
                        <p className="font-semibold">{req.username}</p>
                        <p className="text-sm text-gray-600">Request ID: {req.requester_id}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAccept(req.id)}
                          className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                          <CheckCircle size={20} />
                        </button>
                        <button className="p-2 bg-red-500 text-white rounded hover:bg-red-600">
                          <XCircle size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div>
              <form onSubmit={handleSearch} className="mb-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by username or name..."
                    className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
                  >
                    {loading ? <Loader className="animate-spin" /> : 'Search'}
                  </button>
                </div>
              </form>

              {searchResults.length === 0 && searchQuery ? (
                <p className="text-center text-gray-500 py-8">No users found</p>
              ) : (
                <div className="space-y-3">
                  {searchResults.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-gray-600">@{user.username}</p>
                      </div>
                      <button
                        onClick={() => handleAddFriend(user.id)}
                        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        <UserPlus size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
