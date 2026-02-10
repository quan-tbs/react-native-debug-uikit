import { consolePlugin } from './console';
import { filesPlugin } from './files';
import { networkPlugin } from './network';
import { performancePlugin } from './performance';
import { reduxPlugin } from './redux';

export const builtInPlugins = [
  networkPlugin,
  performancePlugin,
  consolePlugin,
  reduxPlugin,
  filesPlugin,
];

export { networkPlugin } from './network';
export { reduxPlugin } from './redux';
export { consolePlugin } from './console';
export { performancePlugin } from './performance';
export { filesPlugin } from './files';
