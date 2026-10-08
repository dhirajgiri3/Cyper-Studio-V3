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
BCD 8.1.4 (2026-10-08). Value = first version with unflagged support; "NO" = not supported; "flag only" = behind a flag.

| Feature | chrome | chrome_android | edge | firefox | firefox_android | safari | safari_ios | samsunginternet_android | webview_android | opera |
|---|---|---|---|---|---|---|---|---|---|---|
| animation-timeline | 115 | 115 | 115 | preview | NO | 26 | 26 | 23.0 | 115 | 101 |
| animation-range | 115 | 115 | 115 | preview | NO | 26 | 26 | 23.0 | 115 | 101 |
| view() / scroll() functions | 115 | 115 | 115 | preview | NO | 26 | 26 | 23.0 | 115 | 101 |
| view-timeline (named) | 115 | 115 | 115 | preview | NO | 26 | 26 | 23.0 | 115 | 101 |
| timeline-scope | 116 | 116 | 116 | preview | NO | 26 | 26 | 24.0 | 116 | 102 |
| View Transitions (same-document) | 111 | 111 | 111 | 144 | 144 | 18 | 18 | 22.0 | 111 | 97 |
| @property | 85 | 85 | 85 | 128 | 128 | 16.4 | 16.4 | 14.0 | 85 | 71 |
| position: sticky | 56 | 56 | 16 | 32 | 32 | 13 | 13 | 6.0 | 56 | 43 |
| IntersectionObserver | 51 | 51 | 15 | 55 | 55 | 12.1 | 12.2 | 5.0 | 51 | 38 |
| Web Animations: Element.animate | 36 | 36 | 79 | 48 | 48 | 13.1 | 13.4 | 3.0 | 37 | 23 |
| prefers-reduced-motion | 74 | 74 | 79 | 63 | 64 | 10.1 | 10.3 | 11.0 | 74 | 62 |
| CSS clamp() | 79 | 79 | 79 | 75 | 79 | 13.1 | 13.4 | 12.0 | 79 | 66 |
| svh units | 108 | 108 | 108 | 101 | 101 | 15.4 | 15.4 | 21.0 | 108 | 94 |
| window.find | 1 | 18 | 79 | 1 | 4 | 3 | 1 | 1.0 | 4.4 | 15 |

**Which browsers lack what, exactly.** CSS scroll-driven animations (`animation-timeline`, `animation-range`, `view()`, named view timelines): **Chrome, Edge, Android Chrome and WebView 115+, Samsung Internet 23+, Safari and iOS Safari 26+, Opera 101+. Firefox desktop: preview builds only (not in stable). Firefox for Android: no.** `timeline-scope` needs 116+ (Samsung 24). View Transitions (same-document): Chrome/Edge 111+, Safari 18+, Firefox 144+. Everything else S0 relies on (sticky, IntersectionObserver, `@property`, `clamp()`, `svh`, `prefers-reduced-motion`, Web Animations) is supported by every browser in the table back to at least Chrome 108, Safari 15.4 and Firefox 101 (svh), which is the oldest requirement.

**Fallback (built and measured):** where scroll-driven animation is unavailable, S0 loads a 0.5 KB-gzip script that adds the `fallback` and `pin` classes and writes three progress variables on scroll (passive listener, one `requestAnimationFrame` per frame). Visuals stay in CSS. With JS also unavailable the page is a plain static layout: steps stacked, panels wrapped, all words fully visible (measured below). **NOT MEASURED: the share of HELIX's real visitors on each browser.** The audience skews to mid-range Android (PRODUCT.md), where Chrome and Samsung Internet are above the 115/23 cut-offs on any recent device; Firefox and older iOS get the fallback.

## 4. The five 21st.dev components: what each assumes, and where each could serve (Spec 15.5 already rejects four)
Evidence: imports and mechanics read from `Motion_Components_Prompt.md`.

