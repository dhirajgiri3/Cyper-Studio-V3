// Deeper-section behaviour: sticky "merge" section (scroll-driven or hover/click?), footer art hover, stats/CTA section.
import { chromium } from '/Users/dhirajgiri/Documents/Projects/Cyper studio/design-system/home-lab/tools/node_modules/playwright-core/index.mjs';
import fs from 'node:fs';
import path from 'node:path';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const out = process.argv[2];
const R = {};
const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' });
const page = await ctx.newPage();
await page.goto('https://modeinspect.com/', { waitUntil: 'load' });
await sleep(2000);
for (let y = 0; y < 11500; y += 700) { await page.evaluate(v => scrollTo(0, v), y); await sleep(100); }
// ---- merge section: step through, record row emphasis + right-card title
const sec = await page.evaluate(() => { const h = [...document.querySelectorAll('h2')].find(h => /Code your engineers/.test(h.innerText)); const s = h.closest('section'); const r = s.getBoundingClientRect(); const rows = [...s.querySelectorAll('button,[role=tab],li')].filter(e => /Type-safe changes|No generated UI debt|Reviewed like any PR/.test(e.innerText) && e.innerText.length < 60).map(e => ({ tag: e.tagName, role: e.getAttribute('role'), sel: e.getAttribute('aria-selected') || e.getAttribute('aria-expanded') || e.getAttribute('aria-current'), t: e.innerText.slice(0, 30) })); return { top: Math.round(r.top + scrollY), h: Math.round(r.height), rows, sticky: [...s.querySelectorAll('*')].filter(e => getComputedStyle(e).position === 'sticky').map(e => ({ cls: String(e.className).slice(0, 60), top: getComputedStyle(e).top, h: Math.round(e.getBoundingClientRect().height) })) }; });
R.mergeSection = sec;
R.mergeSteps = [];
for (let y = sec.top - 100; y < sec.top + sec.h; y += 150) {
  await page.evaluate(v => scrollTo(0, v), y); await sleep(700);
  R.mergeSteps.push(await page.evaluate(() => { const s = [...document.querySelectorAll('h2')].find(h => /Code your engineers/.test(h.innerText)).closest('section'); const rows = [...s.querySelectorAll('button,[role=tab]')].filter(e => /Type-safe changes|No generated UI debt|Reviewed like any PR/.test(e.innerText) && e.innerText.length < 60); const card = [...s.querySelectorAll('h3')].map(h => h.innerText.slice(0, 26)); return { y: Math.round(scrollY), rows: rows.map(r => [r.innerText.trim().slice(0, 14), getComputedStyle(r).color, r.getAttribute('aria-selected') || r.getAttribute('aria-expanded')]), card }; }));
}
// row interaction: hover (no click) to see whether hover switches the card
try {
  await page.evaluate(v => scrollTo(0, v), sec.top + 200); await sleep(900);
  const rows = page.locator('section button', { hasText: 'No generated UI debt' });
  const before = await page.evaluate(() => [...document.querySelectorAll('h3')].filter(h => /Type-safe|No generated|Reviewed/.test(h.innerText)).map(h => h.innerText));
  await rows.first().hover(); await sleep(700);
  const afterHover = await page.evaluate(() => [...document.querySelectorAll('h3')].filter(h => /Type-safe|No generated|Reviewed/.test(h.innerText)).map(h => h.innerText));
  R.mergeHover = { before, afterHover };
  // click (local UI state only), sample the card transition
  await page.evaluate(() => { window.__c = []; const t0 = performance.now(); const tick = () => { const c = [...document.querySelectorAll('h3')].filter(h => /No generated UI debt\.|Type-safe changes\./.test(h.innerText)); window.__c.push([Math.round(performance.now() - t0), c.map(h => [h.innerText.slice(0, 12), +(+getComputedStyle(h.closest('[class*=rounded]') || h).opacity).toFixed(2)])]); if (performance.now() - t0 < 900) requestAnimationFrame(tick); }; requestAnimationFrame(tick); });
  await rows.first().click(); await sleep(1100);
  R.mergeClick = (await page.evaluate(() => window.__c)).filter((_, i) => i % 5 === 0).slice(0, 10);
  await page.screenshot({ path: path.join(out, 'r2-merge-after-click.png') });
} catch (e) { R.mergeErr = String(e.message).slice(0, 140); }

// ---- footer art hover
try {
  await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight)); await sleep(1200);
  const art = await page.evaluate(() => { const f = document.querySelector('footer'); const box = [...f.querySelectorAll('div')].find(d => /@container/.test(d.className) || (d.className || '').includes('@container')); const r = box && box.getBoundingClientRect(); return box ? { x: Math.round(r.left), y: Math.round(r.top), w: Math.round(r.width), h: Math.round(r.height), svgs: box.querySelectorAll('svg').length, canv: box.querySelectorAll('canvas').length, anims: box.getAnimations({ subtree: true }).map(a => (a.animationName || a.constructor.name) + ':' + (a.effect && a.effect.getTiming().duration)), imgs: box.querySelectorAll('img').length, text: box.innerText.replace(/\n/g, ' ').slice(0, 80), aria: box.getAttribute('aria-hidden') } : null; });
  R.footerArt = art;
  if (art) {
    const raf0 = await page.evaluate(() => { window.__r = 0; const o = window.requestAnimationFrame; window.requestAnimationFrame = function (cb) { window.__r++; return o.call(this, cb); }; return 0; });
    await page.mouse.move(2, 400); await sleep(800); const idle0 = await page.evaluate(() => window.__r); await sleep(1500); const idle1 = await page.evaluate(() => window.__r);
    await page.mouse.move(art.x + art.w / 2, art.y + art.h / 2, { steps: 8 }); await sleep(300); const h0 = await page.evaluate(() => window.__r); 
    await page.screenshot({ path: path.join(out, 'r2-footer-art-hover-a.png'), clip: { x: art.x, y: art.y, width: art.w, height: art.h } });
    await page.mouse.move(art.x + art.w * 0.8, art.y + art.h * 0.3, { steps: 12 }); await sleep(400);
    await page.screenshot({ path: path.join(out, 'r2-footer-art-hover-b.png'), clip: { x: art.x, y: art.y, width: art.w, height: art.h } });
    await sleep(1200); const h1 = await page.evaluate(() => window.__r);
    R.footerArtRaf = { idlePerSec: +((idle1 - idle0) / 1.5).toFixed(1), hoverPerSec: +((h1 - h0) / 1.6).toFixed(1) };
    R.footerArtTransforms = await page.evaluate(() => { const f = document.querySelector('footer'); return [...f.querySelectorAll('svg, svg *, [style*="transform"]')].filter(e => (e.getAttribute('style') || '').includes('transform') || e.hasAttribute('transform')).slice(0, 6).map(e => (e.tagName + ':' + (e.getAttribute('style') || e.getAttribute('transform') || '')).slice(0, 110)); });
  }
} catch (e) { R.footerErr = String(e.message).slice(0, 140); }
fs.writeFileSync(path.join(path.dirname(process.argv[1]), 'deep-output.json'), JSON.stringify(R, null, 1));
console.log(JSON.stringify(R, null, 0).slice(0, 7000));
await browser.close();
