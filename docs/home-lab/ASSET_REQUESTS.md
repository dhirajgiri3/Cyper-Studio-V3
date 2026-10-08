# Helyo asset requests (for the founder's generators)

The page runs on rough cutouts made by `lib/tools/helyo-cutouts.cjs` from the supplied renders. Each slot below swaps to a final file by changing one name in `app/(helix)/_components/Helyo.jsx` (`poses`) and re-running the manifest step, which also re-detects the Route Line terminal.

**Spec for every final file:** transparent WebP (alpha), no baked background, soft contact shadow under the feet kept in the alpha (warm grey, not black), light from the upper left to match the page, 3/4 camera as in A02, Route Line in neutral indigo on Helyo's anatomical left inner pillar with the small flush terminal visible (the page extends the line from it). Deliver at about 2x display size. Do not crop the feet.

| Slot (file name) | Pose | Section | Display width (desktop / 390) | Deliver at | Rough source today |
|---|---|---|---|---|---|
| `helyo-hero-welcome` | Welcome, open hand to viewer's left | Hero | 420 px / 310 px | 1040 px wide | A02 refined hero (good) |
| `helyo-problem-concern` | Concern, hands near chest, compassionate | Problem statement | 240 / 200 | 560 | A03 "Concern" cell (418 px, low res) |
| `helyo-journey-inspect` | Inspect a parcel on the floor | How it works, Quote | 320 / 240 | 720 | Gesture sheet "Inspect" (512 px) |
| `helyo-journey-parcel` | Careful hold, parcel in both hands | How it works, Book | 320 / 240 | 720 | Gesture sheet "Careful handoff" (512 px) |
| `helyo-journey-guide` | Guide, pointing ahead | How it works, Run | 320 / 240 | 720 | Gesture sheet "Guide" (512 px) |
| `helyo-reassure` | Reassure, one open hand | How it works, Settle; demo form | 300 / 220 | 680 | A03 "Reassurance" cell (low res) |
| `helyo-present` | Present, both hands open | Built by Cyper Studio | 260 / 200 | 600 | Gesture sheet "Present" (512 px) |
| `helyo-celebrate` | Quiet celebration (indigo line, no green) | Footer, standing on the wordmark | 260 / 180 | 600 | A03 "Quiet celebration" cell (low res) |
| `helyo-delivered` | Relief | Spare (not placed) | — | 560 | A03 "Relief" cell |

## Missing (no source render exists)
1. **`helyo-wide-route`**: wide shot, Helyo standing at the left of frame with its Route Line continuing out of the terminal and along the floor to the right edge, 2400 x 900, transparent. Would let the page's line visibly leave the body on the floor in the hero.
2. **Hero pose with the terminal facing the camera more**: in A02 the terminal sits on the inner pillar, partly hidden at small sizes.
3. **Social image `helyo-social`**: 1200 x 630 opaque on warm paper `#F7F4EE`, Helyo welcome at right third, empty left two thirds for the wordmark and H1 (the OG image is composed in code until then).
4. Any pose with the parcel held out to the viewer (handoff frame 3) as a single high-resolution render.

## Known flaws in the rough cutouts
- Low resolution for every sheet crop (330 to 400 px tall); they soften above about 260 px display width.
- Faint light fringe along the soles and a small light patch beside the right foot in some poses (floor reflection read as body).
- Baked floor shadow is faded toward the crop edges by the tool, so it is shorter than a real contact shadow.
