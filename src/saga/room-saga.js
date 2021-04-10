import { takeLatest } from "redux-saga/effects";
import { connectToRoom } from "../store/actions/room-action";
import { connectToRoomHandler } from "./workers/room-worker";

const RoomSaga = [takeLatest(connectToRoom().type, connectToRoomHandler)];

export default RoomSaga;
