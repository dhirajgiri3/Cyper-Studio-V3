// iru.com card, script 4: first-load frame capture, lottie loop phases, mega-menu timing, AI-video behaviour under reduced motion.
// Observation only. Hover and scroll only; no clicks.
import { createRequire } from 'node:module';
import fs from 'node:fs';
const require = createRequire('/Users/dhirajgiri/Documents/Projects/Cyper studio/design-system/home-lab/tools/package.json');
const { chromium } = require('playwright-core');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUT = process.argv[2]; const SHOT = process.env.SHOT_DIR;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox', '--disable-blink-features=AutomationControlled'] });
const out = {};

// A. first-load frames (hero clip, jpeg), every ~as fast as screenshots allow
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' });
  const page = await ctx.newPage();
  await page.addInitScript(() => { window.__firstPaint = []; new PerformanceObserver(l => { for (const e of l.getEntries()) window.__firstPaint.push([e.name, Math.round(e.startTime)]); }).observe({ type: 'paint', buffered: true }); });
  const t0 = Date.now(); const frames = [];
  const nav = page.goto('https://www.iru.com/', { waitUntil: 'commit', timeout: 60000 });
  await nav;
  for (let i = 0; i < 14; i++) {
    const t = Date.now() - t0;
    try { await page.screenshot({ path: `${SHOT}/load-${String(i).padStart(2, '0')}.jpg`, type: 'jpeg', quality: 55, clip: { x: 0, y: 0, width: 1440, height: 900 } }); frames.push(t); } catch (e) { frames.push('err'); }
    await sleep(120);
  }
  out.loadFrames = frames;
  await sleep(2000);
  out.paint = await page.evaluate(() => window.__firstPaint).catch(() => null);
  out.entrance = await page.evaluate(() => { const h1 = document.querySelector('h1'); const s = getComputedStyle(h1); const c = document.querySelector('#homepage-hero-lottie'); const f = document.querySelector('form.hs-form'); const g = x => { const q = getComputedStyle(x); return { opacity: q.opacity, transform: q.transform, translate: q.translate, transition: q.transition.slice(0, 80), anim: q.animationName }; }; return { h1: g(h1), lottieBox: g(c), form: f ? g(f) : null, anyFadeIn: document.querySelectorAll('[class*="fade-in"],[class*="animate-"]').length, fadeInEls: [...document.querySelectorAll('[class*="fade-in"],[class*="animate-"]')].slice(0, 6).map(e => e.tagName + '.' + String(e.className).slice(0, 80)) }; });
  // lottie loop phases
  const fr = [0, 120, 240, 360, 480, 600, 720, 840, 940];
  out.phases = [];
  for (const f of fr) { await page.evaluate(ff => { const a = window.lottie.getRegisteredAnimations()[0]; a.goToAndStop(ff, true); }, f); await sleep(250); await page.screenshot({ path: `${SHOT}/phase-${String(f).padStart(3, '0')}.jpg`, type: 'jpeg', quality: 60, clip: { x: 620, y: 122, width: 820, height: 720 } }); out.phases.push(f); }
  await ctx.close();
}

