/**
 * Generate VSCode theme JSON files for all Hex themes.
 * Output: themes/{name}-{scheme}.json
 */

import { writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { themes } from '../themes/index'
import { generateVSCodeTheme } from '../utils/vscode'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, '../../themes')

try {
  mkdirSync(outDir, { recursive: true })

  let count = 0

  for (const theme of Object.values(themes)) {
    for (const scheme of ['dark', 'light'] as const) {
      const vscodeTheme = generateVSCodeTheme(theme, scheme)
      const fileName = `${theme.id}-${scheme}.json`
      const filePath = join(outDir, fileName)
      writeFileSync(filePath, JSON.stringify(vscodeTheme, null, 2), 'utf-8')
      console.log(`✓ ${filePath}`)
      count++
    }
  }

  console.log(`\nGenerated ${count} VSCode theme files.`)
} catch (error) {
  console.error('Failed to generate VSCode theme files:', error)
  process.exit(1)
}
