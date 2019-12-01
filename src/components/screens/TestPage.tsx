/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { PageWrapper } from '../PageWrapper';
import { SwaggerView } from '../doc-views/SwaggerView';
import { MonacoEditorView } from '../doc-views/MonacoEditorView';
import { useAuthorized } from "../../hooks/useAuthorized";

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
