export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const { pathname } = url;
    // Simple routing
    if (pathname === '/api/ads' && request.method === 'GET') {
      return getRandomAd(env);
    }
    if (pathname.startsWith('/api/ads/impression/') && request.method === 'POST') {
      const id = pathname.split('/').pop();
      return recordMetric(env, id, 'impression');
    }
    if (pathname.startsWith('/api/ads/click/') && request.method === 'POST') {
      const id = pathname.split('/').pop();
      return recordMetric(env, id, 'click');
    }
    if (pathname === '/api/admin/seed' && request.method === 'POST') {
      return seedIfEmpty(env);
    }
    // Fallback: serve static assets (handled automatically when assets binding present)
    return new Response('Not found', { status: 404 });
  }
};

async function getRandomAd(env) {
  // Random ad selection
  const stmt = env.DB.prepare('SELECT id, title, image_url, target_url FROM ads ORDER BY RANDOM() LIMIT 1');
  const result = await stmt.first();
  if (!result) {
    return json({ error: 'No ads available' }, 404);
  }
  return json({ ad: result });
}

async function recordMetric(env, id, kind) {
  if (!/^[0-9]+$/.test(id)) return json({ error: 'Invalid id' }, 400);
  const column = kind === 'click' ? 'click_count' : 'impression_count';
  const update = env.DB.prepare(`UPDATE ads SET ${column} = ${column} + 1 WHERE id = ?`).bind(Number(id));
  await update.run();
  const stmt = env.DB.prepare('SELECT id, title, image_url, target_url, impression_count, click_count FROM ads WHERE id = ?').bind(Number(id));
  const row = await stmt.first();
  return json({ updated: row });
}

async function seedIfEmpty(env) {
  const countStmt = env.DB.prepare('SELECT COUNT(*) as c FROM ads');
  const { c } = await countStmt.first();
  if (c > 0) return json({ seeded: false, count: c });
  const insert = env.DB.prepare('INSERT INTO ads (title, image_url, target_url) VALUES (?, ?, ?)');
  await insert.bind('Seed Ad A', 'https://placehold.co/320x100?text=Seed+A', 'https://example.com/a').run();
  await insert.bind('Seed Ad B', 'https://placehold.co/320x100?text=Seed+B', 'https://example.com/b').run();
  return json({ seeded: true });
}

function json(obj, status = 200, headers = {}) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', ...headers }
  });
}
