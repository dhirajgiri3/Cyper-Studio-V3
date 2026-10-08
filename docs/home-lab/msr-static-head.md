# Motion-stack report (Brief 01 v2.1, Step 3): measured, not assumed — PROPOSAL, nothing adopted

Bench: `design-system/home-lab/motion-bench/` (build: `build.mjs`, `build-atmos.mjs`; measure: `measure/perf.mjs`, `measure/a11y.mjs`, `measure/lh.mjs`; raw results in `results/*.json`; tables below are generated from them by `tables.mjs`). Nothing here touches `app/` or `package.json`. Libraries are installed only inside `design-system/home-lab/tools/` (own `package.json`, gitignored `node_modules`).

## 1. What was built

One fixed scene, five implementations, identical markup, CSS and copy: a hero with entrance motion (headline lines rise 12 px, frame fades and rises 24 px), a **scroll-lit paragraph** (words from 22% to 100% opacity), a **pinned three-step sequence**, and a **horizontally revealed set of five panels**. A `?fallback=1` switch forces S0's JS fallback so it can be measured too.

| ID | Implementation | Pinned versions (from `package.json`) |
|---|---|---|
| S0 | Native only. CSS scroll-driven animations (`animation-timeline: view()` and named `view-timeline`), `position: sticky` for pinning, CSS keyframes for the entrance. A 508-byte-gzip script runs **only** where the feature is missing (or forced) and writes three progress variables; the animations stay in CSS (paused, seeked by a negative `animation-delay`) | no dependency |
| S1 | S0 plus Lenis smooth scrolling, loaded after the `load` event, anchors on, touch left native | lenis 1.3.26 (MIT) |
| S2 | GSAP with ScrollTrigger (pin + scrub) and SplitText (words), loaded after `load`; the common way GSAP is written | gsap 3.15.0 |
| S3 | S1 plus S2, synchronised through the GSAP ticker (the documented integration) | lenis 1.3.26, gsap 3.15.0 |
| S4 | React 19 + framer-motion (`motion`, `useScroll`, `useTransform`) written the way the 21st.dev prompts write it, server-rendered with `renderToString` and then hydrated | framer-motion 14.0.0 (MIT), react and react-dom 19.3.0 (MIT) |

Atmosphere: one abstract ribbon composition rendered four ways: A1 still (WebP/AVIF, with and without real grain), A2 muted looping video (H.264 and VP9, 8 s, 24 fps, 1280 x 720), A3 WebGL (OGL 1.0.11, Unlicense, DPR capped at 1.5, paused when hidden or off-screen). The shader draws a different picture from the still (clouds, not a ribbon), so the comparison is **cost per role**, not pixel for pixel.

## 2. Licences (checked from the installed packages and the live GSAP page, 2026-10-08)
| Package | Licence | Note |
|---|---|---|
| lenis | MIT | |
| framer-motion (Motion) | MIT | |
| ogl | Unlicense | |
| react, react-dom | MIT | |
| gsap 3.15.0 | "Standard 'no charge' license" (package.json), text at gsap.com/standard-license, now Webflow's | The page says commercial and non-commercial use is free, including ScrollTrigger and SplitText (SplitText ships in the same npm package), and the prohibited uses are products that compete with Webflow's visual animation tools. **One sentence on the same page still limits free use to products where end users are not charged.** A marketing site is free to its visitors; the HELIX product is licensed software, so that sentence needs a legal reading before GSAP goes anywhere near the product (Conflicts C-12). Terms can change by posting on the page |
| ffmpeg-static (video encode for the bench only) | GPL-3.0-or-later | A local build tool; its output is not shipped with it |

## 3. S0 browser support (MDN browser-compat-data 8.1.4, read at build time by `tools/bcd.mjs`)
