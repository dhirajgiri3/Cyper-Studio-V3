# Observation card: legora

| Field | Value |
|---|---|
| URL | https://legora.com/ (home page only) |
| Role | New reference, Brief 01 v2.1 |
| Date | 2026-10-08 |
| Viewports | 1440x900 (all probes), 390x844 (harness frames, menu tap at DPR 1), 1920x1080 (one container check) |
| Tool | playwright-core 1.64 + Google Chrome 154.0.8037.98 (headless, unthrottled); harness `probe.json` plus my scripts in `scripts/` (results in `scripts/results/`). Lighthouse and axe NOT RUN (by instruction). |
| Personality in three words | cinematic, restrained, glassy |
| HTTP status | 200, h2, brotli, `server: Framer/26fa766` |
| Blocked? | No. No bot wall. A Cookiebot script loads but no consent banner was shown from this region (`server-timing` says country IN; `consent: []` in probe). EU banner behaviour NOT OBSERVED. |

Evidence tags: `[probe]` = `probe.json`; `[s1]`..`[s7]` = `scripts/results/sN-*.json`; image names are files in this folder. The harness captures were taken at different moments from my scripts, so video frames differ between them (the hero video is a 29.5 s montage).

## Hero pattern

- Composition: 1440x900 (100vh) full-bleed muted looping video behind everything. A 44px dark-green announcement bar and a 72px transparent header (nav left, centred wordmark, "Log in" + pill CTA right) sit on top. One headline, one subhead and one pill CTA are anchored in the lowest 180px (H1 from y about 722, sub + CTA row to y about 840), centred, with the sub and CTA on one row. Everything above them is footage. [desktop-1440-top.png, desktop-1440-t1s.png]
- Plain text in the first viewport (server HTML): announcement text + link, 5 nav labels, "Log in", "Book a demo" x2, the H1 ("Legal work, without limits.") and subhead ("Collaborative AI for exceptional lawyers"). That is the whole text budget: 11 distinct strings. [probe `noJs.firstViewportText`]
- Stated only in imagery: what the product does. The footage (dusk skyline, a silhouette at a window with a laptop, a macro shot of a search field typing a file-renaming request, pedestrian shadows) never shows the product UI. [obs-load-sequence.jpg] The subhead names category and audience (collaborative AI, lawyers) but no task. Task verbs (review, research, draft) are in the meta description; on the page the first statement of what the product does is the "agentic operating system" line on screen 2.
- CTA count and hierarchy: 2 filled green pills, both "Book a demo" to `./book-a-demo`, identical component (128x30 px, radius 48px, white arrow in a circle). Header CTA and hero CTA are the same weight; the hero one is not larger. Secondary: announcement "Learn more" (to `./product/skills`) and plain-text "Log in". Mobile: header shows only Menu / wordmark / Log in; the demo CTA appears in the hero (133x30) and inside the menu panel. [probe `dom.ctas`, `mobile.dom.ctas`, obs-mobile-menu-open.png]
- Trust signals in the first two screens: one "Trusted by" label with a greyscale marquee of ten law-firm and enterprise logos (nine fully visible at 1440), starting 30px below the fold (page y 930-1020). No numbers, certifications, quotes or awards. Those arrive 8 to 11 screens down (stats at y 9,743, founder at 10,483, security band with five certification badges at 11,328). [s4 `sections`, obs-scroll-sheet-2.jpg]
- Harness note: `desktop-1440-screen2.png` was taken at scrollY 900, where the sticky header covers the logo row, so the harness frame does not show it. [obs-logos-ticker.png shows it]
- Legibility depends on the frame: white H1 over the pale macro scene has a side-background contrast of 2.78:1 at 1440 and about 1.7:1 on the 390 harness frame (sampled from `desktop-1440-top.png`, `mobile-390-top.png`; one frame each). During the skyline scene it is above 20:1. The scrim (below) is the only control.

## Type system

(Covers the "Typography" item.)

- Families by share of visible text: `CUSTOMV2;Aktiv Grotesk VF Variable Regular` (4,517 chars) and its metric-matched placeholder fallback (84). One face for the whole page. [probe `fontShare`]
- Loaded font files: exactly one, `tdJon95dAbkVwAbKotlHOrttLPc.woff2`, 589,088 B (variable). Other declared faces (Playfair Display, Fragment Mono, Geist Mono, Kalam) are `unloaded` and unused on the home page. No font preload link in the head. [s4 `fontFiles`, `fontFaces`; `home.html` head]
- Weight is set by the variable axis, never `font-weight`: `"wght" 450` on headings, `440` on body and UI, `300` on stat numerals, `400` on the micro label. `font-weight` computes to 400 (300 on numerals). Nothing is bold. [s4 `type`]
- All text carries `font-feature-settings: "blwf","cv03","cv04","cv09","cv11"` (stylistic character variants on). `font-variant-numeric` is `normal` (no tabular figures), including the count-up numerals.
- Scale (1440 desktop), size / line-height / letter-spacing:

