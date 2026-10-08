# Spec patches for `Cyper_Studio_Redesign.md` (v0.1.1)

## Status after the Gate 2 reply (8 Oct 2026)

| Patch | Status |
|---|---|
| A1 (15.5: reject `liquid-metal-button`; `image-stream-hero` rejected by default) | **Applied** |
| A2 (`--border-strong` in 14.1, 14.4, Appendix B, plus the contrast sentence) | **Applied** (also changed the Appendix B `.brackets` rule to `var(--border-strong)` so it matches the new rule) |
| A3 (15.4 definition of a motion moment, transform-only moment 1, LCP condition) | **Applied**; the hover and state-indicator allowance is worded to cover both the header line and the hover sheen as "not moments" (D-18), and says the sheen is not used on the hero unless you approve it |
| B1 (13px mono label) | **Applied** at 13px (D-16), including Appendix B's `.mono-label` CSS (`.8125rem`) and the "no text below 14px" rule with the mono-label exception |
| B2 (extra type levels) | **Applied as proposed** (h1, h4 to h6, body large, caption, data). You did not answer B2 separately; it follows B1 and is trivial to revert |
| B3 (header CTA) | **Applied in the form you decided, not the form I proposed.** The header CTA stays **filled (primary), md**, with the **same label and destination** as the hero CTA (lg). To keep the Spec consistent I reworded the "one primary" rule to "one primary **action** per viewport; a header CTA and an in-page CTA with the same label and destination count as one" (12.2 rules, 14.4 button row, 8.3, CTA map). That wording is my interpretation; tell me if you want it phrased differently |
| B4, B5, B6 | **Not applied. Listed for you below** |
| Spec version | 1.0 to **1.1**; change-log row added in Appendix H |

### B4 to B6 for your decision (not applied)

- **B4, token table additions:** add `--accent-pressed #15399F`, `--success-tint #ECFDF3`, `--warning-tint #FFFAEB`, `--danger-tint #FEF3F2`, `--on-accent #FFFFFF` to 14.1 and Appendix B. They are in `tokens.json` and all pairs pass. Also, Appendix B's Tailwind v4 mapping block does not list `--border-strong` and the repository uses Tailwind 3, so that block is not usable as written.
- **B5, header border on scroll:** Section 9's header card says "1px bottom border on scroll". It is implemented with no JavaScript (an opacity-only scroll-driven animation in `@supports`, always visible where unsupported or under reduced motion). No text change is strictly needed; this is only so the behaviour is documented. After A3 it is classed as a state indicator, not a moment.
- **B6, file name:** the Spec and tooling refer to `REDESIGN.md`, but the file is `Cyper_Studio_Redesign.md`. Either rename it (and update `CLAUDE.md`, `PRODUCT.md` and `.impeccable/` references) or edit the Spec's own references.

### Small inconsistencies I noticed but did not touch

- Lines 353, 382 and 1531 say "one primary CTA" / "one primary CTA style per viewport". They do not contradict the new "one primary action" rule, but the wording could be aligned.
- Appendix B's `.brackets` also appears in the Spec text of 14.8 as "small 12px corner marks"; no change needed.

---

The original patch text follows for reference. A1 to A3 and B1 to B3 above are already applied to the Spec; do not apply them again.


Per the Gate 1 reply, **the Spec is not edited by the design work**. These are exact diffs for you to apply. Line numbers refer to the file as it stands on 8 Oct 2026. Two groups: **A. Approved at Gate 1** (D-2, D-3, D-4, D-5) and **B. New in Round 1, awaiting your decision** (inconsistencies and gaps found while building).

Apply A with `git apply` after saving each hunk, or by hand; each hunk quotes the existing text exactly.

---

## A. Approved at Gate 1 (APPLIED)

### A1. Section 15.5, component verdicts (D-2 and D-3)

Lines 1148 to 1150 area. Change `image-stream-hero` from ADAPT (optional) to REJECT by default, and add `liquid-metal-button`.

