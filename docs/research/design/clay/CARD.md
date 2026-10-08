# Observation card: clay

| Field | Value |
|---|---|
| URL | https://www.clay.com/ (home page only) |
| Role | new reference, Brief 01 v2.1 |
| Date | 2026-10-08 |
| Viewports | 1440x900 (primary), 390x844 mobile emulation (Android UA, DPR 2). No tablet. |
| Tool | playwright-core + Google Chrome 154 (headless) via `probe.mjs`, plus seven follow-up scripts in `scripts/` (raw outputs in `scripts/out/`). No Lighthouse (run separately). |
| Personality in three words | tactile, playful, modular |
| HTTP status | 200. Document fetched without JS: 505,763 bytes of HTML (about 77 KB gzip), h1 present in the server HTML. |
| Consent banner | None visible at 1440 or 390 (probe `consent: []`). A consent script (Transcend `airgap.js`) is loaded. Nothing was accepted or declined. |
| Evidence | Harness PNGs in this folder; extra frames in `frames/` (load frames, mega menu, mobile menu, logo wall, JS-off scroll shots, tab section). |

Reading note: the hero text and CTAs may be an A/B variant. The page carries `data-wf-intellimize-customer-id` and loads an Intellimize snippet and an Eppo visual-editor snippet, so copy seen here may not be what every visitor sees.

## Hero pattern

- **Composition (1440x900).** A fixed two-row header (44px plum event banner, then a 59px white nav bar, both inset 36px from the viewport edges, nav bottom corners rounded 24px). Under it a full-bleed 1440x1072 `<video>` (object-fit cover, box starts at y=0 behind the header) shows a claymation contraption on green hills; the artwork occupies about y=100 to 560 and dissolves into a flat deep green (rgb(3,93,68)) where the text sits. H1 is left (x=128, max-width 720px, white, 88px). A 320px right column (x=970 to 1312) holds the 24px subhead, two equal-size CTAs side by side, and a small "or install directly with" line followed by three round icon buttons. An oat-coloured card (80px side inset, 48px radius) overlaps the hero by 228px and shows only its top 56px at the fold.
- **Plain text vs imagery only.** In text: the H1 ("Build systems to grow revenue"), the subhead (infrastructure for data, agentic workflows, GTM plays), two CTAs, nav, event banner, "install directly with". Only in imagery: the product idea (a funnel, seesaw, magnifier, mailbox and stepped bars as a data-in, data-out metaphor). No product UI, no customer, no number is in the first viewport. The H1 alone does not say what Clay is or who it is for; the subhead carries that, and "GTM" is never expanded.
- **CTA count and hierarchy.** Header: Start free trial (black fill, 13.9px/500, 39px tall) and Get a demo (oat grey fill, secondary), plus a text Log in link and a Cmd+K search button. Hero: Start free trial (white fill) and Get a demo (lime rgb(203,216,16)), both 47px tall, 18px/500, 12px radius, with an arrow icon. Event banner adds a third action, "GET TICKETS". On mobile the header keeps only Get a demo and a hamburger; the opened menu pins Get a demo (oat) and Sign up (black) to the bottom.
- **Header vs hero CTA relationship.** Same two actions repeated, order and colour inverted: header is demo-then-trial with trial as primary (black); hero is trial-then-demo with demo as the visually loudest (lime). The hero therefore has two near-equal CTAs rather than one primary.
- **Trust signals in the first two screens.** Screen 1 (1440x900): none readable. The trust line starts at y=892, so it is cut by the fold; the three icon buttons after "install directly with" are an integration affordance, not proof. Screen 2 (scrollY 900): a customer bento wall under "Trusted by more than 500,000 leading GTM teams". It shows 20+ named company logos (from asset file names: Stripe, OpenAI, Snapchat, Figma, Cursor, Intercom, UPS, HubSpot, Vanta, Canva, Perplexity, Anthropic, Notion, Google, Rippling, Verkada, Workday, Uber, ElevenLabs, eBay, Ramp, Okta), three attributed quotes and three stat cards (80%+ enrichment coverage, +140% outbound pipeline, 2x demos from cold email).

## Type system

- Fonts by share of visible text: Roobertvf (9,947 characters, 100% of measured text). One family. The "Sculpt" banner wordmark is an SVG image (636x135, rendered 101x28), not a font.
- Loaded font files: Roobert variable (`RoobertVF.woff2`, 229,619 B, wght 300 to 900); Space Mono 400 and 700 (about 9.5 KB each, Google Fonts; not used in anything I measured, NOT OBSERVED where it is used); Phosphor icon font (`Phosphor.woff2`, 147,872 B, from unpkg).
- OpenType: `font-feature-settings: "ss03","ss10","ss11","ss12"` is set globally, so the stylistic alternates of Roobert are on everywhere. This is a large part of the letterform character.
- Computed scale, desktop:

| Role | Size / line-height | Weight | Tracking | Notes |
|---|---|---|---|---|
| H1 | 88px / 88px (1.0) | 575 (variable axis) | -3.52px (-0.04em) | colour rgb(254,253,251), `text-wrap: wrap`, max-width 720px, breaks "Build systems to / grow revenue" |
| H2 | 72px / 72px (1.0) | 530 | -2.16px (-0.03em) | `text-wrap: balance`, centred |
| Section titles (final CTA H2 44px; feature titles with two-tone spans 48px) | 44px / 48.4px (1.1) | 500 to 530 | -0.88px (-0.02em) | feature-title tracking not separately measured |
| Hero subhead | 24px / 31.2px (1.3) | 400 | normal | `u-text-balance` |
| Body | 16px / 24px | 400 | normal | |
| Trust line | 20px / 26px | 400, bold spans 600 | normal | balance |
| Card title | 20px / 26px | 500 | normal | |
| Stat number | 23.2px / 30.2px | 500 | normal | |
| Button label | 13.92px (header) or 18px (hero) / 500 | 500 | -0.01em | |
| Tab pill | 16px / 24px | 500 | normal | colour rgb(27,26,24) |
| Eyebrow | 12px / 18px | 600 | +3px (+0.25em) uppercase | teal rgb(0,139,173) |
| Caption | 14px / 18.2px | 400 | normal | `text-wrap: balance` |
| Event banner | 20px / 28px | 400 | normal | lavender rgb(200,187,251) |

