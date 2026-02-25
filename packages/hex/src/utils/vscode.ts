import type { HexTheme, ModeId } from '../tokens/types'

// ---------------------------------------------------------------------------
// VSCode theme generation — v2.0.0
// ---------------------------------------------------------------------------

/**
 * Map Hex tokens to VSCode color keys.
 */
function mapColorsToVSCode(theme: HexTheme, mode: ModeId): Record<string, string> {
  const t = theme[mode]

  return {
    // ─── Surfaces ───
    'editor.background': t.surfaces.base,
    'editorGutter.background': t.surfaces.base,
    'activityBar.background': t.surfaces.base,
    'panel.background': t.surfaces.base,
    'minimap.background': t.surfaces.base,
    'input.background': t.surfaces.base,
    'checkbox.background': t.surfaces.base,
    'breadcrumb.background': t.surfaces.base,
    'welcomePage.background': t.surfaces.base,
    'editorCursor.background': t.surfaces.base,
    'terminalCursor.background': t.surfaces.base,

    'sideBar.background': t.surfaces.raised,
    'tab.inactiveBackground': t.surfaces.raised,
    'statusBar.background': t.surfaces.raised,
    'editorWidget.background': t.surfaces.raised,
    'editorSuggestWidget.background': t.surfaces.raised,
    'editorHoverWidget.background': t.surfaces.raised,
    'notifications.background': t.surfaces.raised,
    'breadcrumbPicker.background': t.surfaces.raised,
    'dropdown.background': t.surfaces.raised,
    'debugToolBar.background': t.surfaces.raised,
    'listFilterWidget.background': t.surfaces.raised,
    'list.inactiveSelectionBackground': t.surfaces.raised,
    'list.hoverBackground': t.surfaces.raised,
    'tab.unfocusedActiveBackground': t.surfaces.raised,
    'tab.unfocusedHoverBackground': t.surfaces.raised,
    'button.secondaryBackground': t.surfaces.raised,
    'diffEditor.unchangedRegionBackground': t.surfaces.raised,
    'editorStickyScroll.background': t.surfaces.raised,
    'welcomePage.tileBackground': t.surfaces.raised,
    'inlineChat.background': t.surfaces.raised,
    'tree.tableOddRowsBackground': t.surfaces.raised,
    'sideBarSectionHeader.background': t.surfaces.raised,
    'editorInlayHint.background': t.surfaces.raised + '44',
    'editorGhostText.background': t.surfaces.raised + '44',
    'editorFoldBackground': t.surfaces.raised + '66',

    'editor.lineHighlightBackground': t.surfaces.overlay,
    'terminal.background': t.surfaces.base,

    // ─── Text ───
    'sideBar.foreground': t.text.primary,

    'editor.foreground': t.text.secondary,
    'foreground': t.text.secondary,
    'tab.activeForeground': t.text.secondary,
    'editorWidget.foreground': t.text.secondary,
    'panel.foreground': t.text.secondary,
    'statusBar.foreground': t.text.secondary,
    'tab.hoverForeground': t.text.secondary,
    'list.focusForeground': t.text.secondary,
    'list.inactiveSelectionForeground': t.text.secondary,
    'checkbox.foreground': t.text.secondary,
    'input.foreground': t.text.secondary,
    'dropdown.foreground': t.text.secondary,
    'terminal.foreground': t.text.secondary,
    'editorBracketHighlight.foreground1': t.text.secondary,
    'sideBarTitle.foreground': t.text.secondary,
    'sideBarSectionHeader.foreground': t.text.secondary,
    'notifications.foreground': t.text.secondary,
    'debugTokenExpression.value': t.text.secondary,

    'editorLineNumber.foreground': t.text.muted,
    'disabledForeground': t.text.muted,
    'input.placeholderForeground': t.text.muted,
    'tab.inactiveForeground': t.text.muted,
    'activityBar.inactiveForeground': t.text.muted,
    'panelTitle.inactiveForeground': t.text.muted,
    'tab.unfocusedInactiveForeground': t.text.muted,
    'list.deemphasizedForeground': t.text.muted,
    'editorCodeLens.foreground': t.text.muted,
    'minimap.foreground': t.text.muted,
    'editorGhostText.foreground': t.text.muted,

    'button.foreground': t.text.onAccent,
    'activityBarBadge.foreground': t.text.inverse,
    'statusBar.debuggingForeground': t.text.inverse,
    'statusBarItem.prominentForeground': t.text.inverse,
    'inputOption.activeForeground': t.text.inverse,

    // ─── Accents ───
    'activityBar.activeBorder': t.accents.primary,
    'activityBarBadge.background': t.accents.primary,
    'button.background': t.accents.primary,
    'button.border': t.accents.primary,
    'editorCursor.foreground': t.accents.primary,
    'terminalCursor.foreground': t.accents.primary,
    'tab.activeBorder': t.accents.primary,
    'panelTitle.activeBorder': t.accents.primary,
    'editorWidget.resizeBorder': t.accents.primary,
    'editorSuggestWidget.highlightForeground': t.accents.primary,
    'list.activeSelectionForeground': t.accents.primary,
    'list.focusHighlightForeground': t.accents.primary,
    'breadcrumb.activeSelectionForeground': t.accents.primary,
    'pickerGroup.foreground': t.accents.primary,
    'notificationLink.foreground': t.accents.primary,
    'scrollbarSlider.activeBackground': t.accents.primary,
    'minimapSlider.activeBackground': t.accents.primary,
    'inputOption.activeBackground': t.accents.primary,
    'welcomePage.progress.foreground': t.accents.primary,

    'button.hoverBackground': t.accents.hover,
    'statusBarItem.prominentHoverBackground': t.accents.hover,

    // ─── Borders ───
    'sideBar.border': t.borders.default,
    'tab.border': t.borders.default,
    'panel.border': t.borders.default,
    'statusBar.border': t.borders.default,
    'input.border': t.borders.default,
    'editorWidget.border': t.borders.default,
    'dropdown.border': t.borders.default,
    'checkbox.border': t.borders.default,
    'tree.indentGuidesStroke': t.borders.default,
    'terminal.border': t.borders.default,
    'editorWhitespace.foreground': t.borders.default,
    'sideBarSectionHeader.border': t.borders.default,

    'editor.selectionBackground': t.borders.strong,
    'tab.activeBackground': t.borders.strong,
    'statusBarItem.activeBackground': t.borders.strong,
    'list.activeSelectionBackground': t.borders.strong,
    'list.focusBackground': t.borders.strong,
    'list.dropBackground': t.borders.strong,
    'tab.hoverBackground': t.borders.strong,
    'welcomePage.tileHoverBackground': t.borders.strong,
    'button.secondaryHoverBackground': t.borders.strong,

    // ─── Focus ───
    'focusBorder': t.focus.outline,
    'input.focusBorder': t.focus.outline,
    'editorLineNumber.activeForeground': t.focus.outline,
    'editorInlayHint.foreground': t.focus.outline,
    'list.focusOutline': t.focus.outline,
    'breadcrumb.foreground': t.focus.outline,
    'tab.unfocusedActiveForeground': t.focus.outline,

    // ─── Status ───
    'editorGutter.addedBackground': t.status.success,
    'gitDecoration.addedResourceForeground': t.status.success,
    'editorLightBulbAutoFix.foreground': t.status.success,

    'editor.findMatchBackground': t.status.warning + '66',
    'editor.findMatchBorder': t.status.warning,
    'list.filterMatchBorder': t.status.warning,
    'editorLightBulb.foreground': t.status.warning,
    'editorGutter.modifiedBackground': t.status.warning,
    'tab.activeModifiedBorder': t.status.warning,
    'gitDecoration.modifiedResourceForeground': t.status.warning,

    'editorGutter.deletedBackground': t.status.error,
    'gitDecoration.deletedResourceForeground': t.status.error,
    'editorError.foreground': t.status.error,
    'problemsErrorIcon.foreground': t.status.error,
    'statusBar.debuggingBackground': t.status.error,
    'statusBarItem.errorBackground': t.status.error,
    'inputValidation.errorBorder': t.status.error,

    // ─── Terminal (explicit ANSI) ───
    'terminal.ansiBlack': t.terminal.black,
    'terminal.ansiRed': t.terminal.red,
    'terminal.ansiGreen': t.terminal.green,
    'terminal.ansiYellow': t.terminal.yellow,
    'terminal.ansiBlue': t.terminal.blue,
    'terminal.ansiMagenta': t.terminal.magenta,
    'terminal.ansiCyan': t.terminal.cyan,
    'terminal.ansiWhite': t.terminal.white,
    'terminal.ansiBrightBlack': t.terminal.brightBlack,
    'terminal.ansiBrightRed': t.terminal.brightRed,
    'terminal.ansiBrightGreen': t.terminal.brightGreen,
    'terminal.ansiBrightYellow': t.terminal.brightYellow,
    'terminal.ansiBrightBlue': t.terminal.brightBlue,
    'terminal.ansiBrightMagenta': t.terminal.brightMagenta,
    'terminal.ansiBrightCyan': t.terminal.brightCyan,
    'terminal.ansiBrightWhite': t.terminal.brightWhite,
  }
}

