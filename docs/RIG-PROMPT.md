# Rig — Living Prompt

> **What this is:** A living instruction document for the Rig component library. Rig is the component system that pairs with Hex (the theme system). Update this as the project evolves.

---

## Project Overview

Rig is a **minimal, production-grade Vue 3 component library** that consumes Hex theme tokens. It is the UI layer; Hex is the visual identity layer. Together they form a paired system where switching themes transforms the entire interface.

**Stack:** Vue 3, TypeScript (strict), VueUse, Tailwind CSS (config-only — no style blocks, no inline styles).

**Package:** `@amulet-laboratories/rig`

**Paired with:** `@amulet-laboratories/hex`

---

## Architecture Rules

### 1. No Style Blocks

Every Rig component uses **only Tailwind classes in templates**. No `<style>` blocks. No `:style` bindings for theming. This ensures:
- Every visual decision flows through Tailwind config → Hex CSS custom properties
- Styles are scannable in templates
- No specificity wars
- Tree-shaking works naturally

**The one exception:** Transition durations/easings that must reference Hex motion tokens. These flow through the `useMotion()` composable.

### 2. Tailwind ↔ Hex Bridge

Hex CSS custom properties feed into `tailwind.config.ts`. Components never reference raw hex values.

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  theme: {
    extend: {
      colors: {
        surface: {
          base: 'var(--hex-color-surface-base)',
          raised: 'var(--hex-color-surface-raised)',
          sunken: 'var(--hex-color-surface-sunken)',
          overlay: 'var(--hex-color-surface-overlay)',
        },
        text: {
          primary: 'var(--hex-color-text-primary)',
          secondary: 'var(--hex-color-text-secondary)',
          muted: 'var(--hex-color-text-muted)',
          inverse: 'var(--hex-color-text-inverse)',
          link: 'var(--hex-color-text-link)',
          'on-accent': 'var(--hex-color-text-on-accent)',
        },
        border: {
          DEFAULT: 'var(--hex-color-border-default)',
          subtle: 'var(--hex-color-border-subtle)',
          strong: 'var(--hex-color-border-strong)',
        },
        accent: {
          DEFAULT: 'var(--hex-color-accent-primary)',
          secondary: 'var(--hex-color-accent-secondary)',
          hover: 'var(--hex-color-accent-hover)',
          active: 'var(--hex-color-accent-active)',
          muted: 'var(--hex-color-accent-muted)',
        },
        status: {
          success: 'var(--hex-color-status-success)',
          warning: 'var(--hex-color-status-warning)',
          error: 'var(--hex-color-status-error)',
          info: 'var(--hex-color-status-info)',
        },
        focus: {
          ring: 'var(--hex-color-focus-ring)',
        },
      },
      fontFamily: {
        heading: 'var(--hex-font-family-heading)',
        body: 'var(--hex-font-family-body)',
        mono: 'var(--hex-font-family-mono)',
      },
      boxShadow: {
        sm: 'var(--hex-shadow-sm)',
        md: 'var(--hex-shadow-md)',
        lg: 'var(--hex-shadow-lg)',
        xl: 'var(--hex-shadow-xl)',
        inner: 'var(--hex-shadow-inner)',
      },
      borderRadius: {
        theme: 'var(--hex-radius, 8px)',
      },
    },
  },
} satisfies Config
```

Usage in templates: `bg-surface-raised`, `text-text-primary`, `border-border`, `shadow-md`, `font-heading`, `rounded-theme`.

### 3. Single-File Components

Every component is one `.vue` file. No barrel exports. Direct imports:

```ts
import RigButton from '@amulet-laboratories/rig/RigButton.vue'
```

### 4. TypeScript Strict

All props use interfaces. All emits are typed. No `any`. All composables return typed refs.

### 5. Accessibility First

Every component must satisfy:
- Semantic HTML element (button for buttons, not div)
- `aria-label` or visible label for all interactive elements
- Focus visible via Hex `focus-ring` token
- Keyboard navigable (Enter/Space for buttons, Escape for dialogs)
- Color never sole indicator of state (icons + text alongside)
- `prefers-reduced-motion` respected via `useMotion()`
- Touch target ≥ 44×44px on interactive elements
- Screen reader announcements for dynamic content (toasts, alerts)

---

## The 12 Components

### Tier 1 — Primitives (6)

#### `RigText`

Typographic primitive. Renders semantic HTML with theme-aware styling.

```ts
interface RigTextProps {
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'label' | 'code' | 'pre'
  variant?: 'display' | 'heading' | 'subheading' | 'body' | 'caption' | 'overline' | 'mono'
  color?: 'primary' | 'secondary' | 'muted' | 'accent' | 'inverse' | 'on-accent'
            | 'success' | 'warning' | 'error' | 'info'
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold'
  align?: 'left' | 'center' | 'right'
  truncate?: boolean
}
```

**Variant → Tailwind class mapping:**
- `display`: `font-heading text-5xl font-bold tracking-tight`
- `heading`: `font-heading text-2xl font-semibold`
- `subheading`: `font-heading text-lg font-medium`
- `body`: `font-body text-base`
- `caption`: `font-body text-sm`
- `overline`: `font-mono text-xs font-medium uppercase tracking-widest`
- `mono`: `font-mono text-sm`

**Tokens exercised:** font-family (heading/body/mono), text colors, font weights.

#### `RigButton`

Primary interactive element.

```ts
interface RigButtonProps {
  variant?: 'solid' | 'outline' | 'ghost' | 'link'
  tone?: 'accent' | 'neutral' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  as?: 'button' | 'a' | 'router-link'
  href?: string
  to?: RouteLocationRaw
}
```

**Key implementation detail:** Button text gets `pt-[7px] pb-[9px]` (1px more bottom padding) for optical vertical centering — ascenders create visual space above that descenders don't balance.

**Tokens exercised:** accent (all states), border-radius, shadows, focus-ring, text-on-accent, font-body, motion.

#### `RigInput`

Text input with label, description, and error state.

```ts
interface RigInputProps {
  modelValue?: string
  label?: string
  description?: string
  error?: string
  placeholder?: string
  type?: 'text' | 'email' | 'password' | 'number' | 'search' | 'url' | 'tel'
  disabled?: boolean
  required?: boolean
  id?: string
}
```

Auto-generates `id` via `useId()` if not provided. Wires `aria-describedby` to description/error.

**Tokens exercised:** surface-sunken, border states, focus-ring, text colors (primary/muted/error), border-radius, shadow-inner.

#### `RigIcon`

SVG icon wrapper with consistent sizing and color inheritance.

```ts
interface RigIconProps {
  name: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'   // 14, 16, 20, 24, 32
  color?: 'current' | 'primary' | 'secondary' | 'muted' | 'accent'
          | 'success' | 'warning' | 'error' | 'info'
  label?: string         // aria-label for standalone icons
  decorative?: boolean   // aria-hidden when true (default: true)
}
```

Uses `currentColor` by default so it inherits from parent text color. Icon source TBD — either inline SVGs, a sprite sheet, or an icon component registry.

#### `RigSurface`

Container primitive. A themed box with elevation.

```ts
interface RigSurfaceProps {
  as?: 'div' | 'section' | 'article' | 'aside' | 'main' | 'nav' | 'header' | 'footer'
  elevation?: 'sunken' | 'base' | 'raised' | 'overlay'
  border?: boolean | 'subtle' | 'default' | 'strong'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  rounded?: boolean
}
```

**Elevation → class mapping:**
- `sunken`: `bg-surface-sunken shadow-inner`
- `base`: `bg-surface-base`
- `raised`: `bg-surface-raised shadow-md`
- `overlay`: `bg-surface-overlay shadow-xl`

#### `RigDivider`

Horizontal or vertical separator.

```ts
interface RigDividerProps {
  orientation?: 'horizontal' | 'vertical'
  variant?: 'subtle' | 'default' | 'strong'
  label?: string
}
```

---

### Tier 2 — Composites (4)

#### `RigBadge`

Status indicator / tag.

```ts
interface RigBadgeProps {
  variant?: 'solid' | 'soft' | 'outline'
  tone?: 'accent' | 'success' | 'warning' | 'error' | 'info' | 'neutral'
  size?: 'sm' | 'md'
  dot?: boolean
  removable?: boolean
}
```

#### `RigAlert`

Contextual message block.

```ts
interface RigAlertProps {
  tone?: 'success' | 'warning' | 'error' | 'info'
  title?: string
  dismissible?: boolean
  icon?: string | boolean
}
```

Auto-selects icon by tone when `icon={true}`: success → check, warning → alert-triangle, error → x-circle, info → info.

#### `RigCard`

Content container with header/body/footer slots.

```ts
interface RigCardProps {
  elevation?: 'flat' | 'raised' | 'prominent'
  interactive?: boolean
  as?: 'div' | 'article' | 'a' | 'router-link'
  href?: string
  to?: RouteLocationRaw
}
```

Slots: `#header`, `#default` (body), `#footer`.

