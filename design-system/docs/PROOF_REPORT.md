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

Screenshots: `design-system/docs/screenshots/gate1/` (desktop 1440 and mobile 390 for each direction). Raw measurement JSON: `design-system/docs/screenshots/measure/lab-directions/`.

---

# Round 1 (v0.1) · 8 Oct 2026

Everything below comes from tools run this round, against the Lab served at `http://localhost:4173` (`python3 -m http.server`). Raw data: `screenshots/measure/round1/regress.json` and `.../lh/*/lighthouse.json`. Harnesses are in the session scratchpad; the procedures are described here so they can be repeated.

## R1.1 Regression summary

| Check | Result |
|---|---|
| Contrast (script, 26 pairs from `tokens.json`) | **0 failing** (`contrast.md`); build exits non-zero on any failure |
| axe-core 4.x, WCAG 2.0/2.1/2.2 A and AA plus best-practice rules, **11 pages x 2 viewports = 22 runs** | **0 violations in 22/22** (after the fixes in R1.5) |
| Horizontal overflow, 390 and 1440 | none on any page |
| Console errors and warnings | none |
| Target size: every button, field, summary, footer link and menu link | all >= 44px in both dimensions (inline text links exempt per WCAG 2.5.8) |
| Keyboard walkthrough (Tab) on `hero.html`, desktop (14 stops) and 390px (13 stops) | every stop has a >= 2px outline; **no focused element hidden behind the sticky header** (fixed with `scroll-padding-top`) |
| JavaScript disabled | mobile menu opens (native `<details>`, panel 251px, links 48px); hero h1 opacity 1; image loaded; 3,450 characters of visible text |
| `prefers-reduced-motion: reduce` | `document.getAnimations()` empty; header line fixed visible |
| Motion with no preference | only `hx-header-line` (opacity) on the header page; `hx-settle` (transform only, 250ms) on the hero; **0 infinite animations** |
| Header at 320, 360, 390, 414px with the Spec's real label "Request a demo" | no overflow, no overlap (CTA 134px) |
| `₹` and `tnum` | unchanged from Gate 1 (both faces contain U+20B9; Geist Sans has `tnum`); `₹12,450.00` and `₹1,12,450.00` render in the Foundations specimens and the rate table |

## R1.2 Performance (Lighthouse mobile preset, simulated slow 4G, single run per page unless stated)

| Page | Perf / A11y / BP / SEO | LCP | CLS | TBT | JS (Lab chrome) | Transfer (uncompressed, Lab server) |
|---|---|---|---|---|---|---|
| compositions/header | 100 / 100 / 100 / 50 | 1.36 s | 0 | 0 | 0 KB | 85 KB, 7 requests |
| compositions/hero (with frame image) | 100 / 100 / 100 / 54 | 1.50 s | 0 | 0 | 0 KB | 92 KB, 8 requests |
| compositions/table | 100 / 100 / 100 / 50 | 1.36 s | 0 | 0 | 0 KB | 84 KB, 7 requests |
| compositions/footer | 100 / 100 / 100 / 50 | 1.36 s | 0 | 0 | 0 KB | 87 KB, 7 requests |
| foundations (Lab index) | 99 / 100 / 100 / 50 | 1.66 s | 0 | 0 | 5 KB (lab.js) | 111 KB |
| components (Lab index) | 100 / 100 / 100 / 50 | 1.51 s | 0 | 0 | 5 KB (lab.js) | 97 KB |
| compositions (Lab index, 24 requests incl. 3 iframes) | 99 / 100 / 100 / 54 | 1.83 s | 0 | 0 | 5 KB (lab.js) | 115 KB |

SEO below 100 is expected: the Lab is `noindex` and has no meta description. The standalone component pages load **no JavaScript** at all; `lab.js` (5 KB, ID overlay, grid and token export) is only on the three Lab index pages and is never part of the system.

**Shipped CSS budget** (what a real page would load: `tokens.css` + `components.css`): **25.2 KB raw, 6.4 KB gzip** (tokens 1.3 KB + components 5.1 KB) against a 30 KB gzip budget (21%). The "32 KB CSS" in the Lighthouse resource rows includes the Lab-only `lab.css` and `forced-states.css`, served uncompressed. Fonts 46.7 KB against 100 KB. Hero placeholder image 7.8 KB against 120 KB. JS 0 against 90 KB.

## R1.3 D-4 verification: LCP with and without the hero settle

Condition from your reply: transform only on the frame, never opacity or hiding the LCP element, LCP unchanged with and without.

