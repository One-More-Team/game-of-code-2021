const GetUserStream = (userId) => (state) => {
  const testing = 5;
  const streams = state.streamsReducer.streams;
  return streams.find(({ id }) => id === userId);
};

export { GetUserStream };
