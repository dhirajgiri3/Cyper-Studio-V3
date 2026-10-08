---
name: document
description: >
  Maintains DESIGN.md (root) and .impeccable/design.json for the Cyper Studio website. DESIGN.md is a seeded TARGET system from Spec Section 14 and Appendix B; this command records what the code actually implements, flags the gap to the target, and never silently merges the agency-era look into the target. Use when tokens land in the repo, after a design-system change, or when DESIGN.md drifts.
metadata:
  argument-hint: "[optional: surface or component to focus on]"
  domain: Website / Cyper Studio + HELIX
  dependencies:
    - Cyper_Studio_Redesign.md
    - PRODUCT.md
    - DESIGN.md
    - .impeccable/site-context.md
  related_skills:
    - extract
    - audit
    - init
---

<!-- impeccable-pinned-skill -->

This is a site-aware `document` skill that delegates to `$impeccable document`.

**Read first (once per session):** `.impeccable/site-context.md` (surface modes, the Site Gate, personas, command policy, known repo gaps) and `PRODUCT.md`. The Spec is `Cyper_Studio_Redesign.md`; it wins over this wrapper.

## Site Document Context

**Target file:** `DESIGN.md` at the repository root (Impeccable's default), plus `.impeccable/design.json` sidecar. Do not write to any `helix-kernel` path.

**Sources, in authority order:**
1. `Cyper_Studio_Redesign.md` Section 14 and Appendix B (target tokens).
2. `app/globals.css` and any `tokens.css` it imports (what is actually implemented).
3. `tailwind.config.mjs` `theme.extend` (currently maps legacy `--primary`, `--accent-1..3`, `--neutral-*`, `--text-*`, `--space-*`).
4. `app/components/` (Button, Header, Footer, Home sections) and any styled-components themes.

**Rules:**
- DESIGN.md currently describes the **target**. When the code diverges, do not overwrite the target with the incumbent. Add a short `## Migration Status` note listing tokens implemented vs pending, and list legacy tokens slated for removal (blob/sparkle/shimmer/pulse-glow keyframes, `--accent-gradient`).
- Colours stay hex in frontmatter (Spec Appendix B is hex). Accent `#1F4FE0` is a working choice (D-14); keep the pending marker.
- Component sub-tokens are limited to the 8 allowed props; shadows, focus ring, motion go in the sidecar.
- Sidecar `design.json` must not carry Helix-app content (brand-h/s/l tenant vars, status tones). Regenerate from DESIGN.md.
- Show the existing DESIGN.md before any overwrite and offer refresh / overwrite / merge, per the engine reference.

## Delegation

Invoke `$impeccable document` with any target passed here and follow its instructions in full. The Site Gate in `.impeccable/site-context.md` is the exit check; when done, name which checks ran and which were not run.
