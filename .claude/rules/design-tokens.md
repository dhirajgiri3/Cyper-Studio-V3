---
paths:
  - "app/**/*.css"
  - "app/**/*.jsx"
  - "app/**/*.js"
  - "tailwind.config.mjs"
---

# Design tokens and visual system

Authority: `DESIGN.md` and Spec Section 14 / Appendix B.

- Light mode only (`color-scheme: light`). No `prefers-color-scheme: dark`, no dark `themeColor`, no theme toggle.
- No raw hex/rgb/px in components. Colours, radii, spacing, shadows, motion come from CSS variables mapped in `tailwind.config.mjs`. Spacing from 4, 8, 12, 16, 24, 32, 48, 64, 96, 128; radii 6, 10, 16.
- Accent `#1F4FE0` is a working choice (D-14). Wire it through `--accent` so changing it is a one-line edit. Accent only for CTAs, links, focus, diagram highlights.
- Flat: 1px `--border`, no shadow except `--shadow-1/2` on product frames. No gradients, glass, glow, blob, sparkle, shimmer, pulse.
- Geist Sans + Geist Mono (already loaded via `next/font/google` in `app/layout.js`), weights 400/500/600 only. Verify `₹` (U+20B9) before locking; Inter is the fallback (D-05). Data in mono + tabular numerals. Nothing under 14px; no italic body.
- Buttons >= 44px, one primary per viewport, 2px accent focus ring on every interactive element, never removed.
- Signature devices only: hatched paper (<= 2 sections), corner brackets, mono index labels, annotated screenshots. A new device goes into the Spec first.
- Icons: `lucide-react`, 1.5px stroke. Do not add `react-icons` usage.
- Prefer Tailwind + variables over styled-components for new work.
