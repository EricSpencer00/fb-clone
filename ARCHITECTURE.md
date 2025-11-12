# GraceNook Frontend Architecture

## Overview
GraceNook is a social networking platform prioritizing simplicity, safety, and user engagement. This architecture maps the product specification (Functional Requirements, Use Cases, and Data Model) to a React-based frontend using Vite, TypeScript, Tailwind CSS, and shadcn-style components from 21st.dev.

**Core Values:**
- Simple, clean UI (reduce confusion vs Facebook)
- Privacy-first design
- Trust-focused interactions
- Mobile-responsive (web + future iOS/Android)

---

## Page Hierarchy & Navigation

```
Root (/)
├── Landing / Splash
│   └── Wave Background (branding)
│   └── Call-to-action: Sign Up / Sign In
│
├── Auth (/auth)
│   ├── /auth/signup → Sign-up Dialog (UC-1)
│   ├── /auth/signin → Sign-in Dialog
│   └── /auth/reset-password → Password Reset
│
├── App (Protected Routes)
│   ├── /home → Feed (Home Page - UC-3, UC-4)
│   ├── /profile/:userId → User Profile
│   ├── /messages → Messaging Hub (UC-5)
│   │   ├── /messages/:conversationId → Conversation View
│   │   └── /messages/group/:groupId → Group Chat
│   ├── /friends → Social Connections (UC-2)
│   │   ├── /friends/requests → Pending Friend Requests
│   │   ├── /friends/list → Friends Globe (img-sphere)
│   │   └── /friends/discover → Discover Users
│   ├── /notifications → Notifications Hub (UC-6)
│   ├── /search → Search Results (Functional Req 6.1, 6.2)
│   └── /settings → User Settings & Preferences
│
└── Admin (Protected, Role-Based)
    ├── /admin/dashboard → Content Monitoring
    └── /admin/reports → Flagged Content Review
```

---

## Component Mapping

### 1. **Landing / Splash Page**
**Purpose:** First-time users see GraceNook brand and value prop.

**Layout:**
```
┌─────────────────────────────────────┐
│  Wave Background (Branding)         │
│  ─────────────────────────────────  │
│  "GraceNook"                        │
│  "Simple. Safe. Fun."               │
│                                     │
│  [Sign Up Button] [Sign In Button]  │
│  Sticky Scroll Section: Features    │
│  - Privacy Control                  │
│  - Clean Design                     │
│  - No Clutter                       │
│  - Ad-Supported (transparent)       │
└─────────────────────────────────────┘
```

**Components Used:**
- `WaveBackground` – Hero section branding
- `StickyScroll` – Feature highlights (scrollable benefits)
- `Button` – CTA buttons (styled variants)

**File:** `src/pages/Landing.tsx`

---

### 2. **Authentication Pages**
**Purpose:** User account creation (UC-1), sign-in, password reset.

**Sign-Up Flow (UC-1):**
```
┌─────────────────────────────────────┐
│  Wave Background (subtle)           │
│  ─────────────────────────────────  │
│  Dialog / Modal:                    │
│    "Create Your GraceNook Account"  │
│                                     │
│    [Name Input]                     │
│    [Username Input]                 │
│    [Email or Phone Input]           │
│    [Date of Birth Input]            │
│    [Password Input]                 │
│    [Sign Up Button]                 │
│                                     │
│    Verification Step:               │
│    "Enter Code"                     │
│    [Code Input] [Resend Code]       │
│    [Confirm Button]                 │
│                                     │
│    Redirect: Onboarding or /home    │
└─────────────────────────────────────┘
```

**Sign-In Flow:**
```
Dialog / Modal:
  "Welcome Back"
  [Email/Phone or Username]
  [Password]
  [Forgot Password?]
  [Sign In Button]
  [Create New Account Link]
```

**Components Used:**
- `Dialog` – Modal sign-up/sign-in forms (from 21st.dev)
- `Button` – Form actions
- `WaveBackground` – Subtle branding in background
- `Input` / `Form` fields – Email, password, etc.

