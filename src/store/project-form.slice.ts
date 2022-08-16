import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
  id: '',
  name: '',
  description: '',
  icon: {},
};

const projectFormSlice = createSlice({
  name: 'projectForm',
  initialState,
  reducers: {
    saveProjectForm: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const {saveProjectForm} = projectFormSlice.actions;
export default projectFormSlice.reducer;
