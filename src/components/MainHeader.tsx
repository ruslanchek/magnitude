/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React, { useContext } from 'react';
// import { useMe } from '../hooks/useMe';
import { Button } from './ui/form/Button';
import { ModalsContext } from './ui/modal/Modals';
import { NewProjectModal } from './modals/NewProjectModal';
import { MdAdd, MdSearch } from 'react-icons/md';
import { Avatar } from './ui/avatars/Avatar';
import { Input } from './ui/form/Input';
import { useCssVariableNumber } from '../hooks/useCssVariableNumber';

export const MainHeader: React.FC = () => {
  const modalsContext = useContext(ModalsContext);
  const elementSize = useCssVariableNumber('--INPUT_HEIGHT_SMALL');

  console.log(elementSize);

  // const me = useMe();

  const handleOpenAddProjectModal = () => {
    modalsContext.openModal({
      renderModalComponent: id => <NewProjectModal closeHandler={() => modalsContext.closeModal(id)} />,
    });
  };

  return (
    <div css={styles.root}>
      <div css={styles.main} />

      <div css={styles.search}>
        <Input name='search' size='small' placeholder='Search' autoComplete='off' />
        <MdSearch className='icon' />
      </div>

      <div css={styles.user}>
        <div className='new'>
          <Button size='small' color='default' onClick={handleOpenAddProjectModal}>
            <MdAdd css={styles.addIcon} />
            Add Project
          </Button>
        </div>

        <Avatar src='https://i.pravatar.cc/60?img=3' title='User' size={elementSize} />
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
    background-color: rgb(var(--BG));
    box-sizing: border-box;
    position: relative;

    &:after {
      position: absolute;
      width: 100%;
      height: 4px;
      left: 0;
      top: 100%;
      content: '';
      background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.02), rgba(0, 0, 0, 0));
      border-top: 1px solid rgb(var(--ELEMENT_BORDER));
      pointer-events: none;
    }
  `,

  sub: css`
    position: sticky;
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
    height: var(--INPUT_SIZE_SMALL);
    line-height: 1;

    .new {
      margin-right: var(--PADDING_HORIZONTAL_ELEMENT);
    }
  `,

  search: css`
    margin-right: var(--PADDING_HORIZONTAL_ELEMENT);
    position: relative;

    .icon {
      position: absolute;
      top: 50%;
      left: var(--INPUT_SIDE_PADDING);
      transform: translateY(-47%);
      font-size: 20px;
      pointer-events: none;
      color: rgb(var(--TEXT_LIGHT));
    }

    input {
      padding-left: 36px;
      width: 140px;
      transition: width 0.5s, box-shadow 0.2s, border-color 0.2s, background-color 0.2s;

      &:focus {
        width: 250px;
      }
    }
  `,
};
