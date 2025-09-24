import tokens from './tokens.json';

export type ColorScale = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
};

export type NeutralScale = ColorScale & {
  0: string;
};

export type ThemeColors = {
  primary: ColorScale;
  secondary: ColorScale;
  success: ColorScale;
  danger: ColorScale;
  warning: ColorScale;
  neutral: NeutralScale;
};

export type ThemeSpacing = {
  's-1': string;
  's-2': string;
  's-3': string;
  's-4': string;
  's-5': string;
  's-6': string;
  's-8': string;
  's-10': string;
  's-12': string;
  's-16': string;
  's-20': string;
  's-24': string;
  's-32': string;
  's-40': string;
  's-48': string;
  's-56': string;
  's-64': string;
};

export type ThemeFontSizes = {
  xs: string;
  sm: string;
  base: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl': string;
  '5xl': string;
  '6xl': string;
  '7xl': string;
  '8xl': string;
  '9xl': string;
};

export type ThemeFontWeights = {
  thin: string;
  extralight: string;
  light: string;
  normal: string;
  medium: string;
  semibold: string;
  bold: string;
  extrabold: string;
  black: string;
};

export type ThemeBorderRadius = {
  none: string;
  sm: string;
  base: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  full: string;
};

export type ThemeShadows = {
  sm: string;
  base: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  inner: string;
};

export type ThemeBreakpoints = {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
};

export type ThemeTokens = {
  colors: ThemeColors;
  spacing: ThemeSpacing;
  fontSizes: ThemeFontSizes;
  fontWeights: ThemeFontWeights;
  borderRadius: ThemeBorderRadius;
  shadows: ThemeShadows;
  breakpoints: ThemeBreakpoints;
};

export const themeTokens: ThemeTokens = tokens as ThemeTokens;

// Helper functions for accessing tokens
export const getColor = (color: keyof ThemeColors, shade: keyof ColorScale): string => {
  return themeTokens.colors[color][shade];
};

export const getSpacing = (size: keyof ThemeSpacing): string => {
  return themeTokens.spacing[size];
};

export const getFontSize = (size: keyof ThemeFontSizes): string => {
  return themeTokens.fontSizes[size];
};

export const getFontWeight = (weight: keyof ThemeFontWeights): string => {
  return themeTokens.fontWeights[weight];
};

export const getBorderRadius = (radius: keyof ThemeBorderRadius): string => {
  return themeTokens.borderRadius[radius];
};

export const getShadow = (shadow: keyof ThemeShadows): string => {
  return themeTokens.shadows[shadow];
};

export const getBreakpoint = (breakpoint: keyof ThemeBreakpoints): string => {
  return themeTokens.breakpoints[breakpoint];
};

// CSS custom properties generator
export const generateCSSVariables = (): string => {
  const variables: string[] = [];
  
  // Colors
  Object.entries(themeTokens.colors).forEach(([colorName, colorScale]) => {
    Object.entries(colorScale).forEach(([shade, value]) => {
      variables.push(`--color-${colorName}-${shade}: ${value};`);
    });
  });
  
  // Spacing
  Object.entries(themeTokens.spacing).forEach(([name, value]) => {
    variables.push(`--spacing-${name}: ${value};`);
  });
  
  // Font sizes
  Object.entries(themeTokens.fontSizes).forEach(([name, value]) => {
    variables.push(`--font-size-${name}: ${value};`);
  });
  
  // Font weights
  Object.entries(themeTokens.fontWeights).forEach(([name, value]) => {
    variables.push(`--font-weight-${name}: ${value};`);
  });
  
  // Border radius
  Object.entries(themeTokens.borderRadius).forEach(([name, value]) => {
    variables.push(`--border-radius-${name}: ${value};`);
  });
  
  // Shadows
  Object.entries(themeTokens.shadows).forEach(([name, value]) => {
    variables.push(`--shadow-${name}: ${value};`);
  });
  
  // Breakpoints
  Object.entries(themeTokens.breakpoints).forEach(([name, value]) => {
    variables.push(`--breakpoint-${name}: ${value};`);
  });
  
  return `:root {\n  ${variables.join('\n  ')}\n}`;
};

export default themeTokens;
