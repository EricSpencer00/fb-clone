# Gracenook Infrastructure - Complete Setup

## Overview
**Gracenook** is now fully deployed on Cloudflare with a modern stack:
- **Frontend**: React 19 + TypeScript + Vite, deployed to Cloudflare Pages (`fb-clone-7ng.pages.dev`)
- **Backend**: Cloudflare Workers REST API running at `gracenook.thebiggydg2019.workers.dev`
- **Database**: Cloudflare D1 SQLite (`gracenook_db` / ID: `654c0b9e-fb63-4ef9-aaa9-39758baf87de`)
- **CI/CD**: GitHub Actions workflow auto-deploys on `git push origin main`

## Deployment Domains

| Component | URL | Status |
|-----------|-----|--------|
| Frontend (Pages) | https://fb-clone-7ng.pages.dev | ✅ Live |
| Backend (Workers) | https://gracenook.thebiggydg2019.workers.dev | ✅ Live |
| API Endpoint | https://gracenook.thebiggydg2019.workers.dev/api | ✅ Live |

## Database Setup

### Migrations Applied
1. **001_init.sql** - Ads schema (initial placeholder)
2. **002_core.sql** - Core schema: users, posts, comments, likes, messages, notifications
3. **003_seed_test_user.sql** - Test user seeded

### Test User Credentials
```
Username: test
Password: gracenookprodpassword123456
Email: test@example.com
```

### Schema
- **users** - User accounts (username, email, password_hash)
- **profiles** - User profiles (bio, privacy_setting, profile_photo)
- **posts** - User posts
- **comments** - Post comments
- **likes** - Post/comment likes
- **messages** - User direct messages
- **notifications** - User notifications
- **ads** - Ad data (placeholder table)

## Authentication

### Mechanism
- **Method**: JWT (JSON Web Token)
- **Signing**: HMAC-SHA256 with `JWT_SECRET` (managed via `wrangler secret put`)
- **Password Hashing**: PBKDF2 (100,000 iterations, SHA-256, 32-byte key)

### Login Flow
```bash
POST /api/auth/login
Content-Type: application/json

{
  "identifier": "test",  # Can be username, email, or phone
  "password": "gracenookprodpassword123456"
}

Response:
{
  "user": { "id": 2, "username": "test", ... },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Protected Requests
```bash
GET /api/posts/feed
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Posts
- `GET /api/posts/feed` - Get user's feed
- `POST /api/posts` - Create post
- `DELETE /api/posts/:id` - Delete post
- `POST /api/posts/:id/like` - Like post
- `POST /api/posts/:id/comment` - Comment on post

### Users & Profiles
- `GET /api/users/:id` - Get user profile
- `GET /api/users/search?q=query` - Search users
- `PATCH /api/profile` - Update profile

### Messaging
- `GET /api/messages/thread/:id` - Get messages with user
- `POST /api/messages/:id` - Send message to user

### Notifications
- `GET /api/notifications` - Get notifications
- `POST /api/notifications/read` - Mark as read

## Configuration

### wrangler.toml
```toml
name = "gracenook"
workers_dev = true
compatibility_date = "2025-11-22"
main = "src/worker.js"
pages_build_output_dir = "./dist"

[build]
command = "pnpm build"
cwd = "./"

[env.production]
name = "gracenook"

[[env.production.d1_databases]]
binding = "DB"
database_name = "gracenook_db"
database_id = "654c0b9e-fb63-4ef9-aaa9-39758baf87de"

[env.production.vars]
API_URL = "https://gracenook.thebiggydg2019.workers.dev"
```

### GitHub Secrets Required
- `CLOUDFLARE_API_TOKEN` - API token with Worker + Pages permissions
- `CLOUDFLARE_ACCOUNT_ID` - Account ID (required for some Wrangler commands)
- `VITE_API_URL` - Frontend API URL (`https://gracenook.thebiggydg2019.workers.dev`)
- `VITE_DEBUG` - Debug flag (optional, set to `"true"` for verbose logging)
- `JWT_SECRET` - Secret for signing JWTs (set via `wrangler secret put JWT_SECRET --env production`)

## Deployment Workflow

### Automatic (on git push to main)
1. Build frontend with Vite
2. Run pre-deploy checks (verify secrets, account ID)
3. Deploy Pages (`wrangler pages deploy dist --project-name=fb-clone`)
4. Set JWT_SECRET in Worker (`wrangler secret put JWT_SECRET --env production`)
5. Deploy Worker (`wrangler deploy --env production`)

