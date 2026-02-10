/**
 * Font sizes, weights, and line heights.
 * Display + monospace fallbacks (no custom font files).
 */
import { Platform, type TextStyle } from 'react-native';

export const fontSizes = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 20,
  display: 24,
} as const;

export const fontWeights = {
  normal: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

export const lineHeights = {
  tight: 1.2,
  normal: 1.4,
  relaxed: 1.6,
} as const;

export const typography: Record<string, TextStyle> = {
  display: {
    fontSize: fontSizes.display,
    fontWeight: fontWeights.bold,
    lineHeight: fontSizes.display * lineHeights.tight,
  },
  title: {
    fontSize: fontSizes.xxl,
    fontWeight: fontWeights.semibold,
    lineHeight: fontSizes.xxl * lineHeights.normal,
  },
  subtitle: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.medium,
    lineHeight: fontSizes.lg * lineHeights.normal,
  },
  body: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.normal,
    lineHeight: fontSizes.md * lineHeights.relaxed,
  },
  caption: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.normal,
    lineHeight: fontSizes.sm * lineHeights.normal,
  },
  mono: {
    fontFamily: Platform.select({
      ios: 'Menlo',
      android: 'monospace',
      default: 'monospace',
    }),
    fontSize: fontSizes.sm,
    lineHeight: fontSizes.sm * lineHeights.normal,
  },
  monoMd: {
    fontFamily: Platform.select({
      ios: 'Menlo',
      android: 'monospace',
      default: 'monospace',
    }),
    fontSize: fontSizes.md,
    lineHeight: fontSizes.md * lineHeights.normal,
  },
  /** Large display for hero sections */
  displayLarge: {
    fontSize: fontSizes.display * 1.5, // 36px
    fontWeight: fontWeights.bold,
    lineHeight: fontSizes.display * 1.5 * lineHeights.tight,
  },
  /** Small caption */
  captionSmall: {
    fontSize: fontSizes.xs, // 10px
    fontWeight: fontWeights.normal,
    lineHeight: fontSizes.xs * lineHeights.normal,
  },
  /** Button text */
  button: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold,
    lineHeight: fontSizes.md * lineHeights.normal,
    letterSpacing: 0.5,
  },
};
