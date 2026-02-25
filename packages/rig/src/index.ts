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

// Composables
export { useTheme, provideTheme } from './composables/useTheme'
export { useMotion } from './composables/useMotion'
export { useToast, provideToast } from './composables/useToast'

// Types
export type {
  ThemeId,
  SchemeId,
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
  ToastOptions,
  ToastInstance,
  UseThemeReturn,
  UseMotionReturn,
  UseToastReturn,
} from './types'
