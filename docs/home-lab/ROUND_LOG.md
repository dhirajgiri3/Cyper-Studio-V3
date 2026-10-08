# Round log (Brief 03)

One line per section. Screenshots in `docs/home-lab/checkpoint-*/`.

| Date | Section | Rounds | What changed, in one line |
|---|---|---|---|
| 8 Oct 2026 | Foundation | — | `(helix)` and `(legacy)` route groups with separate root layouts; warm-paper tokens; local Geist; Helyo cutout pipeline with terminal detection; Route Line component; header; footer (Helyo on the X of a quiet wordmark). |
| 8 Oct 2026 | Hero | 9 | Stacked card + afterthought Helyo → one scene: tenant-branded console top right, Helyo below it presenting the CTAs, Route Line leaving the inlay terminal; fixed cutout halo and box edge, Helyo over tenant data, route offset from the entrance transform, 1366x768 fold, narrow console layout. |
| 8 Oct 2026 | Hero, depth layout (founder pick) | 7 | Three planes: console back, Helyo's cast shadow on it, Helyo in front with the terminal computed to sit below the console; tenant header bar replaces the stripe; leg-column floor matte removes the pale band at the feet; five rows kept at 1366x768; tracking to -0.04em; selection, caret and scrollbar themed. |
| 8 Oct 2026 | Hero, depth layout repair | 2 | `home.css` was overwritten at 23:15 by an older copy (stale editor save), so the cast-shadow plane rendered as a second Helyo. Rebuilt the depth CSS: Helyo now sits inside the console surface and is placed by its terminal (container units); cast clipped to the console; tenant header bar restored; caption above the console below 1280 px; four rows on mobile; the hero no longer sweeps into a lane that does not exist yet (no hairpin). |
| 8 Oct 2026 | Hero + footer, mobile | 1 | Below 1024px Helyo stands in flow under the console (crown over the frame's bottom edge, no tenant data covered, no phantom space, no cast); route runs continuously to the footer until lanes exist; footer padding halved on small screens; footer Helyo 37% wide across I and X with the route landing on the L. Desktop unchanged. |
| 8 Oct 2026 | Route Line, footer stop | 1 | Line ended 9 px right and low of the final ring: anchors are measured without transforms and the stop was centred with `translate(-50%, -50%)`. Stop now centred with margins; the measurer keeps an anchor's own translate (still ignores animated ancestors); waypoints layered above the stroke. End and start within 0.6 px at 1440, 1024, 768, 400. |