**Files:**
- `src/pages/SignUp.tsx`
- `src/pages/SignIn.tsx`
- `src/components/auth/VerificationCodeInput.tsx`

---

### 3. **Home Feed (Main Loggedin Experience)**
**Purpose:** Display news feed (UC-3, UC-4), allow post creation, like/comment.

**Layout:**
```
┌──────────────────────────────────────────────────┐
│ Header: "Home" + Notification Bell               │
├──────────────────────────────────────────────────┤
│ Sidebar (if desktop) or Dock (if mobile)         │
│ ├─ Home                                          │
│ ├─ Friends                                       │
│ ├─ Messages                                      │
│ ├─ Notifications                                 │
│ └─ Settings                                      │
├──────────────────────────────────────────────────┤
│ Main Feed Area:                                  │
│                                                  │
│  ┌────────────────────────────────────────────┐ │
│  │ "Create a Post" Box                        │ │
│  │ [Photo/Video Icon] [Caption Input]         │ │
│  │ [Post Button]                              │ │
│  └────────────────────────────────────────────┘ │
│                                                  │
│  ┌─ Social Card 1 ─────────────────────────────┐ │
│  │ User: John Doe (@johndoe)                  │ │
│  │ [Photo/Video]                              │ │
│  │ Caption: "Had an amazing time..."          │ │
│  │ [Like] [Comment] [Share] [More...]         │ │
│  │ 234 Likes  15 Comments                     │ │
│  │ ┌─ Comments Section ──────────────────────┐ │ │
│  │ │ Alice: "Looks fun!"                     │ │ │
│  │ │ Bob: "Where was this?"                  │ │ │
│  │ │ [Show more comments]                    │ │ │
│  │ │ [Write a comment...]                    │ │ │
│  │ └─────────────────────────────────────────┘ │ │
│  └──────────────────────────────────────────────┘ │
│                                                  │
│  ┌─ Social Card 2 ─────────────────────────────┐ │
│  │ ... (repeating pattern)                    │ │
│  └──────────────────────────────────────────────┘ │
│                                                  │
└──────────────────────────────────────────────────┘
```

**Components Used:**
- `Sidebar` – Left navigation (desktop view)
- `Dock` – Bottom navigation (mobile fallback, optional)
- `SocialCard` – Each post in feed (photo, caption, interactions)
- `Button` – Like, comment, share actions
- `Dialog` – Create post modal

**Key Interactions:**
- **Like Button** → Increments like count, sends notification to post creator (UC-4.2a)
- **Comment Button** → Opens comment modal, posts comment, sends notification (UC-4.4-7)
- **Create Post** → Opens dialog, allows photo/video upload, filters, caption, posts to feed (UC-3)

**Files:**
- `src/pages/Home.tsx`
- `src/components/Feed/SocialCardPost.tsx` (wrapper around `SocialCard`)
- `src/components/Feed/CreatePostModal.tsx`
- `src/components/Feed/CommentSection.tsx`
- `src/components/Navigation/Sidebar.tsx`
- `src/components/Navigation/Dock.tsx` (fallback)

---

### 4. **Friends / Social Connections**
**Purpose:** Friend requests (UC-2), friend list, discover users.

**Layout:**

**Friends List Tab:**
```
┌────────────────────────────────────┐
│ "Friends" (count: 342)             │
├────────────────────────────────────┤
│ [Search Friends...]                │
│ [Requests] [Discover]              │
├────────────────────────────────────┤
│                                    │
│ Img-Sphere Component:              │
│ (Interactive globe with friend pics)
│ - Rotating 3D sphere              │
│ - User avatars positioned on globe│
│ - Click to view profile           │
│                                    │
│ OR List View (fallback):           │
│ ┌──────────────────────────────┐  │
│ │ Avatar | John Doe            │  │
│ │        | @johndoe            │  │
│ │        | [View Profile]      │  │
│ └──────────────────────────────┘  │
│ ┌──────────────────────────────┐  │
│ │ Avatar | Jane Smith          │  │
│ │        | @janesmith          │  │
│ │        | [View Profile]      │  │
│ └──────────────────────────────┘  │
│                                    │
└────────────────────────────────────┘
```

