/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { useOwnProjects } from '../../hooks/useOwnProjects';
import { Avatar } from '../ui/avatars/Avatar';
import { EOLocale } from 'eo-locale';

export const Projects: React.FC = () => {
  const ownProjects = useOwnProjects();

  return (
    <div css={styles.root}>
      <div css={styles.items}>
        {ownProjects.map((item, i) => {
          return (
            <div css={styles.item} key={item.id}>
              <Avatar src={`https://picsum.photos/id/${10 * i}/80/80`} size={40} title={item.title} />
              <div className='info'>
                <h4 className='title'>{item.title}</h4>
                <span className='subtitle'>
                  <EOLocale.Date value={new Date(item.updatedAt)} />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const styles = {
  root: css``,

  items: css``,

  item: css`
    padding: var(--PADDING_VERTICAL_ELEMENT) var(--PADDING_HORIZONTAL_ELEMENT);
    display: flex;
    align-items: center;
    border-radius: var(--BORDER_RADIUS_MEDIUM);

    &:hover {
      background-color: rgb(var(--BG_TINT));
    }

    .info {
      margin-left: var(--PADDING_VERTICAL_ELEMENT);

      .title {
        font-size: var(--FONT_SIZE_BASE);
        font-weight: 600;
        margin: 0;
      }

      .subtitle {
        font-size: var(--FONT_SIZE_SMALL);
      }
    }
  `,
};
