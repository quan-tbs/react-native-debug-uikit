import { Platform, StatusBar } from 'react-native';

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

export function getStatusBarHeight(): number {
  if (isAndroid) {
    return StatusBar.currentHeight ?? 24;
  }
  return 50;
}

export function getSafeTopInset(): number {
  return getStatusBarHeight();
}
