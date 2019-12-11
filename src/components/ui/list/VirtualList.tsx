/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { CSSProperties, memo, useRef, useEffect, useCallback } from 'react';
import { FixedSizeList, Align } from 'react-window';
import { CustomScrollbars } from '../scrollbars/CustomScrollbars';

interface IProps<TItemData> {
  dataList: TItemData[];
  height: number;
  width: string;
  itemHeight: number;
  renderRow: TRenderRowFunction<TItemData>;
  scrollToIndex?: number;
  onScroll?: () => void;
}

type TRenderRowFunction<TItemData> = (itemData: TItemData, index: number) => React.ReactNode;

interface IListRowDataProps<TItemData> {
  dataList: TItemData[];
  renderRow: (itemData: TItemData, index: number) => React.ReactNode;
}

interface IListRowProps<TItemData> {
  data: IListRowDataProps<TItemData>;
  index: number;
  style: CSSProperties;
}

const CustomScrollbarsVirtualList = React.forwardRef((props, ref) => (
  <CustomScrollbars {...props} forwardedRef={ref} />
));

export function VirtualList<TItemData>(props: IProps<TItemData>) {
  const { dataList, height, width, itemHeight, renderRow, scrollToIndex, onScroll = () => {} } = props;

  const listRef = useRef<FixedSizeList>(null);
  const createItemData = useCallback(
    (dataList: TItemData[], renderRow: TRenderRowFunction<TItemData>) => ({
      dataList,
      renderRow,
    }),
    [],
  );

  const row = useRef(
    memo((props: IListRowProps<TItemData>) => {
      return (
        <div style={props.style} key={props.index}>
          {props.data.renderRow(props.data.dataList[props.index], props.index)}
        </div>
      );
    }),
  );

  const scrollTo = (scrollToIndex: number | undefined, method: Align) => {
    if (listRef.current && scrollToIndex && scrollToIndex >= 0) {
      listRef.current.scrollToItem(scrollToIndex, method);
    }
  };

  useEffect(() => {
    if (Number(scrollToIndex) >= 0) {
      scrollTo(scrollToIndex, 'smart');
    }
  }, [scrollToIndex]);

  return (
    <FixedSizeList
      height={height}
      itemData={createItemData(dataList, renderRow)}
      onScroll={onScroll}
      itemCount={dataList.length}
      itemSize={itemHeight}
      ref={listRef}
      width={width}
      outerElementType={CustomScrollbarsVirtualList}>
      {row.current}
    </FixedSizeList>
  );
}
