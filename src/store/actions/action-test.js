import { createAction } from "./action-creator";

export const initTestConnection = createAction({ type: "INIT_TEST" });

export const connectedSuccessfully = createAction({
  type: "CONNECTED_SUCCESSFULLY",
});

export const streamReady = createAction({
  type: "STREAM_READY",
});
