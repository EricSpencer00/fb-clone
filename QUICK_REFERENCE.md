# GraceNook Quick Reference

## 🚀 Current Status
- **Frontend**: Ready for Cloudflare Pages deployment
- **Backend**: Not yet built (ready to build on Cloudflare Workers)
- **URL**: https://gracenook.pages.dev (will be live after Cloudflare setup)
- **Build**: ✅ Passing locally (329 KB total, 93 KB gzipped)

## 📂 Project Structure
```
fb-clone/
├── src/
│   ├── components/
│   │   ├── Nav/
│   │   │   └── ResponsiveNav.tsx      (desktop right sidebar + mobile hamburger)
│   │   ├── Friends/
│   │   │   └── FriendsPopup.tsx       (friend sphere + search)
│   │   ├── ui/
│   │   │   ├── dialog.tsx             (custom Dialog - no Radix dependency)
│   │   │   └── dock.tsx               (mobile nav dock)
│   │   ├── Auth/
│   │   │   ├── SignIn.tsx             (landing page signin)
│   │   │   ├── SignUp.tsx             (landing page signup)
│   │   │   ├── SignInDialog.tsx       (modal signin)
│   │   │   └── SignUpDialog.tsx       (modal signup)
│   │   └── (other components)
│   ├── pages/
│   │   ├── Landing.tsx                (home page with Waves + blurred feed)
│   │   ├── Feed.tsx                   (main feed - responsive with nav margin)
│   │   ├── Friends.tsx                (friend requests + FriendsPopup)
│   │   ├── Home.tsx                   (internal home)
│   │   └── (other pages)
│   ├── contexts/
│   │   └── AuthContext.tsx            (auth state + demo auth)
│   ├── config/
│   │   └── env.ts                     (API URL configuration)
│   ├── App.tsx                        (router + layout)
│   └── main.tsx                       (entry point)
├── .github/
│   └── workflows/
│       └── deploy-to-cloudflare.yml   (CI/CD pipeline)
├── vite.config.ts                     (base: '/', no subpath)
├── wrangler.toml                      (Cloudflare config)
├── CLOUDFLARE_SETUP.md                (detailed setup guide)
├── CLOUDFLARE_CHECKLIST.md            (step-by-step checklist)
├── DEPLOYMENT_SUMMARY.txt             (visual summary)
└── package.json                       (dependencies)
```

## 🔧 Tech Stack
- **Frontend Framework**: React 19 + TypeScript 5.9
- **Build Tool**: Vite 7.2
- **Styling**: Tailwind CSS 4
- **Routing**: React Router v7
- **Components**: 21st.dev shadcn-style components (custom Dialog, Wave, SocialCard, etc.)
- **Deployment**: Cloudflare Pages
- **Backend Ready**: Cloudflare Workers

## 📋 Key Files to Know

### Configuration Files
- `vite.config.ts` - Build configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.ts` - Tailwind CSS config
- `wrangler.toml` - Cloudflare configuration
- `.env.example` - Environment variables template

### Source Code Entry Points
- `src/main.tsx` - React app entry
- `src/App.tsx` - Main router and layout component
- `src/contexts/AuthContext.tsx` - Authentication state (replace with backend)
- `src/config/env.ts` - API configuration helper

### Pages (Routes)
- `/` → `src/pages/Landing.tsx`
- `/auth/signin` → `src/pages/auth/SignIn.tsx`
- `/auth/signup` → `src/pages/auth/SignUp.tsx`
- `/feed` → `src/pages/Feed.tsx`
- `/friends` → `src/pages/Friends.tsx`

### Components
- `ResponsiveNav` - Right sidebar (desktop) + hamburger menu (mobile)
- `FriendsPopup` - Friend sphere grid with search
- `SocialCard` - Post card component
- `Wave` - Background animation
- `SphereImageGrid` - 3D sphere image grid
- Dialog, Dock, etc. - UI primitives

## 🔌 API Configuration

### How It Works
Frontend automatically uses the correct API URL based on environment:

```typescript
// In any component:
import { getApiUrl } from '@/src/config/env';

const response = await fetch(getApiUrl('/api/posts'), {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
});
```

### Environment-Specific URLs
- **Development** (local): `http://localhost:8788` (Wrangler dev server)
- **Production** (Cloudflare Pages): `https://api.gracenook.workers.dev`

### Setting Custom API URL Locally
Create `.env.local`:
```
VITE_API_URL=http://localhost:9999
VITE_DEBUG=true
```

