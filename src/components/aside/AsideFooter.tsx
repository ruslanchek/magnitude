/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React, { MouseEvent } from 'react';
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/all';
import { localStore } from '../../stores/localStore';
import { useTranslator } from 'eo-locale';

interface IProps {
  showSidePanel: boolean;
}

export const AsideFooter: React.FC<IProps> = ({ showSidePanel }) => {
  const translator = useTranslator();

  const handleAsideTogglerClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    localStore.setState({
      showSidePanel: !showSidePanel,
    });
  };

  return (
    <div css={styles.root}>
      <a
        href='#'
        tabIndex={3}
        css={styles.asideToggler}
        title={translator.translate('Aside::ToggleSidebar')}
        onClick={handleAsideTogglerClick}>
        {showSidePanel ? <FiChevronsLeft /> : <FiChevronsRight />}
      </a>
    </div>
  );
};

const styles = {
  root: css`
    display: flex;
    align-items: center;
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
