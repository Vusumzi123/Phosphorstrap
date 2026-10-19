# Phosphorstrap

Retro-terminal design language — a **theme + token layer over Bootstrap 5.3**.
Any Bootstrap app becomes a Phosphorstrap app by importing two CSS files and setting
`data-theme="dark|light"` on `<html>`.

```html
<link rel="stylesheet" href="bootstrap.min.css">
<link rel="stylesheet" href="phosphorstrap.css">
<html data-theme="dark">
```

## Status

Phase 7 — Angular showcase: `showcase/` (Angular 22, modeled on
My-first-app) — every component + variant on per-component routes, both
built-in themes + the `green-crt` and `nibble` drop-ins, live theme
switcher, token playground (live `--ph-*` overrides); doubles as the integration test and a
screenshot target (`cd showcase && npm start`). Prior: Phase 6 — v1.1
calendar: `ph-calendar` (date field + month-grid popover,
keyboard-accessible, no Bootstrap datepicker) on the token system; Phase 4
agent surface (`docs/manifest.json` + `docs/AGENTS.md` + playground index +
consumer snippets, validated against Angular 22 `My-first-app`); Phase 5
community theming (`themes/TEMPLATE.css`, `docs/THEMES.md`,
`docs/gallery.html`).
See [docs/design-plan.md](docs/design-plan.md) for the full plan.

## Install & consume

Bootstrap `^5.3` is a peer dependency (imported first, never bundled).

### Angular (`angular.json`)

```json
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "node_modules/@vusux/phosphorstrap/dist/phosphorstrap.css"
]
```

Or per-area imports in `styles.css`:

```css
@import "bootstrap/dist/css/bootstrap.min.css";
@import "@vusux/phosphorstrap";
/* or: @import "@vusux/phosphorstrap/tokens"; @import "@vusux/phosphorstrap/buttons"; */
```

### Vanilla

```html
<link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="node_modules/@vusux/phosphorstrap/dist/phosphorstrap.css">
<html lang="en" data-theme="dark">
```

### React (Vite)

```js
// main.jsx
import "bootstrap/dist/css/bootstrap.min.css";
import "@vusux/phosphorstrap";
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

A theme is one CSS file loaded after `phosphorstrap.css`. Standard themes
override `--ph-*` tokens only — copy
[`themes/TEMPLATE.css`](themes/TEMPLATE.css), rename the `data-theme` id;
extended themes may add component polish scoped to their own id. Guide:
[`docs/THEMES.md`](docs/THEMES.md) ·
live previews: [`docs/gallery.html`](docs/gallery.html) (shipped examples:
[`themes/green-crt.css`](themes/green-crt.css) and the extended
[`themes/nibble.css`](themes/nibble.css)).

### Nibble (extended theme)

Modern-minimal: near-black or paper canvas, one luminous accent, sans UI with
mono labels, soft borders. It is token-first, with a small scoped component
polish section for typography and flat controls.

```html
<link rel="stylesheet" href="bootstrap.min.css">
<link rel="stylesheet" href="phosphorstrap.css">
<link rel="stylesheet" href="themes/nibble.css">
<html data-theme="nibble">                  <!-- dark, lime -->
<html data-theme="nibble-light">            <!-- light, lime -->
<html data-theme="nibble" data-accent="cyan"> <!-- dark, cyan -->
```

Accents: `lime` (default), `amber`, `cyan`, `violet`, `rose`. Optional
`data-density="compact"` tightens controls and spacing. From npm:

```css
@import "bootstrap/dist/css/bootstrap.min.css";
@import "@vusux/phosphorstrap";
@import "@vusux/phosphorstrap/themes/nibble";
```

## Build

```sh
npm run build   # node scripts/build.mjs → dist/
```

## Layout

- `src/tokens.css` — all `--ph-*` design tokens (light default)
- `src/themes/dark.css` — `[data-theme="dark"]` overrides
- `src/bootstrap-bridge.css` — `--bs-*` → `--ph-*` mapping
- `src/components/*.css` — one module per component (buttons, forms, alerts, cards, panels, modals, toasts, tables, badges, navs, calendar)
- `src/utilities.css` — Phosphorstrap-only helpers (`.ph-glow`, `.ph-label`, …)
- `themes/*.css` — community themes; `nibble.css` is also copied to `dist/themes/`
- `docs/*.html` — static playground, one page per component (`npx serve docs`)

## Package exports

```json
"exports": {
  ".": "./dist/phosphorstrap.css",
  "./tokens": "./dist/tokens.css",
  "./dark": "./dist/themes/dark.css",
  "./themes/nibble": "./dist/themes/nibble.css",
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
