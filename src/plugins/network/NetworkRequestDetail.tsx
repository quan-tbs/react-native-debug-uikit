import { useMemo, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import {
  GlassCard,
  GlassButton,
  MethodBadge,
  StatusBadge,
  TabBar,
  IconSymbol,
  ICONS,
} from '../../common/components';
import { useTheme } from '../../common/theme/ThemeContext';
import { spacing } from '../../common/theme/spacing';
import { typography } from '../../common/theme/typography';
import { JsonViewer } from './components/JsonViewer';
import type { RequestItemData } from './components/RequestItem';

const TABS = [
  { id: 'headers', label: 'Headers' },
  { id: 'response', label: 'Response' },
  { id: 'request', label: 'Request' },
  { id: 'timing', label: 'Timing' },
];

const SAMPLE_JSON = JSON.stringify(
  {
    status: 200,
    message: 'Authentication successful',
    data: {
      id: 4829,
      username: 'cyber_ninja',
      role: 'admin',
      isActive: true,
      lastLogin: '2023-10-27T08:45:00Z',
      permissions: ['read:users', 'write:users', 'delete:logs'],
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    },
    errors: null,
  },
  null,
  2
);

export interface NetworkRequestDetailProps {
  request: RequestItemData;
  onBack: () => void;
  onClose: () => void;
}

export function NetworkRequestDetail({
  request,
  onBack,
  onClose,
}: NetworkRequestDetailProps) {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState('response');

  const styles = useMemo(() => {
    const { height: screenHeight } = Dimensions.get('window');
    const minHeight = screenHeight * 0.8; // 80% device height

    return StyleSheet.create({
      container: {
        padding: spacing.md,
        maxHeight: '90%',
        minHeight,
        width: '100%',
        flexDirection: 'column',
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
      metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        marginBottom: spacing.xs,
      },
      metaText: {
        ...typography.mono,
        color: colors.neonGreen,
        fontSize: 12,
      },
      urlPath: {
        ...typography.subtitle,
        color: colors.textPrimary,
        marginBottom: 2,
      },
      urlFull: {
        ...typography.mono,
        color: colors.textMuted,
        fontSize: 11,
        marginBottom: spacing.sm,
      },
      tabBar: {
        marginBottom: spacing.sm,
      },
      jsonContainer: {
        flex: 1,
        minHeight: 200,
        marginBottom: spacing.sm,
      },
      placeholder: {
        flex: 1,
        minHeight: 100,
        justifyContent: 'center',
        alignItems: 'center',
      },
      placeholderText: {
        color: colors.textMuted,
      },
      footer: {
        flexDirection: 'row',
        gap: spacing.sm,
      },
    });
  }, [colors]);

  return (
    <GlassCard style={styles.container}>
      <View style={styles.header}>
        <GlassButton
          circular
          onPress={onBack}
          icon={<Text style={styles.iconText}>←</Text>}
        />

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
      <View style={styles.metaRow}>
        <MethodBadge method={request.method} />
        <StatusBadge status={request.status ?? 200} />
        <Text style={styles.metaText}>145ms • 2.4kb</Text>
      </View>
      <Text style={styles.urlPath}>{request.url}</Text>
      <Text style={styles.urlFull} numberOfLines={1}>
        https://api.debugrn.dev{request.url}
      </Text>
      <View style={styles.tabBar}>
        <TabBar tabs={TABS} activeId={activeTab} onSelect={setActiveTab} />
      </View>
      {activeTab === 'response' && (
        <View style={styles.jsonContainer}>
          <JsonViewer json={SAMPLE_JSON} />
        </View>
      )}
      {activeTab !== 'response' && (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>{activeTab} – content</Text>
        </View>
      )}
      <View style={styles.footer}>
        <GlassButton title="cURL" onPress={() => {}} />
        <GlassButton title="Replay" variant="primary" onPress={() => {}} />
      </View>
    </GlassCard>
  );
}
