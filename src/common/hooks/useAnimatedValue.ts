import { useRef } from 'react';
import { Animated } from 'react-native';

export function useAnimatedValue(initialValue: number) {
  return useRef(new Animated.Value(initialValue)).current;
}
