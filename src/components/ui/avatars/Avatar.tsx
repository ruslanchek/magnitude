/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';

interface IProps {
  src: string;
  title: string;
  size: number;
}

export const Avatar: React.FC<IProps> = ({ src, title, size }) => {
  return (
    <div css={styles.root}>
      <img src={src} title={title} alt={title} width={size} height={size} />
    </div>
  );
};

const styles = {
  root: css`
    > img {
      display: block;
      border-radius: 50%;
    }
  `,
};
