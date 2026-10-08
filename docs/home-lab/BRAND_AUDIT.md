# Brand audit (Brief 01 v2.1, Section 2) — PROPOSAL, nothing locked

Visual version with before/after, overlays, size tests and swatches: `design-system/home-lab/brand/index.html`. Supplied files are untouched in `assets-inbox/brand/` (copied from `~/Documents/cyper-logo/` and `~/Desktop/Helix-transparent.png`; the PNG exports of the Cyper mark were not used, as instructed). Measurement code: `design-system/home-lab/tools/wordmark-audit*.mjs`, `trace-wordmark.mjs`, `fit-windows.mjs`, `build-wordmark-svg.mjs`, `palette.mjs`; numbers in `design-system/home-lab/brand/*.json`.

## 1. Facts verified
| Item | Result |
|---|---|
| Wordmark file | PNG 2500 x 1000, 8-bit palette, alpha, 40,452 bytes |
| Brand blue | Every one of the 1,028,126 fully opaque pixels is exactly `rgb(65, 97, 244)` = **`#4161F4`** (12,900 anti-aliased edge pixels). The founder's sample is confirmed |
| Contrast, computed (WCAG 2.x) | `#4161F4` on white **4.95:1**; white text on `#4161F4` **4.95:1**; on `#F3F5F8` 4.53; on `#E9EDF2` 4.21; on ink `#121820` 3.60; on navy 3.45. So: **AA for normal text on white and on mist, with 0.45 and 0.03 of margin; not AAA (7); large text and graphics only on mist-2, ink and navy.** Hover `#3350C8` is 6.73:1 and is the colour to use for links on mist |
| Cyper SVGs | 232 x 232 grid exactly as described: half-disc centre (116,116) r 76, 72 px square at (120,40), right triangle (120,120)-(192,192)-(120,192). Content occupies 40 to 192, so a tight `viewBox="40 40 152 152"` is used (the files are not edited) |

## 2. Wordmark audit (pixel measurement; the brief's expectations versus the numbers)
Sub-pixel edges from the alpha channel (coverage-corrected), cap line and baseline:

| Letter | top y | bottom y | height |
|---|---|---|---|
| H | 125.0 | 801.5 | 676.5 |
| E | 125.0 | 802.0 | 677.0 |
| **L** | **118.5** | 801.5 | 683.0 |
| I | 123.5 | 801.5 | 678.0 |
| X | 124.0 | 801.5 | 677.5 |

- **L's top edge is 6.5 px higher than H and E** (0.96% of cap height), not "about 4 px". I is 1.5 px high and X 1.0 px high. The baseline is level to within 0.5 px.
- **E to L is not the tight gap.** Minimum facing gaps: H-E 46.6, **E-L 47.1**, **L-I 57.7**, I-X 50.3 px. Optical gap (mean facing distance capped at +30 px): 59.7, 61.2, **80.4**, 67.6. The loosest pair is **L-I**, because the L's open right side leaves a large void over its foot. If the E-L pair looks tight to the eye, that is not what the pixels show; I would like to look at it together.
- Stems are uniform (H 177 and 176, L 177, I 178 px). H and I vertical edges are true to 0.3 px.
- Rounded corners are not one radius: E outer corners r ≈ 237, **L outer corner r ≈ 212**, E counter corners r ≈ 65, L inner corner r ≈ 48, X outer shoulders r ≈ 176 (one stem width), X notch shoulders r ≈ 62; X diagonals at 46.8 to 47.2 degrees outside and 48.0 to 48.2 inside. The top and bottom of the X are not exactly mirror images (up to 1.7 px).

**Licensed typeface, custom drawing or unknown? Unknown.** I will not guess a name. Evidence only: uniform stems and consistent device (rounded outer-left corner on E and L) point to design intent, but the different corner radii and the 6.5 px offset on a flat-topped L are not what a font file produces, so it looks hand drawn or traced. **Question for the founder: who drew it, and does an original vector (AI, Figma, SVG) or a font name exist?** An original vector would replace everything below.

## 3. Vector proposal
Constructed from lines and circular arcs only (no auto-traced Béziers), from the measured primitives above.

| File | What | Size |
|---|---|---|
| `brand/helix-wordmark.faithful.svg` (R0) | Same alignment and spacing as the supplied artwork, regularised to symmetry in X. Fit against the PNG: **IoU 0.99596**; pixels off by more than half a pixel: L 139, X 1,882, H 509, E 459 (of about 1.03 million). X is the least exact, because the original is not symmetric | 1,024 bytes |
| `brand/helix-wordmark.proposal.svg` (R1) | R0 plus a common cap line (125.0) and baseline (801.5) for L, I, X, and all four minimum gaps set equal to the H-E gap (46.6): L-I -11.1 px; I and X shift left, total width -17.5 px (2380.9 to 2363.4) | 1,028 bytes |

