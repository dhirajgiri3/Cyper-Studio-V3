---
name: onboard
description: >
  Designs the Cyper Studio website's first-contact flow after interest is expressed: the form success state, the auto-reply email, and the honest 'what happens next' steps. There is no in-product onboarding on this site. Use when shaping /contact success, the demo-request confirmation, or the auto-reply template.
metadata:
  argument-hint: "[target: form success, auto-reply, or next-steps block]"
  domain: Website / Cyper Studio + HELIX
  dependencies:
    - Cyper_Studio_Redesign.md
    - PRODUCT.md
    - DESIGN.md
    - .impeccable/site-context.md
  related_skills:
    - clarify
    - harden
    - shape
---

<!-- impeccable-pinned-skill -->

This is a site-aware `onboard` skill that delegates to `$impeccable onboard`.

**Read first (once per session):** `.impeccable/site-context.md` (surface modes, the Site Gate, personas, command policy, known repo gaps) and `PRODUCT.md`. The Spec is `Cyper_Studio_Redesign.md`; it wins over this wrapper.

## Site Onboard Context

Reframed: **onboarding here is the minute after "Request a demo".** The visitor is a skeptical operator or the programme reviewer; the job is to show that a real company will reply.

**Success state (replaces the form, no third-party redirect):** "Thanks. We have your request and will reply to `<their email>`." Then "What happens next:" with 2-3 steps that are **true** (`{{CONFIRM: 2 or 3 honest steps}}` until the founder supplies them), a reply-time promise only if the founder can keep it (Q-14), the direct `info@` address, and a link back to `/helix`.

**Auto-reply template (Spec Appendix F):** subject "We received your HELIX demo request"; name and company echoed; reply time; next steps; footer with Cyper Studio, legal entity, `info@` on the canonical domain. Sent through a transactional provider authenticated with SPF, DKIM, DMARC (Spec 6.4). Plain text is fine.

**Do not** invent a trial, sandbox, calendar link, or WhatsApp number (Q-14 decides), design product tours, checklists, or activation flows, or promise an onboarding timeline (Q-05/Spec 10.5 until supplied).

## Delegation

Invoke `$impeccable onboard` with any target passed here and follow its instructions in full. The Site Gate in `.impeccable/site-context.md` is the exit check; when done, name which checks ran and which were not run.
