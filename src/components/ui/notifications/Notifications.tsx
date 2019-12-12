/** @jsx jsx */
import { jsx, ClassNames, css } from '@emotion/core';
import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import ReactDOM from 'react-dom';
import { usePortal } from '../../../hooks/usePortal';

const DEFAULT_LIFETIME: number = 5000;
const ANIMATION_TIME: number = 180;
const Z_INDEX: number = 3000;
const MAX_HEIGHT: number = 300;

interface IProps {
  rootContainerSelector: string;
  verticalOffset: string;
  horizontalOffset: string;
  verticalPosition: ENotificationsVerticalPosition;
  horizontalPosition: ENotificationsHorizontalPosition;
  width?: string;
  allowIdentical?: boolean;
}

interface INotification {
  id: number;
  type: ENotificationType;
  title: string | React.ReactNode;
  body: string | React.ReactNode;
  show: boolean;
  timeout: number;
  callback?: () => void;
}

export enum ENotificationType {
  Default,
  Faded,
  Success,
  Accent,
  Danger,
}

export enum ENotificationsVerticalPosition {
  Top,
  Bottom,
}

export enum ENotificationsHorizontalPosition {
  Left,
  Center,
  Right,
}

export interface INotificationsContext {
  clearAll: () => void;
  addNotification: (
    type: ENotificationType,
    body: string | React.ReactNode,
    title?: string | React.ReactNode,
    lifetime?: number,
    callback?: () => void,
  ) => number | null;
  removeNotification: (id: number) => void;
}

export const NotificationsContext = React.createContext<INotificationsContext>({
  clearAll: () => {},
  addNotification: () => null,
  removeNotification: () => {},
});

export const Notifications: React.FC<IProps> = props => {
  const { rootContainerSelector, verticalPosition, horizontalPosition, width, allowIdentical, children } = props;
  let { verticalOffset, horizontalOffset } = props;
  const root = usePortal(rootContainerSelector);
  const notificationsRef = useRef<Map<number, INotification>>(new Map());

  /**
   * Utilitary timestamp to force re-renders due to update the notifications Map ref.
   * Used to strict component updates contols rendering updates manually.
   */
  const update = useState(Date.now());

  useEffect(() => {
    return () => {
      clearAll();
    };
  }, []);

  const clearAll = () => {
    notificationsRef.current.forEach(notification => {
      clearTimeout(notification.timeout);
    });

    notificationsRef.current = new Map();
    update[1](Date.now());
  };

  const getId = useCallback(
    (value: string): number => {
      if (allowIdentical) {
        return Date.now();
      }

      let hash = 0;

      if (value.length === 0) {
        return hash;
      }

      for (let i = 0, l = value.length; i < l; i++) {
        let chr = value.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0;
      }

      if (hash < 0) {
        return -hash;
      } else {
        return hash;
      }
    },
    [allowIdentical],
  );

  const removeNotification = useCallback((id: number) => {
    const notification = notificationsRef.current.get(id);

    if (notification) {
      notification.show = false;
      update[1](Date.now());
      clearTimeout(notification.timeout);
    }
  }, []);

  const addNotification = useCallback(
    (
      type: ENotificationType,
      body: string | React.ReactNode,
      title?: string | React.ReactNode,
      lifetime?: number,
      callback?: () => void,
    ): number | null => {
      const id = getId(`${type.toString()}${body}${title}`);

      if (!allowIdentical && notificationsRef.current.get(id)) {
        return null;
      }

      notificationsRef.current.set(id, {
        id,
        body,
        type,
        title: title || null,
        show: false,
        timeout: -1,
        callback,
      });

      update[1](Date.now());

      requestAnimationFrame(() => {
        const notification = notificationsRef.current.get(id);

        if (notification) {
          if (!lifetime) {
            lifetime = DEFAULT_LIFETIME;
          }

          lifetime += ANIMATION_TIME;

          notification.show = true;
          notification.timeout = window.setTimeout(() => {
            removeNotification(id);
          }, lifetime);

          update[1](Date.now());
        }
      });

      return id;
    },
    [allowIdentical, getId, removeNotification],
  );

  const alignSelf = useMemo((): string => {
    if (horizontalPosition === ENotificationsHorizontalPosition.Left) {
      return 'flex-start';
    } else if (horizontalPosition === ENotificationsHorizontalPosition.Right) {
      return 'flex-end';
    } else {
      return 'center';
    }
  }, [horizontalPosition]);

  const rootTop = useMemo((): string => {
    if (verticalPosition === ENotificationsVerticalPosition.Top) {
      return '-10px';
    } else {
      return 'auto';
    }
  }, [verticalPosition, verticalOffset]);

  const rootBottom = useMemo((): string => {
    if (verticalPosition === ENotificationsVerticalPosition.Bottom) {
      return '-10px';
    } else {
      return 'auto';
    }
  }, [verticalPosition, verticalOffset]);

  const rootLeft = useMemo((): string => {
    if (horizontalPosition === ENotificationsHorizontalPosition.Left) {
      return '-10px';
    } else if (horizontalPosition === ENotificationsHorizontalPosition.Right) {
      return 'auto';
    } else {
      return '50%';
    }
  }, [horizontalPosition]);

  const rootRight = useMemo((): string => {
    if (horizontalPosition === ENotificationsHorizontalPosition.Left) {
      return 'auto';
    } else if (horizontalPosition === ENotificationsHorizontalPosition.Right) {
      return '-10px';
    } else {
      return 'auto';
    }
  }, [horizontalPosition]);

  const translateX = useMemo((): string => {
    if (horizontalPosition === ENotificationsHorizontalPosition.Left) {
      return horizontalOffset;
    } else if (horizontalPosition === ENotificationsHorizontalPosition.Right) {
      return `-${horizontalOffset}`;
    } else {
      return '-50%';
    }
  }, [horizontalPosition, horizontalOffset]);

  const translateY = useMemo((): string => {
    if (verticalPosition === ENotificationsVerticalPosition.Top) {
      return verticalOffset;
    } else {
      return `-${verticalOffset}`;
    }
  }, [verticalPosition, verticalOffset]);

  return (
    <NotificationsContext.Provider
      value={{
        clearAll,
        addNotification,
        removeNotification,
      }}>
      {children}
      {root
        ? ReactDOM.createPortal(
            <React.Fragment>
              {notificationsRef.current.size > 0 && (
                <div
                  css={[
                    styles.root,
                    css`
                      top: ${rootTop};
                      bottom: ${rootBottom};
                      left: ${rootLeft};
                      right: ${rootRight};
                      transform: translate(${translateX}, ${translateY});
                      max-height: calc(100vh - ${verticalOffset});
                    `,
                  ]}>
                  {Array.from(notificationsRef.current.values()).map(notification => {
                    return (
                      <ClassNames key={notification.id}>
                        {({ css }) => {
                          return (
                            <CSSTransition
                              timeout={ANIMATION_TIME}
                              in={notification.show}
                              unmountOnExit
                              onExited={() => {
                                notificationsRef.current.delete(notification.id);
                              }}
                              classNames={{
                                enter: css(animations.enter),
                                enterActive: css(animations.enterActive),
                                exit: css(animations.exit),
                                exitActive: css(animations.exitActive),
                              }}>
                              <div
                                css={[
                                  styles.notification,
                                  {
                                    maxWidth: width ? width : 'auto',
                                    width: width ? width : 'auto',
                                    minWidth: width ? width : '0',
                                    alignSelf,
                                  },
                                ]}
                                onClick={() => {
                                  removeNotification(notification.id);
                                }}>
                                <div css={[styles.container, styles.containerTypes[notification.type]]}>
                                  {notification.title && <div css={styles.title}>{notification.title}</div>}
                                  <div css={styles.body}>{notification.body}</div>
                                </div>
                              </div>
                            </CSSTransition>
                          );
                        }}
                      </ClassNames>
                    );
                  })}
                </div>
              )}
            </React.Fragment>,
            root,
          )
        : null}
    </NotificationsContext.Provider>
  );
};

