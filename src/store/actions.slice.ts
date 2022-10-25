import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import actionTypes from 'constants/actionTypes';
import {ActionItem, Actions, ActionTypes} from './types';

const initialState: Actions = {
  actions: [],
  data: [],
  externals: [],
  push: [],
  cronTasks: [],
  selected: null,
  deleted: {
    actions: [],
    data: [],
    externals: [],
    cronTasks: [],
    push: []
  },
};

const actionsSlice = createSlice({
  name: 'actions',
  initialState,
  reducers: {
    setActions: (state, action: PayloadAction<{actions?: any[], data?: any[], externals?: any[], cronTasks?: any[], push?: any[]}>) => {
      if (action.payload.actions) {
        state.actions = action.payload.actions;
      }
      if (action.payload.data) {
        state.data = action.payload.data;
      }
      if (action.payload.externals) {
        state.externals = action.payload.externals;
      }
      if (action.payload.cronTasks) {
        state.cronTasks = action.payload.cronTasks;
      }
      if (action.payload.push) {
        state.push = action.payload.push;
      }
    },
    setSelectAction: (state, action: PayloadAction<ActionItem | null>) => {
      state.selected = action.payload;
    },
    addAction: (state, action: PayloadAction<ActionItem>) => {
      if (action.payload.type === ActionTypes.actions) {
        state.actions.push(action.payload);
      } else if (action.payload.type === ActionTypes.data) {
        state.data.push(action.payload);
      } else if (action.payload.type === ActionTypes.externals) {
        state.externals.push(action.payload);
      } else if (action.payload.type === ActionTypes.cronTasks) {
        state.cronTasks.push(action.payload);
      } else if (action.payload.type === ActionTypes.push) {
        state.push.push(action.payload);
      }
    },
    deleteAction: (state, action: PayloadAction<ActionItem | null>) => {
      let removed: ActionItem[] = [];
      if (action.payload?.type === ActionTypes.actions) {
        const actions = [...state.actions];
        const deleted = [...state.deleted.actions];
        state.actions.forEach((item, index) => {
          if (item.action === action.payload?.action) {
            removed = [...deleted, ...actions.splice(index, 1)];
          }
        });
        state.deleted.actions = removed;
      } else if (action.payload?.type === ActionTypes.data) {
        const data = [...state.data];
        const deleted = [...state.deleted.data];
        state.data.forEach((item, index) => {
          if (item.action === action.payload?.action) {
            removed = [...deleted, ...data.splice(index, 1)];
          }
        });
        state.deleted.data = removed;
      } else if (action.payload?.type === ActionTypes.externals) {
        const externals = [...state.externals];
        const deleted = [...state.deleted.externals];
        state.externals.forEach((item, index) => {
          if (item.action === action.payload?.action) {
            removed = [...deleted, ...externals.splice(index, 1)];
          }
        });
        state.deleted.externals = removed;
      } else if (action.payload?.type === ActionTypes.push) {
        const push = [...state.push];
        const deleted = [...state.deleted.push];
        state.push.forEach((item, index) => {
          if (item.action === action.payload?.action) {
            removed = [...deleted, ...push.splice(index, 1)];
          }
        });
        state.deleted.push = removed;
      } else if (action.payload?.type === ActionTypes.cronTasks) {
        const cronTasks = [...state.cronTasks];
        const deleted = [...state.deleted.cronTasks];
        state.cronTasks.forEach((item, index) => {
          if (item.action === action.payload?.action) {
            removed = [...deleted, ...cronTasks.splice(index, 1)];
          }
        });
        state.deleted.cronTasks = removed;
      } else if (action.payload === null) {
        state.deleted.data = [];
        state.deleted.actions = [];
        state.deleted.externals = [];
        state.deleted.push = [];
        state.deleted.cronTasks = [];
      }
    },
    deleteActionEdit: (state, action: PayloadAction<ActionItem | null>) => {
      if (action.payload?.type === ActionTypes.actions) {
        const deleted = [...state.deleted.actions];
        state.deleted.actions = [...deleted, action.payload];
      }
      if (action.payload?.type === ActionTypes.data) {
        const deleted = [...state.deleted.data];
        state.deleted.data = [...deleted, action.payload];
      }
      if (action.payload?.type === ActionTypes.externals) {
        const deleted = [...state.deleted.externals];
        state.deleted.externals = [...deleted, action.payload];
      }
      if (action.payload?.type === ActionTypes.push) {
        const deleted = [...state.deleted.push];
        state.deleted.push = [...deleted, action.payload];
      }
      if (action.payload?.type === ActionTypes.cronTasks) {
        const deleted = [...state.deleted.cronTasks];
        state.deleted.cronTasks = [...deleted, action.payload];
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actionTypes.ERASE, () => initialState);
  },
});

export const {setActions, setSelectAction, addAction, deleteAction, deleteActionEdit} = actionsSlice.actions;
export default actionsSlice.reducer;
