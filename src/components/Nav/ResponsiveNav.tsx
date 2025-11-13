import React from "react";
import { Link } from "react-router-dom";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import FriendsPopup from "@/src/components/Friends/FriendsPopup";
import { useState, useRef } from "react";

export default function ResponsiveNav() {
  const [showFriends, setShowFriends] = useState(false);

  const NavItem = ({ to, label }: { to: string; label: string }) => (
    <Link to={to} className="block px-3 py-2 rounded hover:bg-gray-100 text-sm font-medium">
      {label}
    </Link>
  );

  return (
    <>
      {/* Right side nav for larger screens */}
      <aside className="hidden lg:flex flex-col w-72 fixed right-0 top-16 h-[calc(100%-4rem)] p-4 gap-3 border-l bg-white/70 backdrop-blur-sm z-40">
        <div className="text-sm font-semibold px-2 pb-2">Explore</div>
        <nav className="flex-1 space-y-1 relative">
          {/* friends popup state */}
          {/* showFriends toggles the small popup that extends from the Friends button */}
          
          <NavItem to="/feed" label="Home" />
          <button
            onClick={() => setShowFriends((s) => !s)}
            ref={null}
            className="block text-left w-full px-3 py-2 rounded hover:bg-gray-100 text-sm font-medium"
          >
            Friends
          </button>
          <NavItem to="#" label="Messages" />
          <NavItem to="#" label="Notifications" />
          <NavItem to="#" label="Groups" />
          <NavItem to="#" label="Events" />

          {showFriends && (
            <div className="absolute right-full mr-3 top-12">
              <FriendsPopup onClose={() => setShowFriends(false)} />
            </div>
          )}
        </nav>

        <div className="pt-2 border-t mt-2">
          <div className="text-xs text-gray-500 px-2">Shortcuts</div>
          <NavItem to="#" label="Profile" />
          <NavItem to="#" label="Settings" />
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
