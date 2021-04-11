import { takeLatest } from "redux-saga/effects";
import { setMood } from "../store/actions/mood-action";
import {
  connectToRoom,
  createRoomAction,
  leaveRoom,
  setActionOrder,
  setActionTypes,
} from "../store/actions/room-action";
import {
  connectToRoomHandler,
  setMoodHandler,
  leaveRoomHandler,
  createRoomActionHandler,
  setActionOrderHandler,
  setActionTypesHandler,
} from "./workers/room-worker";

const RoomSaga = [
  takeLatest(connectToRoom().type, connectToRoomHandler),
  takeLatest(setMood().type, setMoodHandler),
  takeLatest(createRoomAction().type, createRoomActionHandler),
  takeLatest(setActionOrder().type, setActionOrderHandler),
  takeLatest(setActionTypes().type, setActionTypesHandler),
  takeLatest(leaveRoom().type, leaveRoomHandler),
];

export default RoomSaga;
