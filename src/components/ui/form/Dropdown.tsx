/** @jsx jsx */
import { ClassNames, css, jsx } from '@emotion/core';
import React, { ChangeEvent, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { ActivityIndicator } from '../loading/ActivityIndicator';
import { FormContext } from './Form';
import { InputErrors } from './InputErrors';
import { FormValidatorSelected } from './validators/FormValidator';
import { VirtualList } from '../list/VirtualList';
import { useCssVariableNumber } from '../../../hooks/useCssVariableNumber';
import { FiChevronDown, FiX } from 'react-icons/fi';

const MAX_ITEMS_DEFAULT = 7;
const ANIMATION_TIME = 300;
const FAST_SEARCH_TIMEOUT = 1000;

type TSize = 'small' | 'large' | undefined;

interface IProps<T> {
  items: IDropdownItem<T>[];
  value: string | undefined;
  name: string;
  onSelect: (item: IDropdownItem<T> | undefined) => void;
  renderItemPreContent?: (item: IDropdownItem<T>) => React.ReactNode;
  renderItemPostContent?: (item: IDropdownItem<T>) => React.ReactNode;
  renderItemContent?: (item: IDropdownItem<T>) => React.ReactNode;
  validator?: FormValidatorSelected;
  tabIndex?: number;
  placeholder?: string;
  size?: TSize;
  search?: boolean;
  maxItems?: number;
  loading?: boolean;
  loadingPlaceholder?: string;
  searchPlaceholder?: string;
}

interface IDropdownItemIndexed<T> extends IDropdownItem<T> {
  index: number;
}

export interface IDropdownItem<T = any> {
  title: string;
  value: string;
  disabled?: boolean;
  data: T;
}

const Placeholder: React.FC = ({ children }) => {
  return <div css={styles.placeholder}>{children}</div>;
};

const Loading: React.FC = ({ children }) => {
  return (
    <div css={styles.placeholder}>
      <div css={styles.loading}>
        <ActivityIndicator size='small' color={'rgb(var(--TEXT_FADED))'} />
      </div>
      {children}
    </div>
  );
};

export function Dropdown<T = any>(props: IProps<T>) {
  const {
    items,
    value,
    name,
    onSelect,
    renderItemPreContent,
    renderItemPostContent,
    renderItemContent,
    validator,
    tabIndex,
    placeholder,
    size = 'large',
    search,
    maxItems = MAX_ITEMS_DEFAULT,
    loading,
    loadingPlaceholder,
    searchPlaceholder,
  } = props;

  const [mappedItems, setMappedItems] = useState(new Map<string, IDropdownItemIndexed<T>>());
  const [currentItem, setCurrentItem] = useState<IDropdownItemIndexed<T> | undefined>(undefined);
  const [highlightedItem, setHighlightedItem] = useState<IDropdownItemIndexed<T> | undefined>(undefined);
  const [currentScrollingIndex, setCurrentScrollingIndex] = useState<number | undefined>(undefined);
  const [fastSearchValue, setFastSearchValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [isOpened, setIsOpened] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [rowHeightCalculated, setRowHeightCalculated] = useState(0);

  const isAnimatingRef = useRef(false);
  const isMouseDownRef = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const dropdownRootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const fastSearchTimeoutRef = useRef<number>(0);
  const itemsArray = Array.from(mappedItems.values());

  const maxItemsCounted = useMemo(() => {
    let value = maxItems;

    if (maxItems) {
      if (mappedItems.size < maxItems) {
        value = mappedItems.size;
      }
    } else {
      value = MAX_ITEMS_DEFAULT;
    }

    return value;
  }, [maxItems, mappedItems]);

  const mapItems = (items: IDropdownItem<T>[]) => {
    const map = new Map<string, IDropdownItemIndexed<T>>();

    items.forEach((item, index) => {
      map.set(item.value, {
        ...item,
        index,
      });
    });

    return map;
  };

  const formContext = useContext(FormContext);
  const errors = formContext.getFieldErrors(name);
  const sizeVarName = size === 'large' ? '--INPUT_HEIGHT_LARGE' : '--INPUT_HEIGHT_SMALL';
  const rowHeight = useCssVariableNumber(sizeVarName, [sizeVarName, isOpened]);
  const dropdownHeight = maxItemsCounted * rowHeight;

  let highlightedItemIndex: number | undefined = undefined;
  let currentItemIndex: number | undefined = undefined;

  if (currentItem) {
    currentItemIndex = currentItem.index;
  }

  if (highlightedItem) {
    highlightedItemIndex = highlightedItem.index;
  }

  const open = () => {
    if (loading) {
      return;
    }

    setIsOpened(true);

    if (dropdownRootRef.current) {
      dropdownRootRef.current.focus();
    }

    document.addEventListener('mousedown', handleOutsideClick, false);
  };

  const close = (focused: boolean) => {
    isAnimatingRef.current = true;

    setIsOpened(false);
    setIsFocused(focused);
    setSearchValue('');

    if (focused && rootRef.current) {
      rootRef.current.focus();
    }

    document.removeEventListener('mousedown', handleOutsideClick, false);
  };

  const searchItem = useCallback(
    (string: string): IDropdownItemIndexed<T> | undefined => {
      const searchValue = string.toLowerCase().trim();
      let foundItem: IDropdownItemIndexed<T> | undefined = undefined;

      for (let i = 0, l = items.length; i < l; i++) {
        if (items[i].title.substr(0, searchValue.length).toLowerCase() === searchValue) {
          foundItem = mappedItems.get(items[i].value);
          break;
        }
      }

      return foundItem;
    },
    [items, mappedItems],
  );

  const deleteFastSearchSymbol = useCallback(() => {
    setFastSearchValue(fastSearchValue.substr(0, fastSearchValue.length - 2));
  }, [fastSearchValue, fastSearchTimeoutRef]);

  const addFastSearchSymbol = useCallback(
    (symbol: string, select: boolean) => {
      const value = `${fastSearchValue}${symbol}`.trim();

      if (!value) {
        setFastSearchValue('');
        return;
      }

      setFastSearchValue(value);

      const foundItem = searchItem(value);

      if (foundItem) {
        setHighlightedItem(foundItem);
        setCurrentScrollingIndex(foundItem.index);

        if (select) {
          handleChange(foundItem);
        }
      }
    },
    [fastSearchValue, fastSearchTimeoutRef],
  );

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const foundItem = searchItem(value);

    setSearchValue(value);

    if (foundItem) {
      setHighlightedItem(foundItem);
      setCurrentScrollingIndex(foundItem.index);
    }
  };

  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent) => {
      if (!isFocused) {
        return;
      }

      if (search && isOpened) {
      } else {
        const charTyped = String.fromCharCode(event.which);

        if (charTyped && isOpened) {
          addFastSearchSymbol(charTyped, false);
        } else if (charTyped && !isOpened) {
          addFastSearchSymbol(charTyped, true);
        }
      }
    },
    [isFocused, addFastSearchSymbol, addFastSearchSymbol],
  );

  const handleKeydown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const intractableItem = highlightedItem || currentItem;

    switch (event.keyCode) {
      // Space
      case 32: {
        if (searchValue) {
          return false;
        }

        if (!isOpened) {
          open();
          setHighlightedItem(currentItem || mappedItems.values().next().value);
        } else {
          close(true);
        }

        break;
      }

      // Up
      case 38: {
        if (isOpened && intractableItem) {
          setHighlightedItem(getPrevItem(intractableItem));
          event.stopPropagation();
          event.preventDefault();

          if (intractableItem.index - 1 >= 0) {
            setCurrentScrollingIndex(intractableItem.index - 1);
          }
        } else {
          open();
          setHighlightedItem(currentItem || mappedItems.values().next().value);
        }

        break;
      }

      // Down
      case 40: {
        if (isOpened && intractableItem) {
          setHighlightedItem(getNextItem(intractableItem));
          event.stopPropagation();
          event.preventDefault();

          if (intractableItem.index + 1 < mappedItems.size) {
            setCurrentScrollingIndex(intractableItem.index + 1);
          }
        } else {
          open();
          setHighlightedItem(currentItem || mappedItems.values().next().value);
        }

        break;
      }

      // Backspace
      case 8: {
        if (searchValue) {
          return false;
        }

        deleteFastSearchSymbol();
        break;
      }

      // Enter
      case 13: {
        if (isOpened) {
          if (highlightedItem) {
            if (highlightedItem.disabled) {
              return;
            }

            handleChange(highlightedItem);
          }

          close(true);
        } else {
          // TODO: Maybe this is not correct
          open();
          setHighlightedItem(currentItem || mappedItems.values().next().value);
        }

        break;
      }
    }
  };

  const handleMouseEnter = () => {
    setShowErrors(true);
  };

  const handleMouseLeave = () => {
    setShowErrors(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
    formContext.clearFieldValidation(name);
  };

  const handleBlur = () => {
    setIsFocused(false);

    if (isMouseDownRef.current) {
      return;
    }

    close(false);
  };

  const handleOutsideClick = () => {
    if (isMouseDownRef.current) {
      return;
    }

    close(false);
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isOpened) {
      close(false);
    } else {
      if (loading) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      open();
    }
  };

  const handleDropdownRootMouseDown = () => {
    isMouseDownRef.current = true;
  };

  const handleDropdownRootMouseUp = () => {
    isMouseDownRef.current = false;
  };

  const handleChange = (item: IDropdownItemIndexed<T>) => {
    if (item.disabled) {
      return;
    }

    setCurrentItem(item);
    setContextValue(item);
    onSelect(item ? item : undefined);
  };

  const getItemByValue = (value: string | undefined): IDropdownItemIndexed<T> | undefined => {
    return mappedItems.get(value || '');
  };

  const getPrevItem = (item: IDropdownItemIndexed<T>) => {
    const itemsArray = Array.from(mappedItems.values());
    const nextItem = itemsArray[item.index - 1];

    if (nextItem) {
      return nextItem;
    }

    return item;
  };

  const getNextItem = (item: IDropdownItemIndexed<T>) => {
    const itemsArray = Array.from(mappedItems.values());
    const nextItem = itemsArray[item.index + 1];

    if (nextItem) {
      return nextItem;
    }

    return item;
  };

  const setContextValue = (item: IDropdownItem<T> | undefined) => {
    let value: string | undefined = undefined;

    if (item) {
      value = item.value;
    }

    formContext.setModelFieldValue(name, value, item);
  };

  const renderItem = (item: IDropdownItem<T>) => {
    return (
      <div
        css={[
          styles.item,
          item.disabled ? styles.itemDisabled : null,
          css`
            height: var(${sizeVarName});
          `,
        ]}>
        {renderItemPreContent && renderItemPreContent(item)}
        {renderItemContent ? renderItemContent(item) : <div css={styles.itemContent}>{item.title}</div>}
        {renderItemPostContent && renderItemPostContent(item)}
      </div>
    );
  };

  useEffect(() => {
    const item = getItemByValue(value);

    setCurrentItem(item);
    setRowHeightCalculated(rootRef.current ? rootRef.current.clientHeight : 0);
    setContextValue(item);

    if (item) {
      setCurrentScrollingIndex(item.index);
    }

    if (validator) {
      formContext.setModelFieldValidator(name, [validator]);
    }
  }, [value, rootRef, validator, formContext]);

  useEffect(() => {
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick, false);
    };
  }, [handleOutsideClick]);

  useEffect(() => {
    setMappedItems(mapItems(items));
  }, [items]);

  useEffect(() => {
    if (mappedItems.size > 0) {
      const currentItem = getItemByValue(value);
      setCurrentItem(currentItem);
      setContextValue(currentItem);

      if (!isOpened && !isAnimatingRef.current && currentItem) {
        setCurrentScrollingIndex(currentItem.index);
      }
    }
  }, [value, mappedItems]);

  useEffect(() => {
    fastSearchTimeoutRef.current = window.setTimeout(() => {
      setFastSearchValue('');
    }, FAST_SEARCH_TIMEOUT);

    return () => {
      clearTimeout(fastSearchTimeoutRef.current);
    };
  }, [fastSearchValue]);

  return (
    <div
      ref={rootRef}
      id={name}
      css={styles.root}
      tabIndex={tabIndex || 0}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeydown}
      onKeyPress={handleKeyPress}>
      {errors.length > 0 && (
        <InputErrors
          show={showErrors}
          errors={errors}
          onDismiss={() => {
            formContext.clearFieldValidation(name);
          }}
        />
      )}

      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        css={[
          styles.currentRoot,
          css`
            height: var(${sizeVarName});
          `,
        ]}
        className={`${isOpened ? 'opened' : ''} ${isFocused ? 'focused' : ''} ${errors.length > 0 ? 'error' : ''}`}>
        {loading ? (
          <Loading>{loadingPlaceholder}</Loading>
        ) : currentItem ? (
          renderItem(currentItem)
        ) : (
          <Placeholder>{placeholder}</Placeholder>
        )}

        <FiChevronDown
          css={[
            styles.arrow,
            css`
              color: rgb(var(--TEXT_FADED));
            `,
          ]}
        />
      </div>

      <div
        ref={dropdownRootRef}
        css={styles.dropdownRoot}
        onMouseDown={handleDropdownRootMouseDown}
        onMouseUp={handleDropdownRootMouseUp}>
        <ClassNames>
          {({ css }) => (
            <CSSTransition
              unmountOnExit
              appear
              in={isOpened}
              timeout={ANIMATION_TIME}
              classNames={{
                enter: css(animations.enter),
                enterActive: css(animations.enterActive),
                exit: css(animations.exit),
                exitActive: css(animations.exitActive),
              }}
              onEnter={() => {
                isAnimatingRef.current = true;
              }}
              onEntered={() => {
                isAnimatingRef.current = false;
              }}
              onExit={() => {
                isAnimatingRef.current = true;
              }}
              onExited={() => {
                setCurrentScrollingIndex(currentItemIndex);
                setHighlightedItem(undefined);
                isAnimatingRef.current = false;
              }}>
              <div css={styles.dropdownItems}>
                {search && (
                  <div css={styles.searchContainer}>
                    <input
                      ref={searchRef}
                      css={styles.search}
                      tabIndex={-1}
                      contentEditable
                      placeholder={searchPlaceholder}
                      value={searchValue}
                      onChange={handleSearchChange}
                    />
                    <i
                      css={styles.searchClear}
                      className={searchValue ? 'active' : ''}
                      onClick={() => {
                        setSearchValue('');
                      }}>
                      <FiX
                        css={[
                          css`
                            color: rgb(var(--TEXT_FADED));
                          `,
                        ]}
                      />
                    </i>
                  </div>
                )}

                <VirtualList<IDropdownItemIndexed<T>>
                  dataList={itemsArray}
                  height={dropdownHeight}
                  width='100%'
                  scrollToIndex={currentScrollingIndex}
                  itemHeight={rowHeightCalculated}
                  renderRow={(itemData, index) => {
                    return (
                      <div
                        css={styles.itemRow}
                        className={
                          (currentItemIndex === index ? 'selected' : '') +
                          (highlightedItemIndex === index ? ' highlighted' : '')
                        }
                        onClick={() => {
                          if (!itemData.disabled) {
                            close(false);
                            handleChange(itemData);
                          }
                        }}
                        key={index}>
                        {renderItem(itemData)}
                      </div>
                    );
                  }}
                />
              </div>
            </CSSTransition>
          )}
        </ClassNames>
      </div>
    </div>
  );
}

