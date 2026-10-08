# Observation card: adaline

| Field | Value |
|---|---|
| URL | https://www.adaline.ai/ (home page `/` only) |
| Role | New reference, Brief 01 v2.1 |
| Date | 2026-10-08 |
| Viewports | 1440x900 (probe + my scripts), 390x844 at DPR 2 (probe + one layout check), JS-off 1440x900, `prefers-reduced-motion: reduce` 1440x900 |
| Tool | playwright-core 1.64 + Google Chrome 154 (headless). Harness `probe.json` plus my scripts in `scripts/` (structure, sweep, motion, scroll-linked, assets, reduced motion, WebGL timing). Lighthouse and axe NOT run. |
| Personality in three words | tonal, instrument-like, theatrical (flat and quiet for 60% of the page, then a scripted night-sky finale) |
| HTTP status | 200 over h2, `content-encoding: br`, `server: Vercel`. Not blocked: no bot wall, no captcha, no consent banner (no "cookie" or "consent" text in the server HTML or the rendered page). |

Page-level numbers used below: page height 12,970 px at 1440 (it drifts between 12,558 and 13,592 px while scrolling, see Performance), 11,496 px at 390. Native vertical scrollbar is hidden by `scrollbar-width: none`; a 3 px overlay replaces it (see Motion catalogue M9).

## Hero pattern

**Composition (1440x900).** A 900 px full-height hero: sticky 64 px header; left column (x 80 to 720) vertically centred; right column an abstract 400x582 "pen stage" at x 960 to 1360; a centred "Trusted by" label plus logo strip pinned to the bottom of the viewport (label y 782, logos y 833 to 865). Top-to-bottom in the left column: mono-caps eyebrow chip (y 257, a link), H1 (y 303, 64 px tall, one line), 3-line lede (y 391 to 469, 640 px wide), CTA pair (y 509 to 549).

**What the first viewport says in plain text** (server HTML, JS off): a product-category-free slogan as H1 (3 words), a lede saying AI teams can improve agents autonomously, find problems early, ship fixes quickly; eyebrow "The Self-Improving Agent"; two CTAs; "Trusted by" + customer logos. **The category noun ("observability and evals platform") is not in the first two screens**; it appears only in the meta description. The first concrete mechanism sentence is on screen 2 (production traces grouped into behaviours).

**What is only in imagery:** nothing product-specific. The right column (ASCII character field with a hand-drawn curve) is abstract and decorative (`aria-hidden`), and exists only after JS runs. No product UI is visible until screen 2 (a window over a painted landscape). On mobile the hero visual is not displayed (the stage element exists in the DOM but its rAF loops do not run: idle rAF 1/s) and the hero is 844 px tall with about 200 px of empty space between the CTAs (y 525) and the logo strip (y 722).

**CTA count and hierarchy (first viewport, desktop):** 1 primary filled pill in the header (32 px high), 1 primary filled pill in the hero (40 px high), 1 outline pill "Read Docs" (40 px), 1 eyebrow chip link, 2 plain text links in the header (Docs, Blog). Single conversion target: both "Get Started" buttons point to `/get-started` and are identical in colour and label, the header one only smaller. Docs appears twice (header link and hero outline pill). The same CTA repeats a third time in the footer (inverted: light pill on dark).

**Trust signals in the first two screens (0 to 1,800 px):** one: the customer-logo strip (19 distinct brands as 19 SVG files, repeated to 100 `<img>` for the loop, 75% opacity, 20 to 32 px tall). No quote, no number, no certification badge until much later (quotes at about y 5,986, badges at about y 7,978).

## Type system
- Fonts by share of visible text (probe `fontShare`, by first declared family): akkurat 2,970 chars, "GT America Mono" 1,980, fragmentMono 149, Newsreader 24, Instrument Serif 29, Inter 10. **`fontShare` mislabels the mono:** "GT America Mono" is only the first name in a fallback stack and has no `@font-face`. Chrome DevTools (`CSS.getPlatformFontsForNode`) says UI labels, chips and buttons render in **Fragment Mono (webfont)**, headings in **Akkurat (webfont)**, and the hero ASCII `<pre>` in **Menlo (system)** on this Mac (so it is platform-dependent).
- Loaded font files: Akkurat 400, 400 italic, 700, 700 italic (4 woff2 preloaded, about 46.5 to 47 KB each); Fragment Mono 400 (56,316 B); Instrument Serif 400 latin (15,040 B); Newsreader 300 latin (58,152 B, fetched late, on scroll). `font-display: swap` with size-adjusted fallbacks (`akkurat Fallback`: Arial with ascent/descent/size-adjust overrides). Measured CLS at load: 0.
- H1: 53px / wt 400 / lh 64px (1.21) / ls -2.12px (-0.04em) / Akkurat / `#0A1D08`, `text-wrap: balance`. Mobile: 34px / lh 46px / ls -1.36px (-0.04em).
- H2 (feature sections): 30px / wt 400 / lh 34.7px / ls -0.6px (-0.02em), balance. Mobile 26px / lh 30px / -0.03em. The "Enterprise controls" H2 reuses the H1 size (53/64).
- Lede / body: 18px / lh 26px (1.44) / normal tracking / `#6B7860` (pebble-500), `text-wrap: pretty`, max about 62 ch. Mobile 16/24.
- Quotes: 18/26, ls -0.27px (-0.015em), colour `#2B390A`; attribution 13/16.
- Mono labels (chip, buttons, "Trusted by"): Fragment Mono 14px / lh 14px / ls +0.7px (+0.05em) on labels, +0.28px (+0.02em) on buttons, shown in capitals. Footer column heads: 11px / ls +1.1px (+0.1em) caps. Diagram node labels: Fragment Mono 28px / ls +1.12px (+0.04em).
- Display serif, used only twice: "Ship Once. Improve Forever." in Newsreader 300 at 108px / lh 105.84px (0.98) / ls -3.456px (-0.032em), `#FDFEFB` on `#2A332A`, set as four stacked lines; footer CTA in Instrument Serif 400 at 104px / lh 98.8px (0.95) / ls -2.08px (-0.02em), `#FBFDF6`. The footer CTA steps 52 / 88 / 104 px by breakpoint (from source).
- Weights: 400 everywhere I sampled (headings, lede, quotes, UI labels); the 700 file is loaded but I did not find a visible bold on the home page outside product windows.
- Line breaks: `balance` on headings, `pretty` on paragraphs, no manual `<br>`. Numbers: no statistics in marketing copy; numerals appear only inside product windows, in Fragment Mono (costs, latencies, pass rates).
- Note: the system is one grotesque at one weight, a mono for every control and label, and a light serif reserved for two arrival statements. Tight negative tracking on the large sans (-0.04em at 53px) is the main "designed" signal; the body text is ordinary.

