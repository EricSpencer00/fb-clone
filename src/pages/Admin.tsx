import React, { useState, useEffect } from 'react';
import { adminApi } from '../services/api';

interface Report {
  id: number;
  post_id: number;
  reporter_id: number;
  reporter_name: string;
  reason: string;
  status: string;
  created_at: string;
  post_content: string;
  post_author: string;
}

interface PendingAd {
  id: number;
  partner_id: number;
  company_name: string;
  title: string;
  image_url: string;
  target_url: string;
  created_at: string;
}

interface PendingPartner {
  id: number;
  company_name: string;
  email: string;
  created_at: string;
}

interface Stats {
  total_users: number;
  total_posts: number;
  total_messages: number;
  pending_reports: number;
  pending_ads: number;
  pending_partners: number;
}

export default function Admin() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'reports' | 'ads' | 'partners'>('dashboard');
  const [stats, setStats] = useState<Stats | null>(null);
  const [reports, setReports] = useState<Report[]>([]);
  const [pendingAds, setPendingAds] = useState<PendingAd[]>([]);
  const [pendingPartners, setPendingPartners] = useState<PendingPartner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [statsRes, reportsRes, adsRes, partnersRes] = await Promise.all([
        adminApi.getStats(),
        adminApi.getReports(),
        adminApi.getPendingAds(),
        adminApi.getPendingPartners(),
      ]);
      setStats(statsRes.stats);
      setReports(reportsRes.reports);
      setPendingAds(adsRes.ads);
      setPendingPartners(partnersRes.partners);
    } catch (error) {
      console.error('Failed to load admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleResolveReport = async (reportId: number, action: 'dismiss' | 'remove_post') => {
    try {
      await adminApi.resolveReport(reportId, action);
      setReports(prev => prev.filter(r => r.id !== reportId));
      loadData();
    } catch (error) {
      console.error('Failed to resolve report:', error);
    }
  };

  const handleReviewAd = async (adId: number, status: 'approved' | 'rejected') => {
    try {
      await adminApi.reviewAd(adId, status);
      setPendingAds(prev => prev.filter(a => a.id !== adId));
      loadData();
    } catch (error) {
      console.error('Failed to review ad:', error);
    }
  };

  const handleReviewPartner = async (partnerId: number, status: 'approved' | 'rejected') => {
    try {
      await adminApi.reviewPartner(partnerId, status);
      setPendingPartners(prev => prev.filter(p => p.id !== partnerId));
      loadData();
    } catch (error) {
      console.error('Failed to review partner:', error);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="text-center py-12">
          <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
          <p className="mt-2 text-gray-500">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Panel</h1>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { id: 'dashboard', label: '📊 Dashboard' },
          { id: 'reports', label: `🚩 Reports (${reports.length})` },
          { id: 'ads', label: `📢 Ads (${pendingAds.length})` },
          { id: 'partners', label: `🤝 Partners (${pendingPartners.length})` },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Dashboard */}
      {activeTab === 'dashboard' && stats && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { label: 'Total Users', value: stats.total_users, icon: '👥', color: 'blue' },
            { label: 'Total Posts', value: stats.total_posts, icon: '📝', color: 'green' },
            { label: 'Total Messages', value: stats.total_messages, icon: '💬', color: 'purple' },
            { label: 'Pending Reports', value: stats.pending_reports, icon: '🚩', color: 'red' },
            { label: 'Pending Ads', value: stats.pending_ads, icon: '📢', color: 'yellow' },
            { label: 'Pending Partners', value: stats.pending_partners, icon: '🤝', color: 'indigo' },
          ].map(stat => (
            <div key={stat.label} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <span className="text-4xl">{stat.icon}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reports */}
      {activeTab === 'reports' && (
        <div className="space-y-4">
          {reports.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <span className="text-4xl">✅</span>
              <p className="text-gray-500 text-lg mt-4">No pending reports</p>
            </div>
          ) : (
            reports.map(report => (
              <div key={report.id} className="bg-white rounded-lg shadow p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>Reported by {report.reporter_name}</span>
                      <span>·</span>
                      <span>{new Date(report.created_at).toLocaleDateString()}</span>
                    </div>
                    <p className="mt-2 text-gray-800 font-medium">Reason: {report.reason}</p>
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500">Post by {report.post_author}:</p>
                      <p className="text-gray-800 mt-1">{report.post_content}</p>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2 mt-4">
                  <button
                    onClick={() => handleResolveReport(report.id, 'dismiss')}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300"
                  >
                    Dismiss
                  </button>
                  <button
                    onClick={() => handleResolveReport(report.id, 'remove_post')}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700"
                  >
                    Remove Post
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Ads */}
      {activeTab === 'ads' && (
        <div className="grid gap-4 sm:grid-cols-2">
          {pendingAds.length === 0 ? (
            <div className="col-span-2 bg-white rounded-lg shadow p-8 text-center">
              <span className="text-4xl">✅</span>
              <p className="text-gray-500 text-lg mt-4">No pending ads to review</p>
            </div>
          ) : (
            pendingAds.map(ad => (
              <div key={ad.id} className="bg-white rounded-lg shadow overflow-hidden">
                <img
                  src={ad.image_url}
                  alt={ad.title}
                  className="w-full h-40 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x160?text=Ad+Preview';
                  }}
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900">{ad.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">By {ad.company_name}</p>
                  <a
                    href={ad.target_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline mt-1 block truncate"
                  >
                    {ad.target_url}
                  </a>
                  <div className="flex space-x-2 mt-4">
                    <button
                      onClick={() => handleReviewAd(ad.id, 'approved')}
                      className="flex-1 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
                    >
                      ✓ Approve
                    </button>
                    <button
                      onClick={() => handleReviewAd(ad.id, 'rejected')}
                      className="flex-1 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700"
                    >
                      ✕ Reject
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Partners */}
      {activeTab === 'partners' && (
        <div className="space-y-4">
          {pendingPartners.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <span className="text-4xl">✅</span>
              <p className="text-gray-500 text-lg mt-4">No pending partner applications</p>
            </div>
          ) : (
            pendingPartners.map(partner => (
              <div key={partner.id} className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{partner.company_name}</h3>
                  <p className="text-sm text-gray-500">{partner.email}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Applied {new Date(partner.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleReviewPartner(partner.id, 'approved')}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
                  >
                    ✓ Approve
                  </button>
                  <button
                    onClick={() => handleReviewPartner(partner.id, 'rejected')}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700"
                  >
                    ✕ Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
