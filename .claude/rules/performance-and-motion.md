---
paths:
  - "app/**"
  - "next.config.mjs"
  - "package.json"
---

# Performance and motion

- Budgets (Spec 16): LCP <= 2.5s, INP <= 200ms, CLS <= 0.1; Lighthouse mobile >= 90 (target 95); HTML <= 40KB, JS <= 90KB gz, CSS <= 30KB gz, fonts <= 100KB, hero image <= 120KB, <= 25 requests above the fold, no third-party scripts except deferred privacy-friendly analytics.
- Measure on the production build (`npm run build && npm run start`), throttled 4G, mid-range Android profile. No optimization claim without a before and after number.
- Adding a dependency: record URL, licence, measured KB, and LCP/CLS/INP delta (Spec 15.5 rule 6). Default is no.
- Motion: at most two moments per page; hover/focus 150ms, reveal 250ms, `--ease: cubic-bezier(.2,.7,.2,1)`; `transform` and `opacity` only; one-time 8px rise-and-fade; classes added after hydration; everything off under `prefers-reduced-motion`.
- Forbidden: parallax, scroll hijacking (`preventDefault` on wheel/touch), auto-advancing carousels, autoplay video above the fold, continuous animation, `gsap`/`framer-motion`/`three`/particles/physics above the fold, per-frame React state, reading `window` during render.
- Images: `next/image` or pre-optimised AVIF/WebP with explicit `width`/`height`; `fetchpriority="high"` only on the LCP image; lazy-load below the fold. Heavy legacy assets in `public/Assets/Video` are not for the homepage.
- Pages are statically generated; hero text is in the initial HTML.
