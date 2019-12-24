/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { PATHS, IPath } from '../../constants/paths';
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
    icon: (
      <svg width='24px' height='24px' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
        <path
          fill='#CBD5E0'
          d='M12 21a2 2 0 0 1-1.41-.59l-.83-.82A2 2 0 0 0 8.34 19H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4a5 5 0 0 1 4 2v16z'></path>
        <path
          fill='#718096'
          d='M12 21V5a5 5 0 0 1 4-2h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4.34a2 2 0 0 0-1.42.59l-.83.82A2 2 0 0 1 12 21z'></path>
      </svg>
    ),
  },

  {
    path: PATHS.PROJECTS.path,
    title: 'Nav::Projects',
    icon: (
      <svg width='24px' height='24px' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
        <path
          fill='#CBD5E0'
          d='M3 6l9 4v12l-9-4V6zm14-3v2c0 1.1-2.24 2-5 2s-5-.9-5-2V3c0 1.1 2.24 2 5 2s5-.9 5-2z'></path>
        <polygon fill='#718096' points='21 6 12 10 12 22 21 18'></polygon>
      </svg>
    ),
  },

  {
    path: PATHS.TEAMS.path,
    title: 'Nav::Teams',
    icon: (
      <svg width='24px' height='24px' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
        <path
          fill='#CBD5E0'
          d='M9 22c.19-.14.37-.3.54-.46L17.07 14H20a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H9zM4 2h4a2 2 0 0 1 2 2v14a4 4 0 1 1-8 0V4c0-1.1.9-2 2-2zm2 17.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z'></path>
        <path fill='#718096' d='M11 18.66V7.34l2.07-2.07a2 2 0 0 1 2.83 0l2.83 2.83a2 2 0 0 1 0 2.83L11 18.66z'></path>
      </svg>
    ),
  },

  {
    path: PATHS.MESSAGES.path,
    title: 'Nav::Messages',
    icon: (
      <svg width='24px' height='24px' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
        <path
          fill='#CBD5E0'
          d='M20.3 12.04l1.01 3a1 1 0 0 1-1.26 1.27l-3.01-1a7 7 0 1 1 3.27-3.27zM11 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z'></path>
        <path
          fill='#718096'
          d='M15.88 17.8a7 7 0 0 1-8.92 2.5l-3 1.01a1 1 0 0 1-1.27-1.26l1-3.01A6.97 6.97 0 0 1 5 9.1a9 9 0 0 0 10.88 8.7z'></path>
      </svg>
    ),
  },
];

export const AsideNav: React.FC = () => {
  const attentionPath: IPath = PATHS.MESSAGES;

  return (
    <div css={styles.root}>
      {LINKS.map(link => {
        return (
          <NavLink tabIndex={2} key={link.path} to={link.path} exact className='link' activeClassName='active'>
            <span className='icon-wrapper'>{link.icon}</span>
            <span className='text'>
              <EOLocale.Text id={link.title} />
            </span>
            {attentionPath.path === link.path && <span className='notifications'>3</span>}
          </NavLink>
        );
      })}
    </div>
  );
};

const styles = {
  root: css`
    padding-top: 20px;

    .link {
      display: flex;
      align-items: center;
      color: rgb(var(--TEXT_LIGHT));
      transition: background-color 0.2s;
      position: relative;
      justify-content: space-between;
      padding: 8px 17px;
      white-space: nowrap;
      line-height: 1;

      .icon-wrapper {
        width: var(--SQUARED_ICON_SIZE);
        height: var(--SQUARED_ICON_SIZE);
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
      }

      .notifications {
        border: 1px solid rgb(var(--ACCENT));
        border-radius: 3px;
        opacity: 0.25;
        padding: 2px 4px;
        color: rgb(var(--ACCENT));
        font-size: var(--FONT_SIZE_SMALL);
        font-weight: 600;
      }

      .text {
        margin-left: 15px;
        flex-grow: 1;
      }

      &:hover {
        color: rgb(var(--TEXT));

        .notifications {
          opacity: 0.5;
        }
      }

      &.active {
        color: rgb(var(--TEXT));
        font-weight: 600;

        &:before {
          background-color: rgb(var(--ACCENT));
        }
      }
    }
  `,
};