**Requests Tab:**
```
┌────────────────────────────────────┐
│ "Friend Requests" (count: 5)       │
├────────────────────────────────────┤
│ ┌──────────────────────────────┐   │
│ │ Avatar | Bob Johnson         │   │
│ │        | Mutual Friends: 3   │   │
│ │        | [Accept] [Decline]  │   │
│ └──────────────────────────────┘   │
│ ┌──────────────────────────────┐   │
│ │ Avatar | Carol White         │   │
│ │        | Mutual Friends: 1   │   │
│ │        | [Accept] [Decline]  │   │
│ └──────────────────────────────┘   │
│                                    │
└────────────────────────────────────┘
```

**Discover Tab (UC-2 Step 1-3):**
```
┌────────────────────────────────────┐
│ "Discover People"                  │
├────────────────────────────────────┤
│ [Search for users by name...]      │
│ [Filters: Location, Mutual Friends]│
├────────────────────────────────────┤
│ Search Results:                    │
│ ┌──────────────────────────────┐   │
│ │ Avatar | Marcus Lee          │   │
│ │        | @mlee               │   │
│ │        | Mutual Friends: 7   │   │
│ │        | [Add Friend]        │   │
│ └──────────────────────────────┘   │
│ ┌──────────────────────────────┐   │
│ │ Avatar | Sarah Chen          │   │
│ │        | @sarahchen          │   │
│ │        | Mutual Friends: 2   │   │
│ │        | [Add Friend]        │   │
│ └──────────────────────────────┘   │
│                                    │
└────────────────────────────────────┘
```

**Components Used:**
- `ImgSphere` – Interactive friend globe (primary display)
- `SocialCard` or custom card – Friend request/discovery cards
- `Button` – Accept, Decline, Add Friend actions
- `Dialog` – User profile preview on click

**Files:**
- `src/pages/Friends.tsx`
- `src/components/Friends/FriendsList.tsx`
- `src/components/Friends/FriendRequests.tsx`
- `src/components/Friends/DiscoverUsers.tsx`
- `src/components/Friends/FriendsGlobe.tsx` (wraps `ImgSphere`)

---

### 5. **Messaging**
**Purpose:** Private (UC-5.1-4) and group messages (UC-5.9).

**Messaging Hub:**
```
┌──────────────────────────────────────────────┐
│ "Messages"                                   │
├──────────────────────────────────────────────┤
│ [New Message Button] [Search Conversations]  │
├──────────────────────────────────────────────┤
│ Conversation List:                           │
│ ┌────────────────────────────────────────┐   │
│ │ Avatar | John Doe                      │   │
│ │ "Hey, how are you?" (last message)     │   │
│ │ 2:30 PM | Unread                       │   │
│ └────────────────────────────────────────┘   │
│ ┌────────────────────────────────────────┐   │
│ │ Avatar | Friends Group                 │   │
│ │ "Alice: See you tomorrow!" (last msg)  │   │
│ │ 1:15 PM                                │   │
│ └────────────────────────────────────────┘   │
│                                              │
└──────────────────────────────────────────────┘
```

**Conversation View:**
```
┌──────────────────────────────────────────────┐
│ ← | John Doe @johndoe                        │
├──────────────────────────────────────────────┤
│                                              │
│ Messages (scrolling):                        │
│                                              │
│                    "Hey!"                    │
│                    2:30 PM                   │
│                                              │
│ "Hi! How's it going?"                        │
│ 2:35 PM                                      │
│                                              │
│                    "Good, you?"              │
│                    2:36 PM                   │
│                                              │
├──────────────────────────────────────────────┤
│ [Photo Icon] [Write a message...] [Send]    │
│                                              │
└──────────────────────────────────────────────┘
```

**Components Used:**
- `Sidebar` or custom list – Conversation list
- Custom `MessageBubble` component – Message display
- `Button` – Send, attach media
- `Dialog` – New message modal (select recipient)

**Files:**
- `src/pages/Messages.tsx`
- `src/pages/Conversation.tsx`
- `src/components/Messages/ConversationList.tsx`
- `src/components/Messages/MessageBubble.tsx`
- `src/components/Messages/ChatInput.tsx`

