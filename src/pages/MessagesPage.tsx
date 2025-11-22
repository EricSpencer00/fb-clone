import React, { useState, useEffect } from 'react';
import { getMessageThread, sendMessage } from '@/src/services/api';
import { Send, Loader } from 'lucide-react';
import { useParams } from 'react-router-dom';

export function MessagesPage() {
  const { userId } = useParams<{ userId?: string }>();
  const [messages, setMessages] = useState<any[]>([]);
  const [messageText, setMessageText] = useState('');
  const [loading, setLoading] = useState(false);
  const currentUserId = parseInt(localStorage.getItem('userId') || '0', 10);

  const loadMessages = async () => {
    if (!userId) return;
    try {
      setLoading(true);
      const res = await getMessageThread(userId);
      setMessages(res.messages || []);
    } catch (e) {
      console.error('Load messages error:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) loadMessages();
    const interval = setInterval(() => {
      if (userId) loadMessages();
    }, 3000);
    return () => clearInterval(interval);
  }, [userId]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !userId) return;
    try {
      setLoading(true);
      await sendMessage(userId, messageText);
      setMessageText('');
      loadMessages();
    } catch (e) {
      console.error('Send message error:', e);
      alert('Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  if (!userId) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <div className="text-center text-gray-500 py-12">
          Select a user to start messaging
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 flex flex-col h-screen">
      <div className="bg-white rounded-lg shadow flex-1 flex flex-col">
        <div className="p-4 border-b">
          <h2 className="font-bold text-lg">User #{userId}</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {loading && messages.length === 0 ? (
            <div className="flex justify-center">
              <Loader className="animate-spin" />
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center text-gray-500">No messages yet. Start the conversation!</div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender_id === currentUserId ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-lg max-w-xs ${
                    msg.sender_id === currentUserId
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-300 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{msg.text || msg.media_url}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {new Date(msg.sent_date).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        <form onSubmit={handleSend} className="p-4 border-t bg-white">
          <div className="flex gap-2">
            <input
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={loading || !messageText.trim()}
              className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
            >
              {loading ? <Loader className="animate-spin" size={20} /> : <Send size={20} />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
