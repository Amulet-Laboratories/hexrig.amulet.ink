# Changelog

All notable changes to this project will be documented in this file.

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