### Manual Deployment
```bash
# Build frontend
pnpm build

# Deploy Worker
pnpm exec wrangler deploy --env production

# Deploy Pages
pnpm exec wrangler pages deploy dist --project-name=fb-clone --branch=main

# Update JWT secret (if needed)
echo "YOUR_SECRET_HERE" | pnpm exec wrangler secret put JWT_SECRET --env production
```

## Verification

### Test Complete Flow
```bash
# 1. Login
JWT=$(curl -s -X POST 'https://gracenook.thebiggydg2019.workers.dev/api/auth/login' \
  -H 'Content-Type: application/json' \
  -d '{"identifier":"test","password":"gracenookprodpassword123456"}' | jq -r '.token')

# 2. Call protected endpoint
curl -s -X GET 'https://gracenook.thebiggydg2019.workers.dev/api/posts/feed' \
  -H "Authorization: Bearer $JWT" | jq .

# 3. Create post
curl -s -X POST 'https://gracenook.thebiggydg2019.workers.dev/api/posts' \
  -H "Authorization: Bearer $JWT" \
  -H 'Content-Type: application/json' \
  -d '{"content":"Hello World!"}' | jq .
```

### Check Deployments
```bash
# Worker status
pnpm exec wrangler deployments list

# D1 database
pnpm exec wrangler d1 info gracenook_db

# Pages deployments
pnpm exec wrangler pages deployments list --project-name=fb-clone
```

## Development

### Local Development
```bash
# Install dependencies
pnpm install

# Start development server (frontend + Worker)
pnpm run dev

# Worker will be at http://localhost:8788
# Frontend will be at http://localhost:5173
```

### Running D1 Migrations
```bash
# Execute migration against remote database
pnpm exec wrangler d1 execute gracenook_db --file migrations/FILENAME.sql --remote

# Execute against local database (development)
pnpm exec wrangler d1 execute gracenook_db --file migrations/FILENAME.sql
```

## Monitoring & Logs

### Worker Logs
```bash
pnpm exec wrangler tail --env production
```

### Pages Deployments
```bash
pnpm exec wrangler pages deployments list --project-name=fb-clone
```

## Troubleshooting

### 401 Unauthorized on Protected Endpoints
- Verify JWT_SECRET is set: `pnpm exec wrangler secret list --env production`
- If not set: `echo "YOUR_SECRET" | pnpm exec wrangler secret put JWT_SECRET --env production`

### "Project not found" Error
- Ensure `fb-clone` Pages project exists in Cloudflare dashboard
- Verify token has Pages permissions

### Frontend Can't Reach API
- Check `VITE_API_URL` environment variable is set correctly
- Verify `getApiUrl()` helper in `src/config/env.ts` returns correct URL
- Frontend should send requests to `https://gracenook.thebiggydg2019.workers.dev/api/...`

## Architecture Diagram

```
┌──────────────────────────────────────────────────────────┐
│ Cloudflare Global Network                                │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ┌────────────────────┐         ┌─────────────────────┐ │
│  │  Cloudflare Pages  │         │  Cloudflare Workers │ │
│  │  (Frontend)        │◄────────│  (API Backend)      │ │
│  │                    │         │                     │ │
│  │ React + Vite       │         │ Node.js (src/       │ │
│  │ fb-clone-7ng.pages │         │ worker.js)          │ │
│  │ .dev               │         │ gracenook.          │ │
│  │                    │         │ thebiggydg2019.     │ │
│  └────────────────────┘         │ workers.dev         │ │
│           │                     │                     │ │
│           │                     │      ┌──────────┐   │ │
│           │                     └─────►│ D1 DB    │   │ │
│           │                            │ SQLite   │   │ │
│           │                            └──────────┘   │ │
│           │                                           │ │
└───────────┼───────────────────────────────────────────┘
            │
    ┌───────▼──────────┐
    │  User Browser    │
    │  (HTTP/HTTPS)    │
    └──────────────────┘
```

## Security

### Implemented
- ✅ PBKDF2 password hashing (100k iterations)
- ✅ JWT token authentication
- ✅ Protected endpoints require valid JWT
- ✅ Secrets stored securely via Wrangler (not in config files)
- ✅ CORS headers enabled for cross-origin requests

### TODO
- [ ] Token refresh mechanism / TTL
- [ ] Rate limiting on endpoints
- [ ] Input validation / sanitization
- [ ] HTTPS redirect enforcement
- [ ] CORS policy refinement (currently permissive)

## Support & Debugging

For detailed API documentation, see `src/worker.js`
For frontend implementation, see `src/contexts/AuthContext.tsx` and `src/services/api.ts`
For database schema, see `migrations/002_core.sql`
