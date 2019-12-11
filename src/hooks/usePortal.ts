import { useRef } from 'react';

export function usePortal(querySelector: string) {
  const parentElem = useRef(document.querySelector(querySelector));
  return parentElem.current;
}
