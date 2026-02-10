/**
 * Border radius tokens.
 * Minimum 16px–24px for glass panels per design.
 */
export const radius = {
  sm: 8,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 40,
} as const;

export type Radius = typeof radius;
