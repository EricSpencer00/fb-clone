-- Migration: seed 100 fake users and one post each
-- This file is idempotent: it uses SELECT/WHERE NOT EXISTS guards

BEGIN TRANSACTION;
-- User 1: silverbird682
INSERT INTO users (username, name, email, password_hash) SELECT 'silverbird682', 'Ellen Saarinen', 'ellen.saarinen@example.com', 'weJepF7rWUu29l7Z3HlP_A.W6xEKvVwhZFUS0CR2ITwyhHJPsJR6G-VBPfxlPsqf3Q' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='silverbird682');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/women/84.jpg' FROM users WHERE username='silverbird682' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='silverbird682'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Train book dog laugh train story story forest river garden smile play.', NULL, 'public' FROM users WHERE username='silverbird682' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='silverbird682'));

-- User 2: angrypanda733
INSERT INTO users (username, name, email, password_hash) SELECT 'angrypanda733', 'Britt Jungmann', 'britt.jungmann@example.com', 'Z8MoKYimhpqiQC3Brj93cQ.0aAEGVMR8bNDBCk6bLj1QptZ7TA2lXsu81RFCYE9Mt8' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='angrypanda733');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/women/1.jpg' FROM users WHERE username='angrypanda733' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='angrypanda733'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Dog story read weekend recipe code learn learn music ocean dream friend walk mountain sunset food.', NULL, 'public' FROM users WHERE username='angrypanda733' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='angrypanda733'));

-- User 3: bluefish878
INSERT INTO users (username, name, email, password_hash) SELECT 'bluefish878', 'Ceyhan Aybar', 'ceyhan.aybar@example.com', 'QIu7Ze85NY0JSKpPQF6bxA.4k1OTZPsB4O-m2U8Xl_iAIe4wqn1NEVSP1rAmYi7XXo' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='bluefish878');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/women/72.jpg' FROM users WHERE username='bluefish878' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='bluefish878'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Chill river code recipe coffee park photo write piano train photo write write.', NULL, 'public' FROM users WHERE username='bluefish878' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='bluefish878'));

-- User 4: blackpanda740
INSERT INTO users (username, name, email, password_hash) SELECT 'blackpanda740', 'Sapna Mardhekar', 'sapna.mardhekar@example.com', 'XePghhDO3qXxsUP-53UkgQ.028FozE-dfJM5l5Vek90jtJE7lgqqGGRrd6rOZxGojw' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='blackpanda740');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/women/93.jpg' FROM users WHERE username='blackpanda740' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='blackpanda740'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Code chill breeze build photo write forest write write cat mountain music kitchen.', NULL, 'public' FROM users WHERE username='blackpanda740' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='blackpanda740'));

-- User 5: ticklishrabbit159
INSERT INTO users (username, name, email, password_hash) SELECT 'ticklishrabbit159', 'Lise Pierre', 'lise.pierre@example.com', 'nKv69HpLAIUXXQjzhK3MOg.AXdEDzdYkGH1Cxbuyw6blvLyfdUuRC247bRFr1bncCs' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='ticklishrabbit159');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/women/14.jpg' FROM users WHERE username='ticklishrabbit159' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='ticklishrabbit159'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Hike movie build weekend friend breeze build food mountain laugh play breeze code.', NULL, 'public' FROM users WHERE username='ticklishrabbit159' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='ticklishrabbit159'));

-- User 6: yellowtiger447
INSERT INTO users (username, name, email, password_hash) SELECT 'yellowtiger447', 'Jobst Roß', 'jobst.ross@example.com', '5RtmC6Rs6oqEbnuCmzjxCA.2CCScffemiHwxfnBxda6HZyZ7RJEBD3oeDzJnUvRlsE' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='yellowtiger447');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/men/57.jpg' FROM users WHERE username='yellowtiger447' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='yellowtiger447'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'City forest read smile play friend code story home day garden share dinner hike.', NULL, 'public' FROM users WHERE username='yellowtiger447' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='yellowtiger447'));

-- User 7: organicmouse777
INSERT INTO users (username, name, email, password_hash) SELECT 'organicmouse777', 'Lidia Flores', 'lidia.flores@example.com', 'GFidNB2anFUYB4U6T9RPWA.alY1qCtr2uczEsWBQmvKRdDgCea1pBs0oaS3IFqx27c' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='organicmouse777');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/women/31.jpg' FROM users WHERE username='organicmouse777' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='organicmouse777'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Chill hike play forest home city.', NULL, 'public' FROM users WHERE username='organicmouse777' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='organicmouse777'));

-- User 8: smallgorilla482
INSERT INTO users (username, name, email, password_hash) SELECT 'smallgorilla482', 'Christian Petersen', 'christian.petersen@example.com', 'PDEB07lAZhOXBEBxb7SplQ.89I5M_C12MT-Pjm57f3TzzIRG0xmyew1QS-d5BovmYM' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='smallgorilla482');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/men/75.jpg' FROM users WHERE username='smallgorilla482' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='smallgorilla482'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Movie forest mountain smile forest forest share day piano photo happy sunny dog.', NULL, 'public' FROM users WHERE username='smallgorilla482' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='smallgorilla482'));

-- User 9: angryleopard540
INSERT INTO users (username, name, email, password_hash) SELECT 'angryleopard540', 'Lucas Robinson', 'lucas.robinson@example.com', 'iwmxbmjVQD2fU6PLUqp2fQ.fFs6mk6F384ID5i6ooeI_y1otTNlKo7COGA9GCcvfiI' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='angryleopard540');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/men/59.jpg' FROM users WHERE username='angryleopard540' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='angryleopard540'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Work city photo travel write story mountain travel story park.', NULL, 'public' FROM users WHERE username='angryleopard540' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='angryleopard540'));

-- User 10: blueelephant216
INSERT INTO users (username, name, email, password_hash) SELECT 'blueelephant216', 'Roxane Moulin', 'roxane.moulin@example.com', 'mLyAbs93M9ZrlHwhc_hLeA.qJyfC4ScQzIJP7oPaELBdvOM0hkISFMfXn4DXgYjbsc' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='blueelephant216');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/women/71.jpg' FROM users WHERE username='blueelephant216' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='blueelephant216'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Coffee mountain read work city forest travel chill market lunch smile play weekend city happy.', NULL, 'public' FROM users WHERE username='blueelephant216' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='blueelephant216'));

-- User 11: yellowgoose418
INSERT INTO users (username, name, email, password_hash) SELECT 'yellowgoose418', 'Emir Kallestad', 'emir.kallestad@example.com', 'KF5nYxUq9p4z4YxkLiLGsg.BiSa7Fv9uPifN18gFNapvQlS3Z0a0fiIdKZxWY3nu_8' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='yellowgoose418');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/men/40.jpg' FROM users WHERE username='yellowgoose418' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='yellowgoose418'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Lunch hike write garden chill garden river home movie sunny read cat piano kitchen work share.', NULL, 'public' FROM users WHERE username='yellowgoose418' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='yellowgoose418'));

-- User 12: heavybutterfly687
INSERT INTO users (username, name, email, password_hash) SELECT 'heavybutterfly687', 'Sophie Ambrose', 'sophie.ambrose@example.com', 'KvjbyTQP2k3_XC140qT1ZQ.IY8SeYepaoxN-itTDKe4w_9T8-ocQ3giDQjPUx8Op9c' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='heavybutterfly687');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/women/40.jpg' FROM users WHERE username='heavybutterfly687' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='heavybutterfly687'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Work smile ocean code market market kitchen piano write dream dog river read chill movie.', NULL, 'public' FROM users WHERE username='heavybutterfly687' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='heavybutterfly687'));