## Colour system
Token source: `--pebble-*`, `--meadow-*` (space-separated RGB triplets), `--color-surface-*`, `--color-on-surface-*`, `--color-primary*`, `--color-error*`, `--color-aux-accent-1..10` in the stylesheet (Tailwind v4 theme layer, 320 custom properties incl. the full default colour ramps, most unused on `/`).
- Backgrounds (by probe `bgs`): `#FBFDF6` (pebble-50, page, 18.7M px), `#EFF2E8` (pebble-100, 4.7M px: also the flat placeholder panel in the JS-off render), `#2A332A` (surface-inverse, the "Ship Once" band), `#050E11` (footer night); `#1D2226` also covers a large area (inferred: the dark footer window pane).
- Text: ink `#0A1D08` (meadow-900) on `#FBFDF6` = 17.2:1; lede `#6B7860` (pebble-500) = 4.57:1 (passes AA normal text by 0.07); "Trusted by" label same colour at 14px mono = 4.57:1; quote ink `#2B390A` on card `#E5E8E4` = 10.0:1; footer link 80% alpha on `#050E11` = 12.2:1; footer column heads and copyright 45% alpha on `#050E11` = 4.43:1 (11px text, **below 4.5**).
- Accent: meadow-700 `#203B14` fills every primary button (label `#FBFDF6`, 12.1:1) and the chip text; chip fill meadow-100 `#ECF2DF` (hover meadow-200 `#D7E8B5`). Accent is allowed on: primary pill, eyebrow chip, diagram connector (`#4A6D47`, 7px), logo. All other colour is confined inside product windows (terracotta/rose `#991E4B` for errors, ochre for warnings, teal/blue for tool/user dots).
- Borders: hairlines are pebble-300 `#C5CCB6` (secondary button border 1px, header bottom rule at 60% opacity). Contrast of that border against the page is 1.61:1 (fine for a decorative edge, not a 3:1 component boundary; the label carries the identity).
- Gradients, noise, atmosphere (the page has two registers):
  - Flat register (y 0 to about 8,500): no gradient on the page. Exceptions: a 5% black bottom shade over each painting (`from-pebble-950/0 via /0 to /5`, 914 px tall), a 40 px white fade at the bottom of one window, a 1 px radial dot grid at 16% opacity behind the cluster graph (`radial-gradient` 1px dots), and the marquee edge mask (`mask-image` transparent 0 to 5% and 95 to 100%).
  - Atmosphere register (footer, y about 8,500 to 12,970 = 34% of the page): a **fixed full-viewport gradient layer whose three stops are rewritten from scroll position** (sampled: pale dawn `rgb(201,229,236)/(231,236,232)/(248,245,227)` at y 8,200 at opacity 0.30; dusk `(137,154,181)/(205,201,196)/(239,215,161)` at y 8,800; night `(5,13,16)/(15,32,36)/(25,50,56)` from y 11,200); a stars PNG layer (parallax, opacity 0.03 to 1); a cloud-alpha PNG used as `mask-image`; WebGL aurora (`mix-blend-screen`, CSS `blur(6px)`) behind the closing CTA; a hills photo mask fading into `#050E11`.
  - Header: a child layer `bg-pebble-50/85` with `backdrop-filter: blur(12px)` fades in on scroll (opacity 0 at y 0, 1 by y 40). It is the only glass on the page.
- `color-scheme`: normal (no dark-mode switch; the footer is dark by art direction, not by theme).

## Layout and rhythm
- Container: `max-w-[1280px]` centred (80 px side margins at 1440), `px-grid-margin` = 16 px minimum. Grid tokens: `--grid-margin: 16px`, `--grid-gutter: 8px`, `--grid-max-width: 2048px`. Marquee sits in `col-span-8 xl:col-start-3` (12-col grid).
- Section rhythm: `section-y` = 96 px top and 96 px bottom on desktop (`--space-section: 3.5rem` = 56 px on small screens); heading block to visual gap `--space-gap-md` 24 px; heading to lede gap 12 to 16 px. Each of the four feature sections is exactly 1,249 px tall (heading 35 + lede 52 + gap 24 + 914 visual + 192 padding). Hero 900 px.
- Section sequence and approximate tops: hero 64; feature 1 "Truly understand your agents" 964; feature 2 "Evals that write themselves" 2,213; feature 3 "From edge cases to test data" 3,462; feature 4 "Agents auto-improve while you sleep" 4,711; testimonial grid (no heading) 5,986 (1,374 tall); dark "Ship Once" band 7,360 (618 tall); "Enterprise controls" 7,978 (532 tall); scenic footer 8,510 to 12,970.
- Feature visual: a 1280x914 painted plate (ratio 1.40) with a 785x615 product window centred by `inset-10` (40 px) padding, i.e. the window fills 61% of the plate width.
- Testimonial grid: 7 cards in two rows with an 8 px gutter, 280 px tall. Row 1: 209 / 628 / 209 / 209 px wide (one card expanded by default, the rest collapsed to logo-only). Row 2: three equal 421 px cards.
- Density: very low in the first 60% of the page (about 35 words per feature section, one idea each, one visual); the 4 feature sections use the identical template.
- Mobile 390: no horizontal scroll (`hasHScroll` false), single column, hero visual removed, testimonial cards stacked full width with a triangle control.

