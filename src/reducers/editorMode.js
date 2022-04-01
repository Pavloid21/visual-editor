import { Device } from "constants/device";
import actionTypes from "../constants/actionTypes";

const initialState = {
  mode: "editor",
  device: Device.IOS,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_EDITOR_MODE:
      return {
        ...state,
        mode: action.mode,
      };
    case actionTypes.SET_DEVICE: {
      return {
        ...state,
        device: action.device
      }
    }
    default:
      return state;
  }
}
