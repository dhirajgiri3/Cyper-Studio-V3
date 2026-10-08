// CPU cost of an idle atmosphere: sum of CPU seconds across ALL browser processes (browser, renderer, GPU, utility) per wall-clock second,
// from CDP SystemInfo.getProcessInfo, sampled over a 6 s window after a 3 s settle. Video decode and WebGL show up here, not on the main thread.
import { chromium } from '../../tools/node_modules/playwright-core/index.mjs';
import fs from 'node:fs';
const pages = ['none', 'webp', 'webp-grain', 'video', 'webgl']; const RUNS = 3;
const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--enable-gpu-rasterization', '--ignore-gpu-blocklist'] });
const bc = await b.newBrowserCDPSession();
const snap = async () => { const r = await bc.send('SystemInfo.getProcessInfo'); const by = {}; for (const p of r.processInfo) by[p.type] = (by[p.type] || 0) + p.cpuTime; return by; };
const res = {}; const med = a => [...a].sort((x, y) => x - y)[Math.floor(a.length / 2)];
for (const name of pages) {
  const runs = [];
  for (let i = 0; i < RUNS; i++) {
    const ctx = await b.newContext({ viewport: { width: 1280, height: 720 } }); const p = await ctx.newPage();
    await p.goto(`http://127.0.0.1:4173/atmos-${name}.html`, { waitUntil: 'load' }); await p.waitForTimeout(3000);
    const a = await snap(); const t0 = Date.now(); await p.waitForTimeout(6000); const c = await snap(); const dt = (Date.now() - t0) / 1000;
    const per = Object.fromEntries(Object.keys(c).map(k => [k, +(((c[k] || 0) - (a[k] || 0)) / dt).toFixed(3)])); const total = +Object.values(per).reduce((s, v) => s + v, 0).toFixed(3);
    const fps = await p.evaluate(() => new Promise(r => { let n = 0, t = performance.now(); const f = () => { n++; if (performance.now() - t < 1000) requestAnimationFrame(f); else r(n); }; requestAnimationFrame(f); }));
    runs.push({ total, per, rafPerSecond: fps }); await ctx.close();
  }
  res[name] = { cpuSecondsPerSecond_median: med(runs.map(r => r.total)), perProcessType_run1: runs[0].per, rafPerSecond: med(runs.map(r => r.rafPerSecond)), runs: runs.map(r => r.total) };
  console.log(name.padEnd(12), 'CPU s/s (all processes):', res[name].cpuSecondsPerSecond_median, JSON.stringify(runs[0].per), 'rAF/s', res[name].rafPerSecond);
}
await b.close(); fs.writeFileSync('../results/atmos-cost.json', JSON.stringify(res, null, 1));
