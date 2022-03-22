import actionTypes from "../constants/actionTypes";

const initialState = {
  list: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_ACTIONS:
      return {
        ...state,
        list: action.list,
      };
    default:
      return state;
  }
}
