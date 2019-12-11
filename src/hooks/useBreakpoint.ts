import { useMemo } from 'react';
import { useScreenSizeChanged } from './useScreenSizeChanged';
import { useCssVariableNumber } from './useCssVariableNumber';

type TPreset = 'mobile' | 'desktop';

interface EPreset {
  min: number;
  max: number;
}

export interface IBreakpoint<T> {
  preset: TPreset | EPreset;
  value: T;
}

const DEFAULT_THROTTLE_TIME = 200;

const calculateValue = <T>(
  defaultValue: T,
  breakpoints: IBreakpoint<T>[] | undefined,
  width: number,
  minMobile: number,
  maxMobile: number,
  minDesktop: number,
  maxDesktop: number,
): T => {
  let currentBreakpoint: IBreakpoint<T> | null = null;

  if (breakpoints) {
    for (let i = 0, l = breakpoints.length; i < l; i++) {
      const breakpoint = breakpoints[i];

      if (typeof breakpoint.preset === 'string') {
        let min = -Infinity;
        let max = Infinity;

        switch (breakpoint.preset) {
          case 'mobile': {
            min = minMobile;
            max = maxMobile;
            break;
          }

          case 'desktop':
          default: {
            min = minDesktop;
            max = maxDesktop;
            break;
          }
        }

        if (width >= min && width <= max) {
          currentBreakpoint = breakpoint;
          break;
        }
      } else if (typeof breakpoint.preset === 'object' && breakpoint.preset.min >= 0 && breakpoint.preset.max >= 0) {
        if (width >= breakpoint.preset.min && width <= breakpoint.preset.max) {
          currentBreakpoint = breakpoint;
          break;
        }
      }
    }
  }

  if (currentBreakpoint) {
    return currentBreakpoint.value;
  } else {
    return defaultValue;
  }
};

export function useBreakpoint<T = any>(
  defaultValue: T,
  breakpoints: IBreakpoint<T>[] | undefined,
  throttleTime: number = DEFAULT_THROTTLE_TIME,
): T | undefined {
  const screenSize = useScreenSizeChanged(throttleTime);
  const minMobile = useCssVariableNumber('--MOBILE_MIN');
  const maxMobile = useCssVariableNumber('--MOBILE_MAX');
  const minDesktop = useCssVariableNumber('--DESKTOP_MIN');
  const maxDesktop = useCssVariableNumber('--DESKTOP_MAX');

  return useMemo(() => {
    return calculateValue<T>(defaultValue, breakpoints, screenSize.width, minMobile, maxMobile, minDesktop, maxDesktop);
  }, [defaultValue, breakpoints, screenSize.width, minMobile, maxMobile, minDesktop, maxDesktop]);
}
