/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React, { useContext } from 'react';
import { useMe } from '../hooks/useMe';
import { Button } from './ui/form/Button';
import { ModalsContext } from './ui/modal/Modals';
import { NewProjectModal } from './modals/NewProjectModal';

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
      {me?.email}
      <Button size='small' color='faded' onClick={handleOpenAddProjectModal}>
        Add Project
      </Button>
    </div>
  );
};

const styles = {
  root: css`
    height: var(--HEADER_HEIGHT);
    display: flex;
    align-items: center;
    padding: 0 var(--PADDING_HORIZONTAL_GLOBAL);
    box-shadow: var(--ELEVATION_SHADOW_1);
  `,
};
