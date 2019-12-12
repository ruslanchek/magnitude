/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { useOwnProjects } from '../../hooks/useOwnProjects';
import { Avatar } from '../ui/avatars/Avatar';

export const Projects: React.FC = () => {
  const ownProjects = useOwnProjects();

  return (
    <div css={styles.root}>
      <div css={styles.items}>
        {ownProjects.map((item, i) => {
          return (
            <div css={styles.item} key={item.id}>
              <Avatar src={`https://picsum.photos/id/${100 * i}/80/80`} size={40} title={item.title} />
              <div className='info'>
                <h4 className='title'>{item.title}</h4>
                <span className='subtitle'>{item.id}</span>
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
    padding: var(--PADDING_VERTICAL_ELEMENT) 0;
    border-bottom: 1px solid rgb(var(--INPUT_BORDER));
    display: flex;

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
