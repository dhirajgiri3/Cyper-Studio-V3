// Screenshot each bench variant at fixed progress points through the pinned sections, to verify they work and look the same.
import { chromium } from 'playwright-core'; import sharp from 'sharp';
const [outPrefix, ...variants] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
for (const v of variants) {
  const ctx = await b.newContext({ viewport: { width: 1280, height: 720 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => m.type() === 'error' && errs.push(m.text()));
  await p.goto(`http://127.0.0.1:4173/${v}.html`, { waitUntil: 'load' }); await p.waitForTimeout(2500);
  const pos = await p.evaluate(() => { const r = id => { const e = document.getElementById(id); return e.getBoundingClientRect().top + scrollY; }; return { lit: r('lit'), steps: r('steps'), panels: r('panels'), vh: innerHeight, h: document.documentElement.scrollHeight }; });
  const stops = [['top', 0], ['lit', pos.lit - 300], ['steps25', pos.steps + 0.55 * pos.vh], ['steps60', pos.steps + 1.5 * pos.vh], ['steps95', pos.steps + 2.6 * pos.vh], ['pan40', pos.panels + 1.2 * pos.vh], ['pan90', pos.panels + 2.8 * pos.vh]];
  const shots = [];
  for (const [n, y] of stops) { await p.evaluate(y => { (window.__lenis ? window.__lenis.scrollTo(y, { immediate: true }) : scrollTo(0, y)); }, y); await p.waitForTimeout(700); shots.push(await p.screenshot({ type: 'png' })); }
  const W = 640, H = 360; const comp = await sharp({ create: { width: W * 4, height: H * 2, channels: 3, background: '#fff' } }).composite(await Promise.all(shots.map(async (s, i) => ({ input: await sharp(s).resize(W, H).toBuffer(), left: (i % 4) * W, top: Math.floor(i / 4) * H })))).png().toBuffer();
  await sharp(comp).toFile(`${outPrefix}-${v}.png`); console.log(v, 'pageHeight', pos.h, 'errors:', errs.length ? errs.join(' | ') : 'none'); await ctx.close();
}
await b.close();
