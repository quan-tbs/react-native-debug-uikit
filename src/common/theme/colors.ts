/**
 * Full color palette for Debug Toolkit.
 * All hex values in the project MUST reference from here - no hardcoding.
 * darkColors / lightColors share the same shape; useTheme() provides the active one.
 */
const sharedPalette = {
  // Brand
  primary: '#7f0df2',
  primaryLight: '#9b3fff',
  primaryDark: '#5a0aad',

  // Neon accents
  neonGreen: '#00ff9d',
  neonBlue: '#00d2ff',
  neonPurple: '#bd00ff',
  neonPink: '#ff00d4',
  neonYellow: '#fff700',
  neonCyan: '#00f0ff',

  // Semantic
  success: '#32ff64',
  error: '#ff3232',
  warning: '#ffb800',
  info: '#3b82f6',

  // Syntax highlighting
  syntaxKey: '#ff79c6',
  syntaxString: '#FF8C00',
  syntaxNumber: '#00FF41',
  syntaxBool: '#bf7aff',
  syntaxNull: '#ff5555',
} as const;

export const darkColors = {
  ...sharedPalette,
  // Surfaces
  background: '#0a0510',
  surface: '#141118',
  surfaceLight: 'rgba(255,255,255,0.03)', // Backward compatibility
  surfaceLightSubtle: 'rgba(255,255,255,0.05)', // For overlay
  surfaceLightMedium: 'rgba(255,255,255,0.1)', // For cards (best practice)
  surfaceLightStrong: 'rgba(255,255,255,0.15)', // For buttons
  overlay: 'rgba(0,0,0,0.7)',
  // Text
  textPrimary: '#ffffff',
  textSecondary: 'rgba(255,255,255,0.7)',
  textMuted: 'rgba(255,255,255,0.4)',
  // Borders
  borderLight: 'rgba(255,255,255,0.08)',
  borderSubtle: 'rgba(255,255,255,0.05)',
  borderGlow: 'rgba(127,13,242,0.3)',
} as const;

export const lightColors = {
  ...sharedPalette,
  // Surfaces
  background: '#f5f5f8',
  surface: '#ffffff',
  surfaceLight: 'rgba(0,0,0,0.04)', // Backward compatibility
  surfaceLightSubtle: 'rgba(0,0,0,0.04)', // For overlay
  surfaceLightMedium: 'rgba(0,0,0,0.08)', // For cards
  surfaceLightStrong: 'rgba(0,0,0,0.12)', // For buttons
  overlay: 'rgba(0,0,0,0.4)',
  // Text
  textPrimary: '#1a1a1a',
  textSecondary: 'rgba(0,0,0,0.65)',
  textMuted: 'rgba(0,0,0,0.55)', // Increased from 0.45 for better contrast (4.5:1)
  // Borders
  borderLight: 'rgba(0,0,0,0.1)',
  borderSubtle: 'rgba(0,0,0,0.06)',
  borderGlow: 'rgba(127,13,242,0.35)',
} as const;

/** Shape shared by dark and light palettes; useTheme() returns one of them. */
export type Colors = { [K in keyof typeof darkColors]: string };

/** @deprecated Use useTheme().colors instead. Kept for backward compatibility. */
export const colors = darkColors;
