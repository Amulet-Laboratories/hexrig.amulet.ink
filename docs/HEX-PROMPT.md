# Hex — Living Prompt

> **What this is:** A living instruction document for the Hex VSCode theme pack and web design token system. Update this as the project evolves. Feed it to your coding agent or use it as your own reference.

---

## Project Overview

Hex is a **five-theme system** with dark and light variants (10 total). It powers both a VSCode extension and a web design token system (CSS custom properties + TypeScript). The five themes form a balanced whole — each distinct, but together spanning the color wheel.

**The Five Worlds:**

| Theme | World | Base (dark) | Accent | Hue° | Character |
|-------|-------|-------------|--------|------|-----------|
| Rust | The Forge | `#0f0d0a` warm earth | `#c9956d` bronze | ~25° | Warm craft, heritage, leather & wood |
| Warp | The Void | `#060d2b` deep navy | `#AEF66D` lime | ~92° | Cold void, bioluminescent, terminal |
| Thorn | The Grotto | `#0a100e` deep teal | `~#40b8a0` verdigris | ~170° | Mineral garden, aged copper, fern & mist |
| Maul | The Foundry | `#121212` neutral dark | `#FF8F2E` orange | ~28° | Industrial, raw, brutalist. PixelFactory origin |
| Jinx | The Sanctum | `#331F3C` deep plum | `#EB4963` hot pink | ~350° | Arcane, romantic darkness, rose garden |

**Color wheel distribution:** 25° → 28° → 92° → 170° → 350°. Thorn and Jinx are near-complementary (~180° apart) for maximum contrast.

---

## Part 1: VSCode Theme Pack

### Package Structure

10 JSON files in `./themes/`, registered in `package.json`:

```json
{
  "name": "hex-themes",
  "displayName": "Hex — Five Worlds",
  "description": "10 meticulously crafted color themes. Dark and light. Rust, Warp, Thorn, Maul, Jinx.",
  "categories": ["Themes"],
  "keywords": ["theme", "color-theme", "dark", "light", "hex"],
  "contributes": {
    "themes": [
      { "label": "Hex: Rust Dark",  "uiTheme": "vs-dark", "path": "./themes/rust-dark.json" },
      { "label": "Hex: Rust Light", "uiTheme": "vs",      "path": "./themes/rust-light.json" },
      { "label": "Hex: Warp Dark",  "uiTheme": "vs-dark", "path": "./themes/warp-dark.json" },
      { "label": "Hex: Warp Light", "uiTheme": "vs",      "path": "./themes/warp-light.json" },
      { "label": "Hex: Thorn Dark", "uiTheme": "vs-dark", "path": "./themes/thorn-dark.json" },
      { "label": "Hex: Thorn Light","uiTheme": "vs",      "path": "./themes/thorn-light.json" },
      { "label": "Hex: Maul Dark",  "uiTheme": "vs-dark", "path": "./themes/maul-dark.json" },
      { "label": "Hex: Maul Light", "uiTheme": "vs",      "path": "./themes/maul-light.json" },
      { "label": "Hex: Jinx Dark",  "uiTheme": "vs-dark", "path": "./themes/jinx-dark.json" },
      { "label": "Hex: Jinx Light", "uiTheme": "vs",      "path": "./themes/jinx-light.json" }
    ]
  }
}
```

### Reference Theme: Maul Dark = PixelFactory

The existing PixelFactory JSON **is** `maul-dark.json`. Rename it, keep every color. This is the structural template — every other theme file must have the **exact same keys**.

**PixelFactory Core (canon — do not change):**

| Role | Value | VSCode keys (primary) |
|------|-------|-----------------------|
| surface-base | `#121212` | editor.background, terminal.background, activityBar.background, panel.background |
| surface-raised | `#1e1e1e` | sideBar.background, statusBar.background, editorWidget.background, tab.inactiveBackground |
| surface-overlay | `#252525` | editor.lineHighlightBackground |
| text-primary | `#d0d8d9` | sideBar.foreground |
| text-secondary | `#798283` | editor.foreground, foreground, panel.foreground |
| text-muted | `#707678` | editorLineNumber.foreground, comment syntax |
| accent | `#FF8F2E` | cursor, activeBorder, buttons, operator/function syntax |
| accent-hover | `#EBA96C` | button.hoverBackground |
| focus-secondary | `#7f7b66` | focusBorder, punctuation syntax |
| border-default | `#2a2a2a` | all borders |
| border-strong | `#3a3a3a` | selection, active backgrounds |
| status-success | `#A6E22E` | added, green, string syntax |
| status-warning | `#FFC62F` | find, warning, storage syntax |
| status-error-bright | `#F85931` | deleted, red |
| status-error-deep | `#C71B00` | error icons, validation |
| status-modified | `#E6DB74` | modified gutter/git |