| Component | Library it assumes (from its imports) | Mechanics that matter | Could serve | Spec 15.5 | Compatible with Next 15.1 + React 19? |
|---|---|---|---|---|---|
| `liquid-metal-button` | `@paper-design/shaders` (WebGL `ShaderMount`), `lucide-react`, `clsx`, `tailwind-merge` | one WebGL canvas per button, `transition: all`, overshooting spring easing, runtime `<style>` | nothing: the CTA must be flat | REJECT | needs `"use client"`; adds a WebGL context per button |
| `hero-section-3` (`ScrollFlyIn`) | `framer-motion` (`useScroll`, `useTransform`) | reads `window.innerWidth` during render | the rising console in HERO-B, but S0 does it with one CSS rule and no JS | REJECT | framer-motion 14 peer range is React 18 or 19; render-time `window` read breaks server rendering |
| `image-stream-hero` | no animation library (React + `cn`); CSS keyframes sampled from a path in JS | infinite looping animation, many images | a static strip of labelled sample tenant screens below the fold, once real screens exist | REJECT (default) | fine as plain React |
| `ink-orbit-features` | no animation library (React hooks, `setInterval` at 1,700 and 2,800 ms, CSS keyframes) | fake live counters and "syncing" text | the capability section below the hero (not the hero), rebuilt from verified facts | ADAPT | fine as plain React |
| `scroll-morph-hero` | `framer-motion` (`motion`, `useTransform`, `useSpring`, `useMotionValue`) | `preventDefault` on wheel, springs updating every frame, content hidden at load | none | REJECT | scroll hijack; keep out |

**Cost of using the two framer-motion components as written: S4.** Existing site: `framer-motion@^12.4.7`, `gsap@^3.12.7`, `@gsap/react`, `three` are already dependencies of the agency-era code; none is needed for the recommendation, so all can leave if the site is rebuilt on S0.

## 5. Existing site facts the brief asked for
- Framework and build tool: **Next.js 15.1.7, App Router, React 19; `next dev --turbopack` for development, `next build` for production** (package.json scripts); JavaScript, Tailwind 3.4, styled-components 6.
- Does it render the hero on the server? The framework does (static prerender: `.next/server/app/index.html` from the existing build contains the `<h1>` text), **but the agency-era home is one big `"use client"` GSAP component and its prerendered HTML contains 36 inline `opacity:0` styles**, for example on the "Our Story" heading. Those are blank without JavaScript and for crawlers that do not run it. That is a risk to the SEO and AI-SEO goals in the current code; the lab heroes have no such styles. (Read from the committed prebuilt output; I did not run a new build.)

## 6. Results (all numbers generated from `motion-bench/results/*.json`)

Method notes: Lighthouse = mobile defaults (simulated slow 4G, 4x CPU slowdown), 5 runs per page, a local server that serves precompressed Brotli with immutable caching (like a CDN); KB means 1,024 bytes. Perf, INP, CLS and frame data: Chrome 154 headless, **CDP CPU throttle 4x**, a scripted wheel scroll through the whole page (60 px every 16 ms) or synthesized touch gestures on a 390 x 844 touch-emulated device, then three scripted clicks and two Enter presses on the sample button (INP from the Event Timing API), medians of 3 runs. Nothing was run on a physical phone.

### Bytes (built by esbuild, tree-shaken, minified; gzip level 9, brotli quality 11)

| Candidate | JS before first paint gz | JS loaded after `load` gz | JS total gz | JS total br | CSS gz | HTML gz |
|---|---|---|---|---|---|---|
| S0 | 0.5 KB | 0.0 KB | 0.5 KB | 0.4 KB | 2.5 KB | 1.6 KB |
| S1 | 0.5 KB | 5.5 KB | 6.0 KB | 5.3 KB | 2.7 KB | 1.7 KB |
| S2 | 0.0 KB | 47.1 KB | 47.1 KB | 42.6 KB | 1.9 KB | 1.5 KB |
| S3 | 0.0 KB | 52.4 KB | 52.4 KB | 47.2 KB | 2.0 KB | 1.5 KB |
| S4 | 112.3 KB | 0.0 KB | 112.3 KB | 98.0 KB | 1.8 KB | 1.7 KB |

