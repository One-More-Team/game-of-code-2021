import { userAddedToRoom, userRemovedFromRoom } from "../actions/room-action";

const initialState = {
  users: [],
};

const userAddedToRoomHandler = ({ state, payload: user }) => ({
  ...state,
  users: [...state.users, user],
});

const userRemovedFromRoomHandler = ({ state, payload: user }) => ({
  ...state,
  users: state.users.filter((entry) => entry !== user),
});

const configMap = {
  [userAddedToRoom().type]: userAddedToRoomHandler,
  [userRemovedFromRoom().type]: userRemovedFromRoomHandler,
};

const roomReducer = (state = initialState, action) => {
  const config = configMap?.[action.type];
  if (config) return config({ state, payload: action.payload });

  return state;
};

export default roomReducer;
