# Phosphor

Retro-terminal design language — a **theme + token layer over Bootstrap 5.3**.
Any Bootstrap app becomes a Phosphor app by importing two CSS files and setting
`data-theme="dark|light"` on `<html>`.

```html
<link rel="stylesheet" href="bootstrap.min.css">
<link rel="stylesheet" href="phosphor.css">
<html data-theme="dark">
```

## Status

Phase 6 — v1.1 calendar: `ph-calendar` (date field + month-grid popover,
keyboard-accessible, no Bootstrap datepicker) on the token system. Prior:
agent surface (`docs/manifest.json` + `docs/AGENTS.md` + playground index +
consumer snippets, validated against Angular 22 `My-first-app`) and community
theming (`themes/TEMPLATE.css`, `docs/THEMES.md`, `docs/gallery.html`).
See [docs/design-plan.md](docs/design-plan.md) for the full plan.

## Install & consume

Bootstrap `^5.3` is a peer dependency (imported first, never bundled).

### Angular (`angular.json`)

```json
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "node_modules/@vusux/phosphor/dist/phosphor.css"
]
```

Or per-area imports in `styles.css`:

```css
@import "bootstrap/dist/css/bootstrap.min.css";
@import "@vusux/phosphor";
/* or: @import "@vusux/phosphor/tokens"; @import "@vusux/phosphor/buttons"; */
```

### Vanilla

```html
<link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="node_modules/@vusux/phosphor/dist/phosphor.css">
<html lang="en" data-theme="dark">
```

### React (Vite)

```js
// main.jsx
import "bootstrap/dist/css/bootstrap.min.css";
import "@vusux/phosphor";
```

```jsx
export function App() {
  return <button className="btn btn-primary">It just works</button>;
}
```

Toggle themes anywhere with one line:

```js
document.documentElement.dataset.theme =
  document.documentElement.dataset.theme === "dark" ? "light" : "dark";
```

## For agents

- [`docs/AGENTS.md`](docs/AGENTS.md) — naming rules, theme guide, token table.
- [`docs/manifest.json`](docs/manifest.json) — machine-readable catalog:
  components, classes, Bootstrap counterparts, tokens, do/don't snippets.

## Community themes

A theme is one CSS file overriding the `--ph-*` tokens — copy
[`themes/TEMPLATE.css`](themes/TEMPLATE.css), rename the `data-theme` id,
load it after `phosphor.css`. Guide: [`docs/THEMES.md`](docs/THEMES.md) ·
live previews: [`docs/gallery.html`](docs/gallery.html) (shipped example:
[`themes/green-crt.css`](themes/green-crt.css)).

## Build

```sh
npm run build   # node scripts/build.mjs → dist/
```

## Layout

- `src/tokens.css` — all `--ph-*` design tokens (light default)
- `src/themes/dark.css` — `[data-theme="dark"]` overrides
- `src/bootstrap-bridge.css` — `--bs-*` → `--ph-*` mapping
- `src/components/*.css` — one module per component (buttons, forms, alerts, cards, panels, modals, toasts, tables, badges, navs, calendar)
- `src/utilities.css` — Phosphor-only helpers (`.ph-glow`, `.ph-label`, …)
- `docs/*.html` — static playground, one page per component (`npx serve docs`)

## Package exports

```json
"exports": {
  ".": "./dist/phosphor.css",
  "./tokens": "./dist/tokens.css",
  "./dark": "./dist/themes/dark.css",
  "./bootstrap-bridge": "./dist/bootstrap-bridge.css",
  "./buttons": "./dist/components/buttons.css",
  "./forms": "./dist/components/forms.css",
  "./alerts": "./dist/components/alerts.css",
  "./cards": "./dist/components/cards.css",
  "./panels": "./dist/components/panels.css",
  "./modals": "./dist/components/modals.css",
  "./toasts": "./dist/components/toasts.css",
  "./tables": "./dist/components/tables.css",
  "./badges": "./dist/components/badges.css",
  "./navs": "./dist/components/navs.css",
  "./calendar": "./dist/components/calendar.css"
}
```

## License

MIT
