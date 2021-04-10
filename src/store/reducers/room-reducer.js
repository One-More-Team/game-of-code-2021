import {
  connectToRoom,
  initRoom,
  roomUserDataChanged,
  userAddedToRoom,
  userRemovedFromRoom,
} from "../actions/room-action";
import { streamReceived } from "../actions/stream-actions";

const initialState = {
  users: [],
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
  [streamReceived().type]: streamReceivedHandler,
};

const roomReducer = (state = initialState, action) => {
  const config = configMap?.[action.type];
  if (config) return config({ state, payload: action.payload });

  return state;
};

export default roomReducer;
