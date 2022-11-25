import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ActionTypes, LeftBarMenu} from './types';

const initialState: LeftBarMenu = {
  activeTab: 'screen',
  activeImageTab: 'Icon',
  iconNameFilter: '',
  filterAction: ActionTypes.all,
  screenNameFilter: '',
  actionNameFilter: '',
  activeTabActions: ActionTypes.actions
};

const leftBarMenuSlice = createSlice({
  name: 'leftBarMenu',
  initialState,
  reducers: {
    setLeftBarMenu: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    setLeftBarImageTab: (state, action: PayloadAction<string>) => {
      state.activeImageTab = action.payload;
    },
    setIconNameFilter: (state, action: PayloadAction<string>) => {
      state.iconNameFilter = action.payload;
    },
    setLeftBarActionFilter: (state, action: PayloadAction<ActionTypes>) => {
      state.filterAction = action.payload;
    },
    setScreenNameFilter: (state, action: PayloadAction<string>) => {
      state.screenNameFilter = action.payload;
    },
    setActionNameFilter: (state, action: PayloadAction<string>) => {
      state.actionNameFilter = action.payload;
    },
    setActiveTabActions: (state, action: PayloadAction<ActionTypes>) => {
      state.activeTabActions = action.payload;
    }
  }
});

export const {
  setLeftBarMenu,
  setLeftBarActionFilter,
  setScreenNameFilter,
  setActionNameFilter,
  setActiveTabActions,
  setLeftBarImageTab,
  setIconNameFilter
} = leftBarMenuSlice.actions;
export default leftBarMenuSlice.reducer;
