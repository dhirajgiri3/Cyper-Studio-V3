# Observation card: pexo

| Field | Value |
|---|---|
| URL | https://pexo.ai/ (final URL unchanged; HTTP 200; `<html lang="en">`; hreflang for en, ja, de, fr, es, pt + x-default) |
| Role | New reference, Brief 01 v2.1 |
| Date | 2026-10-08 |
| Viewports | 1440x900 (main), 390x844 at DPR 2 (mobile). 1024 not captured this round. |
| Tool | playwright-core + Google Chrome 154 (headless). Harness capture in `probe.json` and the PNGs in this folder; own follow-up scripts, outputs and extra screenshots in `scripts/`. Lighthouse not run (run separately by the lead). |
| Personality in three words | warm, soft, demo-led |
| Page | 13,258 px tall at 1440 (16,315 px at 390); 10 `<section>`s in `<main>` |

Method notes. Home page `/` only. No logins, no form submits, no clicks that send data (hover and programmatic focus only; the `Create` mega-menu was opened by hover). No cookie or consent banner appeared (`consent: []` in the harness; none in any screenshot), so nothing was dismissed. The site did not block automation.

---

## Hero pattern

**Composition (1440x900, `desktop-1440-top.png`).** Fixed 72 px header, transparent at scroll 0, over a periwinkle radial wash. Single centred column: two-line headline, one-line subhead, then a large white prompt box (798x140, 16 px radius), then a full-width strip of 16:9 video tiles that bleeds off both viewport edges. The hero `<section>` is 1,001 px tall; the tile strip sits at y=586 to 874, so the whole strip is inside the first 900 px.

**What the first viewport says in plain text (readable with JS off, see below):** the product category and outcome (a first-person greeting, then "The AI video agent that turns your ideas into videos" is the whole claim), a plain-language subhead, nav, and the prompt box with a placeholder sentence that starts "Add [link icon] to create a ..." and ends in a use case. A helper line under the box lists the accepted inputs (URL, PDF, image, video, audio, idea); the textarea points to it with `aria-describedby`.

**What it says only in imagery:** the actual output. The 15 tiles are the only evidence of what a finished video looks like; each carries a 16/500 white label ("Create a launch video" style prompts) over a dark bottom scrim. No sentence in the first viewport says who it is for, what it costs, or what quality to expect; speed appears only as the word "instantly" in the subhead.

**CTA count and hierarchy.**
- One filled dark button in the first screen: `Get Started` in the header (132x40, 12 px radius, fill `#2a2923`, white 16/500).
- No button in the hero body. The prompt box is the call to action (a disabled round send arrow becomes active with text). Secondary controls: `+` attach and an inline link chip.
- 15 tile buttons act as prompt starters (cursor pointer, no hover transform).
- Header vs hero: the header button and the two later `Start for Free` buttons (after the models section and in the closing band) are the same component. All three are `<button type="button">` elements with no `href` (SSR HTML check), so there is no link-based CTA at all.

**Trust signals in the first two screens (0 to 1,800 px): none.** No customer logos, no counts, no quotes, no badges, no press. The only proof is the output tiles and, in screen two, screen recordings of the product UI. First social-proof content is at about y=9,100 (see Premium and trust signals). Footer carries a legal entity line (an "EXTREMO LIMITED" copyright).

**Screen two (900 to 1,800 px, `desktop-1440-screen2.png`).** H2 at 40/50, a 20/28 lead in `#56584d`, a 1px hairline above it, then the black pinned "stage" panel (see Motion catalogue). The 112 px section top padding is what makes the page feel unhurried.

**Mobile (390).** Header 64 px: logo, `Get Started` (106x40), hamburger (size not measured; the open panel lists nav items as accordions plus a Discord link). H1 40/47.2 over four lines, sub 23/34.5, same prompt box, tiles 260x146. Mobile LCP in the harness is the H1 (1,256 ms), not a video.

---

## Type system

- Family: **Outfit** only (`fontShare`: Outfit 6,874 chars; 100 percent of visible text). `document.fonts` reports Outfit 400, 500 and 600 as loaded. Loaded via next/font Google. The `<html>` class list declares eight font variables (Geist, Geist Mono, Reenie Beanie, Plus Jakarta Sans, Outfit, Inter, Poppins, Playfair Display) and 12 woff2 files are preloaded from the Link header, but only Outfit is used on this page.
- Tokens on `:root` (read from the stylesheet): `--landing-font-display 54px`, `-heading 40px`, `-lead 24px`, `-title 22px`, `-body 16px`, `-caption 14px`. Computed values on the page match them.
- Scale (1440 / 390):

| Role | 1440 | 390 |
|---|---|---|
| h1 | 54px / wt 500 / lh 63.72px (1.18) | 40px / 500 / 47.2px |
| Subhead | 24px / 400 / 36px (1.5) | 23px / 400 / 34.5px |
| h2 (section) | 40px / 500 / 50px (1.25) | 40px (How) and 32px / 40px (use cases) |
| Lead under h2 | 20px / 400 / 28px, `#56584d` | n/m |
| Capability card title | 22px / 500 / 33px | n/m |
| Card body | 16px / 400 / 25px | n/m |
| Nav and button | 16px / 500 / 24px | same |
| Tab label | 14px / 500 / 20px | n/m |
| FAQ question | 18px / 500 / 28px | n/m |
| Footer heading / link | 14px / 500 and 13px / 400, link `#777` | n/m |

