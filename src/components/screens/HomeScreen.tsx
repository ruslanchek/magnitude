/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { ScreenWrapper } from '../ScreenWrapper';
import { ERouteType } from '../../constants/paths';
import { Button } from '../ui/form/Button';
import { ProjectApi } from '../../api/ProjectApi';

export const HomeScreen: React.FC = () => {
  return (
    <ScreenWrapper raw={false} routeType={ERouteType.Authorized}>
      <div css={styles.root}>
        <Button
          onClick={async () => {
            await ProjectApi.create('Private');
          }}>
          Create project
        </Button>
      </div>
    </ScreenWrapper>
  );
};

const styles = {
  root: css``,

  wrapper: css``,
};
