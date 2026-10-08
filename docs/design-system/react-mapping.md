# React mapping and promotion parity (v0.1, DRAFT until LOCK v1.0)

Rule from the Gate 1 reply (D-13): the Lab components are plain HTML and `hx-` CSS classes, and each has a documented 1:1 React mapping so the approved look cannot drift when ported. Promotion into `app/components/` is a separate task after LOCK; nothing here is applied to the app.

The repository is **JavaScript** (`.jsx`), so props are documented with JSDoc and, where useful, `prop-types` (already a dependency). The CSS files are used **unmodified**: `tokens.css` (generated) and `components.css`. React components emit the same class names; they do not re-implement styles, and they do not use styled-components.

## Contract

1. **Class names are the API.** A component's output markup equals the Lab markup: same elements, same `hx-` classes, same attributes. No inline styles except positioning of annotation markers (`top`/`left`).
2. **Props map to modifiers and attributes**, never to new CSS. A prop that would need new CSS means the Lab and `components.css` change first (change control).
3. **No JavaScript is required for the component to work.** React adds behaviour only where the table says "enhancement".
4. **Server-rendered.** All components render in the server HTML (no `ssr: false`, no client-only content).
5. **Tokens come from `tokens.css`.** `tokens.ts` is for the rare case JS needs a value (for example a chart). Never copy hex or px into a component.

## Component table

| Lab ID | React component | Props (JSDoc) | Output |
|---|---|---|---|
| CMP-BTN-01 | `Button` | `variant: 'primary' \| 'secondary' \| 'tertiary'` (default `primary`), `size?: 'md' \| 'lg'`, `block?: boolean`, `icon?: 'arrow'`, `href?: string`, `loading?: boolean`, `disabled?: boolean`, `children` | `<a>` when `href`, else `<button type="button">`. Classes `hx-btn hx-btn--{variant}`, plus `hx-btn--lg`, `hx-btn--block`. `loading` sets `aria-busy="true"` and the caller supplies the label text ("Sending…"); no spinner. `disabled` on an anchor uses `aria-disabled="true"`, `tabindex="-1"` |
| CMP-BTN-02 | `Button` with `sheen` | `sheen?: boolean` (experiment, off unless approved) | adds `hx-btn--sheen` |
| CMP-LNK-01 | `Link` | `href`, `arrow?: boolean`, `children` | `<a class="hx-link">`; arrow variant `hx-link hx-link--arrow` with the inline SVG |
| CMP-FLD-01 | `Field` | `id`, `label`, `type: 'text' \| 'email' \| 'select' \| 'textarea'`, `required?`, `hint?`, `error?`, `autoComplete`, `options?` | wrapper `div.hx-field` with `data-invalid="true"` when `error`; `label.hx-field__label`; control `hx-input` / `hx-select` inside `div.hx-select-wrap` / `hx-textarea`; hint `p.hx-field__hint#{id}-hint`; error `p.hx-field__error#{id}-err[role=alert]` with icon. The control gets `aria-describedby` for hint and error ids and `aria-invalid="true"` when `error`. The required asterisk is `aria-hidden`; set the native `required` attribute |
| CMP-CRD-01 | `Card` | `surface?: boolean`, `brackets?: boolean`, `index?: string`, `title`, `children`, `outcome?` | `article.hx-card[ hx-card--surface]`; when `brackets`, wrap in `div.hx-brackets`; index `p.hx-label.hx-card__index`; title `h3.hx-h3.hx-card__title` (use the heading level that fits the outline) |
| CMP-BDG-01 | `Badge` | `tone?: 'accent' \| 'neutral' \| 'success' \| 'warning' \| 'danger'`, `children` | `span.hx-badge[ hx-badge--{tone}]`; state tones include `span.hx-badge__dot[aria-hidden]` |
| PRO-HDR-01 | `Header` | `nav: {label, href, current?}[]`, `cta: {label, href}`, `ctaVariant?: 'primary' \| 'secondary'` (D-17: default and decided value is `primary`, md size, same label and destination as the hero CTA; `secondary` exists only for the Lab comparison), `menuOpen?` (tests only) | `header.hx-header > .hx-container > .hx-header__bar`; wordmark `a.hx-wordmark` (text is its accessible name; keep the space between the two spans); `nav.hx-nav[aria-label=Primary]`; actions `div.hx-header__actions` with the CTA `Button` and the mobile menu `details.hx-menu` (see below). Preceded by `a.hx-skip` |
| PRO-HDR-01 (menu) | `MobileMenu` | derived from `nav` | native `<details class="hx-menu"><summary class="hx-menu__toggle">` with the two icons and `span.hx-sr` "Menu"; panel `div.hx-menu__panel` with `p.hx-label.hx-menu__group` and `a.hx-menu__link`. **Enhancement (optional, not required):** close on Escape and on outside click, restore focus to the summary |
| PRO-FTR-01 | `Footer` | `entity`, `email`, `groups: {title, links[]}[]`, `year` (computed at build, never typed) | `footer.hx-footer` with `.hx-footer__grid`, brand block, `nav[aria-label]` per group, `.hx-footer__base` |
| PRO-HERO-01 | `Hero` | `eyebrow`, `title`, `lead`, `primary`, `secondary`, `trust`, `frame` | `section.hx-section.hx-section--hatched.hx-hero`; one `h1.hx-display` per page; actions use `Button size="lg"` |
| CMP-FRM-01 | `ProductFrame` | `src`, `alt`, `width`, `height`, `priority?`, `caption`, `markers?: {n, top, left}[]`, `rail?: {key, value}[]`, `settle?: boolean` | `div.hx-brackets > figure.hx-frame[ hx-settle]`; `img` has explicit `width` and `height`; `priority` sets `fetchpriority="high"` on the LCP image only; markers are `span.hx-marker[aria-hidden]` (their meaning is in the visible annotation list); rail is `dl.hx-kv` |
| PRO-TBL-01 | `DataTable` | `caption`, `badge?`, `columns: {key, label, numeric?}[]`, `rows` | `div.hx-table-wrap[role=region][tabindex=0][aria-labelledby]` around `table.hx-table`; numeric cells `td.hx-num`; row header `th[scope=row]` |