- Weight: only 400 (61 text elements) and 500 (91); one element at 600. Hierarchy comes from size and from tone (`#2a2923` ink, `#56584d` secondary, `#a8a99d` muted), not from weight.
- Tracking: `letter-spacing: normal` on h1, h2, body and buttons. There is no negative tracking on the 54 px display, unlike handhold (-0.03em) and eden (-0.035em). The uppercase eyebrows ("WHAT YOU CAN CREATE", "PUBLISH-READY VIDEOS") look more widely spaced in the screenshots; the computed value for the first match came back `normal` (the matched node may be a wrapper), so eyebrow tracking is NOT measured.
- Line breaks: h1 is `max-w-[934px]`, `text-wrap: wrap` (not `balance`/`pretty`), centred; it breaks naturally into two near-equal lines at 1440 and four lines at 390. Sub is centred and unconstrained (1,312 px box at 1440).
- Display/accent face: none. The only typographic accent is a gradient-filled keyword in the rotating placeholder: `linear-gradient(to right in oklab, #c641ff, #ffa114)` with `background-clip: text`.
- Numbers: no tabular figures (`font-variant-numeric: normal`); no stat or number treatment in the first two screens. Numerals appear only inside illustrations (UI mock "Progress: 4/8", social counts such as 1.2K, 15K).
- Distinct text font sizes at 1440: 8, 9, 10, 11, 12, 13, 14, 16, 18, 20, 22, 24, 34, 40, 54 px (the 8 to 12 px sizes are inside mock UIs). Authored text hierarchy is six steps.

## Colour system

Tokens (`:root`, read from CSS): `--landing-bg #f9f7f1` (paper), `--landing-card #fbfaf6`, `--landing-ink #2a2923`, `--landing-text #56584d`, `--landing-text-muted #a8a99d`, `--landing-disabled #a3a3a3`, `--landing-line #e9e9e9`, `--landing-border #d3d3d3`, `--landing-action #3b82f6` (declared; not seen in the first two screens).

- Page ground: `#f9f7f1` on every section after the hero. White `#ffffff` for the prompt box, capability cards, the footer card. `color-scheme: light`, light only.
- Text tones: ink `#2a2923` (a warm near-black, never `#000`), secondary `#56584d`, muted `#a8a99d`, footer links `#777`. Contrast (computed): ink on paper 13.6:1; secondary on paper 6.8:1; muted on paper 2.2:1 (fails AA if used for text; mostly used for placeholders/disabled); footer `#777` on white 4.48:1 (just under 4.5 at 13 px); white on ink button 14.6:1.
- Accent: there is no brand colour on controls. CTAs are ink, not colour. Chromatic colour appears only as (a) the hero wash, (b) the lilac family `#c6ccf5` (focus border), `#dad8ed` (video frame ground), pale lilac/rose card tints in "How your agent gets it done" (read from screenshots, approx. rose-beige and lilac, not measured), (c) four pastel step dots (pink, blue, yellow, aqua; each a vertical `linear-gradient(to top, ...)` 18 to 28 px circle), (d) the magenta-to-orange gradient keyword, (e) red "HOT" badges inside the mega-menu.
- Hero atmosphere (measured): `radial-gradient(133.36% 150.51% at 49.7% 91.53%, rgba(99,120,253,0) 50.16%, rgba(99,120,253,0.5) 78.37%, rgb(99,120,253) 100%)` on `#f9f7f1`, section 1440x1001. Effect: a periwinkle vignette strongest at the top corners, fading to paper behind the prompt box. A similar lilac wash sits behind the closing CTA band and a faint blush radial behind "More than an AI Video Generator". Colour at the corners was not pixel-sampled.
- Other gradients: 52 gradient elements in the DOM; 15 are the black-to-transparent scrims on the hero tiles (`linear-gradient(transparent 28%, rgba(0,0,0,.28) 74%, rgba(0,0,0,.62))`), 4 are the step dots, 1 is the text gradient. No noise, grain, glass or blur: `backdrop-filter` is applied to 1 element and none in the header (the 32 `backdrop-filter` matches in the CSS are utility definitions; only 1 element in the DOM uses one).
- Black stage: `rgb(0,0,0)` panel, 16 px radius, the only dark surface on the page. Active step fill `rgba(255,255,255,.2)` (oklab).
- Borders: hairlines at `rgba(42,41,35,.1)` between FAQ rows; 1px `#e9e9e9` on cards; a 4px transparent border on the prompt box that becomes `rgb(198,204,245)` (`#c6ccf5`) on focus.
- Shadows (measured over all `body *`): 24 elements carry a real shadow; most are soft (`0 4px 12px .08`, `0 1px 3px .1`, 0.6px inset hairlines). Two exceptions worth knowing: `0 18px 44px rgba(0,0,0,.45)` on four stepper video frames (invisible on black) and a **glow** `0 0 7.5px rgba(209,223,255,.9)` on the active step dot. No drop-shadow filters, no text-shadow.

## Layout and rhythm

- Container: sections use a 1,315 px centred column inside 32 px side padding (`px-8`; `px-5` on mobile) at 1440; the hero uses `max-w-[1440px] px-16`; the tile strip is full-bleed (`w-screen`, 1,440 px). Narrow content: h1 934 px, prompt box 798 px, lead 940 px, FAQ about 680 px.
- Vertical rhythm: section padding 112 px top and bottom on md (68 px on mobile); hero top padding 185 px (84 px mobile); h2 to content gap 40 px. Section heights at 1440: hero 1,001; stepper 2,326; use cases 801; social 1,225; capabilities 1,066; models 777; "gets it done" 1,842; reviews 1,483; blog 954; FAQ 575.
- Grids: stepper 42/58 two-column inside the panel; capability cards 4x2 (about 270 px wide, 20 px radius, white, hairline); model tiles 5-up (250 px, 16 px gap); "gets it done" two asymmetric tinted cards (533 and 758 px); FAQ two columns (bubble heading left, `<details>` right).
- Radii: 6 px (hero tiles), 12 px (buttons, chips, icon tiles), 16 px (prompt box, stage), 20 px (capability cards, tile tray), 9999 px (icon buttons, avatars, pills). Token names: `--landing-radius-button 12px`, `-pill 136px`, `-capability-card 20px`.
- Density: low to medium. 7,173 visible characters over 13,258 px (about 0.54 per px); 87 links, 49 buttons. Large empty paper bands between sections (112 px padding plus 40 px gaps).

## Components

