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

export const GetRoomId = (state) => state.roomReducer.roomId;
