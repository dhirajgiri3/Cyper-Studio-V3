# PROOF REPORT (v0.0, Gate 1, 8 Oct 2026)

What was measured on the Lab (`design-system/directions/`, served by `python3 -m http.server`) and how. All numbers come from tools actually run in this session. Items not run are listed at the end.

## 1. Contrast (script-computed, WCAG 2.x relative luminance)

All text pairs, focus ring and field borders pass in all three directions. **All required pairs pass: yes.**

| Pair | Required | A | B | C |
|---|---|---|---|---|
| Heading ink on page | >= 4.5:1 | 18.72:1 PASS | 17.75:1 PASS | 16.95:1 PASS |
| Body text on page | >= 4.5:1 | 7.69:1 PASS | 10.46:1 PASS | 9.52:1 PASS |
| Body text on surface | >= 4.5:1 | 7.36:1 PASS | 9.51:1 PASS | 8.74:1 PASS |
| Muted on page | >= 4.5:1 | 4.97:1 PASS | 6.31:1 PASS | 5.78:1 PASS |
| Muted on surface | >= 4.5:1 | 4.76:1 PASS | 5.74:1 PASS | 5.31:1 PASS |
| Accent link on page | >= 4.5:1 | 6.46:1 PASS | 5.36:1 PASS | 4.92:1 PASS |
| Accent link on surface | >= 4.5:1 | 6.18:1 PASS | 4.87:1 PASS | 4.52:1 PASS |
| Badge: accent on tint | >= 4.5:1 | 5.81:1 PASS | 4.76:1 PASS | 4.64:1 PASS |
| Button label (white) on primary | >= 4.5:1 | 6.46:1 PASS | 17.75:1 PASS | 5.18:1 PASS |
| Button label (white) on primary hover | >= 4.5:1 | 8.21:1 PASS | 13.22:1 PASS | 7.31:1 PASS |
| Field border on page (UI, 3:1) | >= 3.0:1 | 3.19:1 PASS | 3.40:1 PASS | 3.41:1 PASS |
| Field border on surface (UI, 3:1) | >= 3.0:1 | 3.05:1 PASS | 3.09:1 PASS | 3.13:1 PASS |
| Focus ring (accent) on page (UI, 3:1) | >= 3.0:1 | 6.46:1 PASS | 5.36:1 PASS | 4.92:1 PASS |
| Annotation marker digit (white) on accent | >= 4.5:1 | 6.46:1 PASS | 5.36:1 PASS | 5.18:1 PASS |
| Hairline border on page (decorative) | none | 1.24:1 n/a | 1.47:1 n/a | 1.32:1 n/a |

**Defect found and fixed this round:** my first-draft `--border-strong` values (A `#98A2B3` 2.58:1, C `#A39682` 2.76:1 on the page) failed the 3:1 non-text requirement (WCAG 1.4.11) while the Lab labelled them "Field border". Replaced with A `#8691A3`, B `#818C9E`, C `#92866F`, which pass against both the page and the surface. The Spec's single `--border` (#E4E7EC, 1.24:1) is fine for decoration but cannot be used for input borders; see Decision Sheet D-5.

## 2. Fonts

| Test | Result | Method |
|---|---|---|
| `₹` (U+20B9) present in Geist Sans and Geist Mono | **Yes, both** | fontTools cmap on the shipped variable woff2 files; also rendered in every study (`₹12,450.00`) |
| Tabular figures (`tnum`) in Geist Sans | **Yes** | GSUB feature list |
| `tnum` in Geist Mono | No GSUB `tnum`, but the face is monospaced so digits are already fixed-width | GSUB feature list |
| Variable weight axis | `wght` 100 to 900 in both | fvar |
| Source payload (full variable files) | 69.6 KB + 71.4 KB = **141 KB** (over the 100 KB font budget) | file sizes |
| Subset payload (Latin, punctuation, arrows, `₹`; features kern, liga, calt, tnum/zero/ss01/ss02 where present) | **26.3 KB + 20.4 KB = 46.7 KB** (under budget) | pyftsubset, woff2 |
| Licence | SIL Open Font License 1.1 (Geist npm package 1.7.2); licence file copied to `design-system/fonts/OFL-LICENSE.txt` | package metadata |
| Real-hero bake-off against an alternative | **Not done yet** (scheduled for the foundations round) | |