- Mobile (390): H1 41.6px / 41.6px, tracking -1.664px (-0.04em); H2 40px / 40px, -1.2px (-0.03em).
- Weight is used in unusual fine steps on the variable axis (575, 530, 500) rather than 400/500/600/700 stops.
- Line breaks: display headings use fixed max-widths or `text-wrap: balance`. 16 `text-wrap` declarations in CSS.
- Number treatment: stat figures are plain 23px/500 in the proportional face (`font-variant-numeric: normal`, not tabular, not mono), with a tiny two-line uppercase label beside them. Data is not set in a mono face.
- Display or accent face: none apart from the Sculpt SVG wordmark. Emphasis is by colour: headlines are two-tone, first clause in the section's deep ink, second clause in the section hue (teal rgb(0,139,173), magenta rgb(204,8,158), burnt orange seen in screenshot).

## Colour system

- Backgrounds: page white rgb(255,255,255); hero ground deep green rgb(3,93,68) (#035D44); oat card rgb(244,243,240) (#F4F3F0); footer section rgb(255,253,249). Feature cards each use a pale tint with its own deep ink: rgb(240,248,255) with ink rgb(0,20,51); rgb(255,243,237) with rgb(56,16,5); rgb(252,254,226) with rgb(16,43,3); rgb(255,240,250) with rgb(70,2,47). The use-case tab block cycles seven saturated grounds: cyan (59,211,253), lime (238,247,115), violet (161,123,249), orange (255,119,20), light blue (190,223,254), red (251,68,80), pink (255,112,210).
- Text tones: pure black rgb(0,0,0) on white sections; warm near-black rgb(27,26,24) in pills and footer; off-white rgb(254,253,251) over the hero; oat-800 rgb(85,83,78) footer links; hover grey rgb(123,121,116) on nav.
- Tokens (from custom properties in the shared stylesheet): an `oat` scale (50 to 800, e.g. #FEFDFB, #F9F8F6, #F4F3F0, #F3F2ED, #EEE9DF, #DAD4C8, #D1CDC7, #9F9B93, #85817A, #55534E) plus food-named hues (blueberry, dragonfruit, matcha, slushie, lime #CBD810, pomegranate).
- Accent usage: not one accent. Each themed section owns a hue and uses it for its CTA fill, tag chip, two-tone headline clause and active-tab colour (`home-feature_theme cc-top / cc-tangerine / cc-lime / cc-dragonfruit`). Lime appears on the hero demo CTA and the active tab. A blueberry (57,90,250) CTA also exists. Accent is allowed on: CTA fill, headline clause, eyebrow, chips, tab. Large neutral areas stay oat or white.
- Borders and shadows: almost none on cards (0px). 1px hairlines separate the header from the page; vertical hairline "rails" are visible at about x=128 and x=1312 on white sections (seen in screenshots, not measured). The floating product panels carry soft drop shadows.
- Gradients and atmosphere (named and measured): (1) `home-hero_shade`, linear-gradient transparent to #fff, 1440x180 at the hero bottom; (2) `home-logo_shade` x2, 256px-wide horizontal fades (oat to transparent) on the logo wall edges; (3) `home-flow_shade` x2, 296x44 white fades on the tab pill row; (4) nav promo card overlay, linear-gradient transparent 14% to rgba(0,0,0,0.45) 77%. The sky-to-green tonal change in the hero is baked into the video pixels, not CSS. Probe counted 49 gradient-bearing elements in total.
- Noise and grain: grain is baked into the claymation video and stills. On coloured cards, two CSS texture layers sit over the flat colour: `texture-noise` (`Noise.avif`, 3,396 B, 60px tile, `mix-blend-mode: overlay`) and `texture-fingers` (`Clay-overlay.avif`, 13,029 B, 100% x 50%, overlay plus a hard-light under-layer), each 1284x417. 14 `mix-blend-mode` rules and 19 `backdrop-filter` rules in CSS (blur 4 to 20px with saturate; used on menus and overlays; the nav bar itself is solid white with no backdrop filter).
- `color-scheme: normal`; no dark theme observed. Dark-mode media query use: NOT OBSERVED.

## Layout and rhythm

- Container: content 1184px (x=128 to 1312) inside 1280px section cards (x=80 to 1360, so 80px gutters at 1440), 48px card padding. Header is 1368px wide (36px inset).
- Radii: 48px section cards, 32px coloured tab cards and video slides, 24px media and nav bottom corners, 12px buttons and tab pills.
- Grid: feature cards are two columns, copy 448 to 480px at the left, media 592px at the right (x=744 to 1336). Hero is asymmetric, 720px headline and 320px subhead column.
- Vertical rhythm (card heights at 1440): hero 1072; trust card 444 (48px padding, -228px top margin); tab block 596; "What do you want to build" 423 (64px padding); feature stack 2,892 = four 771px cards on a 723px pitch (48px overlap); reps card 877; testimonial slide 533; footer card 910 over a 1294px video. Card-to-card gap is about 48px.
- Density: moderate copy (8,736 visible characters), high visual density; page height 10,255px at 1440, 11,349px at 390. No horizontal scroll at either width.
- Mobile: single column, same rounded cards (20px inset), copy before media, header 57px with banner hidden, hero video box 390x512.

## Asset inventory

Scope: everything in the first two screens (y 0 to 1,800 at 1440) plus one deeper section (the use-case tab block and the feature cards below it). Bytes are CDP `encodedDataLength` sums per URL from my runs (`scripts/out/clay-s1.json`, `clay-s2.json`); for MP4/WebM the total file size comes from `Content-Range`. "Origin" says where it is served from. Rendered and natural sizes are in CSS px.

| Asset | Origin | Role | Format / type | Rendered (natural) | Bytes | Loading |
|---|---|---|---|---|---|---|
| `Hero 06-02 Lossy 0001-0240.mp4` | `assets.clayrun.dev` (Clay-owned separate domain) | hero visual, the LCP on mobile | MP4 `<video>`, 17.14s | 1440x1072 box, object-fit cover (3000x1500) | 12,952,416 | `preload=metadata`, `autoplay loop muted playsinline`, no poster attribute; the same file is sent to 390px mobile (390x512 box) |
| `..._hero-still_v3-p-1600.avif` | Webflow CDN | still behind the video; first paint of the art | AVIF `<img>` | 1440x1072 (1440x682), has `srcset` | 105,656 | `eager`, `fetchpriority=high` |
| Clay logo (`Clay primary logo.avif`) | Webflow CDN | header logo | AVIF `<img>` | 72x23 (509x163) | 5,032 | `eager` |
| "Sculpt" banner wordmark (`..._Default.svg`) | Webflow CDN | event banner lettering | SVG `<img>` | 101x28 (636x135) | 2,826 | `lazy` even though it is at y=8 |
| Three round "install with" icons (`Frame 21472617xx.svg`) | Webflow CDN | integration buttons in hero | SVG `<img>` | 20 to 24px | 1,517 / 1,801 / 952 | `lazy` |
| Mega-menu icons, 20+ items across the menus (`3d-icon-*.avif`, `Audiences.webp`, others) | Webflow CDN | 3D clay icons beside menu items | AVIF / WebP / PNG `<img>` | 20x20 (88 to 800px) | 1,962 to 135,629; the PNGs `functions.png` 135,629 and `ads-icon 1.png` 132,429 are 400x400 and 361x380 shown at 20x20 | `lazy`, fetched at load |
| Mega-menu promo card images (3) | Webflow CDN | rotating promo image | AVIF `<img>` | 307x224 (345 to 500px) | 5,666 to 26,834 | `lazy` |
| Customer logo SVGs, about 23 distinct (stripe, openai, figma, hubspot, vanta, ...) | Webflow CDN | logo wall | SVG `<img>` | 27 to 140px wide, 16 to 36px tall | 1,219 to 5,173 each | `eager`; the strip is duplicated three times in the DOM (track offsets about 2,231px apart), so about 70 `<img>` for about 23 logos |
| Three person-named portrait PNGs (`Adam-Wall.png`, `Keith-Jones.png`, `Kyle-Ketchum.png`) | Webflow CDN | probably avatars for the logo-hover cursor card (inferred) | PNG | not displayed in the first two screens | 312,630 / 270,468 / 269,614 | fetched at first load |
| `Noise.avif` and `Clay-overlay.avif` | Webflow CDN | texture overlays on coloured cards | AVIF, CSS `background-image` | tiles at 60px and 100% x 50% | 3,396 / 13,029 | CSS, `mix-blend-mode` overlay and hard-light |
| Product screenshots `case-1` to `case-23` (18 in the tab block) | Webflow CDN | product proof in the use-case tabs | AVIF (some PNG) `<img>` with alt text | 1280x572 (1440x643, or 3600x1608 on 7 of them) | 20,407 to 106,580 each (for example `case-5.avif` 106,580, `case-11.avif` 100,989, `case-2` PNG 66,234) | `lazy` (Chrome's lazy-load margin still fetches them before they are visible; `case-5.avif` is in the first-load top-bytes list); `srcset` on the 1440-wide ones, none on the 3600-wide ones |
| Four feature loops `Data`, `Agents`, `Orch`, `Execution` (1000px WebM) | `assets.clayrun.dev` | claymation art beside each themed feature card | WebM `<video>`, 8s | 592x675 box (1000x1000) | 1,576,019 / 1,679,008 / 1,791,305 / 1,991,440 | `preload=none`, `autoplay loop muted playsinline`; fetched on approach, not in first-load bytes |
| `Reps 06-16 1500px.webm` plus `Reps-Still 1.avif` | `assets.clayrun.dev` / Webflow CDN | loop and poster for the reps card | WebM video, AVIF still | 1184x533 | still 60,594; WebM not yet loaded at scan time | `preload=none`; the still was fetched at first load |
| `Clay-Hero (3) (1).mp4` | `assets.clayrun.dev` | clip in the customer slider | MP4 `<video>`, 6s | 947x533 (1920x1080) | 790,401 | `preload=metadata`, fetched at first load although it is far below the fold |
| Customer case video (1080p MP4, 210s) | `assets.clayrun.dev` | testimonial player | MP4 `<video>` with custom controls | 947x533 (1920x1080) | not fetched at scan time | `preload=metadata`, no autoplay |
| `Footer 05-29 Lossy 0001-0060.mp4` | `assets.clayrun.dev` | footer backdrop of candy-coloured balls | MP4 `<video>` | 1440x1294 box | per-file bytes not captured; total Media rises from 12.86 MB to 22.2 MB after scrolling to the footer, across the four feature WebMs, the footer MP4 and others | `preload=none` |
| `RoobertVF.woff2` | Webflow CDN | all text | WOFF2 variable font | n/a | 229,619 | fetched at load |
| `Phosphor.woff2` (+ three Phosphor CSS sheets, about 80 KB raw each) | `unpkg.com` | UI icon font | WOFF2 + CSS | n/a | 147,872 | fetched at load |
| Space Mono 400 / 700 | Google Fonts | no use measured | WOFF2 | n/a | 9,491 / 9,579 | fetched at load |
| Canvas | none | none | n/a | 0 `<canvas>` in the DOM | 0 | n/a |

Image summary at first load: 84 image requests, 2,761,808 B. The first-load images that are visible in the first two screens are the hero still, the logo, the banner wordmark, the three icons and the logo-wall SVGs (under 0.2 MB in total); most of the other image bytes are things the visitor does not see yet (menu icons, portraits, tab screenshots).

## Components

- Header: `nav2_wrap cl-nav-fixed` (position fixed) containing `nav-wrap` (sticky) then `nav__layout` (white, rect 36,44,1368,59). I measured the nav rect and style at scrollY 0, 400, 1500, 3000, 2400 (up) and 0 (up): identical every time. The header does not hide, shrink or change colour on scroll. Items: Product, Solutions, Resources, Company, Pricing; right side Cmd+K search, Log in, Get a demo, Start free trial.
- Mega menu (Product, on hover): 328px-high white panel, bottom corners 24px, four labelled columns (Data infrastructure, Agents, Orchestration, Execution) of 20px 3D clay icons with labels, plus one promo card (image with a 45% dark gradient and white text). See `frames/desktop-1440-nav-product-hover.png`. Note: the harness file `desktop-1440-nav-open.png` is NOT this menu; it is the Cmd+K Ask-AI search dialog over a blurred page (Inkeep widget, 454 KB script).
- Mobile menu (hamburger, `frames/mobile-390-menu-open.jpg`): full-screen white sheet, rows on a 46px pitch with chevrons (Product, Use Cases, Solutions, Resources, Company) and Pricing without one, two full-width buttons pinned to the bottom (Get a demo, Sign up). Body scroll was not locked (`overflow: visible`).
- Buttons: `btn` 12px radius; header size 39px tall, hero size 47px tall; arrow icon built from two stacked `.btn-icon` copies (see Motion).
- Tab pills: `tab-btn`, 44px tall, 12px radius, 16px/500, inactive oat rgb(244,243,240), active lime rgb(238,247,115) or lavender rgb(200,187,251) or peach rgb(252,201,171) depending on the tab. Seven tabs, cloned several times for the looping strip. Edge fades on the row.
- Tag chips ("ORCHESTRATION", "ACTIVATION"): uppercase letter-spaced label in a filled pill with two overlapping translucent circles behind it.
- Text link (`line-link`): underline fill plus arrow. Outline-style secondary button (white fill on a tinted card).
- Cards: bento logo/quote/stat cards (cream fill, radius not measured, varied widths), feature cards (tinted), testimonial video slides (32px radius, scaled 0.97/1.03 in code), product screenshot panels.
- Counts (probe): gradients 49, backdrop 8, svg 100, img 336, video 9, buttons 75, forms 1, links 267, canvas 0 in DOM.
- Footer: oat card (80px inset, 48px radius) over a full-bleed 1440x1294 looping video of candy-coloured balls. Link columns (Product, solutions, resources, company, a "Customers" list of named companies, Legal), a hairline, then logo, "(c)2026 Clay Labs Inc.", a credit line for the art studio, and three social icon buttons. Footer link hover: colour 0.1s ease-out.
- Section order: banner, header, video hero, trust card (bento), "GTM engineers build on Clay" with autoplaying use-case tabs and product screenshots, "What do you want to build?", four themed feature cards (data, agents, orchestration, activation) each with a short case-study sentence naming a customer, GTM-infrastructure/reps card with a video, testimonial video carousel, a "Learn more" content row, final CTA, footer.

## Product UI treatment

- First viewport: no product UI at all. The hero is brand illustration only.
- Screen 2 to 3 ("GTM engineers build on Clay"): seven use-case tabs over stacked raster screenshots, 1280x572 CSS px, natural 1440x643 or 3600x1608, AVIF or PNG, offset in 36px steps so panels overlap like floating windows on a saturated textured ground. Content is real-looking app UI (tables, filter dialogs, an email preview, a Slack message, a lead-scoring formula) with sample names ("Justin", "Acme Corp"). It is sample data but is not labelled as illustrative. Each image has descriptive alt text (60 to 100 characters).
- Deeper: four 592x675 WebM loops (Data, Agents, Orch, Execution) and one 1184x533 loop that are claymation art rather than UI; two MP4 customer/hero videos; a draggable testimonial video carousel. I did not extract frames from these.
- Product proof is therefore raster screenshots at about 100 KB each, below the fold, never in the hero.

## Motion inventory

Method: probe `animationsAtLoad`, `animationsAfterScroll` (empty everywhere, see contradiction below), my rAF-level polls, computed-style diffs, and strings read in the site's own scripts (`app.js`, `bundle-aprl30.js`). "Source" says how I know the number.

| # | Motion | Trigger | Duration / easing | Property | Source and notes |
|---|---|---|---|---|---|
| 1 | Load gate: nav, h1, subhead, CTAs, still and video all go from hidden to visible in one step | page load | no visible fade: opacity 0 to 1 inside one 60ms sample, about 0.9 to 1.1s after navigation commit (headless, warm network) | opacity | Measured. Blank white at 356ms and 733ms (`frames/load-f1`, `load-f2`, identical 8,452 B files). No stagger, no transform. Same under reduced motion. Mechanism NOT CONFIRMED (JS-applied: with JS off everything is visible at once). |
| 2 | Hero video loop | autoplay | 17.14s loop, 3000x1500 MP4 | video frames | Measured (`video.paused=false`, currentTime advancing). Continuous, not scroll-linked. Content-bearing (balls fall through funnel and seesaw). |
| 3 | Nav link text roll | hover | translateY 0 to -21px (one line), colour black to rgb(123,121,116); about 0.7 to 0.8s expo.out | transform, colour | Diff measured on hover: the full -21px roll was complete by 0.9s; in the reduced-motion run the roll was at -9.09px after 60ms (fast start, consistent with expo.out). Durations read from `bundle-aprl30.js`. |
| 4 | Nav hover pill | hover between links | slide via GSAP Flip 0.5s expo.out; first appearance scale 0.5 to 1 plus opacity 0 to 1 | transform, opacity | `bundle-aprl30.js` strings; pill rect and radius (10px, white) measured. |
| 5 | Mega menu open | hover on Product | NOT OBSERVED (panel fully drawn by 300ms) | probably height/opacity | JS in the same bundle. |
| 6 | CTA arrow swap | hover | 0.4s cubic-bezier(0.165,0.84,0.44,1) on a two-icon stack, translateY -18px to 0; `background-color 0.3s cubic-bezier(0.075,0.82,0.165,1)` | transform, background-color | Measured on the real `<a>`. Hero CTAs keep their fill; header CTAs change fill (black to rgb(40,44,53); oat to rgb(218,212,200)). |
| 7 | Text link underline fill and arrow | hover | fill 0.6s in, 0.45s out; arrow 0.4s; custom curve "osmo" (cubic-bezier-style M0,0 C0.625,0.05 0,1 1,1) | transform (xPercent) | Diff measured (fill -100.7px to 0, arrow +17.6px); timing constants read in `app.js`. Handler exits early under reduced motion. |
| 8 | Footer link | hover | 0.1s ease-out | colour | Measured. |
| 9 | Logo-wall drift | ambient | constant leftward velocity of about -25 px/s (x -454.1 to -504.5 over 2s), linear, three duplicated 2231px tracks, edge fades 256px | translateX | Measured, JS-driven (no CSS keyframes match). Not scroll-linked (the same rate with the page still). Does not pause on hover (-13.3px in 0.6s). Cards show `cursor: grab` so the strip is draggable. Frozen under reduced motion. |
| 10 | Use-case tab autoplay | timer | active tab advances roughly every 5 to 6s (switches seen between 4.5 and 6.0s apart; lime, then lavender, then peach observed). Outgoing screenshots: opacity 1 to 0 and translateY 0 to 24px in about 0.2s. Incoming: opacity over about 0.35s, translateY 24 to 0 over about 0.8s, staggered about 100 to 180ms per layer. | opacity, transform | rAF-level poll (`clay-s5.json`, `clay-s4.json`). Similar 0.2s and 0.35s constants exist in `app.js` but I could not tie them to this module. Manual click on a tab NOT OBSERVED (my scripted click hit the already-active tab; an earlier real click timed out). Reduced-motion behaviour NOT OBSERVED. |
| 11 | Sticky card deck | scroll | native `position: sticky; top: 0` on `home-feature_theme`, four 771px cards on a 723px pitch | layout position only | Measured computed style. No scale, opacity or transform change on buried cards (transform sampling at 13 scroll positions found none). This is the only scroll-linked visual and it is compositor-native. |
| 12 | Callout items | scroll in/out of view | opacity 1 to about 0 and scale 1 to 0.98 when off-screen; easing NOT OBSERVED | opacity, scale | Sampled at 13 scroll positions (`clay-s2.json`). A state toggle, not a scrub. |
| 13 | Customer video carousel | drag / click | slide scale 0.97 and 1.03 constants in code; timing NOT OBSERVED | transform | `app.js` strings only. |
| 14 | Accordion module | click | 0.5s osmo, plus icon rotate 135 degrees | height, rotate | `app.js` strings only. Not seen on the home page and not exercised. |
| 15 | Logo hover cursor card | hover on certain logos | shows name, title, avatar following the cursor; timing NOT OBSERVED | position, opacity | `app.js` strings only (`data-logo="item"`, `data-logo-hover`, `data-logo="avatar"`). Not exercised. Three person-named portrait PNGs (270 to 312 KB each) are fetched on first load and are probably its avatars (inferred). |
| 16 | Focus ring | keyboard | none: instant | outline | Measured. Dashed 2px (blue rgb(3,143,247) on nav links; black with 2px offset on CTAs). |

- **Scrolling.** Native. A single 120px wheel tick moved `scrollY` by 120 in one frame (log: [64ms,0], [336ms,120], [857ms,240], [1333ms,600] for ticks of 120, 120 and 360). `scroll-behavior: auto`, no snap, no smoothing layer, no scroll hijack. Probe `wheelProbe` agrees (finalScrollY 500, settle 75ms).
- **Scroll-linked motion.** None found beyond the sticky deck and the logo wall (which is time-driven). `window.ScrollTrigger.getAll()` returned 0 at the top and after scrolling to 4,200px, and the site's own code contains no `scrollTrigger:` options (see Tech fingerprint).
- **Ambient motion in the first two screens.** Hero video (continuous) and the logo-wall drift (continuous). Tab autoplay begins at screen 3.
- **Idle rAF.** 248 calls per second at idle (probe), attributed in my run to three scripts (`app.js` 372 per 3s, `ScrollTrigger.min.js` 192 per 3s, a Webflow chunk 180 per 3s). Roughly four loops at 60Hz.
- **What is STILL.** Header (no scroll change), all headings and body copy after the load gate, the hero text, section cards, the footer card, the feature cards (only their stacking position changes), product screenshots (no parallax, no tilt), the CTAs when not hovered. No parallax, no scroll-scrubbed type, no cursor-follow on the hero.
- **Motion count against the HELIX budget (two moments).** Clay runs about eight kinds at once (video, marquee, tab autoplay with layered swap, nav roll plus pill, arrow swap, underline fill, sticky deck, hover cursor card).

## Performance

- Lighthouse: not run (the lead runs it separately).
- Harness measurements (desktop, one load, cold cache, no throttling): load event 3,296ms; LCP 1,644ms, element H1 (area 116,012 px); CLS 0; long tasks 2. Mobile emulation: LCP 912ms, element is the hero VIDEO; CLS 0; load 3,370ms.
- Transfer on first desktop load (before any scroll): 19,524,012 B in 184 requests. By type: Media 12.86 MB, Script 3.23 MB, Image 2.76 MB (84 images), Font 0.40 MB, Stylesheet 0.18 MB, Document 0.08 MB. After scrolling to the footer: 31.0 MB in 226 requests (Media 22.2 MB). Mobile first load: 18.67 MB in 170 requests (Media 12.48 MB).
- **Which assets dominate.** One file: `Hero 06-02 Lossy 0001-0240.mp4` on `assets.clayrun.dev`, 12,952,416 B (from the `Content-Range` total), 3000x1500, 17.14s, about 6 Mbps. That is about 66% of all first-load bytes on desktop. The same file is also sent to the 390px mobile emulation (box 390x512). Preload is `metadata` but autoplay pulls the whole file. A second MP4 (`Clay-Hero (3) (1).mp4`, 790,401 B) is also fetched at first load (`preload=metadata`). The other seven videos use `preload=none`.
- Other large items: three person-named portrait PNGs of 312,630 / 270,468 / 269,614 B (probably the logo-hover avatars), `functions.png` 135,629 B and `ads-icon 1.png` 132,429 B (both displayed at 20x20 in the mega menu), the hero still AVIF 105,656 B (eager, `fetchpriority=high`, sits behind the video).
- JS: 3,227,003 B transfer (about 3.08 MiB). Roughly 0.94 MB is Clay or Webflow hosted (`app.js` 129,802 B; three Webflow chunks 143,801 + 130,442 + 43,641 B; jQuery 31,988 B; GSAP files about 30 KB each). About 2.28 MB is third party: jsDelivr (Inkeep 454,563 B, Eppo 45,947 B, GSAP), Google Tag Manager / gtag 532 KB, reCAPTCHA 356 KB, Sequel 236,767 B, Meta 217 KB, Transcend 144 KB, Google Sign-In 102 KB, Intellimize 88,571 B.
- CSS: 182,056 B transfer (1,148,850 B raw linked in 9 files plus 36,807 B inline). The main shared sheet is 861,918 B raw; three Phosphor icon sheets (about 80 KB raw each) load from unpkg.
- Fonts: 396,554 B over 4 files.
- Hosting evidence: Cloudflare in front of CloudFront (`server`, `via` headers), HTML gzip.
- Hosts that matter for HELIX's domain rules: scripts from `clay-webflow-dev.vercel.app` (a Vercel dev deployment, `app.js` and `app.css`), media from `assets.clayrun.dev`, assets from `cdn.prod.website-files.com`, a first-party analytics CDN at `evs.cdp.clay.com`. Subdomains and a separate asset domain, both ruled out for HELIX.

## Accessibility spot checks

axe was not run in this round; these are manual and probe-based checks.
- `lang="en"`; one H1; landmarks: nav 1, main 1, footer 1, header element 0 (the bar is a `nav`); logo image alt "Clay logo, go to homepage"; product screenshots have descriptive alt; 20px mega-menu icons carry the item name as alt.
- Focus visibility: dashed 2px outlines are visible (blue on nav, black on CTAs). First twelve tab stops: event banner link, logo, a hidden 0x0 "Back" control that is focusable on desktop, five nav links, Cmd+K, Log in, Get a demo, Start free trial. No skip link in those twelve.
- Autoplaying hero video (17s loop, muted) has no visible pause control near the hero and keeps playing under `prefers-reduced-motion`.
- Contrast, hand-computed from measured colours: white H1 on the green ground about 7.8:1; black on the lime hero CTA about 13:1; the 12px teal eyebrow rgb(0,139,173) on oat about 3.5:1 (below 4.5:1 for small text); the 48px magenta clause on its pink tint about 4.6:1.
- Target sizes: hero CTAs 47px tall, header CTAs 39px tall, mobile menu rows about 46px.
- Mobile menu does not lock body scroll (measured).

## Structured data and meta

- Title: "Clay | Build systems to grow revenue" (36 characters). Description: "Infrastructure to get any data, run agentic workflows, and launch GTM plays." (77 characters).
- Canonical `https://www.clay.com/`; OG image present (a PNG file named "og-image 1000"); JSON-LD types `SoftwareApplication` and `WebSite`; no `generator` meta; no `theme-color`.
- Built on Webflow (see Tech fingerprint). A/B testing and personalisation scripts present (Intellimize, Eppo).

## Premium and trust signals

What makes it feel premium (evidence, not impression):
1. **One commissioned art world, used everywhere.** A 3000x1500 claymation hero loop with baked grain, matching 20px 3D clay icons in the mega menu, claymation stills and loops in every feature card, a candy-ball video behind the footer. Nine `<video>` elements and 336 `<img>`. The consistency, not any one image, is the premium device.
2. **Tight display typography.** One variable face with stylistic sets on, 88/88 line-height (1.0) at -0.04em, fine weight stops (575, 530, 500), two-tone headlines where only the last clause changes colour.
3. **A surface system of rounded cards with a hue per section.** 48px radius on a 1280px grid with 80px gutters; each themed card pairs a pale tint with a deep ink (for example rgb(255,240,250) with rgb(70,2,47)) and a matching CTA. Tactility is added with 3.4 KB and 13 KB texture tiles blended over flat colour, not with gradients or shadows.
4. **Consistent hover craft.** Arrow swaps, underline fills and nav text rolls all use named expo/osmo curves in the 0.3 to 0.8s range and transform-only properties. Nothing bounces.
5. **Product proof is concrete when it appears.** 1440x643 screenshots with real-looking rows and an email draft, each with alt text.

What is generic:
- A logo-wall-plus-quote-plus-stat bento (22+ named logos, a "500,000" claim) is the standard category proof device.
- The H1 "Build systems to grow revenue" would fit most B2B tools; the specific statement is in the subhead.
- Furniture of the AI-SaaS era: event banner, Cmd+K Ask-AI search, "install directly with" assistant icons, autoplaying use-case tabs, a testimonial video carousel, a mega menu.
- Header and hero repeat the same two CTAs with different emphasis.
- Weight: 19.5 MB first load, about 20 third-party tags, hero shipped as a 13 MB video to mobile.

## Replicable by HELIX under the truth rules?

| Pattern in Clay | HELIX-truthful equivalent | Verdict |
|---|---|---|
| Claymation hero loop (13 MB video) | None. No commissioned art exists, motion budget is two moments, LCP budget forbids it. A single static, labelled "Illustrative interface. Sample data." product frame under the H1 does the job. | Do not copy |
| Hero text left, subhead and CTAs in a narrow right column over a flat ground | Fine and cheap: H1 left, subhead plus one primary CTA right, on a flat light surface. Keep the subhead as the plain statement of what HELIX is (couriers, 3PLs, freight brokers). | Borrow layout only |
| Asymmetric 720 / 320 hero column split | Same split with Geist, no gradient ground. | Borrow |
| Rounded section cards on a 1280 grid, 80px gutters, 48px radius | Card rhythm and gutter logic can carry over; radius should come from HELIX tokens (smaller), hairline border instead of tinted fill. | Borrow with tokens |
| One hue per section (tint + deep ink + matching CTA) | Conflicts with the single cobalt accent. Equivalent: one neutral card style, cobalt only for CTA, link, focus. | Do not copy |
| CSS sticky card deck (zero JS, native) | A stacked set of capability cards (Courier, 3PL, Freight broker) each stating capability then operator outcome, in plain sticky layout. Must still read as a plain list with no JS and with reduced motion. | Borrow, if Spec allows sticky as non-motion |
| Two-tone headline (second clause in section hue) | Possible with cobalt on one clause, only where the clause is a factual claim with a claim ID. | Borrow with care |
| Tight negative tracking at display size (-0.03 to -0.04em) with line-height 1.0 | Geist at display sizes can take the same tracking; check against the Spec scale and the three-weight limit (no 575/530 steps). | Borrow tracking idea |
| Eyebrow label, 12px uppercase +0.25em | Same device in Geist Mono or Geist at ink colour; Clay's teal fails 4.5:1 at 12px. | Borrow, ink colour |
| Logo wall, named quotes, "500,000 teams", stat cards | None. No client logos, no invented numbers or quotes. Equivalent proof is absent until real: a capability list or a labelled sample interface. | Do not copy |
| Use-case tabs with product screenshots on coloured grounds | Tabs or three side-by-side panels for courier, 3PL, broker with labelled sample-data frames until real console captures exist. Manual only (no autoplay), all panels present in the HTML so JS-off shows a list. | Borrow structure, drop autoplay |
| Floating overlapping UI panels with drop shadow on saturated texture | Flat, no shadow, no texture; one framed screenshot or two side by side. | Do not copy |
| CTA hover arrow swap (0.4s transform) and underline fill (0.45 to 0.6s transform) | CSS-only transform hover is feasible with no library; counts as hover feedback, not a motion moment (confirm in Spec 15). | Borrow, CSS only |
| Nav text-roll plus sliding pill via GSAP Flip | GSAP above the fold is ruled out by default. A plain colour hover. | Do not copy |
| Logo marquee, draggable strips | None (continuous ambient motion, and it is a logo wall). | Do not copy |
| Use of baked grain and CSS noise/overlay tiles | Rule 4 is flat, no atmosphere. | Do not copy |
| Mega menu with 3D icons | HELIX has few pages; a plain nav. | Do not copy |
| Cmd+K Ask-AI search (454 KB third-party) | None. | Do not copy |
| Footer over a looping video | Flat footer on a light surface with entity line and `info@`. | Do not copy |
| Load gate that hides the page until about 1s | Never. Server-rendered content visible at first paint (Rule 3). | Do not copy |

## Tech fingerprint

Evidence rule applied: every "present" below names the evidence; "weak signature" items are called out.

- **Platform: Webflow (confirmed).** `<html data-wf-domain data-wf-page data-wf-site="61477f2c24a826836f969afe">`, html classes `w-mod-js w-mod-ix w-mod-ix3`, assets on `cdn.prod.website-files.com`, runtime chunks `fs-clay.schunk.*.js`, jQuery 3.5.1 (`window.jQuery.fn.jquery`) from Webflow's CloudFront. Not Next, React, Astro, Nuxt, Framer, Shopify or WordPress (probe `hints`). Custom code is added from `clay-webflow-dev.vercel.app/app.js` (a bundled ES-module bundle exposing `data-module` modules: `rotate`, `shuffle-logo`, `tabs`, plus accordion, line-link, hover-arrow, customer slider, background-video) and `assets.clayrun.dev/bundle-aprl30.js` (global `OdynCode`, the nav).
- **GSAP: confirmed present, three copies.** (a) Webflow CDN `cdn.prod.website-files.com/gsap/3.15.0/{gsap,ScrollTrigger,SplitText}.min.js`, and `window.gsap.version === "3.15.0"`, `ScrollTrigger.version`, `SplitText.version` all "3.15.0"; (b) `cdn.jsdelivr.net/npm/gsap@3.14.1/dist/{gsap,Flip}.min.js` and a `Flip` global; (c) GSAP 3.13.0 bundled inside `app.js` (strings `i0.version="3.13.0"`, "SplitText 3.13.0 ... gsap.com", `gsap.defaults({ease:"expo.out",duration:1.2})`, a CustomEase curve named "osmo"). Actual use confirmed in `bundle-aprl30.js` (`gsap.timeline`, `Flip.getState/from` on the nav) and in `app.js` modules (accordion, line-link, hover arrows, tabs, slider, tooltip). The global timeline held 15 children at idle.
- **ScrollTrigger: loaded, use NOT DETECTED.** The global `ScrollTrigger.getAll().length` was 0 at top and after scrolling to 4,200px. All 19 `scrollTrigger` string hits in `app.js` sit inside the library code, none in the site's own modules. Treat as "present as a dependency, no observed scroll-scrubbed behaviour".
- **SplitText: loaded, use NOT DETECTED** (no split-line reveals seen).
- **Smooth-scroll library: NOT DETECTED.** No `Lenis`, `lenis`, `LocomotiveScroll` or `ScrollSmoother` global; no "lenis" string in the four first-party bundles (`app.js`, three Webflow chunks); native wheel behaviour measured above. The word "ScrollSmoother" appears only as an id guard inside ScrollTrigger library code, which is not evidence of use.
- **Lottie: weak signature, not confirmed.** The string "lottie" appears inside Webflow runtime chunks (Webflow's Lottie widget support). Zero Lottie elements in the DOM (`fp.els.lottie: 0`).
- **Webflow Interactions (IX3): loader present** (`w-mod-ix`, `w-mod-ix3`), `[data-w-id]` count 0. Which interactions are bound NOT OBSERVED.
- **Rive, Spline, model-viewer, Three, OGL, Motion/Framer Motion: NOT DETECTED.** `three` hits in a Webflow chunk are the English word (rejected as a signature). Probe flagged `swiper` and `barba` signatures inside the Meta Pixel and Sequel scripts; these are weak, not evidence of use by the site.
- **WebGL and canvas: no visual canvas.** DOM `<canvas>` count 0. Contexts created at runtime: three 2D (1x1 and 300x150 by a Webflow chunk, 240x60 by `radar.min.js`) and one WebGL (300x150, detached) by `cdn.claydar.com/releases/latest/radar.min.js` (25,906 B, a third-party/visitor-identification script). Per the evidence rule, the WebGL context says nothing about the site's visuals.
- **Native CSS scroll-driven animation, `view-timeline`, `@property`, `view-transition`, `@starting-style`, scroll-snap: NOT DETECTED** in the 9 linked stylesheets (1,148,850 B) by string search (0 hits each). Inline styles (36,807 B) were scanned only by the probe, also none. NOT DETECTED is not the same as absent for inline or later-injected rules.
- **`prefers-reduced-motion` in CSS: 0 hits.** In JS: `app.js` reads it once (`matchMedia`) and zeroes durations or returns early in several modules; Webflow's chunks contain handling. `bundle-aprl30.js` (nav) has none.
- **`<video>` backgrounds: yes.** Nine `<video>` elements (hero MP4, four 1000px WebM loops, a 1500px WebM loop, an MP4 and a customer MP4, a footer MP4); `data-module="background-video"` module; a Sequel video toolkit script (`sequel.js`, global `Sequel`, 236,767 B transfer, about 964 KB raw).
- **Sticky:** the word `sticky` appears 85 times in the CSS (probe `cssFeatures`); the feature-deck wrapper computes to `position: sticky`.
- **Third-party stack (selected):** Inkeep AI search (`@inkeep/cxkit-js`), Google reCAPTCHA, GTM / gtag, Meta Pixel, LinkedIn Insight, Transcend consent, Google Sign-In, Intellimize and Eppo (experiments), a first-party CDP at `evs.cdp.clay.com`, Factors.ai, Amplitude, Dub analytics, Jetboost. 48 external script tags plus 35 inline.
- **Numbers:** JS 3,227,003 B first load (about 3.08 MiB; 0.94 MB first-party-ish, 2.28 MB third party); CSS 182,056 B transfer; total 19,524,012 B in 184 requests; idle rAF 248 per second.

## With JS off

Evidence: `desktop-1440-nojs.png`, `frames/nojs-c.jpg`, `frames/nojs-e.jpg`, probe `noJs`, and my fetch of the raw HTML.
- The HTML is complete without JS: h1 "Build systems to grow revenue" is in the document, 17.9k characters of text survive tag stripping (includes closed-menu text), no inline `opacity:0`, zero `data-w-id` attributes. I viewed the page at scroll 0, about 900, 1,800 and 3,600px: header, subhead, both hero CTAs, the "install directly" line, the trust card with its logos, quotes and stats, the tab pills, a product screenshot and the agents feature card all render. The footer was not viewed. The load gate in Motion row 1 does not exist without JS.
- The hero shows a static frame. Two screenshots 2.5s apart were byte-identical, so the video is not visibly playing. That is consistent with the eager AVIF still staying on top of the video (the site's `background-video` module references a poster element), but I did not check the z-order. The logo wall is static (no drift). A product panel is visible under the tab pills and no pill is highlighted; nothing autoplays.
- Not hidden: mega-menu items exist in the DOM text. I did not verify whether the menu panel is reachable without JS (NOT OBSERVED).

## With reduced motion

Evidence: `desktop-1440-reduced-motion-top.png` (harness), `frames/reduced-motion-scrolled-880.jpg`, and the `reducedMotionRun` block in `scripts/out/clay-s3.json`. Emulated `prefers-reduced-motion: reduce` (matchMedia confirmed true).
- Survives unchanged: the load gate (reveal at about 0.98s), and the hero video, which keeps playing (`paused=false`, currentTime 4.55s to 6.56s over 2s).
- Stops: the logo-wall drift (x unchanged across about 2s); CTA arrow swap and underline-fill hover (handlers return early in code); accordion durations go to 0.
- Does not stop: the nav text-roll (translateY -9.09px at 60ms, -21px at 1260ms), because the nav bundle has no reduced-motion check.
- Tab autoplay under reduced motion: NOT OBSERVED.
- Harness `reducedMotion` reports 0 animations, which is true only because the site uses no CSS animation or Web Animations API (see contradictions).

## Contradictions and harness corrections

1. `animationsAtLoad`, `animationsAfterScroll` and `reducedMotion` are all empty or 0, and `runtime.animateCalls` is 0. The page is heavily animated (video, marquee, tab autoplay, GSAP tweens); GSAP drives inline styles from rAF, which the harness's WAAPI/CSS probe cannot see. An empty animation list here is not evidence of stillness.
2. `desktop-1440-t1s.png` is described as "entrance animation in flight". It is not: by that time the page had been revealed (the reveal is a one-step cut at about 1s). `t1s` and `top` differ only because the hero video is on a different frame.
3. `dom.header` (and `mobile.dom.header`) report `nav`, `position: static`, transparent background. The real sticky/fixed header is a parent chain (`nav2_wrap cl-nav-fixed` fixed, `nav__layout` white). Use the measurements in Components.
4. `desktop-1440-nav-open.png` and `navOpenToggle: "Cmd K"` are the Ask-AI search dialog, not a nav menu. The real mega menu and mobile menu are in `frames/`.
5. `fp.els.canvas: 0` and `runtime.canvasContexts: [2d, 2d, 2d, webgl]` look inconsistent: the canvases are detached and created by third-party scripts, so there is no visual canvas.
6. `scriptSignatures` (`lottie`, `ScrollTrigger`, `webflowIx`, `swiper`, `barba`, `three`-style hits) include hits inside Webflow's runtime chunks, the Meta pixel and the Sequel toolkit. Only GSAP (with its own globals) is confirmed.
7. `idleRafPerSecond: 248` looks like a hijack signal but it is three or four ordinary loops; native scroll is confirmed.
8. `dom.ctas` includes mega-menu links (Audiences, Data marketplace and others at y=147+). The closed panel sits at first-viewport coordinates and is probably hidden by opacity or clipping; they are not visible CTAs.
9. My own `clay-s2.json` hover entries for the CTAs target the inner label `div` and show no diffs. The correct diffs, taken on the `<a>` elements, are in `clay-s3.json` (`hover2`).

## What not to borrow

A 13 MB hero video (also sent to mobile), a load gate that leaves the screen blank for about a second, GSAP for nav roll and Flip pills, three GSAP copies on one page, a logo wall with named customers and invented-looking stats, rotating hue per section, baked grain and CSS overlay textures, Cmd+K Ask-AI search, event banner, ambient marquee, autoplaying tabs, a mega menu, 20 third-party tags, scripts hosted on a Vercel dev subdomain (`clay-webflow-dev.vercel.app`) and a separate asset domain (`assets.clayrun.dev`), 20px icons shipped as 135 KB PNGs, and a hero with no text proof.

## NOT OBSERVED

- Manual tab click transition and pause-on-hover behaviour of the use-case tabs; reduced-motion behaviour of the tab autoplay.
- Hover on the logo cards (the cursor-follow portrait card), carousel dragging, the testimonial video player, the accordion/FAQ.
- Frames of the four 592x675 WebM loops, the 1184x533 loop and the footer video.
- Mega-menu open easing and duration (JS in `bundle-aprl30.js`; only the end state was captured).
- Whether Space Mono is used anywhere on the home page.
- Tablet width, other browsers, real-device behaviour, slow-network behaviour (how long the still stays before the video starts).
- Inline CSS and runtime-injected CSS for scroll-driven features (only linked sheets were string-searched).
- Which Webflow IX3 interactions are bound, and what exactly triggers the load gate.
- Other pages, pricing, blog, signed-in product.
- Real Lighthouse scores (run separately by the lead).

Screenshots in this folder: `desktop-1440-{t1s,top,screen2,mid,footer,nav-scrolled,nav-open,reduced-motion-top,nojs}.png`, `mobile-390-{t1s,top,screen2,mid,footer,nav-scrolled,reduced-motion-top}.png`; extra frames in `frames/`; scripts and raw outputs in `scripts/` and `scripts/out/`.
