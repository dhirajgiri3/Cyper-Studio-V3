// legora.com: interaction and motion micro-probes. Observation only: mouse moves (hover), Tab key (focus order),
// native scrollTo. No clicks, no form input, nothing is submitted.
// Parts: header flip threshold + curve, hover diffs, focus ring, logo marquee, scroll-scrub smoothing,
// counters, carousel autoplay, rAF attribution. Usage: node s3-interaction.mjs <outDir>
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
const require = createRequire('/Users/dhirajgiri/Documents/Projects/Cyper studio/design-system/home-lab/tools/');
const { chromium } = require('playwright-core');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const out = process.argv[2];
fs.mkdirSync(out, { recursive: true });
const sleep = ms => new Promise(r => setTimeout(r, ms));
const RES = {};

const INIT = () => {
  const R = (window.__rec = { raf: 0, rafStacks: {}, sampling: false });
  const raf = window.requestAnimationFrame;
  window.requestAnimationFrame = function (cb) {
    R.raf++;
    if (R.sampling) {
      try {
        const st = new Error().stack.split('\n').slice(2, 5).map(l => l.trim().replace(/^at /, '').replace(/\(?https:\/\/[^/]+\//, '(').slice(0, 110)).join(' | ');
        R.rafStacks[st] = (R.rafStacks[st] || 0) + 1;
      } catch {}
    }
    return raf.call(this, cb);
  };
  window.__find = {
    byText: (txt, tag = 'a', pred = () => true) => [...document.querySelectorAll(tag)].filter(e => (e.textContent || '').trim().startsWith(txt) && pred(e)),
  };
  const PROPS = ['backgroundColor', 'color', 'transform', 'opacity', 'width', 'height', 'borderRadius', 'boxShadow', 'filter', 'scale', 'translate', 'borderColor', 'outlineStyle', 'outlineColor', 'outlineWidth', 'outlineOffset', 'textDecorationLine', 'cursor'];
  window.__snap = el => {
    const nodes = [el, ...el.querySelectorAll('*')].slice(0, 14);
    return nodes.map((n, i) => { const s = getComputedStyle(n); const o = { i, tag: n.tagName.toLowerCase(), cls: (typeof n.className === 'string' ? n.className : '').split(' ')[0], txt: (n.childElementCount === 0 ? n.textContent.trim().slice(0, 14) : '') }; for (const p of PROPS) o[p] = s[p]; o.transition = s.transition === 'all 0s ease 0s' ? '' : s.transition.slice(0, 100); return o; });
  };
  window.__watch = (el, ms) => new Promise(res => {
    const t0 = performance.now(); const log = []; let last = '';
    const tick = () => {
      const t = performance.now() - t0; const snap = window.__snap(el); const key = JSON.stringify(snap.map(s => PROPS.map(p => s[p])));
      if (key !== last) { log.push({ t: Math.round(t), snap }); last = key; }
      if (t < ms) requestAnimationFrame(tick); else res(log);
    };
    tick();
  });
};

const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--autoplay-policy=no-user-gesture-required'] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' });
await ctx.addInitScript(INIT);
const page = await ctx.newPage();
await page.goto('https://legora.com/', { waitUntil: 'load' });
await sleep(5000);

const part = async (name, fn) => { try { RES[name] = await fn(); } catch (e) { RES[name] = { error: String(e).slice(0, 300) }; } };

// 1. header flip threshold: scroll in 15px steps, read nav link colour and the first non-transparent ancestor bg
await part('headerThreshold', async () => {
  const rows = [];
  for (let y = 0; y <= 240; y += 15) {
    await page.evaluate(yy => window.scrollTo(0, yy), y);
    await sleep(260);
    rows.push(await page.evaluate(() => {
      const a = window.__find.byText('Solutions')[0]; const p = a.querySelector('p') || a;
      let n = a, bg = null, depth = 0; while (n && depth < 10) { const b = getComputedStyle(n).backgroundColor; if (b !== 'rgba(0, 0, 0, 0)') { bg = b; break; } n = n.parentElement; depth++; }
      const cta = window.__find.byText('Book a demo').find(e => e.getBoundingClientRect().top < 100);
      return { sy: Math.round(scrollY), color: getComputedStyle(p).color, bg, bgDepth: depth, ctaBg: cta && getComputedStyle(cta).backgroundColor };
    }));
  }
  return rows;
});
// header flip curve: sample every rAF around the threshold crossing
await part('headerCurve', async () => {
  await page.evaluate(() => window.scrollTo(0, 0)); await sleep(800);
  const thr = RES.headerThreshold.find(r => r.color !== RES.headerThreshold[0].color);
  const y = thr ? thr.sy : 100;
  await page.evaluate(() => { window.__curve = []; const a = window.__find.byText('Solutions')[0]; const p = a.querySelector('p') || a; const t0 = performance.now(); let last = ''; const tick = () => { const t = performance.now() - t0; let n = a, bg = 'none'; let d = 0; while (n && d < 10) { const b = getComputedStyle(n).backgroundColor; if (b !== 'rgba(0, 0, 0, 0)') { bg = b; break; } n = n.parentElement; d++; } const k = getComputedStyle(p).color + '|' + bg; if (k !== last) { window.__curve.push({ t: Math.round(t), k }); last = k; } if (t < 1500) requestAnimationFrame(tick); }; tick(); });
  await sleep(150);
  await page.evaluate(yy => window.scrollTo(0, yy), y + 1);
  await sleep(1500);
  const down = await page.evaluate(() => window.__curve);
  return { thresholdY: y, down };
});

// 2. hover diffs
const hoverTest = async (label, locatorFn, scrollFirst) => {
  await part('hover:' + label, async () => {
    if (scrollFirst) { await page.evaluate(scrollFirst); await sleep(1200); }
    const box = await page.evaluate(locatorFn);
    if (!box) return { error: 'not found' };
    await page.mouse.move(2, 450); await sleep(700);
    const base = await page.evaluate(() => { const el = window.__hoverEl; return window.__snap(el); });
    const watch = page.evaluate(() => window.__watch(window.__hoverEl, 1100));
    await sleep(40);
    await page.mouse.move(box.x, box.y, { steps: 1 });
    const log = await watch;
    await page.mouse.move(2, 450); await sleep(400);
    // diff first vs last
    const first = log[0].snap, last = log[log.length - 1].snap;
    const changes = [];
    first.forEach((f, i) => { const l = last[i]; if (!l) return; for (const k of Object.keys(f)) if (!['i', 'tag', 'cls', 'txt', 'transition'].includes(k) && f[k] !== l[k]) changes.push({ node: `${f.tag}.${f.cls}${f.txt ? ' "' + f.txt + '"' : ''}`, prop: k, from: f[k], to: l[k] }); });
    const transitions = [...new Set(first.map(f => f.transition).filter(Boolean))];
    return { frames: log.length, timeline: log.map(l => l.t), changes: changes.slice(0, 14), transitions };
  });
};
const setEl = `(el) => { window.__hoverEl = el; const r = el.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; }`;
await hoverTest('heroCTA', () => { const el = window.__find.byText('Book a demo').find(e => { const r = e.getBoundingClientRect(); return r.top > 600 && r.top < 900; }); if (!el) return null; window.__hoverEl = el; const r = el.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; }, () => window.scrollTo(0, 0));
await hoverTest('navLink-Solutions', () => { const el = window.__find.byText('Solutions')[0]; window.__hoverEl = el; const r = el.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; });
await hoverTest('navCTA', () => { const el = window.__find.byText('Book a demo').find(e => e.getBoundingClientRect().top < 100); window.__hoverEl = el; const r = el.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; });
await hoverTest('announce', () => { const el = window.__find.byText('Introducing Skills')[0]; window.__hoverEl = el; const r = el.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; });
await hoverTest('cardAOS-readmore', () => { const el = window.__find.byText('Legora aOS™', 'div', e => e.childElementCount > 0 && e.getBoundingClientRect().width > 250 && e.getBoundingClientRect().width < 400 && e.textContent.includes('Read more'))[0]; if (!el) return null; el.scrollIntoView({ block: 'center' }); window.__hoverEl = el; const r = el.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + 80 }; });
await hoverTest('footerLink', () => { const el = window.__find.byText('Trust Center')[0]; el.scrollIntoView({ block: 'center' }); window.__hoverEl = el; const r = el.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; });

