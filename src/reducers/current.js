import actionTypes from "../constants/actionTypes";

const initialState = "";

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_CURRENT_SCREEN_NAME:
      return action.current;
    default:
      return state;
  }
}
