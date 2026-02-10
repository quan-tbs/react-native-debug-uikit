import { NitroModules } from 'react-native-nitro-modules';
import type { DebugToolkit } from './DebugToolkit.nitro';

const DebugToolkitHybridObject =
  NitroModules.createHybridObject<DebugToolkit>('DebugToolkit');

export function multiply(a: number, b: number): number {
  return DebugToolkitHybridObject.multiply(a, b);
}

// Core
export { DebugToolkitProvider } from './core/DebugToolkitProvider';
export type {
  DebugToolPlugin,
  PluginScreenProps,
  DebugToolkitConfig,
} from './core/types';

// Built-in plugins
export { networkPlugin } from './plugins/network';
export { reduxPlugin } from './plugins/redux';
export { consolePlugin } from './plugins/console';
export { performancePlugin } from './plugins/performance';
export { filesPlugin } from './plugins/files';

// Common components (for third-party plugin authors)
export {
  GlassCard,
  GlassButton,
  GlassOverlay,
  SearchInput,
  FilterTabs,
  TabBar,
  IconSymbol,
  ICONS,
  Divider,
  StatusBadge,
  MethodBadge,
} from './common/components';
export type { IconName } from './common/components';

// Theme (for third-party plugin authors)
export {
  colors,
  darkColors,
  lightColors,
  spacing,
  radius,
  typography,
  shadows,
  ThemeProvider,
  useTheme,
  createGlassStyle,
  createNeonGlow,
  getGlassPanelBase,
  glassPanelBase,
} from './common/theme';
export type { Colors, ThemeMode, ThemeContextValue } from './common/theme';
