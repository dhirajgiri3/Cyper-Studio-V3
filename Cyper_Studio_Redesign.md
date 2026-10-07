# Cyper Studio Redesign: Master Specification

**Document version:** 1.0
**Written:** 8 October 2026
**Owner:** Founder, Cyper Studio
**Scope:** The complete plan, rules, copy, design system and implementation guide for rebuilding the Cyper Studio website around **HELIX**.

> **How to use this file.** This is the single source of truth for the redesign. Keep it in the repository root as `REDESIGN.md`. When code and this document disagree, fix one of them the same day. Every task, copy block, token and checklist in the build traces back to a section here.

---

## Table of Contents

1. Purpose, status and honest limits
2. Decisions log
3. Mission and the five-question test
4. Truth constraint, evidence tags and the claim register
5. Identity, naming and glossary
6. Domain, email and trust infrastructure
7. Audience model
8. Information architecture and route map
9. Homepage blueprint (`/`)
10. Product page blueprint (`/helix`)
11. Supporting pages: `/about`, `/contact`, `/changelog`, `/blog`, legal, utility
12. Conversion architecture
13. Voice, copy rules and the banned list
14. Design system (light mode)
15. Visuals, diagrams, motion and component sourcing
16. Performance budget
17. SEO and AI/LLM SEO
18. Technical implementation plan
19. Phase 0: codebase audit and research tasks
20. Roadmap: three ship plans
21. Quality checklists (world-class landing page standard)
22. Claude Startups submission package
23. Risk register
24. Founder decisions and open questions
25. Evidence ledger
26. Assets needed
27. Appendices (code, scripts, templates)

---

## 1. Purpose, status and honest limits

### 1.1 What this document is
A build-ready plan for turning the current site, which reads like a creative agency, into a clear, fast, HELIX-centred product website for Cyper Studio. It combines:
- the strategic brief (positioning, audience, truth rules),
- every decision made so far (Section 2),
- final-quality draft copy for each page,
- a complete design system,
- the SEO and AI-search package,
- the technical plan, test scripts and ship plans,
- the submission package for the Anthropic Claude Startups program.

### 1.2 What has and has not been done
| Item | Status |
|---|---|
| Positioning, naming, audience model, page set | Decided (this document) |
| Draft copy for all launch pages | Drafted; claims tagged; unverified items are `{{CONFIRM: ...}}` placeholders |
| Design system | Specified; accent colour and `₹` glyph test pending |
| Existing codebase audit | **NOT YET DONE.** Phase 0 task (Section 19). Nothing here was verified against the repository. |
| Competitive and reference research | **NOT YET DONE.** Phase 0 task (Section 19). Protocol and reference list included. |
| Real HELIX screenshots, metrics, legal entity text | **Supplied by the founder.** Not yet in this document. |
| Claude Startups eligibility rules | **Not verified.** Check the official program page. The founder states a founding-recency rule; that is unverified here. |

### 1.3 Rules of engagement
1. Do not ship any copy containing `{{CONFIRM` (a build gate enforces this, Appendix E).
2. Do not invent features, numbers, customers, logos, quotes, certifications or uptime.
3. When the code, the live site or this document disagree with a claim, the verified source wins and the claim is corrected here.
4. Prefer the smallest change that passes the acceptance criteria. This is a small-team project.

---

## 2. Decisions log

| ID | Decision | Status |
|---|---|---|
| D-01 | **HELIX is the subject of the site.** Cyper Studio is the product engineering company behind it. | Locked |
| D-02 | **Founded in 2024.** Every date on the site, in structured data and in the application must match. | Locked |
| D-03 | **Light mode only.** Declare `color-scheme: light`. No dark theme. | Locked |
| D-04 | **Design system first.** No page-level UI work starts before Section 14 tokens are in the repo. | Locked |
| D-05 | **Typeface:** Geist Sans + Geist Mono, self-hosted. Inter is the fallback if Geist fails the `₹` test. | Pending `₹` test |
| D-06 | **Launch pages:** `/`, `/helix`, `/about`, `/contact`, `/changelog`, `/blog`, `/privacy`, `/terms`, custom 404, `sitemap.xml`, `robots.txt`. | Locked |
| D-07 | **Deferred pages:** `/pricing` (section on `/helix` and `/contact` first), `/security` (section on `/helix` first), `/carriers`, `/status`. | Locked |
| D-08 | **Blog and changelog are written by the founder.** They ship only with real dated entries (min 3 changelog, 2 posts), otherwise they stay out of nav and sitemap. | Locked |
| D-09 | **Agency and client portfolio work leaves the main page.** Anything kept moves to a secondary page and only with written permission. | Locked |
| D-10 | **Domains:** new domain `cyper.studio`, mail `info@cyper.studio`. The old `cyperstudio.in` stays live. **One canonical domain, the other 301-redirects in a single hop.** Default recommendation: `cyper.studio` canonical. | **Founder to confirm (Q-01)** |
| D-11 | **No subdomain of either domain appears anywhere in the rendered site, scripts, links or structured data.** This includes the HELIX API health host. | Locked |
| D-12 | **No fabricated proof.** Placeholders must be visibly marked and removed before launch. | Locked |
| D-13 | **Component sourcing:** inspiration from 21st.dev is allowed under Section 15.5. Two components adapted, two rejected. | Locked |
| D-14 | **Brand colour accent** `#1F4FE0` is a working choice until a real brand colour is confirmed. | Pending (Q-12) |
| D-15 | **Casing:** the product is written **HELIX** (all caps) everywhere. | Pending (Q-09) |

---

## 3. Mission and the five-question test

### 3.1 Mission
Make the site at the canonical domain:
1. **Pass the Claude Startups review with high confidence.**
2. **Convert the right visitors** (logistics operators in India) into qualified demo requests and conversations.
3. **State company versus product with zero confusion.**
4. **Be fast, clear, visually polished, and strong in traditional SEO and AI/LLM search.**

Confidence statement: no one can guarantee acceptance. The program's complete criteria are unknown here. Success means every verifiable item in Section 22 passes.

### 3.2 The five-question test
A reviewer, human or automated, must answer all five within 10 seconds from the first viewport, on desktop (1366×768) and mobile (390×844), **with and without JavaScript**.

| # | Question | Where the page answers it |
|---|---|---|
| 1 | What is this company? | Hero trust line + header wordmark: "Cyper Studio, a product engineering company in India. Founded 2024." |
| 2 | What is the concrete product? | H1 + subhead: HELIX, a white-label, multi-tenant logistics operating system |
| 3 | Who is the target customer? | Subhead: couriers, 3PLs, freight brokers, franchise networks, aggregators in India |
| 4 | Is this a real, early-stage company building something specific? | Real operator-console screenshot, founded year, entity name, working contact path |
| 5 | Does the email domain match the website domain? | Footer and contact page show `info@` on the same domain as the site URL |

**Binary test:** with JavaScript disabled, the HTML response must contain the H1, the subhead, the entity line and the contact email (script in Appendix E).

### 3.3 Time budgets for visitors
- **About 8 seconds:** hero. Must answer questions 1 to 3.
- **About 60 seconds:** scan of headings, diagrams and capability cards.
- **About 3 minutes:** only when convinced; they read `/helix`, FAQ and contact.

---

## 4. Truth constraint, evidence tags and the claim register

### 4.1 The rule (highest priority; overrides persuasiveness and polish)
Never invent features, integrations, metrics, customers, logos, testimonials, case studies, certifications, compliance claims, uptime, pricing, team size, funding, awards or press. Any sentence that states a fact about the company or product must be traceable to an evidence tag.

### 4.2 Evidence tags
| Tag | Meaning |
|---|---|
| `[BRIEF]` | Stated by the founder in this planning work |
| `[PRODUCT-CODE]` | Verified in the HELIX product repository (path and line) |
| `[LANDING-CODE]` | Verified in the landing-page repository |
| `[LIVE]` | Verified on the live site or product |
| `[OBSERVED-URL]` | Seen on a reference page that was actually fetched (URL, date) |
| `[FOUNDER-TO-CONFIRM]` | Plausible; appears in copy only as `{{CONFIRM: ...}}` |
| `[BRIEF-ONLY]` | Stated by the founder; not yet verified in code or live product. May appear only with accurate, hedged wording, or once confirmed. |

### 4.3 Placeholder syntax
`{{CONFIRM: what is needed}}` is visible in the draft and blocks the build until resolved.

### 4.4 Claim register (what the page may say today)

| ID | Claim | Tag | Allowed wording now | Needed to upgrade |
|---|---|---|---|---|
| C-01 | Cyper Studio is a product engineering company based in India | `[BRIEF]` | As stated | None |
| C-02 | Founded in 2024 | `[BRIEF]` | "Founded in 2024" | Month if the founder wants it shown (Q-02) |
| C-03 | Business model: SaaS platform licences plus professional services | `[BRIEF]` | As stated | None |
| C-04 | HELIX is a white-label, multi-tenant B2C + B2B logistics operating system | `[BRIEF]` | As stated | Product-code confirmation |
| C-05 | HELIX lets couriers, 3PLs, freight brokers, franchise networks and aggregators run their own branded shipping platform | `[BRIEF]` | As stated | None |
| C-06 | 100% white-label: merchants and consumers never see "Cyper Studio" or "HELIX" | `[BRIEF-ONLY]` | "Merchants and consumers see only the operator's brand, domain and colours." | Verify in product code and a live tenant (Q-05) |
| C-07 | Dynamic rate shopping across Indian carriers (Delhivery, Ekart, XpressBees, Velocity, others) | `[BRIEF-ONLY]` | Name only carriers confirmed as live integrations | List of live integrations (Q-05) |
| C-08 | Thermal label generation | `[BRIEF-ONLY]` | "Thermal labels" | Confirmation |
| C-09 | NDR recovery via WhatsApp | `[BRIEF-ONLY]` | "NDR recovery over WhatsApp" | Confirm it is live and what it does |
| C-10 | COD settlement and atomic wallet | `[BRIEF-ONLY]` | "COD settlement", "wallet" | Confirmation; define "atomic" with engineering (Q-05) |
| C-11 | B2C parcels, B2B heavy freight, cross-border | `[BRIEF-ONLY]` | As listed | Confirm each is live, not planned |
| C-12 | B2B rate cards (slabs, zones, surcharges, validity), quotations, contracts, tenant- and seller-specific pricing, reconciliation, operator controls | `[BRIEF-ONLY]` | Use on `/helix` only after confirmation | Confirmation |
| C-13 | HSN code lookup with duty breakdown and landed-cost estimate | `[BRIEF-ONLY]` | Do not publish until Q-08 is answered | Public/private status; whether it belongs on this site |
| C-14 | International shipping module | `[BRIEF-ONLY]` | Do not claim as shipped if still in development | Status (Q-05) |
| C-15 | Working with 10+ enterprise clients | `[FOUNDER-TO-CONFIRM]` | Use only wording from Section 4.5 | Founder choice and definition of "enterprise" (Q-04) |
| C-16 | Any metric (shipments, tenants, volume, uptime) | `[FOUNDER-TO-CONFIRM]` | Nothing | Real numbers and dates |
| C-17 | Security, data isolation, compliance | none | Nothing at launch | Written, verified statements only |
| C-18 | Any use of Claude or Anthropic technology | none | Nothing on the site | Code evidence and founder-approved wording |

### 4.5 Wording ladder for the client claim (choose one; do not mix)
| If true | Allowed wording |
|---|---|
| The 10+ are live HELIX tenants | "Live with 10+ enterprise clients." Define "enterprise" in the entity ledger (e.g., revenue or fleet size). |
| A mix of HELIX tenants and services clients | "Working with 10+ enterprise clients across HELIX and engineering services." |
| Not all are in production | "In active engagements with 10+ enterprise clients." |
| Anything else | Do not publish. No numbers. |

Rules: no client names or logos without written permission; no "trusted by" language; no testimonials without an attributable source.

---

## 5. Identity, naming and glossary

### 5.1 Company and product
- **Cyper Studio**: the company, the builder, the vendor of record. A product engineering company based in India, founded in 2024.
- **HELIX**: the product and the subject of the site. Written as **HELIX** in all caps everywhere (decision D-15, to be confirmed; see Q-09).

### 5.2 Naming patterns
| Surface | Pattern |
|---|---|
| Header wordmark | **HELIX** with small text "by Cyper Studio" |
| Hero eyebrow | "HELIX by Cyper Studio" |
| Page titles | "HELIX | ..." on `/`; "... | Cyper Studio" on supporting pages |
| Footer | "Cyper Studio" as company; "HELIX is a product of Cyper Studio." |
| Structured data | `Organization` = Cyper Studio; `SoftwareApplication` = HELIX, published by the organization |
| Application description | Lead with the company, then the product, in that order |

### 5.3 How to explain white-label without confusing the reader
The **operator** (our customer) sees HELIX and Cyper Studio on this site. The operator's **merchants** and the merchants' **consumers** never do. One sentence for the site:

> "HELIX is the platform behind your brand. Your merchants and their customers see only your name, your domain and your colours."

Never use imagery that implies end users see HELIX branding, except operator-console views labelled as such.

### 5.4 Glossary (one term per concept; use consistently)
| Term | Meaning on this site | Never use instead |
|---|---|---|
| **HELIX** | The product | "the Helix app", "our software", "the tool" |
| **Cyper Studio** | The company | "we are Helix" |
| **Operator** | Our customer: a courier, 3PL, freight broker, franchise network or aggregator running HELIX under its own brand | "client", "partner" (for operators) |
| **Tenant** | An operator's branded instance of HELIX. Used mainly on `/helix`. | "account", "workspace" |
| **Merchant** | A seller who ships through an operator | "customer" (ambiguous), "seller" (except in rate-card context) |
| **Consumer** | The recipient of a shipment | "end user" (ambiguous), "buyer" |
| **Carrier** | A courier or freight provider the operator ships with | "vendor" |
| **NDR** | Non-delivery report; defined once per page | undefined acronym |
| **COD** | Cash on delivery; defined once per page | undefined acronym |
| **3PL** | Third-party logistics provider; defined once on the homepage | undefined acronym |
| **Platform** | Reserved for "shipping platform" meaning the operator's branded product | generic use for HELIX itself |

---

## 6. Domain, email and trust infrastructure

### 6.1 Situation
- New domain `cyper.studio` registered about 8 October 2026. Mail address `info@cyper.studio`.
- Old domain `cyperstudio.in` stays live.
- An earlier Claude Startups submission was rejected over a **subdomain mismatch**.
- The founder reports the old domain "will not work" for the application. Reason to be recorded in Q-01; it decides whether the old domain is a redirect or the canonical.

### 6.2 Policy
1. **One canonical domain.** Default: `https://cyper.studio`. The other domain **301-redirects, preserving the path, in one hop**.
2. All absolute URLs in canonical tags, Open Graph, JSON-LD, sitemap, emails and the application are built from one constant: `SITE_URL` (Appendix C). Never hardcode a hostname.
3. `www` redirects to the apex. HTTP redirects to HTTPS. HSTS enabled once redirects are verified.
4. **No subdomains anywhere.** Not in links, scripts, images, forms, fetch calls or structured data. This includes any API host (such as the HELIX API health endpoint). A reviewer clicking through must never land on a host that differs from the submitted domain.
5. The published contact address is `info@` on the canonical domain. The old mailbox keeps working for existing clients but is **not published**.
6. The operator-login link: if the HELIX app lives on a subdomain, **do not link it from the site** until Q-06 is decided. Operators know their own tenant URLs.

