import { useStore } from 'react-stores';
import { appStore } from "../stores/appStore";

export function useAppReady(): boolean {
  const appState = useStore(appStore);
  return appState.isReady;
}
