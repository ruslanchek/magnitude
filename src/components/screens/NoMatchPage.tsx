/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { PageWrapper } from '../PageWrapper';

export const NoMatchPage: React.FC = () => {
  return (
    <PageWrapper>
      <div css={styles.root}>NoMatchPage</div>
    </PageWrapper>
  );
};

const styles = {
  root: css``,

  wrapper: css``,
};