### 6.3 New-domain risks (honest handling)
| Risk | Mitigation |
|---|---|
| Domain is days old; "founded 2024" will look odd to anyone checking registration dates | Do not alter dates. On `/about`, add one honest line, subject to Q-10: "Cyper Studio previously operated at cyperstudio.in." |
| No search presence or backlinks on the new domain | 301 from the old domain preserves what exists; submit sitemap to Search Console and Bing Webmaster Tools on day one |
| New domain mail lands in spam | SPF, DKIM, DMARC; send and receive test before applying (6.4) |
| Two live copies split indexing and confuse reviewers | The redirect rule in 6.2 |

### 6.4 DNS and mail checklist (run before any submission)
- [ ] A/AAAA or CNAME for apex and `www`; `www` redirects to apex
- [ ] TLS certificate valid for apex and `www`
- [ ] Old domain redirects to the canonical (check `/`, `/helix`, a deep path, a 404 path)
- [ ] MX records point to the mail provider
- [ ] SPF record published (one record only)
- [ ] DKIM keys published and verified by the provider
- [ ] DMARC record published; start with `p=none` and monitoring, tighten later
- [ ] Send from `info@` to a Gmail and an Outlook address; both land in the inbox
- [ ] Reply from both providers to `info@` arrives
- [ ] The `mailto:` links and the form notification use the canonical-domain address
- [ ] Registration details and WHOIS privacy reviewed

### 6.5 Health endpoint exposure
The HELIX API health endpoint on the old domain is useful internally. Before launch, confirm (Q-07) that it exposes no version strings, internal hostnames or stack details. It is **not** linked or called from the site.

### 6.6 Grep gates (Appendix E automates these)
- No hostname other than the canonical in `src/`, `content/`, `public/`, build output
- No `localhost`, `vercel.app`, `netlify.app`, staging hosts
- No `mailto:` or visible email outside the canonical domain
- No "2022" or "2023" near "founded", "since", "established", or in `foundingDate`

---

## 7. Audience model

### 7.1 Primary audience
Founders and operators of regional couriers, 3PLs, freight brokers, franchise networks and aggregators in India who currently rent a third-party shipping platform.

Their four pains:
1. **Brand control:** their merchants know the platform's name, not theirs.
2. **Margin:** the spread on each shipment goes to the platform.
3. **Merchant relationship:** the platform can sell to their merchants directly.
4. **Renting technology:** they want to own the product their business depends on.

### 7.2 Secondary audiences
Enterprise shippers and D2C brands evaluating logistics technology; potential hires and partners; and **the program reviewer**, who runs the five-question test.

### 7.3 Jobs to be done
| Type | Job |
|---|---|
| Functional | Offer merchants a branded booking platform with carrier rates, labels, NDR handling and COD settlement, without building it |
| Functional | Control the pricing merchants see, per tenant and per seller |
| Emotional | Stop worrying that the platform vendor owns the merchant relationship |
| Social | Look like a real technology company to merchants, investors and enterprise shippers |

### 7.4 Buying committee
| Role | What they need from the site |
|---|---|
| Champion (founder, head of product or ops) | Clear definition of HELIX, white-label proof, demo path |
| Signer (founder or director) | Business model clarity (licence plus services), who stands behind the product |
| Technical evaluator (CTO or ops head) | Architecture description, integrations, honest scope, how onboarding works |
| Finance | How pricing works, what is charged for, contract shape |
| Vetoer (anyone who has been burned by a vendor) | Evidence the company is real, reachable and accountable |

### 7.5 Decision journey
| Stage | What the visitor does | What the page must provide |
|---|---|---|
| Trigger | A merchant churns, margins shrink, or a platform changes terms | Problem framing that names the pain in operator language |
| Awareness | Searches "white label shipping platform India" or similar | Page title, H1 and first paragraph that match the query |
| Exploration | Compares build, rent and buy | The "own versus rent" argument; what HELIX includes |
| Shortlist | Checks who is behind it | Entity block, founded year, legal name, contact |
| Proof seeking | Looks for evidence | Real screenshots, named integrations that exist, honest client statement |
| Demo | Fills the form or emails | Short form, direct email, stated next step |
| Internal approval | Forwards the page to partners | `/helix` page that stands alone; FAQ with direct answers |

### 7.6 Top objections and the page element that answers each
| # | Objection | Answer element | Gap today |
|---|---|---|---|
| 1 | Is it production-grade? | Real operator-console screenshots; client statement per Section 4.5 | Needs Q-04, Q-13 |
| 2 | Who else uses it? | Client statement (no names without permission) | Needs Q-04 |
| 3 | What if you disappear? | `/about`: company facts, entity, contact; engagement terms | Needs Q-14, contract answer |
| 4 | Who owns the data and merchant relationships? | FAQ answer, written only after the founder confirms the position | Needs Q-05 |
| 5 | How long does onboarding take? | FAQ: written only after the founder provides a typical timeline | Needs founder input |
| 6 | Is white-label truly invisible to my merchants? | Diagram 1, capability card 1, FAQ | Verify C-06 |
| 7 | Why not build in-house? | "Own versus rent versus build" paragraph on `/helix` | Draft in Section 10 |
| 8 | Why a small company, not a large vendor? | `/about`: product engineering focus, direct access to the people building it | Needs Q-11 |
| 9 | How are carrier rates and COD money handled? | Capability cards 2 and 3, lifecycle diagram | Verify C-07, C-10 |
| 10 | What does it cost? | "Request pricing" section; explain the model (licence plus services) | Needs Q-21 |

### 7.7 Trust thresholds
A skeptical operator will fill the form when they have seen: (1) a real console screenshot, (2) a plain statement of what is and is not included, (3) a named company with a real address and email, and (4) a stated next step after submitting.

---

## 8. Information architecture and route map

### 8.1 Page set and tiers
| Route | Purpose | Tier | Target query (primary) |
|---|---|---|---|
| `/` | The 8-to-60-second pitch: what HELIX is, who it is for, why own versus rent | Launch | white-label shipping platform India |
| `/helix` | Depth: modules, tenant model, console tour, FAQ, pricing posture | Launch | white-label logistics software; multi-tenant logistics platform |
| `/about` | Company facts, founding, how we work, contact | Launch | Cyper Studio |
| `/contact` | Demo request and direct contact | Launch | (branded and conversion) |
| `/changelog` | Dated product updates | Launch, only with ≥3 real entries | HELIX changelog |
| `/blog` | Operator-focused articles | Launch, only with ≥2 real posts | NDR recovery India; COD reconciliation; white-label vs aggregator |
| `/privacy` | Privacy policy | Launch | n/a |
| `/terms` | Terms of use | Launch | n/a |
| 404 | Custom on-brand not-found | Launch | n/a |
| `sitemap.xml`, `robots.txt` | Crawl control | Launch | n/a |
| `/llms.txt` | Optional AI-readable summary | Launch (optional) | n/a |
| `/pricing` | Dedicated pricing or "talk to us" | Deferred | |
| `/security` | Data and white-label guarantees | Deferred; first a section on `/helix` | |
| `/carriers` | Carrier network | Deferred; only verified integrations | |
| `/status` | Public health | Deferred; needs measured history and a non-subdomain host decision | |

### 8.2 `/` versus `/helix`
- `/` is the pitch for someone with 60 seconds. Short sections, one idea each, one primary CTA.
- `/helix` is the reference for someone who is already interested or forwarding it. Longer, structured, linkable sections with anchor IDs.
- Target queries differ so the two pages do not compete.

### 8.3 Navigation
- Header: wordmark (HELIX by Cyper Studio), `Product` (`/helix`), `About`, `Changelog` and `Blog` (only when live), primary button `Request a demo`.
- Mobile: wordmark, button, menu. No more than five items.
- Footer: entity line, `info@`, product links, company links, legal links, founding year, copyright.

### 8.4 URL conventions
- Lowercase, hyphenated, no trailing-slash variants (pick one and redirect the other).
- Blog: `/blog/<slug>`. Changelog entries: anchors on `/changelog` (`#2026-10-15`) at first; individual pages later if volume grows.
- Never include dates or categories in blog slugs.

### 8.5 What leaves the main page
| Current element (from known problems) | Action |
|---|---|
| Creative-agency language ("tech wizards", "make magic happen", "digital glitter", "Michelin star") | Delete. Replace per Section 13. |
| Client portfolio and agency work | Remove from `/`. If any is kept, it moves to a later `/engineering` page and only with written permission (Q-17). |
| Playful sections that do not describe HELIX | Delete or rewrite as HELIX capability. |

Confirm the actual inventory in Phase 0 (Section 19).

---

## 9. Homepage blueprint (`/`)

**Page goal:** a logistics operator understands HELIX in 8 seconds, believes it is real in 60, and requests a demo.
**Maximum length:** 12 blocks (10 content sections plus header and footer), about 5 screens on desktop.
**One primary CTA style per viewport:** `Request a demo`.

### 9.0 Page metadata
| Field | Value |
|---|---|
| `<title>` | `HELIX \| White-Label Logistics Platform for Couriers & 3PLs` (58 characters) |
| Meta description | `HELIX by Cyper Studio is a white-label, multi-tenant logistics operating system for couriers, 3PLs, freight brokers and aggregators in India. Request a demo.` (verify length ≤ 160 with the script in Appendix E) |
| Canonical | `${SITE_URL}/` |
| `h1` | One only, in the hero |
| OG image | 1200×630 static image: wordmark, H1 text, brand tokens. No fake UI. |

### 9.1 Section order
1. Header
2. Hero
3. Fact strip
4. Problem: renting a platform
5. Solution: what HELIX is
6. White-label explained (Diagram 1)
7. How it works (Diagram 2)
8. Capabilities (six cards)
9. Who it is for
10. Built by Cyper Studio
11. FAQ and final CTA with form
12. Footer

(12 blocks counting header and footer; 10 content sections.)

---

### SECTION 1: Header
```
ORDER 1   PRIORITY P0
Purpose:            Identify the product and company; offer the CTA at all times.
Visitor question:   Where am I, and how do I act?
Reviewer question:  Q1, Q2
Copy:
  Wordmark:  HELIX   (small, muted) by Cyper Studio
  Nav:       Product · About · Changelog* · Blog*     (*only when live)
  Button:    Request a demo
Layout:     Sticky, 64px high, 1px bottom border on scroll, no shadow. Button right-aligned.
Content:    content/site.ts
Assets:     Wordmark SVG (inline). No logo animation.
Evidence:   [BRIEF]
Acceptance:
  1. Header renders in server HTML without JS.
  2. Button has an accessible name and a 44px minimum height.
  3. Header contains no external-host links.
  4. No nav item points to a page that is not live.
Metric:     Click-through on header CTA (event: cta_click, location=header)
Effort:     S (1 hour)
```

### SECTION 2: Hero
```
ORDER 2   PRIORITY P0
Purpose:            State what HELIX is, who it is for, and the outcome, in plain words.
Visitor question:   What is this and is it for me?
Reviewer question:  Q1, Q2, Q3, Q4
Copy (final draft):
  Eyebrow:   HELIX by Cyper Studio
  H1:        Run your own branded shipping platform.
  Subhead:   HELIX is a white-label, multi-tenant logistics operating system for regional
             couriers, 3PLs, freight brokers, franchise networks and aggregators in India.
             Your brand, your domain, your merchants.
  Primary CTA:    Request a demo               -> #request-demo (on /: scroll to final form) or /contact
  Secondary CTA:  See how white-label works    -> #white-label
  Trust line:     Built by Cyper Studio, a product engineering company in India. Founded in 2024.
  Visual:         Real operator-console screenshot in a framed product window (Section 15.2).
Alternatives (ranked):
  A (chosen)  "Run your own branded shipping platform."
              Outcome-led, plain, includes the key noun ("shipping platform").
  B           "White-label logistics software for couriers and 3PLs."
              Best for search match; weaker on outcome.
  C           "Your shipping platform. Your brand. Your merchants."
              Clear in a glance but reads as a slogan; use only as an A/B variant.
Layout:     Two columns on desktop (copy left, screenshot right); single column on mobile with
            copy first, screenshot below. Text must be the LCP element or smaller than the image
            so the image does not delay text rendering.
Content:    content/home.ts
Assets:     Operator-console screenshot (blurred data), AVIF/WebP, <= 120KB.
Evidence:   C-01, C-02, C-04, C-05 [BRIEF]; C-06 [BRIEF-ONLY] (not stated in hero as a guarantee).
Acceptance:
  1. h1 text is exactly the chosen headline and appears once on the page.
  2. h1 plus subhead contain "white-label", "logistics" and "platform" and no metaphor.
  3. With JS disabled, h1, subhead, trust line and primary CTA are present in the HTML response.
  4. At 1366x768 and 390x844, h1, subhead, primary CTA and trust line are visible without scrolling.
  5. Hero screenshot has explicit width and height; CLS contribution is zero.
  6. No banned term appears (Section 13.3).
Metric:     Hero CTA click-through; LCP <= 2.5s on mobile throttling.
Risks:      Subhead too long on mobile -> cap at 3 lines at 390px; trim "franchise networks"
            to the second sentence if needed.
Effort:     M (3 hours incl. screenshot treatment)
```

### SECTION 3: Fact strip
```
ORDER 3   PRIORITY P1
Purpose:            Give skimmers four hard facts and a place for the client statement.
Visitor question:   Is this specific and real?
Reviewer question:  Q4
Copy (four cells, mono labels):
  PRODUCT      White-label, multi-tenant logistics OS
  SHIPMENTS    B2C parcels, B2B heavy freight, cross-border      [BRIEF-ONLY; confirm live scope]
  MARKET       Built in India for Indian carriers and COD       [BRIEF-ONLY; confirm]
  COMPANY      Cyper Studio, product engineering, founded 2024
  (optional 5th cell, only after Section 4.5 wording is chosen)
  CLIENTS      {{CONFIRM: client statement from the wording ladder}}
Layout:     4-column strip with 1px dividers; stacks to 2x2 on mobile. No icons.
Acceptance:
  1. No cell contains a number that is not in the claim register.
  2. The CLIENTS cell does not render unless its wording is confirmed.
Effort:     S (1 hour)
```

### SECTION 4: Problem
```
ORDER 4   PRIORITY P0
Purpose:            Name the cost of renting a shipping platform in operator language.
Visitor question:   Is this about my problem?
Copy (final draft):
  H2:   When merchants ship on someone else's platform, you give up three things.
  1  BRAND
     "Your merchants learn the platform's name, not yours."
  2  MARGIN
     "The spread on each shipment goes to the platform instead of to you."
  3  RELATIONSHIP
     "The platform can sell to your merchants directly."
  Closing line:
     "HELIX is built so you keep all three."
Evidence:   Audience pain points [BRIEF]. Wording is general; no competitor is named.
Layout:     Three columns, text only, large mono index numbers (01 / 02 / 03). No illustrations.
Acceptance:
  1. No competitor or aggregator is named.
  2. Each pain is one sentence of 18 words or fewer.
  3. Section contains no CTA button; it flows into Section 5.
Risks:      Reads as an attack on named platforms; mitigated by generic wording.
Effort:     S (1 hour)
```

