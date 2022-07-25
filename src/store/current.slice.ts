import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = '';

const currentSlice = createSlice({
  name: 'current',
  initialState,
  reducers: {
    setCurrentScreenName: (state, action: PayloadAction<string>) => action.payload
  }
});

export const {setCurrentScreenName} = currentSlice.actions;
export default currentSlice.reducer;
