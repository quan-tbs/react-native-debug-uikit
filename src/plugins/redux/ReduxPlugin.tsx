import type { PluginScreenProps } from '../../core/types';
import { ReduxStateTree } from './ReduxStateTree';

export function ReduxPlugin({ onClose }: PluginScreenProps) {
  return <ReduxStateTree onClose={onClose} />;
}
