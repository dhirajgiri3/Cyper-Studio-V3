# Observation card: iru

| Field | Value |
|---|---|
| URL | https://www.iru.com/ (final URL after load: same; document HTTP 200, `server: cloudflare`, h3, br) |
| Role | new reference, Brief 01 v2.1 |
| Date | 2026-10-08 |
| Viewports | 1440x900 (DPR 1); 390x844 (DPR 2, Android Chrome UA emulation); JS-off 1440x900; reduced-motion 1440x900 |
| Tool | playwright-core + Google Chrome 154 (headless), harness `probe.json` plus six own scripts in `scripts/` (01-static, 02-motion, 03-interaction, 04-frames-menu, 05-assets-mobile, 06-a11y-nojs); axe-core 4.14.0. Lighthouse not run (run separately by the lead). |
| Personality in three words | calm, monochrome-ink, illustration-led |
| Blocked? | No. No 403, captcha or bot wall. Nothing clicked, typed or submitted; cookie banner left alone (see Accessibility). |

Context: Iru (formerly Kandji) sells device management, identity and compliance software to IT and security teams. The page is a HubSpot CMS Hub template. Everything below is the home page only.

## Hero pattern

- **Fixed chrome (122 px at 1440, 118 px at 390):** a 42 px announcement bar (`#0c0c29` ground, one centred 14 px text link with an arrow) above an 80 px white header (76 px on mobile). Header: wordmark plus a raster jellyfish mark on the left, five centred items (Products, Solutions, Resources, Company, Pricing; 14 px / 500), then an outline "Login" (79x44, radius 8, 1 px ink at 10 %) and a filled "Book a demo" (130x44, radius 8). Mobile: filled "Book a demo" plus a hamburger.
- **Hero band:** 720 px tall (y 122 to 842), flat `#f6f6f6`, two-column grid. Left column, top to bottom: a G2-badge line (22 px mark, "850+" in ink, "5 star reviews" in `#888`, 14/21), the H1 (56/60.48, two balanced lines, max-width 576), a two-line subhead (16/24, max-width 448), then an email field with a filled "Book a demo" submit inside one 400x66 bordered white box (radius 12). Right column: an inline SVG 924x760 that starts at x=630 and bleeds off the right edge: three isometric "glass card" stacks plus a fingerprint chip, joined by thin coloured connector lines.
- **Stated in plain text in the first viewport:** one outcome headline ("Manage devices and everything they touch"), a one-line scope (compliance, productivity, security, "unified platform"), the review badge, the CTA. **Only in imagery:** what the product actually does (an app-install checklist, an endpoint detection table with a "Blocked" state, a compliance evidence list, an AI chat answering a device question, a tasks list, SSO app tiles). All of that text is vector paths inside the SVG (0 `<text>` nodes), exposed to assistive tech as one `role="img"` with a generic one-line `aria-label`. The product category words (Endpoint, Identity, Compliance) appear in text only from the second screen on.
- **CTA count and hierarchy (first viewport, desktop):** 4 actions besides the nav: the announcement link (text tier), "Login" (outline, secondary), "Book a demo" (filled, primary) in the header, and "Book a demo" again as the hero form submit (filled, primary). Single conversion goal. Header and hero CTA share label, fill colour and 44-48 px height; the hero one adds an email field in front of it (a HubSpot form, injected by JavaScript).
- **Trust signals in the first two screens (0 to ~1800 px):** the G2 line (first screen); "Trusted by teams at 6,000+ companies" with a marquee of customer logos at y 932 to 1064 (just under the fold at 1440x900, in the second screen). Stats and customer quotes come much later (y 4762 and 5456). No certification badges, no awards.
- **Mobile (390x844):** copy first. H1 40/43.2 (three lines), subhead, then the form at y 482 to 548 (inside the first viewport; submit 130x48), then the visual at y 596 (642x528, cropped at the left edge). On top of this, the OneTrust cookie banner covers roughly the bottom quarter of the first viewport at ~4 s and a third-party chat popover opens over the next screens (see Premium and trust signals).
- **Load sequence (my frame capture, 1440, ~120 ms steps):** first paint 192 ms with the H1, subhead and G2 line already in place; the jellyfish mark appears and the email form renders by ~0.8 s; the right half stays empty until the Lottie appears between 1.72 s and 1.87 s, with no fade. The empty slot is reserved, so CLS stays 0.0012. LCP element is the H1.

## Type system

