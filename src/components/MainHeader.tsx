/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React, { useContext } from 'react';
// import { useMe } from '../hooks/useMe';
import { Button } from './ui/form/Button';
import { ModalsContext } from './ui/modal/Modals';
import { NewProjectModal } from './modals/NewProjectModal';
import { MdAdd, MdSearch } from 'react-icons/md';
import { Input } from './ui/form/Input';
import { useCssVariableNumber } from '../hooks/useCssVariableNumber';
import { Avatar } from './ui/avatars/Avatar';
import { ProjectAvatar } from './ui/avatars/ProjectAvatar';
import { useDpr } from '../hooks/useDpr';

export const MainHeader: React.FC = () => {
  const modalsContext = useContext(ModalsContext);
  const elementSize = useCssVariableNumber('--INPUT_HEIGHT_SMALL');
  const avatarSize = useDpr() * elementSize;

  // const me = useMe();

  const handleOpenAddProjectModal = () => {
    modalsContext.openModal({
      renderModalComponent: id => <NewProjectModal closeHandler={() => modalsContext.closeModal(id)} />,
    });
  };

  return (
    <div css={styles.root}>
      <div css={styles.top}>
        <div css={styles.major}>
          <ProjectAvatar
            src={`https://lh3.googleusercontent.com/biL8S6rBarpU3EoQRn25l8gvfmVzM7MnxKSphh1oHS28UzMVBlCajYbbKW0CxGHhoME`}
            title='EO Web'
            size={elementSize}
          />
          <h1>EO Web</h1>
        </div>

        <div css={styles.minor}>
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

            <Avatar src={`https://i.pravatar.cc/${avatarSize}?img=33`} title='User' size={elementSize} />
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  root: css`
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

  top: css`
    height: var(--HEADER_HEIGHT);
    display: flex;
    align-items: center;
    padding: 0 var(--PADDING_HORIZONTAL_GLOBAL);
  `,

  sub: css``,

  addIcon: css`
    font-size: 1.8em;
    transform: translateX(-6px);
  `,

  major: css`
    display: flex;
    align-items: center;
    margin-right: 20px;
    min-width: 0;

    > h1 {
      margin-left: 1ex;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 300px;
    }
  `,

  minor: css`
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
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
