// Lighthouse (mobile, default simulated throttling) N runs per URL. Writes results/lh-<id>.json with every run and the median.
// usage: node lh.mjs <runs> <id=url> [<id=url> ...]
import lighthouse from '../../tools/node_modules/lighthouse/core/index.cjs';
import * as chromeLauncher from '../../tools/node_modules/chrome-launcher/dist/index.js';
import fs from 'node:fs';
const [runs, ...pairs] = process.argv.slice(2);
const med = a => { const s = [...a].sort((x, y) => x - y); return s[Math.floor(s.length / 2)]; };
for (const pair of pairs) {
  const [id, url] = pair.split('='); const all = [];
  for (let i = 0; i < +runs; i++) {
    const chrome = await chromeLauncher.launch({ chromePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', chromeFlags: ['--headless=new', '--no-sandbox'] });
    try {
      const r = await lighthouse(url, { port: chrome.port, output: 'json', logLevel: 'error', onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'] });
      const L = r.lhr, a = L.audits, n = k => a[k] && a[k].numericValue != null ? Math.round(a[k].numericValue * 100) / 100 : null;
      const reqs = (a['network-requests']?.details?.items) || []; const by = t => reqs.filter(x => x.resourceType === t).reduce((s, x) => s + (x.transferSize || 0), 0);
      all.push({ perf: Math.round(L.categories.performance.score * 100), a11y: Math.round((L.categories.accessibility?.score ?? 0) * 100), bp: Math.round(L.categories['best-practices'].score * 100), seo: Math.round(L.categories.seo.score * 100),
        fcp: n('first-contentful-paint'), lcp: n('largest-contentful-paint'), tbt: n('total-blocking-time'), cls: n('cumulative-layout-shift'), si: n('speed-index'), tti: n('interactive'),
        requests: reqs.length, bytesTotal: n('total-byte-weight'), scriptBytes: by('Script'), cssBytes: by('Stylesheet'), imageBytes: by('Image'), mediaBytes: by('Media'), fontBytes: by('Font'), docBytes: by('Document'),
        mainThreadMs: n('mainthread-work-breakdown'), bootupMs: n('bootup-time'), lcpEl: (a['largest-contentful-paint-element']?.details?.items?.[0]?.items?.[0]?.node?.snippet || a['lcp-breakdown-insight']?.details?.items?.[0]?.node?.snippet || '').slice(0, 60) });
    } finally { await chrome.kill(); }
  }
  const keys = ['perf', 'fcp', 'lcp', 'tbt', 'cls', 'si', 'tti', 'scriptBytes', 'bytesTotal', 'mainThreadMs'];
  const median = Object.fromEntries(keys.map(k => [k, med(all.map(x => x[k]))]));
  fs.writeFileSync(`../results/lh-${id}.json`, JSON.stringify({ id, url, runs: all, median, date: new Date().toISOString() }, null, 1));
  console.log(id.padEnd(14), 'perf', all.map(x => x.perf).join(','), '| median LCP', median.lcp, 'TBT', median.tbt, 'CLS', median.cls, 'FCP', median.fcp, 'script B', median.scriptBytes);
}