-- User 13: angrydog562
INSERT INTO users (username, name, email, password_hash) SELECT 'angrydog562', 'Draginja Erceg', 'draginja.erceg@example.com', 'jxcZMZwUBQETN3fpYM-eXA.1ZnDPw1CHBS0wdsMZrWPD4gRWevkv4mKUfM7oC8jSo8' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='angrydog562');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/women/95.jpg' FROM users WHERE username='angrydog562' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='angrydog562'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Forest lunch market learn learn hike walk market.', NULL, 'public' FROM users WHERE username='angrydog562' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='angrydog562'));

-- User 14: silverbutterfly786
INSERT INTO users (username, name, email, password_hash) SELECT 'silverbutterfly786', 'Ege Tokgöz', 'ege.tokgoz@example.com', 'ZDj3HU9CvrM_LPHvx9mbNA.h9rVixFPFWuXpwA1MFyItrDfnrPMy2hMgccguChPH3w' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='silverbutterfly786');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/women/12.jpg' FROM users WHERE username='silverbutterfly786' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='silverbutterfly786'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Recipe river breeze story read food photo work happy.', NULL, 'public' FROM users WHERE username='silverbutterfly786' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='silverbutterfly786'));

-- User 15: whitecat277
INSERT INTO users (username, name, email, password_hash) SELECT 'whitecat277', 'Dean Martinez', 'dean.martinez@example.com', 'VcdV5NFAB5oFwnNoZrqQmw.Z2JBgf8GMab58VhElgVqGvJHG6tcz9LzN3ubbbh7Sy4' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='whitecat277');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/men/36.jpg' FROM users WHERE username='whitecat277' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='whitecat277'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Breeze photo music dinner travel home share book smile forest book travel market coffee cat food.', NULL, 'public' FROM users WHERE username='whitecat277' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='whitecat277'));

-- User 16: silvermouse170
INSERT INTO users (username, name, email, password_hash) SELECT 'silvermouse170', 'Jayden Taylor', 'jayden.taylor@example.com', 'Vh3Q29LkXoMrLERRbF4Ndg.VCh49nNQfjD0IZ_DgWMoU08b5SQZDr9W3Aw_PVDPALw' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='silvermouse170');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/men/74.jpg' FROM users WHERE username='silvermouse170' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='silvermouse170'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Code coffee day smile park friend photo hike lunch bicycle train friend dream read weekend work.', NULL, 'public' FROM users WHERE username='silvermouse170' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='silvermouse170'));

-- User 17: tinybutterfly513
INSERT INTO users (username, name, email, password_hash) SELECT 'tinybutterfly513', 'Magdalena Katić', 'magdalena.katic@example.com', 'Ruo6jK33E2BVeyLmPBeE8A.vhvurRYqGHHNWbB6m_5iEXu6-SWBXJaDkSHo5HI6WaI' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='tinybutterfly513');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/women/43.jpg' FROM users WHERE username='tinybutterfly513' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='tinybutterfly513'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Build learn dinner coffee hike build day city market.', NULL, 'public' FROM users WHERE username='tinybutterfly513' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='tinybutterfly513'));

-- User 18: ticklishbear567
INSERT INTO users (username, name, email, password_hash) SELECT 'ticklishbear567', 'Girish Dhamdhame', 'girish.dhamdhame@example.com', 'N3GQF0gMVFDPZKjDY1wqIQ.zCx1rPypKYjPkKQj2SHOrdKEPGSwrZxoVdpmWMKo3Ec' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='ticklishbear567');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/men/40.jpg' FROM users WHERE username='ticklishbear567' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='ticklishbear567'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Cat code write forest hike mountain market cat build forest dog sunset work recipe.', NULL, 'public' FROM users WHERE username='ticklishbear567' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='ticklishbear567'));

-- User 19: redgorilla512
INSERT INTO users (username, name, email, password_hash) SELECT 'redgorilla512', 'Diethard Marek', 'diethard.marek@example.com', 'zppOBEv2gRBU8FLQroai7Q.SIqygg9mBC8fTM-NWUl2VD3SDjs46j4sO7xbQUMchZ4' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='redgorilla512');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/men/18.jpg' FROM users WHERE username='redgorilla512' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='redgorilla512'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Music park cat laugh ocean walk code learn.', NULL, 'public' FROM users WHERE username='redgorilla512' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='redgorilla512'));

-- User 20: tinybird894
INSERT INTO users (username, name, email, password_hash) SELECT 'tinybird894', 'Gavin Collins', 'gavin.collins@example.com', '4B8ejpqflDRmKQyaj8bslA.aRhUKZmbqsvAHD3Oe4rZ4UinuKZs5VckmIjkCrGWtWw' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='tinybird894');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/men/98.jpg' FROM users WHERE username='tinybird894' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='tinybird894'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Hike story city chill mountain laugh play.', NULL, 'public' FROM users WHERE username='tinybird894' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='tinybird894'));

-- User 21: yellowgoose316
INSERT INTO users (username, name, email, password_hash) SELECT 'yellowgoose316', 'Laura Castro', 'laura.castro@example.com', 'xIikoRguB3vyn01SqCkpdw.fNIJBG0VSg8WweNBUgQv4Ny15DKBjWndi9BQtc_Xjlk' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='yellowgoose316');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/women/74.jpg' FROM users WHERE username='yellowgoose316' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='yellowgoose316'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Music travel train music chill kitchen city ocean book chill play city day write.', NULL, 'public' FROM users WHERE username='yellowgoose316' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='yellowgoose316'));

-- User 22: ticklishbutterfly993
INSERT INTO users (username, name, email, password_hash) SELECT 'ticklishbutterfly993', 'Jezdimir Radojičić', 'jezdimir.radojicic@example.com', 'pS9_Nwdx40iW3frGGfSi0A.DJLysT2B1yy8Tc34gxxCm3Z66DqWDOObCmfcDgT8AeA' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='ticklishbutterfly993');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/men/4.jpg' FROM users WHERE username='ticklishbutterfly993' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='ticklishbutterfly993'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Chill travel food kitchen music work breeze dream story weekend learn.', NULL, 'public' FROM users WHERE username='ticklishbutterfly993' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='ticklishbutterfly993'));

-- User 23: purplegorilla410
INSERT INTO users (username, name, email, password_hash) SELECT 'purplegorilla410', 'تارا سهيلي راد', 'tr.shylyrd@example.com', 'D6xrCcNsQDO4_1hMii_Cjw.z2MuW_pehIiOEyfWxzSjPEVtSjt5HdLyRt43lWf2cb4' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='purplegorilla410');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/women/9.jpg' FROM users WHERE username='purplegorilla410' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='purplegorilla410'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Garden learn home movie cat hike.', NULL, 'public' FROM users WHERE username='purplegorilla410' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='purplegorilla410'));

-- User 24: blackswan782
INSERT INTO users (username, name, email, password_hash) SELECT 'blackswan782', 'Irene Esquivel', 'irene.esquivel@example.com', 'BlZsYR0r3bFpvBGvpV9ReA.fugudtossbaUUSH7pNHM0APATBE-kv3iVUOqSgFxUJU' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='blackswan782');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/women/35.jpg' FROM users WHERE username='blackswan782' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='blackswan782'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Smile home dog dinner sunset train food book forest city chill forest learn code piano dream.', NULL, 'public' FROM users WHERE username='blackswan782' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='blackswan782'));

-- User 25: blackladybug624
INSERT INTO users (username, name, email, password_hash) SELECT 'blackladybug624', 'Víctor Rojas', 'victor.rojas@example.com', 'kiQGi7xa8IaF7NCqAia7jA.xj8iHXasLbtdJZO4EnQ1u3UJGVMErUa4Ss9QmtNe6Tk' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='blackladybug624');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/men/32.jpg' FROM users WHERE username='blackladybug624' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='blackladybug624'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Travel build story read travel piano code work park travel bicycle market story recipe dinner.', NULL, 'public' FROM users WHERE username='blackladybug624' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='blackladybug624'));

