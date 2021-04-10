import {
  setAvailableDevices,
  setCamera,
  setCameraError,
  setMicrophone,
  setMicrophoneError,
  setSpeaker,
} from "../actions/devices";

const initialState = {
  deviceList: [],
  selectedCamera: null,
  selectedMicrophone: null,
  cameraError: null,
  microphoneError: null,
  selectedSpeaker: null,
};

const setAvailableDevicesHandler = ({ state, payload }) => ({
  ...state,
  deviceList: payload,
});

const setCameraHandler = ({ state, payload }) => ({
  ...state,
  selectedCamera: payload,
});

const setMicrophoneHandler = ({ state, payload }) => ({
  ...state,
  selectedMicrophone: payload,
});

const setCameraErrorHandler = ({ state, payload }) => ({
  ...state,
  cameraError: payload,
});

const setMicrophoneErrorHandler = ({ state, payload }) => ({
  ...state,
  microphoneError: payload,
});

const setSpeakerHandler = ({ state, payload }) => ({
  ...state,
  selectedSpeaker: payload,
});

const configMap = {
  [setAvailableDevices().type]: setAvailableDevicesHandler,
  [setCameraError().type]: setCameraErrorHandler,
  [setMicrophoneError().type]: setMicrophoneErrorHandler,
  [setCamera().type]: setCameraHandler,
  [setMicrophone().type]: setMicrophoneHandler,
  [setSpeaker().type]: setSpeakerHandler,
};

const devicesReducer = (state = initialState, action) => {
  const config = configMap?.[action.type];
  if (config) return config({ state, payload: action.payload });

  return state;
};

export default devicesReducer;
