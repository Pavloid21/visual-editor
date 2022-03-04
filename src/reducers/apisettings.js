import actionTypes from "../constants/actionTypes";

const initialState = {
  list: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD_API:
      return {
        ...state,
        list: [...state.list, action.api],
      };
    case actionTypes.REMOVE_API_ITEM:
      const newItems = [...state.list];
      newItems.splice(action.index, 1);
      return { ...state, list: newItems };
    case actionTypes.EDIT_API:
      let items = state.list;
      items[action.index] = { ...action.api };
      return { ...state, list: items };
    default:
      return state;
  }
}
