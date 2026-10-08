// clay.com observation script 2: hover/focus diffs, header behaviour, wheel/scroll smoothing, scroll-linked sampling,
// marquee velocity, use-case pill autoplay, first-load byte snapshot. No form submission, no logins.
import { createRequire } from 'node:module';
import fs from 'node:fs';
const require = createRequire(import.meta.url);
const { chromium } = require('../../../../../design-system/home-lab/tools/node_modules/playwright-core');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const out = process.argv[2] || 'clay-s2.json';
const shots = process.argv[3] || '.';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox', '--disable-blink-features=AutomationControlled'] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' });
const page = await ctx.newPage();
const cdp = await ctx.newCDPSession(page);
await cdp.send('Network.enable');
const reqs = new Map();
cdp.on('Network.requestWillBeSent', e => reqs.set(e.requestId, { url: e.request.url, type: e.type }));
cdp.on('Network.responseReceived', e => { const r = reqs.get(e.requestId); if (r) { r.mime = e.response.mimeType; r.status = e.response.status; } });
cdp.on('Network.loadingFinished', e => { const r = reqs.get(e.requestId); if (r) r.bytes = e.encodedDataLength; });
await page.goto('https://www.clay.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
await page.waitForLoadState('load', { timeout: 40000 }).catch(() => {});
await sleep(4000);
const res = {};
const snap = () => { const byUrl = {}; for (const r of reqs.values()) { if (r.bytes == null) continue; const k = r.url.split('?')[0]; const e = (byUrl[k] ||= { type: r.type, mime: r.mime, bytes: 0, n: 0 }); e.bytes += r.bytes; e.n++; } return byUrl; };
const firstLoad = snap();
res.firstLoadTop = Object.entries(firstLoad).sort((a, b) => b[1].bytes - a[1].bytes).slice(0, 22).map(([u, v]) => ({ u: u.slice(0, 120), ...v }));
const sumBy = f => Object.values(firstLoad).filter(f).reduce((a, v) => a + v.bytes, 0);
res.firstLoadSums = { image: sumBy(v => v.type === 'Image'), media: sumBy(v => v.type === 'Media'), font: sumBy(v => v.type === 'Font'), script: sumBy(v => v.type === 'Script'), css: sumBy(v => v.type === 'Stylesheet'), nImage: Object.values(firstLoad).filter(v => v.type === 'Image').length };

// ---- generic hover diff helper (runs in page)
const PROPS = ['backgroundColor', 'color', 'transform', 'boxShadow', 'borderColor', 'opacity', 'filter', 'textDecorationLine', 'outlineStyle', 'width', 'scale', 'translate', 'borderRadius'];
const DIFF_FN = ({ sel, text, yMin, yMax, scrollTo }) => {
  const cands = [...document.querySelectorAll(sel || 'a,button,div,span')].filter(e => { if (text && !(e.innerText || '').trim().startsWith(text)) return false; return true; });
  return cands.length;
};
async function findByText(text, yMin, yMax, tagSel = 'a,button,[role=tab],div') {
  return page.evaluateHandle(({ text, yMin, yMax, tagSel }) => {
    const list = [...document.querySelectorAll(tagSel)].filter(e => { const t = (e.innerText || '').replace(/\s+/g, ' ').trim(); if (t !== text) return false; const r = e.getBoundingClientRect(); return r.width > 20 && r.height > 14 && r.top >= yMin && r.top <= yMax && r.left >= 0 && r.left < innerWidth; });
    list.sort((a, b) => (a.children.length - b.children.length) || (a.getBoundingClientRect().width * a.getBoundingClientRect().height) - (b.getBoundingClientRect().width * b.getBoundingClientRect().height));
    return list[0] || null;
  }, { text, yMin, yMax, tagSel });
}
async function hoverDiff(label, handle) {
  const el = handle.asElement(); if (!el) return { label, error: 'not found' };
  const read = () => el.evaluate((e, PROPS) => { const f = n => { const s = getComputedStyle(n); const o = {}; for (const p of PROPS) o[p] = s[p]; o.transition = s.transition.slice(0, 220); o.cursor = s.cursor; return o; }; const kids = [...e.querySelectorAll('*')].slice(0, 6).map(k => ({ tag: k.tagName.toLowerCase(), cls: (k.getAttribute('class') || '').slice(0, 40), ...f(k) })); const r = e.getBoundingClientRect(); return { self: f(e), kids, rect: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)], cls: (e.getAttribute('class') || '').slice(0, 60), tag: e.tagName.toLowerCase() }; }, PROPS);
  await page.mouse.move(5, 450); await sleep(500);
  const before = await read();
  const r = before.rect; await page.mouse.move(r[0] + r[2] / 2, r[1] + r[3] / 2, { steps: 6 }); await sleep(900);
  const after = await read();
  const diff = (a, b) => { const d = {}; for (const k of Object.keys(a)) if (k !== 'transition' && a[k] !== b[k]) d[k] = [a[k], b[k]]; return d; };
  const kidDiffs = before.kids.map((k, i) => ({ tag: k.tag, cls: k.cls, d: diff(k, after.kids[i] || {}) })).filter(x => Object.keys(x.d).length);
  return { label, tag: before.tag, cls: before.cls, rect: before.rect, transition: before.self.transition, cursor: before.self.cursor, selfDiff: diff(before.self, after.self), kidDiffs: kidDiffs.slice(0, 4), kidTransitions: [...new Set(before.kids.map(k => k.transition).filter(t => t && !/^all 0s ease 0s$/.test(t)))].slice(0, 3) };
}
res.hover = [];
res.hover.push(await hoverDiff('hero CTA Start free trial (white)', await findByText('Start free trial', 700, 790)));
res.hover.push(await hoverDiff('hero CTA Get a demo (lime)', await findByText('Get a demo', 700, 790)));
res.hover.push(await hoverDiff('header CTA Start free trial (black)', await findByText('Start free trial', 40, 110)));
res.hover.push(await hoverDiff('header CTA Get a demo (grey)', await findByText('Get a demo', 40, 110)));
res.hover.push(await hoverDiff('nav link Pricing', await findByText('Pricing', 40, 110)));
// Product mega menu: hover and screenshot
{
  const h = await findByText('Product', 40, 110);
  res.hover.push(await hoverDiff('nav link Product', h));
  await sleep(300);
  await page.screenshot({ path: `${shots}/desktop-1440-nav-product-hover.png`, clip: { x: 0, y: 0, width: 1440, height: 560 } });
  res.productMenu = await page.evaluate(() => { const els = [...document.querySelectorAll('[nav-drop], [nav-drop="main"], [nav-link="bg"]')]; return els.map(e => { const r = e.getBoundingClientRect(); const s = getComputedStyle(e); return { cls: (e.getAttribute('class') || '').slice(0, 50), attrs: [...e.attributes].map(a => a.name).filter(n => n.startsWith('nav')).join(','), rect: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)], opacity: s.opacity, transform: s.transform, display: s.display, bg: s.backgroundColor, radius: s.borderRadius }; }).slice(0, 8); });
  await page.mouse.move(5, 700); await sleep(600);
}
// focus ring on tab
await page.mouse.move(5, 700);
await page.evaluate(() => { document.activeElement && document.activeElement.blur && document.activeElement.blur(); window.scrollTo(0, 0); });
res.focus = [];
for (let i = 0; i < 12; i++) {
  await page.keyboard.press('Tab'); await sleep(120);
  res.focus.push(await page.evaluate(() => { const e = document.activeElement; if (!e || e === document.body) return null; const s = getComputedStyle(e); const r = e.getBoundingClientRect(); return { t: (e.innerText || e.getAttribute('aria-label') || e.tagName).replace(/\s+/g, ' ').slice(0, 28), outline: s.outlineStyle + ' ' + s.outlineWidth + ' ' + s.outlineColor, offset: s.outlineOffset, boxShadow: s.boxShadow === 'none' ? null : s.boxShadow.slice(0, 70), y: Math.round(r.y), vis: r.width > 0 }; }));
}
await page.evaluate(() => { document.activeElement && document.activeElement.blur && document.activeElement.blur(); window.scrollTo(0, 0); }); await sleep(400);

