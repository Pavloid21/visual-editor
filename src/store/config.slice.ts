import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import actionTypes from 'constants/actionTypes';

const initialState = {
  activeTab: 0,
  previewMode: 3,
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<number>) => {
      state.activeTab = action.payload;
    },
    setPreviewMode: (state, action: PayloadAction<number>) => {
      state.previewMode = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actionTypes.ERASE, () => initialState);
  },
});

export const {setActiveTab, setPreviewMode} = configSlice.actions;
export default configSlice.reducer;
