import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TScreenListOption} from './types';

const initialState: TScreenListOption[] = [];

const screenListSlice = createSlice({
  name: 'screens',
  initialState,
  reducers: {
    setScreens: (state, action: PayloadAction<any[]>) => {
      return [...action.payload];
    },
  },
});

export const {setScreens} = screenListSlice.actions;
export default screenListSlice.reducer;