- Header: `position: fixed`, 72 px (64 px mobile), `z-50`. Items: logo, `AI Video Agent`, `Create` (menu), `Toolkit` (menu), `Gallery` (menu), `Resources` (menu), `CLI/MCP`, `Pricing`, language globe (40 px circle), Discord (40 px circle), `Get Started`. Transparent at scroll 0; solid `#f9f7f1` by 20 px of scroll; no border, no shadow, no blur; `transition-colors duration-200`.
- Mega-menu (Create): opens on hover, six link groups in a 3x2 grid on a cream panel with a `Create now` button and a `View all use cases >>` link; instant open and close (see motion).
- Buttons: primary ink (`#2a2923`), 12 px radius, 40 px (header) or 48 px (`Start for Free`), 16/500 white, hover to `#56584d`. No secondary or ghost button in the first two screens.
- Prompt box: textarea (`outline-none`, 64 px) over a rotating placeholder overlay, `+` and send controls, 4 px focus border.
- Hero tile: `<button>` 512x288, 6 px radius, video + bottom scrim + white label; portrait variant 162x288.
- Stepper: four absolutely positioned `<button>`s on a 1px rail with gradient dots; no `role=tab`, no `aria-selected` (0 matches).
- Tabs (use cases): five text tabs with a 2 px bottom border on the active one, a one-line audience pill under them, then a horizontal list of 18 video cards (578x325 landscape, 183x325 portrait).
- FAQ: native `<details>` (4), first one `open`.
- Footer: white 20 px-radius card on the lilac band; five link columns, social icons, "Ask AI about Pexo" buttons for five third-party assistants, a "preferred source on Google" widget, six language links, legal links.
- Back-to-top: round white button, bottom right (size not measured); wrapper opacity 0 at scroll 300 and 1 at scroll 1,000.

## Product UI treatment

The product is shown as **screen recordings of the real application**, not as drawn wireframes: four MP4s in the pinned stage (typed prompt with attachment chips, a plan checklist, a comment-on-frame edit view, a finished video with caption/music/graphics layers). They are framed in a pastel sky ground (`#dad8ed` frame colour) with 16 px radius, so the UI appears to float on a lilac sky inside a black panel. Lower on the page, two static PNG/UI cards ("Understands your intent", "Progress: 4/8" task list) are cropped, fade-masked UI fragments on tinted cards. The *output* (the videos) is the hero visual. Nothing in the first two screens is a table, chart or dense data screen.

## Asset inventory

Bytes are CDP `encodedDataLength` from `scripts/net-audit.mjs` (first 4.5 s after load, no scroll) unless stated; "natural" sizes for posters were measured from the WebP headers.

| Asset | Origin | Role | Format | Rendered / natural | Bytes | Loading | Kind |
|---|---|---|---|---|---|---|---|
| Logo + wordmark | own domain, `/_next/static/media/icon-logo-text.*.svg` | brand | SVG file in `<img>` | 82x26 (header), 101x32 (footer) / 616x196 | 2,095 B | `loading=lazy`, `decoding=async`, no `fetchpriority`, although in the first viewport | image |
| Hero wash | CSS | atmosphere | `radial-gradient` | 1440x1001 | 0 | n/a | CSS |
| Globe, Discord, chevrons | inline SVG | controls | inline SVG (28 inline SVGs on page) | 40 px circles | in HTML | n/a | SVG |
| Send arrow | own domain `icon-landing-hero-send-disabled.*.svg` | control | SVG in `<img>` | 20x20 / 20x20 | 664 B | lazy | image |
| 15 hero tile posters | `cdn.pexo.ai/materials/<id>/covers/*.webp` (Alibaba OSS behind Tengine/ENS, `cache-control: public, max-age=31536000, immutable`) | tile poster | WebP, 1920x1080 for 3 of 4 measured (one 1280x720) | 512x288 or 162x288 | 29 to 192 KB each, **1,533 KB total** | `<video poster>`, `preload=none`, fetched before any scroll | image |
| 15 hero tile videos | `cdn.pexo.ai/materials/<id>/hls/master.m3u8` then `original/original.m3u8` then `.ts` | hero visual | HLS, H.264+AAC, **one rendition only: 1920x1080, 5.84 Mbps**, 3 s and 10 s segments; played through hls.js into `blob:` MediaSource URLs | 512x288 (decoded at 1080p) | 3 hero tiles = 1,790 + 3,171 + 2,643 = **7,604 KB of `.ts` in 4.5 s**; 19.2 MB of `.ts` in 6 s (hls.js keeps buffering whole clips) | JS-attached after hydration; 3 tiles `autoplay` (muted loop playsinline), the rest `readyState 0` | video |
| Tile scrim and label | CSS | legibility | `linear-gradient` + 16/500 text | 512x288 | 0 | n/a | CSS |
| Stepper videos (4) | own domain `/landing/how-to/{idea,plan,refine,deliver}.mp4` | product proof | progressive MP4, 206 range requests, `cache-control: public, max-age=0` | 553x295 (643x343 when active) | 181, 288, 635, 1,397 KB files; only first ranges (177 KB total) before scroll | `preload=none`; JS plays the active one only | video |
| Stepper posters (4) | own domain `/_next/static/media/{idea,plan,refine,deliver}.*.webp` | poster | WebP 1440x767 | 553x295 | 20, 28, 53, 50 KB | `<video poster>`, SSR | image |
| Use-case tab cards (18 videos) | `cdn.pexo.ai/materials/<id>/covers/*.webp` and `home/create/covers/*.jpg` | tab content | WebP 2560x1440 (one measured, 69 KB) and JPG | 578x325 or 183x325 (about 4.4x oversized) | 8 JPG posters = 695 KB fetched by the parser before scroll; HLS attached lazily (1 playing at a time) | `preload=none` + poster | video |
| Phone-mock video | `cdn.pexo.ai/landing/post/nail/*.ts`, poster `nail.webp` (720x1280, 68 KB) | illustration (TikTok-style platform mock) | HLS | 255x573 | **3,178 KB of `.ts` fetched before scroll, though it sits at y=4,581 (five screens down)** | `autoplay`, `preload=metadata`, loaded eagerly | video |
| Social mock cards | `cdn.pexo.ai/landing/post/*.webp`, tiktok/x/instagram SVG chrome | illustration | WebP + 17 small SVG/PNG | 249x171 and similar | 26 to 207 KB | lazy | image |
| Capability icons | `cdn.pexo.ai/home/landing/icons/*.png` | icons | PNG, 13 files | 28 or 50 px | 1 to 3 KB each | lazy | image |
| Model-name tiles | own domain `model-*.svg` (hailuo, pika, midjourney, kling, gpt-image, veo, seedance, luma, minimax, runway) | third-party logos | SVG in `<img>` | 38x38 | pika 205 KB (!), luma 61, runway 60, minimax 47, kling 47; 32 SVGs = 527 KB after scroll | lazy | image |
| Avatars (6) | own domain `avatar-*.png` | review decoration | PNG | 60 to 64 px | small | lazy | image |
| Blog thumbs (5) | `cdn.pexo.ai/assets/cms/draft/...png` | content | PNG | 426x266 | not itemised | lazy | image |
| Fonts | own domain | text | 12 woff2 preloaded | n/a | 282 KB total (8 to 47 KB each) | `<link rel=preload>` in the Link header | font |