So **D-05 resolves in favour of Geist**: the Inter fallback is not needed for `₹`. Weights were not limited to 3 in the file (variable axis) but the system will use 400, 500, 600 only.

## 3. Lab payload and speed (Lighthouse mobile preset, simulated slow 4G, single run, developer Mac)

| Metric | Result | Budget |
|---|---|---|
| Lighthouse performance / accessibility / best-practices | **100 / 100 / 100** | >= 90 (aim 95) / >= 95 / >= 95 |
| Lighthouse SEO | 50 (expected: the Lab is deliberately `noindex`; fails only `is-crawlable` and `meta-description`) | not applicable to the Lab |
| LCP / CLS / TBT | 1.4 s / 0 / 0 ms | <= 2.5 s / <= 0.1 / n/a |
| JavaScript | **0 KB** | <= 90 KB gzip |
| CSS | 13.7 KB raw, **3.7 KB gzip** | <= 30 KB gzip |
| HTML | 23.6 KB raw, 4.6 KB gzip | <= 40 KB |
| Fonts | **46.7 KB** (2 files, preloaded) | <= 100 KB |
| Images | 0 (all frames are "Screenshot pending" placeholders) | hero <= 120 KB |
| Requests | 4 (document, stylesheet, 2 fonts) | <= 25 |
| Third-party requests | 0 | 0 |

These apply to the style studies only. They show the style language itself costs almost nothing; real screenshots and any motion are not yet included.

## 4. Other checks on the Lab

| Check | Result |
|---|---|
| axe-core 4.x (WCAG 2.0/2.1/2.2 A and AA tags) | **0 violations** (after fixes below) |
| JavaScript disabled | Lab has no JavaScript; all 10,365 characters of text visible; h1 present |
| `prefers-reduced-motion: reduce` | 0 animations at load and after scrolling; stylesheet also sets `transition: none; animation: none` under reduced motion |
| Horizontal scroll at 390px | None |
| Console / network errors | None after fixes (favicon 404 removed) |
| Write boundary | `git status`: only `docs/` and `design-system/` are new; no tracked file was modified |

## 5. Defects found by measurement and fixed this round

| Found | Evidence | Fix |
|---|---|---|
| Sticky Lab bar overlapped study headings in element screenshots | Screenshot review | Lab bar made non-sticky |
| Hero headline wrapped to 5 lines in a 5/12 column | Screenshot review | 6/12 columns, shorter sample headline |
| Direction B hero grid lines ran through body text | Screenshot review | Text block given a solid page background |
| Heading order invalid, no `<main>`, three `<h1>`s | Lighthouse (`heading-order`, `landmark-one-main`) | One page `<h1>`, studies are `<h2>`, sample hero headings are `<h3>`, `<main>` added |
| Direction C trade-off text quoted the wrong ratio | Re-computation (5.18:1 button, 4.92:1 link) | Text corrected |
| `--border-strong` failed 3:1 in A and C | Contrast script | Values replaced (section 1) |
| CLS 0.02 from font swap | Lighthouse `layout-shifts` | Both fonts preloaded; CLS now 0 |
| A favicon 404 in console | Lighthouse `errors-in-console` | Inline empty favicon |

## 6. Not run, and why

- **Keyboard-only walkthrough and screen reader:** not done (no assistive tech here). Focus rings are visible in the rendered states.
- **Real mid-range Android device:** not available.
- **`npm run build` of the Next.js app:** deliberately not run: a build rewrites `.next/`, which would modify existing generated files outside the write boundary. The Lab is outside the Next.js tree, so it does not affect the app build.
- **Component interaction states beyond the forced hover, focus and disabled renderings in the studies:** the full component gallery is built after Gate 1.
- **Contrast of real photography or screenshots:** none exist yet.

Screenshots: `docs/design-system/screenshots/gate1/` (desktop 1440 and mobile 390 for each direction). Raw measurement JSON: `docs/design-system/screenshots/measure/lab-directions/`.
