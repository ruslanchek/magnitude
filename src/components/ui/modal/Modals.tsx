/** @jsx jsx */
import { jsx, css, ClassNames } from '@emotion/core';
import React, { useRef, useState, useCallback, useMemo, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { usePortal } from '../../../hooks/usePortal';
import { useOnClickOutside } from '../../../hooks/useOnClickOutside';

interface IProps {
  rootContainerSelector: string;
}

interface IModal {
  id: number;
  showOverlay: boolean;
  closeByEscapeKey: boolean;
  closeByEnterKey: boolean;
  closeByOutsideClick: boolean;
  onDidClose: () => void;
  onDidOpen: () => void;
  onWillClose: () => void;
  onWillOpen: (modalId: number) => void;
  renderModalComponent: (modalId: number) => React.ReactNode | Element;
  isOpened: boolean;
}

interface IModalOptions {
  renderModalComponent: (modalId: number) => React.ReactNode | Element;
  showOverlay?: boolean;
  closeByEscapeKey?: boolean;
  closeByEnterKey?: boolean;
  closeByOutsideClick?: boolean;
  onDidClose?: () => void;
  onDidOpen?: () => void;
  onWillClose?: () => void;
  onWillOpen?: (modalId: number) => void;
}

const ANIMATION_TIME: number = 100;
const BASE_Z: number = 1000;

export interface IModalContext {
  openModal: (options: IModalOptions) => number;
  closeModal: (modalId: number) => void;
  closeAllModals: () => void;
  isOpened: (modalId: number) => boolean;
}

export const ModalsContext = React.createContext<IModalContext>({
  openModal: () => 0,
  closeModal: () => {},
  closeAllModals: () => {},
  isOpened: () => false,
});

export const Modals: React.FC<IProps> = props => {
  const { rootContainerSelector, children } = props;
  const modalsRef = useRef(new Map<number, IModal>());
  const topModalIdRef = useRef<number | null>(null);
  const root = usePortal(rootContainerSelector);
  const currentModalRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = () => {
    if (!topModalIdRef.current) {
      return;
    }

    const modal = modalsRef.current.get(topModalIdRef.current);

    if (modal?.closeByOutsideClick) {
      closeModal(topModalIdRef.current);
    }
  };

  useOnClickOutside(currentModalRef, handleOutsideClick);

  /**
   * Utilitary timestamp to force re-renders due to update the notifications Map ref.
   * Used to strict component re-rendering manually.
   */
  const [update, setUpdate] = useState(Date.now());

  const isShowOverlay = useMemo(() => {
    let isAnyModalOpened = false;
    let showOverlay = false;

    modalsRef.current.forEach(modal => {
      if (modal.showOverlay) {
        showOverlay = true;
      }

      if (modal.isOpened) {
        isAnyModalOpened = true;
      }
    });

    if (!isAnyModalOpened) {
      showOverlay = false;
    }

    return showOverlay;
  }, [update]);

  const isOpened = useCallback((modalId: number) => {
    const modal = modalsRef.current.get(modalId);
    return !!modal?.isOpened;
  }, []);

  const closeAllModals = useCallback(() => {
    modalsRef.current.forEach(modal => {
      modal.onWillClose();
      modal.isOpened = false;
    });

    setUpdate(Date.now());

    requestAnimationFrame(() => {
      setTimeout(() => {
        modalsRef.current = new Map();
        setUpdate(Date.now());
      }, ANIMATION_TIME);
    });
  }, []);

  const closeModal = useCallback((id: number) => {
    const modal = modalsRef.current.get(id);

    if (modal) {
      requestAnimationFrame(() => {
        modal.onWillClose();
        modal.isOpened = false;
        setUpdate(Date.now());
        setTimeout(() => {
          modalsRef.current.delete(id);
          setUpdate(Date.now());
        }, ANIMATION_TIME);
      });
    }
  }, []);

  const openModal = useCallback((options: IModalOptions): number => {
    const id = Date.now();
    const {
      renderModalComponent,
      closeByEscapeKey = true,
      closeByEnterKey = false,
      closeByOutsideClick = true,
      showOverlay = true,
      onDidClose = () => {},
      onDidOpen = () => {},
      onWillClose = () => {},
      onWillOpen = () => {},
    } = options;

    modalsRef.current.set(id, {
      id,
      renderModalComponent,
      showOverlay,
      closeByEscapeKey,
      closeByEnterKey,
      closeByOutsideClick,
      onDidClose,
      onDidOpen,
      onWillClose,
      onWillOpen,
      isOpened: false,
    });

    setUpdate(Date.now());

    const modal = modalsRef.current.get(id);

    if (modal) {
      topModalIdRef.current = id;

      requestAnimationFrame(() => {
        modal.onWillOpen(id);
        modal.isOpened = true;
        setUpdate(Date.now());
      });
    }

    return id;
  }, []);

  const handleOnExitedAnimation = useCallback((modal: IModal) => {
    modal.onDidClose();
    modalsRef.current.delete(modal.id);

    if (modalsRef.current.size > 0) {
      topModalIdRef.current = Array.from(modalsRef.current.values()).sort((a, b) => b.id - a.id)[0].id;
    } else {
      topModalIdRef.current = null;
    }

    setUpdate(Date.now());
  }, []);

  const handleKeyUp = (e: KeyboardEvent) => {
    if (topModalIdRef.current !== null) {
      const modal = modalsRef.current.get(topModalIdRef.current);

      if (modal) {
        switch (e.keyCode) {
          // ESC
          case 27: {
            if (modal?.closeByEscapeKey) {
              closeModal(topModalIdRef.current);
            }

            break;
          }

          // Return
          case 13: {
            if (modal?.closeByEnterKey) {
              closeModal(topModalIdRef.current);
            }

            break;
          }
        }
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keyup', handleKeyUp, false);

    return () => {
      document.removeEventListener('keyup', handleKeyUp, false);
    };
  }, []);

  if (root) {
    return (
      <ModalsContext.Provider
        value={{
          closeModal,
          openModal,
          closeAllModals,
          isOpened,
        }}>
        {children}
        {ReactDOM.createPortal(
          <ClassNames>
            {({ css }) => {
              return (
                <React.Fragment>
                  <div ref={currentModalRef}>
                    {Array.from(modalsRef.current.values()).map((modal, i) => {
                      return (
                        <CSSTransition
                          key={modal.id}
                          timeout={ANIMATION_TIME}
                          in={modal.isOpened}
                          unmountOnExit
                          onExited={() => handleOnExitedAnimation(modal)}
                          onEntered={() => {
                            modal.onDidOpen();
                          }}
                          classNames={{
                            enter: css(animationsModal.enter),
                            enterActive: css(animationsModal.enterActive),
                            exit: css(animationsModal.exit),
                            exitActive: css(animationsModal.exitActive),
                          }}>
                          <div
                            css={[
                              styles.modal,
                              {
                                zIndex: BASE_Z + 1 + i,
                              },
                            ]}>
                            {modal.renderModalComponent(modal.id)}
                          </div>
                        </CSSTransition>
                      );
                    })}
                  </div>

                  <CSSTransition
                    timeout={ANIMATION_TIME}
                    in={isShowOverlay}
                    unmountOnExit
                    classNames={{
                      enter: css(animationsOverlay.enter),
                      enterActive: css(animationsOverlay.enterActive),
                      exit: css(animationsOverlay.exit),
                      exitActive: css(animationsOverlay.exitActive),
                    }}>
                    <div
                      css={[
                        styles.overlay,
                        {
                          zIndex: BASE_Z,
                        },
                      ]}
                    />
                  </CSSTransition>
                </React.Fragment>
              );
            }}
          </ClassNames>,
          root,
        )}
      </ModalsContext.Provider>
    );
  } else {
    return null;
  }
};

const animationsOverlay = {
  enter: css`
    opacity: 0;
  `,
  enterActive: css`
    opacity: 1;
    transition: opacity ${ANIMATION_TIME}ms;
  `,
  exit: css`
    opacity: 1;
  `,
  exitActive: css`
    opacity: 0;
    transition: opacity ${ANIMATION_TIME}ms;
  `,
};

const animationsModal = {
  enter: css`
    opacity: 0;
    transform: translate(-50%, -46%) !important;
  `,
  enterActive: css`
    opacity: 1;
    transform: translate(-50%, -50%) !important;
    transition: transform ${ANIMATION_TIME}ms, opacity ${ANIMATION_TIME}ms;
  `,
  exit: css`
    opacity: 1;
    transform: translate(-50%, -50%) !important;
  `,
  exitActive: css`
    opacity: 0;
    transform: translate(-50%, -46%) !important;
    transition: transform ${ANIMATION_TIME}ms, opacity ${ANIMATION_TIME}ms;
  `,
};

const styles = {
  root: css``,

  modal: css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transform-origin: 0;
    will-change: transform, opacity;
  `,

  overlay: css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(var(--TEXT), 0.5);
    will-change: opacity;
  `,
};