Everything is an image, a `<video>` or inline SVG. There is **no canvas, no WebGL context, no Lottie, no Rive, no model-viewer**.

## Motion inventory

Harness data: `animationsAtLoad: []`, `animationsAfterScroll`: 0 at all three stops, `animateCalls: 0`, `idleRafPerSecond: 30` (autoscroll + hls), `wheelProbe`: one 500 px wheel gave `finalScrollY 500`, `firstMoveMs 54`, `settle98Ms 54`, `distinctPositions 2` (an instant jump: native scrolling). IntersectionObservers 39, ResizeObservers 4, long tasks 0, CLS 0.0001. **The empty `animationsAtLoad` does not mean "no motion"**: nearly all motion is JS writing `scrollLeft` and `scrollTop`, which the harness cannot see as animations.

Own measurements (all in `scripts/`): `hero-motion.mjs` (rAF sampler every 50 ms from first paint, also with reduced motion), `stepper-probe.mjs`, `stepper-transition.mjs`, `scrolltop-series.mjs`, `hover-probe.mjs`, `menu-motion.mjs`, `scroll-linked.mjs`, `sections-survey.mjs`, `scroll-trace.mjs`, `scroll-clamp2.mjs`.

### Motion catalogue

| # | Motion | Trigger | Duration / easing | Property | Evidence and notes | Reduced motion |
|---|---|---|---|---|---|---|
| 1 | Hero tile strip auto-scroll | load | starts about 2.7 s after navigation start; **linear, about 120 px/s** (0 to 518 px in 4.18 s); wraps by moving one 524 px tile (512 + 12 gap) from front to back about every 4.2 s, so it is an endless marquee | JS writes `scrollLeft` of a native `overflow-x-auto overscroll-x-contain` container (not transform) | sampled in `hero-motion.out.json`; **pauses on hover** (0 px in 1.5 s hovered, 432 to 28 wrapped when not); **keeps running while scrolled 11,000 px away** (still moving at the FAQ) | stays at 0; tiles show posters, none play |
| 2 | Placeholder phrase rotation | load | whole-phrase swap every about 3.0 s (first swap at 5.7 s); six phrases seen in 17 s | text content; no opacity/transform change on the parent at 50 ms sampling, no typing effect | `hero-motion.out.json` | frozen on the first phrase |
| 3 | Header fill | scroll past about 20 px | 200 ms, `cubic-bezier(.4,0,.2,1)` | `background-color` transparent to `#f9f7f1` | `hover-probe.out.json` header-over-scroll; height stays 72 | not tested separately (colour only) |
| 4 | Back-to-top reveal | scroll | NOT measured (wrapper opacity 0 at 300, 1 at 1,000) | opacity | | NOT OBSERVED |
| 5 | Stepper pin | scroll 1,159 to 2,599 | pure CSS `position: sticky; top: 88px`; panel `calc(100svh - 112px)`, max 640 px, in a 2,080 px track = 480 px per step | n/a | `stepper-probe.out.json` | pin removed |
| 6 | Active step change | scroll crosses a 480 px step | text fill 150 ms; dot 18 to 28 px 300 ms (`transition-all`); **video frame width 553 to 643 px 700 ms `cubic-bezier(.4,0,.2,1)`** | `background-color`, width/size, width | read from computed `transition` | static 2x2 grid, no active state |
| 7 | Stepper video column slide | same | **about 700 ms ease-in-out, 270 to 325 px travel** (progress samples 0, .07, .16, .29, .42, .56, .70, .85, .94, .99), JS writes `scrollTop` on an `overflow-hidden` div every frame | `scrollTop` | `scrolltop-series.out.json` | none |
| 8 | Stepper video play | step becomes active | active video plays, others pause | `video.play()` | `currentTime` advancing only on the active video | all four paused on poster |
| 9 | Nav link hover | pointer | 200 ms `ease` | `opacity` 1 to 0.8 (`.nav-hover`) | | unchanged (CSS only) |
| 10 | CTA hover | pointer | 150 to 200 ms `cubic-bezier(.4,0,.2,1)` | `background-color` `#2a2923` to `#56584d` (class `hover:bg-[var(--landing-text)]`) | header button measured; `Start for Free` has the same class (computed diff came back empty in my run, so treated as same) | unchanged |
| 11 | Mega-menu open/close | hover on `Create` | **0 ms**: opacity 1, transform none, transition 0 s from the first frame; closes in under 120 ms | none | `menu-motion.mjs` | unchanged |
| 12 | Prompt focus | focus | no transition (`all 0s`) | border colour `transparent` to `#c6ccf5` | | unchanged |
| 13 | Tabs, card hover, FAQ | pointer | tab `transition: all 0s`; tile hover has no transform, filter or scale | none | | unchanged |
| 14 | Use-case and phone-mock videos | scroll into view (IO) | media playback only | `video.play()` | `sections-survey.out.json` (1 video playing in those sections) | NOT OBSERVED |

