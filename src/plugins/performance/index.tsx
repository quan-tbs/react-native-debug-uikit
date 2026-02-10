import { Text } from 'react-native';
import { colors } from '../../common/theme/colors';
import { useTheme } from '../../common/theme/ThemeContext';
import { GlassCard } from '../../common/components';
import type { DebugToolPlugin, PluginScreenProps } from '../../core/types';

function PerformancePlaceholder(_props: PluginScreenProps) {
  const { colors: c } = useTheme();
  return (
    <GlassCard style={{ flex: 1, padding: 24 }}>
      <Text style={{ color: c.textPrimary }}>Performance – Coming soon</Text>
    </GlassCard>
  );
}

export const performancePlugin: DebugToolPlugin = {
  id: 'performance',
  name: 'Performance',
  subtitle: 'Metrics',
  icon: '⚡',
  iconColor: colors.neonPurple,
  order: 20,
  component: PerformancePlaceholder,
};
