# Hex Design System — Research & Best Practices

## A Framework for Expressive, Production-Grade Theming

---

## 1. Typography: The 85% of Your Interface

Typography accounts for roughly 85–90% of any given screen. It's not decoration — it *is* the interface. The Hex system needs to treat type as a first-class citizen with far more nuance than font-family alone.

### 1a. Font Strategy Per Theme

Each theme should tell a different story through its typeface pairings. The current system uses Inter everywhere — this is the single biggest missed opportunity. Research consistently shows that distinctive typeface choices are the most immediate way to communicate personality, and that the "hyper-uniform AI aesthetic" is creating visual fatigue.

**Recommended pairings (one direction — many possible):**

| Theme | Heading | Body | Mono | Personality |
|-------|---------|------|------|-------------|
| **Rust** | Fraunces (variable, opsz) | Source Serif 4 or Literata | JetBrains Mono | Warm craft, old-world authority, hand-forged |
| **Warp** | Space Grotesk or Outfit | Inter or DM Sans | IBM Plex Mono or Fira Code | Precision, clinical, machine-like |
| **Thorn** | Lora or Newsreader | Source Sans 3 or Nunito | DM Mono | Organic, literary, naturalist |
| **Maul** | Bebas Neue or Anton | Barlow or Work Sans | Roboto Mono | Industrial, utilitarian, raw force |
| **Jinx** | Crimson Pro or Playfair Display | Alegreya Sans or Libre Franklin | Victor Mono or Fantasque Sans Mono | Mystical, arcane, high-contrast elegance |

**Key principles:**
- **Reserve expressive/display fonts for headings.** Body text must prioritize legibility. Pair a distinctive heading face with a neutral-but-characterful body face.
- **Use variable fonts wherever possible.** A single variable font file replaces multiple static weights, improving performance while unlocking intermediate weights (like 450 for body, 625 for subheadings — values between Regular and SemiBold that create subtler hierarchy).
- **Leverage the optical size axis (opsz).** Fraunces, Inter, Roboto Flex, and others have an opsz axis that automatically adjusts letterform design at different sizes — thicker strokes and wider apertures at small sizes, more delicate contrast at display sizes. This is free readability improvement. Browsers handle it automatically with `font-optical-sizing: auto`.
- **Theme fonts should share a structural kinship** with the theme's visual language (rounded borders → rounded type; angular UI → geometric type; organic shapes → humanist type).

### 1b. Modular Type Scale

Root the scale in math, not intuition. A ratio-based scale creates harmonic relationships between sizes.

**Recommended: 1.25 (Major Third) ratio, 4px grid alignment**

```
--text-xs:    0.75rem   (12px)  — fine print, timestamps
--text-sm:    0.875rem  (14px)  — captions, labels, secondary
--text-base:  1rem      (16px)  — body text, default
--text-lg:    1.125rem  (18px)  — lead paragraphs
--text-xl:    1.25rem   (20px)  — subheadings
--text-2xl:   1.5rem    (24px)  — card titles
--text-3xl:   1.875rem  (30px)  — section titles
--text-4xl:   2.25rem   (36px)  — page titles
--text-5xl:   3rem      (48px)  — hero headings
--text-6xl:   3.75rem   (60px)  — display
--text-7xl:   4.5rem    (72px)  — display large
```

**Critical: Line height should be ratio-based and snapped to a 4px grid.**
- Display/headings: `line-height: 1.1–1.2` (tighter at large sizes)
- Body text: `line-height: 1.5` (standard readability)
- Small/caption text: `line-height: 1.5–1.6` (more breathing room at small sizes)

Round all computed line-heights to multiples of 4px for vertical rhythm.

### 1c. Responsive Typography

The scale should breathe across breakpoints. Two strategies:

1. **Fluid type with `clamp()`**: `font-size: clamp(1rem, 0.5rem + 1.5vw, 1.25rem)` — the text smoothly scales between a minimum and maximum.
2. **Breakpoint-based base size adjustment**: Change `--text-base` at breakpoints (e.g., 16px mobile → 17px tablet → 18px desktop). Because the scale is relative (`rem`), all sizes shift proportionally.

