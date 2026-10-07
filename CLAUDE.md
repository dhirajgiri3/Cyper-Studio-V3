# Cyper Studio / HELIX website

Marketing site for **HELIX**, a white-label, multi-tenant logistics operating system built by **Cyper Studio** (product engineering company, India, founded 2024). The site is being rebuilt from an agency portfolio into a HELIX-centred product site. It is **not** the HELIX product UI.

**Source of truth:** `Cyper_Studio_Redesign.md` (the "Spec", 2,100 lines). Do not read it whole; use `/spec <section>` or `grep -n '^## ' Cyper_Studio_Redesign.md`. When code and Spec disagree, say so and fix one the same day.

Context files: `PRODUCT.md` (product truth), `DESIGN.md` (target design system), `.impeccable/site-context.md` (Site Gate, surface modes, command policy, known repo gaps).

## Stack and commands

Next.js 15.1 App Router, React 19, **JavaScript** (`.js`/`.jsx`), Tailwind 3.4, styled-components 6, source in root `app/` (no `src/`, no `content/` yet). There are no tests and no typecheck script.

```bash
npm run dev          # next dev --turbopack, http://localhost:3000
npm run build        # production build (run before measuring anything)
npm run start        # serve the production build
npm run lint         # next lint
bash scripts/check-all.sh        # static release gates (placeholders, banned terms, domains, founding year)
bash scripts/check-nojs.sh http://localhost:3000/   # five-question test without JS
bash scripts/check-meta-length.sh http://localhost:3000/ [more urls]
```

Legacy agency-era files fail the gates today; that is the migration backlog, not a broken setup. Do not weaken a gate to make it pass.

## Non-negotiable rules (from the Spec)

1. **Truth.** Never invent features, metrics, customers, logos, quotes, certifications, uptime, pricing, team size, funding. Every factual sentence maps to a claim ID (Spec 4.4). `[BRIEF-ONLY]` claims (C-06..C-14) are **absent from the build** until the founder confirms; do not hide them with CSS. Unknown values are written `{{CONFIRM: what is needed}}`, which blocks the build.
2. **One canonical domain.** Default `cyper.studio` (Q-01 pending); `info@` on the same domain. Hostname, email, founding year come only from one `siteConfig`/`SITE_URL`. **No subdomains of either domain anywhere** (a previous submission was rejected for this), no `localhost`, `vercel.app`, or non-canonical emails. Founding year is **2024**.
3. **No-JS render.** h1, subhead, trust line, primary CTA, entity line, and `info@` are in the server HTML. Content never depends on hydration or animation classes.
4. **Light mode only**, flat, tokens only (Spec Appendix B). No gradients, glow, glass, blobs, particles, canvas/WebGL, confetti, parallax, or scroll hijacking. `/overdrive` is disabled.
5. **Motion and weight.** Max two motion moments per page, `transform`/`opacity` only, reduced-motion safe, no animation library above the fold. Budgets: LCP <= 2.5s, INP <= 200ms, CLS <= 0.1, Lighthouse mobile >= 90, JS <= 90KB gz, CSS <= 30KB gz. Measure before and after adding any dependency.
6. **Voice.** Banned list in `scripts/banned-terms.txt` (Spec 13.3). Headlines state facts; no metaphors. Capability -> Operator outcome. Product is written **HELIX**. Define NDR/COD/3PL once per page. Glossary in Spec 5.4.
7. **Imagery.** Real HELIX console screenshots only. No stock, AI, or placeholder imagery shipped; no client names or logos without written permission.

## Workflow

- **New or changed UI/copy:** start with `/impeccable-guide <target>` (classifies the surface, picks the shortest pipeline, ends with the Site Gate). Common single commands: `/shape`, `/critique`, `/clarify`, `/quieter`, `/distill`, `/harden`, `/polish`, `/audit`.
- **Before editing a section,** find its blueprint card in the Spec (Sections 9-11) and its claim IDs. Follow the card's copy, layout, acceptance criteria.
- **After editing,** run `bash scripts/check-all.sh` and say which Site Gate checks you actually ran. Never report a gate as passed without running it; say what was not verified (Lighthouse, real Android device, no-JS curl).
- **Copy lives in content modules** (`content/*.js`), not in components. Components take props.
- **Prefer deleting to restyling** legacy agency code. Report any dependency that becomes unused.
- Smallest change that passes the acceptance criteria; this is a small-team project.

## Repository map

```text
Cyper_Studio_Redesign.md   Spec (authority)         PRODUCT.md / DESIGN.md   derived context
app/                       Next.js App Router        scripts/                 gates (lib.sh, check-*.sh, hooks/)
  layout.js globals.css page.js                      .impeccable/             design skills (22 commands + engine)
  about/ projects/                                   .claude/                 settings, rules, commands, agents, skills
  components/{3D,Animations,Buttons,Common,Constant,Header,Home,Icons}
  lib/ (registry.jsx, utils.jsx, validation.jsx)
public/Assets/{Fonts,Image,Video}
```

## Known gaps (Spec vs repository)

JS not TS; root `app/` not `src/`; Tailwind 3 not v4; `app/layout.js` metadata is agency-era and hardcodes `cyperstudio.in`, `lang="en"`, dark `themeColor`; heavy animation stack (`gsap`, `three`, `@react-three/*`, `matter-js`, `tsparticles`, `react-confetti`, `framer-motion`); styled-components runtime; sidebar header where the Spec wants a sticky 64px header; `helix.cyperstudio.in` and `productbazar.cyperstudio.in` subdomain links, Unsplash avatars, and a Formspree endpoint in current code; no `robots`, `sitemap`, `llms.txt`, JSON-LD, or privacy/terms pages. Full list: `.impeccable/site-context.md`.

## Open founder decisions that block work

Q-01 canonical domain, Q-03 legal entity and city, Q-05 which capabilities are live, Q-13 real console screenshots, Q-12 brand colour. Full list: Spec Section 24. Do not guess them; write `{{CONFIRM: ...}}` and move on.

## Do not touch without being asked

`.env*`, `node_modules/`, `.next/`, `package-lock.json` (except via npm), `.impeccable/impeccable/` (upstream engine; replace wholesale, never hand-edit), `.impeccable/_archive/` (Helix product-UI material, kept for reference).
