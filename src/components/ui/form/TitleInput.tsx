/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';

interface IProps {
  value: string;
}

export const TitleInput: React.FC<IProps> = ({ value }) => {
  return (
    <h1 contentEditable css={styles.root} className='input-styles hidden'>
      {value}
    </h1>
  );
};

const styles = {
  root: css``,
};
