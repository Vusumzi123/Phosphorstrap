# Phosphorstrap — Angular showcase

Angular 22 integration app for [`@vusux/phosphorstrap`](../package.json) — every
component and variant, both built-in themes plus the `green-crt` and
`nibble` community drop-ins, a live theme switcher, per-component routes, and a
token playground
(live `--ph-*` overrides). Doubles as the Phosphorstrap integration test and a
screenshot target.

## Run

```sh
npm install          # @vusux/phosphorstrap is a file:.. symlink to the repo root
npm start            # ng serve → http://localhost:4200
npm run build        # production build → dist/showcase/browser
```

## Routes

| Route | Content |
| --- | --- |
| `/` | index — quick start + component list |
| `/buttons` `/forms` `/alerts` `/cards` `/panels` | component galleries (all variants) |
| `/modals` `/toasts` `/navs` | Bootstrap-JS components (modal, toast, tab switching) |
| `/tables` `/badges` | themed tables and badges |
| `/calendar` | `ph-calendar` — interactive (Angular signals) + static state grid |
| `/playground` | live `--ph-*` overrides (colors, radii, base size) + computed readout |
| `/themes` | community-theme drop-in examples (`themes/green-crt.css`, `themes/nibble.css`) |

## Theme switching

The header switcher sets `data-theme` on `<html>` — `dark`, `light`
(built-in), `green-crt` (token-only drop-in), and `nibble` / `nibble-light`
(extended drop-ins) — all loaded after `phosphorstrap.css`. No JS theming:
tokens and the Bootstrap bridge follow the attribute; Nibble also reads
`data-accent` and `data-density`.

## Wiring (angular.json)

```json
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "node_modules/@vusux/phosphorstrap/dist/phosphorstrap.css",
  "../themes/green-crt.css",
  "../themes/nibble.css",
  "src/styles.css"
],
"scripts": [
  "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
]
```

Bootstrap JS powers modal/toast/tab `data-bs-*` attributes; Phosphorstrap only
themes them.
