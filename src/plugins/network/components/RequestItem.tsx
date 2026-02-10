import { memo, useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MethodBadge } from '../../../common/components/MethodBadge';
import { StatusBadge } from '../../../common/components/StatusBadge';
import { useTheme } from '../../../common/theme/ThemeContext';
import { radius } from '../../../common/theme/radius';
import { spacing } from '../../../common/theme/spacing';
import { typography } from '../../../common/theme/typography';

export interface RequestItemData {
  id: string;
  method: string;
  url: string;
  status?: number;
  statusText?: string;
  duration?: string;
  description?: string;
  variant?: 'success' | 'error' | 'neutral' | 'pending';
}

export interface RequestItemProps {
  item: RequestItemData;
  onPress: () => void;
}

function RequestItemComponent({ item, onPress }: RequestItemProps) {
  const { colors } = useTheme();
  const variant =
    item.variant ??
    (item.status && item.status >= 200 && item.status < 300
      ? 'success'
      : item.status && item.status >= 400
      ? 'error'
      : 'neutral');
  const bgColor =
    variant === 'success'
      ? `${colors.success}0D`
      : variant === 'error'
      ? `${colors.error}0D`
      : colors.surfaceLight;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        row: {
          flexDirection: 'row',
          alignItems: 'center',
          padding: spacing.sm + 2,
          borderRadius: radius.lg,
          marginBottom: spacing.xs,
          borderWidth: 1,
          borderColor: colors.borderSubtle,
        },
        pressed: {
          opacity: 0.9,
          transform: [{ scale: 0.99 }],
        },
        iconBox: {
          width: 40,
          height: 40,
          borderRadius: radius.md,
          backgroundColor: colors.surfaceLight,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: spacing.sm,
        },
        body: {
          flex: 1,
          minWidth: 0,
        },
        topRow: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: spacing.xs,
        },
        url: {
          ...typography.mono,
          color: colors.textPrimary,
          flex: 1,
          fontSize: 12,
        },
        meta: {
          ...typography.caption,
          color: colors.textMuted,
          marginTop: 2,
        },
      }),
    [colors]
  );

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        { backgroundColor: bgColor },
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.iconBox}>
        <StatusBadge status={item.status ?? '…'} size="sm" />
      </View>
      <View style={styles.body}>
        <View style={styles.topRow}>
          <MethodBadge method={item.method} size="sm" />
          <Text style={styles.url} numberOfLines={1}>
            {item.url}
          </Text>
          {item.status != null && (
            <StatusBadge status={item.status} size="sm" />
          )}
        </View>
        {(item.description ?? item.duration) && (
          <Text style={styles.meta} numberOfLines={1}>
            {[item.description, item.duration].filter(Boolean).join(' • ')}
          </Text>
        )}
      </View>
    </Pressable>
  );
}

export const RequestItem = memo(RequestItemComponent);
