# Hex + Rig

> A Gesamtkunstwerk for the web — by Amulet Laboratories.

**Hex** (`@amulet-laboratories/hex`) — Five-theme design token system. VS Code extension + web CSS custom properties + TypeScript.

**Rig** (`@amulet-laboratories/rig`) — Minimal, production-grade Vue 3 component library consuming Hex tokens via Tailwind CSS.

## The Five Worlds

| Theme      | World         | Character                                      |
| ---------- | ------------- | ---------------------------------------------- |
| **Hearth** | Creation      | Raw material shaped by heat and intention      |
| **Abyss**  | Nothingness   | Cold cosmos humming with latent energy         |
| **Hollow** | Growth        | Organic persistence, roots finding water       |
| **Keep**   | Construction  | Steel and purpose, industry and discipline     |
| **Cove**   | Shelter       | Warm, intimate, otherworldly                   |

Each theme ships with **dark** and **light** modes (10 total combinations), applied via `data-theme` and `data-mode` HTML attributes.

## Setup

```bash
pnpm install
pnpm build
```

Requires Node ≥ 20 and pnpm ≥ 9.

## Development

```bash
pnpm dev               # Watch mode (both packages)
pnpm build             # Full build (both packages)
pnpm test              # Run test suite (Vitest)
pnpm typecheck         # Type-check (both packages)
pnpm lint              # ESLint packages/
pnpm format            # Prettier --write .
pnpm storybook         # Storybook dev on port 6006
pnpm build:storybook   # Static Storybook build
```

### Hex-specific

```bash
cd packages/hex
pnpm build:css         # Generate CSS custom properties
pnpm build:vscode      # Generate VS Code themes
pnpm validate          # Validate all themes against WCAG AAA
```

## Architecture

```
packages/
├── hex/               # @amulet-laboratories/hex — design tokens
│   ├── src/
│   │   ├── index.ts           # Barrel: types, themes, utils, runtime helpers
│   │   ├── themes/            # hearth, abyss, hollow, keep, cove
│   │   ├── tokens/types.ts    # Full token type system
│   │   ├── utils/             # css.ts, validate.ts, vscode.ts
│   │   ├── build/             # generate-css.ts, generate-vscode-themes.ts
│   │   └── __tests__/         # 6 test suites
│   └── tsup.config.ts
│
├── rig/               # @amulet-laboratories/rig — Vue 3 components
│   ├── src/
│   │   ├── index.ts           # Barrel: all components + composables + types
│   │   ├── components/        # 12 Rig* components + Storybook stories
│   │   ├── composables/       # useTheme, useMotion, useToast
│   │   ├── types/index.ts     # All prop + composable interfaces
│   │   ├── stories/           # Meta-stories: KitchenSink, Palette, Typography, EditorPreview
│   │   └── __tests__/         # 3 test suites
│   ├── tailwind.config.ts
│   └── vite.config.ts
│
└── .storybook/                # Root Storybook config (port 6006)
```

## Components

| Component           | Key Features                                                       |
| ------------------- | ------------------------------------------------------------------ |
| `RigThemeProvider`  | Wraps content with theme via `data-theme`/`data-mode`, auto scheme |
| `RigText`           | display/heading/subheading/body/caption/overline/mono, semantic `as` |
| `RigButton`         | solid/outline/ghost/link × accent/neutral/danger, 3 sizes, loading, polymorphic |
| `RigInput`          | 7 input types, label/description/error, full ARIA                  |
| `RigIcon`           | Iconify integration, xs–xl sizes, decorative mode, a11y warnings   |
| `RigSurface`        | Semantic element `as`, 4 elevations, border/padding/rounded        |
| `RigDivider`        | Horizontal/vertical, label slot                                   |
| `RigBadge`          | solid/soft/outline × tone, dot indicator, removable                |
| `RigAlert`          | 4 tones, dismissible, icon slot, v-model:visible                   |
| `RigCard`           | flat/raised/prominent elevation, interactive mode with keyboard    |
| `RigDialog`         | Focus trapping, Esc close, overflow save/restore, 3 sizes          |
| `RigToast`          | Timed auto-dismiss, action slot, tone support, RTL-aware           |

