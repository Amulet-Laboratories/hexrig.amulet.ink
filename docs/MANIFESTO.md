# Hex — A Gesamtkunstwerk for the Web

## The Rules, the Craft, and the Five Worlds

---

## Part I: Philosophy

### The Total Work of Art

In 1849, Richard Wagner coined the term _Gesamtkunstwerk_ — "total work of art" — to describe an experience where music, drama, visual design, and staging dissolve into a single unified whole. No element dominates. Every part serves a common vision.

Hex is a Gesamtkunstwerk for the web.

A theme in Hex is not a color palette. It's a _world_. Color, typography, motion, spacing, texture, iconography, shadow, and interaction — all tuned to the same frequency, all telling the same story. When you switch from Rust to Jinx, you shouldn't just see different colors. You should _feel_ a different place.

This is the difference between a design system that organizes tokens and one that creates meaning.

### The Synesthetic Principle

Kandinsky believed colors had sounds. Scriabin composed music for colored light. The Bauhaus sought to unify painting, music, and architecture into one perceptual experience.

Hex borrows this idea: **every token in a theme should feel like it appeals to the same sense**. If Rust's colors feel like burnished bronze, then Rust's motion should feel like the swing of a heavy pendulum — not a digital bounce. If Thorn's greens feel like forest light, then Thorn's easing should feel like a vine unfurling — not a mechanical snap.

This is the hidden logic that makes a theme feel _real_ instead of _themed_.

### Five Worlds, One System

The five themes are not arbitrary. Together they span a spectrum of human experience:

```
RUST  ──── warmth, craft, heritage, earth
WARP  ──── cold, precision, technology, void
THORN ──── growth, nature, patience, light
MAUL  ──── force, industry, urgency, fire
JINX  ──── mystery, ritual, intuition, shadow
```

They form a pentagram of opposing and complementary forces. Rust and Warp are the primary axis: warm/cold, organic/digital, past/future. Thorn, Maul, and Jinx inhabit the spaces between — growth, destruction, and transformation.

Each theme should be usable as a complete, standalone visual identity. But together, they tell the story of a system that contains multitudes.

---

## Part II: The Rules

### Rule 1 — Narrative Coherence

> Every token in a theme must feel like it belongs to the same world.

This means:

- **Typography matches materiality.** Rust uses a serif heading face (craft, history). Warp uses a geometric sans (precision, machine). They never cross.
- **Motion matches weight.** Heavy themes (Maul) have decisive, short-duration motion with strong deceleration. Light themes (Thorn, Jinx) have longer, gentler curves.
- **Texture matches surface.** Rust might carry a subtle grain like aged paper. Warp is clean, no noise. Thorn has organic variation. Maul has coarse industrial texture. Jinx has diffused, smoky atmosphere.
- **Shadows match light source.** Maul's shadows are hard and short (overhead industrial light). Jinx's shadows are soft and diffused (ambient twilight). Thorn's shadows are dappled (filtered through leaves).

**Test:** Show someone three random tokens from a theme (a color swatch, a shadow, a font specimen). They should be able to guess the theme.

### Rule 2 — Optical Truth Over Mathematical Truth

> Design for how things _look_, not how they _measure_.

This is the most underrated rule in all of web design. The human eye lies constantly and beautifully:

- **A circle at 400px looks smaller than a square at 400px** — because the circle has less area. Icons must be optically balanced, not pixel-aligned.
- **Text that is mathematically centered in a button looks slightly too high** — because the visual weight of text sits below its geometric center. Shift it 1–2px down.
- **A play button (triangle) centered in a circle looks left-shifted** — because triangles carry visual weight toward their base. Shift the triangle ~2px right.
- **Equal padding on all sides of a card with a heading looks bottom-heavy** — because the heading's ascenders create more visual space above. Reduce top padding by ~4px.
- **Light text on dark backgrounds looks bolder than dark text on light backgrounds** — so consider reducing font-weight by one step in dark mode, or adding +0.01em letter-spacing.
- **Colors next to each other change each other.** A gray swatch looks warm on a blue background and cool on an orange background. Always test tokens in context, never in isolation.

Build optical compensation into the system itself — as tokens, utilities, or component-level adjustments.

### Rule 3 — Constraint as Creative Fuel

> The system provides rails. Expressiveness comes from _combining_ tokens, not breaking the system.

A musician doesn't need infinite notes — twelve suffice. A poet doesn't need infinite words — the constraint of form creates beauty. Hex provides a finite palette of deliberate choices. The creativity comes from how you combine them.

