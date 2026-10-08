// Builds the motion-bench candidates into dist/ and records raw / gzip / brotli sizes.
//   S0 native only | S1 S0 + Lenis | S2 GSAP(+ScrollTrigger+SplitText) | S3 Lenis + GSAP | S4 React + framer-motion (SSR + hydrate, as the 21st.dev prompts are written)
import esbuild from '../tools/node_modules/esbuild/lib/main.js';
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { scene } from './src/scene.mjs';

const TN = path.resolve('../tools/node_modules');
const ALIAS = Object.fromEntries(['react', 'react-dom', 'framer-motion', 'lenis', 'gsap', 'ogl'].map(n => [n, path.join(TN, n)]));
const DIST = 'dist'; fs.rmSync(DIST, { recursive: true, force: true }); fs.mkdirSync(`${DIST}/fonts`, { recursive: true });
fs.copyFileSync('../../fonts/Geist-Variable.subset.woff2', `${DIST}/fonts/Geist-Variable.subset.woff2`);
const read = p => fs.readFileSync(p, 'utf8');
const base = read('src/base.css');
const lenisCss = read('../tools/node_modules/lenis/dist/lenis.css');
const sizes = {};
const gz = b => zlib.gzipSync(b, { level: 9 }).length;
const br = b => zlib.brotliCompressSync(b, { params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 11 } }).length;
const write = (name, data) => { fs.writeFileSync(path.join(DIST, name), data); const b = Buffer.from(data); sizes[name] = { raw: b.length, gzip: gz(b), brotli: br(b) }; };

async function bundle(entry, out, { jsx = false } = {}) {
  const r = await esbuild.build({ entryPoints: [entry], bundle: true, minify: true, format: 'iife', target: 'es2020', write: false, legalComments: 'none', treeShaking: true, nodePaths: [TN], alias: ALIAS,
    define: { 'process.env.NODE_ENV': '"production"' }, loader: jsx ? { '.js': 'jsx' } : {}, jsx: 'automatic', metafile: true });
  const f = r.outputFiles[0]; write(out, f.text);
  return Object.entries(r.metafile.outputs)[0][1].inputs;
}
const FONTPRE = '<link rel="preload" href="fonts/Geist-Variable.subset.woff2" as="font" type="font/woff2" crossorigin>';
const head = (id, title, css) => `<!doctype html><html lang="en-IN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><meta name="robots" content="noindex"><link rel="icon" href="data:,">${FONTPRE}<link rel="stylesheet" href="${css}"></head>`;
const later = src => `<script>addEventListener('load',function(){setTimeout(function(){var s=document.createElement('script');s.src='${src}';document.head.appendChild(s)},0)})</script>`;

const variants = {};
// ---- S0: native ----
write('s0.css', base + read('src/native.css'));
await bundle('src/s0.js', 's0.js');
write('s0.html', head('s0', 'Bench S0 native', 's0.css') + `<body>${scene({ variant: 'S0 native' })}<script src="s0.js" defer></script></body></html>`);
// ---- S1: native + Lenis ----
write('s1.css', base + read('src/native.css') + lenisCss);
await bundle('src/s1-lenis.js', 's1.js');
write('s1.html', head('s1', 'Bench S1 native + Lenis', 's1.css') + `<body>${scene({ variant: 'S1 native + Lenis' })}<script src="s0.js" defer></script>${later('s1.js')}</body></html>`);
// ---- S2: GSAP ----
const gsapPre = `<script>document.documentElement.classList.add('js')</script>`;
write('s2.css', base + read('src/s2.css'));
const s2in = await bundle('src/s2.js', 's2.js');
write('s2.html', head('s2', 'Bench S2 GSAP', 's2.css') + `<body>${scene({ variant: 'S2 GSAP', wordsMarkup: 'raw' })}${later('s2.js')}</body></html>`);
// ---- S3: Lenis + GSAP ----
write('s3.css', base + read('src/s2.css') + lenisCss);
await bundle('src/s3.js', 's3.js');
write('s3.html', head('s3', 'Bench S3 Lenis + GSAP', 's3.css') + `<body>${scene({ variant: 'S3 Lenis + GSAP', wordsMarkup: 'raw' })}${later('s3.js')}</body></html>`);
// ---- S4: React + framer-motion, SSR then hydrate ----
const ssr = await esbuild.build({ entryPoints: ['src/s4/ssr.jsx'], bundle: true, platform: 'node', format: 'cjs', write: false, jsx: 'automatic', loader: { '.js': 'jsx' }, nodePaths: [TN], alias: ALIAS, define: { 'process.env.NODE_ENV': '"production"' } });
fs.mkdirSync('.cache', { recursive: true }); fs.writeFileSync('.cache/ssr.cjs', ssr.outputFiles[0].text);
const { createRequire } = await import('node:module');
const { render } = createRequire(import.meta.url)(path.resolve('.cache/ssr.cjs'));
const s4html = render();
write('s4.css', base);
await bundle('src/s4/client.jsx', 's4.js', { jsx: true });
write('s4.html', head('s4', 'Bench S4 React + framer-motion', 's4.css') + `<body><div id="root">${s4html}</div><script>if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('pin')</script><script src="s4.js" defer></script></body></html>`);

// ---- summary: bytes by role ----
const totals = {};
const defs = { s0: { early: ['s0.js'], late: [] }, s1: { early: ['s0.js'], late: ['s1.js'] }, s2: { early: [], late: ['s2.js'] }, s3: { early: [], late: ['s3.js'] }, s4: { early: ['s4.js'], late: [] } };
for (const [id, d] of Object.entries(defs)) {
  const sum = (arr, k) => arr.reduce((a, f) => a + sizes[f][k], 0);
  totals[id] = { html: sizes[`${id}.html`], css: sizes[`${id}.css`], jsBeforeFirstPaint: { gzip: sum(d.early, 'gzip'), brotli: sum(d.early, 'brotli'), raw: sum(d.early, 'raw') }, jsAfterLoad: { gzip: sum(d.late, 'gzip'), brotli: sum(d.late, 'brotli'), raw: sum(d.late, 'raw') } };
  totals[id].jsTotal = { gzip: totals[id].jsBeforeFirstPaint.gzip + totals[id].jsAfterLoad.gzip, brotli: totals[id].jsBeforeFirstPaint.brotli + totals[id].jsAfterLoad.brotli, raw: totals[id].jsBeforeFirstPaint.raw + totals[id].jsAfterLoad.raw };
}
fs.writeFileSync('results/bundle-sizes.json', JSON.stringify({ built: new Date().toISOString(), files: sizes, totals }, null, 2));
// precompress for the static server
for (const f of fs.readdirSync(DIST)) { const p = path.join(DIST, f); if (fs.statSync(p).isFile() && /\.(html|css|js|svg)$/.test(f)) { const b = fs.readFileSync(p); fs.writeFileSync(p + '.br', zlib.brotliCompressSync(b)); fs.writeFileSync(p + '.gz', zlib.gzipSync(b, { level: 9 })); } }
console.table(Object.fromEntries(Object.entries(totals).map(([k, v]) => [k, { 'js<paint gz': v.jsBeforeFirstPaint.gzip, 'js late gz': v.jsAfterLoad.gzip, 'js total gz': v.jsTotal.gzip, 'js total br': v.jsTotal.brotli, 'css gz': v.css.gzip, 'html gz': v.html.gzip }])));
