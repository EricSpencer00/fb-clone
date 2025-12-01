-- Admin user seed (auto-generated)
INSERT INTO users (email, username, name, password_hash, role, is_active) VALUES ('admin@example.com','admin','Site Admin','tOZo_E585DpkG55UFamI1g.Xskgx0ip-kW6pQ7Vn1qepu04YDeVkkzmOWGJY9cy-p0','admin',1);
-- Profile for admin (links to the inserted user)
INSERT INTO profiles (user_id, bio, profile_photo) VALUES ((SELECT id FROM users WHERE username='admin'), 'Site administrator', NULL);
