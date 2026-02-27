# Changelog

All notable changes to this project will be documented in this file.

## [0.6.1] — 2026-02-26

### Changed — Rainbow Enhancement & Neutral Separation

Refined the spectral display to read as a clear rainbow, and made neutral themes visually distinct.

#### Display changes

- **Abyss** display dot in the site hero/theme strip now shows electric blue (`#4080f0`) instead of the theme's lime-green accent — completes the R→G→Y→C→B→M rainbow sequence. The actual theme accent remains lime-green (`#aef66d`).
- Hero theme strip now has a **vertical divider** separating the 6 Spectrum dots from the 3 Neutral dots.
- Themes section split into two labeled groups: **Spectrum** (6 cards, up to 6-column grid) and **Neutrals** (3 cards, 3-column grid), each with a labeled divider.
- Fixed "Ten themes" → "Nine themes" in hero and themes section copy.

#### Neutral accent desaturation

- **Keep** accent: `#ff8f2e` (vivid orange, S 100%) → `#b89070` (warm bronze, S 34%) — no longer competes with chromatic Spectrum themes on the color wheel.
- **Slate** accent: `#6090d0` (medium blue, S 55%) → `#8090a0` (cool steel, S 14%) — no longer overlaps with Abyss's spectral position.
- All related tokens updated (secondary, hover, active, focus, syntax function/operator/type) in both dark and light modes.

## [0.6.0] — 2026-02-26

### Changed — Spectral Theme Reorganization

Complete reorganization of the Origins theme collection from 10 themes in two series (Environments + Materials) to **9 themes in spectral order** — six chromatic hues at ~60° intervals around the color wheel plus three neutrals.

#### Spectrum (chromatic)

| Theme      | Hue   | Role                                  |
| ---------- | ----- | ------------------------------------- |
| **Ember**  | ~10°  | True red — intensity and urgency      |
| **Hearth** | ~45°  | Gold — craft and warmth               |
| **Grove**  | ~120° | Green — organic persistence           |
| **Reef**   | ~180° | Cyan — clarity and transparency (NEW) |
| **Abyss**  | ~230° | Deep blue — cold cosmos (unchanged)   |
| **Cove**   | ~280° | Purple — warm shelter (unchanged)     |

#### Neutrals

| Theme     | Bias | Role                                 |
| --------- | ---- | ------------------------------------ |
| **Linen** | Warm | Understated professional (unchanged) |
| **Keep**  | Pure | Structural precision (unchanged)     |
| **Slate** | Cool | Blue-grey monochrome (tinted)        |

### Added

- **Reef theme** — new ~180° Cyan/Teal spectral position. DM Sans + Libre Franklin + Fira Code. Clear, transparent, trustworthy.

### Removed

- **Glyph theme** — retired (Inscription / IM Fell English)
- **Cairn theme** — retired (Accumulation / Libre Franklin)

### Updated

- **Ember** — accent shifted from orange-red `#e84820` to true red `#e04030`; surfaces deepened; narrative rewritten for spectral identity
- **Hearth** — accent shifted from bronze `#c9956d` to gold `#d4a840`; surface hue moved from ~25° brown to ~45° amber
- **Slate** — surfaces shifted from pure achromatic to cool blue-grey tinted (~220°)
- **Grove** — narrative and JSDoc updated for spectral system; palette unchanged
- **Linen** — narrative updated for warm neutral identity; palette unchanged
- All infrastructure: themes index, barrel exports, tsup config, package.json, Storybook config, Rig stories, Site, test fixtures, documentation

## [0.5.3] — 2026-02-26

### Changed

- **Site ComponentsSection** — replaced hand-coded HTML with 18 real Rig components (Button, Card, Input, Alert, Badge, Tag, Text, Divider, Switch, Checkbox, Tabs, Progress, Spinner, Avatar, Tooltip, Surface)
- **Storybook sidebar** — consolidated 8 categories → 2 (Showcase + Components); Components auto-collapsed
- **Hero install command** — updated to include `@amulet-laboratories/hex-origins`
- **Footer package links** — updated to all 3 packages, pointing to GitHub Packages

### Added

- **Scroll-reveal** — `v-reveal` directive using IntersectionObserver; elements fade and slide up on scroll with staggered delay support
- **Site Row 4** — new section showcasing controls (Switch, Checkbox, Tabs) and feedback (Progress, Spinner, Avatar, Tooltip)

## [0.5.2] — 2026-02-26

### Changed

- **CSS export path fixed** — rig export map updated from `./dist/style.css` to `./dist/rig.css` to match Vite build output
- **Peer dependency ranges** — `workspace:*` replaced with `>=0.5.0` in published peer deps
- **hex-origins dependency type** — hex moved from dependencies to peerDependencies (types-only at runtime)
- **README install guide** — added `.npmrc` registry setup, quick start, Tailwind preset, multi-theme examples
- **GitHub Packages section** — updated for all 3 packages with publish order

## [0.5.1] — 2026-02-25

### Changed (hex 0.5.1)

- **Theme data deduplicated** — theme definitions moved out of `hex/src/themes/` (engine package) into test fixtures; `hex-origins` is now the single source of truth for Origins themes
- **Legacy build scripts removed** — `hex/src/build/` (generate-css, generate-vscode-themes, validate-all) removed; these scripts live in `hex-origins` now
- **Old generated artifacts removed** — `hex/themes/*.json` VSCode theme files removed (generated by `hex-origins`)

### Fixed

