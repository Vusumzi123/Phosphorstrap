# Phosphor — Retro-Terminal Design Language for Web Apps

Working plan. Package name `@vusux/phosphor` (adjustable), class prefix `ph-`.

## Concept

A **theme + token layer over Bootstrap 5.3**, not a competing UI kit:

- **Bootstrap provides** the grid, responsive utilities, and all JS behaviors
  (modal, toast, dropdown, collapse, tooltip…).
- **Phosphor provides** the design language: sepia terminal palette, modernized
  geometry (soft shadows, rounded corners, subtle gradients), component polish
  Bootstrap lacks, and a community-theme system.
- Net effect: any Bootstrap app becomes a Phosphor app by swapping one CSS
  import and setting `data-theme="dark|light"` on `<html>`.

### Visual identity — old terminals & PCs, modern craft

| Aspect | Treatment |
|---|---|
| Light mode | Warm parchment/sepia surfaces (`#f4ead8`-family), ink-brown text, amber accents |
| Dark mode | Deep warm charcoal (`#1a1512`-family), phosphor-amber highlights, soft glow accents |
| Accent | Amber primary (`#e0a458`-ish), phosphor green for success, CRT red for danger |
| Shapes | 6–10px radii (above Bootstrap default), layered soft shadows |
| Details | 1px warm borders, subtle gradient washes on headers/primary buttons, optional scanline/glow micro-accents (tasteful, not cosplay) |

## Characteristics (locked)

- **Modular / plug-and-play** — per-area package entry points; import only what
  you use.
- **Lightweight** — plain CSS, no Sass/PostCSS chain, tiny bundler.
- **Configurable** — every visual decision is a `--ph-*` CSS custom property.
- **Dark + light mode** — `data-theme` attribute, both first-class.
- **Community themes** — one drop-in CSS file overriding the token schema.
- **AI-agent usable** — `manifest.json` + `AGENTS.md` + naming discipline so
  agents can pick classes and author themes without reading source.
- **Framework-agnostic** — CSS-first; Bootstrap 5.3 is a peer dependency
  (consumed as prebuilt CSS). Verified against Angular 22 (plain CSS,
  `My-first-app`), snippets for vanilla/React too.

## Architecture

```
Phosphor/
├── src/
│   ├── tokens.css          # ALL design tokens (:root, light default)
│   ├── themes/
│   │   ├── dark.css        # [data-theme="dark"] token overrides
│   │   └── TEMPLATE.css    # community-theme starting point
│   ├── bootstrap-bridge.css# maps Bootstrap 5.3 --bs-* vars → Phosphor tokens
│   ├── components/
│   │   ├── buttons.css  forms.css  alerts.css  cards.css  panels.css
│   │   ├── modals.css   toasts.css  tables.css  badges.css  navs.css …
│   │   └── calendar.css    # v1.1 (ph-calendar)
│   ├── utilities.css       # small Phosphor utility set (glow, sepia-surface…)
│   └── phosphor.css        # umbrella: tokens + dark + bridge + all components
├── docs/                   # static playground — one HTML page per component
│   ├── AGENTS.md           # agent-facing usage contract
│   └── manifest.json       # machine-readable component/token catalog
├── scripts/build.mjs       # tiny bundler → dist/ (concat + optional lightningcss minify)
├── package.json            # exports map (below)
└── README.md
```

### Tokens

One vocabulary everything reads from:

```css
:root {
  /* color */
  --ph-bg, --ph-surface, --ph-surface-raised, --ph-border,
  --ph-text, --ph-text-muted, --ph-primary, --ph-success,
  --ph-warning, --ph-danger, --ph-info;
  /* type */
  --ph-font-mono, --ph-font-sans, --ph-font-size-base;  /* mono default for terminal feel */
  /* shape & depth */
  --ph-radius-sm/md/lg, --ph-shadow-1/2/3, --ph-gradient-header;
  /* motion */
  --ph-transition-fast/base;
}
```

- `bootstrap-bridge.css` does `--bs-body-bg: var(--ph-bg);
  --bs-btn-bg: var(--ph-primary); …` — Bootstrap components recolor
  automatically.
- Component files only touch what the bridge can't reach (borders, washes,
  custom states) + Phosphor-only extras.