---

### 6. **Notifications**
**Purpose:** Alerts for friend requests, likes, comments, messages (UC-6).

**Notifications Panel:**
```
┌────────────────────────────────────┐
│ "Notifications"                    │
├────────────────────────────────────┤
│ [Mark All as Read] [Settings]      │
├────────────────────────────────────┤
│ ┌──────────────────────────────┐   │
│ │ Avatar | John liked your post│   │
│ │ "...amazing day at the beach"│   │
│ │ 2 minutes ago | [View Post]  │   │
│ └──────────────────────────────┘   │
│ ┌──────────────────────────────┐   │
│ │ Avatar | Alice sent you a... │   │
│ │ friend request                │   │
│ │ 15 minutes ago | [Accept]    │   │
│ └──────────────────────────────┘   │
│ ┌──────────────────────────────┐   │
│ │ Avatar | Bob commented:      │   │
│ │ "Where was this?"             │   │
│ │ 1 hour ago | [View]           │   │
│ └──────────────────────────────┘   │
│ ┌──────────────────────────────┐   │
│ │ Avatar | Carol sent you      │   │
│ │ a message                     │   │
│ │ 2 hours ago | [View]         │   │
│ └──────────────────────────────┘   │
│                                    │
│ [See older notifications]          │
│                                    │
└────────────────────────────────────┘
```

**Notification Preferences Settings:**
```
□ Friend Requests
□ Likes
□ Comments
□ Tags
□ Messages
□ Follow Activity
  ├ □ In-app notifications
  ├ □ Email notifications
  └ □ SMS notifications (Premium)
```

**Components Used:**
- Custom `NotificationItem` component – Individual notifications
- `Button` – Action buttons (View, Accept, etc.)
- `Toggle` / `Checkbox` – Notification preferences

**Files:**
- `src/pages/Notifications.tsx`
- `src/components/Notifications/NotificationItem.tsx`
- `src/components/Settings/NotificationPreferences.tsx`

---

### 7. **User Profile**
**Purpose:** Display/edit user info, posts, followers (derived from UC-1 requirements).

**View Profile:**
```
┌──────────────────────────────────────┐
│ ← | John Doe                         │
├──────────────────────────────────────┤
│ [Banner Image]                       │
│        [Profile Picture]             │
│        John Doe                      │
│        @johndoe                      │
│        "Software developer 🚀"       │
│        500 Friends | 1.2K Followers  │
│        [Message] [Add Friend]        │
│                                      │
├──────────────────────────────────────┤
│ [Posts] [About] [Friends]            │
│                                      │
│ Posts Tab:                           │
│ ┌────────────────────────────────┐   │
│ │ [Social Card - User's Post 1]  │   │
│ └────────────────────────────────┘   │
│ ┌────────────────────────────────┐   │
│ │ [Social Card - User's Post 2]  │   │
│ └────────────────────────────────┘   │
│                                      │
└──────────────────────────────────────┘
```

**Edit Profile (Own User):**
```
┌──────────────────────────────────────┐
│ "Edit Profile" [Save]                │
├──────────────────────────────────────┤
│ [Change Banner]                      │
│ [Change Profile Picture]             │
│ [Name: John Doe]                     │
│ [Bio: Software developer 🚀]         │
│ [Location: San Francisco, CA]        │
│ [Birthday: 08/15/1990]               │
│ [Contact: john@example.com]          │
│ [Phone: +1 (555) 123-4567]           │
│ [Website: https://johndoe.com]       │
│                                      │
│ [Privacy Settings]                   │
│ [Deactivate Account] [Delete Account]│
│                                      │
└──────────────────────────────────────┘
```

**Components Used:**
- `SocialCard` – Display user's posts
- `Button` – Message, Add Friend, Edit
- `Dialog` – Profile picture/banner upload
- Form inputs – Edit profile fields

**Files:**
- `src/pages/Profile.tsx`
- `src/components/Profile/ProfileHeader.tsx`
- `src/components/Profile/ProfilePosts.tsx`
- `src/components/Profile/EditProfileModal.tsx`

