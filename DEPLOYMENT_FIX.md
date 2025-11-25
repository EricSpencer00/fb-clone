# Cloudflare Pages Deployment Fix

## Problem
Cloudflare Pages is running a custom deploy command `npx wrangler deploy` which conflicts with our GitHub Actions deployment.

## Solution
You need to **disable the custom deploy command** in the Cloudflare Pages project settings:

1. Go to https://dash.cloudflare.com
2. Navigate to **Pages** → **fb-clone** project
3. Go to **Settings** → **Build & deployment** → **Build configuration**
4. Find the field **Deploy command** (or similar)
5. **Clear/Remove** any custom deploy command that says `npx wrangler deploy`
6. Leave it **empty** or set to just `npm ci && npm run build`
7. **Save**

## Why
We're handling deployment via GitHub Actions:
- **Pages deployment**: GitHub Actions runs `wrangler pages deploy` 
- **Worker deployment**: GitHub Actions runs `wrangler deploy` with `wrangler.worker.toml`

Cloudflare Pages' auto-build trying to run its own `wrangler deploy` command conflicts with this and fails.

## After Disabling Auto Deploy
The deployment will be handled entirely by GitHub Actions CI/CD:
- Triggered on every push to `main`
- Builds the frontend with Vite
- Deploys Pages with `wrangler pages deploy`
- Deploys Workers with `wrangler deploy --config wrangler.worker.toml`
- Sets JWT_SECRET for the Worker
