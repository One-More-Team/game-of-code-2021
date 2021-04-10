import { eventChannel } from "@redux-saga/core";
import { put, select, take } from "@redux-saga/core/effects";
import firebase from "firebase/app";

import { ROOMS } from "../../enum/database";
import {
  initRoom,
  userAddedToRoom,
  userRemovedFromRoom,
  roomUserDataChanged,
} from "../../store/actions/room-action";
import { GetUser } from "../../store/selectors/auth-selectors";
import { GetRoomId } from "../../store/selectors/room-selectors";
import { GetUserMood } from "../../store/selectors/user-data-selector";

export function* connectToRoomHandler({ payload: roomId }) {
  const now = Date.now();
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
  const user = { displayName, mood, uid, entryDate: now };

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
    participantsRef.on("child_changed", (snap) =>
      emit(roomUserDataChanged(snap.val()))
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

export function* setMoodHandler({ payload: mood }) {
  const { uid } = yield select(GetUser);
  const roomId = yield select(GetRoomId);

  if (roomId) {
    const moodRef = firebase
      .database()
      .ref(`${ROOMS}/${roomId}/participants/${uid}/mood`);
    yield moodRef.set(mood);
  }
}
