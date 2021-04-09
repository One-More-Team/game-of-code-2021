import { call, put, take } from "redux-saga/effects";
import { rsf } from "../../firebase";
import firebase from "firebase/app";

import {
  setSignUpError,
  setSignInError,
  setUser,
  setProfile,
} from "../../store/actions/auth-action";
import { PROFILES } from "../../enum/database";

export function* initAppHandler() {
  const channel = yield call(rsf.auth.channel);

  while (true) {
    const { user } = yield take(channel);
    if (user) {
      yield put(setUser(user));

      profileDatabaseRef = firebase.database().ref(`${PROFILES}/${user.uid}`);
      let profile;
      yield profileDatabaseRef
        .once("value")
        .then((snap) => (profile = snap.val()));
      yield put(setProfile(profile));
    } else yield put(setUser(null));
  }
}

let profileDatabaseRef;

export function* signUpRequestHandler(action) {
  const { email, password, displayName } = action.payload;

  try {
    const { user } = yield firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    const userData = {
      uid: user.uid,
      displayName,
    };
    yield firebase.auth().currentUser.updateProfile(userData);
    profileDatabaseRef = firebase.database().ref(`${PROFILES}/${user.uid}`);
    const profile = {
      displayName,
    };
    yield profileDatabaseRef.set(profile);
    yield put(setUser(user));
    yield put(setProfile(profile));
  } catch (e) {
    console.error(`Sign up error: ${e}`);
    yield put(setSignUpError(e));
  }
}

export function* signInRequestHandler(action) {
  const { email, password } = action.payload;
  try {
    const user = yield firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    profileDatabaseRef = firebase.database().ref(`${PROFILES}/${user.uid}`);
    yield put(setUser(user));
  } catch (e) {
    yield put(setSignInError(e));
  }
}

export function* signOutRequestHandler() {
  try {
    yield firebase.auth().signOut();
    yield put(setUser(null));
  } catch (e) {
    console.warn("Sign out error!");
  }
}
