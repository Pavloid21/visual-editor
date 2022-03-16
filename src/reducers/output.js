import actionTypes from "../constants/actionTypes";

const initialState = {
  screen: "screen name",
  listItems: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.EDIT_SCREEN_NAME:
      return {
        ...state,
        screen: action.screen,
      };
    default:
      return state;
  }
}
