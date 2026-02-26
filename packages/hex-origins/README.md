# @amulet-laboratories/hex-origins

Origins — the first theme collection for the [Hex](../hex) design token system. Five foundational themes, each with dark and light modes.

## Themes

| Theme | Narrative | Character |
|-------|-----------|-----------|
| **Hearth** | Creation | Warm, grounded, deliberate — Goudy serifs + Source Sans |
| **Abyss** | Nothingness | Cool, deep, minimal — Manrope + Monaspace Neon |
| **Hollow** | Growth | Organic, living, verdant — Bitter + Vollkorn |
| **Keep** | Construction | Structural, precise, industrial — IBM Plex |
| **Cove** | Shelter | Coastal, calm, sheltering — Crimson Pro + Victor Mono |

## Install

```bash
pnpm add @amulet-laboratories/hex-origins @amulet-laboratories/hex
```

## Exports

| Path | Description |
|------|-------------|
| `@amulet-laboratories/hex-origins` | All themes, registry, collection object |
| `@amulet-laboratories/hex-origins/themes/hearth` | Individual theme module |
| `@amulet-laboratories/hex-origins/themes/hearth.css` | Generated CSS custom properties |

## Usage

### Import the collection

```typescript
import { origins, themes, themeIds } from '@amulet-laboratories/hex-origins'
import type { OriginsThemeId } from '@amulet-laboratories/hex-origins'

// origins — HexCollection with all 5 themes
// themes  — HexThemeRegistry (Record<string, HexTheme>)
// themeIds — ['hearth', 'abyss', 'hollow', 'keep', 'cove']
```

### Import individual themes

```typescript
import { hearth, abyss, hollow, keep, cove } from '@amulet-laboratories/hex-origins'

// Each is a complete HexTheme object
```

### Import CSS

Import theme CSS to make custom properties available:

```typescript
// All themes
import '@amulet-laboratories/hex-origins/themes/hearth.css'
import '@amulet-laboratories/hex-origins/themes/abyss.css'
import '@amulet-laboratories/hex-origins/themes/hollow.css'
import '@amulet-laboratories/hex-origins/themes/keep.css'
import '@amulet-laboratories/hex-origins/themes/cove.css'
```

Then activate a theme via data attributes:

```html
<body data-theme="hearth" data-mode="dark">
  <!-- All --surface-*, --text-*, --accent-* etc. vars are now available -->
</body>
```

### With Hex runtime helpers

```typescript
import { applyTheme } from '@amulet-laboratories/hex'
import { hearth } from '@amulet-laboratories/hex-origins'

applyTheme(document.documentElement, hearth, 'dark')
```

### With Tailwind

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'
import { amuletPreset } from '@amulet-laboratories/hex/tailwind'

export default {
  presets: [amuletPreset],
  content: ['./src/**/*.vue'],
} satisfies Config
```

Then use classes like `bg-surface-base`, `text-text-primary`, `border-border-subtle`.

## Validation

```bash
cd packages/hex-origins
pnpm validate
```

Runs structural completeness, color format, and WCAG contrast checks on all 10 theme modes.

## VS Code Themes

Origins also generates VS Code color themes from the same token source:

```bash
pnpm build:vscode
```

Output: `themes/{name}-{dark|light}.json` — 10 theme files ready for a VS Code extension.

## License

MIT
