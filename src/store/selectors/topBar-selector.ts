import {createDraftSafeSelector} from '@reduxjs/toolkit';
import {ActionItem, Project, RootStore} from 'store/types';

const selectSelf = (state: RootStore) => state;

export type TCurrentEditorState = {
  currentProject: Project;
  snippets: any[];
  actions: ActionItem[];
  deletedActions: ActionItem[];
  deletedScreens: string[];
  editedScreens: string[];
};

const getCurrentEditorState = ({project, layout, actions}: RootStore): TCurrentEditorState => {
  return {
    currentProject: project,
    snippets: layout.snippets,
    actions: [
      ...actions.actions,
      ...actions.data,
      ...actions.externals,
      ...actions.push,
      ...actions.cronTasks
    ],
    deletedActions: [
      ...actions.deleted.actions,
      ...actions.deleted.data,
      ...actions.deleted.externals,
      ...actions.deleted.push,
      ...actions.deleted.cronTasks,
    ],
    deletedScreens: layout.deletedScreens,
    editedScreens: layout.editedScreens,
  };
};

export const currentEditorStateSafeSelector = createDraftSafeSelector(selectSelf, getCurrentEditorState);
