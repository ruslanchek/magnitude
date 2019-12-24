import { useMemo } from 'react';

export function useCssVariableNumber(variableName: string, deps: any[] = []): number {
  return useMemo(() => {
    let value = parseInt(
      getComputedStyle(document.documentElement)
        .getPropertyValue(variableName)
        .trim(),
      10,
    );

    if (isNaN(value)) {
      value = 0;
    }

    return value;
  }, deps);
}
