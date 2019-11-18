/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { PageWrapper } from '../components/PageWrapper';
import { SwaggerView } from '../components/doc-views/SwaggerView';
import { MonacoEditorView } from '../components/doc-views/MonacoEditorView';

export const TestScreen: React.FC = () => {
  return (
    <PageWrapper>
      <div css={styles.root}>
        <SwaggerView />
        <MonacoEditorView />
      </div>
    </PageWrapper>
  );
};

const styles = {
  root: css``,

  wrapper: css``,
};
