import {createSlice} from '@reduxjs/toolkit';
import {SideBar} from 'reducers/types';

const initialState: SideBar = {
  left: true,
  right: true,
};

const sideBarSlice = createSlice({
  name: 'sideBar',
  initialState,
  reducers: {
    toggleLeftBar: (state) => {
      return {
        ...state,
        left: !state.left,
      };
    },
    toggleRightBar: (state) => {
      return {
        ...state,
        right: !state.right,
      };
    }
  }
});

export const {toggleLeftBar, toggleRightBar} = sideBarSlice.actions;
export default sideBarSlice.reducer;
