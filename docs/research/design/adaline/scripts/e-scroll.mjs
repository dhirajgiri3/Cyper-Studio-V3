// adaline.ai home: scroll-linked motion detection (down pass vs up pass at identical scrollY), running animations per section,
// footer layers, scroll-trap check, testimonial hover, product-window churn. Observation only (scroll + hover; no clicks).
// Run: node e-scroll.mjs <scratchDir>
import { chromium } from '/Users/dhirajgiri/Documents/Projects/Cyper studio/design-system/home-lab/tools/node_modules/playwright-core/index.mjs';
import fs from 'node:fs';
import path from 'node:path';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const SCR = process.argv[2]; fs.mkdirSync(SCR, { recursive: true });
const sleep = ms => new Promise(r => setTimeout(r, ms));
const out = {};
const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' });
const page = await ctx.newPage();
await page.goto('https://www.adaline.ai/', { waitUntil: 'load', timeout: 60000 });
await sleep(3500);
await page.mouse.move(30, 450); // gutter, avoids inner scroll regions

const SNAP = () => {
  if (!window.__ids) { window.__ids = new WeakMap(); window.__n = 0; }
  const vh = innerHeight; const rows = [];
  for (const el of document.querySelectorAll('body *')) {
    const r = el.getBoundingClientRect();
    if (r.bottom < -50 || r.top > vh + 50 || r.width < 2) continue;
    const s = getComputedStyle(el);
    const tf = s.transform, op = s.opacity, cp = s.clipPath, fl = s.filter, tr = s.translate, sc = s.scale;
    const isSvgPath = el.tagName.toLowerCase() === 'path' || el.tagName.toLowerCase() === 'circle' || el.tagName.toLowerCase() === 'line';
    const sdo = isSvgPath ? s.strokeDashoffset : null;
    const bgp = s.backgroundPosition;
    const interesting = tf !== 'none' || op !== '1' || cp !== 'none' || fl !== 'none' || tr !== 'none' || sc !== 'none' || (sdo && sdo !== 'none' && sdo !== '0px') ;
    if (!interesting) continue;
    let id = window.__ids.get(el); if (!id) { id = ++window.__n; window.__ids.set(el, id); }
    rows.push({ id, cls: (el.tagName.toLowerCase() + '.' + String(el.className && el.className.baseVal !== undefined ? el.className.baseVal : el.className)).slice(0, 80), tf: tf.slice(0, 70), op, cp: cp.slice(0, 40), fl: fl.slice(0, 40), tr, sc, sdo, vtop: Math.round(r.top + scrollY) });
  }
  return rows;
};
const goTo = async y => { let cur = await page.evaluate(() => scrollY); let g = 0; while (Math.abs(cur - y) > 3 && g++ < 80) { await page.mouse.wheel(0, Math.sign(y - cur) * Math.min(300, Math.abs(y - cur))); await sleep(40); cur = await page.evaluate(() => scrollY); } await sleep(700); return cur; };

const stops = [0, 600, 1200, 1800, 2400, 3000, 3600, 4200, 4800, 5400, 6000, 6600, 7200, 7800, 8400, 9000, 9600, 10200, 10800];
const down = {}, up = {};
for (const y of stops) { const a = await goTo(y); down[y] = { actual: a, rows: await page.evaluate(SNAP) }; }
for (const y of [...stops].reverse()) { const a = await goTo(y); up[y] = { actual: a, rows: await page.evaluate(SNAP) }; }
// analyse
const byId = {};
for (const [pass, obj] of [['down', down], ['up', up]]) for (const [y, v] of Object.entries(obj)) for (const r of v.rows) { const e = (byId[r.id] = byId[r.id] || { cls: r.cls, vals: {} }); (e.vals[y] = e.vals[y] || {})[pass] = [r.tf, r.op, r.cp, r.fl, r.tr, r.sc, r.sdo].join('|'); }
const report = [];
for (const [id, e] of Object.entries(byId)) {
  const ys = Object.keys(e.vals); const distinct = new Set(); let both = 0, same = 0;
  for (const y of ys) { const v = e.vals[y]; if (v.down) distinct.add(v.down); if (v.up) distinct.add(v.up); if (v.down && v.up) { both++; if (v.down === v.up) same++; } }
  if (distinct.size >= 3) report.push({ id, cls: e.cls, nStops: ys.length, distinct: distinct.size, bothPasses: both, sameDownUp: same, sample: ys.slice(0, 3).map(y => [y, (e.vals[y].down || e.vals[y].up).slice(0, 90)]) });
}
report.sort((a, b) => b.distinct - a.distinct);
out.scrollLinkedCandidates = report.slice(0, 40);
out.pageHeights = { down: Object.fromEntries(Object.entries(down).map(([y, v]) => [y, v.actual])) };

