import { takeLatest } from "redux-saga/effects";
import { initTestConnection } from "../store/actions/action-test";
import {
  answerForNewParticipant,
  finalizeConnection,
  newParticipant,
} from "../store/actions/websocket-actions";
import {
  handleNewParticipant,
  initConnectionHandler,
  handleAnswerForNewParticipant,
  handlefinalizeConnection,
} from "./workers/connection-worker";

const ConnectionSaga = [
  takeLatest(initTestConnection().type, initConnectionHandler),
  takeLatest(newParticipant().type, handleNewParticipant),
  takeLatest(answerForNewParticipant().type, handleAnswerForNewParticipant),
  takeLatest(finalizeConnection().type, handlefinalizeConnection),
];

export default ConnectionSaga;
