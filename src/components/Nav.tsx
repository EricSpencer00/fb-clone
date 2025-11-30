import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import NotificationCenter from './NotificationCenter';

export default function Nav() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { path: '/feed', label: 'Home', icon: '🏠' },
    { path: '/friends', label: 'Friends', icon: '👥' },
    { path: '/messages', label: 'Messages', icon: '💬' },
    { path: '/explore', label: 'Explore', icon: '🔍' },
  ];

  if (user?.role === 'admin') {
    navLinks.push({ path: '/admin', label: 'Admin', icon: '⚙️' });
  }

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/feed" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-blue-600">GraceNook</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  location.pathname === link.path
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="mr-1">{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side: notifications & user menu */}
          <div className="flex items-center space-x-2" ref={menuRef}>
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowUserMenu(false);
                }}
                className="p-2 rounded-full hover:bg-gray-100 relative"
              >
                <span className="text-xl">🔔</span>
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border animate-fade-in">
                  <NotificationCenter onClose={() => setShowNotifications(false)} />
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowUserMenu(!showUserMenu);
                  setShowNotifications(false);
                }}
                className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100"
              >
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
              </button>
              
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2 animate-fade-in">
                  <Link
                    to={`/profile/${user?.id}`}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowUserMenu(false)}
                  >
                    👤 My Profile
                  </Link>
                  <hr className="my-2" />
                  <button
                    onClick={() => {
                      logout();
                      setShowUserMenu(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    🚪 Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center justify-around py-2 border-t">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`p-2 rounded-lg ${
                location.pathname === link.path
                  ? 'text-blue-600'
                  : 'text-gray-600'
              }`}
            >
              <span className="text-xl">{link.icon}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
