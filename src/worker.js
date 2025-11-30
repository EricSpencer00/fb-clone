// GraceNook Worker: Complete Social Networking API
// Features: Auth, Users, Profiles, Posts, Friends, Messages, Notifications, Ads, Admin

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const { pathname, searchParams } = url;

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return cors(new Response(null, { status: 204 }));
    }

    try {
      // Initialize database tables if needed
      await initDB(env);

      // ===== PUBLIC ROUTES =====
      if (pathname === '/api/auth/register' && request.method === 'POST') {
        return cors(await registerUser(request, env));
      }
      if (pathname === '/api/auth/login' && request.method === 'POST') {
        return cors(await loginUser(request, env));
      }
      if (pathname === '/api/ads' && request.method === 'GET') {
        return cors(await getRandomAd(env));
      }
      if (pathname.match(/^\/api\/ads\/\d+\/impression$/) && request.method === 'POST') {
        const id = pathname.split('/')[3];
        return cors(await recordAdMetric(env, id, 'impression'));
      }
      if (pathname.match(/^\/api\/ads\/\d+\/click$/) && request.method === 'POST') {
        const id = pathname.split('/')[3];
        return cors(await recordAdMetric(env, id, 'click'));
      }

      // ===== PROTECTED ROUTES =====
      const authUser = await requireAuth(request, env);
      if (!authUser) return cors(json({ error: 'Unauthorized' }, 401));

      // --- User Profile ---
      if (pathname === '/api/me' && request.method === 'GET') {
        return cors(await getCurrentUser(env, authUser.id));
      }
      if (pathname === '/api/profile' && request.method === 'PATCH') {
        return cors(await updateProfile(request, env, authUser.id));
      }
      if (pathname.match(/^\/api\/users\/\d+$/) && request.method === 'GET') {
        const id = pathname.split('/').pop();
        return cors(await getUser(env, id, authUser.id));
      }
      if (pathname === '/api/users/search' && request.method === 'GET') {
        const q = searchParams.get('q') || '';
        return cors(await searchUsers(env, q, authUser.id));
      }

      // --- Posts ---
      if (pathname === '/api/posts' && request.method === 'POST') {
        return cors(await createPost(request, env, authUser.id));
      }
      if (pathname === '/api/posts/feed' && request.method === 'GET') {
        return cors(await getFeed(env, authUser.id));
      }
      if (pathname === '/api/posts/explore' && request.method === 'GET') {
        return cors(await getExplore(env, authUser.id));
      }
      if (pathname.match(/^\/api\/posts\/\d+$/) && request.method === 'GET') {
        const id = pathname.split('/').pop();
        return cors(await getPost(env, id, authUser.id));
      }
      if (pathname.match(/^\/api\/posts\/\d+$/) && request.method === 'DELETE') {
        const id = pathname.split('/').pop();
        return cors(await deletePost(env, id, authUser.id));
      }
      if (pathname.match(/^\/api\/posts\/\d+\/like$/) && request.method === 'POST') {
        const postId = pathname.split('/')[3];
        return cors(await toggleLike(env, postId, authUser.id));
      }
      if (pathname.match(/^\/api\/posts\/\d+\/comment$/) && request.method === 'POST') {
        const postId = pathname.split('/')[3];
        return cors(await addComment(request, env, postId, authUser.id));
      }
      if (pathname.match(/^\/api\/posts\/\d+\/comments$/) && request.method === 'GET') {
        const postId = pathname.split('/')[3];
        return cors(await listComments(env, postId));
      }
      if (pathname.match(/^\/api\/posts\/\d+\/report$/) && request.method === 'POST') {
        const postId = pathname.split('/')[3];
        return cors(await reportContent(request, env, authUser.id, 'post', postId));
      }

      // --- Friends ---
      if (pathname === '/api/friends' && request.method === 'GET') {
        return cors(await listFriends(env, authUser.id));
      }
      if (pathname === '/api/friends/request' && request.method === 'POST') {
        return cors(await createFriendRequest(request, env, authUser.id));
      }
      if (pathname === '/api/friends/pending' && request.method === 'GET') {
        return cors(await listPendingRequests(env, authUser.id));
      }
      if (pathname === '/api/friends/sent' && request.method === 'GET') {
        return cors(await listSentRequests(env, authUser.id));
      }
      if (pathname.match(/^\/api\/friends\/accept\/\d+$/) && request.method === 'POST') {
        const requestId = pathname.split('/').pop();
        return cors(await acceptFriendRequest(env, authUser.id, requestId));
      }
      if (pathname.match(/^\/api\/friends\/decline\/\d+$/) && request.method === 'POST') {
        const requestId = pathname.split('/').pop();
        return cors(await declineFriendRequest(env, authUser.id, requestId));
      }
      if (pathname.match(/^\/api\/friends\/remove\/\d+$/) && request.method === 'DELETE') {
        const friendId = pathname.split('/').pop();
        return cors(await removeFriend(env, authUser.id, friendId));
      }
      if (pathname.match(/^\/api\/users\/\d+\/block$/) && request.method === 'POST') {
        const userId = pathname.split('/')[3];
        return cors(await blockUser(env, authUser.id, userId));
      }

      // --- Messages ---
      if (pathname === '/api/messages/conversations' && request.method === 'GET') {
        return cors(await listConversations(env, authUser.id));
      }
      if (pathname.match(/^\/api\/messages\/thread\/\d+$/) && request.method === 'GET') {
        const otherId = pathname.split('/').pop();
        return cors(await getThread(env, authUser.id, otherId));
      }
      if (pathname.match(/^\/api\/messages\/\d+$/) && request.method === 'POST') {
        const recipientId = pathname.split('/').pop();
        return cors(await sendMessage(request, env, authUser.id, recipientId));
      }

      // --- Notifications ---
      if (pathname === '/api/notifications' && request.method === 'GET') {
        return cors(await listNotifications(env, authUser.id));
      }
      if (pathname === '/api/notifications/unread-count' && request.method === 'GET') {
        return cors(await getUnreadCount(env, authUser.id));
      }
      if (pathname === '/api/notifications/read' && request.method === 'POST') {
        return cors(await markNotificationsRead(request, env, authUser.id));
      }
      if (pathname === '/api/notifications/read-all' && request.method === 'POST') {
        return cors(await markAllNotificationsRead(env, authUser.id));
      }

      // ===== ADVERTISER ROUTES =====
      if (authUser.role === 'advertiser' || authUser.role === 'admin') {
        if (pathname === '/api/advertiser/ads' && request.method === 'GET') {
          return cors(await listAdvertiserAds(env, authUser.id));
        }
        if (pathname === '/api/advertiser/ads' && request.method === 'POST') {
          return cors(await createAd(request, env, authUser.id));
        }
        if (pathname.match(/^\/api\/advertiser\/ads\/\d+$/) && request.method === 'PATCH') {
          const adId = pathname.split('/').pop();
          return cors(await updateAd(request, env, authUser.id, adId));
        }
        if (pathname === '/api/advertiser/stats' && request.method === 'GET') {
          return cors(await getAdvertiserStats(env, authUser.id));
        }
      }

      // ===== ADMIN ROUTES =====
      if (authUser.role === 'admin') {
        if (pathname === '/api/admin/users' && request.method === 'GET') {
          return cors(await listAllUsers(env));
        }
        if (pathname.match(/^\/api\/admin\/users\/\d+$/) && request.method === 'PATCH') {
          const userId = pathname.split('/').pop();
          return cors(await updateUserRole(request, env, userId));
        }
        if (pathname === '/api/admin/reports' && request.method === 'GET') {
          return cors(await listReports(env));
        }
        if (pathname.match(/^\/api\/admin\/reports\/\d+$/) && request.method === 'PATCH') {
          const reportId = pathname.split('/').pop();
          return cors(await resolveReport(request, env, authUser.id, reportId));
        }
        if (pathname === '/api/admin/ads/pending' && request.method === 'GET') {
          return cors(await listPendingAds(env));
        }
        if (pathname.match(/^\/api\/admin\/ads\/\d+\/approve$/) && request.method === 'POST') {
          const adId = pathname.split('/')[4];
          return cors(await approveAd(env, authUser.id, adId));
        }
        if (pathname.match(/^\/api\/admin\/ads\/\d+\/reject$/) && request.method === 'POST') {
          const adId = pathname.split('/')[4];
          return cors(await rejectAd(request, env, authUser.id, adId));
        }
        if (pathname === '/api/admin/stats' && request.method === 'GET') {
          return cors(await getAdminStats(env));
        }
        if (pathname.match(/^\/api\/admin\/posts\/\d+$/) && request.method === 'DELETE') {
          const postId = pathname.split('/').pop();
          return cors(await adminDeletePost(env, authUser.id, postId));
        }
      }

      return cors(json({ error: 'Not found' }, 404));
    } catch (e) {
      console.error('Worker error:', e);
      return cors(json({ error: e.message || 'Server error' }, 500));
    }
  }
};