| Role | Size | Line height | Tracking | Notes |
|---|---|---|---|---|
| H1 | 56.25px | 59.06px (1.05) | -2.25px (-0.04em) | wght 450, white, centred, `text-wrap: balance`. 60px / -2.4px at 1920; 41.14px / 43.2px / -1.646px at 390. [probe, s5 `wide1920`] |
| H3 section title (the page has no H2) | 41.25px | 43.31px (1.05) | -1.237px (-0.03em) | wght 450; centred in two sections, left in one |
| H4 band title | 33.75px | 40.5px (1.2) | -0.675px (-0.02em) | wght 450; `balance` in the security band |
| Stat numerals | 90px | 90px (1.0) | -2.7px (-0.03em) | wght 300, ink; digits only, "%" unit [s5 `statType`] |
| Body | 15px | 21px (1.4) | normal | wght 440; secondary text #68655E, headline-adjacent sub in white on video |
| UI / small | 13.2px | 18.48px (1.4) | normal | nav, CTA label, pills, card body, "Read more", footer links |
| Micro | 12px | 16.8px (1.4) | normal | "Trusted by" label |

- The scale has no steps between 15px and 33.75px: two tiers (UI text 12-15px, display 34-90px). Sizes divide evenly by 0.75 (75, 55, 45, 20, 17.6, 16), which suggests the design was authored at a larger base and scaled; this is an inference, not an observation.
- Line breaks: H1 and one H4 use `balance`; the "Every team. / Every practice." title is two deliberate lines; sub copy is held to about 460px (aOS sub) and about 440px (carousel sub), centred. Card body is 324px.
- No display or accent face, no italics, no serif in text. The only flourish is the SVG wordmark (header 89x17, footer about 485x95 in green). Numbers are set large, light and tight, not in a mono.

## Colour system

- Backgrounds by area: `#FAFAF9` page (by far the largest area); `#E6E6E6` the pinned aOS stage (1440x900); `#E1DFDA` warm stone band (1440x845, the "Our Vision" block); `#0D1016` ink-navy band (1440x757, the security block); `#003D26` deep green CTA panel; `#005032` brand green (announcement bar, CTA pills, footer type). [s4 `census.bg`]
- Text: `#0D1016` ink on light; `#FFFFFF` on video and dark band; `#68655E` warm grey for secondary copy (1,535 chars, the most used text colour); `#343434` (749 chars, role not determined); `#E6E6E6` on the dark band; `#005032` on footer links (473 chars). [s4 `census.tx`]
- Accent usage: one hue, forest green `#005032`. Allowed on: announcement bar fill, filled CTA pills (hover `#003D26`), all footer links and the footer wordmark, the CTA panel. Not used on body links, headings, icons or numerals inside content. [s3 hover, s4 census]
- Borders: none of consequence (census found one default `2px inset` and nothing else). Shadows: none. Separation is by whitespace and flat tone bands. Mobile menu rows and the mobile footer accordions use 1px divider lines (seen in screenshots; widths not measured).
- Gradients (12 computed), all legibility scrims, none decorative: hero scrim, four stops, `rgba(0,0,0,.5) 0% -> .1 13% -> .1 72% -> .5 100%`, over 1440x900; two 90x90 marquee edge fades (transparent to `#FAFAF9` at 74%); a label scrim on each practice-area photo (`rgba(0,0,0,.4) -> rgba(67,81,112,.2) at 15% -> 0`, 7 instances); a case-study scrim (`.6 -> 0` at 75%); one all-transparent no-op on the header wrapper. [s4 `census.grads`]
- Backdrop blur (8 elements): seven aOS stage pills with `blur(27.5px)` over `rgba(0,0,0,.5)`; one `blur(10px)` pill over `rgba(0,0,0,.4)`. The mobile menu panel is also blurred over the video (visible in screenshot; computed value not read). [s4 `census.bf`]
- Noise, grain, glow, blobs: NOT DETECTED (no noise image, 0 SVG filters, 0 `filter`). All atmosphere comes from the footage and the 3D render, not from CSS.
- Dark mode: none (`color-scheme` normal, 0 `prefers-color-scheme` rules; only the favicon has a dark variant). [s4 `css`]
- Radii: 48px (CTA pills, 15), 99/999px (small pills), 24px (7, cards/panel), 32px, 16px top corners (nav hit areas, 6), 5px, 2px. [s4 `census.rad`]

## Layout and rhythm

- Container: sections are full-bleed; content is inset 24px at 1440 (nav starts at x=24, four cards of 324px + 3 gaps of 32px = 1392px). At 1920 the nav starts at x=105, so content max width is roughly 1710px (single measurement). [s4, s5 `wide1920`]
- Grid: centred single-column title blocks, a 4-up card row, a centred-focus carousel (centre card 390x487, side cards 209x261), a left H4 (689px) with two right text columns in the stone band. A 12-column grid is not detectable from computed styles.
- Section heights at 1440 (page y start / height): hero 0 / 900; "Trusted by" marquee row 930 / 90, then a 200px gap; aOS 1,220 / 5,394 (of which the stage is pinned for about 4,068px of scroll); "Our latest innovations" 6,614 / 1,089; "Every team" 7,703 / 1,140; case study 8,843 / 900; stats 9,743 / 740; vision 10,483 / 845; security 11,328 / 757; then CTA panel and footer. Page height 13,917px (about 15.5 screens). [s4 `sections`]
- Vertical rhythm: titles sit about 30px inside their section; blocks are separated by 200-290px of empty space (for example the gap between the "Read more" row and the next title in `desktop-1440-mid.png`). Cards: title to body about 24px, body to "Read more" about 24px (from element tops in `s4 type`).
- Density: very low. About 4,920 visible characters on the whole page; headlines are 3-6 words; no paragraph over 4 lines. [probe `visibleChars`]
- Mobile 390: single column; no horizontal scroll [probe `hasHScroll false`]; H1 two lines; the aOS pill list becomes a horizontal pill row; the footer becomes seven accordions (Product, Solutions, Certified, Company, Legal, Resources, Social). [mobile-390-*.png]

