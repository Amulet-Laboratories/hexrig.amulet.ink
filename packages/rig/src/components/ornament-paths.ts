// Lightweight procedural path generator for simple ornaments.
// These functions return SVG path `d` strings for a given motif.
export function getOrnamentPath(motif: string, width = 800, height = 64): string {
  // Keep implementations intentionally simple and deterministic.
  switch (motif) {
    case 'geological':
      return `M0 ${height * 0.6} C ${width * 0.2} ${height * 0.45}, ${width * 0.4} ${height * 0.75}, ${width * 0.6} ${height * 0.55} C ${width * 0.75} ${height * 0.45}, ${width * 0.9} ${height * 0.6}, ${width} ${height * 0.5}`
    case 'technical':
      return `M0 ${height * 0.5} L ${width * 0.2} ${height * 0.5} M ${width * 0.25} ${height * 0.4} L ${width * 0.25} ${height * 0.6} M ${width * 0.4} ${height * 0.3} L ${width * 0.6} ${height * 0.7} M ${width * 0.8} ${height * 0.5} L ${width} ${height * 0.5}`
    case 'typographic':
      return `M0 ${height * 0.5} C ${width * 0.15} ${height * 0.2}, ${width * 0.35} ${height * 0.8}, ${width * 0.5} ${height * 0.5} C ${width * 0.65} ${height * 0.2}, ${width * 0.85} ${height * 0.8}, ${width} ${height * 0.5}`
    case 'toolmarks':
      return `M0 ${height * 0.55} C ${width * 0.12} ${height * 0.65}, ${width * 0.25} ${height * 0.4}, ${width * 0.38} ${height * 0.55} M ${width * 0.45} ${height * 0.58} C ${width * 0.6} ${height * 0.7}, ${width * 0.75} ${height * 0.45}, ${width} ${height * 0.55}`
    case 'waveform':
      return `M0 ${height * 0.5} C ${width * 0.125} ${height * 0.3}, ${width * 0.375} ${height * 0.7}, ${width * 0.5} ${height * 0.5} C ${width * 0.625} ${height * 0.3}, ${width * 0.875} ${height * 0.7}, ${width} ${height * 0.5}`
    case 'organic':
      return `M0 ${height * 0.6} C ${width * 0.1} ${height * 0.45}, ${width * 0.25} ${height * 0.55}, ${width * 0.4} ${height * 0.48} C ${width * 0.55} ${height * 0.4}, ${width * 0.7} ${height * 0.6}, ${width} ${height * 0.5}`
    default:
      return `M0 ${height * 0.5} L ${width} ${height * 0.5}`
  }
}
/**
 * Ornament Path Generator
 *
 * Procedural SVG path generators for each motif family.
 * Each function returns an SVG path `d` string.
 * Paths are deterministic (seeded) for reproducibility.
 */

export type OrnamentMotif =
  | 'geological'
  | 'technical'
  | 'typographic'
  | 'toolmarks'
  | 'waveform'
  | 'organic'
  | 'minimal'

interface PathOptions {
  width: number
  height: number
  seed?: number
}

