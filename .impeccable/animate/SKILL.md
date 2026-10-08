---
name: animate
description: >
  Adds purposeful motion to the Cyper Studio website inside the Spec's motion budget: at most two moments per page, CSS-first, transform/opacity only, reduced-motion safe, applied after hydration. Use when a specific reveal or hover feedback is wanted. Refuses scroll hijacking, parallax, and animation libraries above the fold.
metadata:
  argument-hint: "[target section]"
  domain: Website / Cyper Studio + HELIX
  dependencies:
    - Cyper_Studio_Redesign.md
    - PRODUCT.md
    - DESIGN.md
    - .impeccable/site-context.md
  related_skills:
    - quieter
    - optimize
    - polish
---

<!-- impeccable-pinned-skill -->

This is a site-aware `animate` skill that delegates to `$impeccable animate`.

**Read first (once per session):** `.impeccable/site-context.md` (surface modes, the Site Gate, personas, command policy, known repo gaps) and `PRODUCT.md`. The Spec is `Cyper_Studio_Redesign.md`; it wins over this wrapper.

## Site Animate Context (Spec 15.4)

**Budget:** at most **two motion moments per page** (for example the hero screenshot fade-in and one diagram reveal). Decide which two before writing code and say so.

**Allowed:**
- Hover/focus feedback 150ms, reveals 250ms, easing `cubic-bezier(.2, .7, .2, 1)` (`--ease`, `--t-fast`, `--t-base`).
- A one-time 8px rise-and-fade reveal using only `transform` and `opacity`.
- Pure CSS (`@keyframes`, transitions, `IntersectionObserver` adding a class) preferred over a library.

**Required:** content is visible with JS disabled; animation classes are added after hydration; every animation is disabled under `prefers-reduced-motion: reduce`; no layout-affecting properties (no animating width/height/top/left/margin).

**Forbidden:** scroll-jacking or `preventDefault` on wheel/touch, parallax, auto-advancing carousels, autoplay video above the fold, continuous/looping animation, animation library code above the fold (`gsap`, `framer-motion`, `three` must not load in the hero), `scroll-morph-hero`, `hero-section-3`.

If `framer-motion` or `gsap` is already used somewhere, do not extend it: replace with CSS when touching the section, and note the library for `/optimize`. Any new library needs measured KB and LCP/CLS/INP before and after (Spec 15.5 rule 6).

## Delegation

Invoke `$impeccable animate` with any target passed here and follow its instructions in full. The Site Gate in `.impeccable/site-context.md` is the exit check; when done, name which checks ran and which were not run.
