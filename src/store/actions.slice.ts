import {createAsyncThunk, createSlice, Dispatch, PayloadAction} from '@reduxjs/toolkit';
import actionTypes from 'constants/actionTypes';
import {ActionItem, Actions, ActionTypes} from './types';
import {
  getActionByName,
  getActionsList,
  getCronTaskList,
  getDataActionsList,
  getExternalActionsList, getPushList,
} from 'services/ApiService';

const getActions = (getActionsArr: any, project_id: string, actionType: string, actionPath: string, dispatch: Dispatch) => {
  getActionsArr(project_id)
    .then((response: any) => response.data)
    .then((actions: string[]) => {
      const actionsArr = actions?.map(async (action) => {
        try {
          const response = await getActionByName(project_id, action, actionPath);
          const data = response.data;
          return {action, object: data};
        } catch (e) {
          console.log('e :>> ', e);
        }
      });
      Promise.allSettled(actionsArr)
        .then((resolves) => {
          const actions: any[] = [];
          resolves.forEach((result) => {
            if (result.status === 'fulfilled') {
              actions.push({...result.value, type: actionType, selected: false});
            }
          });
          dispatch(setActions({[actionType]: actions}));
        })
        .catch(console.log);
    });
};

export const fetchActions = createAsyncThunk(
  'actions/fetchActions',
  async function(project_id: string, {dispatch}) {
    getActions(getActionsList, project_id, 'actions', 'actions', dispatch);
    getActions(getDataActionsList, project_id, 'data', 'data', dispatch);
    getActions(getExternalActionsList, project_id, 'externals', 'externalActions', dispatch);
    getActions(getCronTaskList, project_id, 'cronTasks', 'cron/tasks', dispatch);
    getPushList(project_id)
      .then((response: any) => response.data)
      .then((actionsArr: string[]) => {
        const actions: any[] = [];
        actionsArr.forEach((action) => {
          actions.push({action, selected: false});
        });
        dispatch(setActions({push: actions}));
      })
      .catch(console.log);
  }
);

const initialState: Actions = {
  actions: [],
  data: [],
  externals: [],
  push: [],
  cronTasks: [],
  all: [],
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
      const type = action.payload?.type;
      if (action.payload === null) {
        state.deleted.data = [];
        state.deleted.actions = [];
        state.deleted.externals = [];
        state.deleted.push = [];
        state.deleted.cronTasks = [];
      } else if (type && type !== ActionTypes.all) {
        const actions = [...state[type]];
        const deleted = [...state.deleted[type]];
        state[type].forEach((item, index) => {
          if (item.action === action.payload?.action) {
            removed = [...deleted, ...actions.splice(index, 1)];
          }
        });
        state.deleted[type] = removed;
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
