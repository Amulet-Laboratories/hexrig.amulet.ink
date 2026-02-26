# @amulet-laboratories/hex

Design token engine for themed design systems — type system, CSS generation, validation, and Tailwind preset.

Hex defines **what a theme is**. Theme collections (like [`@amulet-laboratories/hex-origins`](../hex-origins)) define **which themes exist**.

## Install

```bash
pnpm add @amulet-laboratories/hex
```

## Exports

| Path | Description |
|------|-------------|
| `@amulet-laboratories/hex` | Types, validation, CSS/VSCode generation, runtime helpers |
| `@amulet-laboratories/hex/tailwind` | Tailwind CSS preset (`amuletPreset`) |

## Type System

Hex provides a complete type system for themed design tokens:

```typescript
import type {
  HexTheme,        // Complete theme definition
  HexModeTokens,   // All tokens for one mode (dark/light)
  ThemeId,          // Theme identifier (string)
  ModeId,           // 'dark' | 'light'
  HexSurfaces,      // base, raised, elevated, sunken, overlay
  HexText,          // primary, secondary, muted, inverse, link, onAccent
  HexBorders,       // default, subtle, strong
  HexAccents,       // primary, secondary, hover, active, muted
  HexStatus,        // success, warning, error, info
  HexFocus,         // ring, outline
  HexMotion,        // duration + easing tokens
  HexSpacing,       // xs through 3xl
  HexShape,         // radius, radiusFull
  HexElevation,     // sm, md, lg shadows
  HexFonts,         // display, body, sans, mono
  HexSyntaxTokens,  // 9 syntax highlighting tokens
  HexTerminalColors, // 16 ANSI terminal colors
  HexCollection,    // Named set of themes
  HexThemeRegistry, // Record<string, HexTheme>
} from '@amulet-laboratories/hex'
```

## Validation

Validate themes for structural completeness, color format correctness, and WCAG contrast compliance:

```typescript
import { validateTheme } from '@amulet-laboratories/hex'

const result = validateTheme(myTheme)
// result.valid    — boolean
// result.errors   — ValidationError[] (missing tokens, bad formats, contrast failures)
// result.warnings — string[] (rgba values, motion format hints)
```

Contrast thresholds: **7:1** primary text (AAA), **4.5:1** secondary/link text (AA), **3:1** status/muted (UI).

## CSS Generation

Generate CSS custom properties from a theme:

```typescript
import { generateThemeCSS } from '@amulet-laboratories/hex'

const css = generateThemeCSS(myTheme)
// Outputs [data-theme="name"][data-mode="dark"] { --surface-base: #...; ... }
```

## VSCode Theme Generation

Generate VS Code color themes from token data:

```typescript
import { generateVSCodeTheme } from '@amulet-laboratories/hex'

const theme = generateVSCodeTheme(myTheme, 'dark')
// Returns a complete VS Code theme JSON object
```

## Runtime Helpers

Apply themes to DOM elements at runtime:

```typescript
import { applyTheme, toggleMode, getThemeState } from '@amulet-laboratories/hex'

applyTheme(document.documentElement, myTheme, 'dark')
toggleMode(document.documentElement) // returns new ModeId
getThemeState(document.documentElement) // { themeId, mode }
```

## Tailwind Preset

Map Hex CSS variables to Tailwind utility classes:

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'
import { amuletPreset } from '@amulet-laboratories/hex/tailwind'

export default {
  presets: [amuletPreset],
  content: ['./src/**/*.vue'],
} satisfies Config
```

This gives you classes like `bg-surface-base`, `text-text-primary`, `border-border-subtle`, `duration-fast`, `ease-standard`, `shadow-md`, etc.

## Creating a Theme Collection

To create your own theme collection, define themes conforming to `HexTheme`:

```typescript
import type { HexTheme } from '@amulet-laboratories/hex'

export const myTheme: HexTheme = {
  id: 'my-theme',
  name: 'My Theme',
  narrative: 'Description of this theme.',
  motion: { duration: { fast: '150ms', normal: '300ms', slow: '500ms' }, easing: { ... } },
  spacing: { xs: '4px', sm: '8px', md: '16px', lg: '24px', xl: '40px', '2xl': '64px', '3xl': '96px' },
  shape: { radius: '8px', radiusFull: '9999px' },
  fonts: { display: { ... }, body: { ... }, sans: { ... }, mono: { ... } },
  dark: { surfaces: { ... }, text: { ... }, borders: { ... }, accents: { ... }, status: { ... }, focus: { ... }, shadows: { ... }, syntax: { ... }, terminal: { ... } },
  light: { /* same structure as dark */ },
}
```

Then validate with `validateTheme(myTheme)` before shipping.

## License

MIT
