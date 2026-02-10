import { useMemo } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { radius } from '../theme/radius';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { IconSymbol, ICONS } from './IconSymbol';

export interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

export function SearchInput({
  value,
  onChangeText,
  placeholder = 'Filter...',
  onFocus,
  onBlur,
}: SearchInputProps) {
  const { colors } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrapper: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.surfaceLight,
          borderWidth: 1,
          borderColor: colors.borderLight,
          borderRadius: radius.lg,
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.sm,
          gap: spacing.sm,
        },
        input: {
          flex: 1,
          ...typography.mono,
          color: colors.textPrimary,
          paddingVertical: 0,
          minHeight: 36,
        },
      }),
    [colors]
  );

  return (
    <View style={styles.wrapper}>
      <IconSymbol symbol={ICONS.SEARCH} size={18} color={colors.textMuted} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        onFocus={onFocus}
        onBlur={onBlur}
        style={styles.input}
      />
    </View>
  );
}
