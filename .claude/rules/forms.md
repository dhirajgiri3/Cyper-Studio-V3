---
paths:
  - "app/**/Contact*"
  - "app/**/contact/**"
  - "app/components/Common/ContactCard/**"
  - "app/api/**"
---

# Demo-request form (Spec 12.3, 18.6)

- Fields: name, work email, company, company type (select), optional monthly shipments (select), optional message (<= 500 chars). Persistent labels above, inline errors, correct `type` and `autocomplete`, 44px height. Do not block free email domains.
- Consent line: "We use your details only to reply to this request." with a Privacy link.
- Server validates everything; honeypot, minimum time-to-submit, IP rate limit. Order: store durably, notify `info@<canonical>`, auto-reply to the visitor. If any step fails, show the failure state with the direct email. **Never fail silently.**
- Works without JS via `<form method="post">` to the same endpoint. Success replaces the form; no redirect to a third-party page.
- The current code posts to Formspree and links a Calendly page. Treat both as legacy: third-party endpoints and calendars need the founder's decision (Q-14) and a privacy review.
- No raw email or message text goes to analytics. Events: `form_start`, `form_submit` (with `company_type`), `form_error` (with `reason`), `cta_click`, `email_click`.
