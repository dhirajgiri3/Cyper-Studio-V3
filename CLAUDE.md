# Cyper Studio — website

Marketing and portfolio site for Cyper Studio (https://cyperstudio.in). Not the HELIX product; none of HELIX's rules (paise, tenants, `helix-kernel`) apply here.

## Stack

- Next.js 15 App Router, React 19, **plain JS/JSX** (`tsconfig.json` exists but `strict: false`; don't convert files to TS).
- Styling: Tailwind v3 (`tailwind.config.mjs`, tokens in `app/globals.css`) **and** styled-components (`app/lib/registry.jsx`). Match whichever the file already uses.
- Motion/3D: GSAP + `@gsap/react`, framer-motion, three.js via `@react-three/fiber` + `drei`, matter-js, tsparticles.
- Path alias `@/*` → repo root (`jsconfig.json`).

## Commands

- `npm install` then `npm run dev` (Turbopack, http://localhost:3000)
- `npm run build` — the only automated check. ESLint is not configured (`npm run lint` will prompt to set it up).

## Layout

- `app/page.js` → `app/components/Home/Home.jsx` → `Home/Sections/{Hero,Story,Approach,Our-Work,Dream}`
- `app/components/{Header,Common/Footer,Common/ContactCard,Buttons,Animations,3D}` — shared pieces
- `app/about`, `app/projects` — placeholder pages
- `public/Assets/{Fonts,Image,Video}` — static assets

## Design work

UI/UX work goes through the Impeccable skills in `.claude/skills/` (`/impeccable` for the menu, or `/critique`, `/polish`, `/typeset`, ...). See `.impeccable/README.md`. Design context: `PRODUCT.md` (product truth, from `/init`) and `DESIGN.md` + `.impeccable/design.json` (visual system, from `/document`).

Rules for every design change:

- **Surface mode:** Persuade (marketing pages) and Experience (showcase moments). Expressive motion, gradients and 3D are part of the identity; that's not a license to stack more of them.
- **Tokens first:** colors, spacing, radii, type sizes come from `app/globals.css` custom properties via Tailwind. No new raw hex in components.
- **Motion:** respect `prefers-reduced-motion` for every animation, canvas and physics loop; pause offscreen; clean up on unmount. Never block LCP with heavy 3D or video.
- **Cursor effects need touch fallbacks** (magnetic buttons, ImageTrail, Gravity) — check 375px with no horizontal overflow.
- **Content is fact:** don't invent clients, metrics, testimonials or project details; ask before rewriting project copy.
- **Refine ≠ redesign:** refinement keeps the existing look, copy and section order. Ask before taste changes.

## Known issues

- No intended font renders: Geist (`app/layout.js`) is never applied, `font-clash`/`font-playfair` are undefined, and `public/Assets/Fonts/` has no `@font-face`.
- Keyframes and utilities are nested inside `:root {}` in `app/globals.css`, so several animations may not exist at runtime.
- Full list: DESIGN.md → Drift.
- `app/projects/layout.jsx` metadata still points at `yourwebsite.com`.
