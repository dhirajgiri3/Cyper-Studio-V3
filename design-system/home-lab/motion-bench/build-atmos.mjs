// Atmosphere comparison assets and pages: A1 WebP/AVIF still, A2 muted looping video, A3 OGL WebGL. Abstract only: no UI, people, text or logos.
import fs from 'node:fs'; import path from 'node:path'; import zlib from 'node:zlib';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module'; const sharp = createRequire(import.meta.url)('../tools/node_modules/sharp');
import esbuild from '../tools/node_modules/esbuild/lib/main.js';
const ffmpeg = createRequire(import.meta.url)('../tools/node_modules/ffmpeg-static');
const TN = path.resolve('../tools/node_modules'); const D = 'dist';
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
<defs><filter id="d" x="-20%" y="-20%" width="140%" height="140%"><feTurbulence type="fractalNoise" baseFrequency=".004 .007" numOctaves="3" seed="7" result="t"/><feDisplacementMap in="SourceGraphic" in2="t" scale="120" xChannelSelector="R" yChannelSelector="G"/><feGaussianBlur stdDeviation="3"/></filter>
<filter id="g"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="3" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 .2  0 0 0 0 .25  0 0 0 0 .5  0 0 0 .55 -.12"/></filter>
<linearGradient id="r1" x1="0" x2="1"><stop offset="0" stop-color="#4161F4" stop-opacity=".05"/><stop offset=".5" stop-color="#4161F4" stop-opacity=".55"/><stop offset="1" stop-color="#2F49BE" stop-opacity=".12"/></linearGradient></defs>
<rect width="1600" height="900" fill="#F3F5F8"/>
<g filter="url(#d)"><path d="M-100 620C250 380 520 760 860 520S1300 160 1720 330L1720 470C1320 340 1060 720 760 700S250 560 -100 760Z" fill="url(#r1)"/>
<path d="M-100 420C200 260 520 520 820 340S1260 60 1720 180L1720 240C1280 150 1000 470 800 450S240 330 -100 520Z" fill="url(#r1)" opacity=".6"/></g>
<rect width="1600" height="900" filter="url(#g)" opacity=".5"/></svg>`;
fs.mkdirSync('.cache', { recursive: true }); fs.writeFileSync('.cache/ribbon.svg', svg);
execFileSync('rsvg-convert', ['-o', '.cache/ribbon.png', '.cache/ribbon.svg']);
const png = '.cache/ribbon.png';
await sharp(png).webp({ quality: 70, effort: 6 }).toFile(`${D}/ribbon.webp`);
// heavy-grain still: monochrome gaussian-ish noise overlay, to show what real grain does to bytes
{ const W = 1600, H = 900, buf = Buffer.alloc(W * H); for (let i = 0; i < buf.length; i++) { let v = 0; for (let k = 0; k < 4; k++) v += Math.random(); buf[i] = Math.max(0, Math.min(255, Math.round(128 + (v - 2) * 70))); }
  const noise = await sharp(buf, { raw: { width: W, height: H, channels: 1 } }).png().toBuffer();
  await sharp(png).composite([{ input: noise, blend: 'soft-light' }]).webp({ quality: 70, effort: 6 }).toFile(`${D}/ribbon-grain.webp`); }
await sharp(png).avif({ quality: 45, effort: 6 }).toFile(`${D}/ribbon.avif`);
await sharp(png).resize(780, 439).webp({ quality: 68, effort: 6 }).toFile(`${D}/ribbon-390.webp`);
// 8 s seamless loop: a slow sinusoidal pan over the still (2x the pixel area of the still is not needed; 1280x720 crop)
const run = a => execFileSync(ffmpeg, ['-y', '-loglevel', 'error', ...a]);
const vf = "fps=24,crop=w=1280:h=720:x='(iw-ow)/2+(iw-ow)/2*sin(2*PI*t/8)':y='(ih-oh)/2+(ih-oh)/2*cos(2*PI*t/8)',format=yuv420p";
run(['-loop', '1', '-t', '8', '-i', png, '-vf', vf, '-c:v', 'libx264', '-crf', '30', '-preset', 'slow', '-an', '-movflags', '+faststart', `${D}/ribbon.mp4`]);
run(['-loop', '1', '-t', '8', '-i', png, '-vf', vf, '-c:v', 'libvpx-vp9', '-crf', '38', '-b:v', '0', '-an', `${D}/ribbon.webm`]);
const r = await esbuild.build({ entryPoints: ['src/atmos/webgl.js'], bundle: true, minify: true, format: 'iife', target: 'es2020', write: false, nodePaths: [TN], alias: { ogl: path.join(TN, 'ogl') }, treeShaking: true });
fs.writeFileSync(`${D}/atmos-webgl.js`, r.outputFiles[0].text);
// pages: same hero, different atmosphere
const base = fs.readFileSync('src/base.css', 'utf8');
const css = base + `
.a-hero{position:relative;min-height:calc(100svh - 64px);display:grid;align-items:center;overflow:hidden;isolation:isolate}
.a-bg{position:absolute;inset:0;z-index:-1;width:100%;height:100%;object-fit:cover;display:block}
.a-hero h1{max-width:12ch}`;
fs.writeFileSync(`${D}/atmos.css`, css);
const mk = (id, bg, tail = '') => `<!doctype html><html lang="en-IN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Atmosphere ${id}</title><meta name="robots" content="noindex"><link rel="icon" href="data:,"><link rel="preload" href="fonts/Geist-Variable.subset.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="atmos.css"></head><body>
<header class="hdr"><span class="brand">HELIX <i>bench ${id}</i></span></header>
<main><section class="a-hero">${bg}<div class="wrap"><h1>Run your own branded shipping platform.</h1><p class="sub">Atmosphere bench. Abstract background only.</p><p><a class="btn" href="#">Request a demo</a></p></div></section></main>${tail}</body></html>`;
fs.writeFileSync(`${D}/atmos-none.html`, mk('none', ''));
fs.writeFileSync(`${D}/atmos-webp.html`, mk('webp', `<picture><source media="(max-width:600px)" srcset="ribbon-390.webp" type="image/webp"><source srcset="ribbon.avif" type="image/avif"><img class="a-bg" src="ribbon.webp" width="1600" height="900" alt="" fetchpriority="low" decoding="async"></picture>`));
fs.writeFileSync(`${D}/atmos-webp-grain.html`, mk('webp-grain', `<img class="a-bg" src="ribbon-grain.webp" width="1600" height="900" alt="" fetchpriority="low" decoding="async">`));
fs.writeFileSync(`${D}/atmos-video.html`, mk('video', `<video class="a-bg" autoplay muted loop playsinline preload="metadata" poster="ribbon.webp" aria-hidden="true"><source src="ribbon.webm" type="video/webm"><source src="ribbon.mp4" type="video/mp4"></video>`, `<script>if(matchMedia('(prefers-reduced-motion: reduce)').matches){var v=document.querySelector('video');v.removeAttribute('autoplay');v.pause()}</script>`));
fs.writeFileSync(`${D}/atmos-webgl.html`, mk('webgl', `<canvas id="atmos" class="a-bg" aria-hidden="true"></canvas>`, `<script>addEventListener('load',function(){var s=document.createElement('script');s.src='atmos-webgl.js';document.head.appendChild(s)})</script>`));
for (const f of ['atmos.css', 'atmos-webgl.js', 'atmos-none.html', 'atmos-webp.html', 'atmos-webp-grain.html', 'atmos-video.html', 'atmos-webgl.html']) { const b = fs.readFileSync(path.join(D, f)); fs.writeFileSync(path.join(D, f + '.br'), zlib.brotliCompressSync(b)); fs.writeFileSync(path.join(D, f + '.gz'), zlib.gzipSync(b, { level: 9 })); }
const sz = f => fs.statSync(path.join(D, f)).size;
const out = { ribbonWebp: sz('ribbon.webp'), ribbonAvif: sz('ribbon.avif'), ribbonGrainWebp: sz('ribbon-grain.webp'), ribbon390Webp: sz('ribbon-390.webp'), videoMp4: sz('ribbon.mp4'), videoWebm: sz('ribbon.webm'), webglJs: { raw: sz('atmos-webgl.js'), gzip: zlib.gzipSync(fs.readFileSync(`${D}/atmos-webgl.js`), { level: 9 }).length, brotli: sz('atmos-webgl.js.br') } };
fs.writeFileSync('results/atmos-sizes.json', JSON.stringify(out, null, 2)); console.log(out);
