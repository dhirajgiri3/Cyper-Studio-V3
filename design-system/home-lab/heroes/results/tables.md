### Weight and mobile Lighthouse (5 runs, medians)

| Hero | HTML bytes (inline CSS + JS) | LCP | CLS | TBT | perf scores (5 runs) | a11y / best-practices / SEO (run 1) | requests |
|---|---|---|---|---|---|---|---|
| HERO-A | 30.2 KB (15.9 KB CSS, 2.6 KB JS) | 1.20 s | 0 | 0 ms | 100, 100, 100, 100, 100 | 100 / 100 / 63 | 3 |
| HERO-B | 28.1 KB (15.7 KB CSS, 1.1 KB JS) | 1.20 s | 0 | 0 ms | 100, 100, 100, 100, 100 | 100 / 100 / 63 | 3 |
| HERO-C | 31.8 KB (15.5 KB CSS, 1.1 KB JS) | 1.20 s | 0 | 0 ms | 100, 100, 100, 100, 100 | 100 / 100 / 63 | 3 |
| HERO-D | 29.4 KB (15.8 KB CSS, 2.8 KB JS) | 1.20 s | 0 | 0 ms | 100, 100, 100, 100, 100 | 100 / 100 / 63 | 3 |
| Baseline (Reference-page.html) | n/a (external fonts) | 3.12 s | 0 | 0 ms | 88, 88, 89, 88, 91 | 95 / 96 / 60 | 8 |

### First viewport: the four questions as read from the rendered text (script)

| Hero | 1440 x 800: company / product / audience / outcome | 390 x 844: same | filled CTAs in view (1440 / 390) | trust-line placeholder in view (1440 / 390) | product frame in view (1440 / 390) | horizontal scroll (1440 / 390) |
|---|---|---|---|---|---|---|
| HERO-A | Y Y Y Y | Y Y Y Y | 1 / 1 | Y / Y | Y / N | no / no |
| HERO-B | Y Y Y Y | Y Y Y Y | 1 / 1 | Y / Y | N / N | no / no |
| HERO-C | Y Y Y Y | Y Y Y Y | 1 / 1 | Y / Y | Y / N | no / no |
| HERO-D | Y Y Y Y | Y Y Y Y | 1 / 1 | Y / Y | Y / N | no / no |

### Server HTML and JS off

| Hero | h1, sub, filled CTA, trust line, entity line, info@ in the HTML response | canonical, og:url, JSON-LD (Organization, founding 2024) | with JS disabled: h1 / sub / CTA / trust / entity painted | tenant-only controls hidden without JS | reduced motion: running animations |
|---|---|---|---|---|---|
| HERO-A | Y Y Y Y Y Y | Y Y Y | Y Y Y Y Y | true | 0 |
| HERO-B | Y Y Y Y Y Y | Y Y Y | Y Y Y Y Y | n/a | 0 |
| HERO-C | Y Y Y Y Y Y | Y Y Y | Y Y Y Y Y | n/a | 0 |
| HERO-D | Y Y Y Y Y Y | Y Y Y | Y Y Y Y Y | true | 0 |

### Accessibility, colour, form

| Hero | axe violations (WCAG 2.2 A/AA + best practice, 1440) | HELIX blue in tenant window: distinct colours checked / nearest colour to #4161F4 (OKLab) | required + optional fields | invalid email blocks submit / success state shown | first 6 tab stops |
|---|---|---|---|---|---|
| HERO-A | none | 13 / rgb(102,112,133) at 0.188 | 4 + 1 | Y / Y | a:Skip to content > a:HELIX by Cyper Studio, home > a:Product > a:About > a:Contact > a:Request a demo |
| HERO-B | none | no tenant window (operator console only) | 4 + 1 | Y / Y | a:Skip to content > a:HELIX by Cyper Studio, home > a:Product > a:About > a:Contact > a:Request a demo |
| HERO-C | none | 11 / rgb(102,112,133) at 0.188 | 4 + 1 | Y / Y | a:Skip to content > a:HELIX by Cyper Studio, home > a:Product > a:About > a:Contact > a:Request a demo |
| HERO-D | none | 8 / rgb(102,112,133) at 0.188 | 4 + 1 | Y / Y | a:Skip to content > a:HELIX by Cyper Studio, home > a:Product > a:About > a:Contact > a:Request a demo |
