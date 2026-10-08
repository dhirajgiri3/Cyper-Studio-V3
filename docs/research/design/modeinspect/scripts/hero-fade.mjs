// What animates the hero product frame on entry: list WAAPI animations (target, keyframes, timing) during load.
import { chromium } from '/Users/dhirajgiri/Documents/Projects/Cyper studio/design-system/home-lab/tools/node_modules/playwright-core/index.mjs';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' });
await ctx.addInitScript(() => {
  window.__series = []; window.__anims = {};
  document.addEventListener('DOMContentLoaded', () => {
    const t0 = performance.now();
    const tick = () => {
      const f = document.querySelector('main section .mt-16.max-w-\\[1200px\\]');
      if (f) {
        let o = 1; for (let c = f; c && c !== document.body; c = c.parentElement) o *= +getComputedStyle(c).opacity;
        window.__series.push([Math.round(performance.now()), +o.toFixed(3)]);
        for (const a of document.getAnimations()) {
          const tg = a.effect && a.effect.target; if (!tg) continue;
          const key = (tg.tagName + '.' + String(tg.className).split(' ').slice(0, 3).join('.')).slice(0, 70) + ' ' + (a.animationName || a.constructor.name) + ' ' + (a.id || '');
          if (!window.__anims[key]) { const t = a.effect.getTiming(); window.__anims[key] = { first: Math.round(performance.now()), duration: t.duration, delay: t.delay, easing: t.easing, fill: t.fill, kf: a.effect.getKeyframes().map(k => ({ o: k.offset, op: k.opacity, tr: k.transform, e: k.easing, f: k.filter })).slice(0, 4), isHero: f.contains(tg) || tg.contains(f), type: a.constructor.name }; }
        }
      }
      if (performance.now() - t0 < 2800) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, { once: true });
});
const page = await ctx.newPage();
await page.goto('https://modeinspect.com/', { waitUntil: 'load' });
await sleep(3200);
const s = await page.evaluate(() => window.__series);
const a = await page.evaluate(() => window.__anims);
const firstNonZero = s.find(x => x[1] > 0), full = s.find(x => x[1] >= 0.999);
console.log(JSON.stringify({ n: s.length, firstNonZero, full, dec: s.filter((_, i) => i % 6 === 0).slice(0, 30) }));
console.log(JSON.stringify(a, null, 1));
await browser.close();