## Components

- Fixed header stack: announcement bar 44px + header 72px = 116px, both `position: fixed`, never hide on scroll down or up. Transparent with white text over the hero; once scrollY passes about 205 it flips to opaque `#FAFAF9` with `#0D1016` text (downward crossing measured; the reverse crossing was not tested). Nav: Product, Solutions, Security, Customers, Company; "Product", "Solutions", "Company" and "Log in" are anchors with no `href` (hover/JS dropdown triggers). [s3 `headerThreshold`, `home.html`]
- CTA pill: 128x30, radius 48px, `#005032`, white 13.2px label, a white circle with an arrow at the right. Hover: `#003D26` only. [s3]
- Announcement link: "Introducing ..." + "Learn more" + arrow, 13.2px; hover opacity 0.6 to 0.8.
- Nav hover: a rounded pill (`rgba(0,0,0,.4)`, radius 32px) appears behind the label and a dropdown panel opens beneath (seen at 1440 only for "Solutions"). [obs-hover-nav-light.png]
- aOS stage pills (7): about 137-191px wide and 36-40px high, `blur(27.5px)` glass, "+" glyph; the active one expands to about 480x127px with a description. Pills are `<a href="./#aosN">` anchors.
- Product cards (4): media 324x405, title 15px, body 13.2px, "arrow + Read more" link in warm grey; hover scales the media 1.025.
- Marquee: 10 greyscale logos (nine at 76x20, one at 56x30), set duplicated for the loop (20 nodes), "Trusted by" label at left, edge fades.
- Carousel: centre-focus photo cards, 24px circular arrow buttons, segmented pagination pill with the active segment as a progress bar, practice labels over photos. [obs-carousel-t0.jpg, obs-carousel-t6s.jpg]
- Stats: 90px light numerals with a small caption at right and a hairline; founder block with portrait, name, title and a signature image; five 48px certification badges in the dark band; green CTA panel with a line illustration; footer with four link columns, a 485px green wordmark and a legal row.
- Mobile menu: tap "Menu" opens a blurred translucent panel over the page with a "Close" tab, five rows with 1px dividers and "▼" disclosures on three, and a full-width "Book a demo" pill. The page behind still scrolls (wheel moved scrollY 0 to 300 with the menu open). [s6, obs-mobile-menu-open.png]
- Counts [probe]: 12 gradients, 8 backdrop-filter, 3 video, 0 canvas, 5 inline `svg`, 40 `img`, 0 forms, 0 tables, 72 links in the hydrated DOM (82 `a[href]` in the raw HTML), 3 iframes (not inspected).

## Product UI treatment

- First two screens: no product UI. Screen 2 is a conceptual 3D render of translucent glass layers labelled with seven platform layers (models, harness, data, knowledge, capabilities, interfaces, security), scrubbed by scroll. [obs-scroll-sheet-1.jpg]
- Product UI appears only inside four "Our latest innovations" cards at y about 6,900, as cropped, edge-faded slices (a topics list with country flags, a task table with ID, status and title columns, app icons around a star). Whether those rows are real or sample data cannot be told from the page. No labelled "illustrative" frame was observed. [desktop-1440-mid.png]
- Practice-area carousel uses architectural and interior photography (building facades, offices). Not UI.

## Asset inventory

