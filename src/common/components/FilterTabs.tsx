import { LegendList, type LegendListRenderItemProps } from '@legendapp/list';
import { useCallback, useMemo } from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { radius } from '../theme/radius';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

export interface FilterTabItem {
  id: string;
  label: string;
}

export interface FilterTabsProps {
  tabs: FilterTabItem[];
  activeId: string;
  onSelect: (id: string) => void;
}

export function FilterTabs({ tabs, activeId, onSelect }: FilterTabsProps) {
  const { colors } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          gap: spacing.sm,
          paddingVertical: spacing.xs,
        },
        pill: {
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.sm,
          borderRadius: radius.lg,
          backgroundColor: colors.surfaceLight,
          borderWidth: 1,
          borderColor: colors.borderSubtle,
        },
        pillActive: {
          backgroundColor: colors.primary,
          borderColor: colors.borderGlow,
        },
        pillPressed: {
          opacity: 0.9,
        },
        label: {
          ...typography.caption,
          color: colors.textSecondary,
        },
        labelActive: {
          color: colors.textPrimary,
          fontWeight: '600',
        },
      }),
    [colors]
  );

  const renderTab = useCallback(
    ({ item: tab }: LegendListRenderItemProps<FilterTabItem>) => {
      const isActive = tab.id === activeId;
      return (
        <Pressable
          onPress={() => onSelect(tab.id)}
          style={({ pressed }) => [
            styles.pill,
            isActive && styles.pillActive,
            pressed && styles.pillPressed,
          ]}
        >
          <Text style={[styles.label, isActive && styles.labelActive]}>
            {tab.label}
          </Text>
        </Pressable>
      );
    },
    [activeId, onSelect, styles]
  );

  return (
    <LegendList
      data={tabs}
      keyExtractor={(item) => item.id}
      renderItem={renderTab}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      recycleItems
      estimatedItemSize={80}
    />
  );
}