---

### 8. **Settings / Preferences**
**Purpose:** Manage account settings, privacy, notifications (related to UC-1 & Non-Functional Req 3.2).

**Settings Layout:**
```
┌─────────────────────────────────────────┐
│ "Settings"                              │
├─────────────────────────────────────────┤
│ [Account & Privacy]                     │
│   ├─ Email Preferences                  │
│   ├─ Phone Settings                     │
│   ├─ Password & Security                │
│   ├─ Two-Factor Authentication (MFA)    │
│   ├─ Blocked Users                      │
│   └─ Privacy Settings (FR 3.2)          │
│      ├─ Profile Visibility              │
│      ├─ Post Visibility (Public/Friends │
│      ├─ Allow Comments?                 │
│      ├─ Data Download                   │
│      └─ Data Deletion                   │
│                                         │
│ [Notifications]                         │
│   ├─ Friend Requests                    │
│   ├─ Likes                              │
│   ├─ Comments                           │
│   ├─ Messages                           │
│   └─ [Delivery: App / Email / SMS]      │
│                                         │
│ [Accessibility]                         │
│   ├─ Dark Mode                          │
│   ├─ Text Size                          │
│   ├─ Language (Multi-lang support)      │
│   └─ Screen Reader Support              │
│                                         │
│ [About]                                 │
│   ├─ Terms of Service                   │
│   ├─ Privacy Policy                     │
│   ├─ Report a Problem                   │
│   ├─ Help Center                        │
│   └─ Version Info                       │
│                                         │
│ [Logout] [Deactivate] [Delete Account]  │
│                                         │
└─────────────────────────────────────────┘
```

**Components Used:**
- Form toggles/inputs – Settings controls
- `Dialog` – Confirmation for destructive actions
- `Button` – Actions

**Files:**
- `src/pages/Settings.tsx`
- `src/components/Settings/AccountSettings.tsx`
- `src/components/Settings/PrivacySettings.tsx`
- `src/components/Settings/NotificationSettings.tsx`
- `src/components/Settings/AccessibilitySettings.tsx`

---

## Component Library Integration

### Available 21st.dev Components (To Fetch):
1. **`sidebar`** → `src/components/ui/Sidebar.tsx`
   - Used for: Main navigation (desktop)
   - Functional Req: Navigation structure

2. **`img-sphere`** → `src/components/ui/ImgSphere.tsx`
   - Used for: Friends list globe visualization
   - Functional Req: 2.1-2.4 (Friend management, discovery)

3. **`dock`** → `src/components/ui/Dock.tsx`
   - Used for: Mobile fallback navigation, quick action bar on home
   - Functional Req: Mobile responsiveness

4. **`social-card`** → `src/components/ui/SocialCard.tsx`
   - Used for: Post display, friend cards, messaging cards
   - Functional Req: 3.1-3.5 (Content & interaction), 4.1-4.3 (Messaging)

5. **`dialog`** → `src/components/ui/Dialog.tsx`
   - Used for: Sign-up, sign-in, create post, new message, confirmations
   - Functional Req: 1.1-1.5 (User management), 3.1 (Post creation), 4.1 (Messaging)

6. **`wave-background`** → `src/components/ui/WaveBackground.tsx`
   - Used for: Landing page, branding in auth pages
   - Branding: Distinctive visual (differentiates from Facebook)

7. **`sticky-scroll`** → `src/components/ui/StickyScroll.tsx`
   - Used for: Landing page features, onboarding, profile showcase
   - Functional Req: Feature presentation, user education

### Existing Components:
- **`bento-grid`** – Could be used for dashboard, admin panels, or settings overview
- **`button`** – Standard UI button, used throughout all pages

---

## Data Flow & State Management

