/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core';
import objstr from 'obj-str';

interface IProps {
  active: boolean;
  pre: string;
  title: string;
  status: string;
  icon: React.ReactNode;
  iconColor: string;
}

export const Story: React.FC<IProps> = ({ active, pre, title, status, icon, iconColor }) => {
  return (
    <div css={styles.root} className={objstr({ active })}>
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
        width: 25px;
        height: 25px;
        border-radius: 100%;
        align-items: center;
        justify-content: center;
        margin-right: 1ex;
        font-style: normal;
        font-size: 15px;
        top: -1px;
        position: relative;
      }
    }

    &.active {
      background-color: rgb(var(--ACCENT));
      color: rgb(var(--WHITE));

      .body {
        background-color: hsl(var(--ACCENT_LIGHT));

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
