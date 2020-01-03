/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';

interface IProps {
  src: string;
  title: string;
  size: number;
}

export const ProjectAvatar: React.FC<IProps> = ({ src, title, size }) => {
  return (
    <div css={styles.root}>
      <img src={src} title={title} alt={title} width={size} height={size} />
    </div>
  );
};

const styles = {
  root: css`
    border-radius: var(--BORDER_RADIUS_MEDIUM);
    background-color: rgb(var(--BG_DARK));
    box-shadow: 0 0 0 1px rgb(var(--BG_DARK));

    > img {
      display: block;
      border-radius: var(--BORDER_RADIUS_MEDIUM);
    }
  `,
};