// ---- header behaviour across scroll
res.header = [];
const hdrState = () => page.evaluate(() => { const link = [...document.querySelectorAll('a')].find(a => (a.innerText || '').trim() === 'Start free trial' && a.getBoundingClientRect().top < 110); let el = link, chain = []; while (el && el !== document.body) { const s = getComputedStyle(el); chain.push({ tag: el.tagName.toLowerCase(), cls: (el.getAttribute('class') || '').slice(0, 40), pos: s.position, top: s.top, tr: s.transform, op: s.opacity, bg: s.backgroundColor, bd: s.backdropFilter, br: s.borderRadius, rect: (r => [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)])(el.getBoundingClientRect()) }); el = el.parentElement; } return chain.filter(c => c.pos !== 'static' || c.tr !== 'none' || c.bg !== 'rgba(0, 0, 0, 0)' || c.rect[1] < 120).slice(0, 5); });
for (const y of [0, 400, 1500, 3000]) { await page.evaluate(v => window.scrollTo(0, v), y); await sleep(900); res.header.push({ y, dir: 'down', chain: await hdrState() }); }
for (const y of [2400, 0]) { await page.evaluate(v => window.scrollTo(0, v), y); await sleep(900); res.header.push({ y, dir: 'up', chain: await hdrState() }); }
await page.screenshot({ path: `${shots}/desktop-1440-header-scrolled-3000.png`, clip: { x: 0, y: 0, width: 1440, height: 160 } }).catch(() => {});

