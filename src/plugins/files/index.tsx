import { Text } from 'react-native';
import { colors } from '../../common/theme/colors';
import { useTheme } from '../../common/theme/ThemeContext';
import { GlassCard } from '../../common/components';
import type { DebugToolPlugin, PluginScreenProps } from '../../core/types';

function FilesPlaceholder(_props: PluginScreenProps) {
  const { colors: c } = useTheme();
  return (
    <GlassCard style={{ flex: 1, padding: 24 }}>
      <Text style={{ color: c.textPrimary }}>Files – Coming soon</Text>
    </GlassCard>
  );
}

export const filesPlugin: DebugToolPlugin = {
  id: 'files',
  name: 'Files',
  subtitle: 'Storage',
  icon: '📁',
  iconColor: colors.textPrimary,
  order: 50,
  component: FilesPlaceholder,
};
