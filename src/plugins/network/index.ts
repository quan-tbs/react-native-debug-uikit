import { colors } from '../../common/theme/colors';
import type { DebugToolPlugin } from '../../core/types';
import { NetworkPlugin } from './NetworkPlugin';

export const networkPlugin: DebugToolPlugin = {
  id: 'network',
  name: 'Network',
  subtitle: 'Traffic',
  icon: '📡',
  iconColor: colors.neonBlue,
  order: 10,
  component: NetworkPlugin,
};
