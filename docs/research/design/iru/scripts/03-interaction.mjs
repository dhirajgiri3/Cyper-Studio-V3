// iru.com card, script 3: hover/focus computed-style diffs, mega-menu motion, section screenshots, extended scroll-linked scan.
// Observation only: mouse moves and Tab key presses; no clicks, no typing, no submits.
import { createRequire } from 'node:module';
import fs from 'node:fs';
const require = createRequire('/Users/dhirajgiri/Documents/Projects/Cyper studio/design-system/home-lab/tools/package.json');
const { chromium } = require('playwright-core');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUT = process.argv[2]; const SHOT = process.env.SHOT_DIR;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox', '--disable-blink-features=AutomationControlled'] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' });
const page = await ctx.newPage();
await page.goto('https://www.iru.com/', { waitUntil: 'load', timeout: 60000 });
await sleep(4500);
const out = {};
const PROPS = ['color', 'backgroundColor', 'borderTopColor', 'boxShadow', 'transform', 'translate', 'scale', 'opacity', 'outlineStyle', 'outlineColor', 'outlineWidth', 'outlineOffset', 'textDecorationLine', 'filter', 'borderRadius'];
const styleOf = (sel, nth = 0) => page.evaluate(([sel, nth, PROPS]) => { const els = [...document.querySelectorAll(sel)]; const el = els[nth]; if (!el) return null; const s = getComputedStyle(el); const o = { _text: (el.innerText || el.value || el.getAttribute('aria-label') || '').slice(0, 40).replace(/\n/g, ' '), _rect: [Math.round(el.getBoundingClientRect().left), Math.round(el.getBoundingClientRect().top), Math.round(el.getBoundingClientRect().width), Math.round(el.getBoundingClientRect().height)] }; for (const p of PROPS) o[p] = s[p]; o._tr = [s.transitionProperty, s.transitionDuration, s.transitionTimingFunction, s.transitionDelay].join(' | '); o._cursor = s.cursor; return o; }, [sel, nth, PROPS]);
const diff = (a, b) => { if (!a || !b) return null; const d = {}; for (const k of Object.keys(a)) if (!k.startsWith('_') && a[k] !== b[k]) d[k] = [a[k], b[k]]; return d; };

const targets = [
  ['header CTA Book a demo', '#iru-header header a[href*="demo"], #iru-header header a:last-of-type', 0],
  ['header Login', '#iru-header header a', -1],
  ['banner link', '#iru-header a', 0],
];
// find elements by visible text instead (robust)
const byText = async (txt, scopeSel = 'body') => page.evaluate(([txt, scopeSel]) => { const els = [...document.querySelectorAll(scopeSel + ' a, ' + scopeSel + ' button')].filter(e => (e.innerText || '').trim() === txt && e.getBoundingClientRect().width > 0); const e = els[0]; if (!e) return null; e.setAttribute('data-probe', txt); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, absY: r.top + scrollY }; }, [txt, scopeSel]);