### Lighthouse mobile (default simulated 4G + 4x CPU slowdown), 5 runs, medians

| ID | perf, 5 runs | median perf | FCP | LCP | TBT | CLS | Speed Index | script transfer | total transfer |
|---|---|---|---|---|---|---|---|---|---|
| s0 | 100, 100, 100, 100, 100 | 100 | 0.75 s | 1.20 s | 0 ms | 0 | 1.02 s | 0.6 KB | 30.5 KB |
| s1 | 100, 100, 100, 100, 100 | 100 | 0.75 s | 1.20 s | 0 ms | 0 | 1.02 s | 5.8 KB | 35.9 KB |
| s2 | 100, 100, 100, 100, 100 | 100 | 0.75 s | 1.25 s | 0 ms | 0 | 1.12 s | 42.8 KB | 72.0 KB |
| s3 | 100, 100, 100, 100, 100 | 100 | 0.75 s | 1.25 s | 0 ms | 0 | 1.13 s | 47.4 KB | 76.7 KB |
| s4 | 100, 100, 100, 99, 100 | 100 | 0.75 s | 1.71 s | 0 ms | 0 | 1.27 s | 98.2 KB | 127.5 KB |

### Atmosphere variants, Lighthouse mobile, 5 runs

| ID | perf, 5 runs | median perf | FCP | LCP | TBT | CLS | Speed Index | script transfer | total transfer |
|---|---|---|---|---|---|---|---|---|---|
| atmos-none | 100, 100, 100, 100, 100 | 100 | 0.75 s | 1.05 s | 0 ms | 0 | 0.75 s | 0.0 KB | 28.3 KB |
| atmos-webp | 100, 100, 100, 100, 100 | 100 | 0.75 s | 1.13 s | 0 ms | 0 | 0.75 s | 0.0 KB | 31.5 KB |
| atmos-webp-grain | 100, 100, 100, 100, 100 | 100 | 0.75 s | 1.13 s | 0 ms | 0 | 0.75 s | 0.0 KB | 158.6 KB |
| atmos-video | 100, 100, 100, 100, 100 | 100 | 0.76 s | 1.21 s | 0 ms | 0 | 0.93 s | 0.0 KB | 147.6 KB |
| atmos-webgl | 85, 100, 100, 100, 100 | 100 | 0.75 s | 1.10 s | 0 ms | 0 | 0.76 s | 11.6 KB | 39.9 KB |

### CPU 4x throttle, desktop viewport 1280x720, scripted wheel scroll then interactions, medians of 3

| ID | TBT load | TBT whole session | longest task | INP (scripted) | CLS | frame p95 | frame p99 | frames >33 ms | dropped frames | script time |
|---|---|---|---|---|---|---|---|---|---|---|
| s0 | 11 ms | 11 ms | 61 ms | 24 ms | 0 | 16.8 ms | 16.8 ms | 0% | 1 | 16 ms |
| s1 | 0 ms | 0 ms | 0 ms | 16 ms | 0 | 16.7 ms | 16.8 ms | 0% | 0 | 33 ms |
| s2 | 23 ms | 23 ms | 73 ms | 16 ms | 0 | 16.7 ms | 16.8 ms | 0% | 1 | 88 ms |
| s3 | 27 ms | 27 ms | 77 ms | 16 ms | 0 | 16.7 ms | 16.8 ms | 0.3% | 1 | 128 ms |
| s4 | 43 ms | 43 ms | 92 ms | 16 ms | 0 | 16.8 ms | 16.8 ms | 0% | 2 | 226 ms |

### CPU 4x throttle, mobile viewport 390x844, touch scroll gestures, medians of 3