**PixelFactory Syntax Colors (canon):**

| Scope | Color |
|-------|-------|
| Comment | `#707678` |
| Keyword | `#ea603e` |
| Storage (const/let/tags) | `#FFC62F` |
| String | `#8A9E78` |
| Number/literal | `#CF7F8F` |
| Function/library | `#FF8F2E` |
| Operator | `#FF8F2E` |
| Punctuation | `#7f7b66` |
| Type/pointer | `#EBA96C` |
| User names/entities | `#798283` |

---

### Theme Color Specifications

#### RUST — The Forge (bronze, warm, serif)

**Dark:**

| Role | Value |
|------|-------|
| surface-base | `#0f0d0a` |
| surface-raised | `#1a1714` |
| surface-sunken | `#0a0907` |
| surface-overlay | `#1e1b17` |
| text-primary | `#f5f1ed` |
| text-secondary | `#bfb8b0` |
| text-muted | `#7a746d` |
| accent | `#c9956d` |
| accent-hover | `#d4a57a` |
| border-default | `#3d3935` |
| border-subtle | `#2a2620` |
| border-strong | `#5c554e` |
| focus-secondary | `#a87b56` |
| status-success | `#6b9e78` |
| status-warning | `#d4a03c` |
| status-error-bright | `#c75c5c` |
| status-error-deep | `#a04040` |
| status-modified | `#c9a050` |
| **Syntax:** | |
| keyword | `#c07050` |
| storage | `#c9a050` |
| string | `#8a9a70` |
| number | `#b07878` |
| function | `#c9956d` |
| operator | `#c9956d` |
| punctuation | `#7a746d` |
| type | `#d4a57a` |

**Light:**

| Role | Value |
|------|-------|
| surface-base | `#f5f1ed` |
| surface-raised | `#ffffff` |
| surface-sunken | `#e8e3dc` |
| text-primary | `#1a1714` |
| text-secondary | `#4a443e` |
| text-muted | `#8a8279` |
| accent | `#9a6f42` |
| **Syntax:** keyword `#9a4a30`, storage `#8a6a20`, string `#4a7040`, number `#905060`, function `#9a6f42`, punctuation `#8a8279`, type `#7a5a30` |

---

#### WARP — The Void (deep navy + electric lime)

**Source palette:** `#060d2b`, `#091441`, `#0d1b56`, `#132881`, `#2d4fe0`, `#a0b2ff`, `#cad3f7`, accent `#AEF66D`, yellow `#DFF081`

**Dark:**

| Role | Value | Notes |
|------|-------|-------|
| surface-base | `#060d2b` | blue-darkest |
| surface-raised | `#0d1b56` | blue-dark |
| surface-sunken | `#040920` | |
| surface-overlay | `#132881` | blue |
| text-primary | `#cad3f7` | blue-lightest |
| text-secondary | `#a0b2ff` | blue-lighter |
| text-muted | `#4a5a9a` | |
| text-on-accent | `#060d2b` | dark navy on bright green |
| accent | `#AEF66D` | electric lime |
| accent-hover | `#c2ff8a` | |
| border-default | `#132881` | |
| border-subtle | `#0d1b56` | |
| border-strong | `#2d4fe0` | blue-light |
| status-success | `#AEF66D` | green |
| status-warning | `#DFF081` | yellow |
| status-error-bright | `#f06060` | |
| status-error-deep | `#c03030` | |
| **Syntax:** | | |
| keyword | `#2d4fe0` | blue-light |
| storage | `#AEF66D` | lime green |
| string | `#DFF081` | yellow |
| number | `#f06060` | red |
| function | `#a0b2ff` | blue-lighter |
| operator | `#AEF66D` | green |
| punctuation | `#4a5a9a` | muted |
| type | `#cad3f7` | blue-lightest |

**Light:**

