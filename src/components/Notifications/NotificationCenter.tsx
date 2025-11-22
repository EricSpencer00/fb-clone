import React, { useState, useEffect } from 'react';
import { getNotifications, markNotificationsRead } from '@/src/services/api';
import { Bell, X } from 'lucide-react';

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const res = await getNotifications();
      setNotifications(res.notifications || []);
    } catch (e) {
      console.error('Notifications error:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) loadNotifications();
  }, [isOpen]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = async (ids: number[]) => {
    try {
      await markNotificationsRead(ids);
      setNotifications((prev) =>
        prev.map((n) => (ids.includes(n.id) ? { ...n, read: 1 } : n))
      );
    } catch (e) {
      console.error('Mark as read error:', e);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-gray-100 rounded-lg"
      >
        <Bell size={24} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="font-bold">Notifications</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-gray-100 p-1 rounded"
            >
              <X size={18} />
            </button>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">No notifications</div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  className={`p-3 border-b hover:bg-gray-50 cursor-pointer ${
                    !n.read ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => handleMarkAsRead([n.id])}
                >
                  <p className="text-sm font-semibold text-blue-600">{n.type}</p>
                  <p className="text-sm text-gray-700">{n.message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(n.created_at).toLocaleString()}
                  </p>
                </div>
              ))
            )}
          </div>
          {notifications.length > 0 && (
            <button
              onClick={() =>
                handleMarkAsRead(
                  notifications.filter((n) => !n.read).map((n) => n.id)
                )
              }
              className="w-full p-2 text-center text-sm text-blue-600 hover:bg-gray-50 border-t"
            >
              Mark all as read
            </button>
          )}
        </div>
      )}
    </div>
  );
}
