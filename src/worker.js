// GraceNook Worker: core social networking API
// Routes implemented: auth, users, profiles, friends, posts, likes, comments, messages, notifications, ads integration

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const { pathname, searchParams } = url;
    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { 
        status: 204, 
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,POST,DELETE,PATCH,OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
      });
    }

    try {
      // Auth endpoints (no token required)
      if (pathname === '/api/auth/register' && request.method === 'POST') {
        return registerUser(request, env);
      }
      if (pathname === '/api/auth/login' && request.method === 'POST') {
        return loginUser(request, env);
      }

      // Ads endpoints (public)
      if (pathname === '/api/ads' && request.method === 'GET') {
        return getRandomAd(env);
      }
      if (pathname.startsWith('/api/ads/impression/') && request.method === 'POST') {
        return recordAdMetric(env, pathname.split('/').pop(), 'impression');
      }
      if (pathname.startsWith('/api/ads/click/') && request.method === 'POST') {
        return recordAdMetric(env, pathname.split('/').pop(), 'click');
      }
      if (pathname === '/api/admin/seed' && request.method === 'POST') {
        return seedAdsIfEmpty(env);
      }

      // Protected routes below
      const authUser = await requireAuth(request, env);
      if (!authUser) return json({ error: 'Unauthorized' }, 401);

      // Explore: all public posts (authenticated)
      if (pathname === '/api/posts/explore' && request.method === 'GET') {
        return getExplore(env, authUser.id);
      }

      // Users & Profiles
      if (pathname.startsWith('/api/users/search') && request.method === 'GET') {
        const q = searchParams.get('q') || '';
        return searchUsers(env, q);
      }
      if (pathname.startsWith('/api/users/') && request.method === 'GET') {
        const id = pathname.split('/').pop();
        return getUser(env, id);
      }
      if (pathname === '/api/profile' && request.method === 'PATCH') {
        return updateProfile(request, env, authUser.id);
      }

      // Friend Requests
      if (pathname === '/api/friends/request' && request.method === 'POST') {
        return createFriendRequest(request, env, authUser.id);
      }
      if (pathname === '/api/friends/accept' && request.method === 'POST') {
        return acceptFriendRequest(request, env, authUser.id);
      }
      if (pathname === '/api/friends/pending' && request.method === 'GET') {
        return listPendingFriendRequests(env, authUser.id);
      }

      // Posts
      if (pathname === '/api/posts' && request.method === 'POST') {
        return createPost(request, env, authUser.id);
      }
      if (pathname.startsWith('/api/posts/') && request.method === 'GET') {
        const id = pathname.split('/').pop();
        if (id === 'feed') return getFeed(env, authUser.id);
        return getPost(env, id, authUser.id);
      }
      if (pathname.startsWith('/api/posts/') && request.method === 'DELETE') {
        const id = pathname.split('/').pop();
        return deletePost(env, id, authUser.id);
      }

      // Likes & Comments
      if (pathname.match(/^\/api\/posts\/\d+\/like$/) && request.method === 'POST') {
        const postId = pathname.split('/')[3];
        return toggleLike(env, postId, authUser.id);
      }
      if (pathname.match(/^\/api\/posts\/\d+\/comment$/) && request.method === 'POST') {
        const postId = pathname.split('/')[3];
        return addComment(request, env, postId, authUser.id);
      }
      if (pathname.match(/^\/api\/posts\/\d+\/comments$/) && request.method === 'GET') {
        const postId = pathname.split('/')[3];
        return listComments(env, postId, authUser.id);
      }

      // Messaging
      if (pathname.match(/^\/api\/messages\/thread\/\d+$/) && request.method === 'GET') {
        const otherId = pathname.split('/').pop();
        return getThread(env, authUser.id, otherId);
      }
      if (pathname.match(/^\/api\/messages\/\d+$/) && request.method === 'POST') {
        const recipientId = pathname.split('/').pop();
        return sendMessage(request, env, authUser.id, recipientId);
      }

      // Notifications
      if (pathname === '/api/notifications' && request.method === 'GET') {
        return listNotifications(env, authUser.id);
      }
      if (pathname === '/api/notifications/read' && request.method === 'POST') {
        return markNotificationsRead(request, env, authUser.id);
      }

      return json({ error: 'Not found' }, 404);
    } catch (e) {
      return json({ error: e.message || 'Server error' }, 500);
    }
  }
};

