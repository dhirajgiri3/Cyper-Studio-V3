# Measured summary (generated from `observation.json` and `lighthouse.json`)

Collected 8 Oct 2026 with Google Chrome (headless) via Playwright-core and Lighthouse (mobile preset, simulated slow 4G, single run each, developer Mac). **Treat as comparative, not absolute**; a single run on one machine has noise. Transfer bytes are from the desktop (1440px) load, not the Lighthouse run. "Infinite anim. under reduced-motion" counts Web Animations with infinite iterations still running after emulating `prefers-reduced-motion: reduce`. HELIX targets are in the last row.

| Site | Role | Perf | A11y | BP | SEO | LCP (s) | CLS | TBT (ms) | JS KB | CSS KB | Fonts KB | Images KB | Requests | Gradient elements | Canvas | Infinite anim. under reduced-motion | Visible text with JS off (chars) | axe violations |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| spacefs | Primary | 39 | 93 | 73 | 91 | 8.3 | 0 | 1309 | 872 | 3 | 69 | 998 | 127 | 36 | 1 | 0 | 8,698 | serious 2 |
| handhold | Primary | 38 | 100 | 96 | 92 | 12.9 | 0 | 1606 | 1,070 | 29 | 600 | 2,245 | 185 | 2 | 7 | 0 | 0 | none |
| workos-atlas | Primary | 37 | 97 | 77 | 100 | 12.2 | 0 | 5354 | 1,552 | 19 | 138 | 613 | 130 | 61 | 1 | 8 | 4,561 | serious 1 |
| eden | Primary | 42 | 84 | 77 | 100 | 18.6 | 0.017 | 706 | 1,127 | 3 | 76 | 15,737 | 129 | 99 | 0 | 1 | 15,411 | serious 4 |
| stableapp | Primary | 42 | 93 | 77 | 100 | 5.9 | 0 | 1001 | 1,817 | 19 | 49 | 522 | 103 | 66 | 0 | 0 | 6,017 | serious 1 |
| monday | Secondary | 31 | 97 | 54 | 100 | 11.0 | 0.001 | 2435 | 3,885 | 411 | 251 | 2,126 | 377 | 4 | 0 | 4 | 4,113 | serious 1 |
| getenergy | Secondary | 94 | 100 | 92 | 100 | 2.3 | 0 | 234 | 136 | 15 | 82 | 137 | 39 | 22 | 0 | 2 | 9,754 | serious 1 |
| crealo | Secondary | 57 | 97 | 73 | 100 | 2.5 | 0.082 | 5715 | 1,275 | 1 | 257 | 497 | 121 | 2 | 0 | 0 | 5,954 | serious 1 |
| wama | Secondary | 93 | 100 | 100 | 100 | 2.9 | 0 | 74 | 391 | 0 | 62 | 5,755 | 174 | 1 | 0 | 0 | 8,039 | none |
| shiprocket | Calibration | 57 | 74 | 73 | 85 | 3.1 | 0 | 8554 | 2,043 | 105 | 154 | 5,734 | 259 | 15 | 1 | 0 | 10,205 | serious 5, critical 1 |
| easypost-3pl | Calibration | 36 | 93 | 73 | 69 | 4.9 | 0.305 | 877 | 1,458 | 44 | 197 | 737 | 148 | 3 | 0 | 0 | 4,327 | serious 2 |
| linear | Calibration | 30 | 81 | 96 | 100 | 27.4 | 0 | 1725 | 1,519 | 223 | 503 | 284 | 478 | 58 | 0 | 76 | 8,709 | critical 1, serious 2 |
| **HELIX target** | n/a | >= 90 (aim 95) | >= 95 | >= 95 | >= 95 | <= 2.5 | <= 0.1 | n/a | <= 90 | <= 30 | <= 100 | hero <= 120 each | <= 25 above fold | 0 | 0 | 0 | all content | none critical/serious |

## Reading the table

- **Only getenergy (94) and wama (93) reach the 90 bar.** getenergy is the only page that also meets LCP <= 2.5 s (2.3 s). It ships 136 KB of JavaScript, 15 KB of CSS, 39 requests and almost no motion.
- **Every page with a WebGL or canvas hero, gradient-heavy surfaces, or hundreds of animations scored 30 to 42** (spacefs, handhold, workos-atlas, eden, stableapp, monday, linear). Their lab LCP ranged from 5.9 s to 27.4 s.
- **JavaScript budget:** of 12 pages, one is under 140 KB; the HELIX limit is 90 KB gzip. The median JavaScript transfer is about 1.4 MB.
- **Counter-example:** easypost-3pl scored 36 with almost no motion or gradients. Its cost is third-party scripts (tag manager, ad pixels, a consent widget, a session recorder), 1.5 MB of JavaScript and a CLS of 0.305. Restraint in motion is necessary but not sufficient; third parties and unreserved space also decide the score.
- **CLS:** easypost-3pl 0.305 and crealo 0.082 show the cost of images or forms without reserved space; the others are near 0.
- **No JavaScript:** handhold renders zero visible text; every other page shows readable text. Several include elements at opacity 0 that JS would reveal (shiprocket 19, monday 5, handhold 6).
- **Reduced motion:** linear (76), workos-atlas (8), monday (4), getenergy (2) and eden (1) still run infinite animations when reduced motion is requested.
- **Automated accessibility:** only handhold and wama had no axe violations; colour-contrast was the most common serious finding (spacefs 35 nodes, eden 70, workos 10, crealo 10, monday 4).