-- User 26: happyladybug490
INSERT INTO users (username, name, email, password_hash) SELECT 'happyladybug490', 'Perry Elliott', 'perry.elliott@example.com', 'UsvoqDY_NjAUvIP7zZqSGA.apdXQpq8nWXibNJowfiI8JhvO-XgnGbZBU2_AyXpaVA' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='happyladybug490');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/men/3.jpg' FROM users WHERE username='happyladybug490' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='happyladybug490'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Smile bicycle laugh photo travel book coffee lunch home chill.', NULL, 'public' FROM users WHERE username='happyladybug490' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='happyladybug490'));

-- User 27: blackgorilla396
INSERT INTO users (username, name, email, password_hash) SELECT 'blackgorilla396', 'رضا كامياران', 'rd.kmyrn@example.com', 'azC-8DRLQcRYc-dPaKfQdg.J_yR0G0UP-Pkx5CYKwnhLsTTjrM4Lcs_lCY_fcNE8i8' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='blackgorilla396');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/men/34.jpg' FROM users WHERE username='blackgorilla396' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='blackgorilla396'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Build food write forest coffee music.', NULL, 'public' FROM users WHERE username='blackgorilla396' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='blackgorilla396'));

-- User 28: whitemouse738
INSERT INTO users (username, name, email, password_hash) SELECT 'whitemouse738', 'Aashish Das', 'aashish.das@example.com', 'cryDIXDWQ9gkVyEVasTYVw.ESRUXFnWMUuzlBtLc7uvwsK36n9LeUOXG1HUxdCbX84' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='whitemouse738');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/men/20.jpg' FROM users WHERE username='whitemouse738' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='whitemouse738'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Dream park sunset share book piano read sunny sunset river walk play story breeze photo.', NULL, 'public' FROM users WHERE username='whitemouse738' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='whitemouse738'));

-- User 29: silverostrich126
INSERT INTO users (username, name, email, password_hash) SELECT 'silverostrich126', 'Katy Yildirim', 'katy.yildirim@example.com', 'sAiqgsR7k9_UzR9QrWjvGQ._gFuF83WcnZMpwn_YaFGQ4WnHUVhs3vpzTUsW3q3jz8' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='silverostrich126');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/women/47.jpg' FROM users WHERE username='silverostrich126' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='silverostrich126'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Sunset train cat chill walk play weekend forest forest market share.', NULL, 'public' FROM users WHERE username='silverostrich126' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='silverostrich126'));

-- User 30: beautifulelephant995
INSERT INTO users (username, name, email, password_hash) SELECT 'beautifulelephant995', 'Guilhermina Araújo', 'guilhermina.araujo@example.com', 'DUQUl5DZV1ihEE24k9nT9A.LFqM9HFnpo43zFWqM-cqKJ8h9J3N605u7aQaQyjovyA' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='beautifulelephant995');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/women/15.jpg' FROM users WHERE username='beautifulelephant995' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='beautifulelephant995'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Sunset kitchen recipe breeze bicycle write garden bicycle walk music code laugh mountain.', NULL, 'public' FROM users WHERE username='beautifulelephant995' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='beautifulelephant995'));

-- User 31: purplezebra586
INSERT INTO users (username, name, email, password_hash) SELECT 'purplezebra586', 'Begoña Hidalgo', 'begona.hidalgo@example.com', 'N8ldai0wjAIglHKjJeU1qw.Daid6F_0WC7wrtcZEETPuUxDFLQ9vRczQwO96mYYvao' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='purplezebra586');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/women/7.jpg' FROM users WHERE username='purplezebra586' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='purplezebra586'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Forest dog story dog photo lunch travel garden park.', NULL, 'public' FROM users WHERE username='purplezebra586' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='purplezebra586'));

-- User 32: goldenpanda325
INSERT INTO users (username, name, email, password_hash) SELECT 'goldenpanda325', 'ایلیا ��الاری', 'yly.slry@example.com', '_zOihVzojWGtMj7Lf1EEjQ.LukhYWrf_PK46doV0w-SS-rUQojmNeISWP-5RuVMTF8' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='goldenpanda325');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/men/55.jpg' FROM users WHERE username='goldenpanda325' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='goldenpanda325'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Movie park day dinner bicycle food city forest garden chill food learn sunny.', NULL, 'public' FROM users WHERE username='goldenpanda325' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='goldenpanda325'));

-- User 33: goldenpeacock369
INSERT INTO users (username, name, email, password_hash) SELECT 'goldenpeacock369', 'Hans-Otto Temme', 'hans-otto.temme@example.com', 'dbODdbBq4WUvuvImqdNY2A.CSZELM5TSPuCcCsSZlW2j29pDTeqWFkYAShO663T58I' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='goldenpeacock369');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/men/93.jpg' FROM users WHERE username='goldenpeacock369' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='goldenpeacock369'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Forest walk happy recipe food coffee.', NULL, 'public' FROM users WHERE username='goldenpeacock369' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='goldenpeacock369'));

-- User 34: beautifulduck478
INSERT INTO users (username, name, email, password_hash) SELECT 'beautifulduck478', 'Riley Gordon', 'riley.gordon@example.com', 'W9v82xVQ5-DrsQiWniVo9w.jQsOUzmQpHlxGDNMKFOUemOKBGpJrmVkETydhLDR2cs' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='beautifulduck478');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/women/47.jpg' FROM users WHERE username='beautifulduck478' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='beautifulduck478'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Happy movie park learn ocean coffee photo hike breeze cat ocean forest ocean lunch city travel weekend.', NULL, 'public' FROM users WHERE username='beautifulduck478' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='beautifulduck478'));

-- User 35: greenostrich852
INSERT INTO users (username, name, email, password_hash) SELECT 'greenostrich852', 'Joe Freeman', 'joe.freeman@example.com', '61AhbfEsFl4AkbuUWympyw.5k07tZzM-pS4t9ghZKQUFo53tFvbiax3mGTG6t8X4pU' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='greenostrich852');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/men/27.jpg' FROM users WHERE username='greenostrich852' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='greenostrich852'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Bicycle sunset dream build story lunch share friend coffee city.', NULL, 'public' FROM users WHERE username='greenostrich852' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='greenostrich852'));

-- User 36: bigbear547
INSERT INTO users (username, name, email, password_hash) SELECT 'bigbear547', 'Hunter Fortin', 'hunter.fortin@example.com', 'wbDd8zclxvDjrBB9YNITig.zaRk-G4elra7hpXy_isDP44nl6fz9q6vKrsoK9fEsJQ' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='bigbear547');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/men/0.jpg' FROM users WHERE username='bigbear547' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='bigbear547'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Mountain friend food bicycle market walk lunch build photo bicycle share hike learn read breeze work forest.', NULL, 'public' FROM users WHERE username='bigbear547' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='bigbear547'));

-- User 37: lazyrabbit273
INSERT INTO users (username, name, email, password_hash) SELECT 'lazyrabbit273', 'Berta Prieto', 'berta.prieto@example.com', 'DjOvtyNlmILN5Hal3JsB2g.q99diYzUz16iJumZK4eoOlBQzGZ175bwX-h_UScE90Y' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='lazyrabbit273');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/women/75.jpg' FROM users WHERE username='lazyrabbit273' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='lazyrabbit273'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Piano lunch sunset build coffee kitchen.', NULL, 'public' FROM users WHERE username='lazyrabbit273' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='lazyrabbit273'));