// Utility
function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,DELETE,PATCH,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  };
}
function json(obj, status = 200, headers = {}) {
  return new Response(JSON.stringify(obj), { status, headers: { 'Content-Type': 'application/json', ...corsHeaders(), ...headers } });
}
async function readBody(request) {
  const text = await request.text();
  if (!text) return {};
  try { return JSON.parse(text); } catch { return {}; }
}

// Auth helpers (PBKDF2 + HMAC SHA256 JWT)
async function hashPassword(password, salt = crypto.getRandomValues(new Uint8Array(16))) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', enc.encode(password), { name: 'PBKDF2' }, false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' }, key, 256);
  const hashArray = Array.from(new Uint8Array(bits));
  return b64url(salt) + '.' + b64url(new Uint8Array(hashArray));
}
async function verifyPassword(password, stored) {
  const [saltB64, hashB64] = stored.split('.');
  const salt = fromB64url(saltB64);
  const attempt = await hashPassword(password, salt);
  return attempt === stored;
}
function b64url(buf) {
  return btoa(String.fromCharCode(...buf)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/,'');
}
function fromB64url(str) {
  str = str.replace(/-/g,'+').replace(/_/g,'/');
  while (str.length % 4) str += '=';
  const bin = atob(str); const arr = new Uint8Array(bin.length); for (let i=0;i<bin.length;i++) arr[i]=bin.charCodeAt(i); return arr;
}
async function signJWT(payload, secret) {
  const header = { alg: 'HS256', typ: 'JWT' };
  const enc = (obj) => b64url(new TextEncoder().encode(JSON.stringify(obj)));
  const data = enc(header) + '.' + enc(payload);
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sigBuf = new Uint8Array(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data)));
  return data + '.' + b64url(sigBuf);
}
async function verifyJWT(token, secret) {
  const parts = token.split('.'); if (parts.length !== 3) return null;
  const [h,p,sig] = parts; const data = h + '.' + p;
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const expected = b64url(new Uint8Array(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data))));
  if (expected !== sig) return null;
  const payloadJson = atob(p.replace(/-/g,'+').replace(/_/g,'/')); return JSON.parse(payloadJson);
}
async function requireAuth(request, env) {
  const auth = request.headers.get('Authorization');
  if (!auth || !auth.startsWith('Bearer ')) return null;
  const token = auth.substring(7);
  const payload = await verifyJWT(token, env.JWT_SECRET);
  return payload && payload.id ? payload : null;
}

// Auth endpoints
async function registerUser(request, env) {
  const body = await readBody(request);
  const { email, phone, username, name, password } = body;
  if (!username || !name || !password || (!email && !phone)) return json({ error: 'Missing fields' }, 400);
  const existing = await env.DB.prepare('SELECT id FROM users WHERE username = ? OR email = ?').bind(username, email || '').first();
  if (existing) return json({ error: 'User exists' }, 409);
  const pwdHash = await hashPassword(password);
  await env.DB.prepare('INSERT INTO users (email, phone, username, name, password_hash) VALUES (?, ?, ?, ?, ?)').bind(email || null, phone || null, username, name, pwdHash).run();
  const user = await env.DB.prepare('SELECT id, username, name, email FROM users WHERE username = ?').bind(username).first();
  await env.DB.prepare('INSERT INTO profiles (user_id, bio) VALUES (?, ?)').bind(user.id, '').run();
  const token = await signJWT({ id: user.id, username: user.username }, env.JWT_SECRET);
  return json({ user, token }, 201);
}
async function loginUser(request, env) {
  const body = await readBody(request);
  const { identifier, password } = body;
  if (!identifier || !password) return json({ error: 'Missing credentials' }, 400);
  const user = await env.DB.prepare('SELECT id, username, name, email, password_hash FROM users WHERE username = ? OR email = ? OR phone = ?').bind(identifier, identifier, identifier).first();
  if (!user) return json({ error: 'Invalid credentials' }, 401);
  const ok = await verifyPassword(password, user.password_hash);
  if (!ok) return json({ error: 'Invalid credentials' }, 401);
  const token = await signJWT({ id: user.id, username: user.username }, env.JWT_SECRET);
  delete user.password_hash;
  return json({ user, token });
}

