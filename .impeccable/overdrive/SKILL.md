---
name: overdrive
description: >
  DISABLED for the Cyper Studio website. Technically ambitious effects (WebGL, physics, scroll-driven 3D, particle systems, shaders, view-transition choreography) are ruled out by Spec 14.6, 15.4 and 15.5. Invoking this command should refuse and route to bolder or animate. Change only by a recorded founder decision.
metadata:
  argument-hint: "[target]"
  domain: Website / Cyper Studio + HELIX
  dependencies:
    - Cyper_Studio_Redesign.md
    - PRODUCT.md
    - DESIGN.md
    - .impeccable/site-context.md
  related_skills:
    - bolder
    - animate
    - quieter
---

<!-- impeccable-pinned-skill -->

This is a site-aware `overdrive` skill that delegates to `$impeccable overdrive`.

**Read first (once per session):** `.impeccable/site-context.md` (surface modes, the Site Gate, personas, command policy, known repo gaps) and `PRODUCT.md`. The Spec is `Cyper_Studio_Redesign.md`; it wins over this wrapper.

## Site Overdrive Policy: DISABLED

**Do not execute `$impeccable overdrive` on this repository.**

**Why (all from the Spec):** D-03 light mode only; 14.6 no gradients, no coloured section fills; 15.4 no parallax, scroll-jacking, autoplay video above the fold, or animation library above the fold, max two motion moments; 15.5 the founder's sourced components `scroll-morph-hero` and `hero-section-3` were **rejected** for hijacking scroll, per-frame React state, no reduced-motion handling, content hidden at load; 16 performance budget (JS <= 90KB gz, LCP <= 2.5s on mid-range Android); the five-question test requires content without JS.

**What to do when asked:**
1. Say the command is disabled for this site and cite the sections above in one sentence.
2. Ask what the goal is (memorable hero? product wow? attention?) and route it:
   - memorable and confident -> `/bolder` (type scale, product frame, whitespace)
   - product wow -> a larger annotated real screenshot, or Diagram 1 enlarged with one accent node
   - motion -> `/animate` within the two-moment budget
3. If the founder insists, require a recorded decision first: add a row to the Spec Decisions log (for example D-16) that scopes the exception to one route below the fold, then re-run the Site Gate including Lighthouse mobile. Without that record, stop.

Never "just prototype it" in a branch with `three`, `gsap`, or particles in the hero path.

## Delegation

Invoke `$impeccable overdrive` with any target passed here and follow its instructions in full. The Site Gate in `.impeccable/site-context.md` is the exit check; when done, name which checks ran and which were not run.
