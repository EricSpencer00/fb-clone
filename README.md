## GraceNook Social Platform

### Overview
GraceNook is a prototype social networking platform focused on simple, safe interaction: user accounts, profiles, friendships, posts with media, likes, comments, messaging, notifications, ads, and search.

### Tech Stack
- Frontend: React + Vite (dist served as static assets via Worker)
- Backend: Cloudflare Worker (single file router) + D1 (SQLite) + Ads table
- Auth: PBKDF2 password hashing and custom HMAC SHA-256 JWT

### Environment Variables (Wrangler)
`JWT_SECRET` (per env) used to sign JWT tokens. Replace placeholder values in `wrangler.toml`.

### Schema (D1)
Core tables defined in `migrations/002_core.sql`:
- users(email, phone, username, name, password_hash, created_at)
- profiles(user_id, bio, privacy_setting, profile_photo)
- friend_requests(requester_id, addressee_id, status, request_date)
- friends(user_id_a, user_id_b, since)
- posts(user_id, content, media_url, post_date, privacy_setting)
- post_likes(post_id, user_id, created_at)
- post_comments(post_id, user_id, text, created_at)
- messages(sender_id, receiver_id, text, media_url, sent_date)
- notifications(user_id, type, ref_id, message, read, created_at)
- ads(title, image_url, target_url, impression_count, click_count, created_at)

### API Endpoints
Auth:
- POST `/api/auth/register` { email|phone, username, name, password } -> { user, token }
- POST `/api/auth/login` { identifier, password } -> { user, token }

Users & Profiles:
- GET `/api/users/:id`
- GET `/api/users/search?q=term`
- PATCH `/api/profile` { bio?, privacy_setting?, profile_photo? }

Friend Requests & Friends:
- POST `/api/friends/request` { user_id }
- POST `/api/friends/accept` { request_id }
- GET `/api/friends/pending`

Posts:
- POST `/api/posts` { content?, media_url?, privacy_setting? }
- GET `/api/posts/:id`
- DELETE `/api/posts/:id`
- GET `/api/posts/feed` (returns feed; injects ads every ~5 posts)

Likes & Comments:
- POST `/api/posts/:id/like` (toggle)
- POST `/api/posts/:id/comment` { text }
- GET `/api/posts/:id/comments`

Messaging:
- POST `/api/messages/:recipientId` { text?, media_url? }
- GET `/api/messages/thread/:userId`

Notifications:
- GET `/api/notifications`
- POST `/api/notifications/read` { ids: [] }

Ads:
- GET `/api/ads`
- POST `/api/ads/impression/:id`
- POST `/api/ads/click/:id`

### Auth
Send `Authorization: Bearer <token>` for all protected endpoints (everything except auth + ads).

### Local Development
Build assets:
```bash
pnpm install
pnpm build
```
Deploy (requires secrets in env/local or GitHub Actions):
```bash
wrangler deploy --assets=./dist
```

Run migrations remotely:
```bash
wrangler d1 execute gracenook_db --file migrations/002_core.sql --remote
```

### Notes
- Privacy settings stored but enforcement minimal (prototype).
- R2 bucket binding placeholder commented in `wrangler.toml`.
- Improve moderation & hate speech filtering in future versions.

### Security TODO
- Rotate `JWT_SECRET` before production.
- Add rate limiting & input validation hardening.