// ===== UTILITIES =====
function cors(response) {
  const headers = new Headers(response.headers);
  headers.set('Access-Control-Allow-Origin', '*');
  headers.set('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return new Response(response.body, { status: response.status, headers });
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}

async function readBody(request) {
  try {
    const text = await request.text();
    return text ? JSON.parse(text) : {};
  } catch { return {}; }
}

// ===== DATABASE INIT =====
async function initDB(env) {
  try {
    await env.DB.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE,
        phone TEXT UNIQUE,
        username TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        password_hash TEXT NOT NULL,
        role TEXT DEFAULT 'user',
        registration_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        is_active INTEGER DEFAULT 1
      );
      CREATE TABLE IF NOT EXISTS profiles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER UNIQUE NOT NULL,
        bio TEXT DEFAULT '',
        profile_photo TEXT,
        privacy_setting TEXT DEFAULT 'public',
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
      CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        content TEXT,
        media_url TEXT,
        privacy_setting TEXT DEFAULT 'public',
        post_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        is_flagged INTEGER DEFAULT 0,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
      CREATE TABLE IF NOT EXISTS post_likes (
        post_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (post_id, user_id)
      );
      CREATE TABLE IF NOT EXISTS post_comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        post_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        text TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        is_flagged INTEGER DEFAULT 0
      );
      CREATE TABLE IF NOT EXISTS friend_requests (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        requester_id INTEGER NOT NULL,
        addressee_id INTEGER NOT NULL,
        status TEXT DEFAULT 'pending',
        request_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(requester_id, addressee_id)
      );
      CREATE TABLE IF NOT EXISTS friends (
        user_id_a INTEGER NOT NULL,
        user_id_b INTEGER NOT NULL,
        friend_since DATETIME DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (user_id_a, user_id_b)
      );
      CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sender_id INTEGER NOT NULL,
        receiver_id INTEGER NOT NULL,
        text TEXT,
        media_url TEXT,
        sent_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        is_read INTEGER DEFAULT 0
      );
      CREATE TABLE IF NOT EXISTS notifications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        type TEXT NOT NULL,
        ref_id INTEGER,
        message TEXT,
        read INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS ads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        advertiser_id INTEGER,
        title TEXT NOT NULL,
        image_url TEXT NOT NULL,
        target_url TEXT NOT NULL,
        status TEXT DEFAULT 'pending',
        rejection_reason TEXT,
        impression_count INTEGER DEFAULT 0,
        click_count INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        reviewed_by INTEGER
      );
      CREATE TABLE IF NOT EXISTS reports (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        reporter_id INTEGER NOT NULL,
        content_type TEXT NOT NULL,
        content_id INTEGER NOT NULL,
        reason TEXT NOT NULL,
        details TEXT,
        status TEXT DEFAULT 'pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS blocked_users (
        blocker_id INTEGER NOT NULL,
        blocked_id INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (blocker_id, blocked_id)
      );
    `);
  } catch (e) {
    // Tables may already exist
  }
}

// ===== AUTH HELPERS =====
async function hashPassword(password, salt = crypto.getRandomValues(new Uint8Array(16))) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' }, key, 256);
  return b64url(salt) + '.' + b64url(new Uint8Array(bits));
}

async function verifyPassword(password, stored) {
  const [saltB64] = stored.split('.');
  const salt = fromB64url(saltB64);
  return await hashPassword(password, salt) === stored;
}

function b64url(buf) {
  return btoa(String.fromCharCode(...buf)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromB64url(str) {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) str += '=';
  const bin = atob(str);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
  return arr;
}

async function signJWT(payload, secret) {
  const header = { alg: 'HS256', typ: 'JWT' };
  const enc = (obj) => b64url(new TextEncoder().encode(JSON.stringify(obj)));
  const data = enc(header) + '.' + enc(payload);
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = new Uint8Array(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data)));
  return data + '.' + b64url(sig);
}

async function verifyJWT(token, secret) {
  try {
    const [h, p, sig] = token.split('.');
    if (!h || !p || !sig) return null;
    const data = h + '.' + p;
    const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
    const expected = b64url(new Uint8Array(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data))));
    if (expected !== sig) return null;
    return JSON.parse(atob(p.replace(/-/g, '+').replace(/_/g, '/')));
  } catch { return null; }
}

async function requireAuth(request, env) {
  const auth = request.headers.get('Authorization');
  if (!auth?.startsWith('Bearer ')) return null;
  const payload = await verifyJWT(auth.substring(7), env.JWT_SECRET);
  if (!payload?.id) return null;
  // Fetch current role from DB
  const user = await env.DB.prepare('SELECT id, username, role FROM users WHERE id = ?').bind(payload.id).first();
  return user || null;
}

// ===== AUTH ENDPOINTS =====
async function registerUser(request, env) {
  const { email, phone, username, name, password } = await readBody(request);
  if (!username || !name || !password || (!email && !phone)) {
    return json({ error: 'Missing required fields' }, 400);
  }
  const existing = await env.DB.prepare('SELECT id FROM users WHERE username = ? OR email = ?').bind(username, email || '').first();
  if (existing) return json({ error: 'User already exists' }, 409);

  const pwdHash = await hashPassword(password);
  await env.DB.prepare('INSERT INTO users (email, phone, username, name, password_hash) VALUES (?, ?, ?, ?, ?)')
    .bind(email || null, phone || null, username, name, pwdHash).run();

  const user = await env.DB.prepare('SELECT id, username, name, email, role FROM users WHERE username = ?').bind(username).first();
  await env.DB.prepare('INSERT INTO profiles (user_id, bio) VALUES (?, ?)').bind(user.id, '').run();

  const token = await signJWT({ id: user.id, username: user.username, role: user.role }, env.JWT_SECRET);
  return json({ user, token }, 201);
}

async function loginUser(request, env) {
  const { identifier, password } = await readBody(request);
  if (!identifier || !password) return json({ error: 'Missing credentials' }, 400);

  const user = await env.DB.prepare('SELECT * FROM users WHERE username = ? OR email = ? OR phone = ?')
    .bind(identifier, identifier, identifier).first();
  if (!user) return json({ error: 'Invalid credentials' }, 401);

  const valid = await verifyPassword(password, user.password_hash);
  if (!valid) return json({ error: 'Invalid credentials' }, 401);

  await env.DB.prepare('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?').bind(user.id).run();

  const token = await signJWT({ id: user.id, username: user.username, role: user.role }, env.JWT_SECRET);
  delete user.password_hash;
  return json({ user, token });
}

// ===== USER ENDPOINTS =====
async function getCurrentUser(env, userId) {
  const user = await env.DB.prepare(`
    SELECT u.id, u.username, u.name, u.email, u.role, u.registration_date,
           p.bio, p.profile_photo, p.privacy_setting
    FROM users u LEFT JOIN profiles p ON u.id = p.user_id WHERE u.id = ?
  `).bind(userId).first();
  return json({ user });
}

async function getUser(env, id, requesterId) {
  const user = await env.DB.prepare(`
    SELECT u.id, u.username, u.name, u.registration_date,
           p.bio, p.profile_photo, p.privacy_setting
    FROM users u LEFT JOIN profiles p ON u.id = p.user_id WHERE u.id = ?
  `).bind(Number(id)).first();
  if (!user) return json({ error: 'User not found' }, 404);

  // Check if friends
  const a = Math.min(Number(id), requesterId), b = Math.max(Number(id), requesterId);
  const friendship = await env.DB.prepare('SELECT * FROM friends WHERE user_id_a = ? AND user_id_b = ?').bind(a, b).first();
  user.isFriend = !!friendship;

  // Get post count
  const postCount = await env.DB.prepare('SELECT COUNT(*) as count FROM posts WHERE user_id = ?').bind(Number(id)).first();
  user.postCount = postCount?.count || 0;

  // Get friend count
  const friendCount = await env.DB.prepare('SELECT COUNT(*) as count FROM friends WHERE user_id_a = ? OR user_id_b = ?').bind(Number(id), Number(id)).first();
  user.friendCount = friendCount?.count || 0;

  return json({ user });
}

async function searchUsers(env, q, userId) {
  const like = `%${q}%`;
  const users = await env.DB.prepare(`
    SELECT u.id, u.username, u.name, p.profile_photo
    FROM users u LEFT JOIN profiles p ON u.id = p.user_id
    WHERE (u.username LIKE ? OR u.name LIKE ?) AND u.id != ?
    LIMIT 20
  `).bind(like, like, userId).all();
  return json({ users: users.results });
}

async function updateProfile(request, env, userId) {
  const { bio, privacy_setting, profile_photo } = await readBody(request);
  await env.DB.prepare(`
    UPDATE profiles SET 
      bio = COALESCE(?, bio),
      privacy_setting = COALESCE(?, privacy_setting),
      profile_photo = COALESCE(?, profile_photo)
    WHERE user_id = ?
  `).bind(bio ?? null, privacy_setting ?? null, profile_photo ?? null, userId).run();

  const profile = await env.DB.prepare('SELECT * FROM profiles WHERE user_id = ?').bind(userId).first();
  return json({ profile });
}

// ===== POST ENDPOINTS =====
async function createPost(request, env, userId) {
  const { content, media_url, privacy_setting } = await readBody(request);
  if (!content && !media_url) return json({ error: 'Post must have content or media' }, 400);

  await env.DB.prepare('INSERT INTO posts (user_id, content, media_url, privacy_setting) VALUES (?, ?, ?, ?)')
    .bind(userId, content || '', media_url || null, privacy_setting || 'public').run();

  const post = await env.DB.prepare('SELECT * FROM posts WHERE user_id = ? ORDER BY id DESC LIMIT 1').bind(userId).first();
  return json({ post }, 201);
}

async function getPost(env, id, userId) {
  const post = await env.DB.prepare(`
    SELECT p.*, u.username, u.name, pr.profile_photo,
           (SELECT COUNT(*) FROM post_likes WHERE post_id = p.id) as like_count,
           (SELECT COUNT(*) FROM post_comments WHERE post_id = p.id) as comment_count,
           EXISTS(SELECT 1 FROM post_likes WHERE post_id = p.id AND user_id = ?) as liked_by_me
    FROM posts p
    JOIN users u ON p.user_id = u.id
    LEFT JOIN profiles pr ON u.id = pr.user_id
    WHERE p.id = ?
  `).bind(userId, Number(id)).first();
  if (!post) return json({ error: 'Post not found' }, 404);
  return json({ post });
}

async function deletePost(env, id, userId) {
  const post = await env.DB.prepare('SELECT user_id FROM posts WHERE id = ?').bind(Number(id)).first();
  if (!post) return json({ error: 'Post not found' }, 404);
  if (post.user_id !== userId) return json({ error: 'Forbidden' }, 403);

  await env.DB.prepare('DELETE FROM posts WHERE id = ?').bind(Number(id)).run();
  return json({ deleted: true });
}

async function getFeed(env, userId) {
  // Get friend IDs
  const friends = await env.DB.prepare('SELECT user_id_a, user_id_b FROM friends WHERE user_id_a = ? OR user_id_b = ?')
    .bind(userId, userId).all();
  const friendIds = new Set([userId]);
  friends.results.forEach(f => { friendIds.add(f.user_id_a); friendIds.add(f.user_id_b); });

  const idList = Array.from(friendIds).join(',');
  const posts = await env.DB.prepare(`
    SELECT p.*, u.username, u.name, pr.profile_photo,
           (SELECT COUNT(*) FROM post_likes WHERE post_id = p.id) as like_count,
           (SELECT COUNT(*) FROM post_comments WHERE post_id = p.id) as comment_count,
           EXISTS(SELECT 1 FROM post_likes WHERE post_id = p.id AND user_id = ${userId}) as liked_by_me
    FROM posts p
    JOIN users u ON p.user_id = u.id
    LEFT JOIN profiles pr ON u.id = pr.user_id
    WHERE p.user_id IN (${idList}) AND p.is_flagged = 0
    ORDER BY p.post_date DESC LIMIT 50
  `).all();

  // Inject ads every 5 posts
  const feed = await injectAds(env, posts.results);
  return json({ feed });
}

async function getExplore(env, userId) {
  const posts = await env.DB.prepare(`
    SELECT p.*, u.username, u.name, pr.profile_photo,
           (SELECT COUNT(*) FROM post_likes WHERE post_id = p.id) as like_count,
           (SELECT COUNT(*) FROM post_comments WHERE post_id = p.id) as comment_count,
           EXISTS(SELECT 1 FROM post_likes WHERE post_id = p.id AND user_id = ?) as liked_by_me
    FROM posts p
    JOIN users u ON p.user_id = u.id
    LEFT JOIN profiles pr ON u.id = pr.user_id
    WHERE p.privacy_setting = 'public' AND p.is_flagged = 0
    ORDER BY p.post_date DESC LIMIT 100
  `).bind(userId).all();

  const feed = await injectAds(env, posts.results);
  return json({ feed });
}

async function injectAds(env, posts) {
  const feed = [...posts];
  for (let i = 5; i < feed.length + Math.floor(feed.length / 5); i += 6) {
    const ad = await env.DB.prepare("SELECT id, title, image_url, target_url FROM ads WHERE status = 'active' ORDER BY RANDOM() LIMIT 1").first();
    if (ad) {
      feed.splice(i, 0, { isAd: true, ...ad });
    }
  }
  return feed;
}

// ===== LIKES & COMMENTS =====
async function toggleLike(env, postId, userId) {
  const existing = await env.DB.prepare('SELECT 1 FROM post_likes WHERE post_id = ? AND user_id = ?')
    .bind(Number(postId), userId).first();

  if (existing) {
    await env.DB.prepare('DELETE FROM post_likes WHERE post_id = ? AND user_id = ?').bind(Number(postId), userId).run();
    return json({ liked: false });
  } else {
    await env.DB.prepare('INSERT INTO post_likes (post_id, user_id) VALUES (?, ?)').bind(Number(postId), userId).run();
    // Notify post owner
    const post = await env.DB.prepare('SELECT user_id FROM posts WHERE id = ?').bind(Number(postId)).first();
    if (post && post.user_id !== userId) {
      await createNotification(env, post.user_id, 'like', Number(postId), 'Someone liked your post');
    }
    return json({ liked: true });
  }
}

async function addComment(request, env, postId, userId) {
  const { text } = await readBody(request);
  if (!text?.trim()) return json({ error: 'Comment text required' }, 400);

  await env.DB.prepare('INSERT INTO post_comments (post_id, user_id, text) VALUES (?, ?, ?)')
    .bind(Number(postId), userId, text.trim()).run();

  const post = await env.DB.prepare('SELECT user_id FROM posts WHERE id = ?').bind(Number(postId)).first();
  if (post && post.user_id !== userId) {
    await createNotification(env, post.user_id, 'comment', Number(postId), 'Someone commented on your post');
  }

  return json({ success: true }, 201);
}

async function listComments(env, postId) {
  const comments = await env.DB.prepare(`
    SELECT c.*, u.username, u.name, p.profile_photo
    FROM post_comments c
    JOIN users u ON c.user_id = u.id
    LEFT JOIN profiles p ON u.id = p.user_id
    WHERE c.post_id = ? AND c.is_flagged = 0
    ORDER BY c.created_at ASC
  `).bind(Number(postId)).all();
  return json({ comments: comments.results });
}

async function reportContent(request, env, userId, contentType, contentId) {
  const { reason, details } = await readBody(request);
  if (!reason) return json({ error: 'Reason required' }, 400);

  await env.DB.prepare('INSERT INTO reports (reporter_id, content_type, content_id, reason, details) VALUES (?, ?, ?, ?, ?)')
    .bind(userId, contentType, Number(contentId), reason, details || null).run();

  return json({ reported: true });
}

// ===== FRIENDS =====
async function listFriends(env, userId) {
  const friends = await env.DB.prepare(`
    SELECT u.id, u.username, u.name, p.profile_photo, f.friend_since
    FROM friends f
    JOIN users u ON (f.user_id_a = u.id OR f.user_id_b = u.id) AND u.id != ?
    LEFT JOIN profiles p ON u.id = p.user_id
    WHERE f.user_id_a = ? OR f.user_id_b = ?
  `).bind(userId, userId, userId).all();
  return json({ friends: friends.results });
}

async function createFriendRequest(request, env, userId) {
  const { user_id } = await readBody(request);
  if (!user_id) return json({ error: 'user_id required' }, 400);
  if (Number(user_id) === userId) return json({ error: 'Cannot friend yourself' }, 400);

  // Check if already friends
  const a = Math.min(userId, Number(user_id)), b = Math.max(userId, Number(user_id));
  const existing = await env.DB.prepare('SELECT 1 FROM friends WHERE user_id_a = ? AND user_id_b = ?').bind(a, b).first();
  if (existing) return json({ error: 'Already friends' }, 409);

  // Check if request exists
  const req = await env.DB.prepare('SELECT * FROM friend_requests WHERE requester_id = ? AND addressee_id = ?')
    .bind(userId, Number(user_id)).first();
  if (req) return json({ error: 'Request already sent' }, 409);

  await env.DB.prepare('INSERT INTO friend_requests (requester_id, addressee_id) VALUES (?, ?)')
    .bind(userId, Number(user_id)).run();

  await createNotification(env, Number(user_id), 'friend_request', userId, 'You have a new friend request');
  return json({ success: true }, 201);
}

async function listPendingRequests(env, userId) {
  const requests = await env.DB.prepare(`
    SELECT fr.id, fr.request_date, u.id as user_id, u.username, u.name, p.profile_photo
    FROM friend_requests fr
    JOIN users u ON fr.requester_id = u.id
    LEFT JOIN profiles p ON u.id = p.user_id
    WHERE fr.addressee_id = ? AND fr.status = 'pending'
  `).bind(userId).all();
  return json({ requests: requests.results });
}

async function listSentRequests(env, userId) {
  const requests = await env.DB.prepare(`
    SELECT fr.id, fr.request_date, fr.status, u.id as user_id, u.username, u.name
    FROM friend_requests fr
    JOIN users u ON fr.addressee_id = u.id
    WHERE fr.requester_id = ?
  `).bind(userId).all();
  return json({ requests: requests.results });
}

async function acceptFriendRequest(env, userId, requestId) {
  const req = await env.DB.prepare('SELECT * FROM friend_requests WHERE id = ? AND addressee_id = ? AND status = "pending"')
    .bind(Number(requestId), userId).first();
  if (!req) return json({ error: 'Request not found' }, 404);

  await env.DB.prepare("UPDATE friend_requests SET status = 'accepted' WHERE id = ?").bind(Number(requestId)).run();

  const a = Math.min(req.requester_id, req.addressee_id);
  const b = Math.max(req.requester_id, req.addressee_id);
  await env.DB.prepare('INSERT OR IGNORE INTO friends (user_id_a, user_id_b) VALUES (?, ?)').bind(a, b).run();

  await createNotification(env, req.requester_id, 'friend_accept', userId, 'Your friend request was accepted');
  return json({ accepted: true });
}

async function declineFriendRequest(env, userId, requestId) {
  await env.DB.prepare("UPDATE friend_requests SET status = 'declined' WHERE id = ? AND addressee_id = ?")
    .bind(Number(requestId), userId).run();
  return json({ declined: true });
}

async function removeFriend(env, userId, friendId) {
  const a = Math.min(userId, Number(friendId)), b = Math.max(userId, Number(friendId));
  await env.DB.prepare('DELETE FROM friends WHERE user_id_a = ? AND user_id_b = ?').bind(a, b).run();
  return json({ removed: true });
}

async function blockUser(env, userId, blockedId) {
  await env.DB.prepare('INSERT OR IGNORE INTO blocked_users (blocker_id, blocked_id) VALUES (?, ?)')
    .bind(userId, Number(blockedId)).run();
  // Also remove friendship
  const a = Math.min(userId, Number(blockedId)), b = Math.max(userId, Number(blockedId));
  await env.DB.prepare('DELETE FROM friends WHERE user_id_a = ? AND user_id_b = ?').bind(a, b).run();
  return json({ blocked: true });
}

// ===== MESSAGES =====
async function listConversations(env, userId) {
  const conversations = await env.DB.prepare(`
    SELECT 
      CASE WHEN m.sender_id = ? THEN m.receiver_id ELSE m.sender_id END as other_id,
      u.username, u.name, p.profile_photo,
      m.text as last_message, m.sent_date,
      SUM(CASE WHEN m.receiver_id = ? AND m.is_read = 0 THEN 1 ELSE 0 END) as unread_count
    FROM messages m
    JOIN users u ON (CASE WHEN m.sender_id = ? THEN m.receiver_id ELSE m.sender_id END) = u.id
    LEFT JOIN profiles p ON u.id = p.user_id
    WHERE m.sender_id = ? OR m.receiver_id = ?
    GROUP BY other_id
    ORDER BY m.sent_date DESC
  `).bind(userId, userId, userId, userId, userId).all();
  return json({ conversations: conversations.results });
}

async function getThread(env, userId, otherId) {
  const messages = await env.DB.prepare(`
    SELECT * FROM messages
    WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?)
    ORDER BY sent_date ASC LIMIT 200
  `).bind(userId, Number(otherId), Number(otherId), userId).all();

  // Mark as read
  await env.DB.prepare('UPDATE messages SET is_read = 1 WHERE sender_id = ? AND receiver_id = ?')
    .bind(Number(otherId), userId).run();

  return json({ messages: messages.results });
}

async function sendMessage(request, env, senderId, recipientId) {
  const { text, media_url } = await readBody(request);
  if (!text?.trim() && !media_url) return json({ error: 'Message cannot be empty' }, 400);

  await env.DB.prepare('INSERT INTO messages (sender_id, receiver_id, text, media_url) VALUES (?, ?, ?, ?)')
    .bind(senderId, Number(recipientId), text?.trim() || '', media_url || null).run();

  await createNotification(env, Number(recipientId), 'message', senderId, 'You have a new message');
  return json({ sent: true }, 201);
}

// ===== NOTIFICATIONS =====
async function createNotification(env, userId, type, refId, message) {
  await env.DB.prepare('INSERT INTO notifications (user_id, type, ref_id, message) VALUES (?, ?, ?, ?)')
    .bind(userId, type, refId || null, message).run();
}

async function listNotifications(env, userId) {
  const notifications = await env.DB.prepare(`
    SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT 50
  `).bind(userId).all();
  return json({ notifications: notifications.results });
}

async function getUnreadCount(env, userId) {
  const result = await env.DB.prepare('SELECT COUNT(*) as count FROM notifications WHERE user_id = ? AND read = 0')
    .bind(userId).first();
  return json({ count: result?.count || 0 });
}

async function markNotificationsRead(request, env, userId) {
  const { ids } = await readBody(request);
  if (!Array.isArray(ids)) return json({ error: 'ids array required' }, 400);

  for (const id of ids) {
    await env.DB.prepare('UPDATE notifications SET read = 1 WHERE id = ? AND user_id = ?').bind(id, userId).run();
  }
  return json({ success: true });
}

async function markAllNotificationsRead(env, userId) {
  await env.DB.prepare('UPDATE notifications SET read = 1 WHERE user_id = ?').bind(userId).run();
  return json({ success: true });
}

// ===== ADS =====
async function getRandomAd(env) {
  const ad = await env.DB.prepare("SELECT id, title, image_url, target_url FROM ads WHERE status = 'active' ORDER BY RANDOM() LIMIT 1").first();
  return ad ? json({ ad }) : json({ ad: null });
}

async function recordAdMetric(env, id, type) {
  const col = type === 'click' ? 'click_count' : 'impression_count';
  await env.DB.prepare(`UPDATE ads SET ${col} = ${col} + 1 WHERE id = ?`).bind(Number(id)).run();
  return json({ recorded: true });
}

// ===== ADVERTISER =====
async function listAdvertiserAds(env, advertiserId) {
  const ads = await env.DB.prepare('SELECT * FROM ads WHERE advertiser_id = ? ORDER BY created_at DESC')
    .bind(advertiserId).all();
  return json({ ads: ads.results });
}

async function createAd(request, env, advertiserId) {
  const { title, image_url, target_url } = await readBody(request);
  if (!title || !image_url || !target_url) return json({ error: 'All fields required' }, 400);

  await env.DB.prepare('INSERT INTO ads (advertiser_id, title, image_url, target_url) VALUES (?, ?, ?, ?)')
    .bind(advertiserId, title, image_url, target_url).run();

  return json({ success: true }, 201);
}

async function updateAd(request, env, advertiserId, adId) {
  const { title, image_url, target_url, status } = await readBody(request);
  const ad = await env.DB.prepare('SELECT * FROM ads WHERE id = ? AND advertiser_id = ?').bind(Number(adId), advertiserId).first();
  if (!ad) return json({ error: 'Ad not found' }, 404);

  await env.DB.prepare(`
    UPDATE ads SET title = COALESCE(?, title), image_url = COALESCE(?, image_url), 
    target_url = COALESCE(?, target_url), status = COALESCE(?, status) WHERE id = ?
  `).bind(title, image_url, target_url, status, Number(adId)).run();

  return json({ success: true });
}

async function getAdvertiserStats(env, advertiserId) {
  const stats = await env.DB.prepare(`
    SELECT COUNT(*) as total_ads, 
           SUM(impression_count) as total_impressions, 
           SUM(click_count) as total_clicks
    FROM ads WHERE advertiser_id = ?
  `).bind(advertiserId).first();
  return json({ stats });
}

// ===== ADMIN =====
async function listAllUsers(env) {
  const users = await env.DB.prepare('SELECT id, username, name, email, role, registration_date, is_active FROM users ORDER BY id DESC').all();
  return json({ users: users.results });
}

async function updateUserRole(request, env, userId) {
  const { role, is_active } = await readBody(request);
  await env.DB.prepare('UPDATE users SET role = COALESCE(?, role), is_active = COALESCE(?, is_active) WHERE id = ?')
    .bind(role, is_active, Number(userId)).run();
  return json({ success: true });
}

async function listReports(env) {
  const reports = await env.DB.prepare(`
    SELECT r.*, u.username as reporter_username
    FROM reports r JOIN users u ON r.reporter_id = u.id
    WHERE r.status = 'pending' ORDER BY r.created_at DESC
  `).all();
  return json({ reports: reports.results });
}

async function resolveReport(request, env, adminId, reportId) {
  const { status, action } = await readBody(request);
  await env.DB.prepare("UPDATE reports SET status = ?, reviewed_at = CURRENT_TIMESTAMP WHERE id = ?")
    .bind(status, Number(reportId)).run();

  // If action_taken, flag the content
  if (status === 'action_taken') {
    const report = await env.DB.prepare('SELECT * FROM reports WHERE id = ?').bind(Number(reportId)).first();
    if (report?.content_type === 'post') {
      await env.DB.prepare('UPDATE posts SET is_flagged = 1 WHERE id = ?').bind(report.content_id).run();
    } else if (report?.content_type === 'comment') {
      await env.DB.prepare('UPDATE post_comments SET is_flagged = 1 WHERE id = ?').bind(report.content_id).run();
    }
  }
  return json({ success: true });
}

async function listPendingAds(env) {
  const ads = await env.DB.prepare(`
    SELECT a.*, u.username as advertiser_username
    FROM ads a LEFT JOIN users u ON a.advertiser_id = u.id
    WHERE a.status = 'pending' ORDER BY a.created_at DESC
  `).all();
  return json({ ads: ads.results });
}

async function approveAd(env, adminId, adId) {
  await env.DB.prepare("UPDATE ads SET status = 'active', reviewed_by = ?, reviewed_at = CURRENT_TIMESTAMP WHERE id = ?")
    .bind(adminId, Number(adId)).run();

  const ad = await env.DB.prepare('SELECT advertiser_id FROM ads WHERE id = ?').bind(Number(adId)).first();
  if (ad?.advertiser_id) {
    await createNotification(env, ad.advertiser_id, 'ad_review', Number(adId), 'Your ad has been approved!');
  }
  return json({ approved: true });
}

async function rejectAd(request, env, adminId, adId) {
  const { reason } = await readBody(request);
  await env.DB.prepare("UPDATE ads SET status = 'rejected', rejection_reason = ?, reviewed_by = ?, reviewed_at = CURRENT_TIMESTAMP WHERE id = ?")
    .bind(reason || 'Does not meet guidelines', adminId, Number(adId)).run();

  const ad = await env.DB.prepare('SELECT advertiser_id FROM ads WHERE id = ?').bind(Number(adId)).first();
  if (ad?.advertiser_id) {
    await createNotification(env, ad.advertiser_id, 'ad_review', Number(adId), `Your ad was rejected: ${reason || 'Does not meet guidelines'}`);
  }
  return json({ rejected: true });
}

async function getAdminStats(env) {
  const users = await env.DB.prepare('SELECT COUNT(*) as count FROM users').first();
  const posts = await env.DB.prepare('SELECT COUNT(*) as count FROM posts').first();
  const reports = await env.DB.prepare("SELECT COUNT(*) as count FROM reports WHERE status = 'pending'").first();
  const pendingAds = await env.DB.prepare("SELECT COUNT(*) as count FROM ads WHERE status = 'pending'").first();
  const activeAds = await env.DB.prepare("SELECT COUNT(*) as count FROM ads WHERE status = 'active'").first();

  return json({
    stats: {
      totalUsers: users?.count || 0,
      totalPosts: posts?.count || 0,
      pendingReports: reports?.count || 0,
      pendingAds: pendingAds?.count || 0,
      activeAds: activeAds?.count || 0
    }
  });
}

async function adminDeletePost(env, adminId, postId) {
  await env.DB.prepare('DELETE FROM posts WHERE id = ?').bind(Number(postId)).run();
  return json({ deleted: true });
}