- Fonts by share of visible text: FK Grotesk Neue (4,355 of 4,355 characters). One family only. Loaded file: `FKGroteskNeue.woff2`, variable 100-900, normal, 113,940 bytes, first-party, `font-display: swap`, preloaded by a `Link` header and Early Hints. Fallback stack: -apple-system, system-ui, Segoe UI, Noto Sans, Helvetica, Arial.
- Tokens that exist but are not loaded: `--font-mono` (PT Mono, Roboto Mono, JetBrains Mono) and `--font-roboto-cond`. Code-style text seen on the page ("config as code" plate) is inside a PNG.
- h1: 56px / wt 500 / lh 60.48px (1.08) / ls -1.68px (-0.03em) / `text-wrap: balance` / `#0c0c29`. At 390: 40px / lh 43.2 / ls -1.2.
- h2: 48px / wt 500 / lh 52.8 (1.1) / ls -1.44 (-0.03em) / balance. At 390: 32 / 35.2 / -0.96. Variant: a 56px h2 on the closing CTA card, a 36/40 h2 in the newsletter band.
- h3 (product block title): 24px / wt 500 / lh 24 (1.0) / ls -0.6 (-0.025em). Card title: 16/24 wt 500 ls -0.48.
- Body: 16px / wt 400 / lh 24 (1.5) / ls normal / `text-wrap: pretty`. Hero subhead 16/24, measure 448 px. Small: 14/20 (footnotes), 14/21 (G2 line, nav 14/500).
- Number treatment: stat numerals 80px / wt 400 / lh 72 (0.9) / ls -2.4 (-0.03em), no tabular-numeric setting; label (16/24) sits above the number; footnote markers are Unicode superscripts in the label, sources listed under the grid in grey 14/20.
- Weights in use: 400 and 500 (600 only in the cookie banner button). No italics, no all-caps eyebrows, no display or accent face. Emphasis is by size and weight 500, never by colour.
- Line-break behaviour: headings are balanced (hero H1 breaks "...devices and / everything they touch"; several section H2s carry an authored line break after the first sentence); body copy uses `pretty`.
- Heading semantics are loose: page sections such as "Unified by design..." and "Iru helps companies rewrite / the way work is done" are h3 elements (the last one split across two h3s). Two empty h3 elements (form titles) exist in the no-JS DOM; the site script removes empty headings once it runs.

## Colour system

- Backgrounds (measured fills): white `#ffffff`, hero band `#f6f6f6`, ink-navy `#0c0c29` (footer, newsletter band, closing CTA card, announcement bar, AI video section), `#181834` (`terminal-light`, used on the language-select dropdown list).
- Text tones: ink `#0c0c29` (19.1:1 on white, 17.7:1 on `#f6f6f6`); `#888888` for the G2 qualifier (3.28:1 on `#f6f6f6`, fails AA at 14 px, flagged by axe); ink at ~50 % for placeholders and footer group labels (white at 50 % on navy); footnotes are visibly grey, produced by reduced opacity on a parent (leaf computed colour is full ink); white on navy.
- Borders: 1 px ink at 10 % (oklab alpha 0.1) on cards, form, list dividers and the outline button; 1 px white at 10-20 % on navy; no other border colours.
- Accent usage: none in UI chrome. Links, nav, buttons and arrow icons are all ink or white. There is no brand-colour CTA. All chroma sits inside imagery: the Lottie hero (133 gradient definitions), the PNG product plates (orange to purple, teal to blue, pink to blue), mega-menu tiles, and the AI-section video.
- Declared brand tokens (from `:root`, 149 custom properties): `--color-terminal #0c0c29`, `terminal-light #181834`, `cursor #fff`, `brand-red #d14444`, `brand-lightRed #ee4d4d`, `brand-darkOrange #ff5300`, `brand-orange #f2954e`, `brand-green #4bd783`, `brand-darkBlue #0143fe`, `brand-blue #0079ca`, `brand-lightBlue #86fffe`, `brand-darkPurple #71118c`, `brand-purple #bc4bff`, `brand-pink #ffb3ed`; four gradient tokens (`dark-orange-pink`, `purple-pink`, `orange-pink-fade`, `green-blue-pink`); plus the Tailwind v4 default oklch palette and a `podcast-*` set.
- Gradient / glow / noise, measured: visible element backgrounds that are CSS gradients: 0 (harness `counts.gradients: 0`); the stylesheets contain 20 gradient-function occurrences (the four declared gradient tokens plus utilities) that paint nothing on the home page by my DOM scan. The mega-menu tiles and product plates are PNG images (`bg-cards/*.png`, `Product Features/*.png`), not CSS. Glow: the "AI era" section is an 8.8 MB MP4 of blurred blue then purple squares and a rotating diamond behind white text, over a `#0c0c29` ground (see Asset inventory). Noise or grain: none seen in screenshots. Shadows: the only non-zero `box-shadow` on content is the mega-menu panel (`0 25px 50px -12px` at 25 % black, Tailwind 2xl); cards, plates and buttons are flat. `backdrop-filter`: none in use on visible chrome (header is solid).
- `color-scheme`: normal; `theme-color` `#ffffff`; `data-theme-mode="light"` on `<html>`, yet five dark blocks exist (see Layout).

## Layout and rhythm

- Container: content spans x=32 to 1408 at 1440 (1,376 px wide, 32 px side padding); the Tailwind max is `max-w-9xl` (105rem = 1,680 px), so below 1,680 the layout is fluid. Mega menu panel 1,240 px.
- Grids: hero is a two-column grid at `lg`. Product rows: text column 453 px (x 32-485), 147 px gutter, 776x436 image (x 632-1408, 16:9). Two-up cards: 674 px each with a ~26 px gap. Quote cards: three-up, 441 px each, ~26 px gap. Stats: left h2 (656 px), right 656 px grid of two 328 px columns with 56 px row gap and a 1 px hairline above each row. Footer: four 350 px link columns.
- Vertical rhythm at 1440 (measured tops): hero 122-842; logo caption 932; logo strip 964-1064; section H2 1174 (110 px below the strip); product rows at 1444, 1940, 2436 (pitch 496 px = 436 px plate + 60 px); next H2 2964 (92 px below the last row); two cards 3189-3722; AI section 3722-4702 (980 px: a 900 px video band with ~40 px around); stats 4762-5172 (60 px gap); quote block 5456-5962; closing dark card 6082-6671 (radius 12, 1,376 wide); newsletter and footer to 8195 (footer 1,187 px). No uniform section padding: gaps are 60-110 px between self-padded modules; only the hero has an explicit 60 px vertical padding.
- Page height: 8,195 px at 1440 (about 9.1 viewports), 11,874 px at 390. Visible text: 4,523 characters. No horizontal scroll at either width.
- Density: low to medium. One idea per band, two-column splits, large imagery. Dark blocks (announcement bar, AI video band, closing CTA card, newsletter, footer) alternate with white and `#f6f6f6`, which conflicts with HELIX's light-only rule.
- Radii: 8 (buttons, cards, images, quote cards), 10 (hero submit), 12 (form box, dark CTA card), 16 (mega menu). Borders: 1 px at 10 % ink.