## Composables

| Composable     | Purpose                                                          |
| -------------- | ---------------------------------------------------------------- |
| `useTheme()`   | Read/write active theme + scheme, `auto` resolves system pref    |
| `useMotion()`  | Theme-aware motion values, respects `prefers-reduced-motion`     |
| `useToast()`   | Notification queue with auto-dismiss, SSR-safe                   |

Provider pattern: `provideTheme()` and `provideToast()` at app root; composables inject or create local state.

## Token Namespaces

| Namespace   | CSS Custom Properties                                           |
| ----------- | --------------------------------------------------------------- |
| `surface`   | `--surface-base`, `--surface-raised`, `--surface-elevated`, `--surface-sunken`, `--surface-overlay` |
| `text`      | `--text-primary`, `--text-secondary`, `--text-muted`, `--text-inverse`, `--text-link`, `--text-on-accent` |
| `border`    | `--border-default`, `--border-subtle`, `--border-strong`        |
| `accent`    | `--accent-primary`, `--accent-secondary`, `--accent-hover`, `--accent-active`, `--accent-muted` |
| `status`    | `--status-success`, `--status-warning`, `--status-error`, `--status-info` |
| `focus`     | `--focus-ring`, `--focus-outline`                                |
| `syntax`    | 9 editor syntax tokens                                          |
| `terminal`  | 16 terminal colors (kebab-case: `--terminal-bright-black`, etc.) |
| `font`      | `--font-display`, `--font-body`, `--font-sans`, `--font-mono`  |
| `duration`  | `--duration-fast`, `--duration-normal`, `--duration-slow`       |
| `easing`    | `--easing-default`, `--easing-entrance`, `--easing-exit`        |

## Usage

```vue
<script setup>
import { RigThemeProvider, RigButton, RigCard } from '@amulet-laboratories/rig'
import '@amulet-laboratories/rig/style.css'
</script>

<template>
  <RigThemeProvider theme="hearth" scheme="dark">
    <RigCard elevation="raised" interactive @activate="handleClick">
      <RigButton variant="solid" tone="accent">Click me</RigButton>
    </RigCard>
  </RigThemeProvider>
</template>
```

## Accessibility

- **WCAG 2.1 Level AAA** — 7:1 contrast for primary text, 4.5:1 for secondary, 3:1 for UI
- Validated across all 5 themes × 2 modes (10 combinations, 15 contrast pairs each)
- Full keyboard navigation + focus trapping (`RigDialog`)
- `prefers-reduced-motion` respected via `useMotion()` composable
- 44×44px minimum touch targets on all interactive controls
- Semantic HTML via polymorphic `as` prop pattern
- `aria-labelledby`, `aria-describedby`, `aria-busy`, `aria-disabled` throughout
- Dev-mode warnings for accessibility violations (`RigIcon` missing labels)

## Production Readiness

- **146 tests** passing across 9 test suites (Vitest + jsdom)
- **Full type safety** — `vue-tsc --noEmit` and `tsc --noEmit` clean
- **SSR-safe** — runtime helpers and composables guard against missing `document`/`window`
- **Build validation** — build scripts fail fast with `process.exit(1)` on errors
- **CSS injection prevention** — all generated CSS values sanitized
- **CI/CD** — GitHub Actions workflow: lint → typecheck → test → build (Node 20 + 22)
- **Prettier + ESLint** — consistent code formatting and linting
- **Coverage** — Vitest v8 coverage provider configured

## Design Documentation

See [docs/](docs/) for the living design prompts, manifesto, and reference library.

## License

[MIT](LICENSE) — Amulet Laboratories