// 3. focus ring: Tab through the first 9 focusables from the top (no Enter)
await part('focus', async () => {
  await page.evaluate(() => window.scrollTo(0, 0)); await sleep(600);
  await page.evaluate(() => document.activeElement && document.activeElement.blur());
  const rows = [];
  for (let i = 0; i < 9; i++) {
    await page.keyboard.press('Tab'); await sleep(250);
    rows.push(await page.evaluate(() => { const e = document.activeElement; if (!e || e === document.body) return null; const s = getComputedStyle(e); const r = e.getBoundingClientRect(); return { tag: e.tagName.toLowerCase(), txt: (e.textContent || '').trim().slice(0, 22), outline: `${s.outlineStyle} ${s.outlineWidth} ${s.outlineColor} off ${s.outlineOffset}`, boxShadow: s.boxShadow.slice(0, 80), focusVisible: e.matches(':focus-visible'), rect: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)] }; }));
  }
  await page.screenshot({ path: path.join(out, 's3-focus.png'), clip: { x: 0, y: 0, width: 1440, height: 130 } });
  return rows;
});

// 4. logo marquee: track x of the first logo image at 0/500/1000/2000/4000 ms
await part('marquee', async () => {
  await page.evaluate(() => window.scrollTo(0, 650)); await sleep(1200);
  const sampleX = () => page.evaluate(() => { const imgs = [...document.querySelectorAll('img')].filter(i => { const r = i.getBoundingClientRect(); return Math.round(r.width) === 76 && Math.round(r.height) === 20; }); const first = imgs[0]; let n = first, tr = null, d = 0; const chain = []; while (n && d < 6) { const s = getComputedStyle(n); if (s.transform !== 'none') chain.push({ tag: n.tagName.toLowerCase(), cls: (n.className || '').toString().split(' ')[0], tr: s.transform }); n = n.parentElement; d++; } return { n: imgs.length, x: first && Math.round(first.getBoundingClientRect().x * 10) / 10, chain, anims: document.getAnimations().filter(a => a.effect && a.effect.target && a.effect.target.contains && a.effect.target.contains(first)).length }; });
  const t0 = Date.now(); const rows = [];
  for (const wait of [0, 500, 500, 1000, 2000]) { await sleep(wait); rows.push({ dt: Date.now() - t0, ...(await sampleX()) }); }
  await page.screenshot({ path: path.join(out, 's3-logos.png'), clip: { x: 0, y: 116, width: 1440, height: 400 } });
  // does it pause on hover?
  return rows;
});

