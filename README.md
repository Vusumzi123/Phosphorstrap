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

Phase 1 — skeleton, tokens, themes, Bootstrap bridge. See
[docs/design-plan.md](docs/design-plan.md) for the full plan.

## Build

```sh
npm run build   # node scripts/build.mjs → dist/
```

## Layout

- `src/tokens.css` — all `--ph-*` design tokens (light default)
- `src/themes/dark.css` — `[data-theme="dark"]` overrides
- `src/bootstrap-bridge.css` — `--bs-*` → `--ph-*` mapping
- `docs/index.html` — bare-Bootstrap acceptance page
