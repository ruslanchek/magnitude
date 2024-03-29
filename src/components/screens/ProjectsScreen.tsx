/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { ScreenWrapper } from '../ScreenWrapper';
import { ERouteType } from '../../constants/paths';
import { Projects } from '../modules/Projects';

export const ProjectsScreen: React.FC = () => {
  return (
    <ScreenWrapper raw={false} routeType={ERouteType.Authorized} title={'Title::Projects'}>
      <div css={styles.root}>
        <Projects />
      </div>
    </ScreenWrapper>
  );
};

const styles = {
  root: css`
    padding: var(--PADDING_VERTICAL_GLOBAL) var(--PADDING_HORIZONTAL_GLOBAL);
  `,
};
