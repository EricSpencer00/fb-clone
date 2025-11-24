import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider } from "@/src/contexts/AuthContext";
import { Landing } from "@/src/pages/Landing";
import { Home } from "@/src/pages/Home";
import SignIn from "@/src/pages/auth/SignIn";
import SignUp from "@/src/pages/auth/SignUp";
import { FeedPage } from "@/src/pages/FeedPage";
import { FriendsPage } from "@/src/pages/FriendsPage";
import { ProfilePage } from "@/src/pages/Profile";
import { MessagesPage } from "@/src/pages/MessagesPage";
import ResponsiveNav from "@/src/components/Nav/ResponsiveNav";
import ExplorePage from '@/src/pages/Explore';

function App() {
  return (
    <Router basename="/">
      <AuthProvider>
        {/* Render the responsive right-side nav on non-auth pages only. */}
        <ConditionalNav />

        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/friends" element={<FriendsPage />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/messages/:userId" element={<MessagesPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

function ConditionalNav() {
  // must be used within Router
  const { pathname } = useLocation();
  const hide = pathname === "/" || pathname.startsWith("/auth");
  if (hide) return null;
  return <ResponsiveNav />;
}
