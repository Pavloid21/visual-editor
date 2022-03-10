import { combineReducers } from "redux";

import config from "./config";
import layout from "./layout";
import output from "./output";
import api from "./apisettings";
import sideBar from "./sideBar";
import editorMode from "./editorMode";

export default combineReducers({
  config,
  layout,
  output,
  api,
  sideBar,
  editorMode,
});
