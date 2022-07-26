import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {Project as TProject} from './types';

const initialState: TProject = {
  id: '',
  name: '',
  description: '',
  icon: '',
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    selectProject: (state, action: PayloadAction<TProject>) => {
      return {
        ...state,
        id: action.payload.id,
        name: action.payload.name,
      };
    }
  }
});

export const {selectProject} = projectSlice.actions;
export default projectSlice.reducer;