### State Architecture:
```
App Context
├── AuthContext
│   ├── currentUser
│   ├── isAuthenticated
│   ├── login()
│   └── logout()
│
├── FeedContext
│   ├── posts[]
│   ├── newPost()
│   ├── likePost()
│   └── commentPost()
│
├── FriendsContext
│   ├── friends[]
│   ├── friendRequests[]
│   ├── sendFriendRequest()
│   ├── acceptFriendRequest()
│   └── searchUsers()
│
├── MessagesContext
│   ├── conversations[]
│   ├── currentConversation
│   ├── sendMessage()
│   └── createGroupChat()
│
├── NotificationsContext
│   ├── notifications[]
│   ├── unreadCount
│   ├── readNotification()
│   └── deleteNotification()
│
└── UIContext
    ├── theme (light/dark)
    ├── language
    ├── sidebarOpen
    └── toggleSidebar()
```

### API Integration Points:
- `POST /api/auth/signup` – UC-1
- `POST /api/auth/signin` – User authentication
- `GET /api/feed` – UC-3 (Display feed)
- `POST /api/posts` – UC-3 (Create post)
- `POST /api/posts/:id/like` – UC-4 (Like)
- `POST /api/posts/:id/comment` – UC-4 (Comment)
- `POST /api/friends/request` – UC-2 (Send friend request)
- `GET /api/friends/requests` – UC-2 (Get pending requests)
- `POST /api/friends/request/:id/accept` – UC-2 (Accept request)
- `POST /api/messages` – UC-5 (Send message)
- `GET /api/messages/:conversationId` – UC-5 (Get conversation)
- `GET /api/notifications` – UC-6 (Get notifications)
- `GET /api/users/search` – Functional Req 6.1
- `PUT /api/users/:id` – Edit profile

---

## Routing Structure

```typescript
// src/routes.tsx (Vite Router or React Router v6+)

const routes = [
  {
    path: '/',
    component: Landing,
    layout: 'minimal' // No sidebar
  },
  {
    path: '/auth',
    component: Auth,
    layout: 'minimal',
    children: [
      { path: 'signup', component: SignUp },
      { path: 'signin', component: SignIn },
      { path: 'reset-password', component: ResetPassword }
    ]
  },
  {
    path: '/app',
    component: AppLayout, // Sidebar + main content
    protected: true,
    children: [
      { path: 'home', component: Home },
      { path: 'profile/:userId', component: Profile },
      { path: 'messages', component: Messages },
      { path: 'messages/:conversationId', component: Conversation },
      { path: 'friends', component: Friends },
      { path: 'friends/requests', component: FriendRequests },
      { path: 'friends/discover', component: DiscoverUsers },
      { path: 'notifications', component: Notifications },
      { path: 'search', component: Search },
      { path: 'settings', component: Settings }
    ]
  },
  {
    path: '/admin',
    component: AdminLayout,
    protected: true,
    roleRequired: 'admin',
    children: [
      { path: 'dashboard', component: AdminDashboard },
      { path: 'content-reports', component: ContentReports }
    ]
  }
]
```

---

## Styling & Branding

### Color Palette (Privacy-First, Clean Design):
```css
/* Primary: Trust & Calm */
--primary: #2563eb (Blue)
--primary-hover: #1d4ed8

/* Secondary: Accent */
--secondary: #7c3aed (Purple)

/* Neutrals */
--bg-primary: #ffffff (Light mode) or #0f172a (Dark mode)
--bg-secondary: #f8fafc
--text-primary: #1e293b
--text-secondary: #64748b

/* Status */
--success: #10b981 (Green - for actions)
--warning: #f59e0b (Amber)
--error: #ef4444 (Red)

/* Borders & Dividers */
--border: #e2e8f0
--border-subtle: #f1f5f9

/* Wave Background (Branding) */
--wave: Gradient from primary to secondary
```

### Typography:
- **Display**: Font-size 32px, Bold (Page titles)
- **Heading**: Font-size 24px, Semi-bold (Section titles)
- **Body**: Font-size 16px, Regular (Content)
- **Caption**: Font-size 12px, Regular (Timestamps, hints)

### Spacing:
- Use Tailwind's default spacing scale: 4px, 8px, 16px, 24px, 32px, etc.

---

## Accessibility & Inclusivity

**Compliance Standards:**
- WCAG 2.1 AA minimum
- Semantic HTML (`<button>`, `<header>`, `<nav>`, etc.)
- ARIA labels for icon buttons and complex components
- Keyboard navigation (Tab through all interactive elements)
- Screen reader support for all content
- Color contrast: 4.5:1 minimum for text

