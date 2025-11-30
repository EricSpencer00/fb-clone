import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { messagesApi } from '../services/api';
import { useAuth } from '../context/AuthContext';

interface Conversation {
  user_id: number;
  name: string;
  username: string;
  last_message: string;
  last_message_date: string;
  unread_count: number;
}

interface Message {
  id: number;
  sender_id: number;
  receiver_id: number;
  text: string;
  media_url?: string;
  sent_date: string;
  read: boolean;
}

export default function Messages() {
  const { userId } = useParams();
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<Conversation | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeUserId = userId ? parseInt(userId) : null;

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    if (activeUserId) {
      loadMessages(activeUserId);
    }
  }, [activeUserId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadConversations = async () => {
    try {
      const { conversations } = await messagesApi.getConversations();
      setConversations(conversations);
      
      // If userId is provided, find that conversation
      if (activeUserId) {
        const conv = conversations.find((c: Conversation) => c.user_id === activeUserId);
        setSelectedUser(conv || { user_id: activeUserId, name: 'User', username: '', last_message: '', last_message_date: '', unread_count: 0 });
      }
    } catch (error) {
      console.error('Failed to load conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (otherUserId: number) => {
    try {
      const { messages } = await messagesApi.getConversation(otherUserId);
      setMessages(messages);
      
      // Mark as read
      await messagesApi.markRead(otherUserId);
      
      // Update unread count in conversations list
      setConversations(prev =>
        prev.map(c => (c.user_id === otherUserId ? { ...c, unread_count: 0 } : c))
      );
    } catch (error) {
      console.error('Failed to load messages:', error);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeUserId) return;

    try {
      await messagesApi.send(activeUserId, newMessage.trim());
      setNewMessage('');
      loadMessages(activeUserId);
      loadConversations();
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / 86400000);

    if (days === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (days === 1) {
      return 'Yesterday';
    } else if (days < 7) {
      return date.toLocaleDateString([], { weekday: 'short' });
    }
    return date.toLocaleDateString();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="bg-white rounded-lg shadow overflow-hidden" style={{ height: 'calc(100vh - 120px)' }}>
        <div className="flex h-full">
          {/* Conversations List */}
          <div className={`w-full md:w-80 border-r flex flex-col ${activeUserId ? 'hidden md:flex' : ''}`}>
            <div className="p-4 border-b">
              <h2 className="text-xl font-bold text-gray-800">Messages</h2>
            </div>
            <div className="flex-1 overflow-y-auto">
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin inline-block w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                </div>
              ) : conversations.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  <p>No conversations yet</p>
                  <p className="text-sm mt-2">Start chatting with your friends!</p>
                </div>
              ) : (
                conversations.map(conv => (
                  <Link
                    key={conv.user_id}
                    to={`/messages/${conv.user_id}`}
                    className={`block p-4 hover:bg-gray-50 border-b ${
                      activeUserId === conv.user_id ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => setSelectedUser(conv)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold flex-shrink-0">
                        {conv.name?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-gray-900 truncate">{conv.name}</p>
                          <span className="text-xs text-gray-500">{formatTime(conv.last_message_date)}</span>
                        </div>
                        <p className="text-sm text-gray-500 truncate">{conv.last_message}</p>
                      </div>
                      {conv.unread_count > 0 && (
                        <span className="bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                          {conv.unread_count}
                        </span>
                      )}
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className={`flex-1 flex flex-col ${!activeUserId ? 'hidden md:flex' : ''}`}>
            {!activeUserId ? (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <span className="text-6xl">💬</span>
                  <p className="mt-4 text-lg">Select a conversation to start messaging</p>
                </div>
              </div>
            ) : (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b flex items-center space-x-3">
                  <Link to="/messages" className="md:hidden p-2 hover:bg-gray-100 rounded-lg">
                    ←
                  </Link>
                  <Link to={`/profile/${activeUserId}`} className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                      {selectedUser?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{selectedUser?.name || 'User'}</p>
                      {selectedUser?.username && (
                        <p className="text-sm text-gray-500">@{selectedUser.username}</p>
                      )}
                    </div>
                  </Link>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                      <p>No messages yet</p>
                      <p className="text-sm mt-2">Send a message to start the conversation!</p>
                    </div>
                  ) : (
                    messages.map(msg => {
                      const isOwn = msg.sender_id === user?.id;
                      return (
                        <div
                          key={msg.id}
                          className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                              isOwn
                                ? 'bg-blue-600 text-white rounded-br-md'
                                : 'bg-gray-200 text-gray-900 rounded-bl-md'
                            }`}
                          >
                            <p>{msg.text}</p>
                            {msg.media_url && (
                              <img
                                src={msg.media_url}
                                alt="Media"
                                className="mt-2 rounded-lg max-w-full"
                              />
                            )}
                            <p
                              className={`text-xs mt-1 ${
                                isOwn ? 'text-blue-200' : 'text-gray-500'
                              }`}
                            >
                              {formatTime(msg.sent_date)}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <form onSubmit={handleSendMessage} className="p-4 border-t flex space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    disabled={!newMessage.trim()}
                    className="px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 disabled:opacity-50"
                  >
                    Send
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
