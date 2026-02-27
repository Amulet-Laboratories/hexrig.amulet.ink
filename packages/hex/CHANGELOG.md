# @amulet-laboratories/hex — Changelog

All notable changes to this package follow [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.0.0] — 2026-02-27

Coordinated major version release alongside `rig` v2.0.0. No breaking changes to the `hex` public API.

### Notes

- Version bump ensures consuming packages pin to a coherent system release.

---

## [1.0.0] — 2025-11-01

Initial stable release.

### Added

- `HexTheme`, `HexThemeRegistry`, `HexCollection` type interfaces and supporting token group types (`HexSurfaces`, `HexText`, `HexBorders`, `HexAccents`, `HexStatus`, `HexFocus`, `HexMotion`, `HexSpacing`, `HexShape`, `HexFont`, `HexFonts`, `HexModeTokens`, `HexElevation`)
- `ThemeId`, `ModeId` type aliases
- Const key arrays: `SURFACE_KEYS`, `TEXT_KEYS`, `BORDER_KEYS`, `ACCENT_KEYS`, `STATUS_KEYS`, `FOCUS_KEYS`, `ELEVATION_KEYS`, `SPACING_KEYS`, `SHAPE_KEYS`, `SYNTAX_TOKEN_KEYS`, `TERMINAL_KEYS`
- `validateTheme(theme)` — structural completeness, format, and WCAG 2.1 contrast validation
- `generateThemeCSS(theme)` — CSS custom property generation for dark + light modes
- `sanitizeCSSValue(value)` — injection guard for CSS values
- `generateVSCodeTheme(theme, mode)` — VS Code theme JSON generation
- `amuletPreset` Tailwind CSS preset mapping all token groups to utility classes
- Runtime helpers: `applyTheme`, `toggleMode`, `getThemeState`

### Notes

- Zero runtime dependencies
- CJS + ESM + `.d.ts` output via `tsup`
- `sideEffects: false` for full tree-shaking

---

## [1.0.1] — 2026-02-27

### Fixed

- WCAG 2.1 sRGB linearization threshold corrected from `0.03928` (WCAG 2.0 value) to `0.04045` per IEC 61966-2-1:1999 Annex F as referenced by WCAG 2.1 §1.4.3
