---
name: bolder
description: >
  Raises visual authority of a timid or flat Cyper Studio website section through hierarchy, scale, spacing, and product framing, within the calm light-mode system. Use when a section feels generic or low-contrast. It never adds gradients, glow, texture, illustration, or motion.
metadata:
  argument-hint: "[target section]"
  domain: Website / Cyper Studio + HELIX
  dependencies:
    - Cyper_Studio_Redesign.md
    - PRODUCT.md
    - DESIGN.md
    - .impeccable/site-context.md
  related_skills:
    - layout
    - typeset
    - quieter
---

<!-- impeccable-pinned-skill -->

This is a site-aware `bolder` skill that delegates to `$impeccable bolder`.

**Read first (once per session):** `.impeccable/site-context.md` (surface modes, the Site Gate, personas, command policy, known repo gaps) and `PRODUCT.md`. The Spec is `Cyper_Studio_Redesign.md`; it wins over this wrapper.

## Site Bolder Context

On this site, "bolder" means **more confident, not more decorated**. The Spec rules out the usual levers (gradients, glow, blobs, particles, 3D, coloured fills; Section 14.6, 15.4).

**Allowed levers:**
1. **Type contrast:** push the h1/h2 clamp to the top of its range, tighten tracking per DESIGN.md, increase weight contrast (600 headings vs 400 body), set key figures in Geist Mono at display size.
2. **Product framing:** give the real console screenshot a bigger frame (`--r-lg`, `--shadow-2`, corner brackets), crop to the module that proves the claim, add numbered accent annotations.
3. **Whitespace and scale:** fewer elements per section, larger gaps (96/128px), asymmetric two-column hero.
4. **Signature devices:** hatched paper on one more section (max two), index labels, bracket corners.
5. **Accent discipline:** one cobalt moment per viewport, placed on the CTA.
6. **Diagram presence:** enlarge Diagram 1 or 2 and use `--accent` for the single highlighted node.

**Forbidden:** gradient text/backgrounds, glow, glass, blob or particle backgrounds, parallax, new colours, decorative icons at scale, emoji, stock imagery, any claim stronger than the register allows. If the only way to make it bolder is one of those, say so and stop.

## Delegation

Invoke `$impeccable bolder` with any target passed here and follow its instructions in full. The Site Gate in `.impeccable/site-context.md` is the exit check; when done, name which checks ran and which were not run.
