/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/all';
import { appTranslator } from '../../App';
import { localStore } from '../../stores/localStore';

interface IProps {
  showSidePanel: boolean;
}

export const AsideFooter: React.FC<IProps> = ({ showSidePanel }) => {
  const handleAsideTogglerClick = () => {
    localStore.setState({
      showSidePanel: !showSidePanel,
    });
  };

  return (
    <div css={styles.root}>
      <span
        css={styles.asideToggler}
        title={appTranslator.translate('Aside::ToggleSidebar')}
        onClick={handleAsideTogglerClick}>
        {showSidePanel ? <FiChevronsLeft /> : <FiChevronsRight />}
      </span>
    </div>
  );
};

const styles = {
  root: css`
    height: var(--HEADER_HEIGHT);
    display: flex;
    align-items: center;
    padding: 0 20px;
    border-top: 1px solid rgb(var(--BG_TINT));
  `,

  asideToggler: css`
    width: var(--SQUARED_ICON_SIZE);
    height: var(--SQUARED_ICON_SIZE);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.2s;
    background-color: rgba(var(--ACCENT), 0.1);
    color: rgb(var(--ACCENT));
    font-size: 18px;

    &:hover {
      background-color: rgba(var(--ACCENT), 0.15);
    }
  `,
};