## 🚦 Common Commands

### Development
```bash
# Install dependencies
pnpm install

# Start dev server (http://localhost:5173)
pnpm dev

# Open in browser
open http://localhost:5173

# Build for production
pnpm build

# Preview production build locally
pnpm preview

# TypeScript type checking
pnpm typecheck
```

### Deployment
```bash
# View deployment logs
gh run list --workflow=deploy-to-cloudflare.yml

# Manually trigger deployment
gh workflow run deploy-to-cloudflare.yml --ref main

# View Cloudflare Pages status
wrangler pages project info gracenook
```

### Git
```bash
# Push changes to trigger deployment
git push origin main

# View deployment workflow
git log --oneline -n 5

# Check current branch
git branch
```

## 🔐 Authentication

### Current (Demo)
- Email: `test@gracenook.local`
- Password: `password123`
- Location: `src/contexts/AuthContext.tsx`

### Next Step (Real Backend)
Replace demo auth with API calls:
```typescript
// POST /api/auth/register
// POST /api/auth/login
// POST /api/auth/logout
// GET /api/auth/me (current user)
```

## 📊 Component Usage Examples

### Using the API Helper
```typescript
import { getApiUrl } from '@/src/config/env';

// Get user profile
const response = await fetch(getApiUrl('/api/users/123'));

// Create a post
const response = await fetch(getApiUrl('/api/posts'), {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ content: 'Hello World' }),
});
```

### Using Responsive Nav
The `ResponsiveNav` component automatically hides on `/` (landing) and `/auth/*` routes:

```typescript
// In App.tsx, ConditionalNav checks:
const hide = pathname === "/" || pathname.startsWith("/auth");
```

### Using Dialog
```typescript
import { Dialog, DialogContent, DialogTrigger } from "@/src/components/ui/dialog";

export function MyDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>Open</button>
      </DialogTrigger>
      <DialogContent>
        <h2>Dialog Title</h2>
        <p>Dialog content here</p>
      </DialogContent>
    </Dialog>
  );
}
```

## 🌐 URLs Reference

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | https://gracenook.pages.dev | Main app (after Cloudflare setup) |
| API | https://api.gracenook.workers.dev | Backend (build on Workers) |
| GitHub | https://github.com/EricSpencer00/fb-clone | Source code |
| Actions | https://github.com/EricSpencer00/fb-clone/actions | Deployment status |
| Cloudflare | https://dash.cloudflare.com/ | Infrastructure dashboard |
| Wrangler | (CLI tool) | Local development & deployment |

## 🐛 Debugging

### Frontend Issues
```bash
# Check build errors
pnpm build

# Run type checking
pnpm typecheck

# Check for unused variables
grep -r "TODO\|FIXME\|XXX" src/
```

### API Issues
```bash
# Test backend endpoint
curl https://api.gracenook.workers.dev/api/posts -H "Origin: https://gracenook.pages.dev" -v

# Check CORS headers in response
curl -i https://api.gracenook.workers.dev/api/posts
```

### Deployment Issues
```bash
# View GitHub Actions logs
gh run view <run-id> --log

# Check Cloudflare Pages build logs
wrangler pages deployment list gracenook

# View deployed asset hashes
curl -s https://gracenook.pages.dev/ | grep -o 'assets/[^"]*'
```

## 📚 Documentation Files
- `README.md` - Project overview
- `CLOUDFLARE_SETUP.md` - Detailed setup instructions
- `CLOUDFLARE_CHECKLIST.md` - Step-by-step deployment checklist
- `DEPLOYMENT_SUMMARY.txt` - Visual summary of changes
- `ARCHITECTURE.md` - System architecture and design
- `src/COMPONENT_GUIDE.md` - Component documentation (if exists)

## 🎯 Next Priority Features
1. Backend API (authentication, posts, messaging)
2. Post composer (create new posts)
3. Real-time notifications
4. Messaging system
5. Friend requests workflow
6. Search functionality
7. User profiles and settings

## 💡 Pro Tips
- Use `pnpm install --frozen-lockfile` for reproducible builds
- Always test locally with `pnpm dev` before pushing
- Check GitHub Actions logs immediately after push
- Keep `.env.local` out of git (already in .gitignore)
- Use `getApiUrl()` helper for all API calls (ensures right endpoint)
- Test CORS by visiting site in different domains/origins

---

**Last Updated**: November 19, 2025  
**Maintainer**: Team GraceNook  
**Status**: Production Ready (Frontend)
