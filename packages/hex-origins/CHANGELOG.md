# @amulet-laboratories/hex-origins — Changelog

All notable changes to this package follow [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.0.0] — 2026-02-27

Coordinated major version release alongside `rig` v2.0.0.

### Changed

- **Peer dependency:** `@amulet-laboratories/hex` constraint updated from `>=1.0.1` to `>=2.0.0`.

---

## [1.0.0] — 2025-11-01

Initial stable release.

### Added

- Nine themes in spectral order: `ember` (~10° red), `hearth` (~30° amber), `grove` (~130° green), `reef` (~180° teal), `abyss` (~240° blue), `cove` (~260° indigo), `linen` (warm neutral), `keep` (cool neutral), `slate` (achromatic)
- Dark and light mode variants per theme (18 total)
- Full token coverage: surfaces, text, borders, accents, status, focus, shadows, syntax, terminal
- CSS custom property output: one file per theme (`dist/themes/*.css`)
- VS Code theme JSON output: one file per theme/mode (`dist/vscode/*.json`)
- Build scripts: `build:css`, `build:vscode`, `validate`
- Individual theme module exports: `./themes/*` for tree-shakeable JS imports

### Notes

- Peer dependency: `@amulet-laboratories/hex >=1.0.0`
- `sideEffects: ["**/*.css"]` for correct CSS bundling

---

## [1.0.1] — 2026-02-27

### Fixed

- **ember** dark mode: `text.muted` contrast on base surface was 2.99:1, below the 3:1 AA large text minimum — corrected `#7a524c` → `#7e5650`
- **ember** dark mode: `text.link` contrast on raised surface was 4.44:1, below the 4.5:1 AA body text minimum — corrected `#e04030` → `#e44836`
- **linen** dark mode: `text.onAccent` on `accents.primary` (`#b87040`) was 3.86:1 with white text, below the 4.5:1 minimum — changed to dark text `#1a1816` (4.58:1)
