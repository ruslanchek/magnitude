/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { PATHS } from '../../constants/paths';

export const AsideHeader: React.FC = () => {
  return (
    <div css={styles.root}>
      <NavLink tabIndex={1} to={PATHS.HOME.path} className='logo' />
    </div>
  );
};

const styles = {
  root: css`
    height: var(--HEADER_HEIGHT);
    display: flex;
    align-items: center;
    padding: 0 18px;
    box-sizing: border-box;

    .logo {
      width: 90px;
      height: calc(90px * var(--LOGO_PROPORTION));
      background-image: url(${require('../../assets/images/logos/jitsu-dark.svg')});
      background-position: 50%;
      background-repeat: no-repeat;
      background-size: 90px;
      position: relative;
      transform: translateX(-2px);
    }
  `,
};
