/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { PATHS } from '../../constants/paths';
import { FiClipboard, FiCoffee, FiUsers } from 'react-icons/fi';
import { EOLocale } from 'eo-locale';

interface IProps {
  showSidePanel: boolean;
}

interface ILink {
  path: string;
  title: string;
  icon: React.ReactNode;
}

const LINKS: ILink[] = [
  {
    path: PATHS.HOME.path,
    title: 'Nav::Home',
    icon: <FiCoffee />,
  },

  {
    path: PATHS.PROJECTS.path,
    title: 'Nav::Projects',
    icon: <FiClipboard />,
  },

  {
    path: PATHS.TEAMS.path,
    title: 'Nav::Teams',
    icon: <FiUsers />,
  },
];

export const AsideNav: React.FC<IProps> = ({ showSidePanel }) => {
  return (
    <div css={styles.root}>
      {LINKS.map(link => {
        return (
          <NavLink tabIndex={2} key={link.path} to={link.path} exact className='link' activeClassName='active'>
            <span className='icon-wrapper'>{link.icon}</span>
            {showSidePanel && (
              <span className='text'>
                <EOLocale.Text id={link.title} />
              </span>
            )}
          </NavLink>
        );
      })}
    </div>
  );
};

const styles = {
  root: css`
    .link {
      padding: 6px 15px;
      display: flex;
      align-items: center;
      color: rgb(var(--TEXT_FADED));
      transition: background-color 0.2s;

      .icon-wrapper {
        width: var(--SQUARED_ICON_SIZE);
        height: var(--SQUARED_ICON_SIZE);
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 15.295px;
      }

      .text {
        margin-left: 15px;
      }

      &:hover {
        background-color: rgba(var(--ACCENT), 0.08);
      }

      &.active {
        background-color: rgba(var(--ACCENT), 0.16);
      }
    }
  `,
};
