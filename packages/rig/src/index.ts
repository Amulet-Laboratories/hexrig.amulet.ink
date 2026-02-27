/**
 * Rig — Vue 3 Component Library
 *
 * @amulet-laboratories/rig
 *
 * Minimal, production-grade components consuming Hex theme tokens.
 */

import './style.css'

// Components
export { default as RigThemeProvider } from './components/RigThemeProvider.vue'
export { default as RigText } from './components/RigText.vue'
export { default as RigButton } from './components/RigButton.vue'
export { default as RigInput } from './components/RigInput.vue'
export { default as RigIcon } from './components/RigIcon.vue'
export { default as RigSurface } from './components/RigSurface.vue'
export { default as RigDivider } from './components/RigDivider.vue'
export { default as RigBadge } from './components/RigBadge.vue'
export { default as RigAlert } from './components/RigAlert.vue'
export { default as RigCard } from './components/RigCard.vue'
export { default as RigDialog } from './components/RigDialog.vue'
export { default as RigToast } from './components/RigToast.vue'
export { default as RigContainer } from './components/RigContainer.vue'
export { default as RigStack } from './components/RigStack.vue'
export { default as RigGrid } from './components/RigGrid.vue'
export { default as RigSpacer } from './components/RigSpacer.vue'
export { default as RigSpinner } from './components/RigSpinner.vue'
export { default as RigSkeleton } from './components/RigSkeleton.vue'
export { default as RigProgress } from './components/RigProgress.vue'
export { default as RigTooltip } from './components/RigTooltip.vue'
export { default as RigTabs } from './components/RigTabs.vue'
export { default as RigAccordion } from './components/RigAccordion.vue'
export { default as RigBreadcrumb } from './components/RigBreadcrumb.vue'
export { default as RigAvatar } from './components/RigAvatar.vue'
export { default as RigSelect } from './components/RigSelect.vue'
export { default as RigCheckbox } from './components/RigCheckbox.vue'
export { default as RigSwitch } from './components/RigSwitch.vue'
export { default as RigTag } from './components/RigTag.vue'
export { default as RigNoiseGrain } from './components/RigNoiseGrain.vue'

// Composables
export { useTheme, provideTheme } from './composables/useTheme'
export { useMotion } from './composables/useMotion'
export { useToast, provideToast } from './composables/useToast'

// Types
export type {
  ModeId,
  RigTextProps,
  RigButtonProps,
  RigInputProps,
  RigIconProps,
  RigSurfaceProps,
  RigDividerProps,
  RigBadgeProps,
  RigAlertProps,
  RigCardProps,
  RigDialogProps,
  RigThemeProviderProps,
  RigToastProps,
  RigContainerProps,
  RigStackProps,
  RigGridProps,
  RigSpacerProps,
  RigSpinnerProps,
  RigSkeletonProps,
  RigProgressProps,
  RigTooltipProps,
  RigTabItem,
  RigTabsProps,
  RigAccordionItem,
  RigAccordionProps,
  RigBreadcrumbItem,
  RigBreadcrumbProps,
  RigAvatarProps,
  RigSelectOption,
  RigSelectProps,
  RigCheckboxProps,
  RigSwitchProps,
  RigTagProps,
  RigNoiseGrainProps,
  ToastOptions,
  ToastInstance,
  UseThemeReturn,
  UseMotionReturn,
  UseToastReturn,
} from './types'
