# @amulet-laboratories/hex-origins

Origins — the first theme collection for the [Hex](../hex) design token system. Ten themes in two series, each with dark and light modes.

## Themes

Ten themes in two series. **Environments** are places you could stand in. **Materials** are things you could hold.

### Environments

| Theme      | Narrative   | Character                                                                 |
| ---------- | ----------- | ------------------------------------------------------------------------- |
| **Hearth** | Creation    | Warm, grounded, deliberate — Sorts Mill Goudy + Source Sans               |
| **Abyss**  | Nothingness | Cool, deep, minimal — League Gothic + Monaspace Neon                      |
| **Cove**   | Shelter     | Coastal, calm, sheltering — Crimson Pro + Victor Mono                     |
| **Glyph**  | Inscription | Ink on parchment, the weight of recording — IM Fell English + EB Garamond |
| **Ember**  | Combustion  | Superheated metal, industrial urgency — Bungee + Exo 2                    |

### Materials

| Theme     | Narrative    | Character                                                                        |
| --------- | ------------ | -------------------------------------------------------------------------------- |
| **Keep**  | Construction | Structural, precise, industrial — IBM Plex                                       |
| **Slate** | Reduction    | Monochrome discipline, one permitted blue — Sora + Work Sans                     |
| **Linen** | Softness     | Warm off-white, understated professional — Manrope + Outfit                      |
| **Cairn** | Accumulation | Warm stone and olive, deliberate stacking — Libre Franklin + Rubik               |
| **Grove** | Growth       | Organic persistence, roots finding water — Libre Baskerville + Plus Jakarta Sans |

## Install

```bash
pnpm add @amulet-laboratories/hex-origins @amulet-laboratories/hex
```

## Exports

| Path                                                 | Description                             |
| ---------------------------------------------------- | --------------------------------------- |
| `@amulet-laboratories/hex-origins`                   | All themes, registry, collection object |
| `@amulet-laboratories/hex-origins/themes/hearth`     | Individual theme module                 |
| `@amulet-laboratories/hex-origins/themes/hearth.css` | Generated CSS custom properties         |

## Usage

### Import the collection

```typescript
import { origins, themes, themeIds } from '@amulet-laboratories/hex-origins'
import type { OriginsThemeId } from '@amulet-laboratories/hex-origins'

// origins — HexCollection with all 10 themes
// themes  — HexThemeRegistry (Record<string, HexTheme>)
// themeIds — ['hearth', 'abyss', 'cove', 'glyph', 'ember', 'keep', 'slate', 'linen', 'cairn', 'grove']
```

### Import individual themes

```typescript
import {
  hearth,
  abyss,
  cove,
  glyph,
  ember,
  keep,
  slate,
  linen,
  cairn,
  grove,
} from '@amulet-laboratories/hex-origins'

// Each is a complete HexTheme object
```

### Import CSS

Import theme CSS to make custom properties available:

```typescript
// Environments series
import '@amulet-laboratories/hex-origins/themes/hearth.css'
import '@amulet-laboratories/hex-origins/themes/abyss.css'
import '@amulet-laboratories/hex-origins/themes/cove.css'
import '@amulet-laboratories/hex-origins/themes/glyph.css'
import '@amulet-laboratories/hex-origins/themes/ember.css'

// Materials series
import '@amulet-laboratories/hex-origins/themes/keep.css'
import '@amulet-laboratories/hex-origins/themes/slate.css'
import '@amulet-laboratories/hex-origins/themes/linen.css'
import '@amulet-laboratories/hex-origins/themes/cairn.css'
import '@amulet-laboratories/hex-origins/themes/grove.css'
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

Runs structural completeness, color format, and WCAG contrast checks on all 20 theme modes.

## VS Code Themes

Origins also generates VS Code color themes from the same token source:

```bash
pnpm build:vscode
```

Output: `themes/{name}-{dark|light}.json` — 10 theme files ready for a VS Code extension.

## License

MIT
