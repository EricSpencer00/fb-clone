**Denormalized Data Model (Selected Views)**

Purpose: Provide pre-joined/flattened records for high-read surfaces (feed, explore, admin reports).

1) Feed view (`vw_feed`)
- Columns (example): `post_id`, `user_id`, `username`, `name`, `profile_photo`, `content`, `media_url`, `post_date`, `like_count`, `comment_count`, `liked_by_current_user`, `is_flagged`, `isAd`, `ad_id`, `ad_title`, `ad_image_url`, `ad_target_url`
- Source: join `posts` u/users p/profiles left join aggregated `post_likes` and `post_comments`, and optionally embed active `ads` as `isAd` rows if injection logic used.
- Use: `GET /api/posts/feed` and `GET /api/posts/explore` can read this view for faster rendering.

2) Admin reports view (`vw_reports`)
- Columns: `report_id`, `reporter_id`, `reporter_username`, `content_type`, `content_id`, `content_preview`, `status`, `created_at`, `reviewed_at`, `implicated_user_id`, `implicated_username`
- Use: admin listing with single-table reads.

3) Advertiser performance view (`vw_ad_stats_daily`)
- Columns: `ad_id`, `advertiser_id`, `date`, `impressions`, `clicks`, `ctr` (clicks/impressions)
- Source: aggregated daily by reading `ads` event streams or using periodic batch jobs; store in a separate analytics table or time-series store.

Denormalization strategy
- Create lightweight materialized views (periodic batch refresh via a worker) or ephemeral pre-computed rows when a write occurs (e.g., increment counters) depending on update frequency.
- For D1, which is relational and small-scale, consider generating `vw_feed` on demand but with careful index usage. For large scale, push to a reporting DB or RDS/RDS-like store.
