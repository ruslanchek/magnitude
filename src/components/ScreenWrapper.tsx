/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import { MainHeader } from './MainHeader';
import { AsideNav } from './aside/AsideNav';
import { AsideHeader } from './aside/AsideHeader';
import { useAppReady } from '../hooks/useAppReady';
import { AppLoading } from './ui/loading/AppLoading';
import { useAuthorizedRoute } from '../hooks/useAuthorizedRoute';
import { ERouteType } from '../constants/paths';
import { useTranslator } from 'eo-locale';
import { useTitle } from '../hooks/useTitle';

interface IProps {
  routeType: ERouteType;
  raw: boolean;
  title: string;
}

export const ScreenWrapper: React.FC<IProps> = props => {
  const { children, raw, routeType, title } = props;
  const translator = useTranslator();
  const isAppReady = useAppReady();

  useTitle(translator.translate(title));
  useAuthorizedRoute(routeType);

  return (
    <React.Fragment>
      {isAppReady ? (
        <React.Fragment>
          {raw ? (
            <main css={styles.mainRaw}>{children}</main>
          ) : (
            <div css={styles.root}>
              <div css={styles.asideWrapper}>
                <AsideHeader />
                <AsideNav />
              </div>
              <div css={styles.mainWrapper}>
                <MainHeader />
                <main css={styles.main}>{children}</main>
              </div>
            </div>
          )}
        </React.Fragment>
      ) : (
        <AppLoading />
      )}
    </React.Fragment>
  );
};

const styles = {
  root: css`
    display: grid;
    width: 100vw;
    height: 100vh;
    grid-template-columns: var(--ASIDE_WIDTH) 1fr;
  `,

  asideWrapper: css`
    user-select: none;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: var(--HEADER_HEIGHT) auto var(--FOOTER_HEIGHT);
    background-color: rgb(var(--BG_TINT));
    border-right: 1px solid rgb(var(--ELEMENT_BORDER));
  `,

  mainWrapper: css`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: var(--HEADER_HEIGHT) calc(100vh - var(--HEADER_HEIGHT));
  `,

  mainRaw: css``,

  main: css`
    overflow: auto;
  `,
};
