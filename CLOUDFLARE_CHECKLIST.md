# Cloudflare Deployment Checklist

## Phase 1: Get Credentials ⚙️

- [ ] **1.1** Visit https://dash.cloudflare.com/sign-up (if no account)
      - Email: ericspencer1450@gmail.com
      - Create account
- [ ] **1.2** Visit https://dash.cloudflare.com/profile/api-tokens
      - Click "Create Token"
      - Select "Edit Cloudflare Workers" template
      - Name: `gracenook-deployment`
      - Click "Create Token"
      - **Copy and save the token** (you'll only see it once)
- [ ] **1.3** Visit https://dash.cloudflare.com/
      - Look at page, find "Account ID" at bottom right
      - **Copy and save your Account ID**

## Phase 2: Add Secrets to GitHub 🔐

- [ ] **2.1** Visit https://github.com/EricSpencer00/fb-clone/settings/secrets/actions
- [ ] **2.2** Click "New repository secret"
      - Name: `CLOUDFLARE_API_TOKEN`
      - Value: Paste the token from 1.2
      - Click "Add secret"
- [ ] **2.3** Click "New repository secret" again
      - Name: `CLOUDFLARE_ACCOUNT_ID`
      - Value: Paste the Account ID from 1.3
      - Click "Add secret"
- [ ] **2.4** Verify both secrets appear in the list

## Phase 3: Create Cloudflare Pages Project 📦

### Option A: Command Line (Recommended)
```bash
cd /Users/eric/GitHub/fb-clone
wrangler pages project create gracenook --production-branch main
```
- [ ] **3.1** Run the command above in terminal
- [ ] **3.2** Follow prompts (press Enter to accept defaults)
- [ ] **3.3** Command completes with success message

### Option B: Cloudflare Dashboard (Manual)
- [ ] **3.1** Visit https://dash.cloudflare.com/
- [ ] **3.2** Click "Pages" in sidebar
- [ ] **3.3** Click "Create a project"
- [ ] **3.4** Click "Connect to Git"
- [ ] **3.5** Search for "fb-clone" repository
- [ ] **3.6** Click to connect the repository
- [ ] **3.7** Configure build settings:
      - Project name: `gracenook`
      - Production branch: `main`
      - Build command: `pnpm install && pnpm build`
      - Build output directory: `dist`
- [ ] **3.8** Click "Save and Deploy"

## Phase 4: Verify Deployment Works ✅

- [ ] **4.1** Wait 2-3 minutes for initial deployment
- [ ] **4.2** Visit https://github.com/EricSpencer00/fb-clone/actions
      - Look for "Deploy to Cloudflare Pages" workflow
      - Should show green ✅ checkmark
- [ ] **4.3** Visit https://gracenook.pages.dev
      - Should see GraceNook landing page
      - Should NOT see any 404 errors
      - Waves animation should be visible
- [ ] **4.4** Test routing:
      - Visit https://gracenook.pages.dev/feed (should load)
      - Visit https://gracenook.pages.dev/auth/signin (should load)
      - Visit https://gracenook.pages.dev/friends (should load)

## Phase 5: Build Backend (When Ready) 🚀

- [ ] **5.1** Create Cloudflare Workers project
      ```bash
      wrangler init gracenook-api --type javascript
      ```
- [ ] **5.2** Set up routes in `wrangler.toml`:
      ```toml
      [env.production]
      routes = [
        { pattern = "api.gracenook.workers.dev/*", zone_id = "" }
      ]
      ```
- [ ] **5.3** Add CORS headers to all API responses:
      ```javascript
      'Access-Control-Allow-Origin': 'https://gracenook.pages.dev'
      ```
- [ ] **5.4** Set up authentication endpoints:
      - POST `/api/auth/register`
      - POST `/api/auth/login`
      - POST `/api/auth/logout`
- [ ] **5.5** Set up post endpoints:
      - GET `/api/posts` (feed)
      - POST `/api/posts` (create)
      - PUT `/api/posts/:id` (update)
      - DELETE `/api/posts/:id` (delete)
- [ ] **5.6** Set up user endpoints:
      - GET `/api/users/:id` (profile)
      - PUT `/api/users/:id` (update profile)
      - GET `/api/users/:id/friends` (friend list)
- [ ] **5.7** Deploy Workers:
      ```bash
      wrangler deploy
      ```

## Phase 6: Wire Frontend to Backend 🔌

- [ ] **6.1** Update authentication in `src/contexts/AuthContext.tsx`:
      - Replace demo auth with real API calls
      - Use `getApiUrl('/api/auth/login')`
- [ ] **6.2** Create API hooks for common operations:
      - `usePosts()` - fetch feed
      - `useUsers()` - fetch user profiles
      - `useFriends()` - fetch friend list
      - `useAuth()` - already exists, update to use backend
- [ ] **6.3** Update components to use real data:
      - Feed shows posts from API instead of demo data
      - User profile shows real profile data
      - Friends list shows real friends
- [ ] **6.4** Test authentication flow:
      - Can register new account
      - Can log in with credentials
      - Can log out
      - Sessions persist

## Phase 7: Final Testing 🧪

- [ ] **7.1** Test on different browsers:
      - Chrome/Chromium
      - Firefox
      - Safari
      - Mobile browsers (iOS/Android)
- [ ] **7.2** Test responsive design:
      - Desktop (1920px+)
      - Tablet (768px-1024px)
      - Mobile (320px-767px)
- [ ] **7.3** Test all major features:
      - [ ] Login/registration
      - [ ] Create post
      - [ ] Like/comment on post
      - [ ] Send message
      - [ ] Add friend
      - [ ] View profile
- [ ] **7.4** Performance check:
      - Page loads in < 3 seconds
      - No console errors
      - Images load properly
      - Animations are smooth

## Troubleshooting 🆘

### Deployment fails with "secrets not found"
- [ ] Go to GitHub Settings → Secrets and verify tokens are added
- [ ] Restart workflow manually from Actions tab

### 404 error when visiting gracenook.pages.dev
- [ ] Check GitHub Actions build logs
- [ ] Verify `dist/` directory exists locally after build
- [ ] Check Cloudflare Pages dashboard for deployment errors

### CORS errors when calling backend
- [ ] Verify backend includes `Access-Control-Allow-Origin: https://gracenook.pages.dev`
- [ ] Test backend directly with curl:
      ```bash
      curl -H "Origin: https://gracenook.pages.dev" https://api.gracenook.workers.dev/api/posts -v
      ```

### Build fails with "pnpm not found"
- [ ] Run `pnpm install --frozen-lockfile` locally first
- [ ] Verify GitHub Actions workflow has corepack setup

---

## Quick Reference

| Item | Link |
|------|------|
| Cloudflare Dashboard | https://dash.cloudflare.com/ |
| GitHub Actions | https://github.com/EricSpencer00/fb-clone/actions |
| GitHub Secrets | https://github.com/EricSpencer00/fb-clone/settings/secrets/actions |
| GraceNook Frontend | https://gracenook.pages.dev |
| API Documentation | (TBD - add when backend is ready) |

---

**Status**: Ready for Cloudflare setup  
**Last Updated**: November 19, 2025  
**Next Step**: Complete Phase 1 (Get Credentials)
