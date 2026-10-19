import { useSyncExternalStore } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

const subscribe = () => () => {};

/**
 * Static rendering has no browser to read the color scheme from, so render 'light' on the server
 * and during hydration, then switch to the real scheme. useSyncExternalStore uses the server
 * snapshot (false) while hydrating and the client snapshot (true) right after, no effect needed.
 */
export function useColorScheme() {
  const hasHydrated = useSyncExternalStore(subscribe, () => true, () => false);
  const colorScheme = useRNColorScheme();

  return hasHydrated ? colorScheme : 'light';
}
