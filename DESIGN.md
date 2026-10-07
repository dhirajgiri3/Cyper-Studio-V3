---
name: Cyper Studio / HELIX Website
description: Calm, precise, product-first light-mode system for a logistics-software marketing site.
colors:
  bg: "#FFFFFF"
  surface: "#F9FAFB"
  border: "#E4E7EC"
  ink: "#0B1220"
  text: "#475467"
  muted: "#667085"
  accent: "#1F4FE0"
  accent-hover: "#1A42BD"
  accent-tint: "#EEF3FF"
  success: "#067647"
  warning: "#B54708"
  danger: "#B42318"
typography:
  display:
    fontFamily: "Geist, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "clamp(2.5rem, 1rem + 5vw, 4.25rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 1rem + 2.5vw, 2.75rem)"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Geist Mono, ui-monospace, SF Mono, Menlo, Consolas, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.06em"
rounded:
  sm: "6px"
  md: "10px"
  lg: "16px"
spacing:
  s1: "4px"
  s2: "8px"
  s3: "12px"
  s4: "16px"
  s5: "24px"
  s6: "32px"
  s7: "48px"
  s8: "64px"
  s9: "96px"
  s10: "128px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.bg}"
    rounded: "{rounded.md}"
    height: "44px"
    padding: "0 20px"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
  button-secondary:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    height: "44px"
    padding: "0 20px"
  card:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    padding: "24px"
  badge:
    backgroundColor: "{colors.accent-tint}"
    textColor: "{colors.accent}"
    rounded: "{rounded.sm}"
    typography: "{typography.label}"
  field:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    height: "44px"
    padding: "0 12px"
---

# Design System: Cyper Studio / HELIX Website

> **Status: target system (Spec Section 14 + Appendix B), seeded from `Cyper_Studio_Redesign.md`.** The incumbent code in `app/` is agency-era (dark themeColor, blobs/sparkles/shimmer keyframes, GSAP, three.js, matter-js, tsparticles) and is treated as evidence and anti-reference, not authority. When code and this file disagree, the code is migrating toward this file. Accent `#1F4FE0` is a working choice (D-14, Q-12). Contrast ratios are estimates until each pair is validated against WCAG 2.2 AA and recorded in the repo.

## Overview

**Creative North Star: "The Operations Ledger"**

The site should look like operational software a logistics business would trust with money movement. Precise, calm, slightly technical, confident. Whitespace and a strict type scale do the work that illustration usually does. The product UI (real HELIX operator-console screenshots) is the main visual; diagrams are second; everything else is flat text and bordered cards.

Creativity lives inside the system: no one-off colours, spacing, or radii. Personality comes from four signature devices, the type setting, and the quality of the product visuals, nothing else.

**Key Characteristics:**
- Light mode only (`color-scheme: light`); no dark theme, no theme toggle (D-03).
- Flat: 1px borders and tonal surface for hierarchy; shadow only on product frames.
- Mono for data and labels (AWB, rates, weights, COD amounts, index labels); sans for prose.
- One accent, used rarely, for CTAs, links, focus, and diagram highlights.
- Text is the LCP candidate; screenshots never block it.

## Colors

A near-white canvas, a cool grey surface, deep ink for headings, slate for body, one saturated cobalt accent.

