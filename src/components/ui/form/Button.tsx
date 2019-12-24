/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React, { useState } from 'react';
import { ActivityIndicator } from '../loading/ActivityIndicator';

interface IProps {
  type?: 'submit' | 'button';
  size?: 'small' | 'large';
  color?: 'default' | 'success' | 'accent' | 'faded' | 'danger' | 'white' | 'facebook' | 'google';
  disabled?: boolean;
  loading?: boolean;
  tabIndex?: number;
  onClick?: () => void;
}

export const Button: React.FC<IProps> = props => {
  const {
    type = 'button',
    size = 'large',
    color = 'default',
    disabled = false,
    loading = false,
    onClick = () => {},
    tabIndex = 1,
    children,
  } = props;

  const [isFocusMarked, setFocusMarked] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      tabIndex={tabIndex || 1}
      className={isFocusMarked ? 'focus' : ''}
      onKeyUp={() => {
        setFocusMarked(true);
      }}
      onBlur={() => {
        setFocusMarked(false);
      }}
      onMouseDown={() => {
        setFocusMarked(false);
      }}
      css={[styles.root, styles.sizes[size || 'large'], styles.colors[color || 'default']]}
      onClick={handleClick}>
      {loading ? <ActivityIndicator size='small' color='#fff' /> : children}
    </button>
  );
};

