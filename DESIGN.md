---
name: Cyper Studio
description: Agency marketing site that scrolls from bright daylight into a glowing, blue-to-violet night.
colors:
  primary: "#3b82f6"
  primary-dark: "#1d4ed8"
  primary-light: "#60a5fa"
  electric-violet: "#a855f7"
  hot-pink: "#ec4899"
  gradient-azure: "#3a86ff"
  gradient-iris: "#8b5cf6"
  daylight: "#f9fafb"
  paper-white: "#ffffff"
  charcoal: "#1f2126"
  night: "#000000"
  ink: "#07070c"
  text-primary: "#171717"
  text-secondary: "#525252"
  mist: "#bbbbbb"
  hairline-dark: "#333333"
  danger: "#ef4444"
typography:
  display:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "5.5rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  display-mega:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "8rem"
    fontWeight: 900
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "3.75rem"
    fontWeight: 600
    lineHeight: 1.25
  title:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  body:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    letterSpacing: "0.05em"
rounded:
  lg: "8px"
  xl: "12px"
  2xl: "16px"
  card: "20px"
  3xl: "24px"
  full: "9999px"
spacing:
  gutter-sm: "16px"
  gutter-lg: "80px"
  stack: "24px"
  stack-lg: "32px"
  split: "64px"
  section: "64px"
  section-xl: "112px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.full}"
    padding: "12px 32px"
  button-primary-medium:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.full}"
    padding: "12px 24px"
  header-pill:
    backgroundColor: "rgba(255, 255, 255, 0.8)"
    textColor: "{colors.charcoal}"
    rounded: "{rounded.full}"
    padding: "8px 32px"
    width: "94vw"
  nav-link-hover:
    textColor: "{colors.primary}"
  project-card:
    backgroundColor: "rgba(255, 255, 255, 0.12)"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.card}"
  tag-chip:
    backgroundColor: "rgba(0, 0, 0, 0.15)"
    textColor: "rgba(255, 255, 255, 0.95)"
    rounded: "{rounded.full}"
    padding: "4px 10px"
  category-tile:
    textColor: "{colors.paper-white}"
    rounded: "{rounded.xl}"
    padding: "16px"
  input-field:
    backgroundColor: "rgba(55, 65, 81, 0.3)"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.xl}"
    padding: "16px 20px"
  glass-panel:
    backgroundColor: "rgba(255, 255, 255, 0.05)"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.2xl}"
    padding: "32px"
  media-frame-dark:
    backgroundColor: "{colors.charcoal}"
    rounded: "{rounded.3xl}"
    padding: "12px"
---

# Design System: Cyper Studio

## Overview

**Creative North Star: "Daylight to Deep Space"** *(inferred from code; see Open Questions)*

The home page is a single scroll that descends. It opens on near-white daylight (hero, story), drops into a blue-tinged charcoal (approach, dream), and ends in pure black (our work, contact, footer). `Home.jsx` tweens the `<main>` background between each section's `data-bg` with GSAP ScrollTrigger (0.6s, `power3.out`) instead of cutting between them. The light half is clean and editorial. The dark half is atmospheric: radial blue and violet glows, grid and noise overlays, drifting blobs, tsParticles, and three.js models in the hero, dream section and footer.

The site is maximal in motion and restrained in palette. One blue (`primary`) carries the identity, almost always as a blue-to-violet gradient that sometimes runs on to pink. Everything else is neutral. Interaction is tactile: the main CTA is magnetic, ripples when pressed, and gives off particles under the cursor. Text reveals letter by letter, with each character going from blurred to sharp.

**Key Characteristics:**
- Light-to-dark scroll narrative with a tweened page background.
- Single blue primary, used as a gradient that runs blue → violet (→ pink).
- Pill-shaped CTAs and a floating pill header; glass cards with large radii.
- Depth from blur, translucent white fills and colored glows instead of drop shadows.
- 3D scenes (react-three-fiber), physics labels (matter-js), particles and an image trail as signature moments.
- System sans for all text; heavy display weights (600–900) set tight.

## Colors

A cool, near-monochrome palette with one electric blue accent that turns violet whenever it becomes a gradient.

### Primary
- **Signal Blue** (primary): The brand voice. Nav-link hover and underline, eyebrow labels on dark ("Our Vision", "For Dreamers and Doers"), the active hamburger, focus rings, radial glows (`primary/5`). Equal to Tailwind blue-500.
- **Deep Signal Blue** (primary-dark) and **Sky Signal Blue** (primary-light): Only appear as the left and right stops of the primary button's horizontal gradient.

