import actionTypes from '../constants/actionTypes';
import { optionsByDevice } from 'containers/MobileSelect/consts';
import { Device } from 'containers/MobileSelect/consts';
import {AnyAction} from 'redux';
import { EditorMode } from './types';

const initialState: EditorMode = {
  mode: 'editor',
  device: Device.ANDROID,
  model: optionsByDevice[Device.ANDROID][1].value,
};

export default function reducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case actionTypes.SET_EDITOR_MODE:
      return {
        ...state,
        mode: action.mode,
      };
    case actionTypes.SET_DEVICE: {
      return {
        ...state,
        device: action.device,
      };
    }
    case actionTypes.SET_MODEL_DEVICE: {
      return {
        ...state,
        model: action.model,
      };
    }
    default:
      return state;
  }
}
