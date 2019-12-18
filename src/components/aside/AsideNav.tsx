/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { PATHS } from '../../constants/paths';
import { MdHome, MdChromeReaderMode, MdRowing } from 'react-icons/md';
import { EOLocale } from 'eo-locale';

interface ILink {
  path: string;
  title: string;
  icon: React.ReactNode;
}

const LINKS: ILink[] = [
  {
    path: PATHS.HOME.path,
    title: 'Nav::Home',
    icon: <MdHome />,
  },

  {
    path: PATHS.PROJECTS.path,
    title: 'Nav::Projects',
    icon: <MdChromeReaderMode />,
  },

  {
    path: PATHS.TEAMS.path,
    title: 'Nav::Teams',
    icon: <MdRowing />,
  },
];

export const AsideNav: React.FC = () => {
  return (
    <div css={styles.root}>
      {LINKS.map(link => {
        return (
          <NavLink tabIndex={2} key={link.path} to={link.path} exact className='link' activeClassName='active'>
            <span className='icon-wrapper'>{link.icon}</span>
            <span className='text'>
              <EOLocale.Text id={link.title} />
            </span>
          </NavLink>
        );
      })}
    </div>
  );
};

const styles = {
  root: css`
    .link {
      padding: 8px 20px;
      display: flex;
      align-items: center;
      color: rgb(var(--TEXT));
      transition: background-color 0.2s;
      position: relative;

      &:before {
        position: absolute;
        content: '';
        display: block;
        width: 3px;
        height: 100%;
        left: 0;
        top: 0;
        border-radius: 0 4px 4px 0;
      }

      .icon-wrapper {
        width: var(--SQUARED_ICON_SIZE);
        height: var(--SQUARED_ICON_SIZE);
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
      }

      .text {
        margin-left: 15px;
      }

      &:hover {
        background-color: rgba(var(--ACCENT), 0.03);
      }

      &.active {
        color: rgb(var(--ACCENT));
        font-weight: 600;
        background-color: rgba(var(--ACCENT), 0.06);

        &:before {
          background-color: rgb(var(--ACCENT));
        }
      }
    }
  `,
};
