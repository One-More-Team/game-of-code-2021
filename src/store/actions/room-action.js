import { createAction } from "./action-creator";

export const connectToRoom = createAction({
  type: "CONNECT_TO_ROOM",
});

export const userAddedToRoom = createAction({
  type: "USER_ADDED_TO_ROOM",
});

export const userRemovedFromRoom = createAction({
  type: "USER_REMOVED_FROM_ROOM",
});
