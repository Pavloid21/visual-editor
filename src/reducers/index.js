import { combineReducers } from "redux";

import config from "./config";
import layout from "./layout";
import output from "./output";
import api from "./apisettings";
import code from "./code";

export default combineReducers({
  config,
  layout,
  output,
  api,
  code,
});
