import type { NavigationState as NavState, NavScreen } from './types';

export const OPEN_DASHBOARD = 'OPEN_DASHBOARD';
export const OPEN_PLUGIN = 'OPEN_PLUGIN';
export const GO_BACK = 'GO_BACK';
export const CLOSE = 'CLOSE';

export type NavigationAction =
  | { type: typeof OPEN_DASHBOARD }
  | { type: typeof OPEN_PLUGIN; pluginId: string }
  | { type: typeof GO_BACK }
  | { type: typeof CLOSE };

export function navigationReducer(
  state: NavState,
  action: NavigationAction
): NavState {
  switch (action.type) {
    case OPEN_DASHBOARD:
      return {
        stack: [{ type: 'dashboard' }],
        isOverlayVisible: true,
      };
    case OPEN_PLUGIN:
      return {
        stack: [...state.stack, { type: 'plugin', pluginId: action.pluginId }],
        isOverlayVisible: true,
      };
    case GO_BACK:
      if (state.stack.length <= 1) return state;
      return {
        ...state,
        stack: state.stack.slice(0, -1),
      };
    case CLOSE:
      return {
        stack: [],
        isOverlayVisible: false,
      };
    default:
      return state;
  }
}

export const initialNavigationState: NavState = {
  stack: [],
  isOverlayVisible: false,
};

export function getCurrentScreen(state: NavState): NavScreen | null {
  return state.stack.length > 0
    ? state.stack[state.stack.length - 1] ?? null
    : null;
}