**What is STILL (and notable):** the h1, subhead, prompt box, header and tiles have **no entrance animation** (all computed `opacity: 1`, `transform: none` from the first sampled frame at 0.55 to 1.2 s; `desktop-1440-t1s.png` differs from `top.png` only in which tile and phrase is showing). No scroll-reveal fades or slides anywhere below the stepper: of the 21 elements on the page with a non-`none` transform (the rotated social cards), none changed across five scroll offsets in each of six sections. No parallax. No hover motion on cards. No ambient CSS animation (`document.getAnimations()` was empty at every stop). Reviews, capability cards, blog and FAQ are static.

**Scroll behaviour.** Native 1:1 (30 wheel ticks of 120 px = exactly +3,600 px; `html scroll-behavior: auto`, `overscroll-behavior: none`; no Lenis class or signature). **One intervention:** inside the pinned stepper, page JS (`84aedcfe47a8d8b1.js`) clamps the scroll position. It computes `progress = (88 - track.top) / 480`, limits it to previous progress plus or minus 1, and if the real position is further it calls `window.scrollTo({ top, behavior: "auto" })` on the next frame. Evidence: a programmatic `scrollTo(0, 2000)` from the top landed at 1,639 within 40 ms, and the trace logged the page's own `scrollTo` call. A `LANDING_BACK_TO_TOP_EVENT` listener switches the clamp off until the user wheels, touches or presses a pointer again (those events turn the bypass off). Effect for users: fast jumps (scrollbar drag, End, Space, find-in-page, anchor links) cannot skip a step. Easing/duration of JS-driven motion above is measured from samples; the underlying easing function name is NOT OBSERVED.

**Motion moments vs HELIX budget.** Pexo has three deliberate JS motion moments (tile strip, placeholder swap, stepper) plus colour/opacity hovers. HELIX allows two per page.

## Performance (measured)

Harness (`probe.json`, about 4 s window) and own runs; **Lighthouse not run here**.

- Load event 2,950 ms desktop, 2,325 ms mobile (harness). LCP desktop: a `<video>` tile (512x288 area; its poster is the travel-plan cover WebP), 3,424 ms. LCP mobile: the H1, 1,256 ms. CLS 0.0001 and 0.0005; long tasks 0.
- Harness first-load transfer: **17.48 MB, 152 requests**; after scrolling the page: 28.59 MB, 268 requests. Mobile: 11.87 MB first load, 19.93 MB after scroll.
- My run at 4.5 s: 15.5 MB, 159 requests. A later 6 s window measured 23.9 MB total. **The total depends on the observation window**, because hls.js keeps fetching whole clips.
- **Why it is about 17 MB (desktop, first load):**
  1. **HLS `.ts` segments, 10.8 MB (about 70 percent of my 4.5 s run).** Each tile or video is one 1080p, 5.84 Mbps rendition with no lower-quality ladder, so a 512x288 tile downloads full 1080p. 7.6 MB of it is the three autoplaying hero tiles (Logo-Dance 1.8, Outrank 3.2, travel-plan 2.6 MB). **3.2 MB is a phone-mock video five screens below the fold** (`landing/post/nail`, `autoplay` attribute, `preload=metadata`).
  2. Images 3.3 MB: 15 hero posters 1,533 KB at 1920x1080 for 512x288 tiles (3.75x oversized), 8 JPG posters for hidden tab cards 695 KB, the rest small.
  3. JS 1.05 MB transfer (about 0.69 MB first-party in 36 files, about 0.34 MB third-party), fonts 0.28 MB (12 files, one family in use), CSS 0.06 MB (0.40 MB raw plus 28 KB inline), HTML 79 KB gzip (331 KB raw, inlined RSC payload).
- Under reduced motion total falls to 7.9 MB (no hero HLS), but the 3.2 MB phone-mock segments still load.
- Response headers: HTML `cache-control: private, no-cache, no-store`, `server: nginx/1.31.6`, `via: 1.1 google`, HTTP/2, gzip, sets a locale cookie (`pexo-public-locale`), `x-middleware-rewrite: /en`. Media CDN is Alibaba Cloud OSS (`x-oss-*`, Tengine) with one-year immutable caching on images.

## Accessibility spot checks (automated axe not run this round; manual and computed)

- `lang="en"`, `dir="ltr"`; landmarks: header 1, nav 2, main 1, footer 1; h1 1; heading order h1, h2, h3 is sequential.
- **No visible keyboard focus ring** on nav links or header controls: `outline-style: none` with `:focus-visible` matching; `scripts/focus-nav.png` shows no ring. The prompt box shows a 4 px `#c6ccf5` border on focus instead (1.57:1 against white, so a weak indicator).
- No skip link: the first focusable is the logo link.
- All CTAs are `<button type="button">` (header, mid-page, closing). With JS off they do nothing (no `href`, no `<noscript>`). Mega-menu triggers are buttons.
- Stepper: no `role=tab`/`aria-selected`/`aria-current` (0 matches); steps are buttons whose active state is visual only. Videos carry `aria-label`s (step titles, use-case names). Pointer-events are off on the video column.
- Target sizes: header and menu items 40 px tall; mobile `Get Started` 106x40; below the 44 px guidance but above the 24 px WCAG 2.2 minimum.
- Contrast: see Colour system (muted `#a8a99d` 2.2:1; footer links 4.48:1).
- Native `<details>` FAQ (keyboard operable without JS); the first row is `open` in the HTML.
- Scroll guard in the stepper (above) can affect keyboard and assistive paging; not tested with a screen reader.
- Reduced motion is honoured in JS (strip, placeholder, stepper layout, hero video loading) and CSS (3 `prefers-reduced-motion` blocks).

## Structured data and meta

