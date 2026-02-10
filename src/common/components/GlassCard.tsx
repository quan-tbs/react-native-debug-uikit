import { useMemo } from 'react';
import { StyleSheet, View, type ViewProps } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { radius } from '../theme/radius';
import { shadows } from '../theme/shadows';

export interface GlassCardProps extends ViewProps {
  children: React.ReactNode;
}

export function GlassCard({ children, style, ...rest }: GlassCardProps) {
  const { colors } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        card: {
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.borderSubtle,
          borderRadius: radius.xxl,
          ...shadows.glass,
        },
      }),
    [colors]
  );
  return (
    <View style={[styles.card, style]} {...rest}>
      {children}
    </View>
  );
}
