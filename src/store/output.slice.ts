import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import actionTypes from 'constants/actionTypes';
import type {EditScreenNamePayloadAction, Output} from './types';

const initialState: Output = {
  screen: 'screen name',
  logic: '',
};

const outputSlice = createSlice({
  name: 'output',
  initialState,
  reducers: {
    editLogic: (state, action: PayloadAction<string>) => {
      state.logic = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(actionTypes.ERASE, () => initialState);
    builder.addCase(actionTypes.EDIT_SCREEN_NAME, (state, action: EditScreenNamePayloadAction) => {
      const nextState = {...state};
      nextState.screen = action.screen;
      if (action.snippet.logic) {
        nextState.logic = action.snippet.logic.replace(/return$/gs, '\n');
      }
      return nextState;
    });
  },
});

export const {editLogic} = outputSlice.actions;
export default outputSlice.reducer;
