import { Text } from 'react-native';
import { colors } from '../../common/theme/colors';
import { useTheme } from '../../common/theme/ThemeContext';
import { GlassCard } from '../../common/components';
import type { DebugToolPlugin, PluginScreenProps } from '../../core/types';

function ConsolePlaceholder(_props: PluginScreenProps) {
  const { colors: c } = useTheme();
  return (
    <GlassCard style={{ flex: 1, padding: 24 }}>
      <Text style={{ color: c.textPrimary }}>Console Logs – Coming soon</Text>
      <Text style={{ color: c.textMuted, marginTop: 8 }}>
        Plugin placeholder
      </Text>
    </GlassCard>
  );
}

export const consolePlugin: DebugToolPlugin = {
  id: 'console',
  name: 'Console Logs',
  icon: '📟',
  iconColor: colors.neonYellow,
  gridSpan: 2,
  order: 30,
  component: ConsolePlaceholder,
};
