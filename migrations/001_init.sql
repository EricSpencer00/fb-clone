-- D1 initial schema for ads system
-- Ads table stores creative metadata and simple metrics
CREATE TABLE IF NOT EXISTS ads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  target_url TEXT NOT NULL,
  impression_count INTEGER NOT NULL DEFAULT 0,
  click_count INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);

-- Seed sample ads if table empty (SQLite syntax)
INSERT INTO ads (title, image_url, target_url)
SELECT 'Sample Ad 1', 'https://placehold.co/320x100?text=Ad+1', 'https://example.com'
WHERE NOT EXISTS (SELECT 1 FROM ads);

INSERT INTO ads (title, image_url, target_url)
SELECT 'Sample Ad 2', 'https://placehold.co/320x100?text=Ad+2', 'https://example.com/2'
WHERE (SELECT COUNT(*) FROM ads) < 2;