/** Fast seedable PRNG (Mulberry32). Returns values in [0, 1). */
function mulberry32(seed: number): () => number {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * Geological — smooth flowing ridgeline curves.
 * Cove's motif: coral strokes on deep purple.
 */
function geological({ width, height, seed = 42 }: PathOptions): string {
  const rng = mulberry32(seed)
  const points = 12
  const segW = width / points
  const midY = height * 0.5
  const amplitude = height * 0.25

  let d = `M 0 ${midY}`

  for (let i = 0; i < points; i++) {
    const x1 = i * segW + segW * 0.33
    const y1 = midY + (rng() - 0.5) * amplitude
    const x2 = i * segW + segW * 0.66
    const y2 = midY + (rng() - 0.5) * amplitude
    const x3 = (i + 1) * segW
    const y3 = midY + (rng() - 0.5) * amplitude * 0.6
    d += ` C ${x1.toFixed(1)} ${y1.toFixed(1)}, ${x2.toFixed(1)} ${y2.toFixed(1)}, ${x3.toFixed(1)} ${y3.toFixed(1)}`
  }

  // Second strata line below
  let d2 = `M 0 ${midY + height * 0.2}`
  for (let i = 0; i < points; i++) {
    const x1 = i * segW + segW * 0.33
    const y1 = midY + height * 0.2 + (rng() - 0.5) * amplitude * 0.4
    const x2 = i * segW + segW * 0.66
    const y2 = midY + height * 0.2 + (rng() - 0.5) * amplitude * 0.4
    const x3 = (i + 1) * segW
    const y3 = midY + height * 0.2 + (rng() - 0.5) * amplitude * 0.3
    d2 += ` C ${x1.toFixed(1)} ${y1.toFixed(1)}, ${x2.toFixed(1)} ${y2.toFixed(1)}, ${x3.toFixed(1)} ${y3.toFixed(1)}`
  }

  return `${d} ${d2}`
}

/**
 * Technical — clean geometric forms, circuit traces, measurement marks.
 * Reef's motif: precise, uniform stroke weight.
 */
function technical({ width, height, seed = 17 }: PathOptions): string {
  const rng = mulberry32(seed)
  const midY = height * 0.5
  const segments: string[] = []

  // Main horizontal line with measurement ticks
  segments.push(`M 0 ${midY} L ${width} ${midY}`)

  // Tick marks at regular intervals
  const tickCount = 16
  const tickSpacing = width / tickCount
  for (let i = 1; i < tickCount; i++) {
    const x = i * tickSpacing
    const tickH = i % 4 === 0 ? height * 0.35 : height * 0.15
    const offset = rng() * 2 - 1 // slight variation
    segments.push(`M ${x} ${midY - tickH + offset} L ${x} ${midY + tickH + offset}`)
  }

  // Geometric accent — right-angle bracket forms
  const bracketW = width * 0.06
  const bracketH = height * 0.25
  const bx1 = width * 0.15
  segments.push(
    `M ${bx1} ${midY - bracketH} L ${bx1 + bracketW} ${midY - bracketH} L ${bx1 + bracketW} ${midY + bracketH} L ${bx1} ${midY + bracketH}`,
  )
  const bx2 = width * 0.85
  segments.push(
    `M ${bx2} ${midY - bracketH} L ${bx2 - bracketW} ${midY - bracketH} L ${bx2 - bracketW} ${midY + bracketH} L ${bx2} ${midY + bracketH}`,
  )

  return segments.join(' ')
}

/**
 * Typographic — illuminated letter fragments, pilcrow ornaments, rule lines.
 * Hearth's motif: gold on near-black.
 */
function typographic({ width, height, seed = 73 }: PathOptions): string {
  const midY = height * 0.5
  const segments: string[] = []

  // Main rule line with serif terminals
  const serifW = 4
  const serifH = height * 0.12
  segments.push(`M ${serifW} ${midY - serifH} L ${serifW} ${midY + serifH}`) // left serif
  segments.push(`M 0 ${midY} L ${width} ${midY}`) // rule
  segments.push(`M ${width - serifW} ${midY - serifH} L ${width - serifW} ${midY + serifH}`) // right serif

  // Pilcrow ornament at center
  const cx = width * 0.5
  const pW = 6
  const pH = height * 0.35
  segments.push(`M ${cx} ${midY - pH} L ${cx} ${midY + pH}`) // stem
  segments.push(`M ${cx + pW} ${midY - pH} L ${cx + pW} ${midY + pH * 0.5}`) // second stem
  // Bowl (arc)
  segments.push(
    `M ${cx} ${midY - pH} Q ${cx - pW * 2.5} ${midY - pH + pH * 0.5}, ${cx} ${midY - pH + pH * 0.6}`,
  )

  // Decorative dots
  const rng = mulberry32(seed)
  for (let i = 0; i < 3; i++) {
    const dx = width * 0.2 + rng() * width * 0.6
    segments.push(`M ${dx.toFixed(1)} ${midY} m -1.5 0 a 1.5 1.5 0 1 0 3 0 a 1.5 1.5 0 1 0 -3 0`)
  }

  return segments.join(' ')
}

/**
 * Toolmarks — slightly uneven strokes, cross-hatching.
 * Ember's motif: hand-drawn, deliberate imperfection.
 */
function toolmarks({ width, height, seed = 31 }: PathOptions): string {
  const rng = mulberry32(seed)
  const midY = height * 0.5
  const segments: string[] = []

  // Rough horizontal line (hand-drawn quality via micro-perturbations)
  let d = `M 0 ${midY}`
  const steps = 40
  const stepW = width / steps
  for (let i = 1; i <= steps; i++) {
    const x = i * stepW
    const y = midY + (rng() - 0.5) * 3
    d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`
  }
  segments.push(d)

  // Cross-hatching region in center
  const hatchX = width * 0.35
  const hatchW = width * 0.3
  const hatchH = height * 0.3
  const hatchLines = 8
  for (let i = 0; i < hatchLines; i++) {
    const t = i / hatchLines
    const x1 = hatchX + t * hatchW + (rng() - 0.5) * 2
    const y1 = midY - hatchH + (rng() - 0.5) * 2
    const x2 = hatchX + t * hatchW * 0.8 + (rng() - 0.5) * 2
    const y2 = midY + hatchH + (rng() - 0.5) * 2
    segments.push(`M ${x1.toFixed(1)} ${y1.toFixed(1)} L ${x2.toFixed(1)} ${y2.toFixed(1)}`)
  }
  for (let i = 0; i < hatchLines; i++) {
    const t = i / hatchLines
    const x1 = hatchX + hatchW - t * hatchW + (rng() - 0.5) * 2
    const y1 = midY - hatchH + (rng() - 0.5) * 2
    const x2 = hatchX + hatchW - t * hatchW * 0.8 + (rng() - 0.5) * 2
    const y2 = midY + hatchH + (rng() - 0.5) * 2
    segments.push(`M ${x1.toFixed(1)} ${y1.toFixed(1)} L ${x2.toFixed(1)} ${y2.toFixed(1)}`)
  }

  return segments.join(' ')
}

/**
 * Waveform — sine curves, spectral lines, oscilloscope traces.
 * Abyss's motif: electric green on navy, thin and scientific.
 */
function waveform({ width, height, seed = 55 }: PathOptions): string {
  const rng = mulberry32(seed)
  const midY = height * 0.5
  const segments: string[] = []

  // Primary sine wave
  let d = `M 0 ${midY}`
  const resolution = 80
  const stepW = width / resolution
  const freq1 = 3 + rng() * 2
  const amp1 = height * 0.25
  for (let i = 1; i <= resolution; i++) {
    const x = i * stepW
    const y = midY + Math.sin((i / resolution) * Math.PI * 2 * freq1) * amp1
    d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`
  }
  segments.push(d)

  // Secondary harmonic (higher frequency, lower amplitude)
  let d2 = `M 0 ${midY}`
  const freq2 = freq1 * 2.5
  const amp2 = height * 0.1
  for (let i = 1; i <= resolution; i++) {
    const x = i * stepW
    const y = midY + Math.sin((i / resolution) * Math.PI * 2 * freq2) * amp2
    d2 += ` L ${x.toFixed(1)} ${y.toFixed(1)}`
  }
  segments.push(d2)

  // Spectral tick marks at zero crossings
  for (let i = 0; i < resolution; i += Math.round(resolution / freq1 / 2)) {
    const x = i * stepW
    segments.push(`M ${x} ${midY - height * 0.05} L ${x} ${midY + height * 0.05}`)
  }

  return segments.join(' ')
}

/**
 * Organic — branching lines, leaf veins, connecting nodes.
 * Grove's motif: sage on green-black, lines that fork and reconnect.
 */
function organic({ width, height, seed = 89 }: PathOptions): string {
  const rng = mulberry32(seed)
  const midY = height * 0.5
  const segments: string[] = []

  // Main stem — gentle S-curve
  segments.push(
    `M 0 ${midY} C ${width * 0.25} ${midY - height * 0.15}, ${width * 0.75} ${midY + height * 0.15}, ${width} ${midY}`,
  )

  // Branches forking off the main stem
  const branchCount = 6
  for (let i = 0; i < branchCount; i++) {
    const t = (i + 1) / (branchCount + 1)
    const bx = t * width
    const by =
      midY +
      Math.sin(t * Math.PI) *
        (t < 0.5 ? -height * 0.15 : height * 0.15) *
        (1 - Math.abs(t - 0.5) * 2)

    const direction = rng() > 0.5 ? -1 : 1
    const branchLen = width * 0.06 + rng() * width * 0.08
    const branchAngle = direction * (0.3 + rng() * 0.5)
    const bxEnd = bx + Math.cos(branchAngle) * branchLen
    const byEnd = by + Math.sin(branchAngle) * branchLen * direction

    // Branch as quadratic bezier
    const cpx = bx + (bxEnd - bx) * 0.5 + (rng() - 0.5) * 10
    const cpy = by + (byEnd - by) * 0.5 + direction * 8
    segments.push(
      `M ${bx.toFixed(1)} ${by.toFixed(1)} Q ${cpx.toFixed(1)} ${cpy.toFixed(1)}, ${bxEnd.toFixed(1)} ${byEnd.toFixed(1)}`,
    )

    // Sub-branch
    if (rng() > 0.4) {
      const sbLen = branchLen * 0.5
      const sbAngle = branchAngle + direction * (0.2 + rng() * 0.3)
      const sbx = bxEnd + Math.cos(sbAngle) * sbLen
      const sby = byEnd + Math.sin(sbAngle) * sbLen * direction
      segments.push(
        `M ${bxEnd.toFixed(1)} ${byEnd.toFixed(1)} L ${sbx.toFixed(1)} ${sby.toFixed(1)}`,
      )
    }
  }

  // Small dots at branch endpoints (nodes)
  for (let i = 0; i < 4; i++) {
    const nx = width * 0.15 + rng() * width * 0.7
    const ny = midY + (rng() - 0.5) * height * 0.4
    segments.push(`M ${nx.toFixed(1)} ${ny.toFixed(1)} m -2 0 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0`)
  }

  return segments.join(' ')
}

/**
 * Minimal — single straight rule line.
 * For operational properties (Linen, Keep, Slate).
 */
function minimal({ width, height }: PathOptions): string {
  const midY = height * 0.5
  return `M 0 ${midY} L ${width} ${midY}`
}

/** Generator map */
const generators: Record<OrnamentMotif, (opts: PathOptions) => string> = {
  geological,
  technical,
  typographic,
  toolmarks,
  waveform,
  organic,
  minimal,
}

/**
 * Generate an ornament SVG path for the given motif.
 */
export function generateOrnamentPath(
  motif: OrnamentMotif,
  options: PathOptions = { width: 800, height: 60 },
): string {
  return generators[motif](options)
}

/**
 * Get the total path length estimate for strokeDasharray animation.
 * This is an approximation — actual length computed via SVG at runtime.
 */
export function estimatePathLength(motif: OrnamentMotif, width: number): number {
  switch (motif) {
    case 'minimal':
      return width
    case 'geological':
      return width * 2.5
    case 'technical':
      return width * 3
    case 'typographic':
      return width * 2
    case 'toolmarks':
      return width * 4
    case 'waveform':
      return width * 3
    case 'organic':
      return width * 3
    default:
      return width * 2
  }
}
