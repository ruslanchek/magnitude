import { useRef } from 'react';

export const usePortal = (querySelector: string) => {
  const parentElem = useRef(document.querySelector(querySelector));
  return parentElem.current;
};
