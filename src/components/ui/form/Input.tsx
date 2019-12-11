/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React, { ChangeEvent, useState, useContext, useCallback, useEffect } from 'react';
import { FormContext } from './Form';
import { FormValidator } from './validators/FormValidator';
import { InputErrors } from './InputErrors';

interface IProps {
  name: string;
  value?: string;
  pattern?: string;
  placeholder?: string;
  readOnly?: boolean;
  disabled?: boolean;
  size?: 'small' | 'large';
  type?: 'password' | 'text' | 'number' | 'email' | 'tel' | 'date' | 'datetime' | 'month' | 'search';
  tabIndex?: number;
  autoComplete?: string;
  prefix?: string | React.ReactNode;
  suffix?: string | React.ReactNode;
  validators?: FormValidator[];
  onChange?: (value: string) => void;
}

export const Input: React.FC<IProps> = props => {
  const {
    name,
    value = '',
    pattern,
    placeholder,
    readOnly = false,
    disabled = false,
    size = 'large',
    type = 'text',
    tabIndex = 1,
    autoComplete,
    prefix,
    suffix,
    validators = [],
    onChange = () => {},
  } = props;

  const [localValue, setLocalValue] = useState(value);
  const [showErrors, setShowErrors] = useState(false);
  const formContext = useContext(FormContext);
  const errors = formContext.getFieldErrors(name);

  const setValue = useCallback(
    (newValue: string) => {
      setLocalValue(newValue);
      formContext.setModelFieldValue(name, newValue.toString(), newValue);
    },
    [formContext, name],
  );

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (pattern && !event.target.validity.valid) {
      return;
    }

    setValue(event.target.value);
    formContext.clearFieldValidation(name);
    onChange(event.target.value);
  };

  const handleMouseEnter = () => {
    setShowErrors(true);
  };

  const handleMouseLeave = () => {
    setShowErrors(false);
  };

  useEffect(() => {
    setValue(value || '');

    if (validators) {
      formContext.setModelFieldValidator(name, validators);
    }
  }, []);

  useEffect(() => {
    if (localValue !== value) {
      setValue(value || '');
    }
  }, [value]);

  return (
    <div css={styles.root}>
      {prefix && <div css={[styles.prefix, styles.sizes[size]]}>{prefix}</div>}

      {errors.length > 0 && (
        <InputErrors
          show={showErrors}
          errors={errors}
          onDismiss={() => {
            formContext.clearFieldValidation(name);
          }}
        />
      )}

      <input
        pattern={pattern}
        readOnly={readOnly}
        disabled={disabled}
        placeholder={placeholder}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        name={name}
        tabIndex={tabIndex}
        id={name}
        type={type}
        value={localValue}
        autoComplete={autoComplete}
        className={errors.length > 0 ? 'error' : ''}
        css={[
          styles.input,
          styles.sizes[size],
          prefix ? styles.inputPrefix : null,
          suffix ? styles.inputSuffix : null,
          prefix && suffix ? styles.inputPrefixSuffix : null,
        ]}
        onChange={handleOnChange}
      />

      {suffix && <div css={[styles.suffix, styles.sizes[size]]}>{suffix}</div>}
    </div>
  );
};

const styles = {
  root: css`
    width: 100%;
    position: relative;
    display: flex;
  `,

  prefix: css`
    border: 1px solid rgb(var(--INPUT_BORDER));
    border-right: none;
    box-sizing: border-box;
    padding: 0 var(--INPUT_SIDE_PADDING);
    background-color: rgb(var(--ELEMENT_BG_TINT));
    justify-content: center;
    align-items: center;
    display: flex;
    border-radius: var(--BORDER_RADIUS_SMALL) 0 0 var(--BORDER_RADIUS_SMALL);
    white-space: nowrap;
  `,

  suffix: css`
    border: 1px solid rgb(var(--INPUT_BORDER));
    border-left: none;
    box-sizing: border-box;
    padding: 0 var(--INPUT_SIDE_PADDING);
    background-color: rgb(var(--ELEMENT_BG_TINT));
    justify-content: center;
    align-items: center;
    display: flex;
    border-radius: 0 var(--BORDER_RADIUS_SMALL) var(--BORDER_RADIUS_SMALL) 0;
    white-space: nowrap;
  `,

  input: css`
    width: 100%;
    outline: none;
    -webkit-appearance: none;
    border: 1px solid rgb(var(--INPUT_BORDER));
    background-color: rgb(var(--WHITE));
    border-radius: var(--BORDER_RADIUS_SMALL);
    color: rgb(var(--TEXT));
    font-family: var(--FONT_FAMILY);
    padding: 0 var(--INPUT_SIDE_PADDING);
    box-sizing: border-box;
    text-overflow: ellipsis;
    transition: border-color 0.2s, box-shadow 0.2s;
    box-shadow: none; /* firefox fix for error highlighting */

    &:hover {
      border-color: hsl(var(--INPUT_BORDER_HSL_DARKEN));
    }

    &:focus {
      border-color: rgb(var(--ACCENT));
      box-shadow: 0 0 0 3.5px rgba(var(--ACCENT), 0.2);
    }

    &.error {
      border-color: rgb(var(--ERROR));

      &:focus {
        box-shadow: 0 0 0 3.5px rgba(var(--ERROR), 0.2);
      }
    }

    &:disabled {
      color: rgb(var(--TEXT));
      opacity: 0.5;
      pointer-events: none;
    }
  `,

  inputPrefix: css`
    border-radius: 0 var(--BORDER_RADIUS_SMALL) var(--BORDER_RADIUS_SMALL) 0;
  `,

  inputSuffix: css`
    border-radius: var(--BORDER_RADIUS_SMALL) 0 0 var(--BORDER_RADIUS_SMALL);
  `,

  inputPrefixSuffix: css`
    border-radius: 0;
  `,

  sizes: {
    small: css`
      height: var(--INPUT_HEIGHT_SMALL);
      font-size: var(--FONT_SIZE_BASE);
    `,

    large: css`
      height: var(--INPUT_HEIGHT_LARGE);
      font-size: var(--FONT_SIZE_MEDIUM);
    `,
  },
};
