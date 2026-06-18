import { useSyncExternalStore } from "react";

// Returns true only on the client after hydration — zero extra renders.
// Uses useSyncExternalStore which React designed specifically for this pattern.
const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function useIsClient(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