## Components
- Header: `<nav aria-label="Primary">`, sticky top 0, 64 px (60 px mobile), no `<header>` element. Desktop: inline SVG wordmark (101x18), two text links (Docs, Blog; 60x30 hit areas), filled CTA pill (126x32, radius 20px, padding 0 14px). Mobile: wordmark, CTA pill, 40x40 menu toggle (`aria-label="Open menu"`, `aria-expanded=false`); open state is a floating light panel (Docs, Blog, full-width CTA) over a dimmed page.
- Buttons: pill (radius 20px). Primary 40 px high, padding 0 24px, fill `#203B14`, label Fragment Mono 14px caps `#FBFDF6`. Secondary: 1px `#C5CCB6` outline, label `#2E3B28`. No icons, no arrows, no shadows.
- Eyebrow chip: 264x26, full radius, padding 6px 12px, fill `#ECF2DF`, text `#203B14`, trailing arrow glyph; it is a link to a product page.
- Customer marquee: 100 `<img>` in the server HTML (19 unique SVGs; list repeated for the loop; the page has 118 logo images and 32 unique logo files in total, the rest belonging to the testimonial cards), `alt=""`, `opacity-75`, each in a fixed-size `<span>` (e.g. 122x25), gap 64px, edges masked; container has `aria-label` listing five customers.
- Testimonial card: `<article role="button" tabindex="0" aria-expanded="false" aria-label="Expand testimonial from ...">`, fill about `#E5E8E4`, collapsed = centred logo + 24x24 round "+" control, expanded = logo, quote 18/26, name 13px + role, "x" control.
- Product window: `role="group"` with `aria-label="Adaline Behaviors window"` (also Evals, Datasets, Improve, pending review), drawn chrome (drag dots, home icon, URL pill, 3 icons), content panes, dark bottom status bar (mono "INFO ... timestamp").
- Flow diagram (dark band): four outlined pills "Trace / Behaviors / Evals & Data / Improve" (320x54 each) joined by a single 7px `#4A6D47` connector that loops from the last to the first; static.
- Compliance badges: three 72x72 inline SVG roundels (SOC 2, HIPAA, GDPR) in the enterprise section and again, inverted, in the footer.
- Footer: night scene, then wordmark + tagline, three link columns (Company, Resources, Connect) with 14/18 links, three badges, copyright (11px).

## Product UI treatment
- Product is shown as **live DOM, not screenshots**: four light windows (785x615) over painted plates, each a different product surface (behaviours cluster graph + trace log; evals list + code editor + reasoning pane; synthetic-data grid with skeleton rows; improvement diff), plus a dark console in the footer (sidebar nav, evaluator table "v71 baseline vs v72 candidate", cost/latency/token sparklines) that fades into the hills with a gradient mask. Each window is 560 to 600 DOM nodes, mono tabular data, status chips (ERR/WRN/ISSUE/CHANGED), timestamps and IDs.
- The windows are **synthetic and unlabelled**: 0 hits for "illustrative", "sample data", "simulated", "demo" or "mock" in the rendered text after a full scroll. The content streams (new trace rows every second or so, timestamps tick), so the proof is simulated activity rather than a captured state. HELIX must not copy this without an explicit "Illustrative interface. Sample data." label.
- They are absent from the server HTML (only an empty flat `#EFF2E8` plate renders with JS off, see JS-off section). Mobile re-flows the window into a vertical stack (bars, graph, log).

## Asset inventory
"Transfer" = Chrome `encodedBodySize` / CDP bytes (compressed), measured on this run. Origin is own domain (www.adaline.ai) unless stated.

| # | Asset | Origin | Role | Format | Rendered / natural | Transfer | Loading |
|---|---|---|---|---|---|---|---|
| 1 | Wordmark | own, inline in HTML | logo | inline SVG, 1 path | 101x18 | 0 extra | eager (inline) |
| 2 | Pen curve | own JS chunk `89291-…js` (3,511 B br; 8.1 KB raw), client-rendered | hero visual | SVG `<path>`, stroke 1.75px, `vector-effect: non-scaling-stroke` | stage 400x582 (svg 400x563) | chunk only | mounts after hydration (about 0.5 s), then 1 s fade |
| 3 | ASCII field | same chunk | hero texture | 30 `<pre>` rows x 66 columns of text, 10px/12px mono, colour `rgba(46,59,40,.42)`, `aria-hidden` | 397x360 | chunk only | JS-created; **is the harness LCP element (1,476 ms)** |
| 4 | Customer logos (100 `<img>`, 19 unique files; 7 loaded at first load) | own `/logos/Customers/{Small,Large}/*.svg` | trust logos | SVG `<img>`; e.g. DoorDash 3,426 B br (8,443 B raw), Salesforce 4,997, Superhuman 647, Same 696, HubSpot 2,398, Reforge 1,852 | 20 to 32 px tall, 41 to 170 px wide | 16,919 B for the 7 first-load files | `loading="lazy" decoding="async"`, no `fetchpriority` |
| 5 | Fonts (first load) | own, `/_next/static/media/*.woff2` | type | woff2: 4x Akkurat (preloaded), Fragment Mono, Instrument Serif | n/a | 259,971 B total | preload for Akkurat; Fragment Mono and Instrument Serif discovered via CSS |
| 6 | Feature plate 1 `tonalism-7` | own via `next/image` (`w=1200&q=75`) | background for window | **AVIF** (URL says .png) | rendered 1306x933 (`object-cover`, `scale-[1.02]` inside 1280x914); natural 1200x675 (upscaled about 1.38x, softness is hidden by the painterly texture) | 54,685 B | lazy; requested at about 4.0 s when scrolled near, not at first load |
| 7 | Plates 2 to 4 (`tonalism-17/22/31`) | same | same | AVIF 1200x675 | same | 39,429 / 24,740 / 48,932 B | lazy |
| 8 | Behaviours window | own DOM | product proof | HTML/CSS + inline SVG graph (`role="img"`) | 785x615 | in JS | client-rendered |
| 9 | Dot grid in graph pane | CSS | texture | `radial-gradient` 1px dots @16% | 471x479 | 0 | CSS |
| 10 | `footer-clouds.png` (deeper section) | own `/images/footer-clouds.png`, used as CSS `mask-image` (`mask-size: cover`) | footer atmosphere | PNG 2000x4000, `cache-control: max-age=0, must-revalidate` | box 2,880 px tall at about y 8,500 | **683,710 B** | **fetched by CSS at 297 ms, i.e. at first load, though used about 8,000 px below the fold**: 38% of all first-load bytes, 97.5% of first-load image bytes |
| 11 | `footer-stars.png` | own, CSS bg repeat | stars layer (parallax) | PNG 1692x967 | 1440x3360 | 1,497 B | CSS, first load |
| 12 | `footer-hills.png` | own via `next/image` (`w=3840&q=50`) | landscape silhouette | AVIF 3840x1280 | rendered 1440x480 (2.7x oversampled) | 74,043 B | lazy |
| 13 | `footer-meteor.jpg` | own, created by JS `createElement('img')` | meteor streak | JPEG 21x1220, rotated 34deg | 21x~320 | 2,097 B | on demand, at random times |
| 14 | Aurora canvas | three.js WebGL2 (own chunks) | footer atmosphere | `<canvas class="mix-blend-screen blur-[6px]">` | 1440x1311 backing store | 0 (shader is inline in a 5 KB chunk) | **context created at 699 ms with scrollY 0 although the canvas is at page y about 11,082**; frames only near the viewport |
| 15 | Footer sky | CSS, fixed layer, JS-updated | footer atmosphere | linear-gradient (3 stops) | 1440x900 fixed | 0 | JS writes stops per scroll |
| 16 | Compliance roundels | own, inline SVG | trust | 3 inline SVGs (1/4/1 paths) | 72x72 | 0 | inline |
| 17 | `og-image.png` (not rendered) | own `/metadata/og-image.png` | social card | PNG 1200x630 | n/a | 178,179 B | not fetched on load |

