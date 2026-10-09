---
name: typeset
description: "Improves typography by fixing font choices, hierarchy, sizing, weight, and readability so text feels intentional. Use when the user mentions fonts, type, readability, text hierarchy, sizing looks off, or wants more polished, intentional typography."
argument-hint: "[target]"
user-invocable: true
---

<!-- impeccable-pinned-skill -->

This is a pinned shortcut for `/impeccable typeset`.

**Cyper Studio:** No intended font reaches the page: everything renders in the system sans. Geist is loaded via `next/font` in `app/layout.js` but its variables are never applied; `font-clash` and `font-playfair` (used in `Hero.jsx`) are undefined, and the OTFs in `public/Assets/Fonts/` have no `@font-face`. Confirm the intended pairing and fix that wiring before tuning the scale (see DESIGN.md, Drift and Open Questions). Shared rules: the Design section of `CLAUDE.md`.

Invoke /impeccable typeset, passing along any arguments provided here, and follow its instructions.
