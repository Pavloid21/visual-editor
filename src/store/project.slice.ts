import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Project as TProject} from 'reducers/types';

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
