# Product

<!-- impeccable:product-schema 1 -->

> Source of truth: `Cyper_Studio_Redesign.md` (the "Spec"). Facts below are tagged with the Spec's evidence tags and claim IDs. When this file and the Spec disagree, the Spec wins; fix this file the same day. Anything tagged `[BRIEF-ONLY]` or unconfirmed must not be rendered as fact on the site.

## Platform

web

## Stack

Next.js 15.1 App Router, React 19, **JavaScript** (`.js` / `.jsx`, not TypeScript), Tailwind CSS 3.4, styled-components 6 (SSR registry in `app/lib/registry.jsx`). Source lives in `app/` at the repo root (there is no `src/`). Spec Section 18 assumed TypeScript, `src/`, `content/`, and Tailwind v4; those are reference defaults, adapt them to this stack. Hosting and DNS control are undecided (Q-19).

## Users

**Primary (the buyer):** founders and operators of regional couriers, 3PLs, freight brokers, franchise networks and aggregators in India who currently rent a third-party shipping platform. Four pains: brand control, margin, merchant relationship, renting vs owning technology (Spec 7.1).

**Buying committee** (Spec 7.4): champion (founder / head of product or ops), signer, technical evaluator (CTO / ops head), finance, and the vetoer (anyone burned by a vendor).

**Secondary:** enterprise shippers and D2C brands evaluating logistics tech; hires and partners; and **the programme reviewer** (Claude Startups) who runs the five-question test in under 10 seconds, with and without JavaScript, at 1366x768 and 390x844.

Visitors skew to mid-range Android on throttled 4G in India. Test there, not on a developer laptop.

## Product Purpose

Cyper Studio is a product engineering company based in India, founded 2024 (C-01, C-02). It builds **HELIX**, a white-label, multi-tenant B2C + B2B logistics operating system (C-04) that lets couriers, 3PLs, freight brokers, franchise networks and aggregators run their own branded shipping platform (C-05). Business model: SaaS platform licences plus professional services (C-03).

This website exists to (Spec 3.1): (1) pass the Claude Startups review with high confidence, (2) convert logistics operators into qualified demo requests, (3) state company vs product with zero confusion, (4) be fast, clear, polished, and strong in traditional and AI/LLM search.

**The site is about HELIX, not about the studio.** Cyper Studio is the vendor of record. The old agency/portfolio identity leaves the main page (D-09).

## Positioning

"The platform behind your brand." The operator sees HELIX; the operator's merchants and consumers see only the operator's brand, domain and colours. That white-label ownership is the differentiator a rented aggregator cannot truthfully copy. Claim C-06 ("merchants never see HELIX or Cyper Studio") is `[BRIEF-ONLY]`: phrase it as hedged fact until verified on a live tenant (Q-05).

Canonical entity definitions (reuse verbatim; Spec 17.2):
- **HELIX:** "HELIX is a white-label, multi-tenant logistics operating system built by Cyper Studio. It lets couriers, 3PLs, freight brokers, franchise networks and aggregators in India run their own branded shipping platform."
- **Cyper Studio:** "Cyper Studio is a product engineering company based in India, founded in 2024. It builds HELIX."

## Operating Context

- Surfaces: `/` and `/helix` are **Persuade**; `/contact` is Persuade (form-led); `/about` is Persuade-lite; `/changelog`, `/blog`, `/privacy`, `/terms` are **Read**. There is no **Operate** surface on this site; the HELIX operator console appears only as screenshots.
- Content lives in typed content modules, not inside components (Spec 18.4). Copy edits touch one file.
- Domain: one canonical domain (default `cyper.studio`, Q-01), `info@` on the same domain. Old `cyperstudio.in` 301-redirects in one hop. **No subdomain of either domain appears anywhere** (D-11). A previous programme submission was rejected for a subdomain mismatch.
- Quality gates are scripts (`scripts/check-*.sh`) and are binary: placeholders, banned terms, domain integrity, founding year, no-JS render.

## Capabilities and Constraints

**Confirmed (`[BRIEF]`, may be stated):** C-01 company in India; C-02 founded 2024; C-03 licence + services; C-04 HELIX definition; C-05 audience segments.

