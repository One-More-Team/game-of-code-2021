import { setMood } from "../actions/mood-action";

const initialState = {
  mood: 9,
};

const setMoodHandler = ({ state, payload: { mood } }) => ({
  ...state,
  mood,
});

const configMap = {
  [setMood().type]: setMoodHandler,
};

const userDataReducer = (state = initialState, action) => {
  const config = configMap?.[action.type];
  if (config) return config({ state, payload: action.payload });

  return state;
};

export default userDataReducer;
