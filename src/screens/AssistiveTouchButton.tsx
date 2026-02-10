import { useEffect, useMemo, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  type ViewStyle,
} from 'react-native';
import { useDraggable } from '../common/hooks/useDraggable';
import { useTheme } from '../common/theme/ThemeContext';
import { useDebugToolkit } from '../core/DebugToolkitContext';
import { OPEN_DASHBOARD } from '../core/NavigationState';
import type { Colors } from '../common/theme/colors';

const BUTTON_SIZE = 60;
const EDGE_PADDING = 16;

const staticStyles = StyleSheet.create({
  icon: {
    fontSize: 28,
  },
});

function createButtonStyle(colors: Colors): ViewStyle {
  return {
    position: 'absolute',
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderColor: colors.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
    ...(Platform.OS === 'ios'
      ? {
          shadowColor: colors.primary,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.4,
          shadowRadius: 12,
        }
      : { elevation: 8 }),
  };
}

interface ScreenBounds {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

function calculateBounds(
  screenWidth: number,
  screenHeight: number
): ScreenBounds {
  return {
    minX: EDGE_PADDING,
    maxX: screenWidth - BUTTON_SIZE - EDGE_PADDING,
    minY: EDGE_PADDING,
    maxY: screenHeight - BUTTON_SIZE - EDGE_PADDING,
  };
}

function calculateInitialPosition(
  screenHeight: number,
  bounds: ScreenBounds
): { x: number; y: number } {
  return {
    x: bounds.maxX,
    y: Math.max(
      bounds.minY,
      Math.min(bounds.maxY, screenHeight / 2 - BUTTON_SIZE / 2)
    ),
  };
}

function calculateSnapX(
  x: number,
  screenWidth: number,
  bounds: ScreenBounds
): number {
  return x < screenWidth / 2 ? bounds.minX : bounds.maxX;
}

export function AssistiveTouchButton() {
  const { dispatch } = useDebugToolkit();
  const { colors } = useTheme();
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const buttonStyle = useMemo(() => createButtonStyle(colors), [colors]);

  const bounds = useMemo(
    () => calculateBounds(screenWidth, screenHeight),
    [screenWidth, screenHeight]
  );

  const initialPosition = useMemo(
    () => calculateInitialPosition(screenHeight, bounds),
    [screenHeight, bounds]
  );

  const { pan, panResponder, setPosition } = useDraggable({
    initialX: initialPosition.x,
    initialY: initialPosition.y,
    onTap: () => dispatch({ type: OPEN_DASHBOARD }),
    onDragEnd: (x, y) => {
      const snapX = calculateSnapX(x, screenWidth, bounds);
      const clampedY = Math.max(bounds.minY, Math.min(bounds.maxY, y));
      Animated.spring(pan, {
        toValue: { x: snapX, y: clampedY },
        useNativeDriver: false,
        friction: 8,
        tension: 80,
      }).start(() => setPosition(snapX, clampedY));
    },
    bounds,
  });

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.08,
          duration: 800,
          useNativeDriver: false,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.95,
          duration: 800,
          useNativeDriver: false,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [pulseAnim]);

  return (
    <Animated.View
      style={[
        buttonStyle,
        {
          transform: [
            { translateX: pan.x },
            { translateY: pan.y },
            { scale: pulseAnim },
          ],
        },
      ]}
      {...panResponder.panHandlers}
    >
      <Text style={staticStyles.icon}>🐛</Text>
    </Animated.View>
  );
}
