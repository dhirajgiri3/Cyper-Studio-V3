#!/usr/bin/env node
// HELIX Home Lab: reference-site probe.
// Usage: node probe.mjs <slug> <url> [outRoot=../../../docs/research/design] [--only=fingerprint]
// Observes a PUBLIC home page for analysis only: screenshots, computed styles, asset inventory,
// animation catalogue, network bytes, library fingerprint. Copies no assets, code or copy.
// Everything unobservable is recorded as null / listed in `notObserved`. Absence of a signature is
// "NOT DETECTED", never "absent".
import { chromium } from 'playwright-core';
import fs from 'node:fs';
import path from 'node:path';

const CHROME = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const args = process.argv.slice(2).filter(a => !a.startsWith('--'));
const flags = Object.fromEntries(process.argv.slice(2).filter(a => a.startsWith('--')).map(a => a.replace(/^--/, '').split('=')));
const [slug, url, outRoot = '../../../docs/research/design'] = args;
if (!slug || !url) { console.error('usage: probe.mjs <slug> <url> [outRoot]'); process.exit(2); }
const outDir = path.resolve(outRoot, slug);
fs.mkdirSync(outDir, { recursive: true });
const sleep = ms => new Promise(r => setTimeout(r, ms));
const notObserved = [];
const note = (k, e) => notObserved.push(`${k}: ${String(e && e.message || e).slice(0, 160)}`);

// ---------- injected before any page script runs ----------
const INIT = () => {
  const S = (window.__probe = { io: 0, mo: 0, ro: 0, raf: 0, ctx: [], listeners: [], animate: 0, lcp: null, cls: 0, longTasks: [], lt: 0 });
  try { const IO = window.IntersectionObserver; if (IO) window.IntersectionObserver = class extends IO { constructor(...a) { super(...a); S.io++; } }; } catch {}
  try { const RO = window.ResizeObserver; if (RO) window.ResizeObserver = class extends RO { constructor(...a) { super(...a); S.ro++; } }; } catch {}
  try { const raf = window.requestAnimationFrame; window.requestAnimationFrame = function (cb) { S.raf++; return raf.call(this, cb); }; } catch {}
  try { const gc = HTMLCanvasElement.prototype.getContext; HTMLCanvasElement.prototype.getContext = function (t, ...r) { S.ctx.push(String(t)); return gc.call(this, t, ...r); }; } catch {}
  try { const an = Element.prototype.animate; Element.prototype.animate = function (...a) { S.animate++; return an.apply(this, a); }; } catch {}
  try {
    const ael = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function (type, fn, opts) {
      if (type === 'wheel' || type === 'touchstart' || type === 'touchmove' || type === 'mousewheel' || type === 'scroll') {
        const passive = opts && typeof opts === 'object' ? !!opts.passive : false;
        const who = this === window ? 'window' : this === document ? 'document' : (this.tagName || 'node').toLowerCase();
        if (S.listeners.length < 200) S.listeners.push({ type, passive, target: who });
      }
      return ael.call(this, type, fn, opts);
    };
  } catch {}
  try { new PerformanceObserver(l => { for (const e of l.getEntries()) S.lcp = { t: Math.round(e.startTime), tag: e.element && e.element.tagName, id: e.element && (e.element.id || null), size: e.size, url: e.url || null }; }).observe({ type: 'largest-contentful-paint', buffered: true }); } catch {}
  try { new PerformanceObserver(l => { for (const e of l.getEntries()) if (!e.hadRecentInput) S.cls += e.value; }).observe({ type: 'layout-shift', buffered: true }); } catch {}
  try { new PerformanceObserver(l => { for (const e of l.getEntries()) { S.lt++; if (S.longTasks.length < 60) S.longTasks.push(Math.round(e.duration)); } }).observe({ type: 'longtask', buffered: true }); } catch {}
};

