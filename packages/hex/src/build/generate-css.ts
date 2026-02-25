/**
 * Generate CSS theme files for all Hex themes.
 * Output: dist/themes/{name}.css
 */

import { writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { themes } from '../themes/index'
import { generateThemeCSS } from '../utils/css'

const outDir = join(import.meta.dirname, '../../dist/themes')

try {
  mkdirSync(outDir, { recursive: true })

  for (const theme of Object.values(themes)) {
    const css = generateThemeCSS(theme)
    const filePath = join(outDir, `${theme.id}.css`)
    writeFileSync(filePath, css, 'utf-8')
    console.log(`✓ ${filePath}`)
  }

  console.log(`\nGenerated ${Object.keys(themes).length} CSS theme files.`)
} catch (error) {
  console.error('Failed to generate CSS theme files:', error)
  process.exit(1)
}
