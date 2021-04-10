import { takeLatest } from "redux-saga/effects";
import { setMood } from "../store/actions/mood-action";
import { connectToRoom } from "../store/actions/room-action";
import { connectToRoomHandler, setMoodHandler } from "./workers/room-worker";

const RoomSaga = [
  takeLatest(connectToRoom().type, connectToRoomHandler),
  takeLatest(setMood().type, setMoodHandler),
];

export default RoomSaga;
