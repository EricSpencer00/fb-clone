const crypto = require('crypto');
const fs = require('fs');
const pwd = process.argv[2];
if (!pwd) {
  console.error('Usage: node scripts/seed_test_user.js <password>');
  process.exit(1);
}
const salt = crypto.randomBytes(16);
const hash = crypto.pbkdf2Sync(pwd, salt, 100000, 32, 'sha256');
const b64url = (b) => b.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const stored = b64url(salt) + '.' + b64url(hash);
const sql = `INSERT INTO users (username,name,email,password_hash) SELECT 'test','Test User','test@example.com','${stored}' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='test');\nINSERT INTO profiles (user_id,bio) SELECT id,'Test account (seeded)' FROM users WHERE username='test' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='test'));\n`;
fs.mkdirSync('migrations', { recursive: true });
fs.writeFileSync('migrations/003_seed_test_user.sql', sql);
console.log('Wrote migrations/003_seed_test_user.sql');
