import { createContext } from 'react';

interface ContextValue {
  getLastRouteState: () => { type: 'move' | 'back'; fromPath: string } | null;
}

export const NavigationContext = createContext<ContextValue>({
  getLastRouteState: () => null,
});