### Primary
- **Cobalt Signal** (#1F4FE0): CTAs, links, focus ring, diagram highlights, annotation markers. Hover #1A42BD. Tint #EEF3FF for badges. Working choice pending real brand colour.

### Neutral
- **Paper White** (#FFFFFF): page background.
- **Ledger Grey** (#F9FAFB): `--surface`, alternating sections and the hatched device.
- **Hairline** (#E4E7EC): all borders and dividers.
- **Deep Ink** (#0B1220): headings and primary text.
- **Slate Body** (#475467): body copy.
- **Muted Slate** (#667085): captions and mono labels. Verify >= 4.5:1 on `--surface`; if it fails, darken it, do not enlarge it.

### State (only inside real state UI)
- **Success** #067647, **Warning** #B54708, **Danger** #B42318. Never decorative.

### Named Rules
**The One Voice Rule.** Accent covers well under 10% of any viewport. Its rarity is what makes the CTA findable. One primary-style button per viewport.
**The No-Gradient Rule.** No gradient text, no gradient backgrounds, no coloured section fills beyond `--surface` and `--accent-tint`. The only permitted background pattern is the hatched device (14.8).
**The Token Rule.** A raw hex, rgb, or px value in a component fails review. Everything reads from CSS variables.

## Typography

**Display + Body:** Geist Sans (variable, self-hosted woff2, weights 400/500/600 only).
**Label/Mono:** Geist Mono (numbers, labels, data).
**Fallback:** Inter if `₹12,450.00` (U+20B9) falls back to a system font in the shipped subset. Test before locking (D-05). Latin subset plus U+20B9, one preloaded file, `font-display: swap`, size-adjusted fallback, no third-party font host.

**Character:** Geist is neutral and technical; Geist Mono gives numerals an instrument-panel precision that supports the ledger feel.

### Hierarchy
- **Display / h1** (600, clamp(2.5rem, 1rem + 5vw, 4.25rem), 1.05, -0.03em): hero only, once per page.
- **Headline / h2** (600, clamp(1.75rem, 1rem + 2.5vw, 2.75rem), 1.12, -0.02em): section headings; question-shaped where natural.
- **Title / h3** (600, 1.25rem, 1.3): cards, modules.
- **Body** (400, 1.0625rem, 1.65, max 65ch): prose.
- **Small** (400, 0.875rem, 1.5): captions. **No text below 14px.**
- **Label** (500, 0.75rem, 1.4, +0.06em, uppercase, mono): index labels, fact-strip headers, captions.

### Named Rules
**The Mono-For-Data Rule.** AWB numbers, rates, weights, COD amounts, step indices are mono and tabular; numeric columns right-aligned.
**The No-Italic Rule.** No italic body text.

## Layout

12-column grid, container max 1200px, side padding 20px mobile / 24px desktop, breakpoints 390 / 768 / 1024 / 1280. Section padding 96px vertical desktop, 64px mobile, constant rhythm with no one-off gaps. Prose max 65ch. Spacing scale (4px base): 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Mobile is a single column with hero copy before the screenshot; diagrams stack vertically; no horizontal scroll at 390px. A sticky mobile CTA bar appears only after the hero leaves the viewport and hides at the form.

## Elevation & Depth

Flat. Hierarchy comes from spacing, 1px borders and `--surface` tone. Two shadows exist, **for product frames only**:
- **shadow-1** (`0 1px 2px rgba(16,24,40,.06)`): subtle frame lift.
- **shadow-2** (`0 8px 24px -8px rgba(16,24,40,.12)`): hero and console-tour screenshots.

### Named Rules
**The Flat-By-Default Rule.** Cards, buttons, fields, badges carry no shadow. The existing `pulse-glow`, glass, blob, and glow effects are removed, not restyled.

## Shapes

Radius 6 (badges, small), 10 (cards, buttons, fields), 16 (product frames). 1px `--border` everywhere; 1.5px strokes in diagrams. Product frames have no fake browser chrome and no branded URL. Signature silhouette: **corner brackets** (12px, 1.5px) on product frames and diagram cards.

## Components

### Buttons
- **Primary:** solid `--accent`, white text, 44px min height, radius 10. One per viewport.
- **Secondary:** white, 1px border, ink text. **Tertiary:** text link with arrow.
- **Focus:** 2px `--accent` ring, 2px offset, on every interactive element, never removed.

### Cards
1px border, radius 10, 24px padding, no shadow, optional mono index label ("01").

### Fields
44px height, persistent label above, inline error with icon, correct `type` and `autocomplete`, 500-char message cap. Honeypot + time-to-submit; failure state shows the direct email.

### FAQ item
Native `<details>`; works without JS.

### Data table
Mono numerals, right-aligned, 1px row dividers, no zebra.

### Icons
Lucide (already a dependency), 1.5px stroke, 20/24px, inline SVG. No icon fonts, no `react-icons` for new work.

### Signature devices (Spec 14.8; use sparingly, add new ones to the Spec first)
1. **Hatched paper:** at most two sections; `repeating-linear-gradient(135deg, rgba(11,18,32,.04) 0 1px, transparent 1px 10px)` over `--surface`.
2. **Corner brackets** on product frames and diagram cards.
3. **Index labels:** mono "01 / Compare".
4. **Annotated screenshots:** numbered accent markers with mono captions.

## Do's and Don'ts

### Do:
- **Do** render h1, subhead, trust line, primary CTA, entity line and `info@` in server HTML.
- **Do** write headlines that state a fact, outcome or claim; use Capability -> Outcome for features.
- **Do** use real console screenshots with explicit `width`/`height`, AVIF/WebP, hero <= 120KB, others <= 80KB, lazy below the fold.
- **Do** limit motion to two moments per page: 150ms hover/focus, 250ms reveal, `--ease: cubic-bezier(.2,.7,.2,1)`, `transform` + `opacity` only, one-time 8px rise-and-fade, disabled under `prefers-reduced-motion`, applied after hydration.
- **Do** build diagrams as inline SVG using only `--ink`, `--border`, `--accent`, mono labels, with `<title>`/`<desc>` and a visible caption.
- **Do** label sample tenants as fictional ("Sample tenant A").

### Don't:
- **Don't** ship dark mode, gradients, glassmorphism, glows, blobs, sparkles, shimmer, confetti, particles, or canvas/WebGL on this site (D-03, 15.4).
- **Don't** use parallax, scroll-jacking, `preventDefault` on wheel/touch, auto-advancing carousels, or autoplay video above the fold.
- **Don't** use stock photos, AI imagery, people/office/truck imagery, fake dashboards, placeholder logos, avatars, or metrics.
- **Don't** hardcode hostnames, emails, or the founding year; read from `siteConfig`.
- **Don't** hide an unconfirmed claim with CSS; omit it from the build.
- **Don't** use an animation library above the fold, or add a dependency without recording its measured KB.
- **Don't** reject-list: `scroll-morph-hero` and `hero-section-3` (21st.dev) are rejected (Spec 15.5).
