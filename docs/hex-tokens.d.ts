/* Hex Design System — TypeScript Types */
/* Auto-generated from hex-themes.json v2.0.0 */

export type HexTheme = "hearth" | "abyss" | "hollow" | "keep" | "cove";
export type HexMode = "dark" | "light";

export interface HexSurfaces {
  base: string;
  raised: string;
  elevated: string;
  sunken: string;
  overlay: string;
}

export interface HexText {
  primary: string;
  secondary: string;
  muted: string;
  inverse: string;
  link: string;
  onAccent: string;
}

export interface HexBorders {
  default: string;
  subtle: string;
  strong: string;
}

export interface HexAccents {
  primary: string;
  secondary: string;
  hover: string;
  active: string;
  muted: string;
}

export interface HexStatus {
  success: string;
  warning: string;
  error: string;
  info: string;
}

export interface HexFocus {
  ring: string;
  outline: string;
}

export interface HexMotion {
  duration: { fast: string; normal: string; slow: string };
  easing: { default: string; entrance: string; exit: string };
}

export interface HexFont {
  family: string;
  source: string;
  license: string;
  weights: number[];
  italic: boolean;
  rationale: string;
}

export interface HexFonts {
  display: HexFont;
  body: HexFont;
  sans: HexFont;
  mono: HexFont;
}

export interface HexModeTokens {
  surfaces: HexSurfaces;
  text: HexText;
  borders: HexBorders;
  accents: HexAccents;
  status: HexStatus;
  focus: HexFocus;
  syntax: Record<string, string>;
  terminal: Record<string, string>;
}

export interface HexThemeDefinition {
  name: string;
  narrative: string;
  motion: HexMotion;
  fonts: HexFonts;
  dark: HexModeTokens;
  light: HexModeTokens;
}

export type HexThemeMap = Record<HexTheme, HexThemeDefinition>;

/** Apply a Hex theme to the document */
export function applyHexTheme(theme: HexTheme, mode: HexMode): void {
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.setAttribute("data-mode", mode);
}
