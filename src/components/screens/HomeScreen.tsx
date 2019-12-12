/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { useContext, useState } from 'react';
import { ScreenWrapper } from '../ScreenWrapper';
import { ERouteType } from '../../constants/paths';
import { Button } from '../ui/form/Button';
import { ProjectApi } from '../../api/ProjectApi';
import { useOwnProjects } from '../../hooks/useOwnProjects';
import { ENotificationType, NotificationsContext } from '../ui/notifications/Notifications';
import { Input } from '../ui/form/Input';

export const HomeScreen: React.FC = () => {
  const ownProjects = useOwnProjects();

  return (
    <ScreenWrapper raw={false} routeType={ERouteType.Authorized}>
      <div css={styles.root}>
        <ul>
          {ownProjects.map(item => {
            return (
              <li key={item.id}>
                {item.id}: {item.title}
              </li>
            );
          })}
        </ul>
      </div>
    </ScreenWrapper>
  );
};

const styles = {
  root: css``,

  wrapper: css``,
};
