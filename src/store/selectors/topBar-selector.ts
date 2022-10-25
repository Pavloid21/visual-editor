import {createDraftSafeSelector} from '@reduxjs/toolkit';
import {ActionItem, ActionTypes, Project, RootStore} from 'store/types';

const selectSelf = (state: RootStore) => state;

export type TCurrentEditorState = {
  currentProject: Project;
  snippets: any[];
  actions: ActionItem[];
  deletedActions: ActionItem[];
  deletedScreens: any[];
  editedScreens: any[];
};

const getCurrentEditorState = ({project, layout, actions}: RootStore): TCurrentEditorState => {
  return {
    currentProject: project,
    snippets: layout.snippets,
    actions: [
      ...actions.actions.map((item) => ({...item, type: ActionTypes.actions})),
      ...actions.data.map((item) => ({...item, type: ActionTypes.data})),
      ...actions.externals.map((item) => ({...item, type: ActionTypes.externals})),
      ...actions.push.map((item) => ({...item, type: ActionTypes.push})),
      ...actions.cronTasks.map((item) => ({...item, type: ActionTypes.cronTasks}))
    ],
    deletedActions: [
      ...actions.deleted.actions.map((item) => ({
        ...item,
        type: ActionTypes.actions,
      })),
      ...actions.deleted.data.map((item) => ({...item, type: ActionTypes.data})),
      ...actions.deleted.externals.map((item) => ({...item, type: ActionTypes.externals})),
      ...actions.deleted.push.map((item) => ({...item, type: ActionTypes.push})),
      ...actions.deleted.cronTasks.map((item) => ({...item, type: ActionTypes.cronTasks})),
    ],
    deletedScreens: layout.deletedScreens,
    editedScreens: layout.editedScreens,
  };
};

export const currentEditorStateSafeSelector = createDraftSafeSelector(selectSelf, getCurrentEditorState);
