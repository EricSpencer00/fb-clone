const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

let authToken: string | null = null;

export function setAuthToken(token: string | null) {
  authToken = token;
}

export function getAuthToken() {
  return authToken;
}

export async function apiCall(
  endpoint: string,
  options: RequestInit = {}
): Promise<any> {
  const url = `${API_BASE}${endpoint}`;
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };
  if (authToken) headers.Authorization = `Bearer ${authToken}`;
  
  const response = await fetch(url, {
    headers,
    ...options,
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`API Error ${response.status}: ${body || response.statusText}`);
  }

  return response.json();
}

export async function apiGet(endpoint: string) {
  return apiCall(endpoint, { method: "GET" });
}

export async function apiPost(endpoint: string, data: any) {
  return apiCall(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function apiPatch(endpoint: string, data: any) {
  return apiCall(endpoint, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function apiPut(endpoint: string, data: any) {
  return apiCall(endpoint, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function apiDelete(endpoint: string) {
  return apiCall(endpoint, { method: "DELETE" });
}

// Auth API
export async function registerUser(email: string, username: string, name: string, password: string) {
  const res = await apiCall("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, username, name, password }),
  });
  if (res.token) setAuthToken(res.token);
  return res;
}

export async function loginUser(identifier: string, password: string) {
  const res = await apiCall("/auth/login", {
    method: "POST",
    body: JSON.stringify({ identifier, password }),
  });
  if (res.token) setAuthToken(res.token);
  return res;
}

// Users & Profiles
export async function getUser(id: number | string) {
  return apiGet(`/users/${id}`);
}

export async function searchUsers(q: string) {
  return apiGet(`/users/search?q=${encodeURIComponent(q)}`);
}

export async function updateProfile(bio?: string, privacy_setting?: string, profile_photo?: string) {
  return apiPatch("/profile", { bio, privacy_setting, profile_photo });
}

// Friends
export async function sendFriendRequest(user_id: number) {
  return apiPost("/friends/request", { user_id });
}

export async function acceptFriendRequest(request_id: number) {
  return apiPost("/friends/accept", { request_id });
}

export async function getPendingRequests() {
  return apiGet("/friends/pending");
}

// Posts
export async function createPost(content?: string, media_url?: string, privacy_setting?: string) {
  return apiPost("/posts", { content, media_url, privacy_setting });
}

export async function getPost(id: number | string) {
  return apiGet(`/posts/${id}`);
}

export async function deletePost(id: number | string) {
  return apiDelete(`/posts/${id}`);
}

export async function getFeed() {
  return apiGet("/posts/feed");
}

// Likes & Comments
export async function toggleLike(postId: number | string) {
  return apiPost(`/posts/${postId}/like`, {});
}

export async function addComment(postId: number | string, text: string) {
  return apiPost(`/posts/${postId}/comment`, { text });
}

export async function getComments(postId: number | string) {
  return apiGet(`/posts/${postId}/comments`);
}

// Messages
export async function sendMessage(recipientId: number | string, text?: string, media_url?: string) {
  return apiPost(`/messages/${recipientId}`, { text, media_url });
}

export async function getMessageThread(userId: number | string) {
  return apiGet(`/messages/thread/${userId}`);
}

// Notifications
export async function getNotifications() {
  return apiGet("/notifications");
}

export async function markNotificationsRead(ids: number[]) {
  return apiPost("/notifications/read", { ids });
}

// Ads
export async function getRandomAd() {
  return apiGet("/ads");
}

export async function recordAdImpression(adId: number | string) {
  return apiPost(`/ads/impression/${adId}`, {});
}

export async function recordAdClick(adId: number | string) {
  return apiPost(`/ads/click/${adId}`, {});
}
