**CRUD Matrix — GraceNook (API → Table → CRUD)**

Format: `API endpoint` → `Primary table(s)` → `CRUD` → `Notes`

- `POST /api/auth/register` → `users`, `profiles` → Create
  - Creates a `users` row and an associated `profiles` row.
- `POST /api/auth/login` → `users` → Read (auth)
  - Reads `users` to verify credentials and returns JWT.
- `GET /api/me` → `users`, `profiles` → Read
- `PATCH /api/profile` → `profiles` → Update

- `POST /api/posts` → `posts` → Create
- `GET /api/posts/feed` → `posts`, `users`, `profiles`, `post_likes`, `post_comments` → Read
- `GET /api/posts/explore` → `posts`, `users`, `profiles` → Read
- `GET /api/posts/:id` → `posts`, `post_likes`, `post_comments` → Read
- `DELETE /api/posts/:id` → `posts` → Delete (owner or admin)
- `POST /api/posts/:id/like` → `post_likes` → Create/Delete (toggle)
- `POST /api/posts/:id/comment` → `post_comments` → Create
- `GET /api/posts/:id/comments` → `post_comments` → Read
- `POST /api/posts/:id/report` → `reports` → Create

- `GET /api/friends` → `friends`, `users`, `profiles` → Read
- `POST /api/friends/request` → `friend_requests` → Create
- `GET /api/friends/pending` → `friend_requests` → Read
- `POST /api/friends/accept/:id` → `friend_requests`, `friends` → Update/Create
- `DELETE /api/friends/remove/:id` → `friends` → Delete

- `GET /api/messages/conversations` → `messages`, `users`, `profiles` → Read
- `GET /api/messages/thread/:userId` → `messages` → Read
- `POST /api/messages/:userId` → `messages` → Create

- `GET /api/notifications` → `notifications` → Read
- `POST /api/notifications/read` → `notifications` → Update
- `POST /api/notifications/read-all` → `notifications` → Update

- `GET /api/ads` → `ads` → Read
- `POST /api/ads/:id/impression` → `ads` → Update (increment)
- `POST /api/ads/:id/click` → `ads` → Update (increment)

- Advertiser (role=advertiser|admin)
  - `GET /api/advertiser/ads` → `ads` → Read
  - `POST /api/advertiser/ads` → `ads` → Create
  - `PATCH /api/advertiser/ads/:id` → `ads` → Update
  - `GET /api/advertiser/stats` → `ads` → Read (aggregate)

- Admin (role=admin)
  - `GET /api/admin/users` → `users` → Read
  - `PATCH /api/admin/users/:id` → `users` → Update (role/is_active)
  - `GET /api/admin/reports` → `reports` → Read
  - `PATCH /api/admin/reports/:id` → `reports`, `posts`, `post_comments` → Update (resolve flagging)
  - `GET /api/admin/ads/pending` → `ads` → Read
  - `POST /api/admin/ads/:id/approve` → `ads` → Update
  - `POST /api/admin/ads/:id/reject` → `ads` → Update
  - `GET /api/admin/stats` → `users`, `posts`, `reports`, `ads` → Read (aggregate)

Notes
- Many endpoints read joined data from multiple tables to assemble the view-model returned to the client (e.g., posts joined with users and profiles).
- For scalability, counters (impressions, clicks) are stored on `ads` and updated in place.