// 5. scroll-scrub smoothing: jump scrollY 2400 -> 3400 instantly and sample the scrubbed video's currentTime each rAF
await part('scrub', async () => {
  await page.evaluate(() => window.scrollTo(0, 2400)); await sleep(1500);
  const r = await page.evaluate(async () => { const v = document.querySelectorAll('video')[1]; const t0 = performance.now(); const rows = []; const start = v.currentTime; window.scrollTo(0, 3400); await new Promise(res => { const tick = () => { const t = performance.now() - t0; rows.push([Math.round(t), +v.currentTime.toFixed(3), Math.round(scrollY)]); if (t < 1200) requestAnimationFrame(tick); else res(); }; tick(); }); return { start, rows: rows.filter((x, i) => i % 3 === 0).slice(0, 25), end: v.currentTime }; });
  return r;
});

// 6. number counters: scroll to the stats and sample
await part('counters', async () => {
  await page.evaluate(() => window.scrollTo(0, 8200)); await sleep(300);
  const r = await page.evaluate(async () => {
    const nums = () => [...document.querySelectorAll('p,div,span')].filter(e => e.childElementCount === 0 && /^\d{1,3}\s?%$/.test(e.textContent.trim())).map(e => e.textContent.trim());
    const rows = []; const t0 = performance.now();
    window.scrollTo(0, 9800);
    await new Promise(res => { const tick = () => { const t = performance.now() - t0; rows.push([Math.round(t), nums().join(',')]); if (t < 3000) requestAnimationFrame(tick); else res(); }; tick(); });
    const dedup = []; let last = ''; for (const r of rows) { if (r[1] !== last) { dedup.push(r); last = r[1]; } }
    return dedup.slice(0, 40);
  });
  return r;
});

// 7. carousel autoplay: in view at ~7500; screenshot at 0, 5.5, 11s, animation state
await part('carousel', async () => {
  await page.evaluate(() => window.scrollTo(0, 7500)); await sleep(1000);
  const rows = [];
  for (let i = 0; i < 4; i++) {
    rows.push(await page.evaluate(() => ({ anims: document.getAnimations().map(a => ({ n: a.animationName, st: a.playState, ct: Math.round(a.currentTime) })).slice(0, 4) })));
    if (i === 0 || i === 2) await page.screenshot({ path: path.join(out, `s3-carousel-${i}.jpg`), type: 'jpeg', quality: 60 });
    await sleep(3000);
  }
  return rows;
});

// 8. rAF attribution at the footer (idle): which scripts keep requesting frames
await part('rafAttribution', async () => {
  await page.evaluate(() => window.scrollTo(0, 13017)); await sleep(1500);
  await page.evaluate(() => { window.__rec.sampling = true; window.__rec.rafStacks = {}; window.__rec.raf = 0; });
  await sleep(2000);
  const r = await page.evaluate(() => { window.__rec.sampling = false; return { total: window.__rec.raf, stacks: window.__rec.rafStacks }; });
  return r;
});

fs.writeFileSync(path.join(out, 's3-results.json'), JSON.stringify(RES, null, 1));
await browser.close();
console.log('done', Object.keys(RES).map(k => k + (RES[k] && RES[k].error ? '!' : '')).join(' '));
