/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import { useCssVariableNumber } from '../../../hooks/useCssVariableNumber';

interface IProps {
  overrideMargin?: number;
  noBorder?: boolean;
}

export const Divider: React.FC<IProps> = props => {
  const gridGapSize = useCssVariableNumber('--GRID_GAP_SIZE');

  return (
    <div
      css={[
        styles.root,
        css`
          margin-bottom: ${props.overrideMargin !== undefined &&
          props.overrideMargin >= 0
            ? props.overrideMargin
            : gridGapSize}px;

          border-top: ${props.noBorder
            ? 'none'
            : '1px solid rgb(var(--ELEMENT_BORDER));'};
        `,
      ]}
    />
  );
};

const styles = {
  root: css`
    height: 1px;
    width: 100%;
    line-height: 0;
    font-size: 0;
    margin-bottom: calc(var(--GRID_GAP_SIZE) / 2);
  `,
};
