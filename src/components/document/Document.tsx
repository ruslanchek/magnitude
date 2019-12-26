/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import { FiCalendar } from 'react-icons/fi';

interface IDocument {}

interface IProps {}

export const Document: React.FC<IProps> = props => {
  return (
    <div css={styles.root}>
      <h1 contentEditable className='content-editable'>
        Create a new form at the marketing project
      </h1>

      <div className='tools'>
        <div className='due'>
          <FiCalendar />

          <div className='data'>Due to {new Date().toLocaleDateString()}</div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  root: css`
    padding: var(--PADDING_VERTICAL_GLOBAL) var(--PADDING_HORIZONTAL_GLOBAL);

    .tools {
      display: flex;

      .due {
        padding: 6px 12px;
        border-radius: 20px;
        background-color: rgba(var(--POSITIVE_LIGHT), 1);
        color: rgb(var(--POSITIVE));
        display: flex;
        align-items: center;
        cursor: pointer;

        .data {
          margin-left: 1ex;
        }
      }
    }
  `,
};
