import { StyleSheet, View } from 'react-native';
import { DashboardOverlay } from '../screens/DashboardOverlay';
import { GlassOverlay } from '../common/components';
import { useDebugToolkit } from './DebugToolkitContext';
import { getCurrentScreen } from './NavigationState';

const pluginComponentStyle = StyleSheet.create({
  wrapper: {
    flex: 1,
    maxWidth: '100%',
    maxHeight: '100%',
  },
});

export function OverlayContainer() {
  const { plugins, navigationState, dispatch } = useDebugToolkit();
  const current = getCurrentScreen(navigationState);

  if (!navigationState.isOverlayVisible || !current) return null;

  if (current.type === 'dashboard') {
    return <DashboardOverlay />;
  }

  const plugin = plugins.find((p) => p.id === current.pluginId);
  if (!plugin) return null;

  const PluginComponent = plugin.component;
  return (
    <GlassOverlay onBackdropPress={() => dispatch({ type: 'CLOSE' })}>
      <View style={pluginComponentStyle.wrapper}>
        <PluginComponent
          onClose={() => dispatch({ type: 'CLOSE' })}
          onNavigate={() => {}}
          onGoBack={() => dispatch({ type: 'GO_BACK' })}
        />
      </View>
    </GlassOverlay>
  );
}