```diff
--- a/Cyper_Studio_Redesign.md
+++ b/Cyper_Studio_Redesign.md
@@ section 15.5 table @@
-| `image-stream-hero` | **ADAPT (optional)** | Below the fold only, for a "Your brand, your console" section using real console screenshots under labelled sample tenants. Static image on mobile; limit card count; never the LCP element; no hotlinked or stock images. |
+| `image-stream-hero` | **REJECT (default)** | Looping infinite animation, needs many real images that do not exist, mostly off-screen. Use a static grid of labelled sample-tenant screens instead. Reopen only when real tenant screens exist and the founder asks; then below the fold only, static on mobile, never the LCP element, no hotlinked or stock images. |
 | `scroll-morph-hero` | **REJECT** | Hijacks wheel and touch scroll (`preventDefault`), updates React state every animation frame, no reduced-motion handling, content hidden at load. |
 | `hero-section-3` (fly-in) | **REJECT** | Reads `window.innerWidth` during render (breaks server rendering), spends 200vh on a decorative plane, image without dimensions, off-domain theme. |
+| `liquid-metal-button` | **REJECT** | Mounts a WebGL shader canvas per button (`@paper-design/shaders`, unmeasured KB), uses `transition: all` with an overshooting spring easing (`cubic-bezier(0.34, 1.56, 0.64, 1)`), injects a `<style>` tag at runtime, and its metallic material contradicts the flat system (14.6). The primary CTA must not be the heaviest element on the page. A transform-only hover sheen is the approved lightweight alternative (see A3). |
```

### A2. Appendix B and Sections 14.1 and 14.4, the `--border-strong` token (D-5)

```diff
@@ Section 14.1 token table, line 1028 @@
-| Surface | `--bg #FFFFFF`, `--surface #F9FAFB`, `--border #E4E7EC` |
+| Surface | `--bg #FFFFFF`, `--surface #F9FAFB`, `--border #E4E7EC` (decorative only), `--border-strong #8691A3` (controls) |
```

```diff
@@ Appendix B tokens.css, around line 1746 @@
   --border: #E4E7EC;
+  --border-strong: #8691A3; /* form controls and any boundary needed to identify a component; 3:1 against --bg and --surface */
   --ink: #0B1220;
