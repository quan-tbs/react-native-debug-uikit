export {
  getWindowDimensions,
  scale,
  widthPercent,
  heightPercent,
  MAX_CONTENT_WIDTH,
} from './responsive';
export {
  isIOS,
  isAndroid,
  getStatusBarHeight,
  getSafeTopInset,
} from './platform';
export {
  tokenizeJson,
  jsonToLines,
  colorsToSyntaxMap,
} from './syntaxHighlight';

export type { Token, TokenType } from './syntaxHighlight';