| Method | With settle | Without settle |
|---|---|---|
| Lighthouse LCP, 5 runs each (ms) | 1506, 1523, 1508, 1509, 1508 | 1511, 1508, 1506, 1512, 1505 |
| **Lighthouse median** | **1508 ms** | **1508 ms** |
| Lighthouse performance / CLS / TBT | 100 / 0 / 0 in all 5 | 100 / 0 / 0 in all 5 |
| In-browser LCP (PerformanceObserver), 5 loads, unthrottled (ms) | 64, 72, 56, 60, 92 (median 64) | 56, 56, 64, 56, 48 (median 56) |
| In-browser LCP at 4x CPU slowdown, 5 loads (ms) | 92, 96, 84, 100, 96 (median 96) | 88, 96, 96, 88, 96 (median 96) |
| LCP element | the hero `<img>` | the hero `<img>` |

**Conclusion: LCP is unchanged** (identical Lighthouse median; the 8 ms unthrottled difference is inside the 48 to 92 ms run-to-run spread, and the 4x-CPU medians are equal). Caveat: the Lab serves the image from localhost, so absolute browser LCP values are tiny; the Lighthouse numbers include simulated network. The check must be repeated on the real hero image when it exists.

## R1.4 CTA hover sheen (experiment): cost

See `DESIGN_SYSTEM.md` section 7: transform-only transition on `::after` (600ms), 0 layout passes, 11 style recalcs (1.4 ms), script 0.1 ms, 494 bytes of CSS, removed under reduced motion, absent on touch devices. Main-thread task time over the 800ms window was 84.7 ms vs 40.5 ms baseline on a desktop Mac. Verdict: acceptable but optional; not applied to the hero CTA until approved (D-18).

## R1.5 Defects found by measurement this round, and fixed

| Found | Evidence | Fix |
|---|---|---|
| Wordmark `aria-label` ("HELIX by Cyper Studio, home") did not contain the visible text ("HELIXby Cyper Studio") | axe `label-content-name-mismatch` (serious), 18 of 22 runs | label removed; visible text names the link; real space between the two spans |
| Long button label overflowed its cell | screenshot review | buttons wrap, `max-width: 100%`; header CTA stays one line |
| Focused footer links could scroll under the sticky header | keyboard walkthrough design check | `scroll-padding-top: var(--header-h) + var(--s4)`; re-test: none obscured |
| Footer links under 44px wide on touch | target-size scan | `min-width` 44px |
| Standalone pages lacked an `h1`; Lab pages lacked `<main>` and landmarks; scroll regions were not focusable or uniquely named | axe `page-has-heading-one`, `region`, `scrollable-region-focusable`, `landmark-unique` | h1 added, `<main>` and `<header>` landmarks, `tabindex`, `role="region"`, unique labels |
| Lab navigation links were 16.8px tall | Lighthouse `target-size` (A11y 96 to 100) | 44px |
| One raw colour (`rgb(255 255 255 / .18)`) and one raw `40rem` in `components.css`, contradicting P8 | my own grep | moved to tokens `--sheen`, `--table-min`; `components.css` has 0 colour literals |
| Table gave no cue that it scrolls sideways; frame-bar labels wrapped on mobile | screenshot review | pinned first column, visible hint under 768px; second frame label hidden under 480px |
| My header-line test ran on a page too short to scroll | result looked wrong (opacity 0 after scroll) | test moved to a tall page; confirmed 0 at top, 1 after scroll, 1 always under reduced motion |

## R1.6 Lab tooling verified

ID overlay (7 `data-id` regions labelled on the Compositions page), 12-column grid overlay (12 columns, toggles), token export (dialog opens; CSS contains `--accent: #1F4FE0;` and the clamp for `--fs-display`; JSON has 111 tokens, version 0.1.0). No script errors. Component pages work without any of it.

## R1.7 Findings outside the design system (for your attention)