// Users & Profiles
async function getUser(env, id) {
  if (!/^[0-9]+$/.test(id)) return json({ error: 'Invalid id' }, 400);
  const user = await env.DB.prepare('SELECT u.id, u.username, u.name, u.email, p.bio, p.privacy_setting, p.profile_photo FROM users u LEFT JOIN profiles p ON u.id = p.user_id WHERE u.id = ?').bind(Number(id)).first();
  return user ? json({ user }) : json({ error: 'Not found' }, 404);
}
async function searchUsers(env, q) {
  const like = `%${q}%`;
  const stmt = await env.DB.prepare('SELECT id, username, name FROM users WHERE username LIKE ? OR name LIKE ? LIMIT 25').bind(like, like).all();
  return json({ users: stmt.results });
}
async function updateProfile(request, env, userId) {
  const body = await readBody(request);
  const { bio, privacy_setting, profile_photo } = body;
  await env.DB.prepare('UPDATE profiles SET bio = COALESCE(?, bio), privacy_setting = COALESCE(?, privacy_setting), profile_photo = COALESCE(?, profile_photo) WHERE user_id = ?').bind(bio ?? null, privacy_setting ?? null, profile_photo ?? null, userId).run();
  const updated = await env.DB.prepare('SELECT user_id as id, bio, privacy_setting, profile_photo FROM profiles WHERE user_id = ?').bind(userId).first();
  return json({ profile: updated });
}

// Friend Requests
async function createFriendRequest(request, env, requesterId) {
  const body = await readBody(request); const { user_id } = body;
  if (!user_id) return json({ error: 'Missing user_id' }, 400);
  if (user_id === requesterId) return json({ error: 'Cannot friend self' }, 400);
  const exists = await env.DB.prepare('SELECT id FROM friend_requests WHERE requester_id = ? AND addressee_id = ?').bind(requesterId, user_id).first();
  if (exists) return json({ error: 'Already requested' }, 409);
  await env.DB.prepare('INSERT INTO friend_requests (requester_id, addressee_id) VALUES (?, ?)').bind(requesterId, user_id).run();
  await createNotification(env, user_id, 'friend_request', null, 'New friend request');
  return json({ ok: true });
}
async function acceptFriendRequest(request, env, userId) {
  const body = await readBody(request); const { request_id } = body;
  if (!request_id) return json({ error: 'Missing request_id' }, 400);
  const fr = await env.DB.prepare('SELECT * FROM friend_requests WHERE id = ? AND addressee_id = ?').bind(request_id, userId).first();
  if (!fr || fr.status !== 'pending') return json({ error: 'Not found' }, 404);
  await env.DB.prepare('UPDATE friend_requests SET status = "accepted" WHERE id = ?').bind(request_id).run();
  // Insert friendship (store smaller id first for uniqueness)
  const a = Math.min(fr.requester_id, fr.addressee_id); const b = Math.max(fr.requester_id, fr.addressee_id);
  await env.DB.prepare('INSERT OR IGNORE INTO friends (user_id_a, user_id_b) VALUES (?, ?)').bind(a, b).run();
  await createNotification(env, fr.requester_id, 'friend_accept', fr.id, 'Friend request accepted');
  return json({ accepted: true });
}
async function listPendingFriendRequests(env, userId) {
  const rows = await env.DB.prepare('SELECT fr.id, fr.requester_id, u.username FROM friend_requests fr JOIN users u ON fr.requester_id = u.id WHERE fr.addressee_id = ? AND fr.status = "pending"').bind(userId).all();
  return json({ requests: rows.results });
}

