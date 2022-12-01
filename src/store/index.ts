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
import screensReducer from './screens.slice';
import leftBarMenuSlice from './left-bar-menu.slice';
import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux';

import type {RootStore, ThunkAppDispatch} from './types';

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
  screenList: screensReducer,
  leftBarMenu: leftBarMenuSlice
});

const store = configureStore({
  reducer: rootReducer,
});

export const useAppDispatch = (): ThunkAppDispatch => useDispatch<ThunkAppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootStore> = useSelector;

export default store;
