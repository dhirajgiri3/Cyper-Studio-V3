// Reduced-motion behaviour of Motion-driven reveals + hero fade, and structural a11y facts (no axe; hand-rolled checks only).
import { chromium } from '/Users/dhirajgiri/Documents/Projects/Cyper studio/design-system/home-lab/tools/node_modules/playwright-core/index.mjs';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] });
const R = {};
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce', locale: 'en-US' });
await ctx.addInitScript(() => {
  window.__series = []; window.__anims = {};
  document.addEventListener('DOMContentLoaded', () => {
    const t0 = performance.now();
    const tick = () => {
      const f = document.querySelector('main section .mt-16.max-w-\\[1200px\\]');
      if (f) { let o = 1; for (let c = f; c && c !== document.body; c = c.parentElement) o *= +getComputedStyle(c).opacity; window.__series.push([Math.round(performance.now()), +o.toFixed(3)]); }
      for (const a of document.getAnimations()) { const tg = a.effect && a.effect.target; if (!tg) continue; const k = (tg.tagName + '.' + String(tg.className).split(' ').slice(0, 2).join('.')).slice(0, 50) + ' ' + a.constructor.name; if (!window.__anims[k]) { const t = a.effect.getTiming(); window.__anims[k] = [t.duration, t.delay, t.easing, a.playState]; } }
      if (performance.now() - t0 < 2500) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, { once: true });
});
const page = await ctx.newPage();
await page.goto('https://modeinspect.com/', { waitUntil: 'load' }); await sleep(3000);
const s = await page.evaluate(() => window.__series);
R.rmHeroFrame = { firstNonZero: s.find(x => x[1] > 0), full: s.find(x => x[1] >= .999), dec: s.filter((_, i) => i % 10 === 0).slice(0, 10) };
R.rmAnims = await page.evaluate(() => window.__anims);
R.rmMarquee = await page.evaluate(() => { const m = document.querySelector('.animate-marquee'); return m ? { anim: getComputedStyle(m).animationName, dur: getComputedStyle(m).animationDuration, state: m.getAnimations().map(a => a.playState) } : null; });
// a Reveal below the fold under reduced motion
await page.evaluate(() => { const h = [...document.querySelectorAll('h2')].find(h => /Vibe coding/.test(h.innerText)); scrollTo(0, h.getBoundingClientRect().top + scrollY - 200); });
await page.evaluate(() => { window.__rv = []; const t0 = performance.now(); const tick = () => { const h = [...document.querySelectorAll('h3')].find(h => /Controls, not prompts/.test(h.innerText)); if (h) { let o = 1, ty = 0; for (let c = h; c && c !== document.body; c = c.parentElement) { const s = getComputedStyle(c); o *= +s.opacity; if (s.transform !== 'none') ty += new DOMMatrix(s.transform).m42; } window.__rv.push([Math.round(performance.now() - t0), +o.toFixed(2), +ty.toFixed(1)]); } if (performance.now() - t0 < 1400) requestAnimationFrame(tick); }; requestAnimationFrame(tick); });
await sleep(1700);
R.rmBelowFoldReveal = (await page.evaluate(() => window.__rv)).filter((_, i) => i % 8 === 0).slice(0, 8);
// structure
R.struct = await page.evaluate(() => ({
  lang: document.documentElement.lang, h1: document.querySelectorAll('h1').length, h2: document.querySelectorAll('h2').length, h3: document.querySelectorAll('h3').length,
  landmarks: { header: document.querySelectorAll('header').length, nav: document.querySelectorAll('nav').length, main: document.querySelectorAll('main').length, footer: document.querySelectorAll('footer').length },
  skipLink: !![...document.querySelectorAll('a')].find(a => /skip/i.test(a.innerText) && a.getAttribute('href') === '#main'),
  faq: [...document.querySelectorAll('main button[aria-expanded]')].slice(0, 2).map(b => ({ exp: b.getAttribute('aria-expanded'), controls: b.getAttribute('aria-controls'), hasPanelId: !!(b.getAttribute('aria-controls') && document.getElementById(b.getAttribute('aria-controls'))) })),
  faqCount: document.querySelectorAll('main button[aria-expanded]').length,
  imgs: { total: document.querySelectorAll('img').length, noAlt: [...document.querySelectorAll('img')].filter(i => !i.hasAttribute('alt')).length, emptyAlt: [...document.querySelectorAll('img')].filter(i => i.getAttribute('alt') === '').length },
  videosAriaHidden: [...document.querySelectorAll('video')].map(v => v.getAttribute('aria-hidden') || (v.closest('[aria-hidden]') ? 'ancestor' : null)),
  heroFrameAriaHidden: (() => { const f = document.querySelector('main section .mt-16.max-w-\\[1200px\\]'); return f && (f.closest('[aria-hidden="true"]') ? 'hidden' : 'exposed'); })(),
  marqueeDuplicateAriaHidden: (() => { const m = document.querySelector('.animate-marquee'); return m ? [...m.children].map(c => c.getAttribute('aria-hidden')).filter(Boolean).length + '/' + m.children.length : null; })(),
  menuBtn: (() => { const b = [...document.querySelectorAll('header button')].find(b => /menu/i.test(b.innerText)); return b ? { label: b.getAttribute('aria-label'), exp: b.getAttribute('aria-expanded'), controls: b.getAttribute('aria-controls') } : null; })(),
  contrastNote: 'see layout-type-mount-output.json contrast',
}));
// first-party reduced-motion wiring
console.log(JSON.stringify(R));
await browser.close();