-- User 38: beautifulrabbit826
INSERT INTO users (username, name, email, password_hash) SELECT 'beautifulrabbit826', 'پرنیا موسوی', 'prny.mwswy@example.com', 'UP8ra6uz4jLdlZfruw3YMQ.55daYzOBjBZy3aIMy-l_ztiH0y2paKhy5rz18Y9gHg4' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='beautifulrabbit826');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/women/86.jpg' FROM users WHERE username='beautifulrabbit826' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='beautifulrabbit826'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Music weekend movie lunch weekend happy music mountain dream chill share dinner ocean lunch.', NULL, 'public' FROM users WHERE username='beautifulrabbit826' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='beautifulrabbit826'));

-- User 39: yellowmeercat830
INSERT INTO users (username, name, email, password_hash) SELECT 'yellowmeercat830', 'Yash Padmanabha', 'yash.padmanabha@example.com', 'r4RSHFyCDJZXc8IrVTZ9NQ.LJZltPlSETJZc88agNhEGjDtCgc4WwxxL1sE49iuXnI' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='yellowmeercat830');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/men/18.jpg' FROM users WHERE username='yellowmeercat830' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='yellowmeercat830'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Bicycle coffee story forest learn piano train bicycle travel recipe write breeze kitchen recipe.', NULL, 'public' FROM users WHERE username='yellowmeercat830' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='yellowmeercat830'));

-- User 40: lazyzebra845
INSERT INTO users (username, name, email, password_hash) SELECT 'lazyzebra845', 'Amelija Nilsen', 'amelija.nilsen@example.com', 'Kq1zDYYmrb8qUnLzQApb1g.2f8x5IH6pDlJapdyTKX7hQyO2kmwvAxsX8eaQcINc5Y' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='lazyzebra845');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/women/87.jpg' FROM users WHERE username='lazyzebra845' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='lazyzebra845'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Build music happy book recipe city travel train park recipe.', NULL, 'public' FROM users WHERE username='lazyzebra845' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='lazyzebra845'));

-- User 41: blackpeacock649
INSERT INTO users (username, name, email, password_hash) SELECT 'blackpeacock649', 'Dorle Hinrichs', 'dorle.hinrichs@example.com', 'wripwX-thzRMGrjuWIcC9Q.TlCU1RbZiCwtRKfji31lLl1gDKWzbT3dCbHvuZC7fck' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='blackpeacock649');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/women/22.jpg' FROM users WHERE username='blackpeacock649' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='blackpeacock649'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Work day dream play train city day smile forest movie sunny chill friend day.', NULL, 'public' FROM users WHERE username='blackpeacock649' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='blackpeacock649'));

-- User 42: redbear570
INSERT INTO users (username, name, email, password_hash) SELECT 'redbear570', 'Gordon Hanson', 'gordon.hanson@example.com', '8VoiDJtat2sLqq8BTZSQNQ.4CwrDDhHSpT-AKq1pFnxN_7xg4jF-66mp50AYsMuAoo' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='redbear570');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/men/12.jpg' FROM users WHERE username='redbear570' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='redbear570'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Sunset recipe code cat write home play garden write music cat music happy food.', NULL, 'public' FROM users WHERE username='redbear570' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='redbear570'));

-- User 43: yellowrabbit997
INSERT INTO users (username, name, email, password_hash) SELECT 'yellowrabbit997', 'Josefina Pastor', 'josefina.pastor@example.com', 'nwpxmHIs_14UI1R6DwW08Q.VmyjO-i5ofFzT1ZiqWdYFA-a1GrLdxz0Vea7KONu3j8' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='yellowrabbit997');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/women/64.jpg' FROM users WHERE username='yellowrabbit997' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='yellowrabbit997'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Bicycle book read music sunny laugh share write mountain forest weekend train laugh ocean bicycle coffee.', NULL, 'public' FROM users WHERE username='yellowrabbit997' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='yellowrabbit997'));

-- User 44: yellowpeacock508
INSERT INTO users (username, name, email, password_hash) SELECT 'yellowpeacock508', 'Théo Picard', 'theo.picard@example.com', 'dIKvP5ZT-vd4_9NM0I-HEA.5e8JNcEWPIPQDSxozgLF-YxtF9h59TekalY0VP3r_6U' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='yellowpeacock508');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/men/31.jpg' FROM users WHERE username='yellowpeacock508' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='yellowpeacock508'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Write dinner travel read market dog recipe sunny forest coffee home story coffee day friend.', NULL, 'public' FROM users WHERE username='yellowpeacock508' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='yellowpeacock508'));

-- User 45: orangegoose810
INSERT INTO users (username, name, email, password_hash) SELECT 'orangegoose810', 'Soumyashree Namnaik', 'soumyashree.namnaik@example.com', 'XUdfZWF-N5tKAyhMZp3RIg.rmw6NRr63nQjOcc7GX3CSgQZZItD-TPRJknWBN1jUt0' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='orangegoose810');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/women/38.jpg' FROM users WHERE username='orangegoose810' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='orangegoose810'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Dinner hike code dog ocean coffee day piano park breeze photo weekend code.', NULL, 'public' FROM users WHERE username='orangegoose810' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='orangegoose810'));

-- User 46: bigbird293
INSERT INTO users (username, name, email, password_hash) SELECT 'bigbird293', 'Seamus Elliott', 'seamus.elliott@example.com', 'o9Z1YqEueaT0LllTW1fiyg.r7c1v_JwGmgbSadwkAIyWSeEJd2pZ2QcH_ZuWNPk-70' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='bigbird293');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/men/45.jpg' FROM users WHERE username='bigbird293' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='bigbird293'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Read walk write share coffee photo day music garden walk chill forest city learn breeze bicycle hike.', NULL, 'public' FROM users WHERE username='bigbird293' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='bigbird293'));

-- User 47: happygoose577
INSERT INTO users (username, name, email, password_hash) SELECT 'happygoose577', 'باران سلطانی نژاد', 'brn.sltnynjd@example.com', 'fwLqf7Or5_Jx1TBJH2CKaA.i1vywv7_1rzlqLTB1wNLHuumZrEKPE9mka59sfjZx8c' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='happygoose577');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/women/24.jpg' FROM users WHERE username='happygoose577' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='happygoose577'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Code story lunch train forest coffee walk code garden.', NULL, 'public' FROM users WHERE username='happygoose577' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='happygoose577'));

-- User 48: redmouse975
INSERT INTO users (username, name, email, password_hash) SELECT 'redmouse975', 'Milan Roche', 'milan.roche@example.com', 'exg7JieXe48Fw_ax39wqFw.j2Q2zpPxT7srQjtzadBfq9f7yG0_azSEdu4bj3rkTj4' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='redmouse975');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/men/17.jpg' FROM users WHERE username='redmouse975' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='redmouse975'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Bicycle chill ocean ocean piano coffee read sunny kitchen coffee movie travel.', NULL, 'public' FROM users WHERE username='redmouse975' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='redmouse975'));

-- User 49: yellowmouse260
INSERT INTO users (username, name, email, password_hash) SELECT 'yellowmouse260', 'Nagesh Bansal', 'nagesh.bansal@example.com', 'SPe4d9T7ksONM5fhWqUaDw.R8C8Zxazrtt8FrNUqJMdUp38wZflylbfj7jz8usw_dg' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='yellowmouse260');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/men/93.jpg' FROM users WHERE username='yellowmouse260' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='yellowmouse260'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Movie write chill home travel hike dog bicycle share train dream bicycle sunset movie story lunch.', NULL, 'public' FROM users WHERE username='yellowmouse260' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='yellowmouse260'));

-- User 50: smallgoose517
INSERT INTO users (username, name, email, password_hash) SELECT 'smallgoose517', 'Lauritz Rabben', 'lauritz.rabben@example.com', 'V8uDu0GhpJxtC7B9Oj1XRw.9QJY9IBvqEkXvyxfqsfytGlbuWLlwXtRFSbTtIDvBaY' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='smallgoose517');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/men/96.jpg' FROM users WHERE username='smallgoose517' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='smallgoose517'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Work dog happy dinner chill forest laugh market build home.', NULL, 'public' FROM users WHERE username='smallgoose517' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='smallgoose517'));

