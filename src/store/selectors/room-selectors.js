export const GetUsers = (state) => {
  const { uid } = state.authReducer.user;
  let ownEntry;

  const res = state.roomReducer.users
    .sort((a, b) => a.entryDate - b.entryDate)
    .filter((entry) => {
      if (!ownEntry && entry.uid === uid) ownEntry = entry;
      return entry.uid !== uid;
    });
  if (ownEntry) return [ownEntry, ...res];
  else return res;
};

export const GetActions = (state) => state.roomReducer.actions;

export const GetPositiveActions = (state) =>
  state.roomReducer.actions
    .filter((action) => !action.isFinished && action.type === "positive")
    .sort((a, b) => a.order - b.order);

export const GetNegativeActions = (state) =>
  state.roomReducer.actions
    .filter((action) => !action.isFinished && action.type === "negative")
    .sort((a, b) => a.order - b.order);

export const GetFinishedActions = (state) =>
  state.roomReducer.actions
    .filter((action) => action.isFinished)
    .sort((a, b) => a.order - b.order);

export const GetRoomId = (state) => state.roomReducer.roomId;
