// iru.com card, script 2: motion probes at 1440x900 (JS on). Observation only: scroll, hover, no clicks, no input.
import { createRequire } from 'node:module';
import fs from 'node:fs';
const require = createRequire('/Users/dhirajgiri/Documents/Projects/Cyper studio/design-system/home-lab/tools/package.json');
const { chromium } = require('playwright-core');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUT = process.argv[2];
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox', '--disable-blink-features=AutomationControlled'] });

async function open(reduced = false) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US', reducedMotion: reduced ? 'reduce' : 'no-preference' });
  const page = await ctx.newPage();
  await page.goto('https://www.iru.com/', { waitUntil: 'load', timeout: 60000 });
  await sleep(4500);
  return { ctx, page };
}
const out = {};

// ---------- normal-motion run
{
  const { ctx, page } = await open(false);
  // 1. lottie frame sampling + scroll gating
  out.lottie = await page.evaluate(async () => {
    const L = window.lottie; const a = L.getRegisteredAnimations()[0];
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    const f = () => Math.round(a.currentFrame * 10) / 10;
    const res = { atTop: [], offscreen: [], back: [] };
    for (let i = 0; i < 6; i++) { res.atTop.push([i * 500, f(), a.isPaused]); await sleep(500); }
    const c = document.getElementById('homepage-hero-lottie');
    const holder = c.closest('[data-animation-path]') || c.parentElement;
    res.dataset = { onContainer: { ...c.dataset }, holderId: holder && holder.id, holderData: holder ? { ...holder.dataset } : null };
    return res;
  });
  await page.evaluate(() => window.scrollTo({ top: 1500, behavior: 'instant' })); await sleep(600);
  out.lottie.offscreen = [];
  for (let i = 0; i < 4; i++) { out.lottie.offscreen.push([i * 500, await page.evaluate(() => { const a = window.lottie.getRegisteredAnimations()[0]; return [Math.round(a.currentFrame * 10) / 10, a.isPaused]; })]); await sleep(500); }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' })); await sleep(300);
  out.lottie.back = [];
  for (let i = 0; i < 3; i++) { out.lottie.back.push([i * 500, await page.evaluate(() => { const a = window.lottie.getRegisteredAnimations()[0]; return [Math.round(a.currentFrame * 10) / 10, a.isPaused]; })]); await sleep(500); }

  // 2. header + wordmark under scroll
  out.headerScroll = [];
  const wm = () => page.evaluate(() => {
    const hdr = document.querySelector('#iru-header'); const header = document.querySelector('header');
    const svg = header.querySelector('a svg'); const r = svg ? svg.getBoundingClientRect() : null; const s = svg ? getComputedStyle(svg) : null;
    const img = header.querySelector('img[alt="Iru Logo"]'); const ir = img ? img.getBoundingClientRect() : null;
    const wrap = svg && svg.parentElement ? getComputedStyle(svg.parentElement) : null;
    return { scrollY: Math.round(scrollY), hdrTop: Math.round(hdr.getBoundingClientRect().top), hdrH: Math.round(hdr.getBoundingClientRect().height), headerTop: Math.round(header.getBoundingClientRect().top), headerH: Math.round(header.getBoundingClientRect().height), hdrTransform: getComputedStyle(hdr).transform, hdrBg: getComputedStyle(header).backgroundColor, hdrShadow: getComputedStyle(header).boxShadow, hdrBorder: getComputedStyle(header).borderBottom, wmW: r && Math.round(r.width), wmOpacity: s && s.opacity, wmTransition: s && s.transition, wmDisplay: s && s.display, wmClass: svg && svg.getAttribute('class'), wmParentW: wrap && wrap.width, wmParentTransition: wrap && wrap.transition, imgLeft: ir && Math.round(ir.left), bannerVisible: (() => { const b = [...document.querySelectorAll('a')].find(a => /Introducing Iru MCP/.test(a.textContent)); if (!b) return null; const br = b.getBoundingClientRect(); return [Math.round(br.top), Math.round(br.height)]; })() };
  });
  for (const y of [0, 30, 60, 100, 200, 600, 1500, 800, 300, 40, 0]) { await page.evaluate(yy => window.scrollTo({ top: yy, behavior: 'instant' }), y); await sleep(700); out.headerScroll.push(await wm()); }
  // header while wheel-scrolling up/down (direction-aware hide?)
  out.headerDir = [];
  await page.mouse.move(700, 500);
  await page.evaluate(() => window.scrollTo({ top: 2000, behavior: 'instant' })); await sleep(500);
  for (const d of [200, 200, -200, -200, 300, -100]) { await page.mouse.wheel(0, d); await sleep(450); out.headerDir.push([d, await page.evaluate(() => [Math.round(scrollY), Math.round(document.querySelector('header').getBoundingClientRect().top), getComputedStyle(document.querySelector('#iru-header')).transform])]); }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' })); await sleep(500);

  // 3. scroll-linked scan: which elements change transform/opacity/filter/clip-path as scrollY changes
  out.scrollLinked = await page.evaluate(async () => {
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    const H = document.documentElement.scrollHeight; const els = [...document.querySelectorAll('main *, .body-wrapper *')].filter(e => !e.closest('#homepage-hero-lottie') && !e.closest('.marquee-content') && !e.closest('#iru-header') && e.tagName !== 'SCRIPT' && e.tagName !== 'STYLE' && !e.closest('svg'));
    const idOf = e => e.tagName.toLowerCase() + (e.id ? '#' + e.id : '') + (typeof e.className === 'string' && e.className ? '.' + e.className.trim().split(/\s+/).slice(0, 5).join('.') : '');
    const snap = () => els.map(e => { const s = getComputedStyle(e); return s.transform + '|' + s.opacity + '|' + s.filter + '|' + s.clipPath; });
    const base = snap(); const changed = new Map(); const steps = [];
    for (let y = 0; y <= H; y += 350) { window.scrollTo({ top: y, behavior: 'instant' }); await sleep(450); steps.push(y); const cur = snap(); cur.forEach((v, i) => { if (v !== base[i]) { const k = i; if (!changed.has(k)) changed.set(k, { id: idOf(els[i]).slice(0, 110), first: y, vals: new Set() }); changed.get(k).vals.add(v.slice(0, 80)); } }); }
    window.scrollTo({ top: 0, behavior: 'instant' });
    return { N: els.length, steps: steps.length, changedCount: changed.size, changed: [...changed.values()].slice(0, 40).map(c => ({ id: c.id, firstAtScrollY: c.first, nValues: c.vals.size, sample: [...c.vals].slice(0, 3) })) };
  });
  out.alpineIntersect = await page.evaluate(() => [...document.querySelectorAll('*')].filter(e => [...e.attributes].some(a => /^x-intersect|^@|^x-transition|^data-aos|^x-bind:class|^:class/.test(a.name))).slice(0, 40).map(e => ({ id: e.tagName.toLowerCase() + (typeof e.className === 'string' ? '.' + e.className.trim().split(/\s+/).slice(0, 4).join('.') : ''), attrs: [...e.attributes].filter(a => /^x-|^@|^:|^data-aos/.test(a.name)).map(a => a.name + '=' + a.value.slice(0, 90)) })));

  // 4. marquee
  out.marquee = await page.evaluate(() => {
    const m = document.querySelector('.marquee-content'); if (!m) return null; const a = m.getAnimations()[0]; const s = getComputedStyle(m); const par = m.parentElement; const ps = getComputedStyle(par);
    return { anim: a && { name: a.animationName, playState: a.playState, dur: a.effect.getTiming().duration, easing: a.effect.getTiming().easing, iter: a.effect.getTiming().iterations, currentTime: Math.round(a.currentTime) }, w: m.getBoundingClientRect().width, rect: m.getBoundingClientRect().toJSON(), gap: s.gap, parent: { overflow: ps.overflow, mask: ps.maskImage, webkitMask: ps.webkitMaskImage, w: par.getBoundingClientRect().width }, grand: (() => { const g = par.parentElement; const gs = getComputedStyle(g); return { mask: gs.maskImage, overflow: gs.overflow, bg: gs.backgroundColor }; })(), logoH: (() => { const i = m.querySelector('img'); return i ? [i.getBoundingClientRect().width, i.getBoundingClientRect().height] : null; })() };
  });
  // marquee hover pause?
  await page.evaluate(() => window.scrollTo({ top: 760, behavior: 'instant' })); await sleep(500);
  const mpos = await page.evaluate(() => { const m = document.querySelector('.marquee-content'); const r = m.getBoundingClientRect(); return { x: r.left + 300, y: r.top + r.height / 2, top: r.top }; });
  if (mpos.y > 0 && mpos.y < 900) { await page.mouse.move(mpos.x, mpos.y); await sleep(500); out.marqueeHover = await page.evaluate(() => { const a = document.querySelector('.marquee-content').getAnimations()[0]; return { playState: a.playState, t: Math.round(a.currentTime) }; }); await sleep(800); out.marqueeHover.t2 = await page.evaluate(() => Math.round(document.querySelector('.marquee-content').getAnimations()[0].currentTime)); }
  await page.mouse.move(5, 5);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));

  // 5. Iru AI video section: lazy src, play state, section styling
  const vtop = await page.evaluate(() => { const v = [...document.querySelectorAll('video')].find(v => v.getBoundingClientRect().width > 1000); return v ? v.getBoundingClientRect().top + scrollY : null; });
  out.aiVideo = { absTop: vtop };
  const vsnap = () => page.evaluate(() => { const v = [...document.querySelectorAll('video')].find(v => v.getBoundingClientRect().width > 1000); if (!v) return null; return { src: v.currentSrc || v.src, dataSrc: v.getAttribute('data-src'), srcAttr: v.getAttribute('src'), sources: [...v.querySelectorAll('source')].map(s => s.src), poster: v.poster, preload: v.preload, readyState: v.readyState, paused: v.paused, t: Math.round(v.currentTime * 100) / 100, dur: v.duration, vw: v.videoWidth, vh: v.videoHeight, buffered: v.buffered.length ? Math.round(v.buffered.end(v.buffered.length - 1) * 10) / 10 : 0, attrs: [...v.attributes].map(a => a.name + '=' + a.value.slice(0, 80)), wrapperClasses: v.parentElement.className.slice(0, 120) }; });
  out.aiVideo.beforeScroll = await vsnap();
  if (vtop) {
    await page.evaluate(y => window.scrollTo({ top: y - 600, behavior: 'instant' }), vtop); await sleep(1200); out.aiVideo.approach = await vsnap();
    await page.evaluate(y => window.scrollTo({ top: y - 100, behavior: 'instant' }), vtop); await sleep(2500); out.aiVideo.inView = await vsnap();
    await sleep(2000); out.aiVideo.inView2 = await vsnap();
    out.aiVideo.section = await page.evaluate(() => { const v = [...document.querySelectorAll('video')].find(v => v.getBoundingClientRect().width > 1000); let e = v; const chain = []; for (let i = 0; i < 8 && e; i++) { const s = getComputedStyle(e); chain.push({ el: e.tagName.toLowerCase() + (typeof e.className === 'string' ? '.' + e.className.trim().split(/\s+/).slice(0, 5).join('.') : ''), bg: s.backgroundColor, bgImg: s.backgroundImage.slice(0, 80), pad: s.padding, rad: s.borderRadius, overflow: s.overflow, w: Math.round(e.getBoundingClientRect().width), h: Math.round(e.getBoundingClientRect().height), opacity: s.opacity }); e = e.parentElement; } const ov = [...document.querySelectorAll('*')].filter(x => x.closest('#widget_1761600170174') && x.tagName !== 'VIDEO' && getComputedStyle(x).backgroundColor === 'rgba(0, 0, 0, 0.7)').slice(0, 2).map(x => x.className.toString().slice(0, 80)); return { chain, overlay07: ov }; });
    await page.screenshot({ path: process.env.SHOT_DIR + '/ai-video-inview.png' });
    const btn = await page.evaluate(() => { const b = document.querySelector('#widget_1761600170174 button'); if (!b) return null; const s = getComputedStyle(b); return { label: b.getAttribute('aria-label') || b.innerText, cls: b.className.slice(0, 120), opacityAtRest: s.opacity, tr: s.transition, rect: b.getBoundingClientRect().toJSON() }; });
    out.aiVideo.button = btn;
    // toggle-less: hover over video to check hover reveal of control button
    await page.mouse.move(700, 400); await sleep(500); out.aiVideo.buttonOnHover = await page.evaluate(() => { const b = document.querySelector('#widget_1761600170174 button'); return b ? getComputedStyle(b).opacity : null; });
    await page.mouse.move(5, 5);
  }
  await ctx.close();
}

