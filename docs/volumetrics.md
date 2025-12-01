**Volumetrics & Capacity Planning — GraceNook (Estimates & Assumptions)**

Assumptions (example baseline for a school deployment)
- Active users: 10,000 total users, 2,000 daily active users (DAU)
- Posts per active user per day: 0.1 (200 posts/day)
- Comments per post: 0.5 (100 comments/day)
- Likes per post: 2 average (400 likes/day)
- Messages: average 2 messages per DAU per day → 4,000 messages/day
- Ads: 100 active ads, 5k ad impressions per day across site

Estimated per-row storage (approx)
- `users`: 512 bytes (strings, password hash, metadata)
- `profiles`: 256 bytes
- `posts`: 1024 bytes (text + media URL)
- `post_comments`: 512 bytes
- `post_likes`: 32 bytes (composite key)
- `messages`: 512 bytes
- `ads`: 768 bytes
- `notifications`: 256 bytes
- `reports`: 512 bytes

Daily storage growth estimate
- Posts: 200 * 1,024 = ~200 KB
- Comments: 100 * 512 = ~50 KB
- Likes: 400 * 32 = ~12.8 KB
- Messages: 4,000 * 512 = ~2,048 KB (~2 MB)
- Notifications (assume per event): 1,000 * 256 = 256 KB

Monthly growth (30 days) ~ approx 60 MB in messages + overhead

Index and DB size
- Index overhead: typically 20-40% of raw table data; plan for 1.5x to 2x multiplier on top of data.
- Backup storage: plan for daily incremental backups to R2; retain 30 days.

Throughput
- Reads: feed/explore endpoints will be the busiest. Use caching (Cloudflare cache) for public explore and CDN for media.
- Writes: spikes on events (likes/comments). Ensure Cloudflare Worker concurrency and D1 quotas are compatible with expected bursts.

Scaling notes
- If growth exceeds D1 throughput or storage, consider moving analytics/denormalized views to a secondary store (e.g., managed PostgreSQL or ClickHouse) and use D1 for transactional data only.

Assumptions should be tuned with real metrics from the system after launch.
