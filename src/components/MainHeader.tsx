/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React, { useContext } from 'react';
import { useMe } from '../hooks/useMe';
import { Button } from './ui/form/Button';
import { ModalsContext } from './ui/modal/Modals';
import { NewProjectModal } from './modals/NewProjectModal';
import { MdAdd, MdSearch } from 'react-icons/md';
import { Avatar } from './ui/avatars/Avatar';
import { Input } from './ui/form/Input';

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

      <div css={styles.search}>
        <Input name='search' tabIndex={1} size='tiny' placeholder='Search' autoComplete='off' />
        <MdSearch className='icon' />
      </div>

      <div css={styles.user}>
        <div className='new'>
          <Button size='tiny' color='default' onClick={handleOpenAddProjectModal}>
            <MdAdd css={styles.addIcon} />
            Add Project
          </Button>
        </div>

        <Avatar src='https://i.pravatar.cc/60?img=3' title='User' size={30} />
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
    box-sizing: border-box;
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
    justify-content: space-between;
    height: var(--INPUT_SIZE_TINY);
    line-height: 1;

    .new {
      margin-right: 20px;
    }
  `,

  search: css`
    margin-right: 20px;
    position: relative;

    .icon {
      position: absolute;
      top: 50%;
      left: 8px;
      transform: translateY(-50%);
      font-size: 16px;
      pointer-events: none;
    }

    input {
      padding-left: 30px;
      width: 140px;
      transition: width 0.5s, box-shadow 0.2s, border-color 0.2s, background-color 0.2s;

      &:focus {
        width: 250px;
      }
    }
  `,
};
