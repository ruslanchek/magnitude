/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React, { useState } from 'react';
import { ActivityIndicator } from '../loading/ActivityIndicator';

interface IProps {
  type?: 'submit' | 'button';
  size?: 'small' | 'large' | 'tiny';
  color?: 'default' | 'success' | 'accent' | 'faded' | 'danger' | 'white' | 'facebook' | 'google';
  disabled?: boolean;
  loading?: boolean;
  strokeOnly?: boolean;
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
    strokeOnly,
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
      className={`${isFocusMarked ? 'focus' : ''}${strokeOnly ? ' stroke' : ''}`}
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
      {loading ? <ActivityIndicator size='small' color={'rgb(var(--BUTTON_TEXT))'} /> : children}
    </button>
  );
};

const styles = {
  root: css`
    padding: 0 calc(var(--INPUT_SIDE_PADDING) * 1.5);
    font-family: var(--FONT_FAMILY);
    border: none;
    background: none;
    outline: none;
    display: flex;
    justify-content: center;
    user-select: none;
    align-items: center;
    box-sizing: border-box;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-appearance: none;
    color: rgb(var(--BUTTON_TEXT));
    font-size: var(--FONT_SIZE_BASE);
    box-shadow: 0 0 0 0 rgba(var(--BUTTON_DEFAULT), 0);
    transition: background-color 0.2s, box-shadow 0.2s, transform 0.2s;
    transform: scale(0.99999);
    border-radius: var(--BORDER_RADIUS_SMALL);

    &:active {
      transform: scale(0.98);
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
      background-color: rgb(var(--BUTTON_DEFAULT));

      &:hover {
        background-color: hsl(var(--BUTTON_DEFAULT_HSL_DARKEN));
      }

      &:active {
        background-color: hsl(var(--BUTTON_DEFAULT_HSL_LIGHTEN));
        box-shadow: 0 0 0 0 rgba(var(--BUTTON_DEFAULT), 0);
      }

      &.focus {
        background-color: rgb(var(--BUTTON_DEFAULT));
        box-shadow: 0 0 0 3px rgba(var(--BUTTON_DEFAULT), 0.33);

        &:active {
          background-color: hsl(var(--BUTTON_DEFAULT_HSL_LIGHTEN));
          box-shadow: 0 0 0 3px rgba(var(--BUTTON_DEFAULT), 0.33), 0 0 0 0 rgba(var(--BUTTON_DEFAULT), 0);
        }
      }

      &.stroke {
        background-color: transparent;
        border: 1px solid rgb(var(--BUTTON_DEFAULT));
        color: rgb(var(--BUTTON_DEFAULT));

        &:hover {
          background-color: rgba(var(--BUTTON_DEFAULT), 0.05);
        }

        &:active {
          background-color: rgba(var(--BUTTON_DEFAULT), 0.1);
        }
      }
    `,

    success: css`
      background-color: rgb(var(--BUTTON_SUCCESS));

      &:hover {
        background-color: hsl(var(--BUTTON_SUCCESS_HSL_DARKEN));
      }

      &:active {
        background-color: hsl(var(--BUTTON_SUCCESS_HSL_LIGHTEN));
        box-shadow: 0 0 0 0 rgba(var(--BUTTON_SUCCESS), 0);
      }

      &.focus {
        background-color: rgb(var(--BUTTON_SUCCESS));
        box-shadow: 0 0 0 3px rgba(var(--BUTTON_SUCCESS), 0.33);

        &:active {
          background-color: hsl(var(--BUTTON_SUCCESS_HSL_LIGHTEN));
          box-shadow: 0 0 0 3px rgba(var(--BUTTON_SUCCESS), 0.33), 0 0 0 0 rgba(var(--BUTTON_SUCCESS), 0);
        }
      }

      &.stroke {
        background-color: transparent;
        border: 1px solid rgb(var(--BUTTON_SUCCESS));
        color: rgb(var(--BUTTON_SUCCESS));

        &:hover {
          background-color: rgba(var(--BUTTON_SUCCESS), 0.05);
        }

        &:active {
          background-color: rgba(var(--BUTTON_SUCCESS), 0.1);
        }
      }
    `,

    accent: css`
      background-color: rgb(var(--BUTTON_ACCENT));

      &:hover {
        background-color: hsl(var(--BUTTON_ACCENT_HSL_DARKEN));
      }

      &:active {
        background-color: hsl(var(--BUTTON_ACCENT_HSL_LIGHTEN));
        box-shadow: 0 0 0 0 rgba(var(--BUTTON_ACCENT), 0);
      }

      &.focus {
        background-color: rgb(var(--BUTTON_ACCENT));
        box-shadow: 0 0 0 3px rgba(var(--BUTTON_ACCENT), 0.33);

        &:active {
          background-color: hsl(var(--BUTTON_ACCENT_HSL_LIGHTEN));
          box-shadow: 0 0 0 3px rgba(var(--BUTTON_ACCENT), 0.33), 0 0 0 0 rgba(var(--BUTTON_ACCENT), 0);
        }
      }

      &.stroke {
        background-color: transparent;
        border: 1px solid rgb(var(--BUTTON_ACCENT));
        color: rgb(var(--BUTTON_ACCENT));

        &:hover {
          background-color: rgba(var(--BUTTON_ACCENT), 0.05);
        }

        &:active {
          background-color: rgba(var(--BUTTON_ACCENT), 0.1);
        }
      }
    `,

    faded: css`
      background-color: rgb(var(--BUTTON_FADED));

      &:hover {
        background-color: hsl(var(--BUTTON_FADED_HSL_DARKEN));
      }

      &:active {
        background-color: hsl(var(--BUTTON_FADED_HSL_LIGHTEN));
        box-shadow: 0 0 0 0 rgba(var(--BUTTON_FADED), 0);
      }

      &.focus {
        background-color: rgb(var(--BUTTON_FADED));
        box-shadow: 0 0 0 3px rgba(var(--BUTTON_FADED), 0.33);

        &:active {
          background-color: hsl(var(--BUTTON_FADED_HSL_LIGHTEN));
          box-shadow: 0 0 0 3px rgba(var(--BUTTON_FADED), 0.33), 0 0 0 0 rgba(var(--BUTTON_FADED), 0);
        }
      }

      &.stroke {
        background-color: transparent;
        border: 1px solid rgb(var(--BUTTON_FADED));
        color: rgb(var(--BUTTON_FADED));

        &:hover {
          background-color: rgba(var(--BUTTON_FADED), 0.05);
        }

        &:active {
          background-color: rgba(var(--BUTTON_FADED), 0.1);
        }
      }
    `,

    danger: css`
      background-color: rgb(var(--BUTTON_DANGER));

      &:hover {
        background-color: hsl(var(--BUTTON_DANGER_HSL_DARKEN));
      }

      &:active {
        background-color: hsl(var(--BUTTON_DANGER_HSL_LIGHTEN));
        box-shadow: 0 0 0 0 rgba(var(--BUTTON_DANGER), 0);
      }

      &.focus {
        background-color: rgb(var(--BUTTON_DANGER));
        box-shadow: 0 0 0 3px rgba(var(--BUTTON_DANGER), 0.33);

        &:active {
          background-color: hsl(var(--BUTTON_DANGER_HSL_LIGHTEN));
          box-shadow: 0 0 0 3px rgba(var(--BUTTON_DANGER), 0.33), 0 0 0 0 rgba(var(--BUTTON_DANGER), 0);
        }
      }

      &.stroke {
        background-color: transparent;
        border: 1px solid hsl(var(--BUTTON_DANGER_HSL_LIGHTEN));
        color: hsl(var(--BUTTON_DANGER_HSL_LIGHTEN));

        &:hover {
          background-color: rgba(var(--BUTTON_DANGER), 0.05);
        }

        &:active {
          background-color: rgba(var(--BUTTON_DANGER), 0.1);
        }
      }
    `,

    white: css`
      background-color: rgb(var(--WHITE));
      color: rgb(var(--TEXT_ACTIVE));

      &:hover {
        background-color: hsl(var(--WHITE_HSL_DARKEN));
      }

      &:active {
        background-color: hsl(var(--WHITE_HSL_LIGHTEN));
        box-shadow: 0 0 0 0 rgba(var(--WHITE), 0);
      }

      &.focus {
        background-color: rgb(var(--WHITE));
        box-shadow: 0 0 0 3px rgba(var(--WHITE), 0.33);

        &:active {
          background-color: hsl(var(--WHITE_HSL_LIGHTEN));
          box-shadow: 0 0 0 3px rgba(var(--WHITE), 0.33), 0 0 0 0 rgba(var(--WHITE), 0);
        }
      }

      &.stroke {
        background-color: transparent;
        border: 1px solid rgb(var(--WHITE));
        color: rgb(var(--WHITE));

        &:hover {
          background-color: rgba(var(--WHITE), 0.05);
        }

        &:active {
          background-color: rgba(var(--WHITE), 0.1);
        }
      }
    `,

    facebook: css`
      background-color: rgb(var(--BUTTON_FACEBOOK));

      &:hover {
        background-color: hsl(var(--BUTTON_FACEBOOK_HSL_DARKEN));
      }

      &:active {
        background-color: hsl(var(--BUTTON_FACEBOOK_HSL_LIGHTEN));
        box-shadow: 0 0 0 0 rgba(var(--BUTTON_FACEBOOK), 0);
      }

      &.focus {
        background-color: rgb(var(--BUTTON_FACEBOOK));
        box-shadow: 0 0 0 3px rgba(var(--BUTTON_FACEBOOK), 0.33);

        &:active {
          background-color: hsl(var(--BUTTON_FACEBOOK_HSL_LIGHTEN));
          box-shadow: 0 0 0 3px rgba(var(--BUTTON_FACEBOOK), 0.33), 0 0 0 0 rgba(var(--BUTTON_FACEBOOK), 0);
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
        background-color: hsl(var(--BUTTON_GOOGLE_HSL_DARKEN));
      }

      &:active {
        background-color: hsl(var(--BUTTON_GOOGLE_HSL_LIGHTEN));
        box-shadow: 0 0 0 0 rgba(var(--BUTTON_GOOGLE), 0);
      }

      &.focus {
        background-color: rgb(var(--BUTTON_GOOGLE));
        box-shadow: 0 0 0 3px rgba(var(--BUTTON_GOOGLE), 0.33);

        &:active {
          background-color: hsl(var(--BUTTON_GOOGLE_HSL_LIGHTEN));
          box-shadow: 0 0 0 3px rgba(var(--BUTTON_GOOGLE), 0.33), 0 0 0 0 rgba(var(--BUTTON_GOOGLE), 0);
        }
      }

      &.stroke {
        background-color: transparent;
        border: 1px solid rgb(var(--BUTTON_GOOGLE));
        color: rgb(var(--BUTTON_GOOGLE));

        &:hover {
          background-color: rgba(var(--BUTTON_GOOGLE), 0.05);
        }

        &:active {
          background-color: rgba(var(--BUTTON_GOOGLE), 0.1);
        }
      }
    `,
  },

  sizes: {
    large: css`
      height: var(--INPUT_HEIGHT_LARGE);
    `,

    small: css`
      height: var(--INPUT_HEIGHT_SMALL);
    `,

    tiny: css`
      height: var(--INPUT_HEIGHT_TINY);
      font-size: var(--FONT_SIZE_SMALL);
    `,
  },
};
