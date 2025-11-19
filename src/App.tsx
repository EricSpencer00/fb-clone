import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider } from "@/src/contexts/AuthContext";
import { Landing } from "@/src/pages/Landing";
import { Home } from "@/src/pages/Home";
import SignIn from "@/src/pages/auth/SignIn";
import SignUp from "@/src/pages/auth/SignUp";
import Feed from "@/src/pages/Feed";
import Friends from "@/src/pages/Friends";
import ResponsiveNav from "@/src/components/Nav/ResponsiveNav";

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
          <Route path="/feed" element={<Feed />} />
          <Route path="/friends" element={<Friends />} />
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
