/** @jsx jsx */
import React from 'react';
import { jsx, css, keyframes } from '@emotion/core';

const SIZES = {
  small: 26,
  large: 42,
};

interface IProps {
  size: 'small' | 'large';
  color: string;
}

export const ActivityIndicator: React.FC<IProps> = props => {
  const size = SIZES[props.size];

  return (
    <div
      css={styles.root}
      style={{
        width: size,
        height: size,
      }}
    >
      <svg className="circular" viewBox="25 25 50 50">
        <circle
          className="path"
          cx="50"
          cy="50"
          r="20"
          fill="none"
          stroke={props.color}
          strokeWidth="4"
          strokeMiterlimit="10"
        />
      </svg>
    </div>
  );
};

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const dash = keyframes`
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }

  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
`;

const styles = {
  root: css`
    .circular {
      animation: ${rotate} 2s linear infinite;
      height: 100%;
      transform-origin: center center;
      width: 100%;
      margin: auto;
    }

    .path {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
      animation: ${dash} 1.5s ease-in-out infinite;
      stroke-linecap: round;
    }
  `,
};
