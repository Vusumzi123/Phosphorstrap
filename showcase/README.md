# Phosphor — Angular showcase

Angular 22 integration app for [`@vusux/phosphor`](../package.json) — every
component and variant, both built-in themes plus the `green-crt` community
drop-in, a live theme switcher, per-component routes, and a token playground
(live `--ph-*` overrides). Doubles as the Phosphor integration test and a
screenshot target.

## Run

```sh
npm install          # @vusux/phosphor is a file:.. symlink to the repo root
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
| `/themes` | community-theme drop-in example (`themes/green-crt.css`) |

## Theme switching

The header switcher sets `data-theme` on `<html>` — `dark`, `light`
(built-in), `green-crt` (community drop-in loaded after `phosphor.css`).
No second stylesheet, no JS theming: tokens and the Bootstrap bridge follow
the attribute.

## Wiring (angular.json)

```json
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "node_modules/@vusux/phosphor/dist/phosphor.css",
  "../themes/green-crt.css",
  "src/styles.css"
],
"scripts": [
  "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
]
```

Bootstrap JS powers modal/toast/tab `data-bs-*` attributes; Phosphor only
themes them.
