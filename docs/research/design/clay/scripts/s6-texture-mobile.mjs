// clay.com observation script 6: texture overlay properties, mobile menu open state (UI toggle only), mobile header across scroll.
import { createRequire } from 'node:module';
import fs from 'node:fs';
const require = createRequire(import.meta.url);
const { chromium } = require('../../../../../design-system/home-lab/tools/node_modules/playwright-core');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const out = process.argv[2] || 'clay-s6.json';
const shots = process.argv[3] || '.';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox', '--disable-blink-features=AutomationControlled'] });
const res = {};
{
  const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' })).newPage();
  await page.goto('https://www.clay.com/', { waitUntil: 'load', timeout: 60000 }).catch(() => {}); await sleep(3500);
  res.texture = await page.evaluate(() => [...document.querySelectorAll('.texture-noise, .texture-fingers, .home-hero_shade')].slice(0, 6).map(e => { const s = getComputedStyle(e); return { cls: e.className.slice(0, 40), blend: s.mixBlendMode, op: s.opacity, size: s.backgroundSize, repeat: s.backgroundRepeat, pe: s.pointerEvents, w: Math.round(e.getBoundingClientRect().width), h: Math.round(e.getBoundingClientRect().height) }; }));
  res.heroVideoStyle = await page.evaluate(() => { const v = document.querySelector('video'); const s = getComputedStyle(v); return { fit: s.objectFit, pos: s.objectPosition, w: Math.round(v.getBoundingClientRect().width), h: Math.round(v.getBoundingClientRect().height), top: Math.round(v.getBoundingClientRect().top + scrollY) }; });
  await page.context().close();
}
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, userAgent: 'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36', locale: 'en-US' });
  const page = await ctx.newPage();
  await page.goto('https://www.clay.com/', { waitUntil: 'load', timeout: 60000 }).catch(() => {}); await sleep(3500);
  res.mobileHeader = [];
  for (const y of [0, 600, 2500]) { await page.evaluate(v => window.scrollTo(0, v), y); await sleep(700); res.mobileHeader.push({ y, ...(await page.evaluate(() => { const n = document.querySelector('.nav__layout'); const r = n.getBoundingClientRect(); const b = document.querySelector('.nav-banner'); const br = b && b.getBoundingClientRect(); return { navRect: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)], bannerVisible: !!(b && br.width > 0 && br.height > 0) }; })) }); }
  await page.evaluate(() => window.scrollTo(0, 0)); await sleep(600);
  const tgl = await page.evaluateHandle(() => document.querySelector('.nav__menu--toggle, [class*="menu--toggle"], button[aria-label*="menu" i]'));
  res.toggleFound = !!tgl.asElement();
  if (tgl.asElement()) { await tgl.asElement().click({ timeout: 4000 }).catch(e => { res.toggleErr = String(e).slice(0, 100); }); await sleep(1200); await page.screenshot({ path: `${shots}/mobile-390-menu-open.jpg`, type: 'jpeg', quality: 60 }); res.menuOpenInfo = await page.evaluate(() => ({ bodyOverflow: getComputedStyle(document.body).overflow, links: [...document.querySelectorAll('a')].filter(a => a.getBoundingClientRect().width > 0 && a.getBoundingClientRect().top > 0 && a.getBoundingClientRect().top < innerHeight).map(a => (a.innerText || '').trim().replace(/\s+/g, ' ')).filter(Boolean).slice(0, 14) })); }
  await ctx.close();
}
fs.writeFileSync(out, JSON.stringify(res, null, 1));
console.log(JSON.stringify(res).slice(0, 2500));
await browser.close();
