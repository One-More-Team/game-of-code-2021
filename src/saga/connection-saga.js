import { takeLatest } from "redux-saga/effects";
import { initTestConnection } from "../store/actions/action-test";
import { initConnectionHandler } from "./workers/connection-worker";

const ConnectionSaga = [
  takeLatest(initTestConnection().type, initConnectionHandler),
];

export default ConnectionSaga;