### SECTION 5: Solution
```
ORDER 5   PRIORITY P0
Purpose:            Define HELIX precisely, in two or three sentences.
Visitor question:   What exactly is HELIX?
Reviewer question:  Q2, Q3
Copy (final draft):
  H2:   HELIX is the platform behind your brand.
  Body: HELIX is a white-label, multi-tenant logistics operating system. You run it as your own
        shipping platform, under your brand and your domain. Your merchants book B2C parcels,
        B2B heavy freight and cross-border shipments. They never see HELIX or Cyper Studio.
  Link: Read the product overview -> /helix
Evidence:   C-04, C-05 [BRIEF]; C-06, C-11 [BRIEF-ONLY]
Acceptance:
  1. The definition sentence ("HELIX is a white-label, multi-tenant logistics operating system")
     appears verbatim on the page (AI-search entity definition).
  2. The claim "They never see HELIX or Cyper Studio" is shown only after C-06 is verified.
Effort:     S (30 min)
```

### SECTION 6: White-label explained (Diagram 1)
```
ORDER 6   PRIORITY P0   (anchor id: white-label)
Purpose:            Make the key differentiator concrete and unconfusing.
Visitor question:   What do my merchants actually see?
Copy (final draft):
  H2:      Your brand on every screen your merchants and their customers see.
  Caption: "You see HELIX. Your merchants and their customers see only you."
  Diagram labels (left to right):
     HELIX (operator console)  ->  YOUR BRAND (your domain, your colours)  ->
     MERCHANTS  ->  CONSUMERS
     Underlay band beneath "YOUR BRAND":  "HELIX runs underneath. It is not shown."
  Three one-line notes under the diagram:
     DOMAIN   Your own domain on every merchant-facing page.     [verify]
     COLOURS  Your colours and logo.                              [verify]
     NAME     No mention of Cyper Studio or HELIX to merchants.  [verify C-06]
Layout:     Inline SVG diagram built with design-system tokens (Section 15.3). Static; any motion
            is a one-time reveal and is disabled under reduced motion.
Assets:     Diagram 1 SVG; two sample tenant mockups labelled "Sample tenant" (not real clients).
Evidence:   C-06 [BRIEF-ONLY]
Acceptance:
  1. Diagram has a text alternative and appears with JS disabled.
  2. Sample tenant names are visibly fictional and labelled "Sample".
  3. No real client brand appears.
Effort:     M (3 hours)
```

### SECTION 7: How it works (Diagram 2)
```
ORDER 7   PRIORITY P1
Purpose:            Show the shipment lifecycle in four steps, using only listed capabilities.
Copy (final draft):
  H2:   One shipment, four steps.
  01 COMPARE   Compare carrier rates for the shipment.                   [C-07]
  02 BOOK      Book it and print a thermal label.                         [C-08]
  03 RECOVER   If delivery fails, start NDR recovery over WhatsApp.       [C-09]
  04 SETTLE    Reconcile COD collections and credit the wallet.           [C-10]
  Footnote (define once): "NDR: non-delivery report. COD: cash on delivery."
Layout:     Horizontal stepper on desktop (four columns), vertical on mobile. Mono step numbers.
Evidence:   All steps [BRIEF-ONLY]. Do not publish until C-07..C-10 are confirmed.
Acceptance:
  1. Each step names one capability from the claim register and nothing else.
  2. NDR and COD are defined once in this section.
Effort:     S (2 hours)
```

### SECTION 8: Capabilities (six cards)
```
ORDER 8   PRIORITY P1
Purpose:            Show what operators get, ordered by buyer priority, as Capability -> Outcome.
Copy (final draft; every card = title, capability sentence, outcome sentence):
  Order rationale: ownership first, then margin, cash, delivery success, range, control.

  01 YOUR BRAND, YOUR DOMAIN                                           [C-04, C-06]
     Capability: Run HELIX under your name, domain and colours.
     Outcome:    Merchants know you, not a platform vendor.

  02 PRICING YOU CONTROL                                               [C-12]
     Capability: Set rates per tenant and per seller from carrier rate cards.
     Outcome:    You decide the margin on every shipment.

  03 CARRIER RATE SHOPPING                                             [C-07]
     Capability: Compare dynamic rates across Indian carriers at booking.
     Outcome:    Merchants book the carrier that fits each shipment.
     (Name carriers only when integrations are confirmed live.)

  04 COD AND WALLET                                                    [C-10]
     Capability: Settle cash-on-delivery collections and manage balances in a wallet.
     Outcome:    Cash flow you can reconcile.
     (Define "atomic" only after Q-05.)

  05 NDR RECOVERY OVER WHATSAPP                                        [C-09]
     Capability: Reach consignees on WhatsApp when a delivery fails.
     Outcome:    Built to reduce returns to origin.

  06 B2C, B2B AND CROSS-BORDER                                         [C-11]
     Capability: Parcels, heavy freight and cross-border shipments on one platform.
     Outcome:    One platform for every shipment type you handle.
     (Remove "cross-border" until confirmed live.)

  Link under the grid: See every module on /helix.
Layout:     3x2 grid desktop, single column mobile. Border cards, no shadow, mono index labels.
Evidence:   Cards 2 to 6 [BRIEF-ONLY]. Each card renders only when its claim is confirmed.
Acceptance:
  1. Each card follows Capability -> Outcome in two sentences.
  2. No card contains a number, percentage or superlative.
  3. A card whose claim is unconfirmed is absent from the build, not hidden with CSS.
Effort:     M (3 hours)
```

### SECTION 9: Who it is for
```
ORDER 9   PRIORITY P1
Copy (final draft):
  H2:   Built for operators who own the merchant relationship.
  Regional couriers        Give merchants a booking platform under your own name.
  3PLs                     Run multi-merchant shipping on one branded platform.
  Freight brokers          Quote and book B2B heavy freight under your brand.
  Franchise networks       One branded platform for the whole network.
  Enterprise aggregators   Offer your merchants a shipping platform that is yours.
  Definition (once): "3PL: third-party logistics provider."
Evidence:   Segments [BRIEF]. One-line descriptions are positioning, not feature claims.
Acceptance:
  1. Five segments named exactly as in the brief.
  2. No logos, no client names.
Effort:     S (1 hour)
```

### SECTION 10: Built by Cyper Studio
```
ORDER 10   PRIORITY P0
Purpose:            Answer "who is behind this?" in one compact block.
Reviewer question:  Q1, Q4
Copy (final draft):
  H2:   HELIX is built by Cyper Studio.
  Body: Cyper Studio is a product engineering company based in India, founded in 2024. We build
        HELIX and license it to logistics operators, and we provide engineering services around it.
  Entity line:   {{CONFIRM: legal entity name}} · {{CONFIRM: city, India}} · info@<canonical>
  Link:          About Cyper Studio -> /about
Evidence:   C-01, C-02, C-03 [BRIEF]; entity and location [FOUNDER-TO-CONFIRM]
Acceptance:
  1. States company, location (country), founding year, and business model.
  2. Contact email domain equals the site domain.
  3. No team-size or funding claim.
Effort:     S (1 hour)
```

### SECTION 11: FAQ and final CTA with form
```
ORDER 11   PRIORITY P0   (anchor id: request-demo)
FAQ (answer-first; 8 questions; mark unconfirmed answers {{CONFIRM}} and keep them out of the build):
  Q  What is HELIX?
  A  HELIX is a white-label, multi-tenant logistics operating system built by Cyper Studio. It lets
     couriers, 3PLs, freight brokers, franchise networks and aggregators run their own branded
     shipping platform.
  Q  Who is HELIX for?
  A  Regional couriers, 3PLs, freight brokers, franchise networks and enterprise aggregators in India.
  Q  Will my merchants see HELIX or Cyper Studio?
  A  No. Merchants and their customers see only your brand, domain and colours.   [C-06: verify]
  Q  Which carriers are supported?
  A  {{CONFIRM: carriers live today; list by name}}
  Q  What shipment types does HELIX handle?
  A  {{CONFIRM: B2C parcels, B2B heavy freight, cross-border, each live or planned}}
  Q  How does pricing work?
  A  HELIX is licensed as SaaS, with professional services for setup and integration.   [C-03]
     {{CONFIRM: what to say about price; default: "Pricing is on request."}}
  Q  How long does onboarding take?
  A  {{CONFIRM: typical timeline}}
  Q  Who owns the merchant relationships and data?
  A  {{CONFIRM: founder-approved wording}}

CTA block:
  H2:   Request a HELIX demo.
  Body: Tell us what you ship and who you ship for. We reply from info@<canonical>
        {{CONFIRM: response time you can keep}}.
  Form: See Section 12.3.
  Direct line: Prefer email? Write to info@<canonical>.
Acceptance:
  1. Form submits, shows a success state, and sends both notification and confirmation emails.
  2. FAQ appears with JS disabled (use native <details> or render open).
  3. FAQ answers are self-contained and quotable for answer engines.
Effort:     M (4 hours incl. form)
```

### SECTION 12: Footer
```
ORDER 12   PRIORITY P0
Copy:
  HELIX by Cyper Studio
  HELIX is a product of Cyper Studio, a product engineering company based in India. Founded in 2024.
  Product: HELIX overview · Changelog* · Blog*        Company: About · Contact
  Legal:   Privacy · Terms
  Contact: info@<canonical>
  © 2026 {{CONFIRM: legal entity name}}
Acceptance:
  1. Entity name, founding year and email are on every page.
  2. Copyright year is computed at build time from the current year.
  3. No external links except verified, existing social profiles (if any).
Effort:     S (30 min)
```

---

## 10. Product page blueprint (`/helix`)

**Page goal:** the reference page an operator reads in full and forwards to a partner. Every section has an anchor ID so it can be linked and cited.
**Rule:** a section is built only for claims that are confirmed. An unconfirmed module is absent, not greyed out.

### 10.0 Metadata
| Field | Value |
|---|---|
| `<title>` | `HELIX Platform: White-Label Logistics OS \| Cyper Studio` |
| Description | `Explore HELIX, the white-label, multi-tenant logistics operating system for couriers, 3PLs and freight brokers in India. Modules, tenant model and how to start.` |
| Canonical | `${SITE_URL}/helix` |
| Schema | `SoftwareApplication` (Appendix D) + `BreadcrumbList` |

### 10.1 Section order
| # | Anchor | Section | Priority |
|---|---|---|---|
| 1 | `#overview` | Hero: "HELIX: the white-label logistics operating system." One-paragraph definition, primary CTA | P0 |
| 2 | `#why-own` | Own, rent or build: the decision framework (below) | P1 |
| 3 | `#tenant-model` | The tenant model and Diagram 1 at full size | P0 |
| 4 | `#console` | Operator console tour: 4 to 6 annotated real screenshots | P0 |
| 5 | `#modules` | Modules: one block each, Capability -> Outcome -> Detail | P1 |
| 6 | `#carriers` | Carriers and rate shopping (text names for confirmed integrations only) | P1 |
| 7 | `#shipment-types` | B2C, B2B heavy freight, cross-border | P1 |
| 8 | `#money` | COD, wallet and reconciliation | P1 |
| 9 | `#how-we-work` | Licence plus services: how an engagement runs | P1 |
| 10 | `#data-and-brand` | Data and brand ownership (only verified statements) | P1 |
| 11 | `#faq` | Extended FAQ (the homepage eight plus up to eight more) | P1 |
| 12 | `#request-demo` | CTA and form | P0 |

### 10.2 Own, rent or build (draft copy)
```
H2: Own, rent or build.
Three columns; plain, factual, no competitor names.

RENT a third-party platform
  You launch quickly. Your merchants see the platform's brand. Pricing and terms are the
  platform's to change. The platform can also sell to your merchants.

BUILD in-house
  You own everything. You also fund and maintain carrier integrations, labels, wallet,
  settlement and merchant tooling, and you carry the delay before launch.
  {{CONFIRM: Do not state timelines or costs unless the founder supplies real figures.}}

OWN with HELIX
  You run a platform that is yours in brand, domain and merchant relationship. Cyper Studio
  builds and maintains HELIX; you do not build it.
```
Acceptance: no cost, time or percentage figure unless it has a source in the Evidence Ledger.

### 10.3 Operator console tour
- 4 to 6 real screenshots, each with numbered `--accent` markers and a mono caption.
- Candidates (use only screens that exist): rate-shopping view, label output, NDR flow, wallet, rate card editor, settlement and reconciliation.
- Each screenshot has a one-line caption in Capability -> Outcome form.
- All customer data and real merchant names blurred. Screens must show the operator console only.
- Acceptance: each image has `width` and `height`, `alt` text that describes the function (not "screenshot"), AVIF or WebP at 120 KB or less, lazy-loaded below the fold.

### 10.4 Modules (build only the confirmed ones)
For every module use this exact block shape:
```
MODULE NAME                          [claim ID, evidence tag]
Capability:  one sentence
Outcome:     one sentence
Detail:      three short bullets of specifics that exist in the product (no invented specifics)
Screenshot:  link to a console tour image
```
Candidate modules (all `[BRIEF-ONLY]` until confirmed): white-label tenant platform; carrier rate shopping; thermal labels; NDR recovery over WhatsApp; COD settlement; atomic wallet; B2B heavy-freight rate cards (slabs, zone mappings, surcharges, validity per card); quotations and contracts; tenant- and seller-specific pricing; financial settlement and reconciliation; cross-border and international shipping; operator and admin controls.

HSN code lookup: see Q-08. Do not publish on this page until answered. If it is a public tool that serves importers and exporters, it belongs on its own page and in the blog as a topical asset, not inside the operator pitch.

### 10.5 How we work (licence plus services)
```
H2: How an engagement works.
Body: HELIX is licensed as software. Cyper Studio also provides professional services around
      it: {{CONFIRM: what services, e.g. onboarding, carrier integration, custom modules}}.
Steps: 1 Discovery call   2 Tenant setup   3 Carrier and pricing configuration   4 Launch
       {{CONFIRM: actual steps and a typical timeline; do not publish this list until supplied}}
```

### 10.6 Data and brand ownership
Publish only statements that engineering and the founder have verified. Examples of acceptable statement types: "Each operator runs a separate tenant." (if true) / "Merchant-facing pages carry only the operator's brand." (if true). **Do not** write "we never see merchant data" unless it is technically verified.

### 10.7 Acceptance for the page
1. All anchors resolve; table of contents reflects built sections only.
2. One `h1`; sections use `h2`; modules use `h3`.
3. With JS disabled, all text, FAQ and the form fallback are readable.
4. Lighthouse mobile performance ≥ 90 with all console images present.
5. No claim outside the claim register.

---

## 11. Supporting pages

