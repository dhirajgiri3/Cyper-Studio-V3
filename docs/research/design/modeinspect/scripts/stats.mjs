// Does the stat strip count up? Sample the three numerals every frame as the section enters view.
import { chromium } from '/Users/dhirajgiri/Documents/Projects/Cyper studio/design-system/home-lab/tools/node_modules/playwright-core/index.mjs';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] });
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await page.goto('https://modeinspect.com/', { waitUntil: 'load' }); await sleep(2500);
await page.evaluate(() => { window.__s = []; const find = () => [...document.querySelectorAll('main *')].filter(e => e.children.length === 0 && /^(22|95|0)$/.test((e.innerText || '').trim()) && e.getBoundingClientRect().width > 0 && getComputedStyle(e).fontSize === '56px'); const t0 = performance.now(); const tick = () => { const els = find(); const r = els[0] && els[0].closest('div[class]'); window.__s.push([Math.round(performance.now() - t0), els.map(e => e.innerText.trim()), els[0] ? +(+getComputedStyle(els[0]).opacity).toFixed(2) : null, els[0] ? Math.round(els[0].getBoundingClientRect().top) : null]); if (performance.now() - t0 < 2500) requestAnimationFrame(tick); }; requestAnimationFrame(tick); });
const y = await page.evaluate(() => { const h = [...document.querySelectorAll('h2')].find(h => /Production-grade/.test(h.innerText)); return h.getBoundingClientRect().top + scrollY; });
await page.evaluate(v => scrollTo(0, v - 100), y);
await sleep(2800);
const s = await page.evaluate(() => window.__s);
const states = [...new Set(s.map(x => JSON.stringify(x[1])))];
console.log(JSON.stringify({ n: s.length, states, sample: s.filter((_, i) => i % 12 === 0).slice(0, 8) }));
await browser.close();
