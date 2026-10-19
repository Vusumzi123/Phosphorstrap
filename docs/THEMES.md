# THEMES.md — authoring a Phosphorstrap community theme

A community theme is **one CSS file that overrides `--ph-*` tokens**. No
build step, no Sass, no component selectors. The token schema in the table
below *is* the contract.

Reference files:

- [`../themes/TEMPLATE.css`](../themes/TEMPLATE.css) — starting point, every token with defaults
- [`../themes/green-crt.css`](../themes/green-crt.css) — worked token-only example (shipped, previewable in the gallery)
- [`../themes/nibble.css`](../themes/nibble.css) — extended theme: tokens + scoped component polish, light/dark and accent variants
- [`gallery.html`](gallery.html) — live previews of every bundled theme

## Recipe

1. **Copy** `themes/TEMPLATE.css` → `my-theme.css`.
2. **Rename the theme id** — the selector `[data-theme="my-theme"]` (it must
   match the attribute you'll set on `<html>`).
3. **Change values.** Any subset works; omitted tokens inherit from
   `tokens.css` (light) / `dark.css`. Every color token needs its
   `--ph-*-rgb` companion (comma-separated 0–255 triplet, no `rgb()` wrapper).
4. **Ship it after Phosphorstrap:**

   ```html
   <link rel="stylesheet" href="bootstrap.min.css">
   <link rel="stylesheet" href="phosphorstrap.css">
   <link rel="stylesheet" href="my-theme.css">
   <html lang="en" data-theme="my-theme">
   ```

5. **Preview** — add a row to `docs/gallery.html` (see below) so the theme is
   testable in the playground.

## Token schema (the contract)

| Group | Token | Role |
|---|---|---|
| color | `--ph-bg` (+ `-rgb`) | page background |
| color | `--ph-surface` (+ `-rgb`) | default panel/card surface |
| color | `--ph-surface-raised` (+ `-rgb`) | elevated surface (inputs, tab hover) |
| color | `--ph-border` | 1px borders |
| color | `--ph-text` (+ `-rgb`) | body ink |
| color | `--ph-text-muted` (+ `-rgb`) | secondary ink |
| color | `--ph-primary` (+ `-rgb`) | main accent |
| color | `--ph-success` / `--ph-warning` / `--ph-danger` / `--ph-info` (all `+ -rgb`) | status accents |
| type | `--ph-font-mono` | terminal type — default for UI chrome |
| type | `--ph-font-sans` | prose fallback |
| type | `--ph-font-size-base` | root size (`1rem`) |
| type | `--ph-text-xs` … `--ph-text-3xl` | modular size scale (12–36px) |
| type | `--ph-leading-tight` / `-base` / `-relaxed` | line-heights (1.25 / 1.5 / 1.65) |
| spacing | `--ph-space-1` … `--ph-space-8` | 4px-based scale (4–64px) |
| spacing | `--ph-control-height` | touch-target floor for controls (`2.75rem`) |
| shape | `--ph-radius-sm` / `-md` / `-lg` | corner radii |
| depth | `--ph-shadow-1` / `-2` / `-3` | hairline / raised / floating |
| depth | `--ph-gradient-header` | header wash (panel, modal, active tab) |
| motion | `--ph-transition-fast` / `-base` | micro-interaction / elevation timing |

## Rules

- **Do** start with `--ph-*` tokens inside your theme selector.
- **Don't** override `--bs-*` variables — `bootstrap-bridge.css` already maps
  `--bs-* → --ph-*`, which is why one file recolors every Bootstrap component.
- **Don't** write component selectors in a standard theme (`.btn`,
  `.ph-panel …`). If you need them, ship an **extended theme** (below).
- **Don't** ship a color literal where a token exists, in app CSS either.
- **Do** keep `--ph-font-mono` the UI default in standard themes —
  Phosphorstrap is mono in light, dark, and every token-only theme. Extended
  themes may change the UI font inside their own scope.
- **Do** keep contrast honest: `--ph-text` on `--ph-bg` ≥ 4.5:1 for body copy;
  `--ph-on-accent`-style usage (button labels) picks light or dark per accent
  brightness.

## Extended themes

An extended theme does everything a standard theme does, then adds component
polish the token layer cannot express: a different UI font, flat buttons,
softer focus rings, or ink colors on solid fills. `themes/nibble.css` is the
reference.

Rules for the extra section:

- **Scope every component selector to the theme id.** Use
  `[data-theme^="nibble"] .btn`, never a bare `.btn`. An unscoped rule leaks
  into every other theme.
- **Tokens stay the base.** Component rules should reference `--ph-*` values,
  not repeat color literals.
- **Keep labels mono.** `.ph-label`, code, kbd and tabular numbers stay on
  `--ph-font-mono` even when the body switches to sans.
- **Document the variants.** `nibble` ships `nibble-light` plus an optional
  `data-accent` attribute; keep new theme-local attributes listed next to the
  activation snippet.
- **Re-run the gallery** after changing a component rule — the gallery loads
  Bootstrap JS/CSS and exercises the whole component pass.

```html
<link rel="stylesheet" href="phosphorstrap.css">
<link rel="stylesheet" href="themes/nibble.css">

<html data-theme="nibble">                    <!-- dark, lime -->
<html data-theme="nibble-light">              <!-- light, lime -->
<html data-theme="nibble" data-accent="cyan"> <!-- dark, cyan -->
<html data-theme="nibble-light" data-density="compact">
```

Accents: `lime` (default), `amber`, `cyan`, `violet`, `rose`.

## Stability guarantee

The token names in the table are stable. New tokens may be added in a minor
version; existing tokens are never renamed or removed within `0.x`'s contract
for themes. A theme written against this table keeps working.

## Adding a theme to the gallery

`docs/gallery.html` holds a `THEMES` array at the top of its script block —
append an entry (`id`, label, description, stylesheet path). The switcher and
the compatibility check pick it up automatically. The preview set covers the
full Phosphorstrap component pass plus the bridge-themed Bootstrap elements:
navbar, dropdown, buttons, badges, alerts, forms (input/select/check/radio/
switch/range), cards (header/footer), tables, panels (incl. `--accent`),
tabs & pills, breadcrumb, pagination, progress, list-group, accordion,
modal, and toast. Bootstrap CSS + JS are already loaded on the page, so
import order — the classic gotcha — is exercised for you.
