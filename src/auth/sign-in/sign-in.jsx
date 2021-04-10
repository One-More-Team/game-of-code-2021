import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  clearSignInError,
  signInRequest,
} from "../../store/actions/auth-action";
import Button, { ButtonStyle } from "../../ui/button/button";
import {
  GetIsSignInInProgress,
  GetSignInError,
} from "../../store/selectors/auth-selectors";
import TextInput from "../../ui/text-input/text-input";
import Panel from "../../ui/panel/panel";
import { InputErrorType } from "../../ui/input-error/input-error";

import styles from "../auth.module.scss";

const SignIn = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [emailValidationResult, setEmailValidationResult] = useState({
    isValid: false,
  });
  const [password, setPassword] = useState("");
  const [passwordValidationResult, setPasswordValidationResult] = useState({
    isValid: false,
  });
  const signInError = useSelector(GetSignInError);
  const isSignInInProgress = useSelector(GetIsSignInInProgress);
  const hasEmailError = [
    "auth/user-not-found",
    "auth/invalid-email",
    "auth/too-many-requests",
  ].includes(signInError?.code);
  const clearEmailError = () => {
    if (hasEmailError) dispatch(clearSignInError());
  };

  const hasPasswordError = signInError?.code === "auth/wrong-password";
  const clearPasswordError = () => {
    if (hasPasswordError) dispatch(clearSignInError());
  };

  const onSignInRequest = () => dispatch(signInRequest({ email, password }));

  const onFormKeyDown = (e) => {
    if (e.keyCode === 13) onSignInRequest();
  };

  useEffect(() => {
    if (hasEmailError && emailValidationResult.isValidated)
      setEmailValidationResult({
        isValidated: true,
        isValid: false,
        type: InputErrorType.CUSTOM,
        message: signInError?.code.replace("auth/", ""),
      });
    else if (hasPasswordError && passwordValidationResult.isValidated)
      setPasswordValidationResult({
        isValidated: true,
        isValid: false,
        type: InputErrorType.CUSTOM,
        message: signInError?.code.replace("auth/", ""),
      });
  }, [
    signInError,
    emailValidationResult.isValidated,
    hasEmailError,
    hasPasswordError,
    passwordValidationResult.isValidated,
  ]);

  return (
    <Panel className={styles.Wrapper} label="sign-in-title">
      <form className={styles.Form} onKeyDown={onFormKeyDown}>
        <div className={styles.InputArea}>
          <div className={styles.InputBlock}>
            <TextInput
              value={email}
              setValue={setEmail}
              validationResult={emailValidationResult}
              setValidationResult={setEmailValidationResult}
              icon="at"
              onFocus={clearEmailError}
              placeholder="email"
              autoComplete="email"
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
              autoComplete="password"
              minLength={6}
              maxLength={100}
            />
          </div>
        </div>
        <div className={styles.ActionArea}>
          <Button
            messageId="sign-in"
            icon="fa-sign-in-alt"
            onClick={onSignInRequest}
            style={ButtonStyle.Primary}
            isLoading={isSignInInProgress}
            isEnabled={
              emailValidationResult.isValid && passwordValidationResult.isValid
            }
          />
          <Button
            messageId="sign-up"
            icon="fa-user-plus"
            style={ButtonStyle.Secondary}
            navigationTarget="/sign-up"
          />
        </div>
      </form>
    </Panel>
  );
};

export default SignIn;