- **Vue test warnings eliminated** — `useMotion` and `useToast` tests now run inside `effectScope()` and suppress expected `inject()` warnings
- **`publishConfig` added** to `rig` and `hex-origins` package.json (GitHub Packages registry)
- **`@amulet-laboratories/hex` added as peer dependency** of `rig` — consumers can access hex types and runtime helpers directly

### Added

- **Per-package README.md** — `hex`, `hex-origins`, and `rig` each have install instructions, API overview, and usage examples

## [0.5.0] — 2026-02-25

### Added

- **`hex-origins` package** — themes extracted from `hex` into `@amulet-laboratories/hex-origins` as a separate collection package
- **`HexCollection` type** — named set of themes with id, name, narrative
- **`OriginsThemeId` type** — `'hearth' | 'abyss' | 'hollow' | 'keep' | 'cove'` (narrower than `ThemeId`)
- **`ThemeId` opened to `string`** — engine no longer constrains theme ids; collections define their own literal unions
- **16 new Rig components** — `RigContainer`, `RigStack`, `RigGrid`, `RigSpacer`, `RigSpinner`, `RigSkeleton`, `RigProgress`, `RigTooltip`, `RigTabs`, `RigAccordion`, `RigBreadcrumb`, `RigAvatar`, `RigSelect`, `RigCheckbox`, `RigSwitch`, `RigTag` (28 total)
- **Spacing tokens** — `HexSpacing` (xs through 3xl) added to theme type and CSS generation
- **Shape tokens** — `HexShape` (radius, radiusFull) added to theme type and CSS generation
- **Elevation/shadow tokens** — `HexElevation` (sm, md, lg) per mode
- **Expressive easing** — `motion.easing.expressive` added to all themes
- **Component export test** — validates all 28 components are properly exported
- **Spacing/shape/shadow Tailwind mappings** — `hex-xs`..`hex-3xl`, `rounded-DEFAULT`/`rounded-full`, `shadow-sm`/`shadow-md`/`shadow-lg`

### Changed

- **Hex is now the engine only** — types, validation, CSS/VSCode generation, Tailwind preset
- **Hex-origins is the theme collection** — 5 themes with build scripts for CSS and VSCode theme generation

## [0.4.0] — 2026-02-25

### Added

- **Brand palette in Tailwind preset** — `amulet-dark`, `amulet-bronze`, `amulet-cream`, etc. for non-token use
- **Focus color tokens in Tailwind** — `focus-ring`, `focus-outline` mapped
- **Accent color tokens expanded** — `accent-active`, `accent-muted` added

### Changed

- **Token CSS variable names stabilized** — no `hex-` prefix on CSS vars (e.g. `--surface-base` not `--hex-surface-base`)
- **`useTheme` return type** — uses `Ref<string>` for theme id instead of `Ref<ThemeId>` to support custom collections

## [0.3.0] — 2026-02-25

### Breaking Changes

- **`SchemeId` type removed** — use `ModeId` from `@amulet-laboratories/hex` instead
- **`HEX_SCHEME_ATTR` constant removed** — use `HEX_MODE_ATTR`
- **`RigThemeProvider` prop `scheme` renamed to `mode`**
- **`useTheme` return API renamed** — `scheme` → `mode`, `setScheme` → `setMode`, `toggleScheme` → `toggleMode`

### Added

- **Tailwind preset** — `@amulet-laboratories/hex/tailwind` exports `amuletPreset` for single-source token-to-Tailwind mapping
- **Shared component internals** — extracted `ICON_DISMISS`, `ICON_PATHS`, tone class maps into `shared.ts` to DRY Alert/Toast/Dialog/Badge
- **`ariaLabel` prop on `RigCard`** — interactive cards can now receive an accessible label
- **Status-on-raised contrast validation** — `validateTheme` now checks status colors against `raised` surface (where alerts/toasts render)
- **`useTheme` tests** — composable unit tests for defaults, setters, toggle, auto mode
- **`useMotion` tests** — composable unit tests for fallbacks and reduced-motion
- **`amuletPreset` tests** — validates token structure (surface, text, status, fonts, durations)

### Changed

- **Rig re-exports types from Hex** — `ThemeId` and `ModeId` sourced from `@amulet-laboratories/hex`, no duplication
- **`useMotion` refactored** — extracted `trackedVar()` helper, removed 9 eslint-disable comments
- **`useToast` HMR-safe** — client singleton uses `Symbol.for('hex-toast-client')` instead of module-level variable
- **`RigDialog` scroll lock key** — uses `Symbol.for('rig-scroll-lock')` instead of string key on globalThis
- **`RigAlert` role** — `role="alert"` for error/warning tones, `role="status"` for info/success (proper ARIA semantics)
- **`RigToast` role** — `role="alert"` for error tone, `role="status"` for others
- **`RigIcon` warnings** — dev-only (`import.meta.env.DEV`), stripped from production builds
- **Tailwind configs** — rig and site now use `presets: [amuletPreset]` instead of duplicated theme.extend blocks
- **`tsconfig.json` target** — `ESNext` → `ES2020` per org convention
- **Engines** — `node >= 22`
- **Prettier config** — `.prettierrc` → `prettier.config.js` (org convention)
- **GitHub URLs** — corrected to `Amulet-Laboratories/hexrig.amulet.ink` across all package.json files and site links

### Added (Repo)

- `.nvmrc` (Node 22)
- `CODEOWNERS`
- `CONTRIBUTING.md`
- `SECURITY.md`
- `env.d.ts` for rig package (Vite client types)

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
