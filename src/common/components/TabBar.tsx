import { useMemo } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { radius } from '../theme/radius';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

export interface TabItem {
  id: string;
  label: string;
}

export interface TabBarProps {
  tabs: TabItem[];
  activeId: string;
  onSelect: (id: string) => void;
}

export function TabBar({ tabs, activeId, onSelect }: TabBarProps) {
  const { colors } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          backgroundColor: 'rgba(0,0,0,0.2)',
          borderRadius: radius.lg,
          padding: 4,
          gap: 4,
        },
        tab: {
          flex: 1,
          paddingVertical: spacing.sm,
          paddingHorizontal: spacing.md,
          borderRadius: radius.md,
          alignItems: 'center',
        },
        tabActive: {
          backgroundColor: colors.primary,
          ...(Platform.OS === 'ios'
            ? {
                shadowColor: colors.primary,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.3,
                shadowRadius: 6,
              }
            : { elevation: 4 }),
        },
        tabPressed: {
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

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeId;
        return (
          <Pressable
            key={tab.id}
            onPress={() => onSelect(tab.id)}
            style={({ pressed }) => [
              styles.tab,
              isActive && styles.tabActive,
              pressed && styles.tabPressed,
            ]}
          >
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
