import { createAction } from "./action-creator";

export const storePeer = createAction({
  type: "STORE_PEER",
});

export const streamReceived = createAction({
  type: "STREAM_RECEIVED",
});

export const clearPeer = createAction({
  type: "CLEAR_PEER",
});