-- User 51: tinyleopard220
INSERT INTO users (username, name, email, password_hash) SELECT 'tinyleopard220', 'Malik Patel', 'malik.patel@example.com', 'Bw9kPf_V2h1uS14tsEX1CA.2LkiL2wV8pUIfd-uoRWAu9CZEaipV98CBwKHPg_Jpi4' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='tinyleopard220');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/men/36.jpg' FROM users WHERE username='tinyleopard220' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='tinyleopard220'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Share lunch coffee dinner food kitchen piano garden learn laugh learn day bicycle share book story train.', NULL, 'public' FROM users WHERE username='tinyleopard220' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='tinyleopard220'));

-- User 52: ticklishpanda693
INSERT INTO users (username, name, email, password_hash) SELECT 'ticklishpanda693', 'Lily Taylor', 'lily.taylor@example.com', 'eQwEgJ2ZuMBG3phdyv45bA.wxXG40KOGySfYdsxfbEm2VotIMamlTJLXW1Yzrpq5bA' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='ticklishpanda693');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/women/1.jpg' FROM users WHERE username='ticklishpanda693' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='ticklishpanda693'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Music train hike coffee music learn code forest home day river code dog weekend river travel.', NULL, 'public' FROM users WHERE username='ticklishpanda693' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='ticklishpanda693'));

-- User 53: goldenrabbit541
INSERT INTO users (username, name, email, password_hash) SELECT 'goldenrabbit541', 'Armin Philippe', 'armin.philippe@example.com', 'rsQEDnyv46BVed72CVnfgA.d4gFtBeRShoehSJd4_Brl1i4bp4iVpR8HxPLMt7AnAQ' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='goldenrabbit541');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/men/30.jpg' FROM users WHERE username='goldenrabbit541' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='goldenrabbit541'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Dinner happy code chill weekend build code market kitchen work photo ocean.', NULL, 'public' FROM users WHERE username='goldenrabbit541' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='goldenrabbit541'));

-- User 54: crazybear606
INSERT INTO users (username, name, email, password_hash) SELECT 'crazybear606', 'Vladimir Simonović', 'vladimir.simonovic@example.com', 'ZBlIFxpetpxFGxMnOeSzxQ.3-nhqc0FHfg-yd-SXCg-buRTMTbq3C8023wRR1xQAW0' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='crazybear606');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/men/13.jpg' FROM users WHERE username='crazybear606' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='crazybear606'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Walk chill garden write travel coffee.', NULL, 'public' FROM users WHERE username='crazybear606' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='crazybear606'));

-- User 55: goldenduck352
INSERT INTO users (username, name, email, password_hash) SELECT 'goldenduck352', 'Gerald Long', 'gerald.long@example.com', 'LiPscqcfrTwbzF2mWZnHQw.HvFDGgTijpie8N0WWUATfrYzPyA3d7TIq4L-il68Ue0' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='goldenduck352');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/men/94.jpg' FROM users WHERE username='goldenduck352' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='goldenduck352'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Food laugh sunny sunset happy story dinner home river train learn smile kitchen happy breeze learn.', NULL, 'public' FROM users WHERE username='goldenduck352' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='goldenduck352'));

-- User 56: crazyelephant916
INSERT INTO users (username, name, email, password_hash) SELECT 'crazyelephant916', 'Antonija Novak', 'antonija.novak@example.com', 'cXFBZDfvJCcD8weDFLKqBA.8Jdbub4BUwFTLg-1Za0C7Bd0k84FWHZ6zW70Qd1apXI' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='crazyelephant916');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/women/8.jpg' FROM users WHERE username='crazyelephant916' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='crazyelephant916'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Train park lunch movie forest photo chill book photo story smile code food friend code.', NULL, 'public' FROM users WHERE username='crazyelephant916' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='crazyelephant916'));

-- User 57: silvermeercat238
INSERT INTO users (username, name, email, password_hash) SELECT 'silvermeercat238', 'آراد علیزاده', 'ard.aalyzdh@example.com', 'L8PgoylsSMiLpCysrpttGw.LcFcLExQGTcWvy2DmdYlDBGnbr5vdulmbUGMqTuiLt0' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='silvermeercat238');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/men/74.jpg' FROM users WHERE username='silvermeercat238' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='silvermeercat238'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Sunny dog sunny home mountain garden happy work smile garden cat.', NULL, 'public' FROM users WHERE username='silvermeercat238' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='silvermeercat238'));

-- User 58: ticklishkoala440
INSERT INTO users (username, name, email, password_hash) SELECT 'ticklishkoala440', 'Horiv Gamchenko', 'horiv.gamchenko@example.com', 'vWTgTK6cGPr3A8t3SbaR9g.ugvYR4j1dPPzZkRHG2v5uxwS7hHeHV0juUk0PPBr3hA' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='ticklishkoala440');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/men/19.jpg' FROM users WHERE username='ticklishkoala440' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='ticklishkoala440'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Bicycle piano park hike laugh bicycle dog home sunny build bicycle weekend dream.', NULL, 'public' FROM users WHERE username='ticklishkoala440' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='ticklishkoala440'));

-- User 59: heavymouse751
INSERT INTO users (username, name, email, password_hash) SELECT 'heavymouse751', 'Olivier Patel', 'olivier.patel@example.com', 'NlXEV3pVAz3Ov-9zxuEtMQ.FwUm81-UzLQSvTyRaOKsx_eEc8ZHIO2_TBnldAIe1BM' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='heavymouse751');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/men/48.jpg' FROM users WHERE username='heavymouse751' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='heavymouse751'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Lunch park friend mountain write ocean friend write market coffee.', NULL, 'public' FROM users WHERE username='heavymouse751' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='heavymouse751'));

-- User 60: orangeostrich798
INSERT INTO users (username, name, email, password_hash) SELECT 'orangeostrich798', 'Leanne Lavigne', 'leanne.lavigne@example.com', '9yhaD-bJy6ARlOmd0fLpJA.mDgFZhPF4jbAK3LcWjBdEJ4D5be1I7uKKy_dwaroLAY' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='orangeostrich798');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/women/41.jpg' FROM users WHERE username='orangeostrich798' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='orangeostrich798'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Smile music breeze bicycle breeze write friend happy lunch friend coffee.', NULL, 'public' FROM users WHERE username='orangeostrich798' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='orangeostrich798'));

-- User 61: sadleopard943
INSERT INTO users (username, name, email, password_hash) SELECT 'sadleopard943', 'Philippina Haarhuis', 'philippina.haarhuis@example.com', 'nuPiyvJR766m4juqHWgC9w.y2z0dwT-lbeKvDv_ide8rwTWw2W3IBO0s0wHD_PJRPk' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='sadleopard943');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/women/29.jpg' FROM users WHERE username='sadleopard943' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='sadleopard943'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Mountain dinner garden smile train cat chill weekend chill day.', NULL, 'public' FROM users WHERE username='sadleopard943' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='sadleopard943'));

-- User 62: organicpanda529
INSERT INTO users (username, name, email, password_hash) SELECT 'organicpanda529', 'Ilija Drljača', 'ilija.drljaca@example.com', '4jWSWAv--KQFNJCYn2yA5Q.gcbsY1ywtvnT4ELm8YYkkrjmpYTtRCWizyMb5UdXdQ4' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='organicpanda529');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/men/42.jpg' FROM users WHERE username='organicpanda529' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='organicpanda529'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Travel food travel home build sunny photo lunch kitchen smile movie play day work.', NULL, 'public' FROM users WHERE username='organicpanda529' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='organicpanda529'));

