import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export function getWindowDimensions() {
  return { width: SCREEN_WIDTH, height: SCREEN_HEIGHT };
}

export function scale(size: number, factor: number = 0.5) {
  const baseWidth = 375;
  return size + (SCREEN_WIDTH - baseWidth) * factor * (size / baseWidth);
}

export function widthPercent(pct: number) {
  return (SCREEN_WIDTH * pct) / 100;
}

export function heightPercent(pct: number) {
  return (SCREEN_HEIGHT * pct) / 100;
}

export const MAX_CONTENT_WIDTH = 430;
