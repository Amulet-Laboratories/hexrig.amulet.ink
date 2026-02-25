# Hex Design Reference Library

## A Curated Collection of Sources on Design, Typography, Color, Motion, Accessibility, DX & the Hidden Craft

---

## 1. OPTICAL COMPENSATION & VISUAL PERCEPTION

The most underrated domain in web design. Mathematical alignment ≠ visual alignment.

### Key Sources

- **Slava Shestopalov — "Optical Effects in User Interfaces"**
  https://medium.com/design-bridges/optical-effects-9fca82b4cd9a
  *The definitive reference. Covers visual weight of shapes, icon balancing, rounded corner overshoot ("modified circles look more circular than geometric ones"), button text centering, and alignment of mixed-shape elements. Updated 2025.*

- **Anton Lovchikov — "Optical Adjustments in Components"**
  https://blog.prototypr.io/optical-adjustments-in-components-a7f1f8655e0
  *Practical component-level corrections: gravity compensation (shift content up ~1-2px from mathematical center), rounded button edge compensation, heading negative margin for optical left-alignment, ragged-edge text block shifting. Shows 7 adjustments in a single modal dialog.*

- **Luke Jones — "Optical Adjustment: Logic vs. Designers" (Marvel)**
  https://marvelapp.com/blog/optical-adjustment-logic-vs-designers/
  *Play button centering (triangle shift), circle-vs-square sizing (126px circle = 120px square visually), typographic overshoot in Didot, uppercase text optical kerning.*

- **Rafal Tomal — "Making Your Design Optically Perfect"**
  https://rafaltomal.com/optically-perfect/
  *Web-specific: left-aligned text overshooting with round letters (G, O, C), hanging punctuation for quotes, spacing between headings and body. Print-to-web optical corrections.*

- **Sergey Vlastiuk — "Eyeballing or Optical Alignment in Design"**
  https://medium.com/ringcentral-ux/eyeballing-or-optical-alignment-in-design-4ef5ab2d326f
  *Visual compensation of space. Optical compensation distance formula. Practical workflow for aligning icons in design systems.*

- **Diana Dumitrescu — "Find the Perfect Optical Centre"**
  https://medium.com/@dian------------a/find-the-perfect-optical-centre-98679afcac68
  *Bottom weighting, golden ratio for vertical centering, negative space strategy. "One looks right but the other feels right."*

- **The Mobile Spoon — "Visually Distorted: When Symmetrical UI Looks All Wrong"**
  https://www.mobilespoon.net/2019/08/visually-distorted-when-ui-looks-all.html
  *84 cognitive biases applied to UI. Müller-Lyer illusion in borders. Nested border-radius mismatch fix. Gray text on colored backgrounds (use transparency, not gray). Icon visual consistency "blur test."*

- **Logo Design — "Optical Adjustments in Logo Design"**
  https://www.logodesign.net/blog/optical-adjustments-in-logo-design/
  *Coca-Cola kerning analysis, Vogue weight balancing, perspective compensation in 3D logos. Applicable to component icon systems.*

### Hidden Tricks

- A circle needs to be ~105% the size of a square to *look* the same size
- Text in a button should be shifted ~1px *down* from mathematical center
- Round letters (O, G, C) should overshoot the left margin by 1-2px for optically "flush" alignment
- Hanging punctuation: move quotation marks *outside* the text edge (CSS `hanging-punctuation: first`)
- Play button triangles need ~2px rightward shift to look centered in a circle
- Nested border-radius: inner radius should be outer radius minus the padding, not the same value

---

## 2. TYPOGRAPHY SYSTEMS

### Fundamentals & Architecture

- **Nathan Curtis / EightShapes — "Typography in Design Systems"**
  https://medium.com/eightshapes-llc/typography-in-design-systems-6ed771432f1e
  *The canonical reference. Font selection, heading hierarchy (4-6 levels + variants), semantic HTML vs. visual size separation, font distribution (downloads, CDN, licensing). Pattern-hunter's guide.*

