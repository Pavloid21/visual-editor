import {AnyAction} from 'redux';
import actionTypes from '../constants/actionTypes';
import {Project} from './types';

const initialState: Project = {
  id: '',
  name: '',
  description: '',
  icon: '',
};

export default function reducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case actionTypes.SELECT_PROJECT:
      return {
        ...state,
        id: action.id,
        name: action.name,
      };
    default:
      return state;
  }
}
