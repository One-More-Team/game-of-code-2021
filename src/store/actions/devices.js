import { createAction } from "./action-creator";

export const setAvailableDevices = createAction({
  type: "SET_AVAILABLE_DEVICES",
});

export const requestMicrophonePermission = createAction({
  type: "REQUEST_MICROPHONE_PERMISSION",
});

export const requestCameraPermission = createAction({
  type: "REQUEST_CAMERA_PERMISSION",
});

export const setMicrophoneError = createAction({
  type: "SET_MICROPHONE_ERROR",
});

export const setCameraError = createAction({
  type: "SET_CAMERA_ERROR",
});

export const setCamera = createAction({
  type: "SET_CAMERA",
});

export const setMicrophone = createAction({
  type: "SET_MICROPHONE",
});

export const setSpeaker = createAction({
  type: "SET_SPEAKER",
});

export const playAudio = createAction({
  type: "PLAY_AUDIO",
});
