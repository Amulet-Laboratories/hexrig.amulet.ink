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

// Tier 1 — Tower baseline
export { default as RigStatus } from './components/RigStatus.vue'
export { default as RigEmpty } from './components/RigEmpty.vue'
export { default as RigConfirm } from './components/RigConfirm.vue'
export { default as RigHeader } from './components/RigHeader.vue'
export { default as RigPage } from './components/RigPage.vue'
export { default as RigPanel } from './components/RigPanel.vue'
export { default as RigSidebar } from './components/RigSidebar.vue'
export { default as RigSidebarSection } from './components/RigSidebarSection.vue'
export { default as RigSidebarItem } from './components/RigSidebarItem.vue'
export { default as RigAppShell } from './components/RigAppShell.vue'
export { default as RigTable } from './components/RigTable.vue'

// Tier 2 — Tower full experience
export { default as RigRadio } from './components/RigRadio.vue'
export { default as RigStat } from './components/RigStat.vue'
export { default as RigMetadata } from './components/RigMetadata.vue'
export { default as RigList } from './components/RigList.vue'
export { default as RigTimeline } from './components/RigTimeline.vue'
export { default as RigTree } from './components/RigTree.vue'
export { default as RigSplit } from './components/RigSplit.vue'
export { default as RigFooter } from './components/RigFooter.vue'

// Composables
export { useTheme, provideTheme } from './composables/useTheme'
export { useMotion } from './composables/useMotion'
export { useToast, provideToast } from './composables/useToast'
export { useKeyboard } from './composables/useKeyboard'
export { useClipboard } from './composables/useClipboard'
export { useLocalStorage } from './composables/useLocalStorage'
export { useBreakpoint } from './composables/useBreakpoint'
export { useSort } from './composables/useSort'
export { useFilter } from './composables/useFilter'

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
  RigStatusProps,
  RigEmptyProps,
  RigConfirmProps,
  RigHeaderProps,
  RigPageProps,
  RigPanelProps,
  RigSidebarProps,
  RigSidebarSectionProps,
  RigSidebarItemProps,
  RigAppShellProps,
  RigTableColumn,
  RigTableProps,
  KeyboardShortcut,
  UseKeyboardReturn,
  RigRadioOption,
  RigRadioProps,
  RigStatProps,
  MetadataItem,
  RigMetadataProps,
  ListItem,
  RigListProps,
  TimelineItem,
  RigTimelineProps,
  TreeNode,
  RigTreeProps,
  RigSplitProps,
  RigFooterProps,
  UseClipboardReturn,
  UseLocalStorageReturn,
  Breakpoint,
  UseBreakpointReturn,
  SortDirection,
  UseSortReturn,
  FilterConfig,
  UseFilterReturn,
} from './types'
