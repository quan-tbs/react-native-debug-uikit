/**
 * Platform-specific shadow presets.
 * iOS: shadowColor, shadowOffset, shadowOpacity, shadowRadius
 * Android: elevation
 */
import { Platform, type ViewStyle } from 'react-native';

export const shadows = {
  /** Subtle lift for glass panels */
  glass: {
    ...(Platform.OS === 'ios'
      ? {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 8,
        }
      : { elevation: 4 }),
  } as ViewStyle,

  /** Neon glow (primary purple) */
  neon: {
    ...(Platform.OS === 'ios'
      ? {
          shadowColor: '#7f0df2',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.4,
          shadowRadius: 12,
        }
      : { elevation: 6 }),
  } as ViewStyle,

  /** Subtle elevation */
  subtle: {
    ...(Platform.OS === 'ios'
      ? {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.15,
          shadowRadius: 4,
        }
      : { elevation: 2 }),
  } as ViewStyle,

  /** Stronger glass effect for large panels */
  glassStrong: {
    ...(Platform.OS === 'ios'
      ? {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 12,
        }
      : { elevation: 8 }),
  } as ViewStyle,

  /** Colored glow variants using neon palette */
  glowGreen: {
    ...(Platform.OS === 'ios'
      ? {
          shadowColor: '#00ff9d',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.5,
          shadowRadius: 8,
        }
      : { elevation: 6 }),
  } as ViewStyle,

  glowBlue: {
    ...(Platform.OS === 'ios'
      ? {
          shadowColor: '#00d2ff',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.5,
          shadowRadius: 8,
        }
      : { elevation: 6 }),
  } as ViewStyle,

  glowPurple: {
    ...(Platform.OS === 'ios'
      ? {
          shadowColor: '#bd00ff',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.5,
          shadowRadius: 8,
        }
      : { elevation: 6 }),
  } as ViewStyle,

  glowPink: {
    ...(Platform.OS === 'ios'
      ? {
          shadowColor: '#ff00d4',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.5,
          shadowRadius: 8,
        }
      : { elevation: 6 }),
  } as ViewStyle,

  glowCyan: {
    ...(Platform.OS === 'ios'
      ? {
          shadowColor: '#00f0ff',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.5,
          shadowRadius: 8,
        }
      : { elevation: 6 }),
  } as ViewStyle,
} as const;
