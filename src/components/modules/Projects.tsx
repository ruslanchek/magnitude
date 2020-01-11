/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
// import { useHistory } from 'react-router-dom';
import { Avatar } from '../ui/avatars/Avatar';
import { EOLocale } from 'eo-locale';
// import { PATHS } from '../../constants/paths';
import { MdMoreVert } from 'react-icons/md';

interface IProjectProps {
  index: number;
  project: {};
}

const Project: React.FC<IProjectProps> = ({ index, project }) => {
  // const history = useHistory();

  const handleRouteToProject = () => {
    // history.push(PATHS.PROJECT.path.replace(':id', project.id));
  };

  return (
    <div css={styles.item} onClick={handleRouteToProject}>
      <button>
        <MdMoreVert />
      </button>
      <div className='header'>
        <Avatar src={`https://picsum.photos/id/${index}/100/100`} size={50} title={'Project'} />
        <h2 className='title'>Project</h2>
      </div>

      <div className='info'>
        <span className='subtitle'>
          <EOLocale.Date value={new Date()} />
        </span>
      </div>
    </div>
  );
};

export const Projects: React.FC = () => {
  return (
    <div css={styles.root}>
      <div css={styles.items}>
        <Project project={{}} index={1} />
      </div>
    </div>
  );
};

const styles = {
  root: css``,

  items: css`
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 25px;
  `,

  item: css`
    padding: 30px;
    border-radius: var(--BORDER_RADIUS_SMALL);
    background-color: rgb(var(--BG));
    box-shadow: var(--ELEVATION_SHADOW_2);

    &:hover {
      background-color: rgb(var(--BG_TINT));
    }

    .header {
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .title {
      font-size: var(--FONT_SIZE_LARGE);
      font-weight: 800;
      margin: 10px 0 0 0;
    }

    .info {
      .subtitle {
        font-size: var(--FONT_SIZE_SMALL);
      }
    }
  `,
};
