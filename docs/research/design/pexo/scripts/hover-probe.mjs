// Pexo: hover/focus computed-style diffs, header-on-scroll, carousel hover-pause. No clicks; hover and programmatic focus only.
import { chromium } from '/Users/dhirajgiri/Documents/Projects/Cyper studio/design-system/home-lab/tools/node_modules/playwright-core/index.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const here = path.dirname(fileURLToPath(import.meta.url));
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' });
const page = await ctx.newPage();
await page.goto('https://pexo.ai/', { waitUntil: 'load', timeout: 60000 });
await sleep(3500);
const PROPS = ['color', 'backgroundColor', 'borderTopColor', 'borderTopWidth', 'boxShadow', 'transform', 'opacity', 'textDecorationLine', 'outlineStyle', 'outlineColor', 'outlineWidth', 'filter', 'width', 'height', 'translate', 'scale', 'cursor'];
const read = (sel, text) => page.evaluate(({ sel, text, PROPS }) => {
  let els = [...document.querySelectorAll(sel)];
  if (text) els = els.filter(e => e.innerText && e.innerText.trim().startsWith(text));
  const e = els[0]; if (!e) return null;
  const s = getComputedStyle(e); const o = {}; PROPS.forEach(p => o[p] = s[p]);
  o._transition = s.transitionProperty + ' | ' + s.transitionDuration + ' | ' + s.transitionTimingFunction; o._cls = (e.className || '').toString().slice(0, 140);
  const r = e.getBoundingClientRect(); o._rect = [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)];
  return o;
}, { sel, text, PROPS });
const diff = (a, b) => { const d = {}; for (const k of Object.keys(a)) if (!k.startsWith('_') && a[k] !== b[k]) d[k] = [a[k], b[k]]; return d; };
const results = {};
async function hoverTest(name, sel, text, scrollTo) {
  if (scrollTo !== undefined) { await page.evaluate(y => window.scrollTo(0, y), scrollTo); await sleep(600); }
  const loc = text ? page.locator(sel, { hasText: text }).first() : page.locator(sel).first();
  const before = await read(sel, text);
  if (!before) { results[name] = 'not found'; return; }
  await page.mouse.move(5, 500); await sleep(100);
  const r = before._rect; await page.mouse.move(r[0] + r[2] / 2, r[1] + r[3] / 2); await sleep(60);
  const mid = await read(sel, text); await sleep(600);
  const after = await read(sel, text);
  results[name] = { transition: before._transition, cls: before._cls, diffAt60ms: diff(before, mid), diffAfter: diff(before, after) };
  await page.mouse.move(5, 500); await sleep(200);
}
await hoverTest('header Get Started', 'header button', 'Get Started', 0);
await hoverTest('header Pricing link', 'header a', 'Pricing', 0);
await hoverTest('header AI Video Agent link', 'header a', 'AI Video Agent', 0);
await hoverTest('header Create trigger', 'header button', 'Create', 0);
// does hover open the mega menu?
await page.mouse.move(5, 500); await sleep(200);
const menuBefore = await page.evaluate(() => document.querySelectorAll('[role=menu], [data-state=open], [aria-expanded=true]').length);
await page.mouse.move(549, 36); await sleep(700);
const menuHover = await page.evaluate(() => ({ expanded: document.querySelectorAll('[aria-expanded=true]').length, text: !!([...document.querySelectorAll('*')].find(e => e.innerText === 'Product Launch' && e.getBoundingClientRect().height > 0)) }));
await page.screenshot({ path: path.join(here, 'hover-create-menu.png'), clip: { x: 0, y: 0, width: 1440, height: 600 } });
results['Create menu opens on hover'] = { menuBefore, menuHover };
await page.mouse.move(5, 500); await sleep(400);
// Start for Free button (find y)
const sf = await page.evaluate(() => { const b = [...document.querySelectorAll('a,button')].find(e => e.innerText && e.innerText.trim() === 'Start for Free'); if (!b) return null; const r = b.getBoundingClientRect(); return Math.round(r.top + scrollY - 300); });
await hoverTest('Start for Free', 'a,button', 'Start for Free', sf);
await hoverTest('tab Launch Videos', 'button', 'Launch Videos', 3500);
await hoverTest('stepper step 2 (hover on inactive)', 'button', 'Pexo plans it all', 1500);
// carousel card hover + autoscroll pause test
await page.evaluate(() => window.scrollTo(0, 0)); await sleep(800);
const sl = () => page.evaluate(() => document.querySelector('.scrollbar-hide.overflow-x-auto').scrollLeft);
const a0 = await sl(); await sleep(1000); const a1 = await sl();
await page.mouse.move(700, 730); await sleep(300); const h0 = await sl(); await sleep(1500); const h1 = await sl();
const cardHover = await page.evaluate(() => { const c = [...document.querySelectorAll('.scrollbar-hide.overflow-x-auto button')].find(b => { const r = b.getBoundingClientRect(); return r.x < 700 && r.x + r.width > 700; }); if (!c) return null; const s = getComputedStyle(c); const v = c.querySelector('video'); const img = c.querySelector('img'); return { cls: c.className.slice(0, 120), tr: s.transition, vTransform: v ? getComputedStyle(v).transform : null, vTransition: v ? getComputedStyle(v).transitionDuration + ' ' + getComputedStyle(v).transitionProperty : null, vTr: v ? getComputedStyle(v).transform : null, kids: [...c.children].map(k => k.tagName + ':' + (k.className || '').toString().slice(0, 70)), label: c.innerText.slice(0, 40), cursor: s.cursor }; });
results['carousel'] = { scrollLeftNoHover: [a0, a1, 'delta per 1s=' + (a1 - a0)], scrollLeftHover: [h0, h1, 'delta per 1.5s=' + (h1 - h0)], cardHover };
await page.mouse.move(5, 500);
// header over scroll
const hdr = [];
for (const y of [0, 20, 40, 60, 80, 100, 150, 300, 1000, 5000, 12000]) { await page.evaluate(v => window.scrollTo(0, v), y); await sleep(400); hdr.push([y, await page.evaluate(() => { const h = document.querySelector('header'); const s = getComputedStyle(h); const up = [...document.querySelectorAll('button')].find(b => b.getAttribute('aria-label') === 'Back to top'); const u = up ? getComputedStyle(up.closest('div') || up) : null; return { bg: s.backgroundColor, bf: s.backdropFilter, bb: s.borderBottomWidth + ' ' + s.borderBottomColor, sh: s.boxShadow.slice(0, 50), toTopOp: up ? getComputedStyle(up).opacity : null, toTopVis: up ? getComputedStyle(up).visibility : null, toTopParentOp: up ? getComputedStyle(up.parentElement).opacity : null }; })]); }
results['header over scroll'] = hdr;
// focus styles: keyboard-focus via real Tab presses on the first few focusables, and prompt-box focus-within
await page.evaluate(() => window.scrollTo(0, 0)); await sleep(500);
const foc = [];
for (let i = 0; i < 4; i++) { await page.keyboard.press('Tab'); await sleep(120); foc.push(await page.evaluate(() => { const e = document.activeElement; const s = getComputedStyle(e); return { el: e.tagName + ':' + (e.innerText || e.getAttribute('aria-label') || '').slice(0, 20), outline: s.outlineStyle + ' ' + s.outlineWidth + ' ' + s.outlineColor, offset: s.outlineOffset, shadow: s.boxShadow.slice(0, 80) }; })); }
results['keyboard focus (first 4 tabs)'] = foc;
const boxBefore = await page.evaluate(() => { const t = document.querySelector('textarea'); const b = t.parentElement; const s = getComputedStyle(b); return { border: s.borderTopWidth + ' ' + s.borderTopColor, shadow: s.boxShadow.slice(0, 60), tr: s.transitionProperty + ' ' + s.transitionDuration }; });
await page.evaluate(() => document.querySelector('textarea').focus()); await sleep(500);
const boxAfter = await page.evaluate(() => { const t = document.querySelector('textarea'); const b = t.parentElement; const s = getComputedStyle(b); return { border: s.borderTopWidth + ' ' + s.borderTopColor, shadow: s.boxShadow.slice(0, 60), outline: getComputedStyle(t).outlineStyle }; });
await page.screenshot({ path: path.join(here, 'focus-prompt.png'), clip: { x: 280, y: 380, width: 880, height: 190 } });
results['prompt box focus'] = { boxBefore, boxAfter };
fs.writeFileSync(path.join(here, 'hover-probe.out.json'), JSON.stringify(results, null, 1));
console.log(JSON.stringify(results, null, 1));
await browser.close();
