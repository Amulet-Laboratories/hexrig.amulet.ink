# hexrig.amulet.ink — Copilot Instructions

## Project

The Amulet Design System — Hex (design tokens) + Rig (Vue 3 component library).
A Gesamtkunstwerk for the web.

**Category:** software | **Monorepo:** pnpm workspace (`packages/hex` + `packages/rig`)

## Architecture

```
packages/
├── hex/               # @amulet-laboratories/hex — design tokens
│   ├── src/
│   │   ├── index.ts           # Barrel: types, themes, utils, runtime helpers
│   │   ├── themes/            # hearth.ts, abyss.ts, cove.ts, glyph.ts, ember.ts, keep.ts, slate.ts, linen.ts, cairn.ts, grove.ts
│   │   ├── tokens/types.ts    # Full token type system (208 lines)
│   │   ├── utils/             # css.ts, validate.ts, vscode.ts
│   │   ├── build/             # generate-css.ts, generate-vscode-themes.ts
│   │   └── __tests__/
│   ├── themes/                # JSON source: {theme}-{dark|light}.json (10 files)
│   └── tsup.config.ts         # ESM + CJS, per-theme entry points
│
├── rig/               # @amulet-laboratories/rig — Vue 3 components
│   ├── src/
│   │   ├── index.ts           # Barrel: all components + composables + types
│   │   ├── components/        # 12 Rig* components + Storybook stories
│   │   ├── composables/       # useTheme, useMotion, useToast
│   │   ├── types/index.ts     # All prop + composable interfaces (172 lines)
│   │   ├── stories/           # Meta-stories: KitchenSink, Palette, Typography, EditorPreview
│   │   ├── style.css          # @tailwind base/components/utilities
│   │   └── __tests__/
│   ├── tailwind.config.ts     # Token-backed CSS variable mappings
│   └── vite.config.ts         # Library build: entry src/index.ts, formats [es, cjs]
│
└── .storybook/                # Root Storybook config (port 6006)
```

### Hex — Design Tokens

- 10 themes: `hearth`, `abyss`, `cove`, `glyph`, `ember`, `keep`, `slate`, `linen`, `cairn`, `grove`
- Each theme has `dark` + `light` mode (20 JSON source files, 20 CSS blocks)
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
- `ThemeId`: `'hearth' | 'abyss' | 'cove' | 'glyph' | 'ember' | 'keep' | 'slate' | 'linen' | 'cairn' | 'grove'`
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
- `@amulet-laboratories/hex` — types, themes, utils, runtime
- `@amulet-laboratories/hex/themes/*.css` — per-theme CSS files
- `@amulet-laboratories/hex/themes/*` — per-theme JS/TS modules

### Rig — Component Library

12 components, all WCAG AAA, `Rig` prefix:

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
- Theme/scheme toolbar selectors (10 themes × 2 modes)
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

- **Hex**: `tsup` with per-theme entry points → ESM + CJS + DTS
- **Rig**: `vite build` in library mode → ESM + CJS, CSS bundled
- External: `vue`, `@iconify/vue` (peer deps)
- Package scope: `@amulet-laboratories/hex`, `@amulet-laboratories/rig`
