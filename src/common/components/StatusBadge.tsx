import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { radius } from '../theme/radius';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

type StatusVariant = 'success' | 'error' | 'warning' | 'pending' | 'redirect';

export interface StatusBadgeProps {
  status: number | string;
  variant?: StatusVariant;
  size?: 'sm' | 'md';
}

function getVariantFromStatus(status: number): StatusVariant {
  if (status >= 200 && status < 300) return 'success';
  if (status >= 400) return 'error';
  if (status >= 300 && status < 400) return 'redirect';
  return 'pending';
}

export function StatusBadge({
  status,
  variant,
  size = 'md',
}: StatusBadgeProps) {
  const { colors } = useTheme();
  const variantColors = useMemo<Record<StatusVariant, string>>(
    () => ({
      success: colors.success,
      error: colors.error,
      warning: colors.warning,
      pending: colors.textMuted,
      redirect: colors.warning,
    }),
    [colors]
  );
  const resolvedVariant =
    variant ??
    (typeof status === 'number' ? getVariantFromStatus(status) : 'pending');
  const color = variantColors[resolvedVariant];

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
          fontSize: 12,
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
        {String(status)}
      </Text>
    </View>
  );
}
