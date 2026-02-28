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
  color?:
    | 'primary'
    | 'secondary'
    | 'muted'
    | 'accent'
    | 'inverse'
    | 'on-accent'
    | 'success'
    | 'warning'
    | 'error'
    | 'info'
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
  name?: string
}

// RigIcon
export interface RigIconProps {
  name: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?:
    | 'current'
    | 'primary'
    | 'secondary'
    | 'muted'
    | 'accent'
    | 'success'
    | 'warning'
    | 'error'
    | 'info'
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
  visible?: boolean
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
  error?: string
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

// RigNoiseGrain
export interface RigNoiseGrainProps {
  /** Grain opacity (0–1). Default 0.02. */
  opacity?: number
  /** feTurbulence base frequency. Default 0.7. Higher = finer grain. */
  frequency?: number
  /** CSS mix-blend-mode. Default 'overlay'. */
  blend?: 'overlay' | 'soft-light' | 'multiply'
}

// RigThemeProvider
export interface RigThemeProviderProps {
  theme?: string
  mode?: ModeId | 'auto'
  as?: string
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
  resetToAuto: () => void
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

// ---------------------------------------------------------------------------
// Tier 1 — Tower baseline components
// ---------------------------------------------------------------------------

// RigStatus
export interface RigStatusProps {
  status:
    | 'healthy'
    | 'active'
    | 'warning'
    | 'wip'
    | 'critical'
    | 'error'
    | 'info'
    | 'neutral'
    | 'stub'
    | 'pending'
    | 'archived'
  label?: string
  size?: 'sm' | 'md' | 'lg'
  pulse?: boolean
}

// RigEmpty
export interface RigEmptyProps {
  icon?: string
  title: string
  description?: string
  actionLabel?: string
  actionVariant?: 'solid' | 'outline' | 'ghost' | 'link'
}

// RigConfirm
export interface RigConfirmProps {
  modelValue?: boolean
  title: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  tone?: 'danger' | 'warning' | 'info'
  loading?: boolean
  persistent?: boolean
}

// RigHeader
export interface RigHeaderProps {
  title?: string
  bordered?: boolean
}

// RigPage
export interface RigPageProps {
  title?: string
  description?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  padding?: boolean
}

// RigPanel
export interface RigPanelProps {
  title?: string
  description?: string
  collapsible?: boolean
  defaultOpen?: boolean
  bordered?: boolean
  padded?: boolean
}

// RigSidebar
export interface RigSidebarProps {
  collapsed?: boolean
  width?: number
  collapsedWidth?: number
  bordered?: boolean
}

// RigSidebarSection
export interface RigSidebarSectionProps {
  title?: string
}

// RigSidebarItem
export interface RigSidebarItemProps {
  icon?: string
  label: string
  active?: boolean
  badge?: string | number
  to?: RouteLocationRaw
  href?: string
}

// RigAppShell
export interface RigAppShellProps {
  sidebarCollapsed?: boolean
  sidebarWidth?: number
  sidebarCollapsedWidth?: number
}

// RigTable
export interface RigTableColumn {
  key: string
  label: string
  sortable?: boolean
  width?: string
  align?: 'left' | 'center' | 'right'
}

export interface RigTableProps {
  columns: RigTableColumn[]
  rows: Record<string, unknown>[]
  rowKey?: string
  sortBy?: string
  sortDir?: 'asc' | 'desc'
  expandable?: boolean
  selectable?: boolean
  selected?: string[]
  striped?: boolean
  hoverable?: boolean
  compact?: boolean
  emptyTitle?: string
  emptyDescription?: string
  loading?: boolean
}

// useKeyboard
export interface KeyboardShortcut {
  keys: string
  description?: string
  handler: () => void
  global?: boolean
}

export interface UseKeyboardReturn {
  register: (
    keys: string,
    handler: () => void,
    options?: { description?: string; global?: boolean },
  ) => void
  unregister: (keys: string) => void
  shortcuts: Readonly<Ref<readonly KeyboardShortcut[]>>
}

// ---------------------------------------------------------------------------
// Tier 2 — Tower full experience
// ---------------------------------------------------------------------------

// RigRadio
export interface RigRadioOption {
  value: string
  label: string
  disabled?: boolean
}

export interface RigRadioProps {
  modelValue?: string
  name: string
  label: string
  options: RigRadioOption[]
  orientation?: 'vertical' | 'horizontal'
  description?: string
  error?: string
  disabled?: boolean
  id?: string
}

// RigStat
export interface RigStatProps {
  label: string
  value: string | number
  description?: string
  icon?: string
  trend?: 'up' | 'down' | 'flat'
  trendLabel?: string
  size?: 'sm' | 'md' | 'lg'
}

// RigMetadata
export interface MetadataItem {
  label: string
  value: string | number | boolean
  type?: 'text' | 'badge' | 'status' | 'link'
  tone?: 'accent' | 'success' | 'warning' | 'error' | 'info' | 'neutral'
  href?: string
}

export interface RigMetadataProps {
  items: MetadataItem[]
  columns?: 1 | 2 | 3 | 4
  orientation?: 'vertical' | 'horizontal'
  separator?: boolean
}

// RigList
export interface ListItem {
  id: string
  label: string
  description?: string
  icon?: string
  meta?: string
  href?: string
  to?: RouteLocationRaw
}

export interface RigListProps {
  items: ListItem[]
  hoverable?: boolean
  divided?: boolean
  size?: 'sm' | 'md' | 'lg'
}

// RigTimeline
export interface TimelineItem {
  id: string
  label: string
  description?: string
  icon?: string
  timestamp?: string
  tone?: 'accent' | 'success' | 'warning' | 'error' | 'info' | 'neutral'
}

export interface RigTimelineProps {
  items: TimelineItem[]
  orientation?: 'vertical' | 'horizontal'
}

// RigTree
export interface TreeNode {
  id: string
  label: string
  icon?: string
  children?: TreeNode[]
  disabled?: boolean
}

export interface RigTreeProps {
  nodes: TreeNode[]
  selected?: string
  expanded?: string[]
  selectable?: boolean
}

// RigSplit
export interface RigSplitProps {
  orientation?: 'horizontal' | 'vertical'
  initialSize?: number
  minSize?: number
  maxSize?: number
}

// RigFooter
export interface RigFooterProps {
  bordered?: boolean
}

// ---------------------------------------------------------------------------
// Tier 2 — Composable return types
// ---------------------------------------------------------------------------

// useClipboard
export interface UseClipboardReturn {
  copy: (text: string) => Promise<void>
  copied: Ref<boolean>
  isSupported: boolean
}

// useLocalStorage
export interface UseLocalStorageReturn<T> {
  value: Ref<T>
  remove: () => void
}

// useBreakpoint
export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export interface UseBreakpointReturn {
  current: Ref<Breakpoint>
  gte: (bp: Breakpoint) => ComputedRef<boolean>
  lt: (bp: Breakpoint) => ComputedRef<boolean>
}

// useSort
export type SortDirection = 'asc' | 'desc'

export interface UseSortReturn<T> {
  sorted: ComputedRef<T[]>
  sortBy: Ref<string>
  sortDir: Ref<SortDirection>
  toggleSort: (key: string) => void
}

// useFilter
export interface FilterConfig {
  key: string
  value: string
  match?: 'contains' | 'exact' | 'startsWith'
}

export interface UseFilterReturn<T> {
  filtered: ComputedRef<T[]>
  query: Ref<string>
  filters: Ref<FilterConfig[]>
  activeCount: ComputedRef<number>
  reset: () => void
}

// ---------------------------------------------------------------------------
// Tier 3 — Client engagement site components
// ---------------------------------------------------------------------------

// RigNavbar helper types
export interface NavbarDropdownItem {
  label: string
  href?: string
  to?: RouteLocationRaw
}

export interface NavbarItem {
  label: string
  href?: string
  to?: RouteLocationRaw
  children?: NavbarDropdownItem[]
}

// RigNavbar
export interface RigNavbarProps {
  brand?: string
  brandHref?: string
  items?: NavbarItem[]
  sticky?: boolean
  transparent?: boolean
  bordered?: boolean
}

// RigHero
export interface RigHeroProps {
  headline?: string
  subheadline?: string
  ctaLabel?: string
  ctaHref?: string
  secondaryCtaLabel?: string
  secondaryCtaHref?: string
  align?: 'left' | 'center' | 'right'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  overlay?: boolean
  overlayOpacity?: number
}

// RigCardGrid
export interface RigCardGridProps {
  minCardWidth?: string
  maxColumns?: number
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  masonry?: boolean
}

// RigContactForm helper types
export interface ContactFormField {
  name: string
  label: string
  type?: 'text' | 'email' | 'tel' | 'textarea' | 'select'
  placeholder?: string
  required?: boolean
  options?: { value: string; label: string }[]
}

// RigContactForm
export interface RigContactFormProps {
  formName: string
  fields?: ContactFormField[]
  submitLabel?: string
  successMessage?: string
  errorMessage?: string
  compact?: boolean
}

// RigTestimonial
export interface RigTestimonialProps {
  quote: string
  author: string
  role?: string
  avatar?: string
  rating?: number
  variant?: 'card' | 'inline' | 'featured'
}

// RigHoursDisplay helper types
export interface BusinessHours {
  day: string
  open?: string
  close?: string
  closed?: boolean
}

// RigHoursDisplay
export interface RigHoursDisplayProps {
  hours: BusinessHours[]
  timezone?: string
  highlightToday?: boolean
  showStatus?: boolean
  compact?: boolean
}

// RigPricingTable helper types
export interface PricingItem {
  name: string
  description?: string
  price: string | number
  badge?: string
}

export interface PricingSection {
  title: string
  description?: string
  items: PricingItem[]
}

// RigPricingTable
export interface RigPricingTableProps {
  sections: PricingSection[]
  currency?: string
  variant?: 'list' | 'card' | 'grid'
  showDividers?: boolean
  compact?: boolean
}

// RigGallery helper types
export interface GalleryImage {
  src: string
  alt: string
  caption?: string
  thumbnail?: string
}

// RigGallery
export interface RigGalleryProps {
  images: GalleryImage[]
  columns?: number
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg'
  aspectRatio?: 'square' | '4/3' | '3/2' | '16/9' | 'auto'
  lightbox?: boolean
}
