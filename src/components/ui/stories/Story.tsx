/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';
import classnames from 'classnames';

interface IProps {
  active: boolean;
  pre: string;
  title: string;
  status: React.ReactNode;
  icon: React.ReactNode;
  iconColor: string;
}

export const Story: React.FC<IProps> = ({ active, pre, title, status, icon, iconColor }) => {
  return (
    <div css={styles.root} className={classnames({ active })}>
      <div className='body'>
        <div className='pre'>{pre}</div>
        <div className='title'>{title}</div>
      </div>
      <div className='footer'>
        <i style={{ color: iconColor }}>{icon}</i>
        {status}
      </div>
    </div>
  );
};

const styles = {
  root: css`
    background-color: rgb(var(--BG_DARK));
    border-radius: var(--BORDER_RADIUS_LARGE);
    width: 300px;
    color: rgb(var(--TEXT));
    display: flex;
    flex-direction: column;
    margin-right: 20px;
    border: 1px solid hsl(var(--BG_DARK_HSL_D1), 0.4);
    box-sizing: border-box;

    .body {
      background-color: rgb(var(--BG_TINT));
      padding: var(--PADDING_VERTICAL_ELEMENT) var(--PADDING_HORIZONTAL_ELEMENT);
      border-radius: var(--BORDER_RADIUS_LARGE);
      flex-grow: 1;

      .pre {
        color: rgba(var(--TEXT), 0.5);
      }

      .title {
        font-size: var(--FONT_SIZE_LARGE);
        font-weight: 600;
      }
    }

    .footer {
      padding: 12px 20px 10px;
      display: flex;

      > i {
        background-color: rgb(var(--WHITE));
        display: flex;
        width: var(--SQUARED_ICON_SIZE);
        height: var(--SQUARED_ICON_SIZE);
        border-radius: 100%;
        align-items: center;
        justify-content: center;
        margin-right: 1ex;
        font-style: normal;
        font-size: 14px;
        top: -1px;
        position: relative;
      }
    }

    &.active {
      background-color: rgb(var(--ACCENT));
      border: none;
      color: rgb(var(--WHITE));

      .body {
        background-color: hsl(var(--ACCENT_HSL_L1));

        .pre {
          color: rgba(var(--WHITE), 0.5);
        }

        .title {
          font-size: var(--FONT_SIZE_LARGE);
        }
      }

      .footer {
        > i {
          background-color: rgba(var(--WHITE), 0.2);
        }
      }
    }
  `,
};
