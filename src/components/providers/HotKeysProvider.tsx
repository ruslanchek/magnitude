import { HotKeys } from 'react-hotkeys';
import React, { useMemo } from 'react';

const keyMap = {
  MOVE_UP: 'up',
};

export const HotKeysProvider: React.FC = ({ children }) => {
  const handlers = useMemo(() => {
    return {
      // MOVE_UP: (event: any) => {
      //   console.log('Move up hotkey called!');
      // },
    };
  }, []);

  return (
    <HotKeys keyMap={keyMap} handlers={handlers}>
      {children}
    </HotKeys>
  );
};
