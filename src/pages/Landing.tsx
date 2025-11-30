import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Landing() {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regName, setRegName] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(loginIdentifier, loginPassword);
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (regPassword !== regConfirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (!regEmail && !regPhone) {
      setError('Please provide an email or phone number');
      setLoading(false);
      return;
    }

    try {
      await register({
        email: regEmail || undefined,
        phone: regPhone || undefined,
        username: regUsername,
        name: regName,
        password: regPassword,
      });
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
      {/* Hero Section */}
      <div className="lg:flex-1 flex flex-col justify-center items-center lg:items-start p-8 lg:p-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <h1 className="text-5xl lg:text-6xl font-bold mb-4">GraceNook</h1>
        <p className="text-xl lg:text-2xl text-blue-100 max-w-lg text-center lg:text-left">
          Connect with friends and the world around you on GraceNook.
        </p>
        <div className="mt-8 grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold">1K+</div>
            <div className="text-blue-200 text-sm">Users</div>
          </div>
          <div>
            <div className="text-3xl font-bold">5K+</div>
            <div className="text-blue-200 text-sm">Posts</div>
          </div>
          <div>
            <div className="text-3xl font-bold">10K+</div>
            <div className="text-blue-200 text-sm">Connections</div>
          </div>
        </div>
      </div>

      {/* Auth Forms */}
      <div className="lg:flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Tabs */}
          <div className="flex mb-6 bg-white rounded-lg shadow overflow-hidden">
            <button
              onClick={() => { setMode('login'); setError(''); }}
              className={`flex-1 py-3 font-semibold transition-colors ${
                mode === 'login'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Log In
            </button>
            <button
              onClick={() => { setMode('register'); setError(''); }}
              className={`flex-1 py-3 font-semibold transition-colors ${
                mode === 'register'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Forms */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            {mode === 'login' ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <input
                    type="text"
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder="Email, phone, or username"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Logging in...' : 'Log In'}
                </button>
                <div className="text-center text-sm text-gray-600 pt-4 border-t">
                  <p>Demo accounts:</p>
                  <p className="mt-1"><strong>Admin:</strong> admin / admin123</p>
                  <p><strong>User:</strong> alice / pass123</p>
                </div>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="Full name"
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <input
                    type="text"
                    value={regUsername}
                    onChange={(e) => setRegUsername(e.target.value)}
                    placeholder="Username"
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="tel"
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  placeholder="Phone number (optional)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  minLength={6}
                />
                <input
                  type="password"
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50"
                >
                  {loading ? 'Creating account...' : 'Sign Up'}
                </button>
                <p className="text-xs text-gray-500 text-center">
                  By signing up, you agree to our Terms of Service and Privacy Policy.
                </p>
              </form>
            )}
          </div>

          {/* Ad Partner Link */}
          <div className="mt-6 text-center">
            <a
              href="/partner"
              className="text-sm text-gray-600 hover:text-blue-600 hover:underline"
            >
              Are you an advertiser? Visit our Partner Portal →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
