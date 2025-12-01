**GraceNook — Database & File Specification (Physical)**

Overview
- Purpose: Support social features: users, profiles, posts, likes, comments, friends, messages, notifications, ads, reports, moderation.
- Primary data store: Cloudflare D1 (SQLite-style). Files stored externally by URL (images/media stored on a CDN or user-supplied URL). 

Tables and primary fields (physical view)
- `users`
  - Primary key: `id` (INTEGER AUTOINCREMENT)
  - Important columns: `username` (UNIQUE), `email`, `phone`, `name`, `password_hash`, `role` (user|admin|advertiser), `registration_date`, `last_login`, `is_active`
  - Access patterns: authenticate, list, admin edits, partner approvals

- `profiles`
  - Primary key: `id` (INTEGER AUTOINCREMENT)
  - Foreign key: `user_id` (UNIQUE)
  - Columns: `bio`, `profile_photo` (URL), `privacy_setting`
  - Access: profile reads/writes, profile_photo displayed on posts

- `posts`
  - Primary key: `id`
  - Foreign key: `user_id`
  - Columns: `content`, `media_url`, `privacy_setting`, `post_date`, `is_flagged`
  - Access: feed, explore, profile

- `post_likes`
  - Composite primary key: `(post_id, user_id)`
  - Columns: `created_at`
  - Access: toggling likes, counts

- `post_comments`
  - Primary key: `id`
  - Foreign key: `post_id`, `user_id`
  - Columns: `text`, `created_at`, `is_flagged`

- `friend_requests`
  - Primary key: `id`
  - Columns: `requester_id`, `addressee_id`, `status`, `request_date`

- `friends`
  - Composite primary key: `(user_id_a, user_id_b)`
  - Columns: `friend_since`

- `messages`
  - Primary key: `id`
  - Columns: `sender_id`, `receiver_id`, `text`, `media_url`, `sent_date`, `is_read`

- `notifications`
  - Primary key: `id`
  - Columns: `user_id`, `type`, `ref_id`, `message`, `read`, `created_at`

- `ads`
  - Primary key: `id`
  - Columns: `advertiser_id`, `title`, `image_url`, `target_url`, `status` (pending|active|rejected), `impression_count`, `click_count`, `created_at`, `reviewed_by`

- `reports`
  - Primary key: `id`
  - Columns: `reporter_id`, `content_type`, `content_id`, `reason`, `details`, `status`, `created_at`, `reviewed_at`

- `blocked_users`
  - Composite primary key: `(blocker_id, blocked_id)`

Files and static assets
- Images and media are referenced by URL (`media_url`, `profile_photo`, `image_url` in `ads`). Prefer storing on a CDN or Cloudflare R2 and saving the URL in the DB.

Indexes and performance considerations
- Recommended indexes (D1 will use primary key indexes automatically):
  - `users(username)`, `users(email)` unique indexes
  - `posts(user_id, post_date)` to speed profile feeds
  - `post_likes(post_id)`, `post_comments(post_id)`
  - `friends(user_id_a)` and `friends(user_id_b)`
  - `messages((sender_id, receiver_id))` for threads
  - `ads(status)` to quickly find pending/active ads

Retention & moderation
- `is_flagged` fields for posts/comments; reports table to record moderation activity.
- Soft-delete vs hard-delete: we primarily delete posts on admin action, but consider adding `deleted_at` for soft-deletes if audit required.

Security
- Passwords stored as PBKDF2-derived `salt.hash` string (example: `base64salt.base64derived`) — see `tools/gen_admin_hash.cjs` used to create seeds.
- JWT tokens signed with `env.JWT_SECRET` (HMAC-SHA256) and encode `id`, `username`, `role`.

Backups
- Regular export of D1 to a storage bucket / backups via Wrangler or scheduled worker to copy to R2.

Notes
- This spec corresponds to the schema created in `migrations/001_schema.sql` and `src/worker.js` init code. Use that SQL as canonical source-of-truth for column names and types.
