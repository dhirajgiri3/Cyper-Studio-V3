# Overrides for the homepage (Brief 03, founder-authorised, 8 Oct 2026)

Aesthetic only. `CLAUDE.md` and `DESIGN.md` are not edited; on `/` these rows win. Honesty, SEO, access, domain and light-mode rules are unchanged.

| Existing rule | On `/` |
|---|---|
| Zero stock or AI imagery | Stock and generic AI art stay banned. **Helyo** is an owned brand character; its supplied renders (and cutouts made from them) are brand assets. |
| Flat light mode | Light mode only. Depth allowed: warm paper with faint grain, layered surfaces, soft object and contact shadows. No gradient blobs, glow, glass or neon. |
| Max 2 motion moments per page | Max 2 per viewport. Four signature motions on the page: hero entrance, Route Line drawing, Helyo pose changes, tenant re-skin. The problem statement's word lighting is driven by the Route Line's pen, so it is part of that motion, not a fifth. |
| Operations Ledger look (mono labels, key-value rails, annotation boxes) | Only inside product frames. The page itself has no dashed tags, annotation boxes or decorative all-caps micro-labels. |
| Thesis T3 leads the page | T3 is a product-frame rule. T2 "Wear their name" leads; Helyo is the brand face. |
| Weights 400/500/600 only; display 600 | Hero and section display type at 700 to 800 with tight tracking. Body stays 400. |
| Accent `#1F4FE0` (working) | Replaced on `/` by one `--helix-blue` (D-1 below). |
| JS budget as a design driver | Kept as a sanity ceiling only. |
| Spec 9.2 hero copy and acceptance 2 ("white-label", "logistics", "platform" in h1 + subhead) | Brief 03 copy wins (newer founder instruction). "White-label logistics operating system" sits in the eyebrow and the entity line in the server HTML; the subhead has "shipping platform". The Spec should be patched the same day by the founder. |

## D-1: one HELIX blue (founder to choose at Checkpoint 1)

Measured on 8 Oct 2026 with `lib/tools/helyo-cutouts.cjs`-style sampling of `A02-refined-hero.png`:

| Source | Value | On warm paper `#F7F4EE` | White text on it |
|---|---|---|---|
| Helyo inlay, measured core (median of 1,776 most saturated pixels) | `#323BF3` | 6.26:1 | 6.87:1 |
| Helyo guide spec | `#2525FF` | 6.86:1 | 8.0:1 (approx.) |
| Brief's sample | `#2C26FA` | 6.92:1 | 7.60:1 |
| Verified wordmark fill | `#4161F4` | **4.51:1** (passes AA by 0.01) | 4.95:1 |

**Recommendation: `--helix-blue: #323BF3`** for buttons, links, focus ring, the extended Route Line and (provisionally) the wordmark on `/`. Reasons: the page's thread must continue Helyo's own inlay without a visible colour jump; it has comfortable AA contrast on warm paper where `#4161F4` has none to spare. Hover `#2A30C8` (8.12:1 on paper). If the founder keeps `#4161F4` as the brand blue, change `--helix-blue` in `app/(helix)/home.css` (one line) and ask for Helyo renders with a `#4161F4` inlay so the line still continues.

Tenant sample colours stay far from either blue: `#C2410C`, `#0F766E`, `#86198F` (white text at least 5.18:1).
