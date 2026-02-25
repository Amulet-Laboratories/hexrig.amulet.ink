# Changelog

All notable changes to this project will be documented in this file.

## [0.2.0] — 2026-02-25

### Production Hardening

Full production readiness audit and fix pass across Hex and Rig.

#### Critical Fixes

- **Rig type declarations** — Added `vite-plugin-dts` with `rollupTypes: true`; `dist/index.d.ts` now ships (16 KB)
- **Rig package exports** — Removed broken `./components/*` and `./composables/*` subpath exports (single-bundle architecture)
- **Dialog/Toast teleport theming** — Teleported wrappers now inject `THEME_INJECTION_KEY` and apply `data-theme`/`data-mode`
- **useMotion DOM observation** — Rewritten to find closest `[data-theme]` element, observe `document.body` with `subtree: true`
- **useTheme explicit scheme tracking** — Media query listener only auto-updates when user hasn't explicitly called `setScheme()`

#### High Priority Fixes

- **Tree-shaking** — `sideEffects: false` (hex), `sideEffects: ["**/*.css"]` (rig)
- **RigInput ARIA** — `aria-describedby` only includes descriptionId when description is rendered; `aria-label` fallback when no label
- **useToast timer cleanup** — Tracks local timer IDs; `onScopeDispose` clears them all
- **toggleMode null safety** — Treats null/invalid mode as `'dark'`, toggles to `'light'` on first call
- **Build portability** — `fileURLToPath(import.meta.url)` + `dirname()` instead of `import.meta.dirname`

#### Medium Priority Fixes

- **RigDialog scroll lock** — Ref-counted via `globalThis` for concurrent dialogs (no longer clobbers)
- **Tailwind CSS size** — Content excludes `*.stories.ts` (19.41 KB → 16.59 KB)
- **RigBadge touch target** — Remove button uses `before:` pseudo-element for 44×44px target
- **RigThemeProvider** — Default text color changed to `text-text-primary`
- **CSS sanitization** — `sanitizeCSSValue` strips `url()`, `expression()`, newlines
- **Color validation** — `isValidColor` validates 0–255 RGB range
- **hexToRgb** — Returns null for NaN results instead of `NaN, NaN, NaN`
- **RigIcon** — Uses `watchEffect` for reactive re-render on prop changes

### Marketing Site (`packages/site`)

New marketing landing page at [hexrig.amulet.ink](https://hexrig.amulet.ink) — demonstrates the system live.

- **5 sections**: Hero, Themes, Components, Tokens, Footer
- **Live theme switching**: Click theme dots or press `T` to cycle, `M` to toggle dark/light
- **All 5 themes rendered**: Each section responds to active theme in real-time
- **Component gallery**: Buttons (6 variants), cards (3 elevations), inputs (3 states), alerts (4 tones), badges, typography
- **Token visualization**: Color swatch grids, motion animation bars, type scale preview
- **Storybook at `/storybook/`**: Cross-linked from nav and footer
- **Google Fonts**: All 17 theme font families loaded
- **Tailwind**: Full token-to-CSS-variable mapping
- **Vite**: Static SPA build to `dist/`
- **Deploy pipeline**: `pnpm build:deploy` — hex → rig → site → storybook → copy storybook into site dist

### Infrastructure

- Added `build:deploy` root script for full deployment pipeline
- Storybook manager config (`.storybook/manager.ts`)
- Netlify deployment configuration
- Updated README with comprehensive documentation
- 147 tests passing (9 suites)

## [0.1.0] — 2026-02-25

### Initial Release

First production-ready milestone of the Amulet Design System.

### Hex — Design Token System

- **5 themes** (hearth, abyss, hollow, keep, cove) × 2 modes (dark, light) = 10 token sets
- **Token namespaces**: surface, text, border, accent, status, focus, syntax, terminal, font, duration, easing
- **CSS generation**: TypeScript → CSS custom properties via `tsup` + `tsx`
- **VS Code themes**: Auto-generated from same token source (10 JSON files)
- **Validation**: WCAG AAA contrast checking (7:1 primary, 4.5:1 secondary, 3:1 UI), 15 contrast pairs per theme/mode
- **Motion/font validation**: Duration format, easing format, font family presence checks
- **Runtime helpers**: `applyTheme()`, `toggleMode()`, `getThemeState()` — SSR-safe with DOM validation
- **CSS sanitization**: All generated values protected against injection
- **Build error handling**: Scripts fail fast with `process.exit(1)`
- **Terminal CSS vars**: Kebab-case (`--terminal-bright-black`)

### Rig — Vue 3 Component Library

#### Components (12)

- `RigThemeProvider` — Theme context via injection, auto scheme resolution
- `RigText` — 7 typography variants, semantic `as` prop
- `RigButton` — 4 variants × 3 tones × 3 sizes, `type="button"` default, loading state with SR text
- `RigInput` — 7 input types, full ARIA labeling
- `RigIcon` — Iconify integration, dev warning for missing labels
- `RigSurface` — 4 elevations, semantic elements
- `RigDivider` — Horizontal/vertical with label slot
- `RigBadge` — 3 variants × 6 tones, removable with focus indicators
- `RigAlert` — 4 tones, dismissible with 44px touch targets
- `RigCard` — 3 elevations, interactive mode with click + keyboard, smart `role` handling
- `RigDialog` — Focus trapping, overflow save/restore, `aria-labelledby`, 44px close button
- `RigToast` — Auto-dismiss, RTL-aware positioning, focus indicators on all buttons

#### Composables (3)

- `useTheme()` + `provideTheme()` — Reactive theme/scheme state with auto system preference
- `useMotion()` — Theme-aware motion values, respects `prefers-reduced-motion`
- `useToast()` + `provideToast()` — SSR-safe notification queue

#### Accessibility

- WCAG 2.1 Level AAA compliance
- 44×44px minimum touch targets on all interactive controls
- Focus indicators (`focus-visible:ring-2`) on every interactive element
- `aria-labelledby`, `aria-describedby`, `aria-busy`, `aria-disabled` throughout
- Dev-mode warnings for accessibility violations
- Semantic HTML via polymorphic `as` prop pattern

### Infrastructure

- **CI/CD**: GitHub Actions workflow — lint, typecheck, test, build (Node 20 + 22)
- **Testing**: 146 tests across 9 suites (Vitest + jsdom), v8 coverage configured
- **Type safety**: `tsc --noEmit` + `vue-tsc --noEmit` clean
- **Formatting**: Prettier + ESLint configured
- **Storybook 8**: 16 stories, theme/scheme toolbar, `@storybook/addon-a11y`
- **License**: MIT
- **Security**: `pnpm.overrides` for known CVEs, CSS value sanitization
