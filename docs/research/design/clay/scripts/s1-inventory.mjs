// clay.com observation script 1: runtime libraries, assets (bytes via CDP), videos, canvases, rAF attribution, CSS grep.
// Observation only, home page only. Writes JSON to the path given as argv[2].
import { createRequire } from 'node:module';
import fs from 'node:fs';
const require = createRequire(import.meta.url);
const { chromium } = require('../../../../../design-system/home-lab/tools/node_modules/playwright-core');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const out = process.argv[2] || 'clay-s1.json';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const INIT = () => {
  const S = (window.__s = { rafBy: {}, ctxBy: [], rafOn: false });
  const urlOf = () => { const st = (new Error().stack || '').split('\n').slice(3, 6).join(' | '); const m = st.match(/https?:\/\/[^\s)]+/g); return m ? m[0].replace(/:\d+:\d+$/, '').slice(0, 110) : 'inline/unknown'; };
  const raf = window.requestAnimationFrame;
  window.requestAnimationFrame = function (cb) { if (S.rafOn) { const u = urlOf(); S.rafBy[u] = (S.rafBy[u] || 0) + 1; } return raf.call(this, cb); };
  const gc = HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext = function (t, ...r) { S.ctxBy.push({ type: String(t), by: urlOf(), w: this.width, h: this.height, inDom: this.isConnected, cls: (this.className || '').toString().slice(0, 60) }); return gc.call(this, t, ...r); };
};

const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox', '--disable-blink-features=AutomationControlled'] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' });
await ctx.addInitScript(INIT);
const page = await ctx.newPage();
const cdp = await ctx.newCDPSession(page);
await cdp.send('Network.enable');
const reqs = new Map();
cdp.on('Network.requestWillBeSent', e => reqs.set(e.requestId, { url: e.request.url, type: e.type, range: e.request.headers.Range || e.request.headers.range || null }));
cdp.on('Network.responseReceived', e => { const r = reqs.get(e.requestId) || {}; r.status = e.response.status; r.mime = e.response.mimeType; const h = e.response.headers; r.cl = h['content-length'] || h['Content-Length']; r.cr = h['content-range'] || h['Content-Range']; r.cc = h['cache-control']; r.type = e.type || r.type; reqs.set(e.requestId, r); });
cdp.on('Network.loadingFinished', e => { const r = reqs.get(e.requestId); if (r) r.bytes = e.encodedDataLength; });
const css = [];
page.on('response', async r => { try { if (r.request().resourceType() === 'stylesheet') { const b = await r.body(); css.push({ url: r.url(), size: b.length, text: b.toString('utf8') }); } } catch {} });

