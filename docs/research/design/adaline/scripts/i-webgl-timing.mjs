// adaline.ai home: when is the WebGL context created (at load vs on scroll), and which chunks load before any scroll?
// Run: node i-webgl-timing.mjs
import { chromium } from '/Users/dhirajgiri/Documents/Projects/Cyper studio/design-system/home-lab/tools/node_modules/playwright-core/index.mjs';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' });
await ctx.addInitScript(() => {
  window.__gl = [];
  const gc = HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext = function (t, ...r) { window.__gl.push({ t: String(t), at: Math.round(performance.now()), sy: Math.round(scrollY), w: this.width, h: this.height, top: Math.round(this.getBoundingClientRect().top + scrollY) }); return gc.call(this, t, ...r); };
});
const page = await ctx.newPage();
await page.goto('https://www.adaline.ai/', { waitUntil: 'load', timeout: 60000 });
await sleep(5000);
const before = await page.evaluate(() => ({ gl: window.__gl, scripts: performance.getEntriesByType('resource').filter(r => r.initiatorType === 'script' || /\.js(\?|$)/.test(r.name)).map(r => r.name.split('/').pop().slice(0, 40)).filter(n => /35515|2a9a6835|e6502385|89291|62092|83278/.test(n)), canvas: document.querySelectorAll('canvas').length }));
console.log('BEFORE SCROLL', JSON.stringify(before));
await page.mouse.move(30, 450);
let cur = 0; while (cur < 9800) { await page.mouse.wheel(0, 400); await sleep(40); cur = await page.evaluate(() => scrollY); }
await sleep(1500);
const after = await page.evaluate(() => ({ gl: window.__gl, scripts: performance.getEntriesByType('resource').filter(r => /\.js(\?|$)/.test(r.name)).map(r => ({ n: r.name.split('/').pop().slice(0, 40), start: Math.round(r.startTime) })).filter(r => /35515|2a9a6835|e6502385|89291|62092|83278/.test(r.n)), canvas: document.querySelectorAll('canvas').length }));
console.log('AFTER SCROLL', JSON.stringify(after));
await browser.close();