async function dismissConsent(page) {
  // privacy-preserving only: reject / necessary-only / close. Never "accept".
  const tried = [];
  const tests = [/^\s*(reject( all| non-essential)?|decline( all)?|deny( all)?|refuse|only (strictly )?necessary|necessary only|essential only|continue without accepting|no,? thanks?)\s*$/i];
  for (const re of tests) {
    const btns = page.getByRole('button', { name: re });
    const n = await btns.count().catch(() => 0);
    for (let i = 0; i < Math.min(n, 2); i++) { try { const b = btns.nth(i); if (await b.isVisible()) { await b.click({ timeout: 1500 }); tried.push('clicked:' + (await b.innerText().catch(() => '?')).slice(0, 30)); await sleep(500); return tried; } } catch {} }
  }
  try {
    const closed = await page.evaluate(() => {
      const cands = [...document.querySelectorAll('[class*="cookie" i],[id*="cookie" i],[class*="consent" i],[id*="consent" i],[aria-label*="cookie" i],[role="dialog"]')];
      for (const c of cands) { const r = c.getBoundingClientRect(); if (r.width < 50 || r.height < 30) continue; const x = c.querySelector('button[aria-label*="close" i],button[class*="close" i],[data-dismiss],button[title*="close" i]'); if (x) { x.click(); return 'closed-x'; } }
      return null;
    });
    if (closed) { tried.push(closed); await sleep(400); }
  } catch {}
  return tried;
}