First-load transfer: 56 requests, 1,783,516 B (Document 26,342; Script 706,198; Stylesheet 34,493; Font 259,971; Image 701,317; Fetch 52,615 [Next route prefetches]). After a full scroll: 81 requests, 2,246,517 B.

## Motion inventory (harness fields)
- Web Animations at load: 6 (5 finished CSS entrances + the marquee). After scroll: 23 at y 900, 209 at y 5,645, 191 at y 11,290 (skeleton pulses and chart-bar transitions). `Element.animate` is not called at load (0) but **314 times during one scroll pass** (WAAPI used by the footer and windows).
- Keyframes in the stylesheet: `first-load-nav-enter`, `first-load-rise-enter`, `pen-stage-fade-in`, `enter`, `exit`, `spin`, `ping`, `pulse`, `bounce`; the marquee keyframes are inline in a `<style>` in the HTML.
- CSS scroll-timeline / `animation-timeline` / `view-transition` / `@starting-style`: **0 hits** in both stylesheets. `@property`: 84 hits, all `--tw-*` Tailwind internals (not an authored technique).
- IntersectionObservers created: 12; ResizeObserver 1; wheel listeners: all passive.
- `idleRafPerSecond: 120` at top = **two** 60 fps rAF loops (ASCII field and pen curve), not a 120 Hz scheduler; mobile 1 (stage hidden).
- Wheel scroll: native. One 500 px wheel tick moved the page 500 px with the first change at 86 ms and 2 distinct positions (instant jump, no smoothing layer).
- Reduced-motion run: 0 animations after reload, 0 infinite (see JS-off / reduced-motion section for what is not covered).

## Motion catalogue
Everything I could observe. "Engine": CSS = stylesheet animation/transition; JS = script-driven (easing NOT OBSERVED unless stated). All values are from this run unless marked "from source".

| ID | What | Trigger | Property animated | Duration / easing | Engine and evidence |
|---|---|---|---|---|---|
| M1 | Hero copy block (eyebrow, H1, lede) rises in | page load | opacity 0 to 1, translateY 14px to 0 | 520 ms, delay 20 ms, `cubic-bezier(.22,1,.36,1)`, fill both | CSS `.first-load-hero-copy-enter`. rAF sampler: visible by 114 ms, 99% by 447 ms |
| M2 | CTA pair rises in | load | opacity, translateY 14px | 540 ms, delay 150 ms, same curve | CSS; sampler: 248 to 580 ms |
| M3 | "Trusted by" + strip rises in | load | opacity, translateY 14px | 600 ms, delay 500 ms, same curve | CSS; sampler: 597 to 980 ms |
| M4 | **Header enters last** | load | opacity 0 to 1, translateY -10px to 0 | 520 ms, delay 580 ms, same curve | CSS `.first-load-nav-enter`; sampler: not visible until 663 ms (the nav is hidden for the first 0.6 s) |
| M5 | Pen stage fade-in | after hydration | opacity 0 to 1 | 1,000 ms ease-out, delay 750 ms | CSS `.pen-stage-fade-in`; stage mounts at 500 ms, first visible 1,264 ms, full at 2,180 ms |
| M6 | Pen curve draws and undraws, forever | load, while stage is within 200 px of the viewport | `stroke-dashoffset` (paint, not transform) | from source: draw-up 7,000 ms, hold 700, undraw 5,000, draw-down 7,000, hold 700, undraw 5,000 (cycle 25.4 s), cosine ease-in-out; a new random curve each phase; pointer-enter slows it to 0.25x with a 500 ms smoothing | JS rAF. Runtime check: offset series 0 to -838 over 4 s fits the undraw phase. Hover slowdown not cleanly measurable (my two samples fell in different phases of the eased cycle) |
| M7 | ASCII field flicker + halo around the pen | continuous in view | text content of 30 rows | every 90 ms or more, 10% of the 1,980 cells re-roll from a 22-character set (about 11 Hz); characters within about 2.3 / 6.8 / 11.4 / 20% of stage width of the pen become `·`, `-`, `.`, blank | JS rAF; MutationObserver: 890 `childList` mutations in 3 s (about 297/s); stops when scrolled away (rAF sources at y 3,000 no longer include it) |
| M8 | Logo strip scrolls sideways | always | `transform: translate3d(0 to -50%)` | 233 s linear infinite (about 35 px/s from two screenshots about 3 s apart) | CSS (inline `<style>`); runs with JS off |
| M9 | Custom scrollbar | scroll | `transform: translateY` (thumb) and track `opacity` 0.38 to about 0.95 while scrolling | thumb position is linear in scrollY (0.0682 px per px at this page height, equal to track/page ratio); fade timing NOT OBSERVED | JS; `fixed top-2 right-1 bottom-2 w-[3px] z-[2147483647] pointer-events-none`; native bar hidden |
| M10 | Header frosted layer fades in | scrollY above 0 (full by 40 px) | opacity 0 to 1 of an 85% page-colour layer with `backdrop-filter: blur(12px)`, plus a 1px hairline to 0.6 | 200 ms `cubic-bezier(.4,0,.2,1)` | CSS transition on child layers; header itself does not move |
| M11 | Button hover / focus | pointer, keyboard | colour only: primary fill to the same green at 90% alpha; secondary border lightens and label drops to 80%; chip fill meadow-100 to meadow-200; nav link 85% alpha to full ink | 150 ms `cubic-bezier(.4,0,.2,1)` (chip 180 ms `cubic-bezier(.32,.72,0,1)`) | CSS. No transform, shadow, underline or lift. Focus ring: 2px page-colour gap + 2px green ring (box-shadow), no transition |
| M12 | Live telemetry inside each window | in view | log rows stream and timestamps tick; histogram bars `scaleY` (transition 360 ms `cubic-bezier(.32,.72,0,1)`, values set by JS); graph nodes drift (`transform: translate` rewritten); live-dot opacity .45 to 1 (1.8 s ease-in-out); caret and skeleton lines pulse (2 s `cubic-bezier(.4,0,.6,1)`); ring pulses 2,600 ms ease-in-out (WAAPI, also scale 1.00 to 1.08); one-shot opacity 900 ms ease-out | continuous | JS + CSS. MutationObserver: 152 `childList` and 21,970 attribute mutations in 6 s on one window. Code-editor typing speed NOT OBSERVED (I saw the "generating" state and a caret only) |
| M13 | Footer day-to-night sky | scroll through y about 8,200 to 11,200 | gradient colour stops of a fixed full-viewport layer, and its opacity (0.30 at y 8,200, 1.0 by y 9,400) | linear in scroll, no easing layer | JS writes inline styles per scroll event; values sampled at 7 positions |
| M14 | Stars parallax | same | `translateY` -1,447 px to -84 px while scrolling 3,458 px (about 0.39x), opacity 0.03 to 1 | scroll-linked | framer-motion (`useScroll` + `useTransform`, from source) |
| M15 | Meteor streaks | random | created `<img>`, rotated 34deg | timing NOT OBSERVED | JS (from source: random x, `createElement`) |
| M16 | WebGL aurora | in view within 200 px | shader uniform `time = elapsed / 200,000` (very slow drift) | continuous | three.js; reads only from source: low-power renderer, DPR capped at 1.25, disabled entirely under reduced motion |
| M17 | Footer CTA reveal | first entry into view | opacity 0 to 1, y 20px to 0 | 1.4 s, delay 0.2 s (heading) and 0.3 s (button row), `once`; easing "strong" curve NOT READ | framer-motion `whileInView` (from source) |
| M18 | Mobile menu | tap | panel appears over a dim scrim | duration/easing NOT OBSERVED (only open state captured) | JS state |

