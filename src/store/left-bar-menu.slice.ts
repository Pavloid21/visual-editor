import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {LeftBarMenu} from './types';

const initialState: LeftBarMenu = {
  activeTab: 'screen',
  filterAction: 0
};

const leftBarMenuSlice = createSlice({
  name: 'leftBarMenu',
  initialState,
  reducers: {
    setLeftBarMenu: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    setLeftBarActionFilter: (state, action: PayloadAction<number>) => {
      state.filterAction = +action.payload;
    }
  }
});

export const {setLeftBarMenu, setLeftBarActionFilter} = leftBarMenuSlice.actions;
export default leftBarMenuSlice.reducer;
