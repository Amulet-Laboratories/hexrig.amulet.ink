# @amulet-laboratories/rig

Vue 3 component library consuming [Hex](../hex) design tokens via Tailwind CSS. WCAG AAA accessible, fully typed, production-ready.

## Install

```bash
pnpm add @amulet-laboratories/rig
# Peer dependencies
pnpm add vue @iconify/vue @amulet-laboratories/hex
```

## Setup

```typescript
// main.ts
import { createApp } from 'vue'
import '@amulet-laboratories/hex-origins/themes/hearth.css' // or any theme CSS
import '@amulet-laboratories/rig/style.css'
import App from './App.vue'

createApp(App).mount('#app')
```

Set the active theme on your root element:

```html
<body data-theme="hearth" data-mode="dark">
```

Or use the `RigThemeProvider` component:

```vue
<template>
  <RigThemeProvider theme="hearth" mode="dark">
    <slot />
  </RigThemeProvider>
</template>
```

## Components (28)

| Component | Description |
|-----------|-------------|
| `RigAccordion` | Expandable content sections, single or multiple mode |
| `RigAlert` | Status messages with 4 tones, dismissible, icon slot |
| `RigAvatar` | User avatar with image, initials fallback, circle/square |
| `RigBadge` | Solid/soft/outline × 6 tones, dot indicator, removable |
| `RigBreadcrumb` | Navigation breadcrumb trail with custom separator |
| `RigButton` | Solid/outline/ghost/link × accent/neutral/danger, 3 sizes, loading state |
| `RigCard` | Flat/raised/prominent elevation, interactive mode, polymorphic |
| `RigCheckbox` | Checkbox with label, description, error state |
| `RigContainer` | Centered max-width container with size variants |
| `RigDialog` | Modal dialog with focus trapping, Esc close, 3 sizes |
| `RigDivider` | Horizontal/vertical divider with optional label |
| `RigGrid` | CSS grid layout with 1–6 columns and gap tokens |
| `RigIcon` | Iconify integration, xs–xl sizes, decorative mode |
| `RigInput` | Text input with 7 types, label/description/error, full ARIA |
| `RigProgress` | Determinate/indeterminate progress bar with tone |
| `RigSelect` | Select dropdown with label, description, error state |
| `RigSkeleton` | Loading placeholder in text/heading/circle/rect/card variants |
| `RigSpacer` | Spacing primitive using Hex spacing tokens |
| `RigSpinner` | Loading spinner with size and tone options |
| `RigStack` | Flex layout with direction, gap, alignment, wrap |
| `RigSurface` | Semantic surface container with elevation and border |
| `RigSwitch` | Toggle switch with label and description |
| `RigTabs` | Tabbed navigation with underline/pill variants |
| `RigTag` | Inline tag with solid/soft/outline, removable |
| `RigText` | Typography with 7 variants, semantic `as` prop, color/weight control |
| `RigThemeProvider` | Applies theme via data attributes, auto mode support |
| `RigToast` | Notification toast with auto-dismiss, action slot, tones |
| `RigTooltip` | Hover tooltip with placement and delay options |

## Composables

### `useTheme()`

Reactive theme and mode state with inject-or-create pattern:

```typescript
import { useTheme, provideTheme } from '@amulet-laboratories/rig'

// In app root — create and provide
const theme = useTheme({ theme: 'hearth', mode: 'auto' })
provideTheme(theme)

// In any child — injects from provider
const { theme, mode, setTheme, setMode, toggleMode } = useTheme()
```

### `useMotion()`

Theme-aware motion values respecting `prefers-reduced-motion`:

```typescript
import { useMotion } from '@amulet-laboratories/rig'

const { duration, durationSlow, easing, prefersReducedMotion } = useMotion()
// duration.value → '300ms' (or '0ms' if reduced motion preferred)
```

### `useToast()`

Notification queue with auto-dismiss and SSR safety:

```typescript
import { useToast, provideToast } from '@amulet-laboratories/rig'

// In app root
provideToast()

// Anywhere
const { show, dismiss, dismissAll, toasts } = useToast()
show({ title: 'Saved', tone: 'success', duration: 3000 })
```

## Types

All component props and composable return types are exported:

```typescript
import type {
  RigButtonProps,
  RigInputProps,
  RigDialogProps,
  UseThemeReturn,
  UseMotionReturn,
  UseToastReturn,
  ToastOptions,
  ToastInstance,
  // ... all 28 component prop interfaces
} from '@amulet-laboratories/rig'
```

## Accessibility

- **WCAG 2.1 AAA** — 7:1 contrast ratios validated per theme × mode
- Full keyboard navigation and focus trapping (RigDialog)
- `prefers-reduced-motion` respected via `useMotion()`
- 44×44px minimum touch targets
- Semantic HTML via polymorphic `as` prop
- Proper ARIA roles: `role="alert"` for error/warning, `role="status"` for info/success

## Tailwind Integration

Rig uses the Hex Tailwind preset internally. If you're building custom components alongside Rig, use the same preset:

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'
import { amuletPreset } from '@amulet-laboratories/hex/tailwind'

export default {
  presets: [amuletPreset],
  content: ['./src/**/*.vue'],
} satisfies Config
```

## License

MIT
