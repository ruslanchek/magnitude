/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import { GlobalStyles } from './GlobalStyles';
import { MainHeader } from './MainHeader';
import { AsideNav } from './aside/AsideNav';
import { AsideHeader } from './aside/AsideHeader';
import { useAuthorizedRoute } from '../hooks/useAuthorizedRoute';
import { useAppReady } from '../hooks/useAppReady';
import { AppLoading } from './ui/loading/AppLoading';
import { AsideFooter } from './aside/AsideFooter';
import { useStore } from 'react-stores';
import { localStore } from '../stores/localStore';

interface IProps {
  raw?: boolean;
}

export const ScreenWrapper: React.FC<IProps> = props => {
  const { children, raw = false } = props;
  const isAppReady = useAppReady();
  const showSidePanel = useStore(localStore, {
    mapState: storeState => storeState.showSidePanel,
  });

  useAuthorizedRoute();

  return (
    <React.Fragment>
      <GlobalStyles />

      {isAppReady ? (
        <React.Fragment>
          {raw ? (
            <main css={styles.main}>{children}</main>
          ) : (
            <div css={styles.root} className={showSidePanel ? 'wide' : 'narrow'}>
              <div css={styles.asideWrapper}>
                <AsideHeader showSidePanel={showSidePanel} />
                <AsideNav showSidePanel={showSidePanel} />
                <AsideFooter showSidePanel={showSidePanel} />
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
    background-color: rgb(var(--BG));

    &.wide {
      grid-template-columns: var(--ASIDE_WIDTH_WIDE) 1fr;
    }

    &.narrow {
      grid-template-columns: var(--ASIDE_WIDTH_NARROW) 1fr;
    }
  `,

  asideWrapper: css`
    user-select: none;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: var(--HEADER_HEIGHT) 1fr var(--FOOTER_HEIGHT);
  `,

  mainWrapper: css`
    background-color: rgb(var(--BG_TINT));
  `,

  main: css``,
};
