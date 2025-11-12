import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/src/hooks/useAuth";
import { Button } from "@/components/ui/button";

export default function SignUp() {
  const navigate = useNavigate();
  const { signup, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !username || !password) {
      setError("Please fill out required fields.");
      return;
    }
    try {
      await signup(email, username, password, name);
      navigate("/feed");
    } catch (err) {
      setError("Sign up failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold mb-2">Create your account</h2>
        <p className="text-sm text-gray-600 mb-6">Join GraceNook and connect with people you care about.</p>

        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Full name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
              placeholder="username"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
              placeholder="Choose a password"
            />
          </div>

          {error && <p className="text-sm text-rose-600">{error}</p>}

          <div className="flex items-center justify-between">
            <Button type="submit" disabled={isLoading} className="px-6 py-2">
              {isLoading ? "Creating…" : "Create account"}
            </Button>
            <Button variant="link" onClick={() => navigate('/auth/signin')}>
              Already have an account?
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
