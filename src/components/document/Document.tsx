/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import { FiCalendar } from 'react-icons/fi';
import { TitleInput } from '../ui/form/TitleInput';
import { TextEditor } from '../ui/doc-views/TextEditor';
import { Story } from '../ui/stories/Story';
import { GoGear, GoCheck, GoX } from 'react-icons/go';
import { Tags } from '../ui/tags/Tags';
import { ClickableLabel } from '../ui/labels/ClickableLabel';
import { UserLabel } from '../ui/labels/UserLabel';

interface IDocument {}

interface IProps {}

export const Document: React.FC<IProps> = props => {
  return (
    <div css={styles.root}>
      <TitleInput value='Create a new form at the marketing project' />

      <br />

      <div className='tools'>
        <ClickableLabel icon={<FiCalendar />} onClick={() => {}} text={`Due to ${new Date().toLocaleDateString()}`} />
        <UserLabel avatarSrc='https://i.pravatar.cc/60?img=3' title='Daniel Simpson' />
      </div>

      <br />

      <Tags
        suggestions={[{ id: 1, name: 'Tag' }]}
        tags={[
          { id: 2, name: 'Web' },
          { id: 3, name: 'Main' },
          { id: 4, name: 'Testing' },
        ]}
      />

      <br />

      <div className='stories'>
        <Story
          active={true}
          pre='Ongoing'
          title='Making onboarding videos for Jitsu app'
          status='In progress'
          icon={<GoGear />}
          iconColor='rgb(var(--WHITE))'
        />
        <Story
          active={false}
          pre='Completed'
          title='Design meeting'
          status='Completed'
          icon={<GoCheck />}
          iconColor='rgb(var(--SUCCESS))'
        />
        <Story
          active={false}
          pre='Freezed'
          title='Website design'
          status='Rejected by owner'
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
    }
  `,
};
