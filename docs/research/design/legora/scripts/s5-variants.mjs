// legora.com: variants. A) fresh keyboard focus order, B) video buffering + stat typography, C) prefers-reduced-motion run,
// D) JavaScript disabled run, E) mobile 390 menu (opens the nav toggle only; nothing is submitted), F) 1920 container check.
// Usage: node s5-variants.mjs <outDir>
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
const part = async (name, fn) => { try { RES[name] = await fn(); } catch (e) { RES[name] = { error: String(e).slice(0, 400) }; } };

const INIT = () => {
  const R = (window.__rec = { anim: [] });
  const desc = el => el ? (el.tagName.toLowerCase() + (typeof el.className === 'string' && el.className ? '.' + el.className.split(' ').slice(0, 1).join('.') : '') + ' "' + (el.textContent || '').trim().slice(0, 18) + '"') : null;
  const an = Element.prototype.animate;
  Element.prototype.animate = function (kf, opts) { try { if (R.anim.length < 300) R.anim.push({ t: Math.round(performance.now()), target: desc(this), kf: JSON.stringify(kf).slice(0, 90), opts: JSON.stringify(opts).slice(0, 120) }); } catch {} return an.apply(this, arguments); };
};
const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--autoplay-policy=no-user-gesture-required'] });

// A + B: default desktop
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' });
  const page = await ctx.newPage();
  await page.goto('https://legora.com/', { waitUntil: 'load' });
  await sleep(3500);
  await part('focusOrder', async () => {
    const rows = [];
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab'); await sleep(200);
      rows.push(await page.evaluate(() => { const e = document.activeElement; if (!e || e === document.body) return null; const s = getComputedStyle(e); const r = e.getBoundingClientRect(); const inner = e.querySelector('*'); return { txt: (e.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 24), href: e.getAttribute('href'), outline: `${s.outlineStyle} ${s.outlineWidth} ${s.outlineColor}`, shadow: s.boxShadow.slice(0, 60), y: Math.round(r.y), x: Math.round(r.x) }; }));
      if (i === 2) await page.screenshot({ path: path.join(out, 's5-focus-3.png'), clip: { x: 0, y: 0, width: 1440, height: 130 } });
    }
    return rows;
  });
  await part('videoBuffer', async () => page.evaluate(() => { const v = document.querySelector('video'); const b = v.buffered; const ranges = []; for (let i = 0; i < b.length; i++) ranges.push([+b.start(i).toFixed(1), +b.end(i).toFixed(1)]); return { ranges, ct: +v.currentTime.toFixed(1), dur: v.duration }; }));
  await part('statType', async () => {
    await page.evaluate(() => window.scrollTo(0, 9800)); await sleep(5000);
    return page.evaluate(() => {
      const e = [...document.querySelectorAll('p,div,span')].find(x => x.childElementCount === 0 && /^\d{1,3}\s?%$/.test(x.textContent.trim()) && x.getBoundingClientRect().width > 0);
      if (!e) return null; const s = getComputedStyle(e); const r = e.getBoundingClientRect();
      return { txt: e.textContent, fs: s.fontSize, fw: s.fontWeight, lh: s.lineHeight, ls: s.letterSpacing, fvs: s.fontVariationSettings, fvn: s.fontVariantNumeric, color: s.color, w: Math.round(r.width), h: Math.round(r.height), all: [...document.querySelectorAll('p,div,span')].filter(x => x.childElementCount === 0 && /^\d{1,3}\s?%$/.test(x.textContent.trim())).map(x => x.textContent.trim()) };
    });
  });
  await part('hoverNavShot', async () => {
    await page.evaluate(() => window.scrollTo(0, 0)); await sleep(800);
    const box = await page.evaluate(() => { const a = [...document.querySelectorAll('a')].find(x => x.textContent.trim() === 'Solutions'); const r = a.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; });
    await page.mouse.move(box.x, box.y); await sleep(500);
    await page.screenshot({ path: path.join(out, 's5-hover-nav-hero.png'), clip: { x: 0, y: 44, width: 720, height: 72 } });
    await page.evaluate(() => window.scrollTo(0, 1000)); await sleep(800);
    const box2 = await page.evaluate(() => { const a = [...document.querySelectorAll('a')].find(x => x.textContent.trim() === 'Solutions'); const r = a.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; });
    await page.mouse.move(box2.x, box2.y); await sleep(500);
    await page.screenshot({ path: path.join(out, 's5-hover-nav-light.png'), clip: { x: 0, y: 44, width: 720, height: 72 } });
    return page.evaluate(() => { const a = [...document.querySelectorAll('a')].find(x => x.textContent.trim() === 'Solutions'); const kids = [a, ...a.querySelectorAll('*')].map(n => { const s = getComputedStyle(n); return { tag: n.tagName.toLowerCase(), bg: s.backgroundColor, color: s.color, br: s.borderRadius }; }); return kids; });
  });
  await ctx.close();
}

