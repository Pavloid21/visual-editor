import actionTypes from "../constants/actionTypes";

const initialState = {
  actions: [],
  data: [],
  selected: null,
  deleted: {
    actions: [],
    data: [],
  },
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_ACTIONS:
      const newSet = {};
      if (action.actions) {
        newSet.actions = action.actions;
      }
      if (action.data) {
        newSet.data = action.data;
      }
      return {
        ...state,
        ...newSet,
      };
    case actionTypes.SELECT_ACTION:
      return {
        ...state,
        selected: action.selected,
      };
    case actionTypes.ADD_ACTION:
      return {
        ...state,
        actions: [...state.actions, action.action],
      };
    case actionTypes.DELETE_ACTION:
      let removed;
      if (action.selected.type === "action") {
        const actions = [...state.actions];
        state.actions.forEach((item, index) => {
          if (item.action === action.selected.action) {
            removed = actions.splice(index, 1);
          }
        });
        return {
          ...state,
          actions,
          deleted: { ...state.deleted, actions: [...removed] },
        };
      } else if (action.selected.type === "data") {
        const data = [...state.data];
        state.data.forEach((item, index) => {
          if (item.action === action.selected.action) {
            removed = data.splice(index, 1);
          }
        });
        return {
          ...state,
          data,
          deleted: { ...state.deleted, data: [...removed] },
        };
      }
      return state;
    default:
      return state;
  }
}