- **Figma — "Typography Systems in Figma"**
  https://www.figma.com/best-practices/typography-systems-in-figma/
  *8pt grid with 4pt baseline for typography. Body copy line-height = font-size × 1.5. Separate text styles for positive (dark-on-light) and negative (light-on-dark) with letter-spacing adjustment. Overview of 8-point grid system.*

- **designsystems.com — Typography Guides**
  https://www.designsystems.com/typography-guides/
  *Comprehensive roundup: Brent Jackson on math-based type scales, Sebastiano Guerriero on CSS globals, Priyanka Godbole's 10-step typographic audit. "Type accounts for 85-90% of any given screen."*

- **UX Collective — "Mastering Typography with Semantic Tokens"**
  https://uxdesign.cc/mastering-typography-in-design-systems-with-semantic-tokens-and-responsive-scaling-6ccd598d9f21
  *Semantic type categories in Figma. Responsive breakpoints as modes. Line-height ratios: 1.14 for display, 1.5 for body. Round to nearest 4px.*

- **Make It Clear — "Typography Systems"**
  https://makeitclear.com/typography-systems/
  *"95% of the information on the web is written language." Modular scales (ratio-based). Em/rem conversion. Heading hierarchy: sans-serif or serif, never display/handwritten for body.*

### Variable Fonts & Optical Sizing

- **Pixelambacht — "Optical Size: The Hidden Superpower of Variable Fonts"**
  https://pixelambacht.nl/2021/optical-size-hidden-superpower/
  *The must-read. Explains opsz axis with Fraunces specimens. Small text gets thicker strokes/wider apertures; display text gets delicate contrast. Browser handles it automatically with `font-optical-sizing: auto`. The mushroom analogy for size-specific design.*

- **MDN — font-optical-sizing**
  https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/font-optical-sizing
  *Technical spec. `auto` (default) vs `none`. Amstelvar VF as test font.*

- **variablefonts.io — "Designing with Variable Fonts"**
  https://variablefonts.io/about-variable-fonts/
  *Grade axis for dark mode weight compensation. Slant axis for subtle animation. Optical size axis deep dive. Custom axes (WONK, SOFT in Fraunces). Roslindale specimen showing opsz impact.*

- **MDN — Variable Fonts Guide**
  https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Fonts/Variable_fonts
  *Complete CSS reference: wght, wdth, ital, slnt, opsz. `font-variation-settings` syntax. Weight 1-1000 range.*

- **Google Fonts — Optical Size Axis Glossary**
  https://fonts.google.com/knowledge/glossary/optical_size_axis

### Micro-Typography & CSS Tricks

- **Smashing Magazine — "Micro-Typography: Spacing & Kerning Punctuation Marks"**
  https://www.smashingmagazine.com/2020/05/micro-typography-space-kern-punctuation-marks-symbols/
  *Advanced: kerning table concepts, white-space entities (thin space, hair space), CSS classes for punctuation spacing. The gap between web and print typography.*

- **CSS-Tricks — "Methods for Controlling Spacing in Web Typography"**
  https://css-tricks.com/methods-controlling-spacing-web-typography/
  *font-kerning, letter-spacing, word-spacing, text-rendering. `-webkit-font-smoothing` options (antialiased vs subpixel-antialiased). SVG textLength attribute.*

