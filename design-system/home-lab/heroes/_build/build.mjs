import fs from 'node:fs';
import A from './hero-a.mjs'; import Bm from './hero-b.mjs'; import C from './hero-c.mjs'; import D from './hero-d.mjs';
const out = '..';
const files = { 'hero-a-reskin.html': A, 'hero-b-editorial.html': Bm, 'hero-c-pair.html': C, 'hero-d-your-name.html': D };
for (const [f, fn] of Object.entries(files)) { const h = fn(); fs.writeFileSync(`${out}/${f}`, h); console.log(f, (h.length / 1024).toFixed(1) + ' KB'); }
