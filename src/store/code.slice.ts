import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = '';

const codeSlice = createSlice({
  name: 'code',
  initialState,
  reducers: {
    saveCode: (state, action: PayloadAction<string>) => action.payload
  }
});

export const {saveCode} = codeSlice.actions;
export default codeSlice.reducer;
