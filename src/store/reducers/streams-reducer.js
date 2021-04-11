import { clearPeer, storePeer } from "../actions/stream-actions";

const initialState = {
  streams: [],
};

const storePeerHandler = ({ state, payload }) => ({
  ...state,
  streams: [...state.streams, { id: payload.id, peer: payload.peer }],
});

const clearPeerHandler = ({ state, payload }) => ({
  ...state,
  streams: state.streams.filter((d) => d.id !== payload.id),
});

const configMap = {
  [storePeer().type]: storePeerHandler,
  [clearPeer().type]: clearPeerHandler,
};

const streamsReducer = (state = initialState, action) => {
  const config = configMap?.[action.type];
  if (config) return config({ state, payload: action.payload });

  return state;
};

export default streamsReducer;
