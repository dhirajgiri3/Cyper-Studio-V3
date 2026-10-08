---
name: layout
description: >
  Fixes spacing, rhythm, and composition on the Cyper Studio website per Spec 14.3: 12-column grid, 1200px container, 96/64px section rhythm, two-column hero with copy first on mobile, 4-up fact strip stacking to 2x2, steppers, bordered card grids. Use for crowded, uneven, or misaligned sections.
metadata:
  argument-hint: "[target section]"
  domain: Website / Cyper Studio + HELIX
  dependencies:
    - Cyper_Studio_Redesign.md
    - PRODUCT.md
    - DESIGN.md
    - .impeccable/site-context.md
  related_skills:
    - typeset
    - adapt
    - distill
---

<!-- impeccable-pinned-skill -->

This is a site-aware `layout` skill that delegates to `$impeccable layout`.

**Read first (once per session):** `.impeccable/site-context.md` (surface modes, the Site Gate, personas, command policy, known repo gaps) and `PRODUCT.md`. The Spec is `Cyper_Studio_Redesign.md`; it wins over this wrapper.

## Site Layout Context (Spec 14.3, Section 9 layouts)

**Grid:** container max 1200px, side padding 20px mobile / 24px desktop, 12 columns; breakpoints 390 / 768 / 1024 / 1280. Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.

**Rhythm:** every section 96px vertical padding desktop, 64px mobile; constant, no one-off gaps; group related items tighter than unrelated ones (proximity); prose <= 65ch.

**Section archetypes from the blueprint:**
- **Hero:** two columns desktop (copy left, product screenshot right); single column mobile with copy first. h1, subhead, primary CTA, and trust line visible without scrolling at 1366x768 and 390x844.
- **Fact strip:** 4 cells with 1px dividers, mono labels, stacks to 2x2; no icons.
- **Problem:** 3 text-only columns with mono index numbers 01/02/03.
- **Capabilities:** 3x2 bordered cards desktop, single column mobile.
- **How it works:** horizontal 4-step stepper desktop, vertical mobile.
- **Diagrams:** inline SVG that stacks vertically at 390px.
- **Mobile sticky CTA bar:** appears only after the hero leaves the viewport, hides at the form.

**Anti-patterns:** equal spacing between all elements; more than 3 text columns; more than one primary button in a viewport; cards-in-cards; full-bleed centred text blocks wider than 65ch; horizontal scroll at 390px; shadows for hierarchy (use border and tone).

## Delegation

Invoke `$impeccable layout` with any target passed here and follow its instructions in full. The Site Gate in `.impeccable/site-context.md` is the exit check; when done, name which checks ran and which were not run.