When `interactive`, adds hover lift animation and pointer cursor.

#### `RigDialog`

Modal overlay. Most token-intensive component.

```ts
interface RigDialogProps {
  modelValue?: boolean
  title?: string
  description?: string
  size?: 'sm' | 'md' | 'lg'
  dismissible?: boolean
  persistent?: boolean
}
```

Slots: `#default` (body), `#footer` (actions).

Uses `useScrollLock()` and `useFocusTrap()` from VueUse. Teleports to `body`.

---

### Tier 3 — Patterns (2)

#### `RigThemeProvider`

Root component connecting Hex to the DOM.

```ts
interface RigThemeProviderProps {
  theme?: 'rust' | 'warp' | 'thorn' | 'maul' | 'jinx'
  scheme?: 'dark' | 'light' | 'auto'
}
```

Sets `data-hex-theme` and `data-hex-scheme` on root element. Provides `useTheme()` via inject. Respects `prefers-color-scheme` when `auto`.

#### `RigToast`

Notification system via composable.

```ts
interface RigToastProps {
  tone?: 'success' | 'warning' | 'error' | 'info' | 'neutral'
  title?: string
  description?: string
  duration?: number
  action?: { label: string; onClick: () => void }
  dismissible?: boolean
}

// Usage:
const toast = useToast()
toast.show({ tone: 'success', title: 'Theme applied' })
```