### Secondary
- **Electric Violet** (electric-violet): The far end of the accent gradient. Approach section dividers (`from-blue-500 to-purple-500`, 48×4px), the footer tagline, contact submit (`from-blue-600 to-purple-600`), icon strokes in `Icons.jsx`, particle and confetti colors.

### Tertiary
- **Hot Pink** (hot-pink): A rare third stop. It shows up in particle bursts, confetti, the ImageTrail/label palettes and pink blobs on project cards. It never fills a surface.
- **Declared brand gradient** (gradient-azure → gradient-iris → hot-pink): Defined in `globals.css` as `.title-gradient` (90deg, animated `background-pan` 8s) and `.text-shimmer` (45deg, 6s). **No component uses either class**, so this three-stop gradient does not currently render. The gradient on screen is primary → electric-violet. See Drift.

### Neutral
- **Daylight** (daylight): Hero background and the starting color of the page tween. It is also the `--light` token.
- **Paper White** (paper-white): Story section, header pill (at 80%), off-canvas sidebar, and text on all dark surfaces.
- **Charcoal** (charcoal): The `--dark` token. Approach and Dream section backgrounds and nav-link text on the light header.
- **Night** (night): Our-Work title, contact and footer backgrounds.
- **Ink** (ink): A barely violet black used under the project grid and in its fades (`#07070c`).
- **Text Primary / Text Secondary** (text-primary, text-secondary): Body copy on light surfaces. Hero paragraph uses secondary.
- **Mist** (mist): The `--para` token. Long-form body copy on charcoal and black.
- **Dark Hairline** (hairline-dark): 1px borders around media frames and dividers on charcoal (hover lifts to `#444`).
- **Danger** (danger): Form validation only (`border-red-500/70`, `text-red-400`).

### Named Rules
**The Descent Rule.** Section backgrounds go one way: daylight → paper-white → charcoal → night/ink. Never put a light section after a dark one, and change the page background with the tween, not with hard cuts.

**The Gradient-Accent Rule.** Blue appears flat only in small spots (eyebrows, links, focus). Wherever accent covers an area (buttons, dividers, glows, gradient text), it is a gradient that runs from blue toward violet.

## Typography

