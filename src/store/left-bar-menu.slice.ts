import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {LeftBarMenu} from './types';

const initialState: LeftBarMenu = {
  activeTab: 'screen'
};

const leftBarMenuSlice = createSlice({
  name: 'leftBarMenu',
  initialState,
  reducers: {
    setLeftBarMenu: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    }
  }
});

export const {setLeftBarMenu} = leftBarMenuSlice.actions;
export default leftBarMenuSlice.reducer;