**Not confirmed (`[BRIEF-ONLY]`, render only when promoted to confirmed, otherwise absent from the build, not hidden with CSS):** C-06 invisible white-label; C-07 carrier rate shopping (name only confirmed live carriers); C-08 thermal labels; C-09 NDR recovery over WhatsApp; C-10 COD settlement and "atomic" wallet; C-11 B2C/B2B/cross-border scope; C-12 rate cards, quotations, contracts, tenant/seller pricing; C-13 HSN lookup (blocked on Q-08); C-14 international module status.

**Unconfirmed, nothing may be published:** C-15 "10+ enterprise clients" (wording ladder in Spec 4.5 only), C-16 any metric, C-17 security/compliance, C-18 any Claude/Anthropic usage.

**Hard constraints:**
- Light mode only; declare `color-scheme: light` (D-03).
- Product written **HELIX** (all caps) everywhere (D-15, pending Q-09).
- Typeface Geist Sans + Geist Mono, self-hosted; Inter fallback if `₹` (U+20B9) fails (D-05).
- Hero content (h1, subhead, trust line, CTA, entity line, `info@`) must be in the server HTML with JS disabled.
- Performance budget: LCP <= 2.5s, INP <= 200ms, CLS <= 0.1, Lighthouse mobile >= 90, JS <= 90KB gzip, CSS <= 30KB gzip, fonts <= 100KB, hero image <= 120KB (Spec 16).
- `{{CONFIRM: ...}}` placeholders block the build.
- Undecided founder questions: Q-01..Q-21 (Spec 24). Domain (Q-01), legal entity (Q-03), live capability list (Q-05) block the most work.

## Brand Commitments

- Voice: competent product builders talking founder-to-founder; clear, confident, precise, slightly technical (Spec 13.1). Capability -> Operator outcome. Concrete verbs. No metaphors in headlines.
- Glossary is binding (Spec 5.4): HELIX, Cyper Studio, Operator, Tenant, Merchant, Consumer, Carrier, NDR/COD/3PL defined once per page.
- Banned vocabulary list (Spec 13.3, `scripts/banned-terms.txt`): magic, wizard, glitter, Michelin, seamless, leverage (verb), robust, empower, streamline, world-class, AI-powered (unless demonstrably true), and the rest.
- Brand accent `#1F4FE0` is a **working choice** pending the real brand colour (D-14, Q-12). Do not treat it as final.

## Evidence on Hand

Present: the Spec (copy drafts, tokens, scripts), the existing Next.js codebase (agency-era, to be audited in Phase 0), a rejected earlier submission whose cause is known (subdomain mismatch).

**Absent, must not be fabricated:** real HELIX operator-console screenshots (Q-13), client names/logos/testimonials, any metric, legal entity name and city (Q-03), founder bio/photo (Q-11), real changelog entries (need >= 3), blog posts (need >= 2), brand colour/logo files (Q-12), live carrier list, certifications, uptime, pricing.

Until real screenshots exist, use a grey frame labelled "Screenshot pending" in development only; it must never ship.

## Product Principles

1. **Truth over persuasion.** Every sentence stating a fact traces to a claim ID. An unverified claim is absent, not softened and not hidden.
2. **Answer in eight seconds.** Category, product, customer, company, and a working contact must be visible in the first viewport without JavaScript.
3. **The product is the visual.** Real console screenshots and two honest diagrams carry the page; no stock imagery, no AI imagery, no decorative illustration.
4. **Static first, motion last.** Content never depends on JavaScript or animation; at most two motion moments per page, reduced-motion safe, transform/opacity only.
5. **One entity story, one domain.** The same definitions, founding year, name casing, and domain everywhere, generated from `siteConfig`, never hardcoded.

## Accessibility & Inclusion

WCAG 2.2 AA minimum: validate every token pair (4.5:1 body, 3:1 large text/UI), visible 2px focus ring, 44px minimum targets, full keyboard operation, skip link, `prefers-reduced-motion`, diagram text alternatives, form labels with correct `autocomplete`, no meaning by colour alone. Copy is plain, Indian-English friendly, grade 8-10, no idiom or slang.
