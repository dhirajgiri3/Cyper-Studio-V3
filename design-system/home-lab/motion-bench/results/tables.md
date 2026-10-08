### Bytes (built by esbuild, tree-shaken, minified; gzip level 9, brotli quality 11)

| Candidate | JS before first paint gz | JS loaded after `load` gz | JS total gz | JS total br | CSS gz | HTML gz |
|---|---|---|---|---|---|---|
| S0 | 0.5 KB | 0.0 KB | 0.5 KB | 0.4 KB | 2.5 KB | 1.6 KB |
| S1 | 0.5 KB | 5.5 KB | 6.0 KB | 5.3 KB | 2.7 KB | 1.7 KB |
| S2 | 0.0 KB | 47.1 KB | 47.1 KB | 42.6 KB | 1.9 KB | 1.5 KB |
| S3 | 0.0 KB | 52.4 KB | 52.4 KB | 47.2 KB | 2.0 KB | 1.5 KB |
| S4 | 112.3 KB | 0.0 KB | 112.3 KB | 98.0 KB | 1.8 KB | 1.7 KB |

### Lighthouse mobile (default simulated 4G + 4x CPU slowdown), 5 runs, medians

| ID | perf, 5 runs | median perf | FCP | LCP | TBT | CLS | Speed Index | script transfer | total transfer |
|---|---|---|---|---|---|---|---|---|---|
| s0 | 100, 100, 100, 100, 100 | 100 | 0.75 s | 1.20 s | 0 ms | 0 | 1.02 s | 0.6 KB | 30.5 KB |
| s1 | 100, 100, 100, 100, 100 | 100 | 0.75 s | 1.20 s | 0 ms | 0 | 1.02 s | 5.8 KB | 35.9 KB |
| s2 | 100, 100, 100, 100, 100 | 100 | 0.75 s | 1.25 s | 0 ms | 0 | 1.12 s | 42.8 KB | 72.0 KB |
| s3 | 100, 100, 100, 100, 100 | 100 | 0.75 s | 1.25 s | 0 ms | 0 | 1.13 s | 47.4 KB | 76.7 KB |
| s4 | 100, 100, 100, 99, 100 | 100 | 0.75 s | 1.71 s | 0 ms | 0 | 1.27 s | 98.2 KB | 127.5 KB |

### Atmosphere variants, Lighthouse mobile, 5 runs

| ID | perf, 5 runs | median perf | FCP | LCP | TBT | CLS | Speed Index | script transfer | total transfer |
|---|---|---|---|---|---|---|---|---|---|
| atmos-none | 100, 100, 100, 100, 100 | 100 | 0.75 s | 1.05 s | 0 ms | 0 | 0.75 s | 0.0 KB | 28.3 KB |
| atmos-webp | 100, 100, 100, 100, 100 | 100 | 0.75 s | 1.13 s | 0 ms | 0 | 0.75 s | 0.0 KB | 31.5 KB |
| atmos-webp-grain | 100, 100, 100, 100, 100 | 100 | 0.75 s | 1.13 s | 0 ms | 0 | 0.75 s | 0.0 KB | 158.6 KB |
| atmos-video | 100, 100, 100, 100, 100 | 100 | 0.76 s | 1.21 s | 0 ms | 0 | 0.93 s | 0.0 KB | 147.6 KB |
| atmos-webgl | 85, 100, 100, 100, 100 | 100 | 0.75 s | 1.10 s | 0 ms | 0 | 0.76 s | 11.6 KB | 39.9 KB |

### Heroes and baseline, Lighthouse mobile, 5 runs

| ID | perf, 5 runs | median perf | FCP | LCP | TBT | CLS | Speed Index | script transfer | total transfer |
|---|---|---|---|---|---|---|---|---|---|
| hero-a | 100, 100, 100, 100, 100 | 100 | 0.90 s | 1.20 s | 0 ms | 0 | 1.02 s | 0.0 KB | 76.5 KB |
| hero-b | 100, 100, 100, 100, 100 | 100 | 0.90 s | 1.20 s | 0 ms | 0 | 0.90 s | 0.0 KB | 74.4 KB |
| hero-c | 100, 100, 100, 100, 100 | 100 | 0.90 s | 1.20 s | 0 ms | 0 | 0.90 s | 0.0 KB | 78.1 KB |
| hero-d | 100, 100, 100, 100, 100 | 100 | 0.90 s | 1.20 s | 0 ms | 0 | 0.90 s | 0.0 KB | 75.7 KB |
| baseline | 88, 88, 89, 88, 91 | 88 | 3.12 s | 3.12 s | 0 ms | 0 | 3.12 s | 0.0 KB | 146.8 KB |

### CPU 4x throttle, desktop viewport 1280x720, scripted wheel scroll then interactions, medians of 3

| ID | TBT load | TBT whole session | longest task | INP (scripted) | CLS | frame p95 | frame p99 | frames >33 ms | dropped frames | script time |
|---|---|---|---|---|---|---|---|---|---|---|
| s0 | 11 ms | 11 ms | 61 ms | 24 ms | 0 | 16.8 ms | 16.8 ms | 0% | 1 | 16 ms |
| s1 | 0 ms | 0 ms | 0 ms | 16 ms | 0 | 16.7 ms | 16.8 ms | 0% | 0 | 33 ms |
| s2 | 23 ms | 23 ms | 73 ms | 16 ms | 0 | 16.7 ms | 16.8 ms | 0% | 1 | 88 ms |
| s3 | 27 ms | 27 ms | 77 ms | 16 ms | 0 | 16.7 ms | 16.8 ms | 0.3% | 1 | 128 ms |
| s4 | 43 ms | 43 ms | 92 ms | 16 ms | 0 | 16.8 ms | 16.8 ms | 0% | 2 | 226 ms |