## Components

- Header: announcement bar plus fixed 80 px header inside one `position: fixed; top: 0; z-index: 1000` wrapper (`#iru-header`). Header background is solid white (no blur), no border or shadow in any scroll state. The wordmark collapses to the mark after ~73 px of scroll (see Motion). Harness `header.position: "static"` is the inner `<header>`; the fixed element is its parent.
- Primary button: fill `#0c0c29`, white 14/500, radius 8, 44 px tall (130x44 header; 204x44 "View Endpoint Overview"). Secondary: transparent, 1 px ink at 10 %, radius 8. On dark: white fill, ink text, radius 8 ("Explore ..." 131x44), plus an outline-on-dark twin ("Request a quote").
- Form: HubSpot form injected into a 66 px min-height slot; white 400x66 box, 1 px ink 10 %, radius 12, padding 6x8; email input 252x52 (16/24, placeholder ink 50 %); submit 130x48, radius 10, `#0c0c29`.
- Product row list: 44x44 raster 3D icon, 16/24 label, arrow glyph at right, 1 px hairline between rows (rows ~61 px tall).
- Mega menu (four panels, one per top-level item; only Products was opened): the Products panel has four columns (Endpoint, Identity, Compliance, Iru AI), each a ~280 px PNG gradient tile, a title with arrow, a one-line description and sub-links with 3D-rendered icons; white panel 1,240 px wide, radius 16, padding 24, large soft shadow. The other panels have different max-widths in their classes (about 592, 740, 1136 px); contents NOT OBSERVED.
- Cards: 2-up "feature" cards (image on top, 16/24 title at 500, body below; radius 8, 1 px hairline); 3-up quote cards (a light-grey tile with a customer logo baked into a JPG, quote text 16/24, name 500, role 400).
- Stats grid, closing dark CTA card (two buttons), newsletter row (email plus white "Subscribe"), footer (group labels at 50 % white, link columns, three social icons, language select, legal row).
- Third-party UI: OneTrust cookie banner (single "Ok" button), a floating chat widget (`#warmly-widget`, fixed, `z-index: 2147483647`) with a photo avatar and a human first name opening "How can I help today?".
- Counts (harness): 41 inline SVGs, 84 `<img>`, 18 buttons, 2 forms, 157 links, 3 `<video>`, 0 `<canvas>` in the DOM, 0 tables, 0 details elements.
- Footer first links (group labels): Product, Resources, Company, Get Started.

## Product UI treatment

- No literal console screenshot at 1:1 in the hero. The hero shows stylised mini-UIs on tilted glass cards (vector, animated). The three product rows show a real-looking UI crop on a saturated gradient plate, delivered as a single PNG per row (776x436 on screen; natural 1440x809). The two "visual / config as code" cards do the same (674x379 rendered).
- Content in the plates is specific and plausible (assignment rule builder, vulnerable-app remediation dropdown, a YAML manifest, SOC 2 control builder, SSO "Welcome" tile grid) and includes third-party app logos (Canva, Slack, Chrome, Notion and others). Sample data is not labelled as sample.
- Pattern worth noting: the same 16:9 plate, same radius, same placement (right column), one per product; the gradient is the only per-product colour signal.

## Motion inventory (motion catalogue)

Method: `animationsAtLoad`, `animationsAfterScroll`, `runtime`, `wheelProbe`, `idleRafPerSecond` from probe.json, plus my probes (Lottie registry sampling, computed-style diffs with 500 ms settle, rAF-polled opacity on the menu, frame captures every ~120 ms, a 24-31 step scroll scan over ~920-940 elements for any change in `transform`, `translate`, `scale`, `rotate`, `opacity`, `filter`, `clip-path`, `visibility`, `mask-image`, `background-position`).

