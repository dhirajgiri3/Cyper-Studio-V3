# Motion catalogue (v0.0, 8 Oct 2026)

Every distinct motion seen on the 12 reference pages and in the five 21st.dev components supplied in `Motion_Components_Prompt.md`, with its purpose, measured or source-evident cost, and a verdict for HELIX.

**HELIX rules applied (locked):** at most two motion moments per page; animate only `transform` and `opacity`; no scroll hijacking, parallax, autoplay video above the fold, or animation library above the fold; all content visible with JavaScript disabled; honour `prefers-reduced-motion`; LCP <= 2.5 s, JS <= 90 KB gzip.

**Evidence standard:** mechanism is stated only where evidence shows it (named keyframes, stylesheet rules, library globals, source code supplied in the prompt). Duration and easing are known only for CSS/Web Animations and the supplied source; JS, canvas and WebGL motion timing was **not measured** (no frame capture available).

## Verdict summary

| ID | Motion | Verdict |
|---|---|---|
| M-01 | One-time scroll reveal (rise + fade) | **ADAPT** (counts as a moment) |
| M-02 | Hover and focus colour transitions | **ADOPT** (free; not a moment) |
| M-03 | Hero product-frame fade-in on load | **ADAPT** (moment 1; never on the LCP text) |
| M-04 | Diagram reveal | **ADAPT** (moment 2; opacity only) |
| M-05 | Tabbed product views | **ADAPT** (CSS-only, instant or 150ms cross-fade) |
| M-06 | Typed or cycling headline | REJECT |
| M-07 | Scroll-pinned hero with headline swap | REJECT |
| M-08 | WebGL, particle, ribbon or 3D backdrop | REJECT |
| M-09 | Logo marquee / infinite scroller | REJECT |
| M-10 | Carousels (manual or auto) | REJECT (auto); static list instead |
| M-11 | Sticky header with backdrop blur | **ADAPT** (plain sticky 64px, border on scroll) |
| M-12 | Liquid-metal shader button (21st.dev) | REJECT |
| M-13 | Infinite pulses, dash flow and live-counter tickers (ink-orbit) | REJECT |
| M-14 | Looping image stream (image-stream-hero) | **REJECT by default**; founder decision (see D-3 in the Decision Sheet) |
| M-15 | Scroll-linked transform and wheel-driven morph (hero-section-3, scroll-morph-hero) | REJECT |
| M-16 | CSS scroll-driven animation (`animation-timeline: view()`) | **ADAPT** (progressive enhancement, content visible by default) |
| M-17 | Stroke-draw line animation (ink-orbit `stroke-dashoffset`) | REJECT as written; M-04 is the compliant form |

## Entries

### M-01 One-time scroll reveal
- **Seen:** all sites create IntersectionObservers (spacefs 28, handhold 30, workos-atlas 29, eden 32, wama 83); `ink-orbit-features` uses `.ib-reveal` with `translateY(18px)`, `.8s cubic-bezier(.2,.7,.2,1)`.
- **Purpose:** ease content into view; signal sequence.
- **Cost:** about 0.5 KB of JavaScript for one shared observer; no layout cost with `transform` and `opacity`.
- **HELIX form:** 8px rise and fade, 250ms, `--ease`, once per element; the "hidden" start state is applied by JavaScript after hydration only to elements below the fold, so the default (no JS, or before JS) is visible. Disabled under reduced motion. Note the source easing already equals the Spec's `--ease`; the source's 18px and 0.8s exceed the budget.
- **Survives no-JS, reduced-motion and performance rules:** yes.

### M-02 Hover and focus colour transitions
- **Seen:** every site.
- **HELIX form:** `background-color` and `border-color` 150ms `--ease`; focus ring appears instantly (no transition) so keyboard users never wait. Not counted as a moment.

### M-03 Hero product-frame fade-in
- **Seen:** eden `hero-card-in` keyframe, spacefs product window after load.
- **Purpose:** the first motion moment: the product frame settles into place.
- **Rule specific to HELIX:** animate the **frame only**, never the h1, subhead or CTA. Hiding the LCP element until JS runs would push LCP out and break the no-JS requirement. If the screenshot is the LCP image, apply no opacity start state to it; animate its container's shadow/transform instead, or skip the moment.
- **Form:** opacity 0 to 1 and `translateY(8px)` to 0, 250ms.

### M-04 Diagram reveal
- **Seen:** ink-orbit diagram elements (`.ib-sheet-in`, `.ib-line-draw`).
- **HELIX form:** the second moment: nodes and edges of Diagram 1 or 2 fade in once in sequence (opacity only, 40ms stagger, 250ms each). Final state is the default; reduced-motion and no-JS show the final state.

### M-05 Tabbed product views
- **Seen:** spacefs (Search/AI/Drives/Team/Clipboard), eden (Products/Coaching/...), getenergy (use-case tabs), workos-atlas (example tasks).
- **HELIX form:** CSS-only (radio group with `:checked`, or `<details name>`) so it works without JS; instant swap by default, optional 150ms cross-fade. Each panel is in the HTML. Not a moment if instant.

### M-06 Typed or cycling headline
- **Seen:** eden (`eden-caret-blink`, JS-typed text).
- **Why rejected:** needs JS to show the headline, delays reading, adds an infinite blink (one infinite animation still ran under reduced motion), and hides the h1 from the first paint.

### M-07 Scroll-pinned hero with headline swap
- **Seen:** spacefs (headline changed between the 0% and 40% frames while the hero stayed in place).
- **Why rejected:** pinned scroll storytelling is scroll-linked layout control, fails the no-JS test as a story (only the first state is guaranteed), and ties content visibility to scroll position.

