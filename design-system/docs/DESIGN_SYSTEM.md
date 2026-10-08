# HELIX / Cyper Studio Design System · v0.1.1 (DRAFT, not locked)

Direction **A (calm editorial-technical)** with **B's mono key-value rail** inside the product frame (D-1). Light mode only. Single source of truth: [`tokens.json`](../tokens/tokens.json), compiled to [`tokens.css`](../tokens/tokens.css), [`tokens.ts`](../tokens/tokens.ts) and [`contrast.md`](../tokens/contrast.md) by [`build-tokens.py`](../scripts/build-tokens.py). Components: `design-system/components/components.css` (plain CSS, `hx-` prefix). React mapping: [`react-mapping.md`](react-mapping.md). Spec changes: [`spec-patches.md`](spec-patches.md). Measurements: [`PROOF_REPORT.md`](PROOF_REPORT.md). Decisions: [`DECISIONS.md`](DECISIONS.md).

Status by section: 1 to 6, 10 to 13 are written for Round 1 scope. Sections 7 (motion system) and 8 (imagery and diagrams) are partial and complete in Round 2.

---

## 1. Principles (each with a falsifiable test)

| # | Principle | Test (pass means true) |
|---|---|---|
| P1 | **The product is the proof.** The visual is a real console frame, never illustration or stock. | The first viewport of `/` and `/helix` contains a console frame or a labelled "Screenshot pending" frame, and no illustration, stock photo or AI image |
| P2 | **Plain words first.** Headlines state facts. | `scripts/check-banned.sh` passes on the page; h1 plus subhead contain "white-label", "logistics" and "platform" and no metaphor |
| P3 | **Truth before polish.** | Every factual sentence maps to a confirmed claim ID; `check-placeholders.sh` passes; unconfirmed items are absent from the build |
| P4 | **Flat and calm.** Hierarchy by space, hairline and tone. | CSS contains no gradient other than the hatch device, no `backdrop-filter`, no dark-mode rule; `--shadow-*` appear only on `.hx-frame` |
| P5 | **Static first.** Nothing needs JavaScript to be usable. | With JavaScript disabled: h1, nav, footer, FAQ and the mobile menu all work; Lighthouse JS <= 90 KB gzip |
| P6 | **Restraint in motion.** | <= 2 motion moments per page; only `transform` and `opacity`; with reduced motion emulated, `document.getAnimations()` returns none; no infinite animation anywhere |
| P7 | **Accessible by default.** | axe: 0 violations (WCAG 2.2 AA plus best-practice rules); every contrast pair in `contrast.md` passes; a keyboard pass shows a >= 2px ring on every stop and no stop hidden behind the sticky header |
| P8 | **One source of truth.** | No hex, rgb or px literal in `components.css` other than the documented exceptions (breakpoints in media queries, the 1px visually-hidden utility); tokens are generated, not hand-edited |

---

## 2. Colour

Tokens in `tokens.json` (`TOK-COL-01..18`). Hex, RGB and role for each are shown on the Lab Foundations page. **Accent `#1F4FE0` is a working choice** (D-14, Q-12), changed only in `tokens.json`.

| Token | Hex | Role and rule |
|---|---|---|
| `--bg` | #FFFFFF | Page |
| `--surface` | #F9FAFB | Alternate sections, table header, hatch base |
| `--border` | #E4E7EC | **Decoration only** (card edges, row dividers). 1.24:1 on white: never the only cue for a control |
| `--border-strong` | #8691A3 | Form controls, secondary-button border, corner brackets, any boundary that identifies a component. 3.19:1 on `--bg`, 3.05:1 on `--surface` |
| `--ink` | #0B1220 | Headings and primary text |
| `--text` | #475467 | Body |
| `--muted` | #667085 | Captions and mono labels |
| `--accent`, `--accent-hover`, `--accent-pressed` | #1F4FE0, #1A42BD, #15399F | CTA, links, focus ring, annotation markers. Under 10% of any viewport; one primary button per viewport |
| `--accent-tint`, `--on-accent` | #EEF3FF, #FFFFFF | Badge fill (the only tinted fill); text on accent |
| `--success`, `--warning`, `--danger` and `-tint` | #067647/#ECFDF3, #B54708/#FFFAEB, #B42318/#FEF3F2 | State text, icon and fill, **only in real state UI**; always with an icon or dot and text, never colour alone |

