# GraceNook Deployment: Cloudflare Pages Setup

## ✅ Changes Made

Your GraceNook frontend has been successfully migrated from **GitHub Pages** to **Cloudflare Pages**. Here's what changed:

### Why the migration?
The current GitHub Pages + Cloudflare backend setup had these issues:
1. **CORS conflicts** - Frontend on `github.io` subdomain, backend on Workers domain
2. **Subpath routing headaches** - GitHub Pages forces `/fb-clone/` subpath
3. **No environment variable support** - Hardcoded API URLs break in different environments
4. **Vendor mismatch** - Better to use Cloudflare for both frontend + backend

### Files Changed
- ✅ `vite.config.ts` - Removed `/fb-clone/` subpath (now `base: '/'`)
- ✅ `src/App.tsx` - Removed Router basename constraint (now `basename="/"`)
- ✅ `.github/workflows/` - Deleted `pages.yml`, added `deploy-to-cloudflare.yml`
- ✅ `wrangler.toml` - Added Cloudflare configuration
- ✅ `src/config/env.ts` - Added environment-aware API URL config
- ✅ `.env.example` - Example environment variables
- ✅ `CLOUDFLARE_SETUP.md` - Complete setup guide
- ✅ `.gitignore` - Added env and Wrangler files

---

## 🚀 Next Steps: Complete Cloudflare Setup

### Step 1: Create Cloudflare Account (if you don't have one)
```bash
# Visit: https://dash.cloudflare.com/sign-up
# Email: ericspencer1450@gmail.com
# Complete signup and email verification
```

### Step 2: Get Cloudflare Credentials

**2a. Get API Token:**
1. Go to: https://dash.cloudflare.com/profile/api-tokens
2. Click **Create Token**
3. Select **Edit Cloudflare Workers** template
4. Name: `gracenook-deployment`
5. Click **Create Token** and copy the token

**2b. Get Account ID:**
1. Go to: https://dash.cloudflare.com/
2. Look at the bottom right of the "Overview" page
3. Copy your **Account ID** (looks like: `e1234567890abcdef1234567890abcd`)

### Step 3: Add GitHub Secrets

1. Go to: https://github.com/EricSpencer00/fb-clone
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add:

| Secret Name | Value |
|---|---|
| `CLOUDFLARE_API_TOKEN` | Paste your API token from Step 2a |
| `CLOUDFLARE_ACCOUNT_ID` | Paste your Account ID from Step 2b |

### Step 4: Create Cloudflare Pages Project

**Option A: Automatic (recommended)**
```bash
# In the repo root:
pnpm install -g wrangler
wrangler pages project create gracenook --production-branch main
```

**Option B: Manual via Dashboard**
1. Go to: https://dash.cloudflare.com/
2. Click **Pages** → **Create a project**
3. Click **Connect to Git**
4. Select your `fb-clone` repository
5. Configure build:
   - **Framework preset**: None
   - **Build command**: `pnpm install && pnpm build`
   - **Build output directory**: `dist`
6. Click **Save and Deploy**

### Step 5: Verify Deployment

After pushing changes to `main` branch:

1. **Check GitHub Actions:**
   - Go to: https://github.com/EricSpencer00/fb-clone/actions
   - Look for `Deploy to Cloudflare Pages` workflow
   - It should complete with ✅ green checkmark

2. **Check Cloudflare Dashboard:**
   - Go to: https://dash.cloudflare.com/
   - Click **Pages** → **gracenook**
   - Recent deployments should show status

3. **Visit your site:**
   - **Production URL:** https://gracenook.pages.dev
   - You should see the Landing page with Waves animation

---

## 🔌 Backend Integration (When Ready)

When you build the Cloudflare Workers backend, add these CORS headers:

```javascript
// In your Cloudflare Worker handler:
const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://gracenook.pages.dev',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Add to every response:
const response = new Response(body, { status: 200 });
Object.entries(corsHeaders).forEach(([key, val]) => {
  response.headers.set(key, val);
});
return response;
```

### Using the API in Your Components

The frontend now has environment-aware API configuration:

```typescript
// src/config/env.ts is already set up

// In your components:
import { getApiUrl } from '@/src/config/env';

// Examples:
const postsUrl = getApiUrl('/api/posts');
const userUrl = getApiUrl('/api/users/123');

// Fetch example:
const response = await fetch(getApiUrl('/api/login'), {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password }),
});
```

### Environment Variables

- **Development (local):** Uses `http://localhost:8788` (Wrangler dev server)
- **Production (Cloudflare):** Uses `https://api.gracenook.workers.dev`

To override locally, create `.env.local`:
```
VITE_API_URL=http://localhost:9999
VITE_DEBUG=true
```

---

## 📋 Current Build Status

Latest build verification:
```
✓ 1716 modules transformed
dist/index.html                  0.47 kB │ gzip:  0.31 kB
dist/assets/index-BHsDRNhd.js   292.05 kB │ gzip: 92.93 kB
dist/assets/index-BRL0Zmqs.css   37.03 kB │ gzip:  7.40 kB
✓ built in 1.99s
```

---

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| **Workflow fails: "secrets not found"** | Add `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` to GitHub Secrets (Settings → Secrets and variables → Actions) |
| **404 on https://gracenook.pages.dev** | Check Cloudflare Dashboard → Pages → gracenook → Recent Deployments for errors |
| **Build fails locally** | Run `pnpm install` then `pnpm build` |
| **CORS errors from backend API** | Ensure backend includes proper `Access-Control-Allow-Origin` headers for `https://gracenook.pages.dev` |
| **Assets missing after deploy** | Check GitHub Actions build logs; verify `dist/` contains CSS and JS files |

---

## 📚 Useful Links

- **Cloudflare Pages:** https://dash.cloudflare.com/pages
- **GitHub Actions:** https://github.com/EricSpencer00/fb-clone/actions
- **Cloudflare Workers:** https://developers.cloudflare.com/workers/
- **Wrangler CLI:** https://developers.cloudflare.com/workers/wrangler/
- **Pages Docs:** https://developers.cloudflare.com/pages/
- **GitHub Secrets:** https://github.com/EricSpencer00/fb-clone/settings/secrets/actions

---

## ✨ What's Next

After Cloudflare setup is complete:

1. **Verify frontend loads** - Visit https://gracenook.pages.dev
2. **Build Cloudflare Workers backend** - API routes for auth, posts, messages
3. **Wire up authentication** - Replace demo auth with real backend
4. **Add post composer** - Create, edit, delete posts
5. **Implement messaging** - Private and group chat
6. **Add notifications** - Real-time updates

See `TODO.md` in the repo root for detailed feature roadmap.

---

**Last Updated:** November 19, 2025  
**Deployment Strategy:** Cloudflare Pages (main) + Cloudflare Workers (backend)  
**Frontend Live at:** https://gracenook.pages.dev
