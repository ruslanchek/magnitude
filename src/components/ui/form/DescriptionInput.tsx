/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';

interface IProps {
  value: string;
}

export const DescriptionInput: React.FC<IProps> = ({ value }) => {
  return (
    <p contentEditable css={styles.root} className='input-styles hidden'>
      {value}
    </p>
  );
};

const styles = {
  root: css``,
};
