/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import Color from 'color';
import { IoMdPricetag } from 'react-icons/io';

interface IProps {
  background?: boolean;
  color: Color;
}

export const TagIcon: React.FC<IProps> = ({ color, background }) => {
  return (
    <div css={styles.root}>
      <span
        style={{
          color: color.toString(),
          background: background ? color.alpha(0.2).toString() : 'transparent',
        }}>
        <IoMdPricetag />
      </span>
    </div>
  );
};

const styles = {
  root: css`
    > span {
      width: var(--SQUARED_ICON_SIZE);
      height: var(--SQUARED_ICON_SIZE);
      border-radius: var(--BORDER_RADIUS_SMALL);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
    }
  `,
};
