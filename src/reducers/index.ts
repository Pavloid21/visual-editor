import {combineReducers} from 'redux';

import config from './config';
import layout from './layout';
import output from './output';
import api from './apisettings';
import sideBar from './sideBar';
import editorMode from './editorMode';
import current from './current';
import code from './code';
import actions from './actions';
import project from './project';

export default combineReducers({
  config,
  layout,
  output,
  api,
  sideBar,
  editorMode,
  current,
  code,
  actions,
  project,
});
