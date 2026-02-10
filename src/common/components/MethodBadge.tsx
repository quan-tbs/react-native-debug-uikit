import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { radius } from '../theme/radius';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

export interface MethodBadgeProps {
  method: string;
  size?: 'sm' | 'md';
}

export function MethodBadge({ method, size = 'md' }: MethodBadgeProps) {
  const { colors } = useTheme();
  const methodColors = useMemo(
    () =>
      ({
        GET: colors.success,
        POST: colors.primary,
        PUT: colors.info,
        PATCH: colors.neonYellow,
        DELETE: colors.error,
        OPTIONS: colors.textMuted,
      } as Record<string, string>),
    [colors]
  );
  const color = methodColors[method.toUpperCase()] ?? colors.textSecondary;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        badge: {
          paddingHorizontal: spacing.sm,
          paddingVertical: 2,
          borderRadius: radius.sm,
          backgroundColor: colors.surfaceLight,
        },
        sm: {
          paddingHorizontal: spacing.xs,
          paddingVertical: 1,
        },
        text: {
          ...typography.mono,
          fontWeight: '600',
          fontSize: 11,
        },
        textSm: {
          fontSize: 10,
        },
      }),
    [colors]
  );

  return (
    <View style={[styles.badge, size === 'sm' && styles.sm]}>
      <Text style={[styles.text, { color }, size === 'sm' && styles.textSm]}>
        {method.toUpperCase()}
      </Text>
    </View>
  );
}
