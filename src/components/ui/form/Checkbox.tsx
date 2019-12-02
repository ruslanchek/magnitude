/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React, { ChangeEvent, useState, useEffect, useCallback, useContext, useRef } from 'react';
import { Label } from '../typographics/Label';
import { FormContext } from './Form';
import { InputErrors } from './InputErrors';
import { FormValidatorChecked } from './validators/FormValidator';

interface IProps {
  name: string;
  label: string | React.ReactNode;
  value: boolean;
  tabIndex?: number;
  type?: 'checkbox' | 'toggler';
  validator?: FormValidatorChecked;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
}

export const Checkbox: React.FC<IProps> = props => {
  const {
    name,
    label,
    value,
    tabIndex = 1,
    type = 'checkbox',
    validator = null,
    disabled = false,
    onChange = () => {},
  } = props;

  const [localValue, setLocalValue] = useState(value);
  const [isFocusMarked, setIsFocusMarked] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const formContext = useContext(FormContext);
  const errors = formContext.getFieldErrors(name);

  const setValue = useCallback(
    (newValue: boolean) => {
      setLocalValue(newValue);
      formContext.setModelFieldValue(name, newValue.toString(), newValue);
    },
    [formContext, name],
  );

  const handleKeyUp = () => {
    setIsFocusMarked(true);
  };

  const handleBlur = () => {
    setIsFocusMarked(false);
  };

  const handleMouseEnter = () => {
    setShowErrors(true);
  };

  const handleMouseLeave = () => {
    setShowErrors(false);
  };

  const hadleFocus = () => {
    formContext.clearFieldValidation(name);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.checked);
    formContext.clearFieldValidation(name);
    onChange(event.target.checked);
  };

  useEffect(() => {
    formContext.setModelFieldValue(name, value.toString(), value);

    if (validator) {
      formContext.setModelFieldValidator(name, [validator]);
    }
  }, []);

  useEffect(() => {
    if (localValue !== value) {
      setValue(value);
    }
  }, [value]);

  return (
    <div css={styles.root}>
      {errors.length > 0 && (
        <InputErrors
          offsetLeft={type === 'checkbox' ? -9.5 : 0}
          show={showErrors}
          errors={errors}
          onDismiss={() => {
            formContext.clearFieldValidation(name);
          }}
        />
      )}

      <Label css={styles.label}>
        <span
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          css={styles.types[type || 'checkbox']}
          className={`${localValue ? 'active' : ''} ${isFocusMarked ? 'focused' : ''} ${
            errors.length > 0 ? 'error' : ''
          } ${disabled ? 'disabled' : ''}`}>
          <i>
            x
          </i>
        </span>
        <input
          disabled={disabled}
          tabIndex={tabIndex}
          ref={input}
          onKeyUp={handleKeyUp}
          checked={localValue}
          onChange={handleChange}
          onFocus={hadleFocus}
          onBlur={handleBlur}
          css={styles.input}
          type='checkbox'
        />
        {label}
      </Label>
    </div>
  );
};

const styles = {
  root: css`
    position: relative;
    display: flex;
  `,

  input: css`
    opacity: 0;
    z-index: -1;
    line-height: 0;
    display: inline;
    position: absolute;
  `,

  label: css`
    margin-bottom: 0;
    display: inline-flex;
    align-items: center;
    user-select: none;
  `,

  types: {
    checkbox: css`
      width: 17px;
      min-width: 17px;
      height: 17px;
      min-height: 17px;
      flex-shrink: 0;
      border-radius: var(--BORDER_RADIUS_TINY);
      background-color: rgb(var(--INPUT_BG));
      border: 1px solid rgb(var(--ELEMENT_BORDER));
      box-sizing: border-box;
      top: -1px;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: border-color 0.2s, box-shadow 0.2s;
      margin-right: 1.25ex;
      cursor: pointer;
      position: relative;
      box-shadow: 0 0 0 0 rgba(var(--BUTTON_DEFAULT), 0), 0 0 10px rgba(var(--INPUT_BORDER_ACCENT), 0);

      > i {
        position: relative;
        top: 2px;
        transition: opacity 0.2s, transform 0.2s;
        transform: scale(0);
        opacity: 0;
      }

      &:hover {
        border-color: rgb(var(--INPUT_BORDER_ACCENT));
      }

      &.active {
        > i {
          transform: scale(1);
          opacity: 1;
        }

        background-color: rgb(var(--INPUT_BORDER_ACTIVE));
        border-color: rgb(var(--INPUT_BORDER_ACTIVE));
        box-shadow: 0 0 0 0 rgba(var(--BUTTON_DEFAULT), 0), 0 0 10px rgba(var(--INPUT_BORDER_ACTIVE), 0.5);

        &:hover {
          border-color: rgb(var(--INPUT_BORDER_ACTIVE));
        }
      }

      &.focused {
        box-shadow: 0 0 0 3px rgba(var(--BUTTON_DEFAULT), 0.33);

        &.active {
          box-shadow: 0 0 0 3px rgba(var(--BUTTON_DEFAULT), 0.33), 0 0 10px rgba(var(--INPUT_BORDER_ACTIVE), 0.5);
        }
      }

      &.error {
        border-color: rgb(var(--INPUT_BORDER_ERROR));
      }

      &.disabled {
        opacity: 0.5;
        cursor: default;
        border-color: rgb(var(--ELEMENT_BORDER));
      }
    `,

    toggler: css`
      width: 46px;
      min-width: 46px;
      height: 23px;
      min-height: 23px;
      flex-shrink: 0;
      border-radius: 20px;
      margin-right: 10px;
      border: 1px solid rgb(var(--ELEMENT_BORDER));
      background-color: rgb(var(--INPUT_BG));
      position: relative;
      box-sizing: border-box;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: border-color 0.2s, box-shadow 0.2s;

      &:before {
        content: '';
        transition: transform 0.2s, background-color 0.2s, box-shadow 0.2s;
        width: 17px;
        height: 17px;
        display: block;
        border-radius: 100%;
        top: 2px;
        left: 2px;
        transform: translateX(0);
        box-shadow: 0 0 10px rgba(var(--INPUT_BORDER_ACCENT), 0);
        background-color: rgb(var(--ELEMENT_BORDER));
        position: absolute;
      }

      > i {
        display: none;
      }

      &.focused {
        box-shadow: 0 0 0 3px rgba(var(--BUTTON_DEFAULT), 0.33);

        &.active {
          box-shadow: 0 0 0 3px rgba(var(--BUTTON_DEFAULT), 0.33);
        }
      }

      &:hover {
        border-color: rgb(var(--INPUT_BORDER_ACCENT));

        &:before {
          background-color: rgb(var(--INPUT_BORDER_ACCENT));
        }
      }

      &.active {
        &:before {
          transform: translateX(23px);
          background-color: rgb(var(--INPUT_BORDER_ACTIVE));
          box-shadow: 0 0 10px rgba(var(--INPUT_BORDER_ACTIVE), 0.5);
        }
      }

      &.error {
        border-color: rgb(var(--INPUT_BORDER_ERROR));
      }

      &.disabled {
        opacity: 0.5;
        cursor: default;
        pointer-events: none;
      }
    `,
  },
};