/**
 * Generate VSCode tokenColors from Hex syntax tokens.
 */
function mapSyntaxToTokenColors(theme: HexTheme, mode: ModeId) {
  const s = theme[mode].syntax
  const t = theme[mode].text

  return [
    {
      name: 'Comment',
      scope: ['comment', 'punctuation.definition.comment'],
      settings: { foreground: s.comment, fontStyle: 'italic' },
    },
    {
      name: 'Keyword',
      scope: ['keyword', 'keyword.control', 'keyword.operator.logical', 'keyword.operator.new'],
      settings: { foreground: s.keyword },
    },
    {
      name: 'Storage',
      scope: ['storage', 'storage.type', 'storage.modifier', 'entity.name.tag'],
      settings: { foreground: s.storage },
    },
    {
      name: 'String',
      scope: ['string', 'string.quoted', 'string.template'],
      settings: { foreground: s.string },
    },
    {
      name: 'Number',
      scope: ['constant.numeric', 'constant.language', 'constant.character'],
      settings: { foreground: s.number },
    },
    {
      name: 'Function',
      scope: ['entity.name.function', 'support.function', 'meta.function-call'],
      settings: { foreground: s.function },
    },
    {
      name: 'Operator',
      scope: ['keyword.operator', 'keyword.operator.assignment', 'keyword.operator.arithmetic'],
      settings: { foreground: s.operator },
    },
    {
      name: 'Punctuation',
      scope: [
        'punctuation.definition.block',
        'punctuation.definition.parameters',
        'punctuation.separator',
        'punctuation.terminator',
        'meta.brace',
      ],
      settings: { foreground: s.punctuation },
    },
    {
      name: 'Type',
      scope: ['entity.name.type', 'support.type', 'entity.other.inherited-class', 'storage.type.class'],
      settings: { foreground: s.type },
    },
    {
      name: 'Variable',
      scope: ['variable', 'variable.other', 'variable.parameter'],
      settings: { foreground: t.secondary },
    },
    {
      name: 'String escape',
      scope: ['constant.character.escape'],
      settings: { foreground: s.number },
    },
    {
      name: 'Decorator / annotation',
      scope: ['meta.decorator', 'punctuation.decorator'],
      settings: { foreground: s.function },
    },
    {
      name: 'CSS property',
      scope: ['support.type.property-name'],
      settings: { foreground: s.type },
    },
    {
      name: 'CSS value',
      scope: ['support.constant.property-value', 'meta.property-value'],
      settings: { foreground: s.string },
    },
    {
      name: 'JSON key',
      scope: ['support.type.property-name.json'],
      settings: { foreground: s.keyword },
    },
    {
      name: 'Markdown heading',
      scope: ['heading.1.markdown', 'heading.2.markdown', 'heading.3.markdown'],
      settings: { foreground: s.keyword, fontStyle: 'bold' },
    },
    {
      name: 'Markdown bold',
      scope: ['markup.bold'],
      settings: { fontStyle: 'bold' },
    },
    {
      name: 'Markdown italic',
      scope: ['markup.italic'],
      settings: { fontStyle: 'italic' },
    },
    {
      name: 'Markdown link',
      scope: ['markup.underline.link'],
      settings: { foreground: s.function },
    },
    {
      name: 'Markdown code',
      scope: ['markup.inline.raw', 'markup.fenced_code.block'],
      settings: { foreground: s.string },
    },
  ]
}

/**
 * Generate a complete VSCode theme JSON object.
 */
export function generateVSCodeTheme(
  theme: HexTheme,
  mode: ModeId
): Record<string, unknown> {
  const label = `Hex: ${theme.name} ${mode.charAt(0).toUpperCase() + mode.slice(1)}`

  return {
    $schema: 'vscode://schemas/color-theme',
    name: label,
    type: mode === 'dark' ? 'dark' : 'light',
    colors: mapColorsToVSCode(theme, mode),
    tokenColors: mapSyntaxToTokenColors(theme, mode),
    semanticHighlighting: true,
  }
}
