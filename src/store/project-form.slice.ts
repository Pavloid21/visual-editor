import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ProjectForm} from './types';

const initialState: ProjectForm = {
  id: '',
  name: '',
  description: '',
  icon: {},
  platform: '{}',
};

const projectFormSlice = createSlice({
  name: 'projectForm',
  initialState,
  reducers: {
    saveProjectForm: (state, action: PayloadAction<ProjectForm>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const {saveProjectForm} = projectFormSlice.actions;
export default projectFormSlice.reducer;
