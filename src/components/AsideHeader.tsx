/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import { NavLink } from "react-router-dom";
import { PATHS } from "../constants/paths";

export const AsideHeader: React.FC = () => {
  return (
    <div css={styles.root}>
      <NavLink to={PATHS.HOME} css={styles.logo} />
    </div>
  );
};

const styles = {
  root: css`
    height: var(--HEADER_HEIGHT);
    display: flex;
    align-items: center;
    padding: 0 var(--PADDING_HORIZONTAL_GLOBAL);
  `,

  logo: css`
    width: calc(var(--ASIDE_WIDTH) - var(--PADDING_HORIZONTAL_GLOBAL));
    height: calc((var(--ASIDE_WIDTH) - var(--PADDING_HORIZONTAL_GLOBAL)) * 0.167);
    background-image: url(${require('../assets/images/logos/logo.svg')});
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: 100%;
    position: relative;
  `,
};
