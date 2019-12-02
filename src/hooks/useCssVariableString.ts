import { useMemo } from 'react';

export const useCssVariableString = (variableName: string, deps: any[] = []): string => {
  return useMemo(() => {
    return getComputedStyle(document.documentElement).getPropertyValue(variableName);
  }, deps);
};