```

```diff
@@ Section 14.4 components table, line 1076 @@
-| **Form field** | 44px height, label above, inline error with icon, correct `type` and `autocomplete`. |
+| **Form field** | 44px height, label above, border `--border-strong` (3:1), inline error with icon, correct `type` and `autocomplete`. |
```

Add one sentence under 14.1:

```diff
@@ after the contrast sentence in Section 14.1 @@
+`--border` is for decoration only (card edges, row dividers). It is 1.24:1 on white and must never be the only visual cue that identifies a control. Controls, and anything whose boundary conveys meaning, use `--border-strong` (WCAG 1.4.11, 3:1). Corner brackets also use `--border-strong` so they stay visible.
```

Verified values (script-computed, `contrast.md`): `--border-strong` 3.19:1 on `--bg`, 3.05:1 on `--surface`.

### A3. Section 15.4, definition of a motion moment (D-4)

```diff
@@ Section 15.4, lines 1137 to 1138 @@
-- A scroll reveal is a one-time 8px rise and fade, disabled under `prefers-reduced-motion`.
-- At most **two motion moments** on the whole page (for example the hero screenshot fade-in and one diagram reveal).
+- A **motion moment** is any animation that plays once without a direct user action (load or scroll into view). Hover, focus, press and an instant tab or accordion state change are not moments.
+- At most **two motion moments** on the whole page. Default pair: (1) the hero product frame settles in; (2) one diagram fades in once.
+- **Moment 1 uses `transform` only** (an 8px rise over 250ms on the product frame). Never apply `opacity`, `visibility` or a hidden start state to the LCP element, the h1, the subhead or the primary CTA. The frame is fully visible from the first paint. Verify with the in-browser LCP and Lighthouse that LCP is unchanged with and without the motion.
+- Moment 2 is `opacity` only (nodes and edges fade in once, 250ms, staggered 40ms). Its final state is the default, so no-JS and reduced-motion show the finished diagram.
+- Below-the-fold scroll reveals (one-time 8px rise and fade) count toward the two moments; prefer none.
+- Every motion is disabled under `prefers-reduced-motion`.
```

Add an allowance for the CTA hover sheen if it is approved after measurement (see Decision Sheet D-18):

```diff
+- Hover-only micro-effects on controls (not moments) may use `transform` or `opacity` on a pseudo-element for at most 600ms, only on hover-capable pointers, and are disabled under reduced motion. Gradients remain banned: effects use solid fills.
```

---

## B. New in Round 1 (B1 to B3 APPLIED per Gate 2; B4 to B6 NOT applied)

### B1. Section 14.2 contradicts itself on minimum text size (D-16)

Line 1058 sets the mono label at `0.75rem` (12px); line 1060 says "no text below 14px". The tokens ship the Spec's 12px as the provisional value. Recommendation: mono uppercase labels are the only exception, at **13px (0.8125rem)** rather than 12px.

```diff
@@ line 1058 @@
-| Mono label | 0.75rem | 1.4 | 500 | uppercase, tracking +0.06em |
+| Mono label | 0.8125rem | 1.4 | 500 | uppercase, tracking +0.06em. The only text allowed below 14px. |
@@ line 1060 @@
-... no italic body text; no text below 14px.
+... no italic body text; no body or caption text below 14px (mono uppercase labels are the one exception, 13px).
```

### B2. Section 14.2 scale is incomplete for the brief's required levels

The Spec defines hero h1, h2, h3, body, small and mono label. Round 1 adds `h1` (page title), `h4`, `h5`, `h6`, `body-lg`, `caption` and `data` (mono tabular figures). Values are in `tokens.json` (`TOK-TYP-02`, `-05` to `-08`, `-11`, `-13`). Recommendation: add them to the 14.2 table.

### B3. Header CTA versus "one primary per viewport" (D-17) [APPLIED, but as the founder decided: header CTA stays filled; see status table. The diff below is my original recommendation and was NOT applied]

Section 8.3 (line 358) and the CTA map (line 908) make the header button **primary**, while line 917 and Section 14.4 say at most one primary-style button in any viewport. With a hero primary visible, the first viewport has two. Options: (a) keep as written and accept two; (b) header CTA is **secondary** style (one class change); (c) header CTA becomes primary only after the hero leaves the viewport (needs JavaScript). Recommendation: (b). Both renderings are in the Lab: `compositions/hero.html` (primary) and `compositions/header-secondary-cta.html` (secondary).

```diff
@@ line 908 @@
-| Header | Request a demo | `#request-demo` or `/contact` | Primary (small) | Always available |
+| Header | Request a demo | `#request-demo` or `/contact` | Secondary (bordered); primary is reserved for in-page CTAs | Always available |
@@ line 358 @@
-... `Changelog` and `Blog` (only when live), primary button `Request a demo`.
+... `Changelog` and `Blog` (only when live), button `Request a demo` (secondary style).
```

### B4. Section 14.1 token table additions

State tints and a pressed accent are needed for the Round 1 components: `--accent-pressed #15399F`, `--success-tint #ECFDF3`, `--warning-tint #FFFAEB`, `--danger-tint #FEF3F2`, `--on-accent #FFFFFF`. All pairs pass (see `contrast.md`).

### B5. Header border on scroll

Section 9, header card says "1px bottom border on scroll". Implemented without JavaScript as an opacity-only scroll-driven animation (`animation-timeline: scroll()` inside `@supports`); where unsupported the 1px line is simply always visible. No change to the Spec text is needed; noted so the behaviour is not a surprise.

### B6. Spec file name

Several Spec lines and the repository tooling refer to `REDESIGN.md`; the file is `Cyper_Studio_Redesign.md`. Either rename the file (and update `CLAUDE.md`, `PRODUCT.md`, `.impeccable/` references) or edit the Spec's own references.