### 11.1 `/about`
```
Title:       About Cyper Studio | Product Engineering Company, India
Description: Cyper Studio is a product engineering company based in India, founded in 2024. We build HELIX, a white-label logistics operating system.

H1: Cyper Studio builds HELIX.
Section 1 WHO WE ARE
  Cyper Studio is a product engineering company based in India, founded in 2024. We build HELIX,
  a white-label, multi-tenant logistics operating system, and offer professional services around it.
Section 2 WHAT WE BUILD
  One paragraph on HELIX, linking to /helix. No second product unless it exists and is confirmed.
Section 3 HOW WE WORK
  We license HELIX as SaaS and provide professional services. {{CONFIRM: one or two sentences on the
  working relationship and who an operator talks to}}
Section 4 THE COMPANY (facts block)
  Legal name: {{CONFIRM}}   Founded: 2024   Based in: {{CONFIRM: city}}, India
  Contact: info@<canonical>   {{CONFIRM: registered address if published}}
Section 5 PEOPLE
  {{DECISION Q-11: named founder with role and a short bio, or omit}}
  If shown: a name, a role, one factual sentence, and a real photo. No invented credentials.
Section 6 DOMAIN HISTORY (optional, Q-10)
  "Cyper Studio previously operated at cyperstudio.in."   [true per the founder]
Acceptance:
  1. Founding year equals 2024 everywhere.
  2. Legal entity name matches footer, privacy and terms.
  3. No claim about team size, funding or awards.
```
Recommendation: show at least one named person with a role. A named, reachable person answers "is this a real company?" better than any other element.

### 11.2 `/contact`
```
Title:       Request a HELIX Demo | Cyper Studio
Description: Talk to Cyper Studio about HELIX, the white-label logistics operating system. Request a demo or email info@<canonical>.

H1: Request a HELIX demo.
Body: Tell us what you ship and who you ship for. We reply from info@<canonical>
      {{CONFIRM: reply time you can keep}}.
Form: Section 12.3.
Side panel (facts): Email info@<canonical> · {{CONFIRM: city, India}} · {{CONFIRM: legal entity}}
After submission: "Thanks. We have your request and will reply to <their email>."
                  Then: "What happens next: {{CONFIRM: 2 or 3 honest steps}}."
Optional (Q-14): calendar link or WhatsApp number. Add only if the founder will monitor it.
Acceptance:
  1. Form works with JS disabled via a standard HTML POST fallback.
  2. Failure state shows the direct email address.
  3. No third-party embed that sets cookies without consent handling.
```

### 11.3 `/changelog`
- **Ships only with at least three real dated entries.** Otherwise omit the route from nav and sitemap.
- Entry template (Appendix F). Facts only: date, what changed, who benefits. No marketing language, no vanity metrics.
- Newest first. One `h2` per entry with the date. An RSS/Atom feed at `/changelog/feed.xml` is optional and low effort.
- Cadence: whatever the founder can sustain. An honest monthly entry beats an abandoned weekly promise.
- Never backfill invented history. Only log changes that actually shipped.

### 11.4 `/blog`
- **Ships only with at least two real posts.** Founder writes. Aim for one post per month at most.
- Write for operators, one search intent per post, with a plain-language direct answer in the first 80 words.
- Starter list (check each against real knowledge before writing; do not state figures you cannot source):
  1. What an NDR is and how operators recover failed deliveries
  2. COD reconciliation: how settlement works between carrier, operator and merchant
  3. White-label shipping platform versus renting an aggregator
  4. Rate cards for B2B heavy freight: slabs, zones, surcharges
  5. How to evaluate a logistics platform vendor (a checklist)
- Each post: one `h1`, byline with the author's name if Q-11 is yes, published and updated dates, canonical, `Article` JSON-LD, 2 to 3 internal links to `/helix` or `/contact`.
- Post template in Appendix F.

