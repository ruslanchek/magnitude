/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import { FiCalendar } from 'react-icons/fi';
import { TitleInput } from '../ui/form/TitleInput';
import { DescriptionInput } from '../ui/form/DescriptionInput';

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
      <DescriptionInput
        value='Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`s
        standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
        a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
        remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
        Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.'
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
