import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import actionTypes from 'constants/actionTypes';
import type {ActionItem, Actions} from './types';

const initialState: Actions = {
  actions: [],
  data: [],
  selected: null,
  deleted: {
    actions: [],
    data: [],
  },
};

const actionsSlice = createSlice({
  name: 'actions',
  initialState,
  reducers: {
    setActions: (state, action: PayloadAction<{actions?: any[], data?: any[]}>) => {
      if (action.payload.actions) {
        state.actions = action.payload.actions;
      }
      if (action.payload.data) {
        state.data = action.payload.data;
      }
    },
    setSelectAction: (state, action: PayloadAction<ActionItem | null>) => {
      state.selected = action.payload;
    },
    addAction: (state, action: PayloadAction<ActionItem>) => {
      state.actions.push(action.payload);
    },
    deleteAction: (state, action: PayloadAction<ActionItem | null>) => {
      let removed: ActionItem[] = [];
      if (action.payload?.type === 'action') {
        const actions = [...state.actions];
        state.actions.forEach((item, index) => {
          if (item.action === action.payload?.action) {
            removed = actions.splice(index, 1);
          }
        });
        state.deleted.actions = removed;
      } else if (action.payload?.type === 'data') {
        const data = [...state.data];
        state.data.forEach((item, index) => {
          if (item.action === action.payload?.action) {
            removed = data.splice(index, 1);
          }
        });
        state.deleted.data = removed;
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(actionTypes.ERASE, () => initialState);
  },
});

export const {setActions, setSelectAction, addAction, deleteAction} = actionsSlice.actions;
export default actionsSlice.reducer;
