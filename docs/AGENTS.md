# AGENTS.md — Phosphorstrap usage contract for AI agents

You can style any Bootstrap 5.3 app as a Phosphorstrap app **without reading the
CSS sources**. This file plus [`manifest.json`](manifest.json) is the whole
contract.

## The one rule

> **Bootstrap provides the markup; Phosphorstrap provides the paint.**
> Import `bootstrap.min.css` first, `phosphorstrap.css` second, set
> `data-theme="dark"` or `"light"` on `<html>`. Never rename a Bootstrap
> class and never invent a `ph-` wrapper around one.

- **Bootstrap classes stay Bootstrap.** `.btn`, `.form-control`, `.alert`,
  `.card`, `.modal`, `.toast`, `.table`, `.badge`, `.nav-tabs` — use them
  exactly as Bootstrap documents them, including its JS for modal/toast.
- **`ph-` prefix is reserved for Phosphorstrap-only things**: the `ph-panel`
  component, `ph-calendar` (Bootstrap has no datepicker), and the small
  utility set (`.ph-glow`, `.ph-label`, …).
  There is no `.ph-btn`, `.ph-card`, `.ph-alert`, `.ph-modal`, `.ph-datepicker`.
- **Phosphorstrap-only modifiers use one dash pair**: `.toast--success`,
  `.ph-panel--accent`. Elements use `__`: `.ph-panel__header`.

## Minimal page

```html
<html lang="en" data-theme="dark">
<head>
  <link rel="stylesheet" href="bootstrap.min.css">
  <link rel="stylesheet" href="phosphorstrap.css">
</head>
<body>
  <button class="btn btn-primary">It just works</button>
</body>
</html>
```

Flip the whole UI by changing `data-theme` — no second stylesheet, no JS.

## Choosing components

| You want | Use | Source |
|---|---|---|
| Button | `.btn .btn-primary` | Bootstrap, themed |
| Text input / select / checkbox | `.form-control` `.form-select` `.form-check-input` | Bootstrap, themed |
| Alert banner | `.alert .alert-warning` | Bootstrap, themed |
| Content card | `.card` | Bootstrap, themed |
| Titled section w/ gradient header | `.ph-panel` + `__header` + `__body` | **Phosphorstrap-only** |
| Dialog | `.modal` + Bootstrap JS | Bootstrap, themed |
| Notification | `.toast` + Bootstrap JS, optional `.toast--success` etc. | Bootstrap + Phosphorstrap modifier |
| Data table | `.table` (+ `.table-striped`) | Bootstrap, themed |
| Chip / status | `.badge .text-bg-primary` | Bootstrap, themed |
| Tabs / pills | `.nav-tabs` / `.nav-pills` + `.nav-link` | Bootstrap, themed |
| Date picker | `.ph-calendar` + `__field`/`__popover`/`__grid`/`__day` | **Phosphorstrap-only** (no Bootstrap counterpart) |
| CRT glow / mono caption | `.ph-glow` / `.ph-label` | Phosphorstrap utilities |

Full class lists, tokens consumed, and do/don't snippets per component:
[`manifest.json`](manifest.json). Live examples: `npx serve docs`.

## Token table

Every visual decision is a `--ph-*` custom property (declared in
`dist/tokens.css`; colors overridden per theme in `dist/themes/dark.css`
— spacing and type tokens are theme-invariant and live only in
`tokens.css`).

| Group | Token | Role |
|---|---|---|
| color | `--ph-bg` | page background |
| color | `--ph-surface` | default panel/card surface |
| color | `--ph-surface-raised` | elevated surface (inputs, tab hover) |
| color | `--ph-border` | warm 1px borders |
| color | `--ph-text` | body ink |
| color | `--ph-text-muted` | secondary ink |
| color | `--ph-primary` | amber accent |
| color | `--ph-success` | phosphor green |
| color | `--ph-warning` | amber warning |
| color | `--ph-danger` | CRT red |
| color | `--ph-info` | teal info |
| type | `--ph-font-mono` | terminal type — the default for UI chrome |
| type | `--ph-font-sans` | prose / long-form fallback |
| type | `--ph-font-size-base` | base size (`1rem`) |
| type | `--ph-text-xs` / `-sm` / `-lg` / `-xl` / `-2xl` / `-3xl` | modular scale: 12 / 14 / 18 / 22 / 28 / 36 px |
| type | `--ph-leading-tight` / `-base` / `-relaxed` | line-heights: 1.25 / 1.5 / 1.65 (never px) |
| spacing | `--ph-space-1…8` | 4px-based scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 px |
| spacing | `--ph-control-height` | min touch target for buttons/inputs/tabs (`2.75rem`, 44px) |
| shape | `--ph-radius-sm` / `-md` / `-lg` | 6 / 8 / 10 px |
| depth | `--ph-shadow-1` / `-2` / `-3` | hairline / raised / floating |
| depth | `--ph-gradient-header` | amber header wash (panel + modal header, active tab) |
| motion | `--ph-transition-fast` | micro-interactions (`120ms ease`) |
| motion | `--ph-transition-base` | elevations (`200ms ease`) |

