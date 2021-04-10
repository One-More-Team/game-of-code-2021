import { takeLatest } from "redux-saga/effects";
import { initTestConnection } from "../store/actions/action-test";
import {
  answerForNewParticipant,
  newParticipant,
} from "../store/actions/websocket-actions";
import {
  createAndSaveNewPeer,
  initConnectionHandler,
  handleAnswerForNewParticipant,
} from "./workers/connection-worker";

const ConnectionSaga = [
  takeLatest(initTestConnection().type, initConnectionHandler),
  takeLatest(newParticipant().type, createAndSaveNewPeer),
  takeLatest(answerForNewParticipant().type, handleAnswerForNewParticipant),
];

export default ConnectionSaga;
