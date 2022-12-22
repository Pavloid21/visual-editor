import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import actionTypes from 'constants/actionTypes';

import type {EditScreenNamePayloadAction, TSettingsUI} from './types';

interface IInitialState {
  screen: string;
  logic: string;
  navigationSettings: any;
  settingsUI: TSettingsUI;
}

const defaultSettingsUI: TSettingsUI = {
  isBottomSheet: false,
    bottomSheetSettings: {
      heightInPercent: 0,
      scrimColor: '',
      cornersRadius: 0,
    },
  isNavigateDrawer: false,
    navigationDrawerSettings: {
      weightInPercent: 70,
      scrimColor: '#FFFFFF',
    }
};

const initialState: IInitialState = {
  screen: 'screen name',
  logic: '',
  navigationSettings: {
    saveScreen: false,
    showBottomBar: false,
    updateUrlBottomBar: '',
  },
  settingsUI: defaultSettingsUI,
};

const outputSlice = createSlice({
  name: 'output',
  initialState,
  reducers: {
    editLogic: (state, action: PayloadAction<string>) => {
      state.logic = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actionTypes.ERASE, () => initialState);
    builder.addCase(actionTypes.EDIT_SCREEN_NAME, (state, action: EditScreenNamePayloadAction) => {
      const nextState = {...state};
      nextState.screen = action.screen;
      if (action.snippet.logic) {
        nextState.logic = action.snippet.logic.replace(/return$/gs, '\n');
      }
      if (action.navigationSettings) {
        nextState.navigationSettings = {...nextState.navigationSettings, ...action.navigationSettings};
      }
      if (action.settingsUI !== undefined) {
        nextState.settingsUI = {...nextState.settingsUI, ...action.settingsUI};
      } else {
        state = {...nextState, settingsUI: defaultSettingsUI};
        return state;
      }
      return nextState;
    });
  },
});

export const {editLogic} = outputSlice.actions;
export default outputSlice.reducer;
