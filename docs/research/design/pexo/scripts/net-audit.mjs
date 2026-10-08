// Pexo: network + asset audit. Observation only: loads / at 1440x900, no clicks that send data.
// Writes net-audit.out.json next to this script. Usage: node net-audit.mjs
import { chromium } from '/Users/dhirajgiri/Documents/Projects/Cyper studio/design-system/home-lab/tools/node_modules/playwright-core/index.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const here = path.dirname(fileURLToPath(import.meta.url));
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' });
const page = await ctx.newPage();
const cdp = await ctx.newCDPSession(page);
await cdp.send('Network.enable');
const reqs = new Map();
let phase = 'load';
cdp.on('Network.requestWillBeSent', e => reqs.set(e.requestId, { url: e.request.url, type: e.type, initiator: e.initiator?.type, phase, range: e.request.headers['Range'] || e.request.headers['range'] || null }));
cdp.on('Network.responseReceived', e => { const r = reqs.get(e.requestId); if (!r) return; r.status = e.response.status; r.mime = e.response.mimeType; r.cl = e.response.headers['content-length'] || e.response.headers['Content-Length'] || null; r.cr = e.response.headers['content-range'] || null; r.cache = e.response.headers['cache-control'] || null; r.ce = e.response.headers['content-encoding'] || null; });
cdp.on('Network.loadingFinished', e => { const r = reqs.get(e.requestId); if (r) r.bytes = e.encodedDataLength; });

await page.goto('https://pexo.ai/', { waitUntil: 'load', timeout: 60000 });
await sleep(4500);
const snapshot = () => [...reqs.values()].map(r => ({ ...r }));
const atTop = snapshot();

// element-level inventory for first two screens (0..1800 css px) and the "kinds of video" section
const inv = await page.evaluate(() => {
  const out = [];
  const vis = el => { const r = el.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y + scrollY), w: Math.round(r.width), h: Math.round(r.height) }; };
  document.querySelectorAll('img, video, svg, canvas, picture source').forEach(el => {
    const b = vis(el);
    if (b.w === 0 && b.h === 0) return;
    const o = { tag: el.tagName.toLowerCase(), ...b };
    if (el.tagName === 'IMG') { o.src = el.currentSrc || el.src; o.natural = [el.naturalWidth, el.naturalHeight]; o.loading = el.loading; o.fetchpriority = el.getAttribute('fetchpriority'); o.decoding = el.decoding; o.alt = (el.alt || '').slice(0, 30); o.srcset = !!el.srcset; }
    if (el.tagName === 'VIDEO') { o.src = (el.currentSrc || el.getAttribute('src') || '').slice(0, 90); o.poster = el.getAttribute('poster'); o.preload = el.preload; o.autoplay = el.autoplay; o.muted = el.muted; o.loop = el.loop; o.paused = el.paused; o.readyState = el.readyState; o.vw = el.videoWidth; o.vh = el.videoHeight; o.dur = +el.duration.toFixed ? +el.duration.toFixed(2) : null; o.label = el.getAttribute('aria-label'); }
    if (el.tagName === 'svg') { o.cls = (el.getAttribute('class') || '').slice(0, 40); }
    out.push(o);
  });
  return out;
});

// step scroll to trigger deeper sections (native wheel, modest)
phase = 'scroll';
for (let y = 0; y < 3600; y += 450) { await page.mouse.wheel(0, 450); await sleep(450); }
await sleep(2500);
const afterScroll = snapshot();
const inv2 = await page.evaluate(() => {
  const out = [];
  document.querySelectorAll('img, video').forEach(el => {
    const r = el.getBoundingClientRect(); const y = Math.round(r.y + scrollY);
    if (y < 1700 || y > 3800) return;
    const o = { tag: el.tagName.toLowerCase(), y, w: Math.round(r.width), h: Math.round(r.height) };
    if (el.tagName === 'IMG') { o.src = el.currentSrc || el.src; o.natural = [el.naturalWidth, el.naturalHeight]; o.loading = el.loading; o.fetchpriority = el.getAttribute('fetchpriority'); }
    else { o.src = (el.currentSrc || '').slice(0, 90); o.poster = el.getAttribute('poster'); o.preload = el.preload; o.autoplay = el.autoplay; o.readyState = el.readyState; o.label = el.getAttribute('aria-label'); }
    out.push(o);
  });
  return out;
});
fs.writeFileSync(path.join(here, 'net-audit.out.json'), JSON.stringify({ atTop, afterScroll, inv, inv2 }, null, 1));
console.log('requests at top', atTop.length, 'after scroll', afterScroll.length);
await browser.close();
