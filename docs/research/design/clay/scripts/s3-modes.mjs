// clay.com observation script 3: load-time entrance sampling, reduced-motion run, JS-off run, CTA/card hover diffs on the real <a>/<button>,
// use-case tab click transition. Observation only (clicks a UI tab; no forms, no login).
import { createRequire } from 'node:module';
import fs from 'node:fs';
const require = createRequire(import.meta.url);
const { chromium } = require('../../../../../design-system/home-lab/tools/node_modules/playwright-core');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const out = process.argv[2] || 'clay-s3.json';
const shots = process.argv[3] || '.';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox', '--disable-blink-features=AutomationControlled'] });
const res = {};

const LOADLOG = () => {
  window.__fr = []; const t0 = performance.now(); let last = -100;
  const find = () => { const h1 = document.querySelector('h1'); const sub = [...document.querySelectorAll('p,div')].find(e => e.children.length === 0 && /^Infrastructure to get any/.test((e.textContent || '').trim())); const cta = [...document.querySelectorAll('a')].find(a => (a.textContent || '').trim() === 'Start free trial' && a.getBoundingClientRect().top > 600); const v = document.querySelector('video'); const still = document.querySelector('img[src*="hero-still"]'); const nav = document.querySelector('.nav__layout'); return { h1, sub, cta, v, still, nav }; };
  const st = e => { if (!e) return null; const s = getComputedStyle(e); const r = e.getBoundingClientRect(); return { op: +(+s.opacity).toFixed(2), tr: s.transform === 'none' ? '' : s.transform.replace('matrix', 'm').slice(0, 40), y: Math.round(r.y) }; };
  const step = () => { const t = performance.now() - t0; if (t - last >= 60) { last = t; const f = find(); window.__fr.push({ t: Math.round(t), h1: st(f.h1), sub: st(f.sub), cta: st(f.cta), nav: st(f.nav), still: f.still ? { op: st(f.still).op, done: f.still.complete } : null, v: f.v ? { rs: f.v.readyState, paused: f.v.paused, ct: +f.v.currentTime.toFixed(2), op: st(f.v).op } : null }); } if (t < 5200) requestAnimationFrame(step); };
  requestAnimationFrame(step);
};

// 1 + 2: normal and reduced-motion loads
for (const mode of ['normal', 'reduce']) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US', reducedMotion: mode === 'reduce' ? 'reduce' : 'no-preference' });
  await ctx.addInitScript(LOADLOG);
  const page = await ctx.newPage();
  const t0 = Date.now();
  await page.goto('https://www.clay.com/', { waitUntil: 'commit', timeout: 60000 });
  if (mode === 'normal') { for (const [name, ms] of [['f1', 350], ['f2', 700], ['f3', 1300], ['f4', 2400]]) { const wait = ms - (Date.now() - t0); if (wait > 0) await sleep(wait); await page.screenshot({ path: `${shots}/load-${name}-${Date.now() - t0}ms.jpg`, type: 'jpeg', quality: 55 }).catch(() => {}); } }
  await sleep(5500);
  const fr = await page.evaluate(() => window.__fr);
  // compress: only keep frames where something changed
  const keep = []; let prev = ''; for (const f of fr) { const k = JSON.stringify({ h1: f.h1, sub: f.sub, cta: f.cta, nav: f.nav, still: f.still, vp: f.v && f.v.paused, vrs: f.v && f.v.rs }); if (k !== prev) keep.push(f); prev = k; }
  res['load_' + mode] = { frames: fr.length, changes: keep.slice(0, 30), last: fr[fr.length - 1] };
  if (mode === 'reduce') {
    await page.evaluate(() => window.scrollTo(0, 0));
    const a = await page.evaluate(() => { const v = document.querySelector('video'); const i = [...document.images].find(i => /figma\.svg/.test(i.src) && i.getBoundingClientRect().width > 0); return { vPaused: v.paused, vt: +v.currentTime.toFixed(2), x: i && i.getBoundingClientRect().x }; });
    await page.evaluate(() => window.scrollTo(0, 880)); await sleep(2000);
    const b = await page.evaluate(() => { const v = document.querySelector('video'); const i = [...document.images].find(i => /figma\.svg/.test(i.src) && i.getBoundingClientRect().width > 0); return { vPaused: v.paused, vt: +v.currentTime.toFixed(2), x: i && i.getBoundingClientRect().x }; });
    res.reducedMotionRun = { before: a, after2s: b, matchMedia: await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches) };
    // nav hover under reduced motion
    await page.evaluate(() => window.scrollTo(0, 0)); await sleep(500);
    const pr = await page.evaluateHandle(() => [...document.querySelectorAll('.nav__link--prel')].find(e => /Pricing/.test(e.innerText)));
    const bb = await pr.asElement().boundingBox(); await page.mouse.move(bb.x + 10, bb.y + 8, { steps: 4 }); await sleep(60);
    res.reducedMotionRun.navRollAt60ms = await pr.asElement().evaluate(e => getComputedStyle(e).transform);
    await sleep(1200); res.reducedMotionRun.navRollAt1260ms = await pr.asElement().evaluate(e => getComputedStyle(e).transform);
    await page.screenshot({ path: `${shots}/reduced-motion-scrolled-880.jpg`, type: 'jpeg', quality: 60 }).catch(() => {});
  }
  await ctx.close();
}