This means:

- **The spacing scale is fixed.** You get 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96. No 37px. No 11px. If you need 11px, something else is wrong.
- **The type scale is fixed.** Twelve sizes. If you need a thirteenth, you don't — you need to use weight or color to create the distinction you're reaching for with size.
- **The color palette is closed.** 24 semantic tokens per scheme. If you need a 25th, map it through an existing token or extend the theme formally.

But within these constraints: **any combination is valid**. A heading in `text-xs` with `tracking-widest` and `weight-semibold` is a perfectly legitimate overline. A `surface-sunken` background with an `accent-muted` border is a perfectly legitimate well.

### Rule 4 — Accessibility Is the Floor

> WCAG AA is not the goal. It's the minimum.

Every text/background combination must hit **4.5:1** (normal text) or **3:1** (large text). Every interactive element must have **3:1** non-text contrast. Every focus indicator must be visible.

But accessibility goes far beyond contrast ratios:

- **Never use color alone to convey meaning.** Errors need icons + text + color.
- **Honor `prefers-reduced-motion`.** Provide a zero-duration fallback for all animation.
- **Honor `prefers-color-scheme`.** Auto-detect and apply.
- **Honor `prefers-contrast`.** High-contrast mode should increase border and text contrast.
- **Touch targets: 44×44px minimum** on touch devices.
- **Focus rings must be visible in both schemes.** Test them. The most common dark-mode failure is invisible focus states.

### Rule 5 — The Developer Is a User

> Token names, file structure, TypeScript types, and documentation are UX design for developers.

DX principles:

- **Names should be guessable.** `--hex-color-surface-base` is immediately clear. `--hex-clr-srf-b` is not.
- **Imports should be minimal.** One CSS import for a complete theme. One TS import for runtime access.
- **Errors should be helpful.** `validateTheme()` should say "Missing token --hex-color-accent-primary in dark scheme" — not "validation failed".
- **Types should autocomplete.** TypeScript should prevent you from using `--hex-color-accent-primray` at compile time.
- **The simplest path should be the default.** `import 'hex/themes/rust.css'` and you're done. Advanced configuration is available, never required.

### Rule 6 — Progressive Materiality

> Flat is safe. Material is memorable.

Pure flat design is the "AI slop" of system design — clean, inoffensive, forgettable. The most memorable digital experiences have _materiality_: a sense that surfaces have weight, texture, and physical presence.

Hex achieves this through layers:

1. **Noise/grain textures** — Subtle SVG `feTurbulence` overlays at 2–5% opacity. They add organic warmth without performance cost.
2. **Gradient tokens** — Subtle directional gradients on surfaces suggest light sources.
3. **Shadow hue** — Shadows tinted with the theme's hue (warm amber for Rust, cool blue for Warp) feel more integrated than pure black.
4. **Border subtlety** — The difference between `border-subtle`, `border-default`, and `border-strong` should be felt as light hitting an edge, not as arbitrary line weights.
5. **Surface layering** — Sunken → Base → Raised → Overlay should feel like physical depth, especially in dark mode where elevation = lightness.

### Rule 7 — Vertical Rhythm Is Non-Negotiable

> Every element on the page should sit on a 4px grid.

All line-heights snap to multiples of 4px. All spacing tokens are multiples of 4px. All component heights are multiples of 4px.

This creates an invisible backbone of order. Text columns align. Cards stack cleanly. The eye doesn't know why the page feels "right" — but it does.

**The exception:** Optical adjustments (Rule 2) may deviate by 1–2px. This is acceptable because it corrects for the eye's lies to restore _perceived_ rhythm.

---

## Part III: The Five Worlds

### RUST — The Forge

**Mood:** Warm, grounded, confident. A blacksmith's workshop at golden hour. Firelight on bronze. The smell of leather and wood oil.

**Color:** Bronze, amber, warm grays. Dark mode: charcoal with copper fire. Light mode: warm parchment with deep brown ink.

**Typography:**

- Heading: **Fraunces** (variable, with optical size + WONK + SOFT axes). Use `WONK 1` for personality in display sizes, `WONK 0` for readability in body.
- Body: **Source Serif 4** or **Literata** — warm, readable serifs that feel like books.
- Mono: **JetBrains Mono** — workhorse, clear, slightly warm.

**Motion:** Weighty. Things have mass. Ease curves favor long deceleration — objects swing into position and settle like a heavy door closing. Duration: moderate.

```css
--motion-ease-standard: cubic-bezier(0.45, 0.05, 0.15, 1);
```

