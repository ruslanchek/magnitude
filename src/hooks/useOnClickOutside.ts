import { useEffect, MutableRefObject } from 'react';

export function useOnClickOutside(ref: MutableRefObject<HTMLElement | null>, handler: (event: MouseEvent) => void) {
  useEffect(() => {
    function listener(event: any) {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    }

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}
