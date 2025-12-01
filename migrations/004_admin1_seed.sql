-- Admin1 user seed (auto-generated)
INSERT INTO users (email, username, name, password_hash, role, is_active) VALUES ('admin1@example.com','@admin1','Admin One','TbQta_MLUuwkx065XmxAgg.hYfUE8YB6pbWHaKiv6fuZRwmLbSrCDojNh0AaVfYa_I','admin',1);
-- Profile for admin1 (links to the inserted user)
INSERT INTO profiles (user_id, bio, profile_photo) VALUES ((SELECT id FROM users WHERE username='@admin1'), 'Site administrator', NULL);