| Role | Value |
|------|-------|
| surface-base | `#e8ecfa` |
| surface-raised | `#f4f6ff` |
| surface-sunken | `#d8deef` |
| text-primary | `#060d2b` |
| text-secondary | `#0d1b56` |
| text-muted | `#4a5a9a` |
| accent | `#3a7a20` |
| **Syntax:** keyword `#1a3a90`, storage `#3a7a20`, string `#6a7a10`, number `#b03030`, function `#0d1b56`, punctuation `#4a5a9a`, type `#2040a0` |

---

#### THORN — The Grotto (teal/verdigris, organic)

> **STATUS: Needs palette finalization.** Shifting from pure green (~120°) to teal/verdigris (~160-170°) to fill the color wheel gap between Warp (92°) and Jinx (350°). Think aged copper, mineral springs, moss on stone, fern mist. The teal accent is near-complementary to Jinx's pink.

**Dark (proposed — refine with real palette when available):**

| Role | Value | Notes |
|------|-------|-------|
| surface-base | `#0a100e` | deep teal-dark |
| surface-raised | `#12201a` | |
| surface-sunken | `#060c08` | |
| surface-overlay | `#1a2a22` | |
| text-primary | `#d8ece4` | pale mint |
| text-secondary | `#a0c0b0` | sage |
| text-muted | `#5a7a6a` | |
| accent | `#40b8a0` | verdigris/teal |
| accent-hover | `#50c8b0` | |
| border-default | `#1e3828` | |
| border-subtle | `#162a1e` | |
| border-strong | `#3a5848` | |
| status-success | `#40b8a0` | teal (same as accent) |
| status-warning | `#c8b060` | warm gold |
| status-error-bright | `#d05858` | |
| **Syntax:** | | |
| keyword | `#50c8b0` | bright teal |
| storage | `#c8b060` | gold |
| string | `#a0c0b0` | sage |
| number | `#d05858` | coral |
| function | `#40b8a0` | teal |
| operator | `#50c8b0` | |
| punctuation | `#5a7a6a` | |
| type | `#70a8c8` | steel blue |

**Light (proposed):**

| Role | Value |
|------|-------|
| surface-base | `#e8f4f0` |
| surface-raised | `#f4faf8` |
| surface-sunken | `#d4e8e0` |
| text-primary | `#0a100e` |
| text-secondary | `#1a3028` |
| text-muted | `#5a7a6a` |
| accent | `#1a7a68` |
| **Syntax:** keyword `#1a7a68`, storage `#8a7018`, string `#2a4a38`, number `#a03030`, function `#1a6a58`, punctuation `#5a7a6a`, type `#2a6080` |

---

#### MAUL — The Foundry (PixelFactory origin)

**Dark:** Use PixelFactory colors verbatim (see Reference Theme section above).

**Light:**

| Role | Value |
|------|-------|
| surface-base | `#f4f0e8` |
| surface-raised | `#ffffff` |
| surface-sunken | `#e6e0d4` |
| text-primary | `#1c1812` |
| text-secondary | `#4a4238` |
| text-muted | `#8a8070` |
| accent | `#c06a10` |
| **Syntax:** keyword `#9a4020`, storage `#8a7020`, string `#4a7040`, number `#905060`, function `#c06a10`, punctuation `#8a8070`, type `#a05010` |

---

#### JINX — The Sanctum (deep plum + hot pink)

**Source swatches:** `#331F3C` → `#AC3954` → `#EB4963` → `#F16874` → `#F58384` → `#F99C94` → `#F9B0A2` → `#F8C7B3` → `#F7D7B9` → `#F5E3BC` → `#EDECC0` → `#D8E8C3` → `#CBE6C5`

**Dark:**

