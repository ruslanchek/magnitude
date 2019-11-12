/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { PATHS } from '../constants/paths';
import { FiHome } from 'react-icons/fi';
import { UI_CONSTANTS } from '../constants/ui-constants';

interface ILink {
  path: string;
  title: string;
}

const LINKS: ILink[] = [
  {
    path: PATHS.HOME,
    title: 'Home',
  },

  {
    path: PATHS.ME,
    title: 'Home',
  },
];

interface IProps {}

const Icon = (path: string) => {
  switch (path) {
    case PATHS.HOME: {
      return <FiHome />;
    }

    case PATHS.ME: {
      return <FiHome />;
    }
  }
};

export const Nav: React.FC<IProps> = props => {
  const {} = props;

  return (
    <div css={styles.root}>
      {LINKS.map(link => (
        <NavLink key={link.path} to={link.path} exact className='link' activeClassName='active'>
          {link.title}
        </NavLink>
      ))}
    </div>
  );
};

const styles = {
  root: css`
    padding: 0 ${UI_CONSTANTS.PADDING_SIDE_GLOBAL}px;

    .link {
      color: rgb(var(--TEXT));
      padding: 10px 20px;
      border-radius: 5px;
      display: flex;
      align-items: center;

      &.active {
        background-color: rgb(var(--ACTIVE));
        color: rgb(var(--WHITE));
      }
    }
  `,

  linkIcon: css`
    margin-right: 12px;
    position: relative;
  `,
};
