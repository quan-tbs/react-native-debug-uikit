import type { ComponentType } from 'react';

export interface PluginScreenProps {
  onClose: () => void;
  onNavigate: (screenId: string, params?: unknown) => void;
  onGoBack: () => void;
}

export interface DebugToolPlugin {
  id: string;
  name: string;
  subtitle?: string;
  icon: string;
  iconColor: string;
  badge?: string | number;
  badgeColor?: string;
  gridSpan?: 1 | 2;
  order?: number;
  component: ComponentType<PluginScreenProps>;
}

export type ThemeMode = 'light' | 'dark' | 'system';

export interface DebugToolkitConfig {
  enabled?: boolean;
  plugins?: DebugToolPlugin[];
  disableBuiltIn?: string[];
  /** Initial theme for debug overlay. Defaults to 'system'. */
  theme?: ThemeMode;
}

export type NavScreen =
  | { type: 'dashboard' }
  | { type: 'plugin'; pluginId: string };

export interface NavigationState {
  stack: NavScreen[];
  isOverlayVisible: boolean;
}
