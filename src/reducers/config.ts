import { AnyAction } from "redux";
import actionTypes from "../constants/actionTypes";
import { Config } from "./types";

const initialState: Config = {
  activeTab: 0,
  previewMode: 3
};

export default function reducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case actionTypes.CHANGE_ACTIVE_TAB:
      return {
        ...state,
        activeTab: action.index,
      };
    case actionTypes.CHANGE_PREVIEW_MODE:
      return {
        ...state,
        previewMode: action.mode,
      };
    default:
      return state;
  }
}