// running animations per section stop (names, targets, timing)
out.animsAt = {};
for (const y of [1200, 3000, 6200, 6800, 7600, 10400]) {
  await goTo(y); await sleep(600);
  out.animsAt[y] = await page.evaluate(() => document.getAnimations().filter(a => a.playState === 'running').map(a => { const e = a.effect; const t = e.getTiming(); const tg = e.target; const kf = e.getKeyframes ? e.getKeyframes().map(k => Object.fromEntries(Object.entries(k).filter(([n]) => !['offset', 'computedOffset', 'composite'].includes(n)).map(([n, v]) => [n, String(v).slice(0, 40)]))).slice(0, 3) : []; return { type: a.constructor.name, name: a.animationName || a.transitionProperty || null, dur: t.duration, iter: t.iterations === Infinity ? 'inf' : t.iterations, easing: t.easing, tgt: (tg.tagName || '').toLowerCase() + '.' + String(tg.className && tg.className.baseVal !== undefined ? tg.className.baseVal : tg.className).slice(0, 50), kf }; }).reduce((acc, a) => { const k = a.type + '|' + a.name + '|' + a.dur + '|' + a.easing + '|' + a.tgt; acc[k] = acc[k] || { ...a, n: 0 }; acc[k].n++; return acc; }, {}));
}
// flatten
for (const y of Object.keys(out.animsAt)) out.animsAt[y] = Object.values(out.animsAt[y]).slice(0, 14);

// footer layers vs scroll
out.footerLayers = {};
for (const y of [8200, 8800, 9400, 10000, 10600, 11200, 11658]) {
  await goTo(y);
  out.footerLayers[y] = await page.evaluate(() => [...document.querySelectorAll('.fixed.inset-0, footer > div, footer [class*="absolute"][class*="inset"]')].slice(0, 8).map(e => { const s = getComputedStyle(e); const r = e.getBoundingClientRect(); return { cls: String(e.className).slice(0, 55), op: s.opacity, tf: s.transform.slice(0, 50), bg: s.backgroundImage.slice(0, 80), top: Math.round(r.top), h: Math.round(r.height) }; }));
}
await goTo(0);

// scroll-trap test: wheel at x=720 over the product windows at several scrollY; compare with gutter
out.scrollTrap = [];
for (const y of [2000, 2400, 3300, 4500]) {
  await goTo(y);
  const info = await page.evaluate(() => { const els = document.elementsFromPoint(720, 450); const sc = []; for (const e of els) { const s = getComputedStyle(e); if (/(auto|scroll)/.test(s.overflowY) && e.scrollHeight > e.clientHeight + 2) sc.push({ cls: String(e.className).slice(0, 60), overflowY: s.overflowY, overscroll: s.overscrollBehaviorY, sh: e.scrollHeight, ch: e.clientHeight, st: Math.round(e.scrollTop) }); } return sc.slice(0, 3); });
  await page.mouse.move(720, 450);
  const before = await page.evaluate(() => scrollY);
  for (let i = 0; i < 4; i++) { await page.mouse.wheel(0, 250); await sleep(120); }
  await sleep(500);
  const after = await page.evaluate(() => scrollY);
  const inner = await page.evaluate(() => { const els = document.elementsFromPoint(720, 450); for (const e of els) { const s = getComputedStyle(e); if (/(auto|scroll)/.test(s.overflowY) && e.scrollHeight > e.clientHeight + 2) return Math.round(e.scrollTop); } return null; });
  out.scrollTrap.push({ y, scrollers: info, pageMoved: after - before, innerScrollTopAfter: inner });
  await page.mouse.move(30, 450);
}

