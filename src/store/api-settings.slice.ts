import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {API, APIItem} from './types';

const initialState: API = {
  list: [],
};

const APISettings = createSlice({
  name: 'apiSettings',
  initialState,
  reducers: {
    addAPI: (state, action: PayloadAction<APIItem>) => {
      state.list.push(action.payload);
    },
    removeAPI: (state, action: PayloadAction<number>) => {
      state.list.splice(action.payload, 1);
    },
    editAPI: (state, action: PayloadAction<{index: number, api: APIItem}>) => {
      state.list[action.payload.index] = action.payload.api;
    }
  }
});

export const {addAPI, removeAPI, editAPI} = APISettings.actions;
export default APISettings.reducer;
