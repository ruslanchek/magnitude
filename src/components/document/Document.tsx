/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import { FiCalendar } from 'react-icons/fi';
import { TitleInput } from '../ui/form/TitleInput';
import { TextEditor } from '../ui/doc-views/TextEditor';

interface IDocument {}

interface IProps {}

export const Document: React.FC<IProps> = props => {
  return (
    <div css={styles.root}>
      <TitleInput value='Create a new form at the marketing project' />
      <div className='tools'>
        <div className='due'>
          <FiCalendar />

          <div className='data'>Due to {new Date().toLocaleDateString()}</div>
        </div>
      </div>
      <TextEditor
        value={[
          {
            type: 'paragraph',
            children: [{ text: 'A line of text in a paragraph.' }],
          },
        ]}
      />
    </div>
  );
};

const styles = {
  root: css`
    padding: var(--PADDING_VERTICAL_GLOBAL) var(--PADDING_HORIZONTAL_GLOBAL);

    .tools {
      display: flex;
      margin-bottom: 20px;

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
