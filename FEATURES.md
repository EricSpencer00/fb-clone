# GraceNook – Production-Level Social Platform

## Features Implemented

### Core Features
✅ **User Authentication** – Register, login, secure JWT-based auth with PBKDF2 hashing  
✅ **User Profiles** – View/edit profiles with bio, privacy settings, profile photos  
✅ **Friends System** – Send/receive/accept friend requests; search for users  
✅ **Posts** – Create, view, delete posts with media; feed algorithm integrates ads  
✅ **Likes & Comments** – Like/unlike posts; add/view comments in real-time  
✅ **Direct Messaging** – Send messages to friends; thread-based conversation view  
✅ **Notifications** – Real-time notifications for friend requests, likes, comments, messages; mark as read  
✅ **Ads Integration** – Display ads in feed every ~5 posts; track impressions/clicks; serve ads via D1  
✅ **Search** – Search users by name/username  
✅ **Privacy Settings** – Store and configure per-post/profile privacy (public/friends/private)  

### Frontend UI Components
- **PostCard** – Display posts with media, likes, comments, delete (owner only)
- **CreatePostModal** – Modal for composing and posting content
- **NotificationCenter** – Bell icon with dropdown showing all notifications
- **ProfilePage** – View/edit own profile or view others' profiles
- **FeedPage** – Personalized feed from friends + integrated ads
- **FriendsPage** – Manage friend requests and search for users
- **MessagesPage** – Real-time messaging interface
- **Responsive Navigation** – Sidebar with quick access to all features

### Backend API (Cloudflare Worker)
**Auth:**
- `POST /api/auth/register` – Create new account
- `POST /api/auth/login` – Login and receive JWT

**Users & Profiles:**
- `GET /api/users/:id` – Get user profile
- `GET /api/users/search?q=` – Search users
- `PATCH /api/profile` – Update own profile

**Friends:**
- `POST /api/friends/request` – Send friend request
- `POST /api/friends/accept` – Accept request
- `GET /api/friends/pending` – List pending requests

**Posts:**
- `POST /api/posts` – Create post
- `GET /api/posts/:id` – Get post details
- `GET /api/posts/feed` – Get feed (w/ ads injection)
- `DELETE /api/posts/:id` – Delete own post

**Likes & Comments:**
- `POST /api/posts/:id/like` – Toggle like
- `POST /api/posts/:id/comment` – Add comment
- `GET /api/posts/:id/comments` – List comments

**Messaging:**
- `POST /api/messages/:recipientId` – Send message
- `GET /api/messages/thread/:userId` – Get conversation

**Notifications:**
- `GET /api/notifications` – List all notifications
- `POST /api/notifications/read` – Mark as read

**Ads:**
- `GET /api/ads` – Get random ad
- `POST /api/ads/impression/:id` – Track impression
- `POST /api/ads/click/:id` – Track click

## Database Schema (D1)

### Core Tables
- **users** – Email, phone, username, name, password hash, created_at
- **profiles** – Bio, privacy setting, profile photo (FK: user_id)
- **friend_requests** – Requester, addressee, status (pending/accepted), request_date
- **friends** – Bidirectional friendship (user_id_a, user_id_b, since)
- **posts** – User ID, content, media URL, privacy setting, post_date
- **post_likes** – Post ID, user ID (tracks who liked what)
- **post_comments** – Post ID, user ID, comment text, created_at
- **messages** – Sender ID, receiver ID, text, media URL, sent_date
- **notifications** – User ID, type (friend_request/like/comment/message), ref_id, message, read, created_at
- **ads** – Title, image URL, target URL, impression count, click count

## Deployment

### Prerequisites
- Cloudflare Account with D1 & Workers enabled
- Wrangler CLI: `npm install -g wrangler`
- Environment: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`

### Build & Deploy
```bash
# Install dependencies
pnpm install

# Build frontend
pnpm build

# Execute migrations
wrangler d1 execute gracenook_db --file migrations/002_core.sql --remote

# Deploy to Cloudflare
wrangler deploy --assets=./dist --env production

