import React, { useEffect, useRef } from "react";
import { useIntl } from "react-intl";

import InputError, { InputErrorType } from "../input-error/input-error";

import styles from "./text-input.module.scss";

const TextInput = ({
  className = null,
  name = "",
  placeholder = "",
  type = "text",
  onFocus = null,
  onBlur = null,
  value,
  setValue,
  validationResult,
  setValidationResult,
  customValidation = null,
  icon = "",
  autoComplete = "on",
  onKeyDown,
  insertValue = null,
  setInsertValue = null,
  minLength = null,
  maxLength = null,
}) => {
  const input = useRef();
  const formattedPlaceholder = useIntl().formatMessage({ id: placeholder });

  const validate = () => {
    const customValidationResult = customValidation && customValidation(value);

    if (customValidationResult && !customValidationResult.isValid) {
      return {
        isValidated: true,
        isValid: false,
        type: InputErrorType.CUSTOM,
        ...customValidationResult,
      };
    }
    if (minLength && value.length === 0) {
      return {
        isValidated: true,
        isValid: false,
        type: InputErrorType.EMPTY,
      };
    } else if (minLength && value.length < minLength) {
      return {
        isValidated: true,
        isValid: false,
        type: InputErrorType.MIN_LENGTH,
        values: { minLength },
      };
    }

    return { isValidated: true, isValid: true };
  };

  const onBlurHandler = (e) => {
    if (onBlur) onBlur(e);

    setValidationResult(validate());
  };

  const onFocusHandler = (e) => {
    if (onFocus) onFocus(e);

    setValidationResult({
      isValidated: true,
      isValid: false,
      type: InputErrorType.NOT_VALIDATED_YET,
    });
  };

  useEffect(() => {
    if (insertValue === null) return;

    const { selectionStart } = input.current;
    const newValue = `${value.slice(
      0,
      selectionStart
    )}${insertValue}${value.slice(selectionStart)}`;

    setValue(newValue);
    input.current.selectionStart = newValue.length;
    setInsertValue("");
  }, [value, setValue, insertValue, setInsertValue]);

  useEffect(() => {
    setValidationResult &&
      setValidationResult({
        isValidated: false,
        isValid: false,
        type: InputErrorType.NOT_VALIDATED_YET,
      });
  }, [setValidationResult]);

  useEffect(() => {
    const preValidationResult = validate();
    if (validationResult.isValid || preValidationResult.isValid)
      setValidationResult(preValidationResult);
  }, [value]);

  return (
    <>
      <div
        className={`${styles.Wrapper} ${
          value === "" && styles.Empty
        } ${className}`}
      >
        {icon && <i className={`fas fa-${icon}`}></i>}
        <input
          ref={input}
          name={name}
          placeholder={formattedPlaceholder}
          type={type}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={`${icon && styles.WithIcon} ${
            validationResult?.isValidated &&
            !validationResult?.isValid &&
            validationResult.type !== InputErrorType.NOT_VALIDATED_YET &&
            styles.Error
          }`}
          autoComplete={autoComplete}
          onKeyDown={onKeyDown}
          maxLength={maxLength}
        />
        {validationResult?.isValidated &&
          !validationResult?.isValid &&
          validationResult.type !== InputErrorType.NOT_VALIDATED_YET && (
            <i className={`fas fa-exclamation ${styles.ErrorIcon}`}></i>
          )}
      </div>
      <InputError validationResult={validationResult} />
    </>
  );
};

export default TextInput;
