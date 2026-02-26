# hexrig.amulet.ink — Copilot Instructions

## Project

The Amulet Design System — Hex (design tokens) + Rig (Vue 3 component library).
A Gesamtkunstwerk for the web.

**Category:** software | **Monorepo:** pnpm workspace (`packages/hex` + `packages/hex-origins` + `packages/rig` + `packages/site`)

## Architecture

```
packages/
├── hex/               # @amulet-laboratories/hex — design token engine
│   ├── src/
│   │   ├── index.ts           # Barrel: types, utils, runtime helpers, Tailwind preset
│   │   ├── tokens/types.ts    # Full token type system
│   │   ├── utils/             # css.ts, validate.ts, vscode.ts
│   │   ├── tailwind/          # Tailwind preset (amuletPreset)
│   │   └── __tests__/         # 7 test suites + fixtures/
│   └── tsup.config.ts         # ESM + CJS + DTS
│
├── hex-origins/       # @amulet-laboratories/hex-origins — theme collection
│   ├── src/
│   │   ├── index.ts           # Barrel: all 9 theme objects + collection + registry
│   │   ├── themes/            # ember, hearth, grove, reef, abyss, cove, linen, keep, slate
│   │   └── build/             # generate-css.ts, generate-vscode-themes.ts
│   ├── themes/                # Generated VS Code theme JSON (18 files)
│   └── tsup.config.ts         # ESM + CJS + DTS, per-theme entry points
│
├── rig/               # @amulet-laboratories/rig — Vue 3 components
│   ├── src/
│   │   ├── index.ts           # Barrel: all components + composables + types
│   │   ├── components/        # 28 Rig* components + Storybook stories
│   │   ├── composables/       # useTheme, useMotion, useToast
│   │   ├── types/index.ts     # All prop + composable interfaces
│   │   ├── stories/           # Meta-stories: KitchenSink, Palette, Typography, EditorPreview
│   │   ├── style.css          # @tailwind base/components/utilities
│   │   └── __tests__/         # 5 test suites
│   ├── tailwind.config.ts     # Token-backed CSS variable mappings
│   └── vite.config.ts         # Library build: entry src/index.ts, formats [es, cjs]
│
├── site/              # Marketing site — hexrig.amulet.ink
│   ├── src/
│   │   ├── main.ts            # Entry: imports all 9 Hex theme CSS files
│   │   ├── App.vue            # Root: theme/mode state, keyboard shortcuts
│   │   ├── style.css          # Tailwind directives, base styles
│   │   └── sections/          # Hero, Themes, Components, Tokens, Footer
│   └── vite.config.ts
│
└── .storybook/                # Root Storybook config (port 6006)
```

### Hex — Design Token Engine

- Collection-agnostic engine: type system, validation, CSS generation, runtime helpers, Tailwind preset
- `ThemeId` is `string` — any collection can define its own narrower union
- No themes live in hex itself; themes are in collection packages (e.g., hex-origins)

### Hex Origins — Theme Collection

- 9 themes: `ember`, `hearth`, `grove`, `reef`, `abyss`, `cove`, `linen`, `keep`, `slate`
- Six chromatic hues at ~60° intervals (Spectrum) + three neutrals (warm/pure/cool)
- Each theme has `dark` + `light` mode (18 CSS blocks)
- Applied via `data-theme="hearth"` and `data-mode="dark"` attributes
- Token generation: TypeScript → CSS custom properties via `tsup` + `tsx`
- Also generates VS Code themes from the same token source

**Token namespace groups:**
| Namespace    | Keys                                              |
| ------------ | ------------------------------------------------- |
| `surface`    | base, raised, elevated, sunken, overlay           |
| `text`       | primary, secondary, muted, inverse, link, on-accent |
| `border`     | DEFAULT, subtle, strong                           |
| `accent`     | DEFAULT, secondary, hover, active, muted          |
| `status`     | success, warning, error, info                     |
| `focus`      | ring, outline                                     |

**Type system** (`tokens/types.ts`):
- `ThemeId`: `string` (engine is collection-agnostic)
- `OriginsThemeId`: `'ember' | 'hearth' | 'grove' | 'reef' | 'abyss' | 'cove' | 'linen' | 'keep' | 'slate'`
- `ModeId`: `'dark' | 'light'`
- `HexTheme`: id + name + narrative + motion + fonts + dark + light
- `HexModeTokens`: surfaces + text + borders + accents + status + focus + syntax + terminal
- `HexMotion`: duration (fast/normal/slow) + easing (default/entrance/exit)
- `HexFonts`: display/body/sans/mono font definitions

**Runtime helpers** (exported from `@amulet-laboratories/hex`):
- `applyTheme(element, theme, mode)` — sets data attributes
- `toggleMode(element)` — flips dark ↔ light
- `getThemeState(element)` — reads current theme + mode from DOM

**Exports:**
- `@amulet-laboratories/hex` — types, utils, runtime helpers
- `@amulet-laboratories/hex/tailwind` — Tailwind preset (`amuletPreset`)
- `@amulet-laboratories/hex-origins` — all themes, registry, collection
- `@amulet-laboratories/hex-origins/themes/*.css` — per-theme CSS files
- `@amulet-laboratories/hex-origins/themes/*` — per-theme JS/TS modules

### Rig — Component Library

28 components, all WCAG AAA, `Rig` prefix:

