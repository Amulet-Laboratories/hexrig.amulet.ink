# Hex + Rig

> A Gesamtkunstwerk for the web — by Amulet Laboratories.

**[hexrig.amulet.ink](https://hexrig.amulet.ink)** · **[Storybook](https://hexrig.amulet.ink/storybook/)** · **[npm: hex](https://www.npmjs.com/package/@amulet-laboratories/hex)** · **[npm: rig](https://www.npmjs.com/package/@amulet-laboratories/rig)**

---

**Hex** (`@amulet-laboratories/hex`) — Five-theme design token system. VS Code themes + CSS custom properties + TypeScript types.

**Rig** (`@amulet-laboratories/rig`) — Production-grade Vue 3 component library consuming Hex tokens via Tailwind CSS.

## Install

```bash
pnpm add @amulet-laboratories/hex @amulet-laboratories/rig
```

```vue
<script setup>
import { RigThemeProvider, RigButton, RigCard } from '@amulet-laboratories/rig'
import '@amulet-laboratories/rig/style.css'
import '@amulet-laboratories/hex/themes/hearth.css'
</script>

<template>
  <RigThemeProvider theme="hearth" scheme="dark">
    <RigCard elevation="raised" interactive @activate="handleClick">
      <RigButton variant="solid" tone="accent">Click me</RigButton>
    </RigCard>
  </RigThemeProvider>
</template>
```

## The Five Worlds

| Theme      | World         | Accent    | Display Font       | Character                                      |
| ---------- | ------------- | --------- | ------------------ | ---------------------------------------------- |
| **Hearth** | Creation      | `#c9956d` | Sorts Mill Goudy   | Raw material shaped by heat and intention      |
| **Abyss**  | Nothingness   | `#aef66d` | League Gothic      | Cold cosmos humming with latent energy         |
| **Hollow** | Growth        | `#40b8a0` | Fraunces           | Organic persistence, roots finding water       |
| **Keep**   | Construction  | `#ff8f2e` | IBM Plex Serif     | Steel and purpose, industry and discipline     |
| **Cove**   | Shelter       | `#d43050` | Crimson Pro        | Warm, intimate, otherworldly                   |

Each theme ships with **dark** and **light** modes (10 total combinations), applied via `data-theme` and `data-mode` HTML attributes.

## Setup

```bash
pnpm install
pnpm build
```

Requires Node ≥ 20 and pnpm ≥ 9.

## Development

```bash
pnpm dev               # Watch mode (all packages)
pnpm build             # Full build (all packages)
pnpm build:deploy      # Full deploy pipeline (hex → rig → site → storybook)
pnpm test              # Run test suite (Vitest)
pnpm typecheck         # Type-check (all packages)
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
│   └── tsup.config.ts         # ESM + CJS, per-theme entry points
│
├── rig/               # @amulet-laboratories/rig — Vue 3 components
│   ├── src/
│   │   ├── index.ts           # Barrel: all components + composables + types
│   │   ├── components/        # 12 Rig* components + Storybook stories
│   │   ├── composables/       # useTheme, useMotion, useToast
│   │   ├── types/index.ts     # All prop + composable interfaces
│   │   ├── stories/           # Meta-stories: KitchenSink, Palette, Typography, EditorPreview
│   │   └── __tests__/         # 3 test suites
│   ├── tailwind.config.ts     # Token-to-CSS-variable mapping
│   └── vite.config.ts         # Library build, vite-plugin-dts
│
├── site/              # Marketing site — hexrig.amulet.ink
│   ├── src/
│   │   ├── main.ts            # Entry: imports all 5 Hex theme CSS files
│   │   ├── App.vue            # Root: theme/mode state, keyboard shortcuts
│   │   ├── style.css          # Tailwind directives, base styles
│   │   └── sections/          # 5 sections (see below)
│   ├── tailwind.config.ts     # Full token-to-CSS-variable mapping
│   └── vite.config.ts
│
└── .storybook/                # Root Storybook config (port 6006)
```

### Marketing Site (`packages/site`)

The site at [hexrig.amulet.ink](https://hexrig.amulet.ink) demonstrates the design system live — almost no copy, everything is shown working.

| Section              | Purpose                                                          |
| -------------------- | ---------------------------------------------------------------- |
| **Hero**             | Full-screen intro, animated theme word, install command, theme dot selector |
| **Themes**           | 5-column grid of dark/light preview cards for each theme         |
| **Components**       | Live-styled buttons, cards, inputs, alerts, badges, typography   |
| **Tokens**           | Color swatch grid, motion animation bars, typography preview     |
| **Footer**           | Package links, Storybook link, tech badges                       |

**Keyboard shortcuts:** `T` cycles themes, `M` toggles dark/light.

Storybook is served at `/storybook/` and cross-linked from the nav and footer.

## Components

12 components, all WCAG AAA, `Rig` prefix:

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
| `RigDialog`         | Focus trapping, Esc close, ref-counted scroll lock, 3 sizes        |
| `RigToast`          | Timed auto-dismiss, action slot, tone support, theme-aware teleport |

## Composables

| Composable     | Purpose                                                          |
| -------------- | ---------------------------------------------------------------- |
| `useTheme()`   | Read/write active theme + scheme, `auto` resolves system pref, explicit override tracking |
| `useMotion()`  | Theme-aware motion values, respects `prefers-reduced-motion`, observes closest `[data-theme]` |
| `useToast()`   | Notification queue with auto-dismiss, SSR-safe, timer cleanup on scope dispose |

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

## Tailwind Integration

Rig and Site map CSS variables to Tailwind classes via `tailwind.config.ts`:

```
bg-surface-base        → var(--surface-base)
text-text-primary      → var(--text-primary)
border-border-subtle   → var(--border-subtle)
bg-accent              → var(--accent-primary)
bg-status-success      → var(--status-success)
font-display           → var(--font-display)
duration-fast          → var(--duration-fast)
ease-standard          → var(--easing-default)
rounded-theme          → var(--radius-theme, 8px)
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

- **147 tests** passing across 9 test suites (Vitest + jsdom)
- **Full type safety** — `vue-tsc --noEmit` and `tsc --noEmit` clean, rolled-up `.d.ts` declarations
- **SSR-safe** — runtime helpers and composables guard against missing `document`/`window`
- **Tree-shakable** — `sideEffects: false` (hex), `sideEffects: ["**/*.css"]` (rig)
- **Build validation** — build scripts fail fast with `process.exit(1)` on errors
- **CSS injection prevention** — all generated CSS values sanitized (`url()`, `expression()`, newlines stripped)
- **CI/CD** — GitHub Actions workflow: lint → typecheck → test → build (Node 20 + 22)
- **Prettier + ESLint** — consistent code formatting and linting
- **Coverage** — Vitest v8 coverage provider configured

## Deployment

The marketing site deploys to [hexrig.amulet.ink](https://hexrig.amulet.ink) via Netlify.

```bash
pnpm build:deploy   # hex → rig → site → storybook → copies storybook into site/dist/storybook/
```

The deploy output is `packages/site/dist/` — a static directory containing:
- `/` — The marketing landing page (Vue 3 SPA)
- `/storybook/` — Full Storybook with all 12 components + meta-stories

### Netlify Configuration

Build command: `pnpm build:deploy`
Publish directory: `packages/site/dist`

## Design Documentation

See [docs/](docs/) for the living design prompts, manifesto, and reference library.

## License

[MIT](LICENSE) — Amulet Laboratories
