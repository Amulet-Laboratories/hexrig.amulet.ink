# Hexrig

> Design system — Hex tokens (9 themes × 2 modes) + Rig Vue 3 component library. WCAG AAA. Published to GitHub Packages.

![Status](https://img.shields.io/badge/status-active-22C55E) ![Category](https://img.shields.io/badge/category-Software%3A%20Platform-F59E0B) ![Hexrig](https://img.shields.io/badge/hexrig-yes%20%E2%9C%93-22C55E)

---

## Identity

| Field | Value |
|-------|-------|
| **ID** | `x-hrg` |
| **Category** | Software: Platform |
| **Status** | Active |
| **Priority** | Critical |
| **Brand** | Amulet Laboratories |
| **Theme** | All 9 (Ember, Hearth, Grove, Reef, Abyss, Cove, Linen, Keep, Slate) |

## Links

| Resource | URL |
|----------|-----|
| **Live** | https://hexrig.amulet.ink |
| **Repo** | https://github.com/Amulet-Laboratories/hexrig.amulet.ink |
| **Obelisk** | tower.amulet.ink |
| **Netlify** | https://app.netlify.com/sites/amulet-hexrig |
| **npm** | https://github.com/orgs/Amulet-Laboratories/packages |

## Purpose

Hexrig is the Amulet Laboratories design system — the single source of visual truth for every project in the ecosystem. It is a pnpm monorepo with four packages: Hex (design token engine), Hex Engine (generative token engine), Hex Origins (9 theme × 2 mode pre-built token data), and Rig (58 Vue 3 UI components + 9 composables). Every component is WCAG AAA compliant, validated across all 18 theme/mode combinations. Published to GitHub Packages under the `@amulet-laboratories` scope.

## Architecture

Four-package monorepo plus a site. Hex provides the token type system, CSS custom property generation, WCAG validation utilities, and a Tailwind preset. Hex Engine is a generative token engine that produces theme data from archetype + weight + attitude + mode parameters (8 archetypes × 3 weights × 4 attitudes × 2 modes = 192 combinations). Hex Origins provides pre-built theme data for nine themes (Ember, Hearth, Grove, Reef, Abyss, Cove, Linen, Keep, Slate) — each with dark and light modes. Rig provides 58 Vue 3 components and 9 composables that consume Hex tokens exclusively via CSS custom properties; no colors or spacing are hardcoded. A fifth package (`packages/site`) hosts the marketing and documentation site at hexrig.amulet.ink, which includes an embedded Storybook at `/storybook/`.

Nine themes span the color spectrum at ~60° intervals plus three neutrals, each with a named personality and paired display font: Ember (industrial urgency, Bungee), Hearth (craft weight, Sorts Mill Goudy), Grove (organic persistence, Libre Baskerville), Reef (shallow water clarity, DM Sans), Abyss (cold cosmos, League Gothic), Cove (intimate warmth, Crimson Pro), Linen (understated professional, Manrope), Keep (structure and purpose, IBM Plex Serif), Slate (cool reduction, Sora).

## Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Vue 3 (Composition API) |
| **Build** | Vite (site), tsup (hex, hex-origins, rig) |
| **Styling** | Tailwind CSS + Hex CSS custom properties |
| **State** | None (library) |
| **Backend** | None |
| **Auth** | None |
| **Database** | None |
| **Email** | None |
| **Payments** | None |
| **Hosting** | GitHub Packages (packages) + Netlify (site) |
| **CI** | GitHub Actions (shared workflow) — lint → typecheck → test → build |

## Ecosystem Position

### Consumes
- None — foundation layer. No Amulet dependencies.

### Consumed By
- **Obelisk** — sole UI library for the dashboard
- **Codex** — theming and components
- **All sites (s-\*)** — theming and components, except s-lab (uses Tailwind only)
- **All engagements (e-\*)** — theming and components, except Greyline (uses Slate theme via Tailwind)
- **Tome** — theming for generated sites (planned)
- **Filigree** — theme personality alignment (planned)

### Related
- **Rune** — Rig will include RigRune component in Tier 4

## Directory Structure

```
hexrig.amulet.ink/
├── packages/
│   ├── hex/               ← @amulet-laboratories/hex — design token engine
│   │   ├── src/
│   │   │   ├── index.ts           ← Barrel: types, utils, runtime helpers, Tailwind preset
│   │   │   ├── tokens/types.ts    ← Full token type system
│   │   │   └── utils/             ← css.ts, validate.ts, vscode.ts
│   │   └── tsup.config.ts
│   ├── hex-engine/        ← @amulet-laboratories/hex-engine — generative token engine
│   │   ├── src/
│   │   │   ├── engine.ts          ← Core generation: archetype × weight × attitude × mode
│   │   │   ├── archetypes/        ← 8 archetypes (industrial, artisan, organic, etc.)
│   │   │   └── systems/           ← color, typography, spacing, motion, shadow, radius
│   │   └── tsup.config.ts
│   ├── hex-origins/       ← @amulet-laboratories/hex-origins — pre-built themes (dist only)
│   │   └── dist/                  ← 9 themes × 2 modes, generated CSS + JS
│   ├── rig/               ← @amulet-laboratories/rig — Vue 3 components
│   │   ├── src/
│   │   │   ├── components/        ← 58 Rig* components + Storybook stories
│   │   │   ├── composables/       ← 9 composables (useTheme, useMotion, useToast, useKeyboard, useClipboard, useLocalStorage, useBreakpoint, useSort, useFilter)
│   │   │   └── types/index.ts
│   │   └── vite.config.ts
│   └── site/              ← hexrig.amulet.ink marketing + docs site
│       └── src/sections/  ← Hero, Themes, Components, Interactive, Tokens, etc.
└── .storybook/            ← Root Storybook config (port 6006)
```

## Development

```bash
# Clone
git clone https://github.com/Amulet-Laboratories/hexrig.amulet.ink.git
cd hexrig.amulet.ink

# Install
pnpm install

# Dev (watch mode, all packages)
pnpm dev

# Build (all packages)
pnpm build

# Full deploy pipeline (hex → rig → site → storybook)
pnpm build:deploy

# Test
pnpm test

# Lint
pnpm lint

# Storybook
pnpm storybook
```

Requires Node ≥ 22 and pnpm ≥ 10. Packages publish to GitHub Packages — configure `.npmrc` with `@amulet-laboratories:registry=https://npm.pkg.github.com` and a `NODE_AUTH_TOKEN` before publishing.

## Configuration

No configuration required for development. For publishing:

```bash
# Publish in dependency order
cd packages/hex && pnpm publish --no-git-checks
cd packages/hex-origins && pnpm publish --no-git-checks
cd packages/rig && pnpm publish --no-git-checks
```

Consuming projects need an `.npmrc`:
```ini
@amulet-laboratories:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

## Changelog

### Unreleased
- Tier 2 components (advanced data display, composables expansion)
- RigRune component (Tier 4)

### v1.0.0 — Active
#### Components (29 shipping)
- General: RigButton, RigIcon, RigText, RigBadge, RigTag, RigAvatar
- Layout: RigSurface, RigCard, RigContainer, RigGrid, RigStack, RigSpacer, RigDivider
- Form: RigInput, RigSelect, RigCheckbox, RigSwitch
- Navigation: RigTabs, RigAccordion, RigBreadcrumb
- Feedback: RigAlert, RigDialog, RigToast, RigProgress, RigSpinner, RigSkeleton, RigTooltip
- Texture: RigNoiseGrain
- Theming: RigThemeProvider
#### Stats
- 472 tests passing (22 suites, Vitest + jsdom)
- 9 themes × 2 modes = 18 validated combinations
- WCAG 2.1 Level AAA throughout
- Full TypeScript declarations, SSR-safe, tree-shakable

## Roadmap

- [x] Tier 1 — Tower (13): RigStatus, RigEmpty, RigAppShell, RigTable, RigStatusBar, RigStatusBarItem, etc.
- [x] Tier 2 — Tower Full (8): RigRadio, RigStat, RigTree, RigSplit, RigTimeline, RigCardGrid, RigPagination, RigMetadata
- [x] Tier 3 — Client Sites (8): RigNavbar, RigHero, RigGallery, RigContactForm, RigTestimonial, RigHoursDisplay, RigPricingTable, RigFooter
- [ ] Tier 4: RigRune (deterministic SVG identity glyph component)
- [ ] VS Code themes published to marketplace
- [ ] Figma token sync

## Design Decisions

### Token-first architecture
**Context:** Components need to support 9 themes × 2 modes without maintaining 18 separate stylesheets.
**Decision:** All visual properties — colors, typography, spacing, motion — are defined as CSS custom properties set by the active theme. Components never hardcode values.
**Reasoning:** Theme switching is instantaneous (swap CSS vars). Any new theme automatically works with all components. Adding a 10th theme requires zero component changes.

### pnpm monorepo with separate packages
**Context:** Design tokens, theme data, and components could all ship as one package or be split.
**Decision:** Three packages with strict dependency order: hex → hex-origins → rig.
**Reasoning:** Consumers can install only what they need. Token engine (hex) has no runtime dependency on Vue. Separating concerns enables independent versioning and publishing.

### GitHub Packages over npm
**Context:** Publishing design system packages to a registry.
**Decision:** GitHub Packages under `@amulet-laboratories` scope, private visibility.
**Reasoning:** Keeps ecosystem tooling co-located with source. Org members authenticate automatically. No separate registry infrastructure.

## License

MIT — Amulet Laboratories

---

*Managed by [Obelisk](https://tower.amulet.ink) · Part of the [Amulet Laboratories](https://amulet.ink) ecosystem*
