import actionTypes from "../constants/actionTypes";

const initialState = {
  mode: "editor",
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_EDITOR_MODE:
      return {
        ...state,
        mode: action.mode,
      };
    default:
      return state;
  }
}
