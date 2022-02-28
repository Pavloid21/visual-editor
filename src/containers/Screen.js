import React from "react";
import { DebounceInput } from "react-debounce-input";
import { useSelector, useDispatch } from "react-redux";
import actionTypes from "../constants/actionTypes";

const Screen = (props) => {
  const screenName = useSelector((state) => state.output.screen);
  const dispatch = useDispatch();
  return props.display ? (
    <div>
      <h5>Category: {props.category}</h5>
      <hr />
      <div className="form-group">
        <label>Screen name</label>
        <DebounceInput
          debounceTimeout={500}
          type="text"
          className="form-control"
          placeholder="Screen name"
          value={screenName}
          onChange={(e) =>
            dispatch({
              type: actionTypes.EDIT_SCREEN_NAME,
              screen: e.target.value
            })
          }
        />
      </div>
    </div>
  ) : null;
};

export default Screen;
