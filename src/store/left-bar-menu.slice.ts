import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {LeftBarMenu} from './types';

const initialState: LeftBarMenu = {
  activeTab: 'screen',
  filterAction: 0,
  activeImageTab: 'Icon',
  iconNameFilter: ''
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
    },
    setLeftBarImageTab: (state, action: PayloadAction<string>) => {
      state.activeImageTab = action.payload;
    },
    setIconNameFilter: (state, action: PayloadAction<string>) => {
      state.iconNameFilter = action.payload;
    },
  }
});

export const {setLeftBarMenu, setLeftBarActionFilter, setLeftBarImageTab, setIconNameFilter} = leftBarMenuSlice.actions;
export default leftBarMenuSlice.reducer;