// testimonials: find section, record structure, hover each card and sample widths over time (hover only)
await goTo(5800);
await sleep(800);
out.testi = await page.evaluate(() => { const q = [...document.querySelectorAll('p,blockquote,div')].find(e => /simply the best platform/.test(e.textContent) && e.children.length === 0); if (!q) return null; let c = q; for (let i = 0; i < 6 && c; i++, c = c.parentElement) if (c.children.length >= 5) break; const cards = [...c.children].map(k => { const r = k.getBoundingClientRect(); const s = getComputedStyle(k); return { w: Math.round(r.width), h: Math.round(r.height), tr: s.transition.slice(0, 120), bg: s.backgroundColor, rad: s.borderRadius, flex: s.flex, text: (k.innerText || '').trim().replace(/\s+/g, ' ').slice(0, 50) }; }); return { container: String(c.className).slice(0, 80), n: cards.length, cards }; });
const cardBoxes = await page.evaluate(() => { const q = [...document.querySelectorAll('p,blockquote,div')].find(e => /simply the best platform/.test(e.textContent) && e.children.length === 0); let c = q; for (let i = 0; i < 6 && c; i++, c = c.parentElement) if (c.children.length >= 5) break; return [...c.children].map(k => { const r = k.getBoundingClientRect(); return [r.x, r.y, r.width, r.height]; }); });
if (cardBoxes.length) {
  const b = cardBoxes[0];
  const widths = () => page.evaluate(() => { const q = [...document.querySelectorAll('p,blockquote,div')].find(e => /simply the best platform/.test(e.textContent) && e.children.length === 0); let c = q; for (let i = 0; i < 6 && c; i++, c = c.parentElement) if (c.children.length >= 5) break; return [...c.children].map(k => Math.round(k.getBoundingClientRect().width)); });
  out.testiWidthsBefore = await widths();
  await page.mouse.move(b[0] + b[2] / 2, b[1] + b[3] / 2);
  const seq = []; const t0 = Date.now(); for (let i = 0; i < 6; i++) { seq.push([Date.now() - t0, await widths()]); await sleep(100); }
  out.testiWidthsHoverSeq = seq;
  out.testiHoverStyle = await page.evaluate(([x, y]) => { const el = document.elementFromPoint(x, y); let c = el; const s = getComputedStyle(c); return { cls: String(c.className).slice(0, 60), bg: s.backgroundColor, cursor: s.cursor }; }, [b[0] + b[2] / 2, b[1] + b[3] / 2]);
  await page.mouse.move(30, 450);
  // auto-rotation: does the expanded card change by itself over 8 s?
  const w0 = await widths(); await sleep(8000); const w1 = await widths();
  out.testiAutoRotate = { before: w0, after8s: w1 };
}
await page.screenshot({ path: path.join(SCR, 'testi.jpg'), type: 'jpeg', quality: 60 });

