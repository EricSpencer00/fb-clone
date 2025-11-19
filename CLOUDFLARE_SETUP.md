# Cloudflare Pages Deployment Setup Guide

## Overview
GraceNook frontend is now deployed on **Cloudflare Pages** instead of GitHub Pages. This provides:
- Better integration with Cloudflare Workers backend
- No subpath routing constraints
- Built-in CORS support
- Automatic deployments from GitHub
- Global CDN caching

## Prerequisites
- Cloudflare account (free tier works)
- GitHub repository with write access
- API token from Cloudflare

## Setup Instructions

### 1. Create a Cloudflare Account and Project
```bash
# Visit https://dash.cloudflare.com
# Sign up or log in with ericspencer1450@gmail.com
```

### 2. Get Cloudflare Credentials
1. Go to **Account Settings** → **API Tokens**
2. Click **Create Token** and select **Edit Cloudflare Workers**
3. Name it: `gracenook-deployment`
4. Copy the API token
5. Also note your **Account ID** from the bottom of the Account Overview page

### 3. Add GitHub Secrets
In your GitHub repository settings (Settings → Secrets and variables → Actions):

```
CLOUDFLARE_API_TOKEN: <your-api-token>
CLOUDFLARE_ACCOUNT_ID: <your-account-id>
```

### 4. Connect Cloudflare Pages to GitHub
```bash
# Run this command to initialize the project with Cloudflare
wrangler pages project create gracenook --production-branch main
```

Or manually through Cloudflare Dashboard:
1. Go to Pages → Create a Project
2. Connect to GitHub repository
3. Select `fb-clone` repo
4. Set build command: `pnpm build`
5. Set build output directory: `dist`

### 5. Environment Variables (Optional)
Add these in Cloudflare Pages project settings:

**Production Environment:**
```
API_URL = https://api.gracenook.workers.dev
```

**Preview Environment (for PRs):**
```
API_URL = https://api-staging.gracenook.workers.dev
```

### 6. Verify Deployment
After pushing to `main`, check:
- GitHub Actions tab → `Deploy to Cloudflare Pages` workflow
- Cloudflare Dashboard → Pages → gracenook project

## Project Details

**Production URL:** https://gracenook.pages.dev  
**Project Name:** gracenook  
**Branch:** main  
**Build Command:** `pnpm build`  
**Build Output:** `dist/`

## CORS Configuration for Backend

When setting up the Cloudflare Workers backend, add this to your handler:

```javascript
export default {
  fetch: async (request) => {
    const response = await handleRequest(request);
    
    // Add CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': 'https://gracenook.pages.dev',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };
    
    // Clone response and add headers
    const corsResponse = new Response(response.body, response);
    Object.entries(corsHeaders).forEach(([key, value]) => {
      corsResponse.headers.set(key, value);
    });
    
    return corsResponse;
  }
};
```

## Frontend API Usage

In your components, use the environment-aware API helper:

```typescript
import { getApiUrl } from '@/src/config/env';

// In your API calls:
const response = await fetch(getApiUrl('/api/posts'), {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
});
```

## Rollback to GitHub Pages (if needed)

If you need to revert:

1. Delete the Cloudflare workflow:
   ```bash
   git rm .github/workflows/deploy-to-cloudflare.yml
   ```

2. Restore the GitHub Pages workflow:
   ```bash
   git checkout gh-pages-backup .github/workflows/pages.yml
   ```

3. Update vite.config.ts base back to `'/fb-clone/'`

4. Update App.tsx basename back to `'/fb-clone'`

## Troubleshooting

### 404 on assets after deploy
- Verify `dist/` directory contains compiled assets
- Check build logs in GitHub Actions

### CORS errors from backend
- Ensure backend includes proper `Access-Control-Allow-Origin` headers
- Verify API_URL environment variable is correct

### Build failures
- Check Node.js version (should be 20+)
- Verify `pnpm install --frozen-lockfile` works locally

## Support Resources
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Wrangler CLI Docs](https://developers.cloudflare.com/workers/wrangler/)
- [GitHub Actions Integration](https://developers.cloudflare.com/pages/platform/github-integration/)
