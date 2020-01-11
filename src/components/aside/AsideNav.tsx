/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { IPath, PATHS } from '../../constants/paths';
import { EOLocale } from 'eo-locale';
import { CategoryTitle } from '../ui/typographics/CategoryTitle';
import { Marker } from '../ui/misc/Marker';
import { MdBookmark } from 'react-icons/md';
import { colorHash } from '../../common/colorHash';
import { TagIcon } from '../ui/tags/TagIcon';

interface ILink {
  path: string;
  title: string;
  icon: React.ReactNode;
}

interface IFavorite {
  id: string;
  title: string;
}

interface ITag {
  id: string;
  title: string;
}

const LINKS: ILink[] = [
  {
    path: PATHS.HOME.path,
    title: 'Nav::Home',
    icon: <img alt='' src={require('../../assets/images/icons/book.svg')} />,
  },

  {
    path: PATHS.PROJECTS.path,
    title: 'Nav::Projects',
    icon: <img alt='' src={require('../../assets/images/icons/brick.svg')} />,
  },

  {
    path: PATHS.TEAMS.path,
    title: 'Nav::Teams',
    icon: <img alt='' src={require('../../assets/images/icons/tags.svg')} />,
  },

  {
    path: PATHS.UI.path,
    title: 'Nav::Messages',
    icon: <img alt='' src={require('../../assets/images/icons/chat.svg')} />,
  },
];

const FAVORITES: IFavorite[] = [
  {
    id: '1',
    title: 'EO Web',
  },
  {
    id: '2',
    title: 'EO Design',
  },
  {
    id: '3',
    title: 'EO Marketing Stuff',
  },
  {
    id: '4',
    title: 'EOP Site',
  },
  {
    id: '5',
    title: 'EOT Site',
  },
  {
    id: '6',
    title: 'EOT App',
  },
];

const TAGS: ITag[] = [
  {
    id: '1',
    title: 'Web',
  },
  {
    id: '2',
    title: 'Backstage',
  },
  {
    id: '3',
    title: 'Special',
  },
  {
    id: '4',
    title: 'Mobile',
  },
  {
    id: '5',
    title: 'Important',
  },
];

export const AsideNav: React.FC = () => {
  const attentionPath: IPath = PATHS.MESSAGES;

  return (
    <div css={styles.root}>
      <nav>
        {LINKS.map(link => {
          return (
            <NavLink tabIndex={0} key={link.path} to={link.path} exact className='link'>
              <span className='icon-wrapper'>{link.icon}</span>
              <span className='text'>
                <EOLocale.Text id={link.title} />
              </span>
              {attentionPath.path === link.path && <Marker />}
            </NavLink>
          );
        })}
      </nav>

      <nav>
        <div className='title'>
          <CategoryTitle>Favorites</CategoryTitle>
        </div>

        {FAVORITES.map(favorite => (
          <NavLink key={favorite.id} tabIndex={0} to={favorite.id} className='link'>
            <span className='icon-wrapper'>
              <MdBookmark />
            </span>
            <span className='text'>{favorite.title}</span>
          </NavLink>
        ))}
      </nav>

      <nav>
        <div className='title'>
          <CategoryTitle>Tags</CategoryTitle>
        </div>

        {TAGS.map(tag => {
          const color = colorHash(tag.title);

          return (
            <NavLink key={tag.id} tabIndex={0} to={tag.id} className='link'>
              <TagIcon color={color} background />
              <span className='text'>{tag.title}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

const styles = {
  root: css`
    > nav {
      padding-top: 20px;
    }

    .title {
      padding: 0 var(--PADDING_HORIZONTAL_GLOBAL);
    }

    .link {
      display: flex;
      align-items: center;
      color: rgb(var(--TEXT_LIGHT));
      transition: background-color 0.2s;
      position: relative;
      justify-content: space-between;
      padding: 8px var(--PADDING_HORIZONTAL_GLOBAL);
      white-space: nowrap;
      line-height: 1;

      .text {
        margin-left: 12px;
        flex-grow: 1;
      }

      &:hover {
        color: rgb(var(--TEXT));
      }

      &.active {
        color: rgb(var(--TEXT));

        &:before {
          background-color: rgb(var(--ACCENT));
        }
      }

      .icon-wrapper {
        width: var(--SQUARED_ICON_SIZE);
        height: var(--SQUARED_ICON_SIZE);
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
      }
    }
  `,
};