### M-08 WebGL, particle, ribbon or 3D backdrop
- **Seen:** spacefs (particle canvas; about 61 rAF per second at idle; 893 KB JS), handhold (WebGL2 ribbon; 7 canvases; 1.1 MB JS), workos-atlas (3D robot via WebGPU/WebGL; 1.6 MB JS), stableapp (2D and WebGL canvas; 260 rAF per second; 1.9 MB JS).
- **Cost (measured):** these pages scored 37 to 42 on Lighthouse performance with lab LCP 5.9 to 12.9 s.
- **Why rejected:** budget, continuous main-thread work, no-JS fallback, and Spec 14.6/15.4.

### M-09 Logo marquee
- **Seen:** stableapp, shiprocket, monday, handhold.
- **Why rejected:** continuous motion and HELIX has no client logos it may show (C-15 and Section 4.5).

### M-10 Carousels
- **Seen:** stableapp (Splide), shiprocket (controls over a hero), workos-atlas (dots), monday.
- **Why rejected:** auto-advance is forbidden; manual carousels hide content from first paint. Use a static grid or list.

### M-11 Sticky header with backdrop blur
- **Seen:** eden (`blur(20px) saturate(1.4)`), getenergy (`blur(18px)`), linear (`blur(20px)`).
- **HELIX form:** sticky 64px, opaque `--bg`, 1px bottom border that appears after the page scrolls (a border-colour transition, no blur). `backdrop-filter` costs paint time on low-end Android and lowers measurable text contrast.

### M-12 Liquid-metal shader button (new, not in the Spec's component verdicts)
- **Source (supplied):** `liquid-metal-button.tsx` mounts a `ShaderMount` from `@paper-design/shaders` into a div per button, creates a canvas, sets speed on hover (`setSpeed(1)`), injects a `<style>` tag at runtime, uses `transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)` (an overshooting spring, not the Spec's `--ease`), and adds a ripple keyframe animating `scale(0)` to `scale(4)`.
- **Why rejected:** WebGL on a CTA; a new dependency with unmeasured KB; `transition: all` animates non-compositor properties; overshoot easing; runtime style injection; a metallic material that contradicts the flat, ledger-like system (Spec 14.6). It would also make the primary CTA the heaviest element on the page.
- **Recommendation:** add as REJECT to Spec Section 15.5 (Decision Sheet D-2).

### M-13 Infinite pulses, dash flow and live-counter tickers
- **Source (supplied, ink-orbit-features):** `.ib-dash` (dash flow, 1.2s linear infinite), `.ib-presence` and `.ib-glow` (pulse, 2 to 2.2s infinite), `setInterval` every 2800ms and 1700ms updating a report counter and an auto-selected tab.
- **Why rejected:** continuous animation; the counters and "presence" imply live activity HELIX cannot claim (truth constraint). The component's own reduced-motion handling is correct but does not cure the truth problem.
- **Spec consistency:** matches the existing ADAPT verdict that removes fabricated live data.

### M-14 Looping image stream
- **Source (supplied, image-stream-hero):** CSS keyframes generated from a sampled path (`@keyframes` built in JS), `animation: <name> <speed>s linear infinite`, paused under `prefers-reduced-motion` (source line about 720).
- **Assessment:** continuous, GPU-friendly (transform), but it is a looping animation and needs many real images (none exist) and would be off-viewport most of the time.
- **Verdict:** the Spec says optional below the fold. Recommended REJECT by default because it needs imagery HELIX does not have and violates the "no continuous motion" posture; a static grid of labelled sample-tenant screens achieves the purpose. Founder may choose otherwise (Decision Sheet D-3).

### M-15 Scroll-linked transform and wheel-driven morph
- **Source (supplied):** `hero-section-3` uses framer-motion `useScroll` and `useTransform` to fly a plane across 5x the screen width; `scroll-morph-hero` calls `preventDefault` inside a `wheel` listener registered with `{ passive: false }`, drives springs every frame and gates content behind morph progress.
- **Verdict:** REJECT, confirming Spec 15.5.

### M-16 CSS scroll-driven animation
- **Seen:** `animation-timeline` rules exist in the stylesheets of eden and wama.
- **HELIX form:** optional mechanism for M-01, wrapped in `@supports (animation-timeline: view())` with the animation limited to `animation-range: entry 0% entry 40%`; zero JS, compositor-driven; content is visible by default where unsupported. Counts toward the budget.

### M-17 Stroke-draw line animation
- **Source (supplied, ink-orbit):** `.ib-line-draw` animates `stroke-dashoffset` over 1.8s.
- **Why rejected as written:** `stroke-dashoffset` is a paint property, not `transform` or `opacity`. M-04 delivers the same intent compliantly.

## Which scroll-linked effects survive the rules

Only **M-01** (class-based one-time reveal) and **M-16** (CSS `view()` timeline, gated by `@supports`, visible by default). Pinned, scrubbed, wheel-driven and per-frame effects (M-07, M-15) do not survive the no-JS, reduced-motion or performance rules.

## The two permitted motion moments per page (proposal)

1. **Hero:** M-03, product frame settles in (250ms).
2. **One diagram:** M-04, nodes and edges fade in once (250ms, staggered).

M-01 reveals below the fold are folded into moment 2's budget or omitted. Hover and focus transitions (M-02) and instant CSS tab switching (M-05) are not counted. This is a proposal for the Decision Sheet (D-4).