| ID | TBT load | TBT whole session | longest task | INP (scripted) | CLS | frame p95 | frame p99 | frames >33 ms | dropped frames | script time |
|---|---|---|---|---|---|---|---|---|---|---|
| s0 | 0 ms | 0 ms | 0 ms | 16 ms | 0 | 16.7 ms | 16.8 ms | 0% | 2 | 7 ms |
| s1 | 0 ms | 0 ms | 0 ms | 16 ms | 0 | 16.8 ms | 16.8 ms | 0% | 1 | 17 ms |
| s2 | 34 ms | 34 ms | 84 ms | 32 ms | 0 | 16.8 ms | 16.8 ms | 0% | 1 | 113 ms |
| s3 | 24 ms | 24 ms | 74 ms | 16 ms | 0 | 16.7 ms | 16.8 ms | 0% | 1 | 104 ms |
| s4 | 45 ms | 45 ms | 95 ms | 24 ms | 0 | 16.7 ms | 16.8 ms | 0% | 1 | 231 ms |

### S0 forced to its JS fallback path (`?fallback=1`), desktop

| ID | TBT load | TBT whole session | longest task | INP (scripted) | CLS | frame p95 | frame p99 | frames >33 ms | dropped frames | script time |
|---|---|---|---|---|---|---|---|---|---|---|
| s0-fallback | 0 ms | 0 ms | 0 ms | 16 ms | 0 | 16.8 ms | 16.8 ms | 0.4% | 2 | 22 ms |

### Atmosphere, CPU 4x, desktop, medians of 3

| ID | TBT load | TBT whole session | longest task | INP (scripted) | CLS | frame p95 | frame p99 | frames >33 ms | dropped frames | script time |
|---|---|---|---|---|---|---|---|---|---|---|
| atmos-none | 0 ms | 0 ms | 0 ms | null ms | 0 | 16.8 ms | 16.8 ms | 0% | 0 | 2 ms |
| atmos-webp | 0 ms | 0 ms | 0 ms | null ms | 0 | 16.7 ms | 16.8 ms | 0% | 0 | 2 ms |
| atmos-webp-grain | 0 ms | 0 ms | 0 ms | null ms | 0 | 16.7 ms | 16.8 ms | 0% | 0 | 2 ms |
| atmos-video | 0 ms | 0 ms | 0 ms | null ms | 0 | 16.8 ms | 16.8 ms | 0% | 0 | 2 ms |
| atmos-webgl | 0 ms | 0 ms | 0 ms | null ms | 0 | 16.7 ms | 16.8 ms | 0% | 0 | 39 ms |

### Accessibility and failure-state checks (one scripted pass per candidate)

| ID | Space/PageDown/End/Home work | anchors landing under sticky header | find-in-page (window.find) | reduced motion | JS off: lit words min opacity at paragraph end | touch: px moved per 600 px gesture | 200% zoom: horizontal overflow; step text in box |
|---|---|---|---|---|---|---|---|
| S0 | Y/Y/Y/Y | none | Your name: found, not readable<br>Open for business: found, not readable<br>Set your brand: readable<br>Panel 4 of 5: found, not readable | 0 anim, steps overlap false, lenis false, pins 0 | 1 / overlap true | 603, 605, 603 (sent 600) | 0 px; steps fit/fit/fit |
| S1 | Y/Y/Y/Y | none | Your name: found, not readable<br>Open for business: found, not readable<br>Set your brand: readable<br>Panel 4 of 5: found, not readable | 0 anim, steps overlap false, lenis false, pins 0 | 1 / overlap true | 608, 596, 597 (sent 600) | 0 px; steps fit/fit/fit |
| S2 | Y/Y/Y/Y | none | Your name: found, not readable<br>Open for business: not found<br>Set your brand: readable<br>Panel 4 of 5: found, not readable | 0 anim, steps overlap false, lenis false, pins 0 | n/a (paragraph is plain text) / overlap false | 597, 596, 597 (sent 600) | 0 px; steps fit/fit/fit |
| S3 | Y/Y/Y/Y | none | Your name: found, not readable<br>Open for business: not found<br>Set your brand: readable<br>Panel 4 of 5: found, not readable | 0 anim, steps overlap false, lenis false, pins 0 | n/a (paragraph is plain text) / overlap false | 595, 608, 608 (sent 600) | 0 px; steps fit/fit/fit |
| S4 | Y/Y/Y/Y | none | Your name: found, not readable<br>Open for business: found, not readable<br>Set your brand: readable<br>Panel 4 of 5: found, not readable | 3 anim, steps overlap false, lenis false, pins 0 | 0.22 / overlap false | 608, 596, 607 (sent 600) | 0 px; steps fit/fit/fit |

