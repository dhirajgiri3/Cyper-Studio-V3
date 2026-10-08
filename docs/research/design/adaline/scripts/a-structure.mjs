// adaline.ai home: section map, canvas location, asset sizes, tokens, hover/focus diffs, header on scroll.
// Observation only. No clicks, no forms. Run: node a-structure.mjs <outJson>
import { chromium } from '/Users/dhirajgiri/Documents/Projects/Cyper studio/design-system/home-lab/tools/node_modules/playwright-core/index.mjs';
import fs from 'node:fs';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUT = process.argv[2] || 'a.json';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' });
const page = await ctx.newPage();
const out = {};
await page.goto('https://www.adaline.ai/', { waitUntil: 'load', timeout: 60000 });
await sleep(3500);

// 1. scroll the full page in steps so lazy assets load, then come back
const H = await page.evaluate(() => document.documentElement.scrollHeight);
out.pageHeight = H;
for (let y = 0; y < H; y += 600) { await page.mouse.wheel(0, 600); await sleep(120); }
await sleep(1500);
await page.evaluate(() => window.scrollTo(0, 0));
await sleep(800);

// 2. section map
out.sections = await page.evaluate(() => {
  const main = document.querySelector('main');
  const rows = [];
  const walk = (el, depth) => {
    if (depth > 2) return;
    for (const c of el.children) {
      const r = c.getBoundingClientRect();
      if (r.height < 40) continue;
      const s = getComputedStyle(c);
      rows.push({ depth, tag: c.tagName.toLowerCase(), cls: String(c.className).slice(0, 110), top: Math.round(r.top + scrollY), h: Math.round(r.height), w: Math.round(r.width), bg: s.backgroundColor, bgImg: s.backgroundImage === 'none' ? null : s.backgroundImage.slice(0, 80), pt: s.paddingTop, pb: s.paddingBottom, text: (c.innerText || '').trim().replace(/\s+/g, ' ').slice(0, 70) });
      if (depth < 1) walk(c, depth + 1);
    }
  };
  walk(main, 0);
  return rows;
});