// ---- wheel / native-scroll check with per-frame sampling
await page.evaluate(() => { window.scrollTo(0, 0); window.__log = []; const t0 = performance.now(); const f = () => { window.__log.push([Math.round(performance.now() - t0), Math.round(scrollY)]); if (performance.now() - t0 < 2200) requestAnimationFrame(f); }; requestAnimationFrame(f); });
await sleep(150); await page.mouse.move(720, 450); await page.mouse.wheel(0, 120); await sleep(500); await page.mouse.wheel(0, 120); await sleep(500); await page.mouse.wheel(0, 360); await sleep(1400);
res.wheel = await page.evaluate(() => { const l = window.__log; const ch = l.filter((p, i) => i === 0 || p[1] !== l[i - 1][1]); return ch.slice(0, 40); });

// ---- scroll-linked sampling: transform/opacity of every element near the viewport at several scroll positions
await page.evaluate(() => window.scrollTo(0, 0)); await sleep(600);
const positions = [0, 150, 300, 450, 600, 900, 1300, 1800, 2400, 3200, 4300, 5200, 6200];
const states = {};
for (const y of positions) {
  await page.evaluate(v => window.scrollTo(0, v), y); await sleep(700);
  const s = await page.evaluate(() => { const o = {}; const els = document.querySelectorAll('body *'); let i = 0; for (const e of els) { i++; const r = e.getBoundingClientRect(); if (r.bottom < -300 || r.top > innerHeight + 300 || r.width === 0) continue; const s = getComputedStyle(e); if (s.transform !== 'none' || s.opacity !== '1' || s.translate !== 'none' || s.scale !== 'none') { if (!e.__id) e.__id = 'e' + i + '_' + e.tagName.toLowerCase(); o[e.__id] = { tr: s.transform === 'none' ? '' : s.transform.slice(0, 70), op: s.opacity, cls: (e.getAttribute('class') || '').slice(0, 36), docTop: Math.round(r.top + scrollY), h: Math.round(r.height), w: Math.round(r.width), tag: e.tagName.toLowerCase() }; } } return o; });
  states[y] = s;
}
// find elements whose tr/op varies across positions (while present in 3+ samples)
const seen = {};
for (const y of positions) for (const [id, v] of Object.entries(states[y])) { (seen[id] ||= []).push({ y, tr: v.tr, op: v.op, cls: v.cls, docTop: v.docTop, w: v.w, h: v.h, tag: v.tag }); }
const varying = Object.entries(seen).filter(([id, a]) => a.length >= 3 && new Set(a.map(x => x.tr + '|' + x.op)).size >= 3).map(([id, a]) => ({ id, cls: a[0].cls, tag: a[0].tag, docTop: a[0].docTop, size: a[0].w + 'x' + a[0].h, samples: a.slice(0, 7).map(x => `${x.y}:${x.tr.replace('matrix', 'm')}|${x.op}`) }));
res.scrollLinked = { varyingCount: varying.length, varying: varying.slice(0, 25) };
// constant non-identity transforms/opacity (static transforms, e.g. fixed offsets)
res.staticTransformCount = Object.entries(seen).filter(([id, a]) => new Set(a.map(x => x.tr + '|' + x.op)).size === 1 && (a[0].tr || a[0].op !== '1')).length;

