/**
 * Shared inline SVG icon paths used across Rig components.
 *
 * These are simple path data strings for the SVG `d` attribute.
 * Components render them inline to avoid icon library dependencies
 * for internal UI chrome (dismiss buttons, status indicators).
 */

/** Close / dismiss X icon path */
export const ICON_DISMISS = 'M18 6L6 18M6 6l12 12'

/** Status tone icon paths */
export const ICON_PATHS: Record<string, string> = {
  success: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  warning:
    'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.07 16.5c-.77.833.192 2.5 1.732 2.5z',
  error: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
  info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  neutral: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
}

/** Tone-specific icon color classes */
export const ICON_COLOR_CLASSES: Record<string, string> = {
  success: 'text-status-success',
  warning: 'text-status-warning',
  error: 'text-status-error',
  info: 'text-status-info',
  neutral: 'text-text-muted',
}

/** Tone-specific container classes for alerts */
export const ALERT_TONE_CLASSES: Record<string, string> = {
  success: 'border-status-success/30 bg-status-success/10 text-text-primary',
  warning: 'border-status-warning/30 bg-status-warning/10 text-text-primary',
  error: 'border-status-error/30 bg-status-error/10 text-text-primary',
  info: 'border-border bg-surface-raised text-text-primary',
}

/** Tone-specific container classes for toasts */
export const TOAST_TONE_CLASSES: Record<string, string> = {
  success: 'border-status-success/30 bg-surface-raised',
  warning: 'border-status-warning/30 bg-surface-raised',
  error: 'border-status-error/30 bg-surface-raised',
  info: 'border-border bg-surface-raised',
  neutral: 'border-border bg-surface-raised',
}
