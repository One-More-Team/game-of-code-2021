import {
  initRoom,
  userAddedToRoom,
  userRemovedFromRoom,
} from "../actions/room-action";

const initialState = {
  users: [],
};

const initRoomHandler = ({ state, payload: { participants } }) => ({
  ...state,
  users: Object.keys(participants).map((key) => participants[key]),
});

const userAddedToRoomHandler = ({ state, payload: user }) => ({
  ...state,
  users: [...state.users, user],
});

const userRemovedFromRoomHandler = ({ state, payload: user }) => ({
  ...state,
  users: state.users.filter((entry) => entry !== user),
});

const configMap = {
  [initRoom().type]: initRoomHandler,
  [userAddedToRoom().type]: userAddedToRoomHandler,
  [userRemovedFromRoom().type]: userRemovedFromRoomHandler,
};

const roomReducer = (state = initialState, action) => {
  const config = configMap?.[action.type];
  if (config) return config({ state, payload: action.payload });

  return state;
};

export default roomReducer;