-- User 63: brownmeercat839
INSERT INTO users (username, name, email, password_hash) SELECT 'brownmeercat839', 'Geronimo Smelt', 'geronimo.smelt@example.com', 'uqz2F-t205_jdepRHZhbPQ.j1S2_ZFipYQq9gh-DCd-eTInvLIit3T1cmMVdeZWXcg' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='brownmeercat839');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/men/77.jpg' FROM users WHERE username='brownmeercat839' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='brownmeercat839'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Dinner forest garden forest train train story kitchen ocean sunny.', NULL, 'public' FROM users WHERE username='brownmeercat839' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='brownmeercat839'));

-- User 64: tinyduck871
INSERT INTO users (username, name, email, password_hash) SELECT 'tinyduck871', 'Pramila Kouser', 'pramila.kouser@example.com', 'jYDgVzPHLtI7IMrz9DyruQ.0h0oZVBKxlrOS7D68sg5SRbbtSWbi9GWXXDdl8undn4' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='tinyduck871');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/women/49.jpg' FROM users WHERE username='tinyduck871' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='tinyduck871'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Sunset river dream happy laugh write walk piano hike walk laugh coffee play happy.', NULL, 'public' FROM users WHERE username='tinyduck871' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='tinyduck871'));

-- User 65: silverlion489
INSERT INTO users (username, name, email, password_hash) SELECT 'silverlion489', 'Maia Skjerven', 'maia.skjerven@example.com', 'KBBLM1A6rV3QQPud7Anj3g.OjK1CTqJPjFEOw0nVlzlCsKherxUthD04bUNQKa5Q8Q' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='silverlion489');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/women/69.jpg' FROM users WHERE username='silverlion489' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='silverlion489'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Movie dinner build friend dinner cat friend learn lunch story river kitchen dream.', NULL, 'public' FROM users WHERE username='silverlion489' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='silverlion489'));

-- User 66: orangebear978
INSERT INTO users (username, name, email, password_hash) SELECT 'orangebear978', 'Margarete Colin', 'margarete.colin@example.com', 'ScJxWdmZjSrUktjiBF0Zmw.V-xqKNrOMm5P3fbSN4WCdLj8XtyHr_zVhIalMHKHLMs' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='orangebear978');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/women/38.jpg' FROM users WHERE username='orangebear978' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='orangebear978'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Smile walk write build code food ocean chill.', NULL, 'public' FROM users WHERE username='orangebear978' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='orangebear978'));

-- User 67: greengorilla977
INSERT INTO users (username, name, email, password_hash) SELECT 'greengorilla977', 'Zayan Jain', 'zayan.jain@example.com', 'RgBAcFAUNMlLIHegmXeuuQ.HOLC5XuYbZ1-Ky337LCmTZ87bbgn3leTYxaewJTPh60' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='greengorilla977');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/men/45.jpg' FROM users WHERE username='greengorilla977' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='greengorilla977'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Laugh dog lunch garden food share coffee food forest ocean friend.', NULL, 'public' FROM users WHERE username='greengorilla977' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='greengorilla977'));

-- User 68: crazykoala873
INSERT INTO users (username, name, email, password_hash) SELECT 'crazykoala873', 'Monir Evers', 'monir.evers@example.com', 'okVGuT1WEYuu77OTPRMFag.HwDjlI8MdMjKt-Hz6tbbXraBgKjey8QybWZ1z5Vd8bg' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='crazykoala873');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/men/15.jpg' FROM users WHERE username='crazykoala873' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='crazykoala873'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Ocean build weekend ocean breeze piano recipe friend city food coffee.', NULL, 'public' FROM users WHERE username='crazykoala873' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='crazykoala873'));

-- User 69: happygoose973
INSERT INTO users (username, name, email, password_hash) SELECT 'happygoose973', 'Anna Nielsen', 'anna.nielsen@example.com', 'Y81eWZAfPaKHhsGF5rT95g.kgpqZq7G2OglqnMemo0e4fdAthHZ9t8TaUPRsYN0yNo' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='happygoose973');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/women/56.jpg' FROM users WHERE username='happygoose973' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='happygoose973'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Lunch market city mountain river coffee music home dinner read recipe day river.', NULL, 'public' FROM users WHERE username='happygoose973' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='happygoose973'));

-- User 70: happyfrog983
INSERT INTO users (username, name, email, password_hash) SELECT 'happyfrog983', 'زهرا نجاتی', 'zhr.njty@example.com', 'bZ-xfStdAviiOTFR8Bwusw.zNunEVM1KVHwTMrgiatTtRGLnQKLrpIs0a839DaqN90' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='happyfrog983');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/women/52.jpg' FROM users WHERE username='happyfrog983' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='happyfrog983'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Read river dream recipe build build dog sunny walk.', NULL, 'public' FROM users WHERE username='happyfrog983' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='happyfrog983'));

-- User 71: whitefrog351
INSERT INTO users (username, name, email, password_hash) SELECT 'whitefrog351', 'Balhaar Banerjee', 'balhaar.banerjee@example.com', 'McHG3e6_-Lyxs6mbu9s5vg.T2YS_j9mL_90rwEVNXyjqh5r2RKJKeTe6vO43sDwSzU' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='whitefrog351');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/men/40.jpg' FROM users WHERE username='whitefrog351' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='whitefrog351'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Happy chill sunny home mountain dream breeze city forest work ocean ocean day work day.', NULL, 'public' FROM users WHERE username='whitefrog351' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='whitefrog351'));

-- User 72: brownbutterfly859
INSERT INTO users (username, name, email, password_hash) SELECT 'brownbutterfly859', 'Ieremiy Chemerinskiy', 'ieremiy.chemerinskiy@example.com', 'l6SwWsKEPZsNtFrPOGrd6g.qSDC4ebAT-FxjsK41Z8GhGdJ9atrVMHRkDWrfl3tvoo' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='brownbutterfly859');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/men/51.jpg' FROM users WHERE username='brownbutterfly859' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='brownbutterfly859'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Code hike smile sunset music write train happy read garden food dog walk happy photo laugh garden.', NULL, 'public' FROM users WHERE username='brownbutterfly859' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='brownbutterfly859'));

-- User 73: angrymouse474
INSERT INTO users (username, name, email, password_hash) SELECT 'angrymouse474', 'Nemanja Novak', 'nemanja.novak@example.com', 'b2jGqVeXTtv6uSvEmMPFGw.Ekr0qEWhF15pVsaAB46SyjSSTKhBI3eiBabe3tvKDAg' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='angrymouse474');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/men/52.jpg' FROM users WHERE username='angrymouse474' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='angrymouse474'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Smile share build travel dinner learn walk walk movie laugh food.', NULL, 'public' FROM users WHERE username='angrymouse474' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='angrymouse474'));

-- User 74: beautifulkoala999
INSERT INTO users (username, name, email, password_hash) SELECT 'beautifulkoala999', 'Vladan Vidić', 'vladan.vidic@example.com', 'M82a8AFC5dhtSjbkoRz3cg.J00FFVpR4D8crB6-PCuqtveFJopbJ9fIjm8xIJ4KGTY' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='beautifulkoala999');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/men/75.jpg' FROM users WHERE username='beautifulkoala999' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='beautifulkoala999'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Write write build coffee sunny forest build weekend build share piano piano forest friend park.', NULL, 'public' FROM users WHERE username='beautifulkoala999' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='beautifulkoala999'));

-- User 75: whitecat516
INSERT INTO users (username, name, email, password_hash) SELECT 'whitecat516', 'Carmelo Gauthier', 'carmelo.gauthier@example.com', 'axl60SGjDyeWzLFdQT201A.0zeAAkelMwyKmgXGWXU_2pVDyz3gMg6InlcWF9oM_iM' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='whitecat516');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/men/13.jpg' FROM users WHERE username='whitecat516' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='whitecat516'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Lunch dinner travel lunch travel river garden music garden work sunset dream walk market recipe dog.', NULL, 'public' FROM users WHERE username='whitecat516' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='whitecat516'));