**Display Font:** System UI sans (`ui-sans-serif, system-ui, sans-serif`, Tailwind's default stack)
**Body Font:** Same system stack
**Label/Mono Font:** None in use. Geist Mono is loaded but never applied.

**Character:** Plain, native sans set heavy and tight for headlines, and light with relaxed leading for prose. The personality comes from weight contrast and motion, not from the typeface. Geist, Geist Mono, ClashDisplay, Biotif and SF Pro are all present but none reaches the rendered page (see Drift).

### Hierarchy
- **Display** (600, 3.5rem → 4rem → 5.5rem at sm/md, 1.2): Hero headline only. Two words are set in italic `neutral-800` for emphasis ("Innovation", "Passion").
- **Display Mega** (900, 8rem, ~1.25, tight): The "Our Work" title. It also uses `text-wrap: balance`.
- **Headline** (600–800, 2rem → 3.75rem, 1.25): Section titles ("We Envision", "Our Story", Dream h2 at 700). On dark, white or a white → white/80 gradient. On light, a charcoal → black gradient.
- **Title** (700, 1.125rem → 1.875rem, tight): Project card names and contact panel headings.
- **Body** (300–400, 0.875rem–1rem, 1.625): Paragraphs. Use weight 300 on dark in the Approach section and 400 elsewhere. Line length is capped by `max-w-md`/`max-w-xl`/`max-w-2xl` containers, about 28–42rem.
- **Label** (500, 0.875rem, 0.05–0.1em, often uppercase): Eyebrows ("01 / VISION", "OUR VISION"), footer column heads. Tag chips use 11–12px, 500, 0.025em.

### Named Rules
**The Weight-Contrast Rule.** Headlines are 600–900 with tight tracking. Body text never goes above 400, and on dark surfaces it may drop to 300.

## Layout

- **Containers:** The hero uses `max-width: 1440px`. Dream, footer and contact use 1280px (`max-w-7xl`). Approach uses Tailwind `container`. The project grid allows up to 2000px. Everything is centered.
- **Gutters:** 16px on mobile, 32px at sm, 80px at md in the hero. Other sections are 16–32px.
- **Splits:** Content sits in two columns (text | media/3D) from md (768px) with a 48–64px gap and stacks on mobile. Approach alternates `flex-row` / `flex-row-reverse` and leaves 112px between rows.
- **Project grid:** A bento layout. 1 column on mobile, 2 at the undefined `xs:` breakpoint, and 12 columns at lg. The first card spans 8 and the second spans 4. Wide cards span 6. Row height is at least 320px → 360px → 50vh. Gap is 20 → 24 → 32px.
- **Chrome:** The fixed header pill sits 24px from the top at 94vw wide, with z-index 1000. The off-canvas sidebar slides in from the left at 35vw (60vw at ≤1024px, 85vw at ≤767px) over a 50% black overlay.
- **Breakpoints:** Tailwind defaults (640 / 768 / 1024 / 1280 / 1536). styled-components also hard-code 380, 767/768, 1000 and 1024.
- **Rhythm:** Vertical section padding is mostly 64px (`py-16`), with 96px on Dream (md). Content stacks use 24–32px gaps.

## Elevation & Depth

This is a hybrid system. Light surfaces are nearly flat. The only shadow there is a 3% hover lift on the header. Dark surfaces get their depth from layered translucency: backdrop blur (8–120px), white fills at 5–12%, white hairlines at 10–25%, large blurred radial glows in blue (`rgba(14,78,232,.15)`) and violet (`rgba(142,53,240,.15)`), slowly drifting blobs (30s/35s), and grid and noise textures at 1.5–3% opacity. Real 3D (three.js `Environment preset="city"`) provides the hero and footer focal points.

### Shadow Vocabulary
- **Header lift** (`0 8px 30px rgb(0 0 0 / 0.03)`): Header pill on hover only.
- **Primary glow** (`0 0 20px rgba(var(--primary-rgb), 0.35)`): Tailwind `shadow-glow` token.
- **Avatar float** (`0 8px 32px rgba(0,0,0,.15), inset 0 2px 4px rgba(255,255,255,.1)`): Team avatars in the Dream section. On hover they grow to `0 12px 40px` plus a white 20px halo.
- **Chip halo** (`0 0 15px rgba(255,255,255,.15)`): Category tiles on hover.
- **Particle glow** (`0 0 10px currentColor`): 3px button particles.

### Named Rules
**The Glow-Not-Shadow Rule.** On charcoal and black, express depth with blur, translucent white and colored radial glow. Use black drop shadows only on floating objects (avatars), and keep them faint.

## Shapes

- **Pills for action.** Buttons, the header, the hamburger toggle, tag chips, eyebrow badges and floating contact labels are all `9999px`.
- **Soft, large containers.** Project cards are 20px. Media frames, the contact shell and the footer panel are 24px (the footer panel steps 12 → 16 → 24px across breakpoints). Inputs and category tiles are 12px. Footer icon buttons are 8px.
- **Nested frames.** Approach videos sit inside a 24px frame with 12px padding, and the inner video has a 16px radius, so the inner radius is smaller than the outer.
- **Circles** hold portrait media (Story video, team avatars).
- **Morphing silhouettes.** The sidebar animates its `border-radius` from 70% (blob, closed) to 0 (open). `BlobEffect` shifts radius to `1.2rem 0.8rem 1rem 1.2rem` on hover.
- **Corner brackets.** Project placeholders have 48px L-shaped white/30 brackets in opposite corners.

### Named Rules
**The Pill-for-Action Rule.** Anything that triggers navigation or submission is a full pill. Containers stay in the 12–24px range.

## Components

### Buttons (PrimaryButton)
A tactile, physical button that responds to the cursor.
- **Shape:** Full pill (9999px).
- **Primary (the only variant in use):** Horizontal gradient primary-dark → primary → primary-light, white text, weight 500, `tracking-wide` (0.025em). Large is 12px × 32px at 1rem. Medium is 12px × 24px at 0.875rem.
- **Hover / Press:** `MagneticWrapper` pulls the button toward the cursor (strength 0.2 within a 100px radius, GSAP `power2.out` 0.5s, release `elastic.out(1, 0.3)`). Call sites add `hover:scale-105`. On press it scales to 0.98 (`[0.43,0.13,0.23,0.96]`, 0.1s) and a white radial ripple expands to 2.5× over 600ms. With `withParticles`, 3px dots in white, blue, purple, pink and indigo burst 20–70px from the cursor and fade over about 0.5s with `plus-lighter` blending. Particles are capped at 8.
- **Reduced motion:** The button weakens its effects rather than removing them (magnet 0.1, fewer and smaller particles). CSS hides `.particle-wrapper`.
- **Other variants** (default, secondary, light, success, danger, outline, ghost) exist in `buttonStyles.jsx`, but no component uses them.
- **Contact submit** is a separate button: 12px radius, 20px × 24px padding, 1.125rem, blue-600 → purple-600 gradient panning over 8s, hover `scale 1.02, y -2`.

### Chips
- **Tag chip:** On project cards. 11–12px, weight 500, white/95 text on black/15 with a white/20 border and `backdrop-blur-md`. On card hover the fill moves to black/25 and the border to white/30.
- **Category tile:** In the "Our Work" grid, which is 2 columns, or 3 from md. Each tile is a 12px-radius block with its own `from-*-500 to-*-700` gradient (blue, emerald, amber, indigo, violet, rose). It holds a 28px white/10 icon disc, uses magnetic strength 0.12, and on hover adds a white sheen, a white/15 border and the chip halo. It dispatches a `category-selected` event.
- **Floating labels (contact):** Pills tinted with the `.label-*` classes (fill at 10% alpha, border at 30%, pastel text). They drift with `floating-slow/medium/fast` (25/18/12s) and are dropped into a matter-js gravity well by `GravityLabels`.

### Cards / Containers
- **Project card:** 20px radius. Fill is a white/12 → white/8 → transparent gradient with `backdrop-blur-xl` and a white/15 border (white/25 on hover). It carries a faint blue and purple tint, a black/85 scrim at the bottom with the content anchored there, and a 1.2s `[0.25,0.4,0.25,1]` entrance. Cards without images get animated blob art and a huge 900-weight gradient name.
- **Glass panel:** Dream CTA and footer links. White/5 fill (the footer uses `backdrop-brightness-125` instead), white/10 border (white/20 on hover in the footer), 16–24px radius, 24–64px padding.
- **Media frame (dark):** 12px padding, 24px radius, `#333` border that turns `#444` on hover. The inner video scales to 1.01 on group hover.

### Inputs / Fields
- **Style:** Contact form only. Gray-700/30 fill with `backdrop-blur-sm`, a 1px neutral-700/50 border, 12px radius, 16px × 20px padding, white text.
- **Floating label:** The label rests centered in neutral-400. Once the field has a value, the label moves above the border in blue-400 at 90% scale, on a black pill.
- **Focus:** Border blue-500/70 plus a 1px blue-500/10 ring. On group hover the border is blue-500/30.
- **Error:** Border red-500/70, with a red-400 12px message and a pulsing red dot. It animates in from y −10.
- `.form-input` / `.form-select` in `globals.css` define a different input style that nothing uses.

### Navigation
- **Header:** White/80 pill with `backdrop-blur-lg`, a 36–42px logo that scales to 1.05 on hover, and three links in charcoal at 1rem/500 with 64px gaps. On hover the text turns primary and a 2px primary underline grows from the left (300ms). There is a medium PrimaryButton CTA. Links are hidden below md.
- **Hamburger:** 40px pill toggle with three 3px bars at 70% / 100% / 42% width. All three fill to 100% and turn primary on hover. It morphs to an X with an overshoot ease `cubic-bezier(0.68,-0.55,0.265,1.55)`, 500ms.
- **Sidebar:** White panel that GSAP slides in (`cubic-bezier(0.16,1,0.3,1)`, 0.5s) while its radius morphs from 70% to 0. It closes on Escape. Menu items are **rolling text links**: each is 48px tall, and on hover the label slides up 48px to reveal a subtitle (1s, same expo-out curve). Section heads are mist-colored.

### Signature moments
- **Blur-in letters:** Each character starts at `opacity 0, blur(4–10px)` and comes into focus via GSAP with a stagger of 0.02–0.04s (Story, Dream).
- **Image trail:** In the hero, the cursor leaves a trail of 200px images (max 5 concurrent).
- **3D models:** Item9 (hero), Item11 (dream), Item12 (footer, scaled 1.1–1.25).
- **Motion vocabulary:** Default UI transitions are 300ms `cubic-bezier(0.4,0,0.2,1)` (`ease-smooth`). Panels use expo-out `cubic-bezier(0.16,1,0.3,1)`. Entrances run 0.6–1.2s (`power2–4.out`, `[0.215,0.61,0.355,1]`). Ambient loops run 6–35s.

## Do's and Don'ts

### Do:
- **Do** keep the page descending from light to dark, and set each section's `data-bg` so the GSAP background tween stays continuous.
- **Do** express accent as a primary → electric-violet gradient. Keep flat primary for links, eyebrows and focus states.
- **Do** use PrimaryButton (primary variant, large on dark sections) for every CTA, with `withParticles` and the magnetic wrapper.
- **Do** build dark surfaces from white at 5–15% fill, white at 10–25% hairlines, backdrop blur and a blue or violet radial glow.
- **Do** use pills for actions and chips, and 12–24px radii for containers.
- **Do** set headlines at 600–900 with tight tracking, and body at 300–400 with 1.625 line height.
- **Do** reduce, rather than delete, motion under `prefers-reduced-motion`, as PrimaryButton does.

### Don't:
- **Don't** put a light section after a dark one, or cut the page background without the tween.
- **Don't** introduce new grey families. Pick from the neutral tokens (charcoal, mist, hairline-dark) rather than adding more raw `#666` / `#999` / slate / gray.
- **Don't** use heavy black drop shadows on dark surfaces. Use glow and translucency.
- **Don't** add a second flat accent hue. Pink and violet appear only inside gradients, particles and confetti.
- **Don't** rely on `font-clash`, `font-playfair`, `xs:`, `z-5`, `text-10xl`+, `animate-aurora` or `bg-mesh-pattern`. They are not defined, so they do nothing.

## Drift (documented, not endorsed)

1. **Fonts never applied.** `layout.js` sets `--font-geist-sans` and `--font-geist-mono` on `<body>`, but neither Tailwind `fontFamily` nor any CSS consumes them. ClashDisplay, Biotif and SF Pro sit in `public/Assets/Fonts` with no `@font-face`. `font-clash` and `font-playfair` (Hero) are undefined classes. The result is that everything renders in the system sans.
2. **The brand gradient is declared but unused.** `.title-gradient` and `.text-shimmer` (#3a86ff → #8b5cf6 → #ec4899) have no consumers. Components use Tailwind `blue-500 → purple-500` (#3b82f6 → #a855f7) instead. `--accent-gradient` (#3b82f6 → #7dd3fc, sky) is a third, different gradient. It is used only through `bg-[var(--accent-gradient)]`, which Tailwind emits as `background-color` and is probably invalid.
3. **Nested `:root` block.** Keyframes and utility classes are written inside `:root { }`. `@keyframes` nested in a style rule is invalid, so `sparkle`, `pulse-glow`, `background-pan`, `text-shimmer`, `text-reveal` and `border-pulse` may not exist at runtime. PostCSS has no nesting plugin.
4. **Duplicates and conflicts.** `float` is defined twice: in CSS as a 15s wander and in Tailwind as a 6s bob (−10px), so `animate-float` is ambiguous. `.hardware-accelerated`, `blob-slow`, `blob-slow-reverse` and `pulse-slow` are each declared twice.
5. **Undefined tokens.** `var(--sm)` and `var(--nm)` (SidebarTop, SidebarBottom, TextLink) don't exist, so those font sizes fall back to inherit. `/grid.svg` (Dream) is not in `public/`.
6. **Opacity on var()-backed colors.** Tailwind colors are mapped to plain `var(--primary)` with no `<alpha-value>`, so modifiers such as `border-primary/10`, `from-primary/30` and `ring-primary/50` may not apply as intended.
7. **Raw values that bypass tokens.** Greys `#333/#444/#666/#999/#bbbbbb` (Approach, Dream), `#07070c` and `#080808` blacks, slate-* in the Header, gray-* in Story and inputs, Tailwind blue/purple/emerald/amber/rose scales in chips and glows, and the GravityLabels rgba palette. The semantic tokens (`--success`, `--danger`, …) and the `--space-*` scale have no consumers.
8. **Type scale override.** `fontSize` is extended with bare `var()`s, which drops Tailwind's paired line-heights for xs–5xl and changes `3xl` to 2rem and `4xl` to 2.5rem.
9. **Class conflicts.** Contact labels combine `.label-support` (blue text) with `text-purple-300`. `PrimaryButton` uses `z-5`, and `ContactUs` uses `from-white/8`, a non-default step.
10. **Unused primitives.** The unused button variants, `.form-input`/`.form-select`, `.glass-morphism`, `buttonStyles.glassMorphism/gradientBorder`, and the `ContactCard` component (commented out in Home).

## Open Questions

- **North Star name and mood words** were inferred from code, not confirmed with the owner. "Daylight to Deep Space" is a proposal.
- **Intended typefaces:** Should ClashDisplay (display) plus Geist or Biotif (body) be wired up, or is the system sans now intended? The Hero's `font-clash`/`font-playfair` suggests a Clash + Playfair-italic pairing was planned.
- **Canonical gradient:** Is it the declared #3a86ff → #8b5cf6 → #ec4899, or the shipped #3b82f6 → #a855f7? This file treats the shipped one as normative.
- **"Dark theme":** The site has no light/dark mode switch. The dark look is the second half of a fixed scroll narrative. Is that intended as the identity, or should future pages be fully dark?
- **Runtime checks not done:** Without a browser pass, drift items 3 and 6 are inferred from the source, not observed.
