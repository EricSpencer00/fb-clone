# GraceNook Frontend - Project Structure

## Overview
GraceNook is a modern social networking platform built with:
- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router v7
- **UI Components:** 21st.dev shadcn-style components
- **State Management:** React Context API

## Directory Structure

```
src/
├── pages/                 # Page components (route-level)
│   ├── Landing.tsx       # Landing/splash page
│   ├── Home.tsx          # Main feed
│   ├── Profile.tsx       # User profile
│   ├── Friends.tsx       # Friend management
│   ├── Messages.tsx      # Messaging hub
│   ├── Notifications.tsx # Notifications
│   └── Settings.tsx      # User settings
│
├── components/           # Reusable components
│   ├── ui/               # UI components from 21st.dev
│   │   ├── Sidebar.tsx
│   │   ├── Dock.tsx
│   │   ├── SocialCard.tsx
│   │   ├── Dialog.tsx
│   │   ├── Button.tsx
│   │   ├── WaveBackground.tsx
│   │   ├── ImgSphere.tsx
│   │   └── StickyScroll.tsx
│   ├── Layout/
│   │   ├── AppLayout.tsx (main app with sidebar)
│   │   └── MinimalLayout.tsx (auth pages)
│   ├── Navigation/
│   │   ├── Navbar.tsx
│   │   └── Sidebar.tsx
│   ├── Feed/
│   │   ├── SocialCardPost.tsx
│   │   ├── CreatePostModal.tsx
│   │   └── CommentSection.tsx
│   ├── Auth/
│   │   ├── SignUpForm.tsx
│   │   └── SignInForm.tsx
│   └── Common/
│       ├── LoadingSpinner.tsx
│       └── ErrorBoundary.tsx
│
├── contexts/             # React Context providers
│   ├── AuthContext.tsx
│   ├── FeedContext.tsx
│   ├── FriendsContext.tsx
│   ├── MessagesContext.tsx
│   └── NotificationsContext.tsx
│
├── hooks/                # Custom React hooks
│   ├── useAuth.ts
│   ├── useFeed.ts
│   ├── useFriends.ts
│   └── useMessages.ts
│
├── services/             # API services
│   ├── api.ts           # Base API wrapper
│   ├── auth.ts          # Auth API calls
│   ├── feed.ts          # Feed API calls
│   ├── friends.ts       # Friends API calls
│   ├── messages.ts      # Messages API calls
│   └── users.ts         # User API calls
│
├── types/                # TypeScript type definitions
│   ├── index.ts         # Main types (User, Post, Message, etc.)
│   └── api.ts           # API response types
│
├── utils/                # Utility functions
│   ├── cn.ts            # Tailwind class merge
│   ├── formatDate.ts    # Date formatting
│   └── validators.ts    # Form validation
│
├── App.tsx              # Main app component with routes
├── main.tsx             # React entry point
└── index.css            # Global Tailwind CSS
```

## Key Features

### Authentication (UC-1)
- Sign up with email, phone, password
- Email/SMS verification
- Sign in / Sign out
- Password reset
- Profile creation

### Social Connections (UC-2)
- Send/receive friend requests
- Friend list with img-sphere globe visualization
- Discover users / search
- Block users

### Content (UC-3, UC-4)
- Create posts (text, photo, video)
- Edit/delete posts
- Like posts (notification sent)
- Comment on posts (notification sent)
- View feed of friends' posts

### Messaging (UC-5)
- Private direct messages
- Group chats
- Message notifications
- Conversation history

### Notifications (UC-6)
- Friend request notifications
- Like/comment notifications
- Message notifications
- Notification preferences

## Getting Started

### Installation
```bash
pnpm install
```

### Development
```bash
pnpm dev
```
Visit `http://localhost:5173` in your browser.

### Build
```bash
pnpm build
pnpm preview
```

## Component Integration

### Adding 21st.dev Components
The local `shadcn` CLI is configured to add components:
```bash
node ./bin/shadcn add <21st.dev-url>
```

Components are fetched into `components/ui/` and then wrapped/integrated into feature-specific components.

### Example: Adding a post to feed
1. Import `SocialCard` from `components/ui/SocialCard.tsx`
2. Wrap it in `SocialCardPost.tsx` for app-specific logic
3. Use in `Feed.tsx` to display posts

## State Management

### Context Usage Pattern
```typescript
// Use context in component
const { currentUser, login } = useAuth();

// Access nested contexts
const { posts, likePost } = useFeed();
const { friends, sendFriendRequest } = useFriends();
```

### Data Flow
1. Component dispatches action (e.g., "like post")
2. Context handler calls API service
3. API service makes HTTP request
4. Response updates context state
5. Component re-renders with new data

## API Integration

### Base API URL
Set via environment variable `VITE_API_URL` or defaults to `http://localhost:3000/api`

### Example API Service
```typescript
import { apiGet, apiPost } from "@/services/api";

export async function getPosts() {
  return apiGet("/posts");
}

export async function createPost(data: PostCreateRequest) {
  return apiPost("/posts", data);
}
```

## Styling

### Tailwind Configuration
- Configured in `tailwind.config.cjs`
- Color palette: blue (primary), purple (accent), gray (neutral)
- Wave background branding in key pages

### CSS Entry Point
`src/index.css` imports Tailwind CSS v4 with `@import "tailwindcss";`

## Development Checklist

- [ ] Fetch all 21st.dev components using local CLI
- [ ] Build Landing page with Wave background + CTAs
- [ ] Implement Auth pages (Sign up, Sign in)
- [ ] Build Home feed with Social Cards
- [ ] Implement Like/Comment with notifications
- [ ] Add Friends feature with Img-Sphere
- [ ] Build Messaging interface
- [ ] Add Settings/Profile pages
- [ ] Implement Admin content moderation
- [ ] Connect to backend API
- [ ] Add error handling & loading states
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Performance optimization (code splitting, lazy loading)

## Security

- Multi-factor authentication for admin users
- Input validation & sanitization
- CSRF protection on state-changing requests
- JWT tokens in HttpOnly cookies
- Rate limiting on API endpoints

## Performance

- Target: < 3s average response time
- Use React.lazy() for code splitting
- Virtualize long lists (React Window)
- Lazy load images/videos
- Optimize bundle size

## Accessibility

- WCAG 2.1 AA compliance
- Semantic HTML
- ARIA labels on icon buttons
- Keyboard navigation throughout
- Screen reader support

## Next Steps

1. Run `pnpm dev` to start the development server
2. Fetch missing components: `node ./bin/shadcn add <url>`
3. Build out each page following ARCHITECTURE.md
4. Connect to backend API by updating services/
5. Test thoroughly across browsers and devices

---

For full architecture details, see [ARCHITECTURE.md](../ARCHITECTURE.md)
