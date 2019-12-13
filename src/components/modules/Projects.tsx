/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useOwnProjects } from '../../hooks/useOwnProjects';
import { Avatar } from '../ui/avatars/Avatar';
import { EOLocale } from 'eo-locale';
import { IEntityProjectShared } from '@ruslanchek/magnitude-shared';
import { PATHS } from '../../constants/paths';

interface IProjectProps {
  index: number;
  project: IEntityProjectShared;
}

const Project: React.FC<IProjectProps> = ({ index, project }) => {
  const history = useHistory();

  const handleRouteToProject = () => {
    history.push(PATHS.PROJECT.path.replace(':id', project.id));
  };

  return (
    <div css={styles.item} onClick={handleRouteToProject}>
      <div className='info'>
        <Avatar src={`https://picsum.photos/id/${index}/80/80`} size={40} title={project.title} />
        <h2 className='title'>{project.title}</h2>
        <span className='subtitle'>
          <EOLocale.Date value={new Date(project.updatedAt)} />
        </span>
      </div>
    </div>
  );
};

export const Projects: React.FC = () => {
  const ownProjects = useOwnProjects();

  return (
    <div css={styles.root}>
      <div css={styles.items}>
        {ownProjects.map((item, i) => (
          <Project project={item} index={i} key={item.id} />
        ))}
      </div>
    </div>
  );
};

const styles = {
  root: css``,

  items: css``,

  item: css`
    padding: 30px;
    border-radius: var(--BORDER_RADIUS_MEDIUM);
    background-color: rgb(var(--BG));

    &:hover {
      background-color: rgb(var(--BG_TINT));
    }

    .info {
      margin-left: var(--PADDING_VERTICAL_ELEMENT);

      .title {
        font-size: var(--FONT_SIZE_LARGE);
        font-weight: 800;
        margin: 10px 0 0 0;
      }

      .subtitle {
        font-size: var(--FONT_SIZE_SMALL);
      }
    }
  `,
};
