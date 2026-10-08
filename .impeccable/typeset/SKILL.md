---
name: typeset
description: >
  Applies the Cyper Studio website type system: Geist Sans + Geist Mono self-hosted (Inter fallback if the rupee sign fails), the Spec's scale, mono for data, tabular figures, 65ch prose, three weights. Use for font choice, hierarchy, readability, number display, or the rupee-glyph test.
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
    - colorize
    - audit
---

<!-- impeccable-pinned-skill -->

This is a site-aware `typeset` skill that delegates to `$impeccable typeset`.

**Read first (once per session):** `.impeccable/site-context.md` (surface modes, the Site Gate, personas, command policy, known repo gaps) and `PRODUCT.md`. The Spec is `Cyper_Studio_Redesign.md`; it wins over this wrapper.

## Site Typeset Context (Spec 14.2, D-05)

**Fonts:** Geist Sans (headings, body) + Geist Mono (numbers, labels, data). `app/layout.js` already loads both via `next/font/google`, which self-hosts at build time; keep it, but verify the subset includes **U+20B9 (₹)**: render `₹12,450.00 · AWB 1234567890` at 32px in a temporary page. If `₹` falls back to a system font, switch to Inter (or add a compatible glyph) before locking D-05. Limit to weights 400/500/600, Latin subset, `display: swap`, one preloaded file, size-adjusted fallback, no runtime third-party font host.

**Scale (tokens in DESIGN.md):** h1 `clamp(2.5rem, 1rem + 5vw, 4.25rem)` / 1.05 / -0.03em; h2 `clamp(1.75rem, 1rem + 2.5vw, 2.75rem)` / 1.12 / -0.02em; h3 1.25rem / 1.3; body 1.0625rem / 1.65, max 65ch; small 0.875rem; mono label 0.75rem uppercase +0.06em.

**Rules:**
- One h1 per page; sections h2; modules h3.
- Data in mono + `font-variant-numeric: tabular-nums`: AWB numbers, rates, weights, COD amounts, step indices; numeric columns right-aligned.
- No italic body text; no text below 14px; no more than three weights; no ad-hoc `text-[x]` sizes outside the scale.
- Headlines state a fact; question-shaped h2 only where natural for answer engines; no metaphors.
- Hero text is the LCP candidate; never let a webfont swap move it (size-adjusted fallback).
- Sentences average <= 20 words, paragraphs <= 3 sentences, grade 8-10 reading level.

## Delegation

Invoke `$impeccable typeset` with any target passed here and follow its instructions in full. The Site Gate in `.impeccable/site-context.md` is the exit check; when done, name which checks ran and which were not run.