### Atmosphere: bytes and idle CPU (all browser processes, 6 s after a 3 s settle; CPU seconds per wall second)

| Variant | Asset bytes | Extra JS gz | Idle CPU s/s (median of 3) | Where the CPU goes (run 1) |
|---|---|---|---|---|
| none (control) | 0 | 0 | 0.008 | |
| A1 smooth still, WebP | 9.1 KB (AVIF 4.2 KB; 390 px WebP 2.9 KB) | 0 | 0.006 | |
| A1 still with real grain, WebP | 130.0 KB | 0 | 0.008 | |
| A2 muted loop, 8 s | MP4 160 KB, WebM 110 KB | 0 | 0.047 | {'browser': 0.003, 'renderer': 0.016, 'GPU': 0.043, 'network.mojom.NetworkService': 0, 'storage.mojom.StorageService': 0} |
| A3 WebGL (OGL) | 0 | 13.2 KB (11.3 KB br) | 0.114 | {'browser': 0.001, 'renderer': 0.031, 'GPU': 0.06, 'network.mojom.NetworkService': 0, 'storage.mojom.StorageService': 0} |

Headless Chrome's GPU path may not match a mid-range phone; treat the ratios as direction, not as battery figures.


## 7. What the numbers say (and what they cannot)

1. **Weight is the clear separator.** Gzip JS: S0 0.5 KB, S1 6.0, S2 47.1, S3 52.4, S4 112.3. Script time under 4x throttle for the whole session: S0 16 ms, S1 33, S2 88, S3 128, S4 226 (desktop). Differences in blocking time are small in absolute terms (TBT 0 to 43 ms) because the scene is small; below about 50 ms they are noise at 3 runs.
2. **Lighthouse cannot separate them on this scene**: every run of every candidate scores 100 except one 99 on S4. Do not read that as "no difference". The one visible Lighthouse effect is **S4's LCP, 1.71 s against 1.20 to 1.25 s**, consistent over five runs. Cause, read from the HTML it serves: framer-motion server-renders the frame as `style="opacity:0;transform:translateY(24px)"` and the words at `opacity:0.22`, so the largest element stays invisible until hydration finishes.
3. **Frame cadence did not differ** (p95 and p99 of 16.7 to 16.8 ms in every candidate, desktop and touch). I cannot claim any candidate scrolls smoother from rAF timing; headless vsync pins it near 60 fps. **Whether Lenis feels better is perception and is the founder's call** (`motion-bench/feel-test.html`, blind A/B of S0 and S1).
4. **Native touch stays native in every candidate**: a 600 px synthesized swipe moved the page 595 to 608 px in all five, including Lenis (default `syncTouch` off) and GSAP+Lenis.
5. **Keyboard (Space, PageDown, End, Home) works in all five. None of the four in-page anchors tested landed under the 64 px sticky header in any of the five**, including with Lenis (its anchors option) and GSAP pins. Text at 200% zoom (640 x 360 CSS px) had no horizontal overflow and every pinned step's text fitted its box in all five.
6. **Find-in-page is the real accessibility cost of pinned scenes, and it is the same in all five.** Of four searches (a step 1, a step 3, a panel 4, a panel 5), only the visible step was readable; the others were found but off-screen or at zero opacity. With GSAP (S2, S3) the hidden step is not found at all, because `autoAlpha` also sets `visibility: hidden`. Pinned text sequences therefore hide content from a reader who searches the page. The static layout used for reduced motion and no-JS shows all of it. (Tested with `window.find`; the browser's own find bar was not automated.)
7. **Reduced motion:** S0, S1, S2 and S3 render the static layout (0 running animations, no pins, Lenis off, no overlap). **S4 as written does not**: 3 animations still run and some motion elements stay at opacity 0, because framer-motion needs `MotionConfig reducedMotion="user"` which the 21st.dev code does not set.
8. **JS off:** S0 keeps working without JS in a supporting browser (51 CSS animations run; words fully lit at the end of the paragraph; S1 behaves the same as it shares the CSS). S2 and S3 show plain text. **S4 leaves the paragraph at 22% opacity** because the server HTML carries it.
9. **S0's own fallback path costs nothing measurable** (22 ms script, no long tasks, 0.4% of frames over 33 ms against 0% native; CLS 0).
10. **Atmosphere:** a smooth still is 9 KB and free; the same composition with real grain is 14 times larger (133 KB) and still free at runtime; an 8 s muted loop is 112 to 164 KB and costs about 6 times the idle CPU of the page with no atmosphere (0.047 against 0.008 CPU-seconds per second); WebGL is 11.6 KB gzip of JS plus about 14 times that idle CPU (0.114), and one of five Lighthouse runs dropped to 85 with an LCP of 1.67 s. The default expectation holds: **pre-rendered unless WebGL is clearly worth it. Here it is not.**

**What I could not measure:** a real mid-range Android; real Safari and Firefox (only Chrome 154 was run, so the fallback was tested by forcing it, not in those browsers); INP under human input; battery; the browser's own find bar; network on a real connection (local server, Lighthouse simulates throttling); any perception of smoothness.

## 8. Budget
The Spec already says JS at most 90 KB gzip in total and no animation library above the fold (Spec 16.2, 15.4). The proposal in the brief (at most 15 KB gzip before first paint, at most 45 KB gzip in total after interaction) is stricter. Against it: **S0 0.5 KB and S1 6.0 KB pass both. S2 (47.1 KB) misses the 45 KB total by 2.1 KB and S3 (52.4 KB) by 7.4 KB. S4 (112.3 KB, all before first paint) fails both, and the Spec's 90 KB.** I propose keeping the brief's numbers for the home route, because every hero in this round weighs 0 KB of JS before and after interaction apart from 0.6 to 1 KB inline.

## 9. Recommendation
**S0 (native only), with nothing else for the home route.** Reasons, all measured: 0.5 KB of JS; no content hidden from find-in-page or JS-off readers; no difference in keyboard, anchor, touch or zoom behaviour from the heavier options; reduced motion and failure states are the default layout; it needs no dependency (the site's `gsap`, `three`, `framer-motion` and friends can leave). The honest limits are support (Firefox needs the fallback, Safari before 26 and iOS before 26 as well) and craft (CSS can pin and scrub transforms and opacity but cannot sequence arbitrary timelines).

**Smooth scrolling: not recommended, not rejected.** S1 adds 5.5 KB gzip after `load` and no measurable penalty. The reasons not to ship it are the Spec's reject list, one more thing to break, and the fact that the data cannot show a benefit. The founder should run `feel-test.html`; if S1 wins blind, ship it **desktop pointer only** (touch is already native) and reduced-motion off.

**If the founder rejects S0:** (a) if the objection is browser coverage, S0 with its fallback is already measured and costs nothing extra; (b) if a feature needs pinned scrubbed timelines, load S2 on that route only, never on the home route, and keep the paragraph and step text outside `autoAlpha`; (c) S4 as written should not ship under any condition: fix `MotionConfig reducedMotion="user"`, remove the inline `opacity:0`, then re-measure, and accept the 112 KB.

Self-hosting, version pinning, tree shaking, after-first-paint loading, content visible if the library fails, no layout shift, no touch hijack and working anchors are all true of S1 as built (Lenis 1.3.26, `autoRaf`, loaded on `load`). Compatibility: Lenis and GSAP are framework-agnostic; framer-motion 14 lists React 18 or 19; none of them needs changes to Next 15.1 beyond `"use client"` boundaries.