Portal-based, stacks, auto-dismisses. Best showcase of motion tokens.

---

## Composables

#### `useTheme()`
```ts
interface UseThemeReturn {
  theme: Ref<ThemeId>
  scheme: Ref<'dark' | 'light'>
  setTheme: (id: ThemeId) => void
  setScheme: (scheme: 'dark' | 'light') => void
  toggleScheme: () => void
}
```

#### `useMotion()`
```ts
interface UseMotionReturn {
  duration: ComputedRef<number>
  durationSlow: ComputedRef<number>
  easing: ComputedRef<string>
  prefersReducedMotion: Ref<boolean>   // via VueUse usePreferredReducedMotion
}
```

#### `useToast()`
```ts
interface UseToastReturn {
  show: (options: ToastOptions) => string
  dismiss: (id: string) => void
  dismissAll: () => void
  toasts: Readonly<Ref<ToastInstance[]>>
}
```

---

## File Structure

```
packages/rig/
  src/
    components/
      RigText.vue
      RigButton.vue
      RigInput.vue
      RigIcon.vue
      RigSurface.vue
      RigDivider.vue
      RigBadge.vue
      RigAlert.vue
      RigCard.vue
      RigDialog.vue
      RigThemeProvider.vue
      RigToast.vue
    composables/
      useTheme.ts
      useMotion.ts
      useToast.ts
    types/
      index.ts
  tailwind.config.ts
  package.json
```

