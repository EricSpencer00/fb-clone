import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/src/hooks/useAuth";
import { NotificationCenter } from "@/src/components/Notifications/NotificationCenter";
import { LogOut, User, Home, Users, Mail } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

export default function ResponsiveNav() {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const NavItem = ({ to, label, icon: Icon }: { to: string; label: string; icon?: any }) => (
    <Link
      to={to}
      className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100 text-sm font-medium text-gray-700"
    >
      {Icon && <Icon size={18} />}
      {label}
    </Link>
  );

  return (
    <>
      {/* Right side nav for larger screens */}
      <aside className="hidden lg:flex flex-col w-80 fixed right-0 top-16 h-[calc(100%-4rem)] p-4 gap-3 border-l bg-white/70 backdrop-blur-sm z-40 shadow-lg">
        <div className="text-sm font-semibold px-2 pb-2 text-gray-800">Navigation</div>
        <nav className="flex-1 space-y-1">
          <NavItem to="/feed" label="Home" icon={Home} />
          <NavItem to="/friends" label="Friends" icon={Users} />
          <NavItem to="/messages" label="Messages" icon={Mail} />
          <div className="flex items-center justify-between px-3 py-2">
            <span className="text-sm font-medium text-gray-700">Notifications</span>
            <NotificationCenter />
          </div>
        </nav>

        <div className="pt-4 border-t mt-4 space-y-2">
          <div className="text-xs text-gray-500 px-2 font-semibold">Account</div>
          <Link
            to={`/profile`}
            className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100 text-sm font-medium text-gray-700"
          >
            <User size={18} />
            My Profile
          </Link>
          {currentUser && (
            <div className="px-3 py-2 text-xs text-gray-600">
              <p className="font-semibold">{currentUser.name}</p>
              <p className="text-gray-500">@{currentUser.username}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-red-50 text-sm font-medium text-red-600"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile: hamburger top-right that opens a dialog menu */}
      <div className="fixed top-4 right-4 z-50 lg:hidden">
        <Dialog>
          <DialogTrigger asChild>
            <button aria-label="Open menu" className="p-2 rounded-md bg-white/90 backdrop-blur-sm border">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Menu</DialogTitle>
              <DialogDescription>Quick navigation</DialogDescription>
            </DialogHeader>

            <nav className="mt-4 space-y-2">
              <Link to="/feed" className="block px-3 py-2 rounded hover:bg-gray-100">Home</Link>
              <Link to="/friends" className="block px-3 py-2 rounded hover:bg-gray-100">Friends</Link>
              <Link to="#" className="block px-3 py-2 rounded hover:bg-gray-100">Messages</Link>
              <Link to="#" className="block px-3 py-2 rounded hover:bg-gray-100">Notifications</Link>
              <Link to="#" className="block px-3 py-2 rounded hover:bg-gray-100">Profile</Link>
              <Link to="#" className="block px-3 py-2 rounded hover:bg-gray-100">Settings</Link>
            </nav>

            <div className="mt-6 flex justify-end">
              <DialogClose asChild>
                <button className="px-4 py-2 rounded bg-gray-100">Close</button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
