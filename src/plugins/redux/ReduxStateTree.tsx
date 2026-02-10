import { LegendList, type LegendListRenderItemProps } from '@legendapp/list';
import { useCallback, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  GlassCard,
  GlassButton,
  SearchInput,
  IconSymbol,
  ICONS,
} from '../../common/components';
import { useTheme } from '../../common/theme/ThemeContext';
import { spacing } from '../../common/theme/spacing';
import { typography } from '../../common/theme/typography';
import { TreeNode } from './components/TreeNode';

const MOCK_STATE = {
  user: {
    isAuthenticated: true,
    username: 'Neo_V2',
    id: 1024,
    role: 'admin',
    lastLogin: '2023-10-27T14:30:00Z',
  },
  settings: { theme: 'dark', locale: 'en' },
  posts: {
    loading: false,
    error: null,
    totalCount: 42,
    items: [
      { id: 1, title: 'Redux Toolkit V2' },
      { id: 2, title: 'Glassmorphism UI' },
    ],
  },
  notifications: [1, 2, 3, 4, 5],
  analytics: {},
};

export interface ReduxStateTreeProps {
  onClose: () => void;
}

type TreeEntry = { key: string; value: unknown };

export function ReduxStateTree({ onClose }: ReduxStateTreeProps) {
  const { colors } = useTheme();
  const [filter, setFilter] = useState('');

  const treeEntries = useMemo<TreeEntry[]>(
    () => Object.entries(MOCK_STATE).map(([key, value]) => ({ key, value })),
    []
  );

  const renderTreeNode = useCallback(
    ({ item }: LegendListRenderItemProps<TreeEntry>) => (
      <TreeNode keyName={item.key} value={item.value} depth={0} />
    ),
    []
  );

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          padding: spacing.md,
          maxHeight: '85%',
        },
        header: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          marginBottom: spacing.sm,
        },
        logoRow: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: spacing.xs,
        },
        title: {
          ...typography.mono,
          color: colors.textPrimary,
          fontSize: 12,
        },
        subtitle: {
          ...typography.mono,
          color: colors.primary,
          fontSize: 10,
          marginLeft: spacing.sm,
        },
        iconText: {
          color: colors.textPrimary,
          fontSize: 18,
        },
        actions: {
          flexDirection: 'row',
          gap: spacing.sm,
          marginBottom: spacing.sm,
        },
        tree: {
          flex: 1,
          marginBottom: spacing.sm,
        },
        treeContent: {
          paddingBottom: spacing.lg,
        },
        footer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: spacing.sm,
          borderTopWidth: 1,
          borderTopColor: colors.borderSubtle,
        },
        footerLeft: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: spacing.xs,
        },
        greenDot: {
          width: 6,
          height: 6,
          borderRadius: 3,
          backgroundColor: colors.neonGreen,
        },
        footerText: {
          ...typography.mono,
          color: colors.textMuted,
          fontSize: 10,
          textTransform: 'uppercase',
        },
      }),
    [colors]
  );

  return (
    <GlassCard style={styles.container}>
      <View style={styles.header}>
        <View>
          <View style={styles.logoRow}>
            <IconSymbol
              symbol="▣"
              size={24}
              color={colors.primary}
              glowColor={colors.primary}
            />
            <Text style={styles.title}>DEBUG_RN //</Text>
          </View>
          <Text style={styles.subtitle}>REDUX_STATE_TREE_V2</Text>
        </View>
        <GlassButton
          circular
          onPress={onClose}
          icon={
            <IconSymbol
              symbol={ICONS.CLOSE}
              size={18}
              color={colors.textPrimary}
            />
          }
        />
      </View>
      <SearchInput
        value={filter}
        onChangeText={setFilter}
        placeholder="Filter state keys..."
      />
      <View style={styles.actions}>
        <GlassButton title="Collapse All" variant="ghost" onPress={() => {}} />
        <GlassButton title="Expand All" onPress={() => {}} />
      </View>
      <LegendList
        data={treeEntries}
        keyExtractor={(item) => item.key}
        renderItem={renderTreeNode}
        style={styles.tree}
        contentContainerStyle={styles.treeContent}
        showsVerticalScrollIndicator={false}
        recycleItems
        estimatedItemSize={40}
      />
      <View style={styles.footer}>
        <View style={styles.footerLeft}>
          <View style={styles.greenDot} />
          <Text style={styles.footerText}>CONNECTED: 12MS</Text>
        </View>
        <Text style={styles.footerText}>MEMORY: 14.2MB</Text>
      </View>
    </GlassCard>
  );
}
