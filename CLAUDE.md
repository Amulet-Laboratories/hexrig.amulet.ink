# hexrig.amulet.ink — AI Context

Design system monorepo. Hex token engine, Hex Origins theme collection, Rig Vue 3 component library, and documentation site. Published to GitHub Packages. WCAG AAA compliant, 699 tests.

- **ID:** x-hrg
- **Category:** software (design system)
- **URL:** https://hexrig.amulet.ink
- **Deploy:** Netlify, auto from `main` — deploys `packages/site` with Storybook at `/storybook`

## Monorepo Structure

pnpm workspace (`pnpm-workspace.yaml: packages/*`):

```
packages/
├── hex/          @amulet-laboratories/hex v2.0.0         (published — GitHub Packages)
├── hex-origins/  @amulet-laboratories/hex-origins v2.0.0  (published — GitHub Packages)
├── rig/          @amulet-laboratories/rig v2.1.0          (published — GitHub Packages)
└── site/         @amulet-laboratories/site               (private — docs + Storybook)
```

## Package Details

### `packages/hex` — Design Token Engine

Token system, CSS custom property generation, validation, and Tailwind preset.

- **Build:** `tsup` — CJS + ESM + `.d.ts`
- **Exports:** `.` (token API) and `./tailwind` (`amuletPreset`)
- **No runtime deps** — pure TypeScript
- **Source:** `src/tokens/`, `src/tailwind/`, `src/utils/`, `src/__tests__/`

### `packages/hex-origins` — Theme Collection

9 themes × 2 modes = 18 variants. Themes in spectral order: `abyss`, `cove`, `ember`, `grove`, `hearth`, `keep`, `linen`, `reef`, `slate`.

- **Build:** `tsup` + `build:css` (CSS vars per theme) + `build:vscode` (VS Code themes)
- **Exports:** `.` (token API), `./themes/*.css`, `./themes/*` (individual theme modules)
- **Peer:** `@amulet-laboratories/hex >=2.0.0`
- **Scripts:** `validate` — runs `src/build/validate-all.ts` to check theme integrity
- **Source themes:** `src/themes/` (JSON) → `dist/themes/` (CSS + JS)

### `packages/rig` — Vue 3 Component Library

48 accessible components and 9 composables consuming Hex tokens via Tailwind CSS.

- **Build:** `vite` in library mode + `vite-plugin-dts`
- **Exports:** `.` (components + composables) and `./style.css`
- **Peers:** `@amulet-laboratories/hex >=2.0.0`, `@iconify/vue ^5.0.0`, `vue ^3.5.0`
- **Source:** `src/components/`, `src/composables/`, `src/stories/`, `src/types/`
- **Component prefix:** `Rig` — e.g., `RigButton`, `RigInput`, `RigThemeProvider`
- **`RigButton` tones:** `'accent' | 'neutral' | 'danger'` — never `'primary'`
- **`RigInput`:** does **not** forward `name` to inner `<input>` — use raw `<input>` for Netlify forms
- **`RigThemeProvider`:** required wrapper — all token-driven components depend on it. Supports `as` prop (default `'div'`) for semantic root element.
- **Brand components** (RigMakerStamp, RigOrnament, RigNotifyForm, RigSiteFooter) live in `packages/site/src/components/`, not in the published rig package.

### `packages/site` — Documentation Site

Private Vite + Vue 3 app consuming all three published packages. Deployed to Netlify with Storybook built alongside at `/storybook`.

## Storybook

Stories live in `packages/rig/src/stories/`. Config in `.storybook/`:

```bash
pnpm storybook         # dev server at port 6006
pnpm build:storybook   # build to storybook-static/
```

`build:deploy` copies `storybook-static/` into `packages/site/dist/storybook`.

## npm Scripts (Root)

```bash
pnpm build           # build all packages in dependency order (-r)
pnpm build:deploy    # full deploy: hex → origins → rig → site → storybook (copies to site/dist)
pnpm dev             # dev all packages in parallel (-r --parallel)
pnpm lint            # eslint packages/
pnpm format          # prettier --write .
pnpm test            # vitest run (699 tests)
pnpm test:watch      # vitest
pnpm type-check      # pnpm -r typecheck
pnpm storybook       # storybook dev -p 6006
pnpm clean           # rm -rf storybook-static node_modules packages/*/dist packages/*/node_modules
```

## Publishing

All three libraries publish to GitHub Packages at `npm.pkg.github.com`. Use the **GitHub Actions `Publish` workflow** (`workflow_dispatch`) — do not publish locally.

Consuming repos need:

