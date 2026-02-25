// Use inline type to avoid hard dependency on vue-router
type RouteLocationRaw = string | Record<string, unknown>

// ---------------------------------------------------------------------------
// Theme types (mirrors Hex)
// ---------------------------------------------------------------------------

export type ThemeId = 'hearth' | 'abyss' | 'hollow' | 'keep' | 'cove'
export type SchemeId = 'dark' | 'light'

// ---------------------------------------------------------------------------
// Component prop types
// ---------------------------------------------------------------------------

// RigText
export interface RigTextProps {
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'label' | 'code' | 'pre'
  variant?: 'display' | 'heading' | 'subheading' | 'body' | 'caption' | 'overline' | 'mono'
  color?: 'primary' | 'secondary' | 'muted' | 'accent' | 'inverse' | 'on-accent'
    | 'success' | 'warning' | 'error' | 'info'
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold'
  align?: 'left' | 'center' | 'right'
  truncate?: boolean
}

// RigButton
export interface RigButtonProps {
  variant?: 'solid' | 'outline' | 'ghost' | 'link'
  tone?: 'accent' | 'neutral' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  as?: 'button' | 'a' | 'router-link'
  href?: string
  to?: RouteLocationRaw
}

// RigInput
export interface RigInputProps {
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

// RigIcon
export interface RigIconProps {
  name: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: 'current' | 'primary' | 'secondary' | 'muted' | 'accent'
    | 'success' | 'warning' | 'error' | 'info'
  label?: string
  decorative?: boolean
}

// RigSurface
export interface RigSurfaceProps {
  as?: 'div' | 'section' | 'article' | 'aside' | 'main' | 'nav' | 'header' | 'footer'
  elevation?: 'sunken' | 'base' | 'raised' | 'overlay'
  border?: boolean | 'subtle' | 'default' | 'strong'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  rounded?: boolean
}

// RigDivider
export interface RigDividerProps {
  orientation?: 'horizontal' | 'vertical'
  variant?: 'subtle' | 'default' | 'strong'
  label?: string
}

// RigBadge
export interface RigBadgeProps {
  variant?: 'solid' | 'soft' | 'outline'
  tone?: 'accent' | 'success' | 'warning' | 'error' | 'info' | 'neutral'
  size?: 'sm' | 'md'
  dot?: boolean
  removable?: boolean
}

// RigAlert
export interface RigAlertProps {
  tone?: 'success' | 'warning' | 'error' | 'info'
  title?: string
  dismissible?: boolean
  icon?: string | boolean
}

// RigCard
export interface RigCardProps {
  elevation?: 'flat' | 'raised' | 'prominent'
  interactive?: boolean
  as?: 'div' | 'article' | 'a' | 'router-link'
  href?: string
  to?: RouteLocationRaw
}

// RigDialog
export interface RigDialogProps {
  modelValue?: boolean
  title?: string
  description?: string
  size?: 'sm' | 'md' | 'lg'
  dismissible?: boolean
  persistent?: boolean
}

// RigThemeProvider
export interface RigThemeProviderProps {
  theme?: ThemeId
  scheme?: SchemeId | 'auto'
}

// RigToast
export interface RigToastProps {
  tone?: 'success' | 'warning' | 'error' | 'info' | 'neutral'
  title?: string
  description?: string
  duration?: number
  action?: { label: string; onClick: () => void }
  dismissible?: boolean
}

export interface ToastOptions {
  tone?: RigToastProps['tone']
  title: string
  description?: string
  duration?: number
  action?: { label: string; onClick: () => void }
  dismissible?: boolean
}

export interface ToastInstance extends Required<Omit<ToastOptions, 'action' | 'description'>> {
  id: string
  description?: string
  action?: { label: string; onClick: () => void }
  createdAt: number
}

// ---------------------------------------------------------------------------
// Composable return types
// ---------------------------------------------------------------------------

import type { Ref, ComputedRef } from 'vue'

export interface UseThemeReturn {
  theme: Ref<ThemeId>
  scheme: Ref<SchemeId>
  setTheme: (id: ThemeId) => void
  setScheme: (scheme: SchemeId) => void
  toggleScheme: () => void
}

export interface UseMotionReturn {
  duration: ComputedRef<string>
  durationSlow: ComputedRef<string>
  easing: ComputedRef<string>
  prefersReducedMotion: Ref<boolean>
}

export interface UseToastReturn {
  show: (options: ToastOptions) => string
  dismiss: (id: string) => void
  dismissAll: () => void
  toasts: Readonly<Ref<readonly ToastInstance[]>>
}