-- User 76: ticklishgorilla782
INSERT INTO users (username, name, email, password_hash) SELECT 'ticklishgorilla782', 'Aladino da Rocha', 'aladino.darocha@example.com', 'nAh_Pwy7-pT9uJvzw82SUQ.4vMpLdanmZ8WkFaiVjYQwX1DnOU1hg6qOI3_f2DXY-Q' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='ticklishgorilla782');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/men/54.jpg' FROM users WHERE username='ticklishgorilla782' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='ticklishgorilla782'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Learn forest smile happy river write build sunny chill kitchen river piano laugh breeze write write.', NULL, 'public' FROM users WHERE username='ticklishgorilla782' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='ticklishgorilla782'));

-- User 77: sadgorilla921
INSERT INTO users (username, name, email, password_hash) SELECT 'sadgorilla921', 'Harold Wheeler', 'harold.wheeler@example.com', 'Y7TsTnf-NcwWby_SvIaHPg.tX-R3Gay-_jgr6b8ND6GVZwwDAfaLRSxgN8s-Cum3ZM' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='sadgorilla921');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/men/83.jpg' FROM users WHERE username='sadgorilla921' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='sadgorilla921'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Photo food train hike photo hike cat coffee travel kitchen city lunch.', NULL, 'public' FROM users WHERE username='sadgorilla921' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='sadgorilla921'));

-- User 78: goldenwolf794
INSERT INTO users (username, name, email, password_hash) SELECT 'goldenwolf794', 'Özkan Erdoğan', 'ozkan.erdogan@example.com', 'GR1ktvshALDmHobd-6vcxw._rX1fkVLOc64b47NdaYBt0dE8YDcfmZUfZN4uiOuR1U' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='goldenwolf794');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/men/62.jpg' FROM users WHERE username='goldenwolf794' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='goldenwolf794'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Hike river laugh coffee music home breeze river forest weekend travel mountain food mountain lunch bicycle.', NULL, 'public' FROM users WHERE username='goldenwolf794' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='goldenwolf794'));

-- User 79: lazygorilla404
INSERT INTO users (username, name, email, password_hash) SELECT 'lazygorilla404', 'Edgar Holmes', 'edgar.holmes@example.com', 'OK7F8B2vfwHbubkAkq6-kQ.B2SiLE76Gju92JaLoP62ukebG5tdlMr8bEarTv5FSl0' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='lazygorilla404');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/men/96.jpg' FROM users WHERE username='lazygorilla404' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='lazygorilla404'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'City happy bicycle piano chill build travel laugh dream walk.', NULL, 'public' FROM users WHERE username='lazygorilla404' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='lazygorilla404'));

-- User 80: organictiger886
INSERT INTO users (username, name, email, password_hash) SELECT 'organictiger886', 'طاها مرادی', 'th.mrdy@example.com', 'Yq5kECp9cDLIn-nTzAujNg.9h8b1PqKx6dT1ViY_M0zJLyjDwsLO7u3ue3m5eF_VRI' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='organictiger886');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/men/43.jpg' FROM users WHERE username='organictiger886' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='organictiger886'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Dog dream train movie share walk river forest laugh.', NULL, 'public' FROM users WHERE username='organictiger886' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='organictiger886'));

-- User 81: tinybird955
INSERT INTO users (username, name, email, password_hash) SELECT 'tinybird955', 'Noah Rousseau', 'noah.rousseau@example.com', 'ab39F4hAFDPIwsDnqkLLSQ.AB8qY43Zf_86WBIo65q0ZD_MgDkfY6ckLQtGnMnBDxs' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='tinybird955');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/men/22.jpg' FROM users WHERE username='tinybird955' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='tinybird955'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Mountain share hike read recipe story smile food garden hike breeze coffee bicycle.', NULL, 'public' FROM users WHERE username='tinybird955' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='tinybird955'));

-- User 82: orangeladybug659
INSERT INTO users (username, name, email, password_hash) SELECT 'orangeladybug659', 'Evelyn Johnson', 'evelyn.johnson@example.com', 'GVIOMOp2r_uy9j8rjC8i0g.I_NXlQDM-Ry2HqGLlawnm-EKBCnjCTDTbCHUAILKjU0' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='orangeladybug659');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/women/79.jpg' FROM users WHERE username='orangeladybug659' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='orangeladybug659'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Sunny smile lunch happy recipe read.', NULL, 'public' FROM users WHERE username='orangeladybug659' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='orangeladybug659'));

-- User 83: whitefish787
INSERT INTO users (username, name, email, password_hash) SELECT 'whitefish787', 'Mary Ray', 'mary.ray@example.com', 'uGUHzr-smLvkFDFLcK-lcA.uSF3DNvlNs60VG80v_qKCDUTTMv_ecgEFZKuqIwwm2w' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='whitefish787');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/women/57.jpg' FROM users WHERE username='whitefish787' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='whitefish787'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Bicycle bicycle read learn work play play friend share photo build hike.', NULL, 'public' FROM users WHERE username='whitefish787' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='whitefish787'));

-- User 84: heavybird565
INSERT INTO users (username, name, email, password_hash) SELECT 'heavybird565', 'Isabella Williams', 'isabella.williams@example.com', 'cz9CT9rBh59LHOGkIayvLg.9nMyrsXqMpdG_ES2IU9QfzR8H6l6tjvg59JlSkBInEw' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='heavybird565');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/women/19.jpg' FROM users WHERE username='heavybird565' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='heavybird565'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'River mountain breeze build music smile laugh piano piano share dog.', NULL, 'public' FROM users WHERE username='heavybird565' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='heavybird565'));

-- User 85: whitemouse329
INSERT INTO users (username, name, email, password_hash) SELECT 'whitemouse329', 'Emma Seppanen', 'emma.seppanen@example.com', 'KBGovSwYCfriN6ubZ8LEVg.Q1dY5xHD6anUQ78tLH6BO9G7JT7PGGTrgiBY53mVR5Q' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='whitemouse329');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/women/61.jpg' FROM users WHERE username='whitemouse329' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='whitemouse329'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Breeze food piano breeze build learn garden lunch work sunset mountain smile mountain breeze friend movie river.', NULL, 'public' FROM users WHERE username='whitemouse329' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='whitemouse329'));

-- User 86: crazysnake443
INSERT INTO users (username, name, email, password_hash) SELECT 'crazysnake443', 'Viktorija Kitić', 'viktorija.kitic@example.com', 'c1mxuQs_lKna_lYBuZtKRg.U2GQVQrl-9q-yiiZjH_id1I7Y9-4S0YxtaHaE_STdc4' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='crazysnake443');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/women/46.jpg' FROM users WHERE username='crazysnake443' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='crazysnake443'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Music mountain smile forest build kitchen lunch build work dog.', NULL, 'public' FROM users WHERE username='crazysnake443' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='crazysnake443'));

-- User 87: bluecat626
INSERT INTO users (username, name, email, password_hash) SELECT 'bluecat626', 'Tava Dmitrichenko', 'tava.dmitrichenko@example.com', 'CBa7Gc0VGw2LSuVE_ib5Eg.MI07wWS7UTJIzCaASmIWLWD4LYoAiaMRAqUmTJw1CaQ' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='bluecat626');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/women/30.jpg' FROM users WHERE username='bluecat626' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='bluecat626'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Play work bicycle forest market piano hike ocean work day coffee train laugh build coffee cat happy.', NULL, 'public' FROM users WHERE username='bluecat626' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='bluecat626'));

