---
name: optimize
description: >
  Diagnoses and fixes performance on the Cyper Studio website against the Spec 16 budgets: LCP <= 2.5s, INP <= 200ms, CLS <= 0.1, Lighthouse mobile >= 90, JS <= 90KB gz, CSS <= 30KB gz. Starts by measuring, then removes heavy dependencies and unused CSS. Use when a page is slow, a library was added, or before launch.
metadata:
  argument-hint: "[target route or 'site']"
  domain: Website / Cyper Studio + HELIX
  dependencies:
    - Cyper_Studio_Redesign.md
    - PRODUCT.md
    - DESIGN.md
    - .impeccable/site-context.md
  related_skills:
    - audit
    - animate
    - adapt
---

<!-- impeccable-pinned-skill -->

This is a site-aware `optimize` skill that delegates to `$impeccable optimize`.

**Read first (once per session):** `.impeccable/site-context.md` (surface modes, the Site Gate, personas, command policy, known repo gaps) and `PRODUCT.md`. The Spec is `Cyper_Studio_Redesign.md`; it wins over this wrapper.

## Site Optimize Context (Spec 16)

**Measure first; no optimization without a before/after number.** Lighthouse mobile on the **production build** (`npm run build && npm run start`), throttled 4G, mid-range Android profile; record in `docs/audit/performance.md`.

**Known heavy items in `package.json` to evaluate (Phase 0 disposition, Spec 18.5):**
- Remove or isolate: `three`, `@react-three/fiber`, `@react-three/drei`, `matter-js`, `poly-decomp`, `tsparticles-slim`, `react-particles`, `react-confetti`, `gsap`/`@gsap/react`, `react-use`, `svg-path-commander`, `imagesloaded`.
- Replace: `lodash` with native; `react-icons` with `lucide-react` (already present) inlined SVG; `framer-motion` with CSS where used for simple reveals.
- Reconsider: `styled-components` (client runtime + SSR registry) -> Tailwind + CSS variables; `react-hot-toast` only if the form needs it.
- Check what each import costs with `next build` output or `@next/bundle-analyzer`; the budget is JS <= 90KB gz total.

**Techniques (Spec 16.3):** static generation for all marketing pages; hero text in HTML; one font preload and `next/font` self-hosting; `next/image` or pre-optimised AVIF/WebP with `width`/`height` and `fetchpriority="high"` on the LCP image only; lazy-load below the fold; dynamic-import anything not needed for first paint (`ssr: false` is not allowed for primary content); no render-blocking third parties; analytics < 5KB, deferred; Brotli and immutable caching; prefetch only `/helix` and `/contact`.

**Regression gate:** `lighthouserc.json` (Spec Appendix E) enforced in CI; report budget deltas in the handoff.

## Delegation

Invoke `$impeccable optimize` with any target passed here and follow its instructions in full. The Site Gate in `.impeccable/site-context.md` is the exit check; when done, name which checks ran and which were not run.
