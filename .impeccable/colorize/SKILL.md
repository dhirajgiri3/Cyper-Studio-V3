---
name: colorize
description: >
  Applies colour to the Cyper Studio website only where the system allows: the single cobalt accent for CTAs, links, focus and diagram highlights, state colours inside real state UI, and tinted badges. Fixes contrast. Not for adding hues or decorative colour. Use for accent discipline and contrast validation.
metadata:
  argument-hint: "[target section]"
  domain: Website / Cyper Studio + HELIX
  dependencies:
    - Cyper_Studio_Redesign.md
    - PRODUCT.md
    - DESIGN.md
    - .impeccable/site-context.md
  related_skills:
    - audit
    - quieter
    - polish
---

<!-- impeccable-pinned-skill -->

This is a site-aware `colorize` skill that delegates to `$impeccable colorize`.

**Read first (once per session):** `.impeccable/site-context.md` (surface modes, the Site Gate, personas, command policy, known repo gaps) and `PRODUCT.md`. The Spec is `Cyper_Studio_Redesign.md`; it wins over this wrapper.

## Site Colorize Context (Spec 14.1, 14.6)

**Palette is fixed:** `--bg #FFFFFF`, `--surface #F9FAFB`, `--border #E4E7EC`, `--ink #0B1220`, `--text #475467`, `--muted #667085`, `--accent #1F4FE0` (hover `#1A42BD`, tint `#EEF3FF`), `--success #067647`, `--warning #B54708`, `--danger #B42318`. Accent is a **working choice** (D-14, Q-12): wire it through variables so a brand change is a one-line edit.

**Rules:**
- Accent only on CTAs, links, focus, diagram highlights, annotation markers, and badge text on `--accent-tint`.
- State colours appear only in real state UI (form error/success), never as decoration.
- Large areas stay white or `--surface`; no coloured section fills beyond `--surface` / `--accent-tint`; no gradients on text or backgrounds.
- Never convey meaning by colour alone (pair with text or icon).
- Diagram strokes use only `--ink`, `--border`, `--accent`.

**Validation:** compute WCAG 2.2 AA for every foreground/background pair actually used (4.5:1 body, 3:1 large text and UI components), including `--muted` on `--surface` and `--accent` on `--accent-tint`; record results in the repo (for example `docs/audit/contrast.md`). The Spec's ratios are estimates, not proof.

**Remove:** `--accent-1..3`, `--accent-gradient`, dark-mode variables, neon/purple/blue glow values from `app/globals.css` once nothing references them.

## Delegation

Invoke `$impeccable colorize` with any target passed here and follow its instructions in full. The Site Gate in `.impeccable/site-context.md` is the exit check; when done, name which checks ran and which were not run.