**Contrast:** 26 pairs computed by script, **0 failing** (`contrast.md`). Text pairs need 4.5:1, control boundaries and focus rings 3:1. Representative values: ink on page 18.72, text on page 7.69, muted on surface 4.76, accent link on page 6.46, white on accent 6.46, danger text on danger-tint passes, focus ring on page 6.46.

**Rules:** no gradients (except the hatch), no tinted section backgrounds other than `--surface`, no colour used as the only signal, state colours never decorative.

---

## 3. Typography

**Faces:** Geist Sans (headings, body) and Geist Mono (labels, numbers, AWB, rates). Self-hosted variable woff2, no third-party host, SIL OFL 1.1 (`design-system/fonts/OFL-LICENSE.txt`).

**Measured:**
- `₹` (U+20B9) is present in both faces (fontTools cmap). Geist Sans has `tnum`; Geist Mono is monospaced so digits are fixed-width already.
- Full variable files 141 KB; **Latin + `₹` subset 46.7 KB** (Sans 26.3 KB, Mono 20.4 KB), under the 100 KB budget.
- Usage: weights 400, 500, 600 only; both files preloaded; `font-display: swap`; CLS from font swap measured 0 on the Lab.
- Not done yet: the real-hero bake-off against an alternative and `size-adjust` fallback metrics (Round 2).

**Scale** (fluid `clamp()` where the Spec defines it, with the fixed value at 1440). Tokens `--fs-*`, `--lh-*`, `--fw-*`, `--ls-*`; classes `hx-display`, `hx-h1..h6`, `hx-lead`, `hx-p`, `hx-small`, `hx-caption`, `hx-label`, `hx-data`.

| Level | Size | Line | Weight | Tracking | Use |
|---|---|---|---|---|---|
| display | clamp(2.5rem, 1rem + 5vw, 4.25rem) (68px) | 1.05 | 600 | -0.03em | Hero h1, once per page |
| h1 (new) | clamp(2rem, 1rem + 3.4vw, 3.25rem) (52px) | 1.08 | 600 | -0.025em | Inner page title |
| h2 | clamp(1.75rem, 1rem + 2.5vw, 2.75rem) (44px) | 1.12 | 600 | -0.02em | Section heading |
| h3 | 1.25rem (20px) | 1.3 | 600 | 0 | Card and module |
| h4 / h5 / h6 (new) | 1.125 / 1 / 0.875rem | 1.35 / 1.4 / 1.4 | 600 | 0 / 0 / 0.01em | Sub-headings |
| body-lg (new) | 1.1875rem (19px) | 1.6 | 400 | 0 | Hero lead |
| body | 1.0625rem (17px) | 1.65 | 400 | 0 | Prose, max 65ch |
| small / caption | 0.875rem (14px) | 1.5 / 1.45 | 400 | 0 | Secondary text, captions in `--muted` |
| label | 0.8125rem (13px) | 1.4 | 500 | +0.06em, uppercase, mono | Index labels, table heads. **13px, the only text allowed below 14px (D-16, decided at Gate 2)** |
| data (new) | 0.9375rem (15px) | 1.5 | 500 | 0 | Mono tabular figures |

**Rules:** numbers, AWB, rates, weights and COD amounts in mono with `font-variant-numeric: tabular-nums`, right-aligned in columns; Indian digit grouping for currency (₹1,12,450.00); no italic body; no body or caption text below 14px (mono uppercase labels at 13px are the one exception); one h1 per page; max line length 65ch; optional second headline line in `--muted` (D-7, off by default via `hx-tone-muted`).