**Texture:** Fine grain, like handmade paper. 3% opacity SVG noise.

**Shadows:** Warm-tinted. `rgba(30, 20, 10, opacity)` instead of pure black.

**Icons:** 1.5px stroke, round caps, 2px corner radius. Feels handcrafted.

**Border radius:** `--radius-md: 8px`. Softened but not bubbly.

---

### WARP — The Void

**Mood:** Cold, precise, infinite. A clean room in deep space. Starlight on steel. The hum of servers.

**Color:** Electric blue on near-black. Cool grays with blue undertone. Dark mode: deep space. Light mode: institutional white-blue, like a laboratory.

**Typography:**

- Heading: **Space Grotesk** — geometric, sharp, futuristic.
- Body: **Inter** (variable) — optimized for screens, neutral, precise. Use weight 420 for body text (the slightly-heavier-than-Regular trick for dark mode).
- Mono: **IBM Plex Mono** or **Fira Code** — technical, ligatures enabled.

**Motion:** Snappy. Short durations, minimal overshoot. Things appear and disappear with mechanical precision. Linear transitions for data changes.

```css
--motion-ease-standard: cubic-bezier(0.25, 0.1, 0.25, 1);
```

**Texture:** None. Clean. The absence of texture _is_ the texture.

**Shadows:** Cool, desaturated. Pure black with no color tint. `rgba(0, 0, 0, opacity)`.

**Icons:** 1.5px stroke, butt caps, 0px corners. Sharp, geometric.

**Border radius:** `--radius-sm: 4px`. Angular. Functional.

---

### THORN — The Garden

**Mood:** Alive, patient, deep. A botanical garden at dawn. Light through leaves. Moss on stone.

**Color:** Deep greens, sage, earth. Dark mode: forest floor at twilight. Light mode: sun through a canopy — warm white-green.

**Typography:**

- Heading: **Lora** or **Newsreader** (variable) — organic serifs with calligraphic DNA. Slightly swashy.
- Body: **Source Sans 3** — humanist sans, warm and readable.
- Mono: **DM Mono** — soft, rounded terminals.

**Motion:** Organic. Long durations, gentle ease-in-out. Things grow and unfurl. Staggered reveals that cascade like leaves falling.

```css
--motion-ease-standard: cubic-bezier(0.22, 0.61, 0.36, 1);
```

**Texture:** Organic variation. SVG noise with a slightly green tint, like light through foliage.

**Shadows:** Dappled, diffused. Medium spread. `rgba(10, 20, 10, opacity)`.

**Icons:** 1.5px stroke, round caps, 3px corner radius. Soft, naturalistic.

**Border radius:** `--radius-lg: 12px`. Rounded, organic.

---

### MAUL — The Foundry

**Mood:** Heavy, raw, urgent. A factory floor. Molten metal and concrete. The crack of a hammer on an anvil.

**Color:** Hot amber/orange on dark brown-black. Ochre, burnt sienna. Dark mode: charred. Light mode: concrete and construction paper.

**Typography:**

- Heading: **Bebas Neue** or **Barlow Condensed** (variable, condensed weight) — industrial, tall, compressed. All-caps encouraged for display.
- Body: **Barlow** or **Work Sans** — utilitarian, slightly condensed, no-nonsense.
- Mono: **Roboto Mono** — square, mechanical.

**Motion:** Decisive. Short duration, strong deceleration. Things slam into place. No bounce, no float. Hard cuts.

```css
--motion-ease-standard: cubic-bezier(0.7, 0, 0.15, 1);
```

**Texture:** Coarse grain. Higher opacity (4–5%). Like concrete dust or steel filings.

**Shadows:** Hard, short. Minimal spread. Like harsh overhead factory lighting. `rgba(20, 15, 5, opacity)`.

**Icons:** 2px stroke, square caps, 1px corners. Bold, utilitarian. Consider a filled variant as default.

**Border radius:** `--radius-sm: 4px` or `--radius-none: 0px`. Brutalist.

---

### JINX — The Sanctum

**Mood:** Mysterious, arcane, intimate. A candlelit library. Velvet and smoke. The crackle of old rituals.

**Color:** Deep violet, plum, amethyst. Dark mode: midnight purple. Light mode: lavender fog — pale, ethereal.

**Typography:**

- Heading: **Crimson Pro** (variable) or **Playfair Display** — high-contrast serifs. Elegant, slightly dangerous. Like inscriptions on a grimoire.
- Body: **Alegreya Sans** or **Libre Franklin** — humanist, with just enough personality to feel curated.
- Mono: **Victor Mono** (variable, italic cursive) or **Fantasque Sans Mono** — quirky, characterful. The code itself feels enchanted.