---

## Storybook Integration

### Setup

```
.storybook/
  main.ts
  preview.ts
  decorators/
    ThemeDecorator.vue

stories/
  primitives/
    Text.stories.ts
    Button.stories.ts
    Input.stories.ts
    Icon.stories.ts
    Surface.stories.ts
    Divider.stories.ts
  composites/
    Badge.stories.ts
    Alert.stories.ts
    Card.stories.ts
    Dialog.stories.ts
  patterns/
    Toast.stories.ts
    ThemeProvider.stories.ts
  showcase/
    KitchenSink.stories.ts
    Palette.stories.ts
    Typography.stories.ts
    Editor.stories.ts
```

### Preview Config

```ts
// .storybook/preview.ts
import '@amulet-laboratories/hex/themes/rust.css'
import '@amulet-laboratories/hex/themes/warp.css'
import '@amulet-laboratories/hex/themes/thorn.css'
import '@amulet-laboratories/hex/themes/maul.css'
import '@amulet-laboratories/hex/themes/jinx.css'

export const globalTypes = {
  theme: {
    name: 'Hex Theme',
    description: 'Switch Hex world',
    defaultValue: 'maul',
    toolbar: {
      icon: 'paintbrush',
      items: [
        { value: 'rust', title: 'Rust — The Forge' },
        { value: 'warp', title: 'Warp — The Void' },
        { value: 'thorn', title: 'Thorn — The Grotto' },
        { value: 'maul', title: 'Maul — The Foundry' },
        { value: 'jinx', title: 'Jinx — The Sanctum' },
      ],
    },
  },
  scheme: {
    name: 'Color Scheme',
    defaultValue: 'dark',
    toolbar: {
      icon: 'circlehollow',
      items: [
        { value: 'dark', title: 'Dark' },
        { value: 'light', title: 'Light' },
      ],
    },
  },
}
```

### Story Convention

Every component story includes:
1. **Default** — component with default props
2. **Variants** — all visual variants in a grid
3. **States** — hover, focus, disabled, loading, error
4. **Playground** — all props as Storybook controls
5. **Themed** — side-by-side across worlds (when useful)

### Showcase Stories

**KitchenSink** — Every component on one page. The ultimate theme-switch test. Switch from Maul to Jinx and watch the entire UI transform — fonts, colors, shadows, radii, motion.

**Palette** — Color swatch grid. Surfaces, text, accent, status tokens rendered as visual blocks with hex values and contrast ratios.

**Typography** — Type specimen per theme. Heading, body, mono at all sizes. Shows how font-family changes between worlds (Rust's serif heading vs. Warp's geometric sans vs. Jinx's high-contrast serif).

**Editor** — Mini VSCode preview per theme. Syntax-highlighted code block using the theme's syntax colors. Demonstrates the Hex ↔ VSCode parity.

---

## Token Coverage Matrix

Every token category must be exercised by multiple components:

| Token Category | Components |
|----------------|-----------|
| Surface colors | Surface, Card, Dialog, Input, Alert |
| Text colors | Text, Button, Badge, Alert, Input, Card |
| Accent colors | Button, Badge, Input (focus), Toast |
| Status colors | Badge, Alert, Toast, Input (error) |
| Border colors | Surface, Card, Input, Divider, Alert |
| Font families | Text (all 3), Button, Input, Badge |
| Shadows | Card, Dialog, Button (hover), Toast |
| Border radius | Button, Input, Card, Badge, Dialog, Alert |
| Focus ring | Button, Input, Dialog |
| Motion/easing | Button (hover), Card (hover), Dialog (enter/exit), Toast (enter/exit) |

---

## Changelog

- **v0.1** — Initial architecture. 12 components across 3 tiers. 3 composables. Storybook integration plan.
- **TODO** — Build RigButton and RigSurface first (most token-intensive primitives). Then RigText + RigInput. Then composites.
