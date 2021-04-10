import { eventChannel } from "@redux-saga/core";
import { put, select, take } from "@redux-saga/core/effects";
import firebase from "firebase/app";

import { ROOMS } from "../../enum/database";
import {
  initRoom,
  userAddedToRoom,
  userRemovedFromRoom,
} from "../../store/actions/room-action";
import { GetUser } from "../../store/selectors/auth-selectors";
import { GetUserMood } from "../../store/selectors/user-data-selector";

export function* connectToRoomHandler({ payload: roomId }) {
  const roomRef = firebase.database().ref(`${ROOMS}/${roomId}`);
  const participantsRef = firebase
    .database()
    .ref(`${ROOMS}/${roomId}/participants`);
  let isRoomExist;
  yield roomRef.once("value").then(function (snap) {
    isRoomExist = snap.val() != null;
  });
  const { displayName, uid } = yield select(GetUser);
  const mood = yield select(GetUserMood);
  const user = { displayName, mood, uid };

  const ownRef = firebase
    .database()
    .ref(`${ROOMS}/${roomId}/participants/${uid}`);
  if (!isRoomExist) {
    yield participantsRef.set({
      [uid]: user,
    });
  } else {
    if (!participantsRef[uid]) {
      ownRef.set(user);
    }
    yield put(initRoom({ participants: { [uid]: user } }));
  }

  ownRef.onDisconnect().remove((err) => {
    if (err !== null) console.log(err);
  });

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