await page.goto('https://www.clay.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
await page.waitForLoadState('load', { timeout: 40000 }).catch(() => {});
await sleep(3500);

const res = {};
// document HTML: is h1 server-rendered? fetch raw HTML without JS
const raw = await ctx.request.get('https://www.clay.com/');
const html = await raw.text();
res.rawHtml = { status: raw.status(), bytes: html.length, hasH1: /<h1[\s>]/i.test(html), h1Text: (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [])[1]?.replace(/<[^>]+>/g, '').trim().slice(0, 80), hasHeroVideoTag: /<video[^>]+autoplay/i.test(html), generator: (html.match(/<meta[^>]+name="generator"[^>]+>/i) || [])[0], dataWfPage: (html.match(/data-wf-page="[^"]+"/) || [])[0], wfSite: (html.match(/data-wf-site="[^"]+"/) || [])[0], htmlAttrs: (html.match(/<html[^>]*>/i) || [])[0] };

// libraries and runtime
res.libs = await page.evaluate(() => {
  const w = window; const o = {};
  o.globals = ['gsap', 'ScrollTrigger', 'SplitText', 'Flip', 'ScrollSmoother', 'Lenis', 'lenis', 'LocomotiveScroll', 'lottie', 'Webflow', 'jQuery', 'THREE', 'Swiper', 'barba', 'Sequel', 'sequel', 'Rive', 'motion'].filter(k => k in w);
  o.versions = { gsap: w.gsap && w.gsap.version, ScrollTrigger: w.ScrollTrigger && w.ScrollTrigger.version, SplitText: w.SplitText && w.SplitText.version, jQuery: w.jQuery && w.jQuery.fn && w.jQuery.fn.jquery };
  o.htmlClass = document.documentElement.className; o.htmlAttrs = [...document.documentElement.attributes].map(a => a.name + '=' + a.value.slice(0, 40));
  o.bodyClass = document.body.className;
  o.dataWid = document.querySelectorAll('[data-w-id]').length;
  o.dataWf = document.querySelectorAll('[data-wf-ix3],[data-ix3],[data-w-ix3]').length;
  o.scrollBehavior = getComputedStyle(document.documentElement).scrollBehavior;
  try { o.gsapGlobalChildren = w.gsap.globalTimeline.getChildren(false, true, true).length; o.gsapTickerFPS = w.gsap.ticker.fps ? 'has' : null; } catch {}
  const desc = el => el ? (el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + '.' + (el.className && el.className.toString ? el.className.toString().split(/\s+/).slice(0, 3).join('.') : '')).slice(0, 70) : null;
  const tweenInfo = a => { if (!a) return null; const v = a.vars || {}; const keys = Object.keys(v).filter(k => !/^(on|callback|scrollTrigger|data|id|overwrite|immediateRender|lazy|paused)/i.test(k)); const kids = a.getChildren ? a.getChildren(false, true, true).slice(0, 4).map(c => ({ targets: (c.targets ? c.targets().slice(0, 2).map(desc) : null), props: Object.keys(c.vars || {}).filter(k => !/^(on|callback|data|id|overwrite|immediateRender|lazy)/i.test(k)).slice(0, 8), ease: typeof (c.vars || {}).ease === 'string' ? c.vars.ease : (c.vars || {}).ease && 'fn', dur: +(c.duration ? c.duration() : 0).toFixed(3) })) : null; return { isTimeline: !!a.getChildren && !a.targets, props: keys.slice(0, 10), ease: typeof v.ease === 'string' ? v.ease : (v.ease ? 'fn' : null), duration: +a.duration().toFixed(3), targets: a.targets ? a.targets().slice(0, 2).map(desc) : null, kids }; };
  try { o.scrollTriggers = w.ScrollTrigger.getAll().map(t => ({ trigger: desc(t.trigger), start: String(t.vars.start), end: String(t.vars.end), scrub: t.vars.scrub, pin: !!t.vars.pin, toggleActions: t.vars.toggleActions || null, once: !!t.vars.once, hasCallbacks: !!(t.vars.onEnter || t.vars.onUpdate || t.vars.onToggle || t.vars.onLeave), anim: tweenInfo(t.animation) })); } catch (e) { o.stErr = String(e); }
  return o;
});

// canvases in DOM and contexts with attribution
res.canvas = await page.evaluate(() => ({ inDom: [...document.querySelectorAll('canvas')].map(c => ({ w: c.width, h: c.height, cls: c.className.toString().slice(0, 60), rect: (r => [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)])(c.getBoundingClientRect()) })), created: window.__s.ctxBy }));

// idle rAF attribution: 3 s at scrollY 0, mouse still
await page.evaluate(() => { window.__s.rafBy = {}; window.__s.rafOn = true; });
await sleep(3000);
res.rafBy = await page.evaluate(() => { window.__s.rafOn = false; return window.__s.rafBy; });

// media elements everywhere
const MEDIA = () => {
  const dTop = el => { const r = el.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y + scrollY), w: Math.round(r.width), h: Math.round(r.height) }; };
  const items = [];
  document.querySelectorAll('img').forEach(i => items.push({ kind: 'img', ...dTop(i), src: i.currentSrc || i.src, natural: [i.naturalWidth, i.naturalHeight], loading: i.loading, fetchpriority: i.getAttribute('fetchpriority'), decoding: i.decoding, srcset: !!i.srcset, sizes: i.sizes ? i.sizes.slice(0, 50) : null, alt: (i.alt || '').slice(0, 30), complete: i.complete, cls: (i.className || '').toString().slice(0, 40) }));
  document.querySelectorAll('video').forEach(v => items.push({ kind: 'video', ...dTop(v), src: v.currentSrc || v.src, natural: [v.videoWidth, v.videoHeight], preload: v.preload, autoplay: v.autoplay, loop: v.loop, muted: v.muted, playsinline: v.playsInline, poster: v.poster ? v.poster.slice(0, 90) : null, paused: v.paused, readyState: v.readyState, currentTime: +v.currentTime.toFixed(2), duration: +v.duration.toFixed(2), sources: [...v.querySelectorAll('source')].map(s => (s.type || '') + ' ' + s.src.slice(-50)), hasAttrs: ['autoplay', 'loop', 'muted', 'playsinline'].filter(a => v.hasAttribute(a)), cls: (v.className || '').toString().slice(0, 40), parentCls: (v.parentElement.className || '').toString().slice(0, 40) }));
  document.querySelectorAll('svg').forEach(s => { const r = dTop(s); if (r.w > 40) items.push({ kind: 'svg', ...r, cls: (s.getAttribute('class') || '').slice(0, 40) }); });
  // CSS backgrounds
  const bgs = []; document.querySelectorAll('*').forEach(el => { const s = getComputedStyle(el); if (s.backgroundImage && s.backgroundImage !== 'none') { const r = dTop(el); if (r.w > 100 && r.h > 40) bgs.push({ ...r, bg: s.backgroundImage.slice(0, 220), cls: (el.className || '').toString().slice(0, 50), tag: el.tagName.toLowerCase() }); } });
  return { items, bgs: bgs.slice(0, 80) };
};
res.mediaTop = await page.evaluate(MEDIA);