Origin for every row except the HTML is `framerusercontent.com` (Framer's CDN, a different domain from legora.com). Bytes are `encodedBodySize` from Resource Timing unless noted; video sizes are the full file size from a 1-byte range request. "Rendered" is CSS px at 1440 DPR 1. [s4 `assets`, `firstLoadResources`; `home.html`]

| Asset | Role | Format | Rendered / natural | Bytes | Loading | Kind |
|---|---|---|---|---|---|---|
| Hero video `xQGt...mp4` | hero background loop, 29.52 s | MP4 | 1440x900 cover / 1920x1080 | 65,919,232 | SSR `preload="none"` + poster; JS sets `preload=auto`, plays at about 3.1 s after navigation; 16.7 s of it was buffered 9 s in (about 37 MB if bitrate is constant: estimate) | video |
| Hero poster `sGI6...webp` | pre-JS hero frame | WebP | 1440x900 / 2400x1350 | 102,281 | `poster` attribute, fetched with the document | image (poster) |
| Hero scrim | legibility | CSS gradient | 1440x900 | 0 | n/a | CSS |
| Wordmark (header) | logo | inline SVG | 89x17 | in HTML | eager | SVG |
| Marquee logos (10 unique, 20 nodes) | trust logos | 9 PNG + 1 SVG | 76x20 (Salesforce-style mark 56x30) / 125-308px wide | 2.0-4.0 KB each (about 27 KB for the 10) | `loading="lazy"`, no `fetchpriority`, `alt=""` | img |
| aOS stage video `HoYj...mp4` | scroll-scrubbed 3D render, 11.03 s | MP4 | 1440x900 pinned / 1920x1245 | 8,914,526 | `preload=auto`, no autoplay, empty `poster`; first request is a tail range at byte 8,880,128 | video |
| aOS pills (7) | stage labels | HTML + CSS blur | about 137-191px x 36-40px | 0 | n/a | CSS |
| Innovation cards (4) | concept renders and UI crops | WebP, srcset | 324x405 / 324x386 | 13,239; 16,714; 22,471; 40,475 | `lazy` | img |
| Practice carousel (7) | photos | WebP, srcset | 209x261 (centre 390x487) / 319x398 (one 389x486) | 42-139 KB each (about 590 KB) | `loading=auto` (eager) | img |
| Case-study video `JddA...mp4` | looping background, 12.89 s | MP4 | 1440x900 / 3840x2160 | 58,764,457 | autoplay loop, plays only when in view; poster WebP 2880w = 186,730 B | video |
| Founder portrait | people proof | WebP | 255x340 / 1439x2158 | 364,644 | `auto` (eager), 5.6x oversize | img |
| Certification badges (5) | trust | PNG | 48x48 / 120x120 | 2.8-3.7 KB each | `lazy` | img |
| CTA panel illustration | decoration | WebP | 503x503 / 517x517 | 54,627 | `lazy` | img |
| Variable font | all text | WOFF2 | n/a | 589,088 | CSS `@font-face`; no preload link | font |
| HTML document | page | HTML | n/a | 585,336 raw; 47,555 brotli | n/a | document |

- Totals (probe, first load, before scroll): 130 requests, 3,314,877 B, of which Script 1,263,612, Image 1,288,954, Font 589,726, Document 47,555. After a full scroll walk: 290 requests, 5,191,335 B (images and fetches grow; video is not counted, see Contradictions). [probe `transferFirstLoad`, `transferAfterScroll`]
- Whether the footage, renders and photography are commissioned or licensed cannot be determined from the page. The raw HTML has 0 `<picture>` elements, 0 AVIF references, 56 `<img>` tags (32 `loading="lazy"`) and no `fetchpriority` on any `<img>`; `fetchpriority="low"` appears only on 41 `modulepreload` links, so the JS modules that drive the hero fade are fetched at low priority (plausibly why M2 starts at about 2.6 s; inference). No font preload link exists.

## Motion inventory

Method: `Element.animate` hook with keyframes and options from document start; per-frame sampling of computed colour, opacity, transform, size; a 450px scroll walk with WAAPI logging; hover and focus probes. [s1, s2, s3, s5, s7]

| # | Motion | Trigger | Duration and easing | Property | Evidence |
|---|---|---|---|---|---|
| M1 | Hero video loop (ambient) | JS plays it at about 3.1 s after navigation; pauses when off-screen (frozen at scrollY 1,350 and beyond) | 29.52 s loop; hard cuts between scenes | decoded video frames | [s1 `vid`, s2 `steps`] |
| M2 | Hero entrance: H1 words, subhead, CTA fade in | Starts about 2.6 s after navigation (when the motion module runs), not on load of HTML | H1: four word spans, delay 0/50/100/150 ms, 1000 ms each, `cubic-bezier(0,0.7,0.56,1)`. Subhead and CTA: delay 200 ms, 600 ms, linear | `opacity` 0.001 to 1 (SSR also has a 2px translateY that is not animated in the keyframes) | [s1 `anim`] |
| M3 | 9 further elements fade at the same moment (the aOS card text group, "Read more", an "M&A" label and a "Take tax law to task" block; several may sit in hidden menu content) | Fired at load, not on scroll, so any below-fold ones finish unseen | 400-500 ms with delays 250-500 ms, `cubic-bezier(0.12,0.23,0.5,1)` | `opacity` | [s1 `anim`] |
| M4 | Header flip (transparent + white to opaque `#FAFAF9` + ink) | Threshold at scrollY about 205 (between 195 and 210); the reverse crossing was not tested | about 190-200 ms, ease-out shape (35%, 15%, 31%, 47%, 60%, 73% ... per frame) | `color`, `background-color` interpolated each frame by JS (not a CSS transition, not WAAPI) | [s3 `headerThreshold`, `headerCurve`] |
| M5 | Nav hover pill + dropdown | Pointer hover | no intermediate frames recorded (2 samples, 67 ms apart), so effectively instant | `background-color`, `width/height`, `border-radius` | [s3, obs-hover-nav-light.png] |
| M6 | CTA hover | Pointer hover (header and hero CTA) | about 150 ms (11 frames) | `background-color` `#005032` to `#003D26` | [s3] |
| M7 | Announcement hover | Pointer hover | about 400 ms (26 frames) | `opacity` 0.6 to 0.8 on "Learn more" and arrow | [s3] |
| M8 | Card hover | Pointer hover on card | about 380 ms (25 frames), easing not readable | media container `transform: scale(1.025)`; title colour `#0D1016` to `#68655E`; arrow colour swaps | [s3] |
| M9 | Footer link hover | Pointer hover | instant | `text-decoration: underline` | [s3] |
| M10 | Logo marquee (ambient) | Always on, JS | linear, about 40 px/s leftwards (-966.8 to -1125.7 px in 4.0 s); no CSS animation on it | `transform: translateX` on a `<ul>`, updated per frame | [s3 `marquee`] |
| M11 | aOS pinned scroll-scrub | Scroll: stage pins at page y about 1,374 and releases about 5,442 (4,068px of scroll) | video time = 0.00271 s per px, linear, 11.03 s total; the displayed frame follows through exponential damping, time constant about 160 ms (after an instant 1,000px jump the gap closed 60% in 150 ms and was settled by about 0.9 s) | `video.currentTime` set from a rAF loop | [s2 `steps`, s3 `scrub`; `Scroll_Video.mjs` loop clamps dt to 0.1 s and eases `current` toward `target`] |
| M12 | aOS pill expands as the scrub passes its range | Scroll position | about 250 ms to peak, overshoots about 1% (485 vs 480 px), settled by about 450 ms: a spring | `width` and `height` (layout properties; 21 declarations in the HTML CSS carry `will-change: width, flex-basis`) | [s7 `pills`] |
| M13 | Practice carousel autoplay | In view; progress bar restarts every 5 s | 5,000 ms linear | segment `transform: scaleX(0 to 1)` (CSS keyframe `center-carousel-*-progress`); slide change by JS (Tax to Insurance seen 6 s apart) | [probe `animationsAtLoad`, s3 `carousel`, obs-carousel-t0.jpg, obs-carousel-t6s.jpg] |
| M14 | Stat count-up | Enters view | about 1.9 s; starts slow (about 6/s for 0.5 s), then about 16/s; counts from 70, 50, 60 to 97, 71, 80 | text content updated per frame; component default is 2 s `easeOut` | [s3 `counters`, s5 `statType`, `Numbercounter.mjs`] |
| M15 | Case-study 4K video | In view | plays and loops 12.89 s; pauses out of view | video frames | [s2 `steps`] |
| M16 | Mobile menu open | Tap | timing NOT OBSERVED (fully open at the first capture, about 300 ms) | panel opacity/height (not read) | [s6] |
| M17 | Idle frame loops (invisible) | Always, even at the footer | 122 rAF callbacks per 2 s from each of two loops (about 61/s each) | none visible | [s3 `rafAttribution`: `motion.*.mjs` frame loop and `Scroll_Video.*.mjs`] |

Still (observed not to move): H1 and subhead after M2; every section title and paragraph below the fold (sampled opacity and transform across three sections: constant 1 and none; 0 new `Element.animate` calls across the whole 13.9k scroll walk); cards at rest; security band, founder, CTA panel, footer; the header (no hide, no resize, no shadow); no parallax (the only scroll-linked output is M11 plus the M4 threshold); no cursor follower; no custom scrollbar. [s2, s7]

Scrolling is native. `wheelProbe`: a 500px wheel tick moved scrollY 500 at once (first move 62 ms, 2 positions, no easing). All recorded `wheel` and `touchmove` listeners are `passive: true`; `<html>` has no classes or attributes; `scroll-behavior: auto`. The smoothing in M11 applies to the video time only. [probe `wheelProbe`, `runtime.listeners`, s4 `globals`]

## Performance (measured)

- Lighthouse: NOT RUN (run separately by the requester).
- Harness, desktop: load event 2,260 ms, LCP 452 ms on the H1 element, CLS 0, 0 long tasks. Mobile: LCP 352 ms (a span). These LCP values are flattered: the H1 words are in the DOM at `opacity: 0.001` until M2 starts at about 2.6 s, and Chrome counts the element anyway. The poster is already visible in the first frame captured (141 ms after navigation commit, `obs-load-sequence.jpg`); readable hero text appears at 2.8-3.4 s in this unthrottled run. [probe, s1]
- Script transfer at first load: 1,170,435 B in my run (probe: 1,263,612 B; the difference is late-loading trackers). Split: Framer first-party 481,580 B; third-party 688,855 B. [s4 `scriptBytes`]
- CSS: 12 stylesheets, all inline in the HTML (254,345 chars, probe 254,357 B); 0 external. HTML is 585,336 B raw, 47,555 B brotli.
- Third parties at load: Google Tag Manager and gtag (3 files, 491,094 B), Cookiebot (about 39 KB), Dreamdata (2 hosts, about 71 KB), Microsoft Clarity (26 KB), LinkedIn Insight (23 KB), Bing UET (18 KB), Amazon ads (12 KB), Google Ads (3 KB). [s4 `byHostType`]
- Video: three MP4s totalling 133.6 MB of source files (65.9 + 8.9 + 58.8). The harness's `Media` figure (35 KB) does not represent them (see Contradictions).
- Hosting: all images, fonts, video and Framer script chunks come from `framerusercontent.com`, not legora.com; the document is the only request to the site's own domain besides tracker and consent hosts.

## Accessibility spot checks

Manual and scripted only; axe NOT RUN.

- Landmarks: 0 `header`, `nav`, `main`, `footer` elements and 1 `role` value (`button`) in the raw HTML. [home.html]
- Headings: raw HTML has 2 `<h1>` (desktop and mobile breakpoint variants; the hydrated DOM has 1), then `h3`, `h3`, `h3`, `h4`, `h4`. No `h2` anywhere. [probe `headings`, home.html]
- Keyboard: first Tab stops are the announcement link, "Security", "Customers", the wordmark, the header CTA, the hero CTA, then the aOS pills. "Product", "Solutions", "Company" and "Log in" are anchors without `href` and are not focusable, so those menus are unreachable by keyboard; there is no skip link. Focus ring is the browser default (`auto 1px rgb(0,95,204)`), nothing custom. [s5 `focusOrder`]
- Target sizes: CTA pills are 30px high (passes the 24px WCAG 2.2 minimum; below a 44px mobile target). Mobile "Menu" hit area 66x40.
- Contrast: hero text depends on the footage (2.78:1 and 1.7:1 measured on pale frames; see Hero pattern). Warm grey `#68655E` on `#FAFAF9` computes to about 5.6:1.
- Images: marquee logos have `alt=""`, so the client names are not announced.
- `lang="en"` set. `prefers-reduced-motion` CSS rules: 0 (see reduced-motion section).

## Structured data and meta

- Title: "Legora" (6 characters, brand only). Description: present, 210 characters, task-oriented (review, research, draft). `og:title`, `og:description`, `og:image` (PNG), `og:url`, `og:type=website`; `twitter:card=summary_large_image`; `robots: max-image-preview:large`; canonical `https://legora.com/`; light and dark favicons; apple-touch-icon. [home.html head]
- JSON-LD: none (0 `application/ld+json`). `theme-color`: none. `viewport`: `width=device-width` only. A `framer-search-index` meta points at a JSON index on the CDN.

## Premium and trust signals

What makes it feel premium (each with evidence):

1. Footage and one line. A 1080p film hero with a four-stop scrim and a single 56px line bottom-anchored; the page spends its first 900px on atmosphere and 11 strings of text. [obs-load-sequence.jpg, probe]
2. Typographic tightness from one variable grotesk: fractional weights 440/450, tracking -0.04em at the H1, line height 1.05, `balance`, character variants on, light 300 numerals at 90px. [s4 `type`, s5 `statType`]
3. Palette discipline: warm off-white, ink, one warm grey for secondary text, one green; zero borders, zero shadows, zero decorative gradients; three flat tone bands (stone, ink, green). [s4 `census`]
4. A crafted scroll moment: a pinned 11 s glass-layer render scrubbed 1:1 with damping (about 160 ms), with pills that expand in a spring and describe the layer currently on stage. [s3 `scrub`, s7 `pills`, obs-scroll-sheet-1.jpg]
5. Small tactile details: a hover pill and card scale of 2.5% (not larger), "arrow + Read more" glyph, arrow-in-circle CTA, announcement bar, marquee with edge fades, segmented progress pagination.
6. Sparse content discipline: 4.9k characters across 13.9k px.

What is generic (evidence):

1. Logo marquee + stat count-up + founder with signature + certification badges: the standard enterprise-SaaS proof stack, in the usual order. [obs-scroll-sheet-2.jpg]
2. Generic architecture and office-interior photography for the practice carousel (no people or product in the frames; licensed vs commissioned unknown); the hero video never shows the product.
3. Announcement bar, two identical CTAs, "Introducing ..." copy, a coined acronym with a trademark sign.
4. Framer template mechanics: 78 elements hidden with inline `opacity:0.001` until JS runs, 0 landmarks, hover-only nav, default focus ring, 254 KB of inline CSS, third-party tag stack (about 673 KB of script). [home.html, s4]
5. Weak document SEO basics: brand-only title, no structured data.

## Replicable by HELIX under the truth rules?

HELIX rules applied: light mode only, flat (no gradient, glow, glass), no client logos, no invented metrics, features or customers, product proof only from real operator-console UI (or a frame labelled "Illustrative interface. Sample data."), at most two motion moments per page, transform and opacity only, `prefers-reduced-motion` respected, readable with JS off, no animation library above the fold.

| Pattern | Replicable? | HELIX-truthful equivalent |
|---|---|---|
| Full-bleed video hero with one bottom line | No | No footage exists and stock or AI imagery is banned. Flat light hero: H1 + sub + one CTA, with a labelled illustrative console frame beneath (or text only until real captures exist). |
| Type recipe: one grotesk at about wght 450, -0.04em H1, 1.05 line height, `balance` | Yes | Geist is variable, so wght 450-500 at -0.03 to -0.04em is available. A fractional weight may conflict with the Spec's three-weight rule; decide before adopting. |
| Palette discipline: off-white + ink + warm grey + one accent, no borders, no shadows | Yes | Same discipline with HELIX tokens (Spec Appendix B); the accent is cobalt (Q-12 pending), not green. |
| Flat tone bands (stone, ink, green) | Partly | A flat stone band is fine if it is a token. The ink-navy band is a dark surface and is out (light mode only). |
| Announcement bar | No | No announcements exist that map to claim IDs. |
| Fixed 116px header that flips colour at 205px | No | Sticky 64px opaque header from the first pixel; no flip, no motion. Nav items must be real links or `details` so they work by keyboard and without JS. |
| Pill CTA with arrow, same label in header and hero | Yes | One filled button, 44px+ target, same label and destination in header and hero. Hover as instant state or an opacity overlay (a background-colour tween is not transform/opacity). |
| "Trusted by" logo marquee | No | No logos without written permission, no marquee. A plain-text "Built for" row (couriers, 3PLs, freight brokers) if claim-mapped. |
| Pinned scroll-scrubbed 3D glass render with expanding pills | No | Scroll-linked, video, 8.9 MB, 4,068px of pinned scroll, layout-property animation. Equivalent: a static SVG stack diagram of the HELIX layers that are confirmed, with a vertical `details` list; no motion. |
| Four cards: media, title, one sentence, "Read more" | Yes | Text or illustrative-frame cards; hover scale 1.025 is transform-only (check it against the two-moment budget). |
| Auto-advancing photo carousel with progress bar | No | Static three-segment cards (couriers, 3PLs, freight brokers) with text only, if confirmed as target segments. |
| Count-up stats at 90px light | Partly | Number styling (large, light, tight) is fine for a real, claim-mapped figure. Count-up animation is out, and no figure may be invented. |
| Founder portrait with signature | No | A plain entity and founding-year line (2024) from `siteConfig`; no portrait unless supplied and approved. |
| Security band with certification badges | No | Never invent certifications. A plain-text security section stating only confirmed practices, no badges. |
| Footer: four link columns, giant wordmark, legal row | Yes | Same structure with the real wordmark SVG, `info@`, entity line and legal links. |
| Blurred glass mobile menu | No | Opaque flat full-height panel, 44px rows. |
| Load-time opacity fade of the hero text | Partly | Only as a CSS animation inside `prefers-reduced-motion: no-preference` with the default state visible, never an `opacity: 0.001` SSR state that depends on JS. |

## Tech fingerprint

Feeds TECH_FINGERPRINT.md. Each line names its evidence.

- Platform: Framer (published site). Evidence: `<meta name="generator" content="Framer 7788242">`; response headers `server: Framer/26fa766` and `framer-site-id`; scripts at `framerusercontent.com/sites/<id>/` (`script_main.*.mjs`, `framer.DYSnjsCx.mjs`); globals `__framer_importFromPackage`, `__framer_events`; `data-framer-*` attributes; `events.framer.com`. Static pre-render: `server-timing: ssg-status;desc="optimized"`.
- React 18.3.1: `react.BCtL1DNk.mjs` (version strings 18.3.1 inside; 45,203 B). The harness's `reactRoot: false` is a miss for this build.
- Animation library: a Motion-style library (Framer Motion lineage), file `motion.B8Jv1A6-.mjs` (49,870 B on the wire, 151,419 chars). Evidence: it calls `element.animate(keyframes, options)` (matches the 16 observed WAAPI calls), contains a `stiffness` spring implementation, an IntersectionObserver viewport helper and a `matchMedia("(prefers-reduced-motion)")` hook. The package name (`framer-motion` vs `motion`) is not confirmed by any string in the file. It is loaded above the fold.
- Custom components in loaded chunks: `Scroll_Video.f502xGP-.mjs` (scroll-scrubbed video with an rAF damping loop), `Ewcarousel.6CmDXt7M.mjs` (carousel, IntersectionObserver), `Numbercounter.oU2-6mRN.mjs` (count-up, default 2 s `easeOut`), `Video.*.mjs`, a ticker (`li.ticker-item`).
- Smooth-scroll library: not found. Evidence against: no `lenis`/`locomotive` string in any first-party chunk, `window.Lenis` and `LocomotiveScroll` undefined, `<html>` has no class or style, all wheel listeners passive, wheel tick jumps instantly. "NOT DETECTED" here is backed by the runtime behaviour, so I treat it as absent for page scroll.
- GSAP / ScrollTrigger: not found. Evidence: no `gsap`/`ScrollTrigger` string in any of 42 first-party chunks; `window.gsap` undefined.
- Lottie, Rive, three, OGL, Spline, model-viewer: not found. 0 `<canvas>`, `canvasContexts: []` at load and after scroll; the only "spline" string is in `Scroll_Video.mjs`, inside a generic HTML-embed helper that checks for `<spline-viewer>` markup (weak signature, not confirmed use; no such element exists in the DOM).
- WebGL canvases: none.
- Native CSS scroll-driven animations (`animation-timeline`): 0 occurrences in the raw HTML CSS and in stylesheets. `ScrollTimeline` and `ViewTimeline` strings exist inside `motion.*.mjs` (the library's optional acceleration path); no `ScrollTimeline` animation was seen at runtime (`document.getAnimations()` held only the carousel's `DocumentTimeline` CSS animation at every scroll stop). Not used on this page as far as observed. The harness `scrollTimelineJS` hit is that library capability, and `webflowIx` hit on `Scroll_Video.mjs` is a false positive (generator is Framer, no Webflow).
- View Transitions: `startViewTransition` appears in `framer.DYSnjsCx.mjs` (route navigation support in the runtime); not exercised on the home page. `@property`: 0 rules. `@starting-style`: 0.
- `<video>` backgrounds: yes, three (hero loop, scroll-scrubbed stage, 4K case-study loop). 0 Lottie, 0 Rive.
- Hero entrance: Framer "optimized appear" via an inline script that calls `startOptimizedAppearAnimation` (present in the raw HTML), driving WAAPI opacity fades.
- First load JS: 1,263,612 B per harness (1,234 KB; mine 1,170,435 B). CSS: 0 external, about 249 KB inline. Fonts 589,726 B. Images 1,288,954 B. Total requests 130 (harness), 3.31 MB excluding streamed video. [probe `transferFirstLoad`]
- Third-party stack (not evidence of site features): GTM and gtag, Cookiebot, Dreamdata, Clarity (session replay), LinkedIn Insight, Bing UET, Amazon ads, Google Ads.

## With JS off, and with reduced motion

JavaScript disabled (`desktop-1440-nojs.png`, `obs-nojs-scroll-1300.png`; computed values from `s5 noJs`):

- Survives: the announcement bar, the nav labels, the header CTA, the wordmark, the hero video poster (the browser then shows native video controls over it), all text in the DOM (4,932 characters; page height 14,280).
- Does not survive visually: the H1, subhead and hero CTA are server-rendered with inline `opacity: 0.001`, so they are present in the HTML and invisible on screen (78 elements carry this state). The harness `noJs` field reports them as present; the screenshot shows an empty hero. [home.html, s5 `noJs`, desktop-1440-nojs.png]
- The aOS stage is a flat `#E6E6E6` block with the text "Loading..." (video never starts, no scrub). [obs-nojs-scroll-1300.png]
- The header stays white-on-transparent (no flip), so nav labels become unreadable over the light page below the hero. Product, Solutions, Company and Log in have no `href`.

`prefers-reduced-motion: reduce` (`desktop-1440-reduced-motion-top.png`; [s5 `reducedMotion`]):

- Honoured: the logo marquee stops (transform identical 1.5 s apart).
- Not changed: the same 16 WAAPI entrance fades with the same timings, the hero video keeps playing (currentTime 5.32 to 6.83), the scroll-scrub still runs (2.78 at 2,400, 5.48 at 3,400), the header flip still tweens (about 200 ms), counters still count up (about 1.9 s), the carousel progress bar still runs. There are 0 `prefers-reduced-motion` rules in the stylesheets; the only runtime hooks are in the Motion and Framer chunks and the inline appear script.
- The page does not offer a pause control for the hero video.

## What not to borrow

Autoplaying 66 MB hero video and a 59 MB 4K loop; scroll-pinned, scroll-scrubbed video; glass pills and blurred menu panel; client-logo marquee; count-up stats; stock-style photo carousel; announcement bar; a hero that is invisible without JS (`opacity: 0.001` SSR state); hover-only navigation with `href`-less anchors; no landmarks or skip link; default-only focus ring; layout-property spring animation (width/height); a 589 KB single font file; 673 KB of third-party script; video-dependent text contrast; a dark band; certification badges and founder signature without HELIX equivalents.

## Contradictions between probe.json and the evidence

1. `transferFirstLoad.byType.Media` = 35,017 B and total 3.31 MB. The hero MP4 is 65.9 MB and 16.7 s of it (an estimated 37 MB) was buffered within about 9 s. CDP "Media" records only a 35 KB tail range of the scrub video. The real first-load weight is tens of MB higher. My own CDP capture shows the same 35 KB, so this is a measurement gap (media requests not fully reported), not a one-off.
2. `noJs.h1` and `firstViewportText` list the H1, subhead and CTA as present. They are present but at opacity 0.001; `desktop-1440-nojs.png` shows none of them. The harness has no visibility check.
3. `animationsAtLoad` reports one CSS animation (the carousel bar). The hero's 16 entrance fades are WAAPI animations that had already finished and been removed when it polled. `runtime.animateCalls: 16` agrees with my hook; `animationsAtLoad` alone would imply no entrance motion. The harness `lcp` (452 ms, H1) is true as a number but hides that the H1 is nearly transparent until about 2.8 s.
4. `dom.ctas` colour and font fields (`rgb(0,0,238)`, `12px/400`) are the anchor's default link style, not the visual label (white, 13.2px, wght 440). `dom.header` is `null` and all landmark counts are 0 because the site uses `div`s, which is correct, not a harness error.
5. `desktop-1440-screen2.png` (scrollY 900) hides the "Trusted by" row behind the sticky header, so the harness frames never show the logo marquee that sits at y 930-1020.
6. `fp.scriptSignatures.webflowIx` (hit on `Scroll_Video.mjs`) is a false positive; `scrollTimelineJS` (hit on `motion.mjs`) is a library capability, not use; `hints.reactRoot: false` is wrong for this build (React 18.3.1 present).
7. `idleRafPerSecond: 120` is real: two continuous loops (Motion frame loop and the Scroll_Video loop), still running at the footer.
8. `consent: []` is consistent with a banner not being shown here, not with Cookiebot being absent (its scripts load).

## NOT OBSERVED

- Contents of the Product, Solutions and Company dropdown panels; the Customers, Security and Book-a-demo pages (home page only, nothing clicked).
- Easing curves of JS-driven motion (hover tweens M5-M8, header flip, counters, mobile menu): only frame samples, not the functions. Counter easing is inferred from the component default only.
- Hero video codec, bitrate profile, and the exact bytes streamed; whether the file has a fast-start `moov` atom (the scrub video is first fetched by a tail range, which is suggestive, not proof).
- Hero timeline under network throttling or cold cache, and on a real device; all timings are from a single unthrottled run.
- Tablet width, touch swipe on the carousel, keyboard control of the carousel and the pills, marquee behaviour on hover.
- EU consent banner behaviour; authenticated states; dark mode (none found).
- Lighthouse scores and axe results (not run by instruction).
- View Transitions during real route navigation.
- Whether the product UI crops in the innovation cards show real or sample data.

## Method and files

- Harness captures (not mine): `probe.json`, `desktop-1440-*.png`, `mobile-390-*.png`.
- Frame sequence from navigation, 9 s: `obs-load-sequence.jpg`. Scroll walk contact sheets: `obs-scroll-sheet-1.jpg`, `obs-scroll-sheet-2.jpg`. Other captures: `obs-logos-ticker.png`, `obs-carousel-t0.jpg`, `obs-carousel-t6s.jpg`, `obs-mobile-menu-open.png`, `obs-nojs-scroll-1300.png`, `obs-hover-nav-light.png`.
- Scripts (read-only, no clicks except one Menu tap on mobile; no forms; no data sent): `scripts/s1-load-sequence.mjs`, `s2-scroll-walk.mjs`, `s3-interaction.mjs`, `s4-static-evidence.mjs`, `s5-variants.mjs`, `s6-mobile-menu.mjs`, `s7-pills-reveal.mjs`. Raw results in `scripts/results/`. They use the Playwright install at `design-system/home-lab/tools/node_modules`.
- The 1-byte range requests used to read video sizes and the fetches of the public script chunks used for signature checks are plain GETs of public assets; no assets, code or copy were kept in the repo.
