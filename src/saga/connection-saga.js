import { takeLatest } from "redux-saga/effects";
import { initTestConnection } from "../store/actions/action-test";
import {
  answerForNewParticipant,
  clearParticipant,
  connectedToWS,
  finalizeConnection,
  newParticipant,
} from "../store/actions/websocket-actions";
import {
  handleNewParticipant,
  initConnectionHandler,
  handleAnswerForNewParticipant,
  handlefinalizeConnection,
  handleClearParticipant,
  handleConnectedToWS,
} from "./workers/connection-worker";

const ConnectionSaga = [
  takeLatest(initTestConnection().type, initConnectionHandler),
  takeLatest(connectedToWS().type, handleConnectedToWS),
  takeLatest(newParticipant().type, handleNewParticipant),
  takeLatest(answerForNewParticipant().type, handleAnswerForNewParticipant),
  takeLatest(finalizeConnection().type, handlefinalizeConnection),
  takeLatest(clearParticipant().type, handleClearParticipant),
];

export default ConnectionSaga;
