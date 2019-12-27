/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { PATHS } from '../../constants/paths';

export const AsideHeader: React.FC = () => {
  return (
    <div css={styles.root}>
      <NavLink to={PATHS.HOME.path} className='logo'>
        <img width='118' title='Jitsu – Home' alt='Jitsu' src={require('../../assets/images/logos/jitsu-dark.svg')} />
      </NavLink>
    </div>
  );
};

const styles = {
  root: css`
    height: var(--HEADER_HEIGHT);
    display: flex;
    align-items: center;
    padding: 0 var(--PADDING_HORIZONTAL_GLOBAL);

    .logo {
      width: 118px;
      padding: 6px 9px 6px 6px;
      position: relative;
      transform: translateX(-12px);

      > img {
        display: block;
      }
    }
  `,
};