### 1d. Letter Spacing & Dark Mode

In dark mode, light text on dark backgrounds benefits from slightly more open letter-spacing. Figma's own design system maintains separate text styles for positive (dark-on-light) and negative (light-on-dark) applications, with a subtle tracking adjustment for dark mode. Consider:

```css
[data-scheme="dark"] { --tracking-body: 0.01em; }
[data-scheme="light"] { --tracking-body: 0; }
```

### 1e. Typography Tokens (Semantic)

Beyond raw sizes, define semantic type roles:

```
--type-display    → heading font, text-5xl+, weight-bold, leading-none
--type-heading    → heading font, text-2xl–4xl, weight-semibold, leading-tight
--type-subheading → heading font, text-lg–xl, weight-medium, leading-snug
--type-body       → body font, text-base, weight-regular, leading-normal
--type-caption    → body font, text-sm, weight-regular, leading-relaxed
--type-overline   → body font, text-xs, weight-medium, tracking-widest, uppercase
--type-code       → mono font, text-sm, weight-regular, leading-relaxed
```

These composite tokens encode the *intent* of the typography, not just the mechanics.

---

## 2. Color Theory & Psychology

### 2a. The Emotional Architecture of Each Theme

Color is processed before text — within 90 milliseconds, people form subconscious judgments based on color alone. Research shows up to 90% of initial product judgments are based on color. Each Hex theme should deliberately map to a psychological territory:

| Theme | Hue Family | Psychological Territory | Evokes |
|-------|-----------|------------------------|--------|
| **Rust** | Warm bronze/amber | Trust, craft, heritage, warmth | A blacksmith's workshop, aged leather, firelight |
| **Warp** | Cool electric blue | Precision, technology, trust, calm | Clean rooms, deep space, digital frontiers |
| **Thorn** | Deep green | Growth, nature, safety, renewal | Dense forests, botanical gardens, living things |
| **Maul** | Hot amber/orange | Energy, urgency, industry, confidence | Foundries, construction, molten metal |
| **Jinx** | Deep violet/purple | Mystery, creativity, luxury, arcane | Alchemy labs, twilight, esoteric knowledge |

**Critical insight from research**: Color psychology is context-dependent. The *appropriateness* of a color to its context matters more than universal associations. Each theme works because its palette is internally coherent — the color supports the narrative, not the other way around.

### 2b. Color Architecture: Three-Tier Token System

Structure tokens in layers for maximum flexibility with minimum chaos:

**Tier 1: Primitives** (raw values, never used directly in components)
```
--hex-bronze-50: #fef7f0    --hex-bronze-900: #3d1f0a
--hex-blue-50: #f0f4ff      --hex-blue-900: #0a1a3d
```

**Tier 2: Semantic** (purpose-driven, theme-aware)
```
--hex-color-surface-base      → what the page sits on
--hex-color-text-primary      → most important text
--hex-color-accent-primary    → primary interactive color
--hex-color-status-error      → something went wrong
```

