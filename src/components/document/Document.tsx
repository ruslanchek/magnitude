/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import { FiCalendar } from 'react-icons/fi';
import { TitleInput } from '../ui/form/TitleInput';
import { TextEditor } from '../ui/doc-views/TextEditor';
import { Story } from '../stories/Story';
import { GoGear, GoCheck, GoX } from 'react-icons/go';
import { Tags } from '../ui/tags/Tags';

interface IDocument {}

interface IProps {}

export const Document: React.FC<IProps> = props => {
  return (
    <div css={styles.root}>
      <TitleInput value='Create a new form at the marketing project' />

      <br />

      <div className='tools'>
        <div className='due'>
          <i>
            <FiCalendar />
          </i>
          <div className='data'>Due to {new Date().toLocaleDateString()}</div>
        </div>
      </div>

      <br />

      <Tags suggestions={[{ id: 1, name: 'Tag' }]} />

      <br />

      <div className='stories'>
        <Story
          active={true}
          pre='Ongoing'
          title='Making onboarding videos for Jitsu app'
          status='Working on'
          icon={<GoGear />}
          iconColor='rgb(var(--WHITE))'
        />
        <Story
          active={false}
          pre='Completed'
          title='Design meeting'
          status='Successfull'
          icon={<GoCheck />}
          iconColor='rgb(var(--SUCCESS))'
        />
        <Story
          active={false}
          pre='Freezed'
          title='Website design'
          status='Failed'
          icon={<GoX />}
          iconColor='rgb(var(--ERROR))'
        />
      </div>

      <br />

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

    .stories {
      display: flex;

      .story {
        margin-right: var(--PADDING_VERTICAL_GLOBAL);
      }
    }

    .tools {
      display: flex;

      .due {
        padding: 6px 10px 6px 6px;
        border-radius: 20px;
        background-color: hsl(var(--POSITIVE_LIGHTEN), 0.2);
        color: rgb(var(--POSITIVE));
        font-weight: 600;
        display: flex;
        align-items: center;
        cursor: pointer;

        &:hover {
          background-color: hsl(var(--POSITIVE_LIGHTEN), 0.3);
        }

        .data {
          margin-left: 1ex;
        }

        > i {
          width: 24px;
          height: 24px;
          border-radius: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgb(var(--WHITE));
          background-color: rgb(var(--POSITIVE));
        }
      }
    }
  `,
};