async function hoverDiff(label, txt, scope = 'body', scrollTo = null) {
  if (scrollTo !== null) { await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), scrollTo); await sleep(500); }
  const pos = await byText(txt, scope); if (!pos) return out.hover[label] = 'NOT FOUND';
  const sel = `[data-probe="${txt}"]`;
  await page.mouse.move(2, 400); await sleep(350);
  const before = await styleOf(sel);
  await page.mouse.move(pos.x, pos.y); await sleep(500);
  const after = await styleOf(sel);
  out.hover[label] = { rect: before._rect, text: before._text, transition: before._tr, cursor: after._cursor, diff: diff(before, after), before: { color: before.color, bg: before.backgroundColor, border: before.borderTopColor, radius: before.borderRadius } };
  await page.mouse.move(2, 400); await sleep(200);
}
out.hover = {};
await hoverDiff('header Book a demo (primary)', 'Book a demo', '#iru-header');
await hoverDiff('header Login (secondary)', 'Login', '#iru-header');
await hoverDiff('header nav Pricing', 'Pricing', '#iru-header');
await hoverDiff('announcement banner', 'Introducing Iru MCP', '#iru-header');
// hero form submit (hover only)
const heroBtn = await page.evaluate(() => { const b = document.querySelector('form.hs-form input[type=submit], form.hs-form button[type=submit]'); if (!b) return null; b.setAttribute('data-probe', 'herosubmit'); const s = getComputedStyle(b); const r = b.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, tag: b.tagName, text: b.value || b.innerText }; });
if (heroBtn) { const sel = '[data-probe="herosubmit"]'; const before = await styleOf(sel); await page.mouse.move(heroBtn.x, heroBtn.y); await sleep(500); const after = await styleOf(sel); out.hover['hero form submit'] = { tag: heroBtn.tag, text: heroBtn.text, rect: before._rect, transition: before._tr, cursor: after._cursor, diff: diff(before, after), before: { color: before.color, bg: before.backgroundColor, radius: before.borderRadius } }; await page.mouse.move(2, 400); await sleep(200); }
// hero input focus style (programmatic focus, no typing)
out.heroInput = await page.evaluate(async () => { const i = document.querySelector('form.hs-form input[type=email]'); if (!i) return null; const pick = () => { const s = getComputedStyle(i); const w = i.closest('form'); const ws = getComputedStyle(w); return { border: s.border, bg: s.backgroundColor, color: s.color, font: s.fontSize + '/' + s.lineHeight, outline: s.outline, shadow: s.boxShadow, radius: s.borderRadius, h: i.getBoundingClientRect().height, placeholderColor: getComputedStyle(i, '::placeholder').color, formBorder: ws.border, formShadow: ws.boxShadow, formRadius: ws.borderRadius, formBg: ws.backgroundColor, formPad: ws.padding, tr: s.transition }; }; const a = pick(); i.focus(); await new Promise(r => setTimeout(r, 300)); const b = pick(); i.blur(); const fs = [...document.querySelectorAll('form.hs-form')].map(f => ({ w: f.getBoundingClientRect().width, hsInputs: f.querySelectorAll('input:not([type=hidden])').length })); return { rest: a, focus: b, forms: fs }; });
await hoverDiff('View Endpoint Overview (dark button)', 'View Endpoint Overview', 'body', 1100);
await hoverDiff('product row link (Endpoint Management)', 'Endpoint Management', 'body', 1300);
await hoverDiff('Explore Iru AI (white btn on dark)', 'Explore Iru AI', 'body', 3750);

// mega menu: hover Products, sample opacity/transform of the panel over time
await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' })); await sleep(500);
await page.mouse.move(2, 400); await sleep(300);
const pos = await byText('Products', '#iru-header header');
out.menu = {};
if (pos) {
  await page.evaluate(() => { window.__menuSamples = []; const t0 = performance.now(); const tick = () => { const panels = [...document.querySelectorAll('#iru-header div.inset-x-0.absolute.z-10')]; const p = panels.find(p => getComputedStyle(p).display !== 'none'); if (p) { const s = getComputedStyle(p); window.__menuSamples.push([Math.round(performance.now() - t0), s.opacity, s.transform === 'none' ? 'none' : s.transform.replace('matrix(1, 0, 0, 1, 0, ', 'ty=').replace(')', '')]); } if (performance.now() - t0 < 700) requestAnimationFrame(tick); }; requestAnimationFrame(tick); });
  await page.mouse.move(pos.x, pos.y); await sleep(900);
  out.menu.samples = await page.evaluate(() => { const s = window.__menuSamples; const keep = []; let last = ''; for (const r of s) { const k = r[1] + r[2]; if (k !== last) { keep.push(r); last = k; } } return keep.slice(0, 24); });
  out.menu.panel = await page.evaluate(() => { const p = [...document.querySelectorAll('#iru-header div.inset-x-0.absolute.z-10')].find(p => getComputedStyle(p).display !== 'none'); if (!p) return null; const s = getComputedStyle(p); const inner = p.firstElementChild; const is = getComputedStyle(inner); return { rect: p.getBoundingClientRect().toJSON(), bg: s.backgroundColor, shadow: s.boxShadow, border: s.borderTop, innerBg: is.backgroundColor, innerRadius: is.borderRadius, innerW: inner.getBoundingClientRect().width, innerShadow: is.boxShadow, innerPad: is.padding, tr: s.transition, links: [...p.querySelectorAll('a')].slice(0, 14).map(a => a.innerText.trim().replace(/\n+/g, ' / ').slice(0, 40)) }; });
  await page.screenshot({ path: SHOT + '/menu-products.png', clip: { x: 0, y: 0, width: 1440, height: 560 } });
  await page.mouse.move(2, 600); await sleep(500);
}
// Tab-order focus rings
await page.evaluate(() => { document.activeElement && document.activeElement.blur(); window.scrollTo({ top: 0, behavior: 'instant' }); });
out.focus = [];
for (let i = 0; i < 16; i++) { await page.keyboard.press('Tab'); await sleep(120); out.focus.push(await page.evaluate(() => { const e = document.activeElement; if (!e || e === document.body) return null; const s = getComputedStyle(e); const r = e.getBoundingClientRect(); return { tag: e.tagName.toLowerCase(), text: (e.innerText || e.value || e.getAttribute('aria-label') || '').trim().slice(0, 28).replace(/\n/g, ' '), outline: s.outlineStyle + ' ' + s.outlineWidth + ' ' + s.outlineColor + ' off ' + s.outlineOffset, shadow: s.boxShadow.slice(0, 80), rect: [Math.round(r.left), Math.round(r.top), Math.round(r.width), Math.round(r.height)] }; })); }
await page.screenshot({ path: SHOT + '/focus-after-16-tabs.png', clip: { x: 0, y: 0, width: 1440, height: 700 } });