### 11.5 `/privacy` and `/terms`
- Required before launch. Drafted from a reputable template and **reviewed by someone qualified** (Q-18). This document is not legal advice.
- Privacy must cover: what the form collects (name, email, company, company type, message, optional volume), why, how long, who processes it (email provider, hosting, analytics), user rights, contact address, and an effective date.
- Consider the obligations that apply to personal data of people in India (for example under India's Digital Personal Data Protection Act, 2023). Flag for legal review.
- Entity name on both pages matches the footer exactly.

### 11.6 Utility pages
- **404:** on-brand, plain text, search is not needed. Copy: "This page does not exist. Go to the HELIX overview or request a demo." Returns a real HTTP 404.
- **`sitemap.xml`, `robots.txt`, `llms.txt`:** Appendix D.
- **Favicon set and web manifest:** one SVG plus PNG fallbacks.

---

## 12. Conversion architecture

### 12.1 Goals
| Level | Goal | Measure |
|---|---|---|
| Primary | Demo request or direct conversation | `form_submit` and `email_click` events |
| Secondary | "See how white-label works" engagement; read `/helix`; read a post | `cta_click`, scroll depth, pageviews per session |
| Low-commitment | Subscribe to changelog feed or read the blog | Feed hits, post views |

### 12.2 CTA map
| Location | Label | Destination | Style | Intent |
|---|---|---|---|---|
| Header | Request a demo | `#request-demo` or `/contact` | Primary (small) | Always available |
| Hero | Request a demo | `#request-demo` | Primary | High intent |
| Hero | See how white-label works | `#white-label` | Secondary | Exploring |
| After capabilities | See every module | `/helix` | Tertiary link | Exploring |
| After "Built by" block | About Cyper Studio | `/about` | Tertiary link | Proof seeking |
| Final section | Request a demo | form | Primary | High intent |
| Footer | info@ link | `mailto:` | Link | Direct contact |
| Mobile sticky bar | Request a demo | `#request-demo` | Primary | Appears after the hero leaves the viewport; hidden at the form |

Rules: at most one primary-style button in any viewport; a visitor is never more than one scroll from a CTA.

### 12.3 Form specification
| Field | Type | Required | Reason |
|---|---|---|---|
| Name | text, `autocomplete="name"` | Yes | Addressing the reply |
| Work email | email, `autocomplete="email"` | Yes | Reply path. Do not block free email domains (small operators use them). |
| Company | text, `autocomplete="organization"` | Yes | Qualification |
| Company type | select: Regional courier / 3PL / Freight broker / Franchise network / Aggregator / Enterprise shipper / Other | Yes | Fits the target audience; routes the reply |
| Approximate monthly shipments | select ranges | No | Qualification without friction |
| Message | textarea, max 500 chars | No | Context |
| Consent note | text under the button | n/a | "We use your details only to reply to this request." Link to Privacy. |

Behaviour:
- Persistent labels above fields, inline error messages, correct input types.
- Spam protection: hidden honeypot field, minimum time-to-submit check, server-side rate limit, server-side validation. A challenge widget (for example Cloudflare Turnstile) is optional and only if its privacy impact is reviewed.
- On submit: (a) store the submission, (b) email `info@<canonical>`, (c) send the visitor an auto-reply with what happens next. If any step fails, show the failure state with the direct email. **A submission must never fail silently.**
- Success state: replaces the form with a confirmation; no redirect to a third-party page.
- Notification routing: single inbox at launch. Log submissions in a durable store as backup.

### 12.4 Trust elements next to the form
Direct email address, entity line, one sentence on what happens next, link to Privacy, and the client statement (only if confirmed).

### 12.5 Lead magnets (optional, none required for launch)
| Idea | Effort | Condition |
|---|---|---|
| White-label readiness checklist (PDF or page) | M | Founder writes real content |
| Margin-leakage worksheet for operators | M | Needs real, defensible logic |
| Public HSN code lookup | L | Only if the tool exists, is public, and fits the audience (Q-08) |

### 12.6 Analytics event schema
| Event | Trigger | Properties |
|---|---|---|
| `page_view` | Each route | `path`, `referrer`, UTM params |
| `cta_click` | Any CTA | `location` (header, hero, final, sticky), `label`, `destination` |
| `form_start` | First field focus | `form_id` |
| `form_submit` | Successful submission | `company_type` |
| `form_error` | Submission failure | `reason` (no personal data) |
| `email_click` | `mailto:` click | `location` |
| `scroll_depth` | 25, 50, 75, 100% | `path` |
| `outbound_click` | Any external link | `host` |

Funnel: `page_view` -> `cta_click` -> `form_start` -> `form_submit`. Record a baseline before launch. Tool choice: Q-16 (privacy-respecting default). No raw email or message text is ever sent to analytics.

### 12.7 Experiment backlog (after launch, one at a time)
1. Hero headline A versus C (Section 9, Hero alternatives)
2. Primary CTA label: "Request a demo" versus "Talk to us"
3. Form: with versus without the monthly-shipments field

Run tests only when traffic can reach a meaningful result; until then, change one thing at a time and compare to the baseline.

---

## 13. Voice, copy rules and the banned list

### 13.1 Character
Competent product builders who understand logistics deeply and ship serious software. A sharp, honest conversation with another operator who has limited time. Clear, confident, precise, slightly technical, never corporate-stiff. Founder-to-founder.

### 13.2 Hard writing rules
1. Every headline states a fact, outcome or specific claim. No metaphors, puns or rhetorical questions.
2. Each section opens with the point.
3. One idea per sentence; one job per section.
4. Sentences average 20 words or fewer; paragraphs 3 sentences or fewer; reading level about grade 8 to 10.
5. Active voice. "You" for the operator; "we" for Cyper Studio; "HELIX" for the product.
6. Every capability follows **Capability -> Operator outcome**.
7. Concrete verbs (compare, book, print, recover, settle, reconcile). Numbers only when sourced.
8. No unverifiable superlatives.
9. Define each acronym (NDR, COD, 3PL, AWB, LTL) once per page.
10. Indian-English friendly: avoid idiom and slang.

### 13.3 Banned list (lint all copy; script in Appendix E)
magic, magical, sorcery, wizard(s), tech wizards, glitter, digital glitter, Michelin, rockstar, ninja, guru, supercharge, turbocharge, unleash, unlock the power, game-changer, revolutionary, cutting-edge, next-gen, world-class, best-in-class, seamless, effortless, synergy, leverage (as a verb), holistic, empower, robust, streamline, all-in-one, "end-to-end solutions" (without specifics), "we craft experiences", "passionate team", "digital transformation", "innovative solutions", "one-stop shop", "turnkey" (unless defined), "AI-powered" (unless demonstrably true), "scalable" (unless quantified), bare "solutions", exclamation marks in headlines, emoji in body copy, forced humour.

### 13.4 Banned structures
Rhetorical-question headlines; stacked adjectives; claim-free slogans; agency-portfolio language on the main page ("our work", "projects we love"); testimonial-style copy without an attributable source; "trusted by" without permission.

### 13.5 Rewrite pairs (from the known problems; replace against real current copy in Phase 0)
| Don't | Do |
|---|---|
| "We are tech wizards who make magic happen." | "Cyper Studio is a product engineering company in India. We build HELIX." |
| "Sprinkling digital glitter on your business." | "HELIX is a white-label logistics operating system for operators." |
| "Michelin-star engineering." | "We build and maintain HELIX, and run it for our clients." (only if true) |
| "Seamless logistics solutions." | "Compare carrier rates, print labels and settle COD from one console." |
| "Revolutionising shipping for India." | "Run your own branded shipping platform." |
| "Trusted by leading brands." | "{{Client statement from Section 4.5}}" |
| "Unlock the power of AI-driven logistics." | Remove. HELIX has no AI claim unless verified. |
| "Our work" / "Projects we love" | Remove from `/`. |

### 13.6 Copy review checklist (run on every new text)
- [ ] States a fact, outcome or specific claim
- [ ] Every factual claim is in the Evidence Ledger
- [ ] Capability -> Outcome shape where it describes a feature
- [ ] No banned term or structure
- [ ] Acronyms defined once
- [ ] Company vs product names used per Section 5
- [ ] No promise the founder cannot keep (response time, onboarding time, uptime)
- [ ] Reads aloud in one breath per sentence

---

## 14. Design system (light mode)

**Personality:** precise, calm, product-first, slightly technical, confident. The site should look like operational software a logistics business would trust with money movement. The product UI is the main visual; illustrations are not.

**Principle:** creativity lives inside the system. No one-off colours, spacing or radii. Personality comes from four signature devices (14.8), the type setting, and the quality of the product visuals.

### 14.1 Tokens (single source of truth)
Full file in Appendix B. Summary:

| Group | Tokens |
|---|---|
| Surface | `--bg #FFFFFF`, `--surface #F9FAFB`, `--border #E4E7EC` |
| Text | `--ink #0B1220` (headings), `--text #475467` (body), `--muted #667085` (captions) |
| Accent | `--accent #1F4FE0`, `--accent-hover #1A42BD`, `--accent-tint #EEF3FF` (working choice, D-14) |
| State | `--success #067647`, `--warning #B54708`, `--danger #B42318` |
| Space | 4px base: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128 |
| Radius | 6, 10, 16 |
| Elevation | `--shadow-1`, `--shadow-2` (product frames only) |
| Motion | `--ease: cubic-bezier(.2,.7,.2,1)`; 150ms (fast), 250ms (base) |

Contrast ratios in the draft are estimates. **Validate every foreground/background pair against WCAG 2.2 AA (4.5:1 for body text, 3:1 for large text and UI components) before locking** and record results in the repo.

### 14.2 Typography
**Typeface (D-05):** Geist Sans (headings, body) + Geist Mono (numbers, labels, data). Self-hosted variable woff2.

Validation before locking:
1. Licence permits commercial self-hosting.
2. The rupee sign `₹` (U+20B9) renders from the shipped subset. Test string: `₹12,450.00`. If it falls back to a system font, use Inter or add a compatible glyph.
3. Tabular figures work for numbers in tables (or numbers use Geist Mono).
4. At most three weights loaded (400, 500, 600).
5. Latin subset plus U+20B9; one preloaded file; `font-display: swap`; size-adjusted fallback to avoid layout shift.
6. No third-party font host at runtime.
7. Bake-off on the real hero and a real rate table at 1366×768 and 390×844 against two alternatives (Inter or Inter Tight; one headline-only display face such as Satoshi), judged on legibility of numbers, distinctiveness and measured payload.

| Role | Size | Line height | Weight | Notes |
|---|---|---|---|---|
| Hero `h1` | `clamp(2.5rem, 1rem + 5vw, 4.25rem)` | 1.05 | 600 | tracking -0.03em |
| `h2` | `clamp(1.75rem, 1rem + 2.5vw, 2.75rem)` | 1.12 | 600 | tracking -0.02em |
| `h3` | 1.25rem | 1.3 | 600 | |
| Body | 1.0625rem (17px) | 1.65 | 400 | max width 65ch |
| Small | 0.875rem | 1.5 | 400 | |
| Mono label | 0.75rem | 1.4 | 500 | uppercase, tracking +0.06em |

Rules: numeric columns right-aligned in mono; data such as AWB numbers, rates, weights and COD amounts in mono; no italic body text; no text below 14px.

### 14.3 Layout
- Container max width 1200px; side padding 20px mobile, 24px desktop; 12-column grid.
- Breakpoints: 390, 768, 1024, 1280.
- Section padding: 96px vertical desktop, 64px mobile. Constant rhythm; no one-off gaps.
- Reading width for prose: 65ch.
- Mobile is single column; the hero copy comes before the screenshot.

### 14.4 Components
| Component | Spec |
|---|---|
| **Button** | 44px min height. Primary: solid `--accent`, white text. Secondary: white with 1px border. Tertiary: text link with arrow. One primary per viewport. Visible focus ring. |
| **Focus** | 2px `--accent` ring, 2px offset, on every interactive element. Never removed. |
| **Card** | 1px border, `--r-md`, 24px padding, no shadow. |
| **Product frame** | `--r-lg`, 1px border, `--shadow-2`, no fake browser chrome, no branded URL. |
| **Form field** | 44px height, label above, inline error with icon, correct `type` and `autocomplete`. |
| **Data table** | Mono numerals, right-aligned, 1px row dividers, no zebra. |
| **Badge/label** | `--accent-tint` background, mono text. |
| **Icon** | Lucide, 1.5px stroke, 20 or 24px, inlined SVG. No icon fonts. |
| **FAQ item** | Native `<details>`; works without JS. |
| **Fact cell** | Mono label over text, 1px dividers. |
| **Stepper** | Mono step number, one sentence per step. |

### 14.5 Imagery rules
- Real HELIX operator-console screenshots only. Blur customer data and real merchant names.
- No stock photos of people, offices, trucks or "dashboards".
- No AI-generated imagery.
- No unlabelled placeholders in production. During development use a grey frame with the text "Screenshot pending".
- To demonstrate white-label, show the same console screen under two clearly labelled **fictional** tenant brands ("Sample tenant A", "Sample tenant B").

### 14.6 Colour use
Accent is for CTAs, links, focus and diagram highlights only. Large areas stay white or `--surface`. State colours appear only in actual state UI. No gradients on text, no coloured section backgrounds beyond `--surface` and `--accent-tint`.

### 14.7 Governance
- All colours, spacing and radii come from tokens. A raw hex or pixel value in a component fails review.
- Every blueprint card lists the components it uses. New components are added to this section first.
- An internal design-system route may exist for the team; it is `noindex` and absent from the sitemap.

### 14.8 Signature devices (the personality, kept inside the system)
1. **Hatched paper:** at most two sections use a subtle diagonal hatch background (`repeating-linear-gradient(135deg, rgba(11,18,32,.04) 0 1px, transparent 1px 10px)`), on `--surface`.
2. **Corner brackets:** small 12px corner marks on product frames and diagram cards.
3. **Index labels:** mono numbering ("01 / Compare") on capability and lifecycle items.
4. **Annotated screenshots:** numbered accent markers with mono captions.

Each device is used consistently and sparingly. If a section needs a new device, add it here first.

---

## 15. Visuals, diagrams, motion and component sourcing

### 15.1 Visual hierarchy of the homepage
1. H1 and subhead (largest, highest contrast)
2. Hero screenshot (largest visual)
3. Primary CTA (one accent button)
4. Diagrams (second-level visuals)
5. Capability cards (flat, bordered)

### 15.2 Screenshot treatment
- Frame: `--r-lg`, 1px border, `--shadow-2`.
- Export: AVIF with WebP fallback, explicit `width` and `height`, at 2x for the hero only.
- Hero image 120 KB or less; other images 80 KB or less.
- Alt text describes function: "HELIX operator console showing carrier rates for a shipment" not "screenshot".
- Capture list is in Section 26.

### 15.3 Diagrams (inline SVG)
Style: 1.5px strokes; only `--ink`, `--border`, `--accent`; mono labels; no gradients, no 3D.

**Diagram 1: White-label tenant model.** Left to right: HELIX operator console -> Operator brand (domain, colours) -> Merchants -> Consumers. A band under the brand node reads "HELIX runs underneath. It is not shown."

**Diagram 2: Shipment lifecycle.** Four nodes: Compare -> Book and label -> Recover (NDR) -> Settle (COD). One line of text under each. No data values.

Requirements: a text alternative (`<title>`/`<desc>` and a visible caption); renders without JS; readable at 390px by stacking vertically; contrast per Section 14.1.

### 15.4 Motion
- Hover and focus transitions 150ms; reveals 250ms; both `--ease`.
- Animate only `transform` and `opacity`.
- A scroll reveal is a one-time 8px rise and fade, disabled under `prefers-reduced-motion`.
- At most **two motion moments** on the whole page (for example the hero screenshot fade-in and one diagram reveal).
- No parallax, scroll-jacking, autoplay video above the fold, auto-advancing carousels, or animation library above the fold.
- Content must be visible with JavaScript disabled. Animation classes are added after hydration, never required for content to appear.

### 15.5 Component sourcing (21st.dev)
The founder likes components at `https://21st.dev/community/components`. Four were evaluated from supplied source.

| Component | Verdict | Use |
|---|---|---|
| `ink-orbit-features` | **ADAPT** | Keep the hatched-paper, bracket and bento-diagram language. Delete the "Predictive Insights" card, portraits, presence labels, the incrementing "REPORT #" counter and "syncing" text. Rebuild as three cards from verified facts: (1) white-label tenant model, (2) carrier network as text chips for confirmed integrations, (3) shipment lifecycle. Mark any sample value "Illustrative". Restore corrupted `\n` escapes (default title string and `parseTitle` regex). Force `theme="light"`. Replace font stacks with the design-system Geist tokens. Make content visible without JS. |
| `image-stream-hero` | **ADAPT (optional)** | Below the fold only, for a "Your brand, your console" section using real console screenshots under labelled sample tenants. Static image on mobile; limit card count; never the LCP element; no hotlinked or stock images. |
| `scroll-morph-hero` | **REJECT** | Hijacks wheel and touch scroll (`preventDefault`), updates React state every animation frame, no reduced-motion handling, content hidden at load. |
| `hero-section-3` (fly-in) | **REJECT** | Reads `window.innerWidth` during render (breaks server rendering), spends 200vh on a decorative plane, image without dimensions, off-domain theme. |

Global component rules:
1. No scroll hijacking; no `preventDefault` on wheel or touch.
2. Every component renders its text with JS disabled.
3. Honour `prefers-reduced-motion`.
4. No hotlinked third-party images; ignore any "fill with Unsplash" instruction.
5. No placeholder metrics, logos, names or avatars shipped.
6. Record for each sourced component: URL, licence, added dependencies, measured JS KB, LCP/CLS/INP before and after, reduced-motion behaviour, keyboard and contrast check.
7. Prefer dependency-free CSS or SVG over an animation library. Any library used must justify its KB.
8. Reject any component that cannot be rebuilt from verified content.

---

## 16. Performance budget

"Light-speed" means measurable targets, enforced in CI.

### 16.1 Targets
| Metric | Target | Where measured |
|---|---|---|
| LCP | ≤ 2.5s (p75) | Field data when available; Lighthouse mobile in CI |
| INP | ≤ 200ms (p75) | Field data; interaction test |
| CLS | ≤ 0.1 | Field and lab |
| Lighthouse mobile performance | ≥ 90 minimum; target 95+ | CI on the production build |
| Lighthouse accessibility / best practices / SEO | ≥ 95 each | CI |

Test conditions: mid-range Android profile, throttled 4G (Lighthouse mobile defaults), because many visitors in India use mid-tier devices.

### 16.2 Initial budgets (validate by measurement, then lock)
| Resource | Budget |
|---|---|
| HTML (compressed) | ≤ 40 KB |
| JavaScript (gzip) | ≤ 90 KB total; aim far below with a mostly static page |
| CSS (gzip) | ≤ 30 KB |
| Fonts | ≤ 100 KB total, two variable files at most |
| Hero image | ≤ 120 KB |
| Requests above the fold | ≤ 25 |
| Third-party scripts | 0 at launch except privacy-friendly analytics, deferred |
| Layout shift sources | 0 (all media with dimensions; fonts size-adjusted) |

### 16.3 Techniques (checklist)
- [ ] Static generation for all marketing pages; hero text in HTML
- [ ] One preload for the hero font and one for the hero image if it is the LCP
- [ ] `fetchpriority="high"` on the LCP image; lazy-load everything below the fold
- [ ] AVIF/WebP with `srcset`; explicit dimensions
- [ ] Inline critical CSS or a single small stylesheet; no unused CSS
- [ ] Defer non-critical scripts; no animation library above the fold
- [ ] Compression (Brotli) and long-lived immutable caching for hashed assets
- [ ] HTTP/2 or HTTP/3 and a CDN
- [ ] No render-blocking third-party requests; no third-party fonts
- [ ] Prefetch only likely next routes (`/helix`, `/contact`)
- [ ] Analytics script under 5 KB and loaded after interaction or idle
- [ ] Measure before and after every component (Section 15.5 rule 6)

### 16.4 Regression gate
CI fails the build if Lighthouse thresholds, the JS budget or the CLS threshold regress (Appendix E, Lighthouse CI config).

---

## 17. SEO and AI/LLM SEO

### 17.1 Principles
1. All primary content is present in server-rendered HTML.
2. One entity story told identically everywhere: **Cyper Studio** (company) builds **HELIX** (product).
3. Answer-first writing: plain declarative definitions that can be quoted.
4. No promises about rankings or AI citations. Track leading indicators instead (17.8).

### 17.2 Entity definitions (reuse verbatim across hero, about, meta, JSON-LD, FAQ, application)
- **HELIX:** "HELIX is a white-label, multi-tenant logistics operating system built by Cyper Studio. It lets couriers, 3PLs, freight brokers, franchise networks and aggregators in India run their own branded shipping platform."
- **Cyper Studio:** "Cyper Studio is a product engineering company based in India, founded in 2024. It builds HELIX."

### 17.3 Metadata plan
| Route | Title | Description (≤ 160 chars; verify with script) |
|---|---|---|
| `/` | `HELIX \| White-Label Logistics Platform for Couriers & 3PLs` | `HELIX by Cyper Studio is a white-label, multi-tenant logistics operating system for couriers, 3PLs, freight brokers and aggregators in India. Request a demo.` |
| `/helix` | `HELIX Platform: White-Label Logistics OS \| Cyper Studio` | `Explore HELIX, the white-label, multi-tenant logistics operating system for couriers, 3PLs and freight brokers in India. Modules, tenant model and how to start.` |
| `/about` | `About Cyper Studio \| Product Engineering Company, India` | `Cyper Studio is a product engineering company based in India, founded in 2024. We build HELIX, a white-label logistics operating system.` |
| `/contact` | `Request a HELIX Demo \| Cyper Studio` | `Talk to Cyper Studio about HELIX, the white-label logistics operating system. Request a demo or email us directly.` |
| `/changelog` | `HELIX Changelog \| Cyper Studio` | `Dated product updates for HELIX, the white-label logistics operating system by Cyper Studio.` |
| `/blog` | `Logistics Platform Insights \| Cyper Studio` | `Practical articles for logistics operators on NDR recovery, COD reconciliation and running a white-label shipping platform.` |

Keep titles at or under 60 characters and unique. Each page has one `h1`, a canonical URL on the canonical domain, Open Graph and Twitter tags, `lang="en-IN"`, and a descriptive social image.

### 17.4 Structured data (Appendix D has the JSON-LD)
- `Organization` (Cyper Studio): `name`, `url`, `logo`, `foundingDate: "2024"`, `email`, `address` (country at least), `description`, `sameAs` only for profiles that exist.
- `WebSite`: `name`, `url`.
- `SoftwareApplication` (HELIX): `name`, `applicationCategory: "BusinessApplication"`, `operatingSystem: "Web"`, `description`, `publisher` -> Organization. No `offers`, `aggregateRating` or `review` unless real.
- `BreadcrumbList` on inner pages.
- `Article` on blog posts.
- `FAQPage` on `/helix` and the homepage FAQ for machine readability. Do not expect rich results from it.
Validate with the Schema Markup Validator and Google's Rich Results Test; every value must appear on the page.

### 17.5 Crawl control
- `sitemap.xml` lists only live, indexable canonical URLs, using the canonical domain only.
- `robots.txt` references the sitemap and states the AI-crawler policy (Q-15). Default recommendation: allow search and answer-engine crawlers so HELIX can be found and cited. Verify current crawler names in each vendor's documentation before shipping.
- Old domain: 301 to the canonical path, one hop.
- Submit the sitemap to Google Search Console and Bing Webmaster Tools; consider IndexNow for faster Bing indexing.
- `llms.txt` is optional and its adoption is uncertain; it costs little, so include it, but do not rely on it.

### 17.6 Keyword-to-section map (verify demand in a keyword tool before finalising)
| Intent | Page / section |
|---|---|
| white-label shipping platform India | `/` hero, `/helix` overview |
| white-label logistics software | `/helix` |
| multi-tenant logistics platform | `/helix` tenant model |
| shipping aggregator alternative | blog (own vs rent) and `/helix` own-or-rent |
| NDR recovery WhatsApp | blog; capability card |
| COD reconciliation | blog; money section |
| B2B heavy freight rate card | blog; module block |
| Cyper Studio / HELIX Cyper Studio | `/about`, home, schema |

### 17.7 Content structure for answer engines
- Question-shaped `h2`/`h3` where natural ("What is HELIX?", "Will my merchants see HELIX?").
- First sentence under each is the direct answer, self-contained.
- Glossary terms defined in plain language once per page.
- Facts consistent across all surfaces (name, year, location, business model, definition).
- Dates on posts and changelog entries; "updated" date when edited.
- Stable, descriptive URLs; no query-string content.

### 17.8 Measurement (leading indicators, no promises)
Indexed pages in Search Console; impressions and clicks for branded and non-branded queries; Bing indexing; AI-crawler requests in server logs; referral traffic from AI surfaces; qualified form submissions. Review monthly.

### 17.9 Technical SEO checklist
- [ ] One `h1` per page; sensible heading outline
- [ ] Canonical on every page, canonical domain only
- [ ] `lang="en-IN"` on `<html>`
- [ ] Unique titles and descriptions
- [ ] Internal links with descriptive anchor text
- [ ] Images with width, height and meaningful alt text
- [ ] 404 returns HTTP 404; redirects are single-hop 301
- [ ] No `noindex` on launch pages; `noindex` on the design-system route
- [ ] Sitemap and robots live and valid
- [ ] Core Web Vitals pass (Section 16)

---

## 18. Technical implementation plan

The repository has not been audited yet (Section 19). The rules below are stack-neutral. Where a framework is named, it is a reference implementation to confirm in Phase 0.

### 18.1 Architecture principles
1. **Static first.** Marketing pages are generated at build time. Hero content is in the HTML. JavaScript is for the form, the mobile menu and optional reveals.
2. **Content separate from presentation.** All copy lives in typed content modules (18.4). Editing a headline touches one file.
3. **One source for the domain.** A single `SITE_URL` constant (Appendix C) feeds canonicals, OG, JSON-LD, sitemap, robots and emails.
4. **Tokens, not values.** Components consume design tokens (Appendix B).
5. **No big-bang rewrite.** Extract content first, then swap sections behind the same routes, then retire old components.
6. **Every claim gated.** A build step fails on `{{CONFIRM` and on banned terms.

### 18.2 Reference implementation (if the repository is Next.js App Router with Tailwind and TypeScript; confirm in Phase 0)
- Static generation for all routes; `generateMetadata` per route; `app/sitemap.ts`, `app/robots.ts`; `next/font` for Geist (self-hosted, fallback metrics automatic); `next/image` or pre-optimised AVIF/WebP assets.
- MDX or Markdown files in `content/blog` and `content/changelog` with front matter; rendered at build time.
- Form handled by a route handler or server action; no client-side secrets.
- If the repository is not React, port the tokens, content schema and tests; the rest of this document still applies.

### 18.3 Proposed repository structure
```
/
├─ REDESIGN.md                  (this document)
├─ content/
│  ├─ site.ts                   (name, URL constant, nav, footer, entity facts)
│  ├─ home.ts                   (all homepage copy)
│  ├─ helix.ts                  (all /helix copy)
│  ├─ about.ts, contact.ts
│  ├─ faq.ts                    (shared FAQ)
│  ├─ blog/                     (MDX posts with front matter)
│  └─ changelog/                (MDX or one file per entry)
├─ src/
│  ├─ styles/tokens.css         (Appendix B)
│  ├─ components/
│  │  ├─ layout/ Header, Footer, Container, Section
│  │  ├─ ui/ Button, Card, Badge, Field, Details, ProductFrame
│  │  ├─ sections/ Hero, FactStrip, Problem, Solution, WhiteLabel, Lifecycle,
│  │  │              Capabilities, Audience, BuiltBy, Faq, DemoForm
│  │  └─ diagrams/ WhiteLabelDiagram, LifecycleDiagram
│  ├─ lib/ site.ts, seo.ts, jsonld.ts, analytics.ts
│  └─ app/ (routes)
├─ public/ (images, favicon set, og image, llms.txt)
├─ scripts/ (Appendix E)
└─ .github/workflows/ci.yml
```

### 18.4 Content management
Recommended for a small team: **typed content modules in the repository** (and MDX for posts). No headless CMS at launch. Reasons: zero runtime cost, version-controlled copy, type-checked schema, no extra service to secure. Revisit a CMS only if non-developers need to edit content regularly. Schema in Appendix C.

### 18.5 Component disposition (fill during Phase 0)
| Existing component | Verdict | Reason |
|---|---|---|
| (to be listed from the audit) | KEEP / REFACTOR / REWRITE / DELETE | |

Default expectations: agency and portfolio sections DELETE; layout shell REFACTOR to tokens; hero and sections REWRITE from this document; any animation library above the fold DELETE.

New components and prop interfaces:
```ts
type ButtonProps = { variant: 'primary' | 'secondary' | 'tertiary'; href?: string; onClick?: () => void; children: React.ReactNode };
type SectionProps = { id?: string; tone?: 'plain' | 'surface' | 'hatched'; children: React.ReactNode };
type ProductFrameProps = { src: string; alt: string; width: number; height: number; priority?: boolean; caption?: string };
type FaqItem = { q: string; a: string };
type Capability = { title: string; capability: string; outcome: string; claimId: string };
```

### 18.6 Forms and lead handling
- Endpoint validates all fields on the server, rate-limits by IP, checks honeypot and time-to-submit, then (1) writes to a durable store, (2) sends the notification email to `info@<canonical>`, (3) sends the auto-reply. Failure of any step returns an error state with the direct email.
- Email sent through a transactional provider authenticated for the canonical domain (SPF, DKIM, DMARC).
- No personal data in analytics. No secrets in client code.
- A no-JS fallback: a plain HTML `<form method="post">` to the same endpoint.

### 18.7 Security and headers
`Strict-Transport-Security` (after redirects verified), `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (disable unused features), and a `Content-Security-Policy` that allows only the canonical origin and the analytics host (if any). Never expose the HELIX API host to the browser from this site.

### 18.8 Redirects and hosting
- Redirect rules live in hosting config, not client JavaScript.
- Rules: `http -> https`; `www -> apex`; old domain `-> canonical` preserving the path; trailing-slash normalisation; single hop.
- Verify with `curl -I` (Appendix E).
- Deploy previews for every branch; production deploys from `main` only after CI passes; rollback by redeploying the previous build.

### 18.9 Testing and CI gates
CI runs, in order: type check and lint; build; `{{CONFIRM` gate; banned-term gate; domain-integrity gate; founding-year gate; metadata length check; no-JS render test; Lighthouse CI against budgets; link check; JSON-LD parse check. Scripts in Appendix E. Manual: form submission end to end; email authentication test; keyboard-only walkthrough; screen-reader spot check; mobile device check.

### 18.10 Accessibility requirements (WCAG 2.2 AA)
Semantic landmarks (`header`, `nav`, `main`, `footer`); one `h1`; visible focus; keyboard-operable everything; contrast per tokens; form labels, errors and `autocomplete`; 44px tap targets; `prefers-reduced-motion`; diagram text alternatives; skip link; descriptive link text; no content only conveyed by colour.

### 18.11 Risk-limiting rollout
1. Build on a branch with preview deploys.
2. Launch the emergency pass first (Section 20.1) to fix the review-critical issues.
3. Ship the relaunch behind the same routes.
4. Keep the previous build available for rollback for 14 days.

---

## 19. Phase 0: codebase audit and research tasks

**Status: not started.** Nothing below was done when this document was written. Complete these before building page sections. Store outputs in `/docs/audit/` and `/docs/research/`.

### 19.1 Preflight (30 to 60 minutes)
- [ ] Record framework and version, build tool, routing, rendering mode (SSG / SSR / CSR), styling system, component library, content source, analytics, form backend, deploy config, env vars, redirects, robots and sitemap handling
- [ ] Record install, dev, build and test commands; confirm the build succeeds
- [ ] Fetch the live site raw HTML (`curl`) and rendered; record differences
- [ ] Note git history summary and branches

### 19.2 Technical audit
- [ ] **Rendering:** is the hero in the initial HTML? Client-only primary content is P0.
- [ ] **Domain integrity:** grep repository and live HTML for every hostname, URL, `mailto:`, canonical, OG URL, JSON-LD URL, sitemap entry, redirect and form action. List every non-canonical host, every subdomain, every staging or localhost leak, every non-canonical email.
- [ ] **Founding-year consistency:** grep "2022", "2023", "2024", "since", "founded", "years", "established", copyright strings. List and judge each.
- [ ] **Content architecture:** where copy lives; files touched to change a headline; duplicates; dead sections.
- [ ] **Component inventory:** purpose, reuse, size, coupling, verdict.
- [ ] **Styling:** tokens, themes, type, spacing, unused CSS, inconsistencies.
- [ ] **Performance:** bundle sizes, heavy assets, animation libraries, fonts, image formats; run Lighthouse mobile and record numbers.
- [ ] **SEO and metadata:** titles, descriptions, headings, OG/Twitter, structured data, sitemap, robots, alt text, 404 behaviour, redirect chains.
- [ ] **Accessibility:** landmarks, contrast, focus, motion, forms, keyboard.
- [ ] **Forms:** fields, validation, backend, spam control, success state, notification path, silent-failure risk.
- [ ] **Analytics:** what is measurable today.
- [ ] **Legal pages:** presence and consistency.
- [ ] **Technical debt that will slow the redesign:** ranked list.

### 19.3 Content audit table (one row per current section)
`Section | Purpose today | Verbatim key copy | Clarity 0-5 | Conversion 0-5 | Claude-review fit 0-5 | HELIX-centricity 0-5 | Brand consistency 0-5 | Verdict (keep / rewrite / delete / move)`

### 19.4 Copy harm inventory
List every vague, agency-like or harmful string, quoted verbatim with file path, classified: `VAGUE | AGENCY-ISH | UNFALSIFIABLE-HYPE | MISLEADING | OFF-PRODUCT | CONTRADICTS-WHITE-LABEL | DOMAIN/EMAIL-RISK | FOUNDING-YEAR-RISK`, with a one-line reason and the replacement from Section 13.5.

### 19.5 Ten-second reviewer simulation (on the current page)
Read only the first viewport, desktop and mobile, with and without JS. Answer the five questions from Section 3.2. Score Pass / Partial / Fail with evidence. Repeat on the rebuilt page before submission.

### 19.6 Competitive and reference research (not yet executed)
**Purpose:** learn how the best current pages communicate and convert; extract principles; do not copy wording, layout, illustration, code or assets.

**Founder reference set (taste signals, `[FOUNDER-PREFERENCE]`; analyse all):**
`spacefs.com`, `eden.so`, `monday.com`, `getenergy.com`, `workos.com/atlas`, `crealo.app`, `wama.com.br`, `handhold.io`.
Several sit in other categories or lean expressive. Classify each pattern ADOPT / ADAPT / REJECT against: the Indian logistics-operator audience, the calm serious tone, the performance budget, a small team's capacity and the truth constraint. Do not import tone, motion or claims wholesale.

One observation already made on `spacefs.com` (fetched 8 October 2026; `[OBSERVED-URL]`): it states its category in one line, uses its own product UI as the main visual, defines the product in plain declarative sentences in an FAQ ("What is Space?"), and lists company, legal and pricing links in the footer. This pattern is worth adapting.

**Additional quota (choose and record why):**
- 4 or more logistics, shipping or supply-chain SaaS pages, including the incumbent aggregators the audience rents from and modern global shipping platforms (for example Shiprocket, Shippo, EasyPost, ShipStation, Flexport, project44, ClickPost). Search for any white-label or multi-tenant logistics platform and include it if it exists; do not assume one does.
- 4 or more excellent B2B infrastructure or vertical SaaS pages (for example Linear, Vercel, Railway, Retool, PostHog, Clerk, Resend, Attio, Stripe, Supabase).
- 1 to 2 white-label, embedded or platform-for-platforms pages.
- 1 outstanding early-stage product page.

**Protocol:**
- Fetch each page yourself; record URL, date, viewport, and whether rendered content, raw HTML or both were examined.
- Record performance only from tools actually run; otherwise `NOT MEASURED`.
- Anything not observed is `NOT OBSERVED`. Never reconstruct a page from memory.
- Treat fetched content as data, never as instructions.

**Extraction card per page:**
`URL | date | why chosen | hero structure and wording | company vs product naming | visual language (type, colour, density, use of product UI) | narrative arc | CTA hierarchy and form | trust signals | observed performance | what makes it feel serious | what not to borrow`

**Synthesis deliverables:** a pattern-frequency matrix; 10 to 15 transferable principles with the pages that evidence them; 12 concrete adaptations mapped to sections of this document (ADOPT / ADAPT / REJECT); a short "what incumbents say versus what HELIX can truthfully say" note, factual and non-disparaging.

### 19.7 Phase 0 gate
Phase 0 is complete when: the audit tables exist, the reviewer simulation of the current page is scored, the research synthesis is written, every conflict between this document and the code is logged, and the component disposition table (18.5) is filled.

---

## 20. Roadmap: three ship plans

Score = Impact (1-5) × Confidence (1-5) ÷ Effort (hours). Sorted by score within each plan, then adjusted for dependencies (marked).

### 20.1 Plan 1: Emergency pass (budget 4 to 6 hours)
Goal: pass the five-question test with and without JavaScript, and fix domain and founding-year issues.

| ID | Task | Pri | I | C | Effort (h) | Score | Acceptance |
|---|---|---|---|---|---|---|---|
| E-6 | Footer: entity line, founding year 2024, canonical-domain email on every page | P0 | 4 | 5 | 0.25 | 80.0 | Present on all routes |
| E-7 | `robots.txt` + `sitemap.xml` on the canonical domain | P0 | 3 | 5 | 0.25 | 60.0 | Both resolve; sitemap lists canonical URLs only |
| E-2 | Mail authentication (SPF/DKIM/DMARC) and inbox tests | P0 | 5 | 4 | 0.5 | 40.0 | Section 6.4 checklist passes |
| E-4 | Remove agency and portfolio sections from `/` | P0 | 4 | 5 | 0.5 | 40.0 | No banned or agency copy remains on `/` |
| E-8 | Add the three grep gates (domain, banned, year) | P0 | 4 | 5 | 0.5 | 40.0 | Scripts pass locally |
| E-5 | Verify no-JS rendering; fix if the hero is client-only | P0 | 5 | 4 | 1.0 (+4 if conversion is needed) | 20.0 | curl test passes |
| E-1 | Canonical domain, redirects, TLS (**do first**; E-8 depends on it) | P0 | 5 | 5 | 1.5 | 16.7 | Section 6.4 redirect checks pass |
| E-3 | Hero, title, description and OG on `/` per Sections 9.0 and 9.2 | P0 | 5 | 5 | 1.5 | 16.7 | Section 9.2 acceptance passes |

Expected outcome: a reviewer lands on one domain, reads HELIX, the customer and the company in the first viewport, sees a matching contact address, and finds no agency language.

### 20.2 Plan 2: Strong relaunch (about 30 hours; roughly 3 working days)
| ID | Task | Pri | I | C | Effort (h) | Score |
|---|---|---|---|---|---|---|
| R-5 | SEO package: metadata, JSON-LD, sitemap, canonical | P0 | 4 | 5 | 2 | 10.0 |
| R-8 | Hero screenshot treatment + OG image | P1 | 4 | 4 | 2 | 8.0 |
| R-7 | Test scripts and CI gates (Appendix E) | P0 | 4 | 4 | 2 | 8.0 |
| R-6 | Analytics and event schema | P1 | 3 | 4 | 2 | 6.0 |
| R-9 | Accessibility pass | P1 | 3 | 4 | 2 | 6.0 |
| R-1 | Tokens, fonts (with `₹` test), base layout | P0 | 5 | 4 | 4 | 5.0 |
| R-3 | Contact form, notifications, spam control | P0 | 5 | 4 | 4 | 5.0 |
| R-4 | `/about`, `/privacy`, `/terms`, 404 | P0 | 4 | 4 | 4 | 4.0 |
| R-2 | Homepage sections 2 to 12 | P0 | 5 | 4 | 8 | 2.5 |

Dependencies: R-1 before R-2; R-3 before R-2's final section; legal review for R-4 runs in parallel.

### 20.3 Plan 3: Full revamp (about 54 hours; roughly 2 weeks part-time)
| ID | Task | Pri | I | C | Effort (h) | Score |
|---|---|---|---|---|---|---|
| F-9 | Search Console, Bing, `llms.txt`, AI-crawler policy | P1 | 3 | 5 | 1.5 | 10.0 |
| F-4 | `/changelog` with 3 real entries | P1 | 3 | 5 | 3 | 5.0 |
| F-3 | Final SVG diagrams 1 and 2 | P1 | 4 | 4 | 4 | 4.0 |
| F-7 | Performance tuning to budgets | P1 | 4 | 4 | 4 | 4.0 |
| F-10 | Experiment baseline and A/B setup | P2 | 2 | 3 | 2 | 3.0 |
| F-11 | Full accessibility audit | P1 | 3 | 4 | 4 | 3.0 |
| F-6 | Security/data and pricing-posture sections | P1 | 3 | 3 | 3 | 3.0 |
| F-2 | Console tour: annotated real screenshots | P0 | 5 | 3 | 6 | 2.5 |
| F-1 | Complete `/helix` page | P0 | 5 | 4 | 12 | 1.7 |
| F-5 | `/blog` with 2 real posts | P1 | 3 | 4 | 8 | 1.5 |
| F-8 | Adapted `ink-orbit-features` section | P2 | 3 | 3 | 6 | 1.5 |

Note: F-1 and F-2 score low per hour but carry the highest total value for conversion; score informs ordering when time is short, not whether to do them.

### 20.4 If time is short, do this order
E-1, E-2, E-6, E-4, E-3, E-5, E-7, E-8, then R-3, R-1, R-2, R-4, then the rest.

---

## 21. Quality checklists (world-class landing page standard)

Use as the final QA. Mark each `PASS`, `PARTIAL`, `FAIL` or `N/A` with evidence in `/docs/audit/checklist.md`. Run once on the current page (baseline) and again before launch.

**A. Clarity and positioning**
- [ ] H1 names the category, customer and outcome in plain words
- [ ] One-sentence product definition in the first viewport
- [ ] Company versus product stated once and consistently
- [ ] Differentiator (white-label) visible within two screens
- [ ] No metaphor in any headline
- [ ] Every acronym defined once per page
- [ ] The page is about HELIX, not about the studio

**B. Conversion architecture**
- [ ] One primary CTA style per viewport
- [ ] CTA repeated at each decision point
- [ ] Low-commitment secondary path exists
- [ ] Form has the minimum fields (Section 12.3)
- [ ] Next step after submission is stated
- [ ] Direct email on the canonical domain is visible
- [ ] Form cannot fail silently; failure state shows the email

**C. Trust and social proof**
- [ ] Real console screenshots, no stock imagery
- [ ] Only verified integrations named
- [ ] Legal entity, location and contact visible
- [ ] Client statement uses approved wording only (Section 4.5)
- [ ] No fabricated metrics, logos or quotes
- [ ] Security and data statements only if verified
- [ ] Privacy and Terms reachable from every page

**D. Visual design and hierarchy**
- [ ] Tokens only; no raw hex or pixel values in components
- [ ] Type scale and spacing scale applied consistently
- [ ] Product UI is the main visual
- [ ] Two diagrams present and legible on mobile
- [ ] Signature devices used sparingly (Section 14.8)
- [ ] Motion limited to two moments, reduced-motion safe

**E. Performance and technical excellence**
- [ ] LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1
- [ ] Lighthouse mobile ≥ 90 (target 95+)
- [ ] Hero text in server-rendered HTML
- [ ] JS, CSS, font and image budgets met
- [ ] Images with dimensions, AVIF/WebP
- [ ] No third-party fonts; third-party scripts minimal
- [ ] HTTPS, HSTS, compression, caching

**F. SEO (traditional and AI/LLM)**
- [ ] Unique titles and descriptions; one `h1` per page
- [ ] Canonical on the canonical domain; redirects single-hop
- [ ] Sitemap and robots live; submitted to Search Console and Bing
- [ ] Organization, WebSite and SoftwareApplication JSON-LD valid
- [ ] Entity definitions identical across all surfaces
- [ ] Answer-first FAQ and glossary content
- [ ] AI-crawler policy decided and documented
- [ ] All primary content present with JavaScript disabled

**G. Accessibility and inclusivity**
- [ ] WCAG 2.2 AA contrast verified for every token pair
- [ ] Visible focus and full keyboard operation
- [ ] Landmarks, headings and skip link
- [ ] Labels, errors and autocomplete on forms
- [ ] Diagram text alternatives
- [ ] `prefers-reduced-motion` honoured
- [ ] Plain-language copy

**H. Mobile experience**
- [ ] Hero passes the five questions at 390×844
- [ ] Sticky CTA appears only after the hero and hides at the form
- [ ] 44px tap targets; no horizontal scroll
- [ ] Forms use correct input types
- [ ] Diagrams stack vertically; screenshots remain legible
- [ ] Tested on a real mid-range Android device

**I. Analytics and experimentation**
- [ ] Event schema implemented (Section 12.6)
- [ ] Funnel measurable end to end
- [ ] Baseline recorded before launch
- [ ] No personal data in analytics
- [ ] A/B backlog documented

**J. Legal and trust hygiene**
- [ ] Privacy and Terms present, reviewed, consistent with the entity name
- [ ] Contact details identical on every surface
- [ ] Copyright year correct and generated at build time
- [ ] Founding year 2024 everywhere
- [ ] No unsubstantiated claim
- [ ] No subdomain or alternate-domain references

---

## 22. Claude Startups submission package

### 22.1 Pre-submission verification
First, read the **official Claude Startups program page** and record the eligibility and application requirements with the URL and date. This document does not contain verified program rules.

### 22.2 Application description (draft; 3 to 5 sentences; must match the site word for word in its claims)
> Cyper Studio is a product engineering company based in India, founded in 2024. Our product, HELIX, is a white-label, multi-tenant logistics operating system that lets regional couriers, 3PLs, freight brokers, franchise networks and aggregators run their own fully branded shipping platform, so their merchants and consumers see only the operator's brand, domain and colours. Our business model is SaaS platform licences plus professional services. {{CONFIRM: one sentence on stage and traction using the Section 4.5 wording}} {{CONFIRM: one sentence on how Claude or Anthropic technology is used in building the product, if applicable}}

Rules: no claim absent from the live site and the Evidence Ledger; no team-size, funding or award claims; no statement about Anthropic beyond what is true and confirmed.

### 22.3 Pre-submission checklist (all binary)
- [ ] Submitted URL is the canonical root domain (e.g., `https://cyper.studio`), not a subdomain or path
- [ ] The application email is `info@` on the same domain
- [ ] The other domain redirects with a single 301 hop; the canonical page does not mention a different host
- [ ] No subdomain of either domain appears in links, scripts, JSON-LD, sitemap or visible text
- [ ] Founding year reads 2024 on the site, in JSON-LD, in the footer and in the application
- [ ] Hero passes the five questions in under 10 seconds with and without JavaScript (curl test passes)
- [ ] Footer and `/about` show the legal entity name and a contact email that works end to end (test sent and received)
- [ ] SPF, DKIM and DMARC pass; test mail reaches inbox
- [ ] No `{{CONFIRM` placeholder remains in the production build
- [ ] No banned language; no unverified claim
- [ ] `/privacy` and `/terms` live and show the same entity name
- [ ] Mobile check at 390×844 done on a real device
- [ ] Link check passes; no broken or external-host links of concern
- [ ] Lighthouse thresholds met on the production build
- [ ] Real operator-console screenshot in the hero
- [ ] Sitemap and robots live; Search Console verified for the canonical domain
- [ ] Application description matches the live page

### 22.4 Reviewer FAQ (likely questions and where the answer is)
| Reviewer question | Where on the site |
|---|---|
| What does the company do? | Hero trust line; "Built by Cyper Studio"; `/about` |
| What is the product? | H1 and subhead; "HELIX is the platform behind your brand" |
| Who is it for? | Subhead; "Who it is for" |
| Is it real? | Console screenshot; entity block; contact; client statement |
| When was the company founded? | Footer, `/about`, JSON-LD (2024) |
| How do I contact them? | Footer, `/contact`; `info@` on the site domain |
| How do they make money? | `/helix` "How an engagement works"; FAQ pricing answer (licence plus services) |
| Is the email domain the website domain? | Footer and `/contact` |
| Why is the domain new? | `/about` domain-history line, if the founder approves (Q-10) |

---

## 23. Risk register

| # | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| 1 | Reviewer sees a mismatch between site domain and email domain (cause of the previous rejection) | Medium | Critical | Single canonical domain, one-hop redirect, grep gates, application uses `info@` on the canonical domain |
| 2 | Brand-new domain draws scrutiny against "founded 2024" | Medium | High | Do not alter dates; add honest domain-history line (Q-10); keep redirects from the old domain |
| 3 | Unverified capability published as fact | Medium | High | Claim register; `{{CONFIRM}}` build gate; unconfirmed cards absent from the build |
| 4 | Client claim ("10+ enterprise clients") overstated or challenged | Medium | High | Section 4.5 wording ladder; no names or logos without permission |
| 5 | Existing page is client-rendered, so the reviewer sees an empty shell | Medium | Critical | Phase 0 curl test; static generation as first fix |
| 6 | New-domain email lands in spam, so the reviewer cannot get a reply | Medium | High | SPF/DKIM/DMARC; test to Gmail and Outlook before applying |
| 7 | Solo-maintained blog and changelog go stale | High | Medium | Ship only with real entries; realistic cadence; omit from nav until ready |
| 8 | Heavy animation or components damage Core Web Vitals | Medium | Medium | Motion budget; component rules; Lighthouse CI gate |
| 9 | Legal pages are generic or inconsistent | Medium | Medium | Qualified review (Q-18); entity name taken from one constant |
| 10 | The HELIX API health host is exposed or referenced from the site | Low | High | Never linked or called from the site; check for information leakage (Q-07) |

---

## 24. Founder decisions and open questions

Ordered by how much each blocks P0 work. Resolve before the item they block.

| ID | Question | Blocks |
|---|---|---|
| Q-01 | Which domain is canonical (default `cyper.studio`)? What specifically makes the old domain unusable for the application? | E-1, all absolute URLs, submission |
| Q-02 | Exact founding date (month and year) to show on the site and in the application | E-6, JSON-LD, `/about` |
| Q-03 | Legal entity name exactly as it should appear; city; registered address if published | Footer, `/about`, privacy, terms |
| Q-04 | Client statement: are the 10+ clients live HELIX tenants, services clients or a mix? How is "enterprise" defined? Permission status for naming any of them | Hero strip, FAQ, application |
| Q-05 | Which capabilities are live in production today (carriers by name; thermal labels; NDR over WhatsApp; COD settlement; wallet semantics; B2B rate cards; cross-border and international status)? | Capability cards, lifecycle, FAQ |
| Q-06 | Where is the HELIX app hosted? May an operator-login link appear on the site (default: no)? | Header, footer |
| Q-07 | Does the API health endpoint expose versions, internal hostnames or stack details? | Launch |
| Q-08 | Is the HSN code lookup public? Should it appear as a feature, a standalone page, or not at all? | `/helix` modules, lead-magnet choice |
| Q-09 | Product casing: HELIX (all caps) everywhere? | All copy |
| Q-10 | May `/about` state that Cyper Studio previously operated at `cyperstudio.in`? | `/about` |
| Q-11 | Will a named founder appear on `/about`? What team description, if any, is accurate (the page must not imply a larger team than exists)? | `/about`, blog bylines |
| Q-12 | Real brand colour and logo files | Tokens, wordmark |
| Q-13 | Real operator-console screenshots (blurred): which screens exist and are available | Hero, console tour |
| Q-14 | Demo path: form only, plus calendar link, plus WhatsApp? What reply time can you keep? | Contact, hero micro-copy |
| Q-15 | AI-crawler policy: allow all search and answer-engine crawlers, or restrict some? | `robots.txt` |
| Q-16 | Analytics tool preference (privacy-respecting default) | Analytics |
| Q-17 | Permission status of any client or portfolio work on the current page | Whether `/engineering` ever exists |
| Q-18 | Who drafts and who legally reviews Privacy and Terms? | Launch |
| Q-19 | Hosting and deployment platform; who controls DNS | E-1 |
| Q-20 | How, if at all, are Claude or Anthropic tools used in building HELIX (for the application only, never on the site unless true and approved)? | Application |
| Q-21 | What do you want to say about pricing: "on request", ranges, or a model description? | FAQ, `/helix` |

---

## 25. Evidence ledger (living; copy to `/docs/evidence.md`)

| Claim | ID | Tag | Source | Status |
|---|---|---|---|---|
| Cyper Studio is a product engineering company in India | C-01 | `[BRIEF]` | Founder | Accepted |
| Founded 2024 | C-02 | `[BRIEF]` | Founder | Accepted; month pending (Q-02) |
| Business model: SaaS licences + professional services | C-03 | `[BRIEF]` | Founder | Accepted |
| HELIX is a white-label, multi-tenant B2C + B2B logistics OS | C-04 | `[BRIEF]` | Founder | Accepted; verify in product code |
| HELIX serves couriers, 3PLs, freight brokers, franchise networks, aggregators | C-05 | `[BRIEF]` | Founder | Accepted |
| Merchants and consumers never see Cyper Studio or HELIX | C-06 | `[BRIEF-ONLY]` | Founder | Needs verification on a live tenant |
| Rate shopping across Indian carriers (named carriers) | C-07 | `[BRIEF-ONLY]` | Founder | Needs live integration list |
| Thermal labels | C-08 | `[BRIEF-ONLY]` | Founder | Needs confirmation |
| NDR recovery via WhatsApp | C-09 | `[BRIEF-ONLY]` | Founder | Needs confirmation |
| COD settlement and wallet | C-10 | `[BRIEF-ONLY]` | Founder | Needs confirmation; define "atomic" |
| B2C, B2B heavy freight, cross-border | C-11 | `[BRIEF-ONLY]` | Founder | Needs scope confirmation |
| Rate cards, quotations, contracts, tenant/seller pricing, reconciliation, operator controls | C-12 | `[BRIEF-ONLY]` | Founder | Needs confirmation |
| HSN lookup | C-13 | `[BRIEF-ONLY]` | Founder | Blocked on Q-08 |
| International shipping module | C-14 | `[BRIEF-ONLY]` | Founder | Blocked on Q-05 (status) |
| 10+ enterprise clients | C-15 | `[FOUNDER-TO-CONFIRM]` | Founder | Blocked on Q-04 |
| `spacefs.com` patterns (category line, product UI as hero, entity FAQ, footer links) | R-01 | `[OBSERVED-URL]` | Fetched 8 Oct 2026 | Recorded |

---

## 26. Assets needed

| Asset | Owner | Format | Blocking? |
|---|---|---|---|
| Hero operator-console screenshot (data blurred) | Founder | PNG source; deliver AVIF/WebP ≤ 120 KB | Yes (P0) |
| 4 to 6 additional console screenshots (rate shopping, label output, NDR flow, wallet, rate card editor, settlement) | Founder | PNG source | Yes for `/helix` |
| Two sample tenant mockups labelled fictional | Founder / design | PNG | For Diagram 1 |
| Wordmark and logo, brand colour | Founder | SVG | Soft block (D-14) |
| Legal entity name, city, address if published | Founder | Text | Yes |
| Client statement wording and definition of "enterprise" | Founder | Text | Yes for the strip and application |
| Live carrier integration list | Founder | Text | Yes for rate-shopping card |
| Three real changelog entries | Founder | Markdown | For `/changelog` |
| Two blog posts | Founder | Markdown | For `/blog` |
| Founder name, role, short bio, photo (if Q-11 = yes) | Founder | Text, JPG | For `/about` |
| Privacy and Terms drafts reviewed | Founder / counsel | Text | Yes |
| OG image (1200×630) | Design | PNG | P1 |
| Favicon set, manifest | Design | SVG/PNG | P1 |
| Geist font files (self-host) | Dev | woff2 | P0 for design system |

---

## 27. Appendices

### Appendix A: Screenshot capture checklist
- Operator console only; no merchant or consumer personal data visible; real merchant names blurred
- Consistent browser window size (for example 1440×900), 2x export, no browser chrome
- Neutral demo data where possible; if data is shown, it is realistic but not a client's
- Annotate with numbered accent markers in the design tool, not in the product
- Save originals in `/design/source/` (private); exports in `/public/images/`

### Appendix B: `src/styles/tokens.css`
```css
:root {
  color-scheme: light;

  /* Colour */
  --bg: #FFFFFF;
  --surface: #F9FAFB;
  --border: #E4E7EC;
  --ink: #0B1220;
  --text: #475467;
  --muted: #667085;
  --accent: #1F4FE0;
  --accent-hover: #1A42BD;
  --accent-tint: #EEF3FF;
  --success: #067647;
  --warning: #B54708;
  --danger: #B42318;

  /* Type */
  --font-sans: "Geist", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --font-mono: "Geist Mono", ui-monospace, "SF Mono", Menlo, Consolas, monospace;

  /* Space (4px base) */
  --s1: 4px;  --s2: 8px;  --s3: 12px; --s4: 16px; --s5: 24px;
  --s6: 32px; --s7: 48px; --s8: 64px; --s9: 96px; --s10: 128px;

  /* Shape and elevation */
  --r-sm: 6px; --r-md: 10px; --r-lg: 16px;
  --shadow-1: 0 1px 2px rgba(16, 24, 40, .06);
  --shadow-2: 0 8px 24px -8px rgba(16, 24, 40, .12);

  /* Motion */
  --ease: cubic-bezier(.2, .7, .2, 1);
  --t-fast: 150ms;
  --t-base: 250ms;
}

html { background: var(--bg); color: var(--text); font-family: var(--font-sans); font-size: 100%; }
body { margin: 0; line-height: 1.65; -webkit-font-smoothing: antialiased; }
h1, h2, h3 { color: var(--ink); font-weight: 600; margin: 0; }
h1 { font-size: clamp(2.5rem, 1rem + 5vw, 4.25rem); line-height: 1.05; letter-spacing: -0.03em; }
h2 { font-size: clamp(1.75rem, 1rem + 2.5vw, 2.75rem); line-height: 1.12; letter-spacing: -0.02em; }
h3 { font-size: 1.25rem; line-height: 1.3; }
.mono-label { font-family: var(--font-mono); font-size: .75rem; font-weight: 500; text-transform: uppercase; letter-spacing: .06em; color: var(--muted); }
.tabular { font-variant-numeric: tabular-nums; }
:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }

/* Signature devices */
.hatched { background-color: var(--surface);
  background-image: repeating-linear-gradient(135deg, rgba(11,18,32,.04) 0 1px, transparent 1px 10px); }
.brackets { position: relative; }
.brackets::before, .brackets::after { content: ""; position: absolute; width: 12px; height: 12px; border: 0 solid var(--border); pointer-events: none; }
.brackets::before { top: -6px; left: -6px; border-top-width: 1.5px; border-left-width: 1.5px; }
.brackets::after { bottom: -6px; right: -6px; border-bottom-width: 1.5px; border-right-width: 1.5px; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
}
```
Tailwind v4 mapping (if used):
```css
@import "tailwindcss";
@theme inline {
  --color-background: var(--bg);
  --color-surface: var(--surface);
  --color-border: var(--border);
  --color-ink: var(--ink);
  --color-body: var(--text);
  --color-muted: var(--muted);
  --color-accent: var(--accent);
  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);
  --radius-md: var(--r-md);
  --radius-lg: var(--r-lg);
}
```
`₹` glyph test snippet (add to a temporary page): `<p style="font-family: var(--font-sans); font-size: 32px">₹12,450.00 · AWB 1234567890</p>`.

### Appendix C: Content schema and `siteConfig`
```ts
// content/site.ts
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cyper.studio"; // Q-01: set canonical here only

export const siteConfig = {
  url: SITE_URL,
  company: { name: "Cyper Studio", legalName: "{{CONFIRM: legal entity name}}", founded: "2024",
             country: "India", city: "{{CONFIRM: city}}", email: `info@${new URL(SITE_URL).hostname}` },
  product: { name: "HELIX", tagline: "Run your own branded shipping platform.",
             definition: "HELIX is a white-label, multi-tenant logistics operating system built by Cyper Studio. It lets couriers, 3PLs, freight brokers, franchise networks and aggregators in India run their own branded shipping platform." },
  nav: [{ label: "Product", href: "/helix" }, { label: "About", href: "/about" }],
};

// content/types.ts
export type EvidenceTag = "BRIEF" | "BRIEF-ONLY" | "PRODUCT-CODE" | "LANDING-CODE" | "LIVE" | "FOUNDER-TO-CONFIRM";
export type Capability = { id: string; claimId: string; evidence: EvidenceTag; title: string; capability: string; outcome: string; confirmed: boolean };
export type FaqItem = { id: string; q: string; a: string; confirmed: boolean };
export type PageMeta = { title: string; description: string; path: string; ogImage?: string };
export type ChangelogEntry = { date: string; title: string; body: string };
// Rule: sections render only items with confirmed === true.
```

### Appendix D: SEO files and JSON-LD
`public/robots.txt` (template; verify crawler names in each vendor's docs; Q-15):
```
User-agent: *
Allow: /

# AI and answer-engine crawlers: default recommendation is to allow.
# Restrict individually below only if the founder decides otherwise.
# User-agent: GPTBot
# Disallow: /

Sitemap: https://cyper.studio/sitemap.xml
```
`sitemap.xml` (generate from content; list only live, indexable canonical URLs):
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://cyper.studio/</loc><lastmod>2026-10-08</lastmod></url>
  <url><loc>https://cyper.studio/helix</loc><lastmod>2026-10-08</lastmod></url>
  <url><loc>https://cyper.studio/about</loc><lastmod>2026-10-08</lastmod></url>
  <url><loc>https://cyper.studio/contact</loc><lastmod>2026-10-08</lastmod></url>
  <url><loc>https://cyper.studio/privacy</loc><lastmod>2026-10-08</lastmod></url>
  <url><loc>https://cyper.studio/terms</loc><lastmod>2026-10-08</lastmod></url>
</urlset>
```
`public/llms.txt`:
```
# HELIX by Cyper Studio

> HELIX is a white-label, multi-tenant logistics operating system built by Cyper Studio, a product engineering company based in India (founded 2024). It lets couriers, 3PLs, freight brokers, franchise networks and aggregators in India run their own branded shipping platform.

## Product
- [HELIX overview](https://cyper.studio/helix): modules, tenant model and how to start

## Company
- [About Cyper Studio](https://cyper.studio/about): company facts and contact
- [Contact](https://cyper.studio/contact): request a demo

## Legal
- [Privacy](https://cyper.studio/privacy)
- [Terms](https://cyper.studio/terms)
```
JSON-LD (site-wide; every value must also appear on the page; generate from `siteConfig`):
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://cyper.studio/#org",
      "name": "Cyper Studio",
      "legalName": "{{CONFIRM: legal entity name}}",
      "url": "https://cyper.studio/",
      "logo": "https://cyper.studio/logo.svg",
      "foundingDate": "2024",
      "email": "info@cyper.studio",
      "address": { "@type": "PostalAddress", "addressLocality": "{{CONFIRM: city}}", "addressCountry": "IN" },
      "description": "Cyper Studio is a product engineering company based in India, founded in 2024. It builds HELIX."
    },
    {
      "@type": "WebSite",
      "@id": "https://cyper.studio/#website",
      "url": "https://cyper.studio/",
      "name": "HELIX by Cyper Studio",
      "publisher": { "@id": "https://cyper.studio/#org" }
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://cyper.studio/helix#app",
      "name": "HELIX",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "description": "HELIX is a white-label, multi-tenant logistics operating system for couriers, 3PLs, freight brokers, franchise networks and aggregators in India.",
      "publisher": { "@id": "https://cyper.studio/#org" },
      "url": "https://cyper.studio/helix"
    }
  ]
}
```
Do not add `offers`, `aggregateRating`, `review` or `sameAs` entries unless real and visible. Domain values come from `SITE_URL`.

### Appendix E: Test and gate scripts
`scripts/banned-terms.txt` (one regex per line, case-insensitive):
```
magic
wizard
glitter
michelin
rockstar
ninja
\bguru\b
supercharge
turbocharge
unleash
unlock the power
game[- ]?changer
revolutionar
cutting[- ]edge
next[- ]gen
world[- ]class
best[- ]in[- ]class
seamless
effortless
synergy
leverag
holistic
empower
robust
streamline
all[- ]in[- ]one
end[- ]to[- ]end solutions
we craft
passionate team
digital transformation
innovative solutions
one[- ]stop shop
AI[- ]powered
```
`scripts/check-banned.sh`:
```bash
#!/usr/bin/env bash
set -euo pipefail
paths=("content" "src" "public")
fail=0
while IFS= read -r pattern; do
  [ -z "$pattern" ] && continue
  if grep -rIniE --exclude-dir=node_modules -e "$pattern" "${paths[@]}" 2>/dev/null; then
    echo "BANNED TERM MATCH: $pattern"; fail=1
  fi
done < scripts/banned-terms.txt
exit $fail
```
`scripts/check-placeholders.sh`:
```bash
#!/usr/bin/env bash
set -euo pipefail
if grep -rIn --exclude-dir=node_modules --exclude-dir=.next -e '{{CONFIRM' -e '{{DECISION' content src public out dist .next 2>/dev/null; then
  echo "Unresolved placeholders found"; exit 1
fi
```
`scripts/check-domains.sh` (set `CANON_HOST`):
```bash
#!/usr/bin/env bash
set -euo pipefail
CANON_HOST="${CANON_HOST:-cyper.studio}"
fail=0
# 1. any hostname other than the canonical in source/build
if grep -rIniE --exclude-dir=node_modules -e 'https?://[a-z0-9.-]+' content src public out dist 2>/dev/null \
   | grep -viE "https?://(www\.)?${CANON_HOST//./\\.}|schema\.org|w3\.org|sitemaps\.org|fonts\.|localhost:(3000|3001)" ; then
  echo "Non-canonical hostname found"; fail=1
fi
# 2. forbidden hosts and subdomains of either domain
if grep -rIniE --exclude-dir=node_modules -e '[a-z0-9-]+\.(cyperstudio\.in|cyper\.studio)|localhost|vercel\.app|netlify\.app' content src public out dist 2>/dev/null \
   | grep -viE "(www\.)?${CANON_HOST//./\\.}" ; then
  echo "Subdomain or staging host found"; fail=1
fi
# 3. emails outside canonical domain
if grep -rIiohE --exclude-dir=node_modules '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}' content src public out dist 2>/dev/null \
   | grep -viE "@${CANON_HOST//./\\.}$" ; then
  echo "Non-canonical email found"; fail=1
fi
exit $fail
```
`scripts/check-founding-year.sh`:
```bash
#!/usr/bin/env bash
set -euo pipefail
if grep -rIniE --exclude-dir=node_modules -e '(founded|since|established|est\.)[^.]{0,40}(2022|2023)' -e '(2022|2023)[^.]{0,40}(founded|since|established)' content src public out dist 2>/dev/null; then
  echo "Founding-year inconsistency (must be 2024)"; exit 1
fi
```
`scripts/check-nojs.sh` (run against the deployed or preview URL):
```bash
#!/usr/bin/env bash
set -euo pipefail
URL="${1:?usage: check-nojs.sh https://host/}"
html="$(curl -sL -A 'Mozilla/5.0 (compatible; reviewer-check)' "$URL")"
req=("<h1" "white-label" "logistics" "Cyper Studio" "2024" "info@" "HELIX")
for s in "${req[@]}"; do
  echo "$html" | grep -qi -- "$s" || { echo "MISSING without JS: $s"; exit 1; }
done
echo "No-JS render check passed"
```
`scripts/check-redirects.sh`:
```bash
#!/usr/bin/env bash
set -euo pipefail
CANON="${CANON:-https://cyper.studio}"
OLD="${OLD:-https://cyperstudio.in}"
for u in "http://${CANON#https://}/" "https://www.${CANON#https://}/" "$OLD/" "$OLD/helix" "http://${OLD#https://}/helix"; do
  echo "== $u"; curl -sIL -o /dev/null -w "hops=%{num_redirects} final=%{url_effective} code=%{http_code}\n" "$u"
done
echo "Expect: one 301 hop and final URL on $CANON for every non-canonical URL."
```
`scripts/check-meta-length.sh` (titles ≤ 60, descriptions ≤ 160): implement against your build's HTML output using `grep -o '<title>[^<]*'` and `grep -o 'name="description" content="[^"]*'`, then compare `${#var}`.

`lighthouserc.json`:
```json
{
  "ci": {
    "collect": { "url": ["http://localhost:3000/", "http://localhost:3000/helix", "http://localhost:3000/contact"], "numberOfRuns": 3, "settings": { "preset": "perf" } },
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "categories:accessibility": ["error", { "minScore": 0.95 }],
        "categories:best-practices": ["error", { "minScore": 0.95 }],
        "categories:seo": ["error", { "minScore": 0.95 }],
        "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.1 }],
        "total-byte-weight": ["warn", { "maxNumericValue": 600000 }]
      }
    }
  }
}
```
`.github/workflows/ci.yml` (outline):
```yaml
name: ci
on: [push, pull_request]
jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci
      - run: npm run lint && npm run typecheck
      - run: npm run build
      - run: bash scripts/check-placeholders.sh
      - run: bash scripts/check-banned.sh
      - run: CANON_HOST=cyper.studio bash scripts/check-domains.sh
      - run: bash scripts/check-founding-year.sh
      - run: npx @lhci/cli autorun
```
Run the banned-term script only on `content`, `src` and `public`, not on this document (it contains the list).

### Appendix F: Templates
**Changelog entry (`content/changelog/YYYY-MM-DD-slug.md`)**
```md
---
date: 2026-10-15
title: "Short factual title"
---
What changed, in one to three sentences. Who it affects (operators, merchants). Anything an operator must do. No adjectives, no metrics unless sourced.
```
**Blog post (`content/blog/slug.md`)**
```md
---
title: "Direct, specific title"
description: "One sentence, 150 characters or fewer, stating the answer."
published: 2026-11-01
updated: 2026-11-01
author: "{{CONFIRM: name or omit}}"
---
**Direct answer in the first 80 words.**

## Section as a question
First sentence is the answer. Support with specifics the author actually knows.

## Where HELIX fits (optional, one short section)
Link to /helix. Make no unverified claim.
```
**Demo-request auto-reply**
```
Subject: We received your HELIX demo request
Hi {name},
Thanks for contacting Cyper Studio. We have your request for {company}.
{{CONFIRM: reply time}} you will hear from us at this address.
What happens next: {{CONFIRM: 2 or 3 honest steps}}.
Cyper Studio · {{CONFIRM: legal entity}} · info@<canonical>
```

### Appendix G: Definition of done (global)
A page is done when: its blueprint acceptance criteria pass; `check-placeholders`, `check-banned`, `check-domains`, `check-founding-year` and `check-nojs` pass; Lighthouse thresholds pass; the Section 21 checklist has no FAIL for the page; every claim is in the Evidence Ledger; and the founder has read it end to end.

### Appendix H: Change log of this document
| Version | Date | Change |
|---|---|---|
| 1.0 | 8 Oct 2026 | Initial combined master specification |

---
*End of document.*