import { colors } from '../../common/theme/colors';
import type { DebugToolPlugin } from '../../core/types';
import { ReduxPlugin } from './ReduxPlugin';

export const reduxPlugin: DebugToolPlugin = {
  id: 'redux',
  name: 'Redux',
  subtitle: 'State',
  icon: '🌳',
  iconColor: colors.neonPink,
  order: 40,
  component: ReduxPlugin,
};
