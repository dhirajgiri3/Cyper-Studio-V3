---
name: quieter
description: >
  Strips agency-era noise from the Cyper Studio website: gradients, glow, blobs, sparkles, shimmer, particles, 3D, oversized motion, and loud copy. This is the default direction for legacy sections being migrated to the calm light-mode system. Use when a section feels loud, decorative, or agency-like.
metadata:
  argument-hint: "[target section]"
  domain: Website / Cyper Studio + HELIX
  dependencies:
    - Cyper_Studio_Redesign.md
    - PRODUCT.md
    - DESIGN.md
    - .impeccable/site-context.md
  related_skills:
    - distill
    - colorize
    - animate
---

<!-- impeccable-pinned-skill -->

This is a site-aware `quieter` skill that delegates to `$impeccable quieter`.

**Read first (once per session):** `.impeccable/site-context.md` (surface modes, the Site Gate, personas, command policy, known repo gaps) and `PRODUCT.md`. The Spec is `Cyper_Studio_Redesign.md`; it wins over this wrapper.

## Site Quieter Context

`quieter` is the main migration tool. The incumbent code is expressive; the Spec is calm.

**Remove (do not restyle):** `blob-slow`, `float`, `sparkle`, `pulse-glow`, `text-shimmer`, `text-reveal`, `border-pulse` keyframes and their classes in `app/globals.css`; `--accent-gradient` and gradient text; glass/blur surfaces; canvas, WebGL, particles, physics, image trails (`app/components/3D`, `app/components/Animations`); confetti; dark backgrounds.

**Replace with:** white or `--surface` backgrounds, 1px `--border`, `--ink` / `--text` type, a single `--accent` CTA, flat cards, at most one 250ms reveal.

**Copy:** replace agency voice with Spec 13.5 rewrite pairs; remove exclamation marks, emoji, and humour.

**Order of operations:** delete the effect, delete its keyframes and imports, check the bundle no longer includes the library if nothing else uses it (note it for `/optimize`), re-check contrast on the new surface, run the Site Gate. Do not leave dead CSS or unused dependencies unreported.

## Delegation

Invoke `$impeccable quieter` with any target passed here and follow its instructions in full. The Site Gate in `.impeccable/site-context.md` is the exit check; when done, name which checks ran and which were not run.