| Role | Value | Swatch origin |
|------|-------|---------------|
| surface-base | `#331F3C` | deep plum |
| surface-raised | `#3e2848` | |
| surface-sunken | `#271832` | |
| surface-overlay | `#4a3255` | |
| text-primary | `#F7D7B9` | cream peach |
| text-secondary | `#F9B0A2` | peach |
| text-muted | `#8a6a7a` | desaturated rose |
| text-on-accent | `#ffffff` | |
| accent | `#EB4963` | hot pink |
| accent-hover | `#F16874` | coral pink |
| accent-active | `#AC3954` | dark rose |
| border-default | `#5a3a60` | |
| border-subtle | `#4a3055` | |
| border-strong | `#7a5080` | |
| status-success | `#CBE6C5` | soft green swatch |
| status-warning | `#F5E3BC` | warm cream swatch |
| status-error-bright | `#EB4963` | hot pink |
| status-error-deep | `#AC3954` | dark rose |
| status-modified | `#EDECC0` | pale yellow-green |
| **Syntax:** | | |
| keyword | `#F16874` | coral pink |
| storage | `#CBE6C5` | sage green |
| string | `#D8E8C3` | mint |
| number | `#F58384` | salmon |
| function | `#EB4963` | hot pink |
| operator | `#F99C94` | light salmon |
| punctuation | `#8a6a7a` | muted rose |
| type | `#F9B0A2` | peach |

**Light:** (surfaces use peach/cream from warm end of gradient)

| Role | Value |
|------|-------|
| surface-base | `#F7D7B9` |
| surface-raised | `#FFF5EC` |
| surface-sunken | `#F5E3BC` |
| text-primary | `#331F3C` |
| text-secondary | `#5a3a60` |
| text-muted | `#8a6a7a` |
| accent | `#AC3954` |
| **Syntax:** keyword `#AC3954`, storage `#4a7a48`, string `#3a6a3a`, number `#a03838`, function `#8a2a40`, punctuation `#8a6a7a`, type `#6a5a80` |

---

### Role → VSCode Key Mapping

Use the PixelFactory JSON as the structural template. Here is the complete mapping:

```
surface-base        → editor.background, terminal.background, editorGutter.background,
                       activityBar.background, panel.background, minimap.background,
                       input.background, checkbox.background, breadcrumb.background,
                       welcomePage.background, chat.inputBackground,
                       editorCursor.background, terminalCursor.background,
                       terminal.ansiBlack

surface-raised      → sideBar.background, tab.inactiveBackground, statusBar.background,
                       editorWidget.background, editorSuggestWidget.background,
                       editorHoverWidget.background, notifications.background,
                       breadcrumbPicker.background, dropdown.background,
                       debugToolBarBackground, listFilterWidget.background,
                       list.inactiveSelectionBackground, list.hoverBackground,
                       tab.unfocusedActiveBackground, tab.unfocusedHoverBackground,
                       button.secondaryBackground,
                       diffEditor.unchangedRegionBackground,
                       editorStickyScroll.background, welcomePage.tileBackground,
                       inlineChat.background, editor.focusedRowBackground,
                       editorFolding.background (+66), editor.foldBackground (+66),
                       tree.tableOddRowsBackground, sideBarSectionHeader.background,
                       editorInlayHint.background, editorGhostText.background (+44)

surface-overlay     → editor.lineHighlightBackground

text-primary        → sideBar.foreground

text-secondary      → editor.foreground, foreground, tab.activeForeground,
                       editorWidget.foreground, panel.foreground, statusBar.foreground,
                       tab.hoverForeground, list.focusForeground,
                       list.inactiveSelectionForeground, list.hoverForeground,
                       checkbox.foreground, input.foreground, dropdown.foreground,
                       terminal.foreground, terminal.ansiBlue, terminal.ansiWhite,
                       terminal.ansiBrightBlue, terminal.ansiBrightWhite,
                       editorBracketHighlight.foreground1,
                       sideBarTitle.foreground, sideBarSectionHeader.foreground,
                       notifications.foreground, debugTokenExpression.value

text-muted          → editorLineNumber.foreground, disabledForeground,
                       input.placeholderForeground, tab.inactiveForeground,
                       activityBar.inactiveForeground, panelTitle.inactiveForeground,
                       tab.unfocusedInactiveForeground, list.deemphasizedForeground,
                       editorCodeLens.foreground, terminal.ansiBrightBlack,
                       minimap.foreground, editorGhostText.foreground

text-inverse        → button.foreground, activityBarBadge.foreground,
                       statusBar.debuggingForeground, statusBarItem.prominentForeground,
                       inputOption.activeForeground

accent              → activityBar.activeBorder, activityBarBadge.background,
                       button.background, button.border, editorCursor.foreground,
                       terminalCursor.foreground, tab.activeBorder,
                       panelTitle.activeBorder, editorWidget.resizeBorder,
                       editorSuggestWidget.highlightForeground,
                       list.activeSelectionForeground, list.focusHighlightForeground,
                       breadcrumb.activeSelectionForeground, pickerGroup.foreground,
                       notificationLink.foreground, scrollbarSlider.activeBackground,
                       minimapSlider.activeBackground, inputOption.activeBackground,
                       chat.inputFocusBorder, inlineChat.border,
                       welcomePage.progress.foreground, editorFolding.foreground

accent-hover        → button.hoverBackground, statusBarItem.prominentHoverBackground

border-default      → sideBar.border, tab.border, panel.border, statusBar.border,
                       input.border, editorWidget.border, dropdown.border,
                       checkbox.border, tree.indentGuidesStroke, terminal.border,
                       editorWhitespace.foreground, sideBarSectionHeader.border

border-strong       → editor.selectionBackground, tab.activeBackground,
                       statusBarItem.activeBackground, list.activeSelectionBackground,
                       list.focusBackground, list.dropBackground, tab.hoverBackground,
                       welcomePage.tileHoverBackground, button.secondaryHoverBackground

focus-secondary     → focusBorder, input.focusBorder, editorLineNumber.activeForeground,
                       editorInlayHint.foreground, list.focusOutline,
                       breadcrumb.foreground, tab.unfocusedActiveForeground

status-success      → editorGutter.addedBackground, gitDecoration.addedResourceForeground,
                       terminal.ansiGreen, terminal.ansiBrightGreen,
                       string tokenColor, editorLightBulbAutoFix.foreground

status-warning      → editor.findMatchBackground (+66), editor.findMatchBorder,
                       list.filterMatchBorder, editorLightBulb.foreground,
                       terminal.ansiYellow, storage tokenColor

status-error-bright → editorGutter.deletedBackground, gitDecoration.deletedResourceForeground,
                       terminal.ansiRed, terminal.ansiBrightRed

status-error-deep   → editorError.foreground, problemsErrorIcon.foreground,
                       statusBar.debuggingBackground, statusBarItem.errorBackground,
                       inputValidation.errorBorder

status-modified     → editorGutter.modifiedBackground, tab.activeModifiedBorder,
                       gitDecoration.modifiedResourceForeground, terminal.ansiBrightYellow
```

