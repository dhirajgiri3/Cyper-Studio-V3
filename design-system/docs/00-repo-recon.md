# 00 · Repository reconnaissance (v0.0, 8 Oct 2026)

Purpose: confirm the design system is implementable in this stack. Scope: read-only recon. Nothing in the application was changed.

## Capabilities in this session (for Section 1.3 of the brief)

- **Have:** shell, Node 22, Python 3.9, curl, installed Google Chrome, web search and fetch.
- **Built for this task (scratchpad, outside the repo):** Playwright-core driving real Chrome for screenshots, computed styles, motion inventory, network cost, no-JS and reduced-motion runs, scroll probe and axe-core; Lighthouse (mobile preset); fontTools for glyph and subset checks.
- **Missing:** no interactive browser MCP (it disconnected earlier), no real Android device, no screen reader, no WebPageTest. Frame-by-frame video of motion was not captured; motion was inventoried from the live DOM and screenshots at scroll steps instead.
- **Degradation:** motion "feel" is described from measured timing and screenshots, not from watching playback. Lighthouse runs are single-run, simulated 4G, on a developer Mac, so treat scores as comparative, not absolute.

## Stack (observed in files)

| Item | Finding |
|---|---|
| Framework | Next.js 15.1.7, App Router, React 19.0.0 |
| Language | **JavaScript** (`.js`/`.jsx`); both `jsconfig.json` and `tsconfig.json` exist (`allowJs`, `strict: false`); no TS source |
| Styling | Tailwind 3.4.17 via PostCSS; `app/globals.css` (485 lines, 46 custom properties); **styled-components 6** in 13 files with an SSR registry (`app/lib/registry.jsx`) |
| Fonts | `app/layout.js` loads Geist and Geist Mono through `next/font/google` (self-hosted at build). `public/Assets/Fonts` also contains Clash Display, **Fontspring DEMO biotif**, and **SF Pro Display** files (see licence flags) |
| Routes | `/` (`app/page.js`), `/about`, `/projects` |
| Source size | about 10,500 lines across `app/` |
| Component dirs | `3D`, `Animations`, `Buttons`, `Common`, `Constant`, `Header`, `Home` (Approach, Dream, Hero, Our-Work, Story), `Icons` |
| Motion/weight libraries imported | framer-motion (17 files), gsap (11), @react-three (5), tsparticles (2), react-particles (2), matter-js (1), styled-components (13), lucide-react (3), react-icons (2). `react-confetti` is a dependency but unused in `app/` |
| Build tooling | `npm run dev` (turbopack), `build`, `start`, `lint`. No test, typecheck, CI, or `.github` folder |
| Images / video | `public/Assets`: 16 MB images, 11 MB video, 1.1 MB fonts |
| Next image config | `images.domains` = one external host; `formats: ["image/webp"]` |

## Implications for the design system

1. **Tailwind 3, not 4.** The Spec's Appendix B Tailwind-v4 `@theme` mapping does not apply. The mapping will be a Tailwind 3 `theme.extend` snippet reading CSS variables (`proposed-global-patch.md`, after Gate 1).
2. **JavaScript.** Prop interfaces are written as JSDoc plus a `.d.ts`-style table, not TypeScript types. `tokens.ts` is still produced (the brief asks for it) and can be consumed from JS via JSDoc.
3. **Token collision.** Existing variables (`--primary`, `--accent-1..3`, `--neutral-*`, `--text-*`, `--space-*`, `--dark`, `--light`) overlap the Spec names (`--accent`, `--text`, `--ink`). The new tokens must be namespaced or the legacy set removed in the migration task. Recommendation: introduce the new set under the Spec names and delete the legacy set when the old sections are removed; do not alias.
4. **styled-components** is incompatible with the CSS budget and static-first rule. New components are plain CSS (variables) with Tailwind utilities; no new styled-components.
5. **Global config changes** (fonts, Tailwind theme, `lang="en-IN"`, `color-scheme`) are written as proposed patches only. None applied.
6. **Font files already in `public/`:** the DEMO biotif files are demo-licensed and SF Pro Display is Apple's system font; neither has a licence permitting commercial self-hosting. Clash Display is licensed by Fontshare (free commercial) but is not part of the locked type system. None should ship; flagged for the Decision Sheet.
7. **Lab placement.** Next.js serves only `app/` and `public/`. A static Lab at the repository-root folder `design-system/` is therefore **not part of any production build by construction**; no env flag or config change is needed, and no existing file is touched. Serve it with `python3 -m http.server 4173 --directory design-system`.

## Build status

`npm run build` was not run at recon time (kept off while Lighthouse runs were measuring other sites). Result to be recorded in `PROOF_REPORT.md` when run; the recon above does not depend on it.

## Spec vs brief naming

The brief refers to `REDESIGN.md`; the file in the repository root is `Cyper_Studio_Redesign.md`. Treated as the same document.
