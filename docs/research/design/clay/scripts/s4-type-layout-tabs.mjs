// clay.com observation script 4: computed typography samples, section geometry, accent colours, use-case tab autoplay and a JS .click() on a tab (UI only).
import { createRequire } from 'node:module';
import fs from 'node:fs';
const require = createRequire(import.meta.url);
const { chromium } = require('../../../../../design-system/home-lab/tools/node_modules/playwright-core');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const out = process.argv[2] || 'clay-s4.json';
const shots = process.argv[3] || '.';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox', '--disable-blink-features=AutomationControlled'] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' });
const page = await ctx.newPage();
await page.goto('https://www.clay.com/', { waitUntil: 'load', timeout: 60000 }).catch(() => {});
await sleep(4000);
// scroll through once so lazy sections hydrate
for (let y = 0; y <= 5200; y += 500) { await page.evaluate(v => window.scrollTo(0, v), y); await sleep(250); }
await page.evaluate(() => window.scrollTo(0, 0)); await sleep(800);
const res = {};
res.type = await page.evaluate(() => {
  const want = [['banner text', 'The most creative minds'], ['banner cta', 'GET TICKETS'], ['nav link', 'Product'], ['hero h1', 'Build systems to'], ['hero sub', 'Infrastructure to get any'], ['hero microcopy', 'or install directly'], ['hero CTA label', 'Start free trial'], ['trust line', 'Trusted by more than'], ['stat number 80%+', '80%+'], ['stat number +140%', '+140%'], ['stat number 2x', '2x'], ['stat label', 'ENRICHMENT'], ['card title', 'All inbound'], ['card sublabel', 'QUALIFIED AND SCORED'], ['card quote', 'Clay 3x'], ['h2 section', 'GTM engineers build'], ['section sub', 'Enrich, score, and route'], ['pill', 'Automated Inbound'], ['h3 what to build', 'What do you want to build'], ['h3 launch', 'Launch new plays'], ['eyebrow', 'GTM INFRASTRUCTURE'], ['body para', 'Trigger emails, ads'], ['caption', 'increased PLG conversion'], ['footer heading', 'CUSTOMERS'], ['footer link', 'Pricing'], ['footer legal', '©2026 Clay Labs']];
  const out = [];
  const leafs = [...document.querySelectorAll('body *')].filter(e => e.getBoundingClientRect().width > 0);
  for (const [label, start] of want) {
    const c = leafs.filter(e => { const own = [...e.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent).join('').replace(/\s+/g, ' ').trim(); const all = (e.textContent || '').replace(/\s+/g, ' ').trim(); return own.startsWith(start) || (all.startsWith(start) && e.children.length <= 2 && all.length < start.length + 140); });
    c.sort((a, b) => a.textContent.length - b.textContent.length);
    const e = c[0]; if (!e) { out.push({ label, error: 'not found' }); continue; }
    const s = getComputedStyle(e); const r = e.getBoundingClientRect();
    out.push({ label, tag: e.tagName.toLowerCase(), cls: (e.getAttribute('class') || '').slice(0, 40), family: s.fontFamily.split(',')[0], size: s.fontSize, weight: s.fontWeight, wvar: s.fontVariationSettings, lh: s.lineHeight, ls: s.letterSpacing, tt: s.textTransform, color: s.color, wrap: s.textWrap, fvn: s.fontVariantNumeric, ffs: s.fontFeatureSettings, w: Math.round(r.width), maxw: s.maxWidth, align: s.textAlign, docTop: Math.round(r.top + scrollY), text: (e.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 40) });
  }
  return out;
});
res.sections = await page.evaluate(() => {
  const o = []; for (const e of document.querySelectorAll('main *')) { const r = e.getBoundingClientRect(); if (r.width < 900 || r.height < 250) continue; const s = getComputedStyle(e); const br = parseFloat(s.borderTopLeftRadius); if (br < 16 && s.backgroundColor === 'rgba(0, 0, 0, 0)') continue; o.push({ cls: (e.getAttribute('class') || e.tagName).slice(0, 42), top: Math.round(r.top + scrollY), h: Math.round(r.height), x: Math.round(r.x), w: Math.round(r.width), bg: s.backgroundColor, radius: s.borderTopLeftRadius, pad: s.padding, mt: s.marginTop, bd: s.borderTopWidth + ' ' + s.borderTopColor }); }
  return o.slice(0, 40);
});
res.accents = await page.evaluate(() => { const g = (label, fn) => { try { const e = fn(); if (!e) return { label, error: 'nf' }; const s = getComputedStyle(e); return { label, bg: s.backgroundColor, color: s.color, bd: s.borderColor, radius: s.borderRadius, pad: s.padding, size: s.fontSize, weight: s.fontWeight, h: Math.round(e.getBoundingClientRect().height), cls: (e.getAttribute('class') || '').slice(0, 40) }; } catch (e) { return { label, error: String(e) }; } }; const byText = (t, tag = 'a,button') => [...document.querySelectorAll(tag)].find(e => (e.textContent || '').replace(/\s+/g, ' ').trim().startsWith(t) && e.getBoundingClientRect().width > 0); const span = t => [...document.querySelectorAll('span,div,h1,h2,h3')].filter(e => (e.textContent || '').trim() === t && e.children.length === 0)[0];
  return [g('hero CTA white', () => byText('Start free trial', 'a')), g('hero CTA lime', () => [...document.querySelectorAll('a')].find(a => /^Get a demo/.test(a.textContent.trim()) && a.getBoundingClientRect().top > 600 && a.getBoundingClientRect().top < 800)), g('pink section CTA', () => [...document.querySelectorAll('a')].find(a => /^Start free trial/.test(a.textContent.trim()) && getComputedStyle(a).backgroundColor !== 'rgba(0, 0, 0, 0)' && !/rgb\(0, 0, 0\)|rgb\(255, 255, 255\)/.test(getComputedStyle(a).backgroundColor))), g('accent span as you have ideas', () => span('as you have ideas')), g('accent span reps more productive', () => span('reps more productive')), g('eyebrow', () => span('GTM INFRASTRUCTURE') || byText('GTM INFRASTRUCTURE', 'div,span,p')), g('active tab', () => [...document.querySelectorAll('.tab-btn')].find(b => getComputedStyle(b).backgroundColor.includes('238'))), g('inactive tab', () => [...document.querySelectorAll('.tab-btn')].find(b => getComputedStyle(b).backgroundColor.includes('244'))), g('banner', () => document.querySelector('a[href*="sculpt"], a[class*="banner"]')) ]; });