// ---- marquee + pills
await page.evaluate(() => window.scrollTo(0, 880)); await sleep(1500);
const logoX = () => page.evaluate(() => { const i = [...document.images].find(i => /figma\.svg/.test(i.src) && i.getBoundingClientRect().width > 0); if (!i) return null; const r = i.getBoundingClientRect(); let el = i, anim = []; while (el && el !== document.body) { const a = el.getAnimations ? el.getAnimations().length : 0; if (a) anim.push((el.getAttribute('class') || '').slice(0, 30) + ':' + a); el = el.parentElement; } return { x: +r.x.toFixed(1), y: Math.round(r.y), anim }; });
const m = []; for (let i = 0; i < 5; i++) { m.push({ t: i * 500, ...(await logoX()) }); await sleep(500); }
res.marquee = m;
// hover the logo row to see if the marquee pauses
const mi = await page.evaluateHandle(() => [...document.images].find(i => /figma\.svg/.test(i.src) && i.getBoundingClientRect().width > 0));
const mb = await mi.asElement().boundingBox(); await page.mouse.move(mb.x + 20, mb.y + 10, { steps: 5 }); const h1 = await logoX(); await sleep(600); const h2 = await logoX();
res.marqueeHover = { before: h1, after600: h2, moved: h1 && h2 ? +(h2.x - h1.x).toFixed(1) : null };
await page.mouse.move(5, 200);
res.pillScreens = [];
const pillSnap = () => page.evaluate(() => { const pills = [...document.querySelectorAll('a,button,div')].filter(e => ['Automated Inbound', 'Lead Scoring', 'TAM Sourcing', 'Rep Productivity'].includes((e.innerText || '').trim()) && e.children.length === 0); const act = pills.filter(p => { const b = getComputedStyle(p).backgroundColor; return /\(2\d\d, 2\d\d, 1\d\d\)|rgb\(23\d/.test(b) || getComputedStyle(p.parentElement).backgroundColor.includes('238'); }); return { n: pills.length, states: pills.map(p => (p.innerText || '').trim() + ':' + getComputedStyle(p).backgroundColor + ':' + (p.getAttribute('aria-selected') || p.getAttribute('class') || '').slice(0, 30)) }; });
await page.evaluate(() => { const h = [...document.querySelectorAll('h2')].find(h => /GTM engineers/.test(h.innerText)); h && window.scrollTo(0, h.getBoundingClientRect().top + scrollY - 120); }); await sleep(1200);
res.pillTimeline = []; for (let i = 0; i < 6; i++) { res.pillTimeline.push({ t: i * 2, ...(await pillSnap()) }); await sleep(2000); }
fs.writeFileSync(out, JSON.stringify(res, null, 1));
console.log('written', out, Object.keys(res));
await browser.close();
