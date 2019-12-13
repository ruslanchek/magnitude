import { useEffect } from 'react';

export function useTitle(title: string) {
  useEffect(() => {
    const titleElement = document.querySelector<HTMLTimeElement>('title');

    if (titleElement) {
      titleElement.innerText = title;
    }
  }, [title]);
}