// Posts
async function createPost(request, env, userId) {
  const body = await readBody(request);
  const { content, media_url, privacy_setting } = body;
  await env.DB.prepare('INSERT INTO posts (user_id, content, media_url, privacy_setting) VALUES (?, ?, ?, ?)').bind(userId, content || '', media_url || null, privacy_setting || 'public').run();
  const post = await env.DB.prepare('SELECT * FROM posts WHERE id = last_insert_rowid()').first();
  return json({ post }, 201);
}
async function getPost(env, id, userId) {
  if (!/^[0-9]+$/.test(id)) return json({ error: 'Invalid id' }, 400);
  const post = await env.DB.prepare('SELECT p.*, (SELECT COUNT(*) FROM post_likes pl WHERE pl.post_id = p.id) as like_count FROM posts p WHERE p.id = ?').bind(Number(id)).first();
  if (!post) return json({ error: 'Not found' }, 404);
  return json({ post });
}
async function deletePost(env, id, userId) {
  if (!/^[0-9]+$/.test(id)) return json({ error: 'Invalid id' }, 400);
  const post = await env.DB.prepare('SELECT id, user_id FROM posts WHERE id = ?').bind(Number(id)).first();
  if (!post) return json({ error: 'Not found' }, 404);
  if (post.user_id !== userId) return json({ error: 'Forbidden' }, 403);
  await env.DB.prepare('DELETE FROM posts WHERE id = ?').bind(post.id).run();
  return json({ deleted: true });
}
async function getFeed(env, userId) {
  // Get friend ids
  const friends = await env.DB.prepare('SELECT user_id_a, user_id_b FROM friends WHERE user_id_a = ? OR user_id_b = ?').bind(userId, userId).all();
  const ids = new Set([userId]);
  for (const r of friends.results) { ids.add(r.user_id_a); ids.add(r.user_id_b); }
  const idList = Array.from(ids).join(',');
  const query = `SELECT p.*, (SELECT COUNT(*) FROM post_likes pl WHERE pl.post_id = p.id) as like_count FROM posts p WHERE p.user_id IN (${idList}) ORDER BY p.post_date DESC LIMIT 50`;
  const rows = await env.DB.prepare(query).all();
  let posts = rows.results;
  // Insert ads every 5 posts
  for (let i = 5; i < posts.length; i += 6) {
    const ad = await env.DB.prepare('SELECT id, title, image_url, target_url FROM ads ORDER BY RANDOM() LIMIT 1').first();
    if (ad) posts.splice(i, 0, { ad });
  }
  return json({ feed: posts });
}

// Explore: return platform-wide posts (public) with ads injected
async function getExplore(env, userId) {
  const rows = await env.DB.prepare('SELECT p.*, (SELECT COUNT(*) FROM post_likes pl WHERE pl.post_id = p.id) as like_count FROM posts p WHERE p.privacy_setting = "public" ORDER BY p.post_date DESC LIMIT 100').all();
  let posts = rows.results;
  for (let i = 5; i < posts.length; i += 6) {
    const ad = await env.DB.prepare('SELECT id, title, image_url, target_url FROM ads ORDER BY RANDOM() LIMIT 1').first();
    if (ad) posts.splice(i, 0, { ad });
  }
  return json({ feed: posts });
}

// Likes & Comments
async function toggleLike(env, postId, userId) {
  if (!/^[0-9]+$/.test(postId)) return json({ error: 'Invalid id' }, 400);
  const existing = await env.DB.prepare('SELECT post_id FROM post_likes WHERE post_id = ? AND user_id = ?').bind(Number(postId), userId).first();
  if (existing) {
    await env.DB.prepare('DELETE FROM post_likes WHERE post_id = ? AND user_id = ?').bind(Number(postId), userId).run();
    return json({ liked: false });
  } else {
    await env.DB.prepare('INSERT INTO post_likes (post_id, user_id) VALUES (?, ?)').bind(Number(postId), userId).run();
    const owner = await env.DB.prepare('SELECT user_id FROM posts WHERE id = ?').bind(Number(postId)).first();
    if (owner) await createNotification(env, owner.user_id, 'like', Number(postId), 'Your post was liked');
    return json({ liked: true });
  }
}
async function addComment(request, env, postId, userId) {
  const body = await readBody(request); const { text } = body;
  if (!text) return json({ error: 'Missing text' }, 400);
  await env.DB.prepare('INSERT INTO post_comments (post_id, user_id, text) VALUES (?, ?, ?)').bind(Number(postId), userId, text).run();
  const owner = await env.DB.prepare('SELECT user_id FROM posts WHERE id = ?').bind(Number(postId)).first();
  if (owner) await createNotification(env, owner.user_id, 'comment', Number(postId), 'New comment on your post');
  return json({ commented: true }, 201);
}
async function listComments(env, postId) {
  const rows = await env.DB.prepare('SELECT c.*, u.username FROM post_comments c JOIN users u ON c.user_id = u.id WHERE c.post_id = ? ORDER BY c.created_at ASC').bind(Number(postId)).all();
  return json({ comments: rows.results });
}

