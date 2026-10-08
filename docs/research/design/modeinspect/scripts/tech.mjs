// Tech-fingerprint probe for modeinspect.com (observation only; home page only).
// Saves loaded script/css bodies to a scratch dir (arg 1) for grep, and prints runtime globals/DOM hints.
import { chromium } from '/Users/dhirajgiri/Documents/Projects/Cyper studio/design-system/home-lab/tools/node_modules/playwright-core/index.mjs';
import fs from 'node:fs';
import path from 'node:path';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const scratch = process.argv[2];
fs.mkdirSync(scratch, { recursive: true });
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' });
const page = await ctx.newPage();
const files = [];
page.on('response', async r => {
  try {
    const rt = r.request().resourceType();
    if (['script', 'stylesheet', 'document'].includes(rt)) {
      const b = await r.body();
      const name = rt + '-' + files.length + '-' + (new URL(r.url()).pathname.split('/').pop() || 'index').slice(0, 40);
      fs.writeFileSync(path.join(scratch, name), b);
      files.push({ name, url: r.url(), bytes: b.length, rt });
    }
  } catch {}
});
await page.goto('https://modeinspect.com/', { waitUntil: 'load' });
await sleep(3000);
const rt = await page.evaluate(() => {
  const g = ['gsap', 'ScrollTrigger', 'Lenis', 'lenis', 'LocomotiveScroll', 'THREE', 'lottie', 'Rive', 'Webflow', 'posthog', '__NEXT_DATA__', '__next_f', 'next', 'dataLayer', 'gtag', 'Motion', 'motion', 'framerMotion', 'barba'];
  const globals = {}; for (const k of g) globals[k] = typeof window[k];
  const own = Object.getOwnPropertyNames(window).filter(k => !(k in Object.getPrototypeOf(window)) ).filter(k => /gsap|lenis|scroll|three|lottie|rive|motion|post|ph_|next|__|oai|cf|webpack|turbo/i.test(k));
  return {
    globals, own: own.slice(0, 60),
    htmlClass: document.documentElement.className.slice(0, 300),
    htmlAttrs: [...document.documentElement.attributes].map(a => a.name + '=' + a.value.slice(0, 80)),
    bodyClass: document.body.className.slice(0, 200),
    htmlScrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
    htmlOverflow: getComputedStyle(document.documentElement).overflow + '/' + getComputedStyle(document.body).overflow,
    docTimeline: typeof document.timeline, scrollTimelineCtor: typeof ScrollTimeline, viewTimelineCtor: typeof ViewTimeline,
    viewTransition: typeof document.startViewTransition,
    nextRootEls: document.querySelectorAll('#__next, #__NEXT_DATA__').length,
    rootAttrs: [...document.querySelectorAll('[data-lenis-prevent],[data-scroll],[data-gsap],[data-framer],[data-rf]')].length,
    getAnims: document.getAnimations().map(a => ({ n: a.animationName || a.constructor.name, t: a.effect && a.effect.target && (a.effect.target.tagName + '.' + String(a.effect.target.className).slice(0, 50)), state: a.playState })),
    inlineStyleTransforms: [...document.querySelectorAll('[style*="transform"]')].length,
    scripts: [...document.scripts].map(s => s.src || ('inline:' + (s.textContent || '').slice(0, 60))).length,
    meta: [...document.querySelectorAll('meta[name],meta[property]')].map(m => (m.getAttribute('name') || m.getAttribute('property')) + '=' + (m.content || '').slice(0, 90)),
    linkRel: [...document.querySelectorAll('link[rel]')].map(l => l.rel + ' ' + (l.getAttribute('href') || '').slice(0, 90) + (l.as ? ' as=' + l.as : '')),
  };
});
fs.writeFileSync(path.join(scratch, '_runtime.json'), JSON.stringify({ files, rt }, null, 1));
console.log(JSON.stringify(rt, null, 1));
console.log(files.length, 'files saved to', scratch);
await browser.close();
