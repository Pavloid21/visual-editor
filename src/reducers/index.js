import { combineReducers } from "redux";

import config from "./config";
import layout from "./layout";
import output from "./output";

export default combineReducers({
  config,
  layout,
  output,
});
