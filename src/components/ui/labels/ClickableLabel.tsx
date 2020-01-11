/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';

interface IProps {
  text: string;
  icon: React.ReactNode;
  onClick: () => void;
}

export const ClickableLabel: React.FC<IProps> = ({ text, icon, onClick }) => {
  return (
    <div css={styles.root} onClick={onClick}>
      <i>{icon}</i>
      <div className='data'>{text}</div>
    </div>
  );
};

const styles = {
  root: css`
    padding: 3px;
    border-radius: 20px;
    height: var(--SQUARED_ICON_SIZE);
    line-height: var(--SQUARED_ICON_SIZE);
    background-color: hsl(var(--SUCCESS_HSL_L1), 0.1);
    color: hsl(var(--SUCCESS_HSL_D1));
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.2s;
    border: 1px solid hsl(var(--SUCCESS_HSL_D1), 0.1);
    margin-right: 20px;

    .data {
      margin: 0 1ex;
      white-space: nowrap;
    }

    > i {
      width: var(--SQUARED_ICON_SIZE);
      height: var(--SQUARED_ICON_SIZE);
      border-radius: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgb(var(--WHITE));
      background-color: rgb(var(--SUCCESS));
    }

    &:hover {
      background-color: hsl(var(--SUCCESS_HSL_L2), 0.25);
    }
  `,
};
