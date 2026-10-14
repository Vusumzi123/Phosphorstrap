# THEMES.md — authoring a Phosphor community theme

A community theme is **one CSS file that overrides `--ph-*` tokens**. No
build step, no Sass, no component selectors. The token schema in the table
below *is* the contract.

Reference files:

- [`../themes/TEMPLATE.css`](../themes/TEMPLATE.css) — starting point, every token with defaults
- [`../themes/green-crt.css`](../themes/green-crt.css) — worked example (shipped, previewable in the gallery)
- [`gallery.html`](gallery.html) — live previews of every bundled theme

## Recipe

1. **Copy** `themes/TEMPLATE.css` → `my-theme.css`.
2. **Rename the theme id** — the selector `[data-theme="my-theme"]` (it must
   match the attribute you'll set on `<html>`).
3. **Change values.** Any subset works; omitted tokens inherit from
   `tokens.css` (light) / `dark.css`. Every color token needs its
   `--ph-*-rgb` companion (comma-separated 0–255 triplet, no `rgb()` wrapper).
4. **Ship it after Phosphor:**

   ```html
   <link rel="stylesheet" href="bootstrap.min.css">
   <link rel="stylesheet" href="phosphor.css">
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

- **Do** touch only `--ph-*` tokens inside your theme selector.
- **Don't** override `--bs-*` variables — `bootstrap-bridge.css` already maps
  `--bs-* → --ph-*`, which is why one file recolors every Bootstrap component.
- **Don't** write component selectors (`.btn`, `.ph-panel …`) in a theme.
- **Don't** ship a color literal where a token exists, in app CSS either.
- **Do** keep `--ph-font-mono` the UI default — Phosphor is mono in light,
  dark, and every community theme.
- **Do** keep contrast honest: `--ph-text` on `--ph-bg` ≥ 4.5:1 for body copy;
  `--ph-on-accent`-style usage (button labels) picks light or dark per accent
  brightness.

## Stability guarantee

The token names in the table are stable. New tokens may be added in a minor
version; existing tokens are never renamed or removed within `0.x`'s contract
for themes. A theme written against this table keeps working.

## Adding a theme to the gallery

`docs/gallery.html` holds a `THEMES` array at the top of its script block —
append an entry (`id`, label, description, stylesheet path). The switcher and
the compatibility check pick it up automatically. The preview set covers the
full Phosphor component pass plus the bridge-themed Bootstrap elements:
navbar, dropdown, buttons, badges, alerts, forms (input/select/check/radio/
switch/range), cards (header/footer), tables, panels (incl. `--accent`),
tabs & pills, breadcrumb, pagination, progress, list-group, accordion,
modal, and toast. Bootstrap CSS + JS are already loaded on the page, so
import order — the classic gotcha — is exercised for you.
