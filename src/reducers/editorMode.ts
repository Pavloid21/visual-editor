import actionTypes from '../constants/actionTypes';
import {Device, optionsByDevice} from 'containers/MobileSelect/consts';
import {AnyAction} from 'redux';
import {EditorMode} from './types';
import {Zoom} from 'containers/ZoomSelect/types';

const initialState: EditorMode = {
  mode: 'editor',
  device: Device.IOS,
  model: optionsByDevice[Device.IOS][0].value,
  zoom: Zoom['100%']
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
        model: optionsByDevice[action.device as Device][0].value
      };
    }
    case actionTypes.SET_MODEL_DEVICE: {
      return {
        ...state,
        model: action.model,
      };
    }
    case actionTypes.SET_ZOOM: {
      return {
        ...state,
        zoom: action.zoom
      };
    }
    default:
      return state;
  }
}
