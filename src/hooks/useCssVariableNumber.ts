export function useCssVariableNumber(variableName: string): number {
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
}
