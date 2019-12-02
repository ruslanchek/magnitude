/** @jsx jsx */
import { jsx, css, ClassNames } from '@emotion/core';
import React, { useMemo } from 'react';
import { CSSTransition } from 'react-transition-group';

interface IProps {
  errors: string[];
  show: boolean;
  onDissmiss: () => void;
  offsetLeft?: number;
}

const ANIMATION_TIME = 200;

export const InputErrors: React.FC<IProps> = props => {
  const { errors, show, onDissmiss, offsetLeft } = props;

  const handleClick = () => {
    onDissmiss();
  };

  const showErrors = useMemo<boolean>(() => {
    if (show) {
      for (const error of errors) {
        if (error) {
          return true;
        }
      }
    }

    return false;
  }, [errors, show]);

  const additionalRootStyle = useMemo(() => {
    return css`
      > ul {
        &:after {
          transform: translateX(${offsetLeft ? offsetLeft : 0}px);
        }
      }
    `;
  }, [offsetLeft]);

  return (
    <ClassNames>
      {({ css }) => (
        <CSSTransition
          unmountOnExit
          appear
          in={showErrors}
          timeout={ANIMATION_TIME}
          classNames={{
            enter: css(animations.enter),
            enterActive: css(animations.enterActive),
            exit: css(animations.exit),
            exitActive: css(animations.exitActive),
          }}
        >
          <div css={[styles.root, additionalRootStyle]} onClick={handleClick}>
            <ul>
              {errors.map((error, key) => {
                if (error) {
                  return <li key={key}>{error}</li>;
                } else {
                  return null;
                }
              })}
            </ul>
          </div>
        </CSSTransition>
      )}
    </ClassNames>
  );
};

const animations = {
  enter: css`
    opacity: 0;
    transform: translateY(-5px);
  `,
  enterActive: css`
    opacity: 1;
    transform: translateY(0);
    transition-duration: ${ANIMATION_TIME}ms;
  `,
  exit: css`
    opacity: 1;
    transform: translateY(0);
  `,
  exitActive: css`
    opacity: 0;
    transform: translateY(-5px);
    transition-duration: opacity ${ANIMATION_TIME}ms;
  `,
};

const styles = {
  root: css`
    width: auto;
    bottom: calc(100% + 7px);
    left: 0;
    position: absolute;

    > ul {
      background-color: rgb(var(--INPUT_BG_ERROR));
      border-radius: var(--BORDER_RADIUS_SMALL);
      margin: 0;
      color: rgb(var(--TEXT_ACCENT));
      list-style: none;
      padding: 6px 0 5px;
      font-size: var(--FONT_SIZE_SMALL);

      > li {
        padding: 0 var(--INPUT_SIDE_PADDING);
        color: rgb(var(--BUTTON_TEXT));
      }

      &:after {
        top: 100%;
        left: calc(var(--INPUT_SIDE_PADDING) + 6px);
        border: solid transparent;
        content: ' ';
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
        border-top-color: rgb(var(--INPUT_BG_ERROR));
        border-width: 5px;
        margin-left: -5px;
      }
    }
  `,
};