// scroll through the page in steps to trigger lazy content, record scroll-linked ScrollTrigger state
const H = await page.evaluate(() => document.documentElement.scrollHeight);
res.pageHeight = H;
for (let y = 0; y <= 4200; y += 350) { await page.evaluate(v => window.scrollTo(0, v), y); await sleep(450); }
await sleep(1200);
res.mediaDeep = await page.evaluate(MEDIA);
res.libsAfter = await page.evaluate(() => { const w = window; const desc = el => el ? (el.tagName.toLowerCase() + '.' + (el.className && el.className.toString ? el.className.toString().split(/\s+/).slice(0, 3).join('.') : '')).slice(0, 70) : null; try { return { count: w.ScrollTrigger.getAll().length, items: w.ScrollTrigger.getAll().map(t => ({ trigger: desc(t.trigger), start: String(t.vars.start), end: String(t.vars.end), scrub: t.vars.scrub, pin: !!t.vars.pin, toggleActions: t.vars.toggleActions || null, anim: t.animation ? { props: Object.keys(t.animation.vars || {}).filter(k => !/^(on|callback|data|id)/i.test(k)).slice(0, 8), ease: typeof (t.animation.vars || {}).ease === 'string' ? t.animation.vars.ease : null, dur: +t.animation.duration().toFixed(3) } : null })) }; } catch (e) { return { err: String(e) }; } });
await page.evaluate(() => window.scrollTo(0, 0)); await sleep(500);

// network by URL (media + images + fonts)
const byUrl = {};
for (const r of reqs.values()) { if (r.bytes == null) continue; const k = r.url.split('?')[0]; const e = (byUrl[k] ||= { type: r.type, mime: r.mime, bytes: 0, n: 0, status: r.status, cl: r.cl, cr: r.cr, cc: r.cc }); e.bytes += r.bytes; e.n++; if (r.cr) e.cr = r.cr; }
res.net = byUrl;

// CSS grep
const pats = { 'animation-timeline': /animation-timeline/g, 'view-timeline': /view-timeline/g, 'scroll-timeline': /scroll-timeline/g, '@property': /@property/g, 'view-transition': /view-transition/g, '@starting-style': /@starting-style/g, 'prefers-reduced-motion': /prefers-reduced-motion/g, 'scroll-behavior': /scroll-behavior\s*:\s*smooth/g, 'scroll-snap': /scroll-snap-type/g, 'mix-blend-mode': /mix-blend-mode\s*:\s*[a-z-]+/g, 'backdrop-filter': /backdrop-filter\s*:\s*[^;}]+/g };
res.css = { files: css.map(c => ({ url: c.url.slice(0, 120), size: c.size })), grep: {} };
for (const [k, re] of Object.entries(pats)) { let n = 0; const ex = new Set(); for (const c of css) { const m = c.text.match(re); if (m) { n += m.length; m.slice(0, 3).forEach(x => ex.add(x.slice(0, 80))); } } res.css.grep[k] = { n, ex: [...ex].slice(0, 5) }; }
const kf = new Set(); for (const c of css) for (const m of c.text.matchAll(/@keyframes\s+([\w-]+)/g)) kf.add(m[1]); res.css.keyframes = [...kf];
const rm = []; for (const c of css) for (const m of c.text.matchAll(/@media[^{]*prefers-reduced-motion[^{]*\{([^}]*\{[^}]*\}){0,3}/g)) rm.push(m[0].slice(0, 260)); res.css.reducedMotionRules = rm.slice(0, 6);
fs.writeFileSync(out, JSON.stringify(res, null, 1));
console.log('written', out, Object.keys(res));
await browser.close();