// Messaging
async function getThread(env, userId, otherId) {
  if (!/^[0-9]+$/.test(otherId)) return json({ error: 'Invalid id' }, 400);
  const rows = await env.DB.prepare('SELECT * FROM messages WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?) ORDER BY sent_date ASC LIMIT 200').bind(userId, Number(otherId), Number(otherId), userId).all();
  return json({ messages: rows.results });
}
async function sendMessage(request, env, senderId, recipientId) {
  if (!/^[0-9]+$/.test(recipientId)) return json({ error: 'Invalid id' }, 400);
  const body = await readBody(request); const { text, media_url } = body;
  if (!text && !media_url) return json({ error: 'Empty message' }, 400);
  await env.DB.prepare('INSERT INTO messages (sender_id, receiver_id, text, media_url) VALUES (?, ?, ?, ?)').bind(senderId, Number(recipientId), text || '', media_url || null).run();
  await createNotification(env, Number(recipientId), 'message', null, 'New message received');
  return json({ sent: true }, 201);
}

// Notifications
async function createNotification(env, userId, type, refId, message) {
  await env.DB.prepare('INSERT INTO notifications (user_id, type, ref_id, message) VALUES (?, ?, ?, ?)').bind(userId, type, refId || null, message || '').run();
}
async function listNotifications(env, userId) {
  const rows = await env.DB.prepare('SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT 100').bind(userId).all();
  return json({ notifications: rows.results });
}
async function markNotificationsRead(request, env, userId) {
  const body = await readBody(request); const { ids } = body;
  if (!Array.isArray(ids) || ids.length === 0) return json({ error: 'No ids' }, 400);
  for (const id of ids) {
    if (/^[0-9]+$/.test(id)) await env.DB.prepare('UPDATE notifications SET read = 1 WHERE id = ? AND user_id = ?').bind(id, userId).run();
  }
  return json({ read: true });
}

// Ads (existing simplified)
async function getRandomAd(env) {
  const ad = await env.DB.prepare('SELECT id, title, image_url, target_url FROM ads ORDER BY RANDOM() LIMIT 1').first();
  return ad ? json({ ad }) : json({ error: 'No ads available' }, 404);
}
async function recordAdMetric(env, id, kind) {
  if (!/^[0-9]+$/.test(id)) return json({ error: 'Invalid id' }, 400);
  const column = kind === 'click' ? 'click_count' : 'impression_count';
  await env.DB.prepare(`UPDATE ads SET ${column} = ${column} + 1 WHERE id = ?`).bind(Number(id)).run();
  const row = await env.DB.prepare('SELECT * FROM ads WHERE id = ?').bind(Number(id)).first();
  return json({ ad: row });
}
async function seedAdsIfEmpty(env) {
  const c = await env.DB.prepare('SELECT COUNT(*) as cnt FROM ads').first();
  if (c.cnt > 0) return json({ seeded: false, count: c.cnt });
  const insert = env.DB.prepare('INSERT INTO ads (title, image_url, target_url) VALUES (?, ?, ?)');
  await insert.bind('Seed Ad A', 'https://placehold.co/320x100?text=Seed+A', 'https://example.com/a').run();
  await insert.bind('Seed Ad B', 'https://placehold.co/320x100?text=Seed+B', 'https://example.com/b').run();
  return json({ seeded: true });
}
