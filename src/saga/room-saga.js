import { takeLatest } from "redux-saga/effects";
import { setMood } from "../store/actions/mood-action";
import { connectToRoom, leaveRoom } from "../store/actions/room-action";
import {
  connectToRoomHandler,
  setMoodHandler,
  leaveRoomHandler,
} from "./workers/room-worker";

const RoomSaga = [
  takeLatest(connectToRoom().type, connectToRoomHandler),
  takeLatest(setMood().type, setMoodHandler),
  takeLatest(leaveRoom().type, leaveRoomHandler),
];

export default RoomSaga;
