import {
  createContext,
  type Dispatch,
  type ReactNode,
  useContext,
} from 'react';
import type { NavigationAction } from './NavigationState';
import type { DebugToolPlugin, NavigationState } from './types';

export interface DebugToolkitContextValue {
  plugins: DebugToolPlugin[];
  navigationState: NavigationState;
  dispatch: Dispatch<NavigationAction>;
}

const DebugToolkitContext = createContext<DebugToolkitContextValue | null>(
  null
);

export function useDebugToolkit(): DebugToolkitContextValue {
  const ctx = useContext(DebugToolkitContext);
  if (!ctx)
    throw new Error('useDebugToolkit must be used within DebugToolkitProvider');
  return ctx;
}

export function DebugToolkitContextProvider({
  value,
  children,
}: {
  value: DebugToolkitContextValue;
  children: ReactNode;
}) {
  return (
    <DebugToolkitContext.Provider value={value}>
      {children}
    </DebugToolkitContext.Provider>
  );
}
