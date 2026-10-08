---
name: adapt
description: >
  Adapts Cyper Studio website sections across devices per Spec 14.3 and 21.H: 390x844 and 1366x768 first-viewport checks, single-column mobile with copy before screenshot, vertical steppers and diagrams, 44px targets, sticky CTA behaviour. Use for responsive bugs and mobile verification. Target device class: mid-range Android on throttled 4G.
metadata:
  argument-hint: "[target section] [context: mobile | tablet | desktop]"
  domain: Website / Cyper Studio + HELIX
  dependencies:
    - Cyper_Studio_Redesign.md
    - PRODUCT.md
    - DESIGN.md
    - .impeccable/site-context.md
  related_skills:
    - layout
    - optimize
    - polish
---

<!-- impeccable-pinned-skill -->

This is a site-aware `adapt` skill that delegates to `$impeccable adapt`.

**Read first (once per session):** `.impeccable/site-context.md` (surface modes, the Site Gate, personas, command policy, known repo gaps) and `PRODUCT.md`. The Spec is `Cyper_Studio_Redesign.md`; it wins over this wrapper.

## Site Adapt Context

**Test viewports (Spec 3.2, 21.H):** 390x844 (mobile), 768, 1024, 1366x768 (desktop). Real mid-range Android check before launch.

**Must hold at 390x844:** h1, subhead, primary CTA, and trust line visible without scrolling (subhead <= 3 lines; trim "franchise networks" into the second sentence if needed); copy before screenshot; no horizontal scroll; 44px minimum tap targets; form inputs use correct `type`/`autocomplete`; sticky mobile CTA bar appears only after the hero leaves the viewport and hides at the form; diagrams stack vertically and stay legible; screenshots readable (consider a tighter crop, not a smaller image).

**Header:** sticky 64px with wordmark, button, menu; max five items; the current sidebar pattern (`app/components/Header/Sidebar*.jsx`) conflicts with the Spec and should be replaced, not adapted.

**Rules:** content parity across viewports (do not hide required claims on mobile); media with explicit dimensions to keep CLS at 0; use CSS breakpoints, not `window.innerWidth` during render (breaks server rendering); no hover-only information.

## Delegation

Invoke `$impeccable adapt` with any target passed here and follow its instructions in full. The Site Gate in `.impeccable/site-context.md` is the exit check; when done, name which checks ran and which were not run.
