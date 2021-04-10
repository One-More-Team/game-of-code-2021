const GetUserStream = (userId) => (state) => {
  const streams = state.streamsReducer.streams;
  return streams.find(({ id }) => id === userId);
};

export { GetUserStream };