// 3: JS disabled
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US', javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto('https://www.clay.com/', { waitUntil: 'load', timeout: 60000 }).catch(() => {});
  await sleep(3500);
  const html = await page.content();
  res.nojs = { htmlBytes: html.length, hasH1: /<h1/.test(html), videoTags: (html.match(/<video[^>]*>/g) || []).slice(0, 3).map(s => s.slice(0, 260)), inlineOpacity0: (html.match(/style="[^"]*opacity:\s*0[^"]*"/g) || []).length, dataWId: (html.match(/data-w-id=/g) || []).length };
  await page.screenshot({ path: `${shots}/nojs-a.jpg`, type: 'jpeg', quality: 55 });
  await sleep(2500);
  await page.screenshot({ path: `${shots}/nojs-b.jpg`, type: 'jpeg', quality: 55 });
  const bufA = fs.readFileSync(`${shots}/nojs-a.jpg`), bufB = fs.readFileSync(`${shots}/nojs-b.jpg`);
  res.nojs.heroChangedBetween2sFrames = !bufA.equals(bufB);
  await page.mouse.move(720, 500);
  for (const [n, d] of [['c', 900], ['d', 900], ['e', 1800]]) { await page.mouse.wheel(0, d); await sleep(900); await page.screenshot({ path: `${shots}/nojs-${n}.jpg`, type: 'jpeg', quality: 50 }); }
  // text-level survey: visible text length (innerText unavailable w/o JS) => use content text strip
  res.nojs.textChars = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').length;
  await ctx.close();
}

