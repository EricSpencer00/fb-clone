-- Seed data for GraceNook
-- Note: The worker auto-initializes tables if they don't exist.
-- These seed inserts are optional - register users through the app for proper password hashing.
-- This file seeds sample ads for demonstration.

-- Sample ads (approved and active) - these work without users
INSERT INTO ads (advertiser_id, title, image_url, target_url, status) VALUES 
(NULL, 'Summer Tech Sale', 'https://placehold.co/728x90/3b82f6/ffffff?text=Summer+Tech+Sale+-+50%25+Off', 'https://example.com/summer-sale', 'active'),
(NULL, 'Learn to Code', 'https://placehold.co/728x90/10b981/ffffff?text=Learn+to+Code+-+Start+Free', 'https://example.com/learn-code', 'active'),
(NULL, 'Premium Membership', 'https://placehold.co/728x90/8b5cf6/ffffff?text=Go+Premium+-+Unlock+Features', 'https://example.com/premium', 'active'),
(NULL, 'New Collection', 'https://placehold.co/728x90/f59e0b/ffffff?text=New+Fashion+Collection', 'https://example.com/fashion', 'active'),
(NULL, 'Health & Wellness', 'https://placehold.co/728x90/ef4444/ffffff?text=Your+Health+Matters', 'https://example.com/health', 'active');
