-- Core schema for GraceNook social platform
-- Users & Profiles
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE,
  phone TEXT,
  username TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

CREATE TABLE IF NOT EXISTS profiles (
  user_id INTEGER PRIMARY KEY,
  bio TEXT,
  privacy_setting TEXT NOT NULL DEFAULT 'public',
  profile_photo TEXT,
  FOREIGN KEY(user_id) REFERENCES users(id)
);

-- Friend Requests & Friendships
CREATE TABLE IF NOT EXISTS friend_requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  requester_id INTEGER NOT NULL,
  addressee_id INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  request_date TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  UNIQUE(requester_id, addressee_id),
  FOREIGN KEY(requester_id) REFERENCES users(id),
  FOREIGN KEY(addressee_id) REFERENCES users(id)
);
CREATE INDEX IF NOT EXISTS idx_friend_requests_status ON friend_requests(status);

CREATE TABLE IF NOT EXISTS friends (
  user_id_a INTEGER NOT NULL,
  user_id_b INTEGER NOT NULL,
  since TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  PRIMARY KEY(user_id_a, user_id_b)
);

-- Posts, Likes, Comments
CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  content TEXT,
  media_url TEXT,
  post_date TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  privacy_setting TEXT NOT NULL DEFAULT 'public',
  FOREIGN KEY(user_id) REFERENCES users(id)
);
CREATE INDEX IF NOT EXISTS idx_posts_user ON posts(user_id);
CREATE INDEX IF NOT EXISTS idx_posts_privacy ON posts(privacy_setting);

CREATE TABLE IF NOT EXISTS post_likes (
  post_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  PRIMARY KEY(post_id, user_id)
);
CREATE INDEX IF NOT EXISTS idx_post_likes_post ON post_likes(post_id);

CREATE TABLE IF NOT EXISTS post_comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  text TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  FOREIGN KEY(post_id) REFERENCES posts(id),
  FOREIGN KEY(user_id) REFERENCES users(id)
);
CREATE INDEX IF NOT EXISTS idx_post_comments_post ON post_comments(post_id);

-- Messages
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sender_id INTEGER NOT NULL,
  receiver_id INTEGER NOT NULL,
  text TEXT,
  media_url TEXT,
  sent_date TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  FOREIGN KEY(sender_id) REFERENCES users(id),
  FOREIGN KEY(receiver_id) REFERENCES users(id)
);
CREATE INDEX IF NOT EXISTS idx_messages_pair ON messages(sender_id, receiver_id);

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  type TEXT NOT NULL,
  ref_id INTEGER,
  message TEXT,
  read INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  FOREIGN KEY(user_id) REFERENCES users(id)
);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);

-- Basic seed user for testing (if empty)
INSERT INTO users (username, name, email, password_hash)
SELECT 'demo', 'Demo User', 'demo@example.com', 'demo_hash'
WHERE NOT EXISTS (SELECT 1 FROM users);
INSERT INTO profiles (user_id, bio) SELECT id, 'Hello from demo profile' FROM users WHERE username='demo' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='demo'));
