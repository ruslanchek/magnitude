/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { PATHS } from '../../constants/paths';

interface IProps {
  showSidePanel: boolean;
}

export const AsideHeader: React.FC<IProps> = ({ showSidePanel }) => {
  return (
    <div css={styles.root} className={showSidePanel ? 'wide' : 'narrow'}>
      <NavLink to={PATHS.HOME.path} className='logo' />
    </div>
  );
};

const styles = {
  root: css`
    height: var(--HEADER_HEIGHT);
    display: flex;
    align-items: center;
    padding: 0 20px;
    border-bottom: 1px solid rgb(var(--ELEMENT_BORDER));

    .logo {
      width: 150px;
      height: calc(150px * 0.167);
      background-image: url(${require('../../assets/images/logos/logo.svg')});
      background-position: 50%;
      background-repeat: no-repeat;
      background-size: 150px;
      position: relative;
      transform: translateX(2px);
    }

    &.narrow {
      padding: 0;
      justify-content: center;

      .logo {
        width: 42px;
        height: 42px;
        background-size: 230px;
        background-position: 0;
        transform: translateX(-1px);
      }
    }
  `,
};
