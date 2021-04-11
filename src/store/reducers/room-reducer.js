import {
  actionAddedToRoom,
  actionRemovedFromRoom,
  connectToRoom,
  createRoomAction,
  initRoom,
  overrideActions,
  roomActionDataChanged,
  roomUserDataChanged,
  userAddedToRoom,
  userRemovedFromRoom,
} from "../actions/room-action";
import { streamReceived } from "../actions/stream-actions";

const initialState = {
  users: [],
  actions: [],
  roomId: null,
};

const connectToRoomHandler = ({ state, payload: roomId }) => ({
  ...state,
  roomId,
});

const initRoomHandler = ({ state, payload: { participants } }) => ({
  ...state,
  users: Object.keys(participants).map((key) => participants[key]),
});

const userAddedToRoomHandler = ({ state, payload: user }) => ({
  ...state,
  users: [...state.users, user],
});

const userRemovedFromRoomHandler = ({ state, payload: { uid } }) => ({
  ...state,
  users: state.users.filter((entry) => entry.uid !== uid),
});

const roomUserDataChangedHandler = ({ state, payload: user }) => ({
  ...state,
  users: [...state.users.filter((entry) => entry.uid !== user.uid), user],
});

const actionAddedToRoomHandler = ({ state, payload: action }) => ({
  ...state,
  actions: [...state.actions, action],
});

const actionRemovedFromRoomHandler = ({ state, payload: { timestamp } }) => ({
  ...state,
  actions: state.actions.filter((entry) => entry.timestamp !== timestamp),
});

const roomActionDataChangedHandler = ({ state, payload: action }) => ({
  ...state,
  actions: [
    ...state.actions.filter((entry) => entry.timestamp !== action.timestamp),
    action,
  ],
});

const createRoomActionHandler = ({ state, payload: action }) => ({
  ...state,
  actions: [...state.actions, action],
});

const overrideActionsHandler = ({ state, payload: actions }) => ({
  ...state,
  actions,
});

const streamReceivedHandler = ({ state, payload: { uid, stream } }) => ({
  ...state,
  users: [
    ...state.users.map((entry) =>
      entry.uid === uid ? { ...entry, stream } : entry
    ),
  ],
});

const configMap = {
  [connectToRoom().type]: connectToRoomHandler,
  [initRoom().type]: initRoomHandler,
  [userAddedToRoom().type]: userAddedToRoomHandler,
  [userRemovedFromRoom().type]: userRemovedFromRoomHandler,
  [roomUserDataChanged().type]: roomUserDataChangedHandler,
  [actionAddedToRoom().type]: actionAddedToRoomHandler,
  [actionRemovedFromRoom().type]: actionRemovedFromRoomHandler,
  [roomActionDataChanged().type]: roomActionDataChangedHandler,
  [createRoomAction().type]: createRoomActionHandler,
  [overrideActions().type]: overrideActionsHandler,
  [streamReceived().type]: streamReceivedHandler,
};

const roomReducer = (state = initialState, action) => {
  const config = configMap?.[action.type];
  if (config) return config({ state, payload: action.payload });

  return state;
};

export default roomReducer;
