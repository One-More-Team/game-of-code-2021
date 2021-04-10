import { takeLatest } from "redux-saga/effects";

import { initApp } from "../store/actions/app-action";
import {
  playAudio,
  requestCameraPermission,
  requestMicrophonePermission,
} from "../store/actions/devices";

import {
  initAppHandler,
  requestMicrophonePermissionHandler,
  requestCameraPermissionHandler,
  playAudioHandler,
} from "./workers/device-worker";

const DeviceSaga = [
  takeLatest(initApp().type, initAppHandler),
  takeLatest(
    requestMicrophonePermission().type,
    requestMicrophonePermissionHandler
  ),
  takeLatest(requestCameraPermission().type, requestCameraPermissionHandler),
];

export default DeviceSaga;