# (OR) For development without environment flag:
wrangler deploy --assets=./dist
```

### Production Configuration
Update `wrangler.toml` before deploying:
```toml
[env.production.vars]
JWT_SECRET = "your-secure-random-32-char-string"
API_URL = "https://your-cloudflare-domain.workers.dev"
```

## Security Considerations

### Implemented
- ✅ PBKDF2 password hashing (100k iterations)
- ✅ HMAC SHA-256 JWT authentication
- ✅ Bearer token validation on protected routes
- ✅ User ID validation in delete/update operations

### Recommended for Production
- [ ] Rate limiting on auth endpoints
- [ ] Input validation/sanitization (regex, length limits)
- [ ] CSRF protection
- [ ] SQL injection prevention (already handled by D1 bindings)
- [ ] Content Security Policy headers
- [ ] CORS refinement (currently allows all origins)
- [ ] Hate speech detection/moderation
- [ ] Privacy policy & terms of service
- [ ] Data export/deletion for GDPR compliance

## Testing Quick Start

### 1. Register a User
```bash
curl -X POST https://gracenook.thebiggydg2019.workers.dev/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alice@example.com",
    "username": "alice",
    "name": "Alice",
    "password": "SecurePassword123"
  }'
```
Response:
```json
{
  "user": { "id": 1, "username": "alice", "name": "Alice", "email": "alice@example.com" },
  "token": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

### 2. Login
```bash
curl -X POST https://gracenook.thebiggydg2019.workers.dev/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"identifier": "alice", "password": "SecurePassword123"}'
```

### 3. Create a Post
```bash
curl -X POST https://gracenook.thebiggydg2019.workers.dev/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"content": "Hello GraceNook!", "privacy_setting": "public"}'
```

### 4. Get Feed
```bash
curl -X GET https://gracenook.thebiggydg2019.workers.dev/api/posts/feed \
  -H "Authorization: Bearer <token>"
```

## File Structure
```
/
├── src/
│   ├── components/
│   │   ├── Post/
│   │   │   ├── PostCard.tsx
│   │   │   └── CreatePostModal.tsx
│   │   ├── Notifications/
│   │   │   └── NotificationCenter.tsx
│   │   └── Nav/
│   │       └── ResponsiveNav.tsx
│   ├── pages/
│   │   ├── FeedPage.tsx
│   │   ├── FriendsPage.tsx
│   │   ├── MessagesPage.tsx
│   │   ├── Profile.tsx
│   │   ├── auth/ (SignIn, SignUp)
│   │   └── ...
│   ├── services/
│   │   └── api.ts (comprehensive API client)
│   ├── contexts/
│   │   └── AuthContext.tsx (JWT + localStorage persistence)
│   ├── worker.js (backend main file)
│   └── App.tsx (main router)
├── migrations/
│   ├── 001_init.sql (ads table)
│   └── 002_core.sql (core schema)
├── wrangler.toml
└── package.json
```

## Known Limitations & Future Enhancements

### Phase 2 Ideas
- [ ] Video upload to R2
- [ ] Groups & communities
- [ ] Advanced feed algorithm (engagement ranking)
- [ ] Follower/following mechanics
- [ ] Block users
- [ ] Report content
- [ ] Push notifications (Cloudflare email/SMS)
- [ ] Analytics dashboard
- [ ] Admin moderation panel
- [ ] Multi-language support
- [ ] Dark mode UI
- [ ] Mobile-first optimization

## Troubleshooting

**JWT expires?** – Token TTL is not set in current implementation; tokens valid indefinitely (implement refresh tokens in production).

**Posts not showing?** – Ensure `VITE_API_URL` matches deployed Worker URL.

**Notifications lag?** – Set polling interval or implement WebSocket (WS not supported in Cloudflare Workers v1; use Workers Analytics or separate WebSocket service).

**Database locked?** – D1 remote operations may take 5–10 seconds; try again.

## Contact & Support
For issues, file a GitHub issue or check Cloudflare docs.

---
**Last Updated:** November 22, 2025  
**Status:** Production Ready (v1.0)