const animations = {
  enter: css`
    opacity: 0;
    transform: scale(0.95);
    max-height: 0;
  `,
  enterActive: css`
    opacity: 1;
    transform: scale(1);
    max-height: ${MAX_HEIGHT}px;
    transition: transform ${ANIMATION_TIME}ms, opacity ${ANIMATION_TIME}ms, max-height ${ANIMATION_TIME}ms;
  `,
  exit: css`
    opacity: 1;
    transform: scale(1);
    max-height: ${MAX_HEIGHT}px;
  `,
  exitActive: css`
    opacity: 0;
    transform: scale(0.95);
    max-height: 0;
    transition: transform ${ANIMATION_TIME}ms, opacity ${ANIMATION_TIME}ms, max-height ${ANIMATION_TIME}ms;
  `,
};

const styles = {
  root: css`
    position: fixed;
    z-index: ${Z_INDEX};
    min-height: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    padding: 10px;
    padding-top: 0;
  `,

  notification: css`
    will-change: transform, opacity, max-height;
    user-select: none;
    flex-shrink: 1;

    &:before {
      content: '';
      display: block;
      height: 10px;
    }
  `,

  container: css`
    padding: 10px 15px;
    border-radius: var(--BORDER_RADIUS_SMALL);
    cursor: pointer;
    box-shadow: var(--ELEVATION_SHADOW_2);
    transition: background-color 0.2s;
  `,

  containerTypes: {
    [ENotificationType.Default]: css`
      color: rgb(var(--TEXT));
      background-color: rgb(var(--BG_TINT));

      &:hover {
        background-color: hsl(var(--BG_TINT_HSL_DARKEN));
      }
    `,
    [ENotificationType.Faded]: css`
      color: rgb(var(--BUTTON_TEXT));
      background-color: rgb(var(--BUTTON_FADED));

      &:hover {
        background-color: hsl(var(--BUTTON_FADED_HSL_DARKEN));
      }
    `,
    [ENotificationType.Accent]: css`
      color: rgb(var(--WHITE));
      background-color: rgb(var(--ACCENT));

      &:hover {
        background-color: hsl(var(--ACCENT_HSL_DARKEN));
      }
    `,
    [ENotificationType.Danger]: css`
      color: rgb(var(--WHITE));
      background-color: rgb(var(--ERROR));

      &:hover {
        background-color: hsl(var(--ERROR_HSL_DARKEN));
      }
    `,
    [ENotificationType.Success]: css`
      color: rgb(var(--WHITE));
      background-color: rgb(var(--SUCCESS));

      &:hover {
        background-color: hsl(var(--SUCCESS_HSL_DARKEN));
      }
    `,
  },

  title: css`
    font-weight: 600;
    opacity: 0.75;
  `,

  body: css``,
};
