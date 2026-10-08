// legora.com: static evidence. Network by type and host at first load (before scrolling) and after a scroll walk,
// loaded-script signature scan (with context), globals, CSS features, typography census, colour/border/radius census,
// section rhythm, asset inventory with natural/rendered size and loading attributes. Observation only.
// Usage: node s4-static-evidence.mjs <outDir>
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
const require = createRequire('/Users/dhirajgiri/Documents/Projects/Cyper studio/design-system/home-lab/tools/');
const { chromium } = require('playwright-core');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const out = process.argv[2];
fs.mkdirSync(out, { recursive: true });
const sleep = ms => new Promise(r => setTimeout(r, ms));
const RES = {};

const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--autoplay-policy=no-user-gesture-required'] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' });
const page = await ctx.newPage();
const cdp = await ctx.newCDPSession(page);
await cdp.send('Network.enable');
const reqs = new Map();
cdp.on('Network.requestWillBeSent', e => reqs.set(e.requestId, { url: e.request.url, type: e.type, t: e.timestamp, range: (e.request.headers.Range || e.request.headers.range) || null }));
cdp.on('Network.responseReceived', e => { const r = reqs.get(e.requestId); if (r) { r.status = e.response.status; r.mime = e.response.mimeType; r.len = e.response.headers['content-length'] || e.response.headers['Content-Length']; r.cr = e.response.headers['content-range'] || null; } });
cdp.on('Network.loadingFinished', e => { const r = reqs.get(e.requestId); if (r) r.bytes = e.encodedDataLength; });
const bodies = new Map();
page.on('response', async r => { try { if (r.request().resourceType() === 'script') { const b = await r.body(); bodies.set(r.url(), b.toString('utf8')); } } catch {} });
await page.goto('https://legora.com/', { waitUntil: 'load' });
await sleep(4000);

