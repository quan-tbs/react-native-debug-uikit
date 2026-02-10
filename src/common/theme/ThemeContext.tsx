import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { useColorScheme } from 'react-native';
import { darkColors, lightColors } from './colors';
import type { Colors } from './colors';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeContextValue {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  colors: Colors;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: ThemeMode;
}

export function ThemeProvider({
  children,
  initialTheme = 'system',
}: ThemeProviderProps) {
  const [themeMode, setThemeMode] = useState<ThemeMode>(initialTheme);
  const systemScheme = useColorScheme();

  const resolvedScheme =
    themeMode === 'system' ? systemScheme ?? 'dark' : themeMode;
  const colors: Colors = resolvedScheme === 'light' ? lightColors : darkColors;

  const value = useMemo<ThemeContextValue>(
    () => ({
      themeMode,
      setThemeMode,
      colors,
    }),
    [themeMode, colors]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return ctx;
}
