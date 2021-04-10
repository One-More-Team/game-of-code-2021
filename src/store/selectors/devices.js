import { DeviceType } from "../../enum/device.js";

export const GetCameraList = (state) =>
  state.devicesReducer.deviceList.filter(
    (device) => device.kind === DeviceType.CAMERA
  );

export const GetMicrophoneList = (state) =>
  state.devicesReducer.deviceList.filter(
    (device) => device.kind === DeviceType.MICROPHONE
  );

export const GetSpeakerList = (state) =>
  state.devicesReducer.deviceList.filter(
    (device) => device.kind === DeviceType.SPEAKER
  );

export const GetSelectedCamera = (state) => state.devicesReducer.selectedCamera;

export const GetSelectedMicrophone = (state) =>
  state.devicesReducer.selectedMicrophone;

export const GetCameraError = (state) => state.devicesReducer.cameraError;

export const GetMicrophoneError = (state) =>
  state.devicesReducer.microphoneError;

export const GetSelectedSpeaker = (state) =>
  state.devicesReducer.selectedSpeaker;