const summarize = () => {
  const byType = {}, byHostType = {}; let n = 0;
  for (const r of reqs.values()) { if (r.bytes == null) continue; n++; byType[r.type] = (byType[r.type] || 0) + r.bytes; const h = new URL(r.url).host; byHostType[h + ' ' + r.type] = (byHostType[h + ' ' + r.type] || 0) + r.bytes; }
  return { n, byType, byHostType };
};
RES.netFirstLoad = summarize();
RES.firstLoadResources = [...reqs.values()].filter(r => r.bytes != null).map(r => ({ u: r.url.replace(/^https:\/\//, '').slice(0, 130), type: r.type, bytes: r.bytes, status: r.status, range: r.range, cr: r.cr })).filter(r => /Image|Media|Font|Stylesheet/.test(r.type)).sort((a, b) => b.bytes - a.bytes).slice(0, 40);

// scripts: first-party (framerusercontent/sites) vs third-party at first load
const scripts = [...reqs.values()].filter(r => r.type === 'Script' && r.bytes != null).map(r => ({ host: new URL(r.url).host, u: r.url.replace(/^https:\/\//, '').slice(0, 110), bytes: r.bytes }));
RES.scriptBytes = { firstParty: scripts.filter(s => /framerusercontent|framerstatic|events\.framer|^legora/.test(s.host)).reduce((a, s) => a + s.bytes, 0), thirdParty: scripts.filter(s => !/framerusercontent|framerstatic|events\.framer|^legora/.test(s.host)).reduce((a, s) => a + s.bytes, 0), list: scripts.sort((a, b) => b.bytes - a.bytes).slice(0, 30) };

// globals
RES.globals = await page.evaluate(() => {
  const names = ['gsap', 'ScrollTrigger', 'ScrollSmoother', 'Lenis', 'lenis', 'LocomotiveScroll', 'THREE', 'OGL', 'lottie', 'Rive', 'Motion', 'motion', 'framerMotion', 'Webflow', 'jQuery', '__framer_importFromPackage', '__framer_events', '__framer_ssr', 'Splide', 'Swiper', 'barba', 'anime', 'PIXI', 'createjs', 'BABYLON', 'Spline', '__NEXT_DATA__'];
  const present = names.filter(n => typeof window[n] !== 'undefined');
  return { present, htmlClass: document.documentElement.className, htmlAttrs: [...document.documentElement.attributes].map(a => a.name), bodyClass: document.body.className.slice(0, 120), bodyAttrs: [...document.body.attributes].map(a => a.name), scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior, overscroll: getComputedStyle(document.documentElement).overscrollBehavior, hasViewTransitionMeta: !!document.querySelector('meta[name="view-transition"]'), scrollTimelineApi: typeof window.ScrollTimeline, viewTimelineApi: typeof window.ViewTimeline, startViewTransition: typeof document.startViewTransition, cssAnimTimelineSupported: CSS.supports('animation-timeline', 'scroll()'), registerProperty: typeof CSS.registerProperty };
});

// style sheets: scan for features, with counts
RES.css = await page.evaluate(() => {
  const feats = { 'animation-timeline': 0, 'view-timeline': 0, 'scroll-timeline': 0, '@property': 0, 'view-transition': 0, 'scroll-snap-type': 0, '@starting-style': 0, 'backdrop-filter': 0, 'mix-blend-mode': 0, 'mask-image': 0, 'clip-path': 0, '@keyframes': 0, 'prefers-reduced-motion': 0, 'prefers-color-scheme': 0, 'color-mix': 0, 'text-wrap': 0, 'font-variation-settings': 0, 'position:sticky': 0, '@container': 0, 'position:fixed': 0 };
  let bytes = 0; const kf = [];
  const walk = (rules) => { for (const r of rules) { const t = r.cssText || ''; for (const k of Object.keys(feats)) if (t.includes(k) || (k === 'position:sticky' && /position:\s*sticky/.test(t)) || (k === 'position:fixed' && /position:\s*fixed/.test(t))) feats[k]++; if (r.type === 7) kf.push(r.name); if (r.cssRules && r.cssRules.length) walk(r.cssRules); } };
  let nSheets = 0;
  for (const s of document.styleSheets) { nSheets++; try { walk(s.cssRules); } catch {} }
  const inline = [...document.querySelectorAll('style')].reduce((a, s) => a + s.textContent.length, 0);
  const rm = []; // @media (prefers-reduced-motion) rules, first 6
  for (const s of document.styleSheets) { try { for (const r of s.cssRules) if (r.type === 4 && /prefers-reduced-motion/.test(r.conditionText || r.media.mediaText)) { rm.push((r.cssText || '').slice(0, 160)); } } catch {} }
  return { nSheets, inline, feats, keyframes: [...new Set(kf)].slice(0, 30), reducedMotionRules: rm.slice(0, 6), rmCount: rm.length };
});

// script signature scan (first-party Framer chunks only). Context printed, trimmed.
const SIGS = { gsap: /gsap|GreenSock/i, ScrollTrigger: /ScrollTrigger/, lenis: /lenis/i, locomotive: /locomotive/i, three: /WebGLRenderer|THREE\.|PerspectiveCamera/, ogl: /\bOGL\b/, lottie: /lottie|bodymovin/i, rive: /rive-canvas|@rive-app|RiveFile/i, spline: /splinetool|spline-viewer/i, webglGetContext: /getContext\(["']webgl/, ScrollTimeline: /ScrollTimeline/, ViewTimeline: /ViewTimeline/, animationTimeline: /animation-timeline|animationTimeline/, startViewTransition: /startViewTransition/, registerProperty: /registerProperty/, requestVideoFrameCallback: /requestVideoFrameCallback/, IntersectionObserver: /IntersectionObserver/, framerMotion: /framer-motion|framerMotion/i, 'WAAPI element.animate': /\.animate\(/, matchMedia_reduce: /prefers-reduced-motion/ };
const scan = {};
for (const [url, text] of bodies) {
  if (!/framerusercontent\.com\/sites|framerstatic\.com/.test(url)) continue;
  const short = url.replace(/^.*\/sites\/[^/]+\//, '');
  const hits = {};
  for (const [k, re] of Object.entries(SIGS)) { const m = re.exec(text); if (m) { const i = m.index; hits[k] = text.slice(Math.max(0, i - 60), i + 90).replace(/\s+/g, ' '); } }
  if (Object.keys(hits).length) scan[short] = { size: text.length, hits };
}
RES.scriptScan = scan;
RES.scriptsLoadedFirstParty = [...bodies.keys()].filter(u => /framerusercontent\.com\/sites/.test(u)).map(u => u.replace(/^.*\/sites\/[^/]+\//, ''));

// section rhythm: children of the main wrapper
RES.sections = await page.evaluate(() => {
  const h1 = document.querySelector('h1');
  let n = h1; const chain = [];
  while (n && n !== document.body) { chain.push(n); n = n.parentElement; }
  // find the ancestor whose parent has many tall children (page root of sections)
  let root = null;
  for (const c of chain) { const p = c.parentElement; if (!p) continue; const kids = [...p.children].filter(k => k.getBoundingClientRect().height > 150); if (kids.length >= 8) { root = p; break; } }
  if (!root) return { error: 'root not found' };
  return { rootCls: root.className.slice(0, 40), kids: [...root.children].map(k => { const r = k.getBoundingClientRect(); const s = getComputedStyle(k); const h = k.querySelector('h1,h2,h3,p'); return { cls: k.className.split(' ')[0], y: Math.round(r.top + scrollY), h: Math.round(r.height), w: Math.round(r.width), bg: s.backgroundColor, pos: s.position, txt: h ? h.textContent.trim().slice(0, 40) : '' }; }).filter(k => k.h > 20) };
});

// typography census
RES.type = await page.evaluate(() => {
  const walker = (txt, exact = true) => { const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let n; const hits = []; while ((n = w.nextNode())) { const t = n.textContent.trim(); if (exact ? t === txt : t.startsWith(txt)) hits.push(n.parentElement); } return hits.find(e => { const r = e.getBoundingClientRect(); return r.width > 0; }) || hits[0]; };
  const L = [['nav link', 'Solutions'], ['announce', 'Introducing Skills'], ['CTA label', 'Book a demo'], ['H1 sub', 'Collaborative AI for exceptional lawyers'], ['trusted by', 'Trusted by'], ['H3 aOS', 'Introducing the Legora aOS™'], ['aOS sub', 'The agentic operating system for legal work'], ['pill', 'Large Language Models'], ['H3 latest', 'Our latest innovations'], ['latest body', 'Earlier this spring', false], ['card title', 'Agent'], ['card body', 'End-to-end execution', false], ['read more', 'Read more'], ['H3 every', 'Every team.', false], ['stat number', '97%'], ['Vision', 'Our Vision'], ['security h', 'Compliant with', false], ['footer link', 'Trust Center'], ['footer legal', 'Terms of use'], ['practice label', 'Tax']];
  const props = ['font-family', 'font-size', 'font-weight', 'line-height', 'letter-spacing', 'color', 'text-transform', 'font-variation-settings', 'font-feature-settings', 'font-variant-numeric', 'text-wrap', 'text-align'];
  return L.map(([label, txt, exact = true]) => { const e = walker(txt, exact); if (!e) return { label, miss: true }; const s = getComputedStyle(e); const o = { label, tag: e.tagName.toLowerCase(), cls: (typeof e.className === 'string' ? e.className : '').split(' ').slice(-1)[0], y: Math.round(e.getBoundingClientRect().top + scrollY), w: Math.round(e.getBoundingClientRect().width) }; for (const p of props) o[p] = s.getPropertyValue(p).replace(/"CUSTOMV2;Aktiv Grotesk VF Variable Regular", sans-serif/, 'AktivGroteskVF'); return o; });
});
RES.fontFiles = await page.evaluate(() => performance.getEntriesByType('resource').filter(e => /\.(woff2?|ttf|otf)(\?|$)/i.test(e.name) || e.initiatorType === 'css' && /font/i.test(e.name)).map(e => ({ u: e.name.replace(/^https:\/\//, '').slice(0, 120), enc: e.encodedBodySize, dec: e.decodedBodySize })));
RES.fontFaces = await page.evaluate(() => [...document.fonts].map(f => ({ family: f.family.replace(/"/g, ''), weight: f.weight, style: f.style, status: f.status, unicodeRange: (f.unicodeRange || '').slice(0, 40) })).slice(0, 20));

// colour / border / radius / shadow census, over all elements with real area
RES.census = await page.evaluate(() => {
  const bg = {}, tx = {}, bd = {}, rad = {}, sh = {}, grads = [], bf = [];
  for (const e of document.querySelectorAll('body *')) {
    const r = e.getBoundingClientRect(); if (r.width < 2 || r.height < 2) continue;
    const s = getComputedStyle(e);
    if (s.backgroundColor !== 'rgba(0, 0, 0, 0)') bg[s.backgroundColor] = (bg[s.backgroundColor] || 0) + Math.round(r.width * r.height / 1000);
    if (e.childElementCount === 0 && e.textContent.trim()) tx[s.color] = (tx[s.color] || 0) + e.textContent.trim().length;
    if (s.borderTopWidth !== '0px' && s.borderTopStyle !== 'none') { const k = `${s.borderTopWidth} ${s.borderTopStyle} ${s.borderTopColor}`; bd[k] = (bd[k] || 0) + 1; }
    if (s.borderRadius !== '0px') rad[s.borderRadius] = (rad[s.borderRadius] || 0) + 1;
    if (s.boxShadow !== 'none') sh[s.boxShadow.slice(0, 90)] = (sh[s.boxShadow.slice(0, 90)] || 0) + 1;
    if (s.backgroundImage.includes('gradient')) grads.push({ cls: (typeof e.className === 'string' ? e.className : '').split(' ')[0], w: Math.round(r.width), h: Math.round(r.height), y: Math.round(r.top + scrollY), bg: s.backgroundImage.slice(0, 170) });
    if (s.backdropFilter && s.backdropFilter !== 'none') bf.push({ cls: (typeof e.className === 'string' ? e.className : '').split(' ')[0], w: Math.round(r.width), h: Math.round(r.height), y: Math.round(r.top + scrollY), bf: s.backdropFilter, bg: s.backgroundColor });
  }
  const top = (o, n = 8) => Object.entries(o).sort((a, b) => b[1] - a[1]).slice(0, n);
  return { bg: top(bg, 10), tx: top(tx, 10), bd: top(bd, 8), rad: top(rad, 8), sh: top(sh, 5), grads: grads.slice(0, 14), bf: bf.slice(0, 10) };
});

// scroll walk to trigger lazy loads, then asset inventory
for (let y = 0; y <= 13100; y += 700) { await page.evaluate(yy => window.scrollTo(0, yy), y); await sleep(250); }
await sleep(1500);
RES.netAfterWalk = summarize();
RES.assets = await page.evaluate(() => {
  const res = {}; for (const e of performance.getEntriesByType('resource')) res[e.name] = { enc: e.encodedBodySize, tr: e.transferSize, dec: e.decodedBodySize };
  const abs = e => { const r = e.getBoundingClientRect(); return { y: Math.round(r.top + scrollY), x: Math.round(r.left), w: Math.round(r.width), h: Math.round(r.height) }; };
  const imgs = [...document.querySelectorAll('img')].map(i => { const a = abs(i); const u = i.currentSrc || i.src; return { kind: 'img', ...a, nat: [i.naturalWidth, i.naturalHeight], loading: i.loading, fp: i.getAttribute('fetchpriority'), dec: i.decoding, hasSrcset: !!i.srcset, alt: (i.alt || '').slice(0, 24), u: u.replace(/^https:\/\//, '').slice(0, 100), bytes: res[u] ? res[u].enc : null, ext: (u.split('?')[0].match(/\.(\w+)$/) || [])[1] }; });
  const vids = [...document.querySelectorAll('video')].map(v => ({ kind: 'video', ...abs(v), nat: [v.videoWidth, v.videoHeight], dur: +(v.duration || 0).toFixed(2), preload: v.preload, autoplay: v.autoplay, loop: v.loop, muted: v.muted, poster: (v.poster || '').replace(/^https:\/\//, '').slice(0, 100), u: (v.currentSrc || v.src || '').replace(/^https:\/\//, '').slice(0, 100) }));
  const svgs = [...document.querySelectorAll('svg')].map(s => ({ kind: 'svg', ...abs(s), paths: s.querySelectorAll('path').length })).filter(s => s.w >= 20);
  const cssbg = []; for (const e of document.querySelectorAll('body *')) { const b = getComputedStyle(e).backgroundImage; if (b.includes('url(')) cssbg.push({ kind: 'css-bg', ...abs(e), u: b.slice(0, 120) }); }
  return { imgs, vids, svgs, cssbg, resCount: Object.keys(res).length };
});
fs.writeFileSync(path.join(out, 's4-evidence.json'), JSON.stringify(RES, null, 1));
await browser.close();
console.log('done');
