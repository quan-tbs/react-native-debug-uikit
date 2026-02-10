import type { ReactNode } from 'react';
import { useReducer } from 'react';
import { StyleSheet, View } from 'react-native';
import { mergePlugins } from './PluginRegistry';
import { builtInPlugins } from '../plugins';
import type { DebugToolkitConfig } from './types';
import { navigationReducer, initialNavigationState } from './NavigationState';
import { DebugToolkitContextProvider } from './DebugToolkitContext';
import { OverlayContainer } from './OverlayContainer';
import { AssistiveTouchButton } from '../screens/AssistiveTouchButton';
import { ThemeProvider } from '../common/theme/ThemeContext';

export interface DebugToolkitProviderProps extends DebugToolkitConfig {
  children: ReactNode;
}

export function DebugToolkitProvider({
  children,
  enabled = typeof __DEV__ !== 'undefined' ? __DEV__ : true,
  plugins: customPlugins = [],
  disableBuiltIn = [],
  theme: initialTheme = 'system',
}: DebugToolkitProviderProps) {
  const [navigationState, dispatch] = useReducer(
    navigationReducer,
    initialNavigationState
  );

  const plugins = mergePlugins(builtInPlugins, customPlugins, disableBuiltIn);

  const contextValue = {
    plugins,
    navigationState,
    dispatch,
  };

  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <DebugToolkitContextProvider value={contextValue}>
      <View style={styles.root}>
        {children}
        <ThemeProvider initialTheme={initialTheme}>
          <View style={styles.overlayLayer} pointerEvents="box-none">
            <AssistiveTouchButton />
            {navigationState.isOverlayVisible && <OverlayContainer />}
          </View>
        </ThemeProvider>
      </View>
    </DebugToolkitContextProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  overlayLayer: {
    ...StyleSheet.absoluteFillObject,
    pointerEvents: 'box-none',
  },
});