**R1 changes optical alignment, so it needs the founder's agreement.** Until then, all four heroes use R0. Before and after, side by side, with cap-line overlay: `brand/index.html` section 1.

## 4. The invented logomark is removed
The "two offset curves" mark (baseline lines 469 to 473 and 861) appears in none of the four heroes; the real wordmark is used, with the Cyper mark as the "by" credit. 

**Does HELIX need a compact mark?** Yes, for favicon, app icon and social avatar: at 16 px the wordmark's cap height would be about 4.6 px. The nav does not need one (a 20 px cap height wordmark is about 70 px wide). Three concepts, exploration only (`brand/helix-mark.*.svg`, sizes 16 to 96 px in `brand/index.html`):
- **C1, H**: the wordmark's H unchanged in a rounded tile. No invention. **Recommended.**
- **C2, X**: the crossing is the most distinctive letter but a lone X reads as "X".
- **C3, H with rounded left**: the E/L corner device applied to the H. A design decision the founder should make.

## 5. Two brands, one page
HELIX carries the colour; Cyper Studio stays neutral (ink or white), never blue, never larger than the wordmark. Proposed rules: Cyper mark ink height at most 70% of the wordmark cap height in a shared lockup; minimum 12 px in the nav and 16 px elsewhere; the white version on blue and navy.

| Background | Mark | Contrast |
|---|---|---|
| White `#FFFFFF` | dark | 17.84:1 |
| Mist `#F3F5F8` | dark | 16.33:1 |
| Navy `#101C2E` | white | 17.11:1 |
| HELIX blue `#4161F4` | white | 4.95:1 (dark on blue is 4.24:1: do not) |

Placement: nav "HELIX  by  [mark] Cyper Studio" (name hidden under 760 px, mark kept; hidden entirely under 400 px where the eyebrow line already states the company); footer "Built by [mark 24 px] Cyper Studio"; JSON-LD and the entity line carry the same facts. All three appear in the heroes.

## 6. Palette routes (full tables in `brand/index.html` section 4)
- **P1, blue is the brand (recommended):** `#4161F4` for the wordmark, the one filled CTA per viewport, text links (use `#2F49BE`/`#3350C8` on mist), focus ring; ink for text; the header button is an outline so it never competes. Retired from the baseline: amber highlighter, navy band, gradients.
- **P2, ink leads, blue signs:** ink CTA (17:1 with white), blue on the wordmark and one diagram highlight only. Calmer, but the tenant swap reads with less contrast against the page.
- **Rule, enforced and measured:** HELIX blue never appears inside a tenant window. Colours inside every tenant window state were enumerated by computed style; the nearest to `#4161F4` is the neutral grey `#667085` at OKLab distance 0.188 (no blue found in 8 to 13 distinct colours across three states, HERO-A, C, D).
- **Tenant colours changed:** baseline Tidewell `#4338CA` was the closest of 14 candidates to the blue (ΔE 0.108). New sample set: Kestrel `#C2410C` (0.359), Monsoon `#0F766E` (0.232), **Bramble `#86198F`** (0.224, replaces Tidewell). White text on all three is at least 5.18:1.
- Sample tenant domains use the reserved `.example` suffix, so none can be a real company's domain.

## 7. Voice from the wordmark
The wordmark is the only heavy thing; the page stays Geist 500 to 600. One oversized moment (HERO-B's closing wordmark across the footer) and nowhere else: not body, h2s, buttons, nav, product-frame numbers or the form. Display-face proposals (not recommended this round): Anybody (width 125, weight 800) 12,980 bytes; Archivo (width 125, weight 800) 14,564; Syne 800 13,776; Unbounded 800 21,708; all OFL per the google/fonts METADATA, bytes by HTTP HEAD on 2026-10-08 for the Google-served Latin instance. None matches the wordmark; a lookalike next to the real one can read as an error.

## Questions for the founder
1. Who drew the HELIX wordmark, and is there an original vector or font name?
2. Approve R1 (cap line, baseline, equal gaps), or keep R0?
3. Compact mark: C1, C3, or your own?
4. Palette: P1 or P2? (P1 also closes Q-12, the brand colour.)
5. Is "E-L looks tight" a perception you want me to look at with you, given L-I is the loosest pair by the numbers?