const PAGE_FN = () => {
  // runs in page: gathers observations without mutating the page.
  const vh = innerHeight, vw = innerWidth;
  const cs = (el, props) => { if (!el) return null; const s = getComputedStyle(el); const o = {}; for (const p of props) o[p] = s.getPropertyValue(p); return o; };
  const textProps = ['font-family', 'font-size', 'font-weight', 'line-height', 'letter-spacing', 'color', 'text-transform', 'font-style', 'font-variation-settings', 'text-wrap'];
  const q = s => document.querySelector(s);
  const h1 = q('h1');
  const h2 = [...document.querySelectorAll('h2')].slice(0, 3);
  const btn = [...document.querySelectorAll('a,button')].filter(e => { const r = e.getBoundingClientRect(); return r.top >= 0 && r.top < vh && r.width > 40 && r.height > 24; });
  const ctas = btn.slice(0, 40).map(e => { const s = getComputedStyle(e); const r = e.getBoundingClientRect(); return { tag: e.tagName.toLowerCase(), text: (e.innerText || e.getAttribute('aria-label') || '').trim().slice(0, 40), x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), bg: s.backgroundColor, color: s.color, radius: s.borderRadius, font: s.fontSize + '/' + s.fontWeight, border: s.border === '0px none rgb(0, 0, 0)' ? null : s.border, shadow: s.boxShadow === 'none' ? null : s.boxShadow.slice(0, 80) }; }).filter(c => c.text);
  const header = q('header') || q('nav');
  const hdr = header ? (() => { const s = getComputedStyle(header); const r = header.getBoundingClientRect(); return { tag: header.tagName.toLowerCase(), position: s.position, h: Math.round(r.height), top: Math.round(r.top), bg: s.backgroundColor, backdrop: s.backdropFilter || s.webkitBackdropFilter, border: s.borderBottom, links: [...header.querySelectorAll('a,button')].map(a => (a.innerText || a.getAttribute('aria-label') || '').trim()).filter(Boolean).slice(0, 14) }; })() : null;

  // asset inventory for the first two screens
  const lim = vh * 2;
  const rect = e => e.getBoundingClientRect();
  const inScreens = e => { const r = rect(e); return r.bottom > 0 && r.top < lim && r.width > 4 && r.height > 4; };
  const assets = [];
  for (const e of document.querySelectorAll('img,video,canvas,picture source,svg,iframe,object,embed')) {
    if (e.tagName === 'source') continue;
    if (!inScreens(e)) continue;
    const r = rect(e);
    const a = { tag: e.tagName.toLowerCase(), x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) };
    if (e.tagName === 'IMG') Object.assign(a, { src: e.currentSrc || e.src, natural: [e.naturalWidth, e.naturalHeight], loading: e.loading, fetchpriority: e.getAttribute('fetchpriority'), alt: (e.alt || '').slice(0, 60), decoding: e.decoding });
    if (e.tagName === 'VIDEO') Object.assign(a, { src: e.currentSrc || e.src || null, autoplay: e.autoplay, loop: e.loop, muted: e.muted, poster: e.poster || null, playsinline: e.playsInline, sources: [...e.querySelectorAll('source')].map(s => s.src + ' ' + (s.type || '')) });
    if (e.tagName === 'CANVAS') Object.assign(a, { canvasSize: [e.width, e.height], id: e.id || null, cls: String(e.className).slice(0, 50) });
    if (e.tagName === 'svg') { a.paths = e.querySelectorAll('path').length; a.cls = String(e.className && e.className.baseVal || '').slice(0, 40); if (a.w < 40 && a.h < 40) continue; }
    assets.push(a);
  }
  const bgImgs = [];
  for (const e of document.querySelectorAll('body *')) {
    const s = getComputedStyle(e);
    if (s.backgroundImage && s.backgroundImage !== 'none' && inScreens(e)) { const r = rect(e); bgImgs.push({ tag: e.tagName.toLowerCase(), cls: String(e.className).slice(0, 40), w: Math.round(r.width), h: Math.round(r.height), bg: s.backgroundImage.slice(0, 140) }); if (bgImgs.length > 25) break; }
  }
  // typography census by visible text share
  const fam = {}; const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let n; while ((n = walker.nextNode())) { const t = n.textContent.trim(); if (t.length < 2) continue; const p = n.parentElement; if (!p) continue; const r = p.getBoundingClientRect(); if (r.width === 0 || r.height === 0) continue; const f = getComputedStyle(p).fontFamily.split(',')[0].replace(/["']/g, '').trim(); fam[f] = (fam[f] || 0) + t.length; }
  // largest backgrounds
  const bgs = {}; for (const e of document.querySelectorAll('body, body > *, section, main, header, footer, div')) { const r = rect(e); if (r.width * r.height < vw * vh * 0.25) continue; const c = getComputedStyle(e).backgroundColor; if (c && c !== 'rgba(0, 0, 0, 0)') bgs[c] = (bgs[c] || 0) + Math.round(r.width * r.height); }
  const counts = { gradients: 0, backdrop: 0, filters: 0, video: document.querySelectorAll('video').length, canvas: document.querySelectorAll('canvas').length, svg: document.querySelectorAll('svg').length, img: document.querySelectorAll('img').length, buttons: document.querySelectorAll('button').length, forms: document.querySelectorAll('form').length, tables: document.querySelectorAll('table').length, details: document.querySelectorAll('details').length, links: document.querySelectorAll('a').length, iframes: document.querySelectorAll('iframe').length };
  for (const e of document.querySelectorAll('body *')) { const s = getComputedStyle(e); if (s.backgroundImage.includes('gradient')) counts.gradients++; if ((s.backdropFilter && s.backdropFilter !== 'none') || (s.webkitBackdropFilter && s.webkitBackdropFilter !== 'none')) counts.backdrop++; if (s.filter && s.filter !== 'none') counts.filters++; }
  const headings = [...document.querySelectorAll('h1,h2,h3')].slice(0, 16).map(h => h.tagName + ' ' + h.innerText.trim().replace(/\s+/g, ' ').slice(0, 90));
  const fonts = [...document.fonts].filter(f => f.status === 'loaded').map(f => `${f.family.replace(/["']/g, '')} ${f.weight} ${f.style}`);
  const meta = n => { const m = document.querySelector(`meta[name="${n}"],meta[property="${n}"]`); return m ? m.content : null; };
  const ld = [...document.querySelectorAll('script[type="application/ld+json"]')].map(s => { try { const j = JSON.parse(s.textContent); const t = j['@type'] || (j['@graph'] || []).map(g => g['@type']); return t; } catch { return 'unparseable'; } });
  const rootS = getComputedStyle(document.documentElement);
  const firstView = (document.body.innerText || '').slice(0, 1500);
  return {
    title: document.title, lang: document.documentElement.lang, colorScheme: rootS.colorScheme, description: meta('description'), ogImage: meta('og:image'), canonical: (q('link[rel=canonical]') || {}).href || null, jsonLd: ld, generator: meta('generator'), themeColor: meta('theme-color'),
    h1: h1 ? { text: h1.innerText.trim().slice(0, 140), ...cs(h1, textProps) } : null,
    h2: h2.map(h => ({ text: h.innerText.trim().slice(0, 80), ...cs(h, textProps) })),
    body: cs(document.body, textProps.concat(['background-color'])),
    ctas, header: hdr, assets, bgImgs, fontShare: fam, bgs, counts, headings, fonts, firstViewTextSample: firstView,
    pageHeight: document.documentElement.scrollHeight, hasHScroll: document.documentElement.scrollWidth > innerWidth + 1,
    visibleChars: (document.body.innerText || '').length,
    landmarks: { header: document.querySelectorAll('header').length, nav: document.querySelectorAll('nav').length, main: document.querySelectorAll('main').length, footer: document.querySelectorAll('footer').length, h1: document.querySelectorAll('h1').length },
  };
};

const FP_FN = () => {
  const g = n => { try { return n.split('.').reduce((o, k) => (o == null ? o : o[k]), window); } catch { return undefined; } };
  const globals = ['Lenis', 'lenis', 'LocomotiveScroll', 'locomotive', 'gsap', 'ScrollTrigger', 'ScrollSmoother', 'SplitText', 'THREE', 'OGL', 'lottie', 'Lottie', 'Rive', 'rive', 'Motion', 'motion', 'Webflow', 'jQuery', 'Shopify', '__NEXT_DATA__', '__next_f', '__NUXT__', '__sveltekit', '__remixContext', 'Alpine', 'Vue', 'htmx', 'barba', 'Swiper', 'AOS', 'ScrollMagic', 'anime', 'PIXI', 'BABYLON', 'p5', 'Matter', 'tsParticles', 'UnicornStudio', 'Splide', 'Flickity', 'FramerMotion', '__framer_importFromPackage', '__framer_events', 'framerSiteId', '__REACT_DEVTOOLS_GLOBAL_HOOK__', 'Plausible', 'plausible', 'posthog', 'analytics', 'gtag', 'dataLayer', 'hbspt', '_hsq', 'Intercom', 'Sentry', 'ym', 'mixpanel', 'amplitude', 'clarity', 'fbq', 'twq', '__cfQ', 'Stripe'];
  const present = globals.filter(k => typeof window[k] !== 'undefined');
  const htmlCls = [document.documentElement.className, document.body.className].join(' ').trim().slice(0, 400);
  const styleAttr = document.documentElement.getAttribute('style');
  const els = { canvas: document.querySelectorAll('canvas').length, video: [...document.querySelectorAll('video')].map(v => ({ autoplay: v.autoplay, loop: v.loop, muted: v.muted, src: (v.currentSrc || v.src || '').slice(0, 120), w: Math.round(v.getBoundingClientRect().width), h: Math.round(v.getBoundingClientRect().height), inHero: v.getBoundingClientRect().top < innerHeight })), lottie: document.querySelectorAll('lottie-player,dotlottie-player,dotlottie-wc,[class*="lottie" i]').length, rive: document.querySelectorAll('rive-canvas,[class*="rive" i]').length, spline: document.querySelectorAll('spline-viewer,[class*="spline" i]').length, modelViewer: document.querySelectorAll('model-viewer').length };
  const hints = { nextjs: !!document.querySelector('#__next,[data-nextjs-scroll-focus-boundary]') || !!window.__next_f || !!window.__NEXT_DATA__, nuxt: !!window.__NUXT__ || !!document.querySelector('#__nuxt'), astro: !!document.querySelector('astro-island,[data-astro-cid]'), svelte: !!document.querySelector('[class*="svelte-"]') || !!window.__sveltekit_dev || [...document.querySelectorAll('script')].some(s => /__sveltekit/.test(s.textContent || '')), webflow: !!document.querySelector('[data-wf-site],[data-wf-page]') || /w-mod-/.test(document.documentElement.className), framer: !!document.querySelector('[data-framer-name],[data-framer-component-type],[data-framer-root]') || !!document.querySelector('meta[name="generator"][content*="Framer" i]'), shopify: !!window.Shopify, wordpress: !!document.querySelector('link[href*="wp-content"],script[src*="wp-content"]'), hubspot: !!document.querySelector('script[src*="hs-scripts"],script[src*="hubspot"],link[href*="hubspotusercontent"]'), gatsby: !!document.getElementById('___gatsby'), remix: !!window.__remixContext, vue: !!document.querySelector('[data-v-app],[data-server-rendered]') || !!window.__VUE__, reactRoot: !!document.querySelector('[data-reactroot],#root,#__next') };
  const scripts = [...document.querySelectorAll('script[src]')].map(s => s.src);
  return { present, htmlCls, styleAttr: styleAttr && styleAttr.slice(0, 200), els, hints, scriptCount: scripts.length, scripts: scripts.slice(0, 80), inlineScripts: document.querySelectorAll('script:not([src])').length, generator: (document.querySelector('meta[name=generator]') || {}).content || null, scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior, overscroll: getComputedStyle(document.documentElement).overscrollBehavior };
};

const ANIM_FN = () => {
  const out = [];
  for (const a of document.getAnimations()) {
    try {
      const e = a.effect; const t = e && e.getTiming ? e.getTiming() : {};
      const tgt = e && e.target; const kf = e && e.getKeyframes ? e.getKeyframes() : [];
      const props = [...new Set(kf.flatMap(k => Object.keys(k)).filter(k => !['offset', 'computedOffset', 'easing', 'composite'].includes(k)))];
      out.push({ type: a.constructor.name, name: a.animationName || a.transitionProperty || null, target: tgt ? (tgt.tagName || '').toLowerCase() + (tgt.id ? '#' + tgt.id : '') + (typeof tgt.className === 'string' && tgt.className ? '.' + tgt.className.trim().split(/\s+/).slice(0, 2).join('.') : '') : null, props, duration: typeof t.duration === 'number' ? Math.round(t.duration) : String(t.duration), delay: Math.round(t.delay || 0), easing: t.easing, iterations: t.iterations === Infinity ? 'infinite' : t.iterations, state: a.playState, timeline: a.timeline && a.timeline.constructor && a.timeline.constructor.name });
    } catch {}
  }
  return out;
};

const CSS_FEATURES = ['animation-timeline', 'view-timeline', 'scroll-timeline', '@property', 'view-transition', 'scroll-snap-type', '@starting-style', 'interpolate-size', 'backdrop-filter', 'mix-blend-mode', 'content-visibility', 'will-change', 'sticky', 'text-wrap', 'color-mix(', 'oklch(', 'lab(', '@container', ':has(', 'clip-path', 'mask-image', 'filter: blur', 'perspective', 'prefers-reduced-motion'];
const JS_SIGS = { ScrollTrigger: /ScrollTrigger/, gsap: /gsap|GreenSock/i, lenis: /lenis/i, locomotive: /locomotive/i, three: /WebGLRenderer|THREE\.|three\.module|PerspectiveCamera/, ogl: /\bOGL\b|ogl\/src|Renderer\(\{.*webgl/i, lottie: /lottie|bodymovin/i, rive: /rive-wasm|@rive-app|RiveCanvas/i, framerMotion: /framer-motion|motion\.dev|"motion\/react"|useScroll|useTransform/, framerSite: /framer\.com|__framer/, webflowIx: /webflow\.js|Webflow\.require|w-mod/, swiper: /swiper/i, splitting: /SplitText|splitting\.js|SplitType/i, scrollTimelineJS: /animation-timeline|ScrollTimeline/, intersection: /IntersectionObserver/, webgl: /getContext\(["']webgl|experimental-webgl/, shader: /gl_FragColor|precision (high|medium)p float/, wasm: /WebAssembly\.instantiate/, barba: /barba/i, htmx: /htmx/i };

async function runViewport(browser, vp, mobile) {
  const res = { viewport: vp, mobile };
  const ctx = await browser.newContext({
    viewport: vp, deviceScaleFactor: mobile ? 2 : 1, isMobile: mobile, hasTouch: mobile,
    userAgent: mobile ? 'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36' : undefined,
    locale: 'en-US', ignoreHTTPSErrors: true,
  });
  await ctx.addInitScript(INIT);
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  await cdp.send('Network.enable');
  const reqs = new Map();
  cdp.on('Network.requestWillBeSent', e => reqs.set(e.requestId, { url: e.request.url, type: e.type, t: e.timestamp }));
  cdp.on('Network.responseReceived', e => { const r = reqs.get(e.requestId) || {}; r.status = e.response.status; r.mime = e.response.mimeType; r.proto = e.response.protocol; r.headers = { server: e.response.headers.server, via: e.response.headers.via, 'x-powered-by': e.response.headers['x-powered-by'], 'content-encoding': e.response.headers['content-encoding'] }; r.type = e.type || r.type; reqs.set(e.requestId, r); });
  cdp.on('Network.loadingFinished', e => { const r = reqs.get(e.requestId); if (r) r.bytes = e.encodedDataLength; });
  const scriptBodies = []; const cssBodies = [];
  page.on('response', async r => {
    try {
      const rt = r.request().resourceType();
      if (rt === 'script' && scriptBodies.length < 80 && !scriptBodies.some(x => x.url === r.url())) { const b = await r.body(); scriptBodies.push({ url: r.url(), size: b.length, text: b.slice(0, 2_500_000).toString('utf8') }); }
      if (rt === 'stylesheet' && cssBodies.length < 40 && !cssBodies.some(x => x.url === r.url())) { const b = await r.body(); cssBodies.push({ url: r.url(), size: b.length, text: b.slice(0, 1_500_000).toString('utf8') }); }
    } catch {}
  });
  const tag = mobile ? 'mobile-390' : 'desktop-1440';
  const shot = async (name, opts = {}) => { if (flags.noshots) return; try { await page.screenshot({ path: path.join(outDir, `${tag}-${name}.png`), ...opts }); } catch (e) { note(`${tag} shot ${name}`, e); } };

  const t0 = Date.now();
  try { await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 }); } catch (e) { note(`${tag} goto`, e); }
  await page.waitForLoadState('load', { timeout: 40000 }).catch(e => note(`${tag} load`, e));
  res.loadMs = Date.now() - t0;
  await sleep(1200);
  await shot('t1s'); // early frame: entrance animations still in flight, if any
  await sleep(2300);
  res.consent = await dismissConsent(page);
  await sleep(300);
  res.finalUrl = page.url();

  // bytes at first load (before any scrolling)
  const snapBytes = () => { const by = {}; let total = 0, n = 0; const hosts = {}; for (const r of reqs.values()) { if (!r.bytes && r.bytes !== 0) continue; n++; total += r.bytes; by[r.type] = (by[r.type] || 0) + r.bytes; try { const h = new URL(r.url).host; hosts[h] = (hosts[h] || 0) + r.bytes; } catch {} } return { requests: n, totalBytes: total, byType: by, hosts: Object.fromEntries(Object.entries(hosts).sort((a, b) => b[1] - a[1]).slice(0, 14)) }; };
  res.transferFirstLoad = snapBytes();
  res.jsFirstLoad = { scripts: [...reqs.values()].filter(r => r.type === 'Script' && r.bytes).map(r => ({ url: r.url.slice(0, 140), bytes: r.bytes })).sort((a, b) => b.bytes - a.bytes).slice(0, 25) };

  // observations at first viewport
  try { res.dom = await page.evaluate(PAGE_FN); } catch (e) { note(`${tag} dom`, e); }
  try { res.animationsAtLoad = await page.evaluate(ANIM_FN); } catch (e) { note(`${tag} anim`, e); }
  try { res.runtime = await page.evaluate(() => { const p = window.__probe || {}; return { io: p.io, ro: p.ro, animateCalls: p.animate, canvasContexts: p.ctx, lcp: p.lcp, cls: +(p.cls || 0).toFixed(4), longTasks: p.lt, listeners: p.listeners }; }); } catch (e) { note(`${tag} runtime`, e); }
  await shot('top');

  // idle rAF per second + smooth-scroll probe (desktop only)
  try {
    const r0 = await page.evaluate(() => window.__probe.raf); await sleep(2000); const r1 = await page.evaluate(() => window.__probe.raf);
    res.idleRafPerSecond = Math.round((r1 - r0) / 2);
  } catch (e) { note(`${tag} raf`, e); }
  if (!mobile) {
    try {
      await page.mouse.move(vp.width / 2, vp.height / 2);
      await page.evaluate(() => { window.__series = []; const t0 = performance.now(); const tick = () => { window.__series.push([Math.round(performance.now() - t0), Math.round(window.scrollY * 10) / 10]); if (performance.now() - t0 < 1800) requestAnimationFrame(tick); }; requestAnimationFrame(tick); });
      await page.mouse.wheel(0, 500);
      await sleep(2000);
      const series = await page.evaluate(() => window.__series);
      const final = series[series.length - 1][1];
      const started = series.find(s => s[1] > 0);
      const settle = series.find(s => final > 0 && s[1] >= final * 0.98);
      const distinct = new Set(series.map(s => s[1])).size;
      res.wheelProbe = { finalScrollY: final, firstMoveMs: started ? started[0] : null, settle98Ms: settle ? settle[0] : null, distinctPositions: distinct, samples: series.length, wheelDeltaSent: 500, settleSpan: started && settle ? settle[0] - started[0] : null };
      await page.evaluate(() => window.scrollTo(0, 0)); await sleep(600);
    } catch (e) { note(`${tag} wheel`, e); }
  }

  // scroll through the page with wheel steps (works for smooth-scroll libs too), catalogue as we go
  const H = res.dom ? res.dom.pageHeight : 6000;
  const stops = [['screen2', vp.height], ['mid', Math.round(H * 0.5)], ['footer', H]];
  res.animationsAfterScroll = [];
  let cur = 0;
  for (const [name, target] of stops) {
    try {
      while (cur < target - 2) { const step = Math.min(420, target - cur); await page.mouse.wheel(0, step); cur += step; await sleep(70); }
      await sleep(1400);
      const sy = await page.evaluate(() => Math.round(scrollY));
      cur = sy;
      const an = await page.evaluate(ANIM_FN).catch(() => []);
      res.animationsAfterScroll.push({ stop: name, scrollY: sy, count: an.length, infinite: an.filter(a => a.iterations === 'infinite').length, sample: an.slice(0, 18) });
      await shot(name);
    } catch (e) { note(`${tag} scroll ${name}`, e); }
  }
  // scrolled header state (clip) then return to top
  try {
    await page.evaluate(() => window.scrollTo(0, 420)); await sleep(900);
    await shot('nav-scrolled', { clip: { x: 0, y: 0, width: vp.width, height: Math.min(180, vp.height) } });
    await page.evaluate(() => window.scrollTo(0, 0)); await sleep(500);
  } catch (e) { note(`${tag} nav scrolled`, e); }
  // mobile/desktop nav-open attempt (site-specific; best effort)
  try {
    const opened = await page.evaluate(() => {
      const c = [...document.querySelectorAll('header button,nav button,header [role=button],button[aria-label*="menu" i],button[aria-expanded]')].filter(b => { const r = b.getBoundingClientRect(); const t = (b.getAttribute('aria-label') || b.innerText || '').toLowerCase(); return r.top < 140 && r.width > 16 && /menu|nav|open|toggle|☰|burger/.test(t + ' ' + String(b.className).toLowerCase()); });
      if (c[0]) { c[0].click(); return (c[0].getAttribute('aria-label') || c[0].innerText || 'button').slice(0, 30); }
      return null;
    });
    if (opened) { await sleep(900); res.navOpenToggle = opened; await shot('nav-open'); }
  } catch (e) { note(`${tag} nav open`, e); }

  res.transferAfterScroll = snapBytes();
  // third-party / library fingerprint
  try {
    res.fp = await page.evaluate(FP_FN);
  } catch (e) { note(`${tag} fp`, e); }
  // header-derived signals
  try {
    const doc = [...reqs.values()].find(r => r.type === 'Document');
    res.documentHeaders = doc ? doc.headers : null; res.documentProto = doc ? doc.proto : null;
  } catch {}
  // script / css signature scan (evidence only)
  const sig = {};
  for (const [k, re] of Object.entries(JS_SIGS)) { const hits = scriptBodies.filter(s => re.test(s.text)).map(s => (new URL(s.url).host.replace(/^www\./, '') === new URL(url).host.replace(/^www\./, '') ? '1P ' : '3P ') + s.url.replace(/^https?:\/\//, '').slice(0, 90)); if (hits.length) sig[k] = hits.slice(0, 4); }
  res.scriptSignatures = sig;
  res.scriptsScanned = scriptBodies.length;
  const cssSig = {}; const allCss = cssBodies.map(c => c.text).join('\n');
  let inline = ''; try { inline = await page.evaluate(() => [...document.querySelectorAll('style')].map(s => s.textContent).join('\n')); } catch {}
  const hay = allCss + '\n' + inline;
  for (const f of CSS_FEATURES) { const n = hay.split(f).length - 1; if (n) cssSig[f] = n; }
  res.cssFeatures = cssSig; res.cssBytes = { linked: cssBodies.reduce((a, c) => a + c.size, 0), inline: inline.length, files: cssBodies.length };
  // reduced motion
  try {
    await page.emulateMedia({ reducedMotion: 'reduce' }); await page.reload({ waitUntil: 'load', timeout: 40000 }).catch(() => {}); await sleep(2500);
    const an = await page.evaluate(ANIM_FN).catch(() => []);
    res.reducedMotion = { animationsAfterReload: an.length, infinite: an.filter(a => a.iterations === 'infinite').length, sample: an.slice(0, 6) };
    await shot('reduced-motion-top');
  } catch (e) { note(`${tag} reduced`, e); }
  await ctx.close();
  return res;
}

async function noJs(browser) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false, ignoreHTTPSErrors: true });
  const page = await ctx.newPage();
  const out = {};
  try {
    await page.goto(url, { waitUntil: 'load', timeout: 45000 }); await sleep(1500);
    out.visibleChars = await page.evaluate(() => (document.body.innerText || '').trim().length);
    out.paintedChars = await page.evaluate(() => { let n = 0; const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let t; while ((t = w.nextNode())) { const s = t.textContent.trim(); if (!s) continue; let o = 1, ok = true; for (let e = t.parentElement; e; e = e.parentElement) { const c = getComputedStyle(e); o *= parseFloat(c.opacity); if (c.display === 'none' || c.visibility === 'hidden') ok = false; } const r = t.parentElement.getBoundingClientRect(); if (ok && o > 0.05 && r.width > 0 && r.height > 0) n += s.length; } return n; });
    out.paintedCharsFirstViewport = await page.evaluate(() => { let n = 0; const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let t; while ((t = w.nextNode())) { const s = t.textContent.trim(); if (!s) continue; let o = 1, ok = true; for (let e = t.parentElement; e; e = e.parentElement) { const c = getComputedStyle(e); o *= parseFloat(c.opacity); if (c.display === 'none' || c.visibility === 'hidden') ok = false; } const r = t.parentElement.getBoundingClientRect(); if (ok && o > 0.05 && r.width > 0 && r.height > 0 && r.top < innerHeight && r.bottom > 0) n += s.length; } return n; });
    out.h1 = await page.evaluate(() => { const h = document.querySelector('h1'); return h ? h.innerText.trim().slice(0, 140) : null; });
    out.firstViewportText = (await page.evaluate(() => { const vh = innerHeight; const els = [...document.querySelectorAll('h1,h2,p,a,button,li')].filter(e => { const r = e.getBoundingClientRect(); return r.top >= 0 && r.top < vh && r.height > 0; }); return els.map(e => (e.innerText || '').trim()).filter(Boolean).join(' | '); })).slice(0, 500);
    if (!flags.noshots) await page.screenshot({ path: path.join(outDir, 'desktop-1440-nojs.png') });
  } catch (e) { note('nojs', e); }
  await ctx.close(); return out;
}

const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox', '--disable-blink-features=AutomationControlled'] });
const out = { slug, url, date: new Date().toISOString().slice(0, 10), tool: 'playwright-core + Google Chrome ' + browser.version() + ' (headless)', notObserved };
out.desktop = await runViewport(browser, { width: 1440, height: 900 }, false);
if (flags.only !== 'fingerprint') out.mobile = await runViewport(browser, { width: 390, height: 844 }, true);
out.noJs = await noJs(browser);
await browser.close();
fs.writeFileSync(path.join(outDir, flags.out || 'probe.json'), JSON.stringify(out, null, 1));
const d = out.desktop;
console.log(`[${slug}] ok  load=${d.loadMs}ms  first-load=${Math.round((d.transferFirstLoad?.totalBytes || 0) / 1024)}KB  js=${Math.round((d.transferFirstLoad?.byType?.Script || 0) / 1024)}KB  req=${d.transferFirstLoad?.requests}  libs=${Object.keys(d.scriptSignatures || {}).join(',')}  notObserved=${notObserved.length}`);