- Title: "Pexo: AI Video Agent for Effortless Video Creation" (52 chars). Description present (162 chars). Canonical `https://pexo.ai`. `robots: index, follow`. Viewport includes `viewport-fit=cover`.
- OG: title, description, url, site name, locale, `og-image.png` 1200x630 with alt, type website. Twitter card `summary_large_image`, site and creator `@Pexo`.
- JSON-LD: 2 `<script>` tags, 3 types: **Organization** (with `sameAs` to six social profiles, logo), **WebSite**, **SoftwareApplication with `offers`** (990 bytes of JSON in total). The harness reported `jsonLd: [[]]`, which is wrong (see contradictions).
- hreflang alternates for six locales plus x-default; locale cookie plus middleware rewrite.
- No Product/Review/AggregateRating markup despite a review section.

## Premium and trust signals

### What makes it feel premium (device, evidence)

1. **A tokenised, single-family type system with a quiet scale.** One family, two weights (400 x61, 500 x91), six authored sizes that equal the `--landing-font-*` tokens exactly, no tracking games, warm ink `#2a2923` on paper `#f9f7f1` at 13.6:1. The page reads as one hand even across 10 sections.
2. **Output-as-hero in a bleeding tray.** 15 real 16:9 tiles, white 20 px-radius tray, 12 px gaps, cropped by both viewport edges so the strip reads as continuing, moving at a calm 120 px/s and stopping on hover. Combined with a prompt line that swaps use cases every 3 s, the input-to-output loop is shown inside 900 px (compare `t1s` and `top` frames).
3. **One dark stage on a paper page.** The pinned black panel (16 px radius, 42/58 grid, rail with four pastel gradient dots, active dot grows 18 to 28 px and carries a soft glow) is the only dark surface; step change is coordinated across four properties on a shared 150 to 700 ms Tailwind curve, and the reduced-motion/no-JS fallback is a complete 2x2 layout rather than a broken pin.
4. **Real product recordings, not icons.** The four step videos are captured UI (typed prompt, plan checklist, comment-on-frame edit), framed identically.
5. **Restraint on chrome.** Header has no blur, border or shadow; one button style repeated; hairline FAQ; only 24 shadowed elements, mostly soft; radii limited to six values.

### What is generic (device, evidence)

1. **AI-landing template.** Centred greeting, oversized prompt box, pastel vignette, gradient-filled keyword, friendly first-person voice; interchangeable with many assistants.
2. **Borrowed credibility.** Five third-party model names (Seedance, Happy Horse, GPT-Image, Nano Banana, Kling) as tiles, ten model SVGs, and an "Ask AI about Pexo" row of competitor assistants in the footer.
3. **Soft social proof.** A "thousands of friends" line over three unnamed quote bubbles with avatars; no names, roles, companies or figures. Zero trust signals in the first two screens.
4. **SEO/GEO-shaped copy.** Keyword headings ("Gets It Done"), 18 use-case labels, five blog cards titled as "alternatives 2026" comparisons.
5. **Weight and craft gaps.** 15 to 24 MB of video on one page, 1080p for 512 px tiles, a below-the-fold video loading at once, Fabric.js shipped to a page with no canvas, no focus ring, dead-without-JS buttons, a transparent header that overlaps content with JS off.

## Replicable by HELIX under the truth rules?

HELIX rules applied: light only, flat, no client logos, no invented metrics/features/customers, product proof only from the real operator console (or a frame labelled "Illustrative interface. Sample data."), at most two motion moments, transform/opacity only, reduced-motion respected, readable with JS off, no animation library above the fold.

| Pexo pattern | HELIX-truthful equivalent | Verdict |
|---|---|---|
| Input-first hero (prompt box is the CTA) | None. HELIX has no end-user prompt. Use one explicit primary button (`Request a demo` style) plus an entity line. A tracking-number box would imply a live feature not confirmed (Q-05). | Do not copy |
| Rotating placeholder phrases | None needed; a static line stating one operator task. | Do not copy |
| Autoplaying tile strip (marquee) | A **static** row of three or four labelled illustrative console frames (NDR queue, COD reconciliation, rate card, AWB search) until real captures exist (Q-13). No autoscroll, no video. | Pattern only, static |
| Pinned four-step stage with active-step state | The structure is valuable: four numbered operator steps with one framed UI that changes. Build it as a **stacked 2x2 or vertical stepper by default** (this is exactly what Pexo falls back to), optionally with `position: sticky` and a transform/opacity swap as the single motion moment. A light neutral stage (hairline-bordered) instead of black; no glow dot. | Adopt structure, not the dark stage or JS tween |
| Use-case tabs (MG Explainer, Launch...) | Audience tabs: courier, 3PL, freight broker. Make them real tabs with ARIA and a no-JS stacked fallback. Content only from claim IDs. | Adopt |
| 4x2 capability cards (icon, 22 px title, one-line outcome) | Capability -> Operator outcome cards from the claim register; own line icons; 8 px radius; hairline, no shadow. | Adopt |
| Model/partner logo tiles | None. No client logos; carrier or integration names only if confirmed and permitted (`{{CONFIRM}}`). | Do not copy |
| Testimonial bubbles, "thousands trust" | None until named, permissioned quotes exist; never unnamed. | Do not copy |
| Token layer (`--landing-*`), 6-step type scale, 2 weights, warm ink on paper | Fits the flat light rule; HELIX already locks Geist. Keep the discipline (tokens equal computed values, tone-based hierarchy). Palette is a Spec decision (Q-12). | Adopt discipline |
| Header: transparent to solid on scroll | Solid 64 px header from the first paint; no colour transition needed (colour is outside the transform/opacity rule). | Simplify |
| Hover: colour shift on CTA, opacity 0.8 on nav links | Opacity-only hover on links (allowed); CTA hover by opacity or none. | Adopt opacity only |
| Native `<details>` FAQ | Same; works with JS off. | Adopt |
| Footer card + link columns | Same pattern; drop "Ask AI about" and Google-source widgets. | Adopt |
| Gradient keyword, pastel wash, glow dot | Banned (gradient, glow). Use tone (ink vs secondary) for emphasis, as eden does. | Do not copy |
| Structured data (Organization, WebSite, SoftwareApplication) | Organization + WebSite + SoftwareApplication, with `offers` only once pricing is confirmed. | Adopt |
| Poster-first media with `preload=none` | Use only for real recordings; one rendition ladder, small posters sized to the slot; nothing below the fold loads early. | Adopt the idea |

