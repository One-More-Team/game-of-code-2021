import { all, call, put } from "redux-saga/effects";

import { initApp } from "../store/actions/app-action";
import AuthSaga from "./auth-saga";
import SiteLanguage from "./site-language";
import AppSaga from "./app-saga";
import ConnectionSaga from "./connection-saga";

function* initialCall() {
  yield put(initApp());
}

function* Index() {
  yield all([...AuthSaga, ...SiteLanguage, ...AppSaga, ...ConnectionSaga]);
  yield call(initialCall);
}

export default Index;
