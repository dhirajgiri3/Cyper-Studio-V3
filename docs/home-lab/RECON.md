# RECON: Brief 03 homepage build (8 Oct 2026)

One page. Facts first, then decisions.

## Stack facts
- Next.js 15.1.7 App Router, React 19, JavaScript. One root layout today (`app/layout.js`) that loads `globals.css` (Tailwind 3 + legacy tokens), the styled-components registry, the legacy sidebar header and footer, and `next/font/google` Geist. `app/page.js` renders the agency `Home` (GSAP, three.js, Matter.js, tsparticles, framer-motion live under `app/components/`).
- No `content/`, no root `lib/`, no tests. Tooling for screenshots, axe and Lighthouse already exists in `design-system/home-lab/tools/` (own `node_modules`, Playwright-core + system Chrome). `sharp` is available through Next.
- Design system: `design-system/tokens/tokens.css` (generated), `components/components.css` (`.hx-*`), subset variable Geist and Geist Mono in `design-system/fonts/`. Wordmark vector: `design-system/home-lab/brand/helix-wordmark.faithful.svg`, verified fill `#4161F4`.
- Helyo sources: hero render `~/Downloads/Helyo_3D_Production_Pack/anchors/A02-refined-hero.png` (1254 px, pure-white 254 background), emotion sheet `A03` (3 x 3), gesture sheet `docs/research/Helyo-reference/05`. The "Helyo guide v0.5" is not in the repo under that name; the binding rules were read from `HELYO_3D_PRODUCTION_PROMPT.md` (Route Line states, tenant rule, no claimed actions).

## Reuse
- Tokens for spacing, motion ease, radii, control heights; `.hx-field`/`.hx-input` patterns and the focus-ring rule, re-implemented in the page stylesheet with warm-paper values (the `.hx-*` file assumes white/cool ink, so it is not imported whole).
- Self-hosted Geist + Geist Mono through `next/font/local` from `design-system/fonts/` (preload Geist only; Mono is not preloaded).
- The faithful wordmark path, inlined.

## Isolation of `/` from legacy code
Two route groups, each with its own root layout:
- `app/(helix)/layout.js`: new root layout, imports only `home.css` and local fonts. Holds `page.js` (the homepage) and private `_components/`.
- `app/(legacy)/layout.js`: the old root layout moved unchanged except relative import paths. `about/` and `projects/` moved inside it, URLs unchanged. The agency `app/page.js` is parked unrouted at `app/(legacy)/_home/page.js` (private folder), not deleted.
- So `/` never imports `globals.css`, styled-components, the legacy header, sidebar, footer, GSAP, three.js or Matter.js. Proof: the first-load JS figure for `/` in the `next build` route table (recorded in ROUND_LOG.md).
- Navigating between `/` and `/about` is a full page load (different root layouts). Acceptable: the new page links only to its own anchors.

## Demo form delivery (Phase D)
`app/api/demo/route.js` validates on the server, applies a per-IP rate limit and a honeypot, then calls `lib/leads.js`. Env vars (none exist yet; nothing is written to `.env*`):
- `SMTP_HOST`, `SMTP_PORT` (465 implicit TLS or 587 STARTTLS), `SMTP_USER`, `SMTP_PASS`
- `LEADS_TO` (default `info@cyper.studio`), `LEADS_FROM` (must be an address on the canonical domain)
If any required var is missing the API returns `503 {fallback: "mailto"}` and the form shows "Email info@cyper.studio" with a mailto link. It never pretends to send.

## Claim map (summary; full map in CLAIM_MAP.md)
- Usable: C-01..C-05; plus the facts the founder states in Brief 03 Section 4 (B2C parcel + B2B heavy freight and LTL, multi-carrier booking through carrier accounts, quotations, rate cards with slabs/zones/surcharges/validity, tenant- and seller-specific pricing, contracts, settlement and reconciliation, operator and admin controls). These promote parts of C-07, C-10, C-11 and C-12 from `[BRIEF-ONLY]` to `[BRIEF]` by founder statement; PRODUCT.md should be updated through `/init` (not edited here).
- HOLD (absent from the build): C-06 wording, traction (C-15), NDR/WhatsApp (C-09), COD remittance specifics, named carriers, tracking pages, international and HSN (C-13, C-14), legal entity and city, response time. Listed in OPEN_CLAIMS.md.

## Risks
1. Spec 9.2 hero acceptance wants "white-label", "logistics" and "platform" in h1 + subhead; Brief 03's subhead has only "platform". The eyebrow and an early entity line carry the other two. Spec and Brief disagree; Brief 03 is the newer founder instruction. Logged in OVERRIDES.md.
2. Rough cutouts from an off-white render: edge fringes and baked shadows. Mitigated by a shadow matte (shadow kept as semi-transparent warm grey) and a 1 px feathered edge.
3. A page-height Route Line needs layout measurement. With JS off, a static drawn rail is shown instead; with reduced motion the path is fully drawn.
4. Two blues (D-1): render inlay `#323BF3` (measured) vs wordmark `#4161F4`. The page uses one token so the founder's choice is a one-line change.
5. Legacy gate failures under `app/(legacy)` and `app/components` remain (migration backlog).
