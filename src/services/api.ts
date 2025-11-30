import { config } from '../config/env';

const API_URL = config.apiUrl;

// Helper to get auth headers
const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

// Generic fetch wrapper
async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options.headers,
    },
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'API request failed');
  }
  
  return data;
}

// Auth API
export const authApi = {
  register: (data: { email?: string; phone?: string; username: string; name: string; password: string }) =>
    apiFetch<{ user: any; token: string }>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  login: (data: { identifier: string; password: string }) =>
    apiFetch<{ token: string; user: any }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  me: () => apiFetch<{ user: any }>('/api/me'),
};

// Users API
export const usersApi = {
  getProfile: (userId: number) =>
    apiFetch<{ user: any }>(`/api/users/${userId}`),
  
  updateProfile: (userId: number, data: any) =>
    apiFetch<{ profile: any }>('/api/profile', {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
  
  search: (q: string) =>
    apiFetch<{ users: any[] }>(`/api/users/search?q=${encodeURIComponent(q)}`),
};

// Posts API
export const postsApi = {
  getFeed: (page = 1, limit = 20) =>
    apiFetch<{ feed: any[] }>('/api/posts/feed'),
  
  getExplore: () =>
    apiFetch<{ feed: any[] }>('/api/posts/explore'),
  
  getPost: (postId: number) =>
    apiFetch<{ post: any }>(`/api/posts/${postId}`),
  
  getUserPosts: (userId: number) =>
    apiFetch<{ posts: any[] }>(`/api/posts/explore`), // Will filter client-side for now
  
  create: (data: { content: string; media_url?: string; privacy_setting?: string }) =>
    apiFetch<{ post: any }>('/api/posts', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  delete: (postId: number) =>
    apiFetch<{ deleted: boolean }>(`/api/posts/${postId}`, {
      method: 'DELETE',
    }),
  
  like: (postId: number) =>
    apiFetch<{ liked: boolean }>(`/api/posts/${postId}/like`, {
      method: 'POST',
    }),
  
  getComments: (postId: number) =>
    apiFetch<{ comments: any[] }>(`/api/posts/${postId}/comments`),
  
  addComment: (postId: number, content: string) =>
    apiFetch<{ success: boolean }>(`/api/posts/${postId}/comment`, {
      method: 'POST',
      body: JSON.stringify({ text: content }),
    }),
  
  report: (postId: number, reason: string) =>
    apiFetch<{ reported: boolean }>(`/api/posts/${postId}/report`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    }),
};

// Friends API  
export const friendsApi = {
  getList: () =>
    apiFetch<{ friends: any[] }>('/api/friends'),
  
  getRequests: async () => {
    const [incoming, outgoing] = await Promise.all([
      apiFetch<{ requests: any[] }>('/api/friends/pending'),
      apiFetch<{ requests: any[] }>('/api/friends/sent'),
    ]);
    return { incoming: incoming.requests, outgoing: outgoing.requests };
  },
  
  sendRequest: (userId: number) =>
    apiFetch<{ success: boolean }>('/api/friends/request', {
      method: 'POST',
      body: JSON.stringify({ user_id: userId }),
    }),
  
  acceptRequest: (requestId: number) =>
    apiFetch<{ accepted: boolean }>(`/api/friends/accept/${requestId}`, {
      method: 'POST',
    }),
  
  rejectRequest: (requestId: number) =>
    apiFetch<{ declined: boolean }>(`/api/friends/decline/${requestId}`, {
      method: 'POST',
    }),
  
  removeFriend: (userId: number) =>
    apiFetch<{ removed: boolean }>(`/api/friends/remove/${userId}`, {
      method: 'DELETE',
    }),
};

// Messages API
export const messagesApi = {
  getConversations: () =>
    apiFetch<{ conversations: any[] }>('/api/messages/conversations'),
  
  getConversation: (userId: number) =>
    apiFetch<{ messages: any[] }>(`/api/messages/thread/${userId}`),
  
  send: (receiverId: number, text: string, mediaUrl?: string) =>
    apiFetch<{ sent: boolean }>(`/api/messages/${receiverId}`, {
      method: 'POST',
      body: JSON.stringify({ text, media_url: mediaUrl }),
    }),
  
  markRead: (userId: number) =>
    // Messages are auto-marked read when fetching thread
    Promise.resolve({ success: true }),
};

// Notifications API
export const notificationsApi = {
  getAll: () =>
    apiFetch<{ notifications: any[] }>('/api/notifications'),
  
  markRead: (notificationId: number) =>
    apiFetch<{ success: boolean }>('/api/notifications/read', {
      method: 'POST',
      body: JSON.stringify({ ids: [notificationId] }),
    }),
  
  markAllRead: () =>
    apiFetch<{ success: boolean }>('/api/notifications/read-all', {
      method: 'POST',
    }),
};

// Ads API
export const adsApi = {
  getRandom: () =>
    apiFetch<{ ad: any }>('/api/ads'),
  
  recordImpression: (adId: number) =>
    apiFetch<{ recorded: boolean }>(`/api/ads/${adId}/impression`, {
      method: 'POST',
    }),
  
  recordClick: (adId: number) =>
    apiFetch<{ recorded: boolean }>(`/api/ads/${adId}/click`, {
      method: 'POST',
    }),
};

// Admin API
export const adminApi = {
  getReports: () =>
    apiFetch<{ reports: any[] }>('/api/admin/reports'),
  
  resolveReport: (reportId: number, action: string) =>
    apiFetch<{ success: boolean }>(`/api/admin/reports/${reportId}`, {
      method: 'PATCH',
      body: JSON.stringify({ status: action === 'dismiss' ? 'dismissed' : 'action_taken' }),
    }),
  
  getPendingAds: () =>
    apiFetch<{ ads: any[] }>('/api/admin/ads/pending'),
  
  reviewAd: (adId: number, status: string) => {
    const endpoint = status === 'approved' 
      ? `/api/admin/ads/${adId}/approve`
      : `/api/admin/ads/${adId}/reject`;
    return apiFetch<{ approved?: boolean; rejected?: boolean }>(endpoint, {
      method: 'POST',
      body: status === 'rejected' ? JSON.stringify({ reason: 'Does not meet guidelines' }) : undefined,
    });
  },
  
  getPendingPartners: () =>
    // Advertisers are users with role='advertiser', admin can update their role
    apiFetch<{ users: any[] }>('/api/admin/users').then(res => ({
      partners: res.users.filter((u: any) => u.role === 'advertiser' && !u.is_active)
    })),
  
  reviewPartner: (partnerId: number, status: string) =>
    apiFetch<{ success: boolean }>(`/api/admin/users/${partnerId}`, {
      method: 'PATCH',
      body: JSON.stringify({ is_active: status === 'approved' ? 1 : 0 }),
    }),
  
  getStats: () =>
    apiFetch<{ stats: any }>('/api/admin/stats'),
};

// Ad Partner API (Advertisers are users with role='advertiser')
export const adPartnerApi = {
  register: (data: { company_name: string; email: string; password: string }) =>
    // Register as advertiser role
    apiFetch<{ user: any; token: string }>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        email: data.email,
        username: data.email.split('@')[0],
        name: data.company_name,
        password: data.password,
      }),
    }),
  
  login: (data: { email: string; password: string }) =>
    apiFetch<{ token: string; user: any }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ identifier: data.email, password: data.password }),
    }).then(res => ({ token: res.token, partner: res.user })),
  
  getAds: () =>
    apiFetch<{ ads: any[] }>('/api/advertiser/ads'),
  
  createAd: (data: { title: string; image_url: string; target_url: string }) =>
    apiFetch<{ success: boolean }>('/api/advertiser/ads', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  getStats: () =>
    apiFetch<{ stats: any }>('/api/advertiser/stats'),
};
