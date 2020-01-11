/** @jsx jsx */
import { css, jsx, SerializedStyles } from '@emotion/core';
import React, { useMemo } from 'react';

interface IProps {
  verticalAlign?: 'top' | 'middle' | 'bottom';
}

export const Col: React.FC<IProps> = props => {
  const { verticalAlign } = props;
  const rootCss = useMemo<SerializedStyles>(() => {
    let justifyContent;

    switch (verticalAlign) {
      case 'top': {
        justifyContent = 'flex-start';
        break;
      }
      case 'middle': {
        justifyContent = 'center';
        break;
      }
      case 'bottom': {
        justifyContent = 'flex-end';
        break;
      }

      default: {
        justifyContent = 'flex-start';
      }
    }

    return css`
      justify-content: ${justifyContent};
    `;
  }, [verticalAlign]);

  return <div css={[styles.root, rootCss]}>{props.children}</div>;
};

const styles = {
  root: css`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    flex-grow: 0;
    flex-shrink: 1;
  `,
};