```
# .npmrc
@amulet-laboratories:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

Auth layers:

- **Local dev:** `~/.npmrc` with a personal access token
- **CI:** per-repo `PKG_READ_TOKEN` secret → `NODE_AUTH_TOKEN` env var
- **Netlify:** `NODE_AUTH_TOKEN` secret env var

`GITHUB_TOKEN` cannot read packages from other repos — always use `PKG_READ_TOKEN`.

## Consumed By

Sites: `s-ink`, `s-lab`, `s-pub`, `s-wrk`, `s-stu`, `s-int`, `s-org`, `s-prt`
Engagements: `e-apc`, `e-htl`, `e-cfe`, `e-thr`, `e-mmj`
Software: `x-cod` (rig at runtime), `x-run` (rig + hex in dev)

---

## v2.0.0 Breaking Changes

These changes affect all 14 consuming repos. Review each before upgrading.

### 1. `useTheme` API renamed

```ts
// v1 (broken in v2)
const { theme, scheme, setScheme, toggleScheme } = useTheme()

// v2 (correct)
const { theme, mode, setMode, toggleMode, resetToAuto } = useTheme()
```

Most consuming repos do **not** call `useTheme()` directly — they use `data-theme`/`data-mode` HTML attributes or `RigThemeProvider` props, which are unaffected. Only repos that call `useTheme()` in their own composables need this change.

### 2. Brand components removed from `@amulet-laboratories/rig`

`RigMakerStamp`, `RigOrnament`, `RigNotifyForm`, `RigSiteFooter` are no longer exported from the rig package. These were internal site components and should not appear in any consuming repo. Verify:

```bash
grep -r "RigMakerStamp\|RigOrnament\|RigNotifyForm\|RigSiteFooter" src/
```

### 3. `RigThemeProvider` `mode` prop (was `scheme`)

Template usage: `scheme="dark"` becomes `mode="dark"`. `mode="auto"` (the default) follows OS preference.

---

## v2.1.0 Changes (Rig only)

Non-breaking component transition and animation improvements. Hex and Hex Origins unchanged.

### Component transitions added

- **RigAccordion:** Smooth expand/collapse via CSS `grid-template-rows: 0fr → 1fr` transition with opacity fade. Uses `aria-hidden` instead of `hidden` attribute.
- **RigTabs:** Cross-fade panel transition via `<Transition mode="out-in">`. Only the active panel renders in the DOM (keyed by `activeTab`). **Note:** tab panel content remounts on switch — consumers relying on panel state persistence should use external state.
- **RigDialog:** Dialog panel now scales up from 95% + slides from `translate-y-3` on open. Nested `<Transition appear>` inside the backdrop transition.
- **RigButton:** Press feedback `active:scale-[0.97]` on solid/outline/ghost variants. Transition scope broadened to include `transform` and `opacity`.
- **RigCard:** Interactive cards get `hover:-translate-y-0.5` lift and `active:translate-y-0` press. Transition scope broadened to include `transform`.
- **RigTooltip:** Scale entrance `scale-95 → scale-100` alongside existing opacity transition.

### Consumer impact

These are additive/visual-only changes **except** for RigTabs panel lifecycle. Previously all panels stayed mounted with `hidden`; now only the active panel is in the DOM. If a consumer stores form state inside a tab panel without lifting it to a parent, that state will reset on tab switch. Workaround: lift state to the parent component or use `v-model` with external refs.

---

## v2.2.0 Changes (Rig only)

Non-breaking addition of 19 components and 6 composables. Rig grows from 29 to 48 components and from 3 to 9 composables. Hex and Hex Origins unchanged.

### Tier 1 — Tower baseline (11 components)

- **RigStatus** — Status indicator with colored dot, pulse animation, and label
- **RigEmpty** — Empty state placeholder with icon, title, description, and action button
- **RigConfirm** — Preconfigured confirmation dialog with tone-matched actions
- **RigHeader** — Sticky navigation header with leading/title/center/trailing slots
- **RigPage** — Page container with title, description, actions, and max-width control
- **RigPanel** — Collapsible container with title, description, actions, and footer
- **RigSidebar** — Vertical navigation sidebar with collapsed state and smooth width transition
- **RigSidebarSection** — Grouping container within RigSidebar
- **RigSidebarItem** — Clickable navigation item within RigSidebarSection
- **RigAppShell** — Complete app layout shell combining header, sidebar, main, and footer
- **RigTable** — Full-featured data table with sorting, selection, expansion, and loading states

### Tier 2 — Tower full experience (8 components)

- **RigRadio** — Radio button group with vertical/horizontal layout
- **RigStat** — Statistic display with trend indicator and icon
- **RigMetadata** — Definition list with badge, status, and link type rendering
- **RigList** — Item list with icons, descriptions, and action slots
- **RigTimeline** — Vertical/horizontal timeline with tone-colored dots
- **RigTree** — Recursive tree view with keyboard navigation and ARIA tree roles
- **RigSplit** — Resizable two-pane splitter with pointer events
- **RigFooter** — Footer component with optional border

### New composables (6)

- **useKeyboard** — Global keyboard shortcut registration with mod key normalization
- **useClipboard** — Clipboard API wrapper with copied feedback state
- **useLocalStorage** — Reactive localStorage with cross-tab sync via storage events
- **useBreakpoint** — Reactive Tailwind breakpoint tracking via matchMedia
- **useSort** — Reactive array sorting by key and direction
- **useFilter** — Reactive array filtering with text search and debounce

### Consumer impact

Purely additive — no breaking changes. All new components and composables are opt-in imports.

---

## Pending Work — Consuming Repo Migration to v2.0.0

**Status: v2.0.0 published to GitHub Packages. All 14 consuming repos still on v1.0.0.**

When upgrading a consuming repo, follow this checklist in order:

```bash
# 1. Update package.json dependencies
#    "@amulet-laboratories/hex": "^2.0.0"         (if used directly)
#    "@amulet-laboratories/hex-origins": "^2.0.0" (if used directly)
#    "@amulet-laboratories/rig": "^2.0.0"

