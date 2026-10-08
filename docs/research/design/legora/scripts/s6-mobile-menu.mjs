// legora.com: mobile 390x844, taps the "Menu" toggle once (opens the nav overlay; nothing is submitted) and records what appears.
// Usage: node s6-mobile-menu.mjs <outDir>
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
const require = createRequire('/Users/dhirajgiri/Documents/Projects/Cyper studio/design-system/home-lab/tools/');
const { chromium } = require('playwright-core');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const out = process.argv[2];
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await chromium.launch({ executablePath: CHROME, headless: true });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true, locale: 'en-US', userAgent: 'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36' });
const page = await ctx.newPage();
await page.goto('https://legora.com/', { waitUntil: 'load' });
await sleep(4500);
const before = await page.evaluate(() => document.body.innerText.length);
await page.touchscreen.tap(33, 79);
await sleep(300);
await page.screenshot({ path: path.join(out, 's6-menu-300ms.png') });
await sleep(900);
await page.screenshot({ path: path.join(out, 's6-menu-1200ms.png') });
const info = await page.evaluate(() => {
  const vis = [...document.querySelectorAll('a,button,p,h1,h2,h3')].filter(e => { const r = e.getBoundingClientRect(); const s = getComputedStyle(e); return r.width > 0 && r.height > 0 && r.top >= 0 && r.top < 844 && s.visibility !== 'hidden' && parseFloat(s.opacity) > 0.5; }).map(e => (e.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 26)).filter(Boolean);
  return { vis: [...new Set(vis)].slice(0, 30), textLen: document.body.innerText.length, bodyOverflow: getComputedStyle(document.body).overflow, htmlOverflow: getComputedStyle(document.documentElement).overflow, scrollY: Math.round(scrollY) };
});
// does the page behind scroll while the menu is open?
await page.mouse.wheel(0, 300).catch(() => {});
await sleep(500);
info.scrollYAfterWheel = await page.evaluate(() => Math.round(scrollY));
fs.writeFileSync(path.join(out, 's6-results.json'), JSON.stringify({ before, info }, null, 1));
console.log(JSON.stringify({ before, info }));
await browser.close();
