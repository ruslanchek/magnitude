/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React, { useContext } from 'react';
import { useMe } from '../hooks/useMe';
import { Button } from './ui/form/Button';
import { ModalsContext } from './ui/modal/Modals';
import { NewProjectModal } from './modals/NewProjectModal';
import { MdAdd } from 'react-icons/md';
import { Avatar } from './ui/avatars/Avatar';

export const MainHeader: React.FC = () => {
  const modalsContext = useContext(ModalsContext);
  const me = useMe();

  const handleOpenAddProjectModal = () => {
    modalsContext.openModal({
      renderModalComponent: id => <NewProjectModal closeHandler={() => modalsContext.closeModal(id)} />,
    });
  };

  return (
    <div css={styles.root}>
      <div css={styles.main}>{me?.email}</div>

      <div css={styles.user}>
        <div className='new'>
          <Button size='tiny' color='default' onClick={handleOpenAddProjectModal}>
            <MdAdd css={styles.addIcon} />
            Add Project
          </Button>
        </div>

        <Avatar src='https://i.pravatar.cc/68?img=3' title='User' size={34} />
      </div>
    </div>
  );
};

const styles = {
  root: css`
    height: var(--HEADER_HEIGHT);
    display: flex;
    align-items: center;
    padding: 0 var(--PADDING_HORIZONTAL_GLOBAL);
    border-bottom: 1px solid rgb(var(--ELEMENT_BORDER));
    background-color: rgb(var(--BG));
  `,

  addIcon: css`
    font-size: 1.8em;
    transform: translateX(-6px);
  `,

  main: css`
    flex-grow: 1;
  `,

  user: css`
    display: flex;
    align-items: center;

    .new {
      margin-right: 20px;
    }
  `,
};
