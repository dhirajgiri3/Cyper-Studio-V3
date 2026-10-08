---
name: live
description: >
  Interactive live variant mode for the Cyper Studio website: pick an element in the browser while `npm run dev` is running, generate HTML+CSS variants, and hot-swap them. Variants must stay inside the calm light-mode system. Use to compare layouts or hierarchy on a Persuade surface.
metadata:
  domain: Website / Cyper Studio + HELIX
  dependencies:
    - Cyper_Studio_Redesign.md
    - PRODUCT.md
    - DESIGN.md
    - .impeccable/site-context.md
  related_skills:
    - layout
    - bolder
    - typeset
---

<!-- impeccable-pinned-skill -->

This is a site-aware `live` skill that delegates to `$impeccable live`.

**Read first (once per session):** `.impeccable/site-context.md` (surface modes, the Site Gate, personas, command policy, known repo gaps) and `PRODUCT.md`. The Spec is `Cyper_Studio_Redesign.md`; it wins over this wrapper.

## Site Live Context

**Dev server:** `npm run dev` (Next.js 15 with Turbopack, default `http://localhost:3000`). `localhost` is allowed in dev only; it must never appear in `app/`, `public/`, or build output (the domain gate fails on it).

**Setup:** follow `.impeccable/impeccable/reference/live.md` first-time setup once; record config in `.impeccable/live/config.json`. Any CSP edit requires explicit consent. `.impeccable/design.json` supplies tokens to the panel; keep it in sync with DESIGN.md (`/document`).

**Variant rules:**
- Persuade surfaces only (`/`, `/helix`, `/about`, `/contact`). Do not use live on Read pages except for typography.
- Every variant obeys the Site Gate: tokens only, no gradients/glow, accent discipline, no new devices, no claims beyond the register, hero still in the server HTML.
- Generate variants that differ in **hierarchy, composition, density, and type scale**, not in decoration.
- On accept, run `bash scripts/check-all.sh`, the detector once, and a JS-off check of the changed section.

## Delegation

Invoke `$impeccable live` with any target passed here and follow its instructions in full. The Site Gate in `.impeccable/site-context.md` is the exit check; when done, name which checks ran and which were not run.
