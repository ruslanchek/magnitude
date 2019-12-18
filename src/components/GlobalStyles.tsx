/** @jsx jsx */
import React from 'react';
import { jsx, css, Global } from '@emotion/core';
import { COLORS } from '../constants/colors';
import { BREAKPOINTS } from '../constants/breakpoints';
import { UI_CONSTANTS } from '../constants/ui-constants';

export const GlobalStyles: React.FC = () => {
  const colors: string[] = [];
  const breakpoints: string[] = [];
  const uiConstants: string[] = [];

  for (const color in COLORS) {
    const rgb = (COLORS as any)[color];
    const lighten = rgb.lighten(0.22).array();
    const darken = rgb.darken(0.22).array();

    colors.push(
      `--${color}: ${rgb.array().join(',')}`,
      `--${color}_HSL_LIGHTEN: ${lighten[0]},${lighten[1]}%,${lighten[2]}%`,
      `--${color}_HSL_DARKEN: ${darken[0]},${darken[1]}%,${darken[2]}%`,
    );
  }

  for (const breakpoint in BREAKPOINTS) {
    breakpoints.push(`--${breakpoint}: ${(BREAKPOINTS as any)[breakpoint]}px`);
  }

  for (const uiConstant in UI_CONSTANTS) {
    uiConstants.push(`--${uiConstant}: ${(UI_CONSTANTS as any)[uiConstant]}`);
  }

  return (
    <Global
      styles={[
        styles,
        css`
          :root {
            ${colors.join(';')};
            ${breakpoints.join(';')};
            ${uiConstants.join(';')};
          }
        `,
      ]}
    />
  );
};

const styles = css`
  body {
    font-family: var(--FONT_FAMILY);
    margin: 0;
    background-color: rgb(var(--BG));
    color: rgb(var(--TEXT));
    font-size: var(--FONT_SIZE_BASE);
    line-height: var(--GLOBAL_LINE_HEIGHT);
    overflow: hidden;
    height: 100vh;
    width: 100vw;
  }

  a.underline {
    border-bottom: 1px solid;
  }

  a,
  a:link,
  a:visited {
    color: rgb(var(--ACCENT));
    text-decoration: none;
    outline: none;
    transition: box-shadow 0.2s;

    &.underline {
      border-bottom-color: rgba(var(--ACCENT), 0.35);
    }

    &.light {
      color: rgb(var(--TEXT_LIGHT));

      &.underline {
        border-bottom-color: rgba(var(--TEXT_LIGHT), 0.35);
      }
    }
  }

  a:hover,
  a:active,
  a:focus {
    color: hsl(var(--ACCENT_HSL_DARKEN));

    &.underline {
      border-bottom-color: hsla(var(--ACCENT_HSL_DARKEN), 0.35);
    }

    &.light {
      color: hsl(var(--TEXT_LIGHT_HSL_DARKEN));

      &.underline {
        border-bottom-color: hsla(var(--ACCENT_HSL_DARKEN), 0.35);
      }
    }
  }

  a:focus:not(:active):not(:hover) {
    box-shadow: 0 0 0 3.5px rgba(var(--ACCENT), 0.2);
    border-radius: 3px;
  }

  ul,
  ol {
    padding-left: 2.35ex;
  }

  p {
    margin-top: 0;
  }

  ::placeholder {
    color: rgb(var(--TEXT_PLACEHOLDER));
  }

  ::selection {
    background: rgb(var(--ACCENT));
    color: rgb(var(--WHITE));
  }

  ::-moz-selection {
    background: rgb(var(--ACCENT));
    color: rgb(var(--WHITE));
  }
`;
