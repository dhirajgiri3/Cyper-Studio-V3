// Small checks: logo marquee styling, stat-number count-up?, cursor/pointer effects on hero frame, page-level hover on hero frame.
import { chromium } from '/Users/dhirajgiri/Documents/Projects/Cyper studio/design-system/home-lab/tools/node_modules/playwright-core/index.mjs';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' });
const page = await ctx.newPage();
await page.goto('https://modeinspect.com/', { waitUntil: 'load' });
await sleep(2500);
const R = {};
R.logos = await page.evaluate(() => { const m = document.querySelector('.animate-marquee'); const imgs = [...m.querySelectorAll('img')].slice(0, 3); const par = m.parentElement; const gp = par.parentElement; return { imgs: imgs.map(i => { const s = getComputedStyle(i); return { alt: i.alt, op: s.opacity, filter: s.filter, w: Math.round(i.getBoundingClientRect().width), h: Math.round(i.getBoundingClientRect().height), nat: [i.naturalWidth, i.naturalHeight], loading: i.loading, fp: i.getAttribute('fetchpriority'), cur: i.currentSrc.replace('https://modeinspect.com', '') }; }), parentOp: getComputedStyle(par).opacity, parentCls: String(par.className).slice(0, 100), gpCls: String(gp.className).slice(0, 100), mask: getComputedStyle(par).maskImage.slice(0, 80) || getComputedStyle(gp).maskImage.slice(0, 80), wrapper: { op: getComputedStyle(m).opacity, mixed: getComputedStyle(m).mixBlendMode } }; });
// stat count-up?
await page.evaluate(() => { const h = [...document.querySelectorAll('h2')].find(h => /Production-grade/.test(h.innerText)); scrollTo(0, h.getBoundingClientRect().top + scrollY - 300); });
await page.evaluate(() => { window.__st = []; const t0 = performance.now(); const tick = () => { const els = [...document.querySelectorAll('main *')].filter(e => e.children.length <= 2 && /^(\d+)\s*(days?|%)?$/.test((e.innerText || '').trim()) && e.getBoundingClientRect().width > 0).slice(0, 3); window.__st.push([Math.round(performance.now() - t0), els.map(e => e.innerText.trim().replace(/\n/g, ''))]); if (performance.now() - t0 < 1500) requestAnimationFrame(tick); }; requestAnimationFrame(tick); });
await sleep(1800);
const st = await page.evaluate(() => window.__st); const uniq = new Set(st.map(s => JSON.stringify(s[1])));
R.statSamples = { n: st.length, uniqueStates: [...uniq] };
// hero frame: does it react to pointer? compare DOM text/transform of frame before/after moving mouse
await page.evaluate(() => scrollTo(0, 0)); await sleep(800);
const snap = () => page.evaluate(() => { const f = document.querySelector('main section .mt-16.max-w-\\[1200px\\]'); return { html: f.innerHTML.length, tr: [...f.querySelectorAll('*')].filter(e => getComputedStyle(e).transform !== 'none').map(e => e.className.toString().slice(0, 30) + ':' + getComputedStyle(e).transform.slice(0, 30)).slice(0, 5), anims: f.getAnimations({ subtree: true }).length }; });
R.heroBefore = await snap();
await page.mouse.move(700, 700, { steps: 10 }); await sleep(300); await page.mouse.move(900, 780, { steps: 10 }); await sleep(600);
R.heroAfterPointer = await snap();
// hero frame idle animations (cursor sprite etc.)
R.heroIdleRaf = await page.evaluate(async () => { let n = 0; const o = window.requestAnimationFrame; window.requestAnimationFrame = function (cb) { n++; return o.call(this, cb); }; await new Promise(r => setTimeout(r, 2000)); window.requestAnimationFrame = o; return n / 2; });
console.log(JSON.stringify(R, null, 0));
await browser.close();
