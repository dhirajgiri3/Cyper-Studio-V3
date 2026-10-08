// usage: node shot.mjs <file-or-url> <out.png> [width=1440] [height=900] [full=0|1] [scrollY=0] [clipH]
import { chromium } from 'playwright-core';
import path from 'node:path';
const [src, out, w = '1440', h = '900', full = '0', sy = '0', clipH] = process.argv.slice(2);
const url = /^https?:|^file:/.test(src) ? src : 'file://' + path.resolve(src);
const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const mobile = +w < 600;
const ctx = await b.newContext({ viewport: { width: +w, height: +h }, deviceScaleFactor: mobile ? 2 : 1, isMobile: mobile, hasTouch: mobile });
const p = await ctx.newPage();
p.on('pageerror', e => console.log('PAGEERROR', e.message));
p.on('console', m => { if (m.type() === 'error') console.log('CONSOLE.ERROR', m.text()); });
await p.goto(url, { waitUntil: 'load' }); await p.waitForTimeout(1200);
if (+sy) { await p.evaluate(y => window.scrollTo(0, y), +sy); await p.waitForTimeout(900); }
await p.screenshot({ path: out, fullPage: full === '1', ...(clipH ? { clip: { x: 0, y: +sy, width: +w, height: +clipH } } : {}) });
await b.close(); console.log('saved', out);
