import { useMemo } from 'react';

export function useCssVariableString(variableName: string, deps: any[] = []): string {
  return useMemo(() => {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(variableName)
      .trim();
  }, deps);
}