// 3. canvas, video, picture, all imgs (not marquee dupes), bg images in whole page
out.canvas = await page.evaluate(() => [...document.querySelectorAll('canvas')].map(c => { const r = c.getBoundingClientRect(); const chain = []; let p = c; for (let i = 0; i < 5 && p; i++, p = p.parentElement) chain.push(p.tagName.toLowerCase() + '.' + String(p.className).slice(0, 60)); return { w: c.width, h: c.height, top: Math.round(r.top + scrollY), height: Math.round(r.height), widthR: Math.round(r.width), chain, style: c.getAttribute('style') }; }));
out.videos = await page.evaluate(() => [...document.querySelectorAll('video')].map(v => ({ src: v.currentSrc, poster: v.poster })));
out.imgsNonLogo = await page.evaluate(() => [...document.querySelectorAll('img')].filter(i => !/\/logos\/Customers\//.test(i.currentSrc || i.src)).map(i => { const r = i.getBoundingClientRect(); return { src: (i.currentSrc || i.src).slice(0, 160), natural: [i.naturalWidth, i.naturalHeight], w: Math.round(r.width), h: Math.round(r.height), top: Math.round(r.top + scrollY), loading: i.loading, fp: i.getAttribute('fetchpriority'), alt: (i.alt || '').slice(0, 40), srcset: (i.srcset || '').slice(0, 100), inPicture: !!i.closest('picture') }; }));
out.logoImgCount = await page.evaluate(() => document.querySelectorAll('img[src*="/logos/Customers/"]').length);
out.uniqueLogoFiles = await page.evaluate(() => [...new Set([...document.querySelectorAll('img[src*="/logos/Customers/"]')].map(i => i.getAttribute('src')))].length);
out.bgImgsAll = await page.evaluate(() => { const o = []; for (const e of document.querySelectorAll('body *')) { const s = getComputedStyle(e); if (s.backgroundImage !== 'none') { const r = e.getBoundingClientRect(); o.push({ tag: e.tagName.toLowerCase(), cls: String(e.className).slice(0, 50), top: Math.round(r.top + scrollY), w: Math.round(r.width), h: Math.round(r.height), bg: s.backgroundImage.slice(0, 150) }); } } return o.slice(0, 40); });
out.svgs = await page.evaluate(() => [...document.querySelectorAll('svg')].map(s => { const r = s.getBoundingClientRect(); return { top: Math.round(r.top + scrollY), w: Math.round(r.width), h: Math.round(r.height), paths: s.querySelectorAll('path').length, cls: String(s.className && s.className.baseVal || '').slice(0, 40) }; }).filter(s => s.w > 60 && s.h > 60));

// 4. resources with sizes
out.resources = await page.evaluate(() => performance.getEntriesByType('resource').map(r => ({ n: r.name.replace('https://www.adaline.ai', '').slice(0, 130), t: r.initiatorType, enc: r.encodedBodySize, xfer: r.transferSize, dec: r.decodedBodySize, start: Math.round(r.startTime), dur: Math.round(r.duration) })));

// 5. :root tokens (custom properties declared on :root in stylesheets)
out.tokens = await page.evaluate(() => {
  const o = {};
  for (const sh of document.styleSheets) {
    let rules; try { rules = sh.cssRules; } catch { continue; }
    for (const r of rules) {
      if (r.selectorText === ':root' || r.selectorText === ':root, :host' || r.selectorText === 'html') {
        for (const p of r.style) if (p.startsWith('--') && !p.startsWith('--tw-')) o[p] = r.style.getPropertyValue(p).trim().slice(0, 80);
      }
    }
  }
  return o;
});

// 6. font faces
out.fontFaces = await page.evaluate(() => [...document.fonts].map(f => ({ family: f.family, weight: f.weight, style: f.style, status: f.status })));

// 7. ASCII pre
out.pre = await page.evaluate(() => { const pre = document.querySelector('pre'); if (!pre) return null; const s = getComputedStyle(pre); const r = pre.getBoundingClientRect(); return { top: Math.round(r.top + scrollY), left: Math.round(r.left), w: Math.round(r.width), h: Math.round(r.height), font: s.fontFamily.slice(0, 60), size: s.fontSize, lh: s.lineHeight, ls: s.letterSpacing, color: s.color, opacity: s.opacity, ariaHidden: pre.getAttribute('aria-hidden'), parentCls: String(pre.parentElement.className).slice(0, 100), chars: pre.textContent.length, lines: pre.textContent.split('\n').length, cols: pre.textContent.split('\n')[0].length }; });
out.preSvg = await page.evaluate(() => { const pre = document.querySelector('pre'); const wrap = pre && pre.parentElement; const svg = wrap && wrap.querySelector('svg'); if (!svg) return null; const p = svg.querySelector('path'); const s = getComputedStyle(p); return { d: (p.getAttribute('d') || '').slice(0, 60), stroke: s.stroke, sw: s.strokeWidth, dash: s.strokeDasharray, dashoff: s.strokeDashoffset, op: s.opacity, style: svg.getAttribute('style'), pathLen: p.getTotalLength ? Math.round(p.getTotalLength()) : null }; });

// 8. hover / focus / transition diffs
const PROPS = ['backgroundColor', 'color', 'borderColor', 'transform', 'opacity', 'boxShadow', 'outlineStyle', 'outlineColor', 'outlineWidth', 'outlineOffset', 'textDecorationLine'];
const snap = (sel, idx = 0) => page.evaluate(([sel, idx, PROPS]) => { const el = [...document.querySelectorAll(sel)][idx]; if (!el) return null; const s = getComputedStyle(el); const o = { transition: s.transition.slice(0, 200), cursor: s.cursor }; for (const p of PROPS) o[p] = s[p]; const r = el.getBoundingClientRect(); o.rect = [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)]; o.text = (el.innerText || '').trim().slice(0, 30); return o; }, [sel, idx, PROPS]);
const hoverTargets = [
  ['hero primary', 'a[href]:has-text("Get Started")', 1],
  ['hero secondary', 'a:has-text("Read Docs")', 0],
  ['nav Docs', 'nav a:has-text("Docs")', 0],
  ['nav Get Started', 'nav a:has-text("Get Started")', 0],
  ['eyebrow chip', 'a:has-text("The Self-Improving Agent")', 0],
];
out.hover = {};
for (const [name, sel, idx] of hoverTargets) {
  try {
    const loc = page.locator(sel).nth(idx);
    await loc.scrollIntoViewIfNeeded({ timeout: 2000 }).catch(() => {});
    const handle = await loc.elementHandle();
    const before = await handle.evaluate((el, PROPS) => { const s = getComputedStyle(el); const o = { transition: s.transition.slice(0, 220) }; for (const p of PROPS) o[p] = s[p]; o.text = (el.innerText || '').trim().slice(0, 30); return o; }, PROPS);
    await loc.hover({ timeout: 2000 });
    await sleep(700);
    const hov = await handle.evaluate((el, PROPS) => { const s = getComputedStyle(el); const o = {}; for (const p of PROPS) o[p] = s[p]; return o; }, PROPS);
    await page.keyboard.press('Tab'); // move away from hover target focus order irrelevant
    await page.mouse.move(5, 500); await sleep(500);
    await loc.focus({ timeout: 1500 }).catch(() => {});
    await page.keyboard.press('Shift+Tab'); await page.keyboard.press('Tab'); await sleep(400);
    const foc = await handle.evaluate((el, PROPS) => { const s = getComputedStyle(el); const o = { focused: document.activeElement === el, focusVisible: el.matches(':focus-visible') }; for (const p of PROPS) o[p] = s[p]; return o; }, PROPS);
    const diffH = {}; for (const p of PROPS) if (before[p] !== hov[p]) diffH[p] = [before[p], hov[p]];
    const diffF = {}; for (const p of PROPS) if (before[p] !== foc[p]) diffF[p] = [before[p], foc[p]];
    out.hover[name] = { text: before.text, transition: before.transition, hoverDiff: diffH, focusVisible: foc.focusVisible, focusDiff: diffF };
  } catch (e) { out.hover[name] = { error: String(e.message).slice(0, 120) }; }
}
await page.mouse.move(5, 500);
await page.evaluate(() => window.scrollTo(0, 0)); await sleep(600);

// 9. header on scroll
const navSnap = () => page.evaluate(() => { const n = document.querySelector('nav'); const s = getComputedStyle(n); const kids = [...n.querySelectorAll('div')].slice(0, 8).map(d => { const t = getComputedStyle(d); return { cls: String(d.className).slice(0, 60), bg: t.backgroundColor, bf: t.backdropFilter, bb: t.borderBottom, bt: t.borderBottomColor, tr: t.transition.slice(0, 100), op: t.opacity, tf: t.transform }; }); return { pos: s.position, bg: s.backgroundColor, bf: s.backdropFilter, bb: s.borderBottom, shadow: s.boxShadow, tf: s.transform, tr: s.transition.slice(0, 160), h: n.getBoundingClientRect().height, kids }; });
out.navAt = {};
for (const y of [0, 40, 120, 400, 1500, 6000]) { await page.evaluate(yy => window.scrollTo(0, yy), y); await sleep(700); out.navAt[y] = await navSnap(); }
await page.evaluate(() => window.scrollTo(0, 0));
await browser.close();
fs.writeFileSync(OUT, JSON.stringify(out, null, 1));
console.log('ok', Object.keys(out).join(','));
