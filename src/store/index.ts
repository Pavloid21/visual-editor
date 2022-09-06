import {combineReducers, configureStore} from '@reduxjs/toolkit';
import actionsReducer from './actions.slice';
import apiSettingsReducer from './api-settings.slice';
import codeReducer from './code.slice';
import configReducer from './config.slice';
import currentReducer from './current.slice';
import editorModeReducer from './editor-mode.slice';
import layoutReducer from './layout.slice';
import outputReducer from './output.slice';
import projectReducer from './project.slice';
import sideBarReducer from './side-bar.slice';
import projectFormReducer from './project-form.slice';

const rootReducer = combineReducers({
  actions: actionsReducer,
  api: apiSettingsReducer,
  code: codeReducer,
  config: configReducer,
  current: currentReducer,
  editorMode: editorModeReducer,
  layout: layoutReducer,
  output: outputReducer,
  project: projectReducer,
  sideBar: sideBarReducer,
  projectForm: projectFormReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
