import { createAction } from "./action-creator";

export const connectToRoom = createAction({
  type: "CONNECT_TO_ROOM",
});

export const initRoom = createAction({
  type: "INIT_ROOM",
});

export const userAddedToRoom = createAction({
  type: "USER_ADDED_TO_ROOM",
});

export const userRemovedFromRoom = createAction({
  type: "USER_REMOVED_FROM_ROOM",
});

export const roomUserDataChanged = createAction({
  type: "ROOM_USER_DATA_CHANGED",
});

export const leaveRoom = createAction({
  type: "LEAVE_ROOM",
});

export const actionAddedToRoom = createAction({
  type: "ACTION_ADDED_TO_ROOM",
});

export const actionRemovedFromRoom = createAction({
  type: "ACTION_REMOVED_FROM_ROOM",
});

export const roomActionDataChanged = createAction({
  type: "ROOM_ACTION_DATA_CHANGED",
});

export const createRoomAction = createAction({
  type: "CREATE_ROOM_ACTION",
});

export const setActionOrder = createAction({
  type: "SET_ACTION_ORDER",
});

export const setActionTypes = createAction({
  type: "SET_ACTION_TYPES",
});

export const overrideActions = createAction({
  type: "OVERRIDE_ACTIONS",
});