## Tech fingerprint (feeds TECH_FINGERPRINT.md)

Evidence rule applied: a library is listed only with a named file, string, global, class or observed behaviour.

| Question | Verdict | Evidence |
|---|---|---|
| Smooth-scroll library (Lenis, Locomotive, ScrollSmoother) | **NOT DETECTED** | No signature in the six chunks I fetched and string-searched (`d9ee965bc91daa52`, `faea5ac1feef4cf9`, `4bae259acf05e5ba`, `1c87a046726b0c2a`, `447cd2625c93b87f`, `84aedcfe47a8d8b1`) or in the harness's 49 scanned scripts; no lenis class on `<html>`; observed wheel scroll is 1:1 and instant. "Not detected" is not "absent" for scripts I did not read. |
| GSAP / ScrollTrigger | **NOT DETECTED** | Same searches; no `window.gsap`; harness `fp.present` lists only `__next_f, gtag, dataLayer, clarity`. |
| Motion (framer-motion) | **Present in the bundle; use on the home page NOT CONFIRMED** | `d9ee965bc91daa52.js` (46 KB gz) contains `MotionConfigContext`, `reducedMotionConfig`, `PresenceContext`, `LayoutGroupContext`, `SwitchLayoutGroupContext`. `Element.prototype.animate` was never called (`animateCalls: 0`), and no inline motion transforms were seen, so visible motion is not Motion-driven as far as I can see. |
| Lottie / Rive / three / OGL / Spline / model-viewer | **NOT DETECTED** | DOM counts 0 for lottie, rive, spline, modelViewer; 0 `<canvas>`; `canvasContexts: []`; no `WebGLRenderer`/`THREE.` strings. |
| Fabric.js (canvas editor library) | **Present, unused on this page** | `faea5ac1feef4cf9.js` (107 KB gz, 358 KB raw): `fabricCanvasRef`, `useEditorStore`, `console[t]("fabric", ...)`, a WebGL filter backend (`WebGLProbe`, `createShader`). 0 canvases created. This chunk is the source of the harness's `webgl`, `shader` and `splitting` hits (`_splitText()` is Fabric's text-object method, not SplitText). |
| hls.js | **Present and used** | `4bae259acf05e5ba.js` (155 KB gz, 528 KB raw): `hlsMediaAttached`, `hlsManifestLoaded`, `hlsFragLoaded`, `capLevelToPlayerSize`, `maxBufferLength`, `#EXTM3U`; runtime: `.m3u8` and `.ts` requested with `initiator: script`, `blob:` video sources. |
| WebGL canvases | **None** | 0 canvases; Fabric's probe never created a context. |
| Native CSS scroll-driven animations (`animation-timeline`, `view-timeline`) | **NOT DETECTED** | 0 matches in the three CSS files (401 KB raw linked plus 28 KB inline) and in all fetched JS. The harness's `scrollTimelineJS` hit is Motion's `window.ScrollTimeline` feature test (`tQ(()=>void 0!==window.ScrollTimeline,"scrollTimeline")`), not authored scroll-driven CSS. |
| View Transitions | **NOT DETECTED** | No `startViewTransition` or `view-transition` string in CSS or the fetched chunks. |
| `@property` | Present, **Tailwind-generated** | 93 matches are `--tw-*` registrations (e.g. `@property --tw-scroll-snap-strictness`), not authored animatable properties. |
| `<video>` backgrounds | **Yes, central** | 23 `<video>` in the server HTML, 38 in the DOM; muted loop playsinline, `preload=none`; HLS through hls.js. |
| CSS scroll-snap | Declared, **unused** | The harness's `scroll-snap-type: 1` is the Tailwind `.snap-x` utility; no element has a computed scroll-snap type or align. |
| Scroll position intervention | **Yes (one)** | Chunk `84aedcfe47a8d8b1.js` calls `window.scrollTo({top, behavior:"auto"})` to clamp stepper progress to one 480 px step per update (see Motion inventory). |
| Framework | **Next.js App Router, Turbopack build, React Server Components streaming** | Hash-only chunk names plus `turbopack-9068d907ff517f6f.js`; global `__next_f`; `vary: rsc, next-router-state-tree, next-router-prefetch`; `x-middleware-rewrite: /en`; `<div hidden id="S:0">` Suspense blocks with `$RC`; `data-build-id` on `<html>`. Version NOT determined. |
| CSS | **Tailwind CSS v4 plus CSS Modules** | `@layer properties`, `@property --tw-*`, `linear-gradient(... in oklab)`, 512 `color-mix(` and 68 `lab(` occurrences; module classes `hero-section-module__TWvc-a__hero` and `how-to-section-module__Hpxu5a__track`. |
| Other first-party libraries | Firebase, Google Identity Services | `447cd2625c93b87f.js` (45 `firebase` strings; `firebaseinstallations.googleapis.com` and `firebase.googleapis.com` requests); `accounts.google.com/gsi/client` (100 KB) and FedCM request. |
| Third parties | 5 | Google Tag Manager `gtag/js?id=G-EYQFTYMSGT` (173 KB), Google Identity (100 KB), Google News "Subscribe with Google" publisher.js (39 KB), Microsoft Clarity `0.8.72-beta` (26 KB; session replay), Rewardful `r.wdfl.co/rw.js` (calls `api.getrewardful.com`). |
| JS on first load | 1,053,995 B transfer (harness, 25 listed scripts); my run 687 KB first-party in 36 files plus 342 KB third-party | `transferFirstLoad.byType.Script` |
| CSS on first load | 62,133 B transfer in 3 linked files (56 KB main) | raw 401,784 B linked plus 27,787 B inline |
| Fonts | 288,293 B, 12 woff2 | one family used |
| Requests | 152 first load (harness), 268 after scroll | |

## With JS off and with reduced motion

