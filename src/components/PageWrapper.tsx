/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import { GlobalStyles } from './GlobalStyles';
import { MainHeader } from './MainHeader';
import { Nav } from './Nav';
import { AsideHeader } from './AsideHeader';
import { UI_CONSTANTS } from '../constants/ui-constants';

interface IProps {}

export const PageWrapper: React.FC<IProps> = props => {
  const { children } = props;

  return (
    <React.Fragment>
      <GlobalStyles />
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
    </React.Fragment>
  );
};

const styles = {
  root: css`
    display: grid;
    grid-template-columns: ${UI_CONSTANTS.ASIDE_WIDTH}px 1fr;
    width: 100vw;
    height: 100vh;
    background-color: rgb(var(--BACKGROUND));
  `,

  asideWrapper: css``,

  mainWrapper: css``,

  main: css`
    background-color: rgb(var(--BACKGROUND_TINT));
  `,
};
