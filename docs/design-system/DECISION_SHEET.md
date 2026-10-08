# DECISION SHEET (rolling) · v0.0 · Gate 1 · 8 Oct 2026

Open choices that need you. Each has options and a recommendation. Nothing here is decided until you reply; the log of decisions is `DECISIONS.md`.

## A. Needed to leave Gate 1

| # | Decision | Options | Recommendation |
|---|---|---|---|
| **D-1** | **Which direction?** | **A** Calm editorial-technical (cobalt, 10px radii, 17px body, hatch and brackets prominent) · **B** Precise instrument (ink CTA, teal highlight, 2/4/6 radii, 15px body, visible grid) · **C** Warm and approachable (vermilion, pill CTAs, 18px body, warm paper) · a blend · your own idea | **A as the base**, with two optional imports: the tone-shift second headline line (Lab toggle) and B's mono key-value rail inside the product frame. Reasons: closest to the locked system and Spec; most evidence (the only fast, calm page in the research, getenergy, is built the same way); 17px body is safest on a mid-range Android; fewest new devices; strongest contrast margins. Risk: can read generic if the hatch and brackets are muted, so they stay visible |
| **D-8** | **Accent colour** (real brand colour, Spec Q-12) | Keep working cobalt `#1F4FE0` (A) · teal `#0E7490` (B) · vermilion `#C2410C` (C) · you supply the real brand colour and logo | Keep cobalt until a real brand colour exists; wire it through one variable so a change is a one-line edit. A vermilion CTA was not seen on any of the 12 reference pages (accents there are blue, violet, periwinkle or black), which is a differentiator but also the highest risk of reading as consumer |

## B. Proposals that change or extend the Spec (please accept or reject)

| # | Proposal | Why | Recommendation |
|---|---|---|---|
| **D-2** | Add `liquid-metal-button` (21st.dev, in your Motion prompt) to Spec 15.5 as **REJECT** | WebGL shader canvas per button, new dependency (`@paper-design/shaders`), `transition: all` with overshoot easing, runtime `<style>` injection, metallic material contradicts the flat system. See `motion-catalogue.md` M-12 | Accept |
| **D-3** | `image-stream-hero`: keep as optional (Spec) or reject by default | Looping infinite animation; needs many real images that do not exist; mostly off-screen | Reject by default; use a static grid of labelled sample-tenant screens. Reopen if you want it |
| **D-4** | The **two motion moments**: (1) hero product frame settles in, 250ms; (2) one diagram fades in once, 250ms staggered. Hover/focus transitions and instant CSS tabs are not counted | Fits the budget and the no-JS and reduced-motion rules; never animates the LCP text | Accept |
| **D-5** | Add a `--border-strong` token (3:1) to Spec Appendix B for input and control borders | The Spec's single `--border #E4E7EC` is 1.24:1 on white and cannot satisfy WCAG 1.4.11 for form fields. Proposed values: A `#8691A3`, B `#818C9E`, C `#92866F` | Accept |
| **D-6** | A visible 12-column grid as a new signature device (direction B only) | Not in the locked device list; the grid also reduces readability if text sits on it | Reject unless you pick B |
| **D-7** | Allow a tone-shift second headline line (ink then `--muted`) as an optional heading variant | Used by spacefs and eden; zero cost; muted-on-white is 4.97 to 6.31:1 | Allow as a variant, off by default |
| **D-9** | Body size: 17px (Spec, A) vs 15px (B) vs 18px (C) | 15px is the weakest for small screens | 17px |

## C. Housekeeping and risk items

| # | Item | Recommendation |
|---|---|---|
| **D-10** | `public/Assets/Fonts` holds **Fontspring DEMO biotif** and **SF Pro Display** files, neither licensed for commercial self-hosting here, plus Clash Display (outside the locked type system) | Delete or exclude all three when the legacy sections are migrated; Geist subset replaces them |
| **D-11** | Consent banner: four of the 12 references had a banner covering part of the first viewport | If launch analytics are cookieless and privacy-friendly, ship with no banner. Needs legal review (Spec Q-18) |
| **D-12** | Tabbed product views | CSS-only (radio or `<details name>`), so they work without JavaScript |
| **D-13** | Lab delivery | Static HTML in `design-system/`, outside the Next.js tree, served with `python3 -m http.server 4173 --directory design-system`. It cannot ship in the app build by construction. Confirm this is acceptable instead of a gated Next route |
| **D-14** | Copy in context | By default the Lab uses sample copy. Say "render Section 9 copy" if you want it tried in one composition |
| **D-15** | `DESIGN.md` and `PRODUCT.md` at the repo root were written earlier from the Spec. They will be refreshed (via `/document`) after LOCK, not edited during the Lab | Accept |

## D. Questions for you

1. D-1: which direction, blend or idea?
2. D-8: do you have a real brand colour and logo files (Spec Q-12, Q-13)?
3. Do you recognise the "patterns you are likely drawn to" in `SYNTHESIS.md` section 4, or should I correct them?
4. Accept or change D-2 to D-9?
5. Any reference from the list you want me to look at more deeply (for example mobile menus, pricing pages, footers) in round 1? Those were `NOT OBSERVED`.
