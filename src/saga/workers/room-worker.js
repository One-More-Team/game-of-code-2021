import { eventChannel } from "@redux-saga/core";
import { put, select, take } from "@redux-saga/core/effects";
import firebase from "firebase/app";

import { ROOMS } from "../../enum/database";
import {
  userAddedToRoom,
  userRemovedFromRoom,
} from "../../store/actions/room-action";
import { GetUser } from "../../store/selectors/auth-selectors";

export function* connectToRoomHandler({ payload: roomId }) {
  const user = select(GetUser);
  const ownRef = firebase
    .database()
    .ref(`${ROOMS}/${roomId}/participants/${user.id}`);
  ownRef.set({ ...user });

  const participantsRef = firebase
    .database()
    .ref(`${ROOMS}/${roomId}/participants`);

  const participantsChannel = eventChannel((emit) => {
    participantsRef.on("child_added", (snap) =>
      emit(userAddedToRoom(snap.val()))
    );
    participantsRef.on("child_removed", (snap) =>
      emit(userRemovedFromRoom(snap.val()))
    );
    return () => {
      participantsRef.on("child_added", null);
      participantsRef.on("child_removed", null);
    };
  });

  while (true) {
    const action = yield take(participantsChannel);
    yield put(action);
  }
}
