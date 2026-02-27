# @amulet-laboratories/rig — Changelog

All notable changes to this package follow [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.0.0] — 2026-02-27

### Breaking

- **Removed `RigMakerStamp`** — Amulet Laboratories brand mark; moved to `packages/site`. Not appropriate for a general-purpose component library.
- **Removed `RigOrnament`** — procedural SVG ornament with 13k-line path data file (`ornament-paths.ts`); moved to `packages/site`. Bundle impact on consumers was unjustified.
- **Removed `RigNotifyForm`** — Netlify-specific early-access form; moved to `packages/site`. Hard dependency on a specific deployment platform has no place in a design system.
- **Removed `RigSiteFooter`** — Amulet copyright footer with hardcoded branding; moved to `packages/site`.
- **Removed types** `RigMakerStampProps`, `RigOrnamentProps`, `RigNotifyFormProps`, `RigSiteFooterProps` from the public API.
- **Peer dependency:** `@amulet-laboratories/hex` constraint updated to `>=2.0.0`.

### Fixed

- **`useMotion`** double-update: composable previously subscribed to both injected theme reactive refs (fires synchronously, before DOM flush) and `MutationObserver` (fires after DOM flush). This caused two renders per theme switch, with the first reading stale CSS custom property values. Now only the `MutationObserver` triggers recomputation — reads always occur after the DOM reflects the new theme.

### Migration

Replace any `@amulet-laboratories/rig` imports of the removed components with local copies. Source files are in the `hexrig.amulet.ink` site package as a reference implementation.

---

## [1.0.0] — 2025-11-01

Initial stable release.

### Added

**Components (33):** `RigThemeProvider`, `RigText`, `RigButton`, `RigInput`, `RigIcon`, `RigSurface`, `RigDivider`, `RigBadge`, `RigAlert`, `RigCard`, `RigDialog`, `RigToast`, `RigContainer`, `RigStack`, `RigGrid`, `RigSpacer`, `RigSpinner`, `RigSkeleton`, `RigProgress`, `RigTooltip`, `RigTabs`, `RigAccordion`, `RigBreadcrumb`, `RigAvatar`, `RigSelect`, `RigCheckbox`, `RigSwitch`, `RigTag`, `RigNoiseGrain`, `RigMakerStamp`, `RigOrnament`, `RigNotifyForm`, `RigSiteFooter`

**Composables (3):** `useTheme`, `useMotion`, `useToast`

- Full ARIA compliance and keyboard navigation across all interactive components
- `RigDialog`: focus trap, scroll lock, ref-counted for concurrent instances, `Teleport` to body
- `RigToast`: HMR-safe singleton via `Symbol.for()`, auto-dismiss, action support
- `RigThemeProvider`: provide/inject pattern, `prefers-color-scheme` media query listener, `prefers-reduced-motion` via `useMotion`
- `RigButton` tones: `accent | neutral | danger` (not `primary`)
- All touch targets ≥ 44×44px
- Tailwind CSS utility classes via `amuletPreset` from `@amulet-laboratories/hex/tailwind`
- `./style.css` export for component base styles

### Notes

- Peer dependencies: `vue ^3.5.0`, `@amulet-laboratories/hex >=1.0.0`, `@iconify/vue ^5.0.0` (optional)
- Built with Vite in library mode + `vite-plugin-dts`

---

## [1.0.1] — 2026-02-27

### Fixed

- **`RigButton`** `md` size: minimum height corrected from `40px` to `44px` to meet the 44×44px touch target standard (WCAG 2.5.5)
- **`RigThemeProvider`** `mode="auto"` prop watcher: previously called `setMode()` which permanently set `userExplicitMode = true`, blocking future OS preference changes. Now calls `resetToAuto()` which re-enables the media query listener
- **`RigNotifyForm`**: added `name="email"` to `RigInput` (without it, `FormData` silently omits the field from Netlify submissions); error state now correctly surfaces via `submitError` ref rather than silently showing the success message on network failure
- **`useTheme` `toggleMode()`**: now sets `userExplicitMode = true` so an explicit user toggle cannot be overridden by a subsequent OS preference change

### Added

- **`useTheme`**: new `resetToAuto()` method — resets `userExplicitMode` to `false` and re-reads the current system preference; exposed on `UseThemeReturn`
- **`RigThemeProvider`**: dev-mode warning when the active theme ID has no loaded CSS (checks `--surface-base` custom property resolution post-render)
- **`@iconify/vue`** marked `optional` in `peerDependenciesMeta` — consumers not using `RigIcon` no longer receive an unresolved peer warning
