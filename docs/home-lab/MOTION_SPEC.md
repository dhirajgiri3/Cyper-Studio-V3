# Motion and micro-interaction spec (Brief 01 v2.1, Step 5) — PROPOSAL, nothing locked

All values below are what the four hero files implement (`design-system/home-lab/heroes/`). Rules held: transform and opacity only; at most two moments per viewport (every hero uses one); `prefers-reduced-motion` removes all of it (`html.rm` does the same inside `compare.html`); content is complete and readable with JS off; nothing is applied to the LCP text.

A **moment** is an animation that plays without a direct user action (Spec 15.4). Hover, focus, press and responses to a click are not moments.

## Motion table

| ID | Hero | Trigger | Duration and easing | Property | Reduced-motion fallback | Moments |
|---|---|---|---|---|---|---|
| A-1 | HERO-A | Page load, then three swaps at +1.4 s, +2.6 s, +3.8 s (Kestrel, Monsoon, Bramble, back to Kestrel). Any click cancels the rest | Each swap is an instant state change (CSS variables: tenant name, colour, tint, domain, order id). A 160 ms opacity dip (0.3 to 1, `--ease`) on the window hides the cut. Plays **once**, about 4 s, then stops | opacity (window). The band and colours are instant, not animated, so no colour transition is used | No autoplay. The three buttons switch instantly | 1 |
| B-1 | HERO-B | Scroll (native scroll-driven CSS: `animation-timeline: view()`, range entry 0% to 70%) | Linear to scroll position | transform: `translateY(56px) scale(.975)` to none. Never opacity: the console is fully visible from first paint | None. Browsers without `animation-timeline` show it static (support: see `MOTION_STACK_REPORT.md`) | 1 |
| C-1 | HERO-C | Page load | 250 ms, `--ease`, 8 px rise, stagger 90 ms after a 200 ms base; four sample screens only (not text) | opacity, transform | None | 1 |
| D-1 | HERO-D | User types or picks a colour (not a moment) | 160 ms opacity dip 0.3 to 1 on the phone screen | opacity | No dip; the content still updates | 0 |

## Micro-interaction table (all hero files)

| Element | Default | Hover | Active | Focus-visible | Disabled |
|---|---|---|---|---|---|
| Primary button (52 px, filled `--cta-bg`) | accent fill, white text 4.95:1 | fill to `--accent-hover`, 150 ms `--ease`. **No scale, no shadow** | fill to `--accent-pressed`, instant | 2 px ring, 2 px offset, accent, no transition | surface fill, muted text, `not-allowed` |
| Header button (44 px, outline) | white, 1 px strong border, ink text | surface fill, ink border, 150 ms | same as hover | same ring | n/a |
| Text link with underline | ink, underline in strong grey | underline colour to ink, 150 ms | n/a | ring | n/a |
| Body link | `--link` (`#2F49BE` P1, ink P2), 3 px offset underline | none beyond underline | n/a | ring | n/a |
| Input, select, textarea | 1 px strong border, 44 px high | none | n/a | 2 px ring, 2 px offset (outline, not a box shadow) | n/a |
| Invalid field | `#B42318` border plus a 2 px tint outline, message focus moves to first invalid | n/a | n/a | ring | n/a |
| Nav link (44 px) | text colour | surface fill, ink text, 150 ms | n/a | ring | n/a |
| Segmented switch (HERO-A, D) | white pill, 44 px items | surface fill, 150 ms | n/a | ring | n/a |
| Selected state | ink fill, white text (neutral on purpose: never blue inside or beside the window) | n/a | n/a | ring | n/a |
| Product frame / cards | static | **none** | n/a | n/a | n/a |
| Footer link | text colour, 44 px target | underline | n/a | ring | placeholder links dotted-underlined |

**Hover scale and shadow lifts: none used.** Why: the baseline's button shadow and card lift (lines 65 and 363) are two of the generic tells listed in `PATTERNS.md`; they explain nothing about HELIX; and where hover was measured on references (handhold, workos atlas, adaline) it was a colour change at 150 ms with no transform or shadow. If the founder wants a hover lift, it should be one rule on one element class, with the reason written here.

## What I deliberately left still
Headline, sub, CTA, trust and entity lines (never animated; they are the LCP and the answer); the header (no blur, no shrink, no scroll effect); the product frames' chrome; all numbers and table rows; the form; the footer; section transitions (no reveal-on-scroll anywhere below the hero); the wordmark. The baseline had eight separate scroll or time-based effects (frame rise, label drop, two chip slides, fan open, scroll-lit statement, lifecycle line, 4.5 s tenant loop); this round has one per hero.

## Smooth scrolling
Not used in any hero. The recommendation is in `MOTION_STACK_REPORT.md`.
