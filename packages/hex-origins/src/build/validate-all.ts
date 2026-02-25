/**
 * Validate all Origins themes — structural completeness + WCAG contrast.
 */

import { themes } from '../themes/index'
import { validateTheme } from '@amulet-laboratories/hex'

let hasErrors = false

for (const theme of Object.values(themes)) {
  const result = validateTheme(theme)

  if (result.valid) {
    console.log(`✓ ${theme.id} — valid`)
  } else {
    hasErrors = true
    console.log(`✗ ${theme.id} — ${result.errors.length} error(s):`)
    for (const error of result.errors) {
      console.log(`  [${error.mode}] ${error.category}: ${error.message}`)
    }
  }

  if (result.warnings.length > 0) {
    for (const warning of result.warnings) {
      console.log(`  ⚠ ${warning}`)
    }
  }
}

if (hasErrors) {
  console.log('\nValidation failed.')
  process.exit(1)
} else {
  console.log('\nAll themes valid.')
}
