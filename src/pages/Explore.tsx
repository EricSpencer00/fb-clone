import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usersApi, friendsApi, postsApi } from '../services/api';
import PostCard from '../components/PostCard';

interface User {
  id: number;
  name: string;
  username: string;
}

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [explorePosts, setExplorePosts] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'posts' | 'people'>('posts');
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [pendingRequests, setPendingRequests] = useState<Set<number>>(new Set());
  const [friends, setFriends] = useState<Set<number>>(new Set());

  useEffect(() => {
    loadFriendStatus();
    loadExplorePosts();
  }, []);

  const loadFriendStatus = async () => {
    try {
      const [friendsRes, requestsRes] = await Promise.all([
        friendsApi.getList(),
        friendsApi.getRequests(),
      ]);
      
      setFriends(new Set(friendsRes.friends.map((f: any) => f.friend_id)));
      setPendingRequests(new Set(requestsRes.outgoing.map((r: any) => r.addressee_id)));
    } catch (error) {
      console.error('Failed to load friend status:', error);
    }
  };

  const loadExplorePosts = async () => {
    try {
      const { feed } = await postsApi.getExplore();
      setExplorePosts(feed);
    } catch (error) {
      console.error('Failed to load explore posts:', error);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setSearched(true);
    try {
      const { users } = await usersApi.search(searchQuery);
      setSearchResults(users);
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSendRequest = async (userId: number) => {
    try {
      await friendsApi.sendRequest(userId);
      setPendingRequests(prev => new Set(prev).add(userId));
    } catch (error) {
      console.error('Failed to send friend request:', error);
    }
  };

  const getRelationship = (userId: number) => {
    if (friends.has(userId)) return 'friends';
    if (pendingRequests.has(userId)) return 'pending';
    return 'none';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Explore</h1>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('posts')}
          className={`pb-3 px-2 font-semibold transition-colors ${
            activeTab === 'posts'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          📰 Discover Posts
        </button>
        <button
          onClick={() => setActiveTab('people')}
          className={`pb-3 px-2 font-semibold transition-colors ${
            activeTab === 'people'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          👥 Find People
        </button>
      </div>

      {/* Posts Tab */}
      {activeTab === 'posts' ? (
        <div className="space-y-4">
          {explorePosts.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <span className="text-4xl">📝</span>
              <p className="text-gray-500 text-lg mt-4">No posts to discover yet</p>
            </div>
          ) : (
            explorePosts.map((item: any, index: number) =>
              item.isAd ? (
                <div key={`ad-${index}`} className="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-400">
                  <div className="text-xs text-gray-500 font-semibold mb-2">🎯 SPONSORED</div>
                  <a href={item.target_url} target="_blank" rel="noopener noreferrer" className="block">
                    <img src={item.image_url} alt={item.title} className="w-full h-48 object-cover rounded-lg mb-2" />
                    <p className="font-semibold text-gray-900">{item.title}</p>
                  </a>
                </div>
              ) : (
                <PostCard key={item.id} post={item} />
              )
            )
          )}
        </div>
      ) : (
        <>
          {/* Search Form */}
          <form onSubmit={handleSearch} className="mb-8">
            <div className="flex space-x-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e: any) => setSearchQuery(e.target.value)}
                placeholder="Search for people by name or username..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={loading || !searchQuery.trim()}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Searching...' : '🔍 Search'}
              </button>
            </div>
          </form>

          {/* Results */}
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
            </div>
          ) : searched ? (
            searchResults.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <span className="text-4xl">🔍</span>
                <p className="text-gray-500 text-lg mt-4">No users found</p>
                <p className="text-gray-400 mt-2">Try a different search term</p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {searchResults.map(user => {
                  const relationship = getRelationship(user.id);
                  return (
                    <div key={user.id} className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
                      <Link to={`/profile/${user.id}`}>
                        <div className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-semibold">
                          {user.name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                      </Link>
                      <div className="flex-1">
                        <Link to={`/profile/${user.id}`} className="font-semibold text-gray-900 hover:underline">
                          {user.name}
                        </Link>
                        <p className="text-sm text-gray-500">@{user.username}</p>
                      </div>
                      {relationship === 'friends' ? (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                          ✓ Friends
                        </span>
                      ) : relationship === 'pending' ? (
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                          ⏳ Pending
                        </span>
                      ) : (
                        <button
                          onClick={() => handleSendRequest(user.id)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 text-sm"
                        >
                          ➕ Add
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )
          ) : (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <span className="text-6xl">👥</span>
              <h2 className="text-xl font-semibold text-gray-800 mt-4">Find People</h2>
              <p className="text-gray-500 mt-2">
                Search for friends, classmates, or anyone you'd like to connect with
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
