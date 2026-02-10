import { Platform, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

/** Icon constants using Unicode symbols */
export const ICONS = {
  SEARCH: '🔍',
  CLOSE: '×', // U+00D7 multiplication sign (better than ✕)
  SUN: '☀',
  MOON: '🌙',
  SYSTEM: '⚙',
} as const;

export type IconName = keyof typeof ICONS;

export interface IconSymbolProps {
  symbol: string | IconName;
  color?: string;
  size?: number;
  glowColor?: string;
}

export function IconSymbol({
  symbol,
  color: colorProp,
  size = 24,
  glowColor,
}: IconSymbolProps) {
  const { colors } = useTheme();
  const color = colorProp ?? colors.textPrimary;
  const glow = glowColor ?? color;

  // Resolve icon: if it's an icon name, get the symbol; otherwise use as-is
  const iconSymbol =
    typeof symbol === 'string' && symbol in ICONS
      ? ICONS[symbol as IconName]
      : symbol;

  const iosGlowStyle = glowColor
    ? {
        shadowColor: glow,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: size / 4,
      }
    : null;

  const androidGlowStyle = glowColor ? { elevation: 4 } : null;

  return (
    <View
      style={[
        styles.wrapper,
        { width: size, height: size },
        Platform.OS === 'ios' ? iosGlowStyle : androidGlowStyle,
      ]}
    >
      <Text
        style={[styles.symbol, { color, fontSize: size * 0.7 }]}
        selectable={false}
      >
        {iconSymbol}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  symbol: {
    fontWeight: '400',
  },
});