const styles = {
  root: css`
    font-family: var(--FONT_FAMILY);
    border: none;
    background: none;
    outline: none;
    display: inline-flex;
    justify-content: center;
    user-select: none;
    align-items: center;
    box-sizing: border-box;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-appearance: none;
    font-size: var(--FONT_SIZE_BASE);
    font-weight: 600;
    transition: background-color 0.2s, box-shadow 0.2s, transform 0.2s;
    transform: scale(0.99999);
    border-radius: var(--BORDER_RADIUS_MEDIUM);

    &:active {
      transform: scale(0.99);
    }

    &:disabled {
      pointer-events: none;
      opacity: 0.7;
    }
  `,

  icon: css`
    position: relative;
    top: 1.5px;
    margin: 0 8px 0 -8px;
  `,

  colors: {
    default: css`
      background-color: rgb(var(--ACCENT));
      color: rgb(var(--WHITE));

      &:hover {
        background-color: hsl(var(--ACCENT_DARKEN));
      }

      &:active {
        background-color: hsl(var(--ACCENT_DARKEN));
        box-shadow: 0 0 0 0 rgba(var(--ACCENT), 0);
      }

      &.focus {
        background-color: rgb(var(--ACCENT));
        box-shadow: 0 0 0 3.5px rgba(var(--ACCENT), 0.33);

        &:active {
          background-color: hsl(var(--ACCENT_DARKEN));
          box-shadow: 0 0 0 3.5px rgba(var(--ACCENT), 0.33), 0 0 0 0 rgba(var(--ACCENT), 0);
        }
      }
    `,

    success: css`
      background-color: rgb(var(--SUCCESS));
      color: rgb(var(--WHITE));

      &:hover {
        background-color: hsl(var(--SUCCESS_DARKEN));
      }

      &:active {
        background-color: hsl(var(--SUCCESS_DARKEN));
        box-shadow: 0 0 0 0 rgba(var(--SUCCESS), 0);
      }

      &.focus {
        background-color: rgb(var(--SUCCESS));
        box-shadow: 0 0 0 3.5px rgba(var(--SUCCESS), 0.33);

        &:active {
          background-color: hsl(var(--SUCCESS_DARKEN));
          box-shadow: 0 0 0 3.5px rgba(var(--SUCCESS), 0.33), 0 0 0 0 rgba(var(--SUCCESS), 0);
        }
      }
    `,

    accent: css`
      background-color: rgb(var(--BUTTON_ACCENT));

      &:hover {
        background-color: hsl(var(--BUTTON_ACCENT_DARKEN));
      }

      &:active {
        background-color: hsl(var(--BUTTON_ACCENT_DARKEN));
        box-shadow: 0 0 0 0 rgba(var(--BUTTON_ACCENT), 0);
      }

      &.focus {
        background-color: rgb(var(--BUTTON_ACCENT));
        box-shadow: 0 0 0 3.5px rgba(var(--BUTTON_ACCENT), 0.33);

        &:active {
          background-color: hsl(var(--BUTTON_ACCENT_DARKEN));
          box-shadow: 0 0 0 3.5px rgba(var(--BUTTON_ACCENT), 0.33), 0 0 0 0 rgba(var(--BUTTON_ACCENT), 0);
        }
      }
    `,

    faded: css`
      background-color: rgb(var(--BUTTON_FADED));

      &:hover {
        background-color: hsl(var(--BUTTON_FADED_DARKEN));
      }

      &:active {
        background-color: hsl(var(--BUTTON_FADED_DARKEN));
        box-shadow: 0 0 0 0 rgba(var(--BUTTON_FADED), 0);
      }

      &.focus {
        background-color: rgb(var(--BUTTON_FADED));
        box-shadow: 0 0 0 3.5px rgba(var(--BUTTON_FADED), 0.33);

        &:active {
          background-color: hsl(var(--BUTTON_FADED_DARKEN));
          box-shadow: 0 0 0 3.5px rgba(var(--BUTTON_FADED), 0.33), 0 0 0 0 rgba(var(--BUTTON_FADED), 0);
        }
      }
    `,

    danger: css`
      background-color: rgb(var(--BUTTON_DANGER));

      &:hover {
        background-color: hsl(var(--BUTTON_DANGER_DARKEN));
      }

      &:active {
        background-color: hsl(var(--BUTTON_DANGER_DARKEN));
        box-shadow: 0 0 0 0 rgba(var(--BUTTON_DANGER), 0);
      }

      &.focus {
        background-color: rgb(var(--BUTTON_DANGER));
        box-shadow: 0 0 0 3.5px rgba(var(--BUTTON_DANGER), 0.33);

        &:active {
          background-color: hsl(var(--BUTTON_DANGER_DARKEN));
          box-shadow: 0 0 0 3.5px rgba(var(--BUTTON_DANGER), 0.33), 0 0 0 0 rgba(var(--BUTTON_DANGER), 0);
        }
      }
    `,

    white: css`
      background-color: rgb(var(--WHITE));
      color: rgb(var(--TEXT_ACTIVE));

      &:hover {
        background-color: hsl(var(--WHITE_DARKEN));
      }

      &:active {
        background-color: hsl(var(--WHITE_DARKEN));
        box-shadow: 0 0 0 0 rgba(var(--WHITE), 0);
      }

      &.focus {
        background-color: rgb(var(--WHITE));
        box-shadow: 0 0 0 3.5px rgba(var(--WHITE), 0.33);

        &:active {
          background-color: hsl(var(--WHITE_DARKEN));
          box-shadow: 0 0 0 3.5px rgba(var(--WHITE), 0.33), 0 0 0 0 rgba(var(--WHITE), 0);
        }
      }
    `,

    facebook: css`
      background-color: rgb(var(--BUTTON_FACEBOOK));

      &:hover {
        background-color: hsl(var(--BUTTON_FACEBOOK_DARKEN));
      }

      &:active {
        background-color: hsl(var(--BUTTON_FACEBOOK_DARKEN));
        box-shadow: 0 0 0 0 rgba(var(--BUTTON_FACEBOOK), 0);
      }

      &.focus {
        background-color: rgb(var(--BUTTON_FACEBOOK));
        box-shadow: 0 0 0 3.5px rgba(var(--BUTTON_FACEBOOK), 0.33);

        &:active {
          background-color: hsl(var(--BUTTON_FACEBOOK_DARKEN));
          box-shadow: 0 0 0 3.5px rgba(var(--BUTTON_FACEBOOK), 0.33), 0 0 0 0 rgba(var(--BUTTON_FACEBOOK), 0);
        }
      }

      &.stroke {
        background-color: transparent;
        border: 1px solid rgb(var(--BUTTON_FACEBOOK));
        color: rgb(var(--BUTTON_FACEBOOK));

        &:hover {
          background-color: rgba(var(--BUTTON_FACEBOOK), 0.05);
        }

        &:active {
          background-color: rgba(var(--BUTTON_FACEBOOK), 0.1);
        }
      }
    `,

    google: css`
      background-color: rgb(var(--BUTTON_GOOGLE));
      color: rgb(var(--TEXT_FADED));

      &:hover {
        background-color: hsl(var(--BUTTON_GOOGLE_DARKEN));
      }

      &:active {
        background-color: hsl(var(--BUTTON_GOOGLE_DARKEN));
        box-shadow: 0 0 0 0 rgba(var(--BUTTON_GOOGLE), 0);
      }

      &.focus {
        background-color: rgb(var(--BUTTON_GOOGLE));
        box-shadow: 0 0 0 3.5px rgba(var(--BUTTON_GOOGLE), 0.33);

        &:active {
          background-color: hsl(var(--BUTTON_GOOGLE_DARKEN));
          box-shadow: 0 0 0 3.5px rgba(var(--BUTTON_GOOGLE), 0.33), 0 0 0 0 rgba(var(--BUTTON_GOOGLE), 0);
        }
      }
    `,
  },

  sizes: {
    large: css`
      height: var(--INPUT_HEIGHT_LARGE);
      font-size: var(--FONT_SIZE_MEDIUM);
      min-width: 180px;
      padding: 0 calc(var(--INPUT_SIDE_PADDING) * 1.5);
    `,

    small: css`
      height: var(--INPUT_HEIGHT_SMALL);
      font-size: var(--FONT_SIZE_BASE);
      padding: 0 calc(var(--INPUT_SIDE_PADDING) * 1.5);
    `,
  },
};
