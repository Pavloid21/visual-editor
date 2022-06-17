import {AnyAction} from 'redux';
import actionTypes from '../constants/actionTypes';

const initialState = '';

export default function reducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case actionTypes.SAVE_CODE:
      return action.code;
    default:
      return state;
  }
}