// C: reduced motion
await part('reducedMotion', async () => {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US', reducedMotion: 'reduce' });
  await ctx.addInitScript(INIT);
  const page = await ctx.newPage();
  await page.goto('https://legora.com/', { waitUntil: 'load' });
  await sleep(6000);
  const o = {};
  o.mq = await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches);
  o.waapi = await page.evaluate(() => window.__rec.anim.slice(0, 40).map(a => a.target + ' ' + a.kf + ' ' + a.opts));
  o.waapiCount = await page.evaluate(() => window.__rec.anim.length);
  o.hero = await page.evaluate(async () => { const v = document.querySelector('video'); const a = v.currentTime; await new Promise(r => setTimeout(r, 1500)); const h1 = document.querySelector('h1'); const spans = [...h1.querySelectorAll('span')].map(s => getComputedStyle(s).opacity); return { ct0: +a.toFixed(2), ct1: +v.currentTime.toFixed(2), paused: v.paused, h1spanOpacity: spans, subOpacity: getComputedStyle([...document.querySelectorAll('p')].find(p => p.textContent.includes('Collaborative')).parentElement).opacity }; });
  o.ticker = await page.evaluate(async () => { await new Promise(r => setTimeout(r, 100)); window.scrollTo(0, 650); await new Promise(r => setTimeout(r, 1200)); const ul = document.querySelector('li.ticker-item').parentElement; const a = getComputedStyle(ul).transform; await new Promise(r => setTimeout(r, 1500)); return { a, b: getComputedStyle(ul).transform }; });
  o.scrub = await page.evaluate(async () => { const v = document.querySelectorAll('video')[1]; window.scrollTo(0, 2400); await new Promise(r => setTimeout(r, 1500)); const a = v.currentTime; window.scrollTo(0, 3400); await new Promise(r => setTimeout(r, 1500)); return { at2400: +a.toFixed(2), at3400: +v.currentTime.toFixed(2) }; });
  o.headerFlip = await page.evaluate(async () => { window.scrollTo(0, 0); await new Promise(r => setTimeout(r, 800)); const a = [...document.querySelectorAll('a')].find(x => x.textContent.trim() === 'Solutions'); const p = a.querySelector('p') || a; const seen = []; const t0 = performance.now(); window.scrollTo(0, 300); await new Promise(res => { const tick = () => { const t = performance.now() - t0; const c = getComputedStyle(p).color; if (seen[seen.length - 1] !== c) seen.push(c); if (t < 800) requestAnimationFrame(tick); else res(); }; tick(); }); return seen; });
  o.counters = await page.evaluate(async () => { window.scrollTo(0, 8200); await new Promise(r => setTimeout(r, 300)); const nums = () => [...document.querySelectorAll('p,div,span')].filter(e => e.childElementCount === 0 && /^\d{1,3}\s?%$/.test(e.textContent.trim())).map(e => e.textContent.trim()).join(','); const rows = []; const t0 = performance.now(); window.scrollTo(0, 9800); await new Promise(res => { const tick = () => { const t = performance.now() - t0; const n = nums(); if (!rows.length || rows[rows.length - 1][1] !== n) rows.push([Math.round(t), n]); if (t < 2500) requestAnimationFrame(tick); else res(); }; tick(); }); return rows.slice(0, 6).concat(rows.slice(-2)); });
  o.carousel = await page.evaluate(async () => { window.scrollTo(0, 7500); await new Promise(r => setTimeout(r, 1000)); const s = () => document.getAnimations().map(a => ({ n: a.animationName, st: a.playState, ct: Math.round(a.currentTime) })).slice(0, 3); const a = s(); await new Promise(r => setTimeout(r, 3000)); return { a, b: s() }; });
  await ctx.close();
  return o;
});

