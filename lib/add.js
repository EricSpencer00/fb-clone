import fs from 'fs/promises';
import path from 'path';

function sanitizeName(n) {
  return n.replace(/[^a-z0-9._-]/gi, '-').replace(/-+/g, '-').replace(/(^-|-$)/g, '').toLowerCase();
}

async function fetchBuffer(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  const buffer = await res.arrayBuffer();
  const contentType = res.headers.get('content-type') || '';
  return { buffer: Buffer.from(buffer), contentType };
}

export async function addFromUrl(url, options = {}) {
  const { name: overrideName } = options;
  try {
    const u = new URL(url);
    const parts = u.pathname.split('/').filter(Boolean);
    let base = parts.length ? parts[parts.length - 1] : u.hostname;
    if (!base) base = 'component';
    base = base.replace(/\.(html|js|json|css|jsx|tsx)$/i, '');

    const name = sanitizeName(overrideName || base || u.hostname);
    const rootDir = process.cwd();
    const componentsDir = path.join(rootDir, 'components');
    await fs.mkdir(componentsDir, { recursive: true });
    const targetDir = path.join(componentsDir, name);
    let finalDir = targetDir;
    let idx = 1;
    while (true) {
      const stat = await fs.stat(finalDir).catch(() => null);
      if (!stat) break;
      finalDir = targetDir + '-' + idx;
      idx++;
    }
    await fs.mkdir(finalDir, { recursive: true });

    const { buffer, contentType } = await fetchBuffer(url);

    let filename = 'component.bin';
    if (/html/.test(contentType) || /\.html?$/.test(url)) filename = 'index.html';
    else if (/javascript/.test(contentType) || /\.jsx?$/.test(url)) filename = 'index.js';
    else if (/css/.test(contentType) || /\.css$/.test(url)) filename = 'styles.css';
    else if (/json/.test(contentType) || /\.json$/.test(url)) filename = 'data.json';

    const filePath = path.join(finalDir, filename);
    await fs.writeFile(filePath, buffer);

    const meta = {
      source: url,
      savedAt: new Date().toISOString(),
      filename,
      contentType
    };
    await fs.writeFile(path.join(finalDir, 'component.json'), JSON.stringify(meta, null, 2));

    // If the downloaded content is JSON and includes embedded files, write them into the project
    try {
      if (/json/.test(contentType)) {
        const txt = buffer.toString('utf8');
        const parsed = JSON.parse(txt);
        if (parsed && Array.isArray(parsed.files)) {
          const written = [];
          for (const f of parsed.files) {
            if (!f || !f.path) continue;
            const rel = f.path.replace(/^\//, '');
            const outPath = path.join(process.cwd(), rel);
            const outDir = path.dirname(outPath);
            await fs.mkdir(outDir, { recursive: true });
            await fs.writeFile(outPath, f.content, 'utf8');
            written.push(rel);
          }
          meta.writtenFiles = written;
          await fs.writeFile(path.join(finalDir, 'component.json'), JSON.stringify(meta, null, 2));
        }
      }
    } catch (e) {
      console.error('Warning: failed to extract embedded files:', e?.message || e);
    }

    return finalDir;
  } catch (err) {
    throw err;
  }
}

export default { addFromUrl };