| Component         | Key Features                                      |
| ----------------- | ------------------------------------------------- |
| `RigAlert`        | 4 tones, dismissible, icon slot                   |
| `RigBadge`        | solid/soft/outline × tone, dot indicator, removable |
| `RigButton`       | solid/outline/ghost/link × accent/neutral/danger, 3 sizes, loading, polymorphic `as` |
| `RigCard`         | flat/raised/prominent elevation, interactive mode, polymorphic |
| `RigDialog`       | Focus trapping, Esc close, 3 sizes, persistent mode |
| `RigDivider`      | Horizontal/vertical, label slot                   |
| `RigIcon`         | Iconify integration, xs–xl sizes, decorative mode |
| `RigInput`        | 7 input types, label/description/error, full ARIA |
| `RigSurface`      | Semantic element `as`, 4 elevations, border/padding/rounded |
| `RigText`         | display/heading/subheading/body/caption/overline/mono variants, semantic `as` |
| `RigThemeProvider` | Wraps content with theme via `data-theme`/`data-mode` |
| `RigToast`        | Timed auto-dismiss, action slot, tone support     |

**Exports:**
- `@amulet-laboratories/rig` — all components + composables + types
- `@amulet-laboratories/rig/style.css` — compiled Tailwind styles

## Composables

| Composable      | Export                          | Return Type          |
| --------------- | ------------------------------- | -------------------- |
| `useTheme()`    | `useTheme`                      | `UseThemeReturn`     |
| `useMotion()`   | `useMotion`                     | `UseMotionReturn`    |
| `useToast()`    | `useToast`, `provideToast`      | `UseToastReturn`     |

**Pattern:** inject-or-create — `use{Feature}()` tries `inject()` first, falls back to local state.
Providers installed at app root via `provide{Feature}()`. Cleanup via `onScopeDispose`.

**`UseThemeReturn`:** `theme` Ref, `scheme` Ref, `setTheme()`, `setScheme()`, `toggleScheme()`
**`UseMotionReturn`:** `duration` ComputedRef, `durationSlow` ComputedRef, `easing` ComputedRef, `prefersReducedMotion` Ref
**`UseToastReturn`:** `show()`, `dismiss()`, `dismissAll()`, `toasts` Readonly Ref

## Tailwind Token Mapping

Rig's `tailwind.config.ts` maps CSS variables to Tailwind classes:

```typescript
colors: {
  surface: { base: 'var(--surface-base)', raised: 'var(--surface-raised)', /* ... */ },
  text: { primary: 'var(--text-primary)', secondary: 'var(--text-secondary)', /* ... */ },
  border: { DEFAULT: 'var(--border-default)', subtle: 'var(--border-subtle)', strong: 'var(--border-strong)' },
  accent: { DEFAULT: 'var(--accent-primary)', hover: 'var(--accent-hover)', /* ... */ },
  status: { success: 'var(--status-success)', warning: 'var(--status-warning)', /* ... */ },
  focus: { ring: 'var(--focus-ring)' },
},
fontFamily: { display: 'var(--font-display)', body: 'var(--font-body)', /* ... */ },
transitionDuration: { fast: 'var(--duration-fast)', normal: 'var(--duration-normal)', slow: 'var(--duration-slow)' },
transitionTimingFunction: { standard: 'var(--easing-default)', entrance: 'var(--easing-entrance)', exit: 'var(--easing-exit)' },
```

Usage: `bg-surface-base`, `text-text-primary`, `border-border-subtle`, `duration-fast`, `ease-standard`.

## Storybook

Root-level config at `.storybook/`:
- Framework: `@storybook/vue3-vite` on port 6006
- Stories from `packages/rig/src/**/*.stories.ts`
- Theme/scheme toolbar selectors (9 themes × 2 modes)
- Default: `hearth` theme, `dark` mode
- 4 meta-stories: EditorPreview, KitchenSink, Palette, Typography

## Accessibility — Non-Negotiable

- WCAG 2.1 Level AAA compliance
- 7:1 color contrast ratio (validated per theme × mode)
- Full keyboard navigation + focus trapping (RigDialog)
- `prefers-reduced-motion` respected via `useMotion()` composable
- 44×44px minimum touch targets
- Semantic HTML elements via polymorphic `as` prop pattern

## Commands

```bash
pnpm dev              # Watch mode (both packages)
pnpm build            # Full build (both packages)
pnpm test             # Vitest run
pnpm typecheck        # vue-tsc --noEmit (both packages)
pnpm lint             # ESLint packages/
pnpm format           # Prettier --write .
pnpm storybook        # Storybook dev on port 6006
pnpm build:storybook  # Static Storybook build
```

### Hex-specific
```bash
cd packages/hex
pnpm build            # tsup + generate CSS + VS Code themes
pnpm build:css        # Generate CSS custom properties only
pnpm build:vscode     # Generate VS Code themes only
pnpm validate         # Validate all themes
```

## Build

- **Hex**: `tsup` → ESM + CJS + DTS (engine only, no themes)
- **Hex Origins**: `tsup` with per-theme entry points → ESM + CJS + DTS + generated CSS + VS Code JSON
- **Rig**: `vite build` in library mode → ESM + CJS, CSS bundled
- **Site**: `vite build` → static SPA
- External: `vue`, `@iconify/vue` (peer deps)
- Package scope: `@amulet-laboratories/hex`, `@amulet-laboratories/hex-origins`, `@amulet-laboratories/rig`