-- User 88: whitecat478
INSERT INTO users (username, name, email, password_hash) SELECT 'whitecat478', 'Meghana Shenoy', 'meghana.shenoy@example.com', 'rDJEwqglKNHKyJROcTjTGg.dd-1JwRsTY3n4Evm5TEgbIGTbgS7nzmcp-Fr_FNDLdA' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='whitecat478');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/women/83.jpg' FROM users WHERE username='whitecat478' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='whitecat478'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Forest photo smile city market garden friend sunset coffee sunset lunch dog day river movie river play.', NULL, 'public' FROM users WHERE username='whitecat478' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='whitecat478'));

-- User 89: angrygorilla178
INSERT INTO users (username, name, email, password_hash) SELECT 'angrygorilla178', 'Neila Martins', 'neila.martins@example.com', 'zQyqsnr44rLqo-aed2QE-A.Sxmwv12gvJeEhVoyPozDR20qclbkuJNR6SS4fxx-_Jw' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='angrygorilla178');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/women/7.jpg' FROM users WHERE username='angrygorilla178' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='angrygorilla178'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'River home movie day walk smile kitchen home forest home.', NULL, 'public' FROM users WHERE username='angrygorilla178' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='angrygorilla178'));

-- User 90: purpleleopard714
INSERT INTO users (username, name, email, password_hash) SELECT 'purpleleopard714', 'Benjamin Wang', 'benjamin.wang@example.com', 'qKdW-Vd3lk1zNp4JK2RaAg.HF_LMs3bX1LnYdGTNncrY8Q5P38Jwrut2xwy-jIQvQU' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='purpleleopard714');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/men/90.jpg' FROM users WHERE username='purpleleopard714' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='purpleleopard714'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Dog dinner river garden music travel dinner market forest laugh garden hike share kitchen breeze.', NULL, 'public' FROM users WHERE username='purpleleopard714' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='purpleleopard714'));

-- User 91: angryfish104
INSERT INTO users (username, name, email, password_hash) SELECT 'angryfish104', 'George Williams', 'george.williams@example.com', '6P2rP9hEwB0Uw8_62s3mIA.AQmGzFVGNWKszaXnSqwK5v41mZSqvdXDCBOpDfI8c5M' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='angryfish104');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/men/44.jpg' FROM users WHERE username='angryfish104' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='angryfish104'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Smile read park code play sunset write code.', NULL, 'public' FROM users WHERE username='angryfish104' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='angryfish104'));

-- User 92: crazydog350
INSERT INTO users (username, name, email, password_hash) SELECT 'crazydog350', 'Nathan Gulpen', 'nathan.gulpen@example.com', '3ngfF98rSWpSPGz7mu_OmA.xAQE9Slm-QVc4kH6R_RliOZ3ZVborFYROElGTuDC_nw' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='crazydog350');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/men/41.jpg' FROM users WHERE username='crazydog350' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='crazydog350'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Park coffee garden dinner sunny work river lunch movie hike read friend coffee dog laugh market.', NULL, 'public' FROM users WHERE username='crazydog350' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='crazydog350'));

-- User 93: blueostrich647
INSERT INTO users (username, name, email, password_hash) SELECT 'blueostrich647', 'Jamie West', 'jamie.west@example.com', 'oJTBsz69q_oComkbRO0j4Q.kItGxxiVr15GcWhVtCrtp0QhfeTMukxhND6g2FN8liU' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='blueostrich647');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/men/8.jpg' FROM users WHERE username='blueostrich647' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='blueostrich647'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Friend hike hike dream river city market story play forest code bicycle share.', NULL, 'public' FROM users WHERE username='blueostrich647' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='blueostrich647'));

-- User 94: redleopard522
INSERT INTO users (username, name, email, password_hash) SELECT 'redleopard522', 'Sheryl Roberts', 'sheryl.roberts@example.com', 'WZCKjX1vDdJ03mVWtW5NWw.iFc-sG_xw13GKEH3iAoXhp21gbpkAtPSaHhl113T0oo' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='redleopard522');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/women/28.jpg' FROM users WHERE username='redleopard522' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='redleopard522'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Kitchen hike lunch dog forest breeze coffee forest music dinner day sunny.', NULL, 'public' FROM users WHERE username='redleopard522' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='redleopard522'));

-- User 95: orangeswan142
INSERT INTO users (username, name, email, password_hash) SELECT 'orangeswan142', 'Tobias Mortensen', 'tobias.mortensen@example.com', 'jJTWP8h8CEPT5g_jF889CA.yoHU6rAJkjEtCQHtW-TJmGwUPOihKBtWogSx27v6-Xs' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='orangeswan142');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/men/23.jpg' FROM users WHERE username='orangeswan142' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='orangeswan142'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Photo cat sunny park city river mountain.', NULL, 'public' FROM users WHERE username='orangeswan142' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='orangeswan142'));

-- User 96: bluepeacock740
INSERT INTO users (username, name, email, password_hash) SELECT 'bluepeacock740', 'Emilie Ennis', 'emilie.ennis@example.com', 'iBhqEfDuDPrDU360HcQX1w.0BFlB14UqPfJmRtq-Po05W9skJ8yD9j1AzreQ_u97Og' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='bluepeacock740');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/women/72.jpg' FROM users WHERE username='bluepeacock740' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='bluepeacock740'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Friend code book sunny work breeze learn travel hike share kitchen.', NULL, 'public' FROM users WHERE username='bluepeacock740' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='bluepeacock740'));

-- User 97: angryelephant222
INSERT INTO users (username, name, email, password_hash) SELECT 'angryelephant222', 'Clarence Reynolds', 'clarence.reynolds@example.com', 'f9fSqxj-m_EXfY1oRqonNg.JIab5sTaNH_Wi256qFdJsv3FapSyIy-FuIeVcjXWIyY' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='angryelephant222');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/men/7.jpg' FROM users WHERE username='angryelephant222' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='angryelephant222'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Cat happy bicycle park code play weekend chill sunny day learn travel story river.', NULL, 'public' FROM users WHERE username='angryelephant222' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='angryelephant222'));

-- User 98: greenbird386
INSERT INTO users (username, name, email, password_hash) SELECT 'greenbird386', 'Anastasia Charles', 'anastasia.charles@example.com', 'btnhXxuHYBfJ-00h8jtguA.b1X1e-k2agMHl4-jtwzt3_Z7Aq44FZWYVLLaeC7eHxI' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='greenbird386');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/women/15.jpg' FROM users WHERE username='greenbird386' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='greenbird386'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Market train book read play dog.', NULL, 'public' FROM users WHERE username='greenbird386' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='greenbird386'));

-- User 99: orangeleopard658
INSERT INTO users (username, name, email, password_hash) SELECT 'orangeleopard658', 'Mustafa Koyuncu', 'mustafa.koyuncu@example.com', '8I_4ywZ4pLnbUNoTg0tjEA._CKVwswmTDIiwqQiJc2YW6jzmbS9-UsaXKTEM5VO9Uc' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='orangeleopard658');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/men/48.jpg' FROM users WHERE username='orangeleopard658' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='orangeleopard658'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Walk recipe play garden dream learn coffee coffee garden write code sunny piano.', NULL, 'public' FROM users WHERE username='orangeleopard658' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='orangeleopard658'));

-- User 100: sadrabbit552
INSERT INTO users (username, name, email, password_hash) SELECT 'sadrabbit552', 'August Kara', 'august.kara@example.com', '1l1nBH3LlcUH7Jmdq2TyPg.Bv7Jr03gL7n9ZmixJRYM426uAhvqKWkM8Fyd29sod2E' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='sadrabbit552');
INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, 'Hello! This is a seeded user for testing.', 'https://randomuser.me/api/portraits/men/28.jpg' FROM users WHERE username='sadrabbit552' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='sadrabbit552'));
INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, 'Forest sunset day write train garden dog dog story cat music kitchen train park food chill.', NULL, 'public' FROM users WHERE username='sadrabbit552' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='sadrabbit552'));

COMMIT;