- **Community theme = one CSS file** overriding `--ph-*` tokens; the token
  schema is the contract. `themes/TEMPLATE.css` + gallery page ship with it.

### Package exports (plug-and-play)

```json
"exports": {
  ".": "./dist/phosphor.css",
  "./tokens": "./dist/tokens.css",
  "./dark": "./dist/themes/dark.css",
  "./buttons": "./dist/components/buttons.css",
  "./forms": "./dist/components/forms.css"
}
```

Angular consumer (`angular.json`):

```json
"styles": ["node_modules/bootstrap/dist/css/bootstrap.min.css",
           "node_modules/@vusux/phosphor/dist/phosphor.css"]
```

## AI-agent usability (first-class)

1. **`manifest.json`** — components, their classes, required Bootstrap
   counterpart, tokens consumed, do/don't examples. An agent can answer
   "how do I make a modal?" without reading CSS.
2. **`AGENTS.md`** in the package — naming rules (`ph-` prefix only for
   Phosphor-only components; Bootstrap classes reused as-is), theme-authoring
   guide, token table.
3. **Naming discipline** — BEM-lite everywhere: `.ph-panel`,
   `.ph-panel__header`, `.ph-panel--accent`; Bootstrap classes never renamed.
4. **Docs playground** = static HTML, zero build — humans and agents open/
   inspect every component in both themes (`npx serve docs`).

## Component scope

**v1 (core set):** tokens + theme system + bridge · buttons · forms (text
fields, textarea, checkbox, radio, select) · alerts · cards · panels
(Phosphor-only titled section container with gradient header) · modals ·
toasts · badges · tables · navs/tabs · utilities.

**v1.1:** calendar/datepicker — Bootstrap has no native one; `ph-calendar`
built from scratch on the token system (month grid + input popover,
keyboard-accessible).

**Later:** data-table polish, command palette, themes gallery site.

## Build & tooling (deliberately light)

- Plain CSS sources; ~100-line `build.mjs` bundles modules → `dist/`
  (lightningcss optional for minify).
- Tests: Playwright screenshots of docs pages per theme (phase 4, optional);
  lint via basic `stylelint` config.
- Repo: git init from the start; npm publish can wait (consumed locally via
  `npm link` / file path).

## Build phases

1. **Skeleton + tokens + themes** — repo, build script, `tokens.css`,
   `dark.css`, `bootstrap-bridge.css`; verify a bare Bootstrap page flips to
   sepia-dark by importing two files.
2. **Component pass 1** — buttons, forms, alerts, cards, panels (docs page
   each).
3. **Component pass 2** — modals, toasts (Bootstrap JS themed), tables,
   badges, navs; umbrella `phosphor.css`.
4. **Agent surface + polish** — `manifest.json`, `AGENTS.md`, playground
   index, README with Angular/vanilla/React snippets; validate against
   `My-first-app`.
5. **Community theming** — `TEMPLATE.css`, theme-authoring doc, gallery page.
6. **Calendar (v1.1)** — `ph-calendar` component + docs page.
7. **Angular showcase demo** — a dedicated Angular 22 app (modeled on
   `My-first-app`) that demonstrates *every* component and variant in both
   themes: live theme switcher, per-component routes/sections (buttons, forms,
   alerts, cards, panels, modals, toasts, tables, badges, navs, calendar),
   token playground (live `--ph-*` overrides), and a community-theme
   drop-in example. Doubles as integration test + living screenshot target.

## Decisions log

| Decision | Choice | Date |
|---|---|---|
| Packaging | CSS-first, framework-agnostic (Bootstrap = peer dep) | 2026-10-13 |
| Bootstrap depth | Theme layer over Bootstrap 5.3 CSS variables | 2026-10-13 |
| Name | **Phosphor** (`ph-` prefix) | 2026-10-13 |
| v1 scope | Core set first; calendar deferred to v1.1 | 2026-10-13 |
| Modes | Dark + light, `data-theme` attribute | 2026-10-13 |
| Theming | `--ph-*` token schema, one-file community themes | 2026-10-13 |
| Agent surface | manifest.json + AGENTS.md + BEM-lite naming | 2026-10-13 |
| Showcase | Angular 22 demo app showing all elements (phase 7) | 2026-10-13 |
| Location | `~/Projects/Phosphor` | 2026-10-13 |
