import {AnyAction} from 'redux';
import actionTypes from '../constants/actionTypes';
import { SideBar } from './types';

const initialState: SideBar = {
  left: true,
  right: true,
};

export default function reducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case actionTypes.TOGGLE_LEFT_BAR:
      return {
        ...state,
        left: !state.left,
      };
    case actionTypes.TOGGLE_RIGHT_BAR:
      return {
        ...state,
        right: !state.right,
      };
    default:
      return state;
  }
}
