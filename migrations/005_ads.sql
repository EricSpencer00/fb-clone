-- Create ads table for the ad system

CREATE TABLE IF NOT EXISTS ads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  target_url TEXT NOT NULL,
  impression_count INTEGER DEFAULT 0,
  click_count INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Seed with sample ads
INSERT INTO ads (title, image_url, target_url) VALUES
  ('Summer Collection', 'https://placehold.co/320x100?text=Summer', 'https://example.com/summer'),
  ('Tech Sale', 'https://placehold.co/320x100?text=Tech+Sale', 'https://example.com/tech'),
  ('Learn More', 'https://placehold.co/320x100?text=Learn+More', 'https://example.com/learn');
