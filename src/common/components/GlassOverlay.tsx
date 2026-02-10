import { useMemo } from 'react';
import {
  Dimensions,
  Pressable,
  StyleSheet,
  View,
  type ViewProps,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export interface GlassOverlayProps extends ViewProps {
  children: React.ReactNode;
  onBackdropPress?: () => void;
}

export function GlassOverlay({
  children,
  onBackdropPress,
  style,
  ...rest
}: GlassOverlayProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => {
    const { width: screenWidth } = Dimensions.get('window');
    const maxWidth = Math.min(screenWidth * 0.9, 430);

    return StyleSheet.create({
      overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: colors.overlay,
      },
      contentContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 48,
      },
      content: {
        width: '90%',
        maxWidth,
        maxHeight: '90%',
      },
    });
  }, [colors]);
  return (
    <View style={styles.overlay} {...rest}>
      <Pressable
        style={StyleSheet.absoluteFill}
        onPress={onBackdropPress}
        accessible={false}
      />
      <View style={styles.contentContainer} pointerEvents="box-none">
        <View style={[styles.content, style]}>{children}</View>
      </View>
    </View>
  );
}