const styles = {
  root: css`
    display: flex;
    flex-grow: 1;
    position: relative;
    outline: none;
    user-select: none;
  `,

  arrow: css`
    position: absolute;
    right: var(--INPUT_SIDE_PADDING);
    top: calc(50% - 5px);
    pointer-events: none;
    transform: rotateX(0);
    transition: transform ${ANIMATION_TIME}ms;

    &.active {
      transform: rotateX(180deg);
    }
  `,

  search: css`
    padding: 8px var(--INPUT_SIDE_PADDING);
    flex-grow: 1;
    font-family: var(--FONT_FAMILY);
    font-size: 14px;
    color: rgb(var(--TEXT_ACCENT));
    border: none;
    background-color: transparent;
    outline: none;
    -webkit-appearance: none;
    box-sizing: border-box;
    display: flex;
  `,

  searchContainer: css`
    display: flex;
    border-bottom: 1px solid rgb(var(--INPUT_BORDER_ACCENT));
    background-color: rgb(var(--INPUT_BG));
    align-items: center;
  `,

  searchClear: css`
    width: 23px;
    height: 20px;
    flex-shrink: 0;
    margin-right: 0;
    transform-origin: 25%;
    transition: transform 0.2s, opacity 0.2s;
    opacity: 0;
    transform: scale(0);
    cursor: pointer;
    justify-content: center;
    align-items: center;

    &.active {
      opacity: 0.75;
      transform: scale(1);

      &:hover {
        opacity: 1;
      }
    }
  `,

  itemRow: css`
    &.selected {
      background-color: rgb(var(--INPUT_BG_ACTIVE));
    }

    &:hover,
    &.highlighted {
      background-color: rgb(var(--INPUT_BG_ACCENT));
    }
  `,

  item: css`
    flex-grow: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 var(--INPUT_SIDE_PADDING);
    color: rgb(var(--TEXT_ACCENT));
    cursor: pointer;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
  `,

  itemDisabled: css`
    opacity: 0.33;
    pointer-events: none;
  `,

  loading: css`
    flex-grow: 0;
    flex-shrink: 0;
    margin-right: 8px;
  `,

  placeholder: css`
    flex-shrink: 1;
    justify-content: flex-start;
    align-items: center;
    margin: 0 var(--INPUT_SIDE_PADDING);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: flex;
    color: rgb(var(--TEXT_FADED));
  `,

  itemContent: css`
    display: block;
    flex-grow: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,

  dropdownRoot: css`
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 100;
  `,

  dropdownItems: css`
    background-color: rgb(var(--INPUT_BG));
    border: 1px solid rgb(var(--INPUT_BORDER_ACCENT));
    box-sizing: border-box;
    border-top: none;
    box-shadow: var(--ELEVATION_SHADOW_3);
    border-radius: 0 0 var(--BORDER_RADIUS_SMALL) var(--BORDER_RADIUS_SMALL);
    overflow: hidden;
    outline: none;
  `,

  currentRoot: css`
    display: flex;
    flex-grow: 1;
    padding-right: 24px;
    flex: auto;
    align-items: center;
    background-color: rgb(var(--INPUT_BG));
    border: 1px solid rgb(var(--ELEMENT_BORDER));
    border-radius: var(--BORDER_RADIUS_SMALL);
    box-sizing: border-box;
    width: 100%;
    cursor: pointer;
    transition: border-color 0.2s, border-radius ${ANIMATION_TIME}ms;

    &:hover {
      border-color: rgb(var(--INPUT_BORDER_ACCENT));
    }

    &.focused {
      border-color: rgb(var(--INPUT_BORDER_ACTIVE));
    }

    &.opened {
      border-color: rgb(var(--INPUT_BORDER_ACCENT));
      border-radius: var(--BORDER_RADIUS_SMALL) var(--BORDER_RADIUS_SMALL) 0 0;
    }

    &.error {
      border-color: rgb(var(--INPUT_BORDER_ERROR));
    }
  `,
};

const animations = {
  enter: css`
    opacity: 0;
  `,
  enterActive: css`
    opacity: 1;
    transition-duration: ${ANIMATION_TIME}ms;
  `,
  exit: css`
    opacity: 1;
  `,
  exitActive: css`
    opacity: 0;
    transition-duration: ${ANIMATION_TIME}ms;
  `,
};