**What is STILL (observed):** H1, lede and every feature heading/lede after load (no scroll reveals, text is in the server HTML at full opacity); the four painted plates (static, `scale: 1.02`, no parallax, no Ken Burns); window frames (chrome and layout); the "Ship Once" band and its diagram (0 of 34 elements changed over 3 s, no running animation inside); the enterprise section; buttons and cards (no lift, scale or shadow on hover); the testimonial grid until activated (activation behaviour NOT OBSERVED: I did not click). Scrolling itself is native: no scroll-hijack, no scroll-snap in use on the page, no smoothing.

**Moment count for the HELIX budget:** at least 9 distinct motion systems (entrance, pen, ASCII, marquee, scrollbar, header layer, window telemetry, footer scene, CTA reveal), against the HELIX cap of two moments per page.

## Performance (measured)
- Lighthouse: NOT RUN (run separately by the harness owner).
- First load (no scrolling, unthrottled local Chrome, h2): 56 requests, 1,783,516 B. By host: www.adaline.ai 1,578,338 B; googletagmanager 195,428 B; ahrefs 3,349 B; doubleclick 3,151 B; plausible 3,122 B.
- JS first load: 706,198 B total (Script type): first-party Next chunks 492,615 B br (22 files; includes the prefetched `/get-started` route chunk 34,618 B and `not-found` 2,726 B, so about 455 KB for `/`) + third-party 201,621 B (GTM 195,428; doubleclick 3,151; ahrefs 3,042). Of the first-party bytes: **three.js runtime chunks 136,010 B** (`2a9a6835-…js` 77,524 B and `e6502385-…js` 58,486 B, fetched at about 365 ms although the only WebGL canvas is at the bottom) and **framer-motion chunks 47,782 B** (`62092-…js` + `83278-…js`). CSS: 34,493 B br (187,037 B raw, one 177 KB Tailwind v4 bundle with the full default colour ramps). Fonts 259,971 B. Largest first-load asset is the 684 KB footer cloud mask (see inventory #10).
- Harness runtime: LCP desktop 1,476 ms, element = the decorative ASCII `<pre>` (not the H1); mobile LCP 1,464 ms, element = a 112 px-area logo SVG. **Inference, not verified:** the H1 sits in a block that animates from opacity 0, which appears to exclude it from LCP candidates, so the metric lands on a later, smaller element. CLS 0; long tasks 0 at load.
- Page height instability: `scrollHeight` read 12,970, 13,127, 13,310, 13,592, 13,118, then 12,558 px during one top-to-bottom wheel pass. Cause: seven sections carry `content-visibility: auto; contain-intrinsic-size: auto 900px` (confirmed in the server HTML), and the real section heights (1,249 / 1,275 / 1,374 / 618 / 532 px) differ from the 900 px placeholder. Not counted as CLS by the load-time observer; it shows as scrollbar and anchor drift.
- Main-thread churn while a window is in view: about 3,600 attribute mutations per second on one window (10,938 in 3 s, no-preference run), plus rAF loops of 60 to 120 callbacks per second at every scroll position after the first screen (framer-motion frame loop, a log auto-scroll loop at 16 to 57/s, and in the footer the WebGL loop).
- Cache: `/images/*` and `/logos/*` are `max-age=0, must-revalidate`; `next/image` outputs are `max-age=31536000, immutable`.

## Accessibility spot checks (manual; axe NOT run this round)
- `lang="en"`; 1 H1; H2 order is logical (7 H2, then 3 H3 in the footer); landmarks: `nav[aria-label=Primary]`, `main`, `footer`, **no `<header>`**, no skip link, `main` has no id.
- Images: 105 of 123 `<img>` have empty `alt` (the marquee logos, decorative by design; the marquee container carries an `aria-label`). Windows are `role="group"` with names; the graph is `role="img"`.
- Focus: visible ring on buttons and links (2px gap + 2px ring); testimonial cards are focusable (`tabindex=0`, `role=button`, `aria-expanded=false`); whether Enter/Space operates them NOT OBSERVED.
- **Scroll trap (reproduced):** the live-log panel inside the Evals window is `overflow-y: auto` with `overscroll-behavior: contain` and a rAF loop that keeps it scrolled to the bottom. With the pointer over it at page y 2,400, four 250 px wheel ticks moved the page 0 px. At y 2,000 and 3,300 only 250 and 500 of 1,000 px moved before the pointer hit a panel. At y 4,500 the page moved the full 1,000 px. My first automated sweep (pointer at the viewport centre) stalled at y 2,400 for 17 further wheel steps for this reason.
- **Native scrollbar removed, replacement is not draggable** (`pointer-events: none`, 3 px).
- Contrast: lede 4.57:1, "Trusted by" 4.57:1 (14px mono), footer column heads and copyright 4.43:1 at 11px (fails 4.5), ASCII field 2.28:1 but `aria-hidden`/decorative.
- Reduced motion: respected by M1 to M5 (no entrance, no stage), M6/M7 (stage not rendered), M8 (marquee `animation: none`), M16 (renderer not created), M13/M14 (footer layers set to opacity 0), M17 (reveal disabled). **Not respected inside the product windows**: with `reducedMotion: reduce` and a window in view I still measured 9,416 attribute mutations and 51 `childList` mutations in 3 s and 60 running CSS animations (pulses). rAF per second dropped to 0, so the updates are timer-driven.
- No consent UI at all; GTM (Google Ads tag `AW-…`), Plausible and Ahrefs scripts load unprompted (observed from this network location only).

## Structured data and meta
- Title: "Adaline | Ship Agents That Self-Improve" (39 chars). OG title is the same words in a different order and case. Description present, **200 chars** (over the usual 160 truncation). Canonical `https://www.adaline.ai/`. `robots: index, follow`. Viewport meta includes `interactive-widget=resizes-content`.
- OG image 1200x630 PNG (178,179 B) with alt text; `twitter:card` = `summary_large_image`.
- JSON-LD: `Organization`, `WebSite`, `WebPage`, `SoftwareApplication` + `WebApplication` (single graph).
- Footer includes DPA, privacy, terms and a "report vulnerability" link (security posture signalled in navigation).

## With JS off and with reduced motion
**JS off (`desktop-1440-nojs.png`, `ev-nojs-y1000.png`, `ev-nojs-footer.png`; probe `noJs.visibleChars` 879; my count 11,209 px page, 119 `<img>`):**
- Survives: header (wordmark, Docs, Blog, Get Started), eyebrow chip, H1, lede, both CTAs (real `href`s: `/get-started`, docs URL), "Trusted by" + the logo marquee **still scrolls** (CSS animation in the server HTML), 6 of the 7 H2s with their ledes (the footer CTA H2 is the exception, see below), enterprise copy and the badges, the footer link grid, the footer night scene (hills image and gradient background).
- Missing: the entire right half of the hero (ASCII + curve; 0 `<pre>`, 0 stage), the four painted plates and all five product windows (each leaves an empty flat `#EFF2E8` plate of 1280x914, which is a respectable skeleton), the WebGL canvas, the testimonial grid (13 `<article>` nodes with the quote text are in the HTML, but every one has a 0x0 box with JS off, so the section collapses and the page height falls from 11,209 to 10,515 px while scrolling), and **the footer CTA is invisible**: the heading and button row are server-rendered with inline `opacity:0; transform: translateY(20px)` and only framer-motion removes it. Net: first-viewport text and CTA pass the five-question test; the closing CTA fails.
**Reduced motion (`ev-reduced-motion-top.png`, harness `desktop-1440-reduced-motion-top.png`):**
- Survives: all text, CTAs, header, logo strip (static, not scrolling; its first logos are partly masked at the left edge).
- Changes: no entrance animation (content simply present), hero right column **empty** (`[data-pen-stage]` absent after 4 s), WebGL aurora not created (canvas element exists, blank), footer layers hidden, CTA visible (opacity 1).
- Not changed: window telemetry (see Accessibility).

## Premium and trust signals
**Why it reads premium (each with evidence):**
1. **Two-ramp colour discipline.** Every non-product colour on the page comes from one green-tinted neutral ramp (pebble, page `#FBFDF6`, ink `#0A1D08`, hairline `#C5CCB6`) and one deep-green accent (`#203B14` fill, 12.1:1 label). The only saturated hues are inside windows. Result: the page looks printed rather than UI-kit.
2. **Three-voice typography with fixed roles.** Akkurat at 400 with -0.04em on the 53px H1; Fragment Mono caps for every control and label (+0.05em); a light display serif held back for two statements at 104 to 108px (-0.02 to -0.032em). Roles never mix.
3. **Product proof as a live, believable instrument.** Real DOM windows (785x615, 560 to 600 nodes) with mono tabular data, status chips, a dark status bar and streaming rows; set on a 1280x914 painted plate with a 5% bottom shade, delivered as 25 to 55 KB AVIF.
4. **Restrained interaction vocabulary.** Hover is colour-only at 150 ms; header gains a hairline instead of moving; focus is a clean double ring; entrance is a 14px rise at 520 ms on a quint-style curve with a 20/150/500/580 ms stagger.
5. **Craft details:** `text-wrap: balance` on every heading, `pretty` on ledes, masked marquee edges, size-matched font fallbacks (CLS 0), `content-visibility` on seven sections, a custom 3px scrollbar, named ARIA groups on the windows.
6. **A scripted ending.** A scroll-linked day-to-night sky, star parallax, meteors, WebGL aurora and a 104px serif CTA: the memorable moment, and entirely art-directed rather than template.

**What is generic:**
- Hero formula: slogan H1 + one-sentence lede + two pills + customer-logo strip. The H1 says nothing about the product category.
- "Trusted by" logo marquee (100 DOM images, 19 files) and a quote-card grid with logo and role.
- Four identical heading + lede + big-visual sections.
- Aurora / stars / night gradient footer and an ASCII-art hero are current AI-landing tropes; the ASCII/pen graphic is unrelated to the product.
- Compliance roundels (SOC 2, HIPAA, GDPR) as a trust row.
- Same CTA label ("Get Started") five times, no secondary conversion path beyond Docs.

## Replicable by HELIX under the truth rules?
HELIX rules applied: light only, flat, no client logos, no invented metrics/features/customers, only real console UI (or a labelled "Illustrative interface. Sample data." frame), at most two motion moments, transform/opacity only, reduced motion respected, readable with JS off, no animation library above the fold.

| Pattern | HELIX-truthful equivalent | Verdict |
|---|---|---|
| Mono-caps eyebrow chip above H1 | Plain text chip stating the category in the claim register's own words (white-label logistics operating system). Not a link unless the target exists. | Adopt |
| H1 as abstract slogan | No. HELIX H1 states the fact (Spec voice rule); Adaline's missing category noun is the lesson. | Avoid |
| ASCII + pen-curve hero visual | None. JS-only, paint-property animation, empty with JS off and reduced motion, two rAF loops. If a hero visual is needed: a static, server-rendered "Illustrative interface. Sample data." frame. | No |
| Customer logo marquee | None (no client logos). Equivalent: a plain text row naming the three operator types HELIX serves (couriers, 3PLs, freight brokers); no motion. | No (text row only) |
| Testimonial grid with expandable cards | None until written-permission quotes exist. | No |
| Compliance roundels | None unless a certification is real and confirmed (`{{CONFIRM: ...}}`). | No |
| Header: sticky 64px, 2 links + 1 CTA, mobile menu panel | Direct fit to Spec's sticky 64px header. Make the header CTA the same label and target as the hero CTA (as Adaline does). Drop the delayed (580 ms) header entrance. | Adopt |
| Header hairline appears on scroll | Opaque page-colour bar plus a 1px hairline that fades in via opacity only; no blur (glass banned). | Adapt |
| Hero entrance: 14px rise, 520 ms, `cubic-bezier(.22,1,.36,1)`, 20/150 ms stagger | Pure CSS, `both` fill, text server-rendered visible when JS is off; under reduced motion no animation. Use as one of the two motion moments. Keep H1 out of an opacity-0 start if LCP matters (see Performance inference). | Adopt (1 moment) |
| Colour-only hover (150 ms), double focus ring | Same, with HELIX cobalt accent (colour pending Q-12). | Adopt |
| Two-ramp tinted-neutral palette + one accent | HELIX tokens (Spec Appendix B): tinted neutral ramp, one accent, hairlines instead of shadows. | Adopt |
| Mono caps for labels, tight tracking on the big sans | Geist Sans / Geist Mono are locked; replicate roles (mono caps labels, tracking about -0.03 to -0.04em at display size, one weight). No serif. | Adapt |
| Product shown as a window with drawn chrome and status bar | Server-rendered HTML/CSS frame labelled "Illustrative interface. Sample data." with static, plausible-but-labelled rows and tabular mono numerals, until real console captures exist (Q-13). No streaming, no telemetry loop. | Adapt |
| Painted landscape plate behind the window | None (no stock/AI imagery). Equivalent: a flat tinted panel (Adaline's own JS-off state is exactly this) around the frame. | No (flat panel) |
| Dark "Ship Once" band with serif | Light only: a flat tinted band. | No |
| Four-pill flow diagram with a single connector loop | A static SVG/HTML stepper of HELIX's real operating flow, only with capabilities confirmed live (Q-05). Server-rendered, no motion. | Adapt |
| Heading + one-sentence lede + one large visual per section, 96px section padding | Matches "one idea per section". | Adopt |
| Scenic scroll-linked footer (gradient sky, stars, meteors, WebGL, serif CTA) | None. Equivalent: a flat closing CTA panel with the same label/target as the header, then the link grid. | No |
| `content-visibility: auto` on below-fold sections | Allowed performance technique; set accurate `contain-intrinsic-size` to avoid the scroll-height drift measured here. | Adapt |
| Custom scrollbar overlay; `overscroll-behavior: contain` log panels | None: native scrollbar only, no inner scroll traps. | No |
| `text-wrap: balance` / `pretty` | Yes. | Adopt |

## Tech fingerprint (feeds TECH_FINGERPRINT.md)
Evidence rule applied: every "yes" names a file, string, global, DOM attribute or observed behaviour; every "not detected" lists what I searched.

| Item | Verdict | Evidence |
|---|---|---|
| Framework | **Next.js App Router on Vercel** | chunk paths `/_next/static/chunks/app/layout-…js`, `app/page-…js`; global `self.__next_f`; `?_rsc=` prefetch requests (`/blog?_rsc=…`); `next/image` URLs `/_next/image?url=…&w=…&q=…`; response header `server: Vercel`, `x-vercel-cache: HIT` |
| CSS | **Tailwind CSS v4** | `@property --tw-*` x84, `--color-*` theme vars in `oklch()`, `color-mix(` x161, `--spacing: .25rem`, utility classes like `bg-meadow-900/45`, `tw-animate-css`-style `enter`/`exit` keyframes using `--tw-enter-*` |
| Smooth-scroll library | **NOT DETECTED** | no `lenis`/`locomotive`/`smooth-scroll` string in 33 first-load scripts; `html scroll-behavior: auto`; wheel probe: 500 px in one jump at 86 ms (native). A custom 3 px scrollbar overlay replaces the native bar (`scrollbar-width: none`) but scrolling itself is native |
| GSAP / ScrollTrigger | **NOT DETECTED** | 0 hits for `gsap`/`ScrollTrigger` in all first-load scripts; `window.gsap` undefined (`fp.present` = `__next_f`, `plausible`, `gtag`, `dataLayer`) |
| framer-motion (Motion) | **CONFIRMED** | chunk `62092-df1b388207db326f.js` (115 KB raw, 40 KB br): `MotionValue` x30, `LayoutGroup`, spring `stiffness`, `data-framer-portal-id`; chunk `83278-…js`: the library's own `useScroll()` hydration warning string and `new ScrollTimeline({source, axis})` behind a feature check with a JS fallback; `app/layout-…js` contains `m.P.h2` with `initial`/`whileInView`/`viewport:{once:!0}` (footer CTA); inline `style="opacity:0;transform:translateY(20px)"` on 3 server-rendered nodes; `Element.animate` called 314 times in one scroll pass |
| three.js | **CONFIRMED** | chunk `2a9a6835.…js` (320 KB raw, 77.5 KB br): `THREE.WebGLRenderer:` console strings x37, `ShaderMaterial` x14; chunk `e6502385.…js`: `THREE`-prefixed strings x55, `PerspectiveCamera`; component chunk `35515.…js` (5 KB): `Scene`, `PerspectiveCamera(40…)`, `WebGLRenderer({canvas, alpha:true, antialias:false, powerPreference:"low-power"})`, `ShaderMaterial` with simplex-noise GLSL, `time` uniform = elapsed/200,000, `matchMedia("(prefers-reduced-motion: reduce)")` guard; DOM: one `<canvas class="mix-blend-screen blur-[6px]">` 1440x1311 at the footer; runtime `canvasContexts: ['webgl2']`, context created at 699 ms with scrollY 0 |
| React Three Fiber / OGL | **NOT DETECTED** | no `__r3f`, `@react-three`, `useFrame`, `OGL` in any scanned chunk (the aurora is plain three.js inside a React effect) |
| Lottie / Rive / Spline | **NOT DETECTED** | DOM counts 0 (`fp.els`); "rive" substring hits are inside ordinary words, not evidence |
| Swiper, Barba | **weak signature, not confirmed for `/`** | strings only inside `app/get-started/page-…js`, a different route prefetched into the first-load list |
| Native CSS scroll-driven animations | **NOT DETECTED** | 0 hits for `animation-timeline`, `view-timeline`, `scroll-timeline` in both stylesheets (harness `scrollTimelineJS` is framer-motion's feature check, not site CSS) |
| View Transitions | **NOT DETECTED** | 0 hits for `view-transition` / `startViewTransition` in CSS and 33 scripts |
| `@property` | present but not authored | all 84 names start with `--tw-` (Tailwind internals) |
| `<video>` backgrounds | **NOT DETECTED** | `<video>` count 0 |
| WebGL canvases | 1 | footer aurora (above) |
| rAF-driven JS animation | yes | `HeroPenStage` chunk `89291-…js` (3.5 KB br): 30 `<pre>` rows, SVG `stroke-dashoffset` loop, IntersectionObserver gate; plus footer and windows (rAF callbacks 120/s at top, about 195 to 420/s deeper) |
| Analytics / ads | GTM + Google Ads tag, Plausible, Ahrefs | script URLs `googletagmanager.com/gtag/js?id=AW-…`, `plausible.io/js/script.hash.outbound-links.pageview-props.tagged-events.js`, `analytics.ahrefs.com/analytics.js`, `googleads.g.doubleclick.net` |
| JS on first load | 706,198 B (Script) | about 455 KB first-party for `/` + 201.6 KB third-party; three.js 136 KB, framer-motion 48 KB |
| CSS | 34,493 B br, 187,037 B raw, 2 files | harness `cssBytes` |
| Total requests | 56 first load; 81 after full scroll | harness |

## What not to borrow
- The whole footer scene: JS-written full-viewport gradient (a paint on every scroll frame), WebGL aurora, star parallax, meteors, clouds mask (gradient/glow/WebGL are banned; also 684 KB fetched at first load for something used 8,000 px down).
- Dark bands and display serifs (light mode only; Geist is locked).
- The ASCII + pen hero (decorative, JS-only, absent with JS off and under reduced motion, paint-property animation at about 297 DOM writes per second).
- Logo marquee and logo-bearing testimonial grid (no client logos or quotes without written permission).
- Unlabelled simulated product windows with streaming data (HELIX needs the "Illustrative interface. Sample data." label, no live telemetry).
- Painted/stock plate imagery.
- Scroll traps (`overscroll-contain` log panel), a hidden native scrollbar with a non-draggable replacement, hiding the header for 0.6 s on load.
- A footer CTA that is `opacity:0` in the server HTML and depends on JS to appear.
- 11px text at 45% alpha (4.43:1), 200-char meta description, a three.js runtime shipped (136 KB) for an effect that is off screen.

## Harness vs reality (contradictions and misreadings in `probe.json`)
1. **`animationsAtLoad[].easing: "linear"`** is the effect-level timing of CSS animations, which is always linear; the real curve (`cubic-bezier(.22,1,.36,1)`) lives in the stylesheet rule. Read keyframe or stylesheet easing instead.
2. **`dom.fontShare` "GT America Mono" (1,980 chars)** is the first family of a stack with no `@font-face`; the mono actually used is Fragment Mono (webfont, confirmed via DevTools platform-font query), and Menlo (system) for the ASCII.
3. **`dom.assets`** lists 100 marquee `<img>` entries (the filter keeps anything vertically in the first two screens, regardless of x) and most show `natural: [0,0]` because lazy images had not loaded. They are 19 unique SVGs. It also omits the ASCII/pen stage (a `<pre>` stack, not an asset tag) and the first painted plate.
4. **`animationsAfterScroll` stops "mid" (5,645) and "footer" (11,290) are not 50% and the bottom.** The sweep was stalled by the scroll trap (pointer at viewport centre over a log panel) and by `scrollHeight` drifting 12,558 to 13,592 px. The "footer" screenshot therefore shows the dashboard-over-hills scene, not the link grid (that is at y 11,658, max scroll).
5. **`transferFirstLoad` includes route prefetches** (`get-started/page` chunk 34.6 KB, `?_rsc` fetches 52.6 KB) so it overstates what `/` needs; the 684 KB `footer-clouds.png` dominates the image figure and is easy to miss because it is CSS-initiated.
6. **`runtime.lcp`** points at the decorative `<pre>` (desktop) and a tiny logo (mobile); it is not the H1.
7. **`idleRafPerSecond` 120** is two loops at 60/s, not a refresh rate.
8. **`cssFeatures["@property"]: 84` and `perspective: 25`** are Tailwind internals; **`scriptSignatures.scrollTimelineJS`, `swiper`, `barba`** are, respectively, framer-motion's feature check and strings inside a prefetched other-route chunk. None indicates the home page uses those techniques. `scriptSignatures.shader` for the two three.js chunks is the library's built-in GLSL; the site's own shader is in `35515-…js`.
9. **`dom.header.backdrop: "none"` and `bg: transparent`** are true at scrollY 0 only; the frosted layer fades in by scrollY 40.
10. **Reduced-motion screenshot** (`desktop-1440-reduced-motion-top.png`) is correct (blank right column) and is not a late-load artefact: I reproduced it with a context-level `reducedMotion` and a 4 s wait.

## NOT OBSERVED
- Lighthouse and axe results (not run by instruction / not in harness output).
- Testimonial expand/collapse motion, keyboard activation and the mobile triangle control (no clicks performed).
- Duration and easing of: mobile menu open/close, the footer CTA's "strong" ease, meteor timing, scrollbar fade, code-editor typing in the Evals window.
- Whether the "Ship Once" diagram animates on first entry (I only sampled it after it had been in view for about 1 s: 0 changes over 3 s).
- Behaviour on a real touch device or a high-refresh display; the effect of a real network (everything above is unthrottled local Chrome).
- Other pages (pricing, blog, docs, `/get-started`), logged-in product, cookie behaviour from other regions.
- Exact threshold of the header fade (between 1 and 40 px).

Screenshots in this folder: harness `desktop-1440-{t1s,top,screen2,mid,footer,nav-scrolled,reduced-motion-top,nojs}.png`, `mobile-390-{t1s,top,screen2,mid,footer,nav-open,nav-scrolled,reduced-motion-top}.png`; mine: `ev-entrance-372ms.jpg`, `ev-y2400-evals-window.jpg`, `ev-y4000-data-window.jpg`, `ev-y5600-testimonials.jpg`, `ev-y7200-ship-once.jpg`, `ev-y8000-enterprise.jpg`, `ev-y8800-footer-dusk.jpg`, `ev-y10400-footer-cta.jpg`, `ev-y11658-footer-links.jpg`, `ev-reduced-motion-top.png`, `ev-reduced-motion-window-in-view.jpg`, `ev-nojs-y1000.png`, `ev-nojs-footer.png`. Scripts in `scripts/` (`a-structure`, `c-sweep`, `d-motion`, `e-scroll`, `f-misc`, `g-assets`, `h-reduced`, `i-webgl-timing`, `j-check`, `k-nojs-testimonials`; all observation-only, run with `node <script> <args>`).
