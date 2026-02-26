# @amulet-laboratories/hex-origins

Origins — the first theme collection for the [Hex](../hex) design token system. Nine themes in spectral order, each with dark and light modes.

## Themes

Nine themes: six chromatic hues at ~60° intervals around the color wheel, plus three neutrals.

### Spectrum

| Theme      | Hue   | Narrative   | Character                                                   |
| ---------- | ----- | ----------- | ----------------------------------------------------------- |
| **Ember**  | ~10°  | Intensity   | True red — industrial urgency, Bungee + Exo 2               |
| **Hearth** | ~45°  | Warmth      | Gold and amber — weight of craft, Sorts Mill Goudy          |
| **Grove**  | ~120° | Growth      | Green — organic persistence, Libre Baskerville              |
| **Reef**   | ~180° | Clarity     | Cyan — shallow water transparency, DM Sans + Libre Franklin |
| **Abyss**  | ~230° | Nothingness | Deep blue — cold cosmos, League Gothic + Monaspace Neon     |
| **Cove**   | ~280° | Shelter     | Purple — coastal calm, Crimson Pro + Victor Mono            |

### Neutrals

| Theme     | Bias | Narrative | Character                                           |
| --------- | ---- | --------- | --------------------------------------------------- |
| **Linen** | Warm | Softness  | Warm off-white — understated professional, Manrope  |
| **Keep**  | Pure | Structure | True neutral — structural precision, IBM Plex       |
| **Slate** | Cool | Reduction | Cool monochrome — blue-grey steel, Sora + Work Sans |

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

// origins — HexCollection with all 9 themes
// themes  — HexThemeRegistry (Record<string, HexTheme>)
// themeIds — ['ember', 'hearth', 'grove', 'reef', 'abyss', 'cove', 'linen', 'keep', 'slate']
```

### Import individual themes

```typescript
import {
  ember,
  hearth,
  grove,
  reef,
  abyss,
  cove,
  linen,
  keep,
  slate,
} from '@amulet-laboratories/hex-origins'

// Each is a complete HexTheme object
```

### Import CSS

Import theme CSS to make custom properties available:

```typescript
// Spectrum
import '@amulet-laboratories/hex-origins/themes/ember.css'
import '@amulet-laboratories/hex-origins/themes/hearth.css'
import '@amulet-laboratories/hex-origins/themes/grove.css'
import '@amulet-laboratories/hex-origins/themes/reef.css'
import '@amulet-laboratories/hex-origins/themes/abyss.css'
import '@amulet-laboratories/hex-origins/themes/cove.css'

// Neutrals
import '@amulet-laboratories/hex-origins/themes/linen.css'
import '@amulet-laboratories/hex-origins/themes/keep.css'
import '@amulet-laboratories/hex-origins/themes/slate.css'
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

Runs structural completeness, color format, and WCAG contrast checks on all 18 theme modes.

## VS Code Themes

Origins also generates VS Code color themes from the same token source:

```bash
pnpm build:vscode
```

Output: `themes/{name}-{dark|light}.json` — 18 theme files ready for a VS Code extension.

## License

MIT
