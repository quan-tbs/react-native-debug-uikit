import { LegendList, type LegendListRenderItemProps } from '@legendapp/list';
import { useCallback, useMemo, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import {
  GlassCard,
  GlassButton,
  SearchInput,
  FilterTabs,
} from '../../common/components';
import { useTheme } from '../../common/theme/ThemeContext';
import { spacing } from '../../common/theme/spacing';
import { typography } from '../../common/theme/typography';
import { RequestItem } from './components/RequestItem';
import type { RequestItemData } from './components/RequestItem';

const FILTER_TABS = [
  { id: 'all', label: 'All' },
  { id: 'xhr', label: 'XHR' },
  { id: 'fetch', label: 'Fetch' },
  { id: 'doc', label: 'Doc' },
  { id: 'ws', label: 'WS' },
];

const MOCK_REQUESTS: RequestItemData[] = [
  {
    id: '1',
    method: 'POST',
    url: '/auth/login',
    status: 500,
    duration: '450ms',
    description: 'client_error',
    variant: 'error',
  },
  {
    id: '2',
    method: 'GET',
    url: '/user/profile',
    status: 200,
    duration: '120ms',
    description: 'application/json',
    variant: 'success',
  },
  {
    id: '3',
    method: 'GET',
    url: '/dashboard/stats',
    status: 200,
    duration: '85ms',
    variant: 'success',
  },
  {
    id: '4',
    method: 'PUT',
    url: '/settings/update',
    description: 'uploading...',
    variant: 'pending',
  },
  {
    id: '5',
    method: 'GET',
    url: '/static/avatar_04.png',
    status: 200,
    duration: '210ms',
    description: 'image/png • 24kb',
    variant: 'success',
  },
  {
    id: '6',
    method: 'GET',
    url: '/api/v1/old-route',
    status: 301,
    duration: '45ms',
    description: 'Moved Permanently',
    variant: 'neutral',
  },
];

export interface NetworkInspectorListProps {
  onClose: () => void;
  onSelectRequest: (request: RequestItemData) => void;
}

export function NetworkInspectorList({
  onClose,
  onSelectRequest,
}: NetworkInspectorListProps) {
  const { colors } = useTheme();
  const [search, setSearch] = useState('');
  const [filterId, setFilterId] = useState('all');

  const styles = useMemo(() => {
    const { height: screenHeight } = Dimensions.get('window');
    const minHeight = screenHeight * 0.8; // 80% device height

    return StyleSheet.create({
      card: {
        padding: spacing.md,
        maxHeight: '90%',
        minHeight,
        width: '100%',
        flexDirection: 'column',
      },
      content: {
        flex: 1,
      },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: spacing.sm,
      },
      iconText: {
        color: colors.textPrimary,
        fontSize: 18,
      },
      title: {
        ...typography.title,
        color: colors.textPrimary,
      },
      divider: {
        height: 1,
        backgroundColor: colors.borderSubtle,
        marginVertical: spacing.sm,
      },
      dateLabel: {
        ...typography.mono,
        color: colors.textMuted,
        fontSize: 10,
        marginBottom: spacing.xs,
      },
      list: {
        paddingBottom: spacing.xxl + spacing.lg,
      },
      listContainer: {
        flex: 1,
      },
    });
  }, [colors]);

  const filtered = MOCK_REQUESTS.filter((r) => {
    if (search && !r.url.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });

  const renderItem = useCallback(
    ({ item }: LegendListRenderItemProps<RequestItemData>) => (
      <RequestItem item={item} onPress={() => onSelectRequest(item)} />
    ),
    [onSelectRequest]
  );

  return (
    <GlassCard style={styles.card}>
      <View style={styles.header}>
        <GlassButton
          circular
          onPress={onClose}
          icon={<Text style={styles.iconText}>←</Text>}
        />
        <Text style={styles.title}>Network Inspector</Text>
        <GlassButton
          circular
          onPress={() => {}}
          icon={<Text style={styles.iconText}>⚙</Text>}
        />
      </View>
      <SearchInput
        value={search}
        onChangeText={setSearch}
        placeholder="Filter by regex..."
      />
      <FilterTabs
        tabs={FILTER_TABS}
        activeId={filterId}
        onSelect={setFilterId}
      />
      <View style={styles.divider} />
      <Text style={styles.dateLabel}>TODAY, 10:42 AM</Text>
      <View style={styles.content}>
        <LegendList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          style={styles.listContainer}
          showsVerticalScrollIndicator={false}
          recycleItems
          estimatedItemSize={72}
          maintainVisibleContentPosition
        />
      </View>
    </GlassCard>
  );
}