### Rules

1. **Every theme file must have the exact same set of color keys and tokenColors scopes.** No missing keys.
2. **PixelFactory Maul Dark is canon.** Don't change it.
3. **All text on accent backgrounds must be readable.** Check `text-on-accent` per theme.
4. **No pure black `#000000` in dark themes.** No pure white `#ffffff` as editor background in light themes.
5. **Token color scopes:** Copy PixelFactory's entire tokenColors array structure. Same scopes, same names. Only values change.
6. **Light themes:** `uiTheme: "vs"`, surfaces flip, accent darkens 20-30%, shadows use lower opacity (`0.06-0.14` not `0.4-0.7`), status colors darken for contrast.

---

## Part 2: Web Token System

Hex also ships as CSS custom properties + TypeScript definitions. Structure:

```
packages/hex/
  themes/
    rust.css, rust.ts
    warp.css, warp.ts
    thorn.css, thorn.ts
    maul.css, maul.ts
    jinx.css, jinx.ts
    index.ts              ← exports all themes + registry
  tokens/
    types.ts              ← HexTheme, HexColorMap, HexThemeRegistry
  utils/
    validate.ts           ← validateTheme()
```

CSS files use `[data-hex-theme='name'][data-hex-scheme='dark|light']` selectors. TS files export typed theme objects with `id`, `name`, `description`, `fonts`, `schemes.dark`, `schemes.light`.

Token naming: `--hex-color-{category}-{role}`, `--hex-font-family-{role}`, `--hex-shadow-{size}`.

---

## Changelog

- **v0.1** — Initial prompt. Maul Dark = PixelFactory. Basic 5-theme specs.
- **v0.2** — Warp reworked: deep navy `#060d2b` + lime `#AEF66D` palette.
- **v0.3** — Jinx reworked: plum `#331F3C` + hot pink `#EB4963` from swatch gradient.
- **v0.4** — Thorn proposed shift: pure green → teal/verdigris (~170°) to fill color wheel gap.
- **TODO** — Thorn: finalize palette with real swatches. Rust: verify buildout from existing tokens.
