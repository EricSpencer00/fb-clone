#!/usr/bin/env node
// scripts/seed_100_users_posts.cjs
// CommonJS version for repositories using "type": "module"

const https = require('https');
const crypto = require('crypto');
const fs = require('fs');

const RESULTS = 100;
const OUTFILE = 'migrations/004_seed_100_users_posts.sql';

function base64url(buf) {
  return buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function makePasswordHash(password) {
  const salt = crypto.randomBytes(16);
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha256');
  return `${base64url(salt)}.${base64url(hash)}`;
}

function sqlEscape(s) {
  if (s == null) return '';
  return s.replace(/'/g, "''");
}

function randomPostText() {
  const words = [
    'sunny','river','coffee','mountain','walk','friend','garden','book','code','music','happy','day','breeze','city','home','kitchen','piano','travel','dinner','movie','garden','forest','ocean','coffee','cat','dog','photo','story','weekend','forest','bicycle','market','park','lunch','train','sunset','hike','chill','work','play','food','recipe','dream','build','learn','share','smile','laugh','read','write'
  ];
  const len = 6 + Math.floor(Math.random() * 12); // 6-17 words
  let out = [];
  for (let i = 0; i < len; i++) {
    out.push(words[Math.floor(Math.random() * words.length)]);
  }
  // Capitalize first and add a period.
  let text = out.join(' ');
  text = text.charAt(0).toUpperCase() + text.slice(1) + '.';
  return text;
}

function fetchRandomUsers(n) {
  return new Promise((resolve, reject) => {
    const url = `https://randomuser.me/api/?results=${n}&inc=name,login,email,picture&noinfo`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve(parsed.results || []);
        } catch (e) { reject(e); }
      });
    }).on('error', (e) => reject(e));
  });
}

async function main() {
  console.log(`Fetching ${RESULTS} random users from randomuser.me...`);
  let users;
  try {
    users = await fetchRandomUsers(RESULTS);
  } catch (e) {
    console.error('Failed to fetch random users:', e);
    process.exit(1);
  }

  const sqlParts = [];
  sqlParts.push('-- Migration: seed 100 fake users and one post each');
  sqlParts.push('-- This file is idempotent: it uses SELECT/WHERE NOT EXISTS guards');
  sqlParts.push('\nBEGIN TRANSACTION;');

  for (let i = 0; i < users.length; i++) {
    const u = users[i];
    // Build sensible username/email/name
    const login = u.login && u.login.username ? u.login.username : `user${Date.now()}${i}`;
    // Ensure username sanitized
    const username = sqlEscape(login.toLowerCase().replace(/[^a-z0-9_\-]/g, '').slice(0, 32) || `user${i}`);
    const name = sqlEscape(`${u.name.first} ${u.name.last}`);
    const email = sqlEscape(u.email || `${username}@example.com`);
    const profilePhoto = sqlEscape(u.picture && u.picture.large ? u.picture.large : `https://i.pravatar.cc/300?img=${(i%70)+1}`);
    // Use a default password for seeded users - 'password123'
    const passwordHash = makePasswordHash('password123');
    const bio = sqlEscape('Hello! This is a seeded user for testing.');
    const content = sqlEscape(randomPostText());

    // Insert user if not exists
    sqlParts.push(`-- User ${i+1}: ${username}`);
    sqlParts.push(`INSERT INTO users (username, name, email, password_hash) SELECT '${username}', '${name}', '${email}', '${passwordHash}' WHERE NOT EXISTS (SELECT 1 FROM users WHERE username='${username}');`);

    // Insert profile
    sqlParts.push(`INSERT INTO profiles (user_id, bio, profile_photo) SELECT id, '${bio}', '${profilePhoto}' FROM users WHERE username='${username}' AND NOT EXISTS (SELECT 1 FROM profiles WHERE user_id = (SELECT id FROM users WHERE username='${username}'));`);

    // Insert a post for the user (one post per user)
    sqlParts.push(`INSERT INTO posts (user_id, content, media_url, privacy_setting) SELECT id, '${content}', NULL, 'public' FROM users WHERE username='${username}' AND NOT EXISTS (SELECT 1 FROM posts WHERE user_id = (SELECT id FROM users WHERE username='${username}'));
`);
  }

  sqlParts.push('COMMIT;');

  // Write migrations directory and file
  fs.mkdirSync('migrations', { recursive: true });
  fs.writeFileSync(OUTFILE, sqlParts.join('\n'));
  console.log(`Wrote ${OUTFILE} with ${users.length} users.`);
  console.log("Note: profile_photo fields contain URLs (links only). Don't store image binaries.");
}

main();
