import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/src/contexts/AuthContext";
import { Landing } from "@/src/pages/Landing";
import { Home } from "@/src/pages/Home";
import SignIn from "@/src/pages/auth/SignIn";
import SignUp from "@/src/pages/auth/SignUp";
import Feed from "@/src/pages/Feed";
import Friends from "@/src/pages/Friends";

function App() {
  return (
    <Router>
      <AuthProvider>
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