### CPU 4x throttle, mobile viewport 390x844, touch scroll gestures, medians of 3

| ID | TBT load | TBT whole session | longest task | INP (scripted) | CLS | frame p95 | frame p99 | frames >33 ms | dropped frames | script time |
|---|---|---|---|---|---|---|---|---|---|---|
| s0 | 0 ms | 0 ms | 0 ms | 16 ms | 0 | 16.7 ms | 16.8 ms | 0% | 2 | 7 ms |
| s1 | 0 ms | 0 ms | 0 ms | 16 ms | 0 | 16.8 ms | 16.8 ms | 0% | 1 | 17 ms |
| s2 | 34 ms | 34 ms | 84 ms | 32 ms | 0 | 16.8 ms | 16.8 ms | 0% | 1 | 113 ms |
| s3 | 24 ms | 24 ms | 74 ms | 16 ms | 0 | 16.7 ms | 16.8 ms | 0% | 1 | 104 ms |
| s4 | 45 ms | 45 ms | 95 ms | 24 ms | 0 | 16.7 ms | 16.8 ms | 0% | 1 | 231 ms |

### S0 forced to its JS fallback path (`?fallback=1`), desktop

| ID | TBT load | TBT whole session | longest task | INP (scripted) | CLS | frame p95 | frame p99 | frames >33 ms | dropped frames | script time |
|---|---|---|---|---|---|---|---|---|---|---|
| s0-fallback | 0 ms | 0 ms | 0 ms | 16 ms | 0 | 16.8 ms | 16.8 ms | 0.4% | 2 | 22 ms |

### Atmosphere, CPU 4x, desktop, medians of 3

| ID | TBT load | TBT whole session | longest task | INP (scripted) | CLS | frame p95 | frame p99 | frames >33 ms | dropped frames | script time |
|---|---|---|---|---|---|---|---|---|---|---|
| atmos-none | 0 ms | 0 ms | 0 ms | null ms | 0 | 16.8 ms | 16.8 ms | 0% | 0 | 2 ms |
| atmos-webp | 0 ms | 0 ms | 0 ms | null ms | 0 | 16.7 ms | 16.8 ms | 0% | 0 | 2 ms |
| atmos-webp-grain | 0 ms | 0 ms | 0 ms | null ms | 0 | 16.7 ms | 16.8 ms | 0% | 0 | 2 ms |
| atmos-video | 0 ms | 0 ms | 0 ms | null ms | 0 | 16.8 ms | 16.8 ms | 0% | 0 | 2 ms |
| atmos-webgl | 0 ms | 0 ms | 0 ms | null ms | 0 | 16.7 ms | 16.8 ms | 0% | 0 | 39 ms |

### Accessibility and robustness (one scripted pass per candidate)

| ID | Space/PageDown/End/Home work | anchors landing under sticky header | find-in-page (window.find) | reduced motion | JS off: lit words min opacity at paragraph end | touch: px moved per 600 px gesture | 200% zoom: horizontal overflow; step text in box |
|---|---|---|---|---|---|---|---|
| S0 | Y/Y/Y/Y | none | Your name: found, not readable<br>Open for business: found, not readable<br>Set your brand: readable<br>Panel 4 of 5: found, not readable | 0 anim, steps overlap false, lenis false, pins 0 | 1 / overlap true | 603, 605, 603 (sent 600) | 0 px; steps fit/fit/fit |
| S1 | Y/Y/Y/Y | none | Your name: found, not readable<br>Open for business: found, not readable<br>Set your brand: readable<br>Panel 4 of 5: found, not readable | 0 anim, steps overlap false, lenis false, pins 0 | 1 / overlap true | 608, 596, 597 (sent 600) | 0 px; steps fit/fit/fit |
| S2 | Y/Y/Y/Y | none | Your name: found, not readable<br>Open for business: not found<br>Set your brand: readable<br>Panel 4 of 5: found, not readable | 0 anim, steps overlap false, lenis false, pins 0 | n/a (paragraph is plain text) / overlap false | 597, 596, 597 (sent 600) | 0 px; steps fit/fit/fit |
| S3 | Y/Y/Y/Y | none | Your name: found, not readable<br>Open for business: not found<br>Set your brand: readable<br>Panel 4 of 5: found, not readable | 0 anim, steps overlap false, lenis false, pins 0 | n/a (paragraph is plain text) / overlap false | 595, 608, 608 (sent 600) | 0 px; steps fit/fit/fit |
| S4 | Y/Y/Y/Y | none | Your name: found, not readable<br>Open for business: found, not readable<br>Set your brand: readable<br>Panel 4 of 5: found, not readable | 3 anim, steps overlap false, lenis false, pins 0 | 0.22 / overlap false | 608, 596, 607 (sent 600) | 0 px; steps fit/fit/fit |
