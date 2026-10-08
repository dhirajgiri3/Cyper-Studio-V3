// adaline.ai home: testimonial controls (hover/focus only, NO clicks), Ship Once diagram motion, mobile hero stage check.
// Run: node f-misc.mjs <scratchDir>
import { chromium } from '/Users/dhirajgiri/Documents/Projects/Cyper studio/design-system/home-lab/tools/node_modules/playwright-core/index.mjs';
import fs from 'node:fs';
import path from 'node:path';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const SCR = process.argv[2]; fs.mkdirSync(SCR, { recursive: true });
const sleep = ms => new Promise(r => setTimeout(r, ms));
const out = {};
const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] });
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' });
  const page = await ctx.newPage();
  await page.goto('https://www.adaline.ai/', { waitUntil: 'load', timeout: 60000 });
  await sleep(3000);
  await page.mouse.move(30, 450);
  const goTo = async y => { let cur = await page.evaluate(() => scrollY); let g = 0; while (Math.abs(cur - y) > 3 && g++ < 80) { await page.mouse.wheel(0, Math.sign(y - cur) * Math.min(300, Math.abs(y - cur))); await sleep(40); cur = await page.evaluate(() => scrollY); } await sleep(900); return cur; };
  // find testimonial grid
  const locate = () => page.evaluate(() => {
    const el = [...document.querySelectorAll('p,div,span')].find(e => /Member of Technical Staff/.test(e.textContent) && e.children.length === 0);
    if (!el) return null;
    let c = el; for (let i = 0; i < 10 && c; i++, c = c.parentElement) { if (c.children.length >= 5) break; }
    c.scrollIntoView({ block: 'center' });
    return true;
  });
  await goTo(5200);
  out.found = await locate(); await sleep(900);
  out.testi = await page.evaluate(() => {
    const el = [...document.querySelectorAll('p,div,span')].find(e => /Member of Technical Staff/.test(e.textContent) && e.children.length === 0);
    if (!el) return null;
    let c = el; for (let i = 0; i < 10 && c; i++, c = c.parentElement) { if (c.children.length >= 5) break; }
    const kids = [...c.children].map(k => { const r = k.getBoundingClientRect(); const s = getComputedStyle(k); const btn = k.querySelector('button,[role=button]'); return { tag: k.tagName.toLowerCase(), w: Math.round(r.width), h: Math.round(r.height), x: Math.round(r.x), y: Math.round(r.y), tr: s.transition.slice(0, 140), bg: s.backgroundColor, rad: s.borderRadius, btn: btn && { tag: btn.tagName.toLowerCase(), aria: btn.getAttribute('aria-label'), expanded: btn.getAttribute('aria-expanded'), w: Math.round(btn.getBoundingClientRect().width), h: Math.round(btn.getBoundingClientRect().height) }, text: (k.innerText || '').trim().replace(/\s+/g, ' ').slice(0, 40) }; });
    return { container: String(c.className).slice(0, 90), display: getComputedStyle(c).display, kids };
  });
  // hover first collapsed card, sample widths
  if (out.testi) {
    await locate(); await sleep(700);
    const fresh = await page.evaluate(() => { const el = [...document.querySelectorAll('p,div,span')].find(e => /Member of Technical Staff/.test(e.textContent) && e.children.length === 0); let c = el; for (let i = 0; i < 10 && c; i++, c = c.parentElement) { if (c.children.length >= 5) break; } const r = c.children[0].getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; });
    const box = fresh;
    const widths = () => page.evaluate(() => { const el = [...document.querySelectorAll('p,div,span')].find(e => /Member of Technical Staff/.test(e.textContent) && e.children.length === 0); let c = el; for (let i = 0; i < 10 && c; i++, c = c.parentElement) { if (c.children.length >= 5) break; } return [...c.children].map(k => Math.round(k.getBoundingClientRect().width)); });
    out.w0 = await widths();
    await page.mouse.move(box.x + box.w / 2, box.y + box.h / 2);
    const seq = []; const t0 = Date.now(); for (let i = 0; i < 6; i++) { seq.push([Date.now() - t0, await widths()]); await sleep(110); }
    out.wHover = seq;
    out.hoverEl = await page.evaluate(([x, y]) => { const e = document.elementFromPoint(x, y); if (!e) return { nullAt: [x, y, innerHeight] }; const s = getComputedStyle(e); return { cls: String(e.className).slice(0, 70), cursor: s.cursor, bg: s.backgroundColor, tag: e.tagName.toLowerCase() }; }, [box.x + box.w / 2, box.y + box.h / 2]);
    await page.mouse.move(30, 450);
    const a = await widths(); await sleep(7000); const b = await widths();
    out.autoRotate = { t0: a, t7s: b };
    // keyboard focus on the first card button (no activation)
    const btnLoc = page.locator('button[aria-label*="xpand" i], button[aria-label*="pen" i], button[aria-label*="lay" i]').first();
    out.btnCount = await page.locator('button[aria-expanded]').count();
    out.btnAria = await page.evaluate(() => [...document.querySelectorAll('button')].filter(b => b.getBoundingClientRect().width < 60 && b.getBoundingClientRect().width > 20).slice(0, 10).map(b => ({ aria: b.getAttribute('aria-label'), exp: b.getAttribute('aria-expanded'), ctrls: b.getAttribute('aria-controls'), w: Math.round(b.getBoundingClientRect().width), h: Math.round(b.getBoundingClientRect().height), parent: String(b.parentElement.className).slice(0, 40) })));
  }
  await page.screenshot({ path: path.join(SCR, 'f-testi.jpg'), type: 'jpeg', quality: 60 });

  // Ship Once diagram: change over 6 s while in view
  await goTo(6350);
  out.ship = await page.evaluate(() => new Promise(res => {
    const sec = [...document.querySelectorAll('section')].find(s => /Ship\s*Once/i.test(s.textContent));
    if (!sec) return res(null);
    const snap = () => { const m = new Map(); for (const e of sec.querySelectorAll('*')) { const s = getComputedStyle(e); const k = e; m.set(k, [s.transform, s.opacity, s.strokeDashoffset, s.strokeDasharray, s.backgroundColor, s.color].join('|')); } return m; };
    const a = snap(); const anims = document.getAnimations().filter(x => sec.contains(x.effect && x.effect.target)).map(x => ({ n: x.animationName || x.transitionProperty || 'WAAPI', dur: x.effect.getTiming().duration, it: x.effect.getTiming().iterations === Infinity ? 'inf' : x.effect.getTiming().iterations, ease: x.effect.getTiming().easing, props: [...new Set((x.effect.getKeyframes ? x.effect.getKeyframes() : []).flatMap(k => Object.keys(k)).filter(k => !['offset', 'computedOffset', 'easing', 'composite'].includes(k)))] }));
    setTimeout(() => { const b = snap(); let ch = []; for (const [e, v] of a) { if (b.get(e) !== v) ch.push((e.tagName.toLowerCase() + '.' + String(e.className && e.className.baseVal !== undefined ? e.className.baseVal : e.className).slice(0, 50)) + ' :: ' + v.slice(0, 60) + ' => ' + (b.get(e) || '').slice(0, 60)); } res({ elements: a.size, changedOver3s: ch.length, changed: ch.slice(0, 8), animations: anims.slice(0, 8), svgPaths: [...sec.querySelectorAll('svg path')].map(p => ({ d: (p.getAttribute('d') || '').slice(0, 40), len: p.getTotalLength ? Math.round(p.getTotalLength()) : null, dash: p.getAttribute('stroke-dasharray'), off: p.getAttribute('stroke-dashoffset'), style: (p.getAttribute('style') || '').slice(0, 80) })) }); }, 3000);
  }));
  // JSON-LD + meta
  out.meta = await page.evaluate(() => ({ jsonld: [...document.querySelectorAll('script[type="application/ld+json"]')].map(s => { try { const j = JSON.parse(s.textContent); const g = j['@graph'] || [j]; return g.map(x => x['@type']); } catch { return 'unparseable'; } }), og: [...document.querySelectorAll('meta[property^="og:"],meta[name^="twitter:"]')].map(m => (m.getAttribute('property') || m.getAttribute('name')) + '=' + (m.content || '').slice(0, 50)).slice(0, 10), robots: (document.querySelector('meta[name=robots]') || {}).content || null, viewport: (document.querySelector('meta[name=viewport]') || {}).content, h1count: document.querySelectorAll('h1').length, h2count: document.querySelectorAll('h2').length, headingsOrder: [...document.querySelectorAll('h1,h2,h3')].map(h => h.tagName + ':' + (h.textContent || '').trim().slice(0, 28)).slice(0, 16), imgAltEmpty: [...document.querySelectorAll('img')].filter(i => !i.alt).length, imgTotal: document.querySelectorAll('img').length, ariaLabels: [...document.querySelectorAll('[aria-label]')].map(e => e.getAttribute('aria-label').slice(0, 50)).slice(0, 14), skipLink: !!document.querySelector('a[href^="#"][class*="sr-only"],a[href="#main"],a[href="#content"]'), mainId: (document.querySelector('main') || {}).id || null, htmlLang: document.documentElement.lang, scrollbarWidthStyle: getComputedStyle(document.documentElement).scrollbarWidth, htmlOverflow: getComputedStyle(document.documentElement).overflowY, bodyOverflow: getComputedStyle(document.body).overflowY }));
  await ctx.close();
}
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, locale: 'en-US' });
  const page = await ctx.newPage();
  await page.goto('https://www.adaline.ai/', { waitUntil: 'load', timeout: 60000 });
  await sleep(3500);
  out.mobile = await page.evaluate(() => { const h1 = document.querySelector('h1'); const sec = h1.closest('section'); const r = sec.getBoundingClientRect(); const trusted = document.querySelector('.first-load-trusted-by-enter'); const cta = [...document.querySelectorAll('a')].filter(a => /get started|read docs/i.test(a.textContent)).map(a => { const b = a.getBoundingClientRect(); return [a.textContent.trim(), Math.round(b.x), Math.round(b.y), Math.round(b.width), Math.round(b.height)]; }); return { penStage: !!document.querySelector('[data-pen-stage]'), heroSectionH: Math.round(r.height), trustedY: trusted && Math.round(trusted.getBoundingClientRect().top), cta, h1Rect: (() => { const b = h1.getBoundingClientRect(); return [Math.round(b.x), Math.round(b.y), Math.round(b.width), Math.round(b.height)]; })(), pageH: document.documentElement.scrollHeight, hscroll: document.documentElement.scrollWidth > innerWidth, menuBtn: (() => { const b = document.querySelector('button[aria-label="Open menu"]'); if (!b) return null; const r = b.getBoundingClientRect(); return [Math.round(r.width), Math.round(r.height), b.getAttribute('aria-expanded')]; })() }; });
  await ctx.close();
}
await browser.close();
fs.writeFileSync(path.join(SCR, 'f.json'), JSON.stringify(out, null, 1));
console.log('ok', Object.keys(out).join(','));