// extended scroll-linked scan (adds individual transform properties and visibility/mask)
out.scrollLinked2 = await page.evaluate(async () => {
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const H = document.documentElement.scrollHeight; const els = [...document.querySelectorAll('body *')].filter(e => !e.closest('#homepage-hero-lottie') && !e.closest('.marquee-content') && !e.closest('#iru-header') && !['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(e.tagName) && !e.closest('svg') && !e.closest('#onetrust-consent-sdk') && !e.closest('[id*=warmly]'));
  const idOf = e => e.tagName.toLowerCase() + (e.id ? '#' + e.id : '') + (typeof e.className === 'string' && e.className ? '.' + e.className.trim().split(/\s+/).slice(0, 5).join('.') : '');
  const snap = () => els.map(e => { const s = getComputedStyle(e); return [s.transform, s.translate, s.scale, s.rotate, s.opacity, s.filter, s.clipPath, s.visibility, s.maskImage, s.backgroundPosition].join('|'); });
  const base = snap(); const changed = new Map();
  for (let y = 0; y <= H; y += 300) { window.scrollTo({ top: y, behavior: 'instant' }); await sleep(380); const cur = snap(); cur.forEach((v, i) => { if (v !== base[i]) { if (!changed.has(i)) changed.set(i, { id: idOf(els[i]).slice(0, 100), first: y, vals: new Set() }); changed.get(i).vals.add(v.slice(0, 100)); } }); }
  window.scrollTo({ top: 0, behavior: 'instant' });
  return { N: els.length, changedCount: changed.size, changed: [...changed.values()].slice(0, 30).map(c => ({ id: c.id, firstAtScrollY: c.first, nValues: c.vals.size, sample: [...c.vals].slice(0, 2) })) };
});

// section screenshots at 1440
await sleep(500);
const ys = [1250, 1850, 2400, 3050, 4750, 5350, 5950, 6600, 7250];
for (const y of ys) { await page.evaluate(yy => window.scrollTo({ top: yy, behavior: 'instant' }), y); await sleep(1100); await page.screenshot({ path: `${SHOT}/sec-${y}.png` }); }

// section structure summary: headings with absolute tops, component hints
out.structure = await page.evaluate(() => { const r2 = n => Math.round(n); return [...document.querySelectorAll('main h1, main h2, main h3, .body-container h1, .body-container h2, .body-container h3')].filter(h => h.getBoundingClientRect().width > 0).map(h => ({ tag: h.tagName, top: r2(h.getBoundingClientRect().top + scrollY), text: h.innerText.replace(/\n/g, ' ').slice(0, 70), fs: getComputedStyle(h).fontSize, align: getComputedStyle(h).textAlign })); });
fs.writeFileSync(OUT, JSON.stringify(out, null, 1));
await browser.close(); console.log('ok');