## Class and attribute rules a reviewer can check mechanically

- Every class in rendered markup that starts with `hx-` exists in `components.css`.
- No element has a `style` attribute except `.hx-marker` (`top`, `left`).
- Each page has exactly one `h1`; headings do not skip levels.
- Every control has a programmatic label; every error uses `role="alert"` plus an icon and text.
- `img` always has `width`, `height`, and an `alt` that describes function.

## Screenshot-parity check at promotion (proposed procedure)

When a component is promoted from the Lab to `app/components/`:

1. Render the React component to static HTML in a test route with the same sample props as the Lab.
2. Load the Lab page and the React route in the same Chrome build at **390x844 and 1440x900**, `deviceScaleFactor` 1, fonts loaded, animations disabled (`reducedMotion: 'reduce'`).
3. Compare the element screenshots with a pixel diff. **Pass: at most 0.1% of pixels differ** (anti-aliasing noise) and no layout shift of more than 1px. Any diff above that blocks promotion until the cause is fixed in the React component, not by editing the CSS.
4. Compare the DOM: the set of `hx-` classes and the ARIA attributes must be identical to the Lab markup (a small script can diff `outerHTML` after normalising ids).
5. Re-run axe and the keyboard walkthrough on the React route; record the result in `PROOF_REPORT.md`.

No parity script is written yet because no React component exists; it is written as the first step of the promotion task.

## Using the tokens in Tailwind 3 (proposed, not applied)

The repository uses Tailwind 3.4. To expose tokens without duplicating values, `tailwind.config.mjs` would extend colours and radii with the CSS variables, for example `colors: { ink: 'var(--ink)', text: 'var(--text)', muted: 'var(--muted)', accent: 'var(--accent)', surface: 'var(--surface)', border: 'var(--border)' }` and `borderRadius: { md: 'var(--r-md)' }`. The legacy token names currently in `app/globals.css` (`--primary`, `--accent-1..3`, `--neutral-*`, `--text-*`, `--space-*`) overlap and must be removed, not aliased, when the legacy sections go. The full patch is written at LOCK in `proposed-global-patch.md`.