---

## 4. Spacing and layout

Base unit 4px; scale `--s1..--s10` = 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Container `--container` 1200px; gutter 20px below 768, 24px from 768; section padding 64px below 768, 96px from 768; 12-column grid with 24px gaps; prose measure 65ch. Breakpoints (documented only): 390, 768, 1024, 1280. Header 64px. `scroll-padding-top` keeps focused and anchored elements clear of the sticky header (WCAG 2.2 2.4.11). Density modes (compact, default, airy) arrive with the live controls in Round 2.

---

## 5. Elevation and shape

Flat by default. `--shadow-1` and `--shadow-2` exist **for product frames only**. Radii `--r-sm` 6 (badges), `--r-md` 10 (buttons, fields, cards), `--r-lg` 16 (frames). Hairline `--hairline` 1px for decorative borders; `--border-strong` for controls. Focus ring: 2px `--accent`, 2px offset, on every interactive element, never removed.

---

## 6. Components (Round 1)

All components are plain HTML plus `hx-` classes, usable with JavaScript disabled, 44px minimum interactive height. Lab pages: Components and Compositions. Each row lists the states built.

| ID | Component | Variants and sizes | States built | Notes |
|---|---|---|---|---|
| CMP-BTN-01 | **Button** | primary, secondary, tertiary; md 44px, lg 52px; block; with icon | default, hover, focus-visible, active, disabled, loading | One primary per viewport. Loading is a label change ("Sending…") with `aria-busy`; no spinner (no infinite animation). Long labels wrap instead of overflowing |
| CMP-BTN-02 | Button sheen (**experiment**) | primary only | hover | See section 7 |
| CMP-LNK-01 | **Link** | inline, arrow | default, hover, focus-visible, active | Underlined; underline thickens on hover; accent colour 6.46:1 |
| CMP-FLD-01 | **Field** | text, email, select, textarea | default, hover, focus-visible, filled, disabled, error | Label above, hint, border `--border-strong`, error = icon + text + `role="alert"` + `aria-invalid`, never colour alone; `autocomplete` and `type` correct |
| CMP-CRD-01 | **Card** | default, surface, corner brackets | n/a (static) | Index label, title, capability sentence, outcome sentence; no shadow |
| CMP-BDG-01 | **Badge** | accent tint, neutral, success, warning, danger | n/a | State badges carry a dot and text |
| PRO-HDR-01 | **Header** with mobile menu | CTA filled (primary) at md, same label and destination as the hero CTA (lg) (D-17); a secondary-CTA variant is kept in the Lab for comparison only | closed, open, focus | Sticky 64px; mobile menu is native `<details>`; 1px line appears on scroll (opacity-only, `animation-timeline: scroll()` inside `@supports`; always visible where unsupported or under reduced motion); wordmark stacks on narrow screens so "by Cyper Studio" stays visible; verified without overflow at 320, 360, 390, 414px with the real "Request a demo" label |
| PRO-FTR-01 | **Footer** | n/a | default | Entity line, `info@<canonical>`, three link groups, copyright year computed at build in production; links 44px (touch) and 48px (fine pointers) |
| CMP-FRM-01 + CMP-KV-01 | **Product frame** and **key-value rail** | with or without settle | default | Frame with corner brackets, mono bar, image with explicit width and height, numbered markers, annotation list, and a mono key-value rail (D-1) |
| PRO-HERO-01 | **Hero composition** | settle on or off | default | Hatched section; h1 `hx-display`; lead; two large CTAs; trust line; frame |
| PRO-TBL-01 | **Data table** (rate card) | n/a | default | Illustrative fictional data; mono, right-aligned, tabular; first column pinned; keyboard-focusable horizontal scroll region with a visible hint on narrow screens |