**Motion:** Ethereal. Medium-long durations with subtle overshoot. Things fade and drift. Slight parallax. Dissolution effects.

```css
--motion-ease-standard: cubic-bezier(0.34, 1.2, 0.64, 1);
```

**Texture:** Smoky. Low-frequency noise with a violet tint. Like candlelight through haze.

**Shadows:** Deeply diffused, violet-tinted. Long spread, low opacity. `rgba(20, 10, 30, opacity)`.

**Icons:** 1.5px stroke, round caps, 2px corners. Slightly more ornate — consider adding a second weight for "detailed" icons at larger sizes.

**Border radius:** `--radius-xl: 16px`. Soft, pill-shaped buttons. Things don't have hard edges in the Sanctum.

---

## Part IV: The Hidden Craft

These are the details that separate good from extraordinary. Most design system articles don't mention them.

### 1. Optical Icon Sizing

A square icon and a circular icon at the same pixel dimensions don't _look_ the same size. The blur test: shrink all your icons to 4px and squint. If the blobs look uneven, adjust. Let elongated icons (arrows, pencils) bleed past the grid boundary. Give square icons more internal padding.

### 2. The Button Padding Trick

Text in a button should be shifted ~1px down from mathematical center. The ascenders of the font create visual space above that the descenders don't balance below. This tiny adjustment makes buttons look precisely centered instead of "close enough."

### 3. Dark Mode Letter-Spacing

Light-on-dark text reads slightly wider than dark-on-light due to irradiation (light pixels bleed into dark ones). Add `+0.01em` to `+0.02em` letter-spacing for body text in dark mode. Figma's own design system does this.

### 4. Shadow Hue Matching

Pure black shadows (`rgba(0,0,0,x)`) look "pasted on." Tinting the shadow with the theme's dominant hue creates shadows that feel like they belong to the surface casting them. In Rust: `rgba(30, 20, 10, x)`. In Jinx: `rgba(20, 10, 30, x)`.

### 5. The 60-30-10 Color Rule

60% surface, 30% text/border, 10% accent/status. Accent is powerful because it's rare. A button in accent-primary on a field of surface-base pops precisely because the accent occupies less than 10% of the visual field.

### 6. Heading Proximity Ratio

A heading should be **1.5–2× closer** to the text it introduces than to the text before it. This is Gestalt proximity in action. Without it, headings float ambiguously between sections.

### 7. The Grain Trick

SVG `feTurbulence` noise at 2–4% opacity, blended with `mix-blend-mode: overlay`, makes flat surfaces feel physical. It's the difference between a wall painted by a machine and a wall painted by hand. The eye registers it subconsciously.

### 8. Focus Ring Offset

A focus ring directly on an element's border competes with the border visually. Use `outline-offset: 2px` to separate the focus ring from the element's edge. This makes focus states unambiguous without being heavy.

### 9. Responsive Type Ratio Shifting

At mobile sizes, use a _smaller_ type scale ratio (1.125 = Major Second) so headings don't dominate the viewport. At desktop, use a _larger_ ratio (1.25 = Major Third or 1.333 = Perfect Fourth) for more dramatic hierarchy.

### 10. The Muted Text Trap

`text-muted` is the most commonly failed accessibility token. Designers want it to be subtle. WCAG wants it to be readable. The minimum viable muted: 4.5:1 against its background. This is harder than it sounds in dark mode.

### 11. Gradient as Directional Light

A very subtle linear gradient on `surface-base` (e.g., from `#0f0d0a` to `#0d0b08`, top to bottom) implies a light source. This is almost invisible but makes the "room" feel three-dimensional. The gradient direction can be a theme token.

### 12. Transition Property Specificity

Never use `transition: all`. It's a performance hazard and causes unexpected transitions on properties you didn't intend. Always specify: `transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease`. Or better: use a CSS variable for the transition and let themes control the easing.

---

## Part V: Token Architecture (Complete)

```
Primitive tokens  →  "What exists"    →  hex-bronze-400: #c9956d
Semantic tokens   →  "What it means"  →  hex-color-accent-primary: var(--hex-bronze-400)
Component tokens  →  "Where it lives" →  hex-button-bg: var(--hex-color-accent-primary)
```

### Complete Semantic Token List

**Surface (4)**

