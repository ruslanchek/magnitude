import { useState, useEffect } from 'react';

type TScreenOrientation = 'landscape' | 'portrait' | undefined;

interface IScreenSize {
  width: number;
  height: number;
  orientation: TScreenOrientation;
}

const DEFAULT_THROTTLE_TIME = 50;

const isSsr = (): boolean => {
  return typeof window === 'undefined';
};

const getDeviceOrientation = (): TScreenOrientation | undefined => {
  if (isSsr()) {
    return undefined;
  } else {
    const { orientation } = window.screen;

    if (orientation && orientation.type) {
      return orientation.type.includes('landscape') ? 'landscape' : 'portrait';
    }

    return undefined;
  }
};

const getWindowDimensions = (): {
  width: number;
  height: number;
} => {
  if (isSsr()) {
    return {
      width: 0,
      height: 0,
    };
  } else {
    return { width: window.innerWidth, height: window.innerWidth };
  }
};

export const useScreenSizeChanged = (
  throttleTime: number = DEFAULT_THROTTLE_TIME,
): IScreenSize => {
  const [screenSize, setScreenSize] = useState({
    ...getWindowDimensions(),
    orientation: getDeviceOrientation(),
  });

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;

    const handleResize = () => {
      if (throttleTime > 0) {
        if (timeout) {
          clearTimeout(timeout);
        }

        timeout = setTimeout(() => {
          setScreenSize({
            ...getWindowDimensions(),
            orientation: getDeviceOrientation(),
          });
        }, throttleTime);
      } else {
        setScreenSize({
          ...getWindowDimensions(),
          orientation: getDeviceOrientation(),
        });
      }
    };

    if (!isSsr()) {
      window.addEventListener('resize', handleResize, false);
      window.addEventListener('orientationchange', handleResize, false);

      return () => {
        window.removeEventListener('resize', handleResize, false);
        window.removeEventListener('orientationchange', handleResize, false);
      };
    }
  }, [throttleTime]);

  return screenSize;
};