Prop interfaces and the React mapping are in `react-mapping.md`. Not yet built (Round 2): Fact strip, Stepper, Callout, Diagram card, FAQ item, Form composition (PRO-FORM-01), PRO-FAQ-01, PRO-CAP-01, PRO-WL-01, PRO-LIFE-01, PRO-SHOT-01, PRO-MOB-01.

---

## 7. Motion system (partial)

**Principle:** motion confirms or orients; it never decorates. Tokens: `--ease` cubic-bezier(0.2, 0.7, 0.2, 1), `--t-fast` 150ms, `--t-base` 250ms, `--t-sheen` 600ms (experiment), `--settle-y` 8px.

| Motion | Trigger | Duration, easing | Properties | Counted as a moment | Reduced motion |
|---|---|---|---|---|---|
| Hover and focus colour change | hover, focus | 150ms, `--ease` | `background-color`, `border-color`, `color` | No | none (instant) |
| **Moment 1: hero frame settle** | load | 250ms, `--ease` | **`transform` only** (8px rise); the frame is fully visible from first paint | Yes | animation removed |
| Moment 2: diagram fade-in | load or entering view | 250ms, staggered 40ms | **`opacity` only**; final state is the default | Yes | final state shown |
| Header line on scroll | scroll position | scroll-driven, 0 to 64px | `opacity` only | **No** (state indicator; D-18 decided at Gate 2) | line always visible |
| CTA hover sheen (experiment) | hover on hover-capable pointers | 600ms, `--ease`, one-way | `transform` on `::after` | **No** (hover micro-effect; D-18 decided at Gate 2) | removed |

**Moment 1 and LCP (D-4 condition, verified):** with and without the settle, the hero image is the LCP element and LCP is unchanged. Lighthouse mobile (simulated 4G), 5 runs each: median **1508 ms with motion, 1508 ms without** (runs 1506 to 1523 and 1505 to 1512). In-browser LCP over 5 loads: 64 ms vs 56 ms unthrottled and 96 ms vs 96 ms at 4x CPU slowdown; the 8 ms unthrottled gap is inside the run-to-run spread (48 to 92 ms).

**Not allowed:** opacity or visibility start states on the h1, subhead, CTA or LCP image; infinite or looping animation; parallax; scroll hijacking; animation libraries; WebGL; gradients (the sheen is a solid translucent bar); any property other than `transform` and `opacity`. Everything is disabled under `prefers-reduced-motion`. The playable motion lab with a reduced-motion toggle is Round 2.

### CTA hover sheen: measured cost (experiment, not part of the system until approved)