**Multi-Language Support (Non-Functional Req 4.1):**
- i18n library (e.g., `react-i18next`)
- Translation files in `src/i18n/locales/`
- Supported: English (en), Spanish (es), French (fr), Mandarin (zh), etc.

**Content Moderation (Non-Functional Req 4.2):**
- Manual review system for flagged content
- "Report" button on all posts/comments/messages
- Content review modal for admin users

---

## Performance & Scalability

**Performance Targets (Non-Functional Req 2):**
- Average response time: < 3 seconds
- Post interactions (like, comment): < 2 seconds
- Use virtualization for large feeds (React-Window)
- Lazy load images and videos
- Code splitting by route

**Scalability Approach:**
- AWS infrastructure (as per project plan)
- CDN for static assets (CloudFront)
- Database: DynamoDB or PostgreSQL
- Real-time features: WebSocket or Server-Sent Events (SSE)
- Message queue for async tasks (notifications, email)

---

## Security Considerations

**Authentication & Authorization:**
- JWT tokens stored in HttpOnly cookies
- CSRF protection on state-changing requests
- Multi-Factor Authentication (MFA) for admin/sensitive operations
- Input validation & sanitization on all forms

**Data Privacy:**
- End-to-end encryption for private messages (future phase)
- Only test data during development (per project spec)
- GDPR compliance (data download, deletion rights)
- Rate limiting on API endpoints

---

## Development Workflow

### Component File Structure:
```
src/
├── pages/
│   ├── Landing.tsx
│   ├── SignUp.tsx
│   ├── SignIn.tsx
│   ├── Home.tsx
│   ├── Profile.tsx
│   ├── Friends.tsx
│   ├── Messages.tsx
│   ├── Conversation.tsx
│   ├── Notifications.tsx
│   ├── Settings.tsx
│   ├── Search.tsx
│   └── admin/
│       ├── AdminDashboard.tsx
│       └── ContentReports.tsx
│
├── components/
│   ├── ui/ (21st.dev components)
│   │   ├── Sidebar.tsx
│   │   ├── ImgSphere.tsx
│   │   ├── Dock.tsx
│   │   ├── SocialCard.tsx
│   │   ├── Dialog.tsx
│   │   ├── WaveBackground.tsx
│   │   ├── StickyScroll.tsx
│   │   ├── BentoGrid.tsx
│   │   ├── Button.tsx
│   │   └── ...
│   ├── Layout/
│   │   ├── AppLayout.tsx (Sidebar + Content)
│   │   └── MinimalLayout.tsx (No sidebar)
│   ├── Navigation/
│   │   ├── Navbar.tsx
│   │   └── FooterNav.tsx
│   ├── Feed/
│   │   ├── SocialCardPost.tsx
│   │   ├── CreatePostModal.tsx
│   │   ├── CommentSection.tsx
│   │   └── FeedContainer.tsx
│   ├── Friends/
│   │   ├── FriendsGlobe.tsx
│   │   ├── FriendsList.tsx
│   │   ├── FriendRequests.tsx
│   │   ├── DiscoverUsers.tsx
│   │   └── SearchUsersInput.tsx
│   ├── Messages/
│   │   ├── ConversationList.tsx
│   │   ├── MessageBubble.tsx
│   │   ├── ChatInput.tsx
│   │   └── GroupChatHeader.tsx
│   ├── Notifications/
│   │   ├── NotificationItem.tsx
│   │   └── NotificationList.tsx
│   ├── Profile/
│   │   ├── ProfileHeader.tsx
│   │   ├── ProfilePosts.tsx
│   │   ├── EditProfileModal.tsx
│   │   └── ProfileTabs.tsx
│   ├── Settings/
│   │   ├── AccountSettings.tsx
│   │   ├── PrivacySettings.tsx
│   │   ├── NotificationSettings.tsx
│   │   └── AccessibilitySettings.tsx
│   ├── Auth/
│   │   ├── VerificationCodeInput.tsx
│   │   └── PasswordResetForm.tsx
│   └── Common/
│       ├── LoadingSpinner.tsx
│       ├── ErrorBoundary.tsx
│       └── ConfirmDialog.tsx
│
├── contexts/
│   ├── AuthContext.tsx
│   ├── FeedContext.tsx
│   ├── FriendsContext.tsx
│   ├── MessagesContext.tsx
│   ├── NotificationsContext.tsx
│   └── UIContext.tsx
│
├── hooks/
│   ├── useAuth.ts
│   ├── useFeed.ts
│   ├── useFriends.ts
│   ├── useMessages.ts
│   └── ...
│
├── services/
│   ├── api.ts (Fetch wrapper)
│   ├── auth.ts
│   ├── feed.ts
│   ├── friends.ts
│   ├── messages.ts
│   ├── notifications.ts
│   └── users.ts
│
├── utils/
│   ├── cn.ts (Tailwind merge)
│   ├── formatDate.ts
│   ├── validators.ts
│   └── ...
│
├── i18n/
│   └── locales/
│       ├── en.json
│       ├── es.json
│       ├── fr.json
│       └── zh.json
│
├── types/
│   ├── User.ts
│   ├── Post.ts
│   ├── Message.ts
│   ├── Notification.ts
│   └── ...
│
├── App.tsx
├── main.tsx
└── index.css
```

