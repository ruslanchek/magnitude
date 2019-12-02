/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import { GlobalStyles } from './GlobalStyles';
import { MainHeader } from './MainHeader';
import { Nav } from './ui/nav/Nav';
import { AsideHeader } from './AsideHeader';
import { useAuthorizedRoute } from '../hooks/useAuthorizedRoute';
import { useAppReady } from '../hooks/useAppReady';
import { AppLoading } from './ui/loading/AppLoading';

interface IProps {
  raw?: boolean;
}

export const ScreenWrapper: React.FC<IProps> = props => {
  const { children, raw = false } = props;
  const isAppReady = useAppReady();

  useAuthorizedRoute();

  return (
    <React.Fragment>
      <GlobalStyles />

      {isAppReady ? (
        <React.Fragment>
          {raw ? (
            <main css={styles.main}>{children}</main>
          ) : (
            <div css={styles.root}>
              <div css={styles.asideWrapper}>
                <AsideHeader />
                <Nav />
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
    grid-template-columns: var(--ASIDE_WIDTH) 1fr;
    width: 100vw;
    height: 100vh;
    background-color: rgb(var(--BACKGROUND));
  `,

  asideWrapper: css``,

  mainWrapper: css`
    background-color: rgb(var(--BACKGROUND_TINT));
  `,

  main: css``,
};
