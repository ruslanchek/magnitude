/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React, { CSSProperties, useEffect, useRef, useCallback, useMemo } from 'react';
import { Scrollbars } from 'eo-react-custom-scrollbars';
import { useDetectedScrollbarWidth } from '../../../hooks/useDetectedScrollbarWidth';

interface ICustomScrollbarsScrollFrameInfo {
  clientHeight: number;
  clientWidth: number;
  left: number;
  scrollHeight: number;
  scrollLeft: number;
  scrollTop: number;
  scrollWidth: number;
  top: number;
}

interface IProps {
  style?: CSSProperties;
  useNative?: boolean;
  forwardedRef?: any;
  onScroll?: React.UIEventHandler<any>;
  scrollTop?: number;
  scrollLeft?: number;
  scrollToBottomAtMount?: boolean;
  onScrollStart?: () => void;
  onScrollFrame?: (info: ICustomScrollbarsScrollFrameInfo) => void;
  onScrollStop?: () => void;
}

export const CustomScrollbars: React.FC<IProps> = props => {
  const {
    children,
    style,
    forwardedRef,
    onScroll,
    onScrollStart,
    onScrollFrame,
    onScrollStop,
    scrollLeft,
    scrollTop,
    scrollToBottomAtMount,
  } = props;
  const scrollbarsRef = useRef<Scrollbars>(null);
  const scrollbarsNativeRef = useRef<HTMLDivElement>(null);
  const detectedScrollbarWidth = useDetectedScrollbarWidth([scrollbarsRef, scrollbarsNativeRef]);
  let { useNative: useNativeProps } = props;

  const [scrollbarWidth, useNative] = useMemo(() => {
    let scrollbarWidth = 1;
    let useNative = useNativeProps;

    if (detectedScrollbarWidth === undefined) {
      useNative = true;
    } else {
      scrollbarWidth = detectedScrollbarWidth || 20;
    }

    return [scrollbarWidth, useNative];
  }, [detectedScrollbarWidth, useNativeProps]);

  useEffect(() => {
    if (!forwardedRef) {
      if (useNative) {
        if (scrollbarsNativeRef && scrollbarsNativeRef.current) {
          let { scrollTop: top, scrollLeft: left } = scrollbarsNativeRef.current;

          if (!scrollLeft && !scrollTop) {
            return;
          } else if (scrollLeft && scrollTop) {
            top = scrollTop;
            left = scrollLeft;
          } else if (!scrollLeft && scrollTop) {
            top = scrollTop;
          } else if (scrollLeft && !scrollTop) {
            left = scrollLeft;
          }

          scrollbarsNativeRef.current.scrollTo({
            top,
            left,
          });
        }
      } else {
        if (scrollbarsRef && scrollbarsRef.current) {
          if (scrollLeft) {
            scrollbarsRef.current.scrollLeft(scrollLeft);
          }

          if (scrollTop) {
            scrollbarsRef.current.scrollTop(scrollTop);
          }

          if (scrollToBottomAtMount) {
            scrollbarsRef.current.scrollToBottom();
          }
        }
      }
    }
  }, [useNative, forwardedRef, scrollLeft, scrollTop, scrollToBottomAtMount]);

  const refSetter = useCallback(
    scrollbarsRef => {
      let view = null;

      if (useNative && scrollbarsRef) {
        view = scrollbarsRef;
      } else if (scrollbarsRef && scrollbarsRef.view) {
        view = scrollbarsRef.view;
      }

      forwardedRef(view);
    },
    [forwardedRef, useNative],
  );

  if (useNative) {
    return (
      <div
        onScroll={onScroll ? onScroll : () => {}}
        css={styles.rootNative}
        style={{ ...style }}
        ref={forwardedRef ? refSetter : scrollbarsNativeRef}>
        {children}
      </div>
    );
  } else {
    const viewStyles = css`
      margin: 0 -${scrollbarWidth}px -${scrollbarWidth}px 0;
    `;

    let viewInnerStyles = null;

    if (detectedScrollbarWidth === 0) {
      viewInnerStyles = css`
        position: relative;
        margin-top: ${scrollbarWidth}px;
        right: ${scrollbarWidth}px;
        bottom: ${scrollbarWidth}px;
        width: calc(100% - ${scrollbarWidth}px);
        left: 0;
      `;
    }

    return (
      <Scrollbars
        ref={forwardedRef ? refSetter : scrollbarsRef}
        css={styles.root}
        scrollbarWidth={scrollbarWidth}
        style={{ ...props.style }}
        onScroll={onScroll ? onScroll : () => {}}
        onScrollStart={onScrollStart ? onScrollStart : () => {}}
        onScrollFrame={onScrollFrame ? onScrollFrame : () => {}}
        onScrollStop={onScrollStop ? onScrollStop : () => {}}
        renderView={style => <div css={[styles.view, viewStyles]} style={style} />}
        renderTrackVertical={style => <div css={styles.trackVertical} style={style} />}
        renderThumbVertical={style => <div css={styles.thumbVertical} style={style} />}
        renderTrackHorizontal={style => <div css={styles.trackHorizontal} style={style} />}
        renderThumbHorizontal={style => <div css={styles.thumbHorizontal} style={style} />}>
        <div css={viewInnerStyles}>{children}</div>
      </Scrollbars>
    );
  }
};

CustomScrollbars.defaultProps = {
  useNative: false,
  forwardedRef: null,
  scrollLeft: 0,
  scrollTop: 0,
  scrollToBottomAtMount: false,
};

const styles = {
  root: css`
    overflow: hidden !important;
  `,

  rootNative: css`
    overflow: auto;
    height: 100%;
    width: 100%;
  `,

  view: css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: scroll;
  `,

  trackVertical: css`
    position: absolute;
    width: 7px;
    border-radius: 3px;
    box-sizing: border-box;
    left: auto;
    right: 2px;
    top: 3px;
    bottom: 3px;
    height: calc(100% - 6px);
  `,

  thumbVertical: css`
    background-color: rgba(var(--SCROLLBAR_THUMB), 0.35);
    width: var(--SCROLLBAR_TRACK_SIZE);
    height: 0;
    margin: 0 auto;
    border-radius: 3px;
    transition: transform 0.1s, background-color 0.1s, height 0.1s;
    cursor: pointer;

    &:hover,
    &:active {
      background-color: rgba(var(--SCROLLBAR_THUMB_HOVER), 0.7);
      width: 7px;
      border-radius: 5px;
    }
  `,

  trackHorizontal: css`
    position: absolute;
    border-radius: 3px;
    box-sizing: border-box;
    left: 3px;
    right: 3px;
    top: auto;
    bottom: 2px;
    width: calc(100% - 6px);
    height: 7px;
  `,

  thumbHorizontal: css`
    background-color: rgba(var(--SCROLLBAR_THUMB), 0.35);
    width: 0;
    height: var(--SCROLLBAR_TRACK_SIZE);
    margin: auto 0;
    border-radius: 3px;
    transition: transform 0.1s, background-color 0.1s, height 0.1s;
    cursor: pointer;

    &:hover,
    &:active {
      background-color: rgba(var(--SCROLLBAR_THUMB_HOVER), 0.7);
      height: 7px;
      border-radius: 5px;
    }
  `,
};