**Tier 3: Component** (specific to a component's anatomy)
```
--hex-button-bg               → references accent-primary
--hex-button-text             → references text-on-accent
--hex-card-border             → references border-default
```

This three-tier system lets you change a theme (Tier 1 swap), change a design decision (Tier 2 remap), or customize a single component (Tier 3 override) independently.

### 2c. The 60-30-10 Rule

Every theme should follow this distribution:
- **60%** — Surface colors (base, raised, sunken). This is the *ground*.
- **30%** — Text and border colors. This is the *structure*.
- **10%** — Accent and status colors. This is the *signal*.

Accent is powerful *because* it's scarce. A theme that uses accent color everywhere dilutes its impact.

### 2d. Dark Mode Is Not Inversion

Key findings from accessibility research:
- **Avoid pure black (#000000).** Use dark grays (#0f0d0a, #121212). Pure black causes halation — a glowing/halo effect around text, especially for users with astigmatism.
- **Avoid pure white text.** Use off-whites (#f5f1ed, #e8eaf0). The contrast is still high but less harsh.
- **Desaturate colors in dark mode.** Highly saturated colors on dark backgrounds appear to "vibrate" or bleed. Drop saturation 10–20% for dark schemes.
- **Elevate with lightness, not shadow.** In dark mode, higher surfaces should be *lighter*, not shadowed. Material Design uses tinted overlays; your `surface-raised` being lighter than `surface-base` is correct.
- **Shadow opacity should increase in dark mode** (you're already doing this). Dark mode shadows need more opacity to register against dark backgrounds.

---

## 3. Accessibility (WCAG 2.1 AA Minimum)

### 3a. Contrast Requirements

| Element | Minimum Ratio | Standard |
|---------|--------------|----------|
| Body text (< 18px / < 14px bold) | **4.5:1** | WCAG 1.4.3 AA |
| Large text (≥ 18px / ≥ 14px bold) | **3:1** | WCAG 1.4.3 AA |
| UI components & graphical objects | **3:1** | WCAG 1.4.11 AA |
| Enhanced (AAA) body text | **7:1** | WCAG 1.4.6 AAA |

**Action items for Hex:**
- Audit every `text-*` token against every `surface-*` token in both schemes.
- The `text-muted` tokens are the most likely to fail. Muted text still needs 4.5:1 against its background.
- Status colors (success/warning/error/info) used as text need 4.5:1. Used as large UI elements, 3:1.
- Focus rings need 3:1 contrast against adjacent colors.

### 3b. Beyond Contrast

- **Never use color alone to convey meaning.** Error states need icons or text labels, not just red.
- **Focus indicators must be visible.** `focus-ring` tokens exist — ensure they produce a visible 2px+ outline with adequate contrast.
- **Respect `prefers-reduced-motion`.** All motion tokens should have a reduced-motion fallback.
- **Respect `prefers-color-scheme`.** Auto-detect and apply the correct scheme.
- **Target sizes**: Interactive elements should be at least 24×24px (WCAG 2.5.8 AA), ideally 44×44px for touch.

---

## 4. Motion & Animation Tokens

Motion is the most under-specified layer in most design systems. IBM Carbon's productive/expressive duality is the gold standard here and maps beautifully to Hex's narrative themes.

### 4a. Two Motion Modes

- **Productive motion**: Fast, functional, keeps users in flow. Micro-interactions, dropdowns, toggles. Gets out of the way.
- **Expressive motion**: Slower, more visible, creates moments. Page transitions, primary actions, notifications. Draws attention.

### 4b. Duration Tokens

```
--motion-duration-instant:   0ms       (no animation)
--motion-duration-fast:      100ms     (micro-feedback)
--motion-duration-normal:    200ms     (standard transitions)
--motion-duration-moderate:  300ms     (emphasis transitions)
--motion-duration-slow:      500ms     (expressive moments)
--motion-duration-slower:    700ms     (dramatic reveals)
```

Duration should be dynamic — larger elements or longer distances need more time. But static tokens cover 90% of cases.

### 4c. Easing Curves (Per Theme)

This is where themes get truly expressive. Each theme can have its own easing personality:

```
/* Standard (visible throughout) */
--motion-ease-standard:      cubic-bezier(0.4, 0.0, 0.2, 1.0)

/* Entrance (ease-out: fast start, gentle landing) */
--motion-ease-entrance:      cubic-bezier(0.0, 0.0, 0.2, 1.0)

/* Exit (ease-in: gentle start, fast departure) */
--motion-ease-exit:          cubic-bezier(0.4, 0.0, 1.0, 1.0)

/* Expressive (more dramatic overshoot) */
--motion-ease-expressive:    cubic-bezier(0.34, 1.56, 0.64, 1.0)
```

**Theme-specific tuning:**
- **Rust**: Slightly heavier easing, like weighted metal. Longer settle.
- **Warp**: Crisp, mechanical. Shorter durations, sharper curves. Linear for data.
- **Thorn**: Organic ease. Longer durations, softer curves. Things grow and unfurl.
- **Maul**: Heavy and deliberate. Strong deceleration. Things slam into place.
- **Jinx**: Mysterious, with slight overshoot. Things drift and settle ethereally.

### 4d. Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

Always provide this. Non-negotiable.

---

## 5. Iconography

### 5a. System Approach

Icons in a design system should feel like they belong to the same family — unified by:
- **Consistent grid**: 24×24px base grid with 20×20px live area and 2px padding
- **Consistent stroke width**: 1.5px or 2px, matching the visual weight of your body text
- **Consistent corner radius**: Should echo the theme's border-radius tokens
- **Consistent visual metaphors**: Use universally recognized symbols; avoid cultural specificity

### 5b. Icon Variants Per Theme

Icons should be a shared set, but their *rendering parameters* can vary per theme:

| Parameter | Rust | Warp | Thorn | Maul | Jinx |
|-----------|------|------|-------|------|------|
| Stroke width | 1.5px | 1.5px | 1.5px | 2px | 1.5px |
| Corner radius | 2px | 0px (sharp) | 3px (rounded) | 1px | 2px |
| Line cap | round | butt | round | square | round |
| Style | outlined | outlined | outlined | filled/outlined | outlined |

This gives each theme a distinct icon feel without redrawing hundreds of icons. A "settings gear" icon rendered with round caps and 3px corners (Thorn) feels botanical; the same icon with square caps and 0px corners (Warp) feels technical.

### 5c. Icon Sizing Scale

Align to the spacing scale:
- **Small**: 16×16px — inline with caption text
- **Medium**: 20×20px — inline with body text (default)
- **Large**: 24×24px — buttons, navigation
- **XL**: 32×32px — feature icons, empty states

### 5d. Icon Color Tokens

```
--hex-icon-primary:    → text-primary (default)
--hex-icon-secondary:  → text-secondary
--hex-icon-muted:      → text-muted
--hex-icon-accent:     → accent-primary
--hex-icon-on-accent:  → text-on-accent
--hex-icon-success:    → status-success
--hex-icon-warning:    → status-warning
--hex-icon-error:      → status-error
--hex-icon-info:       → status-info
```

---

## 6. Spacing, Layout & Rhythm

### 6a. 4px Base Unit

The 4px grid is well-established as the optimal base. It's small enough for precision, large enough to be meaningful, and divides/multiplies cleanly.

```
--space-0:   0px
--space-px:  1px       (borders, hairlines)
--space-0.5: 2px       (micro adjustments)
--space-1:   4px       (minimum padding, icon gaps)
--space-2:   8px       (tight padding, small gaps)
--space-3:   12px      (compact padding)
--space-4:   16px      (standard padding, paragraph spacing)
--space-5:   20px      (comfortable padding)
--space-6:   24px      (section padding, card padding)
--space-8:   32px      (large gaps)
--space-10:  40px      (section spacing)
--space-12:  48px      (major section breaks)
--space-16:  64px      (page-level spacing)
--space-20:  80px      (hero sections)
--space-24:  96px      (maximum breathing room)
```

### 6b. Semantic Spacing Tokens

Like color, spacing benefits from semantic naming:
```
--space-inset-sm:     var(--space-2)         (tight component padding)
--space-inset-md:     var(--space-4)         (standard component padding)
--space-inset-lg:     var(--space-6)         (spacious component padding)
--space-stack-sm:     var(--space-2)         (tight vertical rhythm)
--space-stack-md:     var(--space-4)         (standard vertical rhythm)
--space-stack-lg:     var(--space-8)         (section breaks)
--space-inline-sm:    var(--space-2)         (icon-to-text gap)
--space-inline-md:    var(--space-3)         (button icon gap)
```

### 6c. Per-Theme Spacing "Feel"

Themes can optionally adjust the density scale:
- **Warp**: Slightly tighter — data-dense, efficient
- **Thorn**: Slightly more generous — organic, breathable
- **Maul**: Tight — industrial, utilitarian density
- **Jinx**: Generous — mystical, airy, ceremonial
- **Rust**: Balanced default

This could be implemented with a simple multiplier: `--space-density: 1.0` (Rust) vs `0.9` (Warp) vs `1.1` (Thorn).

---

## 7. Shadows & Elevation

### 7a. Elevation System

Define elevation as a concept, not just shadow values:
```
Level 0: Sunken      (inset shadow — e.g., input fields, wells)
Level 1: Base        (no shadow — the ground plane)
Level 2: Raised      (sm shadow — cards, sections)
Level 3: Overlay     (md shadow — dropdowns, popovers)
Level 4: Modal       (lg shadow — modals, dialogs)
Level 5: Toast       (xl shadow — notifications, floating elements)
```

### 7b. Theme-Specific Shadow Character

Shadows can carry personality:
- **Rust**: Warm-tinted shadows (add a hint of amber to the rgba)
- **Warp**: Cool, blue-tinted shadows — or no color tint, pure black for clinical feel
- **Thorn**: Slightly diffused, soft — like light through leaves
- **Maul**: Hard, short shadows — brutalist, like cast shadows from harsh overhead light
- **Jinx**: Diffused with slight violet tint — ethereal, ambient glow

---

## 8. Developer Experience (DX)

### 8a. Token Naming Convention

Consistency is the bedrock of good DX. Use a predictable, human-readable pattern:

```
--hex-{category}-{property}-{variant}

Examples:
--hex-color-surface-base
--hex-color-text-primary
--hex-color-accent-hover
--hex-shadow-lg
--hex-font-body
--hex-space-4
--hex-radius-md
--hex-motion-duration-normal
--hex-motion-ease-standard
```

**Principles:**
- Names should be self-explanatory — a developer shouldn't need docs to guess what `--hex-color-accent-muted` does.
- Avoid abbreviations that aren't universally understood.
- Be consistent in ordering (always category → property → variant).

### 8b. API Ergonomics

The TS theme objects are already well-structured. Enhance with:

1. **TypeScript autocompletion**: The `HexTheme` type should be strict enough to catch errors but flexible enough for custom themes.
2. **CSS-only usage path**: Import a `.css` file, set a data attribute, done. No JS required for basic theming.
3. **JS runtime path**: `applyTheme(element, 'warp', 'dark')` for dynamic switching.
4. **Utility functions**: `getToken('color.accent.primary')`, `getContrastRatio(fg, bg)`.

### 8c. Documentation Standards

Every token should be documented with:
- **What it's for** (semantic purpose)
- **Where to use it** (components, contexts)
- **What NOT to use instead** (common mistakes)
- **Visual example** (swatch, specimen, or component)

### 8d. Validation & Safety

The existing `validateTheme()` function is excellent. Extend it to:
- **Contrast checking**: Validate that text tokens meet WCAG AA against their intended surface tokens.
- **Completeness checking**: Ensure all required tokens are present.
- **Type safety**: Catch invalid CSS values at build time.

---

## 9. Texture, Pattern & Atmosphere

Beyond flat colors, themes can include atmospheric tokens for backgrounds and decorative elements:

### 9a. Background Patterns (Optional)

```css
[data-theme="rust"] {
  --hex-bg-pattern: url("data:image/svg+xml,..."); /* subtle noise/grain */
  --hex-bg-pattern-opacity: 0.03;
}
[data-theme="thorn"] {
  --hex-bg-pattern: url("data:image/svg+xml,..."); /* organic dots or leaves */
  --hex-bg-pattern-opacity: 0.02;
}
```

Subtle noise or grain textures add warmth and physicality. They should be nearly invisible — felt more than seen.

### 9b. Gradient Tokens

```
--hex-gradient-accent:      linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))
--hex-gradient-surface:     linear-gradient(180deg, var(--surface-base), var(--surface-sunken))
--hex-gradient-overlay:     linear-gradient(180deg, transparent, var(--surface-base))
```

---

## 10. Putting It All Together: The Token Taxonomy

```
hex/
├── tokens/
│   ├── color/
│   │   ├── primitives.ts        ← raw hex values, per-theme
│   │   ├── semantic.ts          ← surface, text, border, accent, status
│   │   └── component.ts         ← button, card, input, alert, etc.
│   ├── typography/
│   │   ├── families.ts          ← font stacks per theme
│   │   ├── scale.ts             ← size scale (xs–7xl)
│   │   ├── leading.ts           ← line-height scale
│   │   ├── tracking.ts          ← letter-spacing scale
│   │   └── roles.ts             ← semantic type roles
│   ├── spacing/
│   │   ├── scale.ts             ← 4px-based scale
│   │   └── semantic.ts          ← inset, stack, inline
│   ├── elevation/
│   │   ├── shadows.ts           ← sm, md, lg, xl, inner
│   │   └── levels.ts            ← semantic elevation levels
│   ├── radius/
│   │   └── scale.ts             ← sm, md, lg, xl, 2xl, full
│   ├── motion/
│   │   ├── duration.ts          ← timing tokens
│   │   ├── easing.ts            ← cubic-bezier curves
│   │   └── patterns.ts          ← entrance, exit, emphasis
│   ├── iconography/
│   │   └── parameters.ts        ← stroke, size, cap, corner per theme
│   └── types.ts                 ← HexTheme, HexScheme, etc.
├── themes/
│   ├── rust/   ├── warp/   ├── thorn/   ├── maul/   ├── jinx/
│   └── index.ts                 ← registry, createRegistry, etc.
├── utils/
│   ├── validate.ts              ← theme validation + contrast checking
│   ├── apply.ts                 ← runtime theme application
│   ├── contrast.ts              ← WCAG contrast ratio utilities
│   └── media.ts                 ← prefers-color-scheme, prefers-reduced-motion
└── css/
    ├── reset.css                ← minimal reset with good defaults
    ├── tokens.css               ← all CSS custom properties
    └── themes/
        ├── rust.css  ├── warp.css  ├── thorn.css  ├── maul.css  ├── jinx.css
```

---

## 11. Design Principles for the Hex System

These should guide every decision:

1. **Narrative coherence** — Every token in a theme should feel like it belongs to the same world. A color, a font, a shadow, and an easing curve should all tell the same story.

2. **Constraint breeds creativity** — The system provides rails. Expressiveness comes from *combining* tokens in unexpected ways, not from breaking the system.

3. **Accessibility is non-negotiable** — Beautiful and inaccessible is just inaccessible. Every combination must pass WCAG AA. This is the floor, not the ceiling.

4. **Progressive disclosure** — Simple things should be simple. `import 'hex/themes/rust.css'` should just work. Advanced customization is available but never required.

5. **The developer is a user** — Token names, file structure, TypeScript types, and documentation are UX design for developers.

---

## Sources & Further Reading

- designsystems.com — Typography guides, iconography guide, motion system guide
- IBM Carbon Design System — Motion (productive/expressive duality), color tokens
- Material Design 3 — Easing/duration tokens, elevation system, color roles
- WCAG 2.1/2.2 — Contrast requirements (1.4.3, 1.4.11), focus visibility (2.4.7)
- Smashing Magazine — Animation in design systems, iconography maintenance
- Figma — Typography systems best practices, 8pt grid with 4pt baseline
- web.dev — Variable fonts, optical sizing
- Adobe Spectrum — Icon system construction methodology
- EightShapes (Nathan Curtis) — Typography in design systems, token architecture
- Pixelambacht — Optical size axis deep dive
- Fraunces variable font — WONK, SOFT, opsz axes for maximum expressiveness
