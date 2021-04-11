import { eventChannel } from "@redux-saga/core";
import { put, select, take, race } from "@redux-saga/core/effects";
import firebase from "firebase/app";

import { ROOMS } from "../../enum/database";
import {
  initRoom,
  userAddedToRoom,
  userRemovedFromRoom,
  roomUserDataChanged,
  actionAddedToRoom,
  actionRemovedFromRoom,
  roomActionDataChanged,
  overrideActions,
} from "../../store/actions/room-action";
import { GetUser } from "../../store/selectors/auth-selectors";
import { GetRoomId, GetActions } from "../../store/selectors/room-selectors";
import { GetUserMood } from "../../store/selectors/user-data-selector";

export function* connectToRoomHandler({ payload: roomId }) {
  const now = Date.now();
  const roomRef = firebase.database().ref(`${ROOMS}/${roomId}`);
  const participantsRef = firebase
    .database()
    .ref(`${ROOMS}/${roomId}/participants`);
  const actionsRef = firebase.database().ref(`${ROOMS}/${roomId}/actions`);

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
      participantsRef.on("child_changed", null);
    };
  });

  const actionsChannel = eventChannel((emit) => {
    actionsRef.on("child_added", (snap) => emit(actionAddedToRoom(snap.val())));
    actionsRef.on("child_removed", (snap) =>
      emit(actionRemovedFromRoom(snap.val()))
    );
    actionsRef.on("child_changed", (snap) =>
      emit(roomActionDataChanged(snap.val()))
    );
    return () => {
      actionsRef.on("child_added", null);
      actionsRef.on("child_removed", null);
      actionsRef.on("child_changed", null);
    };
  });

  while (true) {
    const res = yield race({
      participantsChannel: take(participantsChannel),
      actionsChannel: take(actionsChannel),
      leave: take(leaveRoomHandler),
    });

    if (res.participantsChannel) {
      yield put(res.participantsChannel);
    } else if (res.actionsChannel) {
      yield put(res.actionsChannel);
    } else return;
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

export function* leaveRoomHandler() {
  const { uid } = yield select(GetUser);
  const roomId = yield select(GetRoomId);

  const userDataRef = firebase
    .database()
    .ref(`${ROOMS}/${roomId}/participants/${uid}`);
  yield userDataRef.remove();
}

export function* createRoomActionHandler({ payload: action }) {
  const roomId = yield select(GetRoomId);

  const actionsRef = firebase
    .database()
    .ref(`${ROOMS}/${roomId}/actions/${action.timestamp}-${action.owner}`);

  actionsRef.set(action);
}

export function* setActionOrderHandler({ payload: orderedList }) {
  const actions = yield select(GetActions);
  const convertedActions = actions.reduce((previous, current) => {
    return orderedList.includes(current)
      ? [...previous, { ...current, order: orderedList.indexOf(current) }]
      : [...previous, current];
  }, []);
  const roomId = yield select(GetRoomId);
  yield put(overrideActions(convertedActions));
  const orderRef = firebase.database().ref(`${ROOMS}/${roomId}/actions/`);
  orderRef.set(convertedActions);
}

export function* setActionTypesHandler({ payload: complexList }) {
  const actions = yield select(GetActions);

  let res = [...actions];
  if (complexList.negative)
    complexList.negative.forEach((element) => {
      const ref = res.find((action) => action === element);
      ref.type = "negative";
      ref.isFinished = false;
    });
  if (complexList.positive)
    complexList.positive.forEach((element) => {
      const ref = res.find((action) => action === element);
      ref.type = "positive";
      ref.isFinished = false;
    });
  if (complexList.finished)
    complexList.finished.forEach((element) => {
      res.find((action) => action === element).isFinished = true;
    });

  const roomId = yield select(GetRoomId);
  yield put(overrideActions(res));
  const orderRef = firebase.database().ref(`${ROOMS}/${roomId}/actions/`);
  orderRef.set(res);
}
