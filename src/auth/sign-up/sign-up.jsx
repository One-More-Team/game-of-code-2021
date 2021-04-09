import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";

import Button, { ButtonStyle } from "../../ui/button/button";
import {
  clearSignUpError,
  signUpRequest,
} from "../../store/actions/auth-action";
import {
  GetIsSignUpInProgress,
  GetSignUpError,
} from "../../store/selectors/auth-selectors";
import Panel from "../../ui/panel/panel";
import TextInput from "../../ui/text-input/text-input";
import { InputErrorType } from "../../ui/input-error/input-error";

import styles from "../auth.module.scss";

const SignUp = () => {
  const dispatch = useDispatch();
  const [displayName, setDisplayName] = useState("");
  const [
    displayNameValidationResult,
    setDisplayNameValidationResult,
  ] = useState({ isValid: false });
  const [emailValidationResult, setEmailValidationResult] = useState({
    isValid: false,
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordValidationResult, setPasswordValidationResult] = useState({
    isValid: false,
  });
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [
    passwordConfirmationValidationResult,
    setPasswordConfirmationValidationResult,
  ] = useState({ isValid: false });
  const signUpError = useSelector(GetSignUpError);
  const isSignUpInProgress = useSelector(GetIsSignUpInProgress);

  const hasEmailError = [
    "auth/email-already-in-use",
    "auth/invalid-email",
    "auth/too-many-requests",
  ].includes(signUpError?.code);

  const clearEmailError = () => {
    if (hasEmailError) dispatch(clearSignUpError());
  };

  const hasPasswordError = signUpError?.code === "auth/weak-password";
  const clearPasswordError = () => {
    if (hasPasswordError) dispatch(clearSignUpError());
  };

  const onSignUpRequest = () =>
    dispatch(signUpRequest({ email, password, displayName }));

  const onFormKeyDown = (e) => {
    if (e.keyCode === 13) onSignUpRequest();
  };

  useEffect(() => {
    if (hasEmailError && emailValidationResult.isValidated)
      setEmailValidationResult({
        isValidated: true,
        isValid: false,
        type: InputErrorType.CUSTOM,
        message: signUpError?.code.replace("auth/", ""),
      });
  }, [signUpError]);

  return (
    <Panel className={styles.Wrapper} label="sign-up-title">
      <form className={styles.Form} onKeyDown={onFormKeyDown}>
        <div className={styles.InputArea}>
          <div className={styles.InputBlock}>
            <TextInput
              value={displayName}
              setValue={setDisplayName}
              validationResult={displayNameValidationResult}
              setValidationResult={setDisplayNameValidationResult}
              icon="user"
              placeholder="your-nickname"
              autoComplete="treasure-hunter-nickname"
              minLength={3}
              maxLength={20}
            />
          </div>
          <div className={styles.InputBlock}>
            <TextInput
              value={email}
              setValue={setEmail}
              validationResult={emailValidationResult}
              setValidationResult={setEmailValidationResult}
              icon="at"
              onFocus={clearEmailError}
              placeholder="email"
              autoComplete="treasure-hunter-email"
              minLength={5}
              maxLength={250}
              customValidation={(value) => ({
                isValid: value !== "" && !hasEmailError,
                isValidated: true,
                message: "invalid-email",
              })}
            />
          </div>
          <div className={styles.InputBlock}>
            <TextInput
              value={password}
              setValue={setPassword}
              validationResult={passwordValidationResult}
              setValidationResult={setPasswordValidationResult}
              icon="key"
              onFocus={clearPasswordError}
              type="password"
              placeholder="password"
              minLength={6}
              maxLength={100}
            />
          </div>
          <div className={styles.InputBlock}>
            <TextInput
              value={passwordConfirmation}
              setValue={setPasswordConfirmation}
              validationResult={passwordConfirmationValidationResult}
              setValidationResult={setPasswordConfirmationValidationResult}
              icon="key"
              type="password"
              placeholder="password-confirmation"
              minLength={6}
              maxLength={100}
              customValidation={(value) => ({
                isValid: value === password,
                isValidated: true,
                message: "password-confirmation-problem",
              })}
            />
          </div>
          <div className={styles.ActionArea}>
            <Button
              messageId="sign-up"
              icon="fa-user-plus"
              onClick={onSignUpRequest}
              style={ButtonStyle.Secondary}
              isLoading={isSignUpInProgress}
              autoWidth={false}
              isEnabled={
                displayNameValidationResult.isValid &&
                emailValidationResult.isValid &&
                passwordValidationResult.isValid &&
                passwordConfirmationValidationResult.isValid
              }
            />
            <Button
              messageId="sign-in"
              icon="fa-sign-in-alt"
              style={ButtonStyle.Primary}
              navigationTarget="/sign-in"
              autoWidth={false}
            />
          </div>
        </div>
      </form>
    </Panel>
  );
};

export default SignUp;