// ---------- reduced-motion run
{
  const { ctx, page } = await open(true);
  out.reduced = await page.evaluate(async () => {
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    const a = window.lottie.getRegisteredAnimations()[0]; const f0 = a.currentFrame; await sleep(2000); const f1 = a.currentFrame;
    const m = document.querySelector('.marquee-content'); const ma = m && m.getAnimations()[0];
    const t0 = ma && ma.currentTime; await sleep(1000); const t1 = ma && ma.currentTime;
    return { lottie: { f0: Math.round(f0), f1: Math.round(f1), isPaused: a.isPaused, loop: a.loop }, marquee: ma ? { playState: ma.playState, dt: Math.round(t1 - t0) } : null, scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior, mq: matchMedia('(prefers-reduced-motion: reduce)').matches, runningAnims: document.getAnimations().map(x => x.animationName || x.transitionProperty || 'anim').slice(0, 10), rafSample: null };
  });
  const v = await page.evaluate(() => [...document.querySelectorAll('video')].map(v => ({ autoplay: v.autoplay, paused: v.paused, w: Math.round(v.getBoundingClientRect().width) })));
  out.reduced.videos = v;
  await ctx.close();
}
fs.writeFileSync(OUT, JSON.stringify(out, null, 1));
await browser.close();
console.log('ok');
