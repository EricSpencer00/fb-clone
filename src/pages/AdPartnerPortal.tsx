import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { adPartnerApi } from '../services/api';

interface Partner {
  id: number;
  company_name: string;
  email: string;
  status: string;
}

interface Ad {
  id: number;
  title: string;
  image_url: string;
  target_url: string;
  status: string;
  impression_count: number;
  click_count: number;
  created_at: string;
}

// Partner Auth Context (simplified)
function usePartnerAuth() {
  const [partner, setPartner] = useState<Partner | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('partner_token');
    const partnerData = localStorage.getItem('partner_data');
    if (token && partnerData) {
      setPartner(JSON.parse(partnerData));
    }
    setLoading(false);
  }, []);

  const login = (token: string, partnerData: Partner) => {
    localStorage.setItem('partner_token', token);
    localStorage.setItem('partner_data', JSON.stringify(partnerData));
    setPartner(partnerData);
  };

  const logout = () => {
    localStorage.removeItem('partner_token');
    localStorage.removeItem('partner_data');
    setPartner(null);
  };

  return { partner, loading, login, logout };
}

// Login/Register Page
function PartnerAuth({ onLogin }: { onLogin: (token: string, partner: Partner) => void }) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { token, partner } = await adPartnerApi.login({ email, password });
      onLogin(token, partner);
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
    setSuccess('');

    try {
      await adPartnerApi.register({ company_name: companyName, email, password });
      setSuccess('Registration successful! Your application is pending approval. You will be notified once approved.');
      setMode('login');
      setCompanyName('');
      setPassword('');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">GraceNook</h1>
          <p className="text-gray-600 mt-2">Ad Partner Portal</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Tabs */}
          <div className="flex mb-6 bg-gray-100 rounded-lg overflow-hidden">
            <button
              onClick={() => { setMode('login'); setError(''); }}
              className={`flex-1 py-2 font-semibold transition-colors ${
                mode === 'login' ? 'bg-blue-600 text-white' : 'text-gray-600'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => { setMode('register'); setError(''); }}
              className={`flex-1 py-2 font-semibold transition-colors ${
                mode === 'register' ? 'bg-blue-600 text-white' : 'text-gray-600'
              }`}
            >
              Register
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded-lg text-sm">
              {success}
            </div>
          )}

          {mode === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Company name"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Business email"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                minLength={6}
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Submit Application'}
              </button>
              <p className="text-xs text-gray-500 text-center">
                Applications require admin approval before you can create ads.
              </p>
            </form>
          )}
        </div>

        <div className="text-center mt-6">
          <a href="/" className="text-sm text-gray-600 hover:text-blue-600">
            ← Back to GraceNook
          </a>
        </div>
      </div>
    </div>
  );
}

// Partner Dashboard
function PartnerDashboard({ partner, onLogout }: { partner: Partner; onLogout: () => void }) {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  // Create ad form
  const [adTitle, setAdTitle] = useState('');
  const [adImageUrl, setAdImageUrl] = useState('');
  const [adTargetUrl, setAdTargetUrl] = useState('');
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState('');

  useEffect(() => {
    loadAds();
  }, []);

  const loadAds = async () => {
    try {
      const { ads } = await adPartnerApi.getAds();
      setAds(ads);
    } catch (error) {
      console.error('Failed to load ads:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAd = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setCreateError('');

    try {
      await adPartnerApi.createAd({
        title: adTitle,
        image_url: adImageUrl,
        target_url: adTargetUrl,
      });
      setShowCreateModal(false);
      setAdTitle('');
      setAdImageUrl('');
      setAdTargetUrl('');
      loadAds();
    } catch (err: any) {
      setCreateError(err.message || 'Failed to create ad');
    } finally {
      setCreating(false);
    }
  };

  const totalImpressions = ads.reduce((sum, ad) => sum + ad.impression_count, 0);
  const totalClicks = ads.reduce((sum, ad) => sum + ad.click_count, 0);
  const ctr = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : '0.00';

  if (partner.status !== 'approved') {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <span className="text-6xl">⏳</span>
            <h2 className="text-xl font-bold text-gray-800 mt-4">Application Pending</h2>
            <p className="text-gray-600 mt-2">
              Your partner application is currently being reviewed. You will be notified once it's approved.
            </p>
            <button
              onClick={onLogout}
              className="mt-6 px-6 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <nav className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-blue-600">GraceNook Partner Portal</h1>
            <p className="text-sm text-gray-500">{partner.company_name}</p>
          </div>
          <button
            onClick={onLogout}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-500">Total Impressions</p>
            <p className="text-3xl font-bold text-gray-900">{totalImpressions.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-500">Total Clicks</p>
            <p className="text-3xl font-bold text-gray-900">{totalClicks.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-500">Click-Through Rate</p>
            <p className="text-3xl font-bold text-gray-900">{ctr}%</p>
          </div>
        </div>

        {/* Ads Section */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Your Ads</h2>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
          >
            + Create Ad
          </button>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
          </div>
        ) : ads.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <span className="text-4xl">📢</span>
            <p className="text-gray-500 text-lg mt-4">No ads yet</p>
            <p className="text-gray-400 mt-2">Create your first ad to start reaching users</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ads.map(ad => (
              <div key={ad.id} className="bg-white rounded-lg shadow overflow-hidden">
                <img
                  src={ad.image_url}
                  alt={ad.title}
                  className="w-full h-32 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x128?text=Ad+Image';
                  }}
                />
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">{ad.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      ad.status === 'approved' ? 'bg-green-100 text-green-700' :
                      ad.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {ad.status}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
                    <span>{ad.impression_count} views</span>
                    <span>{ad.click_count} clicks</span>
                    <span>{ad.impression_count > 0 ? ((ad.click_count / ad.impression_count) * 100).toFixed(1) : 0}% CTR</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Ad Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Create New Ad</h3>
              
              {createError && (
                <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
                  {createError}
                </div>
              )}

              <form onSubmit={handleCreateAd} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ad Title</label>
                  <input
                    type="text"
                    value={adTitle}
                    onChange={(e) => setAdTitle(e.target.value)}
                    placeholder="e.g., Summer Sale - 50% Off"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input
                    type="url"
                    value={adImageUrl}
                    onChange={(e) => setAdImageUrl(e.target.value)}
                    placeholder="https://example.com/ad-image.jpg"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Target URL</label>
                  <input
                    type="url"
                    value={adTargetUrl}
                    onChange={(e) => setAdTargetUrl(e.target.value)}
                    placeholder="https://yourwebsite.com/landing-page"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="flex space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={creating}
                    className="flex-1 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
                  >
                    {creating ? 'Creating...' : 'Create Ad'}
                  </button>
                </div>
              </form>
              <p className="text-xs text-gray-500 text-center mt-4">
                Ads require admin approval before going live.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Main Portal Component
export default function AdPartnerPortal() {
  const { partner, loading, login, logout } = usePartnerAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!partner) {
    return <PartnerAuth onLogin={login} />;
  }

  return <PartnerDashboard partner={partner} onLogout={logout} />;
}
