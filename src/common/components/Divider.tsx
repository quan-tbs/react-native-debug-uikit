import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export function Divider() {
  const { colors } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        divider: {
          height: 1,
          backgroundColor: colors.borderSubtle,
        },
      }),
    [colors]
  );
  return <View style={styles.divider} />;
}