1. **Font files are publicly downloadable from the live site.** `https://www.cyperstudio.in/Assets/Fonts/Fontspring-DEMO-biotif-book.otf`, `SFPRODISPLAYREGULAR.OTF` and `ClashDisplay-Variable.ttf` all returned HTTP 200 on 8 Oct 2026. **No source file or live page references them** (the repo grep found none; production CSS declares only Geist via `next/font`; no request to `/Assets/Fonts` appears in the production HTML), so they are not used on screen, but serving them is redistribution of a demo-licensed font and Apple's SF Pro. Recommendation: remove `public/Assets/Fonts/*` now (separate from the redesign). Not done by me because it is outside the write boundary.
2. **`cyper.studio`** (the intended canonical): DNS resolves to `2.57.91.91`; `http://` returns a Hostinger "Parked Domain" page; **`https://` fails the TLS handshake** (no certificate). MX records point to Zoho; SPF is `v=spf1 include:_spf.reach.hostinger.com ~all` (Hostinger only, no Zoho include); a DMARC record exists with `p=none`; no DKIM record was found at the `zoho` selector (the selector may differ). This is relevant to the earlier rejection cause (Spec 6.4) and was not investigated further.
3. **The raw research PNGs were already committed and pushed** in `cf51450` (116 files, about 49 MB, 27 MB packed). They are untracked from `a83ba10` onward, but remain in history and on `origin/website-redesign`.

## R1.8 Not run, and why

- Screen reader and real-device testing (not available).
- Visual regression against React components (none exist yet; procedure in `react-mapping.md`).
- Firefox and Safari rendering (only Chrome here); the `animation-timeline` header line and `mask` select arrow have fallbacks but were not seen in other engines.
- `npm run build` of the app (writes `.next/`, outside the boundary).
- Components not yet built are listed in `DESIGN_SYSTEM.md` section 6.

Screenshots: `design-system/docs/screenshots/round1/` (local only, PNG ignored).

---

# Gate 2 addendum (v0.1.1) · 8 Oct 2026

Changes under test: mono label 12px to 13px (D-16); header CTA filled, md, same label and destination as the hero CTA, hero CTA lg (D-17); version bump. Nothing is locked.

## G2.1 Full regression re-run (same harness as R1.1)

| Check | Result |
|---|---|
| axe-core (A, AA, 2.2 AA, best-practice), 11 pages x 2 viewports = 22 runs | **0 violations in 22/22** |
| Contrast, 26 pairs | 0 failing (the label size change does not affect colour) |
| Horizontal overflow, console, target size >= 44px | none, none, none |
| Keyboard (desktop 14 stops, 390px 13 stops) | every stop has a >= 2px ring; none obscured by the sticky header |
| JavaScript disabled | mobile menu opens (panel 253px, links 48px); hero h1 opacity 1; image loaded |
| Header at 320, 360, 390, 414px with the real label "Request a demo" | no overflow, no overlap (CTA 134px) |
| Reduced motion | `getAnimations()` empty |
| Infinite animations | 0 |

## G2.2 Lighthouse mobile (simulated slow 4G), after the changes

| Page | Perf / A11y / BP / SEO | LCP |
|---|---|---|
| compositions/header | 100 / 100 / 100 / 50 | 1.36 s |
| compositions/hero | 100 / 100 / 100 / 54 | 1.51 s |
| compositions/table | 100 / 100 / 100 / 50 | 1.36 s |
| compositions/footer | 100 / 100 / 100 / 50 | 1.36 s |

SEO below 100 is expected (the Lab is `noindex`).

## G2.3 D-4 condition re-verified: LCP with and without the hero settle

| Method | With settle | Without settle |
|---|---|---|
| Lighthouse LCP, 5 runs each (ms) | 1505, 1505, 1509, 1504, 1506 | 1504, 1504, 1505, 1506, 1507 |
| **Lighthouse median** | **1505 ms** | **1505 ms** |
| In-browser LCP, 12 interleaved loads, unthrottled: median (range) | 56 ms (44 to 76) | 64 ms (44 to 128) |
| In-browser LCP, 12 interleaved loads, 4x CPU slowdown: median (range) | 84 ms (80 to 88) | 88 ms (80 to 104) |
| LCP element | hero `<img>` | hero `<img>` |

A single earlier in-browser sample showed 128 ms vs 92 ms at 4x CPU. With 12 interleaved loads per variant that gap does not reproduce (84 vs 88 ms), so it was noise. **LCP is unchanged by the settle.** Same caveat as before: the image is served from localhost; repeat on the real hero image when it exists.

## G2.4 What changed outside the Lab

- `Cyper_Studio_Redesign.md` is now **v1.1** (patches A1 to A3 and B1 to B3). B4 to B6 are not applied (`spec-patches.md`).
- `public/Assets/Fonts/*` (12 demo, SF Pro and Clash files) removed in a separate commit (D-21).

## G2.5 Not re-run

Screen reader and real-device tests; Firefox and Safari (only Chrome available); `npm run build` of the app (writes `.next/`); React parity (no React components exist yet).