| Measure | Result |
|---|---|
| Properties transitioned | `transform` on `::after` only (600ms, `--ease`), nothing else |
| JavaScript | 0 KB (script time delta 0.1 ms) |
| CSS added | 494 bytes raw (the sheen rules), plus the `--sheen` token |
| Layout work during a hover | 0 layout passes, 0 ms |
| Style recalculation during a hover | 11 recalcs, 1.4 ms in total (baseline 1) |
| Main-thread task time over the 800ms measurement window | 84.7 ms with the sheen vs 40.5 ms baseline (includes compositor activity and the page's idle tasks; desktop Mac) |
| Reduced motion | no transition created |
| Touch devices | `@media (hover: hover)` means no cost on phones |

Status (Gate 2): not counted as a motion moment. **The sheen stays off the hero until the founder has tried it with a real mouse**; it exists only as an opt-in class (`hx-btn--sheen`) shown on the Components page. It is rule-compliant (transform only, hover only, no gradient) and gives a tactile feel without WebGL.

---

## 8. Imagery and diagrams (partial)

Real console screenshots only, framed with `hx-frame` (radius 16, hairline, `--shadow-2`, no fake browser chrome, no branded URL) inside `hx-brackets`; mono bar label; numbered accent markers with a visible annotation list. Until real screenshots exist the frame holds a neutral placeholder (`design-system/assets/screenshot-pending.webp`, 7.8 KB, labelled "Screenshot pending, Sample"). Export rules: AVIF or WebP, explicit `width` and `height`, hero <= 120 KB, others <= 80 KB, `fetchpriority="high"` only on the LCP image, lazy-load below the fold, `alt` that describes function. Diagram grammar and the two diagrams: Round 2. Icons: `lucide-react`, 1.5px stroke, inline SVG; no `react-icons` for new work. No stock or AI imagery.

## 9. Signature devices

1. **Hatched paper** (`hx-section--hatched`): `repeating-linear-gradient(135deg, var(--hatch-line) 0 1px, transparent 1px 10px)` over `--surface`; at most two sections per page. The only permitted gradient.
2. **Corner brackets** (`hx-brackets`): 12px, 1.5px, `--border-strong`, top-left and bottom-right, on product frames and diagram cards.
3. **Mono index labels** (`hx-label`): "01 / Compare" style on capabilities, lifecycle and menu groups.
4. **Annotated screenshots** (`hx-marker` + `hx-annot`): numbered accent markers with a visible caption list.
5. **Mono key-value rail** (`hx-kv`, from direction B, D-1): inside the product frame under the media.
Not adopted: B's visible 12-column grid (D-6, rejected).

## 10. Accessibility

WCAG 2.2 AA. Contrast: 26 pairs, 0 failing. Focus: 2px accent ring with 2px offset on every stop; keyboard walkthrough on desktop (14 stops) and 390px (13 stops) found every stop with a ring and none hidden behind the sticky header. Targets: buttons, fields, menu toggle, menu links 44px or more; footer links 44px minimum height and width (touch). Forms: label above, `autocomplete`, `aria-invalid`, `role="alert"` errors with icon and text. Table: `caption`, `th scope`, focusable named scroll region. Motion: reduced motion removes all animation. Diagram alternatives and per-component keyboard patterns beyond these: Round 2. Automated check: axe, 22 page-viewport runs, 0 violations.

## 11. Visual do's and don'ts

Do: state a fact in the headline; use `--ink` for headings and `--text` for body; keep one primary button per viewport; use mono for data; put real screenshots in frames; keep accent rare. Don't: add gradients, glow, glass, blobs, dark mode or shadows to cards; use `--border` for form controls; animate opacity on the hero text or LCP image; use colour alone to convey state; set text below 14px (except mono labels at 13px); hardcode a hex or px value in a component. Rendered right/wrong pairs: Round 2.

## 12. Tokens and implementation

- Source: `tokens/tokens.json`. Build: `python3 -I design-system/scripts/build-tokens.py` (also copies `tokens.css` into the Lab and exits non-zero if any contrast pair fails), then `python3 -I design-system/scripts/build-lab.py`.
- Naming: `--{role}` for colour, `--fs-/--lh-/--fw-/--ls-{level}` for type, `--s1..10`, `--r-{size}`, `--shadow-{n}`, motion and layout names as in the file.
- Governance: no component uses a raw hex or pixel value. Documented exceptions: breakpoints inside media queries (custom properties cannot be used there) and the 1px visually-hidden utility. `components.css` currently contains 0 colour literals.
- `tokens.ts` exports `tokens` (typed `as const`) and `cssVar()`.
- Stack mapping, the proposed global patch (fonts, base styles, Tailwind 3 theme extension) and collision handling with the legacy variables: written at LOCK; a preview is at the end of `react-mapping.md`. **Nothing is applied to the app.**

## 13. Versioning and change control

v0.x is draft and **nothing is locked**: changes need a changelog entry and a decision-log entry. At LOCK v1.0 tokens freeze; afterwards any change requires a written change request stating the impact on pages. Promotion of components into `app/components/` and any page redesign are separate tasks, and promotion requires the parity check in `react-mapping.md`.
