import { useMemo } from 'react';
import {
  type GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { radius } from '../theme/radius';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

export interface GlassButtonProps {
  title?: string;
  onPress: (event: GestureResponderEvent) => void;
  variant?: 'default' | 'primary' | 'ghost';
  glassVariant?: 'subtle' | 'medium' | 'strong';
  disabled?: boolean;
  style?: ViewStyle;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  circular?: boolean;
}

export function GlassButton({
  title,
  onPress,
  variant = 'default',
  glassVariant = 'medium',
  disabled = false,
  style,
  children,
  icon,
  circular = false,
}: GlassButtonProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => {
    // Select backgroundColor and borderColor based on glassVariant (only for default variant)
    let backgroundColor = colors.surfaceLight;
    let borderColor = colors.borderLight;

    if (variant === 'default') {
      switch (glassVariant) {
        case 'subtle':
          backgroundColor = colors.surfaceLightSubtle ?? colors.surfaceLight;
          borderColor = colors.borderSubtle;
          break;
        case 'medium':
          backgroundColor = colors.surfaceLightMedium ?? colors.surfaceLight;
          borderColor = colors.borderSubtle;
          break;
        case 'strong':
          backgroundColor = colors.surfaceLightStrong ?? colors.surfaceLight;
          borderColor = colors.borderLight;
          break;
      }
    }

    return StyleSheet.create({
      base: {
        backgroundColor,
        borderWidth: 1,
        borderColor,
        borderRadius: radius.lg,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        minHeight: 44,
        justifyContent: 'center',
        alignItems: 'center',
      },
      primary: {
        backgroundColor: colors.primary,
        borderColor: colors.borderGlow,
      },
      ghost: {
        backgroundColor: 'transparent',
        borderColor: colors.borderSubtle,
      },
      circular: {
        width: 44,
        minHeight: 44,
        paddingHorizontal: 0,
        borderRadius: 22,
      },
      pressed: {
        opacity: 0.85,
        transform: [{ scale: 0.98 }],
      },
      disabled: {
        opacity: 0.5,
      },
      text: {
        ...typography.button,
        color: colors.textPrimary,
      },
    });
  }, [colors, variant, glassVariant]);

  const content =
    children ??
    (icon ? (
      <>{icon}</>
    ) : title ? (
      <Text style={styles.text}>{title}</Text>
    ) : null);

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        variant === 'primary' && styles.primary,
        variant === 'ghost' && styles.ghost,
        circular && styles.circular,
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      {content}
    </Pressable>
  );
}
