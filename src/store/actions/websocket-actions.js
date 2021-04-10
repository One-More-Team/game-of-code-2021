import { createAction } from "./action-creator";

export const connectedToWS = createAction({
  type: "CONNECTED_TO_WS",
});

export const newParticipant = createAction({
  type: "NEW_PARTICIPANT",
});

export const answerForNewParticipant = createAction({
  type: "ANSWER_FOR_NEW_PARTICIPANT",
});
