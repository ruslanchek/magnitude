import { useState, useEffect } from 'react';

export function useHashedEfffect(hash: string, callback: () => void) {
  const [previousHash, setPreviousHash] = useState(hash);

  useEffect(() => {
    if (hash !== previousHash) {
      setPreviousHash(hash);
      callback();
    }
  }, [hash]);
}
