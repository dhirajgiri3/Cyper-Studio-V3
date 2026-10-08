---
name: harden
description: >
  Makes a Cyper Studio website page resilient: form states (idle, invalid, submitting, success, failure-with-email, no-JS POST), spam handling, 404, JavaScript disabled, reduced motion, missing or slow images, long and non-Latin input, the rupee glyph, and unconfirmed-content gating. Use after build, before polish.
metadata:
  argument-hint: "[target page or component]"
  domain: Website / Cyper Studio + HELIX
  dependencies:
    - Cyper_Studio_Redesign.md
    - PRODUCT.md
    - DESIGN.md
    - .impeccable/site-context.md
  related_skills:
    - polish
    - clarify
    - audit
---

<!-- impeccable-pinned-skill -->

This is a site-aware `harden` skill that delegates to `$impeccable harden`.

**Read first (once per session):** `.impeccable/site-context.md` (surface modes, the Site Gate, personas, command policy, known repo gaps) and `PRODUCT.md`. The Spec is `Cyper_Studio_Redesign.md`; it wins over this wrapper.

## Site Harden Context

This is a static marketing site; the Helix "7 UI states" do not apply. Harden these instead:

**Contact/demo form (Spec 12.3, 18.6) - a submission must never fail silently:**
- States: idle, field-invalid (inline, with icon, persistent labels), submitting (button disabled, `aria-busy`), success (replaces the form; names the visitor's email; "what happens next" only with confirmed steps), failure (shows the direct `info@` address and a retry), rate-limited, honeypot-tripped (looks like success to bots, discarded server-side).
- No-JS: `<form method="post">` to the same endpoint; server validates everything; time-to-submit and IP rate limit; store durably, then notify `info@`, then auto-reply; if any step fails, return the error state with the email.
- Correct `type`/`autocomplete`; do not block free email domains; no raw email/message text in analytics.

**Rendering and content resilience:**
- JS disabled: hero, nav, FAQ (`<details>`), diagrams, entity line render; reveal classes are added after hydration, never required.
- Unconfirmed content is **absent from the build** (`confirmed === true` filter), not CSS-hidden; the `{{CONFIRM` gate fails the build.
- Images: width/height reserved (CLS 0), meaningful alt, graceful absence of the screenshot (the dev "Screenshot pending" frame must never reach production).
- Fonts: size-adjusted fallback; `₹12,450.00` renders from the shipped subset.
- Reduced motion: every animation is off under `prefers-reduced-motion`.
- Long values: names, company, and message wrap; 390px has no horizontal scroll.
- Utility: custom 404 returns HTTP 404; `robots`, `sitemap`, `llms.txt` resolve; redirects are single-hop.

## Delegation

Invoke `$impeccable harden` with any target passed here and follow its instructions in full. The Site Gate in `.impeccable/site-context.md` is the exit check; when done, name which checks ran and which were not run.