// product window churn: first window (section 2) while in view
await goTo(1500);
await sleep(500);
out.window1 = await page.evaluate(() => new Promise(res => {
  const imgs = [...document.querySelectorAll('img[src*="tonalism"]')]; const card = imgs[0] && imgs[0].parentElement; if (!card) return res(null);
  const win = [...card.querySelectorAll('*')].find(e => /adaline\.ai\/(traces|behaviors)/.test(e.textContent) && e.children.length > 3) || card;
  const before = card.innerText.replace(/\s+/g, ' ').slice(0, 220);
  let cd = 0, ch = 0, at = 0; const mo = new MutationObserver(l => { for (const m of l) { if (m.type === 'characterData') cd++; else if (m.type === 'childList') ch++; else at++; } });
  mo.observe(card, { subtree: true, characterData: true, childList: true, attributes: true });
  setTimeout(() => { mo.disconnect(); res({ before, after: card.innerText.replace(/\s+/g, ' ').slice(0, 220), seconds: 6, characterData: cd, childList: ch, attributes: at, windowDomNodes: card.querySelectorAll('*').length, cardRect: card.getBoundingClientRect().height }); }, 6000);
}));
// painting image details: object-fit, transforms
out.painting = await page.evaluate(() => [...document.querySelectorAll('img[src*="tonalism"]')].slice(0, 2).map(i => { const s = getComputedStyle(i); const p = i.parentElement; const ps = getComputedStyle(p); return { objectFit: s.objectFit, tf: s.transform, scale: s.scale, willChange: s.willChange, parentRad: ps.borderRadius, parentOverflow: ps.overflow, parentH: Math.round(p.getBoundingClientRect().height), parentW: Math.round(p.getBoundingClientRect().width), overlayCls: [...p.children].map(c => String(c.className).slice(0, 60)) }; }));
// Ship Once diagram
await goTo(6200);
out.ship = await page.evaluate(() => { const sec = [...document.querySelectorAll('section')].find(s => /Ship\s*Once/i.test(s.textContent)); if (!sec) return null; const h = sec.querySelector('h2'); const hs = getComputedStyle(h); const svg = sec.querySelector('svg'); const paths = svg ? [...svg.querySelectorAll('path')].map(p => { const s = getComputedStyle(p); return { stroke: s.stroke, sw: s.strokeWidth, dash: s.strokeDasharray.slice(0, 30), off: s.strokeDashoffset, op: s.opacity }; }) : null; const nodes = [...sec.querySelectorAll('span, div')].filter(e => /^(trace|behaviors|evals & data|improve)$/i.test((e.textContent || '').trim()) && e.children.length <= 1).map(e => { const s = getComputedStyle(e); const r = e.getBoundingClientRect(); return { t: e.textContent.trim(), font: s.fontFamily.slice(0, 30), size: s.fontSize, ls: s.letterSpacing, color: s.color, w: Math.round(r.width), h: Math.round(r.height) }; }); return { h2: { font: hs.fontFamily.slice(0, 40), size: hs.fontSize, lh: hs.lineHeight, ls: hs.letterSpacing, weight: hs.fontWeight, color: hs.color }, bg: getComputedStyle(sec).backgroundColor, paths, nodes: nodes.slice(0, 8) }; });
// other typography samples
out.typeSamples = await page.evaluate(() => { const g = (el) => { if (!el) return null; const s = getComputedStyle(el); return { font: s.fontFamily.slice(0, 40), size: s.fontSize, lh: s.lineHeight, ls: s.letterSpacing, wt: s.fontWeight, color: s.color, tt: s.textTransform }; }; const find = re => [...document.querySelectorAll('h2,h3,p,span,a,div')].find(e => re.test((e.textContent || '').trim()) && e.children.length === 0); return { footerCTA: g(find(/^Self-improve your agents now\.$/)), enterprise: g(find(/^Enterprise controls/)), soc2p: g(find(/^SOC 2 Type II/)), quote: g(find(/simply the best platform/)), quoteName: g(find(/^Ian W\.$/)), footerLink: g(find(/^Documentation$/)), footerCol: g(find(/^Company$/i)), copyright: g(find(/Adaline Inc/)), windowMono: g(find(/kafka\.consumer|committed offset/)), windowTitle: g(find(/^BEHAVIORS$/)) }; });
// contrast helper values: bg and text rgba for hero sub
out.heroSub = await page.evaluate(() => { const p = [...document.querySelectorAll('p')].find(e => /improve their agents autonomously/.test(e.textContent)); const s = getComputedStyle(p); return { color: s.color, size: s.fontSize, lh: s.lineHeight, ls: s.letterSpacing, wt: s.fontWeight, font: s.fontFamily.slice(0, 30), maxW: s.maxWidth, w: Math.round(p.getBoundingClientRect().width), textWrap: s.textWrap }; });
await browser.close();
fs.writeFileSync(path.join(SCR, 'e.json'), JSON.stringify(out, null, 1));
console.log('ok', Object.keys(out).join(','));
