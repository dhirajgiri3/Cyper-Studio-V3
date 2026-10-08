// legora.com: scroll walk. Scrolls the home page in 900px steps (native scrollTo), records per step:
// header/announcement state, WAAPI calls created in that step, scrubbed <video> currentTime, rAF rate,
// running CSS animations, plus a viewport JPEG. Builds two contact sheets. Observation only.
// Usage: node s2-scroll-walk.mjs <outDir>
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
const require = createRequire('/Users/dhirajgiri/Documents/Projects/Cyper studio/design-system/home-lab/tools/');
const { chromium } = require('playwright-core');
const sharp = require('sharp');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const out = process.argv[2];
fs.mkdirSync(out, { recursive: true });
const sleep = ms => new Promise(r => setTimeout(r, ms));

const INIT = () => {
  const R = (window.__rec = { anim: [], raf: 0 });
  const desc = el => el ? (el.tagName.toLowerCase() + (typeof el.className === 'string' && el.className ? '.' + el.className.split(' ').slice(0, 2).join('.') : '') + ' "' + (el.textContent || '').trim().slice(0, 22) + '"') : null;
  const an = Element.prototype.animate;
  Element.prototype.animate = function (kf, opts) {
    try { if (R.anim.length < 600) R.anim.push({ sy: Math.round(scrollY), target: desc(this), kf: JSON.parse(JSON.stringify(kf)), opts: typeof opts === 'object' ? JSON.parse(JSON.stringify(opts)) : opts }); } catch {}
    return an.apply(this, arguments);
  };
  const raf = window.requestAnimationFrame;
  window.requestAnimationFrame = function (cb) { R.raf++; return raf.call(this, cb); };
};

const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--autoplay-policy=no-user-gesture-required'] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' });
await ctx.addInitScript(INIT);
const page = await ctx.newPage();
await page.goto('https://legora.com/', { waitUntil: 'load' });
await sleep(4000);

const H = await page.evaluate(() => document.documentElement.scrollHeight);
const steps = [];
const shots = [];
const STATE = () => {
  const R = window.__rec;
  const logo = [...document.querySelectorAll('svg')].find(s => { const r = s.getBoundingClientRect(); return Math.round(r.width) === 89 && Math.round(r.height) === 17; });
  let hdr = null; let n = logo;
  while (n && n !== document.body) { const s = getComputedStyle(n); if (s.position === 'fixed' || s.position === 'sticky') { hdr = n; break; } n = n.parentElement; }
  const hs = hdr && getComputedStyle(hdr); const hr = hdr && hdr.getBoundingClientRect();
  const link = [...document.querySelectorAll('a')].find(a => a.textContent.trim() === 'Solutions');
  const ann = [...document.querySelectorAll('a')].find(a => a.textContent.includes('Introducing Skills'));
  let annFixed = null; n = ann; while (n && n !== document.body) { const s = getComputedStyle(n); if (s.position === 'fixed' || s.position === 'sticky') { annFixed = n; break; } n = n.parentElement; }
  const lsvg = logo && getComputedStyle(logo.querySelector('path') || logo);
  const vids = [...document.querySelectorAll('video')].map(v => { const r = v.getBoundingClientRect(); return { top: Math.round(r.top), h: Math.round(r.height), ct: +v.currentTime.toFixed(2), dur: +(v.duration || 0).toFixed(2), paused: v.paused, rs: v.readyState, op: getComputedStyle(v).opacity }; });
  const anims = document.getAnimations().map(a => ({ n: a.animationName || a.constructor.name, state: a.playState, ct: Math.round(a.currentTime || 0) })).slice(0, 8);
  return {
    sy: Math.round(scrollY),
    hdr: hdr ? { pos: hs.position, top: Math.round(hr.top), h: Math.round(hr.height), bg: hs.backgroundColor, backdrop: hs.backdropFilter, transition: hs.transition.slice(0, 120), cls: hdr.className.slice(0, 40) } : null,
    ann: annFixed ? { pos: getComputedStyle(annFixed).position, top: Math.round(annFixed.getBoundingClientRect().top), h: Math.round(annFixed.getBoundingClientRect().height) } : null,
    linkColor: link && (getComputedStyle(link.querySelector('p') || link).color),
    logoFill: lsvg && lsvg.fill,
    vids, anims, animLog: R.anim.length, rafTotal: R.raf,
  };
};

let prevLog = 0;
const ys = [];
for (let y = 0; y <= H - 900; y += 450) ys.push(y);
ys.push(H - 900);
for (const y of ys) {
  await page.evaluate(yy => window.scrollTo(0, yy), y);
  await sleep(900);
  const s = await page.evaluate(STATE);
  // rAF rate over 1s at this position
  const r0 = s.rafTotal; await sleep(1000); const r1 = await page.evaluate(() => window.__rec.raf);
  s.rafPerSec = r1 - r0;
  const log = await page.evaluate(n => window.__rec.anim.slice(n), prevLog);
  prevLog += log.length;
  s.newWAAPI = log.length;
  s.waapiSample = log.slice(0, 4).map(a => ({ t: a.target, kf: JSON.stringify(a.kf).slice(0, 120), o: JSON.stringify(a.opts).slice(0, 150) }));
  steps.push(s);
  if (y % 900 === 0) shots.push({ y, buf: await page.screenshot({ type: 'jpeg', quality: 62 }) });
}
fs.writeFileSync(path.join(out, 's2-steps.json'), JSON.stringify({ H, steps }, null, 1));

// two contact sheets (8 frames each, 2 columns)
const W = 560, Hh = 350;
for (let sheet = 0; sheet < Math.ceil(shots.length / 8); sheet++) {
  const part = shots.slice(sheet * 8, sheet * 8 + 8);
  const comps = [];
  for (let k = 0; k < part.length; k++) {
    const img = await sharp(part[k].buf).resize(W, Hh).toBuffer();
    const label = Buffer.from(`<svg width="${W}" height="22" xmlns="http://www.w3.org/2000/svg"><rect width="${W}" height="22" fill="#000" fill-opacity=".65"/><text x="6" y="16" font-size="14" fill="#fff" font-family="Arial">scrollY ${part[k].y}</text></svg>`);
    comps.push({ input: img, left: (k % 2) * W, top: Math.floor(k / 2) * Hh });
    comps.push({ input: label, left: (k % 2) * W, top: Math.floor(k / 2) * Hh + Hh - 22 });
  }
  await sharp({ create: { width: W * 2, height: Hh * Math.ceil(part.length / 2), channels: 3, background: '#fff' } }).composite(comps).jpeg({ quality: 72 }).toFile(path.join(out, `s2-sheet${sheet + 1}.jpg`));
}
await browser.close();
console.log('done', H, steps.length);
