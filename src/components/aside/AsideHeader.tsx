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
    padding: 0 20px;
    border-bottom: 1px solid rgb(var(--ELEMENT_BORDER));
    box-sizing: border-box;

    .logo {
      width: 80px;
      height: calc(80px * var(--LOGO_PROPORTION));
      background-image: url(${require('../../assets/images/logos/jitsu.svg')});
      background-position: 50%;
      background-repeat: no-repeat;
      background-size: 80px;
      position: relative;
      transform: translateX(-3px);
    }
  `,
};
