/**
 * 8pt spacing system.
 * All spacing values should reference from here.
 */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
  xxxl: 48, // For large containers
} as const;

export type Spacing = typeof spacing;
