import React, { useEffect, useCallback } from 'react';

export const useOnClickOutside = (
  ref: React.MutableRefObject<HTMLElement>,
  handler: (event: React.MouseEvent) => void,
) => {
  const listener = useCallback(
    event => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    },
    [ref, handler],
  );

  useEffect(() => {
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};