res.tabsTimeline = []; await page.evaluate(() => { const h = [...document.querySelectorAll('h2')].find(h => /GTM engineers/.test(h.innerText)); h && window.scrollTo(0, h.getBoundingClientRect().top + scrollY - 100); }); await sleep(1200);
const tabState = () => page.evaluate(() => [...document.querySelectorAll('.tab-btn')].filter(b => b.getBoundingClientRect().width > 0).map(b => (b.textContent || '').trim().slice(0, 18) + '|' + getComputedStyle(b).backgroundColor.replace('rgb', '') + '|' + (b.getAttribute('aria-selected') || b.className.includes('w--current') || b.className.includes('is-active') || '')));
for (let i = 0; i < 8; i++) { res.tabsTimeline.push({ t: i * 1.5, s: await tabState() }); await sleep(1500); }
// JS click on 2nd visible inactive tab, poll image-stack
const poll = await page.evaluate(async () => {
  const tabs = [...document.querySelectorAll('.tab-btn')].filter(b => b.getBoundingClientRect().width > 0); const act = tabs.findIndex(b => getComputedStyle(b).backgroundColor.includes('238')); const target = tabs[(act + 2) % tabs.length] || tabs[1];
  const imgs = [...document.images].filter(i => /case-\d+/.test(i.src) && i.getBoundingClientRect().width > 500);
  const snap = () => ({ tabs: tabs.map(b => getComputedStyle(b).backgroundColor.replace('rgb', '')), imgs: imgs.map(i => { const s = getComputedStyle(i); return +(+s.opacity).toFixed(2) + '/' + (s.transform === 'none' ? '' : s.transform.replace('matrix', 'm').replace(/ /g, '').slice(0, 26)); }).filter(x => x !== '0/m(1,0,0,1,0,24)') });
  const log = []; const t0 = performance.now(); const before = snap(); target.click(); await new Promise(res => { const f = () => { const t = performance.now() - t0; log.push({ t: Math.round(t), ...snap() }); if (t < 1600) requestAnimationFrame(f); else res(); }; requestAnimationFrame(f); });
  const keep = []; let prev = ''; for (const l of log) { const k = JSON.stringify([l.tabs, l.imgs]); if (k !== prev) keep.push(l); prev = k; }
  return { target: (target.textContent || '').trim(), activeIdx: act, before, nFrames: log.length, changes: keep.slice(0, 40) };
});
res.tabClick = poll;
await page.screenshot({ path: `${shots}/tab-click-after.jpg`, type: 'jpeg', quality: 60 });
// the section dark/pink cards: scroll to 'Launch new plays' for a look at the accent device
await page.evaluate(() => { const h = [...document.querySelectorAll('h3')].find(h => /Launch new plays/.test(h.innerText)); h && window.scrollTo(0, h.getBoundingClientRect().top + scrollY - 250); }); await sleep(1500);
await page.screenshot({ path: `${shots}/launch-plays-section.jpg`, type: 'jpeg', quality: 65 });
await page.evaluate(() => { const h = [...document.querySelectorAll('h3')].find(h => /Hear from the teams/.test(h.innerText)); h && window.scrollTo(0, h.getBoundingClientRect().top + scrollY - 150); }); await sleep(1500);
await page.screenshot({ path: `${shots}/testimonials-section.jpg`, type: 'jpeg', quality: 65 });
fs.writeFileSync(out, JSON.stringify(res, null, 1));
console.log('written', out);
await browser.close();
