/**
 * Shared glass style factories.
 * Transparency 0.1–0.4, thin borders, subtle shadows.
 */
import { Platform, type ViewStyle } from 'react-native';
import { darkColors } from './colors';
import type { Colors } from './colors';
import { radius } from './radius';
import { shadows } from './shadows';

export function createGlassStyle(
  overrides: Partial<ViewStyle> = {},
  colors: Colors = darkColors,
  variant: 'subtle' | 'medium' | 'strong' = 'medium'
): ViewStyle {
  // Select backgroundColor and borderColor based on variant
  let backgroundColor: string;
  let borderColor: string;

  switch (variant) {
    case 'subtle':
      backgroundColor = colors.surfaceLightSubtle ?? colors.surfaceLight;
      borderColor = colors.borderSubtle;
      break;
    case 'medium':
      backgroundColor = colors.surfaceLightMedium ?? colors.surfaceLight;
      borderColor = colors.borderSubtle;
      break;
    case 'strong':
      backgroundColor = colors.surfaceLightStrong ?? colors.surfaceLight;
      borderColor = colors.borderLight;
      break;
    default:
      backgroundColor = colors.surfaceLightMedium ?? colors.surfaceLight;
      borderColor = colors.borderSubtle;
  }

  return {
    backgroundColor,
    borderWidth: 1,
    borderColor,
    borderRadius: radius.xl,
    ...shadows.glass,
    ...overrides,
  };
}

export function createNeonGlow(
  color: string = darkColors.primary,
  _colors?: Colors
): ViewStyle {
  return {
    ...(Platform.OS === 'ios'
      ? {
          shadowColor: color,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.4,
          shadowRadius: 12,
        }
      : { elevation: 6 }),
  };
}

export function getGlassPanelBase(
  colors: Colors = darkColors,
  variant: 'subtle' | 'medium' | 'strong' = 'medium'
): ViewStyle {
  // For panel base, use surface for subtle/medium, or surfaceLightStrong for strong
  const backgroundColor =
    variant === 'strong'
      ? colors.surfaceLightStrong ?? colors.surfaceLight
      : colors.surface;

  const borderColor =
    variant === 'strong' ? colors.borderLight : colors.borderLight;

  return {
    backgroundColor,
    borderWidth: 1,
    borderColor,
    borderRadius: radius.xxl,
    ...shadows.glass,
  };
}

/** @deprecated Use getGlassPanelBase(colors) from useTheme() for theme-aware styling. */
export const glassPanelBase: ViewStyle = getGlassPanelBase(darkColors);
