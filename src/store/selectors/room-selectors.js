export const GetUsers = (state) =>
  state.roomReducer.users.sort((a, b) => a.entryDate - b.entryDate);
export const GetRoomId = (state) => state.roomReducer.roomId;
