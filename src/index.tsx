import { NitroModules } from 'react-native-nitro-modules';
import type { DebugToolkit } from './DebugToolkit.nitro';

const DebugToolkitHybridObject =
  NitroModules.createHybridObject<DebugToolkit>('DebugToolkit');

export function multiply(a: number, b: number): number {
  return DebugToolkitHybridObject.multiply(a, b);
}