| # | Element | Trigger | Property animated | Duration | Easing | Evidence / note |
|---|---|---|---|---|---|---|
| 1 | Hero SVG (Lottie) | autoplay after `DOMLoaded`, loops forever | inside the SVG: opacity (83 animated props), position (56), scale (10), rotation (7); 115 shape layers, 12 pre-comps, 413 keyframes; no path morphing, no text layers | 32.2 s loop (966 frames at 30 fps); registry shows playSpeed 1, loop true | 29 distinct cubic-beziers in the JSON, e.g. 0.333/0/0.667/1 and 0.167/0/0.667/1; playback clock linear | `window.lottie.getRegisteredAnimations()[0]`; JSON `Panel_Animation_Final_v1.json` parsed. Advances ~15 frames per 500 ms. Keeps playing off-screen (frames 238 to 284 while scrolled to 1,500) and under reduced motion. |
| 2 | Hero visual first paint | load | none (no fade) | n/a | n/a | Frames: absent at 1.72 s, present at 1.87 s. Pops in; reserved box prevents shift. |
| 3 | Hero form | form render | opacity 0 to 1 (`fade-in`) | 0.25 s | ease-in-out | computed `animation` on both HubSpot forms; frames show the field present by ~0.8 s |
| 4 | Customer logo marquee | ambient, from load | transform translateX 0 to -3,780 px (keyframe `marquee__widget_...`) | 44 s, infinite | linear | `getAnimations()`; 21 unique SVG logos duplicated (42 `<img>`, each in a 100x100 box). No edge mask. Hover did not pause it (currentTime advanced 817 ms over 800 ms) although the class list contains `hover:animate-paused`. Runs under reduced motion. |
| 5 | Header wordmark | scroll past a threshold (intact at 60 px, collapsed at 100 px; the code's safe zone works out to ~73 px; Alpine `x-effect` on scroll state) | SVG width 59 to 0 px; parent width 107 to 48 px; the jellyfish mark slides left by 59 px (x 97 to 38) | 150 ms | cubic-bezier(0.4, 0, 0.2, 1) | computed `transition` on the SVG; reverses when scrolling back above ~73 px; same on mobile (45 to 0 px) |
| 6 | Header hide/show on scroll | scroll direction | coded (an eased offset, factor 0.22 per frame, driven by rAF) but disabled by `headerAlwaysFixed: true` | n/a | n/a | Observed: header top stays 0 for scroll up and down, transform is identity. The rAF loop still ticks (see Performance). |
| 7 | Mega menu panel | mouseover (also click) on a top-level item | opacity 0 to 1 and translateY 12 px to 0 (`translate-y-3`) on enter; reverse on leave | enter 200 ms, leave 150 ms | ease-out in, ease-in out | Alpine `x-transition` attributes; rAF-polled opacity reached 1 at ~267 ms after the hover event. No hover-intent delay. |
| 8 | Nav links | hover | opacity 1 to 0.8 | 150 ms | cubic-bezier(0.4, 0, 0.2, 1) | computed diff |
| 9 | Filled buttons (header, row CTAs, hero submit) | hover | background and border colour to the same navy at 80 % alpha | 300 ms | cubic-bezier(0.4, 0, 0.2, 1) | no transform, no shadow, no scale |
| 10 | Outline button (Login) | hover | border colour 10 % to 100 % ink | 300 ms | same | |
| 11 | White button on dark | hover | background to 80 % alpha | 300 ms | same | |
| 12 | AI-section video | enters viewport (Alpine `x-intersect.once` sets `show = true`) | video playback (1920x1080, 26.6 s loop) | n/a | n/a | The video had no `<source>` and readyState 0 at load, and a source and buffered data after I scrolled to it; plays when near/in view and pauses when out of view (paused at t=1.99 after leaving, playing again ~600 px before re-entry). Under reduced motion it stays paused and the control reads "Play video". Pause control: opacity 0 at rest on md+, `group-hover:opacity-100` over 150 ms (hover reveal not verified in my run). |
| 13 | Mega-menu videos (`intro-iru.webm`, 400x266, 8.4 s) | autoplay loop muted, inside hidden dropdown cards | video | n/a | n/a | `preload="auto"`: the 108,549 byte file is fetched at page load although the menu is closed. Playback while the menu is open: NOT OBSERVED. |
| 14 | OneTrust banner | load | bottom edge slides to 0 (`slide-down-custom`) | 1 s | linear | probe `animationsAtLoad` (mobile) |
| 15 | Page scroll | wheel | none | n/a | n/a | Native. `wheelProbe`: 500 px reached in one sample at 61 ms, 2 distinct positions, settle span 0. CSS `scroll-behavior: smooth` exists only inside `prefers-reduced-motion: no-preference` and applies to anchors and programmatic scrolls. |

**STILL (checked):** hero text and form after the first second; every product plate, card, quote tile, stat numeral (final values present on first read, so no count-up), footer; no scroll-reveal, no parallax, no pinned or sticky-stacked sections, no cursor effects, no text splitting, no image zoom on hover, no row-link hover change (transition `all 0s`), no announcement-link hover change. The scroll scan found 0 elements out of 919 (and 0 of 936 in the extended run, which included `translate`, `scale`, `rotate`) that changed any of those properties across the full page height. Elements inside the Lottie SVG, the marquee and the fixed header were excluded from the scan.

Not readable: easing of the chat widget's entrance and the cookie banner's contents (third-party, NOT OBSERVED); per-keyframe easing inside the video file (n/a).

## Asset inventory

Rendered size is CSS px at 1440; bytes are `encodedBodySize` from Resource Timing unless noted (cross-origin requests report 0; those use harness CDP bytes or `HEAD`).

| Asset | Origin | Role | Format | Rendered / natural | Bytes | Loading | Type |
|---|---|---|---|---|---|---|---|
| "iru" wordmark | inline in HTML | logo | SVG, 4 paths | 59x40 | inline | immediate | SVG |
| Jellyfish mark `iru-logo.png` | own domain, `/hs-fs/...?width=80&height=80` | logo | PNG | 42x42 / 80x80 | 1,952 | `eager`, no fetchpriority | img |
| Announcement arrow, G2 mark, social icons | inline | icons | SVG | 22-28 px | inline | immediate | SVG |
| Hero animation | inline SVG built by lottie-web | hero visual | SVG DOM, 309 paths, 133 gradient defs, 13 clip paths, 8 filters; serialised 1.34 MB | 924x760 (viewBox 1350x1110) | built from JSON | starts ~1.8 s | SVG (no canvas) |
| `Panel_Animation_Final_v1.json` | `assets.m.iru.com` (first-party CDN host) | hero animation data | JSON (Lottie 5.7.0) | n/a | 1,215,211 raw; 191,079 on the wire in Chrome (harness host total, br); 296,819 gzip via curl | XHR by lottie-web after JS, not preloaded | fetch |
| `FKGroteskNeue.woff2` | own domain | typeface | woff2 variable | n/a | 113,940 | preload via `Link` + Early Hints, swap | font |
| `template_iru.main.min.css` | own domain | all CSS | CSS | n/a | 26,943 br (188,462 decoded) | preload via Early Hints | CSS |
| Customer logos (21 unique x2) | own domain `/hubfs/Company_Logos/*.svg` | trust strip | SVG | 100x100 boxes | 10 loaded at first load = 22,485 total; e.g. one file 6,772 | `lazy` | img |
| Platform product icons | own domain `hs-fs` resize | list-row icons | PNG | 44x44 / 44x44 | 2,810 (3 files) | `lazy` | img |
| `01-Endpoint.png` | own domain `hs-fs` | product plate | PNG | 776x436 / 1440x809 | 170,320 | `lazy`, srcset | img |
| `01-Identity.png` | same | product plate | PNG | 776x436 / 1440x809 | 181,008 | `lazy` | img |
| `03-Compliance.png` | same | product plate | PNG | 776x436 | 291,426 | `lazy` | img |
| `Point_Click1.png`, `CaC.png` | same | card images | PNG | 674x379 | 144,734; 134,758 | `lazy` | img |
| Quote tiles `01-Hunters`, `02-Varo`, `03-Rackspace` | same | customer logo + photo-style tile | JPG | 441x293 | 7,956; 8,120; 14,324 | `lazy` | img |
| Mega-menu bg cards, 3D icons, nav visuals (13 images) | own domain `raw_assets/...IruAurelia/images` | hidden dropdown | PNG | not visible at load | 184,512 total (largest `indentity-icon.png` 32,744 at 720x720 natural for a ~44 px slot) | `eager` | img |
| `intro-iru.webm` (x2 elements) | own domain | hidden dropdown video | WebM, 400x266, 8.4 s | 0x0 at load | 108,549 (second request from cache) | `preload="auto"`, autoplay loop muted | video |
| `IRU_AI_Stringout_03_8.8mb.mp4` | own domain | full-width background video | MP4, 1920x1080, 26.63 s | 1376x900 (object-fit cover) | 8,817,747 file; range requests honoured (`accept-ranges: bytes`); bytes actually streamed: NOT measured | source injected on intersect, `preload="metadata"`, autoplay loop muted playsinline, no poster | video |
| Chat widget avatar and art | third party (Warmly widget script) | support popover | image | popover ~360x430 on mobile | NOT measured | after load | img |

Totals (my runs): 95 images requested at first load = 568,021 B (13 hidden-menu images plus the webm are ~293 KB of that, never visible at first load); after a full slow scroll: 40 own-domain image requests = 1,172,032 B. Product plates are PNG; no WebP or AVIF seen.

## Performance (measured)

- Lighthouse: NOT RUN by me (lead runs it).
- Harness first load (desktop, unthrottled): 213 requests, 3,315,527 B. JS 2,273,559 B (2,220 KB), image 641,862 B, media 109,517 B, XHR/fetch ~250 KB, document 29,857 B. The harness reports Font 0 and Stylesheet 0, which is wrong: the font (113,940 B) and CSS (26,943 B br) arrived through Early Hints, so real transfer is about 3.46 MB. After the scroll-through: 454 requests, 4,491,399 B.
- Harness first load (mobile): 193 requests, 2,963,352 B; JS 2,290,951 B.
- Who owns the JS: the site's own animation/UI code is `template_lottie.min.js` (77,321 B br; lottie-web 5.12.2) plus `template_iru.main.min.js` (26,750 B br; Alpine, header, lottie glue) = 104,071 B, about 4.6 % of script bytes. HubSpot forms bundle 205,462 B br (606,942 decoded). The remaining ~1.9 MB is third-party tags: Google Tag Manager/gtag ~690 KB, Meta pixel configs ~298 KB, Warmly widget ~144 KB, a referral-platform snippet (its data points at `api.getambassador.com`) served from a first-party subdomain ~143 KB, OneTrust ~136 KB, FingerprintJS 3.3.2 from jsDelivr ~51 KB, HubSpot analytics, AdRoll, Unify, Reddit, Clarity, LinkedIn, X, Hotjar and others.
- Runtime (harness, unthrottled): LCP 436 ms desktop / 208 ms mobile, both the H1; CLS 0.0012 / 0.0073; long tasks 4 / 3; Web Animations at load: 1 (the marquee).
- Idle rAF: 120 calls per second on desktop (two loops): 60/s from the header's eased-offset `tick()` in `template_iru.main` and 60/s from lottie-web (attributed by wrapping `requestAnimationFrame` and reading the call stack; 120 callbacks each over 2 s).
- Hidden-UI cost: 13 dropdown images and a 108 KB video are fetched before any user opens the menu.

## Accessibility spot checks (axe 4.14.0, WCAG 2.0/2.1/2.2 A/AA tags; automated only)

- Violations: 2 nodes in 2 rules. `color-contrast` (serious): the G2 qualifier, `#888` on `#f6f6f6` at 14 px = 3.28:1. `label-content-name-mismatch` (serious): the OneTrust policy link. Incomplete: `color-contrast`, `video-caption`.
- `lang="en"`; one h1; landmarks header 1, nav 2, main 1, footer 1; a "Skip to content" link is the first tab stop.
- Keyboard (my Tab walk): skip link, announcement link, logo, **Pricing**, Login, Book a demo, email input, submit, then the product links. The top-level items "Products", "Solutions", "Resources", "Company" are `<div>` elements with mouseover/click handlers, no role, no tabindex, so the mega menus cannot be reached by keyboard.
- Focus ring: the browser default `auto` outline on links and buttons (no custom ring). The hero email input has `outline: none` and its wrapper showed no computed style change on focus; I did not find a visible focus indicator there (not confirmed by screenshot).
- Video: the pause control is opacity 0 at rest on desktop (reveal on hover; keyboard-focus reveal NOT verified). Reduced motion is honoured by the AI video and by smooth anchor scrolling but not by the hero Lottie or the marquee.
- Hero text content is image-only (see Hero pattern); the section headings and body copy are real text.
- Cookie banner: a single "Ok" control (the footer also carries "Your Privacy Choices"). I did not click anything. In the harness frames the banner stays up until the first scroll (screenshots after scrolling show none); whether scrolling counts as consent is NOT verified.

## Structured data and meta

- Title: "Iru (formerly Kandji) | Securing devices, identity, and compliance." (67 chars). Description present, 127 chars. Canonical `https://www.iru.com/`. `robots: index, follow`. `theme-color #ffffff`.
- OG: `og:title` (with a trailing space), `og:description`, `og:image` (a generic favicon-folder `og-image.png`), `og:url`; no `og:type`. `twitter:card: summary` (not `summary_large_image`).
- JSON-LD: one `Organization` (name, url, logo, `alternateName` "formerly Kandji", `sameAs` two profiles). No `WebSite`, `SoftwareApplication` or `FAQPage`.
- Language switcher component for en, de, fr, es, ja, ko driven by `hreflang` link elements.
- `Content-Security-Policy: upgrade-insecure-requests` only.

## Premium and trust signals

Premium (measured):
1. One typeface, two weights, tight tracking: 500 at -0.03em for every heading size, `text-wrap: balance`, line-heights 1.08, 1.1, 1.0; numerals 80/72 at weight 400.
2. Colour quarantined to imagery: every UI surface is white, `#f6f6f6` or `#0c0c29` with ink text; 1 px ink-at-10 % hairlines; radii 8 and 12; shadows absent except the menu. All chroma lives in the Lottie, PNG plates and video.
3. A hand-authored hero: 32.2 s, 12 pre-comps, 413 keyframes, 29 custom bezier curves, transform and opacity only, built on a reserved 924x760 box so it adds no layout shift; it demonstrates four products without a line of copy.
4. Everything else is still and native-scrolled: 0 of ~920 elements changed under scroll, hover feedback is a 150-300 ms alpha or border shift. Restraint reads as confidence.
5. Footnoted statistics with named sources (a customer story and a 2025 analyst assessment) under a hairline grid.
6. Product proof as one repeated plate (16:9, radius 8) per product.
7. A micro-detail: the wordmark collapsing to the mark on scroll in 150 ms.

Generic (measured or seen):
1. Customer-logo marquee ("6,000+ companies"), logo-plus-quote cards, a G2 badge in the hero.
2. Third-party AI chat popover with a named person and photo, stacked over the cookie banner on mobile; 15 or more ad and analytics vendors, 213 requests.
3. A dark "built for the AI era" band using a glowing blurred-shape video with white text; gradient plates behind screenshots.
4. Email-gated hero CTA that repeats the header CTA.
5. HubSpot template conventions: eager hidden-menu assets, `preload="auto"` videos in closed menus, two unrelated rAF loops running at idle.

## Replicable by HELIX under the truth rules?

HELIX rules applied: light only, flat (no gradients, glow, glass), no client logos, no invented metrics, features or customers, product proof only from the real console (or a frame labelled "Illustrative interface. Sample data." until captures exist), at most two motion moments per page, transform/opacity only, reduced motion respected, readable with JS off, no animation library above the fold.

| Pattern on iru | HELIX-truthful equivalent |
|---|---|
| Two-column hero: copy left, product visual right; H1 in plain text | Yes. H1, subhead, trust line, CTA, entity line and `info@` in server HTML; the right column is a static product frame (real capture, or the labelled illustrative frame). |
| 32 s Lottie hero loop with text drawn as paths | None. A library plus 1.2 MB JSON plus a 1.3 MB SVG DOM above the fold breaks the weight and motion rules, and the content is invisible without JS. Use one static frame; at most one opacity reveal of that frame as a single motion moment. |
| Announcement bar | None (nothing confirmed to announce). |
| G2 badge ("850+ 5 star reviews") | None (no reviews exist). The trust line should be confirmed facts only (entity, founding year 2024, India) with claim IDs. |
| Logo marquee, quote cards, customer tiles | None (no clients; no logos or quotes without written permission). No equivalent; do not substitute invented logos. A text line naming the operator types HELIX is built for (couriers, 3PLs, freight brokers) is the honest analogue if it maps to a claim ID. |
| Email field plus submit in the hero, JS-injected | Not as built. HELIX should keep a plain link CTA (works with JS off) and put the form on its own page with a no-JS POST path. |
| Product rows (h3, paragraph, filled button, hairline sub-list with arrows, 16:9 framed plate at right) | Yes, for capabilities the founder has confirmed live (Q-05). Left: capability to operator-outcome sentence, one button, a hairline list. Right: a flat framed capture, radius 8, 1 px hairline. No gradient plate; use a flat neutral tint behind the frame. |
| Gradient plates behind screenshots, glow video band | None (banned). |
| Stats grid with footnoted sources | Only if the founder supplies real, sourced figures; the pattern (large numeral, label above, hairline, source line below) is replicable, and the footnote-with-source habit is worth copying. Until then, omit. |
| Single grotesk, weight 500 headings at -0.03em, `balance` | Yes, with Geist 500 (locked); tracking and `text-wrap: balance` are free. Keep body at 400, 16/24. |
| Hairline system (1 px at 10 % ink, radii 8/12, no shadows) | Yes, from tokens. |
| Hover = 150-300 ms colour or alpha change, no transforms | Yes. If the Spec's "transform/opacity only" is read strictly for hover, express the 80 % alpha as opacity. |
| Native scroll, no scroll-linked motion | Yes (default; the page proves a premium feel without any). |
| Mega menu (200 ms opacity plus 12 px rise) | Probably none: HELIX header is a 64 px sticky bar with a short link list. If a dropdown is ever needed, use a disclosure `<button>` (keyboard reachable) with a CSS opacity/translate of ~150-200 ms. |
| Wordmark-collapse on scroll, announcement bar, 122 px chrome | None. Not needed; the Spec header is 64 px. |
| Dark footer, dark CTA card | Not as built (light only). A light footer with the same four-column grouping and 50 %-tone group labels is fine. |
| Chat widget, cookie banner with only "Ok" | None. |

## Tech fingerprint (feeds TECH_FINGERPRINT.md)

| Question | Verdict | Evidence |
|---|---|---|
| Smooth-scroll library (Lenis, Locomotive, GSAP ScrollSmoother) | Not detected, and native scrolling is confirmed | No `window.Lenis`/`lenis`/`LocomotiveScroll`; no signature in the two site scripts; `wheelProbe` moved 500 px in one sample (61 ms). CSS `scroll-behavior: smooth` is only inside `prefers-reduced-motion: no-preference`. |
| GSAP / ScrollTrigger | Not detected | No `window.gsap` or `ScrollTrigger`; 0 matches in `template_iru.main.min.js` and `template_lottie.min.js`; 0 elements changed during scroll. |
| Motion / framer-motion | Not detected. Harness `framerMotion` hit is incidental | The only match is a dependency-version string (`"framer-motion":"static-1.83"`) in the build metadata of HubSpot's `/_hcms/forms/v2.js` bundle; `useScroll`, `useTransform`, `motion.dev` and `motion/react` do not occur there. I counted 0 `Element.animate()` calls at runtime. Not site animation code. |
| Lottie | Present | `window.lottie.version` = 5.12.2 (also `bodymovin`); `template_lottie.min.js` UMD header; `lottie.loadAnimation({renderer, loop, autoplay:false, path})` in `template_iru.main.min.js`; registry entry with `renderer: svg`, 966 frames at 30 fps; JSON authored with bodymovin 5.7.0; 12 `assets`. |
| Rive, Spline, three.js, OGL, model-viewer | Not detected | No globals; DOM `<canvas>` count 0. |
| WebGL canvas | None visible. Harness `canvasContexts` (2d x4, webgl) is incidental | `getContext` wrapped at document start: the 5 canvases are off-DOM and created by `template_lottie.min.js` (2d x2), `fingerprintjs@3.3.2` (2d) and `js.hs-analytics.net` (2d + webgl), i.e. measurement and fingerprinting code. |
| Native CSS scroll-driven animation (`animation-timeline`, `view-timeline`, `scroll-timeline`) | Not detected | 0 matches in the 188 KB main stylesheet and inline styles. |
| View Transitions, `@starting-style`, `interpolate-size` | Not detected | 0 matches each. |
| `@property` | Present but not decorative | 68 `@property --tw-*` rules: Tailwind v4 internals, not animated gradients. |
| `<video>` backgrounds | Yes, 1 visible and 2 hidden | AI-section MP4 (1920x1080, 8.8 MB, autoplay loop muted, lazy source, Alpine `x-intersect.once`); two `intro-iru.webm` in closed dropdown cards. The harness `inHero: true` for the webm videos is wrong (they are 0x0, in the menu). |
| Framework / platform | HubSpot CMS Hub, theme "Aurelia" | `<meta name="generator" content="HubSpot">`; `hs-cms-theme="Aurelia"` on `<html>`; `/_hcms/`, `/hs/hsstatic/`, `/hubfs/` paths; `x-hs-*` response headers; a "FreshJuice Showcase Theme" log string in the site bundle. |
| CSS framework | Tailwind CSS v4 (strong inference, no banner comment found) | 68 `--tw-*` `@property` rules, default v4 theme variables (`--spacing: .25rem`, oklch palette, `--text-*--line-height`), individual `translate`/`scale` properties. |
| JS UI layer | Alpine.js 3.15.12 | `window.Alpine.version`; 9 `[x-data]`, `x-show`, `x-transition`, `x-intersect`, `x-effect` attributes; `Alpine.data("globalHeader")` in the site bundle. |
| CDN / protocol | Cloudflare, HTTP/3, Brotli, Early Hints | `server: cloudflare`, `alt-svc: h3`, `content-encoding: br`, preload `Link` header for font and CSS. |
| JS on first load | 2,273,559 B (2,220 KB) over 213 requests; 104 KB is the site's own UI/animation code | `transferFirstLoad.byType.Script`; my per-file measures. |
| CSS on first load | 26.9 KB br main (188 KB decoded) plus ~150 K characters of inline style; harness shows 0 | Resource Timing `early-hints` entry. |
| Total requests | 213 first load; 454 after scrolling the full page | harness |

NOT DETECTED is not proof of absence for anything loaded conditionally; here it is backed by global checks, signature searches of the two first-party scripts and behavioural scans.

## With JS off, and with reduced motion

JS off (`desktop-1440-nojs.png`, `noJs` in probe.json, plus my inventory): 4,264 visible characters against 4,523 with JS. Present: announcement bar, header with the five nav labels, the filled header "Book a demo" link (to `/request-demo`), G2 line, H1, subhead, all section headings and copy, product-row buttons and links, 57 images (lazy images still load), the logo strip (42 `<img>` in the DOM), stats, quotes, closing CTA, footer (44 links). Missing: the hero email field and submit (an empty 400x130 slot remains), the entire hero visual (an empty 924x760 `role="img"` box that still carries its aria-label), the dropdown menus (hidden), and the AI video (the band falls back to a dark ground with white text, still legible). There is no `<noscript>` content. The five-question test is weaker than it looks: the hero's own CTA is gone, only the header CTA survives.

Reduced motion (`desktop-1440-reduced-motion-top.png`, my run): `scroll-behavior` becomes `auto`; the AI video does not autoplay and its control reads "Play video". Still moving: the hero Lottie (frame counter advanced 94 to 155 in 2 s, i.e. 30 fps) and the logo marquee (running, 1,000 ms per 1,000 ms). Hover transitions are untouched. The CSS contains only two `prefers-reduced-motion` blocks (smooth scroll, a skeleton-loader rule).

## Harness vs what I saw (corrections)

- `fp.els.video[0..1].inHero: true` is wrong: those are 0x0 `<video>` elements inside closed mega-menu cards. The hero is a Lottie SVG.
- `runtime.canvasContexts` / `canvas` signals are off-DOM canvases from lottie-web, FingerprintJS and HubSpot analytics, not a visual canvas or WebGL.
- `scriptSignatures` hits for framerMotion, webflowIx, swiper, barba and webgl come from third-party scripts (HubSpot forms bundle, OneTrust stub, Meta pixel, `fbevents.js`, `hs-analytics`). Only `lottie` is a real feature of the site.
- `dom.header.position: "static"`: the sticky/fixed element is the parent `#iru-header` (122 px including the announcement bar).
- `transferFirstLoad.byType.Font` and `Stylesheet` are 0 because the font and CSS came via Early Hints; real values are 113,940 B and 26,943 B.
- `consent: []`: the OneTrust banner was not dismissed and is visible in `top` and `screen2` PNGs (it covers a quarter of the mobile first viewport); it is gone in later frames.
- `reducedMotion.sample` shows only the marquee; the Lottie is JS-driven, invisible to `getAnimations()`, and keeps playing under reduced motion.
- `idleRafPerSecond: 120` is real: two separate 60/s loops.
- The `t1s` versus `top` differences are the Lottie advancing and the banner arriving, not an entrance animation.
- `dom.bgs` shows a `rgba(0,0,0,0.7)` area of ~1.3 M px; most likely OneTrust's hidden dark filter, not a design layer (inferred, not confirmed).

## What not to borrow

Customer logo marquee, quote cards and G2 badge; the Lottie hero (library, 1.2 MB JSON, 1.3 MB SVG DOM, text as paths, no reduced-motion handling); gradient plates and the glow video band; dark sections; eager hidden-menu assets and `preload="auto"` videos; a mega menu that cannot be reached by keyboard; hero CTA that exists only after JavaScript; third-party chat widget and ad-tech stack; `#888` on `#f6f6f6` text; a persona-named chat opener; announcement bar; the 122 px fixed chrome.

## NOT OBSERVED

- Hover, focus and active states of the quote cards, product cards and footer links (only the items listed under Motion were exercised); keyboard-focus reveal of the video pause control; hover reveal of that control (it sat below the fold in my test).
- Mega-menu video playback while the menu is open; the other three mega menus (only Products was opened); the mobile drawer contents beyond `mobile-390-nav-open.png`.
- Easing and entrance of the chat widget and the cookie banner (third party); the chat widget's own behaviour (not clicked).
- Bytes actually streamed for the 8.8 MB MP4 (Resource Timing did not report range requests).
- Lighthouse scores (not run); real-device behaviour; other pages; logged-in product.
- An unexplained one-time document navigation (reload) occurred within about 4 s of load in two of my scripted sessions (Playwright reported the execution context destroyed); not seen in the harness run or in the other sessions; cause not identified.

## Screenshots and scripts

Screenshots in this folder (harness): `desktop-1440-{t1s,top,screen2,mid,footer,nav-scrolled,reduced-motion-top,nojs}.png`, `mobile-390-{t1s,top,screen2,mid,footer,nav-scrolled,nav-open,reduced-motion-top}.png`. Note: `mobile-390-reduced-motion-top.png` and `mobile-390-t1s.png` are byte-identical (152,504 bytes), so they show the same frame.

Evidence scripts (re-runnable, observation only): `scripts/01-static.mjs`, `02-motion.mjs`, `03-interaction.mjs`, `04-frames-menu.mjs`, `05-assets-mobile.mjs`, `06-a11y-nojs.mjs`. Scratch outputs and extra frames were kept outside this folder.
