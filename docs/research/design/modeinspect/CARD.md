# Observation card: modeinspect

| Field | Value |
|---|---|
| URL | https://modeinspect.com/ (home page only) |
| Role | New reference, Brief 01 v2.1 |
| Date | 2026-10-08 |
| Viewports | 1440x900 and 390x844 (Pixel-7 UA, DPR 2) in the harness frames; targeted probes at the same two sizes; JS-off at 1440x900 (top frame plus a full-page capture) |
| Tool | playwright-core + Google Chrome 154 (headless), harness `probe.json`, plus my own scripts in `scripts/` (output JSON beside them). Lighthouse NOT run by me (run separately by the harness owner). |
| Personality in three words | warm, tactile, product-led |
| HTTP status | 200, h2, `server: cloudflare`, `cache-control: public, max-age=0, must-revalidate`; no consent banner shown (`consent: []`, none visible in any frame) |

Evidence files in this folder: `desktop-1440-{top,t1s,screen2,mid,footer,nav-scrolled,nojs,reduced-motion-top}.png`, `mobile-390-*.png`, plus mine: `r2-entrance-contact-sheet.png`, `r2-section-1..7.png`, `r2-merge-after-click.png`, `r2-footer-art-hover-{a,b}.png`, `desktop-1440-nojs-full.png`. Scripts and raw outputs: `scripts/` (`motion-output.json`, `layout-type-mount-output.json`, `deep-output.json`).

## Hero pattern
- **Composition.** Left-aligned (not centred) text column on a lime-to-greige field: two-line H1 (about 826px wide, 20ch max), a 52ch subhead, one pill-rect CTA, then a 1152x720 faux application window that starts at y=522 and so is about 52% visible in the 900px fold (top 378px of 720px). Header is a transparent 66px sticky bar carrying three floating pills (wordmark, 4 links, Sign in + Get started).
- **Plain text vs imagery.** In text: the category ("a design canvas with your codebase and agents built in"), the outcome (design in code, skip the handoff) and the audience only as "teams" ("high-fidelity features"). Only in imagery: what the product actually looks like (canvas, inspector panel, device frames, selection handles, an AI prompt bar). The words "AI" and "design engineers" are absent from the first viewport (they appear in `<title>`/meta and in the eyebrow of the logo strip, screen 2). No price, no proof number, no "how it works" in the first viewport.
- **CTAs.** Desktop first viewport: 1 hero CTA ("Get started", 123x44, lime) and 1 identical header CTA (115x36) plus a neutral "Sign in" (frosted). One accent style, one verb, no secondary hero CTA ("Book a demo" first appears in the final CTA section and the footer). Header CTA = hero CTA (same label, same fill, same destination, 36px vs 44px). Mobile (390): the hero CTA is `hidden lg:flex` and is replaced by a GET email capture with the line "optimized for larger screens" and the placeholder "Email me a link for later"; header shows only a Menu pill. (I did not type into or submit the form.)
- **Trust signals in the first two screens (0-1800px).** (1) A named customer-logo marquee, seven logos, under a mono eyebrow "Loved by design engineers at" (docTop 1355-1490, so screen 2); (2) the product UI itself, drawn in markup (not a photo); (3) nothing else: no rating, no number, no quote until the section after the next (stat strip at about docTop 6330, testimonials with named people and avatars). The 3-number stat strip and testimonials are customer claims (not verifiable here).
- **Entrance.** The hero text has no entrance animation (first paint 216 ms, LCP element is the subhead `<p>` at about 264-300 ms). Only the product frame fades in (see Motion catalogue).