```
surface-base     — the page ground
surface-raised   — cards, sections (dark: lighter than base; light: white)
surface-sunken   — wells, inputs, code blocks (dark: darker than base)
surface-overlay  — modals, popovers (with backdrop blur)
```

**Text (6)**

```
text-primary     — main content, headings
text-secondary   — supporting content, subheadings
text-muted       — metadata, timestamps, placeholders
text-inverse     — text on inverted surfaces
text-link        — hyperlinks, interactive text
text-on-accent   — text on accent-colored backgrounds
```

**Border (3)**

```
border-default   — standard borders
border-subtle    — dividers, table lines
border-strong    — active inputs, emphasis
```

**Accent (5)**

```
accent-primary   — primary actions, CTAs, links
accent-secondary — hover states, supporting accents
accent-hover     — hover state for primary accent
accent-active    — active/pressed state
accent-muted     — tinted backgrounds, tags, subtle fills
```

**Status (4)**

```
status-success   — positive outcomes, completion
status-warning   — caution, attention needed
status-error     — errors, destructive actions
status-info      — neutral information, tips
```

**Focus (1)**

```
focus-ring       — keyboard focus indicator
```

**Shadow (6)**

```
shadow-sm        — subtle elevation (buttons, inputs)
shadow-md        — cards, dropdowns
shadow-lg        — modals, dialog
shadow-xl        — notifications, floating elements
shadow-inner     — inset depth (wells, inputs)
shadow-ring      — focus ring shadow
```

**Typography (3 families + scale + roles)**

```
font-heading     — display and heading typeface
font-body        — body and UI typeface
font-mono        — code and tabular typeface
```

**Motion (6 durations + 4 easings)**

```
duration-instant   — 0ms
duration-fast      — 100ms
duration-normal    — 200ms
duration-moderate  — 300ms
duration-slow      — 500ms
duration-slower    — 700ms

ease-standard      — visible throughout
ease-entrance      — entering the viewport
ease-exit          — leaving the viewport
ease-expressive    — dramatic moments
```

**Atmosphere (optional, theme-specific)**

```
texture-noise      — SVG data URI for grain overlay
texture-opacity    — grain overlay opacity
gradient-light     — directional light gradient
shadow-hue         — RGB values for shadow tinting
```

---

## Part VI: Implementation Principles

### CSS-First Architecture

The primary consumption path is CSS custom properties. A single import gives you the entire theme:

```css
@import '@hex/themes/rust.css';
/* All --hex-* tokens are now available */
```

Scheme switching is attribute-driven:

```html
<html data-hex-theme="rust" data-hex-scheme="dark"></html>
```

### TypeScript Runtime

For dynamic switching, SSR, and tooling:

```ts
import { applyTheme } from '@hex/runtime'
import { rust } from '@hex/themes'

applyTheme(document.documentElement, rust, 'dark')
```

### Validation Pipeline

Every theme, before it ships:

1. **Structural validation** — all required tokens present
2. **Type validation** — all values are valid CSS
3. **Contrast validation** — all text/surface combos ≥ 4.5:1
4. **Cross-scheme validation** — both light and dark pass
5. **Visual regression** — screenshot comparison of component gallery

---

## Appendix: Sources That Shaped This Document

**Typography:** designsystems.com typography guides, Nathan Curtis (EightShapes), Figma type best practices, CodyHouse modular scale approach, USWDS typography guidelines

**Color:** Help Scout (color psychology is context-dependent), ResearchGate (dualistic color responses), 60-30-10 rule from brand design practice

**Motion:** IBM Carbon (productive/expressive duality), Smashing Magazine (animation in design systems), designsystems.com (5 steps for motion), easings.net

**Iconography:** designsystems.com icon guide, Atlassian Design, Adobe Spectrum icon system, Nord Design System, Smashing Magazine

**Optical effects:** Slava Shestopalov (optical effects in UI), Gestalt principles in web design

**Variable fonts:** web.dev, Pixelambacht (optical size axis), variablefonts.io

**Texture:** CSS-Tricks (grainy gradients with SVG feTurbulence), shadcn noise component

**Gesamtkunstwerk:** Wagner's "The Artwork of the Future" (1849), Kandinsky's "Concerning the Spiritual in Art" (1910), TheArtStory (synesthesia in modern art)

**Accessibility:** WCAG 2.1/2.2, WebAIM, DubBot (dark mode accessibility), accessibilitychecker.org

**DX:** Lari Maza (DX in design systems), CSS-Tricks (What is DX), Microsoft FAST tokens RFC, Contentful (design tokens explained)
