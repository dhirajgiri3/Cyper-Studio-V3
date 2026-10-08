# Site Context: Cyper Studio / HELIX website

Shared invariants for every Impeccable command in this repository. Wrappers in `.impeccable/<command>/SKILL.md` point here instead of repeating it. Authority order when sources disagree:

1. `Cyper_Studio_Redesign.md` (the **Spec**): decisions D-xx, claim register C-xx, blueprints, tokens, gates.
2. `PRODUCT.md` (product truth) and `DESIGN.md` (target visual system), both derived from the Spec.
3. The running code in `app/` (incumbent; agency-era; evidence and anti-reference, not authority).
4. This file and the engine references in `.impeccable/impeccable/reference/`.

If the Spec and code disagree, say so and fix one the same day (Spec rule 1.3.3). Never silently pick.

## What this repository is (and is not)

A Next.js 15 App Router **marketing site** in **JavaScript** (`.js`/`.jsx`), Tailwind 3.4, styled-components 6, source in `app/` (no `src/`, no `content/` yet). It is **not** the HELIX product UI. There is no operator console, no wallet, no `paise`/gram maths, no tenant theming, no `helix-interface` or `helix-kernel` here. Anything in an old prompt that mentions those came from the Helix-Core repository (`~/Documents/Projects/Helix India/Helix-Core/.impeccable`, where the original product-UI skills still live). Helix-only leftovers from the copy are in `.impeccable/_archive/helix-app/`.

## Surface modes (Impeccable modes, mapped to this site)

| Route | Mode | Notes |
|---|---|---|
| `/`, `/helix` | **Persuade** | One primary CTA style per viewport; the product screenshot is the visual |
| `/contact` | Persuade (form-led) | Form must never fail silently; no-JS POST fallback |
| `/about` | Persuade-lite | Facts block, named person if Q-11 = yes |
| `/changelog`, `/blog`, `/privacy`, `/terms` | **Read** | Structure for comprehension; dated entries only; no motion |
| 404 | Read | Plain text, real HTTP 404 |
| (none) | Operate | There is no Operate surface here; the console shows up only as screenshots |

## The Site Gate (run before declaring any task done)

1. **Truth:** every factual sentence maps to a claim ID with an allowed wording (Spec 4.4). `[BRIEF-ONLY]` claims are absent from the build until confirmed. No invented number, customer, logo, quote, certification, uptime, pricing, team size.
2. **No-JS:** h1, subhead, trust line, primary CTA, entity line, `info@` are in the server HTML. Content never depends on hydration or animation classes.
3. **Domain integrity:** hostname/email/founding year come only from `siteConfig` (`SITE_URL`). No subdomain of either domain, no `localhost`/`vercel.app`, no non-canonical email, founding year 2024.
4. **Tokens:** no raw hex/rgb/px in components; Spec Appendix B variables only. Light mode only.
5. **Voice:** no banned term (Spec 13.3), no metaphor headline, Capability -> Outcome, acronyms defined once, glossary casing (**HELIX**).
6. **Motion and weight:** at most two motion moments per page; `transform`/`opacity` only; reduced-motion safe; no scroll hijacking; no new dependency without measured KB; budgets in Spec 16.
7. **Accessibility:** WCAG 2.2 AA, 2px focus ring, 44px targets, one h1, landmarks, alt text that describes function, diagram text alternatives.

Mechanical enforcement: `bash scripts/check-all.sh` (placeholders, banned terms, domains, founding year). Run the Impeccable detector once at the end: `.impeccable/impeccable/scripts/impeccable detect --json <changed files>`.

## Personas for critique and shape

- **The Operator Founder (champion):** runs a regional courier/3PL, has 60 seconds, rents a platform today, fears a vendor that owns his merchants. Wants a plain definition, white-label proof, a demo path.
- **The Technical Evaluator:** CTO/ops head. Wants architecture, honest scope, what is live vs planned, how onboarding works.
- **The Vetoer:** was burned by a vendor. Looks for a real company: entity, address, named person, working email, no hype.
- **The Programme Reviewer:** runs the five-question test in 10 seconds, with and without JS, at 1366x768 and 390x844: (1) what company, (2) what product, (3) who is the customer, (4) real and early-stage, (5) email domain equals site domain.

## Command policy for this site

| Command | Policy |
|---|---|
| `shape`, `init`, `document`, `extract`, `critique`, `audit`, `polish`, `distill`, `quieter`, `harden`, `clarify`, `adapt`, `optimize`, `typeset`, `layout`, `colorize` | Use freely |
| `bolder` | Allowed only through hierarchy, scale, and product framing. Never through gradient, glow, texture, or motion |
| `animate` | Allowed inside the two-moment budget (Spec 15.4) |
| `onboard` | Reframed as post-submit and first-contact flow (success state, auto-reply, next steps) |
| `delight` | Restricted; default answer is "no"; honest micro-copy only |
| `overdrive` | **Disabled** for this site (Spec 15.4, 15.5). Refuse and route to `bolder` or `animate`. Changes only by a founder decision recorded in the Spec |
| `live` | Allowed on Persuade surfaces; variants must still pass the Site Gate |

## Known gaps between the Spec and this repository (as of the first scan)

These are Phase 0 items (Spec 19), recorded here so skills do not rediscover them:

- Spec assumes TypeScript/`src/`/`content/`/Tailwind v4; repo is JS, root `app/`, Tailwind 3.4. Port the intent, not the paths. Appendix B tokens go to `app/globals.css` (or a `tokens.css` imported by it); Tailwind 3 maps them via `theme.extend.colors = { ink: 'var(--ink)', ... }`.
- `app/layout.js` metadata is agency-era ("Your Digital Solutions Partner"), hardcodes `https://cyperstudio.in`, `lang="en"`, `locale: en_US`, dark `themeColor`, and links a `site.webmanifest`. Spec wants `en-IN`, one `SITE_URL`, light only.
- Animation/weight stack present: `gsap`, `@gsap/react`, `three`, `@react-three/fiber`, `@react-three/drei`, `matter-js`, `poly-decomp`, `tsparticles-slim`, `react-particles`, `react-confetti`, `framer-motion`. Most conflict with Spec 15.4 and 16.2. Disposition is a Phase 0 task (Spec 18.5).
- `styled-components` adds a client runtime and SSR registry; it conflicts with the CSS budget and static-first rule. Prefer Tailwind + CSS variables for all new work.
- `app/globals.css` contains `blob`, `float`, `sparkle`, `pulse-glow`, `text-shimmer`, `text-reveal` keyframes and gradient accents: remove, do not restyle.
- Header uses a sidebar (`app/components/Header/Sidebar*.jsx`); Spec wants a sticky 64px header, 5 nav items max on mobile.
- Spec text references "Section 9.2" for hero acceptance; that block is actually in the Hero card of Section 9 (Section 2 blueprint). Spec file is `Cyper_Studio_Redesign.md`, not `REDESIGN.md`.
