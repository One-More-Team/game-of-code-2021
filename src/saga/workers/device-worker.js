import { call, put, select } from "redux-saga/effects";
import {
  setAvailableDevices,
  setCameraError,
  setMicrophoneError,
} from "../../store/actions/devices";
import { GetSelectedSpeaker } from "../../store/selectors/devices";
import { warn } from "../../utils/logger";

export function* initAppHandler() {
  yield call(loadDevices);
}

function* loadDevices() {
  const deviceList = yield navigator.mediaDevices.enumerateDevices();
  yield put(setAvailableDevices(deviceList));
}

export function* requestMicrophonePermissionHandler() {
  try {
    yield navigator.mediaDevices.getUserMedia({
      video: false,
      audio: true,
    });
    yield call(loadDevices);
  } catch (e) {
    yield put(setMicrophoneError(e));
    warn(`Microphone request was declined by user. ${e}`);
  }
}

export function* requestCameraPermissionHandler() {
  try {
    yield navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });
    yield call(loadDevices);
  } catch (e) {
    yield put(setCameraError(e));
    warn(`Camera request was declined by user. ${e}`);
  }
}
