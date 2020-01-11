/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';
import { Avatar } from '../avatars/Avatar';
import { useCssVariableNumber } from '../../../hooks/useCssVariableNumber';

interface IProps {
  title: string;
  avatarSrc: string;
}

export const UserLabel: React.FC<IProps> = ({ title, avatarSrc }) => {
  const size = useCssVariableNumber('--SQUARED_ICON_SIZE');

  return (
    <div css={styles.root}>
      <i>
        <Avatar size={size} title={title} src={avatarSrc} />
      </i>
      <div className='data'>{title}</div>
    </div>
  );
};

const styles = {
  root: css`
    padding: 3px;
    border-radius: 20px;
    height: var(--SQUARED_ICON_SIZE);
    line-height: var(--SQUARED_ICON_SIZE);
    background-color: rgb(var(--BG_DARK));
    color: rgb(var(--TEXT));
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.2s;
    border: 1px solid hsl(var(--BG_DARK_HSL_D2), 0.2);

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
      background-color: rgb(var(--BG_DARK));
    }

    &:hover {
      background-color: hsl(var(--BG_DARK_HSL_D2), 0.4);
    }
  `,
};