# 2. Search for v1 useTheme API usage
grep -r "scheme\|setScheme\|toggleScheme" src/

# 3. Search for removed brand component imports (should be zero in any consumer)
grep -r "RigMakerStamp\|RigOrnament\|RigNotifyForm\|RigSiteFooter" src/

# 4. Install
pnpm install

# 5. Verify
pnpm type-check && pnpm build && pnpm test
```

### Repo-specific notes

- **`s-ink` (amulet.ink):** Main marketing site. Uses `RigThemeProvider`, `RigButton`, `RigInput`. No direct `useTheme()` usage expected. Straightforward bump.
- **`s-lab`, `s-pub`, `s-wrk`, `s-stu`, `s-int`, `s-org`, `s-prt`:** Standard Amulet sites. All use `RigThemeProvider` wrapper pattern. Check for any direct `useTheme()` calls.
- **`e-apc` (AndrewPassanisi.com), `e-htl`, `e-cfe`, `e-thr`, `e-mmj`:** Engagement repos. May use `useTheme()` for dynamic dark/light switching — audit carefully.
- **`x-cod` (codex):** Uses rig at runtime. Verify no brand component imports.
- **`x-run` (rune):** Uses rig + hex in dev. Confirm `tailwind.config.ts` still imports `amuletPreset` from `@amulet-laboratories/hex/tailwind`.

---

## Pending Work — Deferred Technical Items

### RigTooltip — Floating UI rewrite (planned for v3)

**Problem:** RigTooltip uses CSS absolute positioning relative to its inline wrapper. It clips inside `overflow:hidden` containers and cannot auto-flip at viewport edges. The `TooltipOverflow` story in `Feedback.stories.ts` documents this limitation.

**Solution:** Replace internals with `@floating-ui/vue`:

- Add `@floating-ui/vue` to rig's peerDependencies
- Remove the `placementClasses` map — Floating UI computes position via JS
- Use `Teleport to="body"` for the tooltip element (eliminates overflow clipping)
- `useFloating({ placement, middleware: [flip(), shift()] })` in script setup
- Update `RigTooltip.test.ts` — position is now JS-computed, not CSS classes
- This is a breaking change (tooltip positioning behaviour changes); target v3.0.0

### Nuxt module (separate repo)

**Goal:** `@amulet-laboratories/rig-nuxt` — zero-config Nuxt 3 auto-import of Rig components.

- Create new repo (e.g., `nuxt.amulet.ink`)
- Use `@nuxt/kit` to create a Nuxt module that auto-imports all Rig\* components
- Handle CSS imports (theme CSS + rig/style.css) via Nuxt's CSS array
- Document in `GettingStarted.stories.ts` once published

### Storybook / site deploy decoupling

**Problem:** Storybook builds as part of the site deploy (`build:deploy`). Currently served at `hexrig.amulet.ink/storybook` rather than its own subdomain.

**Fix:** Requires Netlify config access to set up a second site or branch deploy. No code changes needed in this repo — purely infrastructure.

### Coverage gaps (optional, not blocking)

Several layout/presentational components have 0% test coverage: `RigContainer`, `RigGrid`, `RigStack`, `RigSpacer`, `RigSurface`, `RigText`, `RigIcon`, `RigTag`, `RigProgress`, `RigSkeleton`, `RigDivider`. Addressing them would raise overall coverage from ~71% to ~85%+.

---

## References

- Design system docs → `i-core/vault/09-Reference/design-system.md`
- Hexrig theme system → `i-core/vault/09-Reference/hexrig-theme-system.md`
- GitHub Packages setup → `i-core/vault/01-Operations/github-packages.md`
- Creative brief → `i-core/vault/_intake/_processed/brief-codex-v2.md` (related artifact)
