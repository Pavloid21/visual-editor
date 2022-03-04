import { combineReducers } from "redux";

import config from "./config";
import layout from "./layout";
import output from "./output";
import api from "./apisettings";

export default combineReducers({
  config,
  layout,
  output,
  api,
});
