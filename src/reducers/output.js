import actionTypes from "../constants/actionTypes";

const initialState = {
  screen: "screen name",
  logic: "return",
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.EDIT_SCREEN_NAME:
      const nextState = { ...state };
      nextState.screen = action.screen;
      if (action.snippet.logic) {
        nextState.logic = action.snippet.logic.replace(/return$/gs, `\n`);
      }
      return nextState;
    case actionTypes.EDIT_LOGIC:
      return {
        ...state,
        logic: action.logic,
      };
    default:
      return state;
  }
}