// D: JS disabled
await part('noJs', async () => {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US', javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto('https://legora.com/', { waitUntil: 'load' });
  await sleep(2500);
  const o = {};
  try {
    o.probe = await page.evaluate(() => { const h1 = document.querySelector('h1'); const spans = [...h1.querySelectorAll('span')].map(s => getComputedStyle(s).opacity); const sub = [...document.querySelectorAll('p')].find(p => p.textContent.includes('Collaborative')); let n = sub, op = 1; while (n && n !== document.body) { op *= parseFloat(getComputedStyle(n).opacity); n = n.parentElement; } const cta = [...document.querySelectorAll('a')].filter(a => a.textContent.trim().startsWith('Book a demo')); const ctaOp = cta.map(c => { let n = c, op = 1; while (n && n !== document.body) { op *= parseFloat(getComputedStyle(n).opacity); n = n.parentElement; } return +op.toFixed(3) + '@y' + Math.round(c.getBoundingClientRect().top); }); const v = document.querySelector('video'); return { h1spanOpacity: spans, subEffectiveOpacity: op, ctaEffective: ctaOp, videoControls: v.controls, videoPaused: v.paused, videoRS: v.readyState, poster: !!v.poster, height: document.documentElement.scrollHeight, textLen: document.body.innerText.length, zeroOpacityEls: [...document.querySelectorAll('[style*="opacity:0.001"],[style*="opacity: 0.001"]')].length }; });
  } catch (e) { o.probeErr = String(e).slice(0, 200); }
  await page.screenshot({ path: path.join(out, 's5-nojs-top.png') });
  await page.mouse.wheel(0, 1300); await sleep(800);
  await page.screenshot({ path: path.join(out, 's5-nojs-1300.png') });
  await page.mouse.wheel(0, 3000); await sleep(800);
  await page.screenshot({ path: path.join(out, 's5-nojs-4300.png') });
  await ctx.close();
  return o;
});

// E: mobile menu
await part('mobileMenu', async () => {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true, locale: 'en-US', userAgent: 'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36' });
  const page = await ctx.newPage();
  await page.goto('https://legora.com/', { waitUntil: 'load' });
  await sleep(4500);
  const o = {};
  o.before = await page.evaluate(() => { const m = [...document.querySelectorAll('a')].find(a => a.textContent.trim() === 'Menu'); const r = m.getBoundingClientRect(); return { href: m.getAttribute('href'), rect: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)], docW: document.documentElement.scrollWidth }; });
  await page.evaluate(() => { const m = [...document.querySelectorAll('a')].find(a => a.textContent.trim() === 'Menu'); m.click(); });
  await sleep(1200);
  await page.screenshot({ path: path.join(out, 's5-mobile-menu.png') });
  o.menuText = await page.evaluate(() => document.body.innerText.split('\n').map(s => s.trim()).filter(Boolean).slice(0, 40));
  o.bodyOverflow = await page.evaluate(() => getComputedStyle(document.body).overflow + ' / ' + getComputedStyle(document.documentElement).overflow);
  await ctx.close();
  return o;
});

// F: 1920 container
await part('wide1920', async () => {
  const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 }, locale: 'en-US' });
  const page = await ctx.newPage();
  await page.goto('https://legora.com/', { waitUntil: 'load' });
  await sleep(3500);
  const r = await page.evaluate(() => { const nav = [...document.querySelectorAll('a')].find(a => a.textContent.trim() === 'Product'); const login = [...document.querySelectorAll('a')].find(a => a.textContent.trim() === 'Log in'); const h1 = document.querySelector('h1'); const cta = [...document.querySelectorAll('a')].filter(a => a.textContent.trim().startsWith('Book a demo')).pop(); return { navX: Math.round(nav.getBoundingClientRect().x), loginRight: Math.round(login.getBoundingClientRect().right), h1fs: getComputedStyle(h1).fontSize, h1ls: getComputedStyle(h1).letterSpacing }; });
  await page.evaluate(() => window.scrollTo(0, 7000)); await sleep(1500);
  r.cards = await page.evaluate(() => [...document.querySelectorAll('img')].filter(i => { const b = i.getBoundingClientRect(); return b.width > 300 && b.width < 500 && b.height > 380 && i.naturalWidth <= 330; }).slice(0, 5).map(i => { const b = i.getBoundingClientRect(); return [Math.round(b.x), Math.round(b.width), Math.round(b.height)]; }));
  await ctx.close();
  return r;
});

fs.writeFileSync(path.join(out, 's5-results.json'), JSON.stringify(RES, null, 1));
await browser.close();
console.log('done', Object.keys(RES).map(k => k + (RES[k] && RES[k].error ? '!' : '')).join(' '));
