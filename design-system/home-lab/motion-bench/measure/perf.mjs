// CPU-throttled (default 4x) session profile: long tasks / TBT-style blocking time over load + scripted scroll, INP from scripted interactions,
// CLS, frame-time distribution during a scripted wheel (desktop) or touch (mobile) scroll, CDP Performance metrics.
// usage: node perf.mjs <id> <url> [--runs=3] [--cpu=4] [--mobile] [--out=../results/perf-<id>.json]
import { chromium } from '../../tools/node_modules/playwright-core/index.mjs';
import fs from 'node:fs';
const [id, url, ...rest] = process.argv.slice(2); const o = Object.fromEntries(rest.map(a => a.replace(/^--/, '').split('='))); const runs = +(o.runs || 3), cpu = +(o.cpu || 4), mobile = 'mobile' in o;
const INIT = () => {
  const S = window.__m = { lt: [], cls: 0, ev: [], frames: [], rec: false, t0: performance.now() };
  try { new PerformanceObserver(l => l.getEntries().forEach(e => S.lt.push([Math.round(e.startTime), Math.round(e.duration)]))).observe({ type: 'longtask', buffered: true }); } catch {}
  try { new PerformanceObserver(l => l.getEntries().forEach(e => { if (!e.hadRecentInput) S.cls += e.value; })).observe({ type: 'layout-shift', buffered: true }); } catch {}
  try { new PerformanceObserver(l => l.getEntries().forEach(e => { if (e.interactionId) S.ev.push({ n: e.name, d: Math.round(e.duration), it: Math.round(e.processingEnd - e.processingStart), id: e.interactionId }); })).observe({ type: 'event', durationThreshold: 16, buffered: true }); } catch {}
  let last = 0; const tick = t => { if (S.rec && last) S.frames.push(t - last); last = t; requestAnimationFrame(tick); }; requestAnimationFrame(tick);
};
const pct = (a, p) => { const s = [...a].sort((x, y) => x - y); return s.length ? +s[Math.min(s.length - 1, Math.floor(s.length * p))].toFixed(1) : null; };
const med = a => { const s = [...a].filter(x => x != null).sort((x, y) => x - y); return s.length ? s[Math.floor(s.length / 2)] : null; };
const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const results = [];
for (let r = 0; r < runs; r++) {
  const ctx = await b.newContext(mobile ? { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true } : { viewport: { width: 1280, height: 720 } });
  await ctx.addInitScript(INIT); const p = await ctx.newPage(); const cdp = await ctx.newCDPSession(p);
  await cdp.send('Performance.enable'); await cdp.send('Emulation.setCPUThrottlingRate', { rate: cpu });
  const t0 = Date.now(); await p.goto(url, { waitUntil: 'load' }); await p.waitForTimeout(2500);
  const loadEnd = await p.evaluate(() => performance.now());
  // scripted scroll over the whole page, recording frames
  const H = await p.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  await p.evaluate(() => { window.__m.rec = true; });
  if (mobile) { for (let y = 0; y < H; y += 1200) { await cdp.send('Input.synthesizeScrollGesture', { x: 195, y: 600, yDistance: -Math.min(1200, H - y), speed: 3000, gestureSourceType: 'touch' }); } }
  else { await p.mouse.move(640, 360); const step = 60; for (let y = 0; y < H; y += step) { await p.mouse.wheel(0, step); await p.waitForTimeout(16); } }
  await p.waitForTimeout(800); await p.evaluate(() => { window.__m.rec = false; });
  // interactions (INP): scroll to the toggle, then click x3, Tab+Enter x2
  if (await p.$('#toggle')) {
  await p.evaluate(() => (window.__lenis ? window.__lenis.scrollTo(document.getElementById('toggle'), { immediate: true, offset: -200 }) : document.getElementById('toggle').scrollIntoView({ block: 'center' }))); await p.waitForTimeout(500);
  for (let i = 0; i < 3; i++) { await p.click('#toggle'); await p.waitForTimeout(250); }
  await p.focus('#toggle'); for (let i = 0; i < 2; i++) { await p.keyboard.press('Enter'); await p.waitForTimeout(250); }
  }
  await p.waitForTimeout(500);
  const m = await p.evaluate(() => window.__m); const perfm = Object.fromEntries((await cdp.send('Performance.getMetrics')).metrics.map(x => [x.name, x.value]));
  const lt = m.lt, tbtLoad = lt.filter(x => x[0] < loadEnd).reduce((s, x) => s + Math.max(0, x[1] - 50), 0), tbtAll = lt.reduce((s, x) => s + Math.max(0, x[1] - 50), 0);
  const fr = m.frames, dropped = fr.reduce((s, d) => s + Math.max(0, Math.round(d / 16.7) - 1), 0);
  const inp = m.ev.length ? Math.max(...m.ev.map(e => e.d)) : null;
  results.push({ loadMs: Date.now() - t0, longTasksLoad: lt.filter(x => x[0] < loadEnd).length, longTasksAll: lt.length, tbtLoadMs: tbtLoad, tbtSessionMs: tbtAll, maxLongTask: lt.length ? Math.max(...lt.map(x => x[1])) : 0,
    cls: +m.cls.toFixed(4), inpMs: inp, interactions: new Set(m.ev.map(e => e.id)).size,
    frames: fr.length, frameP50: pct(fr, .5), frameP95: pct(fr, .95), frameP99: pct(fr, .99), frameMax: fr.length ? +Math.max(...fr).toFixed(1) : null, pctOver20: fr.length ? +(100 * fr.filter(d => d > 20).length / fr.length).toFixed(1) : null, pctOver33: fr.length ? +(100 * fr.filter(d => d > 33.4).length / fr.length).toFixed(1) : null, droppedFrames: dropped,
    scriptMs: Math.round(perfm.ScriptDuration * 1000), taskMs: Math.round(perfm.TaskDuration * 1000), layoutMs: Math.round(perfm.LayoutDuration * 1000), styleMs: Math.round(perfm.RecalcStyleDuration * 1000), heapMB: +(perfm.JSHeapUsedSize / 1048576).toFixed(1) });
  await ctx.close();
}
await b.close();
const keys = Object.keys(results[0]).filter(k => typeof results[0][k] === 'number' || results[0][k] === null); const median = Object.fromEntries(keys.map(k => [k, med(results.map(x => x[k]))]));
const out = { id, url, cpuThrottle: cpu, mobile, runs: results, median, date: new Date().toISOString() };
fs.writeFileSync(o.out || `../results/perf-${id}${mobile ? '-mobile' : ''}.json`, JSON.stringify(out, null, 1));
console.log(id.padEnd(14), mobile ? 'mobile' : 'desktop', `cpu x${cpu}`, '| TBT(load)', median.tbtLoadMs, 'TBT(session)', median.tbtSessionMs, 'maxLT', median.maxLongTask, '| INP', median.inpMs, 'CLS', median.cls, '| frame p95', median.frameP95, 'p99', median.frameP99, '>33ms%', median.pctOver33, 'dropped', median.droppedFrames, '| script ms', median.scriptMs);