## Type system
- Families by share of text (probe `fontShare`, characters): Inter 6737, JetBrains Mono 491, "APK Galeria" 470, "DigiDecay" 132. Four self-hosted faces via `next/font` (class names `*-module__*__variable`), all `font-display: swap`, 3 preloaded (Galeria Regular, Galeria Bold, Inter).
- **Display = two faces in one headline.** H1/H2 line 1 is Galeria 400 (a plain grotesque), line 2 is DigiDecay (a decayed pixel display face, 8 KB) in the same size at 62% ink. In the H1 the second line is a `span.block`; in H2s it is a span sometimes mid-line ("Questions [Design Engineers] ask..."). Same size and line-height on both lines.
- H1: 67.2px / 400 / lh 67.2px (1.0) / ls -3.313px (-0.0493em) / Galeria / oklch(0.216 0.006 56) (about #1C1917). Size is `clamp(2.2rem, 5vw, 4.2rem)`: 67.2px at 1440, 35.2px at 390 (`text-wrap: balance`, `max-w-[20ch]`, explicit line break via block span).
- H2: 51.84px / 400 / lh 57.02px (1.1) / ls -2.556px (-0.0493em) / Galeria / #111110, `text-wrap: balance`. Section headings and the stat/CTA headings use the same two-tone device; the dark section inverts it (cream line 1, grey line 2).
- Subhead: 20.88px / 400 / lh 31.32px (1.5) / ls -0.209px (-0.01em) / Inter / rgba(17,17,16,0.62) (= `clamp(1.05rem, 1.45vw, 1.35rem)`).
- Body: 16px / 400 / lh 24px / Inter / #111110, `text-wrap: pretty`. Quote text is the 20.88/31.3 Inter at 62% ink.
- H3 (feature titles): Galeria 20.88px / 500 / lh 27.1px / ls -0.1px.
- Nav links: Inter 14px / 500 / lh 21px / ls -0.14px. Buttons: Inter 16px / 500 / ls -0.192px (-0.012em).
- Eyebrow: JetBrains Mono 10.5px / 400 / lh 15.75px / ls 2.31px (0.22em) / uppercase / ink at 61%. Footer headings: mono 10px / 700 / ls 1.8px (0.18em) uppercase; legal: mono 10-11px bold, ls 0.04em.
- **Numbers.** Stat numerals are Galeria 56px with the unit at 28px in 62% ink ("22" then "days", "95" then "%"); `font-variant-numeric` is normal (no tabular figures). Numerals do not count up (sampled every frame while entering view: the three values never change).
- Tracking is the signature: display faces at about -0.049em, body at -0.01em, mono eyebrows at +0.22em. Weight stays 400 for display; 500 only for UI labels; 700 only in mono labels.

## Colour system
- Page ground `#E0DAD5` (warm greige, `--color-bg`, also `theme-color`); raised surface `#F2EEEA` (cards, nav pills, Sign in); ink `#111110`; muted ink `rgba(17,17,16,0.62)` (4.72:1 on the ground by my calculation); border `rgba(17,17,16,0.10-0.11)`; dark section ground `#111110` (3 of 9 blocks: the "merge" section, the final CTA, the footer).
- **Accent: lime only.** CTA fill `#D7F792` (hover `#C2EC66`), CTA text `#16210A` (14.0:1), `--color-lime-deep #C2EC66` for the hero field. Allowed places observed: primary CTA (header, hero, final CTA card), the hero field, tiny marks inside the product frame (Share button, AI spark), mono "see the developer experience" link and code keywords on the dark section. Blue exists only inside the product mock. Everything else is neutral.
- **Atmosphere (named and measured).**
  1. Hero field: inline `radial-gradient(150% 90% at 50% 16%, #c2ec66, rgba(194,236,102,.55) 44%, transparent 72%)` on a 1440x882 element (`h-[min(1166px,98vh)]`, `-top-[66px]`, so it runs under the header), plus a second radial (62% 58% at 50% 28%, lime 0.4 to 0.12) 1280x760. A third, fainter pair of radials sits behind the "Canvas and code" heading (lime 0.24 at 18%/24%).
  2. Grain, three stacked noise layers, all CSS data-URI SVG `feTurbulence` tiles: `body::before` fixed full-viewport, opacity 0.22, `multiply`, 220px tile (baseFrequency 0.9); `.home-field` fixed full-viewport, opacity 0.55, `multiply`, 200px tile (baseFrequency 0.75, alpha 0.14); its `::after` opacity 0.4, `soft-light`, 320px tile (white, alpha 0.08). `pointer-events: none`, z-index 0.
  3. A 1px dot grid inside the product frame (`radial-gradient(rgba(0,0,0,.04) 1px, transparent 1px)`).
  4. Dark textured backdrop (a 6 KB AVIF, `bg-inverted-1.jpg`) behind each product video inside a black rounded frame.
  5. Glow on the primary CTA: `0 8px 24px -6px rgba(194,236,102,.5)` (58% on hover) plus inset highlight and a 1px ring `rgba(22,33,10,.12)`.
- Counts from the harness: gradients 13, backdrop-filter elements 8 (the pills and mobile menu; CSS has 29 `backdrop-filter` declarations, the harness count of 58 is doubled, see Contradictions). `color-scheme: light` in `:root`, yet 3 sections and the footer are dark: it is not light-only.

## Layout and rhythm
- Header: 3-column grid `[1fr auto 1fr]`, 66px, content max-w 82rem (1312px) so pills sit at x=64 at 1440. Hero container max-w 76rem (1216px, px-8) so text and frame left edge at x=144; frame 1152px wide (`max-w-[1200px]`). Feature sections use a 1248px content box (x=96 to 1344). Common max-widths in the DOM: 76rem x6, 82rem x1, 64rem (logo strip), 3xl (48rem) x9 for text blocks, prose 395px, 52ch/44ch/42ch/20ch/22ch/18ch for measure.
- Section blocks (docTop, height, padding): hero 66 / 1240; logo strip 1306 / 184 (48px/48px); "Canvas and code" 1490 / 4460 (80px top, 128px bottom; three feature panels with 6 videos, about 600-850px each); "Production-grade" 5949 / 1412 (128/128); CTA card 7361 / 281; dark "merge" 7642 / 1098 (128/128); FAQ 8740 / 1138 (128/128); dark CTA 9878 / 933 (144/144); footer 10811 / 602. Total 11,413px at 1440 (12.7 screens), 9 blocks. Density: low; about 128px between blocks, one idea per block.
- Feature panels: cream panel (`#F2EEEA`, 1px `rgba(17,17,16,.10)` border, radius 16px, shadow `0 1px 2px rgba(17,17,16,.04), 0 12px 40px -16px rgba(17,17,16,.12)`), copy at left (about 1/3), a 16:9 dark-framed video at right (759x427).
- Grid: mostly flex and two-column splits; named column grids only in the footer (`2fr auto 1fr`; link block `grid-cols-2` mobile / 4 at sm). Radii: 12px (pills, Sign in), 10px (CTA), 16px (panels), 6-8px (video frame), 3px (swatches in the mock).
- Mobile 390: single column, no horizontal scroll (`scrollWidth` check false), H1 35.2px, frame scaled to fit (about 4-5px UI text, illegible, decorative at that size).

## Components
- **Header.** `header.sticky.top-0` (transparent, `pointer-events-none`; pills are `pointer-events-auto`). Pill = `home-nav-pill`: `background #F2EEEA a0.66` (0.80 once scrolled more than 20px), `1px solid #fff a0.18`, radius 12px, `backdrop-filter: blur(20px) saturate(150%)`, shadow `inset 0 1px #fff a0.6, 0 1px 2px rgba(17,17,16,.05), 0 14px 34px -16px rgba(17,17,16,.22)`. Mobile: wordmark pill + "Menu" pill; the menu opens a full-screen overlay (four large display-size links, `backdrop-blur-[120px]`, ground at 0.45 alpha, email capture at the bottom). The harness `dom.header` says `bg transparent, backdrop none`: that is the sticky wrapper only; the blur lives on the pills.
- **Buttons.** `cta` (lime, 10px radius, 36/44px), `glossy` (frosted neutral, Sign in). No outlined secondary.
- **Logo marquee.** 7 SVG logos duplicated (14 `<img>`), 2495px strip in a `max-w-[64rem]` mask-faded window.
- **Product frame.** Section "Product UI treatment".
- **Stat strip.** 3 cells, hairline dividers, big numeral plus unit plus label.
- **Testimonials.** Cards with logo, avatar (AVIF), name, role, quote.
- **Tabbed capability list** (dark section): three large buttons left (active one bright, others about 40% tone), card right (mono file-name bar, line numbers, lime keywords); sticky left column (`lg:sticky lg:top-28`). Click-driven (hover does not switch).
- **FAQ.** 8 `button[aria-expanded][aria-controls]` rows with a circled plus; panel ids resolve.
- **Footer.** Dark; mono-caps column headings; link columns; an orbit artwork (inline SVG, JS animated); legal row in mono.

## Product UI treatment
- Hero: a faux app window drawn in HTML/CSS/inline SVG (506 DOM nodes, 54 inline SVGs, 0 `<img>`, 0 `<canvas>`, about 52 KB of markup, 362 characters of UI text) showing a canvas with a pricing-page frame, selection handles, a tablet frame and a phone frame labelled "Codebase", an AI prompt bar ("Explore / Build"), a layer rail and an inspector panel (Frame, Position, Size, Layout, Appearance, Fill, Border) at 62% zoom. Invented sample content ("Acme Store", $0/$24/$48); no "illustrative" label. It is in the server HTML but starts at inline `opacity:0`.
- Below the fold: six real screen-recording videos (webm) of the product in dark textured frames, and code cards with real-looking TypeScript. The product is shown early and often; the hero mock is stylised, the videos are the real thing.

## Motion inventory
- Web Animations at load (harness): `reveal-in` (CSS keyframe, 900 ms, on the logo strip, not the hero) and `marquee` (infinite, 40 s linear). After scroll: the same two (the Motion `whileInView` reveals have finished by the time the harness samples).
- Named keyframes in CSS: `reveal-in`, `marquee`, `home-marquee`, `home-caret`, `home-collapse-marquee`, `spin`, `pulse`. In use on the home page after a full traversal: `reveal-in` (1 element) and `marquee` (1 element) only; the other keyframes are defined but not applied on `/`.
- `idleRafPerSecond` 0 at the top (CSS and WAAPI only); 60/s while the footer artwork is in view, 150/s while the pointer moves over it (my measure). IntersectionObservers: 8 desktop, 21 mobile. Canvas contexts: none. Wheel scroll: native (see Tech fingerprint).
- Scroll-linked motion: none found (Motion `useScroll` is used only to read `scrollY` for the header tone). Timing/easing of the rAF footer artwork: NOT OBSERVED beyond the frame rate.

## Motion catalogue
Moments (what moves), then what is still. Timings are headless Chrome, no throttling.

| # | Motion | Trigger | Duration / easing | Property | Evidence |
|---|---|---|---|---|---|
| 1 | Hero product frame fades in | page load, after hydration | 1000 ms, delay 500 ms, `cubic-bezier(.16,1,.3,1)`; first visible at about 777 ms, 0.61 at 910 ms, 0.905 at 1110 ms, 1.0 at about 1560 ms | opacity only (container `div.relative.mt-16`, Motion WAAPI `Animation`; a 400 ms `ease` CSS opacity transition on a wrapper) | `hero-fade.mjs`, `r2-entrance-contact-sheet.png` |
| 2 | Logo strip reveal | page load (CSS, runs even when off-screen) | 900 ms, `cubic-bezier(.16,1,.3,1)`, fill both | opacity 0 to 1, translateY 24px to 0 (`reveal-in`) | CSS keyframes; harness shows `easing: linear` because CSS animations carry easing per keyframe |
| 3 | Section reveals (feature copy, cards, stats, testimonials, CTA, FAQ rows) | enters viewport (Motion `whileInView`, once, margin -12% bottom) | default 0.9 s, ease `[.16,1,.3,1]`, y default 24px | opacity 0 to 1, y 24 to 0 | first-party `Reveal` in chunk `1stzg5r__qvds.js`; observed ty 24 to 11.4 with opacity 0 to 0.52 mid-flight |
| 4 | Logo marquee | ambient, always (stops under reduced motion) | 40 s linear infinite, translateX 0 to -50% on 2495px (about 31 px/s) | transform | harness `animationsAtLoad`; no `.pause-on-hover` ancestor, so hover does not pause it |
| 5 | Header pills tone | scrollY > 20px: "solid"; a `data-nav-tone="dark"` section under the header: "dark" | 300 ms (bg, border, shadow), default easing | background-color, border-color, box-shadow (React state from `useScroll().scrollY`) | CSS `.home-nav-pill`; measured mid-transition `rgba(92,91,85,.635)` at 80 ms, `rgba(20,20,14,.58)` at 680 ms |
| 6 | Primary CTA hover | pointer | 200 ms `cubic-bezier(0,0,.2,1)` | background-color `#D7F792` to `#C2EC66`; box-shadow (ring 0.12 to 0.18, glow 0.5 to 0.58). No transform. | hover diff |
| 7 | Sign in hover | pointer | 200 ms | background `#F2EEEA` to `#F6F3EF` | hover diff |
| 8 | Nav link hover | pointer | 250 ms `ease` | opacity 1 to 0.6 | hover diff |
| 9 | Footer link hover | pointer | 300 ms | colour alpha 0.62 to 1 (JS sets inline colour, CSS transitions it) | hover diff |
| 10 | FAQ open/close | click or Enter on a row (I opened and closed the first row; nothing is sent) | open 400 ms / close 350 ms, `cubic-bezier(.22,1,.36,1)` | `grid-template-rows 0fr to 1fr`; content `translateY 48px to 0`, `opacity 0 to 1`, `filter blur(2px) to 0` (opacity 0.48 at 180 ms, 1.0 at about 430 ms) | `layout-type-mount.mjs`, CSS `.home-faq-panel*` |
| 11 | Mobile menu overlay | tap Menu | about 200 ms opacity 0 to 1 (`AnimatePresence`, Motion) over `backdrop-filter: blur(120px)` | opacity | samples 0.07, 0.54, 0.88, 1.0 at 6/72/139/205 ms |
| 12 | Product videos | enter viewport (play) / leave (pause) | loop 4-27 s clips | video frames | JS-controlled; no `autoplay` attribute; no poster |
| 13 | Footer orbit artwork | in view: continuous; pointer over it: faster | rAF-driven, 60 fps idle, about 150 rAF calls/s on hover; chromatic-fringe (magenta/green) on hover | SVG `rotate()`/`translate()` attributes | `deep.mjs`, `r2-footer-art-hover-*.png`; easing NOT OBSERVED |
| 14 | Capability tabs (dark section) | click | NOT OBSERVED (opacity of the card wrapper I sampled stayed 1; swap may be instant or on a child) | - | `r2-merge-after-click.png` |

**Still (explicitly):** hero headline, subhead and CTA (painted at first paint, no entrance); the nav (no hide-on-scroll, no shrink; the pills keep size and position); product mock after its fade (zero animations, zero pointer reaction, zero idle rAF: checked by moving the pointer across it); stat numerals (no count-up); cards (hover diff empty: no lift, no shadow change); logo pill; FAQ row hover (no change); no parallax (document-space `top` of every transformed or fixed element unchanged across a 60px scroll nudge at six scroll positions, other than the marquee which is time-driven); no scroll-snap; no scroll hijack; no cursor follower observed.

## Performance
- Not Lighthouse. Harness desktop, first load (before scroll): 72 requests, 858,518 B transferred (Document 48,052; Script 541,615; Font 191,729; Image 24,914; Stylesheet 21,665; Fetch 22,318; Other 7,759). By host: modeinspect.com 733 KB, sync.modeinspect.com 86.5 KB, bzrcdn.openai.com 28.2 KB, static.cloudflareinsights.com 10.4 KB.
- After a full top-to-bottom traversal: 155 requests, 5,595,432 B, of which Media 4,493,069 B (six webm files, range requests, lazy). Mobile first load: 55 requests, 751,304 B; after traversing to 5000px mobile pulled only 2 of the 6 videos (1.70 MB).
- Headless, unthrottled, desktop: first paint 216 ms, LCP element `<p>` (subhead) at about 264-300 ms, DCL about 249 ms, load about 268 ms, TTFB about 103 ms, CLS 0, long tasks 0. Mobile (harness): LCP 232 ms, CLS 0. These are fast-network numbers; the Lighthouse run governs.
- The HTML document is about 300 KB raw (48 KB brotli) because it server-renders every section including the 506-node hero mock.

## Accessibility spot checks (no axe run; hand checks only)
- `lang="en"`, 1 h1, 7 h2, 10 h3; landmarks header 1, nav 2, main 1, footer 1; no skip link found.
- FAQ: 8 buttons with `aria-expanded` and `aria-controls` resolving to panel ids (good). Focus ring on FAQ triggers is `0 0 0 2px #E0DAD5, 0 0 0 4px rgba(194,236,102,.9)`: lime on greige is about 1.0:1 (computed), effectively invisible. CTA ring is specified as `ring-[1.5px] ring-fg/30 ring-offset-[3px]` in the markup (not measured).
- Images: 28 `<img>`, 0 missing `alt`, 12 with empty alt (decorative backdrops and duplicated marquee). All 14 marquee children are `aria-hidden`; I did not check for an alternative text list.
- The hero mock's 362 characters of UI text are not `aria-hidden` (exposed to assistive tech; screen-reader output not tested). Videos have no `aria-hidden`, no captions track (silent product clips).
- Mobile menu button: `aria-label="Open menu"`, `aria-expanded=false`, no `aria-controls`; the open overlay has no `role="dialog"` that I could find.
- Contrast: ink on ground 13.6:1; muted ink (62%) on ground 4.72:1 (just above AA for body text; it is used for all subheads, quotes and units); muted ink on the lime field about 4.7:1 (estimate).
- Reduced motion: partial, see "With JS off and with reduced motion".

## Structured data and meta
- Title "Modeinspect: Design in code" (27 chars); description 135 chars; canonical set; OG image 1200x630 with alt; `twitter:card summary_large_image` with site/creator handle; `theme-color #E0DAD5`; `application-name`, keywords meta; web manifest; light and dark favicon sets.
- JSON-LD types: Organization, WebSite (one graph), SoftwareApplication, FAQPage (matches the on-page FAQ).

## Premium and trust signals
See the next section for the evidence-based list.

## What makes it feel premium, and what is generic
**Premium (each with the measured device):**
1. **Two-voice headline with extreme tracking.** A tight grotesque (67.2px, lh 1.0, -0.049em) over a decayed pixel face at 62% ink on a locked second line, repeated on every section heading. The contrast carries the brand without any decoration; 8 KB font. Same size and line-height on both lines so it reads as one unit.
2. **Tonal depth without hard lines.** Greige ground, cream raised surfaces one step lighter than the ground, 10%-ink borders, long soft shadows (`0 12px 40px -16px` at 12%); three stacked low-alpha noise layers (0.22 / 0.55 / 0.4) kill the flat-digital look; hero field is one lime radial fading to the ground in about 880px.
3. **Product shown as a working object, early.** A 1152x720 UI drawn in markup, crisp at any DPR, about 52% visible in the fold; then real screen recordings in dark textured frames and code cards. The viewer sees controls, not a screenshot grid.
4. **Context-aware floating header.** Frosted pills that change tone over dark sections and thicken after 20px of scroll (300 ms), with an inset 1px highlight. Detail work that reads as crafted.
5. **Restraint in motion.** The hero text is never animated, native scrolling, no parallax, one expo-out curve (`.16,1,.3,1`) reused for every reveal (0.9 s, 24px) and the hero fade; idle rAF is 0 at the top.
6. **Mono micro-labels** (10.5px, +0.22em, uppercase) used as eyebrows and file names, against a loose sans; consistent 128px block rhythm.

**Generic tells:**
1. The lime-to-greige glow plus noise, glass pills and cream cards is a current "warm AI-tool" template look; the section order (logo marquee, stat strip, testimonial cards, FAQ, big CTA card) is standard SaaS.
2. Customer-logo wall, three-number stat strip ("22 days / 0 / 95%") and named testimonials are social proof by assertion, with no sourcing on the page.
3. The hero mock is a stylised skeleton with invented content and no "illustrative" label; at 390px it shrinks to an unreadable thumbnail.
4. Same "Get started" label three times in one viewport; mobile hero swaps the CTA for "optimised for larger screens" plus an email capture.
5. Tracking stack on load with no consent banner (session recorder, dead-click capture, an OpenAI pixel, Cloudflare analytics).
6. The pixel accent face is a novelty device; legibility drops at 62% ink on the lime field.

## Replicable by HELIX under the truth rules?
HELIX rules: light only, flat (no gradient, glow, glass), no client logos, no invented metrics, features or customers, only real operator-console UI as proof (a frame labelled "Illustrative interface. Sample data." is allowed until real captures exist), at most two motion moments per page, transform/opacity only, reduced motion respected, readable with JS off, no animation library above the fold.

| Pattern | HELIX-truthful equivalent |
|---|---|
| Left-aligned two-line H1, subhead max 52ch, single CTA, product frame half in the fold | Yes. Same composition with Geist. The product frame must be the labelled illustrative frame or a real console capture. |
| Two-voice headline (grotesque plus pixel face at 62%) | Geist is locked, so use tone only: line 1 ink, line 2 the outcome in the muted ink token (Eden does the same). No novelty face. |
| Lime radial field, three noise layers, dot grid, CTA glow | Not replicable (gradient, glow, texture all banned). Equivalent: a flat ground, one solid tinted block or a 1px rule under the hero, one flat accent fill on the CTA. |
| Frosted floating pills, tone-switching on dark | Not replicable (glass, dark). Equivalent: a flat sticky 64px bar, solid ground, 1px bottom border that appears after scroll (a border-colour change; no motion needed). |
| Product UI drawn in markup, server-rendered | Yes, and it suits a console (tables, status chips, queue rows). Keep it much smaller (they ship 506 nodes, 52 KB), label it, use sample data without numbers that read as results, no client names. Render it visible in the server HTML (their version starts at inline `opacity:0`). |
| Real screen-recording videos in a dark frame | Not now: no real console recordings exist yet, and autoplay video spends the motion budget. Later: static real captures first; a click-to-play clip with a poster is the HELIX-safe version. |
| Customer-logo marquee, testimonials with avatars, stat strip | None. No customers, quotes or metrics are available. Equivalent: an entity line ("Built by Cyper Studio, founded 2024") and, if confirmed, factual capability statements (claim-registered) in a plain 3-up strip. |
| Numbers as 56px numerals with muted units | Only if a claim-registered number exists; otherwise none. |
| One lime CTA, repeated, one accent | Yes in principle: one accent (cobalt, Q-12 pending) on CTAs only; one verb. HELIX needs a second, quieter path ("See how it works" as a text link) because a B2B buyer rarely commits at first view. |
| Capability list left, proof card right (three rows, click to switch) | Yes as three stacked static rows with a static panel each, or a native `details` group, so it works with JS off. Not a sticky dark section. |
| FAQ accordion | Yes, with native `<details>`; do not animate `grid-template-rows` or `filter` (not transform/opacity); answers must be visible in the server HTML (their FAQ rows are invisible with JS off). |
| Reveal on scroll (translateY 24, 0.9 s, expo-out) | At most one moment per page; implement as a CSS keyframe class (as their `reveal-in` does, which also runs with JS off), never an `opacity:0` inline style applied by a library. Skip the below-fold reveals entirely. |
| Hero frame fade after 500 ms delay | Optional single moment: opacity only, no delay, CSS, finishing by about 600 ms, honouring `prefers-reduced-motion`. |
| Mono eyebrows and file-name bars | Yes with Geist Mono (mono for data is allowed). |
| Footer with mono-caps column headings | Yes, light version. Skip the orbit artwork (rAF decoration). |
| Native scrolling, no smoothing layer | Yes. |
| Structured data (Organization, WebSite, SoftwareApplication, FAQPage) | Yes, with only confirmed facts; one canonical host. |
| Mobile CTA swapped for an email capture | No: keep "Request a demo" visible on mobile. |

## Tech fingerprint
Evidence names the script file, string, global or observed behaviour. Chunk names are under `https://modeinspect.com/_next/static/chunks/`.

- **Smooth-scroll library: none detected, native scrolling observed.** No `lenis`/`locomotive` strings in any loaded script or CSS; no `lenis` class on `<html>`; `scroll-behavior: auto`; `wheelProbe` jumped 500px at 68 ms with 2 distinct positions (instant). Programmatic smooth scroll only for a same-route nav click (`window.scrollTo({behavior: reducedMotion ? 'auto' : 'smooth'})` in `1stzg5r__qvds.js`).
- **Animation library: Motion (the framer-motion lineage), confirmed.** Evidence: `window.MotionIsMounted`, `MotionHandoffIsComplete`, `MotionHasOptimisedAnimation` assigned in `2np59sx41qk_b.js` (and the same-size chunk `121vse26ciog-.js`); `window.MotionIsMounted` is present at runtime; first-party `Reveal` in `1stzg5r__qvds.js` calls `motion.div` with `whileInView`; the header uses `useScroll` and `useReducedMotion`; the mobile menu uses `AnimatePresence`; observed WAAPI animation with `delay 500 / duration 1000` on the hero frame. Two Motion chunks load on first view (49,266 + 49,163 B brotli, about 98 KB; they differ only in module ids). Exact version not determined (has the `MotionHandoff*` helpers, so a recent release).
- **GSAP / ScrollTrigger: not present.** The harness `scriptSignatures.gsap` hit is a false positive: the match is "gsApi" inside `flagsApiHost` in the PostHog SDK that is bundled in `3j7pa202rww9p.js` (case-insensitive regex). `window.gsap` is undefined; zero hits for `ScrollTrigger`, `GreenSock`, `gsap.` in all 30 loaded files.
- **Lottie, Rive, three, OGL, Spline, model-viewer, Swiper, Webflow IX: none** (no strings in the loaded scripts, no globals, no DOM hooks).
- **WebGL / canvas: none.** 0 `<canvas>`, `HTMLCanvasElement.getContext` never called (`canvasContexts: []`). The harness `webgl` signature in `posthog-recorder.js` is the session-replay SDK (canvas recording support), not site WebGL.
- **Native CSS scroll-driven animations: not detected.** No `animation-timeline`/`view-timeline` in the stylesheet or the document. The harness `scrollTimelineJS` hits (`ScrollTimeline`/`ViewTimeline`) are feature-detect strings inside the Motion chunks; the only `useScroll` use found reads `scrollY` for a state change.
- **View Transitions: not used.** `startViewTransition` appears only in the React DOM runtime inside `1nx4qpfk-i_e-.js`; no `view-transition-name` in CSS.
- **`@property`: 68 declarations, all `--tw-*` Tailwind v4 internals** (the harness number 136 is doubled). No authored animated custom properties.
- **`<video>` backgrounds: none in the hero.** Six muted looping `<video>` product clips in feature panels (JS play/pause in view), no poster, `preload=auto`.
- **Framework hints.** Next.js App Router with Turbopack (`self.__next_f`, `window.next`, `window.TURBOPACK`, `turbopack-03ca3oo2rh8_9.js`, `next-size-adjust` meta), React Server Components, Tailwind CSS v4 (`@layer theme`, `--spacing`, `--color-*` tokens, `@property --tw-*`), `next/font` local fonts, Cloudflare (server header, brotli, h2, `/cdn-cgi/image/...` resizing, Web Analytics beacon `__cfBeacon`). Analytics and tags: PostHog (`__PosthogExtensions__`, recorder and dead-click scripts from the first-party subdomain `sync.modeinspect.com`, SDK in `3j7pa202rww9p.js`), an OpenAI script (`bzrcdn.openai.com/sdk/oaiq.min.js`, global `oaiq`; purpose not confirmed, looks like a measurement/ads pixel), Cloudflare Web Analytics.
- **JS on first load: 541,615 B transferred (about 529 KB brotli).** Attributed by chunk signature (contents beyond the named signatures not audited): analytics and tags about 191 KB (35%: PostHog recorder 69.7 + SDK 68.6 + dead-click 9.8 + web-vitals 4.9 + OpenAI 27.3 + Cloudflare 10.4), Motion x2 about 98 KB (18%), the rest (React, Next router, app code) about 252 KB (47%).
- **CSS:** 21,665 B transferred (two files, 117,919 + 2,185 B raw). **Fonts:** 191,729 B (5 woff2). **Requests:** 72 on first load, 155 after traversal.

Verdict: Next.js + Tailwind v4 + Motion; CSS keyframes for the ambient marquee and the above-the-fold reveal; native scroll; no WebGL, no GSAP, no Lenis, no scroll-driven CSS.

## With JS off and with reduced motion
**JS off** (`desktop-1440-nojs.png`, `desktop-1440-nojs-full.png`, `scripts/nojs.mjs`):
- Survives: the sticky pills (nav links, Sign in, Get started), H1, subhead, hero CTA, the logo strip (its `reveal-in` and `marquee` are CSS, so they run without JS), the "Production-grade..." heading and subhead, the FAQ heading, the footer and its links. Server HTML is complete (300 KB raw).
- Lost: the hero product frame (inline `opacity:0`), every section heading and card from "Canvas and code" to the dark CTA (inline `opacity:0` from Motion `initial`), all six videos (no `src` without JS), stat strip, testimonials, FAQ rows, "merge" section, CTA card. By my effective-opacity check, 751 characters of leaf text are visible and 5,789 are hidden (about 12% visible); 3 of 18 headings visible. Page height stays 11,413px, so the visitor scrolls past large empty greige and black areas. The harness `noJs.visibleChars: 8330` counts `opacity:0` text and overstates this.
- The five-question test would pass on the hero alone (what, who partly, one CTA) but the page below the fold fails "content never depends on hydration".

**Reduced motion** (`reducedMotion` in probe, `desktop-1440-reduced-motion-top.png`, `a11y-rm.mjs`):
- Respected (CSS paths): `.animate-marquee` becomes `animation: none` (the strip stops, rendered at translate 0); `reveal-in` runs at about 0 ms duration; the nav's smooth scroll-to-top uses `behavior: auto`.
- NOT respected (Motion paths): the hero frame fade still runs (1000 ms, 500 ms delay, 0.008 at 920 ms, 0.999 at 1703 ms) and every below-fold reveal still fades and translates (opacity 0 to 1, y 24 to 0 over about 0.9 s). Motion's default `reducedMotion: "never"` is present and no `reducedMotion="user"` config exists in the first-party code. Footer artwork and FAQ transitions under reduced motion: NOT OBSERVED.
- Screenshot `desktop-1440-reduced-motion-top.png` is identical to `top` because the hero text is static in both modes.

## Contradictions between probe.json and what I observed
1. `noJs.visibleChars 8330` vs about 12% effectively visible (see above); the screenshot and my opacity check are right.
2. `scriptSignatures.gsap` is a false positive (PostHog `flagsApiHost`); `webgl` is the session-replay SDK; `scrollTimelineJS` is Motion's feature detection; `wasm` (in the Turbopack runtime file) is not evidence of site WASM use.
3. `cssFeatures` counts are doubled (`@property` 136 vs 68 real; backdrop-filter 58 vs 29): the linked and inline CSS texts are identical copies (`cssBytes` linked 120,104 vs inline 120,284) and were concatenated.
4. `animationsAtLoad[].easing: "linear"` for `reveal-in`: the effect timing is linear; the real curve is `cubic-bezier(.16,1,.3,1)` per keyframe. Also, `reveal-in` is on the logo strip, not the hero.
5. `t1s` (about 1 s after load) already shows the hero frame fully faded in, so it does not capture the entrance; `top` equals `t1s`. My contact sheet covers 95-2169 ms.
6. `dom.header.backdrop: "none"`, `bg: transparent` describes the sticky wrapper; the blur and fill are on the child pills.
7. `fp.els.video[].autoplay: false` is the attribute only; the videos do play (JS play on intersect).
8. `dom.assets` lists only the logo marquee `<img>` (and its duplicate set); the hero visual is markup, not an image.
9. `idleRafPerSecond: 0` is true at the top of the page only; the footer artwork runs about 60 rAF/s while in view.

## Asset inventory
Bytes are transferred bytes (brotli or image/video as served) from resource timing, except inline items (inside the 48 KB brotli document or the CSS). Rendered size at 1440x900.

| # | Asset | Origin | Role | Format | Rendered / natural | Bytes | Loading | Kind |
|---|---|---|---|---|---|---|---|---|
| 1 | Hero lime field | inline style in the HTML (own domain) | atmosphere | `radial-gradient` | 1440x882 (and a 1280x760 second layer) | 0 (inline) | immediate | CSS |
| 2 | Grain layer 1 (`body::before`) | inline CSS data-URI | texture | SVG `feTurbulence` tile | fixed 1440x900, tile 220px, opacity .22 multiply | about 0.4 KB inline | immediate | CSS (SVG data URI) |
| 3 | Grain layer 2 (`.home-field`) and layer 3 (`::after`) | inline CSS data-URI | texture | SVG `feTurbulence` tiles | fixed 1440x900, tiles 200px and 320px | about 0.8 KB inline | immediate | CSS (SVG data URI) |
| 4 | Hero product frame | server HTML, own domain | hero visual | HTML/CSS plus 54 inline SVG icons, 506 nodes | 1152x720 at (144, 522) | about 52 KB of markup inside the 48 KB br document | in HTML; faded by Motion | DOM + SVG |
| 5 | Dot grid in the frame | inline CSS | canvas texture | `radial-gradient` 1px dots at 4% ink | 1150x714 | 0 | immediate | CSS |
| 6 | Wordmark | server HTML | logo | link with text "modeinspect" (glyph treatment not inspected) | 129x42 pill | in HTML | immediate | DOM |
| 7 | Customer logos x7 (shown twice for the loop = 14 `<img>`): Kiwi.com, moss mark, Apify, E2B, Prelude, NCCER, Deepnote | own domain `/image/customers/*.svg?width=N` | social proof | SVG | 61x38 (nat 80x50), 24x20 (17x14), 80x22 (362x100), 72x20 (65x18), 90x22 (90x22), 150x20 (240x32), 104x18 (300x52) | 1,686 / 1,134 / 1,578 / 1,264 / 3,214 / 8,206 / 1,658 (total 18,740) | `loading=lazy`, `decoding=async`, no `fetchpriority` | image (SVG), grey in the file (computed opacity 1, no CSS filter) |
| 8 | Logo strip mask | CSS | edge fade | `mask-image: linear-gradient(90deg, transparent, #000 12% 88%, transparent)` | 1024px window over a 2495px strip | 0 | immediate | CSS |
| 9 | Video backdrop texture (`bg-inverted-1.jpg`) | own domain via Cloudflare `/cdn-cgi/image/width=828,quality=75,format=auto/` | texture behind each video (`aria-hidden`, `alt=""`) | AVIF (source is a .jpg) | fills an 800x470 frame (`object-cover`, srcset 640/750/828...) | 6,169 | `loading=lazy` (fetched early, near the fold) | image |
| 10 | Product videos x6 ("Everything in one place", "Explore", "Design controls", "Build to product", "Interactive mode", "Share") | own domain `/video/*.webm` | deeper-section product proof | webm, 1280x720 (1) and about 1920x1182 (5), 4-27 s loops | 759x427 each | 528,376 / 1,174,127 / 3,498,377 / 1,709,606 / 165,059 / 915,382 (range responses seen; harness total 4,493,069) | `preload=auto`, no `autoplay`, no poster, JS play/pause; src assigned lazily (one src empty at first view) | video |
| 11 | Testimonial avatars x4 | own domain via `/cdn-cgi/image/width=48,quality=75,format=auto/_next/static/media/...` | people proof | AVIF | about 44px circles | 1,350 to 1,534 each | lazy | image |
| 12 | Prelude mark | own domain SVG | testimonial logo | SVG | small | 707 | lazy | image (SVG) |
| 13 | Footer orbit artwork | server/client markup | decoration | inline SVG (ellipses, text, cursor), JS animated | 395x390 | in JS/HTML | immediate | SVG + rAF |
| 14 | Fonts: Galeria Regular, Galeria Bold, Inter Variable, DigiDecay, JetBrains Mono | own domain `/_next/static/media/*.woff2` | type | woff2 (latin subsets) | - | 9,013 / 9,314 / 112,142 / 7,985 / 53,767 (total 192,221) | 3 preloaded (`as=font`), others on use; `font-display: swap`; `cache-control: immutable` | font |
| 15 | Icons | inline SVG | UI icons | SVG | 65 on the page | in HTML | immediate | SVG |
| 16 | Open Graph image | own domain `/image/og/og-image.png` | share card | PNG 1200x630 | - | not loaded on view | meta only | image |

Cache: images and video are `public, max-age=14400, must-revalidate` (4 h); fonts and `_next` media are `immutable` (1 year); the document is `max-age=0, must-revalidate`.

## What not to borrow
Gradient field plus grain, glass pills, glow on the CTA, dark sections, the decayed pixel face, customer logo wall and testimonial/stat proof (no customers or metrics), a hero frame hidden behind `opacity:0` for JS-off visitors, Motion reveals that ignore reduced motion, 98 KB of duplicated animation library, session recording and ad pixels without consent, the mobile "optimised for larger screens" email capture, a lime focus ring on greige, an unlabelled invented UI mock.

## NOT OBSERVED
- Pricing, enterprise, blog and every other page (home only); `robots.txt`, sitemap, `llms.txt`.
- Easing and duration of the footer artwork's rAF animation (only frame rate measured); swap animation of the capability tabs; FAQ and footer artwork under reduced motion.
- Screen-reader output, axe results, real-device behaviour, throttled-network behaviour (Lighthouse is run separately).
- Whether the marquee logos are exposed to assistive tech through some alternative list.
- Video codecs; whether the videos' bytes are served as one range or several (my table lists one range response per file).
- The wordmark's internal construction (text or SVG glyph).
- Form behaviour on mobile (email capture) was not exercised, by rule.
