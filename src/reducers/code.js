import actionTypes from "../constants/actionTypes";

const initialState = "";

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SAVE_CODE:
      return action.code;
    default:
      return state;
  }
}