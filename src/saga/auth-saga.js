import { takeLatest } from "@redux-saga/core/effects";

import { initApp } from "../store/actions/app-action";
import {
  signInRequest,
  signOutRequest,
  signUpRequest,
} from "../store/actions/auth-action";
import {
  initAppHandler,
  signUpRequestHandler,
  signInRequestHandler,
  signOutRequestHandler,
} from "./workers/auth-worker";

const Auth = [
  takeLatest(initApp().type, initAppHandler),
  takeLatest(signUpRequest().type, signUpRequestHandler),
  takeLatest(signInRequest().type, signInRequestHandler),
  takeLatest(signOutRequest().type, signOutRequestHandler),
];

export default Auth;
