import { storePeer } from "../actions/stream-actions";

const initialState = {
  streams: [],
};

const storePeerHandler = ({ state, payload }) => ({
  ...state,
  streams: [...state.streams, { id: payload.id, peer: payload.peer }],
});

const configMap = {
  [storePeer().type]: storePeerHandler,
};

const streamsReducer = (state = initialState, action) => {
  const config = configMap?.[action.type];
  if (config) return config({ state, payload: action.payload });

  return state;
};

export default streamsReducer;
