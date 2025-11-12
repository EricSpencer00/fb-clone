import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/src/hooks/useAuth";
import { Button } from "@/components/ui/button";

export default function SignIn() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!identifier || !password) {
      setError("Please fill out both fields.");
      return;
    }
    try {
      await login(identifier, password);
      navigate("/feed");
    } catch (err) {
      setError("Sign in failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold mb-2">Sign in to GraceNook</h2>
        <p className="text-sm text-gray-600 mb-6">Welcome back — pick up where you left off.</p>

        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Email or Username</label>
            <input
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
              placeholder="you@example.com or username"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
              placeholder="Your password"
            />
          </div>

          {error && <p className="text-sm text-rose-600">{error}</p>}

          <div className="flex items-center justify-between">
            <Button type="submit" disabled={isLoading} className="px-6 py-2">
              {isLoading ? "Signing in…" : "Sign In"}
            </Button>
            <Button variant="link" onClick={() => navigate('/auth/signup')}>
              Create account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