// 4: hover on real anchors + tab click
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' });
  const page = await ctx.newPage();
  await page.goto('https://www.clay.com/', { waitUntil: 'load', timeout: 60000 }).catch(() => {});
  await sleep(4000);
  const PROPS = ['backgroundColor', 'color', 'transform', 'boxShadow', 'borderColor', 'opacity', 'textDecorationLine', 'textDecorationColor', 'width', 'borderRadius', 'translate', 'scale'];
  const closestHandle = (text, yMin, yMax, root = 'a,button') => page.evaluateHandle(({ text, yMin, yMax, root }) => { const leafs = [...document.querySelectorAll('*')].filter(e => (e.textContent || '').replace(/\s+/g, ' ').trim() === text && e.getBoundingClientRect().top >= yMin && e.getBoundingClientRect().top <= yMax && e.getBoundingClientRect().width > 0); const c = leafs.map(l => l.closest(root)).filter(Boolean); return c[0] || leafs[leafs.length - 1] || null; }, { text, yMin, yMax, root });
  async function hd(label, h) {
    const el = h.asElement(); if (!el) return { label, error: 'not found' };
    const read = () => el.evaluate((e, PROPS) => { const f = n => { const s = getComputedStyle(n); const o = {}; for (const p of PROPS) o[p] = s[p]; return o; }; const kids = [...e.querySelectorAll('*')].slice(0, 8).map(k => ({ cls: (k.getAttribute('class') || '').slice(0, 30), tag: k.tagName.toLowerCase(), tr: getComputedStyle(k).transition.slice(0, 160), ...f(k) })); const r = e.getBoundingClientRect(); const s = getComputedStyle(e); return { self: f(e), tr: s.transition, cursor: s.cursor, kids, rect: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)], tag: e.tagName.toLowerCase(), cls: (e.getAttribute('class') || '').slice(0, 50), hrefSet: !!e.getAttribute('href') }; }, PROPS);
    await page.mouse.move(3, 500); await sleep(500); const b = await read();
    await page.mouse.move(b.rect[0] + b.rect[2] / 2, b.rect[1] + b.rect[3] / 2, { steps: 5 }); await sleep(1000); const a = await read();
    const diff = (x, y) => { const d = {}; for (const k of Object.keys(x)) if (x[k] !== y[k]) d[k] = [x[k], y[k]]; return d; };
    const kd = b.kids.map((k, i) => ({ tag: k.tag, cls: k.cls, tr: k.tr, d: diff(Object.fromEntries(PROPS.map(p => [p, k[p]])), Object.fromEntries(PROPS.map(p => [p, (a.kids[i] || {})[p]]))) })).filter(x => Object.keys(x.d).length);
    return { label, tag: b.tag, cls: b.cls, rect: b.rect, transition: b.tr, cursor: b.cursor, selfDiff: diff(b.self, a.self), kidDiffs: kd.slice(0, 4) };
  }
  res.hover2 = [];
  res.hover2.push(await hd('hero Start free trial (white)', await closestHandle('Start free trial', 700, 790)));
  res.hover2.push(await hd('hero Get a demo (lime)', await closestHandle('Get a demo', 700, 790)));
  res.hover2.push(await hd('header Start free trial (black)', await closestHandle('Start free trial', 40, 110)));
  res.hover2.push(await hd('header Get a demo (grey)', await closestHandle('Get a demo', 40, 110)));
  await page.evaluate(() => window.scrollTo(0, 880)); await sleep(1200);
  res.hover2.push(await hd('logo card Figma', await page.evaluateHandle(() => { const i = [...document.images].find(i => /figma\.svg/.test(i.src) && i.getBoundingClientRect().width > 0 && i.getBoundingClientRect().x > 0); let e = i; for (let k = 0; k < 4 && e && e.parentElement; k++) { e = e.parentElement; if (e.getBoundingClientRect().width > 120 && e.getBoundingClientRect().height > 70) return e; } return i; })));
  // section text link
  await page.evaluate(() => { const h = [...document.querySelectorAll('h3,h2')].find(h => /reps more productive/.test(h.innerText)); h && window.scrollTo(0, h.getBoundingClientRect().top + scrollY - 200); }); await sleep(1200);
  res.hover2.push(await hd('section text link Start free trial', await closestHandle('Start free trial', 100, 800)));
  res.hover2.push(await hd('section outline link Learn more about building plays', await closestHandle('Learn more about building plays', -100, 900)));
  // footer link
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight)); await sleep(1500);
  res.hover2.push(await hd('footer link Pricing', await page.evaluateHandle(() => [...document.querySelectorAll('footer a')].find(a => a.innerText.trim() === 'Pricing' && a.getBoundingClientRect().top > 0 && a.getBoundingClientRect().top < innerHeight))));
  // use-case tab click and transition poll
  await page.evaluate(() => { const h = [...document.querySelectorAll('h2')].find(h => /GTM engineers/.test(h.innerText)); h && window.scrollTo(0, h.getBoundingClientRect().top + scrollY - 100); }); await sleep(1500);
  const tab = await page.evaluateHandle(() => { const leafs = [...document.querySelectorAll('*')].filter(e => e.children.length === 0 && (e.textContent || '').trim() === 'Lead Scoring' && e.getBoundingClientRect().width > 0 && e.getBoundingClientRect().top > 0 && e.getBoundingClientRect().top < innerHeight); return leafs[0] || null; });
  res.tab = {};
  if (tab.asElement()) {
    res.tab.chainBefore = await tab.asElement().evaluate(e => { const o = []; let x = e; for (let k = 0; k < 4 && x; k++, x = x.parentElement) { const s = getComputedStyle(x); o.push({ tag: x.tagName.toLowerCase(), role: x.getAttribute('role'), sel: x.getAttribute('aria-selected'), cls: (x.getAttribute('class') || '').slice(0, 40), bg: s.backgroundColor, tr: s.transition.slice(0, 120) }); } return o; });
    await page.evaluate(() => { window.__p = []; const t0 = performance.now(); const imgs = [...document.images].filter(i => /case-\d+/.test(i.src) && i.getBoundingClientRect().width > 500); const leaf = [...document.querySelectorAll('*')].find(e => e.children.length === 0 && (e.textContent || '').trim() === 'Lead Scoring' && e.getBoundingClientRect().top > 0 && e.getBoundingClientRect().top < innerHeight); const f = () => { const t = performance.now() - t0; window.__p.push({ t: Math.round(t), tabBg: (leaf.closest('a,button,[role=tab],div[class*=tab]') || leaf.parentElement) && getComputedStyle(leaf.closest('a,button,[role=tab]') || leaf.parentElement).backgroundColor, imgs: imgs.map(i => { const s = getComputedStyle(i); const wrap = i.parentElement ? getComputedStyle(i.parentElement) : null; return [+(+s.opacity).toFixed(2), s.transform === 'none' ? '' : s.transform.replace('matrix', 'm').slice(0, 30), wrap ? wrap.opacity : ''].join('/'); }) }); if (t < 1400) requestAnimationFrame(f); }; requestAnimationFrame(f); });
    await tab.asElement().click({ timeout: 3000 }).catch(e => { res.tab.clickErr = String(e).slice(0, 100); });
    await sleep(1800);
    const p = await page.evaluate(() => window.__p);
    // keep changes only
    const keep = []; let prev = ''; for (const f of p) { const k = JSON.stringify([f.tabBg, f.imgs]); if (k !== prev) keep.push(f); prev = k; }
    res.tab.pollChanges = keep.slice(0, 40).map(f => ({ t: f.t, tabBg: f.tabBg, imgsSummary: f.imgs.filter(s => s !== '1/ /1' && s !== '1//1').slice(0, 5) }));
    res.tab.pollN = p.length;
    await page.screenshot({ path: `${shots}/tab-after-click.jpg`, type: 'jpeg', quality: 60 });
  }
  // classes of persistently non-1 opacity elements in first 3 screens (reveal initial states)
  await page.evaluate(() => window.scrollTo(0, 0)); await sleep(500);
  res.initialStates = await page.evaluate(() => { const o = {}; for (const e of document.querySelectorAll('body *')) { const s = getComputedStyle(e); if (s.opacity === '0' && getComputedStyle(e).display !== 'none' && s.visibility !== 'hidden') { const k = (e.getAttribute('class') || e.tagName).split(' ').slice(0, 2).join('.'); o[k] = (o[k] || 0) + 1; } } return Object.entries(o).sort((a, b) => b[1] - a[1]).slice(0, 14); });
  await ctx.close();
}
fs.writeFileSync(out, JSON.stringify(res, null, 1));
console.log('written', out, Object.keys(res));
await browser.close();