### Component Development Checklist:
- [ ] Component renders correctly (Storybook or manual test)
- [ ] Responsive (mobile, tablet, desktop)
- [ ] Accessible (keyboard nav, screen reader)
- [ ] Props well-typed (TypeScript)
- [ ] Integrates with context/API
- [ ] Loading states implemented
- [ ] Error states handled
- [ ] Unit tests added

---

## Phasing / MVP vs. Future

### Phase 1 (MVP - 6 months):
- User registration & authentication (UC-1)
- User profiles & profile editing
- Post creation, viewing, liking, commenting (UC-3, UC-4)
- Friend connections & friend requests (UC-2)
- Messaging (direct only, UC-5.1-4)
- Notifications (basic, UC-6)
- Search (users and posts)
- Simple moderation tools

### Phase 2 (3-6 months):
- Group messaging (UC-5.9)
- Advanced notification preferences
- Trending feed algorithm
- Video support (currently posts can be photos or videos)
- Content recommendations

### Phase 3 (Future):
- Advertising platform integration
- Analytics for users and advertisers
- Advanced moderation AI
- Live streaming
- Stories (ephemeral content)
- Advanced privacy controls
- End-to-end encryption

---

## Success Metrics

- **User Engagement:** Daily Active Users (DAU), posts per user per day
- **Content Safety:** Moderated posts within 24 hours
- **Performance:** 95th percentile response time < 2s
- **Accessibility:** 90%+ WCAG 2.1 AA compliance
- **Security:** Zero data breaches, MFA adoption > 50%

---

## References

- **Product Spec:** System Proposal – Gigi (all sections)
- **Functional Requirements:** UC-1 through UC-6
- **Non-Functional Requirements:** Performance, Security, Cultural/Political
- **Technology Stack:** Vite, React 19, TypeScript, Tailwind CSS, 21st.dev components
- **Design System:** Wave background branding, simple & clean UI

---

## Summary

GraceNook's frontend is architected as a **component-driven, modular React application** with:

1. **Clear Page Hierarchy:** Landing → Auth → App (protected) → Admin
2. **Reusable UI Components:** 7 primary shadcn components from 21st.dev integrated across 8 core feature areas
3. **Privacy-First Design:** Clean interfaces, transparent notifications, user-controlled settings
4. **Scalable State:** Context API + custom hooks for global state, avoiding complexity
5. **Accessibility & Inclusivity:** WCAG 2.1 AA compliance, multi-language support, content moderation
6. **Performance:** Lazy loading, code splitting, virtual scrolling for large feeds
7. **Phased Rollout:** MVP in 6 months, advanced features in later phases

Each page and component maps directly to functional requirements and use cases, ensuring the frontend delivers the business value promised in the product spec: a simple, safe, fun social experience.
