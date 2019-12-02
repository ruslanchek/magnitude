/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';

interface IProps extends React.HTMLProps<HTMLLabelElement> {}

export const Label: React.FC<IProps> = props => {
  return (
    <label {...props} css={styles.root}>
      {props.children}
    </label>
  );
};

const styles = {
  root: css`
    font-size: 12px;
    margin-bottom: 5px;
    display: inline-block;
    color: rgb(var(--TEXT_FADED));
  `,
};