**JS off** (`desktop-1440-nojs.png`, plus `scripts/nojs-1.png`, `nojs-2.png`, `nojs-3.png`):
- Survives: header and nav (anchor items `AI Video Agent`, `CLI/MCP`, `Pricing` work; menu triggers and `Get Started` are inert buttons), h1, subhead, prompt box with its server-rendered placeholder phrase, hero wash, the stepper section as a **2x2 grid with native video controls and posters** (573 characters, 0 hidden characters), the closing band and the footer (851 characters).
- Missing: the 15-tile strip is not in the DOM at all (blank band below the prompt box, y 586 to 874); the prompt box does nothing.
- **Collapsed content:** page height drops from 13,258 px to 4,476 px. Everything from the use-case tabs to the FAQ (about 5.5K characters: use cases, capabilities, models, "gets it done", reviews, blog, FAQ) is in the HTML bytes but inside `<div hidden id="S:n">` Suspense blocks that only the inline `$RC` swap script reveals, so it is not displayed.
- Bug: the header stays transparent without JS, so section headings scroll underneath nav text and overlap it (`nojs-2.png`).
- Harness `noJs.visibleChars: 1,834` (first viewport text) agrees; the harness screenshot is only the top 900 px, so it does not show the collapse.

**Reduced motion** (`desktop-1440-reduced-motion-top.png`, `mobile-390-reduced-motion-top.png`, `hero-motion.reduced.out.json`, `stepper-rm-*.png`):
- Survives: all text and layout; hero tiles as static posters (0 playing, hls.js not attached to hero tiles); placeholder frozen on its first phrase; stepper becomes the same 2x2 static grid (950 px panel, no pin, no tween, no active state, all videos paused).
- Still happens: the phone-mock video's 3.2 MB still downloads; hover colour/opacity transitions remain; the header fill transition remains.
- Harness `reducedMotion: animationsAfterReload 0, infinite 0` is correct but misses the JS motion above.
- Note: `desktop-1440-reduced-motion-top.png` is **not at scroll 0** (it shows the stepper region), see contradictions.

## Probe vs screenshot and own-measurement contradictions

1. `dom.jsonLd: [[]]` is wrong. The page has 3 schema.org types in 2 script tags (array-wrapped JSON); the harness parsed the wrapper as empty.
2. `desktop-1440-reduced-motion-top.png` is not at the top: after the reload it kept the previous scroll position and shows the stepper (the mobile equivalent is at the top). Use `scripts/stepper-rm-*.png` and `hero-motion.reduced.out.json` for reduced motion instead.
3. `cssFeatures`: `scroll-snap-type: 1`, `@property: 93`, `backdrop-filter: 32` are mostly unused or generated utilities (Tailwind), not authored features. No element uses scroll snap; only 1 element uses `backdrop-filter`.
4. `scriptSignatures`: `scrollTimelineJS` is Motion's `window.ScrollTimeline` feature test; `splitting`, `webgl`, `shader` are all inside the Fabric.js chunk (`_splitText()`, WebGL filter backend). None of them indicates a scroll-driven, text-splitting or WebGL effect on this page. `framerMotion` is real but its use on the home page is not confirmed.
5. `animationsAtLoad: []` and `animationsAfterScroll: 0` do not mean the page is still: the strip and the stepper are JS-driven (`scrollLeft`, `scrollTop`).
6. `transferFirstLoad` (17.5 MB) is a snapshot at about 4 s of an ongoing HLS download (my 4.5 s run: 15.5 MB; 6 s run: 23.9 MB). Quote it as "about 15 to 24 MB depending on the window".
7. `dom.els.video[].autoplay: false` for most tiles reflects the attribute at capture time; three tiles were actually playing.
8. `dom.header.links` lists `Get Started` twice (desktop and mobile variants of the same button).
9. `wheelProbe` correctly shows native scrolling at the top of the page but cannot see the scroll clamp inside the stepper (only visible with a large programmatic jump).
10. Harness `idleRafPerSecond: 30` is driven by the strip's autoscroll and hls.js, not by an animation library.

## What not to borrow

The prompt-box hero (HELIX has no end-user prompt), rotating placeholder, gradient-filled word, pastel/periwinkle vignette, black stage and glow dot (dark surface, glow), autoplaying video tiles and any HLS video (weight), unnamed testimonial bubbles and a "thousands trust" line, third-party model/partner logo tiles, "Ask AI about" competitor buttons, SEO keyword headings, a transparent header that depends on JS, buttons used as links (no `href`), `outline: none` without a replacement focus style, hidden Suspense content with JS off, scroll-position clamping, Fabric.js or any unused editor library on a marketing page.

## NOT OBSERVED

- Tab switching in "One agent for every kind of video" and any hover/click on the tiles beyond hover (not clicked; no data was sent).
- Back-to-top reveal threshold and its transition; FAQ open/close animation; the mobile hamburger panel animation (only the open frame in `mobile-390-nav-open.png`).
- Eyebrow letter-spacing (computed value not trusted); exact pixel colour of the hero wash at the corners; exact tints of the "gets it done" cards.
- Easing function names of the JS tweens (only sampled curves).
- Pricing, `/video-agent`, `/create/*`, blog and other pages; what the `Get Started` and prompt submit do (not clicked); the Google One Tap/FedCM prompt for signed-in Google users.
- 1024 px layout; real-device behaviour; Safari/Firefox rendering; slow-network behaviour of hls.js.
- Automated axe results; screen-reader behaviour of the stepper and mega-menu.
- Whether Motion (framer-motion) renders any component on this page.

## Files

Harness: `probe.json`, `desktop-1440-{t1s,top,screen2,mid,footer,nav-scrolled,nav-open,reduced-motion-top,nojs}.png`, `mobile-390-{t1s,top,screen2,mid,footer,nav-scrolled,nav-open,reduced-motion-top}.png`.
Own evidence in `scripts/`: probe scripts (`*.mjs`) with outputs (`*.out.json`); screenshots `stepper-{900,1500,2100,2700}.png`, `stepper-rm-*.png`, `deep-{tabs,social,more,models,reviews2,blog,faq}.png`, `nojs-{1,2,3}.png`, `hover-create-menu.png`, `focus-nav.png`, `focus-prompt.png`.