// B. mega menu timing + screenshot (hover at coordinates; nav items are not links)
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' });
  const page = await ctx.newPage();
  await page.goto('https://www.iru.com/', { waitUntil: 'load', timeout: 60000 }); await sleep(3500);
  out.navItems = await page.evaluate(() => [...document.querySelectorAll('#iru-header li')].map(li => { const t = li.querySelector('div.px-3'); return t ? { text: t.innerText.trim().slice(0, 20), tag: t.tagName, role: t.getAttribute('role'), tabindex: t.getAttribute('tabindex'), ariaExpanded: t.getAttribute('aria-expanded'), hasButton: !!li.querySelector('button'), focusable: !!li.querySelector('a[href],button'), rect: [Math.round(t.getBoundingClientRect().left), Math.round(t.getBoundingClientRect().top), Math.round(t.getBoundingClientRect().width), Math.round(t.getBoundingClientRect().height)], cls: t.className.slice(0, 80), color: getComputedStyle(t).color, tr: getComputedStyle(t).transition } : null; }).filter(Boolean));
  await page.evaluate(() => { window.__ms = []; });
  await page.mouse.move(2, 600); await sleep(200);
  await page.evaluate(() => { window.__ms = []; const t0 = performance.now(); const tick = () => { const panels = [...document.querySelectorAll('#iru-header div.inset-x-0.absolute.z-10')]; const p = panels.find(p => getComputedStyle(p).display !== 'none'); if (p) { const s = getComputedStyle(p); window.__ms.push([Math.round(performance.now() - t0), s.opacity, s.transform === 'none' ? 'none' : 'ty=' + s.transform.split(',')[5]]); } if (performance.now() - t0 < 900) requestAnimationFrame(tick); }; requestAnimationFrame(tick); });
  await page.mouse.move(501, 81); await sleep(1000);
  out.menuSamples = await page.evaluate(() => { const s = window.__ms; const keep = []; let last = ''; for (const r of s) { const k = r[1] + r[2]; if (k !== last) { keep.push(r); last = k; } } return { n: s.length, keep: keep.slice(0, 30) }; });
  out.menuPanel = await page.evaluate(() => { const p = [...document.querySelectorAll('#iru-header div.inset-x-0.absolute.z-10')].find(p => getComputedStyle(p).display !== 'none'); if (!p) return null; const s = getComputedStyle(p); const inner = p.firstElementChild; const is = getComputedStyle(inner); return { rect: p.getBoundingClientRect().toJSON(), bg: s.backgroundColor, shadow: s.boxShadow, border: s.borderTop, innerBg: is.backgroundColor, innerRadius: is.borderRadius, innerW: Math.round(inner.getBoundingClientRect().width), innerShadow: is.boxShadow, innerPad: is.padding, links: [...p.querySelectorAll('a')].slice(0, 16).map(a => a.innerText.trim().replace(/\n+/g, ' / ').slice(0, 44)) }; });
  await page.screenshot({ path: SHOT + '/menu-products.png', clip: { x: 0, y: 0, width: 1440, height: 640 } });
  await page.mouse.move(2, 700); await sleep(600);
  out.menuAfterLeave = await page.evaluate(() => [...document.querySelectorAll('#iru-header div.inset-x-0.absolute.z-10')].filter(p => getComputedStyle(p).display !== 'none').length);
  await ctx.close();
}

// C. AI video under reduced motion + hover reveal of the pause control
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US', reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto('https://www.iru.com/', { waitUntil: 'load', timeout: 60000 }); await sleep(3000);
  const top = await page.evaluate(() => { const v = [...document.querySelectorAll('video')].find(v => v.getBoundingClientRect().width > 1000); return v.getBoundingClientRect().top + scrollY; });
  await page.evaluate(y => window.scrollTo({ top: y - 90, behavior: 'instant' }), top); await sleep(3500);
  const snap = () => page.evaluate(() => { const v = [...document.querySelectorAll('video')].find(v => v.getBoundingClientRect().width > 1000); return { paused: v.paused, t: Math.round(v.currentTime * 100) / 100, rs: v.readyState, src: !!(v.currentSrc), btn: (() => { const b = v.parentElement.querySelector('button'); return b ? [b.getAttribute('aria-label'), getComputedStyle(b).opacity] : null; })() }; });
  out.aiVideoReduced = { a: await snap() }; await sleep(2000); out.aiVideoReduced.b = await snap();
  await page.mouse.move(720, 450); await sleep(600); out.aiVideoReduced.hover = await snap();
  await ctx.close();
}
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' });
  const page = await ctx.newPage();
  await page.goto('https://www.iru.com/', { waitUntil: 'load', timeout: 60000 }); await sleep(3000);
  const top = await page.evaluate(() => { const v = [...document.querySelectorAll('video')].find(v => v.getBoundingClientRect().width > 1000); return v.getBoundingClientRect().top + scrollY; });
  await page.evaluate(y => window.scrollTo({ top: y - 90, behavior: 'instant' }), top); await sleep(2500);
  await page.mouse.move(720, 450); await sleep(700);
  out.aiVideoHover = await page.evaluate(() => { const v = [...document.querySelectorAll('video')].find(v => v.getBoundingClientRect().width > 1000); const b = v.parentElement.querySelector('button'); return { btnOpacity: getComputedStyle(b).opacity, label: b.getAttribute('aria-label'), paused: v.paused }; });
  await page.screenshot({ path: SHOT + '/ai-hover.png', clip: { x: 1100, y: 700, width: 340, height: 200 } });
  // overscan: bytes of video fetched so far
  out.videoBytes = await page.evaluate(() => performance.getEntriesByType('resource').filter(e => /\.(mp4|webm)/.test(e.name)).map(e => ({ n: e.name.replace(/^.*\//, ''), enc: e.encodedBodySize, xfer: e.transferSize, dec: e.decodedBodySize })));
  await ctx.close();
}
fs.writeFileSync(OUT, JSON.stringify(out, null, 1));
await browser.close(); console.log('ok');