- **CSS-Tricks — hanging-punctuation**
  https://css-tricks.com/almanac/properties/h/hanging-punctuation/
  *CSS property for moving quotes/bullets outside the text box. Safari support. JS fallback (Medium's approach: negative text-indent).*

- **Viget — "CSS Typography: Kerning, Ligatures, Swashes & Small-Caps"**
  https://www.viget.com/articles/css-typography-kerning-ligatures-swashes-small-caps
  *OpenType features via CSS: `font-feature-settings: "kern" 1, "liga" 1, "swsh" 1`. True small-caps with `font-variant: small-caps`.*

- **MDN — text-rendering**
  https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-rendering
  *`optimizeLegibility` enables kerning + ligatures (performance cost). Use for headlines, not body.*

### Hidden Tricks

- Dark mode needs +0.01em to +0.02em letter-spacing on body text (light pixels bleed into dark — Figma does this)
- Variable font weight 420 for body text in dark mode (slightly heavier than Regular 400, lighter than Medium 500)
- `font-optical-sizing: auto` is free readability — most devs don't know it exists
- Responsive type ratio shifting: 1.125 (Major Second) on mobile → 1.25 (Major Third) on desktop
- Line-heights should snap to 4px multiples for vertical rhythm (not arbitrary 1.5 multiplier)
- `text-rendering: optimizeLegibility` for headlines only — performance hit on body text
- Font stacks should include metric-compatible fallbacks to prevent layout shift (e.g., Fraunces → Georgia → serif)

---

## 3. COLOR THEORY & PSYCHOLOGY

### Psychology & Application

- **60-30-10 Rule — Multiple sources:**
  - LogRocket: https://blog.logrocket.com/ux-design/60-30-10-rule/
  - The Futur: https://www.thefutur.com/content/how-to-apply-a-color-palette-to-your-design
  - Wix: https://www.wix.com/wixel/resources/60-30-10-color-rule
  *60% surface (ground), 30% text/border (structure), 10% accent/status (signal). Paul Rand poster analysis. Accent is powerful because it's rare.*

- **Context-Dependent Color Psychology:**
  *Color appropriateness to context matters more than universal associations. A study found up to 90% of initial product judgments are based on color — but the judgment is about "fit," not the color itself.*

### Three-Tier Token Architecture

- **Martin Fowler — "Design Token-Based UI Architecture"**
  https://martinfowler.com/articles/design-token-based-ui-architecture.html
  *Option → Decision → Component tokens. The most rigorous treatment. Explains why 2-3 tiers is the sweet spot and when to skip layers.*

- **Contentful — "Design Tokens Explained"**
  https://www.contentful.com/blog/design-token-system/
  *Primitive → Semantic → Component. Builds from scratch. Shows how primitive-only systems create ambiguity that semantic tokens resolve. "The semantic system feels intuitive and conversational."*

- **Brad Frost — "The Many Faces of Themeable Design Systems"**
  https://bradfrost.com/blog/post/the-many-faces-of-themeable-design-systems/
  *Tier 1 → Tier 2 → Tier 3 mapping. Multi-brand, sub-brand, white-label, dark mode strategies. Style Dictionary for token transformation.*

- **Rangle — "Developing Your Token Structure"**
  https://rangle.io/blog/developing-your-token-structure
  *Three maturity levels for token adoption. Level 1: primitive + component (skip semantic). Level 2: add semantic layer. Level 3: remove component layer for maintenance. Practical progression path.*

- **Thomas Gossmann — "Inside Design Tokens: The Three Class Token Society"**
  https://gos.si/blog/inside-design-tokens-the-three-class-token-society
  *Critical analysis. Argues tiers are for token *designers*, not consumers. Consumers should search by purpose, not tier. Challenges the pyramid model.*

- **design.dev — "Design Systems & Design Tokens Complete Guide"**
  https://design.dev/guides/design-systems/
  *Full CSS implementation: `:root` variables → theme switching via `[data-theme="dark"]`. Naming convention: `--color-text-primary` not `--primaryText`.*

---

## 4. DARK MODE DESIGN

### Core References

- **Accessibility Checker — "The Designer's Guide to Dark Mode Accessibility"**
  https://www.accessibilitychecker.org/blog/dark-mode-accessibility/
  *Softer black (#121212) vs pure black. Halation effect explained. Saturated colors vibrate on dark backgrounds — desaturate 10-20%. WCAG contrast tables for dark mode.*

- **DubBot — "Dark Mode: Best Practices for Accessibility"**
  https://dubbot.com/dubblog/2023/dark-mode-a11y.html
  *Pure black + pure white = halation. Off-white text (#E0E0E0). Target sizes (WCAG 2.5.8). Focus indicator visibility in dark mode.*

- **Atmos.style — "Dark Mode UI Design: 7 Best Practices"**
  https://atmos.style/blog/dark-mode-ui-best-practices
  *Saturated colors cause optical vibrations. Astigmatism (~47% of population) makes light-on-dark harder to read. Dark mode = elevate with lightness, not shadow.*

- **Stéphanie Walter — "Dark Mode & Accessibility Myth"**
  https://stephaniewalter.design/blog/dark-mode-accessibility-myth-debunked/
  *Myth debunking: dark mode isn't always better for accessibility. Robin Rendle on variable fonts for dark mode weight adjustment. Julie Moynat: "It's easier to switch light to dark than dark to light."*

- **Smashing Magazine — "Inclusive Dark Mode"**
  https://www.smashingmagazine.com/2025/04/inclusive-dark-mode-designing-accessible-dark-themes/
  *Anti-aliasing halo effects. Dark gray shades (#121212) instead of pure black. Interactive element contrast ≥ 4.5:1.*

- **LogRocket — "Dark Mode UI Design Best Practices"**
  https://blog.logrocket.com/ux-design/dark-mode-ui-design-best-practices-and-examples/
  *Spotify's three-shade system: #000000 (base) → #121212 (foreground) → #1F1F1F (navigation). Figma #1E1E1E, YouTube #181818, Slack #1D1D1D.*

### Hidden Tricks

- Never use pure #000000 — use #121212, #0f0d0a, or theme-tinted near-blacks
- Never use pure #FFFFFF text — use #E0E0E0 or #F2F2F2
- Desaturate accent colors 10-20% for dark mode (saturated colors "vibrate")
- In dark mode, higher surfaces should be *lighter* (elevation = lightness)
- Shadow opacity must *increase* in dark mode to register against dark backgrounds
- Tint shadows with theme hue: `rgba(30, 20, 10, x)` for warm themes, not pure black
- Variable font weight bump (+20 units) compensates for light-on-dark perceived thinness
- Focus rings are the #1 dark-mode accessibility failure — test them explicitly

---

## 5. TEXTURE, GRAIN & MATERIALITY

### SVG feTurbulence Noise

- **CSS-Tricks — "Grainy Gradients"**
  https://css-tricks.com/grainy-gradients/
  *The original technique. SVG feTurbulence + CSS gradient + brightness/contrast boost. Inline SVG as `background-image`. `mix-blend-mode` for color filtering.*

- **Frontend Masters — "Grainy Gradients" (Ana Tudor)**
  https://frontendmasters.com/blog/grainy-gradients/
  *Advanced: numOctaves > 3 rarely justified (performance). feDisplacementMap for distortion. Gradient banding fix with noise overlay. Animated glow borders.*

- **Codrops / Sara Soueidan — "SVG Filter Effects: Creating Texture with feTurbulence"**
  https://tympanus.net/codrops/2019/02/19/svg-filter-effects-creating-texture-with-feturbulence/
  *Deep dive into baseFrequency, numOctaves, type (turbulence vs fractalNoise), stitchTiles. Interactive demos. Paper texture with feTurbulence + feSpecularLighting.*

- **Daniel Immke — "Making Noisy SVGs"**
  https://daniel.do/article/making-noisy-svgs
  *Color-burn blend mode for noisy shading. Gradient mask for directional noise. Reusable SVG component pattern (Svelte/React).*

- **freeCodeCamp — "Grainy CSS Backgrounds Using SVG Filters"**
  https://www.freecodecamp.org/news/grainy-css-backgrounds-using-svg-filters/
  *Step-by-step: inline SVG in `::before` pseudo-element. `mix-blend-mode: soft-light`. Performance: SVG >> raster images for noise.*

- **ibelick — "Creating Grainy Backgrounds with CSS"**
  https://ibelick.com/blog/create-grainy-backgrounds-with-css
  *Minimal implementation: `::before` with data URI SVG. Opacity 0.12 for subtle grain. Tailwind-friendly class approach.*

### Tools

- **fffuel — nnnoise** https://www.fffuel.co/nnnoise/ (SVG noise texture generator)
- **fffuel — gggrain** https://www.fffuel.co/gggrain/ (Grainy gradient generator)
- **Frontend Hero — CSS Noise Generator** https://frontend-hero.com/css-noise-generator

### Hidden Tricks

- Grain at 2-4% opacity with `mix-blend-mode: overlay` — felt more than seen
- `baseFrequency='0.65'` + `numOctaves='3'` + `stitchTiles='stitch'` is the sweet spot
- Noise also *fixes gradient banding* on long subtle gradients (functional, not just aesthetic)
- Per-theme grain: fine paper (Rust), none (Warp), organic tinted (Thorn), coarse concrete (Maul), smoky violet (Jinx)
- Subtle directional gradient on surface-base implies a light source (almost invisible = three-dimensional "room")

---

## 6. MOTION & ANIMATION

### IBM Carbon Motion System

- **Carbon Design System — Motion Overview**
  https://carbondesignsystem.com/elements/motion/overview/
  *The gold standard. Productive vs. Expressive duality. Three easing types (standard, entrance, exit). Dynamic duration based on travel distance. Non-linear duration scale.*

- **IBM Design Language — Motion UI Basics**
  https://design-language-website.netlify.app/design/language/motion-ui/basics/
  *Philosophical foundation: "duality of Man and Machine." Productive = efficiency. Expressive = attention. Six static duration tokens (70ms → 700ms).*

- **Shixie — Carbon Motion Design Lead**
  https://shixie.design/projects/cds/
  *Behind-the-scenes: how the motion system was developed. Audit process. IBM Motion Guild formation.*

- **Stephanie Cree — "UX Motion Specs for Design and Development"**
  https://medium.com/design-ibm/working-together-ux-motion-specs-for-design-and-development-249b12d909
  *Four specs: element, transformation, duration, motion curve. Bezier notation across tools (CSS vs After Effects). Choreography for multi-element sequences.*

- **@carbon/motion npm package**
  https://www.npmjs.com/package/@carbon/motion
  https://github.com/carbon-design-system/carbon/tree/main/packages/motion
  *Sass + JS access to curves. `carbon--motion(standard, productive)` → `cubic-bezier(0.2, 0, 0.38, 0.9)`.*

### Hidden Tricks

- Never use `transition: all` — specify properties explicitly (performance + unexpected transitions)
- `prefers-reduced-motion: reduce` → set all durations to `0.01ms !important` (non-negotiable)
- Per-theme easing personality:
  - Rust: heavy deceleration (`cubic-bezier(0.45, 0.05, 0.15, 1.0)`) — weighted metal
  - Warp: crisp snap (`cubic-bezier(0.25, 0.1, 0.25, 1.0)`) — mechanical
  - Thorn: organic unfurl (`cubic-bezier(0.22, 0.61, 0.36, 1.0)`) — growing vines
  - Maul: slam (`cubic-bezier(0.7, 0.0, 0.15, 1.0)`) — hammer strike
  - Jinx: ethereal overshoot (`cubic-bezier(0.34, 1.2, 0.64, 1.0)`) — drifting smoke
- Staggered `animation-delay` on child elements creates cascade reveals (more impactful than scattered micro-interactions)

---

## 7. SPACING, RHYTHM & GRID

### 4px Grid System

- **Designary — "Grid Systems and the 4px Grid"**
  https://blog.designary.com/p/layout-basics-grid-systems-and-the-4px-grid
  *Soft grid vs hard grid. 4px succeeded 8px as baseline (more flexible for mobile). All sizes, spacing, line-heights = multiples of 4px.*

- **Ethan Wang / UX Collective — "The 4px Baseline Grid"**
  https://uxdesign.cc/the-4px-baseline-grid-89485012dea6
  *Measure from cap-height, not bounding box. The bounding-box trap: extra space above/below actual text. Vertically center icons with flexbox, not grid-snapping.*

- **Elliot Dahl / Built to Adapt — "8-Point Grid: Vertical Rhythm"**
  https://medium.com/built-to-adapt/8-point-grid-vertical-rhythm-90d05ad95032
  *Baseline vs line-height measurement. Native apps measure from baseline; web browsers from line-height. "I use the 8pt grid as a relative spatial system, not a strict grid."*

- **Imperavi — "Vertical Rhythm" (UI Typography)**
  https://imperavi.com/books/ui-typography/principles/vertical-rhythm/
  *"Baseline grid does not automatically create good vertical rhythm." Contrast and variety matter more than mechanical snapping. Spacing scale system: unit-based, modular, or combined.*

- **Aleksandr Hovhannisyan — "Creating Vertical Rhythm with CSS Grid"**
  https://www.aleksandrhovhannisyan.com/blog/vertical-rhythm-with-css-grid/
  *CSS Grid `grid-row-gap` as spacing backbone. Heading proximity: negative `margin-bottom` to pull headings closer to their content. Full-bleed layout technique.*

- **Queensland Government Design System — Spacing**
  https://www.designsystem.qld.gov.au/styles/spacing
  *Complete Sass spacing map: 0→160px in 4px multiples. `$QLD-space-map`. Vertical rhythm through consistent variables.*

### Hidden Tricks

- A heading should be 1.5-2× closer to the text it introduces than to the text before it (Gestalt proximity)
- Text bounding boxes lie — measure from cap-height (top of 'H') and baseline, not the box
- Spacing density can be a theme token: `--space-density: 1.0` (Rust) vs `0.9` (Warp/Maul) vs `1.1` (Thorn/Jinx)
- `outline-offset: 2px` separates focus rings from element borders (unambiguous without being heavy)
- Line-height for body: start at font-size × 1.5, round to nearest 4px multiple

---

## 8. GESTALT PRINCIPLES

- **Nielsen Norman Group — "Proximity Principle in Visual Design"**
  https://www.nngroup.com/articles/gestalt-proximity/
  *Proximity overrides color/shape similarity. Responsive layouts can break proximity groupings. "Tunnel vision" — users miss buttons placed far from related content.*

- **Toptal — "Exploring the Gestalt Principles of Design"**
  https://www.toptal.com/designers/ui/gestalt-principles-of-design
  *All principles with UX examples: proximity, similarity, closure (WWF panda, FedEx arrow), continuity, figure/ground. Partial images trigger scrolling (closure principle).*

- **UX Tigers / Jakob Nielsen — "Gestalt Principles for Visual UI Design"**
  https://www.uxtigers.com/post/gestalt-principles
  *9 principles with 41 years of UX research behind them. Two primary uses: show elements are related, show elements are different. "Multiple principles can work together."*

- **design4users — "Gestalt Theory for UX Design: Proximity"**
  https://design4users.com/gestalt-theory-for-ux-design-principle-of-proximity-in-interfaces/
  *Navigation grouping, content zone separation, form field/label proximity. Negative space as structural tool.*

---

## 9. ACCESSIBILITY (WCAG)

### Contrast Requirements Quick Reference

| Element | Minimum Ratio | WCAG Criterion |
|---------|--------------|----------------|
| Body text (< 18px) | **4.5:1** | 1.4.3 AA |
| Large text (≥ 18px / ≥ 14px bold) | **3:1** | 1.4.3 AA |
| UI components & graphical objects | **3:1** | 1.4.11 AA |
| Enhanced body text (AAA) | **7:1** | 1.4.6 AAA |
| Touch target minimum | **24×24px** | 2.5.8 AA |
| Touch target ideal | **44×44px** | 2.5.5 AAA |

### Key Sources

- **WCAG 2.1/2.2 Specification** — https://www.w3.org/WAI/standards-guidelines/wcag/
- **WebAIM Contrast Checker** — https://webaim.org/resources/contrastchecker/

### Hidden Tricks

- `text-muted` is the most commonly failed token — designers want subtle, WCAG wants 4.5:1
- Never use color alone to convey meaning — errors need icon + text + color
- Focus rings must be tested in *both* schemes — dark mode focus states are the #1 failure
- `prefers-reduced-motion`, `prefers-color-scheme`, and `prefers-contrast` should all be honored
- Status colors (success/warning/error) used as text need 4.5:1; as large UI elements, 3:1

---

## 10. DEVELOPER EXPERIENCE (DX)

### Token Naming

- **Contentful — Design Tokens Explained** (see Section 3 above)
  *`--hex-{category}-{property}-{variant}` pattern. Names should be guessable without docs.*

- **Martin Fowler — Token-Based UI Architecture** (see Section 3 above)
  *Option/Decision/Component naming. "Two or three layers are quite common amongst the bigger design systems."*

### CSS-First Architecture

```css
/* One import = complete theme */
@import '@hex/themes/rust.css';

/* Attribute-driven scheme switching */
[data-hex-theme="rust"][data-hex-scheme="dark"] {
  --hex-color-surface-base: #0f0d0a;
  --hex-color-accent-primary: #c9956d;
  /* ... all tokens */
}
```

### Principles

- Names should be self-explanatory: `--hex-color-surface-base` > `--hex-clr-srf-b`
- Imports should be minimal: one CSS file = complete theme
- Errors should be helpful: "Missing token --hex-color-accent-primary in dark scheme"
- Types should autocomplete: TypeScript prevents `--hex-color-accent-primray`
- The simplest path should be the default

---

## 11. DESIGN SYSTEM ARCHITECTURE

### Typography Trends (2025-2026)

- **Creative Bloq — "Top Typography Trends for 2026"**
  https://www.creativebloq.com/design/fonts-typography/breaking-rules-and-bringing-joy-top-typography-trends-for-2026
  *Serif comeback: "not nostalgia, but necessity." The AI aesthetic fatigue is driving designers toward warmth, texture, imperfection. "Mutant Heritage" — classic letterforms hacked for the present.*

### Comprehensive Design Systems

- **IBM Carbon** — https://carbondesignsystem.com — Motion, color tokens, typography
- **Material Design 3** — Easing/duration tokens, elevation system, color roles
- **Adobe Spectrum** — Icon system construction methodology
- **Figma** — Typography best practices, 8pt grid with 4pt baseline

---

## 12. THE HIDDEN CRAFT — COLLECTED SECRETS

These are the details that separate good from extraordinary:

1. **Optical icon sizing** — blur test at 4px, let non-square icons exceed their grid
2. **Button padding trick** — shift text ~1px down from mathematical center
3. **Dark mode letter-spacing** — +0.01em to +0.02em for body text
4. **Shadow hue matching** — tint shadows with theme hue, never pure black
5. **60-30-10 color distribution** — accent is powerful because it's scarce
6. **Heading proximity ratio** — 1.5-2× closer to its content than to preceding text
7. **The grain trick** — SVG feTurbulence at 2-4% opacity with mix-blend-mode: overlay
8. **Focus ring offset** — `outline-offset: 2px` to separate from element border
9. **Responsive type ratio shifting** — smaller ratio on mobile, larger on desktop
10. **The muted text trap** — text-muted must still hit 4.5:1 (harder than it sounds)
11. **Gradient as directional light** — subtle gradient on surface-base implies light source
12. **Transition property specificity** — never `transition: all`, always explicit properties
13. **Squircle corners** — CSS `border-radius` creates mathematical arcs; true squircles (iOS-style) need SVG superellipse curves
14. **Font feature settings** — `"kern" 1, "liga" 1` for kerning + ligatures in all browsers
15. **Hanging punctuation** — move quotes outside the text box for optical left-alignment

---

## APPENDIX: TOOLS

| Tool | URL | Purpose |
|------|-----|---------|
| WebAIM Contrast Checker | webaim.org/resources/contrastchecker | WCAG contrast testing |
| fffuel nnnoise | fffuel.co/nnnoise | SVG noise texture generator |
| fffuel gggrain | fffuel.co/gggrain | Grainy gradient SVG generator |
| easings.net | easings.net | Easing curve visual reference |
| variablefonts.io | variablefonts.io | Variable font exploration |
| v-fonts.com | v-fonts.com | Variable font showcase |
| Style Dictionary | amzn.github.io/style-dictionary | Token transformation pipeline |
| Grainy Gradient Playground | grainy-gradients.vercel.app | Interactive grain + gradient tool |

---

*Last updated: February 25, 2026*
*Compiled for the Hex Design System (Amulet Laboratories)*
