import { all, call, put } from "redux-saga/effects";

import { initApp } from "../store/actions/app-action";
import AuthSaga from "./auth-saga";
import SiteLanguage from "./site-language";
import AppSaga from "./app-saga";
import ConnectionSaga from "./connection-saga";
import DeviceSaga from "./device-saga";

function* initialCall() {
  yield put(initApp());
}

function* Index() {
  yield all([
    ...AuthSaga,
    ...SiteLanguage,
    ...AppSaga,
    ...ConnectionSaga,
    ...DeviceSaga,
  ]);
  yield call(initialCall);
}

export default Index;
