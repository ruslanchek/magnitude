/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core';
import objstr from 'obj-str';

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
    padding: 6px 10px 6px 6px;
    border-radius: 20px;
    background-color: hsl(var(--SUCCESS_LIGHT), 0.1);
    color: hsl(var(--SUCCESS_DARK));
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.2s;
    border: 1px solid hsl(var(--SUCCESS_DARK), 0.1);

    .data {
      margin-left: 1ex;
    }

    > i {
      width: 24px;
      height: 24px;
      border-radius: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgb(var(--WHITE));
      background-color: rgb(var(--SUCCESS));
      transition: transform 0.2s, box-shadow 0.3s;
    }

    &:hover {
      background-color: hsl(var(--SUCCESS_LIGHTEN), 0.25);

      > i {
        transform: scale(1.075);
      }
    }
  `,
};