Spacing discipline: components own **padding**, layouts own **gap**,
margin is a last resort. Snap every length to `--ph-space-*` or the type
scale — never ship magic numbers (13px, 0.6rem, …). Controls floor at
44px for comfortable touch targets.

Each color token also ships a `--ph-*-rgb` triplet (e.g. `--ph-primary-rgb:
224, 164, 88`) for `rgba(var(--ph-*-rgb), 0.35)` alpha work — hex values
cannot be decomposed by custom properties.

## Theming rules for consumers

- **Do** restyle via tokens:

  ```css
  :root { --ph-primary: #b3641f; }           /* tweak one accent */
  ```

- **Don't** override Bootstrap vars (`--bs-*`) directly or hardcode colors
  in component selectors — the bridge (`bootstrap-bridge.css`) already maps
  `--bs-* → --ph-*`, so tokens reach Bootstrap components automatically.
- **Don't** ship color literals in app CSS where a token exists.

## Authoring a community theme (one file)

A theme is a single CSS file that re-declares the token names inside a
selector. Ship it AFTER `phosphorstrap.css`:

```css
/* my-theme.css */
[data-theme="mytheme"] {
  --ph-bg: #101418;
  --ph-surface: #171c22;
  --ph-text: #d7e0ea;
  --ph-primary: #6cb6ff;
  /* …override any subset; the rest inherits from tokens.css/dark.css */
}
```

Then `data-theme="mytheme"` on `<html>`. The token names above are the
schema — the set in the token table is stable; new tokens may be added
minor-version, never renamed within `0.x`'s contract for themes.

If a theme also needs component polish (sans UI, flat buttons, softer focus),
it is an **extended theme**: scope every extra selector to its own id
(`[data-theme^="mytheme"] .btn`) and keep tokens as the base.
[`themes/nibble.css`](../themes/nibble.css) is the reference, shipping
`nibble` (dark), `nibble-light`, `data-accent` variants and optional
`data-density="compact"`.

Full guide with the complete token template and gallery checklist:
[`THEMES.md`](THEMES.md) · starting file: `themes/TEMPLATE.css` ·
live check: [`gallery.html`](gallery.html).

## Package surface

- Umbrella: `@vusux/phosphorstrap` → `dist/phosphorstrap.css` (tokens + dark +
  bridge + utilities + all components).
- Per-area entries exist for tree-shaking: `@vusux/phosphorstrap/buttons`,
  `/forms`, `/alerts`, `/cards`, `/panels`, `/modals`, `/toasts`,
  `/tables`, `/badges`, `/navs`, `/calendar`; also `/tokens`, `/dark`,
  `/bootstrap-bridge`, `/themes/nibble`.
- Bootstrap `^5.3` is a **peer dependency** — never bundled.

## Gotchas

1. **Import order matters**: Bootstrap CSS must precede Phosphorstrap, otherwise
   Phosphorstrap rules lose the cascade.
2. **Dark is not the default** — no `data-theme` means light. Always set the
   attribute explicitly.
3. **`.toast--success` not `.ph-toast--success`** — toast modifiers are the
   one place where Bootstrap's class takes a Phosphorstrap suffix.
4. **JS-owned components** (modal, toast, dropdown, collapse, tooltip) need
   `bootstrap.bundle.min.js`; Phosphorstrap only themes them.
5. Standard themes keep `--ph-font-mono` as the UI default — a terminal UI is
   mono in light *and* dark. Extended themes (like `nibble`) may switch the
   UI to sans inside their own scoped rules; labels and code stay mono.
6. **`ph-calendar` is CSS only** — it paints a date field + month-grid
   popover; opening it, month math and key handling are your JS (Bootstrap
   ships no datepicker). Copy the structure from
   [`calendar.html`](calendar.html).
