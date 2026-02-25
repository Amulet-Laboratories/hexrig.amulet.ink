// Use inline type to avoid hard dependency on vue-router
type RouteLocationRaw = string | Record<string, unknown>

// ---------------------------------------------------------------------------
// Theme types (re-exported from Hex)
// ---------------------------------------------------------------------------

export type { ModeId } from '@amulet-laboratories/hex'

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
  ariaLabel?: string
}

// RigContainer
export interface RigContainerProps {
  as?: 'div' | 'section' | 'article' | 'main' | 'header' | 'footer' | 'nav'
  size?: 'sm' | 'md' | 'lg' | 'full'
  center?: boolean
  padding?: boolean
}

// RigStack
export interface RigStackProps {
  as?: 'div' | 'section' | 'article' | 'nav' | 'ul' | 'ol' | 'fieldset'
  direction?: 'vertical' | 'horizontal'
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  wrap?: boolean
}

// RigGrid
export interface RigGridProps {
  as?: 'div' | 'section' | 'article' | 'ul' | 'ol'
  cols?: 1 | 2 | 3 | 4 | 5 | 6
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  align?: 'start' | 'center' | 'end' | 'stretch'
}

// RigSpacer
export interface RigSpacerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  axis?: 'vertical' | 'horizontal'
}

// RigSpinner
export interface RigSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  tone?: 'accent' | 'current' | 'muted'
  label?: string
}

// RigSkeleton
export interface RigSkeletonProps {
  variant?: 'text' | 'heading' | 'circle' | 'rect' | 'card'
  lines?: number
  animated?: boolean
}

// RigProgress
export interface RigProgressProps {
  value?: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  tone?: 'accent' | 'success' | 'warning' | 'error' | 'info'
  label?: string
  indeterminate?: boolean
}

// RigTooltip
export interface RigTooltipProps {
  content: string
  placement?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
  disabled?: boolean
}

// RigTabs
export interface RigTabItem {
  value: string
  label: string
  disabled?: boolean
}

export interface RigTabsProps {
  modelValue: string
  tabs: RigTabItem[]
  label?: string
  variant?: 'underline' | 'pill'
  size?: 'sm' | 'md' | 'lg'
}

// RigAccordion
export interface RigAccordionItem {
  value: string
  label: string
  content?: string
  disabled?: boolean
}

export interface RigAccordionProps {
  items: RigAccordionItem[]
  multiple?: boolean
  defaultOpen?: string[]
}

// RigBreadcrumb
export interface RigBreadcrumbItem {
  label: string
  href?: string
}

export interface RigBreadcrumbProps {
  items: RigBreadcrumbItem[]
  separator?: string
}

// RigAvatar
export interface RigAvatarProps {
  src?: string
  name?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  shape?: 'circle' | 'square'
}

// RigSelect
export interface RigSelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface RigSelectProps {
  modelValue?: string
  label?: string
  description?: string
  error?: string
  placeholder?: string
  options: RigSelectOption[]
  disabled?: boolean
  required?: boolean
  id?: string
}

// RigCheckbox
export interface RigCheckboxProps {
  modelValue?: boolean
  label?: string
  description?: string
  error?: string
  disabled?: boolean
  id?: string
}

// RigSwitch
export interface RigSwitchProps {
  modelValue?: boolean
  label?: string
  description?: string
  disabled?: boolean
  id?: string
}

// RigTag
export interface RigTagProps {
  label?: string
  variant?: 'solid' | 'soft' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  removable?: boolean
  disabled?: boolean
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
  theme?: string
  mode?: ModeId | 'auto'
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

import type { ModeId } from '@amulet-laboratories/hex'
import type { Ref, ComputedRef } from 'vue'

export interface UseThemeReturn {
  theme: Ref<string>
  mode: Ref<ModeId>
  setTheme: (id: string) => void
  setMode: (mode: ModeId) => void
  toggleMode: () => void
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
