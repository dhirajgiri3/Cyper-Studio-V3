// Static server for dist/ that behaves like a CDN: Brotli/gzip from precompressed files, immutable asset caching, HTTP/1.1 keep-alive.
// usage: node serve.mjs [dir=dist] [port=4173]
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path';
const dir = path.resolve(process.argv[2] || 'dist'); const port = +(process.argv[3] || 4173);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.mp4': 'video/mp4', '.webm': 'video/webm', '.json': 'application/json', '.png': 'image/png' };
http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname); if (p === '/') p = '/index.html';
  const f = path.join(dir, p); if (!f.startsWith(dir) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end('not found'); }
  const ext = path.extname(f); const ae = req.headers['accept-encoding'] || ''; const h = { 'content-type': types[ext] || 'application/octet-stream', 'cache-control': ext === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable', vary: 'Accept-Encoding' };
  let file = f;
  if (/\.(html|css|js|svg)$/.test(ext)) { if (/\bbr\b/.test(ae) && fs.existsSync(f + '.br')) { file = f + '.br'; h['content-encoding'] = 'br'; } else if (/gzip/.test(ae) && fs.existsSync(f + '.gz')) { file = f + '.gz'; h['content-encoding'] = 'gzip'; } }
  const st = fs.statSync(file); h['content-length'] = st.size;
  if (ext === '.mp4' || ext === '.webm') { // range support for video
    const r = req.headers.range; if (r) { const m = /bytes=(\d+)-(\d*)/.exec(r); const s = +m[1], e = m[2] ? +m[2] : st.size - 1; res.writeHead(206, { ...h, 'content-range': `bytes ${s}-${e}/${st.size}`, 'content-length': e - s + 1, 'accept-ranges': 'bytes' }); return fs.createReadStream(file, { start: s, end: e }).pipe(res); }
    h['accept-ranges'] = 'bytes';
  }
  res.writeHead(200, h); fs.createReadStream(file).pipe(res);
}).listen(port, '127.0.0.1', () => console.log(`serving ${dir} on http://127.0.0.1:${port}`));